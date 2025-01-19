import { Button } from '@/components/ui/button';
import { DeliveryInfoForm } from '../components/delivery-info-form.component';
import { PaymentInfoForm } from '../components/payment-info-form.component';
import { ProductInfo } from '../components/product-info.component';
import { useAppSelector } from '@/store';

export function SummaryPage() {
  const paymentInfo = useAppSelector((state) => state.checkout.paymentInfo);
  const deliveryInfo = useAppSelector((state) => state.checkout.deliveryInfo);

  return (
    <div className='flex flex-col gap-2 m-2'>
      <h1 className='text-2xl font-bold text-center border-b border-b-slate-200'>Summary</h1>
      <div className='flex flex-col gap-2'>
        <ProductInfo canEdit={false} />
        <PaymentInfoForm canEdit={false} initialValues={paymentInfo} />
        <DeliveryInfoForm canEdit={false} initialValues={deliveryInfo} />
      </div>
      <p className='text-sm text-slate-500 p-2'>
        When you click on the button, you are accepting the terms and conditions.
      </p>
      <Button className='w-full'>Pay</Button>
    </div>
  );
}
