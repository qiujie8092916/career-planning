import { FC, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMount } from 'react-use';

import { useRouter } from 'next/router';

import { QUERY_PROCESS_ENUM } from '@/utils/app/urlQuery';
import { SITE_NAME } from '@/utils/data/const';

import HomeContext from '@/pages/api/home/home.context';

import { Props as MainInputProps } from '@/components/Chat/MainInput';
import ShareModal from '@/components/ShareModal';

export const Register: FC<Pick<MainInputProps, 'setSpaceholder'>> = ({
  setSpaceholder,
}) => {
  const router = useRouter();

  const [shareModal, setShareModal] = useState(false);
  const [inviteCode, setInviteCode] = useState(router.query.ic ?? '');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const { dispatch: homeDispatch } = useContext(HomeContext);

  useMount(() => setSpaceholder(320));

  return (
    <>
      <div className="text-base text-[#3C3C3C] gap-5 py-4 px-5 relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-[rgba(255,255,255,1)] shadow-[0_0_10px_rgba(0,0,0,0.10)]">
        <div className="relative flex flex-row justify-center items-center w-full">
          <div className="text-center">注册 {SITE_NAME}</div>
          <div
            className="absolute underline text-xs right-0 top-[50%] translate-y-[-50%]"
            onClick={() => setShareModal(true)}
          >
            帮助
          </div>
        </div>
        <input
          className="text-center bg-[rgba(130,128,128,0.25)] border border-[rgba(0,0,0,0.15)] rounded leading-6 py-1.5"
          placeholder="请输入邀请码"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <input
          className="text-center bg-[rgba(130,128,128,0.25)] border border-[rgba(0,0,0,0.15)] rounded leading-6 py-1.5"
          placeholder="请输入手机号"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          className="text-center bg-[rgba(130,128,128,0.25)] border border-[rgba(0,0,0,0.15)] rounded leading-6 py-1.5"
          placeholder="请输入密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="disabled:bg-[rgba(81,182,255,0.1)] disabled:text-[#AFAEAE] bg-[rgba(81,182,255,0.5)] rounded border border-[rgba(0,0,0,0.15)] leading-[1.375rem] py-1.5"
          disabled={!inviteCode || !mobile || !password}
          onClick={() => {
            homeDispatch({
              field: 'userStatus',
              value: QUERY_PROCESS_ENUM.LOGIN,
            });
          }}
        >
          注册
        </button>
      </div>
      {shareModal && <ShareModal onClose={() => setShareModal(false)} />}
    </>
  );
};
