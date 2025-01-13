
let handler = m => m

handler.before = async function (m) {
  if (m.sender.startsWith(`212` || `212`)) {
    global.db.data.usersm.sender.banned = true
  }

if (m.sender.startsWith(`265` || `265`)) {
    global.db.data.usersm.sender.banned = true
  }
}

export default handler