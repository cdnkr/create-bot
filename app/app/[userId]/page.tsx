import { formatDateTime } from "@/utils/date";
import axios from "axios";
import Link from "next/link";
import { Fragment } from "react";
import { CgBrowser } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa";
import { PiRobot } from "react-icons/pi";
import { TiFlowChildren } from "react-icons/ti";

const BOT_TYPES = [
  {
    type: 'whatsapp-flow-bot',
    name: 'WhatsApp flow bot',
    description: 'Create an interactive flow bot on WhatsApp.',
    link: '/app/bot/whatsapp/new',
    icons: [<FaWhatsapp key={1} />, <TiFlowChildren key={2} />]
  },
  {
    type: 'whatsapp-ai-bot',
    name: 'WhatsApp AI bot',
    description: 'Create an AI powered bot for WhatsApp.',
    link: '/app/bot/whatsapp/new',
    icons: [<FaWhatsapp key={3} />, <PiRobot key={4} />]
  },
  {
    type: 'web-flow-bot',
    name: 'Web flow bot',
    description: 'Create an interactive flow bot for your Website.',
    link: '/app/bot/web/new',
    icons: [<CgBrowser key={5} />, <TiFlowChildren key={6} />]
  },
  {
    type: 'web-ai-bot',
    name: 'Web AI bot',
    description: 'Create an AI powered bot for your Website.',
    link: '/app/bot/ai/new',
    icons: [<CgBrowser key={7} />, <PiRobot key={8} />]
  },
];

interface Props {
  params: { userId: string }
}

const AppHomePage: React.FC<Props> = async ({
  params: { userId },
}) => {
  const response = await axios.get(`${process.env.APP_URL}/api/bot/by-user/${userId}`);
  const bots = response.data;

  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold">Hi Chad,&nbsp;<span className="font-light">what would you like to build today?</span></h1>
      </div>
      <div className={`w-full mx-0 grid grid-cols-1 md:grid-cols-4 justify-items-center justify-center gap-5 mt-5 mb-5`}>
        {BOT_TYPES.map((botType, i) => (
          <Link key={i} href={botType.link} className='w-full'>
            <div className='group relative transition-all w-full bg-white flex shadow-md rounded-xl hover:shadow-xl overflow-hidden'>
              <div className='relative self-end mt-auto w-full'>
                <div className="p-4">
                  <div className="flex p-5 rounded-lg bg-slate-100 w-full justify-center items-center text-5xl text-gray-600 group-hover:text-gray-900">
                    {botType.icons.map((icon, j) => (
                      <Fragment key={j}>
                        {icon}{j === 0 && <span className="font-extralight">+</span>}
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div className='px-4 pb-3 w-full mb-2'>
                  <p className='text-lg font-bold text-gray-800 group-hover:text-black block truncate capitalize leading-6'>{botType.name}</p>
                  <p className='text-blue-600 mr-3 text-xs leading-0 mt-1'>{botType.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-bold"><span className="font-light">Pick up where you left off,</span></h1>
      <div className={`w-full mx-0 grid grid-cols-1 md:grid-cols-3 justify-items-center justify-center gap-5 mt-5 mb-5`}>
        {bots.map((botDetails: any) => (
          <Link key={botDetails.id} href={`/app/bot/whatsapp/edit/${botDetails.id}`} className='w-full'>
            <div className='group relative transition-all w-full bg-white flex shadow-md rounded-xl hover:shadow-xl overflow-hidden'>
              <div className='relative self-end mt-auto w-full'>
                <div className='px-4 py-3 w-full mb-2'>
                  <p className='text-lg font-bold text-gray-800 group-hover:text-black block truncate capitalize leading-6'>{botDetails.name}</p>
                  <p className='text-blue-600 mr-3 text-xs leading-0 mt-1'>{formatDateTime(botDetails.created_at)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AppHomePage;