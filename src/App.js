import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import {
  addContactOnServer,
  getAllContacts,
  updateContactOnServer,
  deleteContactOnServer,
} from "./network";
import { Heading, Flex, Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";

import ContactCard from "./components/ContactCard";
import ContactForm from "./components/ContactForm";
import Kmodal from "./components/Kmodal";
import { Link } from "react-router-dom";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [searchData, setSearchData] = useState("");
  const [contacts, setContacts] = useState([
    { id: 1, name: "Nikhil", phone: "abc@gmail.com"},
    { id: 2, name: "Nikhi", phone: "a@gmail.com"},
    { id: 3, name: "Nikh", phone: "b@gmail.com"},
    { id: 4, name: "Nik", phone: "c@gmail.com"},



  ]);
  console.log(contacts)
  const [contactId, setContactId] = useState();

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getAllContacts();
      const tempArray = [];

      if (data !== null) {
        Object.entries(data).forEach(([key, value]) => {
          tempArray.push({ id: key, name: value.name, phone: value.phone });
        });
      }

      setContacts(tempArray);
    };
    fetchContacts();
  }, []);

  const addNewContact =  (name, phone) => {
    if (
      contacts.findIndex((contact) => contact.phone === phone) === -1 &&
      phone !== ""
    ) {
    //   const data = await addContactOnServer(name, phone);
    //   console.log(data);
      setContacts([...contacts, { name, phone
        // id: data.name 
      }]);
  }
  };

  let searchContacts = contacts.filter((contact) =>
    contact.name.includes(searchData)
  );

  const getContactId = (id) => {
    setContactId(id);
  };

  const updateContact = async (name, phone, id) => {
    const data = await updateContactOnServer(name, phone, id);

    setContacts((prev) => [
      ...contacts.filter((contact) => contact.id !== id),
      { name: data.name, phone: data.phone, id },
    ]);
  };

  const deleteContact = async (id) => {
    const data = await deleteContactOnServer(id);
    if (data === null) {
      setContacts((prev) => [
        ...contacts.filter((contact) => contact.id !== id),
      ]);
    }
  };
  let selectContact = contacts.find((contact) => contact.id === contactId);

  return (
    <>
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
          minHeight="80vh"
          backgroundColor="#fff"
          borderRadius="8px"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
          overflow="hidden"
        >
          <Kmodal
            isOpen={isOpen}
            title={"Add New Contact"}
            onOpen={onOpen}
            onClose={onClose}
          >
            <ContactForm addNewContact={addNewContact} onClose={onClose} />
          </Kmodal>
          <Kmodal
            isOpen={isOpenEdit}
            title={"Update New Contact"}
            onOpen={onOpenEdit}
            onClose={onCloseEdit}
          >
            <ContactForm
              updateContact={updateContact}
              contact={selectContact}
              onClose={onCloseEdit}
            />
          </Kmodal>
          <Box>
            <Flex
              p="4"
              justify="center"
              align="center"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
            >
              <Image src="/banner.png" w="150px" h="100px" />
              <Heading as="h1" textTransform="uppercase" color="#fff">
                Contact App
              </Heading>
            </Flex>
            <Box p="4">
              <Button
                bg="#800080"
                color="white"
                w="full"
                fontSize="xl"
                fontWeight="bold"
                colorScheme="purple"
                onClick={onOpen}
              >
                <AddIcon h="20px" w="20px" mr="4" /> Add Contact
              </Button>
            </Box>
            <Box p="4">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="gray.300" />}
                />
                <Input
                  focusBorderColor="purple.400"
                  type="tel"
                  placeholder="Search Contact..."
                  onChange={(e) => setSearchData(e.target.value)}
                />
              </InputGroup>
            </Box>
            <Box p="4">
              {searchContacts.map((contact) => (
                <ContactCard
                  getContactId={getContactId}
                  onOpen={onOpenEdit}
                  contact={contact}
                  key={contact.id}
                  deleteContact={deleteContact}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default App;
