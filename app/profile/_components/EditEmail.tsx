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
import toast from "react-hot-toast";
import { z } from "zod";
import useProfileContext from "../hooks/useProfileContext";

type UpdateFormData = z.infer<typeof updateUserSchema>;

// const EditEmail = ({
//   user,
//   setUser,
// }: {
//   user: User;
//   setUser: Dispatch<SetStateAction<User>>;
// }) => {
const EditEmail = () => {
  const { dispatch, profileData } = useProfileContext();
  const { status, data: session, update } = useSession();
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
      const email = data.email?.trim();
      const res = await axios.patch("/api/users/me", { email });
      // console.log(res);
      if (res.status === 200) {
        await update({
          ...session,
          user: {
            ...session?.user,
            email,
          },
        });
        dispatch({
          type: "UPDATE_EMAIL",
          profileData: { ...profileData, ...data },
        });
        setIsOpen(false);
        toast.success("Changes updated.");
      }
    } catch (error) {
      toast.error("Changes could not be saved.");
      // setError("An unexpected error occurred.");
      // console.error(error)
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
          <Dialog.Title>Edit your email</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description>
          <form onSubmit={onSubmit}>
            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Email
                </Text>
                <TextField.Input
                  defaultValue={session?.user?.email ?? ""}
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
              </label>
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
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
    </>
  );
};

export default EditEmail;
