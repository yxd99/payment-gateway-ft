import { useProducts } from '@features/products/ui/hooks/use-products';
import ProductCard from '@features/products/ui/components/product-card.component';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { products, loading, error } = useProducts({ size: 2, page });

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (scrollTop + windowHeight === documentHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [page, loading]);

  return (
    <div className='w-full'>
      <h1 className='text-3xl font-bold text-center p-5 border-b-slate-600 border-b'>
        Products
      </h1>
      <div className='grid grid-cols-1 gap-4 m-5 md:grid-cols-3 lg:grid-cols-4'>
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
      {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>}
    </div>
  );
}
