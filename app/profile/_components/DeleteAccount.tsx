"use client";

import { Skeleton, Spinner } from "@/app/components";
import { User } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogContent,
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
  Tabs,
} from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillBug } from "react-icons/ai";


// const DeleteAccount = ({ user, setUser }: { user: User, setUser:  Dispatch<SetStateAction<User>>}) => {
const DeleteAccount = ({ user}: { user: User}) => {
  const { status, data: session, update } = useSession();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const deleteAccount = async () => {
    try {
      setIsDeleting(true);
      const res = await axios.delete("/api/users/me");
      if (res.status === 200) {
        toast.success("Account deleted.");
        router.push("/register");
        router.refresh();
        signOut();
      } 
      // else {
      //   toast.error("Account was not deleted");
      // }
    } catch (error) {
      setError(true);
      // toast.error("Account was not deleted");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Box>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            Delete Account {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>

        <AlertDialogContent>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete your account? This action cannot
            be undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteAccount}>
                Delete Account
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialogContent>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialogContent>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This account could not be deleted.
          </AlertDialog.Description>
          <Button
            variant="soft"
            color="gray"
            mt="2"
            onClick={() => {
              setError(false);
            }}
          >
            OK
          </Button>
        </AlertDialogContent>
      </AlertDialog.Root>
    </Box>
  )
}

export default DeleteAccount
