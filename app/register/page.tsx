'use client'

import Button from "@/components/general/button";
import Input from "@/components/general/input";
import Logo from "@/components/layout/logo";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function onRegisterClick() {
    if (!email) {
      alert('Please enter an email');
    }

    let response = await axios.post('/api/user/register', {
      email,
      password
    });

    if (!response?.data?.user?.id) {
      alert('Failed to register');
      return;
    }

    alert('Please verify your email');
  }

  return (
    <div className="max-w-full m-0 bg-transparent flex justify-center flex-1 mt-10">
      <div className="flex-1 text-center flex justify-center items-center">
        <div className="w-full flex flex-col items-center justify-center gap-5">
          <Link href="/">
            <Logo className="text-5xl" textClassName="text-4xl" />
          </Link>
          <Image
            src="/assets/bot.png"
            className="w-80 h-auto"
            alt="bot graphic"
            height={320}
            width={320}
          />
          <div className="flex flex-col gap-5 max-w-xl w-full">
            <Input placeholder="Email" className="bg-white" value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" className="bg-white" value={password} onChange={e => setPassword(e.target.value)} />
            <Button
              Icon={<AiOutlineLogin />}
              text="Register"
              className="w-full"
              onClick={onRegisterClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}