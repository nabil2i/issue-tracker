import { Avatar, Box, Text, Flex, Grid } from "@radix-ui/themes";

const IssueComment = () => {
  return (
    <>
    <div className="comment-container">
      <Flex gap="3" mb="5" mt="5">
        <Avatar
          src={""}
          fallback="?"
          size="3"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
        <Flex direction="column" gap="2">
          <Flex justify="between">
            <Text size="3" className="font-bold">John Doe</Text>
            <Text size="3" color="gray">1d</Text>
          </Flex>
          <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus voluptate porro repellat? Iure, consequuntur fugiat quae suscipit id cumque aspernatur!</Text>
        </Flex>
      </Flex>
      <div className="comment-line"></div>
    </div>

    <div className="comment-container">
      <Flex gap="3" mb="5" mt="5">
        <Avatar
          src={""}
          fallback="?"
          size="3"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
          />
        <Flex direction="column" gap="2">
          <Flex justify="between">
            <Text size="3" className="font-bold">John Doe</Text>
            <Text size="3" color="gray">1d</Text>
          </Flex>
          <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus voluptate porro repellat? Iure, consequuntur fugiat quae suscipit id cumque aspernatur!</Text>
        </Flex>
      </Flex>
      <div className="comment-line"></div>
    </div>
    </>
  )
}

export default IssueComment
