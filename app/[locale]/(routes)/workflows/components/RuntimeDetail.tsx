'use client';

import { getRuntimeDetail } from '@/actions/workflows/get-runtime-detail';
import { Heading4, Heading5, RefreshCw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Box } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import type { FC } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Label } from '@/components/ui/label';

interface Props {}

const RuntimeDetailPage: FC<Props> = () => {
  const params = useParams<{ id: string }>();

  const { toast } = useToast();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [params?.id],
    queryFn: async () => {
      if (params?.id) {
        return getRuntimeDetail(params.id);
      }
      return null;
    },
  });

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Box className="p-3">
      {isLoading && <Label>Loading...</Label>}
      {!isLoading && data && (
        <div className="w-full items-start justify-start gap-y-1">
          <Heading4>Workflow Definition</Heading4>
          <Link className="w-full" href={`/workflows/${data.definitions.id}`}>
            <Card className="w-full border-slate-200 hover:bg-slate-100">
              <CardHeader>
                <CardTitle>
                  {<Heading4>{data.definitions.name}</Heading4>}
                  <Badge
                    color={
                      data.definitions.definitionStatus === 'active'
                        ? 'success'
                        : 'error'
                    }
                  >
                    <Label>
                      {data.definitions?.definitionStatus?.toUpperCase()}
                    </Label>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="gap-y-0.5">
                  <CardDescription>
                    {data?.definitions?.description}
                  </CardDescription>
                  <div className="grid-flow grid auto-cols-auto grid-flow-row auto-rows-auto items-center justify-between gap-x-0.5 gap-y-0.5">
                    <Label>
                      Last Updated:{' '}
                      {format(
                        new Date(data?.definitions?.updatedAt as any),
                        'dd MMM yyyy, hh:mm aa'
                      )}
                    </Label>
                    <Label>
                      Created:{' '}
                      {format(
                        new Date(data?.definitions?.createdAt as any),
                        'dd MMM yyyy, hh:mm aa'
                      )}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <div className="grid-flow grid w-full auto-cols-auto grid-flow-row auto-rows-auto items-center justify-between gap-x-0.5 gap-y-1">
            <Heading5>Runtime</Heading5>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleRefresh}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="w-full gap-y-0.5">
            <Card className="w-full border-[1px] border-slate-200">
              <CardHeader>
                <CardTitle>
                  {<Label>{data.id}</Label>}
                  <Badge
                    color={
                      data.workflowStatus === 'completed'
                        ? 'success'
                        : undefined
                    }
                  >
                    label={data.workflowStatus.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="gap-y-0.5">
                  <Label>
                    Last Updated:{' '}
                    {format(
                      new Date(data?.updatedAt as any),
                      'dd MMM yyyy, hh:mm aa'
                    )}
                  </Label>
                  <Label>
                    Created:{' '}
                    {format(
                      new Date(data?.createdAt as any),
                      'dd MMM yyyy, hh:mm aa'
                    )}
                  </Label>
                </div>
              </CardContent>
            </Card>
            <Heading5>Tasks</Heading5>
            <div className="flex w-full flex-row items-start justify-start gap-x-0.5 gap-y-0.5 border-[1px] border-slate-200 p-2">
              {data.tasks.map((task) => (
                <Card className="border-[1px] border-slate-100" key={task.id}>
                  <CardHeader>
                    <CardTitle>{task.name}</CardTitle>
                    {<Badge color="primary">{task.type.toUpperCase()}</Badge>}
                  </CardHeader>
                  <CardContent>
                    <div className="items-start justify-start gap-y-2">
                      <div className="flex flex-row items-center justify-start gap-x-0.5">
                        <Label>Status</Label>
                        <Badge
                          color={
                            task?.status === 'completed' ? 'success' : undefined
                          }
                        >
                          {task.status.toUpperCase()}
                        </Badge>
                      </div>
                      {data?.workflowResults?.[task.name] && (
                        <TooltipProvider>
                          <Tooltip>
                            <Button
                              variant="outline"
                              onClick={() => {
                                navigator.clipboard
                                  .writeText(
                                    JSON.stringify(
                                      data?.workflowResults?.[task.name],
                                      undefined,
                                      4
                                    )
                                  )
                                  .then(() => {
                                    toast({
                                      title: 'Success',
                                      description:
                                        'Results copied to Clipboard',
                                    });
                                  })
                                  .catch();
                              }}
                            >
                              Copy Result
                            </Button>
                            <TooltipContent>
                              {JSON.stringify(
                                data?.workflowResults,
                                undefined,
                                4
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Heading5>Logs</Heading5>
            <div className="max-h-[500px] w-full items-start justify-start overflow-x-auto overflow-y-auto border-[1px] border-slate-200">
              {data.logs.map(({ log, timestamp, severity, taskName }) => (
                <div
                  className="flex w-full flex-row items-center justify-start gap-x-0.5 border-[1px] border-slate-200 px-2 py-2"
                  key={timestamp as any}
                >
                  <Badge>{severity}</Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipContent>
                        {format(
                          new Date(timestamp as any),
                          'dd MMM yyyy, hh:mm aa'
                        )}
                        <Badge>{timestamp as any}</Badge>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Label className="font-semibold">{taskName}</Label>
                  <Label className="w-full flex-1 text-slate-800">{log}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default RuntimeDetailPage;
