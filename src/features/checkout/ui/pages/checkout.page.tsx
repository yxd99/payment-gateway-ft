import { PaymentInfoForm } from '@features/checkout/ui/components/payment-info-form.component';
import { DeliveryInfoForm } from '@features/checkout/ui/components/delivery-info-form.component';
import { ProductInfo } from '@features/checkout/ui/components/product-info.component';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import {
  setDeliveryInfo,
  setPaymentInfo,
  setStageOfPayment,
} from '@features/checkout/infrastructure/redux/checkout-slice';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store';
import { useNavigate } from 'react-router';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const paymentFormRef = useRef<HTMLFormElement>();
  const deliveryFormRef = useRef<HTMLFormElement>();
  const dispatch = useAppDispatch();
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
      <h1 className='text-2xl font-bold border-b-slate-300 border-b mb-4'>
        Checkout
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <ProductInfo />
        <PaymentInfoForm initialValues={paymentInfo} ref={paymentFormRef} />
        <DeliveryInfoForm
          initialValues={deliveryInfo}
          className='md:col-span-2'
          ref={deliveryFormRef}
        />
      </div>
      <div className='flex justify-end items-center gap-2 mt-4'>
        <Button variant='secondary' onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button onClick={handleGoPay}>Go Pay</Button>
      </div>
    </div>
  );
}
