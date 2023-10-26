"use client";

import { User } from "@prisma/client";
import { Select, Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/app/components";

const IssueAssigneeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <Flex align="center" gap="2" justify="between">
      <Text>Filter by assignee: </Text>
      <Select.Root
        defaultValue={searchParams.get('assignee') || ''}
        onValueChange={(assignee) => {
          const params = new URLSearchParams();
          if (assignee) params.append("assignee", assignee);
          if (searchParams.get("status"))
            params.append("status", searchParams.get("status")!);
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);     
          if (searchParams.get("pageSize"))
            params.append("pageSize", searchParams.get("pageSize")!);     

          const query = params.size ? '?' + params.toString() : ''; 
          router.push("/issues/list" + query);
        }}
      >
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>
          <Select.Item value="">All</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id || ""}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
});

export default IssueAssigneeFilter
