import fs from 'fs'

let handler = async (m, { conn }) => {
	let tqto = `⟥⟞⟚━❨  PRESET ❩━⟚⟝⟤ 

⫹⫺ *UPDATE 01-SEP-2023*

_KUMPULAN 25 PRESET BASE ALIGHT MOTION TERBARU 2023 DIBAWAH 5MB_


1. https://alight.link/61bULaufWjXPQLBp7


2. https://alight.link/7pTikdMw4KCxFoNr9


3. https://alight.link/9S6qiPDHU8NXeX7v8


4. https://alight.link/DQrhatdLpFNL5Qor5


5. https://alight.link/TTebawCyGuNcD3zh7


6. https://alight.link/cnsZZPjrCb9XbqoS7


7. https://alight.link/dZC4ScPWpQj6peBj7


8. https://alight.link/giwwdMk3YBt2o8WB8


9. https://alight.link/JCAqhzsxgdq2WkGR7


10. https://alight.link/tqePVq5JYFA2JGUc6


11. https://alight.link/uWgRo68fkT4UTdRy6


12. https://alight.link/89X4fsq3mV2pA6Mt9


13. https://alight.link/2RzsHTLzSruBidcVA


14. https://alight.link/pBL2pjH3VMmDzh7v8


15. https://alight.link/b7Ss3x6pVRx8SBVW7


16. https://alight.link/j9nrG79b9w46jMgV7


17. https://alight.link/noFqB5PuCfrLXiVK9


18. https://alight.link/EEV3CGCiRy69zesd6


19. https://alight.link/nAmyi61EpVQrdBtU7


20. https://alight.link/sCUfmfReaTthWx7x7


21. https://alight.link/oACw6EJjXUmK8E9A8


22. https://alight.link/ZeqYC6RJXsLNqtJg6

🚩preset akan update setiap 2/3 mingguan
support kami dengan cara donasi, agar
kami terus semangat update fitur ini ketik .donasi

`;
	await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/32e396597f0c54579c4ee.jpg' }, caption: tqto }, m)
}
handler.help = ['preset']
handler.tags = ['premium']
handler.command = /^(preset)$/i

export default handler;
