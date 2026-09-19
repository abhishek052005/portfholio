import os
from dotenv import load_dotenv
from openai import OpenAI

from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


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
DATA_PATH = os.path.join(BASE_DIR, "data")

RETRIEVAL_K = 5


# ============================================================
# OPENROUTER
# ============================================================

client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)


# ============================================================
# GLOBAL KNOWLEDGE BASE
# ============================================================

documents = None
document_texts = None
vectorizer = None
document_vectors = None


# ============================================================
# LOAD PORTFOLIO DOCUMENTS
# ============================================================

def load_portfolio_documents():

    print("Loading portfolio documents...")

    loader = DirectoryLoader(
        DATA_PATH,
        glob="**/*.md",
        loader_cls=TextLoader,
        loader_kwargs={
            "encoding": "utf-8"
        },
    )

    loaded_documents = loader.load()

    if not loaded_documents:
        raise RuntimeError(
            "No portfolio documents found in backend/data"
        )

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=700,
        chunk_overlap=100,
    )

    chunks = splitter.split_documents(
        loaded_documents
    )

    print(
        f"Loaded {len(loaded_documents)} files "
        f"and created {len(chunks)} chunks."
    )

    return chunks


# ============================================================
# BUILD TF-IDF INDEX
# ============================================================

def ensure_knowledge_base():

    global documents
    global document_texts
    global vectorizer
    global document_vectors

    if (
        documents is not None
        and vectorizer is not None
        and document_vectors is not None
    ):
        return

    print("Building lightweight TF-IDF knowledge base...")

    documents = load_portfolio_documents()

    document_texts = [
        doc.page_content
        for doc in documents
    ]

    vectorizer = TfidfVectorizer(
        lowercase=True,
        stop_words="english",
        ngram_range=(1, 2),
        max_features=10000,
    )

    document_vectors = vectorizer.fit_transform(
        document_texts
    )

    print("TF-IDF knowledge base ready.")


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

        return f"""
        Abhishek Tiwari projects portfolio.
        Machine learning projects.
        Artificial intelligence projects.
        NLP projects.
        OCR projects.
        Recommendation system projects.
        AutoML projects.
        Project names, descriptions, technologies,
        features and purpose.

        User question:
        {question}
        """

    return question


# ============================================================
# RETRIEVE DOCUMENTS
# ============================================================

def retrieve_documents(question):

    ensure_knowledge_base()

    search_query = improve_query(question)

    query_vector = vectorizer.transform(
        [search_query]
    )

    similarities = cosine_similarity(
        query_vector,
        document_vectors
    )[0]

    ranked_indices = similarities.argsort()[::-1]

    selected_documents = []

    for index in ranked_indices[:RETRIEVAL_K]:

        # Ignore completely unrelated chunks
        if similarities[index] <= 0:
            continue

        selected_documents.append(
            documents[index]
        )

    print(
        f"Retrieved {len(selected_documents)} "
        f"relevant documents."
    )

    return selected_documents


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
================ CONTEXT ================

{context}

================ USER QUESTION ================

{question}

================ ANSWER ================

Answer the question directly using ONLY the
provided portfolio context.

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