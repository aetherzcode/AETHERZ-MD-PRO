/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/

const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, usedPrefix, command }) => {
    const namae = 'Anu'

    const data = {
        title: "Menu",
        sections: [
            {
                title: "🤖 AETHERz-MD-PRO",
                rows: [{ title: "Lihat semua menu", description: "Klik untuk melihat semua menu yang tersedia", id: '.allmenu' }]
            },
            {
                title: "",
                rows: [{ title: "Hubungi owner bot", description: "Klik untuk nomor owner", id: '.owner' }]
            },
            {
                title: "",
                rows: [{ title: "Tentang kami", description: "Klik untuk mengetahui lebih lanjut tentang kami", id: '.about' }]
            },
            {
                title: "",
                rows: [{ title: "Peraturan", description: "Klik untuk melihat peraturan kami", id: '.rules' }]
            },
            {
                title: "🗃️ Fitur Tersedia",
                rows: [{ title: "Menu Download", description: "Klik untuk melihat menu download", id: '.menudownload' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Fun", description: "Klik untuk melihat menu fun", id: '.menufun' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Group", description: "Klik untuk melihat menu group", id: '.menugroup' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Info", description: "Klik untuk melihat menu info", id: '.menuinfo' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Judi", description: "Klik untuk melihat menu judi", id: '.menujudi' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Game", description: "Klik untuk melihat menu game", id: '.menugame' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Internet", description: "Klik untuk melihat menu internet", id: '.menuinternet' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Jadi Bot", description: "Klik untuk melihat menu jadi bot", id: '.menujadibot' }]
            },
            {
                title: "",
                rows: [{ title: "Menu AI V1", description: "Klik untuk melihat menu Ai", id: '.menuai' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Maker", description: "Klik untuk melihat menu maker", id: '.menumaker' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Owner", description: "Klik untuk melihat menu owner", id: '.menuowner' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Premium", description: "Klik untuk melihat menu premium", id: '.menuprem' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Push", description: "Klik untuk melihat menu push", id: '.menupush' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Quran", description: "Klik untuk melihat menu Quran", id: '.menuquran' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Random", description: "Klik untuk melihat menu random", id: '.menurandom' }]
            },
            {
                title: "",
                rows: [{ title: "Menu AI V2", description: "Klik untuk melihat menu AI2", id: '.menuai2' }]
            },
            {
                title: "",
                rows: [{ title: "Menu NSFW", description: "Klik untuk melihat menu NSFW", id: '.menunsfw' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Quotes", description: "Klik untuk melihat menu quotes", id: '.menuquotes' }]
            },
            {
                title: "",
                rows: [{ title: "Menu RPG", description: "Klik untuk melihat menu RPG", id: '.menurpg' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Stiker", description: "Klik untuk melihat menu stiker", id: '.menustiker' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Store", description: "Klik untuk melihat menu store", id: '.menustore' }]
            },
            {
                title: "",
                rows: [{ title: "Menu Tools", description: "Klik untuk melihat menu tools", id: '.menutools' }]
            }
        ]
    };

    let msgs = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: 'Pilih Salah Satu Di Bawah'
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: 'Powered By AETHER'
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: 'Click Here',
                        subtitle: "",
                        hasMediaAttachment: false
                    }),
                    contextInfo: {
                        forwardingScore: 9999,
                        isForwarded: false,
                        mentionedJid: conn.parseMention(m.sender)
                    },
                    externalAdReply: {
                        showAdAttribution: true,
                        renderLargerThumbnail: false,
                        mediaType: 1
                    },
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "single_select",
                            "buttonParamsJson": JSON.stringify(data)
                        }],
                    })
                })
            }
        }
    }, {})

    conn.relayMessage(m.chat, msgs.message, {})
}

handler.help = ['menulist']
handler.tags = ['main']
handler.command = /^(listmenu|menulist)$/i

export default handler