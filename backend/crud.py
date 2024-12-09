from sqlalchemy.orm import Session
from models import TechArticle

# Fetch all TechArticles with optional filtering
def get_all_TechArticles(db: Session):
    return db.query(TechArticle).all()

# Fetch TechArticle by title and description
def get_TechArticle_by_title_and_description(db: Session, title: str, description: str):
    return db.query(TechArticle).filter(
        TechArticle.Title == title,
        TechArticle.Description == description
    ).first()

# Fetch TechArticles by categories
def get_TechArticles_by_category(db: Session, category: str):
    return db.query(TechArticle).filter(TechArticle.Category == category).order_by(TechArticle.Date_of_publication.desc()).all()

# Fetch all unique categories
def get_all_categories(db: Session):
    categories = db.query(TechArticle.Category).distinct().all()
    return [category[0] for category in categories]
