   /** NOTES */ 
   let notesTaken = false;

   const container = document.querySelector("#container");
   const makeANoteBtn = document.querySelector('#makeANote');
   const notePad = document.querySelector("#notePad");
   const saveNoteBtn = document.querySelector('#notePadSave');
   const clearNoteBtn = document.querySelector('#notePadClear');
   const putNotePadAwayBtn = document.querySelector('#putNotePadAway');

   function dimNotePad() {
       if (notesTaken) {
           container.classList.add("dim");
       }
   }

   function showNotePadFully() {
       if (notesTaken && container.classList.contains("dim")) {
           container.classList.remove("dim");
       }
   }

   makeANoteBtn.addEventListener('click', event => {
       notesTaken = true;

       container.hidden = false;
       showNotePadFully();
       notePad.innerHTML = "Note at " + getTrackCurrentTime();
   });

   saveNoteBtn.addEventListener('click', event => {
       if (check_web_storage_support() == true) {
           if(notePad.value != '') {
               localStorage.setItem("note", notePad.value);
           }
       }
   });

   clearNoteBtn.addEventListener('click', event => {
       notePad.value = "";
   });

   putNotePadAwayBtn.addEventListener('click', event => {
   container.hidden = true;
   });

   container.addEventListener('click', showNotePadFully);

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

    module.exports = {
        showNotePadFully()
    };