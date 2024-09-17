'use client'

import Button from "@/components/general/button";
import Input from "@/components/general/input";
import Logo from "@/components/layout/logo";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaGoogle } from "react-icons/fa6";

export default function Login() {
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [hasSentOTP, setHasSentOTP] = useState(false);

  // const router = useRouter();

  async function onLoginClickWithEmailLink() {
    if (!email) {
      alert('Please enter an email');
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.APP_URL}`
      }
    });

    if (error) {
      alert('Failed to login');
      return;
    }

    setHasSentOTP(true);
  }

  // async function onLoginWithEmailPassword() {
  //   if (!email) {
  //     alert('Please enter an email');
  //   }

  //   const supabase = createClient();

  //   const { error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password
  //   });

  //   if (error) {
  //     alert('Failed to login');
  //     return;
  //   }

  //   router.push(`/app`);
  // }

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
            {!hasSentOTP ? (
              <>
                <Input placeholder="Email" className="bg-white" value={email} onChange={e => setEmail(e.target.value)} />
                {/* <Input type="password" placeholder="Password" className="bg-white" value={password} onChange={e => setPassword(e.target.value)} /> */}
                <Button
                  Icon={<FaEnvelope />}
                  text="Continue with email"
                  className="w-full"
                  onClick={onLoginClickWithEmailLink}
                />
                <hr className="border-gray-400" />
                <form action="/api/user/login/google" method="get">
                  <Button
                    type="submit"
                    text="Continue with google"
                    className="bg-[#EA4335] text-white w-full"
                    Icon={<FaGoogle />}
                    color='none'
                  />
                </form>
              </>
            ) : (
              <div className="w-full flex flex-col justify-start">
                <h3 className="text-2xl text-left font-semibold mb-1">Email sent</h3>
                <p className="text-left">An email has been sent to {email} with a magic🪄 link.<br />Click on the link to continue.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}