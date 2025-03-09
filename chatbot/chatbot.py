from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from dotenv import load_dotenv
from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from vectorstore import create_embeddings
from flask import Flask, jsonify, request
import os

VECTORSTORE_DIR = "./chroma_db"

app = Flask(__name__)

load_dotenv()

textsplitter = RecursiveCharacterTextSplitter(chunk_size=1000)

pdf_files = [file for file in os.listdir("data/") if file.endswith(".pdf")]
all_docs = []
for pdf in pdf_files:
    loader = PyPDFLoader(f"data/{pdf}")
    data = loader.load()
    all_docs.extend(data)

docs = textsplitter.split_documents(all_docs)

vectorstore = create_embeddings(docs)
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.4, max_tokens=500)

systemprompt = (
    "You are a mental-health assistant/buddy for question answering tasks."
    "Use the following pieces of retrieved context to answer the user's question, don't tell them you got the context resources from them."
    "Until they specifically ask you for help or resources, be very neutral and talk like a regular chatbot"
    "You'll be very sensitive to the user and focus on providing the most accurate information."
    "If you don't know the answer, you can say so and provide a starting point for them to look at."
    "Use 8 sentences max and keep the answer concise. Be very supporting of the user as you're here to help, keeping their mental health needs in mind." 
    "You should add additional information if necessary and if relevant."
    "Don't make them feel like they're snesitive or looking for help, just be very friendly."
    "Also don't just assume they're looking for help or mental health resources, they could be looking for general information."
    "\n \n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", systemprompt),
        ("human", "{input}"),
    ]
)

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)


# question = "Hello how are you doing? Are there any communities in BC or Canada for trans people? If yes, provide me with some...\n"
# print(question)

# response = rag_chain.invoke({"input":question})
# print(response["answer"])

def load_embeddings():
    if os.path.exists(VECTORSTORE_DIR):
        vectorstore = Chroma(persist_directory=VECTORSTORE_DIR, embedding_function=GoogleGenerativeAIEmbeddings(model="models/embedding-001"))
        print(f"Embeddings loaded from {VECTORSTORE_DIR}")
        return vectorstore
    else:
        print(f"No embeddings found in {VECTORSTORE_DIR}, run the save_embeddings function first.")
        return None

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    question = data.get("question")
    vectorstore = load_embeddings()
    if question == "exit":
        return
    if vectorstore:
        # response = rag_chain.invoke({"input":question})
        response = "Gemini API limit reached, using fake hardcoded response rn..."
        # return jsonify({"answer": f'{response["answer"]} \n'})
        return jsonify({"answer": f'{response} \n'})
    else:
        return jsonify({"error": "No embeddings found in the directory"}), 400

'''
Sample request:
{
    "question": "Hello! Please give me some mental health reources in Canada, particularly in BC"
}
Sameple response:
{
    "answer": "It's great that you're reaching out for support! In BC, you can access the Ministry of Mental Health and Addictions' \"Help Starts Here\" website. It offers a navigation tool to find mental health and substance use resources and services, plus information on well-being.  The website is in English, with translations available in over 100 languages. Nationally, the Canadian Mental Health Association (CMHA) provides information on mental health resources, programs, and support.  You can also find your local CMHA branch through their website.  Remember, reaching out is a sign of strength, and I'm here to help you on your journey.  If you need immediate support, please call or text 9-8-8, Canada's Suicide Crisis Helpline. \n"
}
'''

if __name__ == '__main__':
    app.run(debug=True)