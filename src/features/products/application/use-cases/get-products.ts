import { Product } from "../../core/product";
import { ProductRepository } from "../ports/product-repository";

export class GetProducts {
  constructor(private readonly repository: ProductRepository) {}

  async execute(size: number, page: number): Promise<Product[]> {
    return this.repository.getProducts(size, page);
  }
}