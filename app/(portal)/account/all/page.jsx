"use client";
import { useState } from "react";

import { GeneralToast } from '@/app/ui/credentials/Toast';
import { apiURL } from "@/app/lib/general_variables";

export default function Page() {
  const [toastMessage, setToastMessage] = useState("");
  let usersExample;

  const response = fetch(apiURL + "/portal/account");

  if (response.ok) {
    usersExample = JSON.parse(response);
  } else {
    usersExample = [];

    setToastMessage("No clients logged in yet");
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
