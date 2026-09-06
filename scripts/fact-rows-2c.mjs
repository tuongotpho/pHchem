/** Đợt 3 — chủ đề Công nghiệp và Môi trường. Khuôn ở scripts/gen-fact-reels-v2.mjs */

export const ROWS = [
  {
    id: 25, key: 'cl2_25_axit_sunfuric', tag: 'Công nghiệp',
    title: 'HOÁ CHẤT ĐƯỢC LÀM RA NHIỀU NHẤT HÀNH TINH',
    claim: 'Axit sunfuric là hoá chất được sản xuất nhiều nhất hành tinh. Nhà kinh tế còn lấy lượng tiêu thụ của nó làm thước đo trình độ công nghiệp một quốc gia.',
    viSao: 'NÓ NẰM Ở ĐẦU GẦN NHƯ MỌI DÂY CHUYỀN',
    why: [
      'Muốn có phân lân phải dùng axit sunfuric phân giải quặng apatit.',
      'Muốn luyện kim loại từ quặng sunfua, muốn tẩy gỉ thép cán, cũng cần nó.',
      'Nó rẻ, mạnh, và hút nước cực tốt nên thay được nhiều hoá chất đắt hơn.'
    ],
    dukien: '2 SO₂ + O₂ ⇌ 2 SO₃  (xúc tác V₂O₅) → H₂SO₄',
    dukienLabel: 'DÂY CHUYỀN TIẾP XÚC',
    gapODau: [
      'Ắc quy chì axit trong mọi chiếc ô tô và xe máy.',
      'Phân bón cho gần như toàn bộ diện tích canh tác.',
      'Xử lý bề mặt kim loại trước khi mạ hoặc sơn.'
    ],
    ketLuan: 'Thứ hoá chất ít ai nhắc tên lại đứng đầu mọi bảng sản lượng.'
  },
  {
    id: 26, key: 'cl2_26_thep_cacbon', tag: 'Công nghiệp',
    title: 'THÊM MỘT CHÚT CACBON, SẮT THÀNH THÉP',
    claim: 'Khác biệt giữa sắt mềm và thép cứng nhiều khi chỉ là vài phần nghìn khối lượng cacbon. Thêm nữa thì cứng hơn, nhưng giòn tới mức bẻ là gãy.',
    viSao: 'CACBON CHÈN VÀO KHE MẠNG TINH THỂ SẮT',
    why: [
      'Nguyên tử cacbon nhỏ, chui vào khe giữa các nguyên tử sắt và chèn cứng mạng lại.',
      'Mạng khó trượt thì kim loại cứng hơn, nhưng cũng mất khả năng biến dạng dẻo.',
      'Quá nhiều cacbon thì tạo pha xementit giòn, vật liệu thành gang chứ không còn là thép.'
    ],
    dukien: 'Thép mềm 0,05-0,3% C · thép dụng cụ 0,6-1,5% C · gang trên 2% C',
    dukienLabel: 'RANH GIỚI NẰM Ở ĐÂU',
    gapODau: [
      'Thép xây dựng phải dẻo để chịu uốn, nên cacbon thấp.',
      'Lưỡi dao và mũi khoan cần cứng, nên cacbon cao và phải tôi.',
      'Nồi gang nặng và giòn, rơi xuống nền là nứt chứ không móp.'
    ],
    ketLuan: 'Cứng và dai là hai thứ đánh đổi nhau, và cacbon là cái núm để vặn.'
  },
  {
    id: 27, key: 'cl2_27_nhom_ton_dien', tag: 'Công nghiệp',
    title: 'NHÀ MÁY NHÔM PHẢI DỰNG CẠNH NHÀ MÁY ĐIỆN',
    claim: 'Làm ra một tấn nhôm ngốn lượng điện đủ cho một hộ gia đình dùng vài năm. Vì thế bản đồ nhà máy nhôm thế giới trùng khít với bản đồ thuỷ điện.',
    viSao: 'PHẢI DÙNG ĐIỆN ĐỂ BẺ LIÊN KẾT NHÔM - OXY',
    why: [
      'Liên kết nhôm với oxy quá chặt, không chất khử hoá học thông thường nào bẻ nổi.',
      'Cách duy nhất là điện phân nhôm oxit hoà trong criolit nóng chảy ở gần một nghìn độ.',
      'Dòng điện chạy qua bể điện phân lên tới hàng trăm nghìn ampe, chạy liên tục không được ngắt.'
    ],
    dukien: 'Khoảng 13-15 MWh điện cho mỗi tấn nhôm',
    dukienLabel: 'ĐIỆN NĂNG TIÊU THỤ',
    gapODau: [
      'Iceland, Na Uy và Canada thành cường quốc nhôm nhờ thuỷ điện rẻ.',
      'Người ta gọi thỏi nhôm là điện năng đóng gói, vì bán nhôm thực chất là bán điện.',
      'Tái chế nhôm chỉ tốn khoảng năm phần trăm số điện ấy.'
    ],
    ketLuan: 'Mỗi vỏ lon bạn vứt đi là một mẩu điện năng bị ném vào sọt rác.'
  },
  {
    id: 28, key: 'cl2_28_chung_cat_dau', tag: 'Công nghiệp',
    title: 'MỘT THÙNG DẦU THÔ TÁCH RA ĐƯỢC CẢ CHỤC THỨ',
    claim: 'Xăng, dầu hoả, dầu diesel, nhựa đường và cả nguyên liệu làm nhựa đều ra từ cùng một thùng dầu đen, tách nhau chỉ bằng nhiệt độ sôi.',
    viSao: 'MẠCH CÀNG DÀI THÌ SÔI CÀNG CAO',
    why: [
      'Dầu thô là hỗn hợp hàng nghìn hydrocacbon dài ngắn khác nhau.',
      'Mạch càng dài thì phân tử càng nặng, lực hút giữa chúng càng lớn, nhiệt độ sôi càng cao.',
      'Tháp chưng cất nóng ở đáy lạnh ở đỉnh, mỗi tầng hứng một khoảng nhiệt độ sôi riêng.'
    ],
    dukien: 'Khí <40°C · xăng 40-180°C · dầu hoả 180-250°C · diesel 250-350°C',
    dukienLabel: 'CÁC TẦNG CỦA THÁP',
    gapODau: [
      'Phần cặn đáy tháp thành nhựa đường trải mặt đường bạn đi hằng ngày.',
      'Phần nhẹ nhất thành khí hoá lỏng nấu ăn trong bình gas.',
      'Cắt mạch dài thành mạch ngắn gọi là cracking, để làm thêm xăng.'
    ],
    ketLuan: 'Cả nền công nghiệp hiện đại được xếp tầng theo nhiệt độ sôi.'
  },
  {
    id: 29, key: 'cl2_29_giay_trang', tag: 'Công nghiệp',
    title: 'GIẤY VÀNG Ố VÌ MỘT CHẤT KEO CỦA CÂY',
    claim: 'Tờ báo cũ ngả vàng còn cuốn sách in giấy tốt thì trắng mãi. Khác nhau ở chỗ nhà máy có chịu bỏ công tách lignin ra hay không.',
    viSao: 'LIGNIN GẶP ÁNH SÁNG THÌ SẪM LẠI',
    why: [
      'Gỗ gồm sợi xenlulozơ trắng được lignin gắn lại như keo, và lignin vốn có màu nâu.',
      'Giấy báo làm nhanh nên giữ nguyên lignin, gặp ánh sáng và không khí là oxi hoá ngả vàng.',
      'Giấy in sách tách lignin rồi tẩy trắng nên giữ màu được hàng chục năm.'
    ],
    dukien: 'Gỗ khô: xenlulozơ ~45% · lignin ~25% · còn lại là hemixenlulozơ',
    dukienLabel: 'THÀNH PHẦN CỦA GỖ',
    gapODau: [
      'Báo cũ để nắng vài tuần đã vàng, sách lưu trữ thì hàng chục năm vẫn trắng.',
      'Giấy tái chế thường hơi ngà vì vẫn còn lignin sót lại.',
      'Lignin tách ra nay được nghiên cứu làm keo dán và sợi cacbon.'
    ],
    ketLuan: 'Màu của tờ giấy kể lại nhà máy đã chịu bỏ ra bao nhiêu công.'
  },
  {
    id: 30, key: 'cl2_30_ma_kem', tag: 'Công nghiệp',
    title: 'LỚP KẼM TỰ NGUYỆN GỈ THAY CHO SẮT',
    claim: 'Tôn mạ kẽm bị xước tới tận thép mà vẫn không gỉ ở chỗ xước. Lớp kẽm bên cạnh đang chịu gỉ thay cho phần sắt lộ ra.',
    viSao: 'KẼM HOẠT ĐỘNG MẠNH HƠN SẮT',
    why: [
      'Trong dãy điện hoá, kẽm đứng trước sắt nên dễ nhường electron hơn.',
      'Khi có nước, cặp kẽm và sắt thành một pin nhỏ, kẽm làm cực âm và bị ăn mòn trước.',
      'Chừng nào còn kẽm quanh vết xước thì sắt vẫn được bảo vệ, gọi là bảo vệ ca-tốt.'
    ],
    dukien: 'Zn → Zn²⁺ + 2e⁻  (kẽm hy sinh, sắt được giữ)',
    dukienLabel: 'PHẢN ỨNG BẢO VỆ',
    gapODau: [
      'Mái tôn, cột điện, hàng rào và ốc vít ngoài trời.',
      'Vỏ tàu biển gắn thêm khối kẽm để bị ăn mòn thay cho thân tàu.',
      'Bình nước nóng có thanh magie làm đúng nhiệm vụ đó, phải thay định kỳ.'
    ],
    ketLuan: 'Cách chống gỉ tốt nhất đôi khi là cho một kim loại khác gỉ trước.'
  },
  {
    id: 31, key: 'cl2_31_dien_phan_muoi', tag: 'Công nghiệp',
    title: 'MUỐI ĂN CHO RA BA SẢN PHẨM ĐẮT TIỀN CÙNG LÚC',
    claim: 'Cho dòng điện chạy qua nước muối, bạn thu được xút, khí clo và khí hydro. Cả ba đều bán được, và đây là một trong những dây chuyền lớn nhất ngành hoá.',
    viSao: 'ĐIỆN TÁCH ION RA HAI CỰC',
    why: [
      'Ở cực dương, ion clorua nhường electron thành khí clo bay lên.',
      'Ở cực âm, nước nhận electron cho khí hydro, để lại ion hydroxit.',
      'Ion natri kết hợp với hydroxit còn lại trong dung dịch, đó chính là xút.'
    ],
    dukien: '2 NaCl + 2 H₂O → 2 NaOH + Cl₂↑ + H₂↑',
    dukienLabel: 'PHẢN ỨNG ĐIỆN PHÂN',
    gapODau: [
      'Xút để làm giấy, xà phòng và thông cống.',
      'Clo để khử trùng nước máy và làm nhựa PVC.',
      'Hydro dùng làm nhiên liệu và tổng hợp amoniac.'
    ],
    ketLuan: 'Từ thứ rẻ nhất trong bếp, điện tách ra được ba thứ nuôi cả ngành hoá chất.'
  },
  {
    id: 32, key: 'cl2_32_pet_thanh_vai', tag: 'Môi trường',
    title: 'CHIẾC ÁO KHOÁC CỦA BẠN CÓ THỂ TỪNG LÀ CHAI NƯỚC',
    claim: 'Nhựa làm chai nước và sợi dệt áo phông thể thao là cùng một chất. Nghiền chai ra, kéo thành sợi, dệt lại là thành vải.',
    viSao: 'CHAI VÀ SỢI CÙNG LÀ MỘT LOẠI NHỰA',
    why: [
      'Chai nước trong dùng nhựa PET, mà sợi polyester cũng chính là PET.',
      'Khác nhau chỉ ở cách gia công: một bên thổi thành chai, một bên kéo thành sợi mảnh.',
      'Nghiền chai, nấu chảy rồi ép qua lỗ nhỏ là ra sợi dệt được.'
    ],
    dukien: 'Khoảng 25 chai 500 ml cho một chiếc áo phông thể thao',
    dukienLabel: 'CẦN BAO NHIÊU CHAI',
    gapODau: [
      'Áo thể thao, túi vải và lõi chăn bông đều có sợi từ chai tái chế.',
      'Nhược điểm: giặt áo polyester nhả ra vi nhựa trôi ra sông biển.',
      'Vì vậy tái chế chai thành chai vẫn tốt hơn tái chế thành vải.'
    ],
    ketLuan: 'Cùng một phân tử, đổi cách tạo hình là đổi luôn công dụng.'
  },
  {
    id: 33, key: 'cl2_33_phen_lang_nuoc', tag: 'Môi trường',
    title: 'MỘT NHÚM PHÈN LÀM TRONG CẢ CHUM NƯỚC ĐỤC',
    claim: 'Nước sông đục ngầu để lắng cả tuần vẫn đục. Bỏ vào một nhúm phèn chua, nửa giờ sau đã trong veo. Hạt bẩn không tự lắng, chúng phải được bắt tay nhau trước.',
    viSao: 'HẠT BẨN CÙNG MANG ĐIỆN ÂM NÊN ĐẨY NHAU',
    why: [
      'Hạt đất sét lơ lửng đều mang điện âm, chúng đẩy nhau nên không bao giờ tụ lại.',
      'Phèn nhôm tan ra cho ion nhôm mang ba điện tích dương, trung hoà hết điện âm ấy.',
      'Hết lực đẩy, các hạt kết thành bông lớn nặng và chìm xuống đáy.'
    ],
    dukien: 'Al³⁺ trung hoà điện tích âm → hạt keo tụ thành bông lắng',
    dukienLabel: 'CƠ CHẾ KEO TỤ',
    gapODau: [
      'Nhà máy nước sạch đều có bể keo tụ đứng đầu dây chuyền.',
      'Người dân vùng lũ vẫn dùng phèn chua đánh nước sông trước khi lọc.',
      'Lắng trong rồi vẫn phải lọc và khử trùng, phèn không diệt được vi khuẩn.'
    ],
    ketLuan: 'Nước không tự trong, phải có ai đó gỡ bỏ lực đẩy giữa các hạt bẩn.'
  },
  {
    id: 34, key: 'cl2_34_pin_cu', tag: 'Môi trường',
    title: 'MỘT VIÊN PIN VỨT BỪA LÀM HỎNG CẢ KHỐI ĐẤT',
    claim: 'Viên pin tiểu nằm trong bãi rác vài năm là vỏ mục, kim loại nặng bên trong ngấm thẳng xuống mạch nước ngầm.',
    viSao: 'KIM LOẠI NẶNG KHÔNG PHÂN HUỶ ĐƯỢC',
    why: [
      'Chất hữu cơ còn bị vi sinh vật phân giải, còn kim loại nặng thì không mất đi đâu cả.',
      'Chúng chỉ chuyển từ đất sang nước, từ nước sang cây, rồi vào cơ thể người.',
      'Cadimi tích trong thận hàng chục năm, thuỷ ngân và chì thì phá thần kinh.'
    ],
    dukien: 'Kim loại nặng không phân huỷ — chỉ đổi chỗ và tích lại dần',
    dukienLabel: 'VÌ SAO NGUY HIỂM LÂU DÀI',
    gapODau: [
      'Pin tiểu, pin cúc áo, pin điện thoại và ắc quy đều phải bỏ vào thùng thu gom riêng.',
      'Nhiều siêu thị và trường học nay có hộp thu pin cũ.',
      'Pin cúc áo nguy hiểm nhất vì trẻ nhỏ dễ nuốt phải.'
    ],
    ketLuan: 'Thứ nhỏ nhất trong sọt rác lại là thứ ở lại lâu nhất trong đất.'
  },
  {
    id: 35, key: 'cl2_35_nhom_tai_che', tag: 'Môi trường',
    title: 'TÁI CHẾ NHÔM CHỈ TỐN NĂM PHẦN TRĂM NĂNG LƯỢNG',
    claim: 'Nấu lại một vỏ lon cũ chỉ ngốn khoảng một phần hai mươi số điện cần để làm ra chính vỏ lon ấy từ quặng.',
    viSao: 'PHẦN TỐN ĐIỆN NHẤT ĐÃ LÀM XONG RỒI',
    why: [
      'Điện chủ yếu bị ngốn ở khâu điện phân để bẻ liên kết nhôm với oxy trong quặng.',
      'Vỏ lon cũ đã là nhôm kim loại rồi, chỉ cần nấu chảy ở khoảng sáu trăm sáu mươi độ.',
      'Nhôm tái chế không hề kém chất lượng, nấu lại bao nhiêu lần cũng được.'
    ],
    dukien: 'Từ quặng: ~14 MWh/tấn · nấu lại lon cũ: ~0,7 MWh/tấn',
    dukienLabel: 'SO SÁNH ĐIỆN NĂNG',
    gapODau: [
      'Một vỏ lon quay lại kệ siêu thị chỉ sau khoảng sáu mươi ngày.',
      'Nhôm là vật liệu có tỉ lệ tái chế cao nhất trong các loại bao bì.',
      'Bóp dẹp lon trước khi bỏ thùng giúp giảm chi phí vận chuyển.'
    ],
    ketLuan: 'Không có vật liệu nào trả công cho việc phân loại rác hậu hĩnh như nhôm.'
  },
  {
    id: 36, key: 'cl2_36_asen_nuoc_ngam', tag: 'Môi trường',
    title: 'NƯỚC GIẾNG KHOAN TRONG VẮT VẪN CÓ THỂ NHIỄM ĐỘC',
    claim: 'Asen không màu, không mùi, không vị. Nước giếng nhiễm asen nhìn trong veo, uống bình thường, và hàng chục năm sau mới phát bệnh.',
    viSao: 'ASEN NGẤM TỰ NHIÊN TỪ TẦNG ĐẤT',
    why: [
      'Vùng châu thổ sông ở châu Á có tầng trầm tích trẻ chứa nhiều khoáng vật giàu asen.',
      'Trong điều kiện thiếu oxy dưới sâu, asen tan ra và đi vào mạch nước ngầm.',
      'Đây là nhiễm độc do địa chất, không phải do nhà máy nào xả thải.'
    ],
    dukien: 'Giới hạn của WHO cho nước uống: 10 microgam asen mỗi lít',
    dukienLabel: 'NGƯỠNG AN TOÀN',
    gapODau: [
      'Đồng bằng sông Hồng và sông Cửu Long đều có vùng nhiễm asen đã ghi nhận.',
      'Dấu hiệu muộn là dày sừng lòng bàn tay bàn chân và các đốm sạm da.',
      'Bể lọc cát và giàn mưa có thể giảm asen, nhưng phải mang mẫu đi xét nghiệm mới biết chắc.'
    ],
    ketLuan: 'Nước trong không có nghĩa là nước sạch, và chỉ xét nghiệm mới trả lời được.'
  }
];
