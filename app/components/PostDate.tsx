import { Text } from "@radix-ui/themes";

const PostDate = ({ date }: { date: Date }) => {
  return (
    <Text size="2" color="gray">
      {formatDate(date)}
    </Text>
  );
};

function formatDate(commentDate: Date) {
  const now = new Date();
  const diff = now.getTime() - commentDate.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const year = 365 * day;

  if (diff < minute) {
    return `${Math.floor(diff / 1000)} seconds ago`;
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)} minutes ago`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)} hours ago`;
  } else if (diff < week) {
    return `${Math.floor(diff / day)} days ago`;
  } else if (diff < year) {
    return `${Math.floor(diff / week)} weeks ago`;
  } else {
    return `${Math.floor(diff / year)} years ago`;
  }
}

export default PostDate;
