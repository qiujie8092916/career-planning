import { IconPlus } from '@tabler/icons-react';
import {FC, useContext, useState} from 'react';

import { Conversation } from '@/types/chat';
import Modal from "@/components/Modal";
import {SITE_NAME, SITE_LOGO, QQ_GROUP } from "@/utils/data/const";
import copy from "copy-to-clipboard";
import {toast} from "react-hot-toast";
import HomeContext from "@/pages/api/home/home.context";

interface Props { }

export const Navbar: FC<Props> = () => {
  const [aboutModal, setAboutModal] = useState<boolean>(false);

  const {
    state: {
      scrollHeight,
    },
  } = useContext(HomeContext);

  const copyToClipboard = () => {
    if(copy(QQ_GROUP)) {
      toast.success('复制成功');
    }
  }

  return (
    <>
      <nav className="flex w-full items-center justify-between py-3 px-4 h-16 text-[#3C3C3C]" style={{
        backgroundColor: `rgba(255, 255, 255, ${scrollHeight / 100})`
      }}>
        <div className="flex gap-2.5 items-center text-xl font-semibold">
          <img width={32} height={32} className='rounded-full' alt={'logo'} src={SITE_LOGO} />
          {SITE_NAME}
        </div>
        <button className='' onClick={() => setAboutModal(true)}>
          关于
        </button>
      </nav>

      {
        aboutModal && (
          <Modal maskClosable={false} onClose={() => setAboutModal(false)}
           title={''}
           closeSize={22}
           modalWidth={342}
           headerClassName='!justify-end !p-2.5'
           closeClassName='!w-[1.375rem] !h-[1.375rem]'
           bodyClassName='!px-[1.25rem]'
           renderBody={
            <>
              <p className='text-xl mb-5 font-semibold'>注意：MyPath 目前仅收录了 985/211 院校的相关数据。 </p>
              <p className='text-base mb-5'>需要了解此范围外的院校信息，请登录各学校官网或者阳光高考等官方平台查看。</p>
              <div className='flex items-center flex-col mb-1'>
                <p className='text-xl mb-4 font-semibold text-center'>欢迎加入官方 QQ 群交流</p>
                <button className='text-base rounded-md bg-slate-300 px-6 py-1.5' onClick={copyToClipboard}>点击复制群号 {QQ_GROUP}</button>
              </div>
            </>
          } />
        )
      }
    </>
  );
};
