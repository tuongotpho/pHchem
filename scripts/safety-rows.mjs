/**
 * safety-rows.mjs — 20 chủ đề loạt "AN TOÀN HOÁ CHẤT TRONG NHÀ".
 * Khuôn dựng ở scripts/gen-safety-reels.mjs. Danh sách chốt ở safety-rows-draft.md
 *
 * Mỗi chủ đề gồm:
 *   danger     — việc làm sai (cảnh 1, chữ to)
 *   hauQua     — hậu quả (cảnh 1)
 *   hook       — câu dẫn ngắn
 *   chatTitle  — tên hiện tượng hoá học (cảnh 2)
 *   reaction   — phản ứng thật, tra cứu được
 *   why[3]     — vì sao nguy hiểm
 *   dauHieu[3] — dấu hiệu nhận biết
 *   mucDo      — mức độ nguy hiểm
 *   lamDung[3] — 3 bước làm đúng
 *   capCuu     — sơ cứu, CHỈ nêu cách chuẩn và an toàn
 */

export const SAFETY_ROWS = [
  {
    id: 1, key: 'antoan_01_javen_giam',
    danger: 'TRỘN NƯỚC TẨY JAVEN VỚI GIẤM',
    hauQua: 'SINH RA KHÍ CLO ĐỘC',
    hook: 'Nhiều nhà vẫn trộn vì tưởng tẩy được sạch hơn.',
    chatTitle: 'KHÍ CLO ĂN MÒN ĐƯỜNG HÔ HẤP',
    reaction: 'ClO⁻ + Cl⁻ + 2 H⁺ → Cl₂↑ + H₂O',
    why: [
      'Nước tẩy javen chứa ion hipoclorit, còn giấm, chanh hay nước tẩy bồn cầu đều là axit.',
      'Gặp axit, hipoclorit nhả ngay khí clo vàng lục, nặng hơn không khí nên đọng sát sàn.',
      'Nhà tắm kín không có quạt hút thì khí clo tích lại rất nhanh.'
    ],
    dauHieu: [
      'Mùi hắc xộc lên như mùi thuốc tẩy bể bơi đậm đặc.',
      'Cay mắt, chảy nước mũi, ho sặc và rát cổ họng.',
      'Tức ngực, thở rít, khó thở tăng dần sau vài giờ.'
    ],
    mucDo: 'Khí clo phá lớp niêm mạc phổi, triệu chứng nặng có thể đến muộn vài giờ sau khi đã ra ngoài.',
    lamDung: [
      'Không bao giờ trộn nước tẩy với bất kỳ chất tẩy nào khác.',
      'Dùng xong javen thì xả nước thật nhiều rồi mới dùng chất khác.',
      'Luôn mở cửa và bật quạt hút khi lau rửa nhà tắm.'
    ],
    capCuu: 'Ra ngay chỗ thoáng, không quay lại ngửi thử. Rửa mắt bằng nhiều nước sạch. Khó thở hay tức ngực thì gọi cấp cứu dù thấy đã đỡ.'
  },
  {
    id: 2, key: 'antoan_02_javen_amoniac',
    danger: 'DÙNG JAVEN CHUNG VỚI NƯỚC LAU KÍNH',
    hauQua: 'SINH RA KHÍ CLORAMIN',
    hook: 'Nhiều loại nước lau kính có amoniac mà nhãn không ghi rõ.',
    chatTitle: 'CLORAMIN GÂY VIÊM PHỔI HOÁ CHẤT',
    reaction: 'NH₃ + NaClO → NH₂Cl↑ + NaOH',
    why: [
      'Nước lau kính và một số nước lau sàn có chứa amoniac.',
      'Amoniac gặp javen sinh khí cloramin, hại phổi ngay ở nồng độ rất thấp.',
      'Nếu javen dư nhiều còn sinh tiếp hidrazin, một chất rất độc.'
    ],
    dauHieu: [
      'Mùi khai gắt trộn lẫn mùi thuốc tẩy.',
      'Ho khan, đau tức ngực, chảy nước mắt liên tục.',
      'Buồn nôn và khó thở tăng dần khi còn ở trong phòng.'
    ],
    mucDo: 'Chỉ cần lau chung trong phòng kín vài phút đã đủ gây viêm phổi hoá chất.',
    lamDung: [
      'Đọc nhãn, thấy chữ amoniac là không dùng chung với javen.',
      'Mỗi lần lau chỉ dùng một loại chất tẩy duy nhất.',
      'Lau xong chờ khô và thoáng hẳn rồi mới dùng loại khác.'
    ],
    capCuu: 'Rời phòng ngay và mở toang cửa từ bên ngoài. Không xông vào dọn tiếp. Khó thở thì gọi cấp cứu.'
  },
  {
    id: 3, key: 'antoan_03_nuoc_vao_axit',
    danger: 'ĐỔ NƯỚC VÀO AXIT ĐẶC',
    hauQua: 'AXIT SÔI BẮN THẲNG VÀO MẶT',
    hook: 'Câu axit vào nước học từ lớp tám mà rất nhiều người làm ngược.',
    chatTitle: 'NHIỆT TOẢ RA LÀM NƯỚC SÔI TỨC THÌ',
    reaction: 'H₂SO₄ + H₂O → dung dịch + nhiệt lượng rất lớn',
    why: [
      'Axit sunfuric đặc gặp nước toả nhiệt cực mạnh và tức thì.',
      'Giọt nước nhẹ nên nổi trên mặt axit, nhận trọn nhiệt đó rồi sôi bùng ngay.',
      'Hơi nước bùng lên kéo theo axit bắn tung ra xung quanh.'
    ],
    dauHieu: [
      'Nghe tiếng xèo và thấy khói trắng bốc lên khỏi miệng bình.',
      'Da rát bỏng ngay lập tức chứ không đau muộn.',
      'Vết bỏng axit sunfuric chuyển dần sang màu nâu đen.'
    ],
    mucDo: 'Axit đặc bắn vào mắt có thể gây mù chỉ trong vài giây.',
    lamDung: [
      'Luôn rót từ từ axit vào nước, không bao giờ làm ngược lại.',
      'Khuấy đều và chờ nguội bớt giữa các lần rót.',
      'Đeo kính bảo hộ và găng tay chống hoá chất khi pha.'
    ],
    capCuu: 'Rửa ngay dưới vòi nước chảy liên tục ít nhất hai mươi phút, cởi bỏ quần áo dính axit. Không bôi kem hay tự trung hoà. Gọi cấp cứu.'
  },
  {
    id: 4, key: 'antoan_04_than_phong_kin',
    danger: 'ĐỐT THAN SƯỞI TRONG PHÒNG ĐÓNG KÍN',
    hauQua: 'NGỘ ĐỘC KHÍ CO KHÔNG MÙI',
    hook: 'Năm nào trời rét cũng có người chết vì đốt than sưởi.',
    chatTitle: 'CO CƯỚP CHỖ CỦA OXY TRONG MÁU',
    reaction: '2 C + O₂ → 2 CO↑  (cháy khi thiếu khí)',
    why: [
      'Phòng kín thiếu oxy nên than cháy không hết, sinh khí CO thay vì khí CO₂.',
      'CO không màu, không mùi, không gây khó chịu nên không ai biết mà tránh.',
      'CO bám vào hồng cầu chặt hơn oxy hàng trăm lần, máu hết chỗ chở oxy.'
    ],
    dauHieu: [
      'Đau đầu, chóng mặt, buồn nôn trong khi đang ngồi sưởi hoặc đang ngủ.',
      'Người lả đi, yếu chân tay, nói lẫn lộn.',
      'Nhiều người trong cùng phòng cùng mệt một lúc là dấu hiệu rõ nhất.'
    ],
    mucDo: 'Nạn nhân thường lịm dần rồi hôn mê mà không kịp nhận ra mình đang ngộ độc.',
    lamDung: [
      'Tuyệt đối không đốt than hay củi trong phòng ngủ và phòng đóng kín.',
      'Dùng máy sưởi điện, túi chườm hoặc chăn dày thay cho than.',
      'Nếu buộc phải đốt thì phải mở thông gió cả phía trên lẫn phía dưới.'
    ],
    capCuu: 'Mở toang cửa và đưa nạn nhân ra chỗ thoáng ngay. Gọi cấp cứu và nói rõ nghi ngộ độc khí CO. Không tự lái xe khi đang chóng mặt.'
  },
  {
    id: 5, key: 'antoan_05_may_phat_dien',
    danger: 'CHẠY MÁY PHÁT ĐIỆN TRONG NHÀ',
    hauQua: 'KHÍ CO TÍCH ĐẾN MỨC CHẾT NGƯỜI',
    hook: 'Mất điện, nhiều nhà kéo máy phát vào trong cho khỏi ướt.',
    chatTitle: 'ĐỘNG CƠ XĂNG THẢI CO LIÊN TỤC',
    reaction: '2 C₈H₁₈ + 17 O₂ → 16 CO↑ + 18 H₂O',
    why: [
      'Động cơ xăng luôn thải khí CO, càng nhiều hơn khi máy cũ hoặc chạy tải nặng.',
      'Một máy phát nhỏ thải lượng CO bằng hàng trăm xe máy đang nổ máy cùng lúc.',
      'Chỉ mở cửa sổ hay bật quạt thì không đủ để đẩy hết CO ra khỏi không gian kín.'
    ],
    dauHieu: [
      'Đau đầu âm ỉ và buồn ngủ bất thường trong lúc máy đang chạy.',
      'Mặt đỏ bừng, tim đập nhanh, thở gấp.',
      'Trẻ nhỏ và người già có biểu hiện sớm hơn người lớn khoẻ mạnh.'
    ],
    mucDo: 'Trong tầng hầm hay gara kín, chỉ vài phút đã đủ đạt nồng độ gây bất tỉnh.',
    lamDung: [
      'Đặt máy phát ngoài trời, cách xa cửa sổ và cửa ra vào vài mét.',
      'Hướng ống xả ra xa nhà, không hướng vào tường chắn hay vào khe hẹp.',
      'Nếu hay dùng máy phát thì nên lắp một thiết bị báo động khí CO.'
    ],
    capCuu: 'Tắt máy và đưa mọi người ra ngoài trời ngay. Gọi cấp cứu, nói rõ là nghi ngộ độc khí CO để được thở oxy sớm.'
  },
  {
    id: 6, key: 'antoan_06_binh_gas_mini',
    danger: 'DÙNG LẠI BÌNH GAS MINI SANG CHIẾT',
    hauQua: 'BÌNH NỔ NGAY TRÊN BÀN ĂN',
    hook: 'Bình gas mini vốn chỉ được thiết kế để dùng đúng một lần.',
    chatTitle: 'BUTAN NÉN TRONG VỎ ĐÃ MỎI',
    reaction: '2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O + nhiệt lớn',
    why: [
      'Vỏ bình mini chỉ chịu được một lần nạp, sang chiết nhiều lần làm vỏ mỏi và rò khí.',
      'Van sang chiết thủ công thường không kín, khí butan nặng hơn không khí nên đọng dưới bàn.',
      'Bếp nướng làm bình nóng lên, áp suất bên trong tăng theo nhiệt độ.'
    ],
    dauHieu: [
      'Ngửi thấy mùi gas hắc quanh chỗ ngồi.',
      'Nghe tiếng xì nhỏ ở chỗ lắp bình vào bếp.',
      'Vỏ bình phồng, móp hoặc hoen gỉ, mất nhãn.'
    ],
    mucDo: 'Bình mini nổ ở khoảng cách gần có thể gây bỏng nặng vùng mặt và hỏng mắt.',
    lamDung: [
      'Chỉ dùng bình mới còn nguyên nhãn, không mua bình sang chiết giá rẻ.',
      'Không đặt bình sát nồi lẩu hay vỉ nướng đang nóng.',
      'Không kê hai bếp mini sát nhau trên cùng một mặt bàn.'
    ],
    capCuu: 'Tắt bếp, không bật lửa và không chạm công tắc điện. Mở cửa cho thoáng rồi mang bình ra ngoài. Bỏng thì xối nước mát và gọi cấp cứu.'
  },
  {
    id: 7, key: 'antoan_07_pin_lithium',
    danger: 'SẠC ĐIỆN THOẠI QUA ĐÊM DƯỚI GỐI',
    hauQua: 'PIN LITHIUM CHÁY DỮ DỘI',
    hook: 'Pin đã phồng thì chỉ cần một vết cấn nhỏ là bốc cháy.',
    chatTitle: 'PIN CHÁY TỰ SINH RA OXY',
    reaction: 'LiPF₆ + H₂O → HF↑ + POF₃  (khí rất độc)',
    why: [
      'Pin lithium cháy theo phản ứng dây chuyền, càng nóng thì càng cháy mạnh thêm.',
      'Cực dương tự nhả oxy nên đám cháy không tắt theo kiểu làm ngạt như cháy thường.',
      'Chất điện ly gặp hơi ẩm sinh khí HF, ăn mòn phổi và mắt.'
    ],
    dauHieu: [
      'Vỏ máy phồng lên, cấn tay, màn hình bị đội cong.',
      'Máy nóng bất thường khi sạc, kèm mùi ngọt hắc rất lạ.',
      'Pin sụt nhanh hoặc sạc lâu đầy hơn hẳn trước đây.'
    ],
    mucDo: 'Pin cháy trong chăn gối có thể lan ra cả chiếc giường chỉ trong khoảng một phút.',
    lamDung: [
      'Không sạc trên giường, dưới gối hay trên ghế nệm.',
      'Thấy pin phồng thì ngừng dùng ngay và mang đi thay, tuyệt đối không chọc thủng.',
      'Dùng sạc chính hãng, không để máy sạc qua đêm mà không có ai để ý.'
    ],
    capCuu: 'Cháy pin thì làm mát bằng thật nhiều nước hoặc bình chữa cháy và gọi cứu hoả. Tránh hít khói vì rất độc. Người bị bỏng thì gọi cấp cứu.'
  },
  {
    id: 8, key: 'antoan_08_thong_cong_axit',
    danger: 'ĐỔ THUỐC THÔNG CỐNG RỒI ĐỔ TIẾP AXIT',
    hauQua: 'DUNG DỊCH SÔI TRÀO NGƯỢC LÊN',
    hook: 'Tắc mãi không thông, nhiều người đổ liền hai loại cho chắc ăn.',
    chatTitle: 'KIỀM ĐẶC GẶP AXIT TOẢ NHIỆT DỮ DỘI',
    reaction: 'NaOH + HCl → NaCl + H₂O + nhiệt lớn',
    why: [
      'Thuốc thông cống dạng bột hay dạng hạt thường là xút đậm đặc.',
      'Xút gặp axit toả nhiệt rất mạnh, làm nước trong ống sôi lên và trào ngược.',
      'Dung dịch trào lên vừa nóng vừa ăn da, bắn thẳng vào mặt người đang cúi nhìn.'
    ],
    dauHieu: [
      'Nghe tiếng sủi ùng ục mạnh dần trong đường ống.',
      'Hơi nóng và mùi hắc bốc ngược lên miệng cống.',
      'Da dính phải thấy trơn nhớt trước rồi mới thấy rát.'
    ],
    mucDo: 'Bỏng kiềm ăn sâu chậm hơn nhưng lâu lành hơn bỏng axit ở cùng mức độ.',
    lamDung: [
      'Mỗi lần chỉ dùng một loại, đúng liều ghi trên nhãn.',
      'Không cúi mặt xuống miệng cống sau khi vừa đổ hoá chất.',
      'Tắc nặng thì dùng dụng cụ thông cơ học hoặc gọi thợ, đừng tăng liều hoá chất.'
    ],
    capCuu: 'Rửa ngay bằng thật nhiều nước sạch trong ít nhất hai mươi phút, cởi bỏ quần áo đã dính. Không tự trung hoà bằng giấm hay chanh. Gọi cấp cứu.'
  },
  {
    id: 9, key: 'antoan_09_ruou_methanol',
    danger: 'UỐNG RƯỢU KHÔNG RÕ NGUỒN GỐC',
    hauQua: 'METHANOL GÂY MÙ VÀ TỬ VONG',
    hook: 'Methanol không đắng, uống vào không khác gì rượu thường.',
    chatTitle: 'GAN BIẾN METHANOL THÀNH AXIT',
    reaction: 'CH₃OH → HCHO → HCOOH  (chuyển hoá ở gan)',
    why: [
      'Rượu pha cồn công nghiệp chứa methanol, không thể phân biệt được bằng mùi hay vị.',
      'Gan chuyển methanol thành fomanđehit rồi thành axit fomic, chính hai chất này mới gây độc.',
      'Axit fomic phá thần kinh thị giác và làm máu bị nhiễm toan nặng.'
    ],
    dauHieu: [
      'Ban đầu say như bình thường, nhưng sau mười hai tới hai mươi tư giờ thì đau đầu dữ dội.',
      'Nhìn mờ, thấy như có màn sương trắng hoặc đốm đen trước mắt.',
      'Thở nhanh và sâu, đau bụng, nôn nhiều.'
    ],
    mucDo: 'Triệu chứng đến muộn nên nhiều người tới bệnh viện khi mắt đã hỏng không cứu được.',
    lamDung: [
      'Chỉ mua rượu có nhãn mác và nguồn gốc rõ ràng.',
      'Không mua rượu rẻ bất thường, không uống rượu ngâm không rõ ngâm gì.',
      'Ai đã uống mà thấy nhìn mờ thì đưa đi viện ngay, đừng chờ tỉnh rượu.'
    ],
    capCuu: 'Có thuốc giải nhưng chỉ hiệu quả khi còn sớm, nên phải tới viện ngay. Gọi cấp cứu và mang theo chai rượu đã uống.'
  },
  {
    id: 10, key: 'antoan_10_thuy_ngan_vo',
    danger: 'QUÉT CHỔI KHI NHIỆT KẾ THUỶ NGÂN VỠ',
    hauQua: 'HƠI THUỶ NGÂN LAN KHẮP PHÒNG',
    hook: 'Quét chổi và hút bụi là hai cách xử lý sai hay gặp nhất.',
    chatTitle: 'THUỶ NGÂN BAY HƠI NGAY Ở NHIỆT ĐỘ PHÒNG',
    reaction: 'Hg (lỏng) → Hg (hơi) ngay ở 25°C',
    why: [
      'Quét chổi làm giọt thuỷ ngân vỡ thành hàng nghìn hạt li ti, bay hơi nhanh gấp bội.',
      'Máy hút bụi thổi hơi thuỷ ngân ra khắp phòng và làm hỏng luôn cái máy.',
      'Hơi thuỷ ngân không màu không mùi, hít vào sẽ tích lại trong não và thận.'
    ],
    dauHieu: [
      'Đau đầu, mất ngủ, tay run nhẹ sau vài ngày.',
      'Chảy nước dãi nhiều, lợi sưng và đau.',
      'Trẻ nhỏ dễ bị hơn vì hay chơi sát mặt sàn.'
    ],
    mucDo: 'Một chiếc nhiệt kế vỡ trong phòng nhỏ đóng kín đủ để vượt ngưỡng hơi thuỷ ngân cho phép.',
    lamDung: [
      'Đưa mọi người ra ngoài, mở cửa cho thoáng, tắt điều hoà và quạt.',
      'Đeo găng, dùng bìa cứng gom giọt thuỷ ngân vào lọ thuỷ tinh có nắp rồi đậy thật kín.',
      'Không quét chổi, không hút bụi và không đổ xuống cống.'
    ],
    capCuu: 'Gói kín lọ cùng giẻ đã lau rồi giao cho nơi thu gom chất thải nguy hại. Nếu thấy run tay hay đau đầu kéo dài thì đi khám.'
  },
  {
    id: 11, key: 'antoan_11_binh_xit_gan_lua',
    danger: 'XỊT THUỐC MUỖI GẦN BẾP ĐANG CHÁY',
    hauQua: 'CỘT LỬA BÙNG NGAY TRƯỚC MẶT',
    hook: 'Bình xịt nào cũng có khí đẩy dễ cháy ở bên trong.',
    chatTitle: 'KHÍ ĐẨY TRONG BÌNH CHÍNH LÀ NHIÊN LIỆU',
    reaction: 'C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O + lửa',
    why: [
      'Khí đẩy trong bình xịt thường là propan hoặc butan, cháy rất mạnh.',
      'Tia thuốc là một đám sương nhiên liệu, gặp lửa bén tức thì thành cột lửa.',
      'Bình để gần bếp nóng lên còn có thể nổ vì áp suất bên trong tăng.'
    ],
    dauHieu: [
      'Vỏ bình ấm nóng khi cầm lên.',
      'Có tiếng xì kéo dài sau khi đã nhả tay khỏi nút xịt.',
      'Ngửi thấy mùi ga nồng quanh chỗ vừa xịt.'
    ],
    mucDo: 'Cột lửa từ bình xịt đủ gây bỏng mặt và cháy tóc chỉ trong tích tắc.',
    lamDung: [
      'Tắt hết bếp, nến và nhang trước khi xịt bất kỳ bình xịt nào.',
      'Không để bình xịt trên nóc bếp, trong xe phơi nắng hay cạnh lò sưởi.',
      'Xịt xong thì mở cửa cho thoáng rồi mới bật lửa nấu.'
    ],
    capCuu: 'Bỏng thì xối nước sạch mát liên tục hai mươi phút, không bôi kem đánh răng hay nước mắm. Bỏng rộng thì gọi cấp cứu.'
  },
  {
    id: 12, key: 'antoan_12_sang_chiet_xang',
    danger: 'SANG CHIẾT XĂNG BẰNG CAN NHỰA TRONG NHÀ',
    hauQua: 'TĨNH ĐIỆN ĐỐT CHÁY HƠI XĂNG',
    hook: 'Không cần lửa, chỉ một tia tĩnh điện là đủ để bùng cháy.',
    chatTitle: 'HƠI XĂNG BẮT LỬA NGAY Ở NHIỆT ĐỘ THƯỜNG',
    reaction: '2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O + lửa',
    why: [
      'Xăng bay hơi mạnh ở nhiệt độ thường, hơi nặng hơn không khí nên bò sát mặt nền.',
      'Dòng xăng chảy qua nhựa sinh tĩnh điện, phóng tia lửa ngay ở miệng can.',
      'Chỉ cần vài phần trăm hơi xăng trong không khí là đủ để bắt lửa và cháy lan.'
    ],
    dauHieu: [
      'Ngửi thấy mùi xăng nồng khắp phòng.',
      'Nghe tiếng lách tách nhỏ trong lúc rót.',
      'Thấy chóng mặt và nhức đầu do hít phải hơi xăng.'
    ],
    mucDo: 'Hơi xăng tích trong phòng kín có thể làm cháy lan cả tầng chỉ trong vài giây.',
    lamDung: [
      'Chỉ sang chiết ngoài trời thoáng, tránh xa mọi nguồn lửa và ổ cắm điện.',
      'Dùng can kim loại có tiếp địa hoặc can chuyên dụng, và rót thật chậm.',
      'Không trữ xăng trong nhà ở, nhất là ở gầm cầu thang.'
    ],
    capCuu: 'Ngửi thấy mùi xăng đậm thì không bật và cũng không tắt công tắc điện, mở cửa rồi ra ngoài và gọi cứu hoả.'
  },
  {
    id: 13, key: 'antoan_13_chai_nuoc_ngot',
    danger: 'ĐỰNG HOÁ CHẤT TRONG CHAI NƯỚC NGỌT',
    hauQua: 'TRẺ CẦM LÊN UỐNG NHẦM',
    hook: 'Cái chai quen mắt mới là thứ nguy hiểm nhất trong nhà.',
    chatTitle: 'BỎNG THỰC QUẢN KHÔNG HỒI PHỤC',
    reaction: 'NaOH hoặc axit + protein → phá huỷ mô',
    why: [
      'Chai nước ngọt tạo cảm giác an toàn nên trẻ nhỏ và người già cầm là uống luôn.',
      'Xút, axit hay dầu hoả nuốt vào phá ngay niêm mạc miệng và thực quản.',
      'Nhựa chai nước không chịu được nhiều loại dung môi, còn bị ăn thủng gây rò rỉ.'
    ],
    dauHieu: [
      'Kêu đau rát miệng, chảy nước dãi nhiều, không nuốt được.',
      'Môi và lưỡi đỏ phồng hoặc trắng bợt.',
      'Nôn ra chất có mùi hoá chất.'
    ],
    mucDo: 'Sẹo hẹp thực quản sau bỏng hoá chất có thể phải nong đi nong lại suốt đời.',
    lamDung: [
      'Giữ hoá chất trong đúng chai gốc và còn nguyên nhãn.',
      'Nếu buộc phải sang chai thì dán nhãn thật to, thật rõ và cất trên cao có khoá.',
      'Không bao giờ dùng chai nước uống để đựng hoá chất.'
    ],
    capCuu: 'Không móc họng gây nôn vì hoá chất trào lên sẽ bỏng thêm lần nữa. Súc miệng bằng nước sạch, mang theo vỏ chai, đi viện ngay.'
  },
  {
    id: 14, key: 'antoan_14_ac_quy_hydro',
    danger: 'CÂU BÌNH ẮC QUY NGAY SAU KHI SẠC NO',
    hauQua: 'TIA LỬA ĐỐT KHÍ HYDRO GÂY NỔ BÌNH',
    hook: 'Ắc quy đang sạc luôn nhả khí hydro ngay quanh nắp bình.',
    chatTitle: 'HYDRO NỔ CHỈ CẦN MỘT TIA LỬA',
    reaction: '2 H₂O → 2 H₂↑ + O₂↑  (điện phân khi sạc)',
    why: [
      'Khi sạc no, dòng điện tách nước trong dung dịch thành khí hydro và khí oxy ngay trong bình.',
      'Hydro trộn sẵn với oxy đúng tỉ lệ nổ, chỉ còn chờ một tia lửa.',
      'Kẹp câu bình đánh tia lửa ngay sát nắp bình, đúng chỗ khí đang tích tụ.'
    ],
    dauHieu: [
      'Bình phồng hai bên hông, nắp bình ấm nóng.',
      'Nghe tiếng sủi lăn tăn trong bình khi đang sạc.',
      'Có mùi hắc như trứng thối ở bình đang hỏng.'
    ],
    mucDo: 'Bình ắc quy nổ bắn cả axit lẫn mảnh vỏ vào mặt người đang cúi xuống xem.',
    lamDung: [
      'Sạc ắc quy ở nơi thoáng, chờ vài phút cho khí tản bớt rồi mới tháo kẹp.',
      'Nối kẹp âm sau cùng vào phần kim loại xa bình, không nối thẳng lên cọc âm.',
      'Đeo kính bảo hộ, không hút thuốc và không dùng lửa ở gần bình.'
    ],
    capCuu: 'Axit ắc quy bắn vào mắt thì rửa dưới dòng nước sạch chảy nhẹ liên tục ít nhất hai mươi phút, vừa rửa vừa gọi cấp cứu.'
  },
  {
    id: 15, key: 'antoan_15_voi_song',
    danger: 'ĐỔ NƯỚC VÀO VÔI SỐNG CHO TÔI NHANH',
    hauQua: 'VÔI SÔI BẮN BỎNG MẮT VÀ DA',
    hook: 'Vôi sống không cần lửa vẫn tự nóng lên tới cả trăm độ.',
    chatTitle: 'VÔI SỐNG GẶP NƯỚC TOẢ NHIỆT RẤT MẠNH',
    reaction: 'CaO + H₂O → Ca(OH)₂ + nhiệt lớn',
    why: [
      'Phản ứng tôi vôi toả nhiệt rất mạnh, hố vôi có thể sôi sùng sục như đun.',
      'Nước sôi kéo theo vôi bắn ra, mà vôi tôi là kiềm ăn da.',
      'Bụi vôi bay vào mắt gây bỏng giác mạc rất nhanh.'
    ],
    dauHieu: [
      'Hố vôi bốc hơi nghi ngút và sủi mạnh.',
      'Da dính vôi thấy trơn và ngứa trước rồi mới rát dần.',
      'Mắt cay xối xả, chảy nước mắt không mở ra được.'
    ],
    mucDo: 'Bỏng kiềm ở mắt là cấp cứu nhãn khoa, để chậm là hỏng giác mạc vĩnh viễn.',
    lamDung: [
      'Cho vôi từ từ vào nước chứ không đổ nước ập vào đống vôi.',
      'Đứng ngược chiều gió, đeo kính bảo hộ và găng tay khi tôi vôi.',
      'Rào hố vôi lại và không để trẻ em tới gần.'
    ],
    capCuu: 'Vôi dính da thì phủi hết bột khô trước rồi mới rửa nhiều nước. Vôi vào mắt thì rửa nước sạch hai mươi phút rồi đi viện ngay.'
  },
  {
    id: 16, key: 'antoan_16_chao_dau_chay',
    danger: 'HẤT NƯỚC VÀO CHẢO DẦU ĐANG CHÁY',
    hauQua: 'LỬA BÙNG LÊN TỚI TRẦN NHÀ',
    hook: 'Phản xạ đầu tiên của hầu hết mọi người lại là cách sai nhất.',
    chatTitle: 'NƯỚC HOÁ HƠI NỞ HƠN MỘT NGHÌN LẦN',
    reaction: 'H₂O lỏng → H₂O hơi: thể tích tăng khoảng 1600 lần',
    why: [
      'Dầu đang cháy nóng trên ba trăm độ, nước chạm vào là hoá hơi tức thì.',
      'Một ca nước biến thành hơi nở gấp hơn một nghìn sáu trăm lần, thổi tung dầu cháy lên cao.',
      'Màn dầu cháy bắn ra bám vào tường, vào rèm và vào người đứng gần.'
    ],
    dauHieu: [
      'Dầu bốc khói xanh và có mùi khét trước khi bén lửa.',
      'Mặt dầu gợn sóng lăn tăn là đã gần tới điểm bốc cháy.',
      'Lửa bắt đầu liếm quanh vành chảo.'
    ],
    mucDo: 'Đám cháy dầu trong bếp có thể lan ra cả gian bếp chỉ trong vài giây.',
    lamDung: [
      'Tắt bếp trước, rồi đậy vung kim loại hoặc khay lên chảo cho ngạt lửa.',
      'Không bê chảo đang cháy đi nơi khác vì dầu sẽ đổ dọc đường.',
      'Trong bếp nên có sẵn một chăn chữa cháy hoặc bình bột.'
    ],
    capCuu: 'Không dùng nước cho đám cháy dầu mỡ. Nếu không dập được thì đóng cửa bếp lại, ra ngoài và gọi cứu hoả.'
  },
  {
    id: 17, key: 'antoan_17_han_thung_phuy',
    danger: 'HÀN CẮT TRÊN THÙNG PHUY ĐÃ HẾT DẦU',
    hauQua: 'THÙNG RỖNG NỔ MẠNH HƠN THÙNG ĐẦY',
    hook: 'Thùng rỗng mới là thứ nguy hiểm, vì bên trong toàn hơi.',
    chatTitle: 'HƠI NHIÊN LIỆU TRỘN KHÔNG KHÍ MỚI NỔ ĐƯỢC',
    reaction: 'Hơi nhiên liệu + O₂ + tia lửa hàn → nổ',
    why: [
      'Thùng còn đầy chất lỏng thì bên trong thiếu oxy nên khó nổ.',
      'Thùng đã rót hết lại chứa đầy hơi nhiên liệu trộn không khí, đúng tỉ lệ nổ.',
      'Nhiệt của mỏ hàn truyền qua vỏ thép là đủ để mồi cho hỗn hợp đó.'
    ],
    dauHieu: [
      'Vẫn ngửi thấy mùi nhiên liệu ở miệng thùng dù đã đổ hết.',
      'Trong thùng còn cặn sệt hoặc giẻ lau bỏ quên.',
      'Vỏ thùng không còn nhãn ghi trước đây đã chứa gì.'
    ],
    mucDo: 'Một thùng phuy hai trăm lít nổ có thể bay xa hàng chục mét và gây chết người.',
    lamDung: [
      'Không hàn cắt trên bất kỳ thùng nào từng chứa nhiên liệu khi chưa xử lý.',
      'Phải súc rửa sạch, sục hơi nước hoặc bơm đầy nước rồi mới được hàn.',
      'Mở hết nắp và lỗ thông hơi trước khi đưa mỏ hàn lại gần.'
    ],
    capCuu: 'Còn nghi ngờ thì dừng công việc và báo người phụ trách an toàn. Nếu có tai nạn thì gọi cấp cứu và cứu hoả.'
  },
  {
    id: 18, key: 'antoan_18_do_them_con',
    danger: 'ĐỔ THÊM CỒN VÀO BẾP CỒN ĐANG CHÁY',
    hauQua: 'LỬA CHẠY NGƯỢC VỀ TAY CẦM CHAI',
    hook: 'Lửa cồn ban ngày gần như không nhìn thấy được.',
    chatTitle: 'NGỌN LỬA CỒN CHÁY GẦN NHƯ VÔ HÌNH',
    reaction: 'C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O',
    why: [
      'Cồn cháy cho ngọn lửa xanh rất nhạt, ở nơi sáng thì tưởng là đã tắt.',
      'Rót thêm cồn là tạo một dòng nhiên liệu nối thẳng từ chai tới ngọn lửa.',
      'Lửa chạy ngược theo dòng cồn vào trong chai rồi bùng ra tay và mặt.'
    ],
    dauHieu: [
      'Nhìn kỹ thấy không khí trên bếp gợn sóng dù không thấy ngọn lửa.',
      'Giơ tay lại gần thấy nóng rõ.',
      'Lượng cồn trong bếp vẫn đang vơi dần đi.'
    ],
    mucDo: 'Bỏng cồn thường ở mặt, cổ và hai bàn tay, đều là những chỗ khó che chắn.',
    lamDung: [
      'Tắt hẳn bếp và chờ nguội rồi mới châm thêm cồn.',
      'Dùng cồn khô hoặc bếp gas mini thay cho cồn nước.',
      'Không bao giờ cầm chai cồn ở gần bếp đang dùng.'
    ],
    capCuu: 'Bỏng thì xối nước mát sạch hai mươi phút, tháo nhẫn và đồng hồ trước khi tay sưng. Không bôi kem đánh răng hay mỡ. Gọi cấp cứu.'
  },
  {
    id: 19, key: 'antoan_19_lo_vi_song',
    danger: 'HÂM NƯỚC TINH KHIẾT TRONG LÒ VI SÓNG',
    hauQua: 'NƯỚC BÙNG SÔI KHI VỪA CHẠM VÀO',
    hook: 'Nước đã quá nóng mà mặt vẫn phẳng lặng, nhìn tưởng chưa sôi.',
    chatTitle: 'NƯỚC BỊ ĐUN QUÁ ĐIỂM SÔI MÀ CHƯA SÔI',
    reaction: 'H₂O quá nhiệt → bùng sôi ngay khi có mầm bọt',
    why: [
      'Cốc nhẵn và nước sạch thì thiếu chỗ cho bọt hơi bám vào để hình thành.',
      'Nước có thể vượt một trăm độ mà mặt vẫn phẳng lặng, gọi là hiện tượng quá nhiệt.',
      'Chỉ cần bỏ thìa vào hay nhấc cốc ra là bọt sinh hàng loạt, nước trào ra ngoài.'
    ],
    dauHieu: [
      'Nước không thấy tăm sủi dù đã quay rất lâu.',
      'Cốc rất nóng nhưng mặt nước vẫn im phăng phắc.',
      'Nhấc ra thì nghe một tiếng ục rồi nước trào lên.'
    ],
    mucDo: 'Nước quá nhiệt trào lên gây bỏng mặt và ngực, hay gặp nhất khi hâm nước pha sữa cho trẻ.',
    lamDung: [
      'Bỏ sẵn một chiếc thìa gỗ hoặc que khuấy vào cốc trước khi quay.',
      'Quay thành nhiều lần ngắn thay vì đặt một khoảng thời gian dài.',
      'Quay xong để yên trong lò khoảng một phút rồi mới lấy ra.'
    ],
    capCuu: 'Bỏng nước sôi thì xối nước mát sạch ít nhất hai mươi phút rồi che bằng gạc sạch. Bỏng rộng hoặc bỏng ở mặt thì gọi cấp cứu.'
  },
  {
    id: 20, key: 'antoan_20_dot_nhua',
    danger: 'ĐỐT NHỰA VÀ CAO SU ĐỂ DỌN RÁC',
    hauQua: 'SINH KHÍ ĂN MÒN VÀ ĐIOXIN',
    hook: 'Khói nhựa cháy độc hơn khói củi rất nhiều lần.',
    chatTitle: 'NHỰA CHÁY KHÔNG HẾT SINH CHẤT ĐỘC BỀN',
    reaction: 'Nhựa PVC cháy → HCl↑ + đioxin',
    why: [
      'Đống rác cháy ngoài trời chỉ đạt vài trăm độ, không đủ nóng để phân huỷ hết.',
      'Nhựa PVC cháy nhả khí HCl ăn mòn phổi và sinh ra đioxin rất bền.',
      'Đioxin bám vào đất, vào rau và tích lại trong cơ thể qua nhiều năm.'
    ],
    dauHieu: [
      'Khói đen đặc, khét gắt và cay mắt hơn hẳn khói củi.',
      'Ho khan kéo dài sau khi hít phải khói.',
      'Mùi hắc bám vào quần áo rất lâu không hết.'
    ],
    mucDo: 'Đioxin không tự phân huỷ mà tích lại trong mỡ cơ thể suốt nhiều năm.',
    lamDung: [
      'Không đốt nhựa, cao su, xốp hay vỏ dây điện để dọn rác hoặc để sưởi.',
      'Phân loại rác nhựa và giao cho đơn vị thu gom.',
      'Hàng xóm đốt thì đóng cửa lại, không cho trẻ nhỏ ra ngoài chơi.'
    ],
    capCuu: 'Hít nhiều khói mà ho kéo dài hoặc khó thở thì nên đi khám. Trẻ nhỏ và người bị hen phải đưa tránh xa ngay lập tức.'
  }
];
