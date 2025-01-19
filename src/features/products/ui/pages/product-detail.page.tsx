import { NavLink, useParams } from 'react-router';
import { ProductDetail } from '@features/products/ui/components/product-detail.component';
import { useProductById } from '@features/products/ui/hooks/use-product-by-id';
import { MoveLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();

  const { product, error, loading } = useProductById(id!);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='flex flex-col p-5 w-full'>
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
      {product && <ProductDetail {...product} />}
    </div>
  );
}
