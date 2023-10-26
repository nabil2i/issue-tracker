import PostDate from "@/app/components/PostDate";
import prisma from "@/prisma/client";
import { Avatar, Flex, Text, Box } from "@radix-ui/themes";

const IssueComment = async ({ issueId }: { issueId: string }) => {
  const comments = await prisma.comment.findMany({
    where: { issueId: parseInt(issueId) },
    include: { user: true },
  });

  return (
    <>
      <div className="comment-container">
        {comments.map((comment) => (
          <Box key={comment.id}>
            <Flex gap="3" mb="5" mt="5">
              <Avatar
                src={comment.user.image!}
                fallback="?"
                size="3"
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
              <Flex direction="column" gap="2">
                <Flex gap="3" justify="center" align="center">
                  <Text size="3" className="font-bold">
                    {comment.user.name}
                  </Text>
                  <PostDate date={comment.createdAt} />
                  {/* <Text size="2" color="gray">
                    {comment.createdAt.toDateString()}
                  </Text> */}
                </Flex>
                <Text size="2">{comment.text}</Text>
              </Flex>
            </Flex>
            <div className="comment-line"></div>
          </Box>
        ))}
      </div>
    </>
  );
};

export default IssueComment;
