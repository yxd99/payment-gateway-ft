import { Product } from "@features/products/core/product";
import { ProductRepository } from "@features/products/application/ports/product-repository";
import { Pagination } from "../ports/pagination";

export class GetProducts {
  constructor(private readonly repository: ProductRepository) {}

  async execute(pagination: Pagination): Promise<Product[]> {
    return this.repository.getProducts(pagination);
  }
}