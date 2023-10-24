import { Box } from "@radix-ui/themes";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";

export default function Home() {
  return (
  <Box>
    <LatestIssues />
  </Box>
  );
}

