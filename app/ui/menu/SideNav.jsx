export default function SideNav() {
    return <aside style={{ textAlign: "left", borderRight: "1px solid grey", position: "fixed", left: 0, top: 0 }}>
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

        <div style={{ border: "1px solid black" }}>
            Ads
        </div>

        <div style={{ border: "1px solid black" }}>
            Ads
        </div>
    </aside>;
};
