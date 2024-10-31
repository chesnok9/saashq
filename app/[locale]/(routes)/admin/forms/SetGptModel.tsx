'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import updateModel from '@/actions/admin/update-gpt-model';
import { useRouter } from 'next/navigation';
import type { gpt_models } from '@prisma/client';
import type { FC } from 'react';

const FormSchema = z.object({
  model: z.string().min(10).max(30),
});

type Model = {
  id: string;
  model: string;
};

const SetGptModel: FC<{
  models: gpt_models[];
}> = ({ models }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateModel(data.model);
      toast({
        title: 'GPT model updated',
      });
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      {/*       <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-center space-x-3 space-y-6"
      >
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>GPT model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gpt model for AI assistant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {models.map((model: Model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SetGptModel;
