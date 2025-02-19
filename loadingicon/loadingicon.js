import React, { useEffect, useState } from "react";

const Loadingicon = ({ radius=50,  dotRadius=4, numdots=12 }) => {
    const [pos, setPos] = useState(0);

    useEffect(() => {
        // updating the ration of the opacity evect
        const interval = setInterval(() => {
            setPos((prev) => (prev + 1) % numdots);
        },100);
        return () => clearInterval(interval);
    }, []);

    // creating dotted circle
    const dots = Array.from({ length:numdots }).map((_,i) => {
        // calculating positions of dots
        let angle = (i/numdots) * 2 * Math.PI;
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);

        // calculating opacity
        let o = 1/((i+pos) % numdots);

        return <circle key={i} cx={x} cy={y} r={dotRadius} opacity={o} fill="black" />
    });

    return (
        <svg width="200" height="200" viewBox="-100 -100 200 200">
            <g> {dots} </g>
        </svg>
    )
}

export default Loadingicon;