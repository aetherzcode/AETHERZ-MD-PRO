import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
    let url = 'https://api.waifu.im/search?included_tags=paizuri';
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.images && data.images.length > 0) {
            const imageInfo = data.images[0];
            const caption = `
Signature: ${imageInfo.signature}
Extension: ${imageInfo.extension}
Image ID: ${imageInfo.image_id}
Favorites: ${imageInfo.favorites}
Source: ${imageInfo.source}
Width: ${imageInfo.width}
Height: ${imageInfo.height}
Byte Size: ${imageInfo.byte_size}
URL: ${imageInfo.url}
            `;
            const imageUrl = imageInfo.url;

            conn.sendFile(m.chat, imageUrl, null, caption, m);
        } else {
            conn.reply(m.chat, 'No anime images found.', m);
        }
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'An error occurred while fetching the data.', m);
    }
}
handler.help = handler.command = ['xpaizuri']
handler.tags = ['nsfw']
handler.limit = true
export default handler