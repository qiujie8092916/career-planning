import { FC, useContext, useState } from 'react';
import { useMount } from 'react-use';

import { QUERY_PROCESS_ENUM } from '@/utils/app/urlQuery';
import { SITE_NAME } from '@/utils/data/const';

import HomeContext from '@/pages/api/home/home.context';

import ShareModal from '@/components/ShareModal';

import type { Props as MainInputProps } from './MainInput';

export const Introduce: FC<Pick<MainInputProps, 'setSpaceholder'>> = ({
  setSpaceholder,
}) => {
  const [shareModal, setShareModal] = useState(false);

  const { dispatch: homeDispatch } = useContext(HomeContext);

  useMount(() => setSpaceholder(220));

  return (
    <>
      <div className="text-base text-[#3C3C3C] gap-5 py-4 px-5 relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-[rgba(255,255,255,1)] shadow-[0_0_10px_rgba(0,0,0,0.10)]">
        <div className="relative flex flex-row justify-center items-center w-full">
          <div className="text-center">欢迎使用 {SITE_NAME}</div>
          <div
            className="absolute underline text-xs right-0 top-[50%] translate-y-[-50%]"
            onClick={() => setShareModal(true)}
          >
            帮助
          </div>
        </div>
        <button
          className="bg-[rgba(81,182,255,0.5)] rounded border border-[rgba(0,0,0,0.15)] leading-[1.375rem] py-1.5"
          onClick={() => {
            homeDispatch({
              field: 'userStatus',
              value: QUERY_PROCESS_ENUM.REGISTER,
            });
          }}
        >
          使用邀请码注册
        </button>
        <button
          className="bg-[rgba(81,182,255,0.5)] rounded border border-[rgba(0,0,0,0.15)] leading-[1.375rem] py-1.5"
          onClick={() => {
            homeDispatch({
              field: 'userStatus',
              value: QUERY_PROCESS_ENUM.LOGIN,
            });
          }}
        >
          已有账号，点击登录
        </button>
      </div>
      {shareModal && <ShareModal onClose={() => setShareModal(false)} />}
    </>
  );
};
