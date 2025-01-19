import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Cards, { Focused } from 'react-credit-cards-2';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { paymentInfoSchema } from '../schemas/payment-info.schema';
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
    email: string;
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
        email: initialValues?.email || '',
      },
    });
    const [focused, setFocused] = useState<Focused | undefined>(undefined);

    const handleSubmit = async (
      values: z.infer<typeof paymentInfoSchema>
    ) => {
      console.log(values);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(e.target.name as Focused);
    };

    useImperativeHandle(ref, () => ({
      validate: async () => {
        const isValid = await form.trigger();
        console.log({ isValid });
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
            <form className='mt-4' onSubmit={form.handleSubmit(handleSubmit)}>
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
                        maxLength={19}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the card number where the payment will be made.
                    </FormDescription>
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
                      <FormDescription>
                        This is the card security code.
                      </FormDescription>
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
                      <FormDescription>
                        This is the expiration date of the card.
                      </FormDescription>
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
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the number of installments.
                      </FormDescription>
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
                    <FormDescription>
                      This is the name of the card holder.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        readOnly={!canEdit}
                        placeholder='john.doe@example.com'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the email of the customer.
                    </FormDescription>
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
