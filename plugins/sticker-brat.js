import {
	Sticker
} from 'wa-sticker-formatter'
var handler = async (m, {
	conn,
	text,
	command
}) => {
    if (!text) m.reply('Masukan text')
	try {
        const emojis = text.match(/[\p{Emoji}\uFE0F-\uFFFF]/gu);
        let emojiText = emojis ? emojis.join('') : '';
        const maxTextLength = 151 - emojiText.length;  // Mengurangi panjang emoji dari batas teks
        let clippedText = text.substring(0, maxTextLength);

        let req = `https://api.betabotz.eu.org/api/maker/brat?text=${encodeURIComponent(clippedText)}&apikey=${global.lann}`;
        let stiker = await createSticker(req, false, '', '')
    	await conn.sendFile(m.chat, stiker, '', '', m, '')
	} catch (e) {
		console.log(e)
	}
}

handler.command = handler.help = ['brat']
handler.tags = ['sticker']
handler.limit = true;
handler.register = true;

export default handler;

async function createSticker(img, url, packName, authorName, quality) {
	let stickerMetadata = {
		type: 'full',
		pack: stickpack,
		author: stickauth,
		quality
	}
	return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}