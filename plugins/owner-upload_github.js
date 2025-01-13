import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const owner = global.ownerrepo;
    const repo = global.repo;
    const githubToken = global.githubToken;
    const branch = 'master';

    const getFileSha = async (owner, repo, filePath, branch) => {
        try {
            const response = await axios.get(
                `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, {
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                    },
                }
            );
            return response.data.sha;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return null; // File tidak ditemukan
            }
            throw error;
        }
    };

    try {
        if (!m.quoted || !m.quoted.text) {
            throw `Harap reply pesan yang berisi kode!\nContoh:\nReply pesan, lalu gunakan perintah: ${usedPrefix}${command} nama_file.js`;
        }

        if (!text) throw `Harap masukkan nama file!\nContoh: ${usedPrefix}${command} plugins/nama_file.js`;

        const filePath = text.trim();
        const fileContent = m.quoted.text;

        const base64Content = Buffer.from(fileContent).toString('base64');
        const fileSha = await getFileSha(owner, repo, filePath, branch);

        if (fileSha) {
            await axios.put(
                `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
                {
                    message: `Update file ${filePath}`,
                    content: base64Content,
                    branch: branch,
                    sha: fileSha,
                },
                {
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                    },
                }
            );
            m.reply(`File berhasil diupdate di GitHub!\nPath: ${filePath}`);
        } else {
            await axios.put(
                `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
                {
                    message: `Upload file ${filePath}`,
                    content: base64Content,
                    branch: branch,
                },
                {
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                    },
                }
            );
            m.reply(`File berhasil diupload ke GitHub!\nPath: ${filePath}`);
        }
    } catch (e) {
        m.reply(`Terjadi kesalahan: ${e.response?.data?.message || e.message}`);
        console.error(e.response ? e.response.data : e.message);
    }
};

handler.help = ['uploadupdategithub'];
handler.tags = ['owner', 'tools'];
handler.command = /^(upgh|upcodegh|uploadupdategithub)$/i;
handler.limit = true;
handler.rowner = true;

export default handler;