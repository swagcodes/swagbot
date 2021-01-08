const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const get = require('got')
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const imageToBase64 = require('image-to-base64');
const infocovid = require("./lib/infocovid.js");
//
const BotName = 'SWAG BOT 🤖';//this script made by swagcode @All Rights Reserved
const instagramlu = 'https://instagram.com/swagcode_';
const whatsapplu = '6281337632063';
const kapanbotaktif = '24 Jam';
//
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}
const conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] scan your qr code`);
});

conn.on('credentials-updated', () =>
{
   // save credentials whenever updated
   console.log(`credentials updated!`)
   const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
// uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();

conn.on('user-presence-update', json => console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by @swagcode_`))
conn.on('message-status-update', json =>
{
   const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
   console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by @swagcode_`)
})

conn.on('message-new', async(m) =>
{
   const messageContent = m.message
   const text = m.message.conversation
   let id = m.key.remoteJid
   const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
   let imageMessage = m.message.imageMessage;
   console.log(`[ ${moment().format("HH:mm:ss")} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);


// FF
if (text == '!infocovid'){
   const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
   var date = new Date();
   var tahun = date.getFullYear();
   var bulan = date.getMonth();
   var tanggal = date.getDate();
   var hari = date.getDay();
   var jam = date.getHours();
   var menit = date.getMinutes();
   var detik = date.getSeconds();
   switch(hari) {
    case 0: hari = "Minggu"; break;
    case 1: hari = "Senin"; break;
    case 2: hari = "Selasa"; break;
    case 3: hari = "Rabu"; break;
    case 4: hari = "Kamis"; break;
    case 5: hari = "Jum'at"; break;
    case 6: hari = "Sabtu"; break;
   }
   switch(bulan) {
    case 0: bulan = "Januari"; break;
    case 1: bulan = "Februari"; break;
    case 2: bulan = "Maret"; break;
    case 3: bulan = "April"; break;
    case 4: bulan = "Mei"; break;
    case 5: bulan = "Juni"; break;
    case 6: bulan = "Juli"; break;
    case 7: bulan = "Agustus"; break;
    case 8: bulan = "September"; break;
    case 9: bulan = "Oktober"; break;
    case 10: bulan = "November"; break;
    case 11: bulan = "Desember"; break;
   }
   var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
   var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
   conn.sendMessage(id, infocovid.infocovid(id, BotName, corohelp, tampilTanggal, tampilWaktu) ,MessageType.text);
   }

   if (text.includes("!nulis")) //bug fixed, if u found a new bug please contact instagram: @swagcode_
   {
      const
      {
         spawn
      } = require("child_process");
      console.log("writing...")
      const teks = text.replace(/!nulis /, "")
      const split = teks.replace(/(\S+\s*){1,10}/g, "$&\n")
      const fixedHeight = split.split("\n").slice(0, 80).join("\n")
      console.log(split)
      spawn("convert", [
            "./assets/paper.jpg",
            "-font",
            "Indie-Flower",
            "-size",
            "700x960",
            "-pointsize",
            "30",
            "-interline-spacing",
            "5",
            "-annotate",
            "+170+222",
            fixedHeight,
            "./assets/result.jpg"
         ])
         .on("error", () => console.log("error"))
         .on("exit", () =>
         {
            const buffer = fs.readFileSync("assets/result.jpg")
            conn.sendMessage(id, buffer, MessageType.image)
            console.log("done")
         })
      }
   
      if (text.includes("!quotes"))
      {
         var url = 'https://jagokata.com/kata-bijak/acak.html'
         axios.get(url)
            .then((result) =>
            {
               let $ = cheerio.load(result.data);
               var author = $('a[class="auteurfbnaam"]').contents().first().text();
               var kata = $('q[class="fbquote"]').contents().first().text();
               conn.sendMessage(
                  id,
                  `
        _${kata}_
           
       
      *~${author}*
            `, MessageType.text
               );
            });
      }
if (text.includes("!lirik")){
   const teks = text.split("!lirik")[1]
      axios.get(`http://scrap.terhambar.com/lirik?word=${teks}`).then ((res) => {
             let hasil = `🎵lirik lagu🎵${teks} \n\n\n ${res.data.result.lirik}`
         conn.sendMessage(id, hasil, MessageType.text)
})

}

if (text.includes("!help")){
   const teks = text.replace(/!help /, "")
 conn.sendMessage(id, '*swag bot*\n\nlist command:\n_!anime_\n_!katakan <text>_\n_!apaitu <pertanyaan>_\n_!infocovid_\n_!nulis <text>_\n_!quotes_\n_!lirik <nama lagu>_\n\n_bot is created by *swagcode*_', MessageType.text)
}

if (text.includes("!katakan")){
   const teks = text.replace(/!katakan /, "")
 conn.sendMessage(id, teks, MessageType.text)
}

if (text.includes("!apaitu")){
const teks = text.replace(/!apaitu /, "")
axios.get(`https://st4rz.herokuapp.com/api/wiki?q=${teks}`).then((res) => {
    let hasil = `${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}
if (text.includes("!anime"))
   {
    var items = ["anime girl", "anime cantik", "anime", "anime aesthetic"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }


   // end of file (script created by swagcode)


})
