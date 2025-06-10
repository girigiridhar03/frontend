import { Box } from "@chakra-ui/react";
import React from "react";
import AllRoutes from "./Routes/AllRoutes";
import useTokenRefresh from "./components/Utils/useTokenRefresh";


const App = () => {
  useTokenRefresh();
  return (
    <Box>
      <AllRoutes />
    </Box>
  );
};

export default App;
