"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupForm() {

    const router = useRouter()
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        password: ""
    })

    const [disable, setDisable] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      if(userData.userName.length > 0 && userData.email.length > 0 && userData.password.length > 0) {
        setDisable(false)
      }else{
        setDisable(true)
      }
    
      
    }, [userData])


  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
        setLoading(true)
        const response = await axios.post("/api/users/signup", userData);
        toast.success(response.data.message);
        console.log("Signup successfull", response.data);
        router.push("/login")
    } catch (error: any) {
        toast.error(error.message)
    }
    console.log("Form submitted");
    toast.success("Form submitted");
  };


  return (
    <div className=" flex items-center justify-center h-screen">
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Create a new account
          </p>
          <form className="my-8" onSubmit={(e)=> handleSubmit(e)}>
          <LabelInputContainer className="mb-4">
              <Label htmlFor="userName">User Name</Label>
              <Input 
                id="userName" 
                placeholder="Devin" 
                type="text"
                onChange={(e) => setUserData({...userData, userName: e.target.value})}
                value={userData.userName} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                placeholder="Demin@gmail.com"
                onChange={(e) => setUserData({...userData, email: e.target.value})}
                value={userData.email} 
                type="email" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                onChange={(e) => setUserData({...userData, password: e.target.value})}
                value={userData.password}
                placeholder="••••••••" 
                type="password" />
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:text-gray-600"
              type="submit"
              disabled={disable}
              onClick={(e) => handleSubmit(e)}
            >
             {loading ? "Loading..." :  `Sign up`}
              <BottomGradient />
            </button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
