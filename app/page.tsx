import { Box } from "@radix-ui/themes";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
  <Box>
    <div>Hello World!</div>
    <Pagination itemCount={100} pageSize={10} currentPage={5}/>
  </Box>
  );
}

