from fastapi import FastAPI
from .app.routes import keeps

app = FastAPI()

app.include_router(keeps.router)


@app.get("/")
def root():
    return {"message": "root working"}