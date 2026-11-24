/* KoreanFortune — Kecocokan & Ajukan pertanyaan (Bahasa Indonesia) */
(function () {
var id = (window.KF_TXT = window.KF_TXT || {}).id = (window.KF_TXT.id || {});
id.gung = {
  title: 'Kecocokan', pick: 'Dengan siapa?', me: 'Aku', other: 'Dia', addOther: '+ Tambah tanggal lahirnya',
  types: [['love', 'Pasangan'], ['work', 'Kerja'], ['family', 'Keluarga'], ['friend', 'Teman']],
  area: { heart: 'Hati', life: 'Keseharian', money: 'Uang', future: 'Masa depan', total: 'Kecocokan' },
  rel: [
    '{a} adalah {ia}; {b} adalah {ib}. Lahir dengan jenis energi yang sama, kalian saling mengerti tanpa kata. Tapi karena mirip, kalian juga sama-sama keras kepala — saat berselisih, tak ada yang mau mengalah.',
    '{a} adalah {ia}; {b} adalah {ib}. {gen} {a} memberi dan {b} mekar. Bila {b} sering berterima kasih agar {a} tak kehabisan tenaga, kehangatannya bertahan.',
    '{a} adalah {ia}; {b} adalah {ib}. {gen} {a} memimpin dan {b} mengikuti, jadi urusan cepat beres. Asal kata-kata yang memimpin tidak berubah menjadi perintah.',
    '{a} adalah {ia}; {b} adalah {ib}. {gen} {b} menetapkan patokan dan {a} menjadi kokoh di dalamnya. Hormati ruang masing-masing agar {a} tak merasa terkekang.',
    '{a} adalah {ia}; {b} adalah {ib}. {gen} {a} merasa tenang dan kuat di samping {b}. Balasan-balasan kecil menjaga ikatan ini tetap lama.'
  ],
  gen: ['Seperti air menumbuhkan pohon,', 'Seperti kayu menghidupi api,', 'Seperti api menjadi abu dan menyuburkan tanah,', 'Seperti tanah menyimpan dan menumbuhkan logam,', 'Seperti air jernih memancar dari batu,'],
  ctl: ['Seperti kapak membentuk pohon,', 'Seperti air menjinakkan kobaran api,', 'Seperti pohon menembus tanah untuk berakar,', 'Seperti api melebur besi menjadi alat,', 'Seperti tanggul menuntun aliran sungai,'],
  stemHap: 'Terutama, kedua aksara inti kalian saling menarik — sebuah “persatuan langit” (天干合). Mungkin kalian tak merasa asing sejak pertemuan pertama. Tradisi menyebutnya ikatan yang dirajut langit.',
  dayRel: {
    hap: 'Tempat kalian (cabang hari) juga bergandeng tangan dalam “harmoni enam”, jadi keseharian bersama berjalan lancar.',
    samhap: 'Tempat kalian membentuk “harmoni tiga”, jadi kalian makin kuat saat melangkah menuju tujuan bersama.',
    chung: 'Tapi tempat kalian (cabang hari) bertabrakan langsung. Kebiasaan dan ruang bisa memicu pertengkaran — sepakati kamar dan waktu masing-masing agar jauh lebih mudah.',
    plain: 'Tempat kalian duduk tenang berdampingan, jadi keseharian bersama mengalir tanpa ketegangan.'
  },
  yearRel: {
    hap: 'Shio kalian juga selaras, jadi keluarga dan teman menyambut ikatan ini.',
    samhap: 'Shio kalian membentuk harmoni tiga, jadi lingkaran pergaulan kalian berbaur dengan baik.',
    chung: 'Shio kalian berbenturan, jadi pendapat bisa terbelah di acara keluarga atau teman — jadilah sekutu satu sama lain sejak awal.',
    plain: ''
  },
  comp: ['{b} punya energi {e} yang tak dimiliki {a}, jadi kalian saling melengkapi.', 'Tak satu pun dari kalian punya energi {e}, jadi berusahalah bersama secara sadar untuk hal yang diaturnya (mis. {eh}).'],
  eHint: ['memulai hal baru', 'mengungkapkan perasaan', 'menetap di satu tempat', 'memutuskan dan melepaskan', 'beristirahat dan menabung'],
  money: ['Kecocokan keuangan kalian baik. Bersama, kalian saling bertukar yang dibutuhkan, dan kekayaan mudah terkumpul.', 'Kecocokan keuangan kalian biasa saja. Biar satu orang mengelola uang dan yang lain memeriksa.', 'Kecocokan keuangan kalian perlu kehati-hatian. Putuskan bersama belanja besar dan investasi, dan simpan dana darurat masing-masing demi damai.'],
  end: {
    love: ['Ikatan yang saling mengenali. Rawat seperti sekarang, maka makin dalam setiap tahun.', 'Pasangan yang baik bila keduanya berusaha. Nikmati perbedaan alih-alih memperbaikinya.', 'Ikatan yang butuh waktu untuk menyelaraskan. Jangan terburu-buru — hormati irama masing-masing.'],
    work: ['Bersama, satu tambah satu jadi tiga.', 'Rekan kerja yang baik bila peran jelas.', 'Lebih baik berbagi bidang daripada mengerjakan hal yang sama bersama.'],
    family: ['Keluarga yang saling menopang.', 'Sedikit lebih banyak ungkapan akan mendekatkan kalian.', 'Saat berselisih, sedikit jarak melindungi kalian berdua.'],
    friend: ['Persahabatan yang akan awet.', 'Teman yang nyaman untuk menghabiskan waktu bersama.', 'Teman yang paling senang bila sesekali bertemu.']
  },
  note: 'Kecocokan adalah panduan untuk saling memahami. Di antara manusia, hati dan usaha kalianlah yang paling penting.'
};
id.ask = {
  title: 'Ajukan pertanyaan', lead: 'Pilih satu pertanyaan. Kami jawab dulu dengan ○ △ ✕, lalu beri alasan dan waktu terbaiknya.',
  who: 'Ramalan siapa yang dibaca?', examDate: 'Tanggal ujian (atau pengumuman)', ask: 'Lihat jawaban', again: 'Tanya hal lain',
  verdict: ['Ya, silakan', 'Setengah-setengah', 'Tunggu saat yang tepat'], mark: ['○', '△', '✕'],
  best: 'Dalam enam bulan ke depan, waktu terbaik adalah {m}/{y}.', bestDay: 'Minggu ini, tanggal {d}/{m} adalah hari terbaik.',
  groups: [
    ['money', 'Uang', [['sell', 'Haruskah aku menjual rumah (barang) ini?'], ['invest', 'Haruskah aku berinvestasi atau membuka usaha?'], ['lend', 'Haruskah aku meminjamkan uang?']]],
    ['people', 'Relasi', [['match', 'Apakah orang ini cocok untukku?'], ['contact', 'Haruskah aku menghubungi duluan?']]],
    ['work', 'Karier & ujian', [['exam', 'Apakah aku akan lulus ujian?'], ['promote', 'Apakah aku akan naik jabatan atau terpilih?']]],
    ['health', 'Kesehatan', [['health', 'Bagaimana kesehatan (keluargaku)?']]],
    ['move', 'Perubahan', [['move', 'Haruskah aku pindah rumah atau ganti kerja?']]]
  ],
  ans: {
    sell: ['Energi saat ini mendukung penjualan. Kemungkinan muncul pembeli yang membayar harga wajar — kalau syaratnya cocok, silakan.', 'Menjual atau menunggu sama-sama tidak buruk. Kalau tidak mendesak, tunggu bulan baik di bawah dan bandingkan harga.', 'Menjual terburu-buru sekarang sulit mendapat harga wajar. Tahan sebentar dan lihat lagi saat energinya berubah.'],
    invest: ['Energi uang sedang terbuka. Mulai bertahap alih-alih sekaligus, dan ikuti arus baik lebih lama.', 'Boleh mulai, tapi kecil-kecilan. Uji dulu, lihat tanggapannya, lalu kembangkan.', 'Sekarang saatnya menjaga, bukan mengeluarkan uang. Buat rencananya dan bertindak di bulan yang lebih baik.'],
    lend: ['Meminjamkan sekarang kecil kemungkinan bermasalah. Tetap tuliskan tanggal dan jumlahnya.', 'Kalau meminjamkan, pinjamkan hanya yang sanggup kamu relakan. Menolak lebih dengan sopan tak akan merusak hubungan.', 'Bagianmu mudah bocor sekarang. Berikan hatimu, bukan uangmu — itu melindungi kalian berdua.'],
    contact: ['Hari baik untuk hati saling terhubung. Hubungi duluan dengan pesan singkat yang hangat.', 'Boleh menghubungi, tapi singkat saja. Sapaan ringan paling tepat.', 'Hari ini kata-kata mudah salah paham. Hubungi di hari yang lebih baik di bawah, dan kalian akan jauh lebih nyambung.'],
    exam: ['Energi hari itu menopang ujian dengan kuat. Tulis dengan tenang yang kamu tahu, dan kamu tampil sesuai kemampuan — bahkan lebih.', 'Energinya stabil. Cukup kurangi kesalahan: tidur awal malam sebelumnya dan mulai dari soal yang dikenal.', 'Energi hari itu cenderung menambah ketegangan. Kondisi paling menentukan — latihan lebih dulu di jam ujian.'],
    promote: ['Masa saat nama dan kedudukanmu naik. Apa yang kamu tunjukkan sekarang langsung menjadi penilaianmu.', 'Peluangnya setengah-setengah. Berkomunikasilah sekali lagi dengan atasan untuk memiringkan timbangan.', 'Kali ini waktunya bersiap. Bangun catatan prestasi menuju bulan baik di bawah.'],
    match: ['Kami tunjukkan secara rinci di Kecocokan.', '', ''],
    move: ['Waktu yang baik untuk berpindah — energimu bangkit di tempat baru.', 'Boleh berpindah, tapi tak perlu terburu-buru. Bandingkan pilihan dengan cermat.', 'Lebih baik tetap di tempat untuk sekarang. Pikirkan lagi di bulan baik di bawah.']
  },
  health: {
    verdict: ['Stabil', 'Perlu sedikit perhatian', 'Perlu perhatian lebih'], mark: ['○', '△', '△'],
    lead: 'Kami melihat energi kesehatan selama enam bulan ke depan.',
    low: 'Energi paling rendah sekitar {m}/{y}. Bulan itu, longgarkan jadwal, hindari perjalanan jauh, dan buat janji pemeriksaan lebih dulu.',
    note: 'Ramalan ini memakai perumpamaan lima unsur tradisional dan bukan penilaian medis. Kami tidak pernah meramalkan umur atau penyakit. Jika merasa tidak sehat, silakan periksa ke dokter.'
  },
  why: 'Alasannya: energi yang kini datang kepada {who} adalah “{ten}”.',
  why2: { move: 'Energi yang mengguncang tempatmu (benturan) juga datang, memberi dorongan lebih pada perubahan.', hap: 'Energi yang datang bergandeng tangan dengan tempatmu, jadi segalanya lancar.', chung: 'Energi yang datang bertabrakan dengan tempatmu, jadi hati mudah goyah.', plain: '' },
  note: 'Ajukan pertanyaan memberi jawaban acuan menurut aliran Saju tradisional Korea. Untuk keputusan penting, pertimbangkan juga fakta dan saran ahli.'
};
})();
