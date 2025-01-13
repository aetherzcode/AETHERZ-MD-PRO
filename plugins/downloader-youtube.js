const { proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let M = proto.WebMessageInfo;

    const sendLoadingMessage = async (chatId) => {
        return await conn.reply(chatId, 'Loading...', m);
    };

    const downloadMP3 = async (url) => {
        let ytmp3Link = `https://api.simplebot.my.id/api/downloader/ytmp3?url=${encodeURIComponent(url)}`;
        try {
            let response = await fetch(ytmp3Link);
            let result = await response.json();
            if (result.status) {
                let mp3Link = result.result.mp3;
                let audioResponse = await fetch(mp3Link);
                let audioArrayBuffer = await audioResponse.arrayBuffer();
                return audioArrayBuffer;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    };

    switch (command) {
        case 'ytmp3':
            if (!text) throw `Gunakan: ${usedPrefix + command} <link>`;
            await sendLoadingMessage(m.chat);
            let audioArrayBuffer = await downloadMP3(text);
            if (audioArrayBuffer) {
                await conn.sendFile(m.chat, audioArrayBuffer, 'audio.mp3', null, m, true, {
                    type: 'audioMessage',
                    ptt: false
                });
            } else {
                await conn.reply(m.chat, 'Gagal mengunduh MP3. Coba lagi nanti.', m);
            }
            break;

        case 'ytmp4':
            if (!text) throw `Gunakan: ${usedPrefix + command} <link>`;
            await sendLoadingMessage(m.chat);
            let ytmp4Link = `https://api.simplebot.my.id/api/downloader/ytmp4?url=${encodeURIComponent(text)}`;
            try {
                let response = await fetch(ytmp4Link);
                let result = await response.json();
                if (result.status) {
                    let mp4Link = result.result.mp4;
                    await conn.sendFile(m.chat, mp4Link, 'video.mp4', `Unduhan MP4 dari ${text} selesai!`, m);
                } else {
                    await conn.reply(m.chat, 'Gagal mengunduh MP4. Coba lagi nanti.', m);
                }
            } catch (e) {
                await conn.reply(m.chat, 'Terjadi kesalahan saat mengunduh MP4.', m);
            }
            break;

        case 'yts':
            if (!text) throw `Gunakan: ${usedPrefix + command} <query>`;
            await sendLoadingMessage(m.chat);
            let searchLink = `https://api.agatz.xyz/api/ytsearch?message=${encodeURIComponent(text)}`;
            try {
                let response = await fetch(searchLink);
                let result = await response.json();
                if (result.status === 200) {
                    let videos = result.data;
                    let message = 'Hasil pencarian YouTube:\n\n';
                    for (let video of videos) {
                        message += `*${video.title}*\n${video.url}\n${video.timestamp} - ${video.views} views\n\n`;
                    }
                    await conn.reply(m.chat, message, m);
                } else {
                    await conn.reply(m.chat, 'Gagal melakukan pencarian. Coba lagi nanti.', m);
                }
            } catch (e) {
                await conn.reply(m.chat, 'Terjadi kesalahan saat melakukan pencarian.', m);
            }
            break;

        case 'pelay':
            if (!text) throw `Gunakan: ${usedPrefix + command} <judul>`;
            await sendLoadingMessage(m.chat);
            let searchPlayLink = `https://api.agatz.xyz/api/ytsearch?message=${encodeURIComponent(text)}`;
            try {
                let searchResponse = await fetch(searchPlayLink);
                let searchResult = await searchResponse.json();
                if (searchResult.status === 200) {
                    let firstVideo = searchResult.data[0];
                    let audioArrayBuffer = await downloadMP3(firstVideo.url);
                    if (audioArrayBuffer) {
                        let thumbnailResponse = await fetch(firstVideo.thumbnail);
                        let thumbnailArrayBuffer = await thumbnailResponse.arrayBuffer();

                        await conn.sendFile(m.chat, audioArrayBuffer, 'audio.mp3', null, m, true, {
                            type: 'audioMessage',
                            ptt: false,
                            seconds: 0,
                            contextInfo: {
                                externalAdReply: {
                                    showAdAttribution: true,
                                    mediaUrl: firstVideo.url,
                                    mediaType: 2,
                                    description: firstVideo.description,
                                    title: "ɴᴏᴡ ᴘʟᴀʏɪɴɢ...",
                                    body: `${firstVideo.title}`,
                                    thumbnail: thumbnailArrayBuffer,
                                    sourceUrl: firstVideo.url
                                }
                            }
                        });
                    } else {
                        await conn.reply(m.chat, 'Gagal mengunduh MP3. Coba lagi nanti.', m);
                    }
                } else {
                    await conn.reply(m.chat, 'Gagal melakukan pencarian. Coba lagi nanti.', m);
                }
            } catch (e) {
                await conn.reply(m.chat, 'Terjadi kesalahan saat mengunduh MP3.', m);
            }
            break;

        default:
            throw `Perintah tidak valid: ${command}`;
    }
}

handler.help = ['ytmp3', 'ytmp4', 'yts'];
handler.tags = ['downloader', 'search'];
handler.command = /^(ytmp3|ytmp4|yts)$/i;
handler.premium = false;
handler.limit = true;

export default handler;