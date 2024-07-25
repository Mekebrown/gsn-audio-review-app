import { apiURL } from "@/app/lib/general_variables";

const getUserInfo = async (id) => {
  const queryString = "?request_type=single&user_id=" + id;

  const user = await fetch(apiURL + '/portal/account').then((res) => res.json());
  const { data } = user;

  return data;
};

/**
 * @description A specific user's account component
 *
 * @param {Object} params
 * 
 * @returns {JSX.Element}
 */
export default async function Page({ params }) {
  const thisClient = params.id;

  const user_info = await getUserInfo(thisClient);

  return <section>
    <h1>Profile</h1>
    <div>Name: {user_info.name}</div>
    <div>Email: {user_info.email}</div>
  </section >;
};
