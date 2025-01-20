import { ProductCard} from '@features/products/ui/components/product-card.component';
import { useEffect, useRef, useState } from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useProducts } from '../hooks/use-products';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { isFetching, isLoading, products, hasMore } = useProducts({ size: 15, page });
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
      { threshold: 0.1 }
    );
  
    const currentRef = lastCardRef.current;
  
    if (currentRef) {
      observer.observe(currentRef);
    }
  
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoading, products, hasMore, isFetching]);

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
