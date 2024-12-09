import axios from 'axios';
import { Article, ArticleDetail } from '../types/article';

const API_BASE_URL = 'http://localhost:8000';

const api = {
  getAllArticles: async (): Promise<Article[]> => {
    try {
      console.log('Fetching all articles...');
      const response = await axios.get(`${API_BASE_URL}/articles`);
      console.log('Articles received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  },

  getArticlesByCategory: async (category: string): Promise<Article[]> => {
    try {
      console.log('Fetching articles for category:', category);
      const response = await axios.get(`${API_BASE_URL}/articles/category`, {
        params: { category }
      });
      console.log('Category articles received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      return [];
    }
  },

  getArticleDetail: async (title: string, description: string): Promise<ArticleDetail | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/detail`, {
        params: { title, description }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching article detail:', error);
      return null;
    }
  },

  getCategories: async (): Promise<string[]> => {
    try {
      console.log('Fetching categories...');
      const response = await axios.get(`${API_BASE_URL}/articles/categories`);
      console.log('Categories received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
};

export { api };
