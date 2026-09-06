/** Đợt 2 — họ Lantan (đất hiếm). Xem khuôn ở scripts/element-data-2.mjs */

export const ROWS = [
  {
    z: 57, sym: 'La', vi: 'Lantan', en: 'Lanthanum', mass: '138.91', fam: 'lt',
    config: '[Xe] 5d¹ 6s²', enScale: '1.10', state: 'Rắn, kim loại trắng bạc mềm',
    melt: '920°C', boil: '3464°C', density: '6.15 g/cm³', disc: '1839 (Carl Gustaf Mosander)',
    nickname: 'NGƯỜI MỞ ĐẦU HỌ ĐẤT HIẾM',
    subQuote: 'Tên nghĩa là "kẻ ẩn mình" vì trốn rất kỹ trong quặng!',
    hook: 'Pin xe hybrid đời đầu chứa hàng ký hợp kim lantan.',
    statsHighlight: 'Hợp kim lantan - niken hút được lượng khí hydro gấp nhiều lần thể tích của nó.',
    powerTitle: 'TRỮ HYDRO CHO PIN VÀ BẺ CONG ÁNH SÁNG TRONG ỐNG KÍNH',
    desc: [
      'Hợp kim lantan - niken là cực âm của pin NiMH, loại pin cho xe hybrid và pin sạc gia dụng.',
      'Thuỷ tinh pha lantan có chiết suất cao mà ít tán sắc, dùng làm ống kính máy ảnh cao cấp.',
      'Lantan oxit làm xúc tác bẻ gãy mạch dầu nặng trong nhà máy lọc dầu.'
    ],
    reaction: '2 La + 6 H₂O → 2 La(OH)₃ + 3 H₂↑',
    apps: [
      'Pin NiMH cho xe hybrid và pin sạc gia dụng',
      'Thấu kính máy ảnh và kính thiên văn cao cấp',
      'Xúc tác cracking trong nhà máy lọc dầu'
    ]
  },
  {
    z: 59, sym: 'Pr', vi: 'Praseodym', en: 'Praseodymium', mass: '140.91', fam: 'lt',
    config: '[Xe] 4f³ 6s²', enScale: '1.13', state: 'Rắn, kim loại trắng bạc mềm',
    melt: '935°C', boil: '3130°C', density: '6.77 g/cm³', disc: '1885 (Carl Auer von Welsbach)',
    nickname: 'SẮC XANH LÁ CỦA KÍNH THỢ HÀN',
    subQuote: 'Tên nghĩa là "song sinh xanh lá" vì hợp chất luôn ánh lục!',
    hook: 'Kính thợ hàn màu xanh lá chính là nhờ praseodym.',
    statsHighlight: 'Kính pha praseodym chặn được ánh vàng chói của kim loại nóng chảy, cứu đôi mắt người thợ.',
    powerTitle: 'CHẶN ÁNH CHÓI VÀ LÀM NAM CHÂM CỰC MẠNH',
    desc: [
      'Kính bảo hộ pha praseodym lọc ánh vàng chói khi hàn và khi thổi thuỷ tinh.',
      'Praseodym đi cùng neodym trong nam châm vĩnh cửu của mô tơ xe điện và loa.',
      'Hợp kim praseodym - niken có hiệu ứng từ nhiệt, giúp đạt tới nhiệt độ gần độ không tuyệt đối.'
    ],
    reaction: '4 Pr + 3 O₂ → 2 Pr₂O₃',
    apps: [
      'Kính bảo hộ cho thợ hàn và thợ thổi thuỷ tinh',
      'Nam châm vĩnh cửu trong mô tơ và loa',
      'Tạo sắc vàng đặc trưng cho men gốm sứ'
    ]
  },
  {
    z: 61, sym: 'Pm', vi: 'Promethi', en: 'Promethium', mass: '145', fam: 'lt',
    config: '[Xe] 4f⁵ 6s²', enScale: '1.13', state: 'Rắn, kim loại phóng xạ',
    melt: '1042°C', boil: '3000°C', density: '7.26 g/cm³', disc: '1945 (Marinsky, Glendenin, Coryell)',
    nickname: 'ĐẤT HIẾM KHÔNG CÓ SẴN TRONG THIÊN NHIÊN',
    subQuote: 'Cả vỏ Trái Đất chỉ có chừng vài trăm gam tồn tại cùng lúc!',
    hook: 'Promethi mang tên thần Prometheus, người trộm lửa cho loài người.',
    statsHighlight: 'Không có đồng vị bền nào; đồng vị sống dai nhất cũng chỉ 17.7 năm là rã mất một nửa.',
    powerTitle: 'PHÁT SÁNG LIÊN TỤC VÀ LÀM PIN NGUYÊN TỬ TÍ HON',
    desc: [
      'Promethi phát tia bêta làm chất lân quang sáng lên, từng dùng cho mặt số đồng hồ dạ quang.',
      'Pin nguyên tử promethi cho dòng rất nhỏ nhưng chạy liên tục nhiều năm không cần thay.',
      'Nguồn promethi còn dùng đo bề dày giấy và màng nhựa ngay trên dây chuyền đang chạy.'
    ],
    reaction: '¹⁴⁷Pm → ¹⁴⁷Sm + β⁻  (bán rã 2.62 năm)',
    reactionLabel: 'PHẢN ỨNG PHÂN RÃ PHÓNG XẠ',
    apps: [
      'Nguồn sáng dạ quang cho mặt số đồng hồ đời cũ',
      'Pin nguyên tử cho thiết bị đo ở nơi không có điện',
      'Máy đo bề dày giấy và màng nhựa trên dây chuyền'
    ]
  },
  {
    z: 62, sym: 'Sm', vi: 'Samari', en: 'Samarium', mass: '150.36', fam: 'lt',
    config: '[Xe] 4f⁶ 6s²', enScale: '1.17', state: 'Rắn, kim loại trắng bạc',
    melt: '1072°C', boil: '1900°C', density: '7.52 g/cm³', disc: '1879 (Lecoq de Boisbaudran)',
    nickname: 'NAM CHÂM CHỊU NÓNG CỦA ĐỘNG CƠ',
    subQuote: 'Nam châm samari vẫn khoẻ ở 350°C, nơi nam châm thường mất từ!',
    hook: 'Đây là nguyên tố đầu tiên được đặt tên theo một người đang sống.',
    statsHighlight: 'Nam châm samari - coban giữ được từ tính tới khoảng 350 độ, cao hơn hẳn nam châm neodym.',
    powerTitle: 'GIỮ TỪ TÍNH Ở NHIỆT ĐỘ CAO',
    desc: [
      'Nam châm samari - coban dùng cho động cơ máy bay, tên lửa và mô tơ làm việc trong lò nóng.',
      'Samari hút nơtron mạnh nên góp mặt trong thanh điều khiển của lò phản ứng hạt nhân.',
      'Đồng vị samari-153 gắn vào thuốc giúp giảm đau cho bệnh nhân ung thư di căn xương.'
    ],
    reaction: '2 Sm + 6 HCl → 2 SmCl₃ + 3 H₂↑',
    apps: [
      'Nam châm chịu nhiệt cho động cơ hàng không',
      'Thanh điều khiển hấp thụ nơtron trong lò phản ứng',
      'Thuốc phóng xạ giảm đau ung thư di căn xương'
    ]
  },
  {
    z: 63, sym: 'Eu', vi: 'Europi', en: 'Europium', mass: '151.96', fam: 'lt',
    config: '[Xe] 4f⁷ 6s²', enScale: '1.20', state: 'Rắn, kim loại mềm, phải ngâm trong dầu',
    melt: '822°C', boil: '1529°C', density: '5.24 g/cm³', disc: '1901 (Eugène-Anatole Demarçay)',
    nickname: 'MỰC CHỐNG GIẢ TRÊN TỜ TIỀN EURO',
    subQuote: 'Soi đèn cực tím vào tờ euro, những đốm đỏ sáng lên là europi!',
    hook: 'Europi mềm nhất và hoạt động hoá học mạnh nhất trong họ đất hiếm.',
    statsHighlight: 'Europi mềm như chì và phản ứng ngay với nước ở nhiệt độ thường, phải bảo quản trong dầu.',
    powerTitle: 'PHÁT MÀU ĐỎ VÀ XANH DƯỚI TIA CỰC TÍM',
    desc: [
      'Hợp chất europi hoá trị ba phát đỏ, hoá trị hai phát xanh lam, làm nền cho bột huỳnh quang.',
      'Đèn LED trắng dùng bột europi để ánh sáng bớt xanh, ấm lại gần giống ánh nắng tự nhiên.',
      'Mực in chứa europi sáng lên dưới tia cực tím, làm dấu chống giả trên tờ tiền euro.'
    ],
    reaction: '2 Eu + 6 H₂O → 2 Eu(OH)₃ + 3 H₂↑',
    apps: [
      'Bột huỳnh quang đỏ và xanh cho đèn LED trắng',
      'Mực chống giả in trên tiền giấy',
      'Màn hình và đèn nền thế hệ trước'
    ]
  },
  {
    z: 64, sym: 'Gd', vi: 'Gadolini', en: 'Gadolinium', mass: '157.25', fam: 'lt',
    config: '[Xe] 4f⁷ 5d¹ 6s²', enScale: '1.20', state: 'Rắn, kim loại trắng bạc',
    melt: '1312°C', boil: '3273°C', density: '7.90 g/cm³', disc: '1880 (Jean Charles de Marignac)',
    nickname: 'THUỐC CẢN QUANG CỦA MÁY CHỤP MRI',
    subQuote: 'Tiêm gadolini vào mạch, khối u hiện rõ trên ảnh cộng hưởng từ!',
    hook: 'Gadolini hút nơtron mạnh nhất trong tất cả các nguyên tố bền.',
    statsHighlight: 'Gadolini-157 bắt nơtron giỏi nhất trong mọi nguyên tố bền mà con người biết tới.',
    powerTitle: 'LÀM RÕ ẢNH CHỤP MRI VÀ HÚT NƠTRON MẠNH NHẤT',
    desc: [
      'Phức chất gadolini làm mô bệnh sáng lên trên ảnh cộng hưởng từ, giúp phát hiện khối u sớm.',
      'Nhờ bắt nơtron cực giỏi, gadolini được dùng che chắn và điều khiển lò phản ứng hạt nhân.',
      'Gadolini nóng lên khi vào từ trường và lạnh đi khi ra, đó là nguyên lý của tủ lạnh từ.'
    ],
    reaction: '4 Gd + 3 O₂ → 2 Gd₂O₃',
    apps: [
      'Thuốc cản quang tiêm khi chụp cộng hưởng từ',
      'Vật liệu che chắn nơtron trong lò phản ứng',
      'Tủ lạnh từ không cần môi chất lạnh'
    ]
  },
  {
    z: 65, sym: 'Tb', vi: 'Terbi', en: 'Terbium', mass: '158.93', fam: 'lt',
    config: '[Xe] 4f⁹ 6s²', enScale: '1.20', state: 'Rắn, kim loại trắng bạc dẻo',
    melt: '1356°C', boil: '3230°C', density: '8.23 g/cm³', disc: '1843 (Carl Gustaf Mosander)',
    nickname: 'KIM LOẠI BIẾN HÌNH THEO TỪ TRƯỜNG',
    subQuote: 'Hợp kim terbi dài ra khi gặp từ trường, biến mặt bàn thành loa!',
    hook: 'Terbi cho màu xanh lá trong bột huỳnh quang ba màu.',
    statsHighlight: 'Hợp kim Terfenol-D chứa terbi giãn dài mạnh nhất trong các vật liệu từ giảo đang dùng.',
    powerTitle: 'GIÃN NỞ THEO TỪ TRƯỜNG VÀ PHÁT MÀU XANH LÁ',
    desc: [
      'Hợp kim Terfenol-D co giãn theo từ trường, biến cả một mặt phẳng cứng thành màng phát âm.',
      'Terbi cho màu xanh lá trong bột huỳnh quang ba màu của đèn compact và đèn LED.',
      'Thêm terbi vào nam châm neodym để mô tơ xe điện chịu được nhiệt độ cao hơn.'
    ],
    reaction: '4 Tb + 3 O₂ → 2 Tb₂O₃',
    apps: [
      'Loa rung biến mặt phẳng thành màng phát âm',
      'Bột huỳnh quang xanh lá cho đèn tiết kiệm điện',
      'Phụ gia cho nam châm mô tơ xe điện chịu nhiệt'
    ]
  },
  {
    z: 66, sym: 'Dy', vi: 'Dysprosi', en: 'Dysprosium', mass: '162.50', fam: 'lt',
    config: '[Xe] 4f¹⁰ 6s²', enScale: '1.22', state: 'Rắn, kim loại ánh bạc',
    melt: '1407°C', boil: '2562°C', density: '8.55 g/cm³', disc: '1886 (Lecoq de Boisbaudran)',
    nickname: 'CHÌA KHOÁ GIỮ NHIỆT CHO MÔ TƠ XE ĐIỆN',
    subQuote: 'Tên nghĩa là "khó với tới" vì cực khó tách khỏi quặng!',
    hook: 'Thiếu dysprosi thì mô tơ xe điện mất lực ngay khi chạy nóng.',
    statsHighlight: 'Chỉ vài phần trăm dysprosi giúp nam châm neodym chịu thêm hàng chục độ mà không mất từ.',
    powerTitle: 'GIỮ TỪ TÍNH CHO NAM CHÂM KHI ĐỘNG CƠ NÓNG LÊN',
    desc: [
      'Thêm dysprosi vào nam châm neodym để mô tơ xe điện và tuabin gió không yếu đi khi nóng.',
      'Dysprosi hấp thụ nơtron tốt nên có mặt trong thanh điều khiển của lò phản ứng hạt nhân.',
      'Vì quá quan trọng mà nguồn cung ít, dysprosi nằm trong danh sách nguyên liệu chiến lược.'
    ],
    reaction: '2 Dy + 6 HCl → 2 DyCl₃ + 3 H₂↑',
    apps: [
      'Nam châm chịu nhiệt cho mô tơ xe điện và tuabin gió',
      'Thanh điều khiển trong lò phản ứng hạt nhân',
      'Vật liệu từ giảo trong cảm biến và bộ truyền động'
    ]
  },
  {
    z: 67, sym: 'Ho', vi: 'Holmi', en: 'Holmium', mass: '164.93', fam: 'lt',
    config: '[Xe] 4f¹¹ 6s²', enScale: '1.23', state: 'Rắn, kim loại trắng bạc mềm',
    melt: '1461°C', boil: '2600°C', density: '8.80 g/cm³', disc: '1878 (Cleve, Soret và Delafontaine)',
    nickname: 'NGƯỜI GIỮ KỶ LỤC TỪ TRƯỜNG MẠNH NHẤT',
    subQuote: 'Lõi holmi tạo ra từ trường mạnh nhất mà con người làm được!',
    hook: 'Laser holmi tán vỡ sỏi thận mà không phải mổ.',
    statsHighlight: 'Holmi có mômen từ lớn nhất trong mọi nguyên tố, nên được chọn làm lõi nam châm mạnh nhất.',
    powerTitle: 'TẠO TỪ TRƯỜNG CỰC MẠNH VÀ LASER TÁN SỎI',
    desc: [
      'Lõi holmi giúp nam châm phòng thí nghiệm đạt từ trường mạnh nhất từng ghi nhận được.',
      'Laser holmi phát bước sóng bị nước hút mạnh, dùng tán sỏi thận và mổ ít chảy máu.',
      'Holmi oxit cho thuỷ tinh màu vàng và làm mẫu chuẩn hiệu chuẩn máy quang phổ.'
    ],
    reaction: '4 Ho + 3 O₂ → 2 Ho₂O₃',
    apps: [
      'Laser y tế tán sỏi thận và mổ nội soi',
      'Lõi nam châm cho phòng thí nghiệm từ trường cao',
      'Kính chuẩn hiệu chuẩn cho máy quang phổ'
    ]
  },
  {
    z: 68, sym: 'Er', vi: 'Erbi', en: 'Erbium', mass: '167.26', fam: 'lt',
    config: '[Xe] 4f¹² 6s²', enScale: '1.24', state: 'Rắn, kim loại trắng bạc',
    melt: '1529°C', boil: '2868°C', density: '9.07 g/cm³', disc: '1843 (Carl Gustaf Mosander)',
    nickname: 'TRẠM TIẾP SỨC CỦA CÁP QUANG BIỂN',
    subQuote: 'Không có erbi thì Internet không vượt nổi đại dương!',
    hook: 'Cứ mỗi chặng cáp quang biển lại có một đoạn sợi pha erbi.',
    statsHighlight: 'Sợi quang pha erbi khuếch đại thẳng tín hiệu ánh sáng, không phải đổi sang tín hiệu điện.',
    powerTitle: 'KHUẾCH ĐẠI ÁNH SÁNG TRONG SỢI CÁP QUANG',
    desc: [
      'Bộ khuếch đại sợi quang pha erbi làm tín hiệu mạnh trở lại sau mỗi chặng dài dưới đáy biển.',
      'Laser erbi có bước sóng an toàn cho mắt, dùng trong máy đo xa và máy trẻ hoá da.',
      'Erbi oxit cho thuỷ tinh và men gốm màu hồng phớt rất đặc trưng.'
    ],
    reaction: '4 Er + 3 O₂ → 2 Er₂O₃',
    apps: [
      'Bộ khuếch đại quang trong cáp quang vượt đại dương',
      'Laser an toàn cho mắt trong máy đo khoảng cách',
      'Thuỷ tinh và men gốm màu hồng'
    ]
  },
  {
    z: 69, sym: 'Tm', vi: 'Tuli', en: 'Thulium', mass: '168.93', fam: 'lt',
    config: '[Xe] 4f¹³ 6s²', enScale: '1.25', state: 'Rắn, kim loại xám ánh bạc',
    melt: '1545°C', boil: '1950°C', density: '9.32 g/cm³', disc: '1879 (Per Teodor Cleve)',
    nickname: 'ĐẤT HIẾM HIẾM NHẤT TRONG TỰ NHIÊN',
    subQuote: 'Hiếm nhất họ đất hiếm, chỉ trên mỗi promethi nhân tạo!',
    hook: 'Nguồn tia X xách tay chạy bằng tuli, không cần một chút điện nào.',
    statsHighlight: 'Tuli là đất hiếm ít gặp nhất trong vỏ Trái Đất, nên giá luôn ở mức cao.',
    powerTitle: 'PHÁT TIA X MÀ KHÔNG CẦN ĐIỆN',
    desc: [
      'Đồng vị tuli-170 phát tia X, làm nguồn chụp kiểm tra mối hàn ở nơi không kéo được điện.',
      'Laser tuli mổ nội soi tuyến tiền liệt, cầm máu tốt vì nước hút mạnh bước sóng này.',
      'Tuli cho ánh xanh lam trong bột phát sáng chống giả trên tờ tiền euro.'
    ],
    reaction: '4 Tm + 3 O₂ → 2 Tm₂O₃',
    apps: [
      'Nguồn tia X xách tay kiểm tra mối hàn ngoài hiện trường',
      'Laser mổ nội soi ít chảy máu',
      'Bột phát sáng chống giả trên tiền giấy'
    ]
  },
  {
    z: 70, sym: 'Yb', vi: 'Ytterbi', en: 'Ytterbium', mass: '173.05', fam: 'lt',
    config: '[Xe] 4f¹⁴ 6s²', enScale: '1.10', state: 'Rắn, kim loại sáng bóng dẻo',
    melt: '824°C', boil: '1196°C', density: '6.90 g/cm³', disc: '1878 (Jean Charles de Marignac)',
    nickname: 'TRÁI TIM CỦA ĐỒNG HỒ CHÍNH XÁC NHẤT',
    subQuote: 'Đồng hồ ytterbi sai chưa tới một giây sau hàng tỉ năm!',
    hook: 'Ytterbi đang được dùng để định nghĩa lại đơn vị giây.',
    statsHighlight: 'Đồng hồ quang học ytterbi có sai số nhỏ tới mức phải tính bằng phần tỉ của tỉ.',
    powerTitle: 'ĐO THỜI GIAN CHÍNH XÁC NHẤT VÀ CẮT KIM LOẠI BẰNG LASER',
    desc: [
      'Đồng hồ mạng quang học dùng nguyên tử ytterbi là đồng hồ chính xác nhất con người từng chế tạo.',
      'Sợi quang pha ytterbi tạo laser công suất lớn để cắt và hàn kim loại trong nhà máy.',
      'Điện trở ytterbi tăng theo áp suất nên nó làm cảm biến đo ứng suất trong lòng đất.'
    ],
    reaction: '2 Yb + 6 HCl → 2 YbCl₃ + 3 H₂↑',
    apps: [
      'Đồng hồ nguyên tử quang học chính xác nhất thế giới',
      'Laser sợi quang cắt và hàn kim loại công nghiệp',
      'Cảm biến đo ứng suất và áp suất trong lòng đất'
    ]
  }
];
