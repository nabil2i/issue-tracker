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
import { useSession } from "next-auth/react";
import EditName from "./EditName";
import EditEmail from "./EditEmail";
import EditPassword from "./EditPassword";
import DeleteAccount from "./DeleteAccount";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";
import axios from "axios";
import ProfileProvider from "./ProfileProvider";
import useProfileContext from "../hooks/useProfileContext";


const AccountTab = () => {
  const { status, data: session, update } = useSession();
  const [isUpdating, setIsUpdating] = useState(false);
  const { dispatch, profileData } = useProfileContext();
  
  // const refreshSession = async () => {
  //   try {
  //     setIsUpdating(true);
  //     await update();
  //     setIsUpdating(false);
  //   } catch (error) {
  //     console.error('Error updating session:', error);
  //     setIsUpdating(false);
  //   }
  // };
  // const { data: userData, error, isLoading } = useUser();
  // const [ user, setUser] = useState<User>(session.user | {});

  // console.log(user)
  // if (isLoading) return <Spinner />;

  // if (error || !session) return null;

  // if (!user && userData) {
  //   setUser(userData);
  // }
  
  // if (session && user) {
  return (
    <>
      <Text size="2">Make changes to your account.</Text>
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      
        <Flex direction="column" justify="center" align="center" gap="4" mt="5" display={{ initial: "flex", sm: "none" }}>
        {session && (
        //   <Avatar
        //   src={user!.image!}
        //   fallback={user!.name!.slice(0, 1)}
        //   size="9"
        //   radius="full"
        //   className="cursor-pointer"
        //   referrerPolicy="no-referrer"
        // />  
          <Avatar
            src={session!.user!.image!}
            fallback={session!.user!.name!.slice(0, 1)}
            size="9"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
        />  
        )}
        </Flex>
        
        <Flex direction="column" className="md:col-span-4" gap="3">
          <Card style={{ padding: 20, border: '1px solid #ccc' }}>
            <Flex align="center" justify="between">
              <Flex direction="column">
                <Text className="text-gray-500">
                  <strong>Full Name</strong> {}
                </Text>
                <Text >
                  <strong>{profileData.name}</strong> {}
                  {/* <strong>{session?.user?.name ?? ""}</strong> {} */}
                </Text>
              </Flex>
              <EditName />
              {/* <EditName user={user!} setUser={setUser}/> */}
            </Flex>
            
            <Separator my="3" size="4" />

            <Flex align="center" justify="between">
              <Flex direction="column">
                <Text className="text-gray-500">
                  <strong>Email</strong> {}
                </Text>
                <Text >
                  <strong>{profileData.email}</strong> {}
                  {/* <strong>{session?.user?.email ?? ""}</strong> {} */}
                </Text>
              </Flex>
              <EditEmail />
              {/* <EditEmail user={user!} setUser={setUser}/> */}
            </Flex>
            
            <Separator my="3" size="4" />

            <Flex align="center" justify="between">
              <Flex direction="column">
                <Text className="text-gray-500">
                  <strong>Password</strong> {}
                </Text>
                <Text >
                  <strong>***********</strong> {}
                </Text>
              </Flex>
              <EditPassword />
              {/* <EditPassword user={user!} setUser={setUser}/> */}
            </Flex>
          </Card>
          <DeleteAccount />
          {/* <DeleteAccount user={user!} setUser={setUser}/> */}
        </Flex>
        
        <Box>
          <Flex direction="column" justify="center" align="center" gap="4" display={{ initial: "none", sm: "flex" }}>
          {session && (
            <Avatar
              src={session!.user!.image!}
              fallback={session!.user!.name!.slice(0, 1)}
              size="9"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />  
          )}
          </Flex>
        </Box>
        
        {/* <Flex direction="column" display={{ initial: "flex", sm: "none" }}>
          
        </Flex> */}
      </Grid>
    </>
  );
    // } else {
    //   return null;
    // }
}

// const useUser = () =>
//   useQuery<User>({
//     queryKey: ["user"],
//     queryFn: () => axios.get("/api/users/me").then((res) => res.data),
//     staleTime: 60 * 1000,
//     retry: 3,
// });


export default AccountTab