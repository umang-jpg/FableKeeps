from fastapi import APIRouter, Depends
from app.schemas import Keep, KeepResponse
from app.models import Keep as KeepModel
from app.database import get_db
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import HTTPException


router = APIRouter(prefix="/keeps", tags=["keeps"])


#create keep endpoint
@router.post("/", response_model=KeepResponse)
def create_keep(keep:Keep,db:Session = Depends(get_db)):
    
    new_keep = KeepModel(
        title=keep.title,
        content=keep.content,
        created_at=datetime.now()
    )

    db.add(new_keep)
    db.commit()
    db.refresh(new_keep)

    return new_keep

#get all keeps
@router.get("/",response_model=list[KeepResponse])
def get_all_keeps(db:Session = Depends(get_db)):
    return db.query(KeepModel).limit(10).all()

#get keep by id
@router.get("/{id}", response_model=KeepResponse)
def get_keep_by_id(id:int, db:Session = Depends(get_db)):
    keep = db.query(KeepModel).filter(KeepModel.id == id).first()
    if not keep:
        raise HTTPException(status_code = 404, detail = "keep not found")
    
    return keep

#delete keep 
@router.delete("/{id}")
def delete_keep(id:int, db:Session = Depends(get_db)):

    keep = db.query(KeepModel).filter(KeepModel.id == id).first()
    if not keep:
        raise HTTPException (status_code = 404,detail = "keep not found")
    
    db.delete(keep)
    db.commit()

    return {"message":"keep deleted"}

#update keep 
@router.put("/{id}",response_model = KeepResponse)
def update_keep(id:int,keep:Keep,db:Session=Depends(get_db)):

    
    existing = db.query(KeepModel).filter(KeepModel.id == id).first()
    if not existing :
        raise HTTPException(status_code = 404,detail = "keep not found")
        
    
    existing.title = keep.title
    existing.content = keep.content
    
    db.commit()
    db.refresh(existing)

    return existing

    

    
        

