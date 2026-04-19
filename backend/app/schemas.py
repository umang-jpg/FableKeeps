from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Keep(BaseModel):
    content: str
    title: str
   
class KeepResponse(Keep):
    id:int
    title:str
    content:str
    created_at: datetime
    

