import { ttdl } from 'aetherz-downloader';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`❌ *Example:* ${usedPrefix + command} https://www.tiktok.com/@username/video/xxxxx`);

    m.reply("⏳ *Sedang memproses, harap tunggu...*");

    try {
        let { video, audio, thumbnail, title } = await ttdl(text);
        if (!video || !audio) throw new Error("⚠️ Gagal mengambil audio atau video dari TikTok.");
        await conn.sendMessage(
            m.chat,
            {
                video: { url: video },
                caption: `🎬 *Video:* ${title}`,
                mimetype: "video/mp4",
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    externalAdReply: {
                        title: `🎬 ${title}`,
                        body: "Download sukses!",
                        thumbnailUrl: thumbnail,
                        renderLargerThumbnail: false,
                        mediaType: 2,
                        sourceUrl: text,
                    },
                },
            },
            { quoted: m }
        );
        await conn.sendMessage(
            m.chat,
            {
                audio: { url: audio },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    externalAdReply: {
                        title: `🎵 ${title}`,
                        body: "Download audio sukses!",
                        thumbnailUrl: thumbnail,
                        renderLargerThumbnail: false,
                        mediaType: 1,
                        sourceUrl: text,
                    },
                },
            },
            { quoted: m }
        );

    } catch (err) {
        console.error(err);
        m.reply(`❌ Terjadi kesalahan: ${err.message}`);
    }
};

handler.help = ["tikdl <link>"];
handler.tags = ["downloader"];
handler.command = ["tikdl"];
handler.limit = true;
handler.premium = false;

export default handler;