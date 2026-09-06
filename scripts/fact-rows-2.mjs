/**
 * fact-rows-2.mjs — Đợt 1 loạt "Chuyện lạ hoá học" kiểu mới:
 * chủ đề Đời sống và Nông nghiệp.
 *
 * Mỗi mẩu gồm:
 *   tag        — chủ đề, quyết định màu nhấn của video
 *   title      — tên mẩu, chữ to nhất cảnh 1 (tối đa 2 dòng)
 *   claim      — chính điều bất ngờ, kể thành câu
 *   viSao      — tiêu đề cảnh 2
 *   why[3]     — ba ý giải thích
 *   dukien     — phản ứng hoặc con số chốt
 *   gapODau[3] — bắt gặp ở đâu trong đời sống
 *   ketLuan    — câu kết
 */

export const ROWS = [
  {
    id: 1, key: 'cl2_01_xa_phong', tag: 'Đời sống',
    title: 'XÀ PHÒNG KÉO DẦU MỠ VÀO NƯỚC BẰNG CÁCH NÀO',
    claim: 'Dầu không tan trong nước, ai cũng biết. Vậy mà chỉ cần một chút xà phòng là mỡ trên tay trôi sạch theo dòng nước.',
    viSao: 'MỘT ĐẦU ƯA NƯỚC, MỘT ĐẦU ƯA DẦU',
    why: [
      'Phân tử xà phòng có hai đầu trái tính: đầu mang điện thì ưa nước, đuôi hydrocacbon dài thì ưa dầu.',
      'Khi gặp vết mỡ, hàng loạt phân tử chụm đuôi vào giọt dầu, quay đầu ưa nước ra ngoài.',
      'Giọt dầu bị bọc kín trong lớp vỏ ưa nước nên trôi theo dòng nước thay vì bám lại.'
    ],
    dukien: 'C₁₇H₃₅COONa — đuôi 17 cacbon ưa dầu, đầu COONa ưa nước',
    dukienLabel: 'CẤU TẠO PHÂN TỬ XÀ PHÒNG',
    gapODau: [
      'Rửa bát, giặt quần áo và tắm gội đều dựa trên đúng cơ chế này.',
      'Nước rửa tay khô lại đi đường khác: cồn phá vỏ vi khuẩn chứ không cuốn dầu đi.',
      'Xà phòng gặp nước cứng sinh cặn bám, đó là lý do có bột giặt tổng hợp.'
    ],
    ketLuan: 'Một phân tử chia làm hai nửa trái tính đã giải quyết được bài toán dầu và nước.'
  },
  {
    id: 2, key: 'cl2_02_chua_dang', tag: 'Đời sống',
    title: 'VÌ SAO CHANH THÌ CHUA CÒN XÀ PHÒNG THÌ NHỚT',
    claim: 'Lưỡi và da tay của bạn thật ra đang làm một phép thử hoá học: chua là axit, còn đắng kèm cảm giác nhờn trơn là bazơ.',
    viSao: 'HAI ĐẦU CỦA THANG pH',
    why: [
      'Axit nhả ion hydro, chính ion này kích thích thụ thể vị chua trên lưỡi.',
      'Bazơ thì ngược lại, nó thuỷ phân một phần chất béo trên da tay thành xà phòng nên thấy nhớt.',
      'Cảm giác nhờn ấy là dấu hiệu bazơ đang ăn vào da, không phải chuyện vô hại.'
    ],
    dukien: 'Chanh pH ≈ 2 · Nước tinh khiết pH = 7 · Nước tro pH ≈ 11',
    dukienLabel: 'THANG pH QUANH NHÀ BẠN',
    gapODau: [
      'Giấm, chanh, nước ngọt có ga đều nằm phía axit của thang.',
      'Xà phòng, nước tro, thuốc thông cống nằm phía bazơ.',
      'Thấy nhớt trơn khi dính hoá chất lạ thì rửa ngay bằng thật nhiều nước.'
    ],
    ketLuan: 'Vị chua và cảm giác nhớt là hai đầu của cùng một thang đo.'
  },
  {
    id: 3, key: 'cl2_03_day_toc_wolfram', tag: 'Đời sống',
    title: 'DÂY TÓC BÓNG ĐÈN NÓNG HƠN DUNG NHAM',
    claim: 'Sợi dây trong bóng đèn sợi đốt cháy sáng ở khoảng hai nghìn năm trăm độ, nóng hơn dung nham núi lửa, mà vẫn không chảy.',
    viSao: 'WOLFRAM CHỊU NHIỆT CAO NHẤT TRONG CÁC KIM LOẠI',
    why: [
      'Wolfram nóng chảy ở ba nghìn bốn trăm hai mươi hai độ, cao nhất trong mọi kim loại.',
      'Nhờ vậy dây tóc nung đỏ trắng vẫn giữ nguyên hình dạng suốt hàng nghìn giờ.',
      'Bóng đèn phải hút chân không hoặc bơm khí trơ, vì gặp oxy thì wolfram cháy hết ngay.'
    ],
    dukien: 'Wolfram nóng chảy 3422°C · dung nham chỉ khoảng 1200°C',
    dukienLabel: 'SO SÁNH NHIỆT ĐỘ',
    gapODau: [
      'Bóng đèn sợi đốt đời cũ, đèn sấy và đèn pha ô tô halogen.',
      'Mũi khoan và dao cắt hợp kim wolfram cacbua trong xưởng cơ khí.',
      'Đèn LED nay đã thay gần hết vì bóng sợi đốt phí điện thành nhiệt.'
    ],
    ketLuan: 'Cả trăm năm chiếu sáng nhân loại dựa vào một kim loại chịu nóng giỏi nhất.'
  },
  {
    id: 4, key: 'cl2_04_nuoc_hoa', tag: 'Đời sống',
    title: 'NƯỚC HOA ĐỔI MÙI SUỐT CẢ NGÀY',
    claim: 'Xịt lúc sáng thấy thơm chanh sả, tới chiều lại nghe mùi gỗ ấm. Chai vẫn thế, chỉ là các phân tử bay đi không cùng tốc độ.',
    viSao: 'MỖI PHÂN TỬ BAY HƠI MỘT NHỊP',
    why: [
      'Phân tử nhẹ và ít liên kết thì bay hơi trước, cho hương đầu chỉ kéo dài chừng mươi phút.',
      'Phân tử trung bình giữ được vài giờ, tạo tầng hương giữa.',
      'Phân tử nặng như xạ hương và nhựa gỗ bay rất chậm, bám tới cuối ngày.'
    ],
    dukien: 'Hương đầu ~15 phút · hương giữa 2-4 giờ · hương cuối 6-8 giờ',
    dukienLabel: 'BA TẦNG HƯƠNG',
    gapODau: [
      'Cùng một chai xịt cho hai người có thể nghe khác nhau vì nhiệt độ da khác nhau.',
      'Xịt lên cổ tay rồi chà xát làm vỡ tầng hương đầu, mất luôn đoạn mở.',
      'Cất nước hoa nơi mát tối vì nắng nóng phá phân tử thơm.'
    ],
    ketLuan: 'Một lọ nước hoa là một bản nhạc mà các phân tử vào bè theo thứ tự.'
  },
  {
    id: 5, key: 'cl2_05_chao_chong_dinh', tag: 'Đời sống',
    title: 'CHẢO CHỐNG DÍNH KHÔNG BÁM VÀO THỨ GÌ, KỂ CẢ KEO',
    claim: 'Lớp phủ Teflon trơn tới mức gần như không chất nào bám nổi. Vậy nhà sản xuất dán được nó vào chảo bằng cách nào?',
    viSao: 'LIÊN KẾT CACBON - FLO QUÁ CHẶT',
    why: [
      'Teflon là chuỗi cacbon bọc kín bởi nguyên tử flo, mà flo giữ electron chặt nhất trong mọi nguyên tố.',
      'Vỏ flo ấy gần như không hút được phân tử nào khác, nên mặt chảo trơn tuột.',
      'Muốn dán được, người ta phải phun cát làm nhám mặt chảo cho lớp phủ bám cơ học vào các vết lõm.'
    ],
    dukien: 'Liên kết C–F: 485 kJ/mol, thuộc nhóm bền nhất trong hoá hữu cơ',
    dukienLabel: 'VÌ SAO TRƠ ĐẾN THẾ',
    gapODau: [
      'Chảo chống dính, khuôn bánh và cả băng tan trong máy in laser.',
      'Đun chảo không dưới ba trăm độ thì lớp phủ bắt đầu phân huỷ, nên đừng để chảo không trên bếp.',
      'Chảo tróc lớp phủ thì bỏ, vì mảnh tróc lẫn vào thức ăn.'
    ],
    ketLuan: 'Thứ trơn nhất bếp nhà bạn được giữ lại bằng một mặt kim loại cố tình làm cho xù xì.'
  },
  {
    id: 6, key: 'cl2_06_muc_but_bi', tag: 'Đời sống',
    title: 'MỰC BÚT BI KHÔ NGAY KHI VỪA RỜI NGÒI',
    claim: 'Mực trong ruột bút lỏng suốt nhiều năm không khô, vậy mà vừa chạm giấy vài giây là đã khô ráo không nhoè.',
    viSao: 'RUỘT BÚT KÍN, MẶT GIẤY THÌ HỞ',
    why: [
      'Mực bút bi là bột màu trộn trong dung môi đặc sệt, ruột bút kín nên dung môi không bay đi được.',
      'Ra tới mặt giấy, lớp mực mỏng có diện tích tiếp xúc không khí lớn nên dung môi bay rất nhanh.',
      'Bột màu ở lại bám vào thớ giấy, còn dung môi thì đi mất, thế là khô.'
    ],
    dukien: 'Viên bi đầu ngòi chỉ khoảng 0,5 - 1 mm, lăn để nhả mực',
    dukienLabel: 'CƠ CẤU ĐẦU BÚT',
    gapODau: [
      'Bút để lâu không dùng bị tắc vì dung môi ở sát đầu bi đã bay hết.',
      'Viết ngược lên trần thì mực không xuống vì bút bi dựa vào trọng lực.',
      'Bút gel dùng dung môi nước nên viết trơn hơn nhưng lâu khô hơn.'
    ],
    ketLuan: 'Cùng một thứ mực, khô hay không chỉ tuỳ vào nó được để kín hay để hở.'
  },
  {
    id: 7, key: 'cl2_07_kinh_doi_mau', tag: 'Đời sống',
    title: 'KÍNH TỰ SẪM LẠI KHI RA NẮNG RỒI TỰ TRONG KHI VÀO BÓNG',
    claim: 'Không pin, không cảm biến, không công tắc. Tròng kính đổi màu chỉ nhờ một phản ứng hoá học chạy đi chạy lại.',
    viSao: 'BẠC HALOGENUA TÁCH RA RỒI GHÉP LẠI',
    why: [
      'Trong tròng kính có rắc tinh thể bạc halogenua siêu nhỏ.',
      'Tia cực tím trong nắng tách chúng thành bạc kim loại, những hạt bạc này chặn ánh sáng nên kính sẫm lại.',
      'Vào bóng râm hết tia cực tím, bạc ghép lại thành hợp chất trong suốt, kính sáng trở lại.'
    ],
    dukien: 'AgCl ⇄ Ag + Cl  (thuận khi có tia UV, nghịch khi hết)',
    dukienLabel: 'PHẢN ỨNG THUẬN NGHỊCH',
    gapODau: [
      'Kính đổi màu cho người cận, và kính râm thể thao.',
      'Ngồi trong ô tô kính không sẫm mấy, vì kính chắn gió đã lọc phần lớn tia cực tím.',
      'Kính đổi màu chậm dần khi trời lạnh vì phản ứng nghịch chạy chậm hơn.'
    ],
    ketLuan: 'Một phản ứng biết đi cả hai chiều là đủ làm nên chiếc kính thông minh không cần điện.'
  },
  {
    id: 8, key: 'cl2_08_hop_thiec', tag: 'Đời sống',
    title: 'HỘP THIẾC THẬT RA LÀM BẰNG THÉP',
    claim: 'Cái vỏ đồ hộp mà ai cũng gọi là hộp thiếc chỉ có một lớp thiếc mỏng hơn sợi tóc hàng chục lần phủ ngoài thép.',
    viSao: 'THIẾC CHẶN GỈ MÀ KHÔNG ĐỘC',
    why: [
      'Thép rẻ và cứng nhưng gặp nước và axit trong thực phẩm là gỉ ngay.',
      'Thiếc không phản ứng với thức ăn và không độc, nên được tráng một lớp cực mỏng làm áo bảo vệ.',
      'Bên trong nhiều loại hộp còn phủ thêm một lớp sơn hữu cơ để cách ly hẳn.'
    ],
    dukien: 'Lớp thiếc chỉ dày cỡ 0,4 micromet, mỏng hơn sợi tóc chừng 200 lần',
    dukienLabel: 'ĐỘ DÀY LỚP PHỦ',
    gapODau: [
      'Đồ hộp, sữa đặc, nước ngọt lon và bình xịt.',
      'Hộp bị móp sâu hay phồng nắp thì bỏ, vì lớp phủ có thể đã nứt.',
      'Đồ hộp mở rồi nên trút ra bát, đừng để nguyên trong hộp trong tủ lạnh.'
    ],
    ketLuan: 'Cả cái hộp là thép, thiếc chỉ là tấm áo mỏng nhưng thiếu nó thì hộp gỉ trong vài ngày.'
  },
  {
    id: 9, key: 'cl2_09_argon_bong_den', tag: 'Đời sống',
    title: 'ARGON NHIỀU HƠN KHÍ NHÀ KÍNH CO₂ GẦN BA MƯƠI LẦN',
    claim: 'Ai cũng nghe nói tới CO₂ trong không khí. Ít ai biết argon còn nhiều hơn thế gần ba mươi lần, mà chẳng ai nhắc tới.',
    viSao: 'TRƠ QUÁ NÊN KHÔNG AI ĐỂ Ý',
    why: [
      'Argon chiếm khoảng chín phần mười phần trăm không khí, còn CO₂ chỉ hơn không phẩy không bốn phần trăm.',
      'Nó là khí hiếm, không phản ứng với gì nên không gây hiệu ứng nhà kính, không tham gia sự sống.',
      'Chính sự trơ ấy làm nó hữu ích: bơm vào bóng đèn để dây tóc không cháy đứt.'
    ],
    dukien: 'Không khí: N₂ 78% · O₂ 21% · Ar 0,93% · CO₂ 0,04%',
    dukienLabel: 'THÀNH PHẦN KHÔNG KHÍ',
    gapODau: [
      'Bóng đèn sợi đốt, hàn hồ quang trong môi trường khí trơ.',
      'Bơm vào lớp giữa cửa kính hai lớp để cách nhiệt tốt hơn.',
      'Bảo quản tài liệu và rượu vang bằng cách phủ argon lên bề mặt.'
    ],
    ketLuan: 'Thứ nhiều thứ ba trong bầu khí quyển lại là thứ ít ai gọi tên nhất.'
  },
  {
    id: 10, key: 'cl2_10_pyrex', tag: 'Đời sống',
    title: 'CỐC THUỶ TINH NÀY RÓT NƯỚC SÔI KHÔNG NỨT',
    claim: 'Cùng là thuỷ tinh, cốc thường rót nước sôi vào có thể nứt toác, còn cốc chịu nhiệt thì bình thản. Khác nhau ở một chất thêm vào.',
    viSao: 'BO OXIT LÀM THUỶ TINH GẦN NHƯ KHÔNG GIÃN NỞ',
    why: [
      'Thuỷ tinh nứt vì mặt trong gặp nóng giãn ra trong khi mặt ngoài còn nguội, hai bên kéo nhau.',
      'Thêm bo oxit vào làm hệ số giãn nở giảm xuống chỉ còn khoảng một phần ba.',
      'Chênh lệch giãn nở nhỏ thì ứng suất bên trong không đủ lớn để làm nứt.'
    ],
    dukien: 'Thuỷ tinh thường giãn 9×10⁻⁶/°C · loại pha bo chỉ 3,3×10⁻⁶/°C',
    dukienLabel: 'HỆ SỐ GIÃN NỞ',
    gapODau: [
      'Bình đun, khay nướng, cốc đo trong phòng thí nghiệm.',
      'Kính chắn lò sưởi và ống kính thiên văn cỡ lớn.',
      'Loại này vẫn sợ sốc lạnh đột ngột, đừng lấy từ lò nóng thả thẳng vào bồn nước.'
    ],
    ketLuan: 'Chống nứt không phải nhờ dày hơn mà nhờ giãn nở ít hơn.'
  },
  {
    id: 11, key: 'cl2_11_xanh_coban', tag: 'Đời sống',
    title: 'MÀU XANH GỐM SỨ NGHÌN NĂM CHƯA CÓ THỨ THAY THẾ',
    claim: 'Sắc lam trên gốm Bát Tràng và sứ Trung Hoa cổ vẫn dùng đúng một hợp chất coban mà người xưa đã dùng từ hàng nghìn năm trước.',
    viSao: 'COBAN CHỊU ĐƯỢC LỬA LÒ NUNG',
    why: [
      'Men gốm phải nung trên một nghìn hai trăm độ, hầu hết chất màu hữu cơ cháy sạch ở nhiệt đó.',
      'Hợp chất coban vẫn giữ nguyên màu lam sau khi ra lò, lại còn tan đều vào men.',
      'Chỉ cần một lượng rất nhỏ đã cho màu đậm, nên vẽ nét mảnh vẫn rõ.'
    ],
    dukien: 'CoO·Al₂O₃ — xanh coban, bền tới trên 1300°C',
    dukienLabel: 'HỢP CHẤT TẠO MÀU',
    gapODau: [
      'Gốm men lam, sứ vẽ tay và tranh kính nhà thờ.',
      'Coban còn là lõi của vitamin B12 trong cơ thể người.',
      'Cùng nguyên tố ấy nay nằm trong cực dương pin lithium điện thoại.'
    ],
    ketLuan: 'Một chất màu vượt qua nghìn năm và vẫn chưa ai làm ra thứ thay được nó.'
  },
  {
    id: 12, key: 'cl2_12_etilen_chin', tag: 'Nông nghiệp',
    title: 'TRÁI CÂY GỌI NHAU CÙNG CHÍN',
    claim: 'Để quả chuối chín cạnh rổ xoài xanh, mấy hôm sau cả rổ chín theo. Chuối đang nhả ra một chất khí ra lệnh cho hàng xóm chín.',
    viSao: 'ETILEN LÀ HOOCMON CHÍN CỦA THỰC VẬT',
    why: [
      'Quả chín tự sinh khí etilen và nhả ra không khí xung quanh.',
      'Quả bên cạnh hít phải liền khởi động men phân giải tinh bột thành đường, thịt quả mềm ra.',
      'Càng chín càng nhả nhiều etilen, nên phản ứng lan như dây chuyền trong cả rổ.'
    ],
    dukien: 'C₂H₄ — phân tử đơn giản nhất trong các hoocmon thực vật',
    dukienLabel: 'CHẤT RA LỆNH',
    gapODau: [
      'Muốn quả nhanh chín thì bọc chung với chuối chín trong túi giấy.',
      'Muốn giữ lâu thì để riêng, thoáng khí, và mát.',
      'Nhà kho dùng buồng etilen để giấm chín chuối, cà chua đúng ngày ra chợ.'
    ],
    ketLuan: 'Trái cây nói chuyện với nhau bằng một phân tử chỉ có hai cacbon.'
  },
  {
    id: 13, key: 'cl2_13_booc_do', tag: 'Nông nghiệp',
    title: 'THUỐC TRỪ NẤM RA ĐỜI TỪ MỘT MẸO CHỐNG TRỘM NHO',
    claim: 'Người trồng nho ở Bordeaux quét hỗn hợp xanh lét lên cây cho khách qua đường sợ mà không hái trộm, rồi phát hiện cây hết cả nấm.',
    viSao: 'ION ĐỒNG PHÁ MEN CỦA NẤM',
    why: [
      'Hỗn hợp gồm đồng sunfat trộn với nước vôi, cho ra kết tủa bám chặt lên lá.',
      'Ion đồng nhả ra từ từ, phá enzym của bào tử nấm khiến chúng không nảy mầm được.',
      'Vôi vừa giữ thuốc bám lâu vừa trung hoà bớt tính axit để lá không bị cháy.'
    ],
    dukien: 'CuSO₄ + Ca(OH)₂ → hỗn hợp Boóc-đô',
    dukienLabel: 'CÔNG THỨC PHA',
    gapODau: [
      'Vườn nho, vườn cà chua, cây ăn quả và cả cây cảnh.',
      'Vẫn được dùng trong canh tác hữu cơ vì gốc vô cơ, không tồn dư hữu cơ.',
      'Dùng quá tay thì đồng tích lại trong đất, hại giun và vi sinh vật.'
    ],
    ketLuan: 'Một mẹo doạ kẻ trộm hoá ra là bài thuốc trừ nấm dùng tới tận bây giờ.'
  }
];
