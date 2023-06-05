import { toast } from 'react-hot-toast';

import { QQ_GROUP } from '@/utils/data/const';

import copy from 'copy-to-clipboard';

export const copyToClipboard = () => {
  if (copy(QQ_GROUP)) {
    toast.success('复制成功');
  }
};
