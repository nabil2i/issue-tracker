import prisma from "@/prisma/client";
import { Avatar, Card, Heading, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });

  return (
    <Card>
      <Heading size="4" mb="5">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
        {latestIssues.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={3} className="text-center">
                Nothing to show
              </Table.Cell>
            </Table.Row>
          ) : (
          latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    {/* <IssueStatusBadge status={issue.status} /> */}
                    <Flex gap="2" align="center">
                      <div >
                        <IssueStatusBadge status={issue.status} />
                      </div>
                      <div >
                        {issue.createdAt.toDateString()}
                      </div>
                    </Flex>
                  </Flex>
                  {issue.assignedToUserId && (
                    <Avatar
                      src={issue.assignedToUser?.image!}
                      fallback={issue.assignedToUser?.name?.slice(0, 1)!}
                      size="2"
                      radius="full"
                      className="cursor-pointer"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          )))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
