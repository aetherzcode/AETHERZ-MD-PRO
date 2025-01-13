import axios from 'axios'
let handler = async(m, { conn, text: number, usedPrefix, command }) => {
    if (!number || (isNaN(number) && !number.startsWith('+'))) return m.reply(`*Masukan Nomor Yang Ingin Dicari!*\n\n*Contoh:*\n${usedPrefix + command} ${m.sender.split`@`[0]}`)
    let res = await axios.get('https://xzhndvs.vercel.app/api/truecaller', {
        params: {
            nomorCode: number.replace(/@.+/, ''),
            countryCode: 'ID'
        }
    })
    let cap = `
❏ *Name:* ${res.data.data.data[0].name}
▧ *Provider:* ${res.data.data.data[0].phones[0].carrier}
▧ *CountryCode:* ${res.data.data.data[0].phones[0].countryCode}
▧ *Number:* ${res.data.data.data[0].phones[0].e164Format}
`.trim()
    m.reply(cap)
}
handler.help = ['truecaller'].map(v => v + ' <number>')
handler.tags = ['tools']
handler.command = /^(truecaller)$/i
handler.limit = true
export default handler