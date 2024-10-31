import { atom, useAtom } from 'jotai';

import type { Mail } from '@/app/[locale]/(routes)/emails//data';
import { mails } from '@/app/[locale]/(routes)/emails//data';

type Config = {
  selected: Mail['id'] | null;
};

const configAtom = atom<Config>({
  selected: mails[0].id,
});

export function useMail() {
  return useAtom(configAtom);
}
