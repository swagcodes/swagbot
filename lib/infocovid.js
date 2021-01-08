exports.infocovid = (id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif) => {
	return `*INFORMASI COVID-19 TERBARU*

⚠️ positif: *${corohelp.confirmed.value}*
⚠️ sembuh: *${corohelp.recovered.value}*
⚠️ meninggal: *${corohelp.deaths.value}*

update: *${corohelp.lastUpdate}*

♻️ _TETAP JAGA KESEHATAN DAN SELALU PAKAI MASKER!_` // latest script source with cmd swagcode_
}
