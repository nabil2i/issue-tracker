"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { passwordSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useRegistrationContext from "../hooks/useRegistrationContext";

type PasswordFormData = z.infer<typeof passwordSchema>;

const PasswordForm = () => {
  const { onBack, onNext, registrationData, dispatch } = useRegistrationContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: registrationData,
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const password = watch("password");
  const password2 = watch("password2");

  const onSubmit = handleSubmit(async (data) => {
    // console.log({ data });
    if (password !== password2) {
      setError("Passwords do not match");
      setSubmitting(false);
      return;
    }

    setSubmitting(true);
    try {
      dispatch({
        type: "UPDATE_PASSWORD",
        registrationData: {
          ...registrationData,
          ...data
        },
      });
      // setRegistrationData((prevRegistrationData) => ({...prevRegistrationData, ...data}))
      // console.log("data to send", { ...registrationData, ...data })
      await axios.post("/api/register/", { ...registrationData, ...data });
      router.push("/api/auth/signin");
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <>
      <div>
        {error && (
          <Callout.Root color="red" className="mb-3">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form onSubmit={onSubmit} className="mt-2">
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
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
            <label className="block mb-1" htmlFor="password2">
              Confirm Password
            </label>
            <input
              id="password2"
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

          <Flex className="py-2" gap="2" justify="center">
            <Button
              type="button"
              onClick={onBack}
              className="var(--accent-9) rounded-md"
              // className="bg-var(--accent-9) text-white px-4 py-2 rounded-md"
            >
              Back
              {/* {isSubmitting && <Spinner />} */}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="var(--accent-9) rounded-md"
              // className="bg-var(--accent-9) text-white px-4 py-2 rounded-md"
            >
              Create
              {isSubmitting && <Spinner />}
            </Button>
          </Flex>
        </form>
      </div>
    </>
  );
};

export default PasswordForm;
