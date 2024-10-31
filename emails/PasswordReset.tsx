import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VercelInviteUserEmailProps {
  username?: string;
  avatar?: string | null;
  email: string;
  password: string;
  userLanguage: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const PasswordResetEmail = ({
  username,
  avatar,
  email,
  password,
  userLanguage,
}: VercelInviteUserEmailProps) => {
  const previewText = `Password reset from ${process.env.NEXT_PUBLIC_APP_NAME}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={avatar || `${baseUrl}/images/nouser.png`}
                width="50"
                height="50"
                alt="User Avatar"
                className="mx-auto my-0 rounded-full"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Password reset for: <strong>{username}</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {userLanguage === 'en'
                ? 'Your password was reset,'
                : 'Dein Passwort wurde zurück gesetzt,'}
              <strong>{password}</strong>
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {userLanguage === 'en'
                ? 'Please login to '
                : 'Bitte melden Sie sich an '}
              <Link
                href={process.env.NEXT_PUBLIC_APP_URL}
                className="text-blue-500 underline"
              >
                {process.env.NEXT_PUBLIC_APP_URL}
              </Link>
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {userLanguage === 'en' ? 'Thank you, ' : 'Danke, '}
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
