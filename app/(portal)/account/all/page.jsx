"use client";
import { useState } from "react";

import { GeneralToast } from '@/app/ui/Toast';
import { usersExample } from "@/app/lib/user_placeholders";
import { apiURL } from "@/app/lib/general_variables";

export default function Page() {
  const [toastMessage, setToastMessage] = useState("");

  const response = fetch(apiURL + "/portal/account");

  if (response.ok) {
  const resJSON = JSON.parse(response);
    usersExample = resJSON.data;
  } else {
    usersExample = [];

    setToastMessage("No clients signed in yet");
  }

  return <section>
    <GeneralToast message={toastMessage} />

    <h1>All user accounts</h1>

    {usersExample.map(client => {
      return <article key={client.id}>
        <div className="user">Name: {client.name}</div>
        <div>Package: {client.package}</div>
      </article>;
    })}
  </section>;
};
