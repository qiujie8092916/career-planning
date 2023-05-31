import Spinner from "@/components/Spinner";
import {SystemPrompt} from "@/components/Chat/SystemPrompt";

export const Welcome = () => {
  return (
    <div className="text-xl leading-[1.875rem] text-gray-800 w-full h-full px-4 mt-[0.625rem]">
      <div className='mb-8'>你好，我是你的</div>
      <div className='font-semibold	mb-8 text-4xl'>专属人生规划师</div>
      <div className='mb-8'>我已接入 ChatGPT，专门学习了 985/211 院校的相关信息， 只为给你提供你所需要的院校/专业，并帮助你分析哪些更适合你。</div>
      <div className='mb-8'>
        你可以：
        <ul className='mt-3 pl-5 list-disc'>
          <li>通过指示向我提供信息</li>
          <li>直接向我提问，和我聊天</li>
        </ul>
      </div>
    </div>
  )
}
