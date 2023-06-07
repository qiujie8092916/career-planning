import { toast } from 'react-hot-toast';

import { QQ_GROUP } from '@/utils/data/const';

import copy from 'copy-to-clipboard';

export const copyToClipboard = (value = QQ_GROUP) => {
  if (copy(value)) {
    toast.success('复制成功');
  }
};
