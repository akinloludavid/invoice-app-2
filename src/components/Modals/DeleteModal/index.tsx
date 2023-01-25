import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Text,
  Flex,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { baseUrl } from "@/utils/helper";
import { useRouter } from "next/router";
import { useCustomToast } from "@/customHooks/notifications";
const DeleteModal = ({ isOpen, onClose, id }: any) => {
  const router = useRouter();
  const { successAlert, errorAlert } = useCustomToast();
  const boldTextColor = useColorModeValue("#0C0E16", "#ffffff");
  const draftColor = useColorModeValue("#888EB0", "#DFE3FA");
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch(`${baseUrl}/api/invoice/${id}`, {
        method: "DELETE",
      });
      successAlert("Invoice deleted successfully");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      errorAlert("Deletion failed, try again");
      console.log(error);
    }
    setIsDeleting(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent top="20%" h={["auto", "250px"]} w={["90%", "auto"]}>
        <Box
          borderRadius={"8px"}
          p={["48px"]}
          boxShadow="0px 10px 10px -10px rgba(72, 84, 159, 0.100397)"
        >
          <ModalHeader
            color={boldTextColor}
            fontSize={"24px"}
            fontWeight="700"
            mb={["13px"]}
            p="0px"
            textAlign="left"
          >
            Confirm Deletion
          </ModalHeader>
          <Text
            mb={["16px"]}
            fontSize="12px"
            fontWeight={"500"}
            color={draftColor}
          >
            Are you sure you want to delete invoice #{id}? This action cannot be
            undone.
          </Text>
          <Flex justify={"flex-end"} gap="8px">
            <Button variant={"secondary"} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="delete"
              onClick={handleDelete}
              isLoading={isDeleting}
              isDisabled={isDeleting}
              _disabled={{
                bgColor: "gray",
                cursor: "not-allowed",
              }}
            >
              Delete
            </Button>
          </Flex>
        </Box>
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
