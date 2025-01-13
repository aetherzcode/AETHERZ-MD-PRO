/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/

import fetch from "node-fetch";

let handler = async (m, { conn, command, text }) => {
    if (!text) throw 'aiimage\naiimage1\naiimage2\naiimage3\naiimage4\naiimage5\naiimage6\ndalle\nstablediffusion\n\nExample:highly detailed, intricate, 4k, 8k, sharp focus, detailed hair, detailed';

    // Inform the user that the request is being processed
    m.reply('Please wait, generating your image...');

    // Define the API endpoints
    const apiEndpoints = {
        aiimage: `https://api.betabotz.eu.org/api/maker/text2img?text=${encodeURIComponent(text)}&apikey=${global.lann}`,
        aiimage1: `https://api.betabotz.eu.org/api/maker/text2img?text=${encodeURIComponent(text)}&apikey=${global.lann}`,
        aiimage2: `https://api.betabotz.eu.org/api/maker/text2img?text=${encodeURIComponent(text)}&apikey=${global.lann}`,
        aiimage3: `https://api.betabotz.eu.org/api/maker/text2img?text=${encodeURIComponent(text)}&apikey=${global.lann}`,
        aiimage4: `https://api.betabotz.eu.org/api/maker/text2img?text=${encodeURIComponent(text)}&apikey=${global.lann}`,
        aiimage5: `https://api.betabotz.eu.org/api/maker/text2img?text=${encodeURIComponent(text)}&apikey=${global.lann}`,
        aiimage6: `https://api.betabotz.eu.org/api/maker/text2img?text=${encodeURIComponent(text)}&apikey=${global.lann}`,
        dalle: `https://widipe.com/dalle?text=${encodeURIComponent(text)}`,
        stablediffusion: `https://widipe.com/stablediffusion?text=${encodeURIComponent(text)}`
    };

    // Select the API URL based on the command
    let apiUrl = apiEndpoints[command];

    try {
        // Fetch the image from the API
        let response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error fetching image: ${response.statusText}`);

        // Get the image buffer
        let imageBuffer = await response.buffer();

        // Send the image back to the user
        await conn.sendFile(m.chat, imageBuffer, 'image.jpg', `Prompt: ${text}`, m);
    } catch (error) {
        // Handle any errors that occurred during the fetch
        m.reply(`Error: ${error.message}`);
    }
};

handler.help = ['aiimage', 'aiimage1', 'aiimage2', 'aiimage3', 'aiimage4', 'aiimage5', 'aiimage6', 'dalle', 'stablediffusion'];
handler.tags = ['ai'];
handler.command = /^(aiimage|aiimage1|aiimage2|aiimage3|aiimage4|aiimage5|aiimage6|dalle|stablediffusion)$/i;
handler.limit = true;

export default handler;