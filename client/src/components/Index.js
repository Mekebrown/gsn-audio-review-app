import React from "react";
import Axios from "axios";
import { projectReviewingPath } from "./tools/envs";

/**
 * The general page
 * 
 * GET info retrieved: 
 * - N/A
 * 
 * POST info sent:
 * - User id
 * - Date and time
 * - Device info
 * 
 * @returns {Node} Index
 */
const Index = () => {
    const login = () => {
        const userId = 1001;

        const formData = new FormData();
                
        formData.append('userId', userId);

        Axios.post("https://intense-forest-28148.herokuapp.com/", { // Why and how does this work but not going to the route on L29 directly not work?
            body: formData
        }).then(() => {
            const reroute = document.location.href + projectReviewingPath + 1;

            window.location.assign(reroute);
        });
    };

    return (
        <>
            <header>
                <h2>GSN!</h2>
            </header>
                        
            <button id="openApp" type="submit" value="submit" onClick={login}>Open App</button>
{/* 
            <main>
                <section id="appEntrySection">
                    <p>Greeting, purpose of app, msg from creator</p>

                    <form id="appEntryForm" name="appEntryForm" action="" method="post">
                        <label htmlFor="userEntryPurpose">I am a </label>

                            <select title="userEntryPurpose" name="userEntryPurpose" id="userEntryPurpose" required>
                                <option value="guest">Guest</option>
                                <option value="reviewer">Reviewer</option>
                                <option value="login">Administrator</option>
                            </select>
                                    <select label="Reviewer" disabled>
                                        <option value="audio">Audio Project</option>
                                        <option value="video">Video Project</option>
                                    </select>

                        <br />

                        <label htmlFor="projectName">Project Name:</label>
                            <input type="text" id="projectName" name="projectName" pattern="[a-zA-Z- .,!]" />

                        <br />

                        <label htmlFor="keypass">Do you accept a Keypass (tracking cookie) for repeat visits?</label>
                            <input type="radio" name="keypass" title="Allow a key - Yes" value="yes" disabled /> Yes 
                            <input type="radio" name="keypass" title="Allow a key - No" value="no" disabled /> No

                        <br />

                        <label htmlFor="secretPhrase">What is your secret?</label>
                            <input type="text" id="secretPhrase" name="secretPhrase" pattern="[a-zA-Z- .,!]" disabled />
                            <span>Ok! Is this your secret image?</span>
                            <input type="radio" name="secretImage" title="Image - Yes" value="yes" disabled /> Yes 
                            <input type="radio" name="secretImage" title="Image - No" value="no" disabled /> No

                        <br />

                        <button id="openApp" type="submit" value="submit">Open App</button>
                    </form>

                    {
                        // max - Specifies the maximum value of an input element
                        // min - Specifies the minimum value of an input element
                        // size - integer
                        // maxlength - integer
                    }
                </section>
            </main> */}
        </>
    );
}; 

export default Index;
