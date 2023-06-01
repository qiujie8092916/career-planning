import {Dispatch, FC, SetStateAction, useState} from "react";
import clsx from "clsx";
import {useMount} from "react-use";
import Spinner from '@/components/Spinner';
import {QUERY_PROCESS_ENUM} from "@/utils/app/urlQuery";

interface Props {
  setSpaceholder: Dispatch<SetStateAction<number>>;
  setUrlQuery: (val: any, key?: string) => void;
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
])

// const PROVINCE_MAP = new Map<PROVINCE_ENUM, string>([
//   [PROVINCE_ENUM.BEIJING, '北京'],
//   [PROVINCE_ENUM.SICHUAN, '四川'],
//   [PROVINCE_ENUM.GUANGXI, '广西']
// ])

export const EnterInfomation: FC<Props> = ({ setUrlQuery, setSpaceholder }) => {
  const [subjectSelected, setSubjectSelected] = useState<SUBJECT_ENUM>();
  // const [provinceSelected, setProvinceSelected] = useState<PROVINCE_ENUM>();
  const [score, setScore] = useState<string>();
  const [rank, setRank] = useState<number>();
  const [loading, setLoading] = useState(false);

  const handleScoreChange = (value: string) => {
    setScore(value.replace(/[^\u4e00-\u9fa5\d.]/g, ""))
  }

  const handleRankChange = (value: string) => {
    // 对value调用replace方法，将非数字并且非小数点的字符替换为空字符串
    setRank(+value.replace(/[^\u4e00-\u9fa5\d]/g, ""))
  }

  const submit = () => {
    setLoading(true);
    setUrlQuery(QUERY_PROCESS_ENUM.CHAT)
  }

  useMount(() => setSpaceholder(260))

  return (
    <div className='text-base text-[#3C3C3C] gap-5 py-4 px-5 relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-[rgba(255,255,255,0.75)] shadow-[0_0_10px_rgba(0,0,0,0.10)]'>
      <div className='flex flex-row gap-5 items-start'>
        <div className='before:content-["*"] whitespace-nowrap h-9 leading-9'>科类</div>
        <div className='flex-1 w-full overflow-hidden grid grid-cols-3 gap-x-3 gap-y-5'>
          {[...SUBJECT_MAP].map(([key, value]) => (
            <div
              key={key}
              className={clsx(
              'flex flex-1 justify-center h-9 items-center rounded-md border-solid border bg-[rgba(130,128,128,0.15)]',
                subjectSelected === key ? 'text-[rgba(14,13,13,1)] border-[rgba(0,0,0,0.75)]' : 'text-[rgba(0,0,0,0.65)] border-[rgba(0,0,0,0.15)]'
              )}
              onClick={() => setSubjectSelected(key)}
            >{value}</div>
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
      <div className='flex flex-row gap-5 items-start'>
        <div className='before:content-["*"] whitespace-nowrap h-9 leading-9'>成绩</div>
        <div className='flex-1 flex-row gap-3 w-full flex flex-nowrap overflow-hidden'>
          <input
            className='focus:outline-0 min-w-0 flex flex-1 text-center h-9 rounded-md border-solid border border-[rgba(0,0,0,0.15)] bg-[rgba(130,128,128,0.15)]'
            type="number"
            value={score}
            placeholder='分数'
            onChange={(e) => handleScoreChange(e.target.value)}
          />
          <input
            className='focus:outline-0 min-w-0 flex flex-1 text-center h-9 rounded-md border-solid border border-[rgba(0,0,0,0.15)] bg-[rgba(130,128,128,0.15)]'
            type="number"
            value={rank}
            placeholder='排名'
            onChange={(e) => handleRankChange(e.target.value)}
          />
        </div>
      </div>
      <button
        className='flex flex-row gap-2 items-center justify-center h-9 rounded-md border-solid border border-[rgba(0,0,0,0.75)] bg-neutral-100 hover:opacity-80'
        onClick={submit}
      >
        {loading && (
          <Spinner size='16px' className='inline' />
        )}
        提交
      </button>
    </div>
  )
}
