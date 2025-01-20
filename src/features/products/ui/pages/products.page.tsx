import { ProductCard} from '@features/products/ui/components/product-card.component';
import { useEffect, useRef, useState } from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { getProducts } from '../../application/use-cases/get-products';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { isFetching, isLoading, products, hasMore } = getProducts({ size: 15, page });
  const { open } = useSidebar();
  const lastCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isFetching) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: .1 }
    );

    if (lastCardRef.current) {
      observer.observe(lastCardRef.current);
    }

    return () => {
      if (lastCardRef.current) {
        observer.unobserve(lastCardRef.current);
      }
    };
  }, [isLoading, products]);

  return (
    <div className='w-full'>
      <h1 className='text-3xl font-bold text-center p-5 border-b-slate-600 border-b'>
        Products
      </h1>
      <div
        className={cn(
          'grid grid-cols-1 gap-4 m-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
          {
            'md:grid-cols-2 lg:grid-cols-3': open,
          }
        )}
      >
        {products.map((product, index) => (
          <ProductCard
            ref={index === products.length - 1 ? lastCardRef : null}
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
}
