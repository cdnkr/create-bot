import botTypes from "@/data/bot-types";
import Link from "next/link";
import { Fragment } from "react";

interface Props {}

const StartPage: React.FC<Props> = async () => {
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div>
        <h1 className="text-3xl font-light">What would you like to build today?</h1>
      </div>
      <div className={`w-full mx-0 grid grid-cols-1 md:grid-cols-4 justify-items-center justify-center gap-5 mt-5 mb-5`}>
        <div />
        {botTypes.map((botType, i) => botType?.show !== false && (
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
        <div />
      </div>
    </div>
  );
}

export default StartPage;