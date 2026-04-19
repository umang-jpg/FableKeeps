from fastapi import APIRouter, Depends
from app.schemas import Keep, KeepResponse
from app.models import Keep as KeepModel
from app.database import get_db
from sqlalchemy.orm import Session
from datetime import datetime

router = APIRouter(prefix="/keeps", tags=["keeps"])



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


@router.get("/",response_model=list[KeepResponse])
def get_all_keeps(db:Session = Depends(get_db)):
    return db.query(KeepModel).all()


@router.get("/{id}", response_model=KeepResponse)
def get_keep_by_id(id:int, db:Session = Depends(get_db)):
    keep = db.query(KeepModel).filter(KeepModel.id == id).first()
    if not keep:
        return{"message":"not found"}
    
    return keep

@router.delete("/{id}")
def delete_keep(id:int, db:Session = Depends(get_db)):

    keep = db.query(KeepModel).filter(KeepModel.id == id).first()
    if not keep:
        return {"message":"not found"}
    
    db.delete(keep)
    db.commit()

    return {"message":"keep deleted"}


