/** Đợt 2 — chủ đề Bất ngờ và Nguyên tố. Khuôn ở scripts/gen-fact-reels-v2.mjs */

export const ROWS = [
  {
    id: 14, key: 'cl2_14_kinh_nha_tho', tag: 'Bất ngờ',
    title: 'THUỶ TINH KHÔNG HỀ CHẢY, DÙ NGƯỜI TA VẪN KỂ THẾ',
    claim: 'Kính cửa sổ nhà thờ cổ dày ở dưới, mỏng ở trên. Ai cũng bảo do thuỷ tinh là chất lỏng chảy rất chậm suốt bảy trăm năm. Chuyện đó sai.',
    viSao: 'THỢ XƯA THỔI KÍNH KHÔNG ĐỀU',
    why: [
      'Thợ thời trung cổ quay tấm thuỷ tinh nóng cho nó bè ra, nên tấm luôn dày mỏng không đều.',
      'Khi lắp, họ đặt mép dày xuống dưới cho vững, thế thôi. Nhiều ô còn lắp ngược, dày ở trên.',
      'Muốn thuỷ tinh chảy được một chút cũng cần thời gian dài hơn tuổi vũ trụ rất nhiều lần.'
    ],
    dukien: 'Thuỷ tinh là chất rắn vô định hình, không phải chất lỏng siêu nhớt',
    dukienLabel: 'SỰ THẬT',
    gapODau: [
      'Đây là một trong những hiểu lầm khoa học được nhắc lại nhiều nhất.',
      'Kính cửa nhà bạn cũng sẽ không dày lên ở đáy sau vài chục năm.',
      'Cùng kiểu vô định hình còn có kẹo cứng và nhựa thông.'
    ],
    ketLuan: 'Một câu chuyện nghe hợp lý quá đôi khi lại là dấu hiệu nên kiểm tra lại.'
  },
  {
    id: 15, key: 'cl2_15_nuoc_con', tag: 'Bất ngờ',
    title: 'MỘT CỐC NƯỚC CỘNG MỘT CỐC CỒN KHÔNG RA HAI CỐC',
    claim: 'Đong đúng năm mươi mililit nước và năm mươi mililit cồn rồi trộn lại, bạn không được một trăm mà chỉ khoảng chín mươi sáu mililit.',
    viSao: 'PHÂN TỬ NHỎ CHUI VÀO KHE PHÂN TỬ LỚN',
    why: [
      'Phân tử nước nhỏ hơn phân tử cồn khá nhiều.',
      'Khi trộn, nước len vào các khoảng trống giữa những phân tử cồn cồng kềnh.',
      'Hai bên còn hút nhau bằng liên kết hydro, kéo nhau lại gần hơn nữa.'
    ],
    dukien: '50 ml H₂O + 50 ml C₂H₅OH ≈ 96 ml, hụt khoảng 4%',
    dukienLabel: 'ĐO ĐƯỢC BAO NHIÊU',
    gapODau: [
      'Đây là lý do độ rượu tính theo phần trăm thể tích phải quy về nhiệt độ chuẩn.',
      'Pha chế trong phòng thí nghiệm luôn đong theo khối lượng cho chắc.',
      'Cũng hiện tượng ấy khi trộn cồn với xăng làm nhiên liệu sinh học.'
    ],
    ketLuan: 'Thể tích không cộng thẳng được, vì vật chất phần lớn là khoảng trống.'
  },
  {
    id: 16, key: 'cl2_16_khong_mau', tag: 'Bất ngờ',
    title: 'KHÔNG CHẤT NÀO THỰC SỰ KHÔNG MÀU',
    claim: 'Nước trong veo, thuỷ tinh trong suốt, không khí vô hình. Nhưng chất nào cũng nuốt ánh sáng ở một dải bước sóng nào đó, chỉ là mắt ta không thấy.',
    viSao: 'MẮT NGƯỜI CHỈ NHÌN ĐƯỢC MỘT KHE HẸP',
    why: [
      'Mắt người chỉ bắt được bước sóng từ khoảng bốn trăm tới bảy trăm nanomet.',
      'Nước hấp thụ mạnh ở vùng hồng ngoại, thứ ta không nhìn thấy nhưng cảm được là hơi ấm.',
      'Đổ đầy nước vào một bể thật sâu thì ánh sáng đỏ bị nuốt trước, nên biển sâu có màu lam.'
    ],
    dukien: 'Nước hấp thụ ánh sáng đỏ mạnh gấp ~100 lần ánh sáng lam',
    dukienLabel: 'VÌ SAO BIỂN MÀU LAM',
    gapODau: [
      'Bể bơi càng sâu nhìn càng xanh, không phải do phản chiếu bầu trời.',
      'Máy quang phổ đọc chính những dải hấp thụ này để biết chất gì đang có mặt.',
      'Kem chống nắng làm việc bằng cách hấp thụ tia tử ngoại ta không nhìn thấy.'
    ],
    ketLuan: 'Trong suốt chỉ có nghĩa là trong suốt với đôi mắt của riêng loài người.'
  },
  {
    id: 17, key: 'cl2_17_chi_la_ma', tag: 'Bất ngờ',
    title: 'NGƯỜI LA MÃ TRANG ĐIỂM BẰNG CHÌ',
    claim: 'Phụ nữ quý tộc La Mã bôi phấn trắng chứa chì lên mặt cho da trắng. Gần hai nghìn năm sau, nhân loại lại pha chì vào xăng.',
    viSao: 'CHÌ TÍCH LẠI VÀ KHÔNG ĐI RA',
    why: [
      'Chì lọt vào cơ thể thay chỗ canxi trong xương, nằm lại hàng chục năm.',
      'Nó phá enzym tạo máu và làm hỏng phát triển thần kinh, nhất là ở trẻ nhỏ.',
      'Người La Mã còn đun nước nho trong nồi chì cho ngọt, vì chì axetat có vị ngọt.'
    ],
    dukien: 'Chì trong xăng bị cấm ở hầu hết các nước từ thập niên 1990-2000',
    dukienLabel: 'MẤT BAO LÂU MỚI BỎ ĐƯỢC',
    gapODau: [
      'Sơn cũ trong nhà xây trước những năm chín mươi vẫn có thể chứa chì.',
      'Ống nước bằng chì đời cũ ở nhiều nước vẫn đang phải thay dần.',
      'Ắc quy chì axit trong ô tô phải thu hồi đúng nơi, không vứt bừa.'
    ],
    ketLuan: 'Cùng một sai lầm với chì, loài người mắc lại sau gần hai nghìn năm.'
  },
  {
    id: 18, key: 'cl2_18_gali_pha_nhom', tag: 'Bất ngờ',
    title: 'MỘT GIỌT KIM LOẠI LÀM VỠ VỤN CẢ THANH NHÔM',
    claim: 'Nhỏ một giọt gali lên thanh nhôm rồi chờ vài giờ. Thanh nhôm cứng cáp ấy bẻ tay là gãy vụn như bánh đa.',
    viSao: 'GALI THẤM VÀO KHE GIỮA CÁC HẠT TINH THỂ',
    why: [
      'Kim loại không phải khối liền, nó gồm vô số hạt tinh thể nhỏ dính vào nhau ở biên hạt.',
      'Gali lỏng len theo đúng những biên hạt đó, tách rời từng hạt ra.',
      'Nhôm mất liên kết giữa các hạt nên còn hình dạng cũ mà không còn sức bền.'
    ],
    dukien: 'Gali nóng chảy ở 29,8°C — tan ngay trong lòng bàn tay',
    dukienLabel: 'VÌ SAO NÓ Ở THỂ LỎNG',
    gapODau: [
      'Vì vậy gali bị cấm mang lên máy bay dưới dạng lỏng số lượng lớn.',
      'Thí nghiệm này hay được chiếu trong lớp để dạy về biên hạt kim loại.',
      'Cùng nguyên tố ấy làm nên đèn LED xanh và bán dẫn cho củ sạc nhanh.'
    ],
    ketLuan: 'Kim loại mạnh hay yếu không nằm ở hạt, mà nằm ở chỗ các hạt dính vào nhau.'
  },
  {
    id: 19, key: 'cl2_19_nitinol', tag: 'Bất ngờ',
    title: 'HỢP KIM NHỚ ĐƯỢC HÌNH DẠNG CŨ CỦA MÌNH',
    claim: 'Bẻ cong một sợi nitinol thành hình gì cũng được. Thả vào nước nóng, nó bật lại đúng hình dạng ban đầu như chưa hề bị bẻ.',
    viSao: 'MẠNG TINH THỂ ĐỔI KIỂU RỒI ĐỔI LẠI',
    why: [
      'Nitinol là hợp kim niken và titan, mạng tinh thể của nó có hai kiểu sắp xếp.',
      'Ở nhiệt độ thấp mạng ở kiểu mềm, bẻ được; nguyên tử chỉ trượt chứ không đứt liên kết.',
      'Nung nóng lên, mạng trở về kiểu cứng ban đầu, kéo cả sợi về đúng hình cũ.'
    ],
    dukien: 'Nitinol = Ni + Ti, tỉ lệ xấp xỉ một một',
    dukienLabel: 'THÀNH PHẦN',
    gapODau: [
      'Gọng kính dẻo bẻ thế nào cũng bật lại.',
      'Stent mạch máu: gấp nhỏ đưa vào lòng mạch, tới nơi thân nhiệt làm nó bung ra.',
      'Dây chỉnh nha và cơ cấu bung của vệ tinh.'
    ],
    ketLuan: 'Không phải kim loại nhớ, mà là mạng tinh thể của nó chỉ có đúng một hình dạng bền.'
  },
  {
    id: 20, key: 'cl2_20_hai_nguyen_to_long', tag: 'Bất ngờ',
    title: 'CẢ BẢNG TUẦN HOÀN CHỈ CÓ HAI NGUYÊN TỐ Ở THỂ LỎNG',
    claim: 'Trong một trăm mười tám nguyên tố, ở nhiệt độ phòng chỉ có đúng hai thứ chảy được: thuỷ ngân và brom.',
    viSao: 'LIÊN KẾT QUÁ YẾU ĐỂ ĐÔNG LẠI',
    why: [
      'Thuỷ ngân là kim loại nhưng electron của nó bị hiệu ứng tương đối kéo sát hạt nhân, nên các nguyên tử liên kết rất lỏng lẻo.',
      'Brom là phi kim, phân tử hai nguyên tử chỉ hút nhau bằng lực yếu nên dễ hoá lỏng.',
      'Gali và xesi thì chỉ cần hơi ấm bàn tay là chảy, nhưng ở đúng nhiệt độ phòng vẫn là rắn.'
    ],
    dukien: 'Hg nóng chảy −38,8°C · Br₂ nóng chảy −7,2°C',
    dukienLabel: 'NHIỆT ĐỘ NÓNG CHẢY',
    gapODau: [
      'Nhiệt kế thuỷ ngân đời cũ, nay đã bị thay dần vì độc.',
      'Brom lỏng màu nâu đỏ, bốc hơi cay xè, dùng làm chất chống cháy.',
      'Cả hai đều rất độc, không phải thứ để nghịch.'
    ],
    ketLuan: 'Trạng thái lỏng ở nhiệt độ phòng hoá ra là chuyện hiếm chứ không phải bình thường.'
  },
  {
    id: 21, key: 'cl2_21_dich_thiec', tag: 'Bất ngờ',
    title: 'KIM LOẠI CÓ THỂ MẮC BỆNH VÀ MỤN RA THÀNH BỘT',
    claim: 'Đồ thiếc để lâu ngoài trời lạnh mọc ra những mụn xám rồi vụn thành bột. Người xưa gọi hiện tượng này là bệnh dịch của thiếc.',
    viSao: 'THIẾC ĐỔI SANG DẠNG THÙ HÌNH KHÁC',
    why: [
      'Dưới mười ba độ, thiếc trắng dẻo chuyển dần thành thiếc xám giòn, thể tích nở ra hơn một phần tư.',
      'Chỗ đã chuyển lại kích thích chỗ bên cạnh chuyển theo, nên lan như bệnh truyền nhiễm.',
      'Trời càng lạnh sâu càng chuyển nhanh, mạnh nhất quanh âm ba mươi ba độ.'
    ],
    dukien: 'Sn trắng ⇄ Sn xám, ngưỡng chuyển ở 13,2°C',
    dukienLabel: 'HAI DẠNG THÙ HÌNH',
    gapODau: [
      'Ống organ nhà thờ ở châu Âu từng mục ra vì lý do này.',
      'Có giả thuyết khuy áo lính bằng thiếc bị mủn trong mùa đông giá rét.',
      'Ngày nay thiếc hàn pha thêm chì hoặc bạc nên không còn mắc bệnh này.'
    ],
    ketLuan: 'Cùng một nguyên tố, đổi cách xếp nguyên tử là đổi luôn từ dẻo sang vụn.'
  },
  {
    id: 22, key: 'cl2_22_nhom_dat_hon_vang', tag: 'Nguyên tố',
    title: 'NHÔM TỪNG ĐẮT HƠN VÀNG',
    claim: 'Hoàng đế Napoléon đệ tam đãi khách quý bằng bộ đồ ăn nhôm, còn khách thường thì dùng vàng. Nhôm khi ấy quý hơn.',
    viSao: 'NHÔM BÁM CHẶT VÀO OXY KHÔNG CHỊU RỜI',
    why: [
      'Nhôm là kim loại nhiều nhất trong vỏ Trái Đất, nhưng luôn nằm trong quặng dưới dạng oxit.',
      'Liên kết nhôm với oxy quá chặt, không cách nào dùng than để khử như luyện sắt.',
      'Mãi tới năm một tám tám sáu mới có cách điện phân, và giá nhôm rơi tự do.'
    ],
    dukien: 'Al₂O₃ điện phân trong criolit nóng chảy ở khoảng 960°C',
    dukienLabel: 'CÁCH TÁCH RA ĐƯỢC',
    gapODau: [
      'Chóp tháp đài tưởng niệm Washington đúc bằng nhôm năm 1884 như một món xa xỉ.',
      'Ngày nay nhôm rẻ tới mức làm vỏ lon nước ngọt dùng một lần.',
      'Sản xuất nhôm cực tốn điện, nên nhà máy thường đặt cạnh thuỷ điện.'
    ],
    ketLuan: 'Quý hay rẻ không nằm ở chỗ nhiều hay ít, mà ở chỗ có tách ra được hay không.'
  },
  {
    id: 23, key: 'cl2_23_ten_dia_danh', tag: 'Nguyên tố',
    title: 'HƠN HAI MƯƠI NGUYÊN TỐ MANG TÊN MỘT VÙNG ĐẤT',
    claim: 'Bảng tuần hoàn là một tấm bản đồ thế giới thu nhỏ: Ba Lan, Pháp, Đức, Nga, Nhật, Mỹ và cả một ngôi làng Thuỵ Điển đều có mặt.',
    viSao: 'NGƯỜI TÌM RA ĐƯỢC QUYỀN ĐẶT TÊN',
    why: [
      'Thông lệ quốc tế cho nhóm phát hiện được đề xuất tên, và nhiều người chọn quê mình.',
      'Marie Curie đặt tên poloni theo Ba Lan, quê hương đang bị chia cắt của bà.',
      'Riêng làng Ytterby ở Thuỵ Điển có tới bốn nguyên tố mang tên: ytri, ytterbi, terbi và erbi.'
    ],
    dukien: 'Ytterby — một mỏ đá nhỏ, bốn nguyên tố trong bảng tuần hoàn',
    dukienLabel: 'KỶ LỤC KHÓ PHÁ',
    gapODau: [
      'Nihoni theo Nhật Bản, moscovi theo tỉnh Matxcơva, tennessin theo bang Tennessee.',
      'Germani theo nước Đức, franxi theo nước Pháp, americi theo châu Mỹ.',
      'Californi và berkeli đều theo bang và thành phố ở Mỹ.'
    ],
    ketLuan: 'Đọc kỹ bảng tuần hoàn là đọc được cả lịch sử ai đi trước ai trong khoa học.'
  },
  {
    id: 24, key: 'cl2_24_cacbon_14', tag: 'Nguyên tố',
    title: 'MỌI SINH VẬT MANG SẴN MỘT CHIẾC ĐỒNG HỒ TRONG NGƯỜI',
    claim: 'Từ lúc một sinh vật chết đi, một chiếc đồng hồ nguyên tử bắt đầu chạy trong xác nó. Đếm cái đồng hồ ấy là biết nó chết bao lâu rồi.',
    viSao: 'CACBON-14 NGỪNG ĐƯỢC BỔ SUNG KHI CHẾT',
    why: [
      'Tia vũ trụ liên tục tạo cacbon-14 trong khí quyển, cây hít vào, con vật ăn cây.',
      'Sinh vật còn sống thì tỉ lệ cacbon-14 trong người luôn cân bằng với ngoài trời.',
      'Chết rồi thì không nạp thêm được nữa, lượng cacbon-14 cứ thế rã dần theo đúng nhịp.'
    ],
    dukien: '¹⁴C → ¹⁴N + β⁻  (chu kỳ bán rã 5730 năm)',
    dukienLabel: 'NHỊP CỦA CHIẾC ĐỒNG HỒ',
    gapODau: [
      'Xác định tuổi xác ướp, gỗ cổ và than trong hang động.',
      'Chỉ đo được tới khoảng năm mươi nghìn năm, xa hơn thì lượng còn lại quá ít.',
      'Đá và hoá thạch triệu năm phải dùng cặp nguyên tố khác như urani hoặc kali.'
    ],
    ketLuan: 'Cái chết bấm nút khởi động một chiếc đồng hồ mà không ai tắt được.'
  }
];
