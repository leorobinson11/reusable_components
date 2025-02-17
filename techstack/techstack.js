import React from "react";
import './techstack.css'
import { FaCode } from "react-icons/fa6";
import { FaPython } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import { BiLogoCPlusPlus } from "react-icons/bi";


const Hidden_Icons = () => {
    const icons = [<FaPython className="icon"/>, <FaJs className="icon"/>, <BiLogoCPlusPlus className="icon"/>]
    return (
        <div className="hidden-icons">
            {icons.map((item, index) => (
                <div className="perim"> 
                    {item}
                </div>
            ))}
        </div>
    )
}

const Techstack = () => {
    return (
        <div className="colapsable-techstack">
            <div className="techstack-perim">
                <FaCode className="techstack-icon" />
            </div>
            <Hidden_Icons />
        </div>
    )
};

export default Techstack;