import React from 'react';

import { copyToClipboard } from '@/utils/app/copyToClipboard';
import { WECHAT_ID } from '@/utils/data/const';
import clsx from 'clsx';

type Props = {
  buttonClassName?: string;
};

export const WechatServiceButton = ({ buttonClassName }: Props) => {
  return (
    <button
      className={clsx(
        'w-full text-base rounded-md bg-[rgba(130,128,128,0.25)] px-6 py-1.5',
        buttonClassName ?? '',
      )}
      onClick={() => copyToClipboard(WECHAT_ID)}
    >
      点击复制客服微信加群 {WECHAT_ID}
    </button>
  );
};
