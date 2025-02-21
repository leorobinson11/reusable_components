import React, {useState} from "react";
import "./email.css"

const VerifiedEmail = () => {
    const [ sent, setSent ] = useState(false);
    const [ confirmed, setConfirmed ] = useState(false)

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            // call backend api here to trigger sending of code
            
            event.preventDefault();
            setSent(true);
            document.getElementById("c1").focus();
        };
    };

    const moveToNext = (event) => {
        let next;
        let i = parseInt(event.target.id.replace('c', ''), 10);
        if (event.key === "Enter" && i==4) {
            // send code to backend for confirmation

            event.preventDefault();
            setConfirmed(true);

        } else {
            if (event.key === "Backspace") {
                if (event.target.value.length === 0 && i > 1) {
                    next = i - 1;
                }
            } else if (event.target.value.length === 1) {
                next = i + 1;
            }
            if (next >= 1 && next <= 4) {
                document.getElementById(`c${next}`).focus();
            }
        }
    }

    return (
        <div className="container">
            <div className={`email-container ${sent ? "hidden" : ""}`}>
                <form>
                    <input 
                        className="email-input"
                        type="email"  
                        placeholder="user@gmail.com" 
                        autoComplete="off"
                        onKeyDown={handleKeyDown} 
                    />
                </form>
            </div>

            <div className={`code-container ${sent ? "" : "hidden"} ${confirmed ? "confirmed" : ""}`}>
                <input className="code-input" id="c1" placeholder="0" maxLength={1} onKeyDown={moveToNext} />
                <input className="code-input" id="c2" placeholder="0" maxLength={1} onKeyDown={moveToNext} />
                <input className="code-input" id="c3" placeholder="0" maxLength={1} onKeyDown={moveToNext} />
                <input className="code-input" id="c4" placeholder="0" maxLength={1} onKeyDown={moveToNext} />
            </div>
            {
            <div className={`confirmation-text  ${confirmed ? "confirmed" : ""}`}>
                <h1> Email confirmed! </h1>
            </div>
            }
        </div>
    )
};

export default VerifiedEmail;