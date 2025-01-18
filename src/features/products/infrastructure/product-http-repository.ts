import { Product } from "../core/product";
import { ProductRepository } from "../application/ports/product-repository";
import { httpClient } from "@/infrastructure/http-client";

export class ProductHttpRepository implements ProductRepository {
  private readonly baseUrl = "/products";

  async getProducts(size: number, page: number): Promise<Product[]> {
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
}
