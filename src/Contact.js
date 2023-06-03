import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getContactById } from "./network";
const Contact = () => {
  const [contact, setContact] = useState();

  const params = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      const data = await getContactById(params.id);
      setContact(data);
    };
    fetchContact();
  }, []);

  console.log(contact);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      backgroundImage="linear-gradient(to bottom right, #ff758c, #ff7eb3)"
    >
      <Box
        width={{ base: "90%", sm: "80%", md: "70%", lg: "60%" }}
        minWidth="300px"
        minHeight="30vh"
        backgroundColor="#fff"
        borderRadius="8px"
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
        overflow="hidden"
      >
        {contact && (
          <Flex
            m="4"
            color="white"
            justify="space-between"
            bg="#800080"
            p="4"
            height="200px"
            borderRadius="xl"
            boxShadow="xl"
            fontSize="30px"
            mb="4"
          >
            <Flex align="center">
              <Box mr="4">
                <FontAwesomeIcon size="3x" icon={faUser} mr="4" />
              </Box>
              <Stack>
                <Text>{contact.name}</Text>
                <Text>{contact.phone}</Text>
              </Stack>
            </Flex>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Contact;
