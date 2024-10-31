import React from 'react';
import moment from 'moment';

import { getDocuments } from '@/actions/documents/get-documents';
import { getTaskComments } from '@/actions/projects/get-task-comments';
import { getTaskDocuments } from '@/actions/projects/get-task-documents';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { TeamConversations } from './components/team-conversation';
import { TaskDataTable } from './components/data-table';
import { columns } from './components/columns';
import { columnsTask } from './components/columns-task';
import { getCrMTask } from '@/actions/crm/account/get-task';

type TaskPageProps = {
  params: {
    taskId: string;
  };
};

const CRMTaskPage = async ({ params }: TaskPageProps) => {
  const { taskId } = params;
  const task: any = await getCrMTask(taskId);
  const taskDocuments: any = await getTaskDocuments(taskId);
  const documents: any = await getDocuments();
  //Info: This is the same as the one in the CRM task page
  const comments: any = await getTaskComments(taskId);

  return (
    <div className="flex w-full flex-col space-x-2 px-2 md:flex-row">
      <div className="flex w-full flex-col md:w-2/3">
        <h4 className="scroll-m-20 py-5 text-xl font-semibold tracking-tight">
          Task details
        </h4>
        <div className="mb-5 w-full rounded-lg border">
          {/*          <pre>
            <code>{JSON.stringify(task, null, 2)}</code>
          </pre> */}
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 font-semibold">
                  <span className="flex justify-start">Property</span>
                </th>
                <th className="border-b px-4 py-2 font-semibold">
                  <span className="flex justify-start">Value</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b px-4 py-2">ID</td>
                <td className="border-b px-4 py-2">{task.id}</td>
              </tr>
              <tr>
                <td className="border-b px-4 py-2">Date created</td>
                <td className="border-b px-4 py-2">
                  {moment(task.createdAt).format('YYYY-MM-DD')}
                </td>
              </tr>
              <tr>
                <td className="border-b px-4 py-2">Date due</td>
                <td className="border-b px-4 py-2">
                  {moment(task.dueDateAt).format('YYYY-MM-DD')}
                </td>
              </tr>
              <tr>
                <td className="border-b px-4 py-2">Date modified</td>
                <td className="border-b px-4 py-2">
                  {moment(task.lastEditedAt).format('YYYY-MM-DD')}
                </td>
              </tr>
              <tr>
                <td className="border-b px-4 py-2">Priority</td>
                <td className="border-b px-4 py-2">
                  <Badge
                    variant={
                      task.priority === 'high' ? `destructive` : `outline`
                    }
                  >
                    {task.priority}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="border-b px-4 py-2">Title</td>
                <td className="border-b px-4 py-2">{task.title}</td>
              </tr>
              <tr>
                <td className="border-b px-4 py-2">Content</td>
                <td className="border-b px-4 py-2">{task.content}</td>
              </tr>
              <tr>
                <td className="border-b px-4 py-2">Assigned to</td>
                <td className="border-b px-4 py-2">
                  {task.assigned_user?.name || 'Not assigned'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/*         <pre>
          <code>{JSON.stringify(taskDocuments, null, 2)}</code>
        </pre> */}
        <h4 className="scroll-m-20 py-5 text-xl font-semibold tracking-tight">
          Task documents ({taskDocuments.length})
        </h4>
        <TaskDataTable data={taskDocuments} columns={columnsTask} />
        <Separator />
        <h4 className="scroll-m-20 py-5 text-xl font-semibold tracking-tight">
          Available documents ({documents.length})
        </h4>
        <TaskDataTable data={documents} columns={columns} />
      </div>

      <div className="w-full md:w-1/3">
        <TeamConversations data={comments} taskId={task.id} />
      </div>
    </div>
  );
};

export default CRMTaskPage;
