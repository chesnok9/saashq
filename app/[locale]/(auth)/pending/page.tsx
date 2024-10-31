import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { prismadb } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import TryAgain from './components/TryAgain';
import type { Users } from '@prisma/client';

const PendingPage = async () => {
  const adminUsers: Users[] = await prismadb.users.findMany({
    where: {
      is_admin: true,
      userStatus: 'ACTIVE',
    },
  });

  const session = await getServerSession(authOptions);

  if (session?.user.userStatus !== 'PENDING') {
    return redirect('/');
  }

  return (
    <div className="flex max-w-3xl flex-col items-center justify-center space-y-5 rounded-md border p-10 shadow-md">
      {/*       <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre> */}
      <div className="flex flex-col">
        <h1 className="text-3xl">
          {process.env.NEXT_PUBLIC_APP_NAME} - your account must be allowed by
          Admin
        </h1>
        <p>
          Hi, welcome to {process.env.NEXT_PUBLIC_APP_NAME}. Ask someone in your
          organization to approve your account. If you are fist user call to
          tech support to enable account.
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="flex justify-center text-xl">Admin List</h2>
        {adminUsers &&
          adminUsers?.map((user: Users) => (
            <div
              key={user.id}
              className="m-2 flex flex-col gap-3 rounded-md border p-5"
            >
              <div>
                <p className="font-bold">{user.name}</p>
                <p>{user.id}</p>
                <p>
                  <Link href={`mailto:  ${user.email}`}>{user.email}</Link>
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col items-center justify-center space-x-2 md:flex-row">
        <Button asChild>
          <Link href="/sign-in">Log-in with another account</Link>
        </Button>
        <p>or</p>
        <TryAgain />
      </div>
    </div>
  );
};

export default PendingPage;
