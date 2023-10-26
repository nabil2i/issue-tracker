import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache }from "react";
import StatusSelect from "./StatusSelect";
import IssueComment from "./IssueComment";
import CommentForm from "./CommentForm";
import { User } from "@prisma/client";

interface Props {
  params: { id: string };
}
const fetchUser = cache((issueId: number) => prisma.issue.findUnique({where: { id: issueId }}));

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const sessionUser = await prisma.user.findUnique({ where: { email: session?.user?.email!} })


  const issue = await fetchUser(parseInt(params.id));
  
  if (!issue) notFound();

  const details = {
    issue: issue,
    user: sessionUser as User
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Flex direction="column" className="md:col-span-4" gap="3">
        <IssueDetails issue={issue} />
        <Flex direction="column" display={{ initial: "none", sm: "flex"}}>
          <CommentForm details={details} />
          <IssueComment issueId={String(issue.id)} />
        </Flex>
        <Box>
        </Box>
      </Flex>
      {session &&
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <StatusSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>}
        <Flex direction="column" display={{ initial: "flex", sm: "none"}}>
          <CommentForm details={details} />
          <IssueComment issueId={String(issue.id)} />
        </Flex>
    </Grid>
  );
};

export async function generateMetadata( { params }: Props) {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id
  }
}

export default IssueDetailPage;
