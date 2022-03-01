window.onload = () => {
    // session id - Unique cookie replaces the matching previous cookie
            let noteID = "";
            let project = "gsn";
            const currentStartDateObj = new Date();
            const noteStartDate = currentStartDateObj.toLocaleDateString('en-US').replace("/", ""); // mmddyyyy, for note name. Ex: 12112012
            const noteStartTime = currentStartDateObj.now(); // Milliseconds (UTC), used to calculate a user's length of visit. eX: 9878968930432 

    /** ENTRY */
            const appEntrySection = document.querySelector("#appEntrySection");
            const openAppBtn = document.querySelector("#openApp");

            function appEntryForm() {
                // select element 
                let userEntryPurpose = document.forms["appEntryForm"]["userEntryPurpose"].value;
                if (userEntryPurpose == "") {
                    alert("user Entry Purpose must be filled out");
                } 
                // select element 

                let projectName = document.forms["appEntryForm"]["projectName"].value;
                if (projectName == "") {
                    alert("project Name must be filled out");
                }

                let keypass = document.forms["appEntryForm"]["keypass"].value;
                if (keypass == "") {
                    alert("keypass must be filled out");
                }
            }

    /** AUDIO */ 
            let isAudioPlayed = false;
            let marker;
            const fileTypes = [["mp3", "mpeg"], ["wav", "wav"]];

            const audioPlayer = document.querySelector("#audioPlayer");
            const playPauseBtn = document.querySelector('#playPause');
            const reloadBtn = document.querySelector('#reload');
            const audioControls = document.querySelector('#audioControls');
            
            function getMarker() { // Convert audioPoint to a string of a human-readable timestamp, as this value's example shows
                if (!isAudioPlayed) return false; 

                let audioMinutes = Math.floor(audioPlayer.currentTime / 60); // Use audioPlayer.duration?
                let audioSeconds = Math.floor(audioPlayer.currentTime % 60);
            
                if (audioMinutes < 10) {
                    audioMinutes = "0" + audioMinutes;
                } else if (audioMinutes > 59) {
                    audioMinutes = audioMinutes / 60;
                    audioMinutes = audioMinutes < 9 ? "0" + audioMinutes : audioMinutes;
                }
            
                if (audioSeconds < 10) {
                    audioSeconds = ":0" + audioSeconds;
                } else if (audioSeconds > 59) {
                    audioSeconds = audioSeconds / 60;
                    
                    if (audioSeconds < 9) { 
                        audioSeconds = ":0" + audioSeconds;
                        audioMinutes = "01";
                    }
                } else audioSeconds = ":" + audioSeconds;
            
                marker = audioMinutes + audioSeconds;
                        // Ex: note_12122021_gsn_03:10:00
                noteID = "note_" + noteStartDate + "_" + project + "_" + marker;

                return marker;
            }

            function setAudioTrack() {
                for (let type in fileTypes) {
                    let el = document.createElement("source");

                    el.setAttribute("type", "audio/" + type[1]);
                    el.setAttribute("id", type[0]);
                    el.setAttribute("src", "media/" + project + "." + type[0]);

                    audioPlayer.appendChild(el);
                }
            }
            
            function setIsAudioPlayedBoolean() {
                if (!isAudioPlayed) isAudioPlayed = true;
            }

            audioPlayer.addEventListener('play', setIsAudioPlayedBoolean);

            playPauseBtn.addEventListener('click', event => {
                toggleNotePadReveal(false);
            
                if (audioPlayer.currentTime === 0.0 || audioPlayer.paused) {
                    audioPlayer.play(); 
                    playPauseBtn.textContent = "Pause";
                } else  {
                    audioPlayer.pause(); 
                    playPauseBtn.textContent = "Continue";
                }
            });
            
            reloadBtn.addEventListener('click', event => { 
                toggleNotePadReveal(false);
            
                audioPlayer.currentTime = 0.0;
                audioPlayer.load(); 
                playPauseBtn.textContent = "Play";
            });

            // document.getElementById('home').onclick = function() {
            //     document.getElementById('notesContainer').innerHTML = home;
            //     document.getElementById('audioControls').innerHTML = audioControls;
            //     document.getElementById('menu').className = 'hiddenmenu';
            //     display_saved_note();
            // }


    /** NAVIGATION */ 
            // document.getElementById('menulink').onclick = function() {
            //     var menu = document.getElementById('menu');
            //     if(menu.className != 'shownmenu') {
            //         menu.className = 'shownmenu';
            //     }
            //     else {
            //         menu.className = 'hiddenmenu';
            //     }
            // }

   /** NOTES */ 
            let isNotePadUsed = false;

            const notePad = document.querySelector("#notePad");
            const notePadTextarea = document.querySelector("#notePadTextarea");
            const notePadLabel = document.querySelector("#notePadLabel");
            const toggleNotePadBtn = document.querySelector('#toggleNotePad'); // const makeANoteBtn = document.querySelector('#makeANote');
            const notePadSaveBtn = document.querySelector('#notePadSave');
            const clearNoteBtn = document.querySelector('#notePadClear');
            // const putNotePadAwayBtn = document.querySelector('#putNotePadAway'); // const putNotePadAwayBtn = document.querySelector('#putNotePadAway')

            const notesContainer = document.querySelector("#notesContainer");
            notesContainer.setAttribute("hidden", "true");

            function toggleNotePadReveal(shouldReveal) {
                if (!shouldReveal) {
                    if (isNotePadUsed) {
                        notesContainer.classList.add("dim");
                    }
                    return;
                } else if (isNotePadUsed && notesContainer.classList.contains("dim")) {
                    notesContainer.classList.remove("dim");
                }
            }

            function toggleNotePad(event) {
                if (event.target.innerHTML === "Put Note Away") {
                    toggleNotePadReveal(false);
                    notesContainer.setAttribute("hidden", "true");
                    event.target.innerHTML = "Make A Note";
                    return;
                }
                
                isNotePadUsed = true;

                event.target.innerHTML = "Put Note Away";
                notesContainer.removeAttribute("hidden");

                const marker = getMarker(); // Gets the timestamp for SQL lookup of text at that marker
                const currentEntry = 'SELECT contents FROM note WHERE note_id = ?', noteID;

                notePadLabel.innerHTML = "Note For " + marker + ":";
                notePadTextarea.innerHTML = currentEntry;

                toggleNotePadReveal(true);
            }

            function setNote() {
                if (notePadTextarea.innerHTML !== "") {
                    marker = getMarker();

                    const listItem = marker ? `Note For ${marker}` : "General Note";

                    if (marker) {
                        const itemLink = document.createElement("a");
                        itemLink.setAttribute("href", "#");
                        itemLink.textContent = listItem;

                        const itemListItem = document.createElement("li");
                        const linkText = marker ? marker : "general";
                        itemListItem.setAttribute("id", "list_" + linkText);

                        itemListItem.appendChild(itemLink);
                        notesList.appendChild(itemListItem);
                    } else if (document.querySelector('#list_general')) {
                        // Make sure the general notes is appended
                    }
                }
            }

            notePadTextarea.addEventListener('mouseout', setNote);

            toggleNotePadBtn.addEventListener('click', event => toggleNotePad(event));

            notePadSaveBtn.addEventListener('click', setNote);

            clearNoteBtn.addEventListener('click', event => {
                notePad.value = "";
            });

            notePad.addEventListener('click', toggleNotePad);

            // function makeLarge() { 
            //     audio.width = 1000; 
            // }

            // function makeSmall() { 
            //     audio.width = 250; 
            // } 

            // function makeNormal() { 
            //     audio.width = 500; 
            // } 

            // function display_saved_note() {
            //     if(check_web_storage_support() == true) {
            //         result = localStorage.getItem('note');
            //     }
            //     if(result === null) {
            //         result = "No note saved";
            //     }
            //     document.getElementById('notePad').value = result;
            // }

            // function check_web_storage_support() {
            //     if(typeof(Storage) !== "undefined") {
            //         return(true);
            //     }
            //     else {
            //         alert("Web storage unsupported!");
            //         return(false);
            //     }
            // }

            /** LIST OF LINKS */
            const notesList = document.querySelector('#notesList');

    /** ADMIN*/
            // Log in
                // Authentication
                // Compare previous cookie with saved previous cookie
                // Set session id
                // Set current cookie
                // Save session info, current cookie, device info, datetime, role, ip, and is_sus
            // Log out
                // Compare session info, current cookie, device info, etc. with already-saved info for this admin
                    // If the above checks out, delete the session id 
            // Show all users 
                // See stats on guest visits, play times, marker notes
            // Show all notes
            // Show all media files
            // Show all digests
            // Show menu of options
            // Create media file
                // Name media file
                // Describe media file
            // Read media file
                // Retrieve media file
                // Retrieve description
                // Retrieve total listens per day   
                    // Retrieve total listens per user type
                        // Retrieve total listens per user
                // Retrieve total notes per day
                    // Retrieve total notes per markers
                        // Retrieve total notes per marker per user
                // Update file's info date and time from admin usage aka "read_datetime" column
                    // Save admin_reads changes
            // Update/Replace media file
                // Update media file
                // Update media file name
                // Update media file description
                // Update file's info date and time from admin usage aka "update_datetime" column
                // Save above changes
            // Delete media file
                // Delete media file
                // Update file's info date and time from admin usage aka "deletion_datetime" column
            // Digest
                // Accumulate digest contents
                // Create tldr
                // Form digest
                    // Greeting for admin
                    // Title
                    // tldr
                    // Description
                    // Signature
                // Email digest
                // Show success/error message to user

            
            function adminFormTasksSection() { 
                let username = document.forms["appEntryForm"]["username"].value;
                if (username == "") {
                    alert("user name must be filled out");
                } 

                let email = document.forms["appEntryForm"]["email"].value;
                if (email == "") {
                    alert("email must be filled out");
                }

                let secretImgAnswer = document.forms["appEntryForm"]["secretImgAnswer"].value;
                if (secretImgAnswer == "") {
                    alert("secretImgAnswer must be filled out");
                }

                // select element 
                let toDo = document.forms["appEntryForm"]["toDo"].value;
                if (toDo == "") {
                    alert("to Do must be filled out");
                }
                // select element 
            }
            
            function adminfileUploadSection() { 
                let fileUploadName = document.forms["appEntryForm"]["fileUploadName"].value;
                if (fileUploadName == "") {
                    alert("file Upload Name must be filled out");
                } 

                let fileUpload = document.forms["appEntryForm"]["fileUpload"].value;
                if (fileUpload == "") {
                    alert("file Upload must be filled out");
                }

                let fileUploadDetails = document.forms["appEntryForm"]["fileUploadDetails"].value;
                if (fileUploadDetails == "") {
                    alert("file Upload Details must be filled out");
                }
            }
            
            function adminfileReplaceSection() { 
                // select element
                let fileReplaceName = document.forms["appEntryForm"]["fileReplaceName"].value;
                if (fileReplaceName == "") {
                    alert("file Replace Name must be filled out");
                } 
                // select element

                let fileReplace = document.forms["appEntryForm"]["fileReplace"].value;
                if (fileReplace == "") {
                    alert("file Replace must be filled out");
                }

                let fileReplaceDetails = document.forms["appEntryForm"]["fileReplaceDetails"].value;
                if (fileReplaceDetails == "") {
                    alert("file Replace Details must be filled out");
                }
            }
            
            function adminfileDeleteSection() { 
                // select element
                let fileDeleteName = document.forms["appEntryForm"]["fileDeleteName"].value;
                if (fileDeleteName == "") {
                    alert("file Delete Name must be filled out");
                } 
                // select element

                let fileDeleteDetails = document.forms["appEntryForm"]["fileDeleteDetails"].value;
                if (fileDeleteDetails == "") {
                    alert("file Delete Details must be filled out");
                }
            }

    /** MISC. */ 
            // document.getElementById('about').onclick = function() {
            //     document.getElementById('notesContainer').innerHTML = "";
            //     document.getElementById('audioControls').innerHTML = "";
            //     document.getElementById('menu').className = 'hiddenmenu';
            //     var p = document.createElement('p');
            //     p.id = 'aboutus';
            //     notesContainer.appendChild(p);
            //     var text = document.createTextNode("This tutorial is made possible through Eqela Developer Network");
            //     p.appendChild(text);
            // }

    /** Email to send to admins */
            const digest = () => {
                if ("admin is webmaster") return everyDetectedAppChange;

                if ("admin is Lance and digest was not already sent out") {
                    /** 
                     * mailto: admin@something.net
                     * mailfrom: thesite
                     * subject: Digest
                     * body: 
                     *      Relevant info:
                     *      - User saved # of notes in a day
                     *      - Guest visits per day to the app
                     *      - User visits per day to the app
                     *      - Guest visits per day to a project
                     *      - User visits per day to a project
                     * */
                }
            }; 

    /** CALLS */
            setAudioTrack();
}
