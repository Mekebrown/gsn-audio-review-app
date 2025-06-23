import { strapi } from '@strapi/client';
import Image from "next/image";

import { apiURL } from "@/app/lib/general_variables";

import "@/styles/navigation/topnav.css";

export default async function Home() {
  const client = strapi({ baseURL: apiURL || "", });

  const homepage = client.single('global');
  const defaultHomepage = (await homepage.find({populate: ["temp"]})).data;
  
  return <section>
    {
      (defaultHomepage && 
          <div className="twoCols">
              <section className="leftCol">
                  <h1>{defaultHomepage.heading}</h1>
                  <p>{defaultHomepage.description}</p>

              </section>

              <section className="rightCol">
                  <Image src={defaultHomepage.temp.url} alt="Right-hand image" width="400" height="400" />
              </section>
          </div>
      ) || 
      <p>Loading data...</p>
    }
  </section>;
};
