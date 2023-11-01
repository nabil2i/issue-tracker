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
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type UpdateFormData = z.infer<typeof updateUserSchema>;

const EditPassword = () => {
  // const EditPassword = ({
  //   user,
  //   setUser,
  // }: {
  //   user: User;
  //   setUser: Dispatch<SetStateAction<User>>;
  // }) => {
  const { status, data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateUserSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const password = watch("password");
  const password2 = watch("password2");

  const onSubmit = handleSubmit(async (data) => {
    console.log("our data", data);
    if (password !== password2) {
      setError("Passwords do not match");
      setSubmitting(false);
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.patch("/api/users/me", { password });
      // console.log(res)
      if (res.status === 200) {
        await update({
          ...session,
          user: {
            ...session?.user,
            password,
          },
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
        {/* <Dialog.Trigger>
          <Button>Change</Button>
        </Dialog.Trigger> */}
        <Dialog.Content style={{ maxWidth: 450 }}>
          {error && (
            <Callout.Root color="red" className="mb-3">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <Dialog.Title>Change</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description>
          <form onSubmit={onSubmit}>
            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Enter new password
                </Text>
                <TextField.Input
                  defaultValue=""
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters.",
                    },
                  })}
                />
              </label>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Confirm new password
                </Text>
                <TextField.Input
                  defaultValue=""
                  type="password"
                  {...register("password2", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters.",
                    },
                  })}
                />
              </label>
              <ErrorMessage>{errors.password2?.message}</ErrorMessage>
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

              {/* <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close> */}
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

export default EditPassword;
