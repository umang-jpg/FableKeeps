from fastapi import APIRouter

router = APIRouter(prefix="/keeps", tags=["keeps"])

@router.get("/")
async def create_keep():
    return {"message": "helloooooo"}
#helloworld
