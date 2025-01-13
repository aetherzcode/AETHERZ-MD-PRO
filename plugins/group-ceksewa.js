/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia
} = (await import("@whiskeysockets/baileys"))["default"];
let handler = async (_0xdb5008, {
  conn: _0x1433a8,
  args: _0x5633dc,
  usedPrefix: _0x42fe7c,
  command: _0x1e96cd
}) => {
  if (db.data.chats[_0xdb5008.chat].expired < 1) {
    throw "Group Ini Tidak DiSet Sewa !";
  }
  let _0x41161d;
  if (_0xdb5008.isGroup) {
    _0x41161d = _0x5633dc[1] ? _0x5633dc[1] : _0xdb5008.chat;
  } else {
    _0x41161d = _0x5633dc[1];
  }
  var _0x39135f = new Date() * 1;
  let _0x2cf251 = generateWAMessageFromContent(_0xdb5008.chat, {
    'viewOnceMessage': {
      'message': {
        'messageContextInfo': {
          'deviceListMetadata': {},
          'deviceListMetadataVersion': 0x2
        },
        'interactiveMessage': proto.Message.InteractiveMessage.create({
          'body': proto.Message.InteractiveMessage.Body.create({
            'text': "Sewa Akan Berakhir Selama\n" + msToDate(global.db.data.chats[_0x41161d].expired - _0x39135f) + " Lagi"
          }),
          'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.create({
            'buttons': [{
              'name': "cta_url",
              'buttonParamsJson': "{\"display_text\":\"Sewa Lagi\",\"url\":\"https://wa.me/6282389924037?text=kak+saya+mau+perpanjang+sewa+bot\",\"merchant_url\":\"https://wa.me/6282389924037?text=kak+saya+mau+perpanjang+sewa+bot\"}"
            }]
          })
        })
      }
    }
  }, {});
  return await _0x1433a8.relayMessage(_0xdb5008.chat, _0x2cf251.message, {});
};
handler.help = ["ceksewa"];
handler.tags = ["group"];
handler.command = /^(ceksewa)$/i;
handler.group = true;
export default handler;
function msToDate(_0x7f9177) {
  let _0x224364 = Math.floor(_0x7f9177 / 86400000);
  let _0x2a9062 = _0x7f9177 % 86400000;
  let _0x11cb94 = Math.floor(_0x2a9062 / 3600000);
  let _0x406812 = _0x7f9177 % 3600000;
  let _0x4d2c37 = Math.floor(_0x406812 / 60000);
  return _0x224364 + " Hari\n" + _0x11cb94 + " Jam\n" + _0x4d2c37 + " Menit";
}