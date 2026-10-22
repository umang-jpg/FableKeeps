from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app import models
from app.routes import keeps

app = FastAPI()

app.add_middleware(CORSMiddleware,
allow_origins = ["http://localhost:5173"],
allow_methods = ["*"],
allow_headers = ["*"],
)
app.include_router(keeps.router)
models.Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "root working"}