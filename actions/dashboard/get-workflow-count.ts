import { prismadb } from '@/lib/prisma';

export const getWorkflowCount = async () => {
  const data = await prismadb.definitions.count();
  return data;
};
