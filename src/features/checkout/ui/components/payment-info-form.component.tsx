import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Cards, { Focused } from 'react-credit-cards-2';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { paymentInfoSchema } from '@features/checkout/ui/schemas/payment-info.schema';
import DateInput from '@/components/input-date';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface PaymentInfoFormProps {
  canEdit?: boolean;
  initialValues?: {
    cardNumber: string;
    cvc: string;
    expirationDate: string;
    cardHolder: string;
    installments: number;
  };
}

export const PaymentInfoForm = forwardRef(
  ({ canEdit = true, initialValues }: PaymentInfoFormProps, ref) => {
    const form = useForm<z.infer<typeof paymentInfoSchema>>({
      resolver: zodResolver(paymentInfoSchema),
      defaultValues: {
        cardNumber: initialValues?.cardNumber || '',
        cvc: initialValues?.cvc || '',
        expirationDate: initialValues?.expirationDate || '',
        cardHolder: initialValues?.cardHolder || '',
        installments: initialValues?.installments || 1,
      },
    });
    const [focused, setFocused] = useState<Focused | undefined>(undefined);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(e.target.name as Focused);
    };

    useImperativeHandle(ref, () => ({
      validate: async () => {
        const isValid = await form.trigger();
        return isValid ? form.getValues() : null;
      },
    }));

    return (
      <Form {...form}>
        <Card>
          <CardHeader className='flex justify-between'>
            <h1 className='text-2xl font-bold'>Payment Info</h1>
          </CardHeader>
          <CardContent>
            <Cards
              cvc={form.watch('cvc')}
              expiry={form.watch('expirationDate')}
              number={form.watch('cardNumber')}
              name={form.watch('cardHolder')}
              focused={focused}
            />
            <form className='mt-4'>
              <FormField
                control={form.control}
                name='cardNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        onFocus={handleFocus}
                        readOnly={!canEdit}
                        placeholder='4242 4242 4242 4242'
                        maxLength={16}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name='cvc'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input
                          onFocus={handleFocus}
                          readOnly={!canEdit}
                          placeholder='123'
                          type='password'
                          maxLength={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='expirationDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration Date</FormLabel>
                      <FormControl>
                        <DateInput
                          onFocus={handleFocus}
                          readOnly={!canEdit}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='installments'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Installments</FormLabel>
                      <FormControl>
                        <Input
                          onFocus={handleFocus}
                          readOnly={!canEdit}
                          placeholder='1'
                          min={1}
                          type='number'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='cardHolder'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Holder</FormLabel>
                    <FormControl>
                      <Input
                        onFocus={handleFocus}
                        readOnly={!canEdit}
                        placeholder='John Doe'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </CardContent>
        </Card>
      </Form>
    );
  }
);
