import { createContext } from "react";

const values = {
    projectName: "Track Audio",
    createdOn: null,
    currentTime: 0
};

const sources = [
    {item: 1, ext: "mp3", type: "audio/mpeg"}, 
    {item: 2, ext: "ogg", type: "audio/ogg"}
];

const UserContext = createContext();

export default values;
export { sources, UserContext };
