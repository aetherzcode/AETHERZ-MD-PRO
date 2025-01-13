import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import Connection from "./lib/connection.js";
const printMessage = (await import('./lib/print.js')).default

const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || []
    if (!chatUpdate)
        return
    this.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m)
        return
    if (global.db.data == null)
        await global.loadDatabase()
    try {
        m = smsg(this, m) || m
        if (!m)
            return
        m.exp = 0
        m.limit = false
        try {
        
            let user = global.db.data.users[m.sender]
            if (typeof user !== 'object')
                global.db.data.users[m.sender] = {}
            if (user) {
                if (!isNumber(user.money))
                    user.money = 0
                if (!isNumber(user.btc))
                    user.btc = 0    
                if (!isNumber(user.exp))
                    user.exp = 0
                if (!isNumber(user.limit))
                    user.limit = 10
                if (!isNumber(user.freelimit))
                    user.freelimit = 0
                if (!isNumber(user.lastclaim))
                    user.lastclaim = 0
                if (!isNumber(user.skata))
                    user.skata = 0
                if (!isNumber(user.joinlimit))
                    user.joinlimit = 1
                if (!isNumber(user.pc))
                    user.pc = 0
                if (!isNumber(user.ojekk))
                    user.ojekk = 0
                if (!('registered' in user))
                    user.registered = false
                if (!user.registered) {
                    if (!('name' in user))
                        user.name = m.name
                    if (!isNumber(user.age))
                        user.age = -1
                    if (!isNumber(user.regTime))
                        user.regTime = -1
                }
                if (!isNumber(user.afk))
                    user.afk = -1
                if (!isNumber(user.listafk))
                    user.listafk = -1
                if (!('unreg' in user))
                    user.unreg = false
                if (!('afkReason' in user))
                    user.afkReason = ''
                if (!('banned' in user))
                    user.banned = false
                if (!('lastBanned' in user))
                    user.lastBanned = 0
                if (!'BannedReason' in user)
                    user.BannedReason = ''
                if (!'WarnReason' in user)
                    user.WarnReason = ''
                if (!isNumber(user.warn))
                    user.warn = 0
                if (!isNumber(user.level))
                    user.level = 0
                if (!('role' in user))
                    user.role = 'Beginner'
                if (!("skill" in user)) user.skill = ""    
                if (!("pasangan" in user)) user.pasangan = ""     
                if (!("catatan" in user)) user.catatan = ""
                if (!("ultah" in user)) user.ultah = ""
                        
                if (!isNumber(user.chip))
                    user.chip = 0
                if (!isNumber(user.atm))
                    user.atm = 0
                if (!isNumber(user.fullatm))
                    user.fullatm = 0
                if (!isNumber(user.bank))
                    user.bank = 0
                if (!isNumber(user.health))
                    user.health = 100
                if (!isNumber(user.potion))
                    user.potion = 0
                if (!isNumber(user.trash))
                    user.trash = 0
                if (!isNumber(user.wood))
                    user.wood = 0
                if (!isNumber(user.rock))
                    user.rock = 0
                if (!isNumber(user.string))
                    user.string = 0
                if (!isNumber(user.petfood))
                    user.petfood = 0
// fight   
                if (!isNumber(user.koin)) user.koin = 0
                if (!isNumber(user.kyubi)) user.kyubi = 0
                if (!isNumber(user.anakkyubi)) user.anakkyubi = 0
                if (!isNumber(user.kyubi)) user.kyubi = 0
                if (!isNumber(user.kyubiexp)) user.kyubiexp = 0
                if (!isNumber(user.kyubilastclaim)) user.kyubilastclaim = 0
                if (!isNumber(user.kyubilastfeed)) user.kyubilastfeed = 0
                if (!isNumber(user.makanankyubi)) user.makanankyubi = 0
                if (!isNumber(user.ramuankyubilast)) user.ramuankyubilast = 0;
                if (!isNumber(user.anakcentaur)) user.anakcentaur = 0
                if (!isNumber(user.centaur)) user.centaur = 0
                if (!isNumber(user.makanancentaur)) user.makanancentaur = 0;
                if (!isNumber(user.anakgriffin)) user.anakgriffin = 0
                if (!isNumber(user.griffin)) user.griffin = 0
                if (!isNumber(user.griffinexp)) user.griffinexp = 0
                if (!isNumber(user.griffinlastclaim)) user.griffinlastclaim = 0
                if (!isNumber(user.griffinlastfeed)) user.griffinlastfeed = 0
                if (!isNumber(user.makanangriffin)) user.makanangriffin = 0
                if (!isNumber(user.ramuangriffinlast)) user.ramuangriffinlast = 0
                if (!isNumber(user.anakkucing)) user.anakkucing = 0
                if (!isNumber(user.kucing)) user.kucing = 0
                if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0
                if (!isNumber(user.ramuankucinglast)) user.ramuankucinglast = 0
                if (!isNumber(user.anakphonix)) user.anakphonix = 0
                if (!isNumber(user.makananphonix)) user.makananphonix = 0
                if (!isNumber(user.phonix)) user.phonix = 0
                if (!isNumber(user.phonixexp)) user.phonixexp = 0
                if (!isNumber(user.phonixlastclaim)) user.phonixlastclaim = 0
                if (!isNumber(user.phonixlastfeed)) user.phonixlastfeed = 0
                if (!isNumber(user.ramuanphonixlast)) user.ramuanphonixlast = 0
                if (!isNumber(user.ramuannagalast)) user.ramuannagalast = 0
                if (!isNumber(user.nagalastclaim)) user.nagalastclaim = 0
                if (!isNumber(user.makanannaga)) user.makanannaga = 0
                if (!isNumber(user.anaknaga)) user.anaknaga = 0
                if (!isNumber(user.naga)) user.naga = 0
// batas 

                if (!isNumber(user.emerald))
                    user.emerald = 0
                if (!isNumber(user.diamond))
                    user.diamond = 0
                if (!isNumber(user.gold))
                    user.gold = 0
                if (!isNumber(user.botol))
                    user.botol = 0
                if (!isNumber(user.kardus))
                    user.kardus = 0
                if (!isNumber(user.kaleng))
                    user.kaleng = 0
                if (!isNumber(user.gelas))
                    user.gelas = 0
                if (!isNumber(user.plastik))
                    user.plastik = 0
                if (!isNumber(user.iron))
                    user.iron = 0
                if (!isNumber(user.skillexp)) user.skillexp = 0
                if (!isNumber(user.common))
                    user.common = 0
                if (!isNumber(user.uncommon))
                    user.uncommon = 0
                if (!isNumber(user.mythic))
                    user.mythic = 0
                if (!isNumber(user.legendary))
                    user.legendary = 0
                if (!isNumber(user.umpan))
                    user.umpan = 0
                if (!isNumber(user.pet))
                    user.pet = 0

                if (!isNumber(user.paus))
                    user.paus = 0
                if (!isNumber(user.kepiting))
                    user.kepiting = 0
                if (!isNumber(user.gurita))
                    user.gurita = 0
                if (!isNumber(user.cumi))
                    user.cumi = 0
                if (!isNumber(user.buntal))
                    user.buntal = 0
                if (!isNumber(user.dory))
                    user.dory = 0
                if (!isNumber(user.lumba))
                    user.lumba = 0
                if (!isNumber(user.lobster))
                    user.lobster = 0
                if (!isNumber(user.hiu))
                    user.hiu = 0
                if (!isNumber(user.udang))
                    user.udang = 0
                if (!isNumber(user.orca))
                    user.orca = 0

                if (!isNumber(user.banteng))
                    user.banteng = 0
                if (!isNumber(user.gajah))
                    user.gajah = 0
                if (!isNumber(user.harimau))
                    user.harimau = 0
                if (!isNumber(user.kambing))
                    user.kambing = 0
                if (!isNumber(user.panda))
                    user.panda = 0
                if (!isNumber(user.buaya))
                    user.buaya = 0
                if (!isNumber(user.kerbau))
                    user.kerbau = 0
                if (!isNumber(user.sapi))
                    user.sapi = 0
                if (!isNumber(user.monyet))
                    user.monyet = 0
                if (!isNumber(user.babihutan))
                    user.babihutan = 0
                if (!isNumber(user.babi))
                    user.babi = 0
                if (!isNumber(user.ayam))
                    user.ayam = 0

                if (!isNumber(user.lastadventure))
                    user.lastadventure = 0
                if (!isNumber(user.lastkill))
                    user.lastkill = 0
                if (!isNumber(user.lastmisi))
                    user.lastmisi = 0
                if (!isNumber(user.lastdungeon))
                    user.lastdungeon = 0
                if (!isNumber(user.lastwar))
                    user.lastwar = 0
                if (!isNumber(user.lastsda))
                    user.lastsda = 0
                if (!isNumber(user.lastduel))
                    user.lastduel = 0
                if (!isNumber(user.lastmining))
                    user.lastmining = 0
                if (!isNumber(user.lasthunt))
                    user.lasthunt = 0
                if (!isNumber(user.lastgift))
                    user.lastgift = 0
                if (!isNumber(user.lastberkebon))
                    user.lastberkebon = 0
                if (!isNumber(user.lastdagang))
                    user.lastdagang = 0
                if (!isNumber(user.lasthourly))
                    user.lasthourly = 0
                if (!isNumber(user.lastbansos))
                    user.lastbansos = 0
                if (!isNumber(user.lastrampok))
                    user.lastrampok = 0
                if (!isNumber(user.lastclaim))
                    user.lastclaim = 0
                if (!isNumber(user.lastnebang))
                    user.lastnebang = 0
                if (!isNumber(user.lastweekly))
                    user.lastweekly = 0
                if (!isNumber(user.lastmonthly))
                    user.lastmonthly = 0

                if (!isNumber(user.apel))
                    user.apel = 0
                if (!isNumber(user.anggur))
                    user.anggur = 0
                if (!isNumber(user.jeruk))
                    user.jeruk = 0
                if (!isNumber(user.mangga))
                    user.mangga = 0
                if (!isNumber(user.pisang))
                    user.pisang = 0
                if (!isNumber(user.makanan))
                    user.makanan = 0
                if (!isNumber(user.bibitanggur))
                    user.bibitanggur = 0
                if (!isNumber(user.bibitpisang))
                    user.bibitpisang = 0
                if (!isNumber(user.bibitapel))
                    user.bibitapel = 0
                if (!isNumber(user.bibitmangga))
                    user.bibitmangga = 0
                if (!isNumber(user.bibitjeruk))
                    user.bibitjeruk = 0

                if (!isNumber(user.horse))
                    user.horse = 0
                if (!isNumber(user.horseexp))
                    user.horseexp = 0
                if (!isNumber(user.cat))
                    user.cat = 0
                if (!isNumber(user.catexp))
                    user.catexp = 0
                if (!isNumber(user.fox))
                    user.fox = 0
                if (!isNumber(user.foxhexp))
                    user.foxexp = 0
                if (!isNumber(user.dog))
                    user.foxexp = 0
                if (!isNumber(user.dogexp))
                    user.dogexp = 0
                if (!isNumber(user.robo))
                    user.robo = 0
                if (!isNumber(user.roboexp))
                    user.roboexp = 0

                if (!isNumber(user.horselastfeed))
                    user.horselastfeed = 0
                if (!isNumber(user.catlastfeed))
                    user.catlastfeed = 0
                if (!isNumber(user.robolastfeed))
                    user.robolastfeed = 0
                if (!isNumber(user.foxlastfeed))
                    user.foxlastfeed = 0
                if (!isNumber(user.doglastfeed))
                    user.doglastfeed = 0

                if (!isNumber(user.robo))
                    user.robo = 0
                if (!isNumber(user.robodurability))
                    user.robodurability = 0
                if (!isNumber(user.armor))
                    user.armor = 0
                if (!isNumber(user.armordurability))
                    user.armordurability = 0
                if (!isNumber(user.sword))
                    user.sword = 0
                if (!isNumber(user.sworddurability))
                    user.sworddurability = 0
                if (!isNumber(user.pickaxe))
                    user.pickaxe = 0
                if (!isNumber(user.pickaxedurability))
                    user.pickaxedurability = 0
                if (!isNumber(user.fishingrod))
                    user.fishingrod = 0
                if (!isNumber(user.fishingroddurability))
                    user.fishingroddurability = 0

                if (!isNumber(user.premium))
                    user.premium = false
                if (!isNumber(user.premiumTime))
                    user.premiumTime = 0
                 if (!isNumber(user.vipDate)) user.vipDate = 0
                if (!isNumber(user.joinlimit))
                    user.joinlimit = 0
            } else
                global.db.data.users[m.sender] = {
                btc: 0,
                money: 0,
                exp: 0,
                limit: 20,
                freelimit: 0,
                lastclaim: 0,
                skata: 0,
                registered: false,
                name: m.name,
                pc: 0,
                joinlimit: 1,
                age: -1,
                regTime: -1,
                unreg: false,
                afk: -1,
                listafk: -1,
                afkReason: '',
                banned: false,
                warning: 0,
                warn: 0,
                level: 0,
                rokets: 0,
                role: 'Beginner',
                makanan: 0,
                ojekk: 0,
                BannedReason: '',
                WarnReason: '',
                anakkucing: 0,
                kucing: 0,                
                kucinglastclaim: 0,
                ramuankucinglast: 0,
                anakgriffin: 0,
                griffin: 0,
                griffinexp: 0,
                griffinlastclaim: 0,
                griffinlastfeed: 0,
                makanangriffin: 0,
                ramuangriffinlast: 0,
                anaknaga: 0,
                makanannaga: 0,
                naga: 0,
                nagalastclaim: 0,
                ramuannagalast: 0,
                anakphonix: 0,
                makananphonix: 0,
                phonix: 0,
                phonixexp: 0,        
                phonixlastclaim: 0,
                phonixlastfeed: 0,
                ramuanphonixlast: 0,
                anakkyubi: 0,
                kyubi: 0,                
                kyubilastclaim: 0,
                makanankyubi: 0,
                ramuankyubilast: 0,
                chip: 0,
                bank: 0,
                atm: 0,
                fullatm: 0,
                health: 100,
                potion: 10,
                trash: 0,
                wood: 0,
                rock: 0,
                string: 0,
                emerald: 0,
                diamond: 0,
                gold: 0,
                iron: 0,
                common: 0,
                uncommon: 0,
                mythic: 0,
                legendary: 0,
                umpan: 0,
                pet: 0,
                horse: 0,
                horseexp: 0,
                horselastfeed: 0,
                cat: 0,
                catexp: 0,
                catlastfeed: 0,
                fox: 0,
                foxexp: 0,
                foxlastfeed: 0,
                robo: 0,
                roboexp: 0,
                robolastfeed: 0,
                dog: 0,
                dogexp: 0,
                doglastfeed: 0,

                koin: 0,
                paus: 0,
                kepiting: 0,
                gurita: 0,
                cumi: 0,
                buntal: 0,
                dory: 0,
                lumba: 0,
                lobster: 0,
                hiu: 0,
                udang: 0,
                ikan: 0,
                orca: 0,
                banteng: 0,
                harimau: 0,
                gajah: 0,
                kambing: 0,
                buaya: 0,
                kerbau: 0,
                sapi: 0,
                monyet: 0,
                babi: 0,
                ayam: 0,

                armor: 0,
                armordurability: 0,
                sword: 0,
                sworddurability: 0,
                pickaxe: 0,
                pickaxedurability: 0,
                fishingrod: 0,
                fishingroddurability: 0,
                robo: 0,
                robodurability: 0,
                apel: 20,
                pisang: 0,
                anggur: 0,
                mangga: 0,
                jeruk: 0,

                lastadventure: 0,
                lastkill: 0,
                lastmisi: 0,
                lastdungeon: 0,
                lastwar: 0,
                lastsda: 0,
                lastduel: 0,
                lastmining: 0,
                lasthunt: 0,
                lastgift: 0,
                lastberkebon: 0,
                lastdagang: 0,
                lasthourly: 0,
                lastbansos: 0,
                lastrampok: 0,
                lastclaim: 0,
                lastnebang: 0,
                lastweekly: 0,
                lastmonthly: 0,

                premium: false,
                premiumTime: 0,
            }
            let chat = global.db.data.chats[m.chat]
            if (typeof chat !== 'object')
                global.db.data.chats[m.chat] = {}
            if (chat) {
                if (!('isBanned' in chat))
                    chat.isBanned = false
                if (!('welcome' in chat))
                    chat.welcome = false
                if (!('detect' in chat))
                    chat.detect = false
                if (!('sWelcome' in chat))
                    chat.sWelcome = ''
                if (!('sBye' in chat))
                    chat.sBye = ''
                if (!('sPromote' in chat))
                    chat.sPromote = ''
                if (!('sDemote' in chat))
                    chat.sDemote = ''
                if (!('listStr' in chat))
                    chat.listStr = {}
                if (!('delete' in chat))
                    chat.delete = false
                if (!('antiLink' in chat))
                    chat.antiLink = false
                if (!('pembatasan' in chat))
                    chat.pembatasan = false
                if (!('antiSticker' in chat))
                    chat.antiSticker = false
                if (!('antiLinkWa' in chat))
                    chat.antiLinkWa = false
                if (!('vip' in user)) user.vip = false
                if (!('viewonce' in chat))
                    chat.viewonce = false
                if (!('antiVirtex' in chat))
                    chat.antiVirtex = false
                if (!('antiToxic' in chat))
                    chat.antiToxic = false
                if (!('antiBadword' in chat))
                    chat.antiBadword = false
                if (!('simi' in chat))
                    chat.simi = false
                if (!('nsfw' in chat))
                    chat.nsfw = false
                if (!('mute' in chat))
                    chat.mute = false
                if (!('rpg' in chat))
                    chat.rpg = true
                if (!('game' in chat))
                    chat.game = true
                if (!('teks' in chat))
                    chat.teks = false
                if (!('autolevelup' in chat))
                    chat.autolevelup = false
                if (!isNumber(chat.expired))
                    chat.expired = 0
            } else
                global.db.data.chats[m.chat] = {
                isBanned: false,
                welcome: false,
                detect: false,
                sWelcome: '',
                sBye: '',
                sPromote: '',
                sDemote: '',
                catatan: "",
                ultah: "",
                pasangan: "",
                listStr: {},
                delete: true,
                antiLink: false,
                pembatasan: false,
                antiLinkWa: false,
                antiSticker: false,
                viewonce: false,
                antiToxic: false,
                antiVirtex: false,
                antiBadword: false,
                simi: false,
                nsfw: false,
                mute: false,
                rpg: true,
                game: true,
                teks: true,
                autolevelup: false,
                expired: 0,
            }
            let settings = global.db.data.settings[this.user.jid]
            if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
            if (settings) {
                if (!('self' in settings)) settings.self = false
                if (!('autoread' in settings)) settings.autoread = true
                if (!('composing' in settings)) settings.composing = false
                if (!('restrict' in settings)) settings.restrict = true
                if (!('autorestart' in settings)) settings.autorestart = true
                if (!isNumber(settings.restartDB)) settings.restartDB = 0
                if (!('backup' in settings)) settings.backup = false
                if (!isNumber(settings.backupDB)) settings.backupDB = 0
                if (!('cleartmp' in settings)) settings.cleartmp = false
                if (!isNumber(settings.lastcleartmp)) settings.lastcleartmp = 0
                if (!isNumber(settings.status)) settings.status = 0
                if (!('anticall' in settings)) settings.anticall = true
            } else global.db.data.settings[this.user.jid] = {
                self: false,
                autoread: true,
                composing: false,
                restrict: true,
                autorestart: true,
                restartDB: 0,
                backup: false,
                backupDB: 0,
                cleartmp: false,
                lastcleartmp: 0,
                status: 0,
                anticall: true,
            }
        } catch (e) {
            console.error(e)
        }

        if (opts['nyimak'])
            return
        if (!m.fromMe && opts['self'])
            return
        if (opts['pconly'] && m.chat.endsWith('g.us'))
            return
        if (opts['gconly'] && !m.fromMe && !m.chat.endsWith('g.us') && !global.db.data.users[m.sender].premium && !global.db.data.users[m.sender].vip)

return this.sendMessage(m.chat, {
text: '```🚩 Akses Bot Ke Private Chat Di Tolak, Silahkan Upgrade Premium Hanya 5.000 Idr Agar Bisa Bebas Akses Bot Dengan Hubungi Owner :\nwa.me/6285798045817\n\n• Join Ke Group Official Bot Untuk Free Akses & Informasi Kedepannya Tentang Bot : https://chat.whatsapp.com/EfL1tMwaKRjLdkkPYnQcq9```',
contextInfo: {
mentionedJid: [m.sender, owner],
externalAdReply: { showAdAttribution: false, 
title: `Sorry Access Private Chat Denied!!`,
body: wm,
thumbnailUrl: link.web,
mediaType: 1,
renderLargerThumbnail: true 
}}}, { quoted: m})
        if (opts['swonly'] && m.chat !== 'status@broadcast')
            return
        if (typeof m.text !== 'string')
            m.text = ''

        const isROwner = [this.decodeJid(await Connection.conn.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isOwner = isROwner || m.fromMe
        const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isPrems = isROwner || (db.data.users[m.sender].premiumTime > 0 || db.data.users[m.sender].premium)

        if (opts['queque'] && m.text && !(isMods || isPrems)) {
            let queque = this.msgqueque,
            time = 1000 * 5
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id)
            setInterval(async function () {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time)
            }, time)
        }

        if (m.isBaileys)
            return
        m.exp += Math.ceil(Math.random() * 10)

        let usedPrefix
        let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

        const groupMetadata = (m.isGroup ? ((this.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)): {}) || {}
        const participants = (m.isGroup ? groupMetadata.participants: []) || []
        const user = (m.isGroup ? participants.find(u => this.decodeJid(u.id) === m.sender): {}) || {} // User Data
        const bot = (m.isGroup ? participants.find(u => this.decodeJid(u.id) == this.user.jid): {}) || {} // Your Data
        const isRAdmin = user?.admin == 'superadmin' || false
        const isAdmin = isRAdmin || user?.admin == 'admin' || false // Is User Admin?
        const isBotAdmin = bot?.admin || false // Are you Admin?
        const isVip = global.db.data.users[m.sender].vip

        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
        for (let name in global.plugins) {
            let plugin = global.plugins[name]
            if (!plugin)
                continue
            if (plugin.disabled)
                continue
            const __filename = join(___dirname, name)
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename
                    })
                } catch (e) {
                    // if (typeof e === 'string') continue
                    console.error(e)
                    for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                        let data = (await this.onWhatsApp(jid))[0] || {}
                        if (data.exists)
                            m.reply(`*Plugin:* ${name}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${m.text}\n\n\`\`\`${format(e)}\`\`\``.trim(), data.jid)
                    }
                }
            }
            if (!opts['restrict'])
                if (plugin.tags && plugin.tags.includes('admin')) {
                // global.dfail('restrict', m, this)
                continue
            }
            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            let _prefix = plugin.customPrefix ? plugin.customPrefix: this.prefix ? this.prefix: global.prefix
            let match = (_prefix instanceof RegExp ? // RegExp Mode?
                [[_prefix.exec(m.text), _prefix]]:
                Array.isArray(_prefix) ? // Array?
                _prefix.map(p => {
                    let re = p instanceof RegExp ? // RegExp in Array?
                    p:
                    new RegExp(str2Regex(p))
                    return [re.exec(m.text), re]
                }):
                typeof _prefix === 'string' ? // String?
                [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]]:
                [[[], new RegExp]]
            ).find(p => p[1])
            if (typeof plugin.before === 'function') {
                if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }))
                continue
            }
            if (typeof plugin !== 'function')
                continue
            if ((usedPrefix = (match[0] || '')[0])) {
                let noPrefix = m.text.replace(usedPrefix, '')
                let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                args = args || []
                let _args = noPrefix.trim().split` `.slice(1)
                let text = _args.join` `
                command = (command || '').toLowerCase()
                let fail = plugin.fail || global.dfail // When failed
                let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                plugin.command.test(command):
                Array.isArray(plugin.command) ? // Array?
                plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                cmd.test(command) : cmd === command) : typeof plugin.command === 'string' ? // String?
                plugin.command === command : false

                if (!isAccept)
                    continue
                m.plugin = name
                if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                    let chat = global.db.data.chats[m.chat]
                    let user = global.db.data.users[m.sender]
                    if (name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && name != 'mode-bot.js' && chat?.isBanned)
                        return
                    if (name != 'owner-unbanuser.js' && name != 'cek-banned.js' && user?.banned)
                        return
                }
                if (global.db.data.chats[m.chat].mute === true && !isROwner && !isAdmin) return
                if (plugin.rowner && plugin.owner && !(isROwner || isAdmin)){ // Both Owner
                    fail('admin', m, this)
                    continue
                }
                if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) {
                    fail('owner', m, this)
                    continue
                }
                if (plugin.rowner && !isROwner) {
                    fail('rowner', m, this)
                    continue
                }
                if (plugin.owner && !isOwner) {
                    fail('owner', m, this)
                    continue
                }
                if (plugin.mods && !isMods) {
                    fail('mods', m, this)
                    continue
                }
                if (plugin.premium && !isPrems) {
                    fail('premium', m, this)
                    continue
                }
                if (plugin.vip && !isVip) {
                        fail('vip', m, this)
                        continue
                }
                if (plugin.group && !m.isGroup) {
                    fail('group', m, this)
                    continue
                } else if (plugin.botAdmin && !isBotAdmin) {
                    fail('botAdmin', m, this)
                    continue
                } else if (plugin.admin && !isAdmin) {
                    fail('admin', m, this)
                    continue
                }
                if (plugin.private && m.isGroup) {
                    fail('private', m, this)
                    continue
                }
                if (plugin.register && !_user.registered) {
                    fail('unreg', m, this)
                    continue
                }
                if (plugin.onlyprem && !m.isGroup && !isPrems) {
                    fail('onlyprem', m, this)
                    continue
                }
                if (plugin.rpg && m.isGroup && !global.db.data.chats[m.chat].rpg) {
                    fail('rpg', m, this)
                    continue
                }
                if (plugin.game && m.isGroup && !global.db.data.chats[m.chat].game) {
                    fail('game', m, this)
                    continue
                }
                if (plugin.nsfw && m.isGroup && !global.db.data.chats[m.chat].nsfw) {
                    fail('nsfw', m, this)
                    continue
                }
                m.isCommand = true
                let xp = 'exp' in plugin ? parseInt(plugin.exp): 17 // XP Earning per command
                if (xp > 200)
                    m.reply('Ngecit -_-') // Hehehe
                else
                    m.exp += xp
                if (plugin.limit && !isPrems && _user.limit < plugin.limit * 1) {
                	fail('limitExp', m, this)
                    continue
                }
                if (plugin.level > _user.level) {
                	this.reply(m.chat, `[💬] Mohon maaf level yang di perlukan untuk menggunakan fitur ini ${plugin.level}\n*Level mu:* ${_user.level} 📊`, m, {
                        contextInfo: {
                            externalAdReply: {
                            title: '✘ AKSES DITOLAK', body: wm, sourceUrl: link.web, thumbnail: fs.readFileSync('./media/denied.jpg')
                            }
                        }
                	})
                    continue
                }
                if (plugin.age > _user.age) {
                	this.reply(m.chat, `[💬] Umurmu harus diatas ${plugin.age} Tahun untuk menggunakan fitur ini...`, m, {
                        contextInfo: {
                            externalAdReply: {
                            title: '✘ AKSES DITOLAK', body: wm, sourceUrl: link.web, thumbnail: fs.readFileSync('./media/denied.jpg')
                            }
                        }
                    })	
                    continue
                }
                let extra = {
                    match,
                    usedPrefix,
                    noPrefix,
                    _args,
                    args,
                    command,
                    text,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }
                try {
                    await plugin.call(this, m, extra)
                    if (!isPrems)
                        m.limit = m.limit || plugin.limit || false
                } catch (e) {
                    // Error occured
                    m.error = e
                    console.error(e)
                    if (e) {
                        let text = format(e)
                        for (let key of Object.values(global.APIKeys))
                            text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                        if (e.name)
                            for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                            let data = (await this.onWhatsApp(jid))[0] || {}
                            if (data.exists)
                                m.reply(`*🗂️ Plugin:* ${m.plugin}\n*👤 Sender:* ${m.sender}\n*💬 Chat:* ${m.chat}\n*💻 Command:* ${usedPrefix}${command} ${args.join(' ')}\n📄 *Error Logs:*\n\n\`\`\`${text}\`\`\``.trim(), data.jid)
                        }
                        m.reply(text)
                    }
                } finally {
                    // m.reply(util.format(_user))
                    if (typeof plugin.after === 'function') {
                        try {
                            await plugin.after.call(this, m, extra)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                    /*if (m.limit)
                       await m.reply('Kamu menggunakan fitur limit\n╰► - 1 Limit')*/// lain kali jangan lupa tanda kurung nya ya! ... fixed by Fokusdotid (Fokus ID)
                }
                break
            }
        }
    } catch (e) {
        console.error(e)
    } finally {
        if (opts['queque'] && m.text) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (quequeIndex !== -1)
                this.msgqueque.splice(quequeIndex, 1)
        }
        //console.log(global.db.data.users[m.sender])
        let user,
        stats = global.db.data.stats
        if (m) {
            if (m.sender && (user = global.db.data.users[m.sender])) {
                user.exp += m.exp
                user.limit -= m.limit * 1
            }

            let stat
            if (m.plugin) {
                let now = +new Date
                if (m.plugin in stats) {
                    stat = stats[m.plugin]
                    if (!isNumber(stat.total))
                        stat.total = 1
                    if (!isNumber(stat.success))
                        stat.success = m.error != null ? 0: 1
                    if (!isNumber(stat.last))
                        stat.last = now
                    if (!isNumber(stat.lastSuccess))
                        stat.lastSuccess = m.error != null ? 0: now
                } else
                    stat = stats[m.plugin] = {
                    total: 1,
                    success: m.error != null ? 0: 1,
                    last: now,
                    lastSuccess: m.error != null ? 0: now
                }
                stat.total += 1
                stat.last = now
                if (m.error == null) {
                    stat.success += 1
                    stat.lastSuccess = now
                }
            }
        }

        try {
            if (!opts['noprint']) await printMessage(m, this)
        } catch (e) {
            console.log(m, m.quoted, e)
        };
        /*
        if (global.db.data.settings[this.user.jid].autoread)
            await this.readMessages([m.key]).catch(() => {})

        if (global.db.data.settings[this.user.jid].composing)
            await this.sendPresenceUpdate('composing', m.chat).catch(() => {})
        */
    }
}

/**
* Handle groups participants update
* @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate
*/
export async function participantsUpdate( { id, participants, action }) {
    if (opts['self'])
        return
    if (this.isInit)
        return
    let chat = global.db.data.chats[id] || {}
    let text = ''
    switch (action) {
        case 'add':
                     case 'remove': 
                   if (chat.welcome) {
                let groupMetadata = await this.groupMetadata(id) || (this.chats[id] || {}).metadata
                for (let user of participants) {
                    let pp = 'https://telegra.ph/file/3067b920347facbb69bb1.jpg'
                    try {
                        pp = await this.profilePictureUrl(user, 'image')
                    } catch (e) {
                    } finally {
                        text = (action === 'add' ? (chat.sWelcome || this.welcome || await Connection.conn.welcome || 'Selamat Datang, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || 'unknow') :
                            (chat.sBye || this.bye || await Connection.conn.bye || 'Selamat tinggal, @user!')).replace('@user', `${this.getName(user)}`)
                            let skyin = {
text: text,
contextInfo: {
externalAdReply: {
title: global.wm,
body: "Group Notifications",
thumbnailUrl: global.aetherzjpg,
sourceUrl: link.web,
mediaType: 1,
renderLargerThumbnail: true
}}}
                        this.sendMessage(id, skyin, { mentions: [user] })
                        }
                 } 
             } 
            break
            case 'promote':
                text = (chat.sPromote || this.spromote || await Connection.conn.spromote || '@user ```is now Admin```')
                case 'demote':
                    if (!text)
                        text = (chat.sDemote || this.sdemote || await Connection.conn.sdemote || '@user ```is no longer Admin```')
                    text = text.replace('@user', '@' + participants[0].split('@')[0])
                    if (chat.detect)
                        this.sendMessage(id, {
                        text, mentions: this.parseMention(text)
                        })
                    break
        }
}
/**
* Handle groups update
* @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate
*/
export async function groupsUpdate(groupsUpdate) {
    if (opts['self'])
        return
     for (const groupUpdate of groupsUpdate) {
        const id = groupUpdate.id
        if (!id) continue
        let chats = global.db.data.chats[id],
        text = ''
        if (!chats?.detect) continue
        if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || await Connection.conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
        if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || await Connection.conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
        if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || await Connection.conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
        if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || await Connection.conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
        if (!text) continue
        await this.sendMessage(id, { text, mentions: this.parseMention(text) })
    }
}

export async function deleteUpdate(message) {
    try {
        const { fromMe, id, participant } = message
        if (fromMe)
            return
        let msg = this.serializeM(this.loadMessage(id))
        if (!msg)
            return
        let chat = global.db.data.chats[msg.chat] || {}
        if (chat.delete)
            return
        await this.reply(msg.chat, `
⧻Terdeteksi @${participant.split`@`[0]} telah menghapus pesan
Untuk mematikan fitur ini, ketik
*.enable delete*
`.trim(), msg, { mentions: [participant] })
        this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
    } catch (e) {
        console.error(e)
    }
}

global.dfail = (type, m, conn) => {
    let msg = {
        rowner: '*ᴏᴡɴᴇʀ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ ʙᴏᴛ !!',
        owner: '*ᴏᴡɴᴇʀ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ ʙᴏᴛ !!',
        mods: '*ᴏᴡɴᴇʀ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ ʙᴏᴛ !!',
        premium: '*ᴘʀᴇᴍɪᴜᴍ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴍᴇᴍʙᴇʀ ᴘʀᴇᴍɪᴜᴍ !!',
        group: '*ɢʀᴏᴜᴘ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴅᴀᴘᴀᴛ ᴅɪɢᴜɴᴀᴋᴀɴ ᴅɪ ɢʀᴏᴜᴘ !!',
         vip: '🔒 *ᴘᴇʀɪɴᴛᴀʜ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴍᴇᴍʙᴇʀ ᴠɪᴘ*.',
        private: '*ᴘʀɪᴠᴀᴛᴇ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴅᴀᴘᴀᴛ ᴅɪɢᴜɴᴀᴋᴀɴ ᴅɪ ᴄʜᴀᴛ ᴘʀɪʙᴀᴅɪ !!',
        admin: '*ᴀᴅᴍɪɴ ᴏɴʟʏ •* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ !!',
        botAdmin: 'ᴊᴀᴅɪᴋᴀɴ ʙᴏᴛ ꜱᴇʙᴀɢᴀɪ ᴀᴅᴍɪɴ ᴜɴᴛᴜᴋ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ',
        onlyprem: 'ʜᴀɴʏᴀ ᴜꜱᴇʀ *ᴘʀᴇᴍɪᴜᴍ* ʏᴀɴɢ ᴅᴀᴘᴀᴛ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ꜰɪᴛᴜʀ ɪɴɪ ᴅɪ *ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ* !!',
        nsfw: 'ᴀᴅᴍɪɴ ᴍᴇɴᴏɴᴀᴋᴛɪғᴋᴀɴ ғɪᴛᴜʀ *ɴsғᴡ* ᴅɪ ɢʀᴏᴜᴘ ɪɴɪ!',
        rpg: 'ᴀᴅᴍɪɴ ᴍᴇɴᴏɴᴀᴋᴛɪғᴋᴀɴ ғɪᴛᴜʀ *ʀᴘɢ ɢᴀᴍᴇ* ᴅɪ ɢʀᴏᴜᴘ ɪɴɪ!',
        game: 'ᴀᴅᴍɪɴ ᴍᴇɴᴏɴᴀᴋᴛɪғᴋᴀɴ ғɪᴛᴜʀ *ɢᴀᴍᴇ* ᴅɪ ɢʀᴏᴜᴘ ɪɴɪ!',
        limitExp: 'ʟɪᴍɪᴛ ᴋᴀᴍᴜ ʜᴀʙɪs! ʙᴇʙᴇʀᴀᴘᴀ ᴄᴏᴍᴍᴀɴᴅ ᴛɪᴅᴀᴋ ᴅᴀᴘᴀᴛ ᴅɪ ᴀᴋsᴇs!',
        restrict: 'ꜰɪᴛᴜʀ ɪɴɪ ᴛɪᴅᴀᴋ ᴅᴀᴘᴀᴛ ᴅɪɢᴜɴᴀᴋᴀɴ !!',
        unreg: 'ꜱɪʟᴀᴋᴀɴ ᴅᴀꜰᴛᴀʀ ᴋᴇ ᴅᴀᴛᴀʙᴀꜱᴇ ʙᴏᴛ ᴛᴇʀʟᴇʙɪʜ ᴅᴀʜᴜʟᴜ, ᴊɪᴋᴀ ɪɴɢɪɴ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ʙᴏᴛ, ᴘɪʟɪʜ ꜱᴀʟᴀʜ ꜱᴀᴛᴜ ᴍᴇᴛᴏᴅᴇ ᴅɪʙᴀᴡᴀʜ ᴜɴᴛᴜᴋ ᴍᴇɴᴅᴀꜰᴛᴀʀ.\n\n╭────◉\n│ *ᴋᴏᴅᴇ ᴏᴛᴘ:* .ᴏᴛᴘ\n│ *ᴍᴀɴᴜᴀʟ*: .ᴅᴀꜰᴛᴀʀ ɴᴀᴍᴀ.ᴜᴍᴜʀ\n╰────◉'
    }[type]

    if (msg) return conn.reply(m.chat, msg, m, {
        contextInfo: {
            externalAdReply: {
                title: 'U P S!!! D I T O L A K!!', body: wm, sourceUrl: link.web, thumbnail: fs.readFileSync('./media/denied.jpg')
            }
        }
    })
}

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'handler.js'"))
if (Connection.reload) console.log(await Connection.reload(await Connection.conn));
})
function ucapan() {
const time = moment.tz('Asia/Jakarta').format('HH')
let res = "Sudah Dini Hari Kok Belum Tidur Kak? ??"
if (time >= 4) {
res = "Selamat Pagi"
}
if (time >= 10) {
res = "Selamat Siang"
}
if (time >= 15) {
res = "Selamat Sore"
}
if (time >= 18) {
res = "Selamat Malam"
}
return res
}