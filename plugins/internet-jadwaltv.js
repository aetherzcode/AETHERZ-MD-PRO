import fs from 'fs'
import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { text, conn }) => {
	if (!text) throw 'Input Query'
	let res = await jadwalTV(text)
	let txt = res.result.map((v) => `[${v.jam.replace('WIB', ' WIB')}] ${v.acara}`).join`\n`
	
	// Mengirim pesan bersama thumbnail
	await conn.relayMessage(m.chat, { 
		reactionMessage: { key: m.key, text: '✅' }
	}, { 
		messageId: m.key.id 
	});
	await conn.sendMessage(m.chat, {
		text: `Jadwal TV ${res.channel}\n\n${txt}`,
		contextInfo: {
			externalAdReply: {
				title: 'J A D W A L  T V 📺',
				body: global.author,
				thumbnailUrl: global.aetherzjpg,
				sourceUrl: link.web,
				mediaType: 1,
				renderLargerThumbnail: true
			}
		}
	});
}

handler.help = ['jadwaltv']
handler.tags = ['tools']
handler.command = /^jadwaltv$/i

export default handler

async function jadwalTV(name) {
	let list = JSON.parse(fs.readFileSync('./json/jadwaltv.json', 'utf-8'))
	let data = list.find((v) => (new RegExp(name, 'gi')).test(v.channel)), result = []
	if (!data) throw 'List Channel Yg Tersedia:\n\n' + list.map(v => v.channel).sort().join('\n')
	let html = (await axios.get(`https://www.jadwaltv.net/${data.isPay ? 'jadwal-pay-tv/' : ''}${data.value}`)).data
	let $ = cheerio.load(html)
	$('div > table.table').find('tbody > tr').slice(1).each(function () {
		let jam = $(this).find('td').eq(0).text()
		let acara = $(this).find('td').eq(1).text()
		if (!/Jadwal TV/gi.test(acara) && !/Acara/gi.test(acara)) result.push({ jam, acara })
	})
	return { channel: data.channel.toUpperCase(), result }
}
