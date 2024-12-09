# Tech News Articles Platform

A modern, full-stack web application for managing and displaying technical articles with dynamic filtering capabilities. Built with React, TypeScript, FastAPI, and MySQL.

![Tech News Platform](frontend/public/technews.jpg)

## 🚀 Features

- **Dynamic Article Management**
  - Filter articles by categories
  - Detailed article view
  - Real-time category filtering

- **Modern UI/UX**
  - Responsive design
  - Smooth animations
  - Interactive filters
  - Clean and intuitive interface

- **Robust Backend**
  - FastAPI for high performance
  - SQLAlchemy ORM
  - Efficient database queries
  - Image handling system

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend
- FastAPI
- SQLAlchemy
- MySQL
- Python 3.8+

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- MySQL Server
- Git

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project
```

### 2. Backend Setup

#### Create and Activate Virtual Environment
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/MacOS
python3 -m venv venv
source venv/bin/activate
```

#### Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Configure Database
1. Create a MySQL database
2. Update database configuration in `backend/database.py`
3. Run SQL setup script:
```bash
mysql -u your_username -p your_database < backend/helpers/SQL.sql
```

#### Start Backend Server
```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup

#### Install Frontend Dependencies
```bash
cd frontend
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```

## 🌐 Usage

1. Access the application at `http://localhost:5173`
2. Browse articles by category using the top navigation
3. Click on articles to view details

## 📁 Project Structure

```
project/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── crud.py           # Database operations
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   └── database.py       # Database configuration
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx       # Main application
│   └── public/           # Static assets
└── README.md
```

## 🔑 API Endpoints

- `GET /articles` - Get all articles
- `GET /articles/categories` - Get unique categories
- `GET /articles/category` - Filter articles by category
- `GET /articles/detail` - Get article details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- FastAPI for the excellent backend framework
- React team for the frontend library
- Tailwind CSS for the styling system
- All contributors who helped shape this project
