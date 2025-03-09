from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from dotenv import load_dotenv
from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from vectorstore import create_embeddings
import os

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

# embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

# vectorstore = Chroma.from_documents(documents=docs, embedding=GoogleGenerativeAIEmbeddings(model="models/embedding-001"))
# retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.4, max_tokens=500)

systemprompt = (
    "You are a mental-health assistant/buddy for question answering tasks."
    "Use the following pieces of retrieved context to answer the user's question."
    "You'll be very sensitive to the user and focus on providing the most accurate information."
    "If you don't know the answer, you can say so and provide a starting point for them to look at."
    "Use 8 sentences max and keep the answer concise. Be very supporting of the user as you're here to help, keeping their mental health needs in mind." 
    "You should add additional information if necessary and if relevant."
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

while True:
    question = input("Enter your question: ")
    if question == "exit":
        break
    response = rag_chain.invoke({"input":question})
    print(response["answer"])
    print("\n")

# question = "Hello how are you doing? Are there any communities in BC or Canada for trans people? If yes, provide me with some...\n"
# print(question)

# response = rag_chain.invoke({"input":question})
# print(response["answer"])
