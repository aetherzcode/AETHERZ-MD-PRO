/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
export async function before(m) {
    this.autosholat = this.autosholat ? this.autosholat : {};
    let id = m.chat;
    let jadwalGrup = {
        Tutup: "23:00",
        Buka: "06:00",
    };
    const date = new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    for (const [aksi, waktu] of Object.entries(jadwalGrup)) {
        if (timeNow === waktu && !(id in this.autosholat)) {
            if (aksi === "Buka") {
                await this.groupSettingUpdate(m.chat, 'not_announcement');
                this.reply(m.chat, '🎉 Grup sudah dibuka! Mari kita mulai diskusi seru! 🎉');
            } else if (aksi === "Tutup") {
                await this.groupSettingUpdate(m.chat, 'announcement');
                this.reply(m.chat, '🌙 Grup ditutup untuk sementara. Mari beristirahat dan bersiap untuk besok! 🌙');
            }
            this.autosholat[id] = setTimeout(() => {
                delete this.autosholat[id];
            }, 57000);
        }
    }

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender;
    let jadwalSholat = {
        Dhuhr: "12:10",
        Ashar: "15:10",
        Maghrib: "18:20",
        Isha: "19:30",
        Subuh: "05:10",
        Pagi: "06:00",
        Malam: "20:00",
    };
    const dateSholat = new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }));
    const hoursSholat = dateSholat.getHours();
    const minutesSholat = dateSholat.getMinutes();
    const timeNowSholat = `${hoursSholat.toString().padStart(2, "0")}:${minutesSholat.toString().padStart(2, "0")}`;
    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNowSholat === waktu && !(id in this.autosholat)) {
            let caption = "";
            let mention = `@${who.split("@")[0]}`; // Mendapatkan nama pengguna untuk mention
            if (sholat === "Dhuhr") {
                caption = `_Waktu Sholat Dhuhr Telah Tiba 🕌_ (${waktu})\n\nAmbil air wudhu dan segeralah sholat`;
            } else if (sholat === "Ashar") {
                caption = `_Waktu Sholat Ashar Telah Tiba 🕌_ (${waktu})\n\nAmbil air wudhu dan segeralah sholat`;
            } else if (sholat === "Maghrib") {
                caption = `_Waktu Sholat Maghrib Telah Tiba 🕌_ (${waktu})\n\nAmbil air wudhu dan segeralah sholat`;
            } else if (sholat === "Isha") {
                caption = `_Waktu Sholat Isha Telah Tiba 🕌_ (${waktu})\n\nAmbil air wudhu dan segeralah sholat`;
            } else if (sholat === "Subuh") {
                caption = `_Waktu Sholat Subuh Telah Tiba 🕌_ (${waktu})\n\nAmbil air wudhu dan segeralah sholat`;
            } else if (sholat === "Pagi") {
                caption = `_Selamat pagi! sayang🌅_`;
            } else if (sholat === "Malam") {
                caption = `_Selamat malam! sayang🌙_`;
            }

            this.autosholat[id] = [
                await this.reply(m.chat, `${mention} ${caption}`, null, {
                    contextInfo: {
                        mentionedJid: [who]
                    }
                }),
                setTimeout(() => {
                    delete this.autosholat[id]
                }, 57000)
            ];
        }
    }
}
export const disabled = false;
/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/