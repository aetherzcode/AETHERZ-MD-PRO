import fs from 'fs';
import acrcloud from 'acrcloud';
let acr = new acrcloud({
  host: 'identify-ap-southeast-1.acrcloud.com',
  access_key: '7ed7b00ba042d54d4347de5db13d73cd',
  access_secret: 'DxCrV1pcMWaaXvxBUAwxObGLsWiZT5mIw7qR9CWs'
})

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (/audio|video/.test(mime)) {
    let media = await q.download()
    let ext = mime.split('/')[1]
    fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media)
    let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`))
    let { code, msg } = res.status
    if (code !== 0) throw msg
    let { title, artists, release_date } = res.metadata.music[0]
    let txt = `
*乂 M U S I C - D E T E C T I O N*

   ◦ Title : ${title || 'Not found'}
   ◦ Artist : ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'Not found'}
   ◦ Release : ${release_date || 'Not found'}
`.trim()
    fs.unlinkSync(`./tmp/${m.sender}.${ext}`)
    m.reply(txt)
  } else throw m.reply(`*• Example :* ${usedPrefix + command} *[reply music/audio]*`)
}
handler.help = ["whatmusik *[reply audio]*"]
handler.tags = ["tools"]
handler.command = /^(laguapani|whatmusik|whatlagu)$/i
export default handler;