from sqlalchemy.orm import Session
from models import TechArticle

# Fetch all TechArticles with optional filtering
def get_all_TechArticles(db: Session):
    query = db.query(TechArticle)
    return query.all()

# Fetch TechArticle by title and description
def get_TechArticle_by_title_and_description(db: Session, title: str, description: str):
    return db.query(TechArticle).filter(TechArticle.Title == title, TechArticle.Description == description).first()
# Fetch all categories
def get_all_categories(db: Session):
    categories = db.query(TechArticle.Category).distinct().all()
    return [category[0] for category in categories]

# Fetch TechArticles by category
def get_TechArticles_by_category(db: Session, category: str):
    return db.query(TechArticle).filter(TechArticle.Category == category).order_by(TechArticle.Date_of_publication.desc()).all()

# Fetch TechArticles by categories and by latest or popular
def get_TechArticles_by_category_and_by_latest_or_popular(db: Session, category: str, latest_or_popular: bool):
    return db.query(TechArticle).filter(TechArticle.Category == category, TechArticle.Latest == latest_or_popular).all()
