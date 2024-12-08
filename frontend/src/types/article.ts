export interface Article {
  Title: string;
  Category: string;
  imagePath: string | null;
  Date_of_publication: string;
  Description: string | null;
  Latest: boolean;
}

export interface ArticleDetail extends Article {
  Content: string;
}

export type ArticlePreview = Omit<Article, 'Content'>;

export type Category = {
  id: string;
  name: string;
};