import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { prismadb } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import TryAgain from './components/TryAgain';
import type { Users } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

const PendingPage = async () => {
  const adminUsers: Users[] = await prismadb.users.findMany({
    where: {
      is_admin: true,
      userStatus: 'ACTIVE',
    },
  });

  const session = await getServerSession(authOptions);

  if (session?.user.userStatus !== 'INACTIVE') {
    return redirect('/');
  }

  return (
    <Card className="space-y- m-10 p-10">
      <CardTitle className="flex justify-center py-10">
        Your account has been deactivated by Admin
      </CardTitle>
      <CardDescription className="py-3">
        Hi, your {process.env.NEXT_PUBLIC_APP_NAME} account has been disabled.
        Ask someone in your organization to activate your account again.
      </CardDescription>
      <CardContent>
        <h2 className="flex justify-center text-xl">Admin List</h2>
        <div className="flex flex-wrap justify-center">
          {adminUsers &&
            adminUsers?.map((user: Users) => (
              <div
                key={user.id}
                className="m-2 flex flex-col gap-3 rounded-md border p-5"
              >
                <div>
                  <p className="font-bold">{user.name}</p>
                  <p>
                    <Link href={`mailto:  ${user.email}`}>{user.email}</Link>
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-col items-center justify-center space-x-2 pt-5 md:flex-row">
          <Button asChild>
            <Link href="/sign-in">Log-in with another account</Link>
          </Button>
          <p>or</p>
          <TryAgain />
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingPage;
