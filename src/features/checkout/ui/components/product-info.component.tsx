import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { setProductQuantity } from '@/features/products/ui/redux/product-selected-slice';
import { formatCurrency } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store';

interface ProductInfoProps {
  canEdit?: boolean;
}

export function ProductInfo({ canEdit = true }: ProductInfoProps) {
  const product = useAppSelector((state) => state.productSelected);
  const dispatch = useAppDispatch();

  const handleDecrement = () => {
    dispatch(setProductQuantity(product.quantity - 1));
  };

  const handleIncrement = () => {
    dispatch(setProductQuantity(product.quantity + 1));
  };

  return (
    <Card>
      <CardHeader className='flex justify-between'>
        <h1 className='text-2xl font-bold'>Product Info</h1>
      </CardHeader>
      <CardContent>
        <div className='flex gap-2'>
          <div className='w-1/2'>
            <img
              src={product.imageUrl}
              alt={product.name}
              className='object-cover rounded-lg'
            />
          </div>
          <div className='flex gap-2 justify-center flex-col'>
            <h2 className='text-xl font-bold'>{product.name}</h2>
            <p className='text-sm'>{formatCurrency(product.price)}</p>
            <div className='w-full flex'>
              {canEdit && <Button className='rounded-r-none' onClick={handleDecrement}>-</Button>}
              <Input className='w-full rounded-none text-center' type='number' placeholder='Qty' value={product.quantity} />
              {canEdit && <Button className='rounded-l-none' onClick={handleIncrement}>+</Button>}
            </div>
            <p className='text-sm text-end'>Total: {formatCurrency(product.price * product.quantity)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
