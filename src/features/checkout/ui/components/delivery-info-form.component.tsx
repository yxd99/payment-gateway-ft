import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { deliveryInfoSchema } from '../schemas/delivery-info.schema';
import { forwardRef, useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';

type DeliveryInfoFormProps = {
  className?: string;
  canEdit?: boolean;
  initialValues?: {
    address: string;
    city: string;
    state: string;
    phone: string;
  };
};

export const DeliveryInfoForm = forwardRef(
  ({ canEdit = true, initialValues, className = '' }: DeliveryInfoFormProps, ref) => {
    const form = useForm<z.infer<typeof deliveryInfoSchema>>({
      resolver: zodResolver(deliveryInfoSchema),
      defaultValues: {
        address: initialValues?.address || '',
        city: initialValues?.city || '',
        state: initialValues?.state || '',
        phone: initialValues?.phone || '',
      },
    });

    useImperativeHandle(ref, () => ({
      validate: async () => {
        const isValid = await form.trigger();
        return isValid ? form.getValues() : null;
      },
    }));

    return (
      <Form {...form}>
        <Card className={cn(className)}>
          <CardHeader className='flex justify-between'>
            <h1 className='text-2xl font-bold'>Delivery Info</h1>
          </CardHeader>
          <CardContent>
            <form>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        readOnly={!canEdit}
                        placeholder='3123456789'
                        type='tel'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the phone number of the delivery location.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        readOnly={!canEdit}
                        placeholder='Street Address'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the street address of the delivery location.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-2 gap-2'>
                <FormField
                  control={form.control}
                  name='city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!canEdit}
                          placeholder='Medellín'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the city of the delivery location.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='state'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!canEdit}
                          placeholder='Antioquia'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the state of the delivery location.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </Form>
    );
  }
);
