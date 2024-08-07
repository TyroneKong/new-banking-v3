'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
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
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { axAPI, useGetTransactions } from '@/app/hooks/requests';
import FormInput from '@/ui/atoms/form-input';

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((x) => x.password === x.confirmPassword, {
    path: ['confirmPassword'],
    message: 'passwords do not match',
  });

type Inputs = z.infer<typeof formSchema>;

export function RegisterForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const router = useRouter();

  const { toast } = useToast();

  const register = useMutation({
    mutationKey: ['me'],
    mutationFn: (body: {
      username: string;
      name: string;
      email: string;
      password: string;
    }) =>
      axAPI.post('/api/register', body, {
        withCredentials: true,
      }),
    onSuccess: () => {
      toast({
        title: 'registered',
        description: 'successfully registered',
      });
      router.push('/login');
    },
  });

  const onSubmit = (data: Inputs) => {
    register.mutate(data);
    console.log(data);
  };
  // ...

  return (
    <div>
      <Button
        variant='default'
        className='mt-5 w-full'
        onClick={() => router.push('/login')}
      >
        Login
      </Button>

      <h1 className='text-4xl font-bold text-center mb-3'>Register</h1>
      <Card className='mb-5'>
        <Image src='/piggybank.jpg' alt='piggybank' width={400} height={400} />
      </Card>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormInput label='user name' name='username' type='text' />
          <FormInput label='name' name='name' type='text' />

          <FormInput label='password' name='password' type='text' />
          <FormInput
            label='confirm password'
            name='confirmPassword'
            type='text'
          />
          <Button type='submit'>Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
}
