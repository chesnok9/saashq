import Feedback from './Feedback';
import FulltextSearch from './FulltextSearch';
import AvatarDropdown from './ui/AvatarDropdown';

import { Separator } from '@/components/ui/separator';
import { SetLanguage } from '@/components/SetLanguage';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CommandComponent } from '@/components/CommandComponent';
import SupportComponent from '@/components/support';

type Props = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lang: string;
};

const Header = ({ id, name, email, avatar }: Props) => (
  <>
    <div className="flex h-20 items-center justify-between space-x-5 p-5">
      <div className="flex justify-center">
        <FulltextSearch />
      </div>
      <div className="flex items-center gap-3">
        <CommandComponent />
        <SetLanguage userId={id} />
        <Feedback />
        <ThemeToggle />
        <SupportComponent />
        <AvatarDropdown avatar={avatar} userId={id} name={name} email={email} />
      </div>
    </div>
    <Separator />
  </>
);

export default Header;
