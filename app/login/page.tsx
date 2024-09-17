'use client'

import Button from "@/components/general/button";
import Input from "@/components/general/input";
import Logo from "@/components/layout/logo";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa6";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function onLoginClick() {
    if (!email) {
      alert('Please enter an email');
    }
    
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert('Failed to login');
      return;
    }

    router.push(`/app`);
  }

  async function onSignInWithGoogleLoginClick() {
    await axios.get('/api/user/login/google');
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
              text="Login"
              className="w-full"
              onClick={onLoginClick}
            />
            <form action="/api/user/login/google" method="get">
              <Button
                type="submit"
                text="Continue with google"
                className="bg-[#EA4335] w-full"
                Icon={<FaGoogle />}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}