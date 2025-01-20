import { useNavigate, useParams } from 'react-router';
import { ProductDetail } from '@features/products/ui/components/product-detail.component';
import { MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductById } from '@features/products/application/use-cases/get-product-by-id';
import Loading from '@/components/loading';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, isLoading } = getProductById(id!);

  const handleBack = () => {
    navigate(-1);
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='flex flex-col p-5 w-full'>
      <div className='flex items-center px-2 border-b-slate-600 border-b mb-4'>
        <Button variant='ghost' onClick={handleBack} className='text-2xl font-bold'>
          <MoveLeft />
        </Button>
        <h1 className='text-3xl font-bold text-center p-5 w-full'>
          Product Detail
        </h1>
      </div>
      {isLoading && <Loading />}
      {product && <ProductDetail {...product} />}
      {!product && !isLoading && <p className='error'>Product not found</p>}
    </div>
  );
}
