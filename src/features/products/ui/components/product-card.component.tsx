import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { formatCurrency } from '@/lib/utils';
import { forwardRef } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ id, name, price, imageUrl, stock }, ref) => {
    const navigate = useNavigate();
    const inStock = stock > 0;

    const handleClick = () => {
      navigate(`/products/${id}`);
    };

    return (
      <Card ref={ref} className='size-full overflow-hidden'>
        <CardHeader className='p-0'>
          <div className='relative h-64 w-full border-gray-200 border-b'>
            <img
              src={imageUrl}
              alt={name}
              className='fill-current object-cove size-full'
            />
            <Badge
              className='absolute top-2 left-2'
              variant={inStock ? 'secondary' : 'secondary'}
            >
              {inStock ? 'En stock' : 'Agotado'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='p-4'>
          <div className='flex justify-between items-start'>
            <CardTitle className='text-xl font-bold truncate'>{name}</CardTitle>
          </div>
          <p className='text-lg'>{formatCurrency(price)}</p>
        </CardContent>
        <CardFooter className='p-4 pt-0'>
          <Button onClick={handleClick} className='w-full' disabled={!inStock}>
            {inStock ? 'Ver' : 'Fuera de stock'}
          </Button>
        </CardFooter>
      </Card>
    );
  }
);
