export default function TopNav() {
  return <div>TopNav Component Placeholder</div>;
}

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import axios from "axios";
// import { getCookie } from "cookies-next";

// import {
//   EmailIcon,
//   MediaIcon,
//   NotesIcon,
//   UsersIcon,
//   SearchIcon,
//   NotifsIcon,
//   SendPWIcon,
//   SettingsIcon,
//   UploadIcon,
// } from "@/app/ui/nav/NavLinks";
// import SearchResults from "@/app/ui/SearchResults";
// import {
//   baseURL,
//   GSNLogo,
//   gsnSignInCookie,
//   notifsAPIPath,
// } from "@/app/lib/general_variables";

// import "@/styles/navigation/topnav.css";

// /**
//  * @returns {JSX.Element}
//  */
// export default function TopNav() {
//   try {
//     interface User {
//       settings?: {
//           light_mode?: boolean;
//       };
//     }

//     const [memberId, setMemberId] = useState(null);
//     const [menuType, setMenuType] = useState(null); // "client" or "admin"
//     const [clicked, setClicked] = useState(false);
//     const [newNotifs, setNewNotifs] = useState({ media: 0, notes: 0, signins: 0 });
//     const [searchEntry, setSearchEntry] = useState("");
//     const user: User = { settings: { light_mode: true } };

//     const handleSearchClick = async (e: React.FormEvent) => {
//       e.preventDefault();

//       if (searchEntry.trim() !== "") {
//         try {
//           const response = await axios.get(`${baseURL}/search`, {
//             params: { query: searchEntry },
//           });

//           if (response.status === 200) {
//             console.log("Search Results:", response.data); // Replace with actual handling logic
//           } else {
//             console.error("Search failed");
//           }
//         } catch (error) {
//           console.error("Error during search:", error);
//         }

//         setSearchEntry("");
//       }

//       setClicked((prev) => !prev);
//     };

//     const handleNotifs = () => {
//       console.log("Handle notifications");
//     };

//     const handleSettings = () => {
//       console.log("Handle settings");
//     };

//     interface NavLink {
//       href: string;
//       Icon: React.ComponentType<{ className: string }>;
//       tooltip: string;
//     }

//     interface NavLinksProps {
//       links: NavLink[];
//     }

//     /**
//      * @param {Object} links - Array of link objects
//      *  
//      * @returns 
//      */
//     const NavLinks: React.FC<NavLinksProps> = ({ links }) => (
//       <>
//         {links.map(({ href, Icon, tooltip }, index) => (
//           <Link key={index} href={href} className={`${Icon.name.toLowerCase()}Link`}>
//             <div className="tooltip">
//               <Icon className={`${Icon.name.toLowerCase()}Icon`} />
//               <span className="tooltiptext">{tooltip}</span>
//             </div>
//           </Link>
//         ))}
//       </>
//     );

//     const ClientNav = () => (
//       <header className="portal">
//         <nav>
//           <menu className="topNav">
//             <div className="topNavSection">
//               <Link href={baseURL}>
//                 <GSNLogo />
//                 <span className="topNavLeftGSNText">Gifted Sounds Network</span>
//               </Link>
//             </div>
//             <div className="topNavSection"></div>
//             <div className="clientNavLinks topNavSection rightLinks">
//               <NavLinks
//                 links={[
//                   { href: `${baseURL}/media`, Icon: MediaIcon, tooltip: "Media" },
//                   { href: `${baseURL}/notes`, Icon: NotesIcon, tooltip: "Notes" },
//                   { href: `${baseURL}/contact`, Icon: EmailIcon, tooltip: "Contact" },
//                 ]}
//               />
//               <button className="notifsIconBtn" type="button" onClick={handleNotifs}>
//                 <div className="tooltip">
//                   <NotifsIcon
//                     className="notifsIcon"
//                     notifCount={newNotifs.media + newNotifs.notes}
//                   />
//                   <span className="tooltiptext">
//                     {newNotifs.media} new tracks, {newNotifs.notes} new notes
//                   </span>
//                 </div>
//               </button>
//               <button className="settingsIconBtn" type="button" onClick={handleSettings}>
//                 <div className="tooltip">
//                   <SettingsIcon user={user} className="settingsIcon" />
//                   <span className="tooltiptext">Settings</span>
//                 </div>
//               </button>
//             </div>
//           </menu>
//         </nav>
//       </header>
//     );

//     const AdminNav = () => (
//       <header className="portal">
//         <nav>
//           <menu className="topNav">
//             <div className="topNavSection">
//               <Link href={baseURL}>
//                 <GSNLogo />
//                 <span className="topNavLeftGSNText">Gifted Sounds Network</span>
//               </Link>
//             </div>
//             <div className="topNavSection"></div>
//             <div className="adminNavLinks topNavSection rightLinks">
//               <NavLinks
//                 links={[
//                   { href: `${baseURL}/account/new`, Icon: SendPWIcon, tooltip: "Invite Member" },
//                   { href: `${baseURL}/media/new`, Icon: UploadIcon, tooltip: "Upload" },
//                   { href: `${baseURL}/media/all`, Icon: MediaIcon, tooltip: "Media" },
//                   { href: `${baseURL}/notes`, Icon: NotesIcon, tooltip: "Notes" },
//                   { href: `${baseURL}/account/all`, Icon: UsersIcon, tooltip: "Members" },
//                 ]}
//               />
//               <form className="searchIconForm" id="topNavSearchForm" onSubmit={handleSearchClick}>
//                 <button type="submit">
//                   <SearchIcon className="searchIcon" isClicked={clicked} />
//                 </button>
//                 <input
//                   type="text"
//                   id="searchField"
//                   className="searchFieldEl"
//                   value={searchEntry}
//                   onChange={(e) => setSearchEntry(e.target.value)}
//                   placeholder="Search..."
//                 />
//               </form>
//               <button className="notifsIconBtn" type="button" onClick={handleNotifs}>
//                 <div className="tooltip">
//                   <NotifsIcon
//                     className="notifsIcon"
//                     notifCount={newNotifs.signins + newNotifs.notes}
//                   />
//                   <span className="tooltiptext">
//                     {newNotifs.signins} new signins, {newNotifs.notes} new notes
//                   </span>
//                 </div>
//               </button>
//               <button className="settingsIconBtn" type="button" onClick={handleSettings}>
//                 <div className="tooltip">
//                   <SettingsIcon user={user} className="settingsIcon" />
//                   <span className="tooltiptext">Settings</span>
//                 </div>
//               </button>
//             </div>
//           </menu>
//         </nav>
//       </header>
//     );

//     const isClicked = !clicked;

//     useEffect(() => {
//       const signInCookie = getCookie(gsnSignInCookie);
//       const jwtInfo = ""; // Placeholder for JWT logic
//       const memberId = signInCookie ? JSON.parse(signInCookie).memberId : null;

//       setMemberId(memberId); // Temporary hardcoded member ID

//       if (signInCookie && jwtInfo) {
//         const fetchNotifs = async () => {
//           try {
//             const response = await axios.post(`${notifsAPIPath}${memberId}`, signInCookie, {
//               headers: { jwtInfo },
//             });
//             const { data } = response;

//             if (!data.error) {
//               setNewNotifs(data.new_notifs);
//               setMenuType(data.member_type);
//             }
//           } catch (error) {
//             console.error("Error fetching notifications:", error);
//           }
//         };

//         fetchNotifs();
//       }
//     }, [memberId]);

//     return (
//       <>
//         {menuType === "client" && <ClientNav />}

//         {menuType === "admin" && <AdminNav />}
        
//         <SearchResults showSection={isClicked} />
//       </>
//     );
//   } catch (error: any) {
//       throw new Error('Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/');
//   }
// };
