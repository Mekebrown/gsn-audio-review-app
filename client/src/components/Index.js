import React, {useState, useEffect} from "react";

const Index = () => {
    const [index, setIndex] = useState([]);

    useEffect(() => {
        fetch('/index/').then(res => {
            if (res.ok) {
                setIndex(res.body);
                // return res.json();
            }
        });//.then(jsonRes => {
        //     setIndex(jsonRes.indexContent);
        // });
    }, [setIndex]);

    return (
        <>
            <header>
                <h2>Home</h2>
            </header>
            <main>{index}</main>
        </>
    )
}; 

export default Index;
