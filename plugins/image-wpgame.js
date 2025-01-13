import fetch from "node-fetch"
let handler = async (m, { conn, usedPrefix, command }) => {
 let g = await fetch(`https://raw.githubusercontent.com/inirey/RESTAPI/master/data/GameWallp.json`)
let f = await g.json()
let a = f[Math.floor(Math.random() * f.length)]
conn.sendFile(m.chat, a, 'wpgame.jpg', 'Wallpaper Game', m)
}
handler.help = ['wpgame']
handler.tags = ['image']
handler.command = /^wpgame$/i
handler.limit = true
handler.premium = true
export default handler 
