"use client";

import { ErrorMessage, Spinner } from '@/app/components';
import { registerSchema, registrationSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Flex, Button, Callout, Heading, Separator, TextField } from "@radix-ui/themes";
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Text } from "@radix-ui/themes";
import Image from 'next/image';

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const password = watch("password");
  const password2 = watch("password2");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (password !== password2) {
        setError("Passwords do not match");
        setSubmitting(false);
        return;
      }
      const result = await signIn("credentials", {
        name: data.firstName?.trim() + " " + data.lastName?.trim(),
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      })
      // await axios.post("/api/register/", data);
      // router.push("/issues/list");
      // router.refresh();
      router.push("/register/password");
    } catch (error) {
      setError("An unexpected error occurred.");
      setSubmitting(false);
    }  
  });

  const handleGoogleSignIn = async () => {
    await signIn('google');
  };

  
  return (
    <>
    {/* <div className="h-screen w-screen flex justify-center items-center bg-slate-100"> */}
      {/* <div className="sm:shadow-xl p-4 sm:bg-white rounded-xl"> */}

    <div className="flex justify-center items-center min-h-screen sm:bg-gray-100 p-4">
      <div className="sm:shadow-xl p-4 sm:bg-white rounded-xl max-w-2xl">
        {error && (
          <Callout.Root color="red" className="mb-3">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Heading align='center'>Register</Heading>
        <form onSubmit={onSubmit} className="mt-2"
        >
          <Flex justify={{ initial: 'between', md: 'start'}} direction={{ initial: 'column', md: 'row'}} gap="2" className='mb-4'>
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 5,
                    message: "First name must be at least 5 characters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "First name must be at most 20 characters.",
                  },
                })}
                className="w-full border rounded-md p-2"
                />
              <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 5,
                    message: "Last name must be at least 5 characters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Last name must be at most 20 characters.",
                  },
                })}
                className="w-full border rounded-md p-2"
                />
              <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            </div>
          </Flex>
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
          <div className="mb-4">
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              {...register("password2", {
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
            <ErrorMessage>{errors.password2?.message}</ErrorMessage>
          </div>

          <div className='py-2'>
            <Button type="submit" disabled={isSubmitting}
              className="w-full var(--accent-9) rounded-md"
              // className="bg-var(--accent-9) text-white px-4 py-2 rounded-md"
            >
              Sign Up
              {isSubmitting && <Spinner />}
            </Button>
          </div>
          <div className='flex justify-center gap-3'>
            <Text>Already have an account?</Text>
            <Box>
              <Link  style={{ color: 'var(--accent-9)' }} className='hover:underline' href="/login">Sign in</Link>
            </Box>
          </div>
        </form>

        <div className='mt-4'>
          <div className="flexContainer">
            <Separator orientation="horizontal" size="2" className=''/>
            <Text style={{ whiteSpace: 'nowrap' }}>Or with</Text>
            <Separator orientation="horizontal" size="2" className=''/>
          </div>
          <div className='flex justify-center mt-4'>
            <Button onClick={handleGoogleSignIn} className="buttonContainer" variant="outline">
              <Image src="/icons/google.svg" alt="Google" width={24} height={24} />
              Sign up with Google
            </Button>
          </div>
        </div>
      
      </div>   
    </div>
    
    </>
  )
}

export default RegistrationPage
