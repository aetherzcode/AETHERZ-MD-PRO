let handler = async (m, { conn, command, text }) => {
	
    if (!text) return conn.reply(m.chat, 'Ketik Namanya Tolol!', m)
	
  conn.reply(m.chat, `
╭━━━━°「 *Memek ${text}* 」°
┃
┊• Nama : ${text}
┃• Memek : ${pickRandom(['dih kok item neng?','Keriput wkwk','Muluss','Putih Mulus','Black Doff','Pink woww','Item Glossy'])}
┊• True : ${pickRandom(['perawan','ga perawan','udah pernah dimasukin','masih ori','dobol'])}
┃• jembut : ${pickRandom(['lebat','ada sedikit','gada jembut','tipis','muluss'])}
╰═┅═━––––––๑
`.trim(), m)
}
handler.help = ['cekmemek <nama>']
handler.tags = ['fun']
handler.command = /^cekmemek/i

export default handler 

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}