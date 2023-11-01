"use client";

import { Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const filteringOptions = ['ASC', 'DSC'];

const IssueDateFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Flex align="center" gap="2" justify="between">
      <Text>Date Order: </Text>
      <Select.Root
        defaultValue={searchParams.get('orderBy') || 'ASC | DESC'}
        onValueChange={(ordering) => {
          const params = new URLSearchParams();
          if (searchParams.get("status"))
            params.append("status", searchParams.get("status")!);
          if (searchParams.get("assignee"))
            params.append("assignee", searchParams.get("assignee")!);
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);
          if (ordering) params.append("orderBy", ordering);

          const query = params.size ? '?' + params.toString() : ''; 
          router.push("/issues/list" + query);
        }}
      >
        <Select.Trigger>
          <span>__Select a date order__</span>
        </Select.Trigger>
        <Select.Content>
          {filteringOptions.map((ordering) => (
            <Select.Item
              key={ordering}
              value={String(ordering)}
            >
              {ordering}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default IssueDateFilter;
