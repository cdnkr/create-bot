import { CgBrowser } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa";
import { PiRobot } from "react-icons/pi";
import { TiFlowChildren } from "react-icons/ti";

const botTypes = [
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
        icons: [<CgBrowser key={5} />, <TiFlowChildren key={6} />],
        show: false
    },
    {
        type: 'web-ai-bot',
        name: 'Web AI bot',
        description: 'Create an AI powered bot for your Website.',
        link: '/app/bot/ai/new',
        icons: [<CgBrowser key={7} />, <PiRobot key={8} />],
        show: false
    },
];

export default botTypes;