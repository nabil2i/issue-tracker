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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className=" border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>

            {/* <Button
              className="block sm:hidden"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6 text-black cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </Button>

            {isMobileMenuOpen && (
              <ul className="sm:hidden block bg-white py-3 px-5">
                {getMobileMenuLinks()}
              </ul>
            )}

          
            <ul className="hidden sm:flex space-x-6">
              {getNavLinks()}
            </ul>
            */}
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

const getNavLinks = () => {
  // Get regular navigation links
  // ... (your existing logic)
};

const getMobileMenuLinks = () => {
  // Get mobile menu links (for smaller screens)
  // ... (similar logic to get regular nav links)
};


const Mobile = () => {
  


  return (
    <div>Mobile</div>
  )
}


const AuthStatus = () => {
  const { status, data: session } = useSession();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  return (
    <Box>
      {/* <DropdownMenu.Root onOpenChange={(open) => setIsDropdownOpen(open)}> */}
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
            <Link href="/profile">Profile</Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="cursor-pointer">
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>

        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Toaster />
    </Box>
  );
};
export default NavBar;
