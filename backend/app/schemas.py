from pydantic import BaseModel,StringConstraints
from typing import Optional
from typing import Annotated
from datetime import datetime

class Keep(BaseModel):
    content: Annotated[str,StringConstraints(min_length = 1,strip_whitespace =True)]
    title: Annotated[str,StringConstraints(min_length=1,strip_whitespace = True,max_length=100)]
   
class KeepResponse(Keep):
    id:int
    title:str
    content:str
    created_at: datetime
    

