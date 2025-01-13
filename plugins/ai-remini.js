import axios from 'axios'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'
let handler = async (m, {
   conn,
   usedPrefix,
   command,
   args
}) => {
   try {
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || ''
      if (!mime) return conn.reply(m.chat, 'Reply photo.', m)
      if (!/image\/(jpe?g|png)/.test(mime)) return conn.reply(m.chat, 'Only for photo.', m)
      m.reply('Wait...')
      let img = await q.download()
      let image = await uploader(img)
      let json = await (await axios.get('https://api.alyachan.dev/api/remini?image=' + image.data.url + '&apikey=Ariel1')).data
      if (!json.status) return conn.reply(m.chat, String(json), m)
      conn.sendFile(m.chat, json.data.url, '', '', m)
   } catch (e) {
      return conn.reply(m.chat, String(e), m)
   }
}
handler.help = ['remini', 'color', 'hdr']
handler.tags = ['ai']
handler.limit = true
handler.command = ['remini', 'color', 'hdr', 'hd']
export default handler

async function uploader(buffer) {
   return new Promise(async (resolve) => {
      try {
         const { ext } = await fileTypeFromBuffer(buffer)
         const form = new FormData()
         form.append('file', buffer, 'tmp.' + ext)
         const json = await (await axios.post("https://tmpfiles.org/api/v1/upload", form, {
            headers: {
               "accept": "/",
               "accept-language": "id-ID , id q=O. 9 , en- US  q=0.8, en q=0.7",
               "content-type": "multipart/form-data",
               "origin": "https://tmpfiles.orgi",
               "referer": "https://tmpfiles.org/",
               "sec-ch-ua": '"Chromium"v="107", "Not=A?Brand"v="24"',
               "sec-ch-ua-mobile": "?1",
               "sec-ch-ua-platform": "Android",
               "sec-fetch-dest": "empty",
               "sec-fetch-mcde": "cors",
               "sec-fetch-site": "same-origin",
               "user-agent": "Mozilla/5.0 (Linux Android 6.0.1 SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
               "x-requested-with": "XMLHttpRequest",
               ...form.getHeaders()
            }
         })).data
         if (json.status != 'success') return resolve({
            developer: '@naando.io',
            status: false,
            msg: 'Failed to uploaded'
         })
         resolve({
            developer: '@naando.io',
            status: true,
            data: {
               url: json.data.url.replace('https://tmpfiles.org/', 'https://tmpfiles.org/dl/')
            }
         })
      } catch (e) {
         console.log(e)
         resolve({
            creator: global.creator,
            status: false,
            msg: e.message
         })
      }
   })
}