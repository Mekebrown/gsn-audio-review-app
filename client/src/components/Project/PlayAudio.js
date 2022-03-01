import React from "react";

function PlayAudio() {
    return (
        <section id="app">
            &nbsp; <button value="approve" id="trackApproved">&#128077;</button> &nbsp; 
            <button value="disapprove" id="trackDisapproved">&#128078;</button>

            <section id="playerContainer" >
                <audio controls id="audioPlayer" preload="auto">
                    Unfortunately, audio tags are not supported on your device. Please install this app on another device to use.
                </audio>
            </section>





            <section id="audioControls">
                <button id="playPause">Play</button>
                <button id="reload">Reload</button>
                <button id="toggleNotePad">Make A Note</button>
            </section>




            <section id="notesContainer" draggable="true">
                <div id="notePad">
                    <label for="notePadTextarea" id="notePadLabel"></label><br />

                    <textarea id="notePadTextarea" rows="10" cols="50" title="Note pad text area" placeholder=""></textarea>
                </div>

                <span id="notePadOptions">
                    {
                    // NOTE BUTTONS -->
                    }
                    { 
                        // <button onclick="makeLarge()">Larger</button>
                        // <button onclick="makeSmall()">Smaller</button>
                        // <button onclick="makeNormal()">Normal</button> 
                    }
                    <button id="notePadSave">Save</button>
                    <button id="notePadClear">Clear</button>
                </span>
            </section>





            <section id="notesList">   
                <ul></ul>
                <section id="done" hidden>
                <p>Thanks for your contribution. You will be contacted right away!</p>
                </section>
            </section>
        </section>
    );
}

export default PlayAudio;
