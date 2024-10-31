import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createTranslator, IntlError } from 'next-intl';
import { GithubIcon, Star } from 'lucide-react';

import '@/app/[locale]/globals.css';
import { ThemeToggle } from '@/components/ThemeToggle';
import Footer from '@/app/[locale]/(routes)/components/Footer';
import getGithubRepoStars from '@/actions/github/get-repo-stars';
import { DiscordLogoIcon } from '@radix-ui/react-icons';

type Props = {
  params: { locale: string };
};

async function getLocales(locale: string) {
  try {
    return (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    if (error instanceof IntlError) {
      notFound();
    }
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getLocales(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: t('RootLayout.title'),
    description: t('RootLayout.description'),
  };
}

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  //Get github stars from github api
  const githubStars = await getGithubRepoStars();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-end space-x-5 p-5">
        <Link
          href={process.env.NEXT_PUBLIC_GITHUB_REPO_URL || '#'}
          className="rounded-md border p-2"
        >
          <GithubIcon className="h-5 w-5" />
        </Link>
        <div className="flex items-center rounded-md border p-2">
          <span className="sr-only">Github stars</span>
          {githubStars}
          <Star className="h-4 w-4" />
        </div>
        <div className="flex items-center rounded-md border p-2">
          <Link href="https://discord.gg/kBhAUKBMgf">
            <DiscordLogoIcon className="h-5 w-5" />
          </Link>
        </div>
        <ThemeToggle />
      </div>
      <div className="flex h-full items-center overflow-hidden">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
