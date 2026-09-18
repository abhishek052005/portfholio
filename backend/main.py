import logging

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from rag_system import ask_rag


app = FastAPI(title="Abhishek Portfolio RAG API")
logger = logging.getLogger(__name__)


class QuestionRequest(BaseModel):
    question: str


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/ask")
def ask(request: QuestionRequest) -> dict[str, str]:
    question = request.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="A question is required.")

    try:
        return {"answer": ask_rag(question)}
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error
    except Exception as error:
        logger.exception("RAG request failed")
        raise HTTPException(status_code=500, detail=f"RAG backend error: {error}") from error