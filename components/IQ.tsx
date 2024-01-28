import { useEffect, useState } from "react";

const IQ = () => {
    // State to hold the IQ value, initially undefined
    const [iq, setIq] = useState<number | undefined>(undefined);

    // useEffect hook to fetch the IQ value when the component mounts
    useEffect(() => {
        // Fetch the IQ value from the server
        fetch("/api/iq")
            .then((res) => res.json()) // Parse the response as JSON
            .then((iq) => setIq(iq ?? undefined)); // Set the IQ value in the state or keep it undefined if nullish
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Render the IQ value, or a placeholder if it's undefined
    return (
        <>
            <div>
                <main>
                    rgb: {iq ?? "-"}
                </main>
            </div>
        </>
    );
}

export default IQ;
