import { getModules } from '@/actions/get-modules';

import ModuleMenu from './ModuleMenu';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDictionary } from '@/dictionaries';
import type { FC } from 'react';

const SideBar: FC<{ build: number }> = async ({ build }) => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const modules = await getModules();

  if (!modules) return null;

  //Get user language
  const lang = session.user.userLanguage;

  //Fetch translations from dictionary
  const dict = await getDictionary(lang);

  if (!dict) return null;

  return <ModuleMenu modules={modules} dict={dict} build={build} />;
};
export default SideBar;
