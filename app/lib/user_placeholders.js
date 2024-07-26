// The default export is adminsExample

export const setNewuser = ({email, pw, mediaChecked}) => {
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

export const getAllUsersExample = () => {
  return usersExample.flat(adminsExample);
};

export default adminsExample;
