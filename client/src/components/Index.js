import React, {useState, useEffect} from "react";

const Index = () => {
    const [index, setIndex] = useState([]);

    useEffect(() => {
        fetch('/')
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                let error = new Error(res.statusText);
                error.response = res;
                console.warn(error);

                throw error;
            }
        }).then(jsonRes => {
            setIndex(jsonRes.indexContent);
        }).catch((error) => console.warn(error));
    }, [setIndex]);

    return (
        <>
            <header>
                <h2>Home</h2>
            </header>
            <main>
                <div>
                    {index.map(item => <li key={item}>{item}</li>)}
                </div>
            </main>
        </>
    )
}; 

export default Index;
