import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
} from '@react-email/components';

import { Markdown } from '@react-email/markdown';

import * as React from 'react';

interface VercelInviteUserEmailProps {
  username?: string;
  avatar?: string | null;
  userLanguage: string;
  data: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const AiProjectReportEmail = ({
  username,
  avatar,
  data,
}: VercelInviteUserEmailProps) => {
  const previewText = `AI Report from:  ${process.env.NEXT_PUBLIC_APP_NAME}`;

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
              Ai assistant Project report for: <strong>{username}</strong>
            </Heading>
            <Markdown>{data}</Markdown>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AiProjectReportEmail;
