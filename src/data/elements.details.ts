// Dữ liệu chi tiết cho 118 nguyên tố.
// NGUYÊN TẮC: chỉ ghi giá trị ĐO ĐƯỢC theo bảng tra chuẩn. Giá trị mới chỉ là
// dự đoán lý thuyết (nguyên tố siêu nặng, franxi, astatin...) để null — app sẽ
// hiện "chưa xác định" chứ không bịa số.
//
// melt/boil : °C ở 1 atm
// density   : g/cm³ (chất khí lưu ở g/cm³, app tự đổi ra g/L khi hiển thị)
// en        : độ âm điện thang Pauling
// disc      : năm phát hiện; 0 = đã biết từ thời cổ đại
// state     : trạng thái ở 25°C — 's' rắn, 'l' lỏng, 'g' khí, '?' chưa rõ

export type Phase = 's' | 'l' | 'g' | '?';

export interface ElementDetails {
  melt: number | null;
  boil: number | null;
  density: number | null;
  en: number | null;
  disc: number | null;
  state: Phase;
  use_vi: string;
  use_en: string;
}

type Row = [
  number, // số hiệu
  number | null, // melt
  number | null, // boil
  number | null, // density
  number | null, // en
  number | null, // disc
  Phase,
  string, // use_vi
  string, // use_en
];

const ROWS: Row[] = [
  [1, -259.16, -252.87, 0.00008988, 2.2, 1766, 'g', 'Nhiên liệu tên lửa, sản xuất amoniac', 'Rocket fuel, ammonia production'],
  [2, -272.2, -268.93, 0.0001785, null, 1868, 'g', 'Bơm khinh khí cầu, làm lạnh siêu dẫn', 'Balloons, superconductor cooling'],
  [3, 180.5, 1342, 0.534, 0.98, 1817, 's', 'Pin lithium, thuốc điều trị rối loạn lưỡng cực', 'Lithium batteries, bipolar medication'],
  [4, 1287, 2469, 1.85, 1.57, 1798, 's', 'Hợp kim nhẹ, cửa sổ máy X-quang', 'Light alloys, X-ray windows'],
  [5, 2076, 3927, 2.34, 2.04, 1808, 's', 'Thủy tinh chịu nhiệt, chất chống cháy', 'Heat-resistant glass, flame retardants'],
  [6, 3550, 4027, 2.267, 2.55, 0, 's', 'Thép, nhựa, kim cương, nhiên liệu', 'Steel, plastics, diamond, fuel'],
  [7, -210, -195.79, 0.0012506, 3.04, 1772, 'g', 'Phân đạm, bảo quản thực phẩm', 'Fertilizer, food packaging'],
  [8, -218.79, -182.96, 0.001429, 3.44, 1774, 'g', 'Hô hấp, luyện thép, y tế', 'Respiration, steelmaking, medicine'],
  [9, -219.67, -188.11, 0.001696, 3.98, 1886, 'g', 'Kem đánh răng, Teflon, chất làm lạnh', 'Toothpaste, Teflon, refrigerants'],
  [10, -248.59, -246.05, 0.0008999, null, 1898, 'g', 'Đèn quảng cáo neon', 'Neon signs'],
  [11, 97.79, 883, 0.968, 0.93, 1807, 's', 'Muối ăn, đèn hơi natri', 'Table salt, sodium lamps'],
  [12, 650, 1090, 1.738, 1.31, 1755, 's', 'Hợp kim nhẹ, pháo sáng', 'Light alloys, flares'],
  // Nhôm sôi ở 2519 °C, không phải 2470. 2470 là con số cũ; PubChem và bảng
  // của CRC (qua Wikipedia) đều cho 2792 K = 2518,85 °C.
  [13, 660.32, 2519, 2.7, 1.61, 1825, 's', 'Vỏ lon, khung cửa, máy bay', 'Cans, window frames, aircraft'],
  [14, 1414, 3265, 2.3296, 1.9, 1824, 's', 'Chip máy tính, pin mặt trời, thủy tinh', 'Computer chips, solar cells, glass'],
  [15, 44.15, 280.5, 1.823, 2.19, 1669, 's', 'Phân lân, diêm, chất tẩy rửa', 'Fertilizer, matches, detergents'],
  [16, 115.21, 444.6, 2.07, 2.58, 0, 's', 'Axit sunfuric, lưu hóa cao su', 'Sulfuric acid, rubber vulcanization'],
  [17, -101.5, -34.04, 0.003214, 3.16, 1774, 'g', 'Khử trùng nước, sản xuất nhựa PVC', 'Water disinfection, PVC production'],
  [18, -189.35, -185.85, 0.0017837, null, 1894, 'g', 'Khí bảo vệ khi hàn, bóng đèn', 'Welding shield gas, light bulbs'],
  [19, 63.5, 759, 0.89, 0.82, 1807, 's', 'Phân kali, xà phòng mềm', 'Potash fertilizer, soft soap'],
  [20, 842, 1484, 1.55, 1.0, 1808, 's', 'Xi măng, vôi, xương và răng', 'Cement, lime, bones and teeth'],
  [21, 1541, 2836, 2.985, 1.36, 1879, 's', 'Hợp kim nhôm hàng không, đèn cao áp', 'Aerospace alloys, high-intensity lamps'],
  [22, 1668, 3287, 4.506, 1.54, 1791, 's', 'Khung máy bay, cấy ghép y tế, bột màu trắng', 'Aircraft, medical implants, white pigment'],
  [23, 1910, 3407, 6.0, 1.63, 1801, 's', 'Thép hợp kim bền, chất xúc tác', 'Strong alloy steel, catalysts'],
  [24, 1907, 2671, 7.15, 1.66, 1797, 's', 'Mạ crom, thép không gỉ', 'Chrome plating, stainless steel'],
  [25, 1246, 2061, 7.21, 1.55, 1774, 's', 'Thép cứng, pin khô', 'Hardened steel, dry cells'],
  [26, 1538, 2862, 7.874, 1.83, 0, 's', 'Thép, xây dựng, hemoglobin trong máu', 'Steel, construction, blood haemoglobin'],
  [27, 1495, 2927, 8.9, 1.88, 1735, 's', 'Pin lithium, nam châm, men gốm xanh', 'Batteries, magnets, blue ceramic glaze'],
  [28, 1455, 2913, 8.908, 1.91, 1751, 's', 'Thép không gỉ, pin sạc, mạ điện', 'Stainless steel, batteries, plating'],
  [29, 1084.62, 2562, 8.96, 1.9, 0, 's', 'Dây điện, ống nước, đồ đồng', 'Electrical wiring, plumbing, bronze'],
  [30, 419.53, 907, 7.14, 1.65, 1746, 's', 'Mạ kẽm chống gỉ, pin', 'Galvanizing, batteries'],
  [31, 29.76, 2400, 5.91, 1.81, 1875, 's', 'Đèn LED, chất bán dẫn', 'LEDs, semiconductors'],
  [32, 938.25, 2833, 5.323, 2.01, 1886, 's', 'Cáp quang, thấu kính hồng ngoại', 'Fiber optics, infrared lenses'],
  [33, 817, 614, 5.727, 2.18, 1250, 's', 'Chất bán dẫn; thuốc trừ sâu nay đã hạn chế', 'Semiconductors; pesticides now restricted'],
  [34, 221, 685, 4.81, 2.55, 1817, 's', 'Máy photocopy, tạo màu thủy tinh', 'Photocopiers, glass tinting'],
  [35, -7.2, 58.8, 3.1028, 2.96, 1826, 'l', 'Chất chống cháy, thuốc nhuộm', 'Flame retardants, dyes'],
  [36, -157.37, -153.42, 0.003733, 3.0, 1898, 'g', 'Đèn chiếu sáng cường độ cao', 'High-intensity lighting'],
  [37, 39.31, 688, 1.532, 0.82, 1861, 's', 'Đồng hồ nguyên tử, nghiên cứu', 'Atomic clocks, research'],
  [38, 777, 1377, 2.64, 0.95, 1790, 's', 'Pháo hoa màu đỏ, sơn dạ quang', 'Red fireworks, glow-in-the-dark paint'],
  [39, 1526, 3336, 4.472, 1.22, 1794, 's', 'Bột huỳnh quang màn hình, siêu dẫn', 'Display phosphors, superconductors'],
  [40, 1855, 4409, 6.52, 1.33, 1789, 's', 'Vỏ thanh nhiên liệu hạt nhân, đá giả kim cương', 'Nuclear fuel cladding, cubic zirconia'],
  [41, 2477, 4744, 8.57, 1.6, 1801, 's', 'Nam châm siêu dẫn, thép hợp kim', 'Superconducting magnets, alloy steel'],
  [42, 2623, 4639, 10.28, 2.16, 1781, 's', 'Thép chịu nhiệt, chất bôi trơn', 'Heat-resistant steel, lubricants'],
  [43, 2157, 4265, 11.0, 1.9, 1937, 's', 'Chất đánh dấu trong chẩn đoán hình ảnh y học', 'Tracer for medical imaging'],
  [44, 2334, 4150, 12.45, 2.2, 1844, 's', 'Chất xúc tác, linh kiện điện tử', 'Catalysts, electronic components'],
  [45, 1964, 3695, 12.41, 2.28, 1803, 's', 'Xúc tác lọc khí thải ô tô', 'Catalytic converters'],
  [46, 1554.9, 2963, 12.023, 2.2, 1802, 's', 'Chất xúc tác, trang sức, lọc khí hydro', 'Catalysts, jewellery, hydrogen filters'],
  [47, 961.78, 2162, 10.49, 1.93, 0, 's', 'Trang sức, gương, thiết bị điện', 'Jewellery, mirrors, electronics'],
  [48, 321.07, 767, 8.65, 1.69, 1817, 's', 'Pin Ni-Cd, bột màu; đang bị hạn chế vì độc', 'Ni-Cd batteries, pigments; restricted as toxic'],
  [49, 156.6, 2072, 7.31, 1.78, 1863, 's', 'Màn hình cảm ứng, hàn nhiệt độ thấp', 'Touchscreens, low-temperature solder'],
  [50, 231.93, 2602, 7.265, 1.96, 0, 's', 'Hàn thiếc, tráng vỏ hộp', 'Solder, tin plating'],
  [51, 630.63, 1587, 6.697, 2.05, 0, 's', 'Chất chống cháy, hợp kim chì', 'Flame retardants, lead alloys'],
  [52, 449.51, 988, 6.24, 2.1, 1782, 's', 'Pin mặt trời màng mỏng, hợp kim', 'Thin-film solar cells, alloys'],
  [53, 113.7, 184.3, 4.933, 2.66, 1811, 's', 'Sát trùng, muối iot, thuốc cản quang', 'Antiseptic, iodized salt, contrast media'],
  [54, -111.75, -108.12, 0.005887, 2.6, 1898, 'g', 'Đèn pha xenon, thuốc gây mê', 'Xenon lamps, anaesthesia'],
  [55, 28.44, 671, 1.93, 0.79, 1860, 's', 'Đồng hồ nguyên tử định nghĩa giây', 'Atomic clocks defining the second'],
  // Bari sôi ở 1897 °C, không phải 1845. Hai nguồn độc lập cùng cho 2170 K.
  [56, 727, 1897, 3.51, 0.89, 1808, 's', 'Thuốc cản quang X-quang, pháo hoa lục', 'X-ray contrast media, green fireworks'],
  [57, 920, 3464, 6.162, 1.1, 1839, 's', 'Thấu kính máy ảnh, pin NiMH', 'Camera lenses, NiMH batteries'],
  [58, 795, 3443, 6.77, 1.12, 1803, 's', 'Đá lửa bật lửa, chất xúc tác', 'Lighter flints, catalysts'],
  [59, 935, 3520, 6.77, 1.13, 1885, 's', 'Nam châm mạnh, kính bảo hộ thợ hàn', 'Strong magnets, welding goggles'],
  [60, 1024, 3074, 7.01, 1.14, 1885, 's', 'Nam châm neodymium cực mạnh, laser', 'Powerful neodymium magnets, lasers'],
  [61, 1042, 3000, 7.26, 1.13, 1945, 's', 'Sơn phát sáng, pin hạt nhân cỡ nhỏ', 'Luminous paint, small nuclear batteries'],
  [62, 1072, 1794, 7.52, 1.17, 1879, 's', 'Nam châm chịu nhiệt độ cao', 'Heat-resistant magnets'],
  [63, 822, 1529, 5.264, 1.2, 1901, 's', 'Bột huỳnh quang màu đỏ trên màn hình', 'Red phosphors in displays'],
  [64, 1313, 3273, 7.9, 1.2, 1880, 's', 'Thuốc cản quang chụp cộng hưởng từ MRI', 'MRI contrast agents'],
  [65, 1356, 3230, 8.23, 1.1, 1843, 's', 'Bột huỳnh quang xanh lục, cảm biến', 'Green phosphors, sensors'],
  [66, 1412, 2567, 8.54, 1.22, 1886, 's', 'Nam châm chịu nhiệt cho xe điện', 'Heat-resistant magnets for electric cars'],
  [67, 1474, 2700, 8.79, 1.23, 1878, 's', 'Nam châm từ trường mạnh nhất, laser y tế', 'Strongest magnetic fields, medical lasers'],
  [68, 1529, 2868, 9.066, 1.24, 1843, 's', 'Khuếch đại tín hiệu cáp quang', 'Fiber-optic signal amplifiers'],
  [69, 1545, 1950, 9.32, 1.25, 1879, 's', 'Máy X-quang xách tay, laser', 'Portable X-ray machines, lasers'],
  [70, 819, 1196, 6.9, 1.1, 1878, 's', 'Đồng hồ nguyên tử, laser sợi quang', 'Atomic clocks, fiber lasers'],
  [71, 1663, 3402, 9.841, 1.27, 1907, 's', 'Máy chụp PET, xúc tác lọc dầu', 'PET scanners, refinery catalysts'],
  [72, 2233, 4603, 13.31, 1.3, 1923, 's', 'Thanh điều khiển lò hạt nhân, vi mạch', 'Nuclear control rods, microchips'],
  [73, 3017, 5458, 16.69, 1.5, 1802, 's', 'Tụ điện điện thoại, dụng cụ cấy ghép', 'Phone capacitors, surgical implants'],
  [74, 3422, 5555, 19.25, 2.36, 1783, 's', 'Dây tóc bóng đèn, mũi khoan cứng', 'Lamp filaments, hard drill bits'],
  [75, 3186, 5596, 21.02, 1.9, 1925, 's', 'Động cơ phản lực, xúc tác lọc dầu', 'Jet engines, refinery catalysts'],
  [76, 3033, 5012, 22.59, 2.2, 1803, 's', 'Đầu bút máy, tiếp điểm chịu mài mòn', 'Pen nibs, wear-resistant contacts'],
  // Iridi nóng chảy ở 2446 °C, không phải 2466 — hai nguồn cùng cho 2719 K.
  [77, 2446, 4428, 22.56, 2.2, 1803, 's', 'Bugi đánh lửa, nồi nấu nhiệt độ cao', 'Spark plugs, high-temperature crucibles'],
  [78, 1768.3, 3825, 21.45, 2.28, 1735, 's', 'Chất xúc tác, trang sức, điện cực', 'Catalysts, jewellery, electrodes'],
  [79, 1064.18, 2856, 19.3, 2.54, 0, 's', 'Trang sức, tiếp điểm điện tử, dự trữ quốc gia', 'Jewellery, electronics, national reserves'],
  [80, -38.83, 356.73, 13.534, 2.0, 0, 'l', 'Nhiệt kế cũ, đèn huỳnh quang', 'Old thermometers, fluorescent lamps'],
  [81, 304, 1473, 11.85, 1.62, 1861, 's', 'Cảm biến hồng ngoại; rất độc', 'Infrared detectors; highly toxic'],
  [82, 327.46, 1749, 11.34, 2.33, 0, 's', 'Ắc quy ô tô, tấm chắn tia X', 'Car batteries, radiation shielding'],
  [83, 271.4, 1564, 9.78, 2.02, 1753, 's', 'Thuốc đau dạ dày, hợp kim nóng chảy thấp', 'Stomach medicine, low-melting alloys'],
  [84, 254, 962, 9.196, 2.0, 1898, 's', 'Nguồn nhiệt vệ tinh, khử tĩnh điện', 'Satellite heat sources, static eliminators'],
  [85, null, null, null, 2.2, 1940, 's', 'Nghiên cứu điều trị ung thư', 'Cancer therapy research'],
  [86, -71, -61.7, 0.00973, 2.2, 1900, 'g', 'Không có ứng dụng; khí phóng xạ gây ung thư phổi', 'No practical use; radioactive lung-cancer hazard'],
  [87, null, null, null, 0.7, 1939, 's', 'Chỉ dùng nghiên cứu khoa học', 'Scientific research only'],
  [88, 700, 1737, 5.5, 0.9, 1898, 's', 'Từng dùng sơn dạ quang, nay đã bỏ vì nguy hiểm', 'Formerly luminous paint, abandoned as hazardous'],
  [89, 1050, 3200, 10.07, 1.1, 1899, 's', 'Nguồn neutron, nghiên cứu điều trị ung thư', 'Neutron sources, cancer therapy research'],
  [90, 1750, 4788, 11.72, 1.3, 1829, 's', 'Nhiên liệu hạt nhân tiềm năng, đèn măng xông', 'Potential nuclear fuel, gas mantles'],
  [91, 1568, 4027, 15.37, 1.5, 1913, 's', 'Chỉ dùng nghiên cứu khoa học', 'Scientific research only'],
  [92, 1132.2, 4131, 19.1, 1.38, 1789, 's', 'Nhiên liệu nhà máy điện hạt nhân', 'Fuel for nuclear power plants'],
  [93, 644, 3902, 20.45, 1.36, 1940, 's', 'Cảm biến neutron, nghiên cứu', 'Neutron detectors, research'],
  [94, 639.4, 3228, 19.85, 1.28, 1940, 's', 'Nhiên liệu hạt nhân, nguồn điện tàu vũ trụ', 'Nuclear fuel, spacecraft power'],
  [95, 1176, 2011, 12.0, 1.13, 1944, 's', 'Đầu báo khói', 'Smoke detectors'],
  [96, 1345, 3110, 13.51, 1.28, 1944, 's', 'Nguồn điện và máy phân tích trên tàu vũ trụ', 'Spacecraft power and analysers'],
  [97, 986, null, 14.78, 1.3, 1949, 's', 'Chỉ dùng nghiên cứu khoa học', 'Scientific research only'],
  [98, 900, null, 15.1, 1.3, 1950, 's', 'Nguồn neutron dò khoáng sản và y học', 'Neutron source for prospecting and medicine'],
  [99, 860, null, 8.84, 1.3, 1952, 's', 'Chỉ dùng nghiên cứu khoa học', 'Scientific research only'],
  [100, null, null, null, null, 1952, 's', 'Chỉ dùng nghiên cứu khoa học', 'Scientific research only'],
  [101, null, null, null, null, 1955, 's', 'Chỉ dùng nghiên cứu khoa học', 'Scientific research only'],
  [102, null, null, null, null, 1966, 's', 'Chỉ dùng nghiên cứu khoa học', 'Scientific research only'],
  [103, null, null, null, null, 1961, 's', 'Chỉ dùng nghiên cứu khoa học', 'Scientific research only'],
  [104, null, null, null, null, 1964, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [105, null, null, null, null, 1968, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [106, null, null, null, null, 1974, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [107, null, null, null, null, 1981, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [108, null, null, null, null, 1984, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [109, null, null, null, null, 1982, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [110, null, null, null, null, 1994, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [111, null, null, null, null, 1994, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [112, null, null, null, null, 1996, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [113, null, null, null, null, 2003, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [114, null, null, null, null, 1998, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [115, null, null, null, null, 2003, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [116, null, null, null, null, 2000, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [117, null, null, null, null, 2010, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
  [118, null, null, null, null, 2002, '?', 'Chỉ tồn tại trong phòng thí nghiệm', 'Exists only in the laboratory'],
];

export const DETAILS: Record<number, ElementDetails> = Object.fromEntries(
  ROWS.map(([n, melt, boil, density, en, disc, state, use_vi, use_en]) => [
    n,
    { melt, boil, density, en, disc, state, use_vi, use_en },
  ]),
);

// ---- Giá trị CHƯA ĐO ĐƯỢC ----
//
// Nguyên tắc của app là chỉ ghi giá trị đo được. Nhưng có vài chỗ mọi bảng tra
// đều in một con số, mà con số ấy thật ra là NGOẠI SUY từ áp suất hơi chứ chưa
// ai đun chất đó lên tới nơi để đo — actini, protactini, neptuni đều phóng xạ
// mạnh và cực hiếm.
//
// Bỏ trống thì mất thông tin: bảng tuần hoàn nào cũng in số, app để dấu gạch
// ngang lại trông như thiếu dữ liệu. Nên GIỮ số nhưng NÓI RÕ nó là ước tính —
// vừa không giấu, vừa không mất.
//
// Nguồn xác định: bảng thông tin trên Wikipedia bản tiếng Anh, tra ngày
// 25/08/2026 — chỗ nào ghi "(extrapolated)", "(calculated)" hay dấu "(?)" thì
// tính là chưa đo được.
//
// HAI CHỖ CÒN NGỜ, CỐ Ý CHƯA ĐÁNH DẤU vì chưa đủ căn cứ:
//   - Americi sôi: app và PubChem cùng cho 2011 °C, còn Wikipedia cho
//     2880 K = 2607 °C và ghi "(calculated)". Hai nguồn lệch nhau ở CHÍNH CON
//     SỐ, chưa rõ số nào là số đo. Cần tra thêm rồi mới quyết.
//   - Radi nóng chảy: Wikipedia ghi "(disputed)" — đó là "đang tranh cãi",
//     khác với "chưa đo được", nên không gộp vào đây.
const UOC_TINH: ReadonlySet<string> = new Set([
  '89:boil', // actini — Wikipedia: 3500±300 K (extrapolated)
  '91:boil', // protactini — Wikipedia: 4300 K (?)
  '93:boil', // neptuni — Wikipedia: 4447 K (extrapolated)
]);

/** Giá trị này là ước tính chứ chưa ai đo được? */
export const laUocTinh = (n: number, truong: 'melt' | 'boil'): boolean =>
  UOC_TINH.has(`${n}:${truong}`);

/** Dùng cho phép kiểm: danh sách khóa đã đánh dấu. */
export const cacKhoaUocTinh = (): string[] => [...UOC_TINH];

export const PHASE_META: Record<Phase, { vi: string; en: string; icon: string }> = {
  s: { vi: 'Rắn', en: 'Solid', icon: '🧱' },
  l: { vi: 'Lỏng', en: 'Liquid', icon: '💧' },
  g: { vi: 'Khí', en: 'Gas', icon: '💨' },
  '?': { vi: 'Chưa xác định', en: 'Unknown', icon: '❓' },
};

/** Hiển thị khối lượng riêng: chất khí đổi sang g/L cho dễ hình dung. */
export function formatDensity(d: number | null, state: Phase): string | null {
  if (d === null) return null;
  if (state === 'g') return `${(d * 1000).toFixed(4).replace(/0+$/, '').replace(/\.$/, '')} g/L`;
  return `${d} g/cm³`;
}
