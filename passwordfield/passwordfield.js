import React, { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import './passwordfield.css'

const Passwordfield = () => {
    const [showPassword, setshowPassword] = useState(true);
    
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    
    const handleToggle = () => {
        const random_chars = "*&%$#01?/@!"

        const password = document.getElementById("password");
        const memory = password.value;
        if (showPassword) {
            // Hiding password
            let i = 0;
            const interval = setInterval(async () => {
                // Replace character with random symbol for short time
                password.value = password.value.substring(0, i) + random_chars[getRandomInt(random_chars.length)]  + password.value.substring(i + 1);
                await new Promise(resolve => setTimeout(resolve, 90));

                // Hiding password
                password.value = password.value.substring(0, i) + "•" + password.value.substring(i + 1);

                i++;

                if (i >= password.value.length) {
                    setshowPassword(false);
                    password.value = memory;
                    clearInterval(interval);
                }
            }, 100);

        } else {
            // Showing password
            password.value = new Array(memory.length + 1).join("•");
            setshowPassword(true);
            let i = memory.length-1;

            const interval = setInterval(async () => {
                // Replace character with random symbol for short time
                password.value = password.value.substring(0, i) + random_chars[getRandomInt(random_chars.length)]  + memory.substring(i-1);
                await new Promise(resolve => setTimeout(resolve, 90));

                // Returning to normal password
                password.value = password.value.substring(0, i) +  memory.substring(i);
                i--;
                if (i < 0) {
                    clearInterval(interval);
                }
            }, 100);
        }

    }

    return (
        <div className="toggable-password">
            <form>
                <input 
                    id="password"
                    type={showPassword ? "text": "password"}
                    placeholder="Password"
                />

                {
                    showPassword ? (
                        <AiFillEyeInvisible 
                            className="eye"
                            onClick={handleToggle}
                        />
                    ) : (
                        <AiFillEye
                            className="eye"
                            onClick={handleToggle}
                        />
                    )
                }
            </form>
        </div>
    )
}

export default Passwordfield;