import Button from "@/components/general/button";
import LoginInModal from "@/components/login/in-modal";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

export default function Home() {
  return (
    <main
      className="grid lg:grid-cols-2 gap-10 place-items-center pb-8 md:pb-24">
      <div className="pb-9 md:pb-6 md:py-6 md:order-1">
        <Image
          className="rounded-xl"
          src={`/assets/bot.png`}
          alt="Bot on the moon"
          loading="eager"
          height={600}
          width={600}
        />
      </div>
      <div>
        <h1
          className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
          Build a bot quickly, today.
        </h1>
        <p className="text-lg mt-4 text-slate-600 max-w-xl">
          Build WhatsApp or web flow based and AI chatbots. Deploy or add to your site instantly.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <LoginInModal
            TriggerEl={
              <Button
                text="Start now"
                color="blue"
                className="min-w-64 capitalize"
                Icon={<BsArrowRight />}
                iconEnd
              />
            }
          />
        </div>
      </div>
    </main>
  );
}