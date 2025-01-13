import { createHash } from 'crypto';
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia
} = (await import("@whiskeysockets/baileys"))["default"];
let handler = async function (_0x2ed605, {
  conn: _0x5a6c6c,
  text: _0x254de6,
  usedPrefix: _0x42e962
}) {
  let _0x5246c7 = createHash("md5").update(_0x2ed605.sender).digest("hex");
  let _0xa6bf59 = generateWAMessageFromContent(_0x2ed605.chat, {
    'viewOnceMessage': {
      'message': {
        'messageContextInfo': {
          'deviceListMetadata': {},
          'deviceListMetadataVersion': 0x2
        },
        'interactiveMessage': proto.Message.InteractiveMessage.create({
          'body': proto.Message.InteractiveMessage.Body.create({
            'text': "Serial Nomor Kamu Ada Di Tombol Bawah, Silahkan Tekan Dan Otomatis Kamu Akan Salin Serial Nomor Kamu,\n\nUntuk keluar dari database bot silahkan ketik .unreg (SN) "
          }),
          'footer': proto.Message.InteractiveMessage.Footer.create({
            'text': null
          }),
          'header': proto.Message.InteractiveMessage.Header.create({
            'hasMediaAttachment': false
          }),
          'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.create({
            'buttons': [{
              'name': "cta_copy",
              'buttonParamsJson': "{\"display_text\":\"copy\",\"id\":\"123456789\",\"copy_code\":\"" + _0x5246c7 + "\"}"
            }]
          })
        })
      }
    }
  }, {});
  await _0x5a6c6c.relayMessage(_0x2ed605.sender, _0xa6bf59.message, {
    'messageId': _0x2ed605.key.id
  });
};
handler.help = ["ceksn"];
handler.tags = ["user"];
handler.command = /^(ceksn)$/i;
handler.register = true;
export default handler;