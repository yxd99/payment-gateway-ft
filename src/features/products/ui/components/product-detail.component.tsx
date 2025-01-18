import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { useAppDispatch } from '@store/index';
import { setProductSelected } from '@features/products/ui/redux/product-selected-slice';

interface ProductDetailProps {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

export function ProductDetail({ id, imageUrl, name, price }: ProductDetailProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBuy = () => {
    dispatch(setProductSelected({ id, name, price, imageUrl }));
    navigate('/checkout');
  };

  return (
    <div className='flex flex-col gap-2'>
      <div>
        <img
          src={imageUrl}
          alt={name}
          className='size-full max-h-[40rem] object-cover'
        />
      </div>
      <div>
        <h2 className='text-xl font-bold'>{name}</h2>
        <p className='text-lg'>{formatCurrency(price)}</p>
        <Button
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={handleBuy}
        >
          Comprar
        </Button>
      </div>
    </div>
  );
}
