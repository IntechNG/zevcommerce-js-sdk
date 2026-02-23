import { ZevClient } from '../client';
import { PaginationMeta } from '../types';

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string | null;
}

export interface Blog {
  id: string;
  title: string;
  handle: string;
  articleCount: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  author: string | null;
  publishedAt: string;
}

export class ContentClient {
  constructor(private client: ZevClient) { }

  public async getPages() {
    const query = `
      query Pages {
        pages {
          id
          title
          slug
          content
        }
      }
    `;
    const response = await this.client.request<{ pages: Page[] }>(query);
    return response.pages;
  }

  public async getPage(slug: string) {
    const query = `
      query Page($slug: String!) {
        page(slug: $slug) {
          id
          title
          slug
          content
        }
      }
    `;
    const response = await this.client.request<{ page: Page }>(query, { slug });
    return response.page;
  }

  public async getBlogs() {
    const query = `
      query Blogs {
        blogs {
          id
          title
          handle
          articleCount
        }
      }
    `;
    const response = await this.client.request<{ blogs: Blog[] }>(query);
    return response.blogs;
  }

  public async getArticles(params?: { blogHandle?: string; page?: number; limit?: number }) {
    const query = `
      query Articles($blogHandle: String, $page: Int, $limit: Int) {
        articles(blogHandle: $blogHandle, page: $page, limit: $limit) {
          id
          title
          slug
          excerpt
          image
          author
          publishedAt
        }
      }
    `;
    const response = await this.client.request<{ articles: Article[] }>(query, params);
    return response.articles;
  }

  public async getArticlesConnection(params?: { first?: number; after?: string; blogHandle?: string }) {
    const query = `
      query ArticlesConnection($first: Int, $after: String, $blogHandle: String) {
        articlesConnection(first: $first, after: $after, blogHandle: $blogHandle) {
          edges {
            cursor
            node {
              id
              title
              slug
              publishedAt
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;
    const response = await this.client.request<{
      articlesConnection: import('../types').RelayConnection<{ id: string; title: string; slug: string; publishedAt: string }>;
    }>(query, params);
    return response.articlesConnection;
  }
}
