import { IconRobot } from '@tabler/icons-react';
import { FC } from 'react';

interface Props { }

export const ChatLoader: FC<Props> = () => {
  return (
    <div
      className="group text-[#3C3C3C]"
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="m-auto flex flex-col p-4 text-base md:max-w-2xl md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="w-full text-left font-black mb-3">
          {'>> 生涯咨询师'}
        </div>
        <span className="animate-pulse cursor-default">▍</span>
      </div>
    </div>
  );
};
