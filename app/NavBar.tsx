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
} from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  return (
    <nav className=" border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated") {
    return (
      <Flex align="center" gap="3">
        <Button
          className="var(--accent-9)"
          variant="ghost"
          onClick={() => signIn()}
        >
          Log In
        </Button>
        <Button
          className="var(--accent-9)"
          onClick={() => router.push("/register")}
        >
          Sign up
        </Button>
      </Flex>
      // return <Link className="nav-link" href="/api/auth/signin">Log in</Link>
    );
  }

  const deleteAccount = async () => {
    try {
      setIsDeleting(true);
      const res = await axios.delete("/api/users/" + session?.user?.email);
      if (res.status === 200) {
        toast.success("Account deleted.");
        router.push("/register");
        router.refresh();
        signOut();
      } else {
        toast.error("Account was not deleted");
      }
    } catch (error) {
      setIsDeleting(false);
      setError(true);
      setIsDialogOpen(true);
      toast.error("Account was not deleted");
    }
  };

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex align="center" className="cursor-pointer">
            <Avatar
              src={session!.user!.image!}
              fallback={session!.user!.name!.slice(0, 1)}
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
            {/* <CaretDownIcon /> */}
          </Flex>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item className="cursor-pointer">
            <Link href="/api/auth/signout">Log out</Link>
            {/* <Button onClick={() => signOut()}>Log out</Button> */}
          </DropdownMenu.Item>

          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <DropdownMenu.Item className="cursor-pointer mt-2" color="red">
                Delete Account{isDeleting && <Spinner />}
              </DropdownMenu.Item>
            </AlertDialog.Trigger>
            <AlertDialogContent>
              <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
              <AlertDialog.Description>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </AlertDialog.Description>
              <Flex mt="4" gap="3">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
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

          <AlertDialog.Root open={isDialogOpen}>
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
                  setIsDialogOpen(false);
                }}
              >
                OK
              </Button>
            </AlertDialogContent>
          </AlertDialog.Root>

          {/* <Button
              className="menu-btn"
              variant="outline"
              onClick={deleteAccount}
            >
              Delete Account
            </Button> */}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Toaster />
    </Box>
  );
};
export default NavBar;
