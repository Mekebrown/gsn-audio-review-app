window.onload = () => {
    /** AUDIO */ 
            let isAudioPlayed = false;
            let marker;

            const audioPlayer = document.querySelector("#audioPlayer");
            const playPauseBtn = document.querySelector('#playPause');
            const reloadBtn = document.querySelector('#reload');
            const controls = document.querySelector('#controls');
            
            function getMarkerOutput() { // Convert audioPoint to a string of a human-readable timestamp, as this value's example shows
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

                return marker;
            }
            
            function setAudioPlayerVar() {
                if (!isAudioPlayed) isAudioPlayed = true;
            }

            audioPlayer.addEventListener('play', setAudioPlayerVar);

            playPauseBtn.addEventListener('click', event => {
                dimNotePad();
            
                if (audioPlayer.currentTime === 0.0 || audioPlayer.paused) {
                    audioPlayer.play(); 
                    playPauseBtn.textContent = "Pause";
                } else  {
                    audioPlayer.pause(); 
                    playPauseBtn.textContent = "Continue";
                }
            });
            
            reloadBtn.addEventListener('click', event => { 
                dimNotePad();
            
                audioPlayer.currentTime = 0.0;
                audioPlayer.load(); 
                playPauseBtn.textContent = "Play";
            });

            // document.getElementById('home').onclick = function() {
            //     document.getElementById('notesContainer').innerHTML = home;
            //     document.getElementById('controls').innerHTML = controls;
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
            let noteID;

            const notePad = document.querySelector("#notePad");
            const notePadTextarea = document.querySelector("#notePadTextarea");
            const notePadLabel = document.querySelector("#notePadLabel");
            const notesContainer = document.querySelector("#notesContainer");
            const makeANoteBtn = document.querySelector('#makeANote');
            const notePadSaveBtn = document.querySelector('#notePadSave');
            const clearNoteBtn = document.querySelector('#notePadClear');
            const putNotePadAwayBtn = document.querySelector('#putNotePadAway');

            function dimNotePad() {
                // Add 'hidden' attribute
                if (isNotePadUsed) {
                    notesContainer.classList.add("dim");
                }
            }

            function showNotePadFully() {
                if (isNotePadUsed && notesContainer.classList.contains("dim")) {
                    notesContainer.classList.remove("dim");
                }

                notesContainer.hidden = false;
            }

            function getNoteID(markerOutput) {
                return "note_111"; // "note_" + markerOutput
            }

            function setNotePadText() {
                isNotePadUsed = true;

                const markerOutput = getMarkerOutput();
                const currentEntry = "'SELECT note FROM notes WHERE note_id = ?', getNoteID(markerOutput)";

                notePadLabel.innerHTML = "Note For " + markerOutput + ":";
                notePadTextarea.innerHTML = currentEntry;

                showNotePadFully();
            }

            function setNote() {
                marker = getMarkerOutput();

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

            makeANoteBtn.addEventListener('click', setNotePadText);

            notePadSaveBtn.addEventListener('click', setNote);

            clearNoteBtn.addEventListener('click', event => {
                notePad.value = "";
            });

            putNotePadAwayBtn.addEventListener('click', event => {
                notesContainer.hidden = true;
            });

            notePad.addEventListener('click', setNotePadText);

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

    /** MISC. */ 
            // document.getElementById('about').onclick = function() {
            //     document.getElementById('notesContainer').innerHTML = "";
            //     document.getElementById('controls').innerHTML = "";
            //     document.getElementById('menu').className = 'hiddenmenu';
            //     var p = document.createElement('p');
            //     p.id = 'aboutus';
            //     notesContainer.appendChild(p);
            //     var text = document.createTextNode("This tutorial is made possible through Eqela Developer Network");
            //     p.appendChild(text);
            // }
}
