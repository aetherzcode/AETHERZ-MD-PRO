/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/

import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (m, { conn, command }) => {
    if (command !== 'waifu') return;

    // Menampilkan pesan proses
    await m.reply("Loading..");

    // Fungsi untuk mendapatkan gambar waifu
    async function getWaifu() {
        let waifus = [];
        for (let i = 0; i < 5; i++) {
            let res = await fetch('https://api.waifu.pics/sfw/waifu');
            if (!res.ok) throw await res.text();
            let json = await res.json();
            waifus.push(json.url);
        }
        return waifus;
    }

    // Mengambil 5 gambar waifu
    let waifus = await getWaifu();

    async function generateImageMessage(url) {
        const { imageMessage } = await generateWAMessageContent({
            image: { url }
        }, {
            upload: conn.waUploadToServer
        });
        return imageMessage;
    }

    // Mengacak urutan gambar
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(waifus);

    let messages = [];
    let counter = 1;
    for (let url of waifus) {
        let imageMessage = await generateImageMessage(url);
        messages.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `Waifu ke - ${counter++}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: "乂 W A I F U"
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: "Hasil Waifu",
                hasMediaAttachment: true,
                imageMessage
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [{
                    name: "cta_url",
                    buttonParamsJson: `{"display_text":"Source","url":"https://whatsapp.com/channel/0029VaHPYh6LNSa81M9Xcq1K","merchant_url":"https://whatsapp.com/channel/0029VaHPYh6LNSa81M9Xcq1K"}`
                }]
            })
        });
    }

    const messageContent = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "Gambar Waifu"
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: "乂 W A I F U"
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                    }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                        cards: [...messages]
                    })
                })
            }
        }
    }, {});

    await conn.relayMessage(m.chat, messageContent.message, { messageId: messageContent.key.id });
};

handler.help = ['waifu'];
handler.tags = ['anime'];
handler.command = /^(waifu)$/i;
export default handler;