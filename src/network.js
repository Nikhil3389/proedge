import axios from "axios";

export const addContactOnServer = async (name, phone) => {
  try {
    const { data } = await axios.post(
      `https://contact-app-48269-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json`,
      { name, phone }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllContacts = async () => {
  try {
    const { data } = await axios.get(
      `https://contact-app-48269-default-rtdb.asia-southeast1.firebasedatabase.app//contacts.json`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateContactOnServer = async (name, phone, id) => {
  try {
    const { data } = await axios.patch(
      `https://contact-app-48269-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/${id}.json`,
      { name, phone }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteContactOnServer = async (id) => {
  try {
    const { data } = await axios.delete(
      `https://contact-app-48269-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/${id}.json`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getContactById = async (id) => {
  try {
    const { data } = await axios.get(
      `https://contact-app-48269-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/${id}.json`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
