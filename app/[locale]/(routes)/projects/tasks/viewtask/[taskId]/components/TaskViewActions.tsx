'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getTaskDone } from '@/app/[locale]/(routes)/projects/actions/get-task-done';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Pencil } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import UpdateTaskDialog from '@/app/[locale]/(routes)/projects/dialogs/UpdateTask';
import { useState } from 'react';
import { Icons } from '@/components/ui/icons';

const TaskViewActions = ({
  taskId,
  users,
  boards,
  initialData,
}: {
  taskId: string;
  users: any;
  boards: any;
  initialData: any;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const [openEdit, setOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //console.log(initialData, "initialData");
  //console.log(openEdit, "openEdit");

  //Actions
  const onDone = async () => {
    setIsLoading(true);
    try {
      await getTaskDone(taskId);
      toast({
        title: 'Success, task marked as done.',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Error, task not marked as done.',
        });
      }
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="space-x-2 pb-2">
      Task Actions:
      <Separator className="mb-5" />
      {initialData.taskStatus !== 'COMPLETE' && (
        <Badge
          variant={'outline'}
          onClick={onDone}
          className="cursor-pointer"
          aria-disabled={isLoading}
        >
          <CheckSquare className="mr-2 h-4 w-4" />
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Mark as done'
          )}
        </Badge>
      )}
      <Badge
        variant={'outline'}
        className="cursor-pointer"
        onClick={() => setOpenEdit(true)}
      >
        <Pencil className="mr-2 h-4 w-4" />
        Edit
        <Sheet open={openEdit} onOpenChange={() => setOpenEdit(false)}>
          <SheetContent>
            <UpdateTaskDialog
              users={users}
              boards={boards}
              initialData={initialData}
              onDone={() => setOpenEdit(false)}
            />
            <div className="flex w-full justify-end pt-2">
              <Button
                onClick={() => setOpenEdit(false)}
                variant={'destructive'}
              >
                Close
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Badge>
    </div>
  );
};

export default TaskViewActions;
