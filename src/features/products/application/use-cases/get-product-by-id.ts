import { Product } from "@features/products/core/product";
import { ProductRepository } from "@features/products/application/ports/product-repository";

export class GetProductById {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    return this.repository.getProductById(id);
  }
}