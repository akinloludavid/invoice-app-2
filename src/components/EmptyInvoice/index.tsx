import React from "react";
import { Image, Box, Heading, Text } from "@chakra-ui/react";
const EmptyInvoice = () => {
  return (
    <Box maxW={["220px"]}>
      <Image src="/assets/illustration-empty.svg" alt="empty invoice list" />
      <Heading variant={"h2"} as="h2" mt={["64px"]} mb={["24px"]}>
        There is nothing here
      </Heading>
      <Text color={"#888EB0"} variant="body1">
        Create an invoice by clicking the{" "}
        <Text fontWeight={["700"]}>New Invoice</Text> button and get started
      </Text>
    </Box>
  );
};

export default EmptyInvoice;
