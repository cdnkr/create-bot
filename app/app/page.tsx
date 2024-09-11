import Card from "@/components/general/card";
import axios from "axios";

const BOT_TYPES = [
  {
    type: 'whatsapp-flow-bot',
    link: '/app/bot/whatsapp/new'
  },
  {
    type: 'whatsapp-ai-bot',
    link: '/app/bot/whatsapp/new'
  },
  {
    type: 'web-flow-bot',
    link: '/app/bot/web/new'
  },
  {
    type: 'web-ai-bot',
    link: '/app/bot/ai/new'
  },
]

export default async function AppHomePage() {
  const userId = '5ab6b5e3-5cbe-48dd-8714-b97d5f090cc2';

  const response = await axios.get(`${process.env.APP_URL}/api/bot/by-user/${userId}`);
  const bots = response.data;

  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold">Hi Chad,&nbsp;<span className="font-light">what would you like to build today?</span></h1>
      </div>
      <div className={`w-full mx-0 grid grid-cols-1 md:grid-cols-4 justify-items-center justify-center gap-5 mt-5 mb-5`}>
        {BOT_TYPES.map(botType => (
          <Card
            key={botType.type}
            title={botType.type}
            description={botType.type}
            link={botType.link}
          />
        ))}
      </div>
      <h1 className="text-3xl font-bold"><span className="font-light">Pick up where you left off,</span></h1>
      <div className={`w-full mx-0 grid grid-cols-1 md:grid-cols-3 justify-items-center justify-center gap-5 mt-5 mb-5`}>
        {bots.map((botDetails: any) => (
          <Card
            key={botDetails.id}
            title={botDetails.name}
            description={botDetails.created_at}
            link={`/app/bot/whatsapp/edit/${botDetails.id}`}
          />
        ))}
      </div>
    </div>
  );
}
