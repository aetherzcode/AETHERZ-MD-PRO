/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/

import fetch from 'node-fetch'
const {
    proto,
    generateWAMessageFromContent,
    prepareWAMessageMedia
} = (await import('@whiskeysockets/baileys')).default
import { googleImage } from '@bochilteam/scraper'

var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} anu`
    const wait = 'Please wait...'; // Define wait message
    const wm = 'AETHERz-MD'; // Define watermark text
    const errorMessage = 'An error occurred'; // Define error message

    m.reply(wait)
    try {
        const res = await googleImage(text)
        let image = res.getRandom()
        let link = image
        let msgs = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `Nih Foto ${text}nya\nSource : Google`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: wm
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: true,
                            ...await prepareWAMessageMedia({ image: { url: link } }, { upload: conn.waUploadToServer })
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [{
                                name: "quick_reply",
                                buttonParamsJson: `{\"display_text\":\"Next Image ${text}\",\"id\":\".gimage ${text}\"}`
                            }]
                        })
                    })
                }
            }
        }, { quoted: m })

        return await conn.relayMessage(m.chat, msgs.message, {})
    } catch (e) {
        // Use m.reply to send a simpler error message
        m.reply(errorMessage)
    }
}

handler.help = ['gimage']
handler.tags = ['downloader']
handler.command = /^(gimage|googleimage|foto|gimg|googleimg|image)$/i
handler.limit = true

export default handler