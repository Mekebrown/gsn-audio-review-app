import StrapiHandler from "@/app/lib/strapiclient_handler";

export const allUsers = async () => {
  const usersCollection = StrapiHandler.collection('users');

  return (await usersCollection.find({ populate: ["role", "notes"] }));
};

// The default export is adminsExample

export const setNewuser = ({ email, pw, mediaChecked }) => {
  return {
    email: email,
    pw: pw,
    media: mediaChecked
  };
};

export const usersExample = [
  {
    id: 1,
    name: "Joe",
    package: "three",
  },
  {
    id: 2,
    name: "Janet",
    package: "one",
  },
];

const adminsExample = [
  {
    name: 'Mr. Smith',
    type: "admin",
    access: ['full'],
  },
  {
    name: 'Mrs. Smith',
    type: "admin",
    access: ['full'],
  },
];

export const getAllMembersExample = () => {
  return usersExample.flat(adminsExample);
};

export default adminsExample;
