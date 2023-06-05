import { SITE_NAME } from '@/utils/data/const';

export const Introduce = () => {
  return (
    <div className="text-base text-[#3C3C3C] gap-5 py-4 px-5 relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-[rgba(255,255,255,1)] shadow-[0_0_10px_rgba(0,0,0,0.10)]">
      <div className="mb-8">欢迎使用 {SITE_NAME}</div>
    </div>
  );
};
