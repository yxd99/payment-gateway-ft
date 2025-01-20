import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { deliveryInfoSchema } from '@features/checkout/ui/schemas/delivery-info.schema';
import { forwardRef, useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';

type DeliveryInfoFormProps = {
  className?: string;
  canEdit?: boolean;
  initialValues?: {
    address: string;
    city: string;
    department: string;
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
        department: initialValues?.department || '',
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='department'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!canEdit}
                          placeholder='Antioquia'
                          {...field}
                        />
                      </FormControl>
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
