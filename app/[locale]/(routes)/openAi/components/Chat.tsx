'use client';

import { useCompletion } from 'ai/react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

export default function AiHelpCenter() {
  const {
    completion,
    input,
    setInput,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: '/api/openai/completion',
    onFinish: () => {
      //console.log(response, "response");
      toast.success('Response received');
      setInput('');
    },
    onError: () => {
      toast.error('Error: no API key found');
    },
  });

  //console.log(input, "input");

  return (
    <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-5 overflow-auto p-20">
      <div className="flex w-2/3 items-start">
        <form onSubmit={handleSubmit} className="w-full px-10">
          <div>
            <div>
              <input
                className="bottom-0 w-full rounded border border-gray-300 p-2 shadow-xl"
                value={input}
                placeholder="Write your question ..."
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end gap-2 pt-5">
              <Button type="button" onClick={stop} variant={'destructive'}>
                Stop
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader className="animate-spin" /> : 'Submit'}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="h-full w-2/3 px-10">
        <div className="my-6">{completion}</div>
      </div>
    </div>
  );
}
