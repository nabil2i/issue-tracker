"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { loginSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Callout,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegistrationFormData = z.infer<typeof loginSchema>;

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
        refresh: false,
      });
      // console.log(result);
      if (result?.error === "CredentialsSignin" || !result) {
        setError("Invalid credentials.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  });

  const handleGoogleSignIn = async () => {
    await signIn("google");
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* <div className="h-screen w-screen flex justify-center items-center bg-slate-100"> */}
      {/* <div className="sm:shadow-xl p-4 sm:bg-white rounded-xl"> */}

      <div className="flex justify-center items-center max-h-screen sm:bg-gray-100 p-4">
        <div className="sm:shadow-xl p-4 sm:bg-white rounded-xl max-w-2xl">
          {error && (
            <Callout.Root color="red" className="mb-3">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <Heading align="center">Sign In</Heading>
          <form onSubmit={onSubmit} className="mt-2">
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 8,
                    message: "Email must be at least 8 characters.",
                  },
                  maxLength: {
                    value: 255,
                    message: "Email must be at most 255 characters.",
                  },
                })}
                className="w-full border rounded-md p-2"
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be at most 255 characters.",
                  },
                })}
                className="w-full border rounded-md p-2"
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </div>
            <div className="py-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full var(--accent-9) rounded-md"
                // className="bg-var(--accent-9) text-white px-4 py-2 rounded-md"
              >
                Sign In
                {isSubmitting && <Spinner />}
              </Button>
            </div>
            <div className="flex justify-center gap-1">
              <Text>Don&apos;t have an account?</Text>
              <Box>
                <Link
                  style={{ color: "var(--accent-9)" }}
                  className="hover:underline"
                  href="/register"
                >
                  Sign up
                </Link>
              </Box>
            </div>
          </form>

          <div className="mt-4">
            <div className="flexContainer">
              <Separator orientation="horizontal" size="2" className="" />
              <Text style={{ whiteSpace: "nowrap" }}>Or with</Text>
              <Separator orientation="horizontal" size="2" className="" />
            </div>
            <div className="flex justify-center mt-4">
              <Button
                onClick={handleGoogleSignIn}
                className="buttonContainer"
                variant="outline"
              >
                <Image
                  src="/icons/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                />
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
