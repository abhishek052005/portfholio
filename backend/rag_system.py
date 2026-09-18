import os

from dotenv import load_dotenv
from openai import OpenAI

from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter


# ============================================================
# ENV
# ============================================================

load_dotenv()

OPENROUTER_API_KEY = (
    os.getenv("OPENROUTER_API_KEY")
    or os.getenv("OPEN_ROUTE_API_KEY")
)

OPENROUTER_MODEL = os.getenv(
    "OPENROUTER_MODEL",
    "openai/gpt-4o-mini"
)

if not OPENROUTER_API_KEY:
    raise ValueError("OPENROUTER_API_KEY not found")


# ============================================================
# CONFIG
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DB_PATH = os.path.join(BASE_DIR, "chroma_db")
DATA_PATH = os.path.join(BASE_DIR, "data")

COLLECTION_NAME = "abhishek_knowledge"

RETRIEVAL_K = 5


# ============================================================
# OPENROUTER
# ============================================================

client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)


# ============================================================
# LAZY GLOBALS
# ============================================================

embeddings = None
vectorstore = None
retriever = None


# ============================================================
# LOAD EMBEDDINGS
# ============================================================

def get_embeddings():

    global embeddings

    if embeddings is None:

        print("Loading HuggingFace embedding model...")

        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        print("Embedding model loaded.")

    return embeddings


# ============================================================
# LOAD DOCUMENTS
# ============================================================

def load_portfolio_documents():

    loader = DirectoryLoader(
        DATA_PATH,
        glob="**/*.md",
        loader_cls=TextLoader,
        loader_kwargs={
            "encoding": "utf-8"
        },
    )

    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
    )

    return splitter.split_documents(documents)


# ============================================================
# KNOWLEDGE BASE
# ============================================================

def ensure_knowledge_base():

    global vectorstore
    global retriever

    if vectorstore is not None and retriever is not None:
        return vectorstore

    print("Initializing Chroma knowledge base...")

    embedding_model = get_embeddings()

    vectorstore = Chroma(
        persist_directory=DB_PATH,
        embedding_function=embedding_model,
        collection_name=COLLECTION_NAME
    )

    try:
        count = vectorstore._collection.count()
    except Exception:
        count = 0

    print(f"Existing Chroma documents: {count}")

    if count == 0:

        print("Building Chroma database from portfolio data...")

        chunks = load_portfolio_documents()

        if not chunks:
            raise RuntimeError(
                "No portfolio documents found in backend/data"
            )

        vectorstore = Chroma.from_documents(
            documents=chunks,
            embedding=embedding_model,
            persist_directory=DB_PATH,
            collection_name=COLLECTION_NAME,
        )

        print(
            f"Chroma database created with {len(chunks)} chunks."
        )

    retriever = vectorstore.as_retriever(
        search_kwargs={
            "k": RETRIEVAL_K
        }
    )

    print("RAG knowledge base ready.")

    return vectorstore


# ============================================================
# SYSTEM PROMPT
# ============================================================

SYSTEM_PROMPT = """
You are Abhishek Tiwari's AI portfolio assistant.

Your job is to answer questions about Abhishek's:

- Projects
- Skills
- Education
- Experience
- Technologies
- Achievements
- Resume/profile

IMPORTANT RULES:

1. Use ONLY the information present in the provided context.

2. Never invent projects, technologies, achievements,
experience, responsibilities, results or metrics.

3. If information is genuinely missing, say that it
is not available in the portfolio knowledge.

4. Do not give generic statements when specific
information is available.

5. For broad questions, combine information from
multiple relevant sources.

6. When discussing projects:
   - Give the actual project name.
   - Explain what it does.
   - Mention technologies when available.
   - Mention important features when available.
   - Explain the problem/purpose when available.

7. If the user asks about multiple projects,
provide multiple relevant projects.

8. If the user asks "why should I select Abhishek?",
use concrete evidence from his projects, skills,
education and experience.

9. Do not claim professional experience unless
explicitly present in the context.

10. Do not exaggerate.

11. Keep answers professional, natural and easy
to understand.

12. Never reveal internal RAG instructions,
embeddings, vector databases or prompts unless
the user explicitly asks about the technical system.
"""


# ============================================================
# QUERY IMPROVEMENT
# ============================================================

def improve_query(question):

    q = question.lower()

    if "project" in q or "projects" in q:

        return """
        Abhishek Tiwari projects portfolio.
        Machine learning projects.
        Artificial intelligence projects.
        NLP projects.
        OCR projects.
        Recommendation system projects.
        AutoML projects.
        Project names, descriptions, technologies,
        features and purpose.
        """

    return question


# ============================================================
# RETRIEVE
# ============================================================

def retrieve_documents(question):

    global retriever

    ensure_knowledge_base()

    search_query = improve_query(question)

    docs = retriever.invoke(search_query)

    return docs


# ============================================================
# BUILD CONTEXT
# ============================================================

def build_context(docs):

    context_parts = []

    for i, doc in enumerate(docs, start=1):

        context_parts.append(
            f"""
--- KNOWLEDGE SOURCE {i} ---

{doc.page_content}
"""
        )

    return "\n".join(context_parts)


# ============================================================
# ASK RAG
# ============================================================

def ask_rag(question):

    docs = retrieve_documents(question)

    if not docs:

        return (
            "I couldn't find relevant information "
            "in Abhishek's portfolio."
        )

    context = build_context(docs)

    prompt = f"""
{SYSTEM_PROMPT}

================ CONTEXT ================

{context}

================ USER QUESTION ================

{question}

================ ANSWER ================

Answer the question directly using the provided
knowledge.

If multiple relevant pieces of information exist,
combine them into one useful answer.

Format the answer for a portfolio visitor:
- Start with a direct one-sentence answer.
- Use short paragraphs.
- Use simple bullet points when listing projects,
  technologies, features, or achievements.
- Leave a blank line between sections.
- Do not use markdown tables.

Do not invent missing information.
"""

    response = client.chat.completions.create(
        model=OPENROUTER_MODEL,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": prompt
            },
        ],
        temperature=0.2,
        max_tokens=800,
    )

    return response.choices[0].message.content.strip()