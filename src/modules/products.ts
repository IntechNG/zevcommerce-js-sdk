import { ZevClient } from '../client';
import { Product, PaginationMeta } from '../types';

export class ProductsClient {
  constructor(private client: ZevClient) { }

  /**
   * Fetch a paginated list of products.
   */
  public async list(params?: { page?: number; limit?: number }) {
    const query = `
      query GetProducts($page: Int, $limit: Int) {
        products(page: $page, limit: $limit) {
          data {
            id
            title
            slug
            description
            mediaJson
            variants {
              id
              title
              price
              compareAtPrice
              sku
            }
          }
          meta {
            total
            page
            limit
            totalPages
          }
        }
      }
    `;

    const response = await this.client.request<{
      products: { data: Product[]; meta: PaginationMeta };
    }>(query, params);

    return response.products;
  }

  /**
   * Fetch a single product by its slug.
   */
  public async getBySlug(slug: string) {
    const query = `
      query GetProduct($slug: String!) {
        product(slug: $slug) {
          id
          title
          slug
          description
          mediaJson
          variants {
            id
            title
            price
            compareAtPrice
            sku
          }
        }
      }
    `;

    const response = await this.client.request<{ product: Product }>(query, { slug });
    return response.product;
  }

  /**
   * Fetch a paginated cursor connection of products (Relay standard).
   */
  public async listConnection(params?: { first?: number; after?: string }) {
    const query = `
      query ProductsConnection($first: Int, $after: String) {
        productsConnection(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              title
              slug
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
      productsConnection: import('../types').RelayConnection<{ id: string; title: string; slug: string }>;
    }>(query, params);

    return response.productsConnection;
  }
}
