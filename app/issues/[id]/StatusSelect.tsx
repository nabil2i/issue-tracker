"use client";

import { Skeleton } from "@/app/components";
import { Status, Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const statuses: { label: string; value?: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  
  const changeStatus = (status: Status) => {
    // console.log(status)
    axios
      .patch("/api/issues/" + issue.id, { status })
      .then(() => {
        toast.success("Status changed.");
        router.refresh();
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  }

  return (
    <>
      <Select.Root
        key={issue.status}
        defaultValue={issue.status}
        onValueChange={changeStatus}
      >
        <Select.Trigger placeholder="Change issue status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Change Issue Status</Select.Label>
            {/* <Select.Item value="">Unassigned</Select.Item> */}
            {statuses?.map((status) => (
              <Select.Item key={status.value} value={status.value || ""}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default StatusSelect