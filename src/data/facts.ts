// Bách khoa sự thật hóa học. Nội dung thật; thêm mục bằng cách thêm một dòng.

export interface Fact {
  vi: string;
  en: string;
  tag: string; // chủ đề ngắn để lọc
}

export const FACTS: Fact[] = [
  { tag: 'Nguyên tố', vi: 'Hydro là nguyên tố nhẹ nhất và phổ biến nhất trong vũ trụ, chiếm khoảng 75% khối lượng vật chất thường.', en: 'Hydrogen is the lightest and most abundant element in the universe.' },
  { tag: 'Nguyên tố', vi: 'Heli được phát hiện trên Mặt Trời (qua quang phổ) trước khi tìm thấy trên Trái Đất — tên lấy từ "Helios".', en: 'Helium was found on the Sun before it was found on Earth.' },
  { tag: 'Nguyên tố', vi: 'Vàng (Au) rất trơ về mặt hóa học nên hầu như không bị ăn mòn, giữ được ánh kim qua hàng nghìn năm.', en: 'Gold is so chemically inert it barely corrodes over millennia.' },
  { tag: 'Nguyên tố', vi: 'Thủy ngân là kim loại duy nhất ở thể lỏng tại nhiệt độ phòng.', en: 'Mercury is the only metal that is liquid at room temperature.' },
  { tag: 'Nguyên tố', vi: 'Cacbon có thể tồn tại ở nhiều dạng thù hình rất khác nhau: kim cương cứng nhất và than chì mềm.', en: 'Carbon exists as both the hardest (diamond) and a very soft (graphite) form.' },
  { tag: 'Nguyên tố', vi: 'Franxi là nguyên tố tự nhiên hiếm nhất; ước tính cả vỏ Trái Đất chỉ có vài chục gram tại một thời điểm.', en: 'Francium is the rarest natural element — only tens of grams exist on Earth at once.' },
  { tag: 'Nguyên tố', vi: 'Oxy chiếm khoảng 21% thể tích không khí và gần một nửa khối lượng vỏ Trái Đất.', en: 'Oxygen is ~21% of air and nearly half the mass of Earth’s crust.' },
  { tag: 'Nguyên tố', vi: 'Neon phát ra ánh sáng đỏ cam đặc trưng khi có dòng điện đi qua — nền tảng của đèn neon.', en: 'Neon glows orange-red under electric current — the basis of neon signs.' },
  { tag: 'Nguyên tố', vi: 'Liti là kim loại nhẹ nhất, nhẹ đến mức nổi được trên nước (nhưng phản ứng với nước).', en: 'Lithium is the lightest metal — light enough to float on water.' },
  { tag: 'Nguyên tố', vi: 'Wolfram (W) có nhiệt độ nóng chảy cao nhất trong các kim loại: khoảng 3.422°C.', en: 'Tungsten has the highest melting point of all metals (~3,422°C).' },

  { tag: 'Lịch sử', vi: 'Bảng tuần hoàn do Dmitri Mendeleev công bố năm 1869; ông để trống ô cho những nguyên tố chưa tìm ra và dự đoán đúng tính chất của chúng.', en: 'Mendeleev published the periodic table in 1869 and predicted undiscovered elements.' },
  { tag: 'Lịch sử', vi: 'Marie Curie là người duy nhất đoạt giải Nobel ở hai lĩnh vực khoa học khác nhau: Vật lý (1903) và Hóa học (1911).', en: 'Marie Curie won Nobel Prizes in two different sciences: Physics and Chemistry.' },
  { tag: 'Lịch sử', vi: 'Nhà giả kim thời xưa tìm cách biến chì thành vàng — điều bất khả bằng phản ứng hóa học, nhưng chính họ đã đặt nền cho hóa học.', en: 'Alchemists tried to turn lead into gold, unknowingly founding chemistry.' },
  { tag: 'Lịch sử', vi: 'Antoine Lavoisier được coi là "cha đẻ của hóa học hiện đại" nhờ định luật bảo toàn khối lượng.', en: 'Lavoisier, "father of modern chemistry", framed conservation of mass.' },

  { tag: 'Đời sống', vi: 'Kim cương và ruột bút chì (than chì) đều làm hoàn toàn từ cacbon, chỉ khác cách sắp xếp nguyên tử.', en: 'Diamond and pencil lead are both pure carbon, differing only in atomic arrangement.' },
  { tag: 'Đời sống', vi: 'Nước là một trong số ít chất mà thể rắn (nước đá) nhẹ hơn thể lỏng, nên đá nổi trên nước.', en: 'Ice is less dense than liquid water, so it floats.' },
  { tag: 'Đời sống', vi: 'Inox (thép không gỉ) chống gỉ nhờ lớp crom oxit siêu mỏng tự tạo trên bề mặt.', en: 'Stainless steel resists rust thanks to a thin self-forming chromium-oxide layer.' },
  { tag: 'Đời sống', vi: 'Muối ăn (NaCl) tạo từ natri — kim loại phản ứng dữ dội với nước — và clo — khí độc. Kết hợp lại thành thứ ta ăn hằng ngày.', en: 'Table salt is made from reactive sodium and toxic chlorine, yet is edible.' },
  { tag: 'Đời sống', vi: 'Bọt khí trong nước ngọt là CO₂ hòa tan dưới áp suất; mở nắp làm áp suất giảm, khí thoát ra.', en: 'Soda fizz is CO₂ dissolved under pressure that escapes when opened.' },
  { tag: 'Đời sống', vi: 'Xà phòng làm sạch nhờ một đầu phân tử "ưa nước" và một đầu "ưa dầu", kéo dầu mỡ vào nước.', en: 'Soap cleans because one end loves water and the other loves oil.' },
  { tag: 'Đời sống', vi: 'Vị chua của giấm, chanh là do axit; vị đắng và cảm giác nhờn của xà phòng là do bazơ.', en: 'Sourness comes from acids; bitterness and slipperiness from bases.' },
  { tag: 'Đời sống', vi: 'Pháo hoa có màu nhờ muối kim loại: đồng cho xanh lam, stronti cho đỏ, natri cho vàng.', en: 'Firework colors come from metal salts: copper=blue, strontium=red, sodium=yellow.' },

  { tag: 'Cơ thể', vi: 'Cơ thể người chứa đủ cacbon để làm khoảng 9.000 chiếc bút chì (theo ước tính phổ biến).', en: 'A human body holds enough carbon for roughly 9,000 pencils.' },
  { tag: 'Cơ thể', vi: 'Khoảng 60-70% khối lượng cơ thể người trưởng thành là nước.', en: 'About 60–70% of an adult body is water.' },
  { tag: 'Cơ thể', vi: 'Dịch vị dạ dày chứa axit clohydric (HCl) đủ mạnh để hòa tan kim loại, nhưng lớp nhầy bảo vệ thành dạ dày.', en: 'Stomach acid (HCl) is strong enough to dissolve metal; mucus protects the lining.' },
  { tag: 'Cơ thể', vi: 'DNA của bạn thực chất là một phân tử hóa học khổng lồ — một polime mang mã di truyền.', en: 'Your DNA is a giant chemical molecule — a polymer carrying genetic code.' },

  { tag: 'Bất ngờ', vi: 'Thủy tinh không phải chất rắn kết tinh mà là chất lỏng "siêu nguội" (vô định hình).', en: 'Glass is an amorphous solid — a "supercooled liquid".' },
  { tag: 'Bất ngờ', vi: 'Nếu tách hết khoảng trống trong nguyên tử, toàn bộ nhân loại có thể nén lại bằng cỡ một viên đường.', en: 'Remove atomic empty space and all humanity fits in a sugar cube.' },
  { tag: 'Bất ngờ', vi: 'Nước tinh khiết gần như không dẫn điện; chính các ion khoáng tan trong nước mới dẫn điện.', en: 'Pure water barely conducts electricity — dissolved ions do.' },
  { tag: 'Bất ngờ', vi: 'Kim loại xesi và rubidi phản ứng với nước mạnh đến mức có thể gây nổ.', en: 'Caesium and rubidium react with water violently enough to explode.' },
  { tag: 'Bất ngờ', vi: 'Heli lỏng có thể "bò" ngược lên thành bình do hiện tượng siêu lỏng ở nhiệt độ cực thấp.', en: 'Liquid helium can climb container walls due to superfluidity.' },
  { tag: 'Bất ngờ', vi: 'Có nhiều phân tử nước trong một cốc nước hơn số cốc nước có thể múc từ tất cả đại dương.', en: 'A glass of water holds more molecules than there are glassfuls in all oceans.' },
  { tag: 'Bất ngờ', vi: 'Vàng có thể được dát mỏng đến mức ánh sáng xuyên qua có màu xanh lục.', en: 'Gold can be beaten so thin that light passes through it looking green.' },
  { tag: 'Bất ngờ', vi: 'Kim cương cháy được: nung đủ nóng trong oxy, nó biến thành CO₂ như than.', en: 'Diamonds burn: heated in oxygen they turn into CO₂.' },

  { tag: 'Môi trường', vi: 'Tầng ozon (O₃) ở bình lưu hấp thụ phần lớn tia cực tím có hại từ Mặt Trời.', en: 'The stratospheric ozone layer absorbs most harmful solar UV.' },
  { tag: 'Môi trường', vi: 'Mưa axit hình thành khi SO₂ và NO₂ từ khí thải kết hợp với hơi nước tạo axit.', en: 'Acid rain forms when SO₂ and NO₂ combine with water vapor.' },
  { tag: 'Môi trường', vi: 'Cây xanh quang hợp: dùng CO₂ và nước, nhờ ánh sáng, tạo ra glucozơ và nhả oxy.', en: 'Photosynthesis turns CO₂ and water into glucose, releasing oxygen.' },
  { tag: 'Môi trường', vi: 'Khoảng 70% oxy trong khí quyển do sinh vật phù du trong đại dương tạo ra, không phải rừng.', en: 'Ocean plankton produce ~70% of atmospheric oxygen, not forests.' },
];
