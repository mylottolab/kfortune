/* KoreanFortune — Tojeong Bigyeol, 144 heksagram (tafsir baru kami, Bahasa Indonesia). Memakai KF_TOJ_BUILD dari data/ko/toj.js agar skor sama di semua bahasa. */
(function () {
var UP = [
  { h: '天行健步', hk: 'Langit melangkah maju dengan kuat', lv: 3, y: 'Tahun ini energi Langit (乾) menarikmu ke depan. Tahun yang baik untuk memulai hal-hal besar yang selama ini ditunda, dan jalan terbuka selebar tekadmu. Tapi makin tinggi langit, makin kencang anginnya — jangan biarkan rasa percaya diri membuatmu tuli terhadap orang lain.' },
  { h: '澤上春風', hk: 'Angin musim semi di atas danau', lv: 2, y: 'Tahun ini membawa energi Danau (兌) — tahun saat kegembiraan dan tawa berkumpul. Orang-orang berkumpul dan kata-kata mengalir, jadi pertemuan dan kesepakatan membawa kabar baik. Tapi di tahun yang penuh kesenangan, dompet dan janji mudah longgar — kendalikan.' },
  { h: '日出東山', hk: 'Matahari terbit di bukit timur', lv: 1, y: 'Tahun ini membawa energi Api (離) — tahun saat segalanya terlihat terang. Usahamu selama ini menarik perhatian dan namamu naik. Tapi cahaya terang juga memperlihatkan cacat kecil, jadi asah sekali lagi kata dan tindakanmu.' },
  { h: '雷動春山', hk: 'Guntur menggelegar di gunung musim semi', lv: 0, y: 'Tahun ini membawa energi Guntur (震) — tahun gerakan dan perubahan besar. Pindahan, pekerjaan baru, atau awal yang baru bisa mengguncang pijakanmu, tapi guncangan itu membangunkan tunas baru. Yang bersiap alih-alih panik akan menyambut musim semi setelah guntur.' },
  { h: '風過竹林', hk: 'Angin melintasi hutan bambu', lv: 0, y: 'Tahun ini membawa energi Angin (巽) — tahun datang dan pergi. Orang, uang, dan kabar keluar masuk seperti angin. Ikuti arus alih-alih menggenggam erat, simpan dekat hanya yang perlu, dan kamu melewati tahun ini dengan ringan.' },
  { h: '水渡險灘', hk: 'Air menyeberangi jeram', lv: -2, y: 'Tahun ini membawa energi Air (坎) — tahun menyeberangi jeram. Beberapa titik sulit akan datang, tapi air selalu menemukan jalannya ke laut, meski harus memutar. Seberangi selangkah demi selangkah tanpa terburu-buru, dan di bekas jeram itu tertinggal kebijaksanaan.' },
  { h: '山中靜坐', hk: 'Duduk tenang di pegunungan', lv: -1, y: 'Tahun ini membawa energi Gunung (艮) — tahun untuk berhenti dan menengok ke belakang. Saatnya memperkuat alih-alih memperluas. Letakkan ketidaksabaran dan beristirahatlah; itu menyiapkanmu untuk langkah besar tahun depan.' },
  { h: '大地含春', hk: 'Bumi luas mengandung musim semi', lv: 1, y: 'Tahun ini membawa energi Bumi (坤) — tahun menerima dan merawat. Berkah kembali saat kamu mendukung orang dan pekerjaan alih-alih tampil di depan. Tahun yang jujur yang mengembalikan apa yang kamu tabur; ketekunan adalah kekuatan terbesarmu.' }
];
var MID = [
  { s: [-2, -2, -1, -1, 0, 0, 1, 1, 1, 2, 2, 1], y: 'Tahun ini mulai lambat dan mekar seiring berjalan. Musim semi mungkin terasa macet, tapi segalanya melonggar sepanjang musim panas, dan panen terbesar datang di musim gugur dan dingin. Kuncinya: jangan menyerah di awal.' },
  { s: [0, 1, 2, 1, 0, -1, -1, 0, 1, 2, 1, 0], y: 'Tahun ini mekar di musim semi dan panen di musim gugur. Tabur di bulan ke-2–3, istirahat di panas musim panas, dan tuai di bulan ke-9–10. Ikuti musim, maka tahun ini penuh tanpa dipaksakan.' },
  { s: [-1, 0, 0, 1, 2, 2, 1, 0, 0, -1, -1, 0], y: 'Tahun ini paling panas di puncak musim panas. Peluang dan orang berdatangan sekitar bulan ke-5–6, jadi bersiaplah sejak musim semi. Setelah musim gugur, perlambat dan jaga yang sudah terkumpul.' },
  { s: [2, 2, 1, 1, 0, 0, -1, -1, -1, 0, -1, -1], y: 'Tahun ini mulai kuat dan menuntut kehati-hatian kemudian. Manfaatkan energi baik di awal untuk segera menuntaskan hal penting, dan di paruh kedua pilih menjaga alih-alih memperluas.' },
  { s: [1, -1, 1, -1, 2, -1, 1, -1, 1, 0, 1, -1], y: 'Tahun ini bergerak dalam gelombang yang sering. Bulan baik dan bulan waspada bergantian, jadi kumpulkan pekerjaan di bulan baik dan beristirahatlah di bulan waspada.' },
  { s: [1, 0, -1, -1, -2, -1, 0, 0, 1, 1, 2, 2], y: 'Tahun ini menanti musim semi sambil melewati musim dingin. Ada satu jeda napas panjang di puncak musim panas, tapi sejak musim gugur energi kembali penuh dan kamu menyambut akhir tahun dengan cerah.' }
];
var LOW = [
  { adj: 4, y: 'Berakhir baik. Apa yang kamu usahakan tahun ini ditutup dengan senyum, dan kabar baik menunggu di akhir tahun.' },
  { adj: 0, y: 'Berakhir tenang. Tahun ini ditutup tanpa naik-turun besar — gunakan bulan terakhir untuk merencanakan tahun depan.' },
  { adj: -3, y: 'Jaga akhirnya. Menjelang akhir tahun kurangi pengeluaran dan pertengkaran; tetap waspada sampai akhir dan kamu menyeberang ke tahun baru dengan selamat.' }
];
var H2 = [
  [['枯木逢春', 'pohon kering bertemu musim semi'], ['苦盡甘來', 'setelah pahit datang manis'], ['先難後易', 'sulit dulu, mudah kemudian']],
  [['花開結實', 'bunga mekar dan berbuah'], ['春耕秋收', 'membajak di musim semi, menuai di musim gugur'], ['順天者興', 'yang mengikuti langit akan jaya']],
  [['夏日當空', 'matahari musim panas di puncak langit'], ['盛極守中', 'di puncak, jaga keseimbangan'], ['熱中求涼', 'di tengah panas, carilah sejuk']],
  [['先得後守', 'raih dulu, lalu jaga'], ['見好卽收', 'saat baik, segera tuai'], ['善始愼終', 'awal yang baik — jaga akhirnya']],
  [['波上行舟', 'perahu berlayar di atas ombak'], ['一起一伏', 'sekali naik, sekali rendah'], ['隨波待時', 'ikuti ombak dan tunggu saatnya']],
  [['冬去春來', 'musim dingin pergi, musim semi datang'], ['否極泰來', 'saat kebuntuan berakhir, keterbukaan datang'], ['靜待東風', 'tunggu angin timur dengan tenang']]
];
var MON = [
  ['Pintu tahun baru terbuka lebar. Mulailah bulan ini apa yang sudah direncanakan.', 'Pintu terbuka tapi angin masih dingin. Rencanakan sekarang, bertindak pelan-pelan.', 'Tergesa-gesa di awal tahun membuat tersandung. Urus rumah lebih dulu.'],
  ['Penolong datang dari timur. Balas orang yang lama tak berkabar.', 'Seperti es yang mencair, segalanya melonggar sedikit demi sedikit.', 'Angin musim semi mengguncang hati — tunda janji besar.'],
  ['Dahan kering berbunga. Bulan yang baik untuk memulai yang tertunda.', 'Bulan menabur. Jangan buru-buru mengejar hasil.', 'Dingin yang terlambat bisa mengganggu kesehatan. Jangan memaksakan diri.'],
  ['Matahari musim semi murah hati — orang dan uang berkumpul.', 'Bulan yang tenang. Tekuni yang sedang kamu kerjakan.', 'Banyak bicara mendatangkan masalah. Jaga mulutmu.'],
  ['Matahari awal musim panas mengangkat namamu. Boleh tampil ke depan.', 'Sibuk, tapi ada hasilnya.', 'Tenaga menurun seperti ladang kemarau. Tunda keputusan besar.'],
  ['Seperti hijau yang makin rimbun, pekerjaanmu tumbuh subur.', 'Bulan untuk beristirahat dari panas. Rawat tubuh lebih dulu.', 'Seperti jalan yang terhalang hujan musim, segalanya lambat. Tunggu, nanti cerah.'],
  ['Hujan membasahi ladang. Bantuan tak terduga datang.', 'Pemasukan dan pengeluaran seimbang. Periksa catatan keuanganmu.', 'Hati-hati di dekat air dan dalam perjalanan jauh. Tergesa-gesa membuat rugi.'],
  ['Biji-bijian matang di ladang musim gugur. Bulan terbaik untuk panen.', 'Bagikan hasil panenmu, dan ia bertambah.', 'Serakah sebelum panen merugikan. Jaga yang harus dijaga.'],
  ['Angin sejuk menjernihkan pikiran. Ambil keputusan penting sekarang.', 'Bulan merapikan dan menyempurnakan. Tuntaskan urusan lama.', 'Angin dingin membawa sepi. Dekatkan orang-orang.'],
  ['Seperti daun yang berubah warna, usahamu terlihat.', 'Bulan yang seimbang. Bersiaplah untuk musim dingin.', 'Seperti daun berguguran, banyak yang lepas. Kurangi pengeluaran.'],
  ['Di malam-malam panjang kamu bermimpi indah. Kabar baik datang.', 'Bulan untuk mengumpulkan tenaga dalam diam.', 'Dingin membuatmu meringkuk. Utamakan kesehatan.'],
  ['Kamu menutup tahun dengan senyum. Ucapkan terima kasih.', 'Bulan untuk menengok tahun ini dengan tenang.', 'Di bulan terakhir, selesaikan utang dan pertengkaran sebelum menyeberang.']
];
LOW.forEach(function (l) { l.sep = ' — '; });
var T = window.KF_TOJ_BUILD(UP, MID, LOW, H2, MON);
var id = (window.KF_TXT = window.KF_TXT || {}).id = (window.KF_TXT.id || {});
id.toj = T;
})();
