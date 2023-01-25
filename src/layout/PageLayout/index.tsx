import { IChildren } from "@/utils/types";
import { Box, Flex, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import SideBar from "../Sidebar";

const PageLayout = ({ children }: IChildren) => {
  const mainBgColor = useColorModeValue(
    "lightMode.mainBgColor",
    "darkMode.mainBgColor"
  );
  return (
    <Box
      bgColor={mainBgColor}
      px={["24px", "48px", "48px", "120px", "355px"]}
      minH="100vh"
      minW="100vw"
    >
      <SideBar />
      <Box>{children}</Box>
    </Box>
  );
};

export default PageLayout;
