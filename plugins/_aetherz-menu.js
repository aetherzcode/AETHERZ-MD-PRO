import { promises } from 'fs'
import canvafy from "canvafy";
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'
const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] 
            ? m.mentionedJid[0] 
            : m.quoted 
            ? m.quoted.sender 
            : m.fromMe 
            ? conn.user.jid 
            : m.sender;
  
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/3cj9sd.jpg')

  const defaultMenu = {
    before: ``.trimStart(),
    header: '',
    body: '',
    footer: '',
    after: '',
  }

  let msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `Nama saya adalah *Aᴇᴛʜᴇʀᴢ-ᴍᴅ Pʀᴏ*\n\nBot ini dapat digunakan untuk berbagai kebutuhan seperti edukasi, unduhan media, game, penjaga grup, dan lainnya.\n\nGunakan tombol di bawah untuk memulai.`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "Aetherz MD Pro"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "Aᴇᴛʜᴇʀᴢ-ᴍᴅ Pʀᴏ",
            subtitle: "Create by AetherzCode",
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"List Menu (MenuList)\",\"id\":\".menulist\"}"
              }, 
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Semua Menu (AllMenu)\",\"id\":\".allmenu\"}"
              }, 
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Total Fitur\",\"id\":\".totalfitur\"}"
              }, 
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Ping\",\"id\":\".ping\"}"
              },
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Script By AetherzCode\",\"id\":\".sc\"}"
              },           
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Owner Bot\",\"id\":\".owner\"}"
              }
            ],
          })
        })
      }
    }
  }, {})

  await conn.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  })

  let tags = { 'aetherzmenu': {} }
  let d = new Date(new Date + 3600000)
  let locale = 'id'
  let week = d.toLocaleDateString(locale, { weekday: 'long' })
  let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
  let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
  let time = d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' })

  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)

  let name = await conn.getName(m.sender)
  let text = `Hello ${name}, berikut fitur yang tersedia pada bot ini:\n\n`

  // Tambahkan fitur Anda di sini jika diperlukan
  text += Object.keys(tags).map(tag => `${tag}`).join('\n')

  let fkon = {
    key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) },
    message: { 
      contactMessage: { 
        displayName: `${name}`, 
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nEND:VCARD`
      }
    }
  }

  conn.sendMessage(m.chat, { text }, { quoted: fkon })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|help)$/i
handler.register = false

export default handler

//---------- FUNCTION ----------

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  if (time >= 4 && time < 10) return "Selamat Pagi 🌄"
  if (time >= 10 && time < 15) return "Selamat Siang ☀️"
  if (time >= 15 && time < 18) return "Selamat Sore 🌇"
  return "Selamat Malam 🌙"
}