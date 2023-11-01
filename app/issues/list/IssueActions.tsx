import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueAssigneeFilter from "./IssueAssigneeFilter";
import IssueDateOrder from "./IssueDateOrder";
import IssuePageSize from "./IssuePageSize";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueStatusOrder from "./IssueStatusOrder";

const IssueActions = () => {
  return (
    <Flex justify="between" gap="3">
      <Flex gap="2" direction={{ initial: "column", sm: "row" }}>
        <IssueStatusFilter />
        <IssueAssigneeFilter />
        <IssuePageSize />
        <Flex direction="column" gap="2" display={{ initial: "flex", sm: "none"  }}>
          <IssueStatusOrder />
          <IssueDateOrder />
        </Flex>
      </Flex>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
