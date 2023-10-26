"use client";

import { Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const pageSizes = [10, 15, 20, 25, 30];

const IssuePageSize = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Flex align="center" gap="2" justify="between">
      <Text>Page Size: </Text>
      <Select.Root
        defaultValue={searchParams.get('pageSize') || '10'}
        onValueChange={(size) => {
          const params = new URLSearchParams();
          if (searchParams.get("status"))
            params.append("status", searchParams.get("status")!);
          if (searchParams.get("assignee"))
            params.append("assignee", searchParams.get("assignee")!);
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);
          if (size) params.append("pageSize", size);

          const query = params.size ? '?' + params.toString() : ''; 
          router.push("/issues/list" + query);
        }}
      >
        <Select.Trigger>
          <span>__Select a page size__</span>
        </Select.Trigger>
        <Select.Content>
          {pageSizes.map((size) => (
            <Select.Item
              key={size}
              value={String(size)}
              // onSelect={() => handlePageSizeChange(size)}
            >
              {size}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default IssuePageSize;
