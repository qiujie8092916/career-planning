import { FC, ReactNode } from 'react';

import { copyToClipboard } from '@/utils/app/copyToClipboard';
import { QQ_GROUP } from '@/utils/data/const';

import { WechatServiceButton } from '@/components/Buttons/WechatServiceButton';
import Modal from '@/components/Modal';

type Props = {
  children?: ReactNode;
  onClose: () => any;
};

const LoginHelp: FC<Props> = ({ onClose, children }) => {
  return (
    <Modal
      maskClosable={false}
      onClose={onClose}
      title={''}
      closeSize={22}
      modalWidth={342}
      headerClassName="!justify-end !p-2.5"
      closeClassName="!w-[1.375rem] !h-[1.375rem]"
      bodyClassName="!px-[1.25rem]"
      renderBody={
        <>
          {children ?? null}
          <p className="text-base mb-5">
            如果您忘记了自己的密码或需要其他帮助，请添加管理员微信或在官方 QQ 群内联系管理员。
          </p>
          <div className="flex items-center flex-col mb-1">
            <WechatServiceButton buttonClassName={'mb-5'} />
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
  );
};

export default LoginHelp;
