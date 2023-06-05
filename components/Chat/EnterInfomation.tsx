import { Dispatch, FC, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { useMount } from 'react-use';

import useUser from '@/hooks/useUser';

import Spinner from '@/components/Spinner';

import clsx from 'clsx';

interface Props {
  setSpaceholder: Dispatch<SetStateAction<number>>;
}

enum SUBJECT_ENUM {
  PHYSICS = 'physics',
  CHEMISTRY = 'chemistry',
  BIOLOGY = 'biology',
  HISTORY = 'history',
  POLITICS = 'politics',
  GEOGRAPHY = 'geography',
}

// enum PROVINCE_ENUM {
//   BEIJING = 'beijing',
//   SICHUAN = 'sichuan',
//   GUANGXI = 'guangxi'
// }

const SUBJECT_MAP = new Map<SUBJECT_ENUM, string>([
  [SUBJECT_ENUM.PHYSICS, ' 物理'],
  [SUBJECT_ENUM.CHEMISTRY, '化学'],
  [SUBJECT_ENUM.BIOLOGY, '生物'],
  [SUBJECT_ENUM.HISTORY, '历史'],
  [SUBJECT_ENUM.POLITICS, '政治'],
  [SUBJECT_ENUM.GEOGRAPHY, '地理'],
]);

// const PROVINCE_MAP = new Map<PROVINCE_ENUM, string>([
//   [PROVINCE_ENUM.BEIJING, '北京'],
//   [PROVINCE_ENUM.SICHUAN, '四川'],
//   [PROVINCE_ENUM.GUANGXI, '广西']
// ])

export const EnterInfomation: FC<Props> = ({ setSpaceholder }) => {
  const { submitUserData, postUserLoading } = useUser();

  // const [provinceSelected, setProvinceSelected] = useState<PROVINCE_ENUM>();
  const [score, setScore] = useState<number>();
  const [rank, setRank] = useState<number>();
  const [subjectsSelected, setSubjectsSelected] = useState<SUBJECT_ENUM[]>([]);

  // 实现一个函数，对传入的任意字符串，调用replace方法，将其转换为小数或者整数或者空字符串，最多保留两位小数
  const transNumber = (value: string) => {
    let s;
    s = value.replace(/[^0-9\.]+/g, "");  // 去除非数字和小数点字符
    if (s) {
      s = +parseFloat(s).toFixed(2);
    } else {
      s = undefined;
    }
    return s
  }

  const handleScoreChange = (value: string) => {
    setScore(transNumber(value))
  };

  const handleRankChange = (value: string) => {
    setRank(transNumber(value))
  };

  const submit = () => {
    if (subjectsSelected.length !== 3) {
      return toast.error('请选择三门科目');
    }
    if (score && isNaN(score as number)) {
      return toast.error('分数格式不正确');
    }
    if (rank && isNaN(rank as number)) {
      return toast.error('排名格式不正确');
    }

    if(!score && !rank) {
        return toast.error('赋分成绩和排名至少填写一项');
    }

    submitUserData({
      location: '北京',
      rank,
      score,
      subjects: subjectsSelected,
    });
  };

  useMount(() => setSpaceholder(260));

  return (
    <div className="text-base text-[#3C3C3C] gap-5 py-4 px-5 relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-[rgba(255,255,255,1)] shadow-[0_0_10px_rgba(0,0,0,0.10)]">
      <div className="flex flex-row gap-5 items-start">
        <div className='before:content-["*"] whitespace-nowrap h-9 leading-9'>
          科类
        </div>
        <div className="flex-1 w-full overflow-hidden grid grid-cols-3 gap-x-3 gap-y-5">
          {[...SUBJECT_MAP].map(([key, value]) => (
            <button
              key={key}
              disabled={!subjectsSelected.includes(key) && subjectsSelected.length === 3}
              className={clsx(
                'disabled:text-[rgba(0,0,0,.25)] flex flex-1 justify-center h-9 items-center rounded-md border-solid border bg-[rgba(130,128,128,0.15)]',
                subjectsSelected.includes(key)
                  ? 'text-[rgba(14,13,13,1)] border-[rgba(0,0,0,0.75)]'
                  : 'text-[rgba(0,0,0,0.65)] border-[rgba(0,0,0,0.15)]',
              )}
              onClick={() => {
                const index = subjectsSelected.indexOf(key);
                if (index > -1) {
                  setSubjectsSelected(
                    subjectsSelected
                      .slice(0, index)
                      .concat(subjectsSelected.slice(index + 1)),
                  );
                } else {
                  setSubjectsSelected([...subjectsSelected, key]);
                }
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      {/*<div className='flex flex-row gap-5 items-start'>*/}
      {/*  <div className='before:content-["*"] whitespace-nowrap h-9 leading-9'>省份</div>*/}
      {/*  <div className='flex-1 flex-row gap-3 w-full flex flex-nowrap overflow-hidden'>*/}
      {/*    {[...PROVINCE_MAP].map(([key, value]) => (*/}
      {/*      <div*/}
      {/*        key={key}*/}
      {/*        className={clsx(*/}
      {/*          'flex flex-1 justify-center h-9 items-center rounded-md border-solid border bg-[rgba(130,128,128,0.15)]',*/}
      {/*          provinceSelected === key ? 'text-[rgba(14,13,13,1)] border-[rgba(0,0,0,0.75)]' : 'text-[rgba(0,0,0,0.65)] border-[rgba(0,0,0,0.15)]'*/}
      {/*        )}*/}
      {/*        onClick={() => setProvinceSelected(key)}*/}
      {/*      >{value}</div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="flex flex-row gap-5 items-start">
        <div className='before:content-["*"] whitespace-nowrap h-9 leading-9'>
          成绩
        </div>
        <div className="flex-1 flex-row gap-3 w-full flex flex-nowrap overflow-hidden">
          <input
            className="outline-none min-w-0 flex flex-1 text-center h-9 rounded-md border-solid border border-[rgba(0,0,0,0.15)] bg-[rgba(130,128,128,0.15)]"
            type="number"
            value={score}
            placeholder="赋分成绩"
            onChange={(e) => handleScoreChange(e.target.value)}
          />
          <input
            className="outline-none min-w-0 flex flex-1 text-center h-9 rounded-md border-solid border border-[rgba(0,0,0,0.15)] bg-[rgba(130,128,128,0.15)]"
            type="number"
            value={rank}
            placeholder="排名"
            onChange={(e) => handleRankChange(e.target.value)}
          />
        </div>
      </div>
      <button
        className="disabled:text-[rgba(0,0,0,.25)] flex flex-row gap-2 items-center justify-center h-9 rounded-md border-solid border border-[rgba(0,0,0,0.75)] bg-neutral-100 hover:opacity-80"
        disabled={!(subjectsSelected.length == 3 && (!isNaN(score as number) || !isNaN(rank as number)))}
        onClick={submit}
      >
        {postUserLoading && <Spinner size="16px" className="inline" />}
        提交
      </button>
    </div>
  );
};
