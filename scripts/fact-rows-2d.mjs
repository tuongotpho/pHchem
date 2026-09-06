/** Đợt 4 — Y học, An toàn, Nhận biết, Cơ thể, Vũ trụ. Khuôn ở scripts/gen-fact-reels-v2.mjs */

export const ROWS = [
  {
    id: 37, key: 'cl2_37_bari_xquang', tag: 'Y học',
    title: 'UỐNG MỘT KIM LOẠI ĐỘC ĐỂ ĐI CHỤP X-QUANG',
    claim: 'Muối bari tan là chất độc chết người. Vậy mà bệnh nhân chụp dạ dày vẫn uống cả cốc bari, rồi về nhà bình thường.',
    viSao: 'KHÔNG TAN THÌ KHÔNG NGẤM VÀO MÁU',
    why: [
      'Bari sunfat gần như không tan trong nước lẫn trong axit dạ dày.',
      'Không tan thì không có ion bari nào ngấm qua thành ruột vào máu, nên không độc.',
      'Nguyên tử bari nặng lại cản tia X rất tốt, nên đường tiêu hoá hiện trắng rõ trên phim.'
    ],
    dukien: 'BaSO₄ — độ tan chỉ khoảng 0,0002 g trong 100 g nước',
    dukienLabel: 'VÌ SAO AN TOÀN',
    gapODau: [
      'Chụp thực quản, dạ dày và đại tràng có cản quang.',
      'Nhầm bari sunfat với bari cacbonat là tai nạn y khoa từng xảy ra và gây chết người.',
      'Cùng chất ấy còn được dùng làm bột màu trắng trong sơn và giấy.'
    ],
    ketLuan: 'Độc hay không nhiều khi không nằm ở nguyên tố, mà ở chỗ nó có tan được hay không.'
  },
  {
    id: 38, key: 'cl2_38_cisplatin', tag: 'Y học',
    title: 'THUỐC UNG THƯ ĐƯỢC TÌM RA NHỜ MỘT THÍ NGHIỆM VỀ ĐIỆN',
    claim: 'Nhà nghiên cứu cho dòng điện chạy qua dung dịch nuôi vi khuẩn để xem chúng phản ứng thế nào. Vi khuẩn ngừng phân chia, và thủ phạm là điện cực bạch kim.',
    viSao: 'PHỨC PLATIN KHOÁ CHẶT SỢI ADN',
    why: [
      'Điện cực bạch kim tan ra một chút, tạo thành phức chất cisplatin trong dung dịch.',
      'Phức này gắn vào hai điểm trên sợi ADN và bẻ cong nó lại.',
      'ADN bị khoá thì tế bào không nhân đôi được, mà tế bào ung thư thì nhân đôi rất nhanh.'
    ],
    dukien: 'Pt(NH₃)₂Cl₂ — cisplatin, một trong các thuốc hoá trị quan trọng nhất',
    dukienLabel: 'CHẤT ĐƯỢC TÌM RA',
    gapODau: [
      'Điều trị ung thư tinh hoàn, buồng trứng, bàng quang và phổi.',
      'Nó đưa tỉ lệ sống của ung thư tinh hoàn từ rất thấp lên trên chín mươi phần trăm.',
      'Tác dụng phụ nặng lên thận và thính giác nên phải theo dõi sát.'
    ],
    ketLuan: 'Một trong những thuốc cứu người nhiều nhất ra đời từ một thí nghiệm chẳng liên quan gì tới ung thư.'
  },
  {
    id: 39, key: 'cl2_39_insulin_tiem', tag: 'Y học',
    title: 'VÌ SAO INSULIN PHẢI TIÊM CHỨ KHÔNG UỐNG ĐƯỢC',
    claim: 'Người tiểu đường phải tiêm insulin ngày vài lần. Không phải vì viên nén khó làm, mà vì chính dạ dày sẽ ăn mất thuốc trước khi nó kịp có tác dụng.',
    viSao: 'INSULIN LÀ MỘT PROTEIN',
    why: [
      'Insulin là chuỗi axit amin, tức là một protein, chứ không phải phân tử nhỏ như đa số thuốc.',
      'Dạ dày sinh ra men tiêu hoá chuyên cắt protein thành mẩu nhỏ, và nó cắt insulin y như cắt thịt cá.',
      'Tiêm dưới da thì thuốc đi thẳng vào máu, tránh được đoạn tiêu hoá.'
    ],
    dukien: 'Insulin người: 51 axit amin, hai chuỗi nối nhau bằng cầu disunfua',
    dukienLabel: 'CẤU TẠO',
    gapODau: [
      'Mọi thuốc gốc protein như vắc-xin và kháng thể cũng phải tiêm vì lý do này.',
      'Insulin ngày nay do vi khuẩn được cấy gen người sản xuất, không còn lấy từ tuỵ lợn.',
      'Đang có nghiên cứu vỏ bọc giúp insulin qua được dạ dày, nhưng chưa phổ biến.'
    ],
    ketLuan: 'Dạ dày không phân biệt được đâu là bữa ăn, đâu là liều thuốc.'
  },
  {
    id: 40, key: 'cl2_40_nitroglixerin_thuoc', tag: 'Y học',
    title: 'THUỐC CHỮA ĐAU TIM CHÍNH LÀ THUỐC NỔ',
    claim: 'Viên thuốc ngậm dưới lưỡi cho cơn đau thắt ngực chứa nitroglixerin, đúng cái chất làm nên dynamite của Alfred Nobel.',
    viSao: 'CƠ THỂ BIẾN NÓ THÀNH KHÍ LÀM GIÃN MẠCH',
    why: [
      'Trong cơ thể, nitroglixerin nhả ra khí nitơ monoxit với lượng cực nhỏ.',
      'Khí này làm cơ trơn thành mạch giãn ra, máu về tim dễ hơn nên cơn đau dịu đi.',
      'Liều dùng chỉ vài phần vạn gam, quá nhỏ để có bất kỳ nguy cơ nổ nào.'
    ],
    dukien: 'Liều ngậm dưới lưỡi ~0,5 mg · một thỏi dynamite chứa hàng chục gam',
    dukienLabel: 'CHÊNH LỆCH LIỀU LƯỢNG',
    gapODau: [
      'Công nhân nhà máy thuốc nổ thời xưa hay bị đau đầu dữ dội, chính vì mạch máu giãn.',
      'Trớ trêu là chính Alfred Nobel cuối đời bị đau thắt ngực và được kê đúng chất ông phát minh.',
      'Ông từ chối uống, vì biết nó gây đau đầu.'
    ],
    ketLuan: 'Cùng một phân tử, khác nhau chỉ ở liều lượng và tốc độ phản ứng.'
  },
  {
    id: 41, key: 'cl2_41_paracetamol_gan', tag: 'Y học',
    title: 'THUỐC HẠ SỐT AN TOÀN NHẤT CŨNG LÀ THUỐC HAY GÂY SUY GAN NHẤT',
    claim: 'Paracetamol dùng đúng liều thì lành tới mức trẻ sơ sinh cũng uống được. Quá liều một chút thôi là gan hỏng không hồi phục.',
    viSao: 'GAN HẾT CHẤT ĐỂ HOÁ GIẢI',
    why: [
      'Gan xử lý phần lớn paracetamol theo đường an toàn, chỉ một phần nhỏ thành chất độc trung gian.',
      'Chất độc ấy bình thường bị glutathion trong gan trung hoà ngay.',
      'Quá liều thì glutathion cạn, chất độc bắt đầu phá thẳng tế bào gan.'
    ],
    dukien: 'Người lớn: tối đa 4 g mỗi ngày, cách nhau ít nhất 4-6 giờ',
    dukienLabel: 'NGƯỠNG AN TOÀN',
    gapODau: [
      'Nguy hiểm nhất là uống nhiều loại thuốc cảm cùng lúc, vì loại nào cũng có sẵn paracetamol.',
      'Rượu làm cạn glutathion nên uống rượu rồi uống thuốc là rất nguy.',
      'Ngộ độc có thuốc giải nhưng phải dùng sớm, triệu chứng ban đầu lại rất mờ nhạt.'
    ],
    ketLuan: 'Thuốc quen thuộc nhất trong tủ nhà lại là thuốc cần đọc kỹ liều nhất.'
  },
  {
    id: 42, key: 'cl2_42_gay_me', tag: 'Y học',
    title: 'TRƯỚC NĂM 1846, MỔ LÀ MỔ SỐNG',
    claim: 'Bệnh nhân bị trói vào bàn, cắn giẻ, và bác sĩ giỏi là bác sĩ cưa nhanh nhất. Rồi một buổi trình diễn với chai ete đã đổi hẳn ngành y.',
    viSao: 'ETE CẮT ĐƯỜNG TRUYỀN TÍN HIỆU THẦN KINH',
    why: [
      'Phân tử ete tan vào màng tế bào thần kinh và làm rối các kênh dẫn truyền tín hiệu.',
      'Não không nhận được tín hiệu đau, bệnh nhân ngủ và không nhớ gì.',
      'Tới nay cơ chế chính xác của gây mê vẫn còn nhiều điều chưa giải thích hết.'
    ],
    dukien: '16/10/1846 — ca mổ công khai đầu tiên dùng ete tại Boston',
    dukienLabel: 'NGÀY ĐỔI ĐỜI NGÀNH PHẪU THUẬT',
    gapODau: [
      'Ete và clorofom nay đã bị thay bằng thuốc mê an toàn hơn nhiều.',
      'Nhờ có gây mê, phẫu thuật mới dài ra và tinh vi lên được.',
      'Căn phòng ở Boston nơi diễn ra ca mổ ấy tới giờ vẫn được gọi là Ether Dome.'
    ],
    ketLuan: 'Một chai dung môi đã xoá đi nỗi sợ lớn nhất của loài người khi bước lên bàn mổ.'
  },
  {
    id: 43, key: 'cl2_43_xenon_gay_me', tag: 'Y học',
    title: 'THUỐC MÊ HOÀN HẢO ĐÃ CÓ, CHỈ LÀ QUÁ ĐẮT',
    claim: 'Xenon là khí hiếm, trơ tới mức gần như không phản ứng với gì. Vậy mà hít vào lại gây mê được, êm và gần như không tác dụng phụ.',
    viSao: 'GÂY MÊ KHÔNG NHẤT THIẾT PHẢI PHẢN ỨNG',
    why: [
      'Xenon không tạo liên kết hoá học nào, nó chỉ chèn vào màng và chặn một loại thụ thể thần kinh.',
      'Vì không phản ứng nên nó không để lại chất chuyển hoá độc, gan và thận không phải làm gì.',
      'Bệnh nhân tỉnh rất nhanh và ít buồn nôn hơn hẳn thuốc mê thường.'
    ],
    dukien: 'Xenon chiếm 0,0000087% không khí — chưa tới 1 phần 10 triệu',
    dukienLabel: 'VÌ SAO ĐẮT ĐẾN THẾ',
    gapODau: [
      'Chỉ dùng ở vài trung tâm y tế lớn, chủ yếu cho bệnh nhân tim mạch nặng.',
      'Muốn có xenon phải chưng cất phân đoạn không khí lỏng ở quy mô rất lớn.',
      'Xenon còn dùng làm nhiên liệu cho động cơ đẩy ion của tàu vũ trụ.'
    ],
    ketLuan: 'Thuốc tốt nhất đôi khi đã nằm sẵn đó, chỉ là hiếm quá nên chưa tới lượt ai dùng.'
  },
  {
    id: 44, key: 'cl2_44_mui_gas', tag: 'An toàn',
    title: 'KHÍ GAS VỐN KHÔNG MÙI, MÙI HẮC LÀ NGƯỜI TA CỐ Ý PHA VÀO',
    claim: 'Cái mùi khó chịu báo cho bạn biết bình gas đang rò không phải mùi của gas. Đó là một chất được pha thêm với đúng mục đích ấy.',
    viSao: 'MŨI NGƯỜI NHẠY VỚI HỢP CHẤT LƯU HUỲNH ĐẾN KINH NGẠC',
    why: [
      'Propan và butan trong bình gas hoàn toàn không mùi, rò ra cũng không ai biết.',
      'Người ta pha vào một lượng cực nhỏ mercaptan, hợp chất chứa lưu huỳnh có mùi rất hắc.',
      'Mũi người phát hiện được mercaptan ở nồng độ chỉ vài phần tỉ, sớm hơn nhiều so với ngưỡng nổ.'
    ],
    dukien: 'Mùi nhận ra ở ~1 phần tỉ · gas chỉ nổ khi đạt 2% thể tích không khí',
    dukienLabel: 'BIÊN AN TOÀN',
    gapODau: [
      'Ngửi thấy mùi gas thì khoá van, mở cửa, không bật hay tắt công tắc điện nào.',
      'Chính mercaptan cũng là chất tạo mùi trong hơi thở buổi sáng và mùi chồn hôi.',
      'Sau vụ nổ trường học ở Texas năm 1937, việc pha chất tạo mùi mới thành bắt buộc.'
    ],
    ketLuan: 'Một mùi khó chịu được thiết kế ra để cứu người, chứ không phải để làm phiền.'
  },
  {
    id: 45, key: 'cl2_45_amiang', tag: 'An toàn',
    title: 'VẬT LIỆU CHỐNG CHÁY HOÀN HẢO HOÁ RA LÀ THỨ GIẾT NGƯỜI CHẬM',
    claim: 'Amiăng không cháy, không mục, cách nhiệt tốt, rẻ. Cả trăm năm nó là vật liệu trong mơ, cho tới khi người ta hiểu vì sao công nhân cứ chết vì ung thư phổi.',
    viSao: 'SỢI QUÁ NHỎ VÀ QUÁ BỀN ĐỂ PHỔI ĐẨY RA',
    why: [
      'Amiăng là khoáng vật tách được thành sợi mảnh hơn sợi tóc hàng nghìn lần.',
      'Sợi hít vào cắm sâu vào phổi, mà cơ thể không có cách nào phân huỷ hay đẩy nó ra.',
      'Nó nằm đó hàng chục năm, gây viêm liên tục rồi dẫn tới ung thư màng phổi.'
    ],
    dukien: 'Thời gian từ khi hít phải tới lúc phát bệnh: 20-40 năm',
    dukienLabel: 'VÌ SAO PHÁT HIỆN MUỘN',
    gapODau: [
      'Tấm lợp fibro xi măng cũ ở nông thôn Việt Nam vẫn còn rất nhiều.',
      'Không được đập, cắt hay khoan tấm amiăng cũ vì đó là lúc sợi bay ra.',
      'Tấm còn nguyên vẹn và sơn phủ thì ít nguy hơn tấm đã vỡ mủn.'
    ],
    ketLuan: 'Thứ nguy hiểm nhất là thứ mà hậu quả tới sau hàng chục năm.'
  },
  {
    id: 46, key: 'cl2_46_brom_hoi_thoi', tag: 'An toàn',
    title: 'CÓ NGUYÊN TỐ ĐƯỢC ĐẶT TÊN THEO MÙI HÔI THỐI',
    claim: 'Tên brom lấy từ tiếng Hy Lạp bromos, nghĩa là mùi hôi. Người tìm ra nó đã đặt tên theo đúng ấn tượng đầu tiên khi mở lọ.',
    viSao: 'CHẤT LỎNG BỐC HƠI NGAY Ở NHIỆT ĐỘ PHÒNG',
    why: [
      'Brom là một trong hai nguyên tố ở thể lỏng tại nhiệt độ phòng, màu nâu đỏ sẫm.',
      'Nó bay hơi rất mạnh, hơi brom cay xè và ăn mòn đường hô hấp.',
      'Brom lỏng dính da gây bỏng sâu, vết thương rất lâu lành.'
    ],
    dukien: 'Br₂ — nóng chảy −7,2°C, sôi 58,8°C',
    dukienLabel: 'VÌ SAO Ở THỂ LỎNG',
    gapODau: [
      'Hợp chất brom từng làm chất chống cháy cho vỏ tivi và đồ nhựa.',
      'Bạc bromua là chất nhạy sáng trong phim ảnh thời chưa có máy số.',
      'Nhiều hợp chất brom nay bị hạn chế vì tích luỹ trong cơ thể và môi trường.'
    ],
    ketLuan: 'Có nguyên tố mà cái tên đã là lời cảnh báo.'
  },
  {
    id: 47, key: 'cl2_47_dong_beri', tag: 'An toàn',
    title: 'CỜ LÊ KHÔNG PHÁT TIA LỬA, DÙNG Ở NƠI CÓ HƠI XĂNG',
    claim: 'Trong kho xăng dầu, một tia lửa từ cái cờ lê va vào thành bồn là đủ gây nổ. Vì thế thợ dùng cờ lê hợp kim đồng beri, gõ mạnh cũng không toé lửa.',
    viSao: 'ĐỒNG KHÔNG SINH TIA LỬA NHƯ THÉP',
    why: [
      'Thép va đập bắn ra mạt sắt nóng đỏ, chính những mạt ấy là mồi lửa.',
      'Hợp kim gốc đồng không sinh mạt cháy, nên va đập không tạo tia lửa.',
      'Thêm beri vào làm hợp kim cứng gần bằng thép mà vẫn giữ được tính không phát lửa.'
    ],
    dukien: 'Cu + ~2% Be — cứng gần bằng thép, không sinh tia lửa khi va đập',
    dukienLabel: 'HỢP KIM DỤNG CỤ AN TOÀN',
    gapODau: [
      'Kho xăng dầu, trạm khí, hầm mỏ có khí metan.',
      'Mặt trái: bụi beri hít phải gây bệnh phổi mạn tính không chữa được.',
      'Vì vậy mài hay cắt hợp kim này phải làm trong buồng hút bụi chuyên dụng.'
    ],
    ketLuan: 'Một dụng cụ được chọn không vì nó khoẻ hơn, mà vì nó không biết đánh lửa.'
  },
  {
    id: 48, key: 'cl2_48_antimon_chong_chay', tag: 'An toàn',
    title: 'VỎ TIVI VÀ Ổ ĐIỆN ĐƯỢC TRỘN CHẤT CHẶN LỬA',
    claim: 'Nhựa vốn cháy rất tốt. Nhưng vỏ ổ cắm, vỏ tivi và vỏ máy tính lại chỉ chảy chứ khó bùng lên, nhờ một chất trộn sẵn trong hạt nhựa.',
    viSao: 'CẮT ĐỨT PHẢN ỨNG DÂY CHUYỀN CỦA NGỌN LỬA',
    why: [
      'Lửa duy trì được nhờ các gốc tự do sinh ra liên tục trong vùng cháy.',
      'Antimon trioxit đi cùng hợp chất brom nhả ra chất bắt lấy các gốc tự do đó.',
      'Chuỗi phản ứng đứt, ngọn lửa tắt dần thay vì lan rộng.'
    ],
    dukien: 'Sb₂O₃ + hợp chất brom — cặp chống cháy dùng phổ biến nhất',
    dukienLabel: 'CƠ CHẾ CHẶN LỬA',
    gapODau: [
      'Vỏ thiết bị điện, dây cáp, rèm và vải bọc ghế nơi công cộng.',
      'Chính nhờ vậy mà chập điện trong nhà thường chỉ cháy khét chứ ít bùng lên.',
      'Khói của nhựa chống cháy vẫn rất độc, nên cháy nhà thì phải bò thấp mà ra.'
    ],
    ketLuan: 'Không chặn được nhiệt thì chặn phản ứng, ngọn lửa cũng tắt.'
  },
  {
    id: 49, key: 'cl2_49_radon_tang_ham', tag: 'An toàn',
    title: 'MỘT KHÍ PHÓNG XẠ TỰ RỈ LÊN TỪ NỀN NHÀ BẠN',
    claim: 'Radon không màu không mùi, sinh ra từ urani trong đất đá, rồi thấm lên qua nền nhà. Ở nhiều nước đây là nguyên nhân gây ung thư phổi đứng thứ hai sau thuốc lá.',
    viSao: 'KHÍ NẶNG NÊN ĐỌNG Ở CHỖ THẤP VÀ KÍN',
    why: [
      'Urani có sẵn trong đất đá phân rã dần và sinh ra khí radon.',
      'Radon nặng hơn không khí nên đọng lại ở tầng hầm, phòng kín và nhà thiếu thông gió.',
      'Hít vào, nó phân rã tiếp ngay trong phổi và bắn tia anpha vào mô phổi.'
    ],
    dukien: '²²²Rn → ²¹⁸Po + α  (bán rã 3,8 ngày)',
    dukienLabel: 'PHÂN RÃ NGAY TRONG PHỔI',
    gapODau: [
      'Nguy cơ cao ở vùng đá granit, và ở tầng hầm không có cửa thông gió.',
      'Cách xử lý đơn giản nhất là thông gió, đặc biệt là các không gian dưới mặt đất.',
      'Nhiều nước bán bộ đo radon tại nhà, ở Việt Nam việc này còn ít được để ý.'
    ],
    ketLuan: 'Có thứ nguy hiểm không tới từ nhà máy nào, mà rỉ lên từ chính nền nhà.'
  },
  {
    id: 50, key: 'cl2_50_tali', tag: 'An toàn',
    title: 'CHẤT ĐỘC KHÔNG MÀU, KHÔNG MÙI, KHÔNG VỊ',
    claim: 'Muối tali tan trong nước mà không đổi màu, không mùi, không vị. Nạn nhân uống vào chỉ thấy đau bụng thường, tới khi rụng hết tóc mới biết mình bị đầu độc.',
    viSao: 'CƠ THỂ NHẦM TALI VỚI KALI',
    why: [
      'Ion tali có kích thước gần giống ion kali, thứ mà tế bào cần hằng ngày.',
      'Các bơm trên màng tế bào bắt nhầm rồi kéo tali vào trong như kéo kali.',
      'Vào rồi thì nó phá enzym và đầu độc thần kinh từ bên trong.'
    ],
    dukien: 'Rụng tóc toàn thân sau 1-3 tuần — dấu hiệu đặc trưng nhất',
    dukienLabel: 'TRIỆU CHỨNG NHẬN DIỆN',
    gapODau: [
      'Từng bị dùng làm thuốc diệt chuột, nay bị cấm ở hầu hết các nước.',
      'Có thuốc giải, nhưng phải chẩn đoán đúng mới dùng được.',
      'Ngày nay tali chủ yếu dùng trong đầu dò hồng ngoại và một số thiết bị y học hạt nhân.'
    ],
    ketLuan: 'Chất độc nguy hiểm nhất là chất mà nạn nhân không có cách nào phát hiện.'
  },
  {
    id: 51, key: 'cl2_51_bac_halogenua', tag: 'Nhận biết',
    title: 'BA KẾT TỦA BA MÀU ĐỂ PHÂN BIỆT BA ANION',
    claim: 'Nhỏ bạc nitrat vào ba ống nghiệm giống hệt nhau, ba màu kết tủa khác nhau hiện ra và nói cho bạn biết ống nào là clorua, bromua hay iotua.',
    viSao: 'ION CÀNG LỚN THÌ KẾT TỦA CÀNG VÀNG',
    why: [
      'Ion halogenua càng lớn thì electron càng dễ bị ion bạc kéo lệch về phía mình.',
      'Đám mây electron lệch nhiều thì hợp chất hấp thụ ánh sáng mạnh hơn ở vùng lam tím.',
      'Hấp thụ lam tím thì mắt ta thấy màu vàng, nên iotua vàng đậm nhất.'
    ],
    dukien: 'AgCl trắng · AgBr vàng nhạt · AgI vàng đậm',
    dukienLabel: 'BA MÀU KẾT TỦA',
    gapODau: [
      'Bài thực hành nhận biết anion quen thuộc của chương trình phổ thông.',
      'Cả ba đều nhạy sáng, để ngoài nắng một lúc là xám lại do bạc kim loại tách ra.',
      'Chính tính nhạy sáng ấy làm nên phim ảnh và kính đổi màu.'
    ],
    ketLuan: 'Màu của một kết tủa là câu trả lời mà ống nghiệm nói ra không cần lời.'
  },
  {
    id: 52, key: 'cl2_52_thuoc_tim', tag: 'Nhận biết',
    title: 'DUNG DỊCH TÍM BIẾN MẤT MÀU LÀ PHÉP ĐO ĐANG XONG',
    claim: 'Nhỏ từng giọt thuốc tím vào dung dịch, màu tím vừa nhỏ vào là mất ngay. Tới giọt nào màu tím ở lại không tan nữa, đó là lúc dừng và đọc kết quả.',
    viSao: 'MANGAN ĐỔI SỐ OXI HOÁ THÌ ĐỔI MÀU',
    why: [
      'Trong thuốc tím, mangan ở số oxi hoá bảy và cho màu tím rất đậm.',
      'Gặp chất khử, nó nhận electron xuống số oxi hoá hai, mà dạng này gần như không màu.',
      'Khi chất khử hết sạch, giọt tiếp theo không bị khử nữa nên màu tím ở lại.'
    ],
    dukien: 'MnO₄⁻ (tím) + 5e⁻ → Mn²⁺ (không màu)',
    dukienLabel: 'PHẢN ỨNG ĐỔI MÀU',
    gapODau: [
      'Chuẩn độ xác định hàm lượng sắt, oxalat hay nước oxy già.',
      'Thuốc tím còn dùng sát trùng vết thương và xử lý nước ao nuôi.',
      'Đây là phép chuẩn độ hiếm hoi không cần thêm chất chỉ thị, vì chính nó đã đổi màu.'
    ],
    ketLuan: 'Một phép đo mà điểm dừng là lúc màu chịu ở lại.'
  },
  {
    id: 53, key: 'cl2_53_ruby_saphia', tag: 'Nhận biết',
    title: 'HỒNG NGỌC VÀ LAM NGỌC LÀ CÙNG MỘT KHOÁNG VẬT',
    claim: 'Ruby đỏ rực và saphia xanh thẫm nhìn khác nhau một trời một vực, nhưng cạo ra phân tích thì cả hai đều là nhôm oxit. Khác nhau ở vài nguyên tử lẫn vào.',
    viSao: 'TẠP CHẤT QUYẾT ĐỊNH MÀU',
    why: [
      'Nhôm oxit tinh khiết vốn trong suốt không màu, gọi là corundum.',
      'Lẫn một ít crom vào thì tinh thể hấp thụ ánh lục và cho ra màu đỏ, thành ruby.',
      'Lẫn sắt và titan thì hấp thụ khác đi và cho màu lam, thành saphia.'
    ],
    dukien: 'Al₂O₃ + Cr → đỏ · Al₂O₃ + Fe, Ti → lam',
    dukienLabel: 'CHỈ KHÁC NHAU MỘT TẠP CHẤT',
    gapODau: [
      'Corundum cứng thứ nhì sau kim cương nên còn làm giấy nhám và ổ trục đồng hồ.',
      'Ruby nhân tạo là môi phát của những chiếc laser đầu tiên.',
      'Kính chống xước của đồng hồ và camera điện thoại cũng là saphia nhân tạo.'
    ],
    ketLuan: 'Một phần nghìn tạp chất tạo nên khác biệt giữa hai loại đá quý.'
  },
  {
    id: 54, key: 'cl2_54_vitamin_c', tag: 'Cơ thể',
    title: 'CĂN BỆNH GIẾT THUỶ THỦ NHIỀU HƠN CẢ BÃO TỐ',
    claim: 'Những chuyến tàu viễn dương thế kỷ mười tám mất tới một nửa thuỷ thủ, không phải vì bão hay cướp biển, mà vì thiếu một phân tử nhỏ trong rau quả.',
    viSao: 'THIẾU VITAMIN C THÌ KHÔNG DỆT NỔI COLLAGEN',
    why: [
      'Cơ thể cần vitamin C để tạo collagen, thứ giữ cho da, mạch máu và lợi răng chắc lại.',
      'Thiếu nó thì collagen cũ hỏng dần mà không có cái mới thay, mạch máu rò rỉ và lợi chảy máu.',
      'Vết thương cũ lành từ nhiều năm trước cũng có thể bung ra lại.'
    ],
    dukien: 'Người và khỉ không tự tổng hợp được vitamin C, hầu hết thú khác thì có',
    dukienLabel: 'VÌ SAO CHỈ NGƯỜI MẮC BỆNH NÀY',
    gapODau: [
      'Hải quân Anh phát chanh cho thuỷ thủ, và bị gọi đùa là bọn ăn chanh.',
      'Vitamin C cũng là chất chống oxi hoá, hay được thêm vào thực phẩm để khỏi ôi.',
      'Nấu quá kỹ làm mất phần lớn vitamin C trong rau.'
    ],
    ketLuan: 'Một phân tử mà cơ thể quên mất cách tự làm đã định đoạt số phận nhiều đoàn tàu.'
  },
  {
    id: 55, key: 'cl2_55_selen', tag: 'Cơ thể',
    title: 'CÓ CHẤT MÀ LIỀU ĐỦ VÀ LIỀU ĐỘC GẦN NHAU ĐẾN GIẬT MÌNH',
    claim: 'Selen là vi chất bắt buộc, thiếu thì sinh bệnh tim. Nhưng khoảng cách giữa liều cần và liều gây độc hẹp tới mức ăn vài hạt quả Brazil mỗi ngày là đã quá.',
    viSao: 'CƠ THỂ KHÔNG CÓ CÁCH THẢI NHANH',
    why: [
      'Selen nằm trong enzym chống oxi hoá bảo vệ tế bào, thiếu nó thì cơ tim tổn thương.',
      'Nhưng thừa selen lại thay chỗ lưu huỳnh trong protein, làm protein hỏng cấu trúc.',
      'Dấu hiệu thừa là tóc và móng giòn gãy, hơi thở có mùi tỏi.'
    ],
    dukien: 'Nhu cầu ~55 µg/ngày · ngưỡng độc bắt đầu từ ~400 µg/ngày',
    dukienLabel: 'KHOẢNG CÁCH CHỈ BẢY LẦN',
    gapODau: [
      'Hạt Brazil chứa nhiều selen tới mức chỉ nên ăn vài hạt mỗi tuần.',
      'Bệnh Keshan ở vùng đất nghèo selen từng là bệnh tim phổ biến.',
      'Không nên tự uống viên bổ sung selen khi chưa có xét nghiệm.'
    ],
    ketLuan: 'Cần thiết và độc hại chỉ cách nhau bởi liều lượng.'
  },
  {
    id: 56, key: 'cl2_56_titan_ho_metan', tag: 'Vũ trụ',
    title: 'CÓ MỘT THẾ GIỚI MƯA XUỐNG KHÔNG PHẢI NƯỚC',
    claim: 'Trên Titan, mặt trăng của sao Thổ, có mây, có mưa, có sông và có cả biển. Chỉ khác là toàn bộ chu trình ấy chạy bằng metan lỏng chứ không phải nước.',
    viSao: 'QUÁ LẠNH ĐỂ NƯỚC CHẢY, VỪA ĐỦ ĐỂ METAN CHẢY',
    why: [
      'Bề mặt Titan lạnh khoảng âm một trăm tám mươi độ, ở đó nước đóng băng cứng như đá granit.',
      'Nhưng đúng nhiệt độ ấy thì metan lại ở thể lỏng, y như nước trên Trái Đất.',
      'Metan bốc hơi thành mây, ngưng tụ thành mưa, chảy thành sông rồi đổ ra biển.'
    ],
    dukien: 'Bề mặt Titan −179°C · metan sôi ở −161°C',
    dukienLabel: 'VÌ SAO METAN CHẢY ĐƯỢC',
    gapODau: [
      'Tàu Huygens hạ cánh xuống Titan năm 2005 và chụp được lòng sông khô.',
      'Biển lớn nhất tên Kraken Mare, rộng hơn cả biển Caspi trên Trái Đất.',
      'Titan là thiên thể duy nhất ngoài Trái Đất có chất lỏng ổn định trên bề mặt.'
    ],
    ketLuan: 'Chu trình mưa nắng không cần nước, chỉ cần một chất lỏng đúng nhiệt độ.'
  }
];
