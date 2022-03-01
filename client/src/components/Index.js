import React from "react";

// The general page
const Index = () => {
    return (
        <>
            <header>
                <h2>GSN!</h2>
            </header>

            <main>
                <section id="appEntrySection">
                    <p>Greeting, purpose of app, msg from creator</p>

                    <form id="appEntryForm" name="appEntryForm" action="" method="post">
                        <label for="userEntryPurpose">I am a </label>

                            <select title="userEntryPurpose" name="userEntryPurpose" id="userEntryPurpose" required>
                                <option value="guest">Guest</option>
                                <option value="reviewer">Reviewer</option>
                                    <select label="Reviewer" disabled>
                                        <option value="audio">Audio Project</option>
                                        <option value="video">Video Project</option>
                                    </select>
                                <option value="login">Administrator</option>
                            </select>

                        <br />

                        <label for="projectName">Project Name:</label>
                            <input type="text" id="projectName" name="projectName" pattern="[a-zA-Z- .,!]" />

                        <br />

                        <label for="keypass">Do you accept a Keypass (tracking cookie) for repeat visits?</label>
                            <input type="radio" name="keypass" title="Allow a key - Yes" value="yes" disabled /> Yes 
                            <input type="radio" name="keypass" title="Allow a key - No" value="no" disabled /> No

                        <br />

                        <label for="secretPhrase">What is your secret?</label>
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
            </main>
        </>
    );
}; 

export default Index;

// const [info, setInfo] = useState([]);
// useEffect(() => {
//     fetch('/').then(res => {
//         if (res.ok) {
//             return res.json();
//         }
//     }).then(jsonRes => {
//         setInfo(jsonRes.infoList);
//     });
// }, [setInfo]);
