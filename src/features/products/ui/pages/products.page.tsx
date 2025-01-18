import { useProducts } from "../hooks/use-products";
import ProductCard from "../components/product-card.component";

export function ProductsPage() {
  const { products, loading, error } = useProducts(3, 1);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center p-5 border-b-slate-600 border-b">Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="grid grid-cols-1 gap-4 m-5 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
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