import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const codeToConvert = text || (m.quoted && m.quoted.text);

    if (!codeToConvert) throw `Masukkan atau reply kode yang ingin diubah. Contoh: .toesm const fs = require('fs');`;

    let result;
    if (command === 'toesm') {
        result = convertCJSToESM(codeToConvert);
    } else if (command === 'tocjs') {
        result = convertESMToCJS(codeToConvert);
    } else {
        throw `Perintah tidak dikenal. Gunakan .toesm atau .tocjs`;
    }

    await conn.reply(m.chat, result, m);
};

// Fungsi untuk mengonversi CommonJS ke ESM
function convertCJSToESM(code) {
    return code
        .replace(/const (\w+) = require\(['"](.+?)['"]\);?/g, 'import $1 from \'$2\';')
        .replace(/let (\w+) = require\(['"](.+?)['"]\);?/g, 'import $1 from \'$2\';')
        .replace(/var (\w+) = require\(['"](.+?)['"]\);?/g, 'import $1 from \'$2\';')
        .replace(/module\.exports\s*=\s*({?.*}?);?/g, 'export default $1;')
        .replace(/exports\.(\w+)\s*=\s*(\w+);?/g, 'export const $1 = $2;');
}

// Fungsi untuk mengonversi ESM ke CommonJS
function convertESMToCJS(code) {
    return code
        .replace(/import (\w+) from ['"](.+?)['"];/g, 'const $1 = require(\'$2\');')
        .replace(/import \* as (\w+) from ['"](.+?)['"];/g, 'const $1 = require(\'$2\');')
        .replace(/import \{(.*?)\} from ['"](.+?)['"];/g, (match, p1, p2) => {
            const imports = p1.split(',').map(i => i.trim());
            return `const { ${imports.join(', ')} } = require('${p2}');`;
        })
        .replace(/export default (\w+);?/g, 'module.exports = $1;')
        .replace(/export const (\w+) = (\w+);?/g, 'exports.$1 = $2;');
}

handler.help = ['toesm <kode>', 'tocjs <kode>'];
handler.tags = ['code'];
handler.command = /^(toesm|tocjs)$/i;
handler.limit = true;

export default handler;