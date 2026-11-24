/* KoreanFortune — Hợp đôi & Hỏi nhanh (Tiếng Việt) */
(function () {
var vi = (window.KF_TXT = window.KF_TXT || {}).vi = (window.KF_TXT.vi || {});
vi.gung = {
  title: 'Hợp đôi', pick: 'Xem với ai?', me: 'Tôi', other: 'Người ấy', addOther: '+ Thêm ngày sinh của người ấy',
  types: [['love', 'Người yêu · Vợ chồng'], ['work', 'Công việc'], ['family', 'Gia đình'], ['friend', 'Bạn bè']],
  area: { heart: 'Trái tim', life: 'Đời sống', money: 'Tiền bạc', future: 'Tương lai', total: 'Hợp nhau' },
  rel: [
    '{a} là {ia}; {b} là {ib}. Sinh ra cùng một loại năng lượng, hai bạn hiểu nhau không cần lời. Nhưng giống nhau nên cũng cứng đầu như nhau — khi va chạm, chẳng ai chịu nhường.',
    '{a} là {ia}; {b} là {ib}. {gen} {a} cho đi và {b} nở hoa. Nếu {b} thường bày tỏ lòng biết ơn để {a} không cạn sức, sự ấm áp sẽ bền lâu.',
    '{a} là {ia}; {b} là {ib}. {gen} {a} dẫn dắt và {b} theo sau, nên mọi việc nhanh chóng ổn thỏa. Chỉ cần để ý lời người dẫn dắt đừng thành mệnh lệnh.',
    '{a} là {ia}; {b} là {ib}. {gen} {b} đặt ra chuẩn mực và {a} trở nên vững vàng trong đó. Hãy tôn trọng không gian của nhau để {a} không thấy gò bó.',
    '{a} là {ia}; {b} là {ib}. {gen} {a} thấy yên lòng và vững mạnh bên {b}. Những cử chỉ đáp lại nhỏ sẽ giữ mối duyên này bền lâu.'
  ],
  gen: ['Như nước nuôi cây,', 'Như gỗ nuôi lửa,', 'Như lửa hóa tro bồi đất,', 'Như đất ôm và nuôi kim loại,', 'Như nước trong tuôn từ đá,'],
  ctl: ['Như rìu tỉa cây,', 'Như nước dập lửa,', 'Như cây xuyên đất bén rễ,', 'Như lửa nung sắt thành công cụ,', 'Như bờ dẫn dòng suối,'],
  stemHap: 'Đặc biệt, hai chữ trung tâm của hai bạn hút nhau — gọi là “thiên can hợp” (天干合). Có lẽ ngay lần đầu gặp đã chẳng thấy xa lạ. Truyền thống xem đây là mối duyên trời định.',
  dayRel: {
    hap: 'Chỗ đứng của hai bạn (địa chi ngày) còn nắm tay nhau trong “lục hợp”, nên sống chung rất ăn ý.',
    samhap: 'Chỗ đứng của hai bạn tạo thành “tam hợp”, nên càng mạnh khi cùng hướng về một mục tiêu.',
    chung: 'Nhưng chỗ đứng của hai bạn (địa chi ngày) xung nhau trực diện. Thói quen và không gian dễ gây cãi vã — thỏa thuận phòng riêng và giờ riêng sẽ dễ thở hơn nhiều.',
    plain: 'Chỗ đứng của hai bạn yên ổn cạnh nhau, nên đời sống chung trôi chảy không căng thẳng.'
  },
  yearRel: {
    hap: 'Con giáp của hai bạn cũng hợp, nên gia đình và bạn bè đều ủng hộ mối duyên này.',
    samhap: 'Con giáp của hai bạn tam hợp, nên các mối quan hệ xung quanh hòa hợp.',
    chung: 'Con giáp của hai bạn xung nhau, nên trong buổi họp mặt gia đình hay bạn bè ý kiến dễ chia rẽ — hãy là đồng minh của nhau từ trước.',
    plain: ''
  },
  comp: ['{b} có năng lượng {e} mà {a} thiếu, nên hai bạn bù đắp cho nhau.', 'Cả hai đều thiếu năng lượng {e}, nên hãy cùng chủ động chăm lo phần nó cai quản (ví dụ: {eh}).'],
  eHint: ['bắt đầu điều mới', 'bày tỏ cảm xúc', 'ổn định ở một nơi', 'quyết định và buông bỏ', 'nghỉ ngơi và tiết kiệm'],
  money: ['Hợp nhau về tiền bạc tốt. Ở bên nhau, hai bạn trao cho nhau điều mỗi người cần, tài lộc dễ tụ.', 'Hợp nhau về tiền bạc ở mức trung bình. Một người giữ tiền, người kia kiểm tra.', 'Chuyện tiền bạc cần cẩn trọng. Chi tiêu lớn và đầu tư hãy cùng quyết, và giữ quỹ dự phòng riêng để êm ấm.'],
  end: {
    love: ['Mối duyên nhận ra nhau. Trân trọng như bây giờ, sẽ sâu đậm hơn mỗi năm.', 'Sẽ là cặp đôi đẹp nếu cả hai cùng cố gắng. Hãy tận hưởng sự khác biệt thay vì sửa nó.', 'Mối duyên cần thời gian để hòa nhịp. Đừng vội — hãy tôn trọng nhịp của nhau.'],
    work: ['Làm cùng nhau, một cộng một thành ba.', 'Đồng nghiệp tốt khi phân vai rõ ràng.', 'Chia lĩnh vực sẽ tốt hơn cùng làm một việc.'],
    family: ['Gia đình là chỗ dựa vững chắc của nhau.', 'Bày tỏ thêm một chút sẽ gần nhau hơn.', 'Khi va chạm, giữ chút khoảng cách sẽ bảo vệ cả hai.'],
    friend: ['Tình bạn sẽ bền lâu.', 'Những người bạn ở cạnh thấy thoải mái.', 'Những người bạn thỉnh thoảng gặp mới vui nhất.']
  },
  note: 'Hợp đôi là kim chỉ nam để hiểu nhau. Giữa người với người, trái tim và nỗ lực của hai bạn mới là quan trọng nhất.'
};
vi.ask = {
  title: 'Hỏi nhanh', lead: 'Chọn một câu hỏi. Chúng tôi trả lời trước bằng ○ △ ✕, rồi nói lý do và thời điểm tốt nhất.',
  who: 'Xem vận của ai?', examDate: 'Ngày thi (hoặc ngày có kết quả)', ask: 'Xem câu trả lời', again: 'Hỏi điều khác',
  verdict: ['Được, cứ làm', 'Năm mươi năm mươi', 'Chờ thời điểm'], mark: ['○', '△', '✕'],
  best: 'Trong sáu tháng tới, thời điểm tốt nhất là {m}/{y}.', bestDay: 'Tuần này, ngày {d}/{m} là tốt nhất.',
  groups: [
    ['money', 'Tiền bạc', [['sell', 'Có nên bán căn nhà (món đồ) này?'], ['invest', 'Có nên đầu tư hay khởi nghiệp?'], ['lend', 'Có nên cho vay tiền?']]],
    ['people', 'Quan hệ', [['match', 'Người này có hợp với tôi?'], ['contact', 'Có nên chủ động liên lạc trước?']]],
    ['work', 'Công danh · Thi cử', [['exam', 'Tôi có đỗ không?'], ['promote', 'Tôi có được thăng chức hay trúng cử?']]],
    ['health', 'Sức khỏe', [['health', 'Sức khỏe (của gia đình) thế nào?']]],
    ['move', 'Thay đổi', [['move', 'Có nên chuyển nhà hay đổi việc?']]]
  ],
  ans: {
    sell: ['Năng lượng hiện nghiêng về bán. Dễ gặp người trả giá công bằng — điều kiện hợp thì cứ quyết.', 'Bán hay chờ đều không tệ. Nếu không gấp, hãy chờ tháng tốt bên dưới rồi so giá.', 'Bán vội lúc này khó được giá. Giữ thêm một thời gian và xem lại khi năng lượng đổi chiều.'],
    invest: ['Năng lượng tiền bạc đang mở. Hãy bắt đầu từng phần thay vì dồn một lần, và theo dòng thuận lâu hơn.', 'Có thể bắt đầu, nhưng nhỏ thôi. Thử, xem phản hồi, rồi mới mở rộng.', 'Giờ là lúc giữ tiền, không phải chi ra. Lập kế hoạch và hành động vào tháng tốt hơn.'],
    lend: ['Cho vay lúc này ít khả năng gặp rắc rối. Dù vậy vẫn ghi rõ ngày và số tiền.', 'Nếu cho vay, chỉ cho số tiền mất cũng không sao. Lịch sự từ chối phần dư sẽ không làm sứt mẻ tình cảm.', 'Lúc này phần của bạn dễ thất thoát. Hãy cho tấm lòng chứ đừng cho tiền — điều đó bảo vệ cả hai.'],
    contact: ['Ngày tốt để lòng người thông nhau. Hãy chủ động nhắn một tin ngắn, ấm áp.', 'Liên lạc được, nhưng ngắn gọn. Một lời chào nhẹ nhàng là tốt nhất.', 'Hôm nay lời nói dễ lệch nhau. Liên lạc vào ngày tốt bên dưới sẽ thông suốt hơn nhiều.'],
    exam: ['Năng lượng ngày ấy nâng đỡ kỳ thi vững vàng. Bình tĩnh viết những gì bạn biết, bạn sẽ làm đúng sức — hoặc hơn.', 'Năng lượng ổn định. Chỉ cần giảm sai sót: ngủ sớm đêm trước và làm câu quen trước.', 'Năng lượng ngày ấy dễ làm căng thẳng. Thể trạng quyết định nhiều nhất — hãy luyện trước đúng giờ thi.'],
    promote: ['Thời điểm tên tuổi và địa vị đi lên. Những gì bạn thể hiện bây giờ sẽ thành kết quả đánh giá.', 'Cơ hội năm mươi năm mươi. Hãy trao đổi thêm một lần với cấp trên để cán cân nghiêng về bạn.', 'Lần này là lúc chuẩn bị. Tích lũy thành tích hướng tới tháng tốt bên dưới.'],
    match: ['Chúng tôi sẽ cho bạn xem chi tiết ở mục Hợp đôi.', '', ''],
    move: ['Thời điểm tốt để thay đổi — năng lượng bạn hồi sinh ở nơi mới.', 'Thay đổi được, nhưng không cần vội. So sánh kỹ các lựa chọn.', 'Tạm thời nên giữ nguyên. Hãy cân nhắc lại vào tháng tốt bên dưới.']
  },
  health: {
    verdict: ['Ổn định', 'Cần chăm sóc', 'Cần đặc biệt chú ý'], mark: ['○', '△', '△'],
    lead: 'Chúng tôi đã xem năng lượng sức khỏe trong sáu tháng tới.',
    low: 'Năng lượng thấp nhất vào khoảng {m}/{y}. Tháng đó hãy giảm lịch trình, tránh đi xa và đặt lịch khám trước.',
    note: 'Lời đoán này dùng ẩn dụ ngũ hành truyền thống, không phải chẩn đoán y khoa. Chúng tôi không bao giờ đoán tuổi thọ hay bệnh tật. Nếu thấy không khỏe, hãy đi khám bác sĩ.'
  },
  why: 'Lý do: năng lượng đang đến với {who} là “{ten}”.',
  why2: { move: 'Năng lượng làm lay động chỗ đứng (xung) cũng đến, khiến sự thay đổi thêm sức đẩy.', hap: 'Năng lượng đến nắm tay chỗ đứng của bạn, nên mọi việc suôn sẻ.', chung: 'Năng lượng đến va vào chỗ đứng của bạn, nên lòng dễ dao động.', plain: '' },
  note: 'Hỏi nhanh đưa ra câu trả lời tham khảo theo dòng chảy Saju truyền thống Hàn Quốc. Với quyết định quan trọng, hãy cân nhắc thêm thực tế và ý kiến chuyên gia.'
};
})();
