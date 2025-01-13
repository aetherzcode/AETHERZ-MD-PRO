import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Input URL\n\n${usedPrefix + command} https://twitter.com/dwanchy/status/1655594954633125888?s=19`
    let res = await download(text)
    m.reply(wait)
    if (res.link.length < 1) return conn.sendFile(m.chat, res.link[0], '...', res.description ? res.description : '', m)
    if (res.link.length > 1 && m.isGroup) {
        conn.sendFile(m.chat, res.link[0], '...', `Bot Akan Mengirim Sisa *${res.link.length - 1} Foto/Video* Di Private Chat`, m)
        for (let x = 0; x < res.link.length; x++) {
            if (res.link[x] !== res.link[0]) {
                await delay(2000)
                conn.sendFile(m.sender, res.link[x], '...', null, m)
            }
        }
    } else {
        for (let x = 0; x < res.link.length; x++) {
            await delay(2000)
            conn.sendFile(m.chat, res.link[x], '...', null, m)
        }
    }
}
handler.help = ['twitter']
handler.tags = ['downloader']
handler.command = /^((twt|twitter)(dl)?)$/i
handler.limit = true

export default handler

async function download(url) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
      const response = await axios.post('https://www.expertsphp.com/instagram-reels-downloader.php', { url: url }, config)
      const $ = cheerio.load(response.data)
      const Result = []
      $('.col-md-4.col-md-offset-4 > a.btn.btn-primary.btn-sm.btn-block').each((i, e) => {
        const link = $(e).attr('href')
        Result.push(link)
      })
      return ({
        description: $('div:nth-child(8) > p').text(),
        link: Result,
        Credits: 'https://github.com/ohsyme/skrep/'
      })
      
    } catch (error) {
      throw error
    }
  }
  
const delay = time => new Promise(res => setTimeout(res, time))