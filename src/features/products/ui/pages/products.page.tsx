import { useProducts } from "../hooks/use-products";
import { ProductCard } from "../components/product-card.component";

export function ProductsPage() {
  const { products, loading, error } = useProducts(3, 1);

  return (
    <div className="products-page">
      <h1>Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            stock={product.stock}
          />
        ))}
      </div>
    </div>
  );
};