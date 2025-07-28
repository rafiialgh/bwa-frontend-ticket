import { cn, SESSION_KEY } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  login,
  loginSchema,
  type LoginValues,
} from '@/services/auth/auth.service';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'admin',
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: LoginValues) => login(data),
  });

  const navigate = useNavigate();

  const onSubmit = async (val: LoginValues) => {
    try {
      const response = await mutateAsync(val);

      secureLocalStorage.setItem(SESSION_KEY, response.data);

      navigate('/admin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
          <div className='w-full max-w-sm'>
            <div className={cn('flex flex-col gap-6', className)} {...props}>
              <Card>
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>
                    Enter your email below to login to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-6'>
                    <div className='grid gap-3'>
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder='Enter your email...'
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='grid gap-3'>
                      <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type='password'
                                placeholder='Enter your password...'
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Button
                        isLoading={isPending}
                        type='submit'
                        className='w-full'
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
