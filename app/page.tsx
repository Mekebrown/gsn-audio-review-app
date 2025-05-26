import Image from "next/image";

import { tempImage} from "@/app/lib/general_variables";

import "@/styles/navigation/topnav.css";

export default function Home() {
  return (<>

    <section>
      <div className="twoCols">
        <section style={{ paddingTop: "10%", flex: "1", textAlign: "left" }}>
          <h1>Entertaining Others the Way YOU Want</h1>
          <p style={{ width: "50%", marginTop: "5%", marginBottom: "5%" }}>
            The Gifted Sounds Network&lsquo;s Audio Review App is a straightforward audio player and notes taker that lets you give real-time feedback on your recordings. <br />
            <br />
            Since you&lsquo;re the primary visionary, we do as you say.
          </p>
        </section>

        <section style={{ flex: "1" }}>
          <Image src={tempImage} alt="Right-hand image" width="400" height="400" />
        </section>
      </div>
    </section>
  </>);
};
