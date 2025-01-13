/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
import moment from 'moment-timezone'
import fs from 'fs'
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
    let isEnable = /true|enable|(turn)?on|1/i.test(command)
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let bot = global.db.data.settings[conn.user.jid] || {}
    let name = `${user.registered ? user.name : conn.getName(m.sender)}`
    let type = (args[0] || '').toLowerCase()
    let isAll = false,
    isUser = false
    let caption = `
_*❏ ADMIN COMMAND*_

⩽⩾ antifile ${chat.autobio ? '*( ON )*' : '*( OFF )*'}
⩽⩾ antifoto ${chat.antifoto ? '*( ON )*' : '*( OFF )*'}
⩽⩾ antivideo ${chat.antivideo ? '*( ON )*' : '*( OFF )*'}
⩽⩾ antibot ${chat.antibot ? '*( ON )*' : '*( OFF )*'}
⩽⩾ autodownload ${chat.autodownload ? '*( ON )*' : '*( OFF )*'}
⩽⩾ detect ${chat.detect ? '*( ON )*' : '*( OFF )*'}
⩽⩾ antilink ${chat.antiLink ? '*( ON )*' : '*( OFF )*'}
⩽⩾ antilinkwa ${chat.antiLinkWa ? '*( ON )*' : '*( OFF )*'}
⩽⩾ antitoxic ${chat.antiToxic ? '*( ON )*' : '*( OFF )*'}
⩽⩾ antibadword ${chat.antiBadword ? '*( ON )*' : '*( OFF )*'}
⩽⩾ antidelete ${chat.delete ? '*( ON )*' : '*( OFF )*'}
⩽⩾ antiviewonce ${chat.viewonce ? '*( ON )*' : '*( OFF )*'}
⩽⩾ antisticker ${chat.antiSticker ? '*( ON )*' : '*( OFF )*'}
⩽⩾ antivirtex ${chat.antiVirtex ? '*( ON )*' : '*( OFF )*'}
⩽⩾ simi ${chat.simi ? '*( ON )*' : '*( OFF )*'}
⩽⩾ text ${chat.teks ? '*( ON )*' : '*( OFF )*'}
⩽⩾ restrict ${chat.pembatasan ? '*( ON )*' : '*( OFF )*'}
⩽⩾ game ${chat.game ? '*( ON )*' : '*( OFF )*'}
⩽⩾ rpg ${chat.rpg ? '*( ON )*' : '*( OFF )*'}
⩽⩾ nsfw ${chat.nsfw ? '*( ON )*' : '*( OFF )*'}
⩽⩾ welcome ${chat.welcome ? '*( ON )*' : '*( OFF )*'}
⩽⩾ autolevelup ${chat.autolevelup ? '*( ON )*' : '*( OFF )*'}

_*❏ OWNER COMMAND*_

⩽⩾ autobio ${chat.autobio ? '*( ON )*' : '*( OFF )*'}
⩽⩾ simivoice  ${bot.simivoice  ? '*( ON )*' : '*( OFF )*'}
⩽⩾ autobackup ${bot.backup ? '*( ON )*' : '*( OFF )*'}
⩽⩾ autocleartmp ${bot.cleartmp ? '*( ON )*' : '*( OFF )*'}
⩽⩾ autoread ${bot.autoread ? '*( ON )*' : '*( OFF )*'}
⩽⩾ composing ${bot.composing ? '*( ON )*' : '*( OFF )*'}
⩽⩾ gconly ${opts.gconly ? '*( ON )*' : '*( OFF )*'}
⩽⩾ pconly ${opts.pconly ? '*( ON )*' : '*( OFF )*'}
⩽⩾ self ${opts.self ? '*( ON )*' : '*( OFF )*'}
⩽⩾ public ${!opts.self ? '*( ON )*' : '*( OFF )*'}
⩽⩾ swonly ${opts.swonly ? '*( ON )*' : '*( OFF )*'}
⩽⩾ anticall ${bot.anticall ? '*( ON )*' : '*( OFF )*'}
`.trim()
    switch (type) {
        case 'welcome':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.welcome = isEnable
            break
        case 'autolevelup':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.autolevelup = isEnable
            break
        case 'adminonly':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.adminonly = isEnable
            break
case 'antifile':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiFile = isEnable
      break           
case 'antifoto':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiFoto = isEnable
      break
            case 'antifoto':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiFoto = isEnable
      break
         case 'simivoice':
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
      chat.simivoice = isEnable
      break  
      case 'acc':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.acc = isEnable
      break            
      case 'antibot':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot = isEnable
      break
      case 'autobio':
  isAll = true
  if (!isROwner) {
  global.dfail('rowner', m, conn)
  throw false
  }
  bot.autoBio = isEnable
  break	
  case 'autodownload':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    return false
                }
                chat.autodownload = isEnable
            } else {
                if (!isPrems) {
                    global.dfail('premium', m, conn)
                    return false
                }
                user.autodownload = isEnable
            }
            break 
        case 'detect':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.detect = isEnable
            break
        case 'delete':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.delete = isEnable
            break
        case 'antiviewonce':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.viewonce = isEnable
            break
        case 'antidelete':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.delete = !isEnable
            break
        case 'antispamlink':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antispam = isEnable
            break
        case 'text':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.teks = isEnable
            break
        case 'public':
            isAll = true
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            global.opts['self'] = !isEnable
            break
        case 'antilink':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiLink = isEnable
            break
        case 'antilinkwa':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiLinkWa = isEnable
            break
        case 'nsfw':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.nsfw = isEnable
            break
        case 'rpg':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.rpg = isEnable
            break
            case 'antivideo':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiVideo = isEnable
      break
        case 'antivirtex':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiVirtex = isEnable
            break
        case 'simi':
            if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
            }
            chat.simi = isEnable
            break
        case 'composing':
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            bot.composing = isEnable
            break
        case 'antisticker':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiSticker = isEnable
            break
        case 'antibadword':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiBadword = isEnable
            break
        case 'antitoxic':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiToxic = isEnable
            break
        case 'restrict':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.pembatasan = isEnable
            break
        case 'game':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.game = isEnable
            break
        case 'anticall':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            bot.anticall = isEnable
            break
        case 'whitelistmycontacts':
            if (!isOwner) {
                global.dfail('owner', m, conn)
                throw false
            }
            conn.callWhitelistMode = isEnable
            break
        case 'autobackup':
            isAll = true
            if (!isOwner) {
                global.dfail('owner', m, conn)
                throw false
            }
            bot.backup = isEnable
            break
        case 'autocleartmp':
            isAll = true
            if (!isOwner) {
                global.dfail('owner', m, conn)
                throw false
            }
            bot.cleartmp = isEnable
            break
        case 'autoread':
            isAll = true
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            bot.autoread = isEnable
            break
        case 'pconly':
            isAll = true
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            global.opts['pconly'] = isEnable
            break
        case 'gconly':
        case 'pconlyprem':
            isAll = true
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            global.opts['gconly'] = isEnable
            break
        case 'swonly':
            isAll = true
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            global.opts['swonly'] = isEnable
            break
        default:
            return conn.adReply(m.chat, caption, wish() + ' ' + name, '', fs.readFileSync('./media/thumbnail.jpg'), '', m)
    }
    await m.reply(`${type} berhasil ${isEnable ? 'dinyalakan': 'dimatikan'} untuk ${isAll ? 'bot ini': 'chat ini'} !`)
}
handler.help = ['enable <command>']
handler.tags = ['group', 'adminry']
handler.command = /^((en|dis)able|setting|settings|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler

function wish() {
    let wishloc = ''
    const time = moment.tz('Asia/Jakarta').format('HH')
    wishloc = ('Hi')
    if (time >= 0) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 4) {
        wishloc = ('Selamat Pagi')
    }
    if (time >= 11) {
        wishloc = ('Selamat Siang')
    }
    if (time >= 15) {
        wishloc = ('️Selamat Sore')
    }
    if (time >= 18) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 23) {
        wishloc = ('Selamat Malam')
    }
    return wishloc
}