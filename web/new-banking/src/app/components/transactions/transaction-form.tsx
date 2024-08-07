import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function TransactionForm() {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name='userId'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-2'>User Id</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-2'>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='amount'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-2'>Amount</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='currency'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-2'>Currency</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='type'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-2'>Type</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='deposit'>Deposit</SelectItem>
                  <SelectItem value='withdrawal'>Withdrawal</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
