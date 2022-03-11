import React from "react";
import adminData from "./data/admin_dummy_data";

/**
 * Lance's page
 * 
 * @returns {Node} Admin
 */
const Admin = () => {
    return (
        <>
            <header>
                <h2>{adminData.user_name}</h2>
            </header>

            <main>
                <section>
                    Analytics
                </section>
                <section>
                    Analytics
                </section>
                <section>
                    Control all accounts
                </section>
                <section>
                    {adminData.projects.map(project => {
                        return (
                            <div key={project.key}>
                                <p>{project.name}</p>
                            </div>
                        );
                    })}
                    Control all media
                </section>
                <section>
                    Control all notes
                </section>
            </main>
        </>
    );

}

export default Admin;