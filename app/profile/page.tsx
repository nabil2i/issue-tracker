"use client";

import { Skeleton, Spinner } from "@/app/components";
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
  Grid,
  Card,
  Separator,
  Heading,

} from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillBug } from "react-icons/ai";
import DeleteAccount from "./_components/DeleteAccount";
import EditName from "./_components/EditName";
import EditEmail from "./_components/EditEmail";
import EditPassword from "./_components/EditPassword";
import AccountTab from "./_components/AccountTab";


const AccountPage = () => {

  return (
    <Box>
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          {/* <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger> */}
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="account">
            <AccountTab />
          </Tabs.Content>

          {/* <Tabs.Content value="documents">
            <Text size="2">Access and update your documents.</Text>
          </Tabs.Content>

          <Tabs.Content value="settings">
            <Text size="2">Edit your profile or update contact information.</Text>
          </Tabs.Content> */}
        </Box>
      </Tabs.Root>
    </Box>
  )
}

export default AccountPage
