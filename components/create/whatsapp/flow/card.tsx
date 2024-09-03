import { WhatsAppMessageType } from '@/types/whatsapp';
import { BiPlusCircle } from 'react-icons/bi';

interface Props {
    message: WhatsAppMessageType;
}

function FlowCard({ message }: Props) {
    return (
        <div className='w-full pb-10 relative flex cursor-pointer'>
            {/* <div className='w-3 border-l-2 border-gray-400' />
            <div className='w-3 border-b-2 border-gray-400 absolute top-0 left-0' /> */}
            <div className='relative h-auto w-full flex shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl album-card overflow-hidden'>
                {/* <div className='absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.9)] z-10'></div> */}
                <div className='relative self-end mt-auto w-full z-10'>
                    <div className='px-4 py-3 w-full'>
                        <p className='text-base font-bold block truncate'>{message.templateName}</p>
                        <p className='text-xs font-light italic block mb-2'>{message.type}</p>
                        {message.type === 'interactive' && (
                            <>
                                {message.interactive.header?.text && (
                                    <p className='text-xs font-bold text-gray-600 block truncate'>{message.interactive.header.text}</p>
                                )}
                                {message.interactive.body?.text && (
                                    <p className='text-xs text-gray-600 block truncate'>{message.interactive.body.text}</p>
                                )}
                                {message.interactive.action?.buttons && (
                                    <div className='flex'>
                                        {message.interactive.action?.buttons.map(button => (
                                            <div>
                                                <span>{button.reply.title}</span>
                                                <div className='px-2 py-0.5 cursor-pointer border-[1px] border-solid border-gray-500 text-gray-500 rounded-md flex items-center justify-center'>
                                                    <BiPlusCircle /> Assign template
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlowCard;