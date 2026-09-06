/**
 * Đợt 5 — nguyên tố siêu nặng nhân tạo (Sg 106 đến Ts 117).
 *
 * Nhóm này chỉ tồn tại từ vài phần trăm giây tới vài phút trong máy gia tốc,
 * chưa đo được nhiệt độ nóng chảy hay khối lượng riêng. Vì vậy:
 *  - ô nào chưa có số liệu thì ghi "Chưa xác định";
 *  - khung phản ứng dùng đúng phản ứng tổng hợp hạt nhân đã công bố;
 *  - mục ứng dụng đổi thành "vì sao phải tạo ra nó", nói thật là chưa dùng
 *    được vào việc gì ngoài nghiên cứu.
 */

export const ROWS = [
  {
    z: 106, sym: 'Sg', vi: 'Seaborgi', en: 'Seaborgium', mass: '269', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d⁴ 7s²', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), sống vài phút',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1974 (Berkeley)',
    nickname: 'NGUYÊN TỐ ĐẶT TÊN NGƯỜI CÒN SỐNG',
    subQuote: 'Glenn Seaborg còn sống khi nguyên tố mang tên ông được công nhận!',
    hook: 'Ông Seaborg từng nhận thư gửi tới "Seaborgium, Hoa Kỳ".',
    statsHighlight: 'Đồng vị dai nhất của seaborgi sống khoảng 14 phút, đủ lâu để làm thí nghiệm hoá học.',
    powerTitle: 'ĐỦ SỐNG LÂU ĐỂ LÀM THÍ NGHIỆM HOÁ HỌC THẬT',
    desc: [
      'Seaborgi sống đủ lâu để nhà khoa học kịp cho nó phản ứng và đo tính chất hoá học.',
      'Kết quả cho thấy nó cư xử giống wolfram, đúng cột mà bảng tuần hoàn xếp cho.',
      'Đây là nguyên tố đầu tiên được đặt theo tên một nhà khoa học vẫn còn sống.'
    ],
    reaction: '²⁴⁹Cf + ¹⁸O → ²⁶³Sg + 4n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA SEABORGI ĐỂ LÀM GÌ?',
    apps: [
      'Chứng minh bảng tuần hoàn vẫn đúng tới tận ô số 106',
      'Nghiên cứu hoá học chỉ với vài nguyên tử trong vài phút',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 107, sym: 'Bh', vi: 'Bohri', en: 'Bohrium', mass: '270', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d⁵ 7s²', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), sống khoảng một phút',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1981 (Viện GSI, Đức)',
    nickname: 'NGUYÊN TỐ MANG TÊN CHA ĐẺ MÔ HÌNH NGUYÊN TỬ',
    subQuote: 'Chỉ với sáu nguyên tử, người ta vẫn đo được tính chất hoá học!',
    hook: 'Bohri mang tên Niels Bohr, người dựng nên mô hình nguyên tử.',
    statsHighlight: 'Chỉ cần sáu nguyên tử bohri là các nhà khoa học đã đo xong tính chất hoá học của nó.',
    powerTitle: 'LÀM HOÁ HỌC VỚI VỎN VẸN SÁU NGUYÊN TỬ',
    desc: [
      'Nhóm nghiên cứu cho bohri phản ứng với oxy và axit clohidric, thu được hợp chất giống reni.',
      'Toàn bộ thí nghiệm chỉ dựa trên sáu nguyên tử, mỗi nguyên tử sống chừng một phút.',
      'Tên nguyên tố tôn vinh Niels Bohr, người xây mô hình nguyên tử có các lớp electron.'
    ],
    reaction: '²⁰⁹Bi + ⁵⁴Cr → ²⁶²Bh + n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA BOHRI ĐỂ LÀM GÌ?',
    apps: [
      'Kiểm chứng bohri có giống reni như dự đoán không',
      'Hoàn thiện kỹ thuật làm hoá học với vài nguyên tử',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 108, sym: 'Hs', vi: 'Hasi', en: 'Hassium', mass: '269', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d⁶ 7s²', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), sống vài chục giây',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1984 (Viện GSI, Đức)',
    nickname: 'NGUYÊN TỐ BAY HƠI ĐÚNG NHƯ DỰ ĐOÁN',
    subQuote: 'Bảy nguyên tử đủ chứng minh nó cư xử y hệt osimi!',
    hook: 'Hasi đặt theo bang Hessen của Đức, nơi có viện GSI.',
    statsHighlight: 'Chỉ bảy nguyên tử hasi đã đủ chứng minh oxit của nó bay hơi giống oxit osimi.',
    powerTitle: 'TẠO OXIT BAY HƠI GIỐNG HỆT OSIMI',
    desc: [
      'Các nhà khoa học cho hasi tác dụng với oxy rồi đo xem hợp chất bay hơi ở nhiệt độ nào.',
      'Kết quả trùng khớp với osimi ở cùng cột, một bằng chứng đẹp cho quy luật tuần hoàn.',
      'Tên nguyên tố lấy từ Hessen, bang của Đức nơi đặt viện nghiên cứu GSI.'
    ],
    reaction: '²⁰⁸Pb + ⁵⁸Fe → ²⁶⁵Hs + n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA HASI ĐỂ LÀM GÌ?',
    apps: [
      'Chứng minh quy luật cùng cột vẫn đúng ở ô số 108',
      'Thử nghiệm phương pháp tách chất bằng độ bay hơi',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 109, sym: 'Mt', vi: 'Meitneri', en: 'Meitnerium', mass: '278', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d⁷ 7s²', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), sống vài giây',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1982 (Viện GSI, Đức)',
    nickname: 'NGUYÊN TỐ DUY NHẤT MANG TÊN MỘT NHÀ KHOA HỌC NỮ',
    subQuote: 'Mẻ đầu tiên chỉ tạo ra đúng một nguyên tử duy nhất!',
    hook: 'Lise Meitner là người giải thích được hiện tượng phân hạch hạt nhân.',
    statsHighlight: 'Thí nghiệm năm 1982 chỉ thu được đúng một nguyên tử meitneri trong suốt nhiều tuần chạy máy.',
    powerTitle: 'TÔN VINH NGƯỜI GIẢI THÍCH ĐƯỢC PHÂN HẠCH',
    desc: [
      'Lần tổng hợp đầu tiên chạy máy gia tốc nhiều tuần mà chỉ thu được một nguyên tử.',
      'Tên nguyên tố tôn vinh Lise Meitner, người giải thích được hiện tượng phân hạch hạt nhân.',
      'Đây là nguyên tố duy nhất trong bảng tuần hoàn mang tên riêng một nhà khoa học nữ.'
    ],
    reaction: '²⁰⁹Bi + ⁵⁸Fe → ²⁶⁶Mt + n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA MEITNERI ĐỂ LÀM GÌ?',
    apps: [
      'Nghiên cứu giới hạn tồn tại của hạt nhân nặng',
      'Kiểm chứng dự đoán về nguyên tố cùng cột với iridi',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 110, sym: 'Ds', vi: 'Darmstadti', en: 'Darmstadtium', mass: '281', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d⁸ 7s²', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), sống hơn mười giây',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1994 (Viện GSI, Đức)',
    nickname: 'NGUYÊN TỐ MANG TÊN THÀNH PHỐ DARMSTADT',
    subQuote: 'Cùng một cỗ máy ở Darmstadt đã sinh ra sáu nguyên tố mới!',
    hook: 'Viện GSI ở Darmstadt là nơi tạo ra nhiều nguyên tố nhất châu Âu.',
    statsHighlight: 'Đồng vị dai nhất của darmstadti sống khoảng 13 giây rồi phân rã.',
    powerTitle: 'SẢN PHẨM CỦA CỖ MÁY SĂN NGUYÊN TỐ Ở ĐỨC',
    desc: [
      'Darmstadti được tạo bằng cách bắn ion niken vào bia chì trong máy gia tốc của viện GSI.',
      'Cùng cỗ máy ấy, các nhà khoa học Đức đã lần lượt tạo ra sáu nguyên tố mới cho bảng tuần hoàn.',
      'Nó nằm cùng cột với niken, paladi và bạch kim nên được dự đoán là một kim loại quý.'
    ],
    reaction: '²⁰⁸Pb + ⁶²Ni → ²⁶⁹Ds + n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA DARMSTADTI ĐỂ LÀM GÌ?',
    apps: [
      'Hoàn thiện cách tổng hợp nguyên tố bằng ion nặng',
      'Kiểm chứng dự đoán về nhóm kim loại quý ở chu kỳ 7',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 111, sym: 'Rg', vi: 'Roentgeni', en: 'Roentgenium', mass: '282', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d⁹ 7s²', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), sống khoảng trăm giây',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1994 (Viện GSI, Đức)',
    nickname: 'NGUYÊN TỐ KỶ NIỆM 100 NĂM TIA X',
    subQuote: 'Được đặt tên đúng dịp tròn một thế kỷ ngày tìm ra tia X!',
    hook: 'Roentgeni mang tên Wilhelm Röntgen, người phát hiện tia X.',
    statsHighlight: 'Roentgeni nằm ngay dưới vàng trong bảng tuần hoàn nên được dự đoán cũng là một kim loại quý.',
    powerTitle: 'NGƯỜI EM SIÊU NẶNG CỦA VÀNG',
    desc: [
      'Roentgeni nằm cùng cột với đồng, bạc và vàng, nên lý thuyết dự đoán nó cũng rất khó bị oxi hoá.',
      'Chưa ai đủ nguyên tử để kiểm chứng điều đó, vì mỗi lần chỉ tạo được vài nguyên tử.',
      'Tên nguyên tố tôn vinh Wilhelm Röntgen, người tìm ra tia X và mở đường cho chụp X quang.'
    ],
    reaction: '²⁰⁹Bi + ⁶⁴Ni → ²⁷²Rg + n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA ROENTGENI ĐỂ LÀM GÌ?',
    apps: [
      'Kiểm tra xem nó có giống vàng như lý thuyết dự đoán',
      'Nghiên cứu ảnh hưởng của thuyết tương đối lên electron',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 112, sym: 'Cn', vi: 'Copernixi', en: 'Copernicium', mass: '285', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', enScale: 'Chưa xác định', state: 'Có thể là chất khí ở nhiệt độ thường',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1996 (Viện GSI, Đức)',
    nickname: 'KIM LOẠI CÓ THỂ LÀ CHẤT KHÍ',
    subQuote: 'Nằm dưới thuỷ ngân, nhưng có thể còn bay hơi hơn cả thuỷ ngân!',
    hook: 'Copernixi mang tên Nicolaus Copernicus, người đặt Mặt Trời vào trung tâm.',
    statsHighlight: 'Hiệu ứng tương đối kéo electron sát vào hạt nhân, khiến copernixi có thể là khí ở nhiệt độ thường.',
    powerTitle: 'BỊ THUYẾT TƯƠNG ĐỐI LÀM ĐỔI TÍNH CHẤT',
    desc: [
      'Electron trong copernixi chạy nhanh tới mức phải tính theo thuyết tương đối, làm nó co lại sát hạt nhân.',
      'Vì vậy nó liên kết rất yếu với nhau và có thể tồn tại ở thể khí ngay nhiệt độ phòng.',
      'Tên nguyên tố tôn vinh Copernicus, người đưa ra mô hình Mặt Trời là trung tâm.'
    ],
    reaction: '²⁰⁸Pb + ⁷⁰Zn → ²⁷⁷Cn + n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA COPERNIXI ĐỂ LÀM GÌ?',
    apps: [
      'Đo xem thuyết tương đối bẻ cong tính chất hoá học tới mức nào',
      'Thử nghiệm nó bám hay không bám lên bề mặt vàng lạnh',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 113, sym: 'Nh', vi: 'Nihoni', en: 'Nihonium', mass: '286', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), sống vài giây',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '2004 (Viện RIKEN, Nhật Bản)',
    nickname: 'NGUYÊN TỐ ĐẦU TIÊN DO CHÂU Á TÌM RA',
    subQuote: 'Chín năm chạy máy liên tục mới bắt được ba nguyên tử!',
    hook: 'Nihon là tên người Nhật gọi đất nước mình.',
    statsHighlight: 'Nhóm RIKEN chạy máy gia tốc suốt chín năm mới thu được vỏn vẹn ba nguyên tử nihoni.',
    powerTitle: 'CHÍN NĂM KIÊN TRÌ ĐỔI LẤY BA NGUYÊN TỬ',
    desc: [
      'Nhóm nghiên cứu Nhật Bản bắn ion kẽm vào bia bismut suốt chín năm mới đủ bằng chứng.',
      'Đây là nguyên tố đầu tiên được phát hiện và đặt tên bởi một nhóm nghiên cứu châu Á.',
      'Tên nguyên tố lấy từ Nihon, cách người Nhật gọi chính đất nước mình.'
    ],
    reaction: '²⁰⁹Bi + ⁷⁰Zn → ²⁷⁸Nh + n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA NIHONI ĐỂ LÀM GÌ?',
    apps: [
      'Khẳng định năng lực nghiên cứu hạt nhân của châu Á',
      'Dò tìm đường tới vùng hạt nhân bền vững hơn',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 114, sym: 'Fl', vi: 'Flerovi', en: 'Flerovium', mass: '289', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', enScale: 'Chưa xác định', state: 'Rắn hoặc khí (còn tranh luận)',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '1998 (Viện Dubna, Nga)',
    nickname: 'NGUYÊN TỐ SÁT ĐẢO BỀN VỮNG',
    subQuote: 'Nằm ngay cạnh vùng hạt nhân được dự đoán là bền bất thường!',
    hook: 'Các nhà vật lý tin rằng quanh ô số 114 có một "đảo bền vững".',
    statsHighlight: 'Lý thuyết dự đoán quanh 114 proton có vùng hạt nhân sống lâu hơn hẳn các nguyên tố lân cận.',
    powerTitle: 'CHỈ ĐƯỜNG TỚI ĐẢO HẠT NHÂN BỀN VỮNG',
    desc: [
      'Các mô hình hạt nhân dự đoán quanh ô số 114 tồn tại một vùng nguyên tố sống lâu bất thường.',
      'Flerovi hiện chỉ sống được vài giây, nhưng đã dài hơn nhiều nguyên tố lân cận, đúng chiều dự đoán.',
      'Tên nguyên tố tôn vinh Georgy Flyorov, người sáng lập phòng thí nghiệm hạt nhân ở Dubna.'
    ],
    reaction: '²⁴⁴Pu + ⁴⁸Ca → ²⁸⁹Fl + 3n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA FLEROVI ĐỂ LÀM GÌ?',
    apps: [
      'Kiểm chứng giả thuyết về đảo hạt nhân bền vững',
      'Đo xem nó giống chì hay giống khí hiếm',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 115, sym: 'Mc', vi: 'Moscovi', en: 'Moscovium', mass: '290', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), sống dưới một giây',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '2003 (Viện Dubna, Nga)',
    nickname: 'NGUYÊN TỐ MANG TÊN VÙNG MATXCƠVA',
    subQuote: 'Sống chưa tới một giây rồi bắn ra tia anpha và biến mất!',
    hook: 'Moscovi đặt theo tỉnh Matxcơva, nơi có viện Dubna.',
    statsHighlight: 'Đồng vị dai nhất của moscovi cũng chỉ sống khoảng 0.65 giây.',
    powerTitle: 'MẮT XÍCH TRONG CHUỖI PHÂN RÃ DẪN TỚI NIHONI',
    desc: [
      'Moscovi phân rã anpha rồi biến thành nihoni, chính chuỗi này giúp khẳng định cả hai nguyên tố.',
      'Nó được tạo bằng cách bắn ion canxi-48 vào bia americi trong máy gia tốc ở Dubna.',
      'Tên nguyên tố lấy theo tỉnh Matxcơva, nơi đặt viện nghiên cứu hạt nhân Dubna.'
    ],
    reaction: '²⁴³Am + ⁴⁸Ca → ²⁸⁸Mc + 3n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA MOSCOVI ĐỂ LÀM GÌ?',
    apps: [
      'Xác nhận chuỗi phân rã dẫn tới nguyên tố nihoni',
      'Nghiên cứu hạt nhân giàu nơtron ở vùng siêu nặng',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 116, sym: 'Lv', vi: 'Livermori', en: 'Livermorium', mass: '293', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), sống vài phần trăm giây',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '2000 (Dubna và Livermore)',
    nickname: 'THÀNH QUẢ CỦA HAI PHÒNG THÍ NGHIỆM HAI NƯỚC',
    subQuote: 'Nga và Mỹ bắt tay nhau mới tạo ra được nguyên tố này!',
    hook: 'Livermori sống chỉ khoảng sáu phần trăm giây.',
    statsHighlight: 'Đồng vị của livermori chỉ tồn tại chừng 60 phần nghìn giây rồi phân rã anpha.',
    powerTitle: 'KẾT QUẢ CỦA HỢP TÁC NGA - MỸ',
    desc: [
      'Livermori do viện Dubna của Nga và phòng thí nghiệm Livermore của Mỹ cùng tạo ra.',
      'Nó nằm cùng cột với oxy và lưu huỳnh, nhưng ở đây tính kim loại đã lấn át hoàn toàn.',
      'Tên nguyên tố lấy theo phòng thí nghiệm quốc gia Lawrence Livermore của Mỹ.'
    ],
    reaction: '²⁴⁸Cm + ⁴⁸Ca → ²⁹³Lv + 3n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA LIVERMORI ĐỂ LÀM GÌ?',
    apps: [
      'Lấp đầy chỗ trống cuối cùng của chu kỳ 7',
      'Nghiên cứu vì sao tính kim loại lấn át ở cột của oxy',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  },
  {
    z: 117, sym: 'Ts', vi: 'Tennessin', en: 'Tennessine', mass: '294', fam: 'sn',
    config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', enScale: 'Chưa xác định', state: 'Rắn (dự đoán), sống vài phần trăm giây',
    melt: 'Chưa xác định', boil: 'Chưa xác định', density: 'Chưa xác định', disc: '2010 (Dubna, Oak Ridge, Livermore)',
    nickname: 'HALOGEN NẶNG NHẤT VÀ GẦN CUỐI BẢNG',
    subQuote: 'Phải chở 22 miligam berkeli vòng nửa vòng Trái Đất mới tạo ra nổi!',
    hook: 'Tennessin là nguyên tố áp chót của bảng tuần hoàn hiện nay.',
    statsHighlight: 'Bia berkeli phải sản xuất suốt 250 ngày ở Mỹ rồi chở gấp sang Nga trước khi kịp phân rã.',
    powerTitle: 'HÀNH TRÌNH NỬA VÒNG TRÁI ĐẤT ĐỂ RA ĐỜI',
    desc: [
      'Lò phản ứng ở Oak Ridge nuôi 22 miligam berkeli suốt 250 ngày để làm bia ngắm.',
      'Bia được chở gấp sang Dubna rồi bắn ion canxi-48 vào, tạo ra sáu nguyên tử tennessin.',
      'Dù xếp cùng cột với flo và clo, tennessin được dự đoán mang nhiều tính kim loại hơn phi kim.'
    ],
    reaction: '²⁴⁹Bk + ⁴⁸Ca → ²⁹⁴Ts + 3n',
    reactionLabel: 'PHẢN ỨNG TỔNG HỢP HẠT NHÂN',
    appsLabel: 'VÌ SAO PHẢI TẠO RA NÓ',
    appsTitle: 'TẠO RA TENNESSIN ĐỂ LÀM GÌ?',
    apps: [
      'Hoàn tất hàng thứ bảy của bảng tuần hoàn',
      'Kiểm tra halogen còn giữ tính phi kim tới đâu',
      'Chưa có ứng dụng thực tế vì sống quá ngắn'
    ]
  }
];
