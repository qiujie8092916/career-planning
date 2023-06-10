import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { copyToClipboard } from '@/utils/app/copyToClipboard';

import Image from 'next/image';
import { useRouter } from 'next/router';

import useUser from '@/hooks/useUser';

import { QQ_GROUP, SITE_LOGO, SITE_NAME } from '@/utils/data/const';

import Modal from '@/components/Modal';

import LOGO_PNG from '@/public/logo.png';
import copy from 'copy-to-clipboard';
import {WechatServiceButton} from "@/components/Buttons/WechatServiceButton";

interface Props {}

export interface Actions {
  setScrollHeight: Dispatch<SetStateAction<number>>;
}

export const Navbar = forwardRef<Actions, Props>((_, ref) => {
  const router = useRouter();
  const { fetchUserData, logout } = useUser();
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [aboutModal, setAboutModal] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    setScrollHeight,
  }));

  return (
    <>
      <nav
        className="flex w-full items-center justify-between py-3 px-4 h-16 text-[#3C3C3C]"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${scrollHeight / 100})`,
        }}
      >
        <div
          className="flex gap-2.5 items-center text-xl font-semibold"
          onClick={async () => {
            if (router.query.debug === 'true') {
              await logout();
              fetchUserData();
            }
          }}
        >
          {SITE_LOGO ? (
            <img
              width={28}
              height={28}
              className="rounded-full"
              alt="logo"
              src={SITE_LOGO}
            />
          ) : (
            <Image
              width={28}
              height={28}
              className="rounded-full"
              alt="logo"
              src={LOGO_PNG}
            />
          )}

          {SITE_NAME}
        </div>
        <button className="" onClick={() => setAboutModal(true)}>
          关于
        </button>
      </nav>

      {aboutModal && (
        <Modal
          maskClosable={false}
          onClose={() => setAboutModal(false)}
          title={''}
          closeSize={22}
          modalWidth={342}
          headerClassName="!justify-end !p-2.5"
          closeClassName="!w-[1.375rem] !h-[1.375rem]"
          bodyClassName="!px-[1.25rem]"
          renderBody={
            <>
              {/*<p className="text-xl mb-5 font-semibold">*/}
              {/*  注意：MyPath 目前仅收录了 985/211 院校的相关数据。{' '}*/}
              {/*</p>*/}
              <p className="text-base mb-5">
                我们致力于让所有组织、个人都能在各种生产生活场景中享受个性化 AI 带来的帮助，欢迎志同道合的小伙伴加入。
              </p>
              <p className="text-base mb-5">
                MyPath 将根据填写的信息及考试院官方公布数据进行预测，推荐结果仅供参考，数据以官方公布为准。
              </p>
              <div className="flex items-center flex-col mb-1">
                <p className="text-xl mb-4 font-semibold text-center">
                  欢迎加入官方群交流
                </p>
                <WechatServiceButton buttonClassName={'mb-3.5'} />
                <button
                  className="w-full text-base rounded-md bg-[rgba(130,128,128,0.25)] px-6 py-1.5"
                  onClick={() => copyToClipboard()}
                >
                  点击复制 QQ 群号 {QQ_GROUP}
                </button>
              </div>
            </>
          }
        />
      )}
    </>
  );
});
