import axios from 'axios';

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()
    
    await m.reply(wait)
    try {
        const openAIResponse = await processImageAndUpload(media);

        if (openAIResponse) {
            const result = openAIResponse;
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: result
                },
                caption: `Nih effect *photo-to-anime* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["jadianime"].map(v => v + " (Balas foto)")
handler.tags = ["tools"]
handler.command = /^(jadiwibu)$/i
handler.limit = true
export default handler

async function processImageAndUpload(buffer) {
    try {
        
        const base64String = Buffer.from(buffer, 'binary').toString('base64');

        const apiResponse = await axios.post('https://www.drawever.com/api/photo-to-anime', {
            data: `data:image/png;base64,${base64String}`,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return 'https://www.drawever.com' + apiResponse.data.urls[1] || 'https://www.drawever.com' + apiResponse.data.urls[0];
    } catch (error) {
        throw error;
    }
}