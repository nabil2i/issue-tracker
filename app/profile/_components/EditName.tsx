import { ErrorMessage, Spinner } from "@/app/components";
import { updateUserSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import useProfileContext from "../hooks/useProfileContext";

type UpdateFormData = z.infer<typeof updateUserSchema>;

const EditName = () => {
  const { dispatch, profileData } = useProfileContext();
  // const EditName = ({
  //   user,
  //   setUser,
  // }: {
  //   user: User;
  //   setUser: Dispatch<SetStateAction<User>>;
  // }) => {
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateUserSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    // console.log("our data", data );
    try {
      setSubmitting(true);
      const name = data.name?.trim();
      const res = await axios.patch("/api/users/me", { name });
      // console.log(res)
      if (res.status === 200) {
        const updatedSession = { ...session, user: { ...session?.user, name } };
        await update(updatedSession);
        dispatch({
          type: "UPDATE_NAME",
          profileData: { ...profileData, ...data },
        });
        setIsOpen(false);
        toast.success("Changes updated.");
      }
    } catch (error) {
      toast.error("Changes could not be saved.");
      // setError("An unexpected error occurred.");
      // console.error(error);
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <>
      <Dialog.Root open={isOpen}>
        <Button onClick={() => setIsOpen(true)}>Change</Button>

        <Dialog.Content style={{ maxWidth: 450 }}>
          {error && (
            <Callout.Root color="red" className="mb-3 mt-3">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
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
                  defaultValue={session?.user?.name ?? ""}
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Name must be at most 20 characters.",
                    },
                  })}
                />
              </label>
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                variant="soft"
                color="gray"
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                Save {isSubmitting && <Spinner />}
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
      <Toaster />
    </>
  );
};

export default EditName;
