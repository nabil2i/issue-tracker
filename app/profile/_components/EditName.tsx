import React, { Dispatch, SetStateAction, useState } from 'react'
import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { updateUserSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { Spinner } from '@/app/components';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

type UpdateFormData = z.infer<typeof updateUserSchema>;

// const EditName = ({ user, setUser }: { user: User, setUser:  Dispatch<SetStateAction<User>>}) => {
const EditName = ({ user}: { user: User}) => {
  const { status, data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateUserSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    // console.log("our data", data );
    try {
      setSubmitting(true);
      const name = data.name?.trim();
      await axios.patch("/api/users/me", { name })
      // setUser((prevUser) => ({
      //   ...prevUser,
      //   name: name, // Update the name with the new value
      // }));
      update(session);
      toast.success("Changes updated.");
      // router.push('/profile')
      router.refresh();
    } catch (error) {
      setError("An unexpected error occurred.");
      toast.error("Changes could not be saved.");
      // console.error(error)
    } finally {
      setSubmitting(false);
    }
  });
  
  return (
    <>
    
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Edit</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit your name</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
        <form onSubmit={onSubmit}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Full Name
            </Text>
            <TextField.Input
              defaultValue={user?.name ?? ''}
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Name must be at most 20 characters.",
                },
              })}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button type="button" variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button type="submit" disabled={isSubmitting}>Save {isSubmitting && <Spinner />}</Button>
          </Dialog.Close>
        </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
    <Toaster />
    </>
  )
}

export default EditName