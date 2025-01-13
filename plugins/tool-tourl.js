import uploadImage from '../lib/uploadImage.js'
let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No media found'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await uploadImage(media)
  m.reply(`📮 *L I N K :*
${link}
📊 *S I Z E :* ${media.length} Byte
📛 *E x p i r e d :* No Expiry Date`)
}
handler.help = ['tourl (reply media)']
handler.tags = ['tools']
handler.command = /^(tourl|upload)$/i

export default handler