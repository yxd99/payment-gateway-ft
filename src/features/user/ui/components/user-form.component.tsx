import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { userFormSchema } from '@features/user/ui/schemas/user-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/store';
import { setUser } from '@features/user/infrastructure/redux/user-slice';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LogIn } from 'lucide-react';

interface UserFormProps {
  className?: string;
  initialValues?: {
    email: string;
  };
}

export default function UserForm({
  className = '',
  initialValues,
}: UserFormProps) {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialValues,
  });

  const handleSubmit = async (values: z.infer<typeof userFormSchema>) => {
    dispatch(setUser(values));
    toast.success('User logged in!');
  };

  return (
    <Form {...form}>
      <form
        className={cn(className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='john@doe.com' type='email' {...field} />
              </FormControl>
              <FormDescription>This is the email of the user.</FormDescription>
            </FormItem>
          )}
        />
        <Button className='w-full mt-4' type='submit'>
          <LogIn />
          Login
        </Button>
      </form>
    </Form>
  );
}
