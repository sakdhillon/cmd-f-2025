from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.embeddings import CacheBackedEmbeddings
import os
import pickle

VECTORSTORE_DIR = "./chroma_db"

def save_embeddings(docs, embedding_model):
    vectorstore = Chroma.from_documents(documents=docs, embedding=embedding_model, persist_directory=VECTORSTORE_DIR)
    print("Embeddings saved to vectorstore.pkl")

def load_embeddings():
    if os.path.exists(VECTORSTORE_DIR):
        vectorstore = Chroma(persist_directory=VECTORSTORE_DIR, embedding_function=GoogleGenerativeAIEmbeddings(model="models/embedding-001"))
        print(f"Embeddings loaded from {VECTORSTORE_DIR}")
        return vectorstore
    else:
        print(f"No embeddings found in {VECTORSTORE_DIR}, please run the save_embeddings function first.")
        return None

def create_embeddings(docs):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vectorstore = load_embeddings()
    
    if vectorstore is None:
        save_embeddings(docs, embeddings)
        vectorstore = load_embeddings()

    return vectorstore
