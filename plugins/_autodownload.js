import { trimUndefined } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import axios from 'axios';

const tiktokRegex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/i;
const instagramRegex = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/(?:p|reel)\/\S+)/i;
const facebookRegex = /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:\S+)?$/i;
const ytmp4Regex = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=\S+)/i;
const pinterestRegex = /^(?:https?:\/\/)?(?:www\.)?(?:pin\.it|pinterest\.com)\/(?:\S+)?$/i;
const xvideosRegex = /^(?:https?:\/\/)?(?:www\.)?(?:xvideos\.com)\/(?:\S+)?$/i; 
const xnxxRegex = /^(?:https?:\/\/)?(?:www\.)?(?:xnxx\.com)\/(?:\S+)?$/i; 

const handler = (m) => m;

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// DOWNLOADER TIKTOK
export async function downloadTikTok(link, m, conn) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const response = await fetch(`https://api.betabotz.eu.org/api/download/tiktok?url=${link}&apikey=${lann}`);
            global.db.data.users[m.sender].limit -= 1;
            const data = await response.json();
            if (!data.result.video) return;

            if (data.result.video.length > 1) {
                for (let v of data.result.video) {
                    await conn.sendFile(m.chat, v, null, `*Tiktok Downloader*`, m);
                    await sleep(3000);
                }
            } else {
                await conn.sendMessage(
                    m.chat,
                    { video: { url: data.result.video[0] }, caption: `*Tiktok Downloader*` },
                    { mention: m }
                );
            }
        } else {
            conn.reply(m.chat, 'Limit kamu habis!', m);
        }
    } catch (error) {
        console.error(error);
    }
}

// DOWNLOADER INSTAGRAM
export async function downloadInstagram(link, m, conn) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const response = await fetch(`https://api.betabotz.eu.org/api/download/igdowloader?url=${link}&apikey=${lann}`);
            const text = await response.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch (error) {
                console.error("Respons API tidak valid:", text);
                conn.reply(m.chat, "Gagal mengambil data dari server Instagram.", m);
                return;
            }

            global.db.data.users[m.sender].limit -= 1;

            if (data.status && data.message.length > 0) {
                for (let item of data.message) {
                    await conn.sendFile(
                        m.chat,
                        item._url,
                        "instagram.mp4",
                        `*Instagram Downloader*\n\n${item.wm || ""}`,
                        m
                    );

                    await sleep(3000);
                }
            } else {
                conn.reply(m.chat, "Media Instagram tidak ditemukan atau tidak dapat diunduh!", m);
            }
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (error) {
        console.error("Error pada downloadInstagram:", error);
        conn.reply(m.chat, "Terjadi kesalahan saat mencoba mengunduh media Instagram.", m);
    }
}

// DOWNLOADER FACEBOOK
export async function downloadFacebook(link, m, conn) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const response = await fetch(`https://api.betabotz.eu.org/api/download/fbdown?url=${link}&apikey=${lann}`);
            const data = await response.json();

            console.log('Respons API Facebook:', data);

            global.db.data.users[m.sender].limit -= 1;

            if (data.result && data.result.length > 0) {
                for (const video of data.result) {
                    const { _url, resolution, thumbnail } = video;

                    if (thumbnail) {
                        await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `Resolusi: ${resolution}`, m);
                    }

                    if (_url) {
                        await conn.sendFile(m.chat, _url, 'facebook.mp4', `*Facebook Downloader*\n\nResolusi: ${resolution}`, m);
                    } else {
                        conn.reply(m.chat, `Video dengan resolusi ${resolution} tidak tersedia.`, m);
                    }
                    await sleep(3000);
                }
            } else {
                conn.reply(m.chat, 'Video tidak ditemukan atau tidak dapat diunduh!', m);
            }
        } else {
            conn.reply(m.chat, 'Limit kamu habis!', m);
        }
    } catch (error) {
        console.error('Error pada downloadFacebook:', error);
        conn.reply(m.chat, 'Terjadi kesalahan saat mencoba mengunduh video Facebook.', m);
    }
}

// DOWNLOADER YTMP4 (YouTube to MP4)
export async function downloadYTMP4(link, m, conn) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const response = await fetch(`https://api.betabotz.eu.org/api/download/ytmp4?url=${link}&apikey=${lann}`);
            const data = await response.json();

            console.log("API Response:", JSON.stringify(data, null, 2));

            global.db.data.users[m.sender].limit -= 1;

            if (data.status === true && data.result) {
                const videoUrl = data.result.mp4 || data.result.video_url;

                if (videoUrl) {
                    await conn.sendFile(m.chat, videoUrl, 'video.mp4', `*YouTube MP4 Downloader*`, m);
                } else {
                    conn.reply(m.chat, "Video tidak ditemukan atau tidak dapat diunduh!", m);
                }
            } else {
                conn.reply(m.chat, "Terjadi kesalahan saat mencoba mengunduh video.", m);
            }
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (error) {
        console.error("Error pada downloadYTMP4:", error);
        conn.reply(m.chat, "Terjadi kesalahan saat mencoba mengunduh video YouTube.", m);
    }
}

// DOWNLOADER Pinterest
export async function downloadPinterest(link, m, conn) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            console.log("URL Asli:", link);
            const responseExpand = await fetch(link, { method: "HEAD", redirect: "manual" });
            const expandedUrl = responseExpand.headers.get("location") || link;
            console.log("URL Diperluas:", expandedUrl);

            const response = await fetch(`https://api.betabotz.eu.org/api/download/pinterest?url=${expandedUrl}&apikey=${lann}`);
            const data = await response.json();
            console.log("Respons API Pinterest:", data);

            global.db.data.users[m.sender].limit -= 1;

            if (data.result.success === true && data.result.data && data.result.data.image) {
                const imageUrl = data.result.data.image;
                await conn.sendFile(
                    m.chat,
                    imageUrl,
                    "pinterest.jpg",
                    `*Pinterest Downloader*\n\n🔗 URL: ${expandedUrl}`,
                    m
                );
            } else {
                conn.reply(m.chat, "Media Pinterest tidak ditemukan atau tidak dapat diunduh!", m);
            }
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (error) {
        console.error("Error pada downloadPinterest:", error);
        conn.reply(m.chat, "Terjadi kesalahan saat mencoba mengunduh media Pinterest.", m);
    }
}

// DOWNLOADER XVideos
export async function downloadXVideos(link, m, conn) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const response = await fetch(`https://api.betabotz.eu.org/api/download/xvideosdl?url=${link}&apikey=${lann}`);
            const data = await response.json();

            global.db.data.users[m.sender].limit -= 1;

            if (data.status === true && data.result && data.result.url) {
                const videoUrl = data.result.url;
                await conn.sendFile(m.chat, videoUrl, 'video.mp4', `*XVideos Downloader*\n\n🎥 Judul: ${data.result.title}\n👁️ Views: ${data.result.views}\n👍 Suka: ${data.result.like_count}\n👎 Tidak Suka: ${data.result.dislike_count}`, m);
            } else {
                conn.reply(m.chat, "Video tidak ditemukan atau tidak dapat diunduh!", m);
            }
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (error) {
        console.error("Error pada downloadXVideos:", error);
        conn.reply(m.chat, "Terjadi kesalahan saat mencoba mengunduh video XVideos.", m);
    }
}

// DOWNLOADER Xnxx
export async function downloadXnxx(link, m, conn) {
    try {
        if (global.db.data.users[m.sender].limit > 0) {
            const response = await fetch(`https://api.betabotz.eu.org/api/download/xnxxdl?url=${link}&apikey=${lann}`);
            const data = await response.json();

            global.db.data.users[m.sender].limit -= 1;

            if (data.status === true && data.result && data.result.url) {
                const videoUrl = data.result.url;
                await conn.sendFile(m.chat, videoUrl, 'video.mp4', `*Xnxx Downloader*\n\n🎥 Judul: ${data.result.title}\n👁️ Views: ${data.result.views}`, m);
            } else {
                conn.reply(m.chat, "Video tidak ditemukan atau tidak dapat diunduh!", m);
            }
        } else {
            conn.reply(m.chat, "Limit kamu habis!", m);
        }
    } catch (error) {
        console.error("Error pada downloadXnxx:", error);
        conn.reply(m.chat, "Terjadi kesalahan saat mencoba mengunduh video Xnxx.", m);
    }
}

handler.before = async function (m, { conn }) {
    let chat = global.db.data.chats[m.chat];

    if (!m.text) return;
    if (
        m.text.startsWith('=>') ||
        m.text.startsWith('>') ||
        m.text.startsWith('.') ||
        m.text.startsWith('#') ||
        m.text.startsWith('!') ||
        m.text.startsWith('/') ||
        m.text.startsWith('\/')
    )
        return;

    if (chat.isBanned) return;
    if (!m.text.includes('http')) return;

    let text = m.text.replace(/\n+/g, ' ');

    if (text.match(tiktokRegex)) {
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        await downloadTikTok(text, m, conn);
    } else if (text.match(instagramRegex)) {
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        await downloadInstagram(text, m, conn);
    } else if (text.match(facebookRegex)) {
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        await downloadFacebook(text, m, conn);
    } else if (text.match(xvideosRegex)) {
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        await downloadXVideos(text, m, conn);
    } else if (text.match(xnxxRegex)) {
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        await downloadXnxx(text, m, conn);
    } else if (text.match(ytmp4Regex)) { 
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        await downloadYTMP4(text, m, conn);
    } else if (text.match(pinterestRegex)) { 
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        await downloadPinterest(text, m, conn);
    }
};

export default handler;