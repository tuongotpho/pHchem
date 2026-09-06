/**
 * Đợt 3 — kim loại nặng chịu nhiệt và nhóm phóng xạ tự nhiên.
 *
 * Với nguyên tố phóng xạ, khung "phản ứng tiêu biểu" đổi thành phản ứng
 * phân rã thật (reactionLabel), và nếu chưa có ứng dụng đại trà thì nói
 * thẳng ra ở mục ứng dụng chứ không bịa.
 */

export const ROWS = [
  {
    z: 71, sym: 'Lu', vi: 'Luteti', en: 'Lutetium', mass: '174.97', fam: 'lt',
    config: '[Xe] 4f¹⁴ 5d¹ 6s²', enScale: '1.27', state: 'Rắn, kim loại trắng bạc cứng',
    melt: '1652°C', boil: '3402°C', density: '9.84 g/cm³', disc: '1907 (Urbain, von Welsbach, James)',
    nickname: 'ĐẤT HIẾM CỨNG NHẤT VÀ ĐẮT NHẤT',
    subQuote: 'Cứng nhất, nặng nhất và đắt nhất trong cả họ đất hiếm!',
    hook: 'Luteti giúp máy PET nhìn ra khối u nhỏ hơn hạt gạo.',
    statsHighlight: 'Tinh thể chứa luteti bắt tia gamma vừa nhanh vừa sáng, làm nên đầu dò của máy chụp PET.',
    powerTitle: 'BẮT TIA GAMMA CHO MÁY CHỤP PET',
    desc: [
      'Tinh thể luteti trong máy PET biến tia gamma thành chớp sáng để dựng ảnh khối u trong cơ thể.',
      'Thuốc phóng xạ luteti-177 bám đúng tế bào ung thư rồi bắn tia bêta tiêu diệt ngay tại chỗ.',
      'Cặp luteti - hafni còn được dùng để đo tuổi của đá cổ và thiên thạch.'
    ],
    reaction: '4 Lu + 3 O₂ → 2 Lu₂O₃',
    apps: [
      'Tinh thể đầu dò trong máy chụp cắt lớp PET',
      'Thuốc phóng xạ điều trị ung thư tuyến tiền liệt',
      'Xác định tuổi của đá cổ và thiên thạch'
    ]
  },
  {
    z: 72, sym: 'Hf', vi: 'Hafni', en: 'Hafnium', mass: '178.49', fam: 'ct',
    config: '[Xe] 4f¹⁴ 5d² 6s²', enScale: '1.30', state: 'Rắn, kim loại xám ánh bạc',
    melt: '2233°C', boil: '4603°C', density: '13.31 g/cm³', disc: '1923 (Coster và Hevesy)',
    nickname: 'ANH EM SONG SINH NGƯỢC ĐỜI CỦA ZIRCONI',
    subQuote: 'Giống zirconi tới mức khó tách, nhưng lại chặn nơtron ngược hẳn!',
    hook: 'Zirconi cho nơtron đi qua, còn hafni thì chặn đứng.',
    statsHighlight: 'Hafni hút nơtron mạnh hơn zirconi hàng trăm lần, dù hai nguyên tố giống nhau như đúc.',
    powerTitle: 'CHẶN NƠTRON TRONG LÒ PHẢN ỨNG TÀU NGẦM',
    desc: [
      'Thanh điều khiển hafni được chọn cho lò phản ứng tàu ngầm hạt nhân vì chặn nơtron rất tốt.',
      'Lớp hafni oxit siêu mỏng thay lớp cách điện cũ trong chip, giúp thu nhỏ bóng bán dẫn.',
      'Hafni cacbua là một trong những vật liệu chịu nhiệt cao nhất, nóng chảy trên 3900 độ.'
    ],
    reaction: 'Hf + O₂ → HfO₂',
    apps: [
      'Thanh điều khiển lò phản ứng trên tàu ngầm hạt nhân',
      'Lớp cách điện siêu mỏng trong chip vi xử lý',
      'Hợp kim chịu nhiệt cho vòi phun động cơ tên lửa'
    ]
  },
  {
    z: 73, sym: 'Ta', vi: 'Tantan', en: 'Tantalum', mass: '180.95', fam: 'ct',
    config: '[Xe] 4f¹⁴ 5d³ 6s²', enScale: '1.50', state: 'Rắn, kim loại xám ánh xanh rất dẻo',
    melt: '3017°C', boil: '5458°C', density: '16.65 g/cm³', disc: '1802 (Anders Gustaf Ekeberg)',
    nickname: 'KIM LOẠI CƠ THỂ NGƯỜI KHÔNG CHỐI BỎ',
    subQuote: 'Cấy vào xương cả đời mà cơ thể vẫn không đào thải!',
    hook: 'Gần như mọi chiếc điện thoại đều có một tụ tantan tí hon bên trong.',
    statsHighlight: 'Tantan gần như trơ với dịch cơ thể, nên được làm đinh vít xương và tấm vá hộp sọ.',
    powerTitle: 'TÍCH ĐIỆN TRONG TỤ TÍ HON VÀ HOÀ HỢP VỚI CƠ THỂ',
    desc: [
      'Tụ tantan trữ nhiều điện trong thể tích rất nhỏ, nhờ vậy điện thoại mới mỏng được như bây giờ.',
      'Tantan không bị dịch cơ thể ăn mòn nên làm đinh vít xương, tấm vá hộp sọ và lưới phẫu thuật.',
      'Quặng tantan nằm trong danh sách khoáng sản xung đột, nguồn gốc bị kiểm soát rất chặt.'
    ],
    reaction: '4 Ta + 5 O₂ → 2 Ta₂O₅',
    apps: [
      'Tụ điện tantan trong điện thoại và máy tính',
      'Đinh vít xương và tấm vá hộp sọ trong phẫu thuật',
      'Thiết bị lò phản ứng hoá học chịu ăn mòn mạnh'
    ]
  },
  {
    z: 75, sym: 'Re', vi: 'Reni', en: 'Rhenium', mass: '186.21', fam: 'ct',
    config: '[Xe] 4f¹⁴ 5d⁵ 6s²', enScale: '1.90', state: 'Rắn, kim loại trắng bạc nặng',
    melt: '3186°C', boil: '5596°C', density: '21.02 g/cm³', disc: '1925 (Noddack, Tacke, Berg)',
    nickname: 'NGUYÊN TỐ BỀN CUỐI CÙNG ĐƯỢC TÌM RA',
    subQuote: 'Nóng chảy cao thứ ba và là nguyên tố bền cuối cùng loài người tìm thấy!',
    hook: 'Cánh tuabin động cơ phản lực không thể thiếu reni.',
    statsHighlight: 'Nóng chảy ở 3186 độ, chỉ đứng sau wolfram trong các kim loại.',
    powerTitle: 'GIỮ CÁNH TUABIN KHÔNG CHẢY TRONG LUỒNG LỬA',
    desc: [
      'Siêu hợp kim chứa reni giúp cánh tuabin động cơ phản lực chịu được luồng khí cháy cực nóng.',
      'Xúc tác reni - bạch kim nâng chỉ số octan của xăng ngay trong nhà máy lọc dầu.',
      'Reni thuộc nhóm kim loại hiếm nhất vỏ Trái Đất, chủ yếu thu lại từ khói lò luyện molypden.'
    ],
    reaction: '4 Re + 7 O₂ → 2 Re₂O₇',
    apps: [
      'Cánh tuabin động cơ phản lực và động cơ tên lửa',
      'Xúc tác nâng chỉ số octan cho xăng',
      'Cặp nhiệt điện đo nhiệt độ trên 2000 độ'
    ]
  },
  {
    z: 77, sym: 'Ir', vi: 'Iridi', en: 'Iridium', mass: '192.22', fam: 'ct',
    config: '[Xe] 4f¹⁴ 5d⁷ 6s²', enScale: '2.20', state: 'Rắn, kim loại trắng bạc rất cứng và giòn',
    melt: '2446°C', boil: '4428°C', density: '22.56 g/cm³', disc: '1803 (Smithson Tennant)',
    nickname: 'DẤU VẾT CỦA VỤ TUYỆT CHỦNG KHỦNG LONG',
    subQuote: 'Lớp iridi mỏng trong đất đá là bằng chứng thiên thạch diệt khủng long!',
    hook: 'Iridi chống ăn mòn tốt nhất trong mọi kim loại đã biết.',
    statsHighlight: 'Iridi đặc thứ nhì trong các nguyên tố, mỗi lít nặng tới 22.56 ki lô gam.',
    powerTitle: 'CHỐNG ĂN MÒN TỐT NHẤT VÀ GHI DẤU THẢM HOẠ THIÊN THẠCH',
    desc: [
      'Iridi không bị axit nào ăn mòn, kể cả nước cường toan, nên làm chén nung tinh thể ở 2000 độ.',
      'Lớp đất giàu iridi trải khắp thế giới ở mốc 66 triệu năm là bằng chứng của cú va chạm thiên thạch.',
      'Đầu bugi iridi mòn rất chậm, giúp xe chạy hàng trăm nghìn ki lô mét mới phải thay.'
    ],
    reaction: 'Ir + O₂ → IrO₂  (ở nhiệt độ cao)',
    apps: [
      'Đầu bugi iridi cho ô tô và xe máy',
      'Chén nung nuôi tinh thể ở nhiệt độ trên 2000 độ',
      'Đầu bút máy và tiếp điểm chịu mài mòn'
    ]
  },
  {
    z: 84, sym: 'Po', vi: 'Poloni', en: 'Polonium', mass: '209', fam: 'ks',
    config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', enScale: '2.00', state: 'Rắn, kim loại phóng xạ tự nung nóng',
    melt: '254°C', boil: '962°C', density: '9.20 g/cm³', disc: '1898 (Marie và Pierre Curie)',
    nickname: 'NGUYÊN TỐ MANG TÊN QUÊ HƯƠNG MARIE CURIE',
    subQuote: 'Một gam poloni toả tới 140 oát nhiệt, tự nung mình nóng đỏ!',
    hook: 'Marie Curie đặt tên nguyên tố này theo Ba Lan, quê hương của bà.',
    statsHighlight: 'Một gam poloni-210 toả ra khoảng 140 oát nhiệt, đủ tự nung chính nó phát sáng.',
    powerTitle: 'TOẢ NHIỆT CỰC MẠNH VÀ ĐỘC BẬC NHẤT',
    desc: [
      'Poloni-210 phát tia anpha rất mạnh, chỉ một lượng cực nhỏ nuốt vào cũng gây chết người.',
      'Nhiệt tự toả của poloni từng dùng sưởi ấm thiết bị tàu vũ trụ trong đêm lạnh trên Mặt Trăng.',
      'Nguồn poloni khử tĩnh điện trên dây chuyền in và dệt, nay đã bị siết chặt vì quá độc.'
    ],
    reaction: '²¹⁰Po → ²⁰⁶Pb + α  (bán rã 138 ngày)',
    reactionLabel: 'PHẢN ỨNG PHÂN RÃ PHÓNG XẠ',
    apps: [
      'Nguồn sưởi cho thiết bị thăm dò vũ trụ',
      'Bộ khử tĩnh điện trên dây chuyền công nghiệp',
      'Nguồn nơtron khi trộn cùng beryli'
    ]
  },
  {
    z: 85, sym: 'At', vi: 'Astatin', en: 'Astatine', mass: '210', fam: 'ha',
    config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', enScale: '2.20', state: 'Chưa ai quan sát được ở dạng khối',
    melt: '302°C', boil: '337°C', density: 'Chưa xác định', disc: '1940 (Corson, MacKenzie, Segrè)',
    nickname: 'NGUYÊN TỐ HIẾM NHẤT TRÊN TRÁI ĐẤT',
    subQuote: 'Cả vỏ Trái Đất chỉ có chừng vài chục gam tồn tại cùng lúc!',
    hook: 'Chưa ai từng nhìn thấy astatin bằng mắt thường.',
    statsHighlight: 'Astatin phóng xạ mạnh tới mức tự bốc hơi vì nhiệt của chính nó, không ai gom nổi một mẩu.',
    powerTitle: 'HALOGEN NẶNG NHẤT VÀ ĐANG THÀNH THUỐC TRỊ UNG THƯ',
    desc: [
      'Astatin là halogen nặng nhất và đã bắt đầu mang tính kim loại chứ không còn là phi kim thuần.',
      'Astatin-211 bắn tia anpha đi rất ngắn, đang thử nghiệm diệt tế bào ung thư mà ít hại mô lành.',
      'Bán rã chỉ hơn 7 giờ nên phải điều chế ngay tại chỗ, sát giờ dùng cho bệnh nhân.'
    ],
    reaction: '²¹¹At → ²⁰⁷Bi + α  (bán rã 7.2 giờ)',
    reactionLabel: 'PHẢN ỨNG PHÂN RÃ PHÓNG XẠ',
    appsLabel: 'HIỆN ĐƯỢC DÙNG VÀO VIỆC GÌ',
    appsTitle: 'ASTATIN DÙNG LÀM GÌ?',
    apps: [
      'Thử nghiệm lâm sàng thuốc trị ung thư bằng tia anpha',
      'Nghiên cứu tính chất hoá học của các halogen nặng',
      'Chưa có ứng dụng đại trà vì quá hiếm và bán rã quá nhanh'
    ]
  },
  {
    z: 89, sym: 'Ac', vi: 'Actini', en: 'Actinium', mass: '227', fam: 'ac',
    config: '[Rn] 6d¹ 7s²', enScale: '1.10', state: 'Rắn, kim loại phóng xạ phát sáng xanh',
    melt: '1050°C', boil: '3200°C', density: '10.07 g/cm³', disc: '1899 (André-Louis Debierne)',
    nickname: 'NGUYÊN TỐ TỰ PHÁT SÁNG XANH TRONG ĐÊM',
    subQuote: 'Phóng xạ mạnh tới mức tự phát ánh sáng xanh nhạt trong bóng tối!',
    hook: 'Actini phóng xạ mạnh gấp khoảng 150 lần radi.',
    statsHighlight: 'Actini ion hoá không khí quanh nó, tạo quầng sáng xanh nhìn thấy được trong tối.',
    powerTitle: 'MỞ ĐẦU HỌ ACTINI VÀ BẮN TIA ANPHA TRỊ UNG THƯ',
    desc: [
      'Actini là nguyên tố mở đầu họ actini, nhóm nguyên tố phóng xạ nặng của bảng tuần hoàn.',
      'Actini-225 gắn vào thuốc nhắm trúng đích, bắn tia anpha diệt tế bào ung thư ở cự ly vài tế bào.',
      'Trộn cùng beryli, actini tạo nguồn nơtron cho máy dò khoáng sản dưới lòng đất.'
    ],
    reaction: '²²⁷Ac → ²²⁷Th + β⁻  (bán rã 21.8 năm)',
    reactionLabel: 'PHẢN ỨNG PHÂN RÃ PHÓNG XẠ',
    apps: [
      'Thuốc phóng xạ nhắm trúng đích điều trị ung thư',
      'Nguồn nơtron cho máy dò khoáng sản',
      'Nghiên cứu hoá học của nguyên tố siêu nặng'
    ]
  },
  {
    z: 90, sym: 'Th', vi: 'Thori', en: 'Thorium', mass: '232.04', fam: 'ac',
    config: '[Rn] 6d² 7s²', enScale: '1.30', state: 'Rắn, kim loại trắng bạc mềm',
    melt: '1750°C', boil: '4788°C', density: '11.72 g/cm³', disc: '1829 (Jöns Jacob Berzelius)',
    nickname: 'NHIÊN LIỆU HẠT NHÂN CỦA TƯƠNG LAI',
    subQuote: 'Trong vỏ Trái Đất, thori nhiều gấp ba lần urani!',
    hook: 'Măng xông đèn khí ngày xưa sáng trắng chính là nhờ thori.',
    statsHighlight: 'Thori nhiều gấp khoảng ba lần urani, và gần như toàn bộ đều biến thành nhiên liệu được.',
    powerTitle: 'BIẾN THÀNH NHIÊN LIỆU HẠT NHÂN VÀ PHÁT ÁNH SÁNG TRẮNG',
    desc: [
      'Thori hút nơtron rồi biến thành urani-233 cháy được trong lò, nên được coi là nhiên liệu tương lai.',
      'Chu trình thori sinh ít chất thải sống lâu hơn chu trình urani và khó dùng chế vũ khí hơn.',
      'Măng xông đèn măng sông chứa thori oxit phát ánh sáng trắng rực khi bị ngọn lửa nung nóng.'
    ],
    reaction: '²³²Th + n → ²³³Th → ²³³Pa → ²³³U',
    reactionLabel: 'CHU TRÌNH NHIÊN LIỆU THORI',
    apps: [
      'Nhiên liệu cho lò phản ứng muối nóng chảy thế hệ mới',
      'Măng xông đèn khí và đèn măng sông đời cũ',
      'Hợp kim magie chịu nhiệt cho động cơ máy bay'
    ]
  },
  {
    z: 91, sym: 'Pa', vi: 'Protactini', en: 'Protactinium', mass: '231.04', fam: 'ac',
    config: '[Rn] 5f² 6d¹ 7s²', enScale: '1.50', state: 'Rắn, kim loại xám ánh bạc phóng xạ',
    melt: '1568°C', boil: '4027°C', density: '15.37 g/cm³', disc: '1913 (Fajans, Göhring, Hahn, Meitner)',
    nickname: 'CHIẾC ĐỒNG HỒ ĐO TUỔI ĐÁY BIỂN',
    subQuote: 'Muốn có 125 gam phải xử lý tới 60 tấn chất thải quặng!',
    hook: 'Protactini nằm trong nhóm nguyên tố tự nhiên đắt đỏ nhất.',
    statsHighlight: 'Năm 1961 người ta phải xử lý 60 tấn chất thải mới thu được vỏn vẹn 125 gam protactini.',
    powerTitle: 'ĐO TUỔI TRẦM TÍCH ĐÁY BIỂN VÀ SAN HÔ',
    desc: [
      'Tỉ lệ protactini so với thori trong trầm tích cho biết lớp bùn đáy biển đã lắng bao nhiêu năm.',
      'Protactini là mắt xích trong chuỗi phân rã của urani, cứ sinh ra rồi lại rã đi liên tục.',
      'Vì cực hiếm, cực độc và phóng xạ mạnh, protactini gần như chỉ nằm trong phòng thí nghiệm.'
    ],
    reaction: '²³¹Pa → ²²⁷Ac + α  (bán rã 32760 năm)',
    reactionLabel: 'PHẢN ỨNG PHÂN RÃ PHÓNG XẠ',
    appsLabel: 'HIỆN ĐƯỢC DÙNG VÀO VIỆC GÌ',
    appsTitle: 'PROTACTINI DÙNG LÀM GÌ?',
    apps: [
      'Xác định niên đại trầm tích đáy biển và san hô cổ',
      'Nghiên cứu chuỗi phân rã phóng xạ của urani',
      'Chưa có ứng dụng công nghiệp vì quá hiếm và quá độc'
    ]
  }
];
