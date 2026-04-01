from fastapi import FastAPI
from routes import keeps

app = FastAPI()

app.include_router(keeps.router)


@app.get("/")
def root():
    return {"message": "root working"}