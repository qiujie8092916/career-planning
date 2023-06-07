export const Welcome = () => {
  return (
    <div className="text-base leading-[1.875rem] text-[#3C3C3C] w-full h-full px-4 mt-[0.625rem]">
      <div className='mb-8'>你好，我是你的</div>
      <div className='font-semibold	mb-8 text-4xl'>专属生涯咨询师</div>
      <div className='mb-8'>我已接入 ChatGPT，专门学习了各大高校最新的信息、招生要求及历年分数线，只为给你提供你所需要的院校/专业，并帮助你分析哪些更适合你。</div>
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
