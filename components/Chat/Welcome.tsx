export const Welcome = () => {
  return (
    <div className="text-base leading-[1.875rem] text-[#3C3C3C] w-full h-full px-4 mt-[0.625rem]">
      <div className='mb-8'>你好，我是你的</div>
      <div className='font-semibold	mb-8 text-4xl'>专属生涯咨询师</div>
      <div className='mb-8'>我叫 MyPath，利用了目前全球最先进的 AI 技术，专为志愿咨询开发。我不仅能为你提供准确的志愿信息，还涵盖了 ChatGPT 的所有能力，快来和我聊聊看~</div>
      <div className='mb-8'>
        你可以：
        <ul className='mt-3 pl-5 list-disc'>
          <li>描述你的性格、偏好，获取职业建议</li>
            <li>咨询高校、专业、志愿信息</li>
            <li>和我玩~</li>
        </ul>
      </div>
    </div>
  )
}
