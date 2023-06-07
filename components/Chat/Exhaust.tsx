import { FC, useContext, useState } from 'react';
import { useMount } from 'react-use';

import { copyToClipboard } from '@/utils/app/copyToClipboard';
import { QUERY_PROCESS_ENUM } from '@/utils/app/urlQuery';
import { QQ_GROUP, SITE_NAME } from '@/utils/data/const';

import HomeContext from '@/pages/api/home/home.context';
import { UserData } from '@/pages/api/home/home.state';
import userData from '@/pages/api/userData';

import ShareModal from '@/components/ShareModal';

import type { Props as MainInputProps } from './MainInput';
import {WechatServiceButton} from "@/components/Buttons/WechatServiceButton";

export const Exhaust: FC<Pick<MainInputProps, 'setSpaceholder'>> = ({
  setSpaceholder,
}) => {
  const [shareModal, setShareModal] = useState(false);

  const {
    state: { userData },
  } = useContext(HomeContext);

  useMount(() => setSpaceholder(320));

  return (
    <>
      <div className="text-base text-[#3C3C3C] gap-5 py-4 px-5 relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-[rgba(255,255,255,1)] shadow-[0_0_10px_rgba(0,0,0,0.10)]">
        <div className="flex items-start flex-col mb-1">
          <p className="text-base mb-3.5 font-semibold">
            今日剩余询问次数：{(userData as UserData)?.chat_count_left ?? 0}
          </p>
          <p className="text-base mb-3.5">
            每 1 位好友使用你的邀请码注册成功，你和好友每天均会获得 10 次。
          </p>
          <button
            className="w-full text-base rounded-md bg-[rgba(130,128,128,0.25)] px-6 py-1.5 mb-3.5"
            onClick={() =>
              copyToClipboard((userData as UserData)?.invite_code ?? '')
            }
          >
            点击复制邀请码 {(userData as UserData)?.invite_code ?? ''}
          </button>
          <p className="text-base mb-3.5">
            加入官方交流群，成为付费会员即可享受无限次咨询。
          </p>
          <WechatServiceButton buttonClassName={'mb-3.5'} />
          <button
            className="w-full text-base rounded-md bg-[rgba(130,128,128,0.25)] px-6 py-1.5"
            onClick={() => copyToClipboard()}
          >
            点击复制 QQ 群号 {QQ_GROUP}
          </button>
        </div>
      </div>
    </>
  );
};
