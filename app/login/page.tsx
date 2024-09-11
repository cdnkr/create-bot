import Button from "@/components/general/button";
import Input from "@/components/general/input";
import Logo from "@/components/layout/logo";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLogin } from "react-icons/ai";

export default function Login() {
  return (
    <div className="max-w-full m-0 bg-transparent min-h-screen flex justify-center flex-1">
      <div className="flex-1 text-center flex justify-center items-center">
        <div className="m-12 xl:m-16 w-full flex flex-col items-center justify-center gap-5">
          <Logo className="text-5xl" textClassName="text-4xl" />
          <Image
            src="/assets/bot.png"
            className="w-80 h-auto"
            alt="bot graphic"
            height={320}
            width={320}
          />
          <div className="flex flex-col gap-5 max-w-xl w-full">
            <Input placeholder="Email" className="bg-white" />
            <Link
              href={`/app`}
            >
            <Button
              Icon={<AiOutlineLogin />}
              text="Start"
              className="w-full"
            />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}