import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import CommentForm from "./CommentForm";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueComment from "./IssueComment";
import IssueDetails from "./IssueDetails";
import StatusSelect from "./StatusSelect";

interface Props {
  params: { id: string };
}
const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  let sessionUser: User | null = null;
  if (session?.user?.email) {
    sessionUser = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });
  }

  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  const details = {
    issue: issue,
    user: sessionUser as User,
  };

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Flex direction="column" className="md:col-span-4" gap="3">
        <IssueDetails issue={issue} />
        <Flex direction="column" display={{ initial: "none", sm: "flex" }}>
          <CommentForm details={details} />
          <IssueComment issueId={String(issue.id)} />
        </Flex>
        <Box></Box>
      </Flex>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <StatusSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
      <Flex direction="column" display={{ initial: "flex", sm: "none" }}>
        <CommentForm details={details} />
        <IssueComment issueId={String(issue.id)} />
      </Flex>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
