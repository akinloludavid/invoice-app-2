"use client";
import { ChangeEvent, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa";
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import InvoiceListComp from "@/components/InvoiceList";
import { AnimatedView } from "@/components/AnimatedView";
import CreateInvoice from "@/components/CreateInvoice";
import useCustomMediaQuery from "@/customHooks/mediaQuery";
import { status } from "@/utils/data";
import { InvoiceType } from "@/utils/types";
import EmptyInvoice from "@/components/EmptyInvoice";
import { useGetAllInvoices } from "@/api/query";
import TableLoader from "@/components/PageLoader";

export default function Home() {
  const [statusValue, setStatusValue] = useState("");
  const { data: invoiceLists, isLoading: isInvoicesLoading } =
    useGetAllInvoices(statusValue);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const boldTextColor = useColorModeValue("#0C0E16", "#ffffff");
  const lightTextColor = useColorModeValue(
    "lightMode.textColor",
    "darkMode.lightText"
  );
  const { isMobile } = useCustomMediaQuery();
  const showCreateInvoiceForm = () => {
    setShowCreateInvoice(true);
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(e.target.value);
  };

  return (
    <Box pt={["140px", "140px", "140px", "72px", "72px"]} pb="72px">
      <Flex justify={"space-between"} align="center" mb={["65px"]}>
        <Box>
          <Heading
            color={boldTextColor}
            // fontSize={["20px"]}
            variant={["h2", "h1"]}
            as="h1"
            mb="8px"
          >
            Invoices
          </Heading>
          <Text color={lightTextColor}>
            {invoiceLists?.length > 0 &&
              `${isMobile ? "" : "There are total"} ${
                invoiceLists?.length
              } invoices`}
          </Text>
        </Box>
        <Flex align={["center"]} gap={["24px"]}>
          <Select
            w={["96px", "96px", "192px"]}
            name="paymentTerms"
            onChange={handleChange}
            value={statusValue}
            color={boldTextColor}
            placeholder={`Filter ${isMobile ? "" : "by status"}`}
            _placeholder={{
              color: boldTextColor,
              fontSize: "12px",
              fontWeight: "700",
            }}
            h={["48px"]}
            icon={<FaChevronDown color="#7C5DFA" />}
          >
            {status.map((el, idx) => (
              <option key={idx} value={el.value}>
                {el.label}
              </option>
            ))}
          </Select>

          <Button
            leftIcon={<HiPlusCircle size="32px" />}
            w={["90px", "150px"]}
            h={["44px", "48px"]}
            zIndex="99"
            px={["8px"]}
            gap={["0px"]}
            borderRadius={["22px", "24px"]}
            fontSize={["12px"]}
            fontWeight={["700"]}
            letterSpacing="-0.25"
            onClick={showCreateInvoiceForm}
          >
            New {isMobile ? "" : "Invoice"}
          </Button>
        </Flex>
      </Flex>
      <Box>
        {isInvoicesLoading && <TableLoader />}
        {invoiceLists?.length === 0 && (
          <Flex
            justify={"center"}
            align="center"
            h="100%"
            mt={"140px"}
            w="100%"
          >
            <EmptyInvoice />
          </Flex>
        )}
        {invoiceLists?.map((el: InvoiceType, idx: number) => (
          <AnimatedView key={el.id} delay={idx * 0.05}>
            <Box mb="16px">
              <InvoiceListComp {...el} />
            </Box>
          </AnimatedView>
        ))}
      </Box>
      {showCreateInvoice && (
        <CreateInvoice setShowCreateInvoice={setShowCreateInvoice} />
      )}
    </Box>
  );
}
