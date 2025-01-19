import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { useAppDispatch } from '@store/index';
import { setProductSelected } from '@/features/products/infrastructure/redux/product-selected-slice';
import { setStageOfPayment } from '@/features/checkout/infrastructure/redux/checkout-slice';

interface ProductDetailProps {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  stock: number;
}

export function ProductDetail({
  id,
  imageUrl,
  name,
  price,
  stock,
}: ProductDetailProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBuy = () => {
    dispatch(
      setProductSelected({ id, name, price, imageUrl, stock, quantity: 1 })
    );
    dispatch(setStageOfPayment(1));
    
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
        <div className='flex gap-2'>
          <p className='text-lg'>{formatCurrency(price)} per unit</p>
          {'-'}
          <p className='text-lg'>{stock} in stock</p>
        </div>
          <Button className='w-full mt-4 px-4 py-2' onClick={handleBuy}>
            Buy
          </Button>
      </div>
    </div>
  );
}
