var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//Middleware has access to that req and res, and most of modules have their own middleware
//View Engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//Static folder middleware, setting static path
app.use(express.static(path.join(__dirname,'public')));

//Global Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

//Routing
//Get home
app.get('/', function(req,res){
        res.render('index');
});

//Post Form
app.post('/send', function(req,res){

    var waktu = "";
    var namaCust = req.body.namaCust;
    var noHP = req.body.noHP;
    var nomerTiket = req.body.nomerTiket;
    var nomerLayanan = req.body.nomerLayanan;

    //var cabutUsee = encodeURI(cabutUsee);
    //console.log(cabutUsee);

    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 11) {
        waktu="Pagi"
    } else if (curHr < 15) {
        waktu="Siang"
    } else {
        waktu="Sore"
    }

    var jenisLayanan = req.body.jenisLayanan;
    //Cabut USEETV
    if(jenisLayanan == 'cabutUSEE'){
        var cabutUSEE ="Selamat "+waktu+" "+namaCust+" Kami dari Telkom. Maaf mengganggu waktunya. Terkait dengan laporan dinomer tiket "+nomerTiket+" dengan nomer layanan "+nomerLayanan+" untuk Cabut UseeTV sudah kami proses melalui sistem.\nUntuk pencabutan UseeTV dimohon ke PlasaTelkom, mohon dibantu dengan membawa : \n\n1. Perangkat STB dan remote, \n2. FC KTP, dan \n3. Materai 6ribu (karena ada berkas yang harus ditandatangani).\n\nDan untuk informasi bahwa nanti "+namaCust+" tidak perlu mengantri lagi. Ketika sudah di plasa telkom sampaikan saja ke satpam di depan bahwa ini untuk pengembalian perangkat terkait cabut UseeTV. \nMohon maaf "+namaCust+" sekiranya kapan bisa datang ke plasa telkom? untuk kami catatkan dinotifikasi kami.\n\nDemikian informasi yang dapat kami sampaikan. Kami mohon izin untuk menutup laporannya karena sudah kami tindak lanjuti.\nTerimakasih"
        var textEncodedurl = encodeURI(cabutUSEE);
        var noHPEncodedurl = encodeURI(noHP);
        res.redirect("https://wa.me/"+noHPEncodedurl+"?text="+textEncodedurl+"");
    };
    //Cabut USEETV dan INET
    if(jenisLayanan == 'cabutUSEEINET'){
        var cabutUSEEINET ="Selamat "+waktu+" "+namaCust+" Kami dari Telkom. Maaf mengganggu waktunya. Terkait dengan laporan dinomer tiket "+nomerTiket+" dengan nomer layanan "+nomerLayanan+" untuk Cabut UseeTv dan internet sudah kami proses melalui sistem. Untuk pencabutan UseeTV dan Internet dimohon ke PlasaTelkom, Mohon dibantu dengan membawa :\n\n1. Perangkat ONT, \n2. perangkat STB dan remote, \n3. FC KTP, dan \n4. Materai 6ribu (Karena ada berkas yang harus ditandatangani).\n\nDan untuk informasi bahwa nanti "+namaCust+" tidak perlu mengantri lagi. Ketika sudah di plasa telkom sampaikan saja ke satpam di depan bahwa ini untuk pengembalian perangkat terkait cabut useetv dan internet. \nMohon maaf "+namaCust+" sekiranya kapan bisa datang ke plasa telkom? untuk kami catatkan dinotifikasi kami.\n\nDemikian informasi yang dapat kami sampaikan. Kami mohon izin untuk menutup laporannya karena sudah kami tindak lanjuti.\nTerimakasih"
        var textEncodedurl = encodeURI(cabutUSEEINET);
        var noHPEncodedurl = encodeURI(noHP);
        res.redirect("https://wa.me/"+noHPEncodedurl+"?text="+textEncodedurl+"");
    };
    //Registrasi Seamless
    if(jenisLayanan == 'seamless'){
        var seamless ="Selamat "+waktu+" "+namaCust+" Kami dari Telkom. Maaf mengganggu waktunya. Terkait dengan laporan dinomer tiket "+nomerTiket+" dengan nomer layanan "+nomerLayanan+".\nMohon mengikuti langkah berikut untuk registrasi wifi id seamless:\nRegistrasi Hanya Dapat Dilakukan DI MyIndiHome Lewat Jaringan INDIHOME\nBerikut cara registrasinya:\n\n1. Download aplikasi myIndiHome di Google Play Store dan App Store\n2. Untuk pengguna baru, klik 'BUAT AKUN'. untuk pengguna eksisting, klik 'MASUK'.\n3. Isi Email dan Password yang sudah terdaftar, kemudian klik “Masuk”\n4. Pilih menu 'Langganan', pada halaman bagian bawah.\n5. Pilih menu 'Tambah Layanan', pada halaman bagian atas.\n6. Pilih menu katagori “Internet”.\n7. Pilih menu “wifi.id seamless”.\n8. klik 'Aktifkan', untuk melanjutkan proses aktivasi wifi id\n9. Untuk mendapatkan Username dan \nPassword, klik 'AKTIFKAN' pada halaman bagian bawah.\n10. Muncul notifikasi, pastikan aktivasi dilakukan dari jaringan IndiHome.Untuk melanjutkan klik 'Lihat'.\n11. Muncul notifikasi kode aktivasi, untuk melanjutkan klik 'OK'.\n12. Cek Pesan Masuk di aplikasi myIndiHome, kemudian buka pesan.\n13. 'klik disini 'untuk melanjutkan proses aktivasi.\n14. Sistem akan mengecek jaringan Fiber Optik Indihome\n15. Muncul notifikasi aktivasi berhasil di pesan masuk (a), dan halaman akan kembali ke menu wifi seamless. Jika registrasi diluar jaringan Indihome pelanggan muncul keterangan (b)\n16. Aktivasi berhasil :\n    a. Username dan password akan digenerate\n        otomatis oleh system (username berupa:\n        " + nomerLayanan + "@wifi.id ,\n        username tidak dapat di ganti. \n        Pelanggan hanya bisa melakukan\n        Ganti Password)\n    b. Jumlah perangkat yang terdaftar akan\n       terisi.\n    c. Daftar perangkat akan muncul\n        dengan keterangan\n             - Reg Date\n             - Nama Device (default 1)\n             - Mac Address (kosong)\n             - Status Perangkat \n       (aktifkan di seamless@wifi.id)\n    d. Create billing\n\nDemikian informasi yang dapat kami sampaikan. Kami mohon tutup laporannya karena sudah ditindaklanjuti.\nTerimakasih."
        var textEncodedurl = encodeURI(seamless);
        var noHPEncodedurl = encodeURI(noHP);
        res.redirect("https://wa.me/"+noHPEncodedurl+"?text="+textEncodedurl+"");
    };
    //Share Location
    if(jenisLayanan == 'shareLoc'){
        var shareLoc ="Selamat "+waktu+" "+namaCust+" Kami dari Telkom. Maaf mengganggu waktunya. Terkait dengan laporan dinomer tiket "+nomerTiket+" dengan nomer layanan "+nomerLayanan+" Terkait dengan permintaan "+namaCust+" untuk pasang indihome, mohon berkenan bisa dikirimkan Share Location yg tepat, di lokasi yang akan dilakukan pemasangan. Agar kami bisa mengecek jaringan Fiber Optic terdekat dari lokasi.\n\nDemikian informasi yang dapat kami sampaikan.\nKami tunggu konfirmasi dari "+namaCust+" \nTerimakasih."
        var textEncodedurl = encodeURI(shareLoc);
        var noHPEncodedurl = encodeURI(noHP);
        res.redirect("https://wa.me/"+noHPEncodedurl+"?text="+textEncodedurl+"");
    };
    //Isolir sementara
    if(jenisLayanan == 'isolirSementara'){
        var isolirSementara ="Selamat "+waktu+" "+namaCust+" Kami dari Telkom. Maaf mengganggu waktunya. Terkait dengan laporan dinomer tiket "+nomerTiket+" dengan nomer layanan "+nomerLayanan+".\nKami sampaikan informasi bahwa untuk isolir sementara dikenai biaya 55 ribu dan dimohon ke Plasa Telkom dengan membawa :\n\n1. FC KTP,\n2. materai 6rb (karena ada berkas yang harus ditandatangani) dan, \n3. bukti pembayaran terakhir .\n\nDemikian informasi yang dapat kami sampaikan.\nTerimakasih"
        var textEncodedurl = encodeURI(isolirSementara);
        var noHPEncodedurl = encodeURI(noHP);
        res.redirect("https://wa.me/"+noHPEncodedurl+"?text="+textEncodedurl+"");
    };

});

app.listen(process.env.PORT || 8080);

// app.listen(8080,function(){
//     console.log('Server started in port 8080');
//     console.log('http://localhost:8080');
// });
