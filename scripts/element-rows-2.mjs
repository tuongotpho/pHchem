/**
 * element-rows-2.mjs — 58 nguyên tố còn lại, dạng gọn.
 * Khuôn nở ra ở scripts/element-data-2.mjs (hàm expand).
 *
 * fam: ct=kim loại chuyển tiếp, ks=kim loại sau chuyển tiếp, ab=á kim,
 *      pk=phi kim, ha=halogen, lt=họ Lantan, ac=họ Actini, sn=siêu nặng nhân tạo
 */

export const ROWS = [
  // ── Đợt 1: kim loại chuyển tiếp chu kỳ 4-5 và á kim ────────────────
  {
    z: 21, sym: 'Sc', vi: 'Scandi', en: 'Scandium', mass: '44.956', fam: 'ct',
    config: '[Ar] 3d¹ 4s²', enScale: '1.36', state: 'Rắn, kim loại trắng bạc mềm',
    melt: '1541°C', boil: '2836°C', density: '2.99 g/cm³', disc: '1879 (Lars Fredrik Nilson)',
    nickname: 'KIM LOẠI NHẸ CỦA HỢP KIM HÀNG KHÔNG',
    subQuote: 'Nhẹ ngang nhôm nhưng nóng chảy ở 1541°C!',
    hook: 'Chỉ vài phần trăm scandi là hợp kim nhôm cứng hẳn lên.',
    statsHighlight: 'Khối lượng riêng chỉ 2.99 g/cm³ — nhẹ ngang nhôm, nhưng nóng chảy cao hơn nhôm gần 900 độ!',
    statsSay: 'Khối lượng riêng chỉ 2.99 gam trên xăng ti mét khối, nhẹ ngang nhôm, nhưng nóng chảy cao hơn nhôm gần 900 độ.',
    powerTitle: 'LÀM CỨNG HỢP KIM NHÔM VÀ TẠO ÁNH SÁNG GIỐNG MẶT TRỜI',
    desc: [
      'Thêm scandi vào nhôm giúp ngăn hạt tinh thể lớn lên, hợp kim bền hơn hẳn mà không nặng thêm.',
      'Đèn hơi scandi iodua phát ánh sáng rất giống ánh nắng, dùng chiếu sáng sân vận động.',
      'Scandi nằm rải rác khắp vỏ Trái Đất chứ không tụ thành mỏ, nên tách ra rất tốn kém.'
    ],
    reaction: '2 Sc + 6 HCl → 2 ScCl₃ + 3 H₂↑',
    apps: [
      'Khung xe đạp đua và gậy bóng chày hợp kim nhôm - scandi',
      'Đèn cao áp scandi iodua chiếu sáng sân vận động',
      'Chi tiết máy bay và tên lửa cần nhẹ mà chịu lực'
    ]
  },
  {
    z: 23, sym: 'V', vi: 'Vanadi', en: 'Vanadium', mass: '50.942', fam: 'ct',
    config: '[Ar] 3d³ 4s²', enScale: '1.63', state: 'Rắn, kim loại xám ánh xanh',
    melt: '1910°C', boil: '3407°C', density: '6.11 g/cm³', disc: '1801 (del Río) - 1830 (Sefström)',
    nickname: 'KIM LOẠI ĐỔI MÀU CỦA THÉP',
    subQuote: 'Dung dịch vanadi đổi qua bốn màu tím, lục, lam, vàng!',
    hook: 'Chỉ một phần nghìn vanadi đã đủ làm thép dai gấp bội.',
    statsHighlight: 'Vanadi có bốn số oxi hoá bền, mỗi số cho một màu dung dịch khác nhau.',
    powerTitle: 'LÀM DAI THÉP VÀ LƯU ĐIỆN CHO PIN DÒNG CHẢY',
    desc: [
      'Thép hợp kim vanadi vừa cứng vừa dai, dùng làm cờ lê, lò xo và trục khuỷu động cơ.',
      'Pin dòng chảy vanadi lưu điện mặt trời và điện gió cho cả nhà máy, nạp xả hàng chục nghìn lần.',
      'Vanadi pentoxit là chất xúc tác chính trong dây chuyền sản xuất axit sunfuric.'
    ],
    reaction: '2 SO₂ + O₂ ⇌ 2 SO₃  (xúc tác V₂O₅)',
    apps: [
      'Thép crôm - vanadi làm cờ lê, mũi khoan, lò xo',
      'Pin dòng chảy vanadi lưu điện mặt trời quy mô lớn',
      'Xúc tác trong dây chuyền sản xuất axit sunfuric'
    ]
  },
  {
    z: 39, sym: 'Y', vi: 'Ytri', en: 'Yttrium', mass: '88.906', fam: 'ct',
    config: '[Kr] 4d¹ 5s²', enScale: '1.22', state: 'Rắn, kim loại trắng bạc',
    melt: '1526°C', boil: '3336°C', density: '4.47 g/cm³', disc: '1794 (Johan Gadolin)',
    nickname: 'NGƯỜI TẠO MÀU ĐỎ CHO MÀN HÌNH',
    subQuote: 'Không thuộc họ đất hiếm nhưng luôn nằm chung mỏ với đất hiếm!',
    hook: 'Bột ytri từng cho ra màu đỏ trên mọi màn hình đời cũ.',
    statsHighlight: 'Gốm YBCO chứa ytri dẫn điện không hao phí ở âm 181 độ — chỉ cần nitơ lỏng là đủ lạnh.',
    powerTitle: 'TẠO SIÊU DẪN NHIỆT ĐỘ CAO VÀ PHÁT MÀU ĐỎ RỰC',
    desc: [
      'Gốm YBCO là chất siêu dẫn đầu tiên chạy được chỉ với nitơ lỏng, rẻ hơn heli lỏng rất nhiều.',
      'Ytri oxit sunfua pha europi cho màu đỏ trong đèn LED trắng và màn hình thế hệ cũ.',
      'Ytri giữ ổn định gốm zirconi, tạo lớp phủ chịu nhiệt cho cánh tuabin động cơ phản lực.'
    ],
    reaction: '4 Y + 3 O₂ → 2 Y₂O₃',
    apps: [
      'Lớp phủ chịu nhiệt cho cánh tuabin động cơ máy bay',
      'Bột huỳnh quang đỏ trong đèn LED và màn hình',
      'Dao gốm và răng sứ zirconi ổn định bằng ytri'
    ]
  },
  {
    z: 40, sym: 'Zr', vi: 'Zirconi', en: 'Zirconium', mass: '91.224', fam: 'ct',
    config: '[Kr] 4d² 5s²', enScale: '1.33', state: 'Rắn, kim loại xám ánh bạc',
    melt: '1855°C', boil: '4409°C', density: '6.51 g/cm³', disc: '1789 (Martin Heinrich Klaproth)',
    nickname: 'ÁO GIÁP CỦA LÒ PHẢN ỨNG HẠT NHÂN',
    subQuote: 'Gần như trong suốt với nơtron nên được chọn bọc nhiên liệu hạt nhân!',
    hook: 'Phần lớn zirconi khai thác được đều đi vào ngành điện hạt nhân.',
    statsHighlight: 'Zirconi hút nơtron kém hơn thép hàng chục lần, nên nơtron xuyên qua mà phản ứng không tắt.',
    powerTitle: 'BỌC THANH NHIÊN LIỆU HẠT NHÂN VÀ CHỊU ĂN MÒN TUYỆT ĐỐI',
    desc: [
      'Ống hợp kim zircaloy bọc viên nhiên liệu urani trong lò phản ứng, cho nơtron đi qua tự do.',
      'Lớp oxit tự sinh trên bề mặt khiến zirconi gần như không bị axit và kiềm ăn mòn.',
      'Zirconi hợp với cơ thể người nên được làm chân răng cấy ghép và khớp nhân tạo.'
    ],
    reaction: 'Zr + O₂ → ZrO₂',
    apps: [
      'Ống zircaloy bọc thanh nhiên liệu trong lò phản ứng',
      'Răng sứ và khớp nhân tạo bằng gốm zirconi',
      'Thiết bị chịu axit trong nhà máy hoá chất'
    ]
  },
  {
    z: 41, sym: 'Nb', vi: 'Niobi', en: 'Niobium', mass: '92.906', fam: 'ct',
    config: '[Kr] 4d⁴ 5s¹', enScale: '1.60', state: 'Rắn, kim loại xám ánh xanh',
    melt: '2477°C', boil: '4744°C', density: '8.57 g/cm³', disc: '1801 (Charles Hatchett)',
    nickname: 'TRÁI TIM NAM CHÂM CỦA MÁY CHỤP MRI',
    subQuote: 'Dây siêu dẫn niobi tạo từ trường cho mọi máy cộng hưởng từ!',
    hook: 'Không có niobi thì bệnh viện không có máy chụp cộng hưởng từ.',
    statsHighlight: 'Hợp kim niobi - titan siêu dẫn ở âm 264 độ, tải dòng khổng lồ mà không toả chút nhiệt nào.',
    powerTitle: 'DẪN ĐIỆN KHÔNG HAO PHÍ VÀ LÀM DAI THÉP ĐƯỜNG ỐNG',
    desc: [
      'Cuộn dây niobi - titan trong máy MRI dẫn dòng cực lớn mà không mất một chút điện năng.',
      'Chỉ vài phần vạn niobi là thép đường ống dẫn dầu dai hẳn lên, chịu được vùng băng giá.',
      'Niobi không gây dị ứng nên được dùng làm khuyên và trang sức cấy dưới da.'
    ],
    reaction: '4 Nb + 5 O₂ → 2 Nb₂O₅',
    apps: [
      'Cuộn dây siêu dẫn trong máy chụp cộng hưởng từ MRI',
      'Thép vi hợp kim cho đường ống dẫn dầu khí',
      'Nam châm siêu dẫn của máy gia tốc hạt'
    ]
  },
  {
    z: 42, sym: 'Mo', vi: 'Molypden', en: 'Molybdenum', mass: '95.95', fam: 'ct',
    config: '[Kr] 4d⁵ 5s¹', enScale: '2.16', state: 'Rắn, kim loại xám ánh bạc',
    melt: '2623°C', boil: '4639°C', density: '10.28 g/cm³', disc: '1778 (Carl Wilhelm Scheele)',
    nickname: 'KIM LOẠI CỦA THÉP CHỊU NHIỆT VÀ SỰ SỐNG',
    subQuote: 'Vừa làm cứng thép, vừa là vi chất bắt buộc của cơ thể!',
    hook: 'Nhờ molypden mà cây họ đậu lấy được đạm ngay từ không khí.',
    statsHighlight: 'Nóng chảy ở 2623 độ — đứng thứ sáu trong toàn bộ bảng tuần hoàn.',
    powerTitle: 'GIỮ ĐỘ CỨNG Ở NHIỆT ĐỘ CAO VÀ BÔI TRƠN KHÔ',
    desc: [
      'Thép molypden không mềm đi khi nóng, dùng làm nòng súng, lưỡi cưa và chi tiết động cơ.',
      'Molypden disunfua có cấu trúc từng lớp trượt lên nhau nên bôi trơn được cả trong chân không.',
      'Enzym chứa molypden giúp vi khuẩn nốt sần biến nitơ không khí thành đạm nuôi cây.'
    ],
    reaction: '2 MoS₂ + 7 O₂ → 2 MoO₃ + 4 SO₂',
    apps: [
      'Thép hợp kim molypden cho động cơ và dụng cụ cắt gọt',
      'Mỡ bôi trơn cho máy móc chân không và thiết bị vũ trụ',
      'Phân vi lượng molypden cho cây họ đậu'
    ]
  },
  {
    z: 44, sym: 'Ru', vi: 'Rutheni', en: 'Ruthenium', mass: '101.07', fam: 'ct',
    config: '[Kr] 4d⁷ 5s¹', enScale: '2.20', state: 'Rắn, kim loại trắng bạc rất cứng',
    melt: '2334°C', boil: '4150°C', density: '12.45 g/cm³', disc: '1844 (Karl Ernst Claus)',
    nickname: 'LỚP MÀNG BA NGUYÊN TỬ TRONG Ổ CỨNG',
    subQuote: 'Một lớp dày ba nguyên tử đã làm nên bước nhảy dung lượng ổ đĩa!',
    hook: 'Rutheni nằm ngay trong ổ cứng máy tính của bạn.',
    statsHighlight: 'Chỉ thêm một phần nghìn rutheni là titan chống ăn mòn tốt lên rõ rệt.',
    powerTitle: 'NGĂN CÁCH TỪ TÍNH VÀ LÀM CỨNG TIẾP ĐIỂM ĐIỆN',
    desc: [
      'Trong ổ cứng, màng rutheni dày đúng ba nguyên tử ngăn hai lớp từ tính ảnh hưởng lẫn nhau.',
      'Lớp mạ rutheni cực cứng bảo vệ tiếp điểm điện và ngòi bút cao cấp khỏi mài mòn.',
      'Xúc tác rutheni tổng hợp được amoniac ở áp suất thấp hơn xúc tác sắt truyền thống.'
    ],
    reaction: '2 Ru + 3 Cl₂ → 2 RuCl₃',
    apps: [
      'Màng ngăn từ tính trong ổ cứng máy tính',
      'Mạ tiếp điểm điện tử chống mài mòn',
      'Xúc tác tổng hợp amoniac cho phân đạm'
    ]
  },
  {
    z: 45, sym: 'Rh', vi: 'Rhodi', en: 'Rhodium', mass: '102.91', fam: 'ct',
    config: '[Kr] 4d⁸ 5s¹', enScale: '2.28', state: 'Rắn, kim loại trắng bạc sáng bóng',
    melt: '1964°C', boil: '3695°C', density: '12.41 g/cm³', disc: '1803 (William Hyde Wollaston)',
    nickname: 'KIM LOẠI ĐẮT NHẤT HÀNH TINH',
    subQuote: 'Có thời điểm đắt gấp hơn mười lần vàng!',
    hook: 'Mỗi ô tô chỉ cần vài gam rhodi nhưng không thể thiếu.',
    statsHighlight: 'Cả thế giới mỗi năm chỉ khai thác được khoảng 30 tấn rhodi — quá nhỏ so với vàng.',
    powerTitle: 'KHỬ KHÍ ĐỘC TRONG BỘ XÚC TÁC Ô TÔ',
    desc: [
      'Rhodi biến khí NOx độc trong khói xe thành nitơ và oxy vô hại, việc mà bạch kim làm kém hơn.',
      'Lớp mạ rhodi cho bề mặt trắng sáng không xỉn, dùng phủ trang sức vàng trắng và gương đèn.',
      'Rhodi trơ tới mức không tan cả trong nước cường toan, thứ hoà tan được vàng.'
    ],
    reaction: '2 NO + 2 CO → N₂ + 2 CO₂  (xúc tác Rh)',
    apps: [
      'Bộ xúc tác khí thải trên hầu hết ô tô hiện nay',
      'Mạ trang sức vàng trắng cho trắng bền không xỉn',
      'Gương phản xạ và đầu dò trong thiết bị quang học'
    ]
  },
  {
    z: 46, sym: 'Pd', vi: 'Paladi', en: 'Palladium', mass: '106.42', fam: 'ct',
    config: '[Kr] 4d¹⁰', enScale: '2.20', state: 'Rắn, kim loại trắng bạc mềm',
    melt: '1555°C', boil: '2963°C', density: '12.02 g/cm³', disc: '1802 (William Hyde Wollaston)',
    nickname: 'MIẾNG BỌT BIỂN HÚT KHÍ HYDRO',
    subQuote: 'Hút được lượng khí hydro gấp 900 lần thể tích của chính nó!',
    hook: 'Paladi nuốt khí hydro y như bọt biển hút nước.',
    statsHighlight: 'Một thể tích paladi giữ được tới 900 thể tích khí hydro ở điều kiện thường.',
    powerTitle: 'LỌC HYDRO SIÊU SẠCH VÀ ĐỐT NỐT KHÍ THẢI XE XĂNG',
    desc: [
      'Chỉ hydro chui lọt qua màng paladi, nên nó là bộ lọc tạo khí hydro siêu sạch cho pin nhiên liệu.',
      'Trong bộ xúc tác xe xăng, paladi đốt nốt khí CO và xăng chưa cháy hết thành CO₂ và nước.',
      'Paladi có mặt trong hầu hết bo mạch, ở lớp tiếp điểm của tụ gốm nhiều lớp.'
    ],
    reaction: '2 CO + O₂ → 2 CO₂  (xúc tác Pd)',
    apps: [
      'Bộ xúc tác khí thải cho ô tô chạy xăng',
      'Màng lọc tạo khí hydro tinh khiết cho pin nhiên liệu',
      'Tiếp điểm trong tụ gốm và bo mạch điện tử'
    ]
  },
  {
    z: 48, sym: 'Cd', vi: 'Cadimi', en: 'Cadmium', mass: '112.41', fam: 'ct',
    config: '[Kr] 4d¹⁰ 5s²', enScale: '1.69', state: 'Rắn, kim loại trắng ánh xanh mềm',
    melt: '321.1°C', boil: '767°C', density: '8.65 g/cm³', disc: '1817 (Friedrich Stromeyer)',
    nickname: 'KIM LOẠI ĐỘC CỦA SẮC VÀNG VÀ PIN CŨ',
    subQuote: 'Cho màu vàng cam rực rỡ nhưng cực độc với thận và xương!',
    hook: 'Chính cadimi đã gây ra bệnh Itai-itai ở Nhật Bản.',
    statsHighlight: 'Cadimi tích lại trong thận hàng chục năm, cơ thể thải rất chậm.',
    powerTitle: 'TẠO SẮC VÀNG BỀN VÀ NUỐT NƠTRON TRONG LÒ HẠT NHÂN',
    desc: [
      'Cadimi sunfua cho màu vàng chanh tới đỏ cam rất bền, từng là màu vẽ ưa thích của hoạ sĩ.',
      'Thanh điều khiển cadimi nuốt nơtron trong lò phản ứng, dùng để hãm và dừng phản ứng dây chuyền.',
      'Pin niken - cadimi chịu sạc xả nhiều lần nhưng đang bị loại bỏ dần vì quá độc với môi trường.'
    ],
    reaction: 'Cd + 2 HCl → CdCl₂ + H₂↑',
    apps: [
      'Thanh điều khiển hấp thụ nơtron trong lò phản ứng',
      'Bột màu vàng cam cho sơn và nhựa, nay đã bị hạn chế',
      'Pin niken - cadimi cho dụng cụ cầm tay đời cũ'
    ]
  },
  {
    z: 49, sym: 'In', vi: 'Indi', en: 'Indium', mass: '114.82', fam: 'ks',
    config: '[Kr] 4d¹⁰ 5s² 5p¹', enScale: '1.78', state: 'Rắn, kim loại trắng bạc rất mềm',
    melt: '156.6°C', boil: '2072°C', density: '7.31 g/cm³', disc: '1863 (Reich và Richter)',
    nickname: 'LỚP DẪN ĐIỆN TRONG SUỐT CỦA MÀN HÌNH',
    subQuote: 'Mềm tới mức lấy móng tay rạch được, bẻ thì kêu rắc rắc!',
    hook: 'Mỗi lần chạm màn hình cảm ứng là bạn đang chạm vào một lớp indi.',
    statsHighlight: 'Màng indi thiếc oxit vừa dẫn điện vừa cho ánh sáng xuyên qua — rất hiếm vật liệu làm được cả hai.',
    powerTitle: 'DẪN ĐIỆN MÀ VẪN TRONG SUỐT',
    desc: [
      'Indi thiếc oxit phủ lên kính tạo điện cực trong suốt cho màn hình cảm ứng và pin mặt trời.',
      'Indi vẫn mềm và bám dính tốt ở nhiệt độ rất thấp nên được làm gioăng kín cho thiết bị siêu lạnh.',
      'Hợp kim indi nóng chảy dưới 60 độ, làm cầu chì nhiệt cho thiết bị phòng cháy.'
    ],
    reaction: '2 In + 3 Cl₂ → 2 InCl₃',
    apps: [
      'Lớp điện cực trong suốt của màn hình cảm ứng',
      'Gioăng kín cho thiết bị làm lạnh sâu',
      'Hợp kim hàn nhiệt độ thấp cho linh kiện nhạy nhiệt'
    ]
  },
  {
    z: 52, sym: 'Te', vi: 'Telu', en: 'Tellurium', mass: '127.60', fam: 'ab',
    config: '[Kr] 4d¹⁰ 5s² 5p⁴', enScale: '2.10', state: 'Rắn, á kim trắng bạc giòn',
    melt: '449.5°C', boil: '988°C', density: '6.24 g/cm³', disc: '1782 (Müller von Reichenstein)',
    nickname: 'Á KIM CỦA PIN MẶT TRỜI MÀNG MỎNG',
    subQuote: 'Nuốt vài miligam là hơi thở nồng mùi tỏi suốt nhiều tuần!',
    hook: 'Cơ thể biến telu thành hợp chất bay hơi có mùi tỏi rất dai.',
    statsHighlight: 'Telu hiếm ngang bạch kim trong vỏ Trái Đất, chủ yếu thu hồi từ bùn thải khi tinh luyện đồng.',
    powerTitle: 'BIẾN ÁNH NẮNG THÀNH ĐIỆN VÀ BIẾN NHIỆT THÀNH ĐIỆN',
    desc: [
      'Pin mặt trời cadimi telurua rẻ hơn pin silic, chiếm phần lớn thị trường pin màng mỏng.',
      'Bismut telurua biến chênh lệch nhiệt độ thành dòng điện, dùng trong tủ mát mini không máy nén.',
      'Thêm telu vào thép và đồng giúp phoi dễ gãy, gia công trên máy tiện nhanh hơn hẳn.'
    ],
    reaction: 'Te + O₂ → TeO₂',
    apps: [
      'Tấm pin mặt trời màng mỏng cadimi telurua',
      'Sò nóng lạnh trong tủ mát mini và bộ làm mát chip',
      'Thép và đồng dễ gia công trên máy tiện tự động'
    ]
  }
];
