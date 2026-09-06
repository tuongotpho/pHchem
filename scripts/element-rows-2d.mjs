/**
 * Đợt 4 — actini nhân tạo (Np 93 đến Db 105).
 * Nguyên tắc: nguyên tố nào chưa có ứng dụng ngoài phòng thí nghiệm thì
 * ghi thẳng như vậy ở mục thứ ba, không bịa ứng dụng cho đủ ba dòng.
 */

export const ROWS = [
  {
    z: 93, sym: 'Np', vi: 'Neptuni', en: 'Neptunium', mass: '237', fam: 'ac',
    config: '[Rn] 5f⁴ 6d¹ 7s²', enScale: '1.36', state: 'Rắn, kim loại bạc phóng xạ',
    melt: '644°C', boil: '3902°C', density: '20.45 g/cm³', disc: '1940 (McMillan và Abelson)',
    nickname: 'NGUYÊN TỐ ĐẦU TIÊN VƯỢT QUA URANI',
    subQuote: 'Urani mang tên sao Thiên Vương, nên nó lấy tên sao Hải Vương!',
    hook: 'Đây là nguyên tố nhân tạo đầu tiên nằm sau urani trong bảng tuần hoàn.',
    statsHighlight: 'Neptuni-237 sống tới 2.14 triệu năm, là đồng vị dai nhất của nguyên tố này.',
    powerTitle: 'MỞ ĐƯỜNG CHO CẢ DÃY NGUYÊN TỐ SAU URANI',
    desc: [
      'Neptuni là nguyên tố nhân tạo đầu tiên nằm sau urani, mở ra cả một dãy nguyên tố mới.',
      'Neptuni-237 là nguyên liệu chế tạo plutoni-238, thứ cấp điện cho tàu thăm dò vũ trụ.',
      'Nó cũng được làm đầu dò nơtron năng lượng cao trong phòng thí nghiệm hạt nhân.'
    ],
    reaction: '²³⁸U + n → ²³⁹U → ²³⁹Np + β⁻',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    apps: [
      'Nguyên liệu chế tạo plutoni-238 cho tàu vũ trụ',
      'Đầu dò nơtron năng lượng cao',
      'Thành phần phải xử lý trong chất thải hạt nhân'
    ]
  },
  {
    z: 95, sym: 'Am', vi: 'Americi', en: 'Americium', mass: '243', fam: 'ac',
    config: '[Rn] 5f⁷ 7s²', enScale: '1.30', state: 'Rắn, kim loại trắng bạc phóng xạ',
    melt: '1176°C', boil: '2011°C', density: '12.0 g/cm³', disc: '1944 (Seaborg và cộng sự)',
    nickname: 'NGUYÊN TỐ NHÂN TẠO NẰM NGAY TRONG NHÀ BẠN',
    subQuote: 'Đầu báo khói trên trần nhà chứa một mẩu americi tí hon!',
    hook: 'Đây là nguyên tố nhân tạo duy nhất có mặt trong hầu hết các toà nhà.',
    statsHighlight: 'Mỗi đầu báo khói chỉ chứa chưa tới một phần triệu gam americi mà dùng được hàng chục năm.',
    powerTitle: 'PHÁT HIỆN KHÓI TRƯỚC KHI LỬA KỊP BÙNG LÊN',
    desc: [
      'Americi phát tia anpha ion hoá không khí; khói lọt vào làm dòng điện giảm và chuông báo kêu.',
      'Nguồn americi còn dùng đo bề dày kính, thép tấm và đo độ chặt của đất ngay trên công trường.',
      'Americi-241 có bán rã 432 năm nên đầu báo khói dùng suốt đời vẫn chưa hết hoạt độ.'
    ],
    reaction: '²³⁹Pu + 2n → ²⁴¹Pu → ²⁴¹Am + β⁻',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    apps: [
      'Đầu báo khói ion hoá trong nhà và toà nhà cao tầng',
      'Máy đo bề dày kính và thép tấm trên dây chuyền',
      'Máy đo độ chặt của đất trên công trường'
    ]
  },
  {
    z: 96, sym: 'Cm', vi: 'Curi', en: 'Curium', mass: '247', fam: 'ac',
    config: '[Rn] 5f⁷ 6d¹ 7s²', enScale: '1.30', state: 'Rắn, kim loại phóng xạ tự phát sáng',
    melt: '1345°C', boil: '3110°C', density: '13.51 g/cm³', disc: '1944 (Seaborg, James, Ghiorso)',
    nickname: 'NGUYÊN TỐ ĐÃ ĐẶT CHÂN LÊN SAO HOẢ',
    subQuote: 'Xe tự hành trên sao Hoả dùng curi để đọc thành phần đá!',
    hook: 'Curi mang tên vợ chồng Marie và Pierre Curie.',
    statsHighlight: 'Curi-244 toả nhiệt mạnh tới mức tự phát ánh sáng tím hồng trong bóng tối.',
    powerTitle: 'BẮN TIA ANPHA ĐỌC THÀNH PHẦN ĐÁ SAO HOẢ',
    desc: [
      'Máy phân tích trên xe tự hành sao Hoả bắn tia anpha từ curi vào đá rồi đọc tia X phát ra.',
      'Curi còn được nghiên cứu làm nguồn nhiệt cho pin đồng vị của tàu thăm dò đi xa Mặt Trời.',
      'Tên nguyên tố tôn vinh Marie và Pierre Curie, hai người đặt nền móng cho ngành phóng xạ.'
    ],
    reaction: '²³⁹Pu + ⁴He → ²⁴²Cm + n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    apps: [
      'Máy phân tích thành phần đá trên xe tự hành sao Hoả',
      'Nguồn nhiệt nghiên cứu cho pin đồng vị vũ trụ',
      'Nguyên liệu để tạo ra các nguyên tố nặng hơn'
    ]
  },
  {
    z: 97, sym: 'Bk', vi: 'Berkeli', en: 'Berkelium', mass: '247', fam: 'ac',
    config: '[Rn] 5f⁹ 7s²', enScale: '1.30', state: 'Rắn, kim loại phóng xạ mềm',
    melt: '986°C', boil: 'Chưa xác định', density: '14.78 g/cm³', disc: '1949 (Thompson, Ghiorso, Seaborg)',
    nickname: 'TẤM BIA ĐỂ TẠO RA NGUYÊN TỐ 117',
    subQuote: 'Chỉ 22 miligam berkeli đã sinh ra nguyên tố tennessin!',
    hook: 'Berkeli đặt theo Berkeley, nơi tìm ra hàng loạt nguyên tố nhân tạo.',
    statsHighlight: 'Phải sản xuất suốt 250 ngày mới đủ 22 miligam berkeli làm bia tạo ra tennessin.',
    powerTitle: 'LÀM BIA NGẮM ĐỂ TẠO NGUYÊN TỐ NẶNG HƠN',
    desc: [
      'Berkeli-249 là tấm bia để bắn ion canxi vào, tạo ra nguyên tố 117 tennessin năm 2010.',
      'Berkeli bán rã 330 ngày nên phải chuyển gấp từ Mỹ sang Nga cho kịp làm thí nghiệm.',
      'Tên nguyên tố lấy theo thành phố Berkeley, nơi phát hiện nhiều nguyên tố nhân tạo nhất.'
    ],
    reaction: '²⁴¹Am + ⁴He → ²⁴³Bk + 2n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'HIỆN ĐƯỢC DÙNG VÀO VIỆC GÌ',
    appsTitle: 'BERKELI DÙNG LÀM GÌ?',
    apps: [
      'Bia ngắm để tổng hợp các nguyên tố siêu nặng mới',
      'Nghiên cứu tính chất hoá học của họ actini',
      'Chưa có ứng dụng nào ngoài phòng thí nghiệm'
    ]
  },
  {
    z: 98, sym: 'Cf', vi: 'Californi', en: 'Californium', mass: '251', fam: 'ac',
    config: '[Rn] 5f¹⁰ 7s²', enScale: '1.30', state: 'Rắn, kim loại phóng xạ dẻo',
    melt: '900°C', boil: 'Chưa xác định', density: '15.1 g/cm³', disc: '1950 (Thompson, Street, Ghiorso, Seaborg)',
    nickname: 'MÁY PHÁT NƠTRON BỎ TÚI',
    subQuote: 'Một microgam californi bắn ra hàng triệu nơtron mỗi giây!',
    hook: 'Californi giúp dò mìn và tìm vỉa dầu dưới lòng đất.',
    statsHighlight: 'Một microgam californi-252 phát ra khoảng 2.3 triệu nơtron mỗi giây.',
    powerTitle: 'PHÁT NƠTRON KHỞI ĐỘNG LÒ PHẢN ỨNG',
    desc: [
      'Californi-252 là nguồn nơtron dùng khởi động lò phản ứng hạt nhân từ trạng thái nguội.',
      'Nơtron từ californi soi qua đất đá để tìm vỉa dầu, dò mìn và chất nổ giấu trong hành lý.',
      'Californi còn được dùng trong xạ trị áp sát một số khối u khó trị bằng tia gamma.'
    ],
    reaction: '²⁴²Cm + ⁴He → ²⁴⁵Cf + n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    apps: [
      'Nguồn nơtron khởi động lò phản ứng hạt nhân',
      'Máy dò mìn, chất nổ và thăm dò vỉa dầu',
      'Xạ trị áp sát một số khối u khó điều trị'
    ]
  },
  {
    z: 99, sym: 'Es', vi: 'Einsteini', en: 'Einsteinium', mass: '252', fam: 'ac',
    config: '[Rn] 5f¹¹ 7s²', enScale: '1.30', state: 'Rắn, kim loại phóng xạ rất mạnh',
    melt: '860°C', boil: 'Chưa xác định', density: '8.84 g/cm³', disc: '1952 (tro vụ thử bom nhiệt hạch)',
    nickname: 'NGUYÊN TỐ TÌM THẤY TRONG TRO BOM KHINH KHÍ',
    subQuote: 'Phát hiện trong bụi phóng xạ vụ thử bom nhiệt hạch năm 1952!',
    hook: 'Einsteini mang tên nhà bác học Albert Einstein.',
    statsHighlight: 'Tới nay tổng lượng einsteini con người từng tạo ra mới chỉ tính bằng miligam.',
    powerTitle: 'NGUYÊN TỐ SINH RA TỪ MỘT VỤ NỔ NHIỆT HẠCH',
    desc: [
      'Einsteini được tìm thấy trong bụi phóng xạ của vụ thử bom nhiệt hạch đầu tiên năm 1952.',
      'Einsteini-253 chỉ sống 20 ngày và phóng xạ mạnh tới mức tự phá vỡ mạng tinh thể của nó.',
      'Nó từng làm bia để bắn ra mendelevi, nguyên tố kế tiếp trong bảng tuần hoàn.'
    ],
    reaction: '²³⁸U + 15n → ²⁵³Es + 7β⁻',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'HIỆN ĐƯỢC DÙNG VÀO VIỆC GÌ',
    appsTitle: 'EINSTEINI DÙNG LÀM GÌ?',
    apps: [
      'Bia ngắm để tổng hợp mendelevi và nguyên tố nặng hơn',
      'Nghiên cứu cấu trúc electron của các nguyên tố nặng',
      'Chưa có ứng dụng nào ngoài phòng thí nghiệm'
    ]
  },
  {
    z: 100, sym: 'Fm', vi: 'Fermi', en: 'Fermium', mass: '257', fam: 'ac',
    config: '[Rn] 5f¹² 7s²', enScale: '1.30', state: 'Rắn (dự đoán), phóng xạ mạnh',
    melt: '1527°C', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1952 (tro vụ thử bom nhiệt hạch)',
    nickname: 'RANH GIỚI CUỐI CÙNG CỦA LÒ PHẢN ỨNG',
    subQuote: 'Nguyên tố nặng nhất còn tạo được bằng lò phản ứng thông thường!',
    hook: 'Từ fermi trở đi, muốn tạo nguyên tố mới phải dùng máy gia tốc.',
    statsHighlight: 'Fermi là nguyên tố cuối cùng còn tạo ra được chỉ bằng cách bắn nơtron trong lò phản ứng.',
    powerTitle: 'ĐÁNH DẤU GIỚI HẠN CỦA CÁCH BẮN NƠTRON',
    desc: [
      'Fermi cũng được tìm thấy trong tro vụ thử bom nhiệt hạch năm 1952, cùng lúc với einsteini.',
      'Đây là nguyên tố nặng nhất còn tạo được bằng lò phản ứng; nặng hơn nữa phải dùng máy gia tốc.',
      'Tên nguyên tố tôn vinh Enrico Fermi, người xây lò phản ứng hạt nhân đầu tiên của loài người.'
    ],
    reaction: '²³⁸U + 17n → ²⁵⁵Fm + 8β⁻',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'HIỆN ĐƯỢC DÙNG VÀO VIỆC GÌ',
    appsTitle: 'FERMI DÙNG LÀM GÌ?',
    apps: [
      'Nghiên cứu giới hạn của phản ứng bắt nơtron liên tiếp',
      'Thí nghiệm về tính chất hoá học của actini nặng',
      'Chưa có ứng dụng nào ngoài phòng thí nghiệm'
    ]
  },
  {
    z: 101, sym: 'Md', vi: 'Mendelevi', en: 'Mendelevium', mass: '258', fam: 'ac',
    config: '[Rn] 5f¹³ 7s²', enScale: '1.30', state: 'Rắn (dự đoán), phóng xạ mạnh',
    melt: '827°C', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1955 (Ghiorso và cộng sự)',
    nickname: 'NGUYÊN TỐ MANG TÊN CHA ĐẺ BẢNG TUẦN HOÀN',
    subQuote: 'Mẻ đầu tiên chỉ thu được đúng 17 nguyên tử, phải đếm từng cái!',
    hook: 'Đây là lần đầu con người tạo ra nguyên tố mới từng nguyên tử một.',
    statsHighlight: 'Mẻ tổng hợp đầu tiên chỉ cho ra 17 nguyên tử mendelevi, đếm được từng nguyên tử.',
    powerTitle: 'MỞ RA CÁCH LÀM VIỆC VỚI TỪNG NGUYÊN TỬ MỘT',
    desc: [
      'Mendelevi là nguyên tố đầu tiên được tạo ra và nhận diện ở mức từng nguyên tử riêng lẻ.',
      'Kỹ thuật đếm từng nguyên tử này về sau thành chuẩn cho mọi nguyên tố siêu nặng.',
      'Tên nguyên tố tôn vinh Dmitri Mendeleev, người dựng nên bảng tuần hoàn.'
    ],
    reaction: '²⁵³Es + ⁴He → ²⁵⁶Md + n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'HIỆN ĐƯỢC DÙNG VÀO VIỆC GÌ',
    appsTitle: 'MENDELEVI DÙNG LÀM GÌ?',
    apps: [
      'Nghiên cứu hoá học ở quy mô vài nguyên tử',
      'Kiểm chứng dự đoán của bảng tuần hoàn ở vùng nặng',
      'Chưa có ứng dụng nào ngoài phòng thí nghiệm'
    ]
  },
  {
    z: 102, sym: 'No', vi: 'Nobeli', en: 'Nobelium', mass: '259', fam: 'ac',
    config: '[Rn] 5f¹⁴ 7s²', enScale: '1.30', state: 'Rắn (dự đoán), phóng xạ mạnh',
    melt: '827°C', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1966 (Viện Dubna)',
    nickname: 'NGUYÊN TỐ GÂY TRANH CÃI SUỐT BA THẬP KỶ',
    subQuote: 'Ba nước tranh nhau quyền phát hiện suốt ba mươi năm trời!',
    hook: 'Nobeli mang tên Alfred Nobel, người lập ra giải Nobel.',
    statsHighlight: 'Khác cả họ actini, nobeli bền nhất ở hoá trị hai chứ không phải hoá trị ba.',
    powerTitle: 'PHÁ LỆ HOÁ TRỊ CỦA CẢ HỌ ACTINI',
    desc: [
      'Khác các actini còn lại, nobeli bền nhất ở trạng thái hoá trị hai chứ không phải hoá trị ba.',
      'Quyền công nhận phát hiện bị tranh chấp giữa Thuỵ Điển, Mỹ và Liên Xô suốt ba mươi năm.',
      'Tên nguyên tố tôn vinh Alfred Nobel, nhà phát minh thuốc nổ và người lập giải Nobel.'
    ],
    reaction: '²⁴⁴Cm + ¹²C → ²⁵²No + 4n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'HIỆN ĐƯỢC DÙNG VÀO VIỆC GÌ',
    appsTitle: 'NOBELI DÙNG LÀM GÌ?',
    apps: [
      'Nghiên cứu vì sao hoá trị hai lại bền bất thường',
      'Kiểm chứng quy luật tuần hoàn ở cuối họ actini',
      'Chưa có ứng dụng nào ngoài phòng thí nghiệm'
    ]
  },
  {
    z: 103, sym: 'Lr', vi: 'Lawrenci', en: 'Lawrencium', mass: '266', fam: 'ac',
    config: '[Rn] 5f¹⁴ 7s² 7p¹', enScale: '1.30', state: 'Rắn (dự đoán), phóng xạ mạnh',
    melt: '1627°C', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1961 (Berkeley) - 1965 (Dubna)',
    nickname: 'NGUYÊN TỐ KHÉP LẠI HỌ ACTINI',
    subQuote: 'Sau nó, bảng tuần hoàn sang hẳn một trang mới!',
    hook: 'Lawrenci mang tên Ernest Lawrence, cha đẻ của máy gia tốc cyclotron.',
    statsHighlight: 'Electron cuối cùng của lawrenci rơi vào phân lớp 7p chứ không phải 6d như dự đoán ban đầu.',
    powerTitle: 'KHÉP LẠI HỌ ACTINI VÀ PHÁ LỆ CẤU HÌNH ELECTRON',
    desc: [
      'Lawrenci là nguyên tố cuối cùng của họ actini, sau nó bảng tuần hoàn bước sang khối d chu kỳ 7.',
      'Electron ngoài cùng của nó nằm ở phân lớp 7p, khác hẳn quy luật của các nguyên tố cùng dãy.',
      'Tên nguyên tố tôn vinh Ernest Lawrence, người phát minh máy gia tốc cyclotron.'
    ],
    reaction: '²⁵²Cf + ¹¹B → ²⁵⁸Lr + 5n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'HIỆN ĐƯỢC DÙNG VÀO VIỆC GÌ',
    appsTitle: 'LAWRENCI DÙNG LÀM GÌ?',
    apps: [
      'Nghiên cứu cấu hình electron của nguyên tố siêu nặng',
      'Kiểm chứng ảnh hưởng của thuyết tương đối lên electron',
      'Chưa có ứng dụng nào ngoài phòng thí nghiệm'
    ]
  },
  {
    z: 104, sym: 'Rf', vi: 'Rutherfordi', en: 'Rutherfordium', mass: '267', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d² 7s²', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), chỉ tồn tại vài giờ',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1964 (Dubna) - 1969 (Berkeley)',
    nickname: 'NGUYÊN TỐ SIÊU NẶNG ĐẦU TIÊN',
    subQuote: 'Mở đầu dãy nguyên tố chỉ tồn tại vài giây trong máy gia tốc!',
    hook: 'Rutherfordi mang tên Ernest Rutherford, người tìm ra hạt nhân nguyên tử.',
    statsHighlight: 'Đồng vị bền nhất của rutherfordi cũng chỉ sống được khoảng 1.3 giờ rồi phân rã.',
    powerTitle: 'MỞ ĐẦU KHỐI NGUYÊN TỐ SIÊU NẶNG',
    desc: [
      'Rutherfordi là nguyên tố siêu nặng đầu tiên, mở đầu dãy chỉ sống từ vài giây tới vài giờ.',
      'Thí nghiệm cho thấy nó có tính chất hoá học giống hafni, đúng như bảng tuần hoàn dự đoán.',
      'Tên nguyên tố tôn vinh Ernest Rutherford, người tìm ra hạt nhân nguyên tử.'
    ],
    reaction: '²⁴⁹Cf + ¹²C → ²⁵⁷Rf + 4n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA RUTHERFORDI ĐỂ LÀM GÌ?',
    apps: [
      'Kiểm chứng bảng tuần hoàn còn đúng tới đâu ở vùng siêu nặng',
      'Đo tính chất hoá học chỉ với vài nguyên tử trong vài giây',
      'Chưa có và sẽ chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 105, sym: 'Db', vi: 'Dubni', en: 'Dubnium', mass: '268', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d³ 7s²', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), chỉ tồn tại vài chục giờ',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1968 (Dubna) - 1970 (Berkeley)',
    nickname: 'NGUYÊN TỐ MANG TÊN THÀNH PHỐ HẠT NHÂN',
    subQuote: 'Đặt theo Dubna, thành phố Nga tìm ra nhiều nguyên tố nhất!',
    hook: 'Dubna và Berkeley từng tranh nhau quyền đặt tên suốt nhiều năm.',
    statsHighlight: 'Đồng vị dai nhất của dubni chỉ sống khoảng 28 giờ rồi phân rã hết.',
    powerTitle: 'TÂM ĐIỂM CỦA CUỘC ĐUA ĐẶT TÊN NGUYÊN TỐ',
    desc: [
      'Dubni là kết quả của cuộc đua giữa Mỹ và Liên Xô trong việc tạo ra nguyên tố mới.',
      'Tính chất hoá học của nó giống tantan, đúng vị trí mà bảng tuần hoàn xếp cho.',
      'Tên nguyên tố tôn vinh Dubna, thành phố khoa học hạt nhân của nước Nga.'
    ],
    reaction: '²⁴⁹Cf + ¹⁵N → ²⁶⁰Db + 4n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA DUBNI ĐỂ LÀM GÌ?',
    apps: [
      'Kiểm chứng dubni có giống tantan như bảng tuần hoàn dự đoán',
      'Nghiên cứu hạt nhân nặng và đường tới đảo bền vững',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  }
];
