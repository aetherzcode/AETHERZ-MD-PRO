/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/

import { canLevelUp, xpRange } from '../lib/levelling.js';
import canvafy from 'canvafy';

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender);
    let user = global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(user.level, multiplier); // multiplier tidak perlu global.

    let maxLevel = 1000; // Tentukan level maksimum

    // Ambil URL gambar profil pengguna
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg');

    if (!canLevelUp(user.level, user.exp, multiplier)) {
        let text = `
▢ Nama : *${name}*
▢ Level : *${user.level}/${user.level >= maxLevel ? maxLevel : user.level}*
▢ EXP : *${user.exp}*/*${xp}*
▢ Peran : *${user.role}*

Halo, ${name}! Kamu belum siap untuk naik level. Sepertinya kamu perlu mengumpulkan *${max - user.exp}* XP lagi untuk naik level dan mencapai prestasi baru! Terus semangat, dan bot akan memberikan pujian kepadamu segera! 🚀
`.trim();

        const image = await new canvafy.WelcomeLeave()
            .setAvatar(pp) // Menggunakan gambar profil pengguna
            .setBackground("image", "https://www.bhmpics.com/downloads/blue-sky-anime-Wallpapers/4.12cfdcbb2320824919f1f1b119591d39.jpg")
            .setTitle('Level Up Status')
            .setDescription(`Kamu perlu mengumpulkan ${max - user.exp} XP lagi untuk naik level!`)
            .setBorder("#000000")
            .setAvatarBorder("#F0F8FF")
            .setOverlayOpacity(0.5)
            .build();

        await conn.sendMessage(m.chat, { image: image, caption: text });
    } else {
        let beforeLevel = user.level * 1;
        while (canLevelUp(user.level, user.exp, multiplier)) {
            user.level++;
        }

        if (beforeLevel !== user.level) {
            let str = `
┌───⊷ *LEVEL*
▢ Nama : *${name}*
▢ Level : *${beforeLevel}/${user.level >= maxLevel ? maxLevel : user.level}*
▢ XP : *${user.exp}*/*${xp}*
▢ Peran : *${user.role}*
└──────────────

Halo, ${name}! Selamat! Kamu naik level! 🎉
`.trim();

            const image = await new canvafy.WelcomeLeave()
                .setAvatar(pp) // Menggunakan gambar profil pengguna
                .setBackground("image", "https://www.bhmpics.com/downloads/blue-sky-anime-Wallpapers/4.12cfdcbb2320824919f1f1b119591d39.jpg")
                .setTitle('Level Up!')
                .setDescription(`Selamat! Kamu naik level!`)
                .setBorder("#000000")
                .setAvatarBorder("#F0F8FF")
                .setOverlayOpacity(0.5)
                .build();

            await conn.sendMessage(m.chat, { image: image, caption: str });
        }
    }
}

handler.help = ['levelup'];
handler.tags = ['xp'];
handler.command = /^level(|up)$/i;

export default handler;