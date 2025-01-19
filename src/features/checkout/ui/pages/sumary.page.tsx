import { Button } from '@/components/ui/button';
import { DeliveryInfoForm } from '../components/delivery-info-form.component';
import { PaymentInfoForm } from '../components/payment-info-form.component';
import { ProductInfo } from '../components/product-info.component';
import { useAppSelector } from '@/store';
import { useNavigate } from 'react-router';
import {
  useGetAcceptanceTokensQuery,
  useSubmitPaymentMutation,
} from '../../infrastructure/redux/api-service';
import { toast } from 'sonner';
import { clearStore } from '../../infrastructure/redux/checkout-slice';

export default function SummaryPage() {
  const navigate = useNavigate();
  const productInfo = useAppSelector((state) => state.productSelected);
  const paymentInfo = useAppSelector((state) => state.checkout.paymentInfo);
  const deliveryInfo = useAppSelector((state) => state.checkout.deliveryInfo);
  const userInfo = useAppSelector((state) => state.user); 
  const [submitPayment, { isLoading: sendingPayment }] =
    useSubmitPaymentMutation();
  const { data: acceptanceTokens } = useGetAcceptanceTokensQuery();

  const handleSubmitPayment = async () => {
    if (!acceptanceTokens) {
      toast.error('Something went wrong! Please try again later.');
      return;
    }
    const payload = {
      cardNumber: paymentInfo.cardNumber,
      cvc: paymentInfo.cvc,
      expirationDate: paymentInfo.expirationDate,
      cardHolder: paymentInfo.cardHolder,
      productId: productInfo.id,
      installments: paymentInfo.installments,
      email: userInfo.email,
      acceptanceToken: acceptanceTokens.acceptanceToken,
      acceptPersonalAuth: acceptanceTokens.personalAuthToken,
      productQuantity: productInfo.quantity,
      deliveryInfo: {
        address: deliveryInfo.address,
        city: deliveryInfo.city,
        phone: deliveryInfo.phone,
        state: deliveryInfo.state,
      },
    };

    try {
      await submitPayment(payload).unwrap();
      clearStore();
      navigate(`/products/${productInfo.id}`);
    } catch (error) {
      console.log({ error });
      toast.error(`Something went wrong! ${error}`);
    }
  };

  return (
    <div className='flex flex-col gap-2 m-2'>
      <h1 className='text-2xl font-bold text-center border-b border-b-slate-200'>
        Summary
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <ProductInfo canEdit={false} />
        <PaymentInfoForm canEdit={false} initialValues={paymentInfo} />
        <DeliveryInfoForm
          className='col-span-2'
          canEdit={false}
          initialValues={deliveryInfo}
        />
      </div>
      <p className='text-sm text-slate-500 p-2'>
        When you click on the button, you are accepting the terms and
        conditions.
      </p>
      <Button onClick={() => navigate(-1)} variant='secondary'>
        Back
      </Button>
      <Button
        onClick={handleSubmitPayment}
        disabled={sendingPayment}
        className='w-full'
      >
        {sendingPayment ? 'Sending...' : 'Pay'}
      </Button>
    </div>
  );
}
