import { Button } from '@/components/ui/button';
import { DeliveryInfoForm } from '@features/checkout/ui/components/delivery-info-form.component';
import { PaymentInfoForm } from '@features/checkout/ui/components/payment-info-form.component';
import { ProductInfo } from '@features/checkout/ui/components/product-info.component';
import { useAppDispatch, useAppSelector } from '@/store';
import { useNavigate } from 'react-router';
import {
  useGetAcceptanceTokensQuery,
  useSubmitPaymentMutation,
} from '@features/checkout/infrastructure/redux/api-service';
import { toast } from 'sonner';
import { clearStore, setStageOfPayment } from '@features/checkout/infrastructure/redux/checkout-slice';
import { clearProductSelected } from '@features/products/infrastructure/redux/product-selected-slice';

export default function SummaryPage() {
  const navigate = useNavigate();
  const productInfo = useAppSelector((state) => state.productSelected);
  const paymentInfo = useAppSelector((state) => state.checkout.paymentInfo);
  const deliveryInfo = useAppSelector((state) => state.checkout.deliveryInfo);
  const dispatch = useAppDispatch();
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
      installments: Number(paymentInfo.installments),
      email: userInfo.email,
      acceptanceToken: acceptanceTokens.acceptanceToken,
      acceptPersonalAuth: acceptanceTokens.personalAuthToken,
      productQuantity: productInfo.quantity,
      deliveryInfo: {
        address: deliveryInfo.address,
        city: deliveryInfo.city,
        phone: deliveryInfo.phone,
        department: deliveryInfo.department, 
      },
    };

    try {
      await submitPayment(payload).unwrap();
      navigate(`/products/${productInfo.id}`);

      setTimeout(() => {
        dispatch(clearStore());
        dispatch(clearProductSelected())
        dispatch(setStageOfPayment(0));
      }, 1000);      
      toast.success('Payment sent!');
    } catch (error) {
      toast.error(`Something went wrong! ${error}`);
    }
  };

  const handleBack = () => {
      dispatch(setStageOfPayment(1));
  };

  return (
    <div className='flex flex-col gap-2 m-2 w-full'>
      <h1 className='text-2xl font-bold text-center border-b border-b-slate-200'>
        Summary
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <ProductInfo canEdit={false} />
        <PaymentInfoForm canEdit={false} initialValues={paymentInfo} />
        <DeliveryInfoForm
          className='md:col-span-2'
          canEdit={false}
          initialValues={deliveryInfo}
        />
      </div>
      <p className='text-sm text-slate-500 p-2'>
        When you click on the button, you are accepting the terms and
        conditions.
      </p>
      <Button onClick={handleBack} disabled={sendingPayment} variant='secondary'>
        Back
      </Button>
      <Button
        onClick={handleSubmitPayment}
        disabled={sendingPayment}
        className='w-full'
      >
        {sendingPayment ? 'Paying...' : 'Pay'}
      </Button>
    </div>
  );
}
