"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { emailSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Callout, Separator, Text } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useRegistrationContext from "../hooks/useRegistrationContext";

type EmailFormData = z.infer<typeof emailSchema>;

const EmailForm = () => {
  const { onNext, registrationData, dispatch } = useRegistrationContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: registrationData,
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    // console.log({data})
    const email = data.email;
    try {
      setSubmitting(true);
      const res = await axios.get("/api/users/" + email);
      // console.log(res);
      if (res.status === 200) {
        setError("User already exists");
        return null;
      } 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
        dispatch({
          type: "UPDATE_EMAIL",
          registrationData: { ...registrationData, ...data },
        });
        // setRegistrationData((prevRegistrationData) => ({...prevRegistrationData, ...data }))
        onNext();
      } else {
        setError("An unexpected error occurred.");
        // console.error("Error:", error);
      }
    } finally {
      setSubmitting(false);
    }
  });

  const handleGoogleSignIn = async () => {
    await signIn("google");
  };

  return (
    <>
      {error && (
        <Callout.Root color="red" className="mb-3 mt-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="mt-2">
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
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

        <div className="py-2">
          <Button
            // type="submit"
            disabled={isSubmitting}
            className="w-full var(--accent-9) rounded-md"
            // className="bg-var(--accent-9) text-white px-4 py-2 rounded-md"
          >
            Sign Up
            {isSubmitting && <Spinner />}
          </Button>
        </div>
        <div className="flex justify-center gap-3">
          <Text>Already have an account?</Text>
          <Box>
            <Link
              style={{ color: "var(--accent-9)" }}
              className="hover:underline"
              href="/auth/signIn"
            >
              Sign in
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
            Sign up with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmailForm;
