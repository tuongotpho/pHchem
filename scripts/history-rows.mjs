/**
 * history-rows.mjs — 17 chủ đề loạt "LỊCH SỬ HOÁ HỌC".
 * Lấy từ 17 mẩu tag "Lịch sử" chưa làm video trong promo/CHUYEN_LA_CON_THIEU.md
 *
 * Mỗi chủ đề gồm:
 *   nam, moc        — mốc thời gian (cảnh 1, số thật to)
 *   nhanVat, danh   — ai, và họ được nhớ vì điều gì
 *   hook            — câu dẫn
 *   truocDo         — thế giới tin gì trước đó (tiêu đề cảnh 2)
 *   boiCanh[3]      — bối cảnh
 *   moment          — bước ngoặt (tiêu đề cảnh 3)
 *   chiTiet[3]      — chuyện đã xảy ra
 *   dukien          — dữ kiện chốt: phản ứng, số liệu hoặc định luật
 *   diSan[3]        — để lại gì tới hôm nay
 *   ketLuan         — câu kết
 */

export const HISTORY_ROWS = [
  {
    id: 1, key: 'lichsu_01_mendeleev',
    nam: '1869', moc: 'NĂM',
    nhanVat: 'DMITRI MENDELEEV',
    danh: 'NGƯỜI ĐỂ TRỐNG Ô CHO TƯƠNG LAI',
    hook: 'Ông xếp bảng rồi chừa sẵn chỗ cho những nguyên tố chưa ai từng thấy.',
    truocDo: 'HƠN SÁU MƯƠI NGUYÊN TỐ RỜI RẠC, KHÔNG AI XẾP NỔI',
    boiCanh: [
      'Giữa thế kỷ mười chín người ta đã biết hơn sáu mươi nguyên tố nhưng không tìm ra quy luật nào để xếp.',
      'Nhiều người thử xếp theo khối lượng, được vài chỗ đúng rồi lại vỡ ở chỗ khác.',
      'Mendeleev viết tính chất từng nguyên tố lên các tấm thẻ rồi xếp đi xếp lại như chơi bài.'
    ],
    moment: 'CHỪA Ô TRỐNG THAY VÌ XẾP CHO ĐẦY',
    chiTiet: [
      'Khi một nguyên tố không vừa chỗ, ông không ép nó vào mà để trống hẳn ô đó.',
      'Ông còn đoán trước khối lượng và tính chất của thứ sẽ lấp vào chỗ trống ấy.',
      'Sáu năm sau gali được tìm ra, rồi tới gecmani, cả hai đều khớp với dự đoán.'
    ],
    dukien: 'Ekabo → Gali (1875) · Ekasilic → Gecmani (1886)',
    dukienLabel: 'DỰ ĐOÁN ĐÃ ĐƯỢC KIỂM CHỨNG',
    diSan: [
      'Bảng tuần hoàn trở thành khung xương của toàn bộ ngành hoá học hiện đại.',
      'Cách làm của ông thành chuẩn mực: lý thuyết tốt phải đoán được cả cái chưa ai biết.',
      'Nguyên tố số một trăm lẻ một được đặt tên mendelevi để tôn vinh ông.'
    ],
    ketLuan: 'Những ô trống trên tờ giấy hoá ra đáng giá hơn cả những ô đã điền.'
  },
  {
    id: 2, key: 'lichsu_02_marie_curie',
    nam: '1911', moc: 'NĂM',
    nhanVat: 'MARIE CURIE',
    danh: 'HAI GIẢI NOBEL, HAI NGÀNH KHÁC NHAU',
    hook: 'Tới nay bà vẫn là người duy nhất đoạt Nobel ở hai ngành khoa học khác nhau.',
    truocDo: 'PHÓNG XẠ CÒN LÀ ĐIỀU CHƯA AI HIỂU',
    boiCanh: [
      'Cuối thế kỷ mười chín, người ta vừa phát hiện quặng urani phát ra tia lạ mà không rõ vì sao.',
      'Nhiều người tưởng đó là tính chất của hợp chất chứ không phải của nguyên tử.',
      'Marie đo được quặng pitchblend phát tia mạnh hơn cả urani nguyên chất, tức trong đó còn thứ khác.'
    ],
    moment: 'NGHIỀN HÀNG TẤN QUẶNG ĐỂ LẤY MỘT NHÚM CHẤT',
    chiTiet: [
      'Hai vợ chồng xử lý hàng tấn quặng trong một nhà kho dột nát để tách ra chất mới.',
      'Họ tìm ra poloni rồi tới radi, và chính bà là người đặt ra từ phóng xạ.',
      'Nobel Vật lý năm một chín không ba, rồi Nobel Hoá học năm một chín một một, giải sau bà nhận một mình.'
    ],
    dukien: '²²⁶Ra → ²²²Rn + α  (bán rã 1600 năm)',
    dukienLabel: 'NGUYÊN TỐ BÀ TÌM RA',
    diSan: [
      'Xạ trị ung thư ngày nay bắt nguồn từ chính những nghiên cứu của bà.',
      'Sổ tay ghi chép của bà tới giờ vẫn còn phóng xạ, phải cất trong hộp chì.',
      'Nguyên tố số chín mươi sáu mang tên curi để tưởng nhớ hai vợ chồng.'
    ],
    ketLuan: 'Bà chết vì chính thứ mình tìm ra, khi chưa ai kịp biết nó nguy hiểm.'
  },
  {
    id: 3, key: 'lichsu_03_hennig_brand',
    nam: '1669', moc: 'NĂM',
    nhanVat: 'HENNIG BRAND',
    danh: 'NHÀ GIẢ KIM TÌM VÀNG, RA PHỐT PHO',
    hook: 'Ông đun cạn hàng nghìn lít nước tiểu để tìm vàng, và tìm ra thứ phát sáng trong đêm.',
    truocDo: 'AI CŨNG TIN CÓ CÁCH BIẾN CHÌ THÀNH VÀNG',
    boiCanh: [
      'Suốt hàng nghìn năm, các nhà giả kim tin có một chất giúp biến kim loại rẻ thành vàng.',
      'Vàng thì màu vàng, nước tiểu cũng vàng, nên Brand tin trong đó có mầm vàng.',
      'Ông gom khoảng năm nghìn lít nước tiểu rồi đun cô đặc suốt nhiều tháng trời.'
    ],
    moment: 'CHẤT LẠ PHÁT SÁNG XANH TRONG BÓNG TỐI',
    chiTiet: [
      'Thứ còn lại sau khi cô cạn không phải vàng, mà là chất sáp trắng phát sáng xanh trong tối.',
      'Ông đặt tên nó theo tiếng Hy Lạp phosphoros, nghĩa là kẻ mang ánh sáng.',
      'Đây là nguyên tố đầu tiên trong lịch sử ghi rõ được ai tìm ra và tìm ra bằng cách nào.'
    ],
    dukien: 'Phốt pho trắng tự bốc cháy trong không khí ở khoảng 30°C',
    dukienLabel: 'THỨ ÔNG VÔ TÌNH TÌM RA',
    diSan: [
      'Phốt pho ngày nay là thành phần của phân bón nuôi sống phần lớn nhân loại.',
      'Giả kim thuật thất bại về mục tiêu nhưng để lại lò nung, cân, phép chưng cất và thói quen ghi chép.',
      'Biến chì thành vàng thật ra làm được, nhưng phải đổi số proton bằng phản ứng hạt nhân.'
    ],
    ketLuan: 'Tìm sai thứ, nhưng tìm đúng cách, thì vẫn ra được cái mới.'
  },
  {
    id: 4, key: 'lichsu_04_alfred_nobel',
    nam: '1867', moc: 'NĂM',
    nhanVat: 'ALFRED NOBEL',
    danh: 'PHÁT MINH THUỐC NỔ RỒI LẬP GIẢI HOÀ BÌNH',
    hook: 'Một bản cáo phó đăng nhầm đã đổi hướng cả cuộc đời ông.',
    truocDo: 'NITROGLIXERIN QUÁ MẠNH NÊN QUÁ NGUY HIỂM',
    boiCanh: [
      'Nitroglixerin nổ mạnh hơn thuốc súng rất nhiều nhưng chỉ cần rung lắc là phát nổ.',
      'Nhiều vụ nổ đã xảy ra khi vận chuyển, trong đó một vụ giết chính em trai của Nobel.',
      'Vì quá nguy hiểm nên không ai dám dùng nó vào việc đào hầm hay mở đường.'
    ],
    moment: 'TRỘN VỚI ĐẤT XỐP ĐỂ THUẦN HOÁ SỨC NỔ',
    chiTiet: [
      'Nobel thấm nitroglixerin vào một loại đất xốp gọi là điatomit, thành khối dẻo cầm tay được.',
      'Khối đó chỉ nổ khi có kíp nổ, còn va đập bình thường thì không sao cả.',
      'Ông gọi nó là dynamite, và nó lập tức có mặt ở khắp các công trường trên thế giới.'
    ],
    dukien: '4 C₃H₅N₃O₉ → 12 CO₂ + 10 H₂O + 6 N₂ + O₂',
    dukienLabel: 'PHẢN ỨNG NỔ CỦA NITROGLIXERIN',
    diSan: [
      'Năm một tám tám tám một tờ báo đăng nhầm cáo phó, gọi ông là kẻ buôn cái chết khi ông còn sống.',
      'Ông viết lại di chúc, dành gần hết tài sản để lập nên giải Nobel.',
      'Dynamite vẫn là thứ mở đường xuyên núi cho hầm mỏ và đường sắt suốt cả trăm năm sau.'
    ],
    ketLuan: 'Ông được đọc trước lời người đời nói về mình, và kịp viết lại đoạn kết.'
  },
  {
    id: 5, key: 'lichsu_05_fleming',
    nam: '1928', moc: 'NĂM',
    nhanVat: 'ALEXANDER FLEMING',
    danh: 'CÁI ĐĨA MỐC CỨU HÀNG TRĂM TRIỆU NGƯỜI',
    hook: 'Ông đi nghỉ hè mà quên dọn phòng thí nghiệm, và thay đổi cả nền y học.',
    truocDo: 'MỘT VẾT XƯỚC CŨNG CÓ THỂ GIẾT NGƯỜI',
    boiCanh: [
      'Trước khi có kháng sinh, nhiễm trùng từ một vết thương nhỏ vẫn thường dẫn tới tử vong.',
      'Chiến tranh thế giới thứ nhất khiến Fleming chứng kiến vô số ca chết vì nhiễm trùng vết thương.',
      'Thuốc sát trùng thời đó diệt cả vi khuẩn lẫn tế bào lành nên không cứu nổi ca nặng.'
    ],
    moment: 'VÙNG TRỐNG QUANH ĐÁM MỐC XANH',
    chiTiet: [
      'Đi nghỉ về, ông thấy một đĩa nuôi tụ cầu bị mốc xanh rơi vào.',
      'Quanh đám mốc có một vòng trong suốt, vi khuẩn ở đó đã chết sạch.',
      'Ông đặt tên chất do nấm tiết ra là penicillin, lấy theo tên nấm Penicillium.'
    ],
    dukien: 'Penicillin phá vách tế bào vi khuẩn, không đụng tới tế bào người',
    dukienLabel: 'VÌ SAO NÓ HIỆU QUẢ',
    diSan: [
      'Tới Thế chiến thứ hai penicillin mới sản xuất được hàng loạt và cứu vô số thương binh.',
      'Fleming, Florey và Chain cùng nhận Nobel Y học năm một chín bốn lăm.',
      'Chính Fleming là người sớm cảnh báo rằng lạm dụng kháng sinh sẽ gây kháng thuốc.'
    ],
    ketLuan: 'Ông không tạo ra penicillin, ông chỉ là người chịu nhìn kỹ cái đĩa mốc.'
  },
  {
    id: 6, key: 'lichsu_06_wohler_ure',
    nam: '1828', moc: 'NĂM',
    nhanVat: 'FRIEDRICH WÖHLER',
    danh: 'XOÁ RANH GIỚI SỐNG VÀ KHÔNG SỐNG',
    hook: 'Ông định làm một chất, lại vô tình lật đổ một niềm tin cả trăm năm tuổi.',
    truocDo: 'CHẤT HỮU CƠ PHẢI CÓ SINH LỰC MỚI TẠO RA ĐƯỢC',
    boiCanh: [
      'Người ta tin chất trong cơ thể sống chỉ sinh vật mới làm ra được, nhờ một thứ gọi là sinh lực.',
      'Theo niềm tin đó, phòng thí nghiệm không bao giờ tổng hợp nổi chất hữu cơ từ chất vô cơ.',
      'Ranh giới giữa hoá vô cơ và hoá hữu cơ khi ấy được coi là không thể vượt qua.'
    ],
    moment: 'ĐUN MỘT MUỐI VÔ CƠ, THU ĐƯỢC URE',
    chiTiet: [
      'Wöhler định điều chế amoni xianat, một muối vô cơ hết sức bình thường.',
      'Đun nóng lên thì sản phẩm thu được lại chính là ure, chất có trong nước tiểu.',
      'Ông viết thư cho thầy mình rằng ông làm ra được ure mà không cần tới quả thận nào.'
    ],
    dukien: 'NH₄OCN → (NH₂)₂CO',
    dukienLabel: 'PHẢN ỨNG LÀM SỤP ĐỔ THUYẾT SINH LỰC',
    diSan: [
      'Từ đó hoá hữu cơ tổng hợp ra đời, mở đường cho thuốc, nhựa, sợi và thuốc nhuộm.',
      'Ranh giới sống và không sống trong hoá học bị xoá bỏ hoàn toàn.',
      'Ngày nay hầu hết thuốc chữa bệnh đều là chất hữu cơ tổng hợp trong nhà máy.'
    ],
    ketLuan: 'Một phản ứng nhỏ đủ để kết thúc một niềm tin rất lớn.'
  },
  {
    id: 7, key: 'lichsu_07_kekule_benzen',
    nam: '1865', moc: 'NĂM',
    nhanVat: 'AUGUST KEKULÉ',
    danh: 'GIẤC MƠ CON RẮN TỰ CẮN ĐUÔI',
    hook: 'Ông kể mình nhìn ra vòng benzen trong một giấc mơ bên lò sưởi.',
    truocDo: 'CÔNG THỨC BENZEN KHÔNG SAO XẾP NỔI',
    boiCanh: [
      'Benzen có công thức C sáu H sáu, ít hydro tới mức không xếp thành mạch thẳng cho hợp lý.',
      'Mọi cách xếp mạch hở đều mâu thuẫn với tính chất thực đo được của benzen.',
      'Bế tắc đó chặn đường cả ngành hoá hữu cơ suốt nhiều năm liền.'
    ],
    moment: 'MẠCH KHÔNG THẲNG, MÀ KHÉP THÀNH VÒNG',
    chiTiet: [
      'Kekulé kể ông thiu thiu ngủ bên lò sưởi và thấy các chuỗi nguyên tử uốn éo như rắn.',
      'Một con rắn quay lại cắn chính đuôi mình, và ông bừng tỉnh.',
      'Ông đề xuất sáu nguyên tử cacbon khép thành vòng kín, mỗi cacbon mang một hydro.'
    ],
    dukien: 'C₆H₆ — vòng sáu cạnh, electron pi giải toả đều',
    dukienLabel: 'CẤU TRÚC BENZEN',
    diSan: [
      'Vòng benzen là bộ khung của thuốc nhuộm, thuốc chữa bệnh và vô số vật liệu.',
      'Khái niệm hợp chất thơm trong hoá hữu cơ ra đời từ đúng cái vòng này.',
      'Về sau người ta hiểu rõ hơn: các liên kết trong vòng đều như nhau chứ không đơn đôi xen kẽ.'
    ],
    ketLuan: 'Câu chuyện giấc mơ có thể được kể lại cho đẹp, nhưng cái vòng thì đúng thật.'
  },
  {
    id: 8, key: 'lichsu_08_oxy_priestley',
    nam: '1774', moc: 'NĂM',
    nhanVat: 'PRIESTLEY VÀ SCHEELE',
    danh: 'HAI NGƯỜI CÙNG TÌM RA OXY',
    hook: 'Cả hai đều cầm oxy trong tay, và cả hai đều gọi sai tên nó.',
    truocDo: 'CHÁY LÀ DO VẬT NHẢ RA CHẤT PHLOGISTON',
    boiCanh: [
      'Thuyết phlogiston cho rằng vật cháy được là vì nó nhả ra một chất vô hình gọi là phlogiston.',
      'Thuyết này giải thích được khá nhiều hiện tượng nên cả châu Âu tin theo.',
      'Điều nó không giải thích nổi là vì sao kim loại cháy xong lại nặng thêm chứ không nhẹ đi.'
    ],
    moment: 'NUNG THUỶ NGÂN OXIT, THU ĐƯỢC KHÍ LÀM LỬA BÙNG LÊN',
    chiTiet: [
      'Scheele điều chế được khí này khoảng năm một bảy bảy hai nhưng công bố muộn.',
      'Priestley dùng kính hội tụ nung thuỷ ngân oxit và thu được khí làm que đóm bùng cháy.',
      'Cả hai gọi nó là không khí đã khử phlogiston, vẫn nhìn theo lăng kính thuyết cũ.'
    ],
    dukien: '2 HgO → 2 Hg + O₂↑',
    dukienLabel: 'PHẢN ỨNG PRIESTLEY DÙNG',
    diSan: [
      'Lavoisier mới là người hiểu đúng: cháy là kết hợp với oxy, và chính ông đặt tên oxy.',
      'Thuyết phlogiston sụp đổ, hoá học bước vào thời kỳ cân đo định lượng.',
      'Đây thành bài học kinh điển: tìm ra một thứ chưa chắc đã hiểu được thứ đó.'
    ],
    ketLuan: 'Có thứ trong tay mà nhìn bằng lăng kính cũ thì vẫn không thấy nó là gì.'
  },
  {
    id: 9, key: 'lichsu_09_robert_boyle',
    nam: '1661', moc: 'NĂM',
    nhanVat: 'ROBERT BOYLE',
    danh: 'NGƯỜI TÁCH HOÁ HỌC RA KHỎI GIẢ KIM',
    hook: 'Ông là người đầu tiên dám hỏi lại: rốt cuộc thế nào mới gọi là nguyên tố?',
    truocDo: 'MỌI VẬT LÀM TỪ ĐẤT, NƯỚC, LỬA VÀ KHÍ',
    boiCanh: [
      'Từ thời Aristotle, người ta tin mọi vật chất đều làm từ bốn yếu tố đất, nước, lửa và khí.',
      'Các nhà giả kim thêm vào muối, lưu huỳnh và thuỷ ngân, nhưng vẫn không có định nghĩa rõ ràng.',
      'Không ai phân biệt nổi đâu là chất đơn giản nhất, đâu là chất do nhiều thứ ghép lại.'
    ],
    moment: 'NGUYÊN TỐ LÀ THỨ KHÔNG TÁCH NHỎ ĐƯỢC NỮA',
    chiTiet: [
      'Trong cuốn Nhà hoá học hoài nghi, Boyle định nghĩa nguyên tố là chất không tách được thành chất đơn giản hơn.',
      'Ông đòi mọi khẳng định phải dựa trên thí nghiệm đo được, không dựa vào lý luận suông.',
      'Ông cũng tìm ra quan hệ giữa áp suất và thể tích chất khí, nay gọi là định luật Boyle.'
    ],
    dukien: 'p × V = hằng số  (ở nhiệt độ không đổi)',
    dukienLabel: 'ĐỊNH LUẬT BOYLE',
    diSan: [
      'Định nghĩa nguyên tố của ông là nền để hai trăm năm sau Mendeleev dựng nên bảng tuần hoàn.',
      'Yêu cầu phải chứng minh bằng thí nghiệm trở thành nguyên tắc của cả ngành.',
      'Định luật Boyle vẫn nằm trong chương trình phổ thông cho tới hôm nay.'
    ],
    ketLuan: 'Hoá học thành khoa học từ đúng lúc có người dám hỏi lại định nghĩa.'
  },
  {
    id: 10, key: 'lichsu_10_john_dalton',
    nam: '1803', moc: 'NĂM',
    nhanVat: 'JOHN DALTON',
    danh: 'THẦY GIÁO DỰNG NÊN THUYẾT NGUYÊN TỬ',
    hook: 'Ông cân đo tỉ mỉ tới mức nhìn ra được thứ mà kính hiển vi thời đó không thấy nổi.',
    truocDo: 'NGUYÊN TỬ MỚI CHỈ LÀ MỘT Ý TƯỞNG TRIẾT HỌC',
    boiCanh: [
      'Ý tưởng vật chất làm từ những hạt nhỏ nhất đã có từ thời Hy Lạp cổ nhưng chỉ là suy luận.',
      'Suốt hai nghìn năm không ai đưa ra được bằng chứng đo đạc nào cho ý tưởng đó.',
      'Hoá học khi ấy đã cân đong được, nhưng chưa ai giải thích vì sao tỉ lệ khối lượng luôn là số đơn giản.'
    ],
    moment: 'TỈ LỆ KHỐI LƯỢNG LUÔN LÀ SỐ NGUYÊN ĐƠN GIẢN',
    chiTiet: [
      'Dalton nhận ra cùng một lượng cacbon kết hợp với lượng oxy theo tỉ lệ đúng một và hai.',
      'Điều đó chỉ hợp lý nếu vật chất gồm những hạt rời rạc ghép với nhau theo số nguyên.',
      'Ông lập bảng khối lượng nguyên tử tương đối đầu tiên, lấy hydro làm mốc.'
    ],
    dukien: 'Cùng 1 g cacbon: CO có 1,33 g O · CO₂ có 2,66 g O',
    dukienLabel: 'ĐỊNH LUẬT TỈ LỆ BỘI',
    diSan: [
      'Thuyết nguyên tử thành nền tảng để viết mọi phương trình hoá học sau này.',
      'Khái niệm khối lượng nguyên tử vẫn nằm trong mỗi ô của bảng tuần hoàn.',
      'Bản thân Dalton bị mù màu, và chính ông là người đầu tiên mô tả khoa học về chứng này.'
    ],
    ketLuan: 'Ông không nhìn thấy nguyên tử, ông cân được chúng.'
  },
  {
    id: 11, key: 'lichsu_11_rutherford',
    nam: '1911', moc: 'NĂM',
    nhanVat: 'ERNEST RUTHERFORD',
    danh: 'BẮN HẠT VÀO LÁ VÀNG ĐỂ THẤY HẠT NHÂN',
    hook: 'Chỉ vài hạt bật ngược trở lại, thế là mô hình nguyên tử cũ sụp đổ.',
    truocDo: 'NGUYÊN TỬ GIỐNG NHƯ CHIẾC BÁNH RẮC NHO',
    boiCanh: [
      'Mô hình của Thomson coi nguyên tử là khối điện dương dàn đều, electron cắm rải rác trong đó.',
      'Theo mô hình ấy, hạt anpha bắn qua lá kim loại mỏng thì chỉ bị lệch đi chút ít.',
      'Rutherford giao cho hai học trò làm thí nghiệm kiểm chứng, tưởng chỉ là bài tập thường.'
    ],
    moment: 'MỘT SỐ HẠT BẬT NGƯỢC TRỞ LẠI',
    chiTiet: [
      'Phần lớn hạt anpha xuyên thẳng qua lá vàng như thể không có gì cản đường.',
      'Nhưng cứ khoảng tám nghìn hạt lại có một hạt bật lại gần như ngược chiều.',
      'Ông nói điều đó khó tin như bắn đạn pháo vào tờ giấy mà viên đạn dội ngược lại trúng mình.'
    ],
    dukien: 'Hạt nhân chỉ chiếm khoảng 1 phần 10 000 đường kính nguyên tử',
    dukienLabel: 'ĐIỀU THÍ NGHIỆM CHỨNG MINH',
    diSan: [
      'Nguyên tử hoá ra gần như rỗng, toàn bộ khối lượng dồn vào một hạt nhân cực nhỏ.',
      'Từ đó mới có vật lý hạt nhân, năng lượng hạt nhân và y học hạt nhân.',
      'Rutherford cũng là người đầu tiên biến được một nguyên tố thành nguyên tố khác.'
    ],
    ketLuan: 'Trong nguyên tử, chỗ trống nhiều hơn hẳn chỗ có vật chất.'
  },
  {
    id: 12, key: 'lichsu_12_linus_pauling',
    nam: '1954', moc: 'NĂM',
    nhanVat: 'LINUS PAULING',
    danh: 'HAI GIẢI NOBEL KHÔNG CHIA VỚI AI',
    hook: 'Một giải cho liên kết hoá học, một giải cho việc vận động cấm thử bom hạt nhân.',
    truocDo: 'CHƯA AI GIẢI THÍCH ĐƯỢC VÌ SAO NGUYÊN TỬ DÍNH NHAU',
    boiCanh: [
      'Đầu thế kỷ hai mươi, người ta biết nguyên tử liên kết với nhau nhưng không rõ bản chất là gì.',
      'Cơ học lượng tử vừa mới ra đời, còn quá mới để đem áp vào hoá học.',
      'Pauling là một trong những người đầu tiên đem lượng tử vào giải thích liên kết hoá học.'
    ],
    moment: 'ĐO ĐƯỢC ĐỘ THAM ELECTRON CỦA TỪNG NGUYÊN TỐ',
    chiTiet: [
      'Ông đưa ra thang độ âm điện, cho biết nguyên tử nào kéo electron về phía mình mạnh hơn.',
      'Nhờ đó dự đoán được liên kết là ion hay cộng hoá trị, phân cực nhiều hay ít.',
      'Ông cũng mô tả đúng cấu trúc xoắn anpha của protein trước cả khi có ảnh chụp.'
    ],
    dukien: 'Thang Pauling: F = 3,98 cao nhất · Cs = 0,79 thấp nhất',
    dukienLabel: 'THANG ĐO ÔNG ĐẶT RA',
    diSan: [
      'Độ âm điện Pauling có mặt trong mọi sách giáo khoa hoá học tới tận hôm nay.',
      'Nobel Hoá học năm một chín năm tư, Nobel Hoà bình năm một chín sáu hai.',
      'Ông cũng nổi tiếng vì quan điểm gây tranh cãi rằng vitamin C liều cao chữa được nhiều bệnh.'
    ],
    ketLuan: 'Người giỏi nhất cũng có lúc sai, và điều đó không xoá đi phần họ đã đúng.'
  },
  {
    id: 13, key: 'lichsu_13_rosalind_franklin',
    nam: '1952', moc: 'NĂM',
    nhanVat: 'ROSALIND FRANKLIN',
    danh: 'TẤM ẢNH SỐ NĂM MƯƠI MỐT',
    hook: 'Một tấm ảnh nhiễu xạ của bà đã nói ra hình dạng của sự sống.',
    truocDo: 'KHÔNG AI BIẾT ADN TRÔNG NHƯ THẾ NÀO',
    boiCanh: [
      'Người ta đã biết ADN mang thông tin di truyền nhưng không biết nó có cấu trúc ra sao.',
      'Nhiều nhóm đua nhau đoán, có nhóm còn đoán ba chuỗi và đoán sai hoàn toàn.',
      'Franklin là chuyên gia nhiễu xạ tia X, thứ duy nhất khi ấy nhìn được cấu trúc ở mức phân tử.'
    ],
    moment: 'HÌNH CHỮ X HIỆN LÊN TRÊN PHIM',
    chiTiet: [
      'Bà chụp được tấm ảnh nhiễu xạ rõ nét mà giới nghiên cứu quen gọi là Ảnh năm mươi mốt.',
      'Hình chữ X trên tấm ảnh là dấu hiệu đặc trưng của một cấu trúc xoắn.',
      'Từ tấm ảnh đó bà tính ra được bước xoắn và đường kính của chuỗi.'
    ],
    dukien: 'Xoắn kép · bước xoắn 3,4 nm · đường kính 2 nm',
    dukienLabel: 'SỐ LIỆU ĐỌC RA TỪ TẤM ẢNH',
    diSan: [
      'Watson và Crick dựng nên mô hình xoắn kép sau khi được xem chính tấm ảnh này.',
      'Bà mất năm một chín năm tám vì ung thư, bốn năm trước khi giải Nobel được trao.',
      'Giải Nobel không trao cho người đã mất, nên tên bà vắng mặt trong danh sách.'
    ],
    ketLuan: 'Công trình của bà nằm trong mô hình ấy, dù tên bà thì không.'
  },
  {
    id: 14, key: 'lichsu_14_william_perkin',
    nam: '1856', moc: 'NĂM',
    nhanVat: 'WILLIAM PERKIN',
    danh: 'CẬU SINH VIÊN MƯỜI TÁM TUỔI ĐỔI MÀU THẾ GIỚI',
    hook: 'Cậu định làm thuốc chữa sốt rét, lại làm ra thuốc nhuộm tổng hợp đầu tiên của loài người.',
    truocDo: 'MÀU TÍM TỪNG ĐẮT NGANG VÀNG',
    boiCanh: [
      'Mọi thuốc nhuộm khi ấy đều lấy từ cây cỏ hoặc động vật nên rất đắt đỏ.',
      'Riêng màu tím phải chiết từ một loài ốc biển, đắt tới mức chỉ vua chúa mới dám dùng.',
      'Perkin mới mười tám tuổi, đang thử tổng hợp quinin chữa sốt rét ngay trong phòng thí nghiệm tại nhà.'
    ],
    moment: 'CẶN ĐEN RỬA RA LẠI CHO MÀU TÍM RỰC',
    chiTiet: [
      'Thí nghiệm thất bại, trong bình chỉ còn lại một đám cặn đen xì.',
      'Khi rửa bình bằng cồn, cậu thấy dung dịch chuyển sang màu tím rất đẹp.',
      'Cậu bỏ học, vay tiền cha mở nhà máy, rồi bán thứ màu tím ấy đi khắp châu Âu.'
    ],
    dukien: 'Anilin + K₂Cr₂O₇ → mauveine (tím)',
    dukienLabel: 'PHẢN ỨNG TÌNH CỜ',
    diSan: [
      'Ngành thuốc nhuộm tổng hợp ra đời, kéo theo cả nền công nghiệp hoá chất hữu cơ.',
      'Chính ngành thuốc nhuộm sau này lại sinh ra ngành dược phẩm hiện đại.',
      'Màu tím từ chỗ chỉ dành cho vua chúa trở thành màu mà ai cũng mặc được.'
    ],
    ketLuan: 'Cậu thất bại đúng vào chỗ đáng để thất bại.'
  },
  {
    id: 15, key: 'lichsu_15_transistor_gecmani',
    nam: '1947', moc: 'NĂM',
    nhanVat: 'BARDEEN, BRATTAIN, SHOCKLEY',
    danh: 'TRANSISTOR ĐẦU TIÊN LÀM BẰNG GECMANI',
    hook: 'Linh kiện mở màn cho kỷ nguyên máy tính hoàn toàn không làm từ silic.',
    truocDo: 'MÁY TÍNH CHẠY BẰNG ĐÈN ĐIỆN TỬ NÓNG RỰC',
    boiCanh: [
      'Máy tính thời đó dùng hàng nghìn bóng đèn điện tử, chiếm cả căn phòng và rất hay cháy.',
      'Mỗi bóng tiêu tốn nhiều điện và toả nhiệt lớn, nên máy chạy vài giờ là hỏng.',
      'Ai cũng cần một linh kiện khuếch đại nhỏ hơn, nguội hơn và bền hơn.'
    ],
    moment: 'MỘT MẨU GECMANI THAY CẢ BÓNG ĐÈN',
    chiTiet: [
      'Nhóm ở phòng thí nghiệm Bell ép hai tiếp điểm vàng lên một mẩu tinh thể gecmani.',
      'Dòng điện nhỏ ở một cực điều khiển được dòng lớn hơn nhiều ở cực kia.',
      'Gecmani được chọn trước vì thời đó nó dễ tinh chế sạch hơn silic.'
    ],
    dukien: 'Silic thắng về sau nhờ lớp SiO₂ cách điện tự sinh, bền và rẻ',
    dukienLabel: 'VÌ SAO SAU NÀY ĐỔI SANG SILIC',
    diSan: [
      'Toàn bộ máy tính, điện thoại và Internet hôm nay đều dựng trên linh kiện này.',
      'Ba người cùng nhận giải Nobel Vật lý năm một chín năm sáu.',
      'Gecmani nay quay trở lại trong chip tốc độ cao và trong thiết bị cáp quang.'
    ],
    ketLuan: 'Thứ nhỏ nhất trong máy tính lại là thứ đổi thay thế giới nhiều nhất.'
  },
  {
    id: 16, key: 'lichsu_16_tecneti',
    nam: '1937', moc: 'NĂM',
    nhanVat: 'PERRIER VÀ SEGRÈ',
    danh: 'NGUYÊN TỐ ĐẦU TIÊN DO CON NGƯỜI TẠO RA',
    hook: 'Ô số bốn mươi ba trong bảng tuần hoàn bỏ trống suốt gần bảy mươi năm.',
    truocDo: 'Ô SỐ BỐN MƯƠI BA CỨ TRỐNG MÃI DÙ AI CŨNG TÌM',
    boiCanh: [
      'Mendeleev đã chừa sẵn ô số bốn mươi ba và đoán trước tính chất của nó.',
      'Nhiều nhóm tuyên bố tìm ra rồi lại bị bác bỏ vì không ai lặp lại được kết quả.',
      'Lý do thật là trên Trái Đất gần như không còn nguyên tố này ở dạng tự nhiên.'
    ],
    moment: 'BẮN HẠT VÀO MOLYPDEN ĐỂ TỰ TẠO RA NÓ',
    chiTiet: [
      'Segrè xin được một lá molypden đã bị bắn phá trong máy gia tốc ở Berkeley.',
      'Cùng với Perrier, ông tách ra được một lượng cực nhỏ của nguyên tố số bốn mươi ba.',
      'Họ đặt tên là tecneti, lấy từ tiếng Hy Lạp technetos nghĩa là nhân tạo.'
    ],
    dukien: '⁹⁶Mo + ²H → ⁹⁷Tc + n',
    dukienLabel: 'PHẢN ỨNG TẠO RA NGUYÊN TỐ',
    diSan: [
      'Tecneti ngày nay là chất đánh dấu phóng xạ dùng nhiều nhất trong chẩn đoán hình ảnh.',
      'Mỗi năm có hàng chục triệu ca chụp y học cần tới nguyên tố này.',
      'Nó mở ra con đường tạo thêm hàng loạt nguyên tố nhân tạo về sau.'
    ],
    ketLuan: 'Ô trống cuối cùng được lấp bằng chính thứ con người tự làm ra.'
  },
  {
    id: 17, key: 'lichsu_17_met_krypton',
    nam: '1960', moc: 'NĂM',
    nhanVat: 'KHI MỘT MÉT LÀ ÁNH SÁNG',
    danh: 'ĐƠN VỊ ĐO BỎ MẪU VẬT ĐỂ THEO TỰ NHIÊN',
    hook: 'Suốt hơn hai mươi năm, một mét được định nghĩa bằng vạch sáng của một khí hiếm.',
    truocDo: 'MÉT LÀ MỘT THANH KIM LOẠI CẤT TRONG HẦM',
    boiCanh: [
      'Từ năm một tám tám chín, mét chuẩn là một thanh hợp kim bạch kim iridi cất ở ngoại ô Paris.',
      'Muốn hiệu chuẩn thì cả thế giới phải mang thước tới so với đúng thanh kim loại đó.',
      'Mà thanh ấy vẫn giãn nở theo nhiệt độ, vẫn có thể hỏng, mất hoặc bị đánh cắp.'
    ],
    moment: 'LẤY BƯỚC SÓNG ÁNH SÁNG LÀM THƯỚC',
    chiTiet: [
      'Năm một chín sáu mươi người ta định nghĩa lại: một mét bằng một số bước sóng của vạch cam khí kripton.',
      'Ánh sáng do một nguyên tử phát ra thì ở đâu cũng giống nhau, không cần giữ mẫu vật nào.',
      'Bất kỳ phòng thí nghiệm nào trên thế giới cũng tự dựng lại được chuẩn đó.'
    ],
    dukien: '1 m = 1 650 763,73 bước sóng vạch cam của ⁸⁶Kr',
    dukienLabel: 'ĐỊNH NGHĨA NĂM 1960',
    diSan: [
      'Năm một chín tám ba mét lại đổi lần nữa, lần này gắn với tốc độ ánh sáng trong chân không.',
      'Từ đó các đơn vị đo dần chuyển hết sang dựa vào hằng số tự nhiên thay vì mẫu vật.',
      'Năm hai không một chín tới lượt kilôgam bỏ quả cân mẫu, chuyển sang định nghĩa theo hằng số Planck.'
    ],
    ketLuan: 'Loài người bỏ dần các mẫu vật, để tin vào những thứ tự nhiên không bao giờ đổi.'
  }
];
