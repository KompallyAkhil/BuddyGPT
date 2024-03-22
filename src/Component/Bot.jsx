import style from "./Bot.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {GoogleGenerativeAI} from "https://esm.run/@google/generative-ai";
import {useState} from "react";
function Bot() {
    const [UserInput,FinalUserInput] = useState("");
    const [conversations, setConversations] = useState([]);
    function handleInputChange(event) {
        FinalUserInput(event.target.value);
    }
    function Search(){
        run()
    }
    const API_KEY = "AIzaSyB3XcbJMK7m1XnCFaCaAZSktmKKF2fty5I"
    const genAI = new GoogleGenerativeAI(API_KEY);
    async function run(){
        try{
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
            const prompt = `${UserInput}`
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            setConversations([...conversations,{input:UserInput,response:text}]);
            FinalUserInput("");
        }
        catch(error){
            window.alert("Error Occurred",error)   
        }
}
    return (
        <div className={style.title}>
            <h2>Ask your Questions!!</h2>
            <div className={style.titles}>
                <input className={style.input} value={UserInput} onChange={handleInputChange} placeholder="Enter Something"/>
                <button onClick={Search} className={style.button}>
                    <FontAwesomeIcon icon={faArrowRight} beat size="xl" />
                </button>
            </div>
            <div className={style.container}>
                {conversations.slice().reverse().map((Chat, index) => (
                    <div key={index}>
                        <p className={style.para}><b>You : </b>{Chat.input}</p>
                        <p className={style.para}><h3>Bot : </h3>{Chat.response}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bot;
