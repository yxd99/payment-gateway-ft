import { NavLink, useParams } from 'react-router';
import { useProductById } from '../hooks/use-product';
import { formatCurrency } from '@/lib/utils';
import { MoveLeft } from 'lucide-react';

export function ProductDetail() {
  const { id } = useParams();

  const { product, error, loading } = useProductById(id!);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center px-2 border-b-slate-600 border-b mb-4'>
        <NavLink to='/' className='text-2xl font-bold'>
          <MoveLeft />
        </NavLink>
        <h1 className='text-3xl font-bold text-center p-5 w-full'>
          Product Detail
        </h1>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      {product && (
        <>
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className='size-full max-h-[40rem] object-cover'
            />
          </div>
          <div>
            <h2 className='text-xl font-bold'>{product.name}</h2>
            <p className='text-lg'>{formatCurrency(product.price)}</p>
          </div>
        </>
      )}
    </div>
  );
}
