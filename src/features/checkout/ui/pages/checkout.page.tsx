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
import { setDeliveryInfo, setPaymentInfo, setStageOfPayment } from '../../infrastructure/redux/checkout-slice';
import { toast } from 'sonner';
import { useAppSelector } from '@/store';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const paymentFormRef = useRef<any>();
  const deliveryFormRef = useRef<any>();
  const dispatch = useDispatch();
  const paymentInfo = useAppSelector((state) => state.checkout.paymentInfo);
  const deliveryInfo = useAppSelector((state) => state.checkout.deliveryInfo);

  const handleGoPay = async () => {
    const paymentInfo = await paymentFormRef.current?.validate();
    const deliveryInfo = await deliveryFormRef.current?.validate();

    if (paymentInfo && deliveryInfo) {
      dispatch(setPaymentInfo(paymentInfo));
      dispatch(setDeliveryInfo(deliveryInfo));
      dispatch(setStageOfPayment(2));
    } else {
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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <ProductInfo />
            <PaymentInfoForm initialValues={paymentInfo} ref={paymentFormRef} />
            <DeliveryInfoForm
              initialValues={deliveryInfo}
              className='col-span-2'
              ref={deliveryFormRef}
            />
          </div>
        </CardContent>
        <CardFooter className='flex justify-end gap-2'>
          <Button onClick={() => navigate('/')} variant='secondary'>
            Cancel
          </Button>
          <Button onClick={handleGoPay}>Go Pay</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
