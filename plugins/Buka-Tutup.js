/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/

export async function before(m) {
    this.autosholat = this.autosholat ? this.autosholat : {};
    let id = m.chat;

    let groupSchedules = {
        "120363377709205706@g.us": { 
            Tutup: "23:00",
            Buka: "05:00",
        },
        "120363374370080774@g.us": { 
            Tutup: "22:00",
            Buka: "06:00",
        },
    };

    const date = new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    for (const [groupId, schedule] of Object.entries(groupSchedules)) {
        if (id === groupId) {
            if (timeNow === schedule.Buka && !(id in this.autosholat)) {
                await this.groupSettingUpdate(id, 'not_announcement');
                this.reply(id, '🎉 Grup sudah dibuka! Selamat berdiskusi!');
            } else if (timeNow === schedule.Tutup && !(id in this.autosholat)) {
                await this.groupSettingUpdate(id, 'announcement');
                this.reply(id, '🌙 Grup ditutup untuk sementara. Sampai jumpa besok!');
            }
            this.autosholat[id] = setTimeout(() => {
                delete this.autosholat[id];
            }, 60000);
        }
    }
}

let handler = async (m, { conn, command }) => {
    if (!m.isGroup) return m.reply("Perintah ini hanya dapat digunakan di grup.");
    if (!m.isAdmin && !m.isROwner) return m.reply("Perintah ini hanya dapat digunakan oleh admin.");

    if (command === "buka") {
        await conn.groupSettingUpdate(m.chat, 'not_announcement');
        m.reply('🎉 Grup telah dibuka!');
    } else if (command === "tutup") {
        await conn.groupSettingUpdate(m.chat, 'announcement');
        m.reply('🌙 Grup telah ditutup!');
    }
};

handler.help = ["buka", "tutup"];
handler.tags = ["group"];
handler.command = ["buka", "tutup"];
handler.owner = false;
handler.group = true;

export default handler;

/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/