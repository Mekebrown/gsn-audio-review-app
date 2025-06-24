import { allUsers as allUsersFunc } from "@/app/lib/user_placeholders";

export async function generateStaticParams() {
    const allUsers = await allUsersFunc();

    return allUsers.map(user => ({
      id: user.id.toString(),
      username: user.username || 'Unknown User',
      email: user.email || 'No Email Provided',
    }));
}

/**
 * /users/:user - shows profile(s) with its email, role, lastSignIn, notes, media, created, reset pw link, and a delete user link. Deleting a user will delete all profiles for that user.
 * 
 * @description A specific user's account component
 * 
 * @returns {JSX.Element}
 */
export default async function Page({
  params,
}) {
  const { id, username, email } = await params;
  
  return <section className="user-profile" data={"user-profile-" + id}>
    <h1>Profile for</h1>
    <div>Name: {username}</div>
    <div>Email: {email}</div>
  </section >;
}
