import util from "util";
import path from "path";
import axios from "axios";

let handler = async (m, { conn }) => {
    try {
        const response = await axios.get("https://skizo.tech/api/memes?apikey=sweattheartkyl");
        const memeData = response.data;
        const randomIndex = Math.floor(Math.random() * memeData.length);
        const audioUrl = memeData[randomIndex].audioUrl;
        
        conn.sendFile(m.chat, audioUrl, "random_sound.mp3", null, m, true, {
            type: "audioMessage",
            ptt: true,
        });
    } catch (error) {
        console.error("Error fetching meme:", error);
    }
};

handler.customPrefix = /^(soundmeme)$/i;
handler.command = new RegExp();

export default handler;