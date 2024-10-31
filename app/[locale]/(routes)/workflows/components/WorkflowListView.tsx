'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Box } from '@radix-ui/themes';
import Link from 'next/link';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { GitFork } from 'lucide-react';

const WorkflowListView = ({ data }: any) => {
  const [isLoading] = useState(false);

  return (
    <Box>
      <div className="gap-y-1">
        <div className="flex flex-row items-center justify-end">
          <Link href={`/workflows/create`}>
            <Button className="mb-5">Create&nbsp; +</Button>
          </Link>
        </div>
        {!isLoading && data && (
          <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
            {data.map((item: any) => (
              <Link
                className="w-full"
                key={item.id}
                href={`/workflows/detail/${item.id}`}
              >
                <Card className="rounded-lg border bg-card text-card-foreground shadow-md hover:bg-slate-100">
                  <CardContent className="grid gap-4">
                    <div className="gap-6 md:grid lg:grid-cols-1 xl:grid-cols-2">
                      <div className="mt-2 flex flex-row gap-2 p-2 text-xl font-medium">
                        <GitFork className="pt-1 text-xl" />
                        {item.name}
                      </div>
                      <div className="mt-3 flex h-8 flex-row justify-end">
                        {item.definitionStatus === 'active' ? (
                          <span className="rounded bg-green-100 px-2.5 py-1.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            {item.definitionStatus}
                          </span>
                        ) : (
                          <span className="rounded bg-red-100 px-2.5 py-1.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                            {item.definitionStatus}
                          </span>
                        )}
                      </div>
                    </div>
                    <Separator />
                    <span className="font-normal">Description:</span>
                    <span className="ml-1 w-full font-normal">
                      {item.description}
                    </span>
                    <div className="flex w-full flex-row items-center justify-between">
                      <span>
                        <span className="font-light">Created at:</span>
                        <span className="pl-1 font-normal">
                          {format(new Date(item.createdAt), 'dd MMM, yyyy')}
                        </span>
                      </span>
                      <span>
                        <span className="font-light">Updated at:</span>
                        <span className="pl-1 font-normal">
                          {format(new Date(item.updatedAt), 'dd MMM, yyyy')}
                        </span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {data?.length < 1 ? (
              <span className="flex flex-row justify-center">
                No workflow definitions found!
              </span>
            ) : null}
          </div>
        )}
        {isLoading && (
          <div className="items-start justify-start gap-y-0.5">
            <Card className="w-full hover:bg-slate-100">
              <CardContent>
                <div className="iteeems-center flex w-full flex-row justify-between">
                  <Skeleton className="w-[100px]" />
                  <Skeleton className="h-[30px] w-[75px]" />
                </div>
                <Skeleton />
                <div className="flex w-full flex-row items-center justify-between">
                  <Skeleton className="w-[100px]" />
                  <Skeleton className="w-[100px]" />
                </div>
              </CardContent>
            </Card>
            <Card className="w-full hover:bg-slate-100">
              <CardContent>
                <div className="juuustify-between flex w-full flex-row items-center">
                  <Skeleton className="w-[100px]" />
                  <Skeleton className="h-[30px] w-[75px]" />
                </div>
                <Skeleton />
                <div className="flex w-full flex-row items-center justify-between">
                  <Skeleton className="w-[100px]" />
                  <Skeleton className="w-[100px]" />
                </div>
              </CardContent>
            </Card>
            <Card className="w-full hover:bg-slate-100">
              <CardContent>
                <div className="flex w-full flex-row items-center justify-between">
                  <Skeleton className="w-[100px]" />
                  <Skeleton className="h-[30px] w-[75px]" />
                </div>
                <Skeleton />
                <div className="flex w-full flex-row items-center justify-between">
                  <Skeleton className="w-[100px]" />
                  <Skeleton className="w-[100px]" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Box>
  );
};

export default WorkflowListView;
