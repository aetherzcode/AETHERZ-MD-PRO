import fs from 'fs'

let handler = async (m, { conn }) => {
	let tqto = `Thanks Too :
	
*• Thanks To •*
*- AETHER * _https://aetherz.xyz_

`;
	await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/39497eb26a44d30a9b190.jpg' }, caption: tqto }, m)
}
handler.help = ['tqto']
handler.tags = ['info']
handler.command = /^(tqto)$/i;

export default handler;
