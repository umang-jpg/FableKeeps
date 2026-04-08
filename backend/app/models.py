from sqlalchemy import Column, Integer, String, Text, DateTime
from .database import Base

from datetime import datetime, timezone


class Keep(Base):
    __tablename__ = "keeps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
