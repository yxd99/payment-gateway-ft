import { PaymentInfoForm } from '../components/payment-info-form.component';
import { DeliveryInfoForm } from '../components/delivery-info-form.component';
import { ProductInfo } from '../components/product-info.component';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setDeliveryInfo, setPaymentInfo } from '../../redux/checkout-slice';
import { toast } from 'sonner';

export function CheckoutPage() {
  const navigate = useNavigate();
  const paymentFormRef = useRef<any>();
  const deliveryFormRef = useRef<any>();
  const dispatch = useDispatch();

  const handleGoPay = async () => {
    const paymentInfo = await paymentFormRef.current?.validate();
    const deliveryInfo = await deliveryFormRef.current?.validate();

    if (paymentInfo && deliveryInfo) {
      dispatch(setPaymentInfo(paymentInfo));
      dispatch(setDeliveryInfo(deliveryInfo));

      navigate('/summary');
    } else {
      console.log({ paymentInfo, deliveryInfo });
      toast.error('Please complete all required fields!');
    }
  };

  return (
    <div className='p-2'>
      <Card className='m-2'>
        <CardHeader className='flex justify-between'>
          <h1 className='text-2xl font-bold border-b-slate-300 border-b'>
            Checkout
          </h1>
        </CardHeader>
        <CardContent>
          <ProductInfo />
          <PaymentInfoForm ref={paymentFormRef} />
          <DeliveryInfoForm ref={deliveryFormRef} />
          <p className='text-sm text-slate-500 p-2'>
            When you click on the button, you are accepting the terms and
            conditions.
          </p>
        </CardContent>
        <CardFooter className='flex justify-end'>
          <Button onClick={handleGoPay}>Go Pay</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
