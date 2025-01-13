/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/

import fetch from "node-fetch"

let handler = async (m, { conn }) => {
  // Daftar URL gambar
  let urls = [
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(20).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(10).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(11).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(12).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(13).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(14).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(15).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(16).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(17).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(18).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(19).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(2).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(20).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(21).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(4).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(5).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(6).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(7).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(8).jpeg',
    'https://raw.githubusercontent.com/VynaaValerie/Cauple-Mobile-Legends-/main/ppcp/images%20(9).jpeg'
  ]
  
  // Ambil URL acak
  let randomUrl = urls[Math.floor(Math.random() * urls.length)]
  
  // Ambil gambar dari URL
  let image = await (await fetch(randomUrl)).buffer()
  
  // Kirim gambar dengan caption
  await conn.sendFile(m.chat, image, '', 'nih bucin🤭', m)
}

handler.help = ['ppcpml']
handler.tags = ['internet']
handler.command = /^(ppcpml|coupleml)$/i
handler.limit = false
handler.premium = true
export default handler