import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import React, { useState } from "react";

const ContactForm = ({ addNewContact, onClose, contact, updateContact }) => {
  const [name, setName] = useState(contact ? contact.name : "");
  const [phone, setPhone] = useState(contact ? contact.phone : "");
  console.log(contact);
  const onSubmit = () => {
    if (contact) {
      console.log("print");
      updateContact(name, phone, contact.id);
      onClose();
    } else {
      addNewContact(name, phone);
      onClose();
    }
  };

  return (
    <Stack>
      
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="phone">
        <FormLabel>Phone Number</FormLabel>
        <Input
          value={phone}
          type="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormControl>
      {contact ? (
        <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
          Update Contact
        </Button>
      ) : (
        <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
          Add Contact
        </Button>
      )}
    </Stack>
  );
};

export default ContactForm;
