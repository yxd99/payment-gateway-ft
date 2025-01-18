import { Product } from "@features/products/core/product";
import { ProductRepository } from "@features/products/application/ports/product-repository";
import { httpClient } from "@/infrastructure/http-client";
import { Pagination } from "../application/ports/pagination";

export class ProductHttpRepository implements ProductRepository {
  private readonly baseUrl = "/products";

  async getProducts({ size, page }: Pagination): Promise<Product[]> {
    const response = await httpClient.get<Product[]>(`${this.baseUrl}?size=${size}&page=${page}`);
    return response.map(
      (item: Product) =>
        new Product(
          item.id,
          item.name,
          item.price,
          item.imageUrl,
          item.stock
        )
    );
  }

  async getProductById(id: string): Promise<Product> {
    const response = await httpClient.get<Product>(`${this.baseUrl}/${id}`);
    return new Product(
      response.id,
      response.name,
      response.price,
      response.imageUrl,
      response.stock
    );
  }
}
