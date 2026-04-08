from fastapi import APIRouter

router = APIRouter(prefix="/keeps", tags=["keeps"])

@router.get("/")
async def get_keep():
    return {"message": "helloooooo"}
#helloworld
