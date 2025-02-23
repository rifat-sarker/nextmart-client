"use client";

import ReCAPTCHA from "react-google-recaptcha";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { loginUser, reCaptchaVerify } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidaiton";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const [reCaptchStatus, setReCaptchStatus] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const handleReCatpcha = async (value: string | null) => {
    try {
      const res = await reCaptchaVerify(value!);
      if (res?.success) {
        setReCaptchStatus(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/profile");
        }
      } else {
        toast.error(res?.message);
      }
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex mt-5 w-full">
            <ReCAPTCHA
              className="mx-auto"
              sitekey={process.env.NEXT_PUBLIC_CLIENT_KEY!}
              onChange={handleReCatpcha}
            />
          </div>

          <Button
            disabled={reCaptchStatus ? false : true}
            className="my-4 w-full mt-5 "
            type="submit"
          >
            {isSubmitting ? "Loggin..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have an account ?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
