import { allUsers as allUsersFunc } from "@/app/lib/user_placeholders";

// /users - msg, users (link to each user and their profiles, preview of latest note(s), list of media, last sign in(s?), reset pw link, delete user link)
// /delete-profile* - close icon, msg, confirm button, cancel link

export default async function AllUsersPage() {
  const allUsers = await allUsersFunc();

  // If there are no users
  if (!allUsers || allUsers.length === 0) {
    return <section>
      <h1>No users found</h1>
      <p>There are currently no user accounts.</p>
    </section>;
  }

  // If there is only one user
  if (allUsers.length === 1) {
    return <section>
      <h1>One user account</h1>
      <article key={allUsers[0].id}>
        <div className="user">Name: {allUsers[0].username}</div>
        <div>Package: {allUsers[0].role.name}</div>
      </article>
    </section>;
  }

  // If there are multiple users
  return <section>
    <h1>All user accounts</h1>

    {allUsers.map(user => {
      return <article key={user.id}>
        <div className="user">Name: {user.username}</div>
        <div>User Role: {user.role.name}</div>
        <hr />
      </article>;
    })}
  </section>;
};
