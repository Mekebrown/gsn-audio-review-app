import "@/styles/navigation/sidenav.css";

export default function SideNav() {
    return <aside className="sideMenuCont">
        <h2>Browse Media</h2>

        <h3>Find One</h3>
        <h3>Find Two</h3>
        <h3>Find Three</h3>
        <h3>Find Four</h3>

        <hr />

        <h2>My Lists <span>+</span></h2>

        <h3>Find Five</h3>
        <h3>Find Six</h3>
        <h3>Find Seven</h3>
        <h3>Find Eight</h3>
        <h3>Find Nine</h3>

        <hr />

        <h2>My Media</h2>

        <h3>Find Ten</h3>

        <hr />

        <h2>Sponsor</h2>

        <div className="adsBlackBorder">
            Ads
        </div>

        <div className="adsBlackBorder">
            Ads
        </div>
    </aside>;
};
