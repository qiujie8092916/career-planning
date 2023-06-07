import React from 'react';
import { copyToClipboard } from '@/utils/app/copyToClipboard';

import Image from 'next/image';

import { QQ_GROUP } from '@/utils/data/const';

import Modal from '@/components/Modal';

import GUIDE_SHARE from '@/public/guide_share.png';
import copy from 'copy-to-clipboard';
import {WechatServiceButton} from "@/components/Buttons/WechatServiceButton";

type Props = {
  onClose: () => any;
};

const ShareModal: React.FC<Props> = ({ onClose }) => {
  return (
    <Modal
      maskClosable={false}
      onClose={onClose}
      modalWidth={340}
      headerClassName="!justify-end !p-2.5"
      closeClassName="!w-[1.375rem] !h-[1.375rem]"
      bodyClassName="!px-[1.25rem]"
      modalWrapperClassName="!items-start !pt-6"
      renderBody={
        <>
          <div className="flex flex-row justify-end">
            <Image width={40} height={40} alt="share guide" src={GUIDE_SHARE} />
          </div>
          <p className="text-base mb-5">
            将本网站转发给朋友或分享到朋友圈，或许万能的朋友圈会有邀请码哦！
          </p>
          <p className="text-base mb-5">加入官方交流群碰碰运气：</p>
          <div className="flex items-center flex-col mb-1 gap-5">
            <WechatServiceButton />
            <button
              className="w-full text-base rounded-md bg-[rgba(130,128,128,0.25)] px-6 py-1.5"
              onClick={() => copyToClipboard()}
            >
              点击复制 QQ 群号 {QQ_GROUP}
            </button>
            <button
              className="w-full text-base rounded-md bg-[rgba(130,128,128,0.25)] px-6 py-1.5"
              onClick={onClose}
            >
              我知道了
            </button>
          </div>
        </>
      }
    />
  );
};

export default ShareModal;
