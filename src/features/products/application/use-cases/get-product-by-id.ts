import { Product } from "../../core/product";
import { ProductRepository } from "../ports/product-repository";

export class GetProductById {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    return this.repository.getProductById(id);
  }
}