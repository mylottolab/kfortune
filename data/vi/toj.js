/* KoreanFortune — Tojeong Bigyeol, 144 quẻ (cách giải mới của chúng tôi, Tiếng Việt). Dùng KF_TOJ_BUILD từ data/ko/toj.js để điểm số giống nhau ở mọi ngôn ngữ. */
(function () {
var UP = [
  { h: '天行健步', hk: 'Trời mạnh mẽ tiến bước', lv: 3, y: 'Năm nay năng lượng của Trời (乾) kéo bạn về phía trước. Đây là năm tốt để bắt đầu những việc lớn đã trì hoãn, và con đường mở rộng bằng quyết tâm của bạn. Nhưng trời càng cao gió càng mạnh — đừng để sự tự tin khiến bạn bỏ ngoài tai lời người khác.' },
  { h: '澤上春風', hk: 'Gió xuân trên mặt hồ', lv: 2, y: 'Năm nay mang năng lượng của Hồ (兌) — năm niềm vui và tiếng cười tụ lại. Người gặp người, lời nói trôi chảy, nên gặp gỡ và giao dịch đều có tin vui. Nhưng năm nhiều niềm vui thì ví tiền và lời hứa dễ lỏng — hãy giữ chặt.' },
  { h: '日出東山', hk: 'Mặt trời mọc trên đồi đông', lv: 1, y: 'Năm nay mang năng lượng của Lửa (離) — năm mọi điều ra ánh sáng. Công sức trước đây được chú ý và tên tuổi bạn đi lên. Nhưng ánh sáng mạnh cũng để lộ khuyết điểm nhỏ, hãy mài giũa lời nói và việc làm thêm một lần.' },
  { h: '雷動春山', hk: 'Sấm rền trên núi xuân', lv: 0, y: 'Năm nay mang năng lượng của Sấm (震) — năm của những chuyển động và thay đổi lớn. Chuyển nhà, đổi việc hay khởi đầu mới có thể làm rung chuyển nền móng, nhưng chính sự rung chuyển ấy đánh thức mầm non. Ai chuẩn bị thay vì hoảng loạn sẽ đón được mùa xuân sau tiếng sấm.' },
  { h: '風過竹林', hk: 'Gió qua rừng trúc', lv: 0, y: 'Năm nay mang năng lượng của Gió (巽) — năm đến rồi đi. Người, tiền và tin tức ra vào như gió. Thuận theo dòng chảy thay vì níu giữ, chỉ giữ gần những gì cần, bạn sẽ đi qua năm nay nhẹ nhàng.' },
  { h: '水渡險灘', hk: 'Nước vượt ghềnh hiểm', lv: -2, y: 'Năm nay mang năng lượng của Nước (坎) — năm phải vượt ghềnh. Sẽ có vài đoạn khó, nhưng nước luôn tìm đường ra biển, dù phải vòng. Bước từng bước không vội vàng, nơi từng là ghềnh thác sẽ để lại trí tuệ.' },
  { h: '山中靜坐', hk: 'Ngồi tĩnh giữa núi', lv: -1, y: 'Năm nay mang năng lượng của Núi (艮) — năm để dừng lại và nhìn lại. Đây là lúc củng cố hơn là mở rộng. Đặt sự sốt ruột xuống và nghỉ ngơi; điều đó chuẩn bị cho bước tiến lớn năm sau.' },
  { h: '大地含春', hk: 'Đất rộng ôm mùa xuân', lv: 1, y: 'Năm nay mang năng lượng của Đất (坤) — năm đón nhận và nuôi dưỡng. Phúc quay về khi bạn nâng đỡ người và việc thay vì đứng ra phía trước. Một năm chân thật trả lại những gì bạn gieo; chăm chỉ là sức mạnh lớn nhất của bạn.' }
];
var MID = [
  { s: [-2, -2, -1, -1, 0, 0, 1, 1, 1, 2, 2, 1], y: 'Năm nay khởi đầu chậm và nở rộ dần. Mùa xuân có thể thấy bế tắc, nhưng mọi thứ giãn ra qua mùa hạ, và mùa gặt lớn nhất đến vào thu đông. Đừng bỏ cuộc sớm, đó là chìa khóa.' },
  { s: [0, 1, 2, 1, 0, -1, -1, 0, 1, 2, 1, 0], y: 'Năm nay nở hoa vào xuân và gặt hái vào thu. Gieo vào tháng 2–3, nghỉ trong nắng hạ, gặt vào tháng 9–10. Thuận theo mùa, năm sẽ đầy đặn mà không gượng ép.' },
  { s: [-1, 0, 0, 1, 2, 2, 1, 0, 0, -1, -1, 0], y: 'Năm nay nóng nhất vào giữa hạ. Cơ hội và người tìm đến quanh tháng 5–6, nên hãy chuẩn bị từ mùa xuân. Sau mùa thu, chậm lại và giữ những gì đã gom được.' },
  { s: [2, 2, 1, 1, 0, 0, -1, -1, -1, 0, -1, -1], y: 'Năm nay khởi đầu mạnh và cần thận trọng về sau. Tận dụng năng lượng tốt đầu năm để xong việc quan trọng nhanh, nửa cuối năm chọn giữ thay vì mở rộng.' },
  { s: [1, -1, 1, -1, 2, -1, 1, -1, 1, 0, 1, -1], y: 'Năm nay chuyển động thành những con sóng dày. Tháng tốt và tháng cần cẩn trọng xen kẽ, nên dồn việc vào tháng tốt và nghỉ ở tháng cẩn trọng.' },
  { s: [1, 0, -1, -1, -2, -1, 0, 0, 1, 1, 2, 2], y: 'Năm nay vượt qua mùa đông để chờ mùa xuân. Giữa hạ có một quãng nghỉ dài, nhưng từ thu năng lượng đầy trở lại và bạn đón cuối năm thật rạng rỡ.' }
];
var LOW = [
  { adj: 4, y: 'Kết thúc tốt đẹp. Những gì bạn nỗ lực năm nay khép lại bằng nụ cười, và một tin vui đang chờ cuối năm.' },
  { adj: 0, y: 'Kết thúc êm ả. Năm khép lại không nhiều thăng trầm — hãy dùng tháng cuối để lên kế hoạch cho năm sau.' },
  { adj: -3, y: 'Cẩn thận phần kết. Gần cuối năm hãy giảm chi tiêu và tranh cãi; thận trọng đến ngày cuối, bạn sẽ bước sang năm mới an toàn.' }
];
var H2 = [
  [['枯木逢春', 'cây khô gặp mùa xuân'], ['苦盡甘來', 'hết đắng đến ngọt'], ['先難後易', 'trước khó sau dễ']],
  [['花開結實', 'hoa nở kết trái'], ['春耕秋收', 'xuân cày thu gặt'], ['順天者興', 'thuận trời thì hưng']],
  [['夏日當空', 'nắng hạ giữa trời'], ['盛極守中', 'lúc cực thịnh giữ trung dung'], ['熱中求涼', 'giữa nóng tìm mát']],
  [['先得後守', 'được trước rồi giữ'], ['見好卽收', 'thấy tốt thì thu'], ['善始愼終', 'khởi đầu tốt — cẩn trọng phần kết']],
  [['波上行舟', 'thuyền đi trên sóng'], ['一起一伏', 'một lên một xuống'], ['隨波待時', 'theo sóng chờ thời']],
  [['冬去春來', 'đông qua xuân tới'], ['否極泰來', 'bĩ cực thái lai'], ['靜待東風', 'lặng chờ gió đông']]
];
var MON = [
  ['Cánh cửa năm mới mở rộng. Bắt đầu tháng này những gì đã định.', 'Cửa đã mở nhưng gió còn lạnh. Lên kế hoạch ngay, hành động thong thả.', 'Vội vàng đầu năm dễ vấp ngã. Lo việc nhà trước.'],
  ['Quý nhân đến từ phương đông. Hãy hồi âm người lâu không liên lạc.', 'Như băng tan, mọi việc giãn ra từng chút.', 'Gió xuân làm lòng xao động — hoãn những lời hứa lớn.'],
  ['Cành khô trổ hoa. Tháng tốt để bắt đầu việc đã trì hoãn.', 'Tháng gieo hạt. Đừng vội kết quả.', 'Rét muộn có thể ảnh hưởng sức khỏe. Đừng quá sức.'],
  ['Nắng xuân hào phóng — người và tiền cùng tụ lại.', 'Một tháng yên ổn. Cứ đều đặn với việc đang làm.', 'Nói nhiều sinh chuyện. Hãy giữ miệng.'],
  ['Nắng đầu hạ nâng tên tuổi. Có thể bước ra phía trước.', 'Bận rộn nhưng có thu hoạch.', 'Sức lực sụt như ruộng hạn. Hoãn quyết định lớn.'],
  ['Như màu xanh thêm đậm, công việc phát triển tươi tốt.', 'Tháng nghỉ tránh nóng. Chăm sóc cơ thể trước.', 'Như đường bị mưa mùa chặn, mọi việc chậm. Chờ rồi trời sẽ tạnh.'],
  ['Mưa thấm ruộng đồng. Có sự giúp đỡ bất ngờ.', 'Thu chi ngang nhau. Hãy xem lại sổ sách.', 'Cẩn thận gần nước và khi đi xa. Vội thì hỏng.'],
  ['Lúa chín trên đồng thu. Tháng tốt nhất để thu hoạch.', 'Chia sẻ những gì thu được, nó sẽ lớn thêm.', 'Tham lam trước mùa gặt thì thiệt. Giữ những gì cần giữ.'],
  ['Gió mát làm đầu óc sáng suốt. Hãy đưa ra phán đoán quan trọng bây giờ.', 'Tháng sắp xếp và mài giũa. Khép lại việc cũ.', 'Gió lạnh mang cô đơn. Hãy giữ người bên cạnh.'],
  ['Như lá đổi màu, nỗ lực của bạn được nhìn thấy.', 'Một tháng đều đặn. Chuẩn bị cho mùa đông sắp tới.', 'Như lá rụng, nhiều thứ tuột đi. Cắt giảm chi tiêu.'],
  ['Đêm dài mộng đẹp. Tin vui đến.', 'Tháng lặng lẽ tích lũy sức lực.', 'Cái lạnh khiến bạn co lại. Lo sức khỏe trước.'],
  ['Khép năm bằng nụ cười. Hãy nói lời cảm ơn.', 'Tháng bình thản nhìn lại cả năm.', 'Tháng cuối, hãy giải quyết nợ nần và bất hòa trước khi sang năm.']
];
LOW.forEach(function (l) { l.sep = ' — '; });
var T = window.KF_TOJ_BUILD(UP, MID, LOW, H2, MON);
var vi = (window.KF_TXT = window.KF_TXT || {}).vi = (window.KF_TXT.vi || {});
vi.toj = T;
})();
