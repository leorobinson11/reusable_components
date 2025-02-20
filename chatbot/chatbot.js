import React, {useState} from "react";
import { PiHeadCircuitThin } from "react-icons/pi";
import { RxPaperPlane } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import "./chatbot.css";
import axios from "axios";

const api_reply = async (prompt) => {
    try {
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const apiKey = "your-api-key";

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };
        const requestBody = {
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: prompt }],
        };
        
        const { response } = await axios.post(apiUrl, requestBody, { headers });
    
        return response.choices[0].message.content;
    } catch (error) {
        console.log("Error fetching response", error);
        return "Error"
    }
}

const AImessage = ({ text }) => {
    return (
        <div className="aimessage">
            <IoMdSettings className="ai-icon"/>
            <span> {text} </span>
        </div>
    )
}

const Usermessage = ({ text }) => {
    return (
        <div className="usermessage">
            <span> {text} </span>
            <FaUserCircle className="user-icon"/>
        </div>
    )
}


const Chatbot = () => {
    const [ open, setOpen ] = useState(false);
    const [ messages, setMessages ] = useState([{ sender:"ai", text:"Hello, how can I help you?" }]);

    const reply = async (message) => {
        // making api call to chatgpt
        let answer = await api_reply(message);
        setTimeout(() => {
            setMessages(prev => [...prev, { sender:"ai", text:answer }]);
        }, 500)
    }

    const addMesssage = () => {
        // adding  new message
        const input = document.getElementById("input");
        let message = input.value;
        //checking if the message exists
        if (message.trim().length !== 0) {
            input.value = '';
            setMessages(prev => [...prev, { sender:"user", text:message }]);

            reply(message);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            addMesssage();
        };
    };

    return (
        <div className="chatbot-container">
            <div className="icon-container" onClick={() => { setOpen(!open) }}>
                <PiHeadCircuitThin className="icon"/>
            </div>

            <div className={`message-area ${open ? 'open':''}`}>
                <div className="chat">
                    {messages.map((msg, index) => 
                        msg.sender === "user" ? (
                            <Usermessage key={index} text={msg.text} />
                        ) : (
                            <AImessage key={index} text={msg.text} />
                        )
                    )}
                </div>

                <div className="input-container">
                    <input 
                        type="text" 
                        className="input" 
                        id="input" 
                        placeholder="Message"
                        onKeyDown={handleKeyDown}
                        autocomplete="off"
                    />
                    <div className="send-icon-container" onClick={addMesssage}>
                        <RxPaperPlane className="send-icon"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;