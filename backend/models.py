from sqlalchemy import Column, Integer, String, Text, Date
from database import Base

class TechArticle(Base):
    __tablename__ = "tech_articles"
    
    id = Column(Integer, primary_key=True, index=True)
    Title = Column(String(255), nullable=False)
    Category = Column(String(100), nullable=False)
    imagePath = Column(String(500))
    Date_of_publication = Column(Date, nullable=False)
    Description = Column(Text)
    Content = Column(Text, nullable=False)
