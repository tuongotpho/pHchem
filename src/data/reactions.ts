// Cơ sở dữ liệu phản ứng hóa học phổ thông.
//
// `eq` viết ĐÃ CÂN BẰNG. Test tự đếm số nguyên tử hai vế để kiểm — gõ nhầm hệ số
// là báo lỗi ngay, không cần dò tay.

export type ReactionType =
  | 'combination' // hóa hợp
  | 'decomposition' // phân hủy
  | 'substitution' // thế
  | 'exchange' // trao đổi
  | 'neutralization' // trung hòa
  | 'precipitation' // tạo kết tủa
  | 'gas' // tạo chất khí
  | 'redox' // oxi hóa - khử
  | 'combustion' // đốt cháy
  | 'addition' // cộng
  | 'esterification' // este hóa
  | 'saponification' // xà phòng hóa
  | 'polymerization' // trùng hợp
  | 'hydrolysis' // thủy phân
  | 'electrolysis'; // điện phân

export const TYPE_META: Record<ReactionType, { vi: string; en: string }> = {
  combination: { vi: 'Hóa hợp', en: 'Combination' },
  decomposition: { vi: 'Phân hủy', en: 'Decomposition' },
  substitution: { vi: 'Thế', en: 'Substitution' },
  exchange: { vi: 'Trao đổi', en: 'Metathesis' },
  neutralization: { vi: 'Trung hòa', en: 'Neutralization' },
  precipitation: { vi: 'Tạo kết tủa', en: 'Precipitation' },
  gas: { vi: 'Tạo chất khí', en: 'Gas forming' },
  redox: { vi: 'Oxi hóa - khử', en: 'Redox' },
  combustion: { vi: 'Đốt cháy', en: 'Combustion' },
  addition: { vi: 'Cộng', en: 'Addition' },
  esterification: { vi: 'Este hóa', en: 'Esterification' },
  saponification: { vi: 'Xà phòng hóa', en: 'Saponification' },
  polymerization: { vi: 'Trùng hợp', en: 'Polymerization' },
  hydrolysis: { vi: 'Thủy phân', en: 'Hydrolysis' },
  electrolysis: { vi: 'Điện phân', en: 'Electrolysis' },
};

export interface Reaction {
  eq: string;
  type: ReactionType[];
  cond_vi?: string;
  cond_en?: string;
  phen_vi?: string;
  phen_en?: string;
  /** Phương trình ion rút gọn (chỉ với phản ứng trong dung dịch). */
  ionic?: string;
  note_vi?: string;
  note_en?: string;
  /** Phương trình tượng trưng có hệ số n của polime — không kiểm cân bằng tự động. */
  symbolic?: true;
}

export const REACTIONS: Reaction[] = [
  // ===== Kim loại + nước =====
  { eq: '2 Na + 2 H2O → 2 NaOH + H2', type: ['redox', 'substitution', 'gas'], cond_vi: 'Nhiệt độ thường', cond_en: 'Room temperature', phen_vi: 'Natri nóng chảy thành giọt tròn chạy trên mặt nước, có khí thoát ra', phen_en: 'Sodium melts into a ball darting on the water, gas evolves', ionic: '2 Na + 2 H2O → 2 Na⁺ + 2 OH⁻ + H2' },
  { eq: '2 K + 2 H2O → 2 KOH + H2', type: ['redox', 'substitution', 'gas'], cond_vi: 'Nhiệt độ thường', cond_en: 'Room temperature', phen_vi: 'Mãnh liệt hơn natri, khí hydro tự bốc cháy cho ngọn lửa tím', phen_en: 'More violent than sodium; hydrogen ignites with a lilac flame' },
  { eq: 'Ca + 2 H2O → Ca(OH)2 + H2', type: ['redox', 'substitution', 'gas'], cond_vi: 'Nhiệt độ thường', cond_en: 'Room temperature', phen_vi: 'Sủi bọt khí, dung dịch hóa đục do Ca(OH)2 ít tan', phen_en: 'Bubbles form; solution turns cloudy as Ca(OH)2 is sparingly soluble' },
  { eq: 'Ba + 2 H2O → Ba(OH)2 + H2', type: ['redox', 'substitution', 'gas'], phen_vi: 'Bari tan nhanh, sủi bọt khí mạnh, dung dịch trong', phen_en: 'Barium dissolves fast with vigorous bubbling; the solution stays clear', cond_vi: 'Nhiệt độ thường', cond_en: 'Room temperature' },

  // ===== Kim loại + axit =====
  { eq: 'Zn + 2 HCl → ZnCl2 + H2', type: ['redox', 'substitution', 'gas'], phen_vi: 'Kẽm tan dần, sủi bọt khí không màu', phen_en: 'Zinc dissolves with colorless bubbles', ionic: 'Zn + 2 H⁺ → Zn²⁺ + H2' },
  { eq: 'Fe + 2 HCl → FeCl2 + H2', type: ['redox', 'substitution', 'gas'], phen_vi: 'Sắt tan, khí thoát ra, dung dịch màu lục nhạt', phen_en: 'Iron dissolves, gas evolves, pale green solution', ionic: 'Fe + 2 H⁺ → Fe²⁺ + H2', note_vi: 'Chỉ tạo muối sắt(II), không tạo sắt(III)', note_en: 'Gives iron(II) only, never iron(III)' },
  { eq: '2 Al + 6 HCl → 2 AlCl3 + 3 H2', type: ['redox', 'substitution', 'gas'], phen_vi: 'Nhôm tan dần, sủi bọt khí không màu', phen_en: 'Aluminium dissolves with colourless bubbles', ionic: '2 Al + 6 H⁺ → 2 Al³⁺ + 3 H2' },
  { eq: 'Mg + H2SO4 → MgSO4 + H2', type: ['redox', 'substitution', 'gas'], phen_vi: 'Magie tan nhanh, sủi bọt khí mạnh', phen_en: 'Magnesium dissolves quickly with brisk bubbling', cond_vi: 'Axit loãng', cond_en: 'Dilute acid', ionic: 'Mg + 2 H⁺ → Mg²⁺ + H2' },
  { eq: 'Fe + H2SO4 → FeSO4 + H2', type: ['redox', 'substitution', 'gas'], phen_vi: 'Sắt tan, khí thoát ra, dung dịch màu lục nhạt', phen_en: 'Iron dissolves, gas evolves, pale green solution', cond_vi: 'Axit loãng', cond_en: 'Dilute acid' },
  { eq: 'Cu + 2 H2SO4 → CuSO4 + SO2 + 2 H2O', type: ['redox', 'gas'], cond_vi: 'H2SO4 đặc, đun nóng', cond_en: 'Hot concentrated H2SO4', phen_vi: 'Đồng tan, dung dịch hóa xanh, khí mùi hắc thoát ra', phen_en: 'Copper dissolves, blue solution, pungent gas', note_vi: 'Đồng không phản ứng với H2SO4 loãng', note_en: 'Copper does not react with dilute H2SO4' },
  { eq: '2 Fe + 6 H2SO4 → Fe2(SO4)3 + 3 SO2 + 6 H2O', type: ['redox', 'gas'], phen_vi: 'Sắt tan, khí mùi hắc thoát ra, dung dịch vàng nâu', phen_en: 'Iron dissolves with a pungent gas; the solution turns yellow-brown', cond_vi: 'H2SO4 đặc, đun nóng', cond_en: 'Hot concentrated H2SO4', note_vi: 'Axit đặc nguội làm sắt và nhôm bị thụ động, không phản ứng', note_en: 'Cold concentrated acid passivates iron and aluminium' },
  { eq: '3 Cu + 8 HNO3 → 3 Cu(NO3)2 + 2 NO + 4 H2O', type: ['redox', 'gas'], cond_vi: 'HNO3 loãng', cond_en: 'Dilute HNO3', phen_vi: 'Khí không màu NO thoát ra, gặp không khí hóa nâu', phen_en: 'Colorless NO evolves and browns in air' },
  { eq: 'Cu + 4 HNO3 → Cu(NO3)2 + 2 NO2 + 2 H2O', type: ['redox', 'gas'], cond_vi: 'HNO3 đặc', cond_en: 'Concentrated HNO3', phen_vi: 'Khí nâu đỏ NO2 thoát ra mạnh, dung dịch xanh lam', phen_en: 'Brown NO2 evolves vigorously, blue solution' },

  // ===== Kim loại + muối =====
  { eq: 'Fe + CuSO4 → FeSO4 + Cu', type: ['redox', 'substitution'], phen_vi: 'Đinh sắt phủ lớp đồng đỏ, màu xanh của dung dịch nhạt dần', phen_en: 'Iron nail coated with red copper; blue color fades', ionic: 'Fe + Cu²⁺ → Fe²⁺ + Cu' },
  { eq: 'Cu + 2 AgNO3 → Cu(NO3)2 + 2 Ag', type: ['redox', 'substitution'], phen_vi: 'Bạc bám trắng sáng trên đồng, dung dịch hóa xanh', phen_en: 'Silver deposits on copper; solution turns blue', ionic: 'Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag' },
  { eq: 'Zn + CuCl2 → ZnCl2 + Cu', type: ['redox', 'substitution'], ionic: 'Zn + Cu²⁺ → Zn²⁺ + Cu' },

  // ===== Kim loại + phi kim =====
  { eq: '2 Na + Cl2 → 2 NaCl', type: ['combination', 'redox'], phen_vi: 'Natri cháy sáng trong khí clo, tạo khói trắng', phen_en: 'Sodium burns brightly in chlorine with white smoke' },
  { eq: '3 Fe + 2 O2 → Fe3O4', type: ['combination', 'redox'], cond_vi: 'Đốt nóng', cond_en: 'Heated', phen_vi: 'Sắt cháy sáng chói, bắn tia lửa, tạo chất rắn nâu đen', phen_en: 'Iron burns with bright sparks giving a dark solid' },
  { eq: '4 Al + 3 O2 → 2 Al2O3', type: ['combination', 'redox'], cond_vi: 'Đốt nóng', cond_en: 'Heated' },
  { eq: '2 Mg + O2 → 2 MgO', type: ['combination', 'redox'], cond_vi: 'Đốt nóng', cond_en: 'Heated', phen_vi: 'Cháy với ngọn lửa trắng chói mắt', phen_en: 'Burns with a blinding white flame' },
  { eq: '2 Cu + O2 → 2 CuO', type: ['combination', 'redox'], cond_vi: 'Đốt nóng', cond_en: 'Heated', phen_vi: 'Đồng đỏ chuyển thành chất rắn đen', phen_en: 'Red copper turns to a black solid' },
  { eq: 'Fe + S → FeS', type: ['combination', 'redox'], cond_vi: 'Đun nóng', cond_en: 'Heated', phen_vi: 'Hỗn hợp cháy đỏ rực rồi tạo chất rắn đen', phen_en: 'Mixture glows red then forms a black solid' },
  { eq: '2 Fe + 3 Cl2 → 2 FeCl3', type: ['combination', 'redox'], cond_vi: 'Đốt nóng', cond_en: 'Heated', note_vi: 'Clo là chất oxi hóa mạnh nên đưa sắt lên hóa trị III', note_en: 'Chlorine is strong enough to oxidize iron to +3' },
  { eq: 'Cu + Cl2 → CuCl2', type: ['combination', 'redox'], cond_vi: 'Đốt nóng', cond_en: 'Heated' },

  // ===== Oxit + nước =====
  { eq: 'Na2O + H2O → 2 NaOH', type: ['combination'], note_vi: 'Oxit bazơ tan tạo dung dịch kiềm', note_en: 'Soluble basic oxide gives an alkali' },
  { eq: 'CaO + H2O → Ca(OH)2', type: ['combination'], phen_vi: 'Tỏa nhiệt rất mạnh, vôi sống rã ra thành bột nhão', phen_en: 'Strongly exothermic; quicklime crumbles to a paste', note_vi: 'Gọi là phản ứng tôi vôi', note_en: 'Known as slaking lime' },
  { eq: 'SO3 + H2O → H2SO4', type: ['combination'], note_vi: 'Bước cuối trong sản xuất axit sunfuric', note_en: 'Final step of sulfuric acid manufacture' },
  { eq: 'SO2 + H2O → H2SO3', type: ['combination'], note_vi: 'Là một nguyên nhân gây mưa axit', note_en: 'A cause of acid rain' },
  { eq: 'CO2 + H2O → H2CO3', type: ['combination'], note_vi: 'Axit tạo thành rất yếu và kém bền', note_en: 'The acid formed is weak and unstable' },
  { eq: 'N2O5 + H2O → 2 HNO3', type: ['combination'] },
  { eq: 'P2O5 + 3 H2O → 2 H3PO4', type: ['combination'] },

  // ===== Oxit + axit / oxit + bazơ =====
  { eq: 'CuO + 2 HCl → CuCl2 + H2O', type: ['exchange'], ionic: 'CuO + 2 H⁺ → Cu²⁺ + H2O', phen_vi: 'Chất rắn đen tan, dung dịch hóa xanh lục', phen_en: 'Black solid dissolves giving a green solution' },
  { eq: 'Fe2O3 + 6 HCl → 2 FeCl3 + 3 H2O', type: ['exchange'], ionic: 'Fe2O3 + 6 H⁺ → 2 Fe³⁺ + 3 H2O', phen_vi: 'Gỉ sắt tan, dung dịch hóa vàng nâu', phen_en: 'Rust dissolves giving a yellow-brown solution' },
  { eq: 'CaO + 2 HCl → CaCl2 + H2O', type: ['exchange'], ionic: 'CaO + 2 H⁺ → Ca²⁺ + H2O' },
  { eq: 'Al2O3 + 6 HCl → 2 AlCl3 + 3 H2O', type: ['exchange'], ionic: 'Al2O3 + 6 H⁺ → 2 Al³⁺ + 3 H2O' },
  { eq: 'Al2O3 + 2 NaOH → 2 NaAlO2 + H2O', type: ['exchange'], ionic: 'Al2O3 + 2 OH⁻ → 2 AlO2⁻ + H2O', note_vi: 'Chứng tỏ Al2O3 là oxit lưỡng tính', note_en: 'Shows Al2O3 is amphoteric' },
  { eq: 'CO2 + 2 NaOH → Na2CO3 + H2O', type: ['exchange'], ionic: 'CO2 + 2 OH⁻ → CO3²⁻ + H2O', note_vi: 'Nếu CO2 dư sẽ tạo muối axit NaHCO3', note_en: 'Excess CO2 gives the acid salt NaHCO3' },
  { eq: 'CO2 + Ca(OH)2 → CaCO3 + H2O', type: ['exchange', 'precipitation'], ionic: 'CO2 + Ca²⁺ + 2 OH⁻ → CaCO3 + H2O', phen_vi: 'Nước vôi trong hóa đục', phen_en: 'Limewater turns cloudy', note_vi: 'Cách nhận biết khí CO2', note_en: 'The standard test for CO2' },
  { eq: 'SO2 + 2 NaOH → Na2SO3 + H2O', type: ['exchange'], ionic: 'SO2 + 2 OH⁻ → SO3²⁻ + H2O' },

  // ===== Trung hòa =====
  { eq: 'HCl + NaOH → NaCl + H2O', type: ['neutralization', 'exchange'], phen_vi: 'Không có dấu hiệu bên ngoài, phải dùng chất chỉ thị', phen_en: 'No visible change; needs an indicator', ionic: 'H⁺ + OH⁻ → H2O' },
  { eq: 'H2SO4 + 2 NaOH → Na2SO4 + 2 H2O', type: ['neutralization', 'exchange'], ionic: 'H⁺ + OH⁻ → H2O' },
  { eq: 'H2SO4 + 2 KOH → K2SO4 + 2 H2O', type: ['neutralization', 'exchange'], ionic: 'H⁺ + OH⁻ → H2O' },
  { eq: '2 HCl + Ca(OH)2 → CaCl2 + 2 H2O', type: ['neutralization', 'exchange'], ionic: 'H⁺ + OH⁻ → H2O' },
  { eq: '3 HCl + Al(OH)3 → AlCl3 + 3 H2O', type: ['neutralization', 'exchange'], ionic: 'Al(OH)3 + 3 H⁺ → Al³⁺ + 3 H2O', note_vi: 'Al(OH)3 không tan nên giữ nguyên dạng phân tử trong phương trình ion', note_en: 'Al(OH)3 is insoluble so stays undissociated' },
  { eq: 'H3PO4 + 3 NaOH → Na3PO4 + 3 H2O', type: ['neutralization', 'exchange'], ionic: 'H3PO4 + 3 OH⁻ → PO4³⁻ + 3 H2O' },
  { eq: 'NH3 + HCl → NH4Cl', type: ['combination'], phen_vi: 'Tạo khói trắng dày đặc', phen_en: 'Dense white smoke forms' },
  { eq: '2 NH3 + H2SO4 → (NH4)2SO4', type: ['combination'], note_vi: 'Phản ứng sản xuất phân đạm một lá', note_en: 'Used to make ammonium sulfate fertilizer' },

  // ===== Muối + axit =====
  { eq: 'CaCO3 + 2 HCl → CaCl2 + H2O + CO2', type: ['exchange', 'gas'], phen_vi: 'Đá vôi tan, sủi bọt khí mạnh', phen_en: 'Limestone dissolves with vigorous fizzing', ionic: 'CaCO3 + 2 H⁺ → Ca²⁺ + H2O + CO2' },
  { eq: 'Na2CO3 + 2 HCl → 2 NaCl + H2O + CO2', type: ['exchange', 'gas'], phen_vi: 'Sủi bọt khí mạnh ngay lập tức', phen_en: 'Immediate vigorous fizzing', ionic: 'CO3²⁻ + 2 H⁺ → H2O + CO2' },
  { eq: 'NaHCO3 + HCl → NaCl + H2O + CO2', type: ['exchange', 'gas'], phen_vi: 'Sủi bọt khí mạnh; đây là cách thuốc muối làm dịu dạ dày', phen_en: 'Vigorous fizzing; how baking soda soothes an upset stomach', ionic: 'HCO3⁻ + H⁺ → H2O + CO2', note_vi: 'Cơ chế thuốc muối trung hòa axit dạ dày', note_en: 'How baking soda neutralizes stomach acid' },
  { eq: 'Na2SO3 + 2 HCl → 2 NaCl + H2O + SO2', type: ['exchange', 'gas'], ionic: 'SO3²⁻ + 2 H⁺ → H2O + SO2', phen_vi: 'Khí mùi hắc thoát ra', phen_en: 'Pungent gas evolves' },
  { eq: 'FeS + 2 HCl → FeCl2 + H2S', type: ['exchange', 'gas'], ionic: 'FeS + 2 H⁺ → Fe²⁺ + H2S', phen_vi: 'Khí mùi trứng thối thoát ra', phen_en: 'Rotten-egg smelling gas evolves' },
  { eq: 'BaCl2 + H2SO4 → BaSO4 + 2 HCl', type: ['exchange', 'precipitation'], phen_vi: 'Kết tủa trắng không tan trong axit', phen_en: 'White precipitate insoluble in acid', ionic: 'Ba²⁺ + SO4²⁻ → BaSO4', note_vi: 'Cách nhận biết ion sunfat', note_en: 'Standard test for sulfate ions' },

  // ===== Muối + bazơ =====
  { eq: 'CuSO4 + 2 NaOH → Cu(OH)2 + Na2SO4', type: ['exchange', 'precipitation'], phen_vi: 'Kết tủa xanh lam', phen_en: 'Blue precipitate', ionic: 'Cu²⁺ + 2 OH⁻ → Cu(OH)2' },
  { eq: 'FeCl3 + 3 NaOH → Fe(OH)3 + 3 NaCl', type: ['exchange', 'precipitation'], phen_vi: 'Kết tủa nâu đỏ', phen_en: 'Red-brown precipitate', ionic: 'Fe³⁺ + 3 OH⁻ → Fe(OH)3' },
  { eq: 'FeCl2 + 2 NaOH → Fe(OH)2 + 2 NaCl', type: ['exchange', 'precipitation'], phen_vi: 'Kết tủa trắng xanh, để ngoài không khí hóa nâu', phen_en: 'Pale green precipitate that browns in air', ionic: 'Fe²⁺ + 2 OH⁻ → Fe(OH)2' },
  { eq: 'MgCl2 + 2 NaOH → Mg(OH)2 + 2 NaCl', type: ['exchange', 'precipitation'], phen_vi: 'Kết tủa trắng', phen_en: 'White precipitate', ionic: 'Mg²⁺ + 2 OH⁻ → Mg(OH)2' },
  { eq: 'AlCl3 + 3 NaOH → Al(OH)3 + 3 NaCl', type: ['exchange', 'precipitation'], phen_vi: 'Kết tủa keo trắng, tan nếu thêm dư NaOH', phen_en: 'White gelatinous precipitate, dissolves in excess NaOH', ionic: 'Al³⁺ + 3 OH⁻ → Al(OH)3' },
  { eq: 'NH4Cl + NaOH → NaCl + NH3 + H2O', type: ['exchange', 'gas'], cond_vi: 'Đun nóng', cond_en: 'Heated', phen_vi: 'Khí mùi khai làm quỳ tím ẩm hóa xanh', phen_en: 'Pungent gas turns damp litmus blue', ionic: 'NH4⁺ + OH⁻ → NH3 + H2O' },

  // ===== Muối + muối =====
  { eq: 'AgNO3 + NaCl → AgCl + NaNO3', type: ['exchange', 'precipitation'], phen_vi: 'Kết tủa trắng, hóa đen ngoài ánh sáng', phen_en: 'White precipitate that darkens in light', ionic: 'Ag⁺ + Cl⁻ → AgCl', note_vi: 'Cách nhận biết ion clorua', note_en: 'Standard test for chloride ions' },
  { eq: 'BaCl2 + Na2SO4 → BaSO4 + 2 NaCl', type: ['exchange', 'precipitation'], phen_vi: 'Kết tủa trắng', phen_en: 'White precipitate', ionic: 'Ba²⁺ + SO4²⁻ → BaSO4' },
  { eq: 'Na2CO3 + CaCl2 → CaCO3 + 2 NaCl', type: ['exchange', 'precipitation'], phen_vi: 'Kết tủa trắng', phen_en: 'White precipitate', ionic: 'Ca²⁺ + CO3²⁻ → CaCO3' },
  { eq: 'Pb(NO3)2 + 2 KI → PbI2 + 2 KNO3', type: ['exchange', 'precipitation'], phen_vi: 'Kết tủa vàng óng ánh', phen_en: 'Golden precipitate', ionic: 'Pb²⁺ + 2 I⁻ → PbI2', note_vi: 'Thí nghiệm biểu diễn quen gọi là mưa vàng', note_en: 'The classic "golden rain" demonstration' },

  // ===== Nhiệt phân =====
  { eq: 'CaCO3 → CaO + CO2', type: ['decomposition', 'gas'], phen_vi: 'Đá vôi rắn chuyển thành vôi sống xốp, nhẹ hơn hẳn', phen_en: 'Hard limestone turns into porous quicklime, much lighter', cond_vi: 'Nung khoảng 900°C', cond_en: 'Calcined around 900°C', note_vi: 'Phản ứng nung vôi', note_en: 'Lime kiln reaction' },
  { eq: '2 NaHCO3 → Na2CO3 + H2O + CO2', type: ['decomposition', 'gas'], phen_vi: 'Bột nở phồng lên, sinh khí làm bánh nở', phen_en: 'The powder puffs up; the gas makes cakes rise', cond_vi: 'Đun nóng', cond_en: 'Heated', note_vi: 'Là lý do bột nở làm bánh phồng lên', note_en: 'Why baking soda makes cakes rise' },
  { eq: '2 KClO3 → 2 KCl + 3 O2', type: ['decomposition', 'redox', 'gas'], phen_vi: 'Chất rắn nóng chảy rồi sủi khí; que đóm tàn đỏ bùng cháy', phen_en: 'The solid melts then bubbles; a glowing splint bursts into flame', cond_vi: 'Đun nóng, xúc tác MnO2', cond_en: 'Heated with MnO2 catalyst', note_vi: 'Cách điều chế oxy trong phòng thí nghiệm', note_en: 'Lab preparation of oxygen' },
  { eq: '2 KMnO4 → K2MnO4 + MnO2 + O2', type: ['decomposition', 'redox', 'gas'], phen_vi: 'Tinh thể tím chuyển sang lục rồi đen, khí thoát ra làm bùng que đóm', phen_en: 'Purple crystals turn green then black; the gas relights a glowing splint', cond_vi: 'Đun nóng', cond_en: 'Heated' },
  { eq: 'Cu(OH)2 → CuO + H2O', type: ['decomposition'], cond_vi: 'Đun nóng', cond_en: 'Heated', phen_vi: 'Kết tủa xanh lam chuyển thành chất rắn đen', phen_en: 'Blue precipitate turns into a black solid' },
  { eq: '2 Fe(OH)3 → Fe2O3 + 3 H2O', type: ['decomposition'], cond_vi: 'Nung', cond_en: 'Calcined' },
  { eq: '2 HgO → 2 Hg + O2', type: ['decomposition', 'redox', 'gas'], phen_vi: 'Bột đỏ chuyển thành giọt thủy ngân óng ánh, có khí thoát ra', phen_en: 'Red powder turns into shiny mercury droplets as gas escapes', cond_vi: 'Đun nóng', cond_en: 'Heated', note_vi: 'Thí nghiệm lịch sử tìm ra oxy của Priestley', note_en: 'Priestley historic discovery of oxygen' },
  { eq: 'NH4Cl → NH3 + HCl', type: ['decomposition'], cond_vi: 'Đun nóng', cond_en: 'Heated', note_vi: 'Hai khí gặp lại chỗ nguội sẽ kết hợp thành khói trắng', note_en: 'The gases recombine to white smoke on cooling' },
  { eq: '2 Cu(NO3)2 → 2 CuO + 4 NO2 + O2', type: ['decomposition', 'redox', 'gas'], cond_vi: 'Đun nóng', cond_en: 'Heated', phen_vi: 'Khí nâu đỏ thoát ra, chất rắn hóa đen', phen_en: 'Brown gas evolves; residue turns black' },
  { eq: '2 H2O2 → 2 H2O + O2', type: ['decomposition', 'redox', 'gas'], cond_vi: 'Xúc tác MnO2 hoặc enzim catalaza', cond_en: 'MnO2 or catalase catalyst', phen_vi: 'Sủi bọt khí mạnh', phen_en: 'Vigorous bubbling' },
  { eq: 'NH4NO3 → N2O + 2 H2O', type: ['decomposition'], cond_vi: 'Đun nóng nhẹ', cond_en: 'Gently heated', note_vi: 'Sinh khí cười; đun quá mạnh có thể gây nổ', note_en: 'Produces laughing gas; overheating can explode' },

  // ===== Điện phân =====
  { eq: '2 H2O → 2 H2 + O2', type: ['electrolysis', 'decomposition', 'redox', 'gas'], cond_vi: 'Điện phân, có thêm chất điện li', cond_en: 'Electrolysis with an electrolyte added', phen_vi: 'Khí thoát ra ở hai điện cực, thể tích hydro gấp đôi oxy', phen_en: 'Gas at both electrodes; twice as much hydrogen as oxygen' },
  { eq: '2 NaCl → 2 Na + Cl2', type: ['electrolysis', 'decomposition', 'redox'], cond_vi: 'Điện phân nóng chảy', cond_en: 'Molten electrolysis', note_vi: 'Cách điều chế natri kim loại', note_en: 'How sodium metal is produced' },
  { eq: '2 NaCl + 2 H2O → 2 NaOH + H2 + Cl2', type: ['electrolysis', 'redox', 'gas'], phen_vi: 'Khí thoát ra ở cả hai điện cực; phía anot có khí vàng lục mùi xốc', phen_en: 'Gas at both electrodes; the anode gives a pungent yellow-green gas', cond_vi: 'Điện phân dung dịch, có màng ngăn', cond_en: 'Electrolysis of brine with a diaphragm', note_vi: 'Cho ba sản phẩm công nghiệp giá trị cùng lúc', note_en: 'Yields three valuable industrial products at once' },
  { eq: '2 Al2O3 → 4 Al + 3 O2', type: ['electrolysis', 'decomposition', 'redox'], cond_vi: 'Điện phân nóng chảy trong criolit', cond_en: 'Molten electrolysis in cryolite', note_vi: 'Rất tốn điện nên nhà máy nhôm hay đặt cạnh thủy điện', note_en: 'Very power-hungry, hence smelters sit near hydro plants' },

  // ===== Phi kim =====
  { eq: 'H2 + Cl2 → 2 HCl', type: ['combination', 'redox'], cond_vi: 'Ánh sáng hoặc đun nóng', cond_en: 'Light or heat', phen_vi: 'Nổ mạnh khi chiếu sáng mạnh', phen_en: 'Explodes in bright light' },
  { eq: 'N2 + 3 H2 → 2 NH3', type: ['combination', 'redox'], cond_vi: '450-500°C, 200 atm, xúc tác sắt', cond_en: '450-500°C, 200 atm, iron catalyst', note_vi: 'Quy trình Haber, nền tảng của phân đạm toàn thế giới', note_en: 'The Haber process, foundation of world fertilizer' },
  { eq: '2 H2 + O2 → 2 H2O', type: ['combination', 'redox', 'combustion'], cond_vi: 'Đốt cháy', cond_en: 'Ignition', phen_vi: 'Nổ với tiếng nghe đanh gọn', phen_en: 'Explodes with a sharp pop' },
  { eq: 'C + O2 → CO2', type: ['combination', 'redox', 'combustion'] },
  { eq: '2 C + O2 → 2 CO', type: ['combination', 'redox', 'combustion'], cond_vi: 'Thiếu oxy', cond_en: 'Limited oxygen', note_vi: 'Sinh khí CO độc khi đốt trong phòng kín', note_en: 'Produces toxic CO when burning in a closed room' },
  { eq: 'S + O2 → SO2', type: ['combination', 'redox', 'combustion'], phen_vi: 'Cháy với ngọn lửa xanh mờ, mùi hắc', phen_en: 'Burns with a pale blue flame and pungent smell' },
  { eq: '2 SO2 + O2 → 2 SO3', type: ['combination', 'redox'], cond_vi: '450°C, xúc tác V2O5', cond_en: '450°C, V2O5 catalyst', note_vi: 'Bước then chốt sản xuất axit sunfuric', note_en: 'Key step in sulfuric acid production' },
  { eq: 'N2 + O2 → 2 NO', type: ['combination', 'redox'], cond_vi: 'Nhiệt độ rất cao hoặc tia lửa điện', cond_en: 'Very high temperature or electric spark', note_vi: 'Xảy ra khi có sét, là nguồn đạm tự nhiên cho đất', note_en: 'Happens in lightning, a natural nitrogen source' },
  { eq: '2 NO + O2 → 2 NO2', type: ['combination', 'redox'], phen_vi: 'Khí không màu lập tức hóa nâu đỏ', phen_en: 'Colorless gas instantly turns red-brown' },
  { eq: '4 P + 5 O2 → 2 P2O5', type: ['combination', 'redox', 'combustion'], phen_vi: 'Cháy sáng chói tạo khói trắng dày', phen_en: 'Burns brilliantly with dense white smoke' },
  { eq: 'C + H2O → CO + H2', type: ['redox'], cond_vi: 'Than nóng đỏ trên 1000°C', cond_en: 'Red-hot coke above 1000°C', note_vi: 'Tạo khí than ướt dùng làm nhiên liệu', note_en: 'Produces water gas used as fuel' },
  { eq: 'CO2 + C → 2 CO', type: ['redox'], cond_vi: 'Nhiệt độ cao', cond_en: 'High temperature' },
  { eq: 'Cl2 + 2 NaOH → NaCl + NaClO + H2O', type: ['redox', 'exchange'], ionic: 'Cl2 + 2 OH⁻ → Cl⁻ + ClO⁻ + H2O', phen_vi: 'Tạo nước Javen dùng để tẩy trắng', phen_en: 'Forms bleach solution', note_vi: 'Clo vừa bị oxi hóa vừa bị khử trong cùng phản ứng', note_en: 'Chlorine is both oxidized and reduced here' },
  { eq: 'Cl2 + 2 NaBr → 2 NaCl + Br2', type: ['redox', 'substitution'], phen_vi: 'Dung dịch hóa nâu đỏ do brom sinh ra', phen_en: 'Solution turns red-brown as bromine forms', note_vi: 'Halogen mạnh đẩy halogen yếu hơn ra khỏi muối', note_en: 'A stronger halogen displaces a weaker one' },
  { eq: 'Si + O2 → SiO2', type: ['combination', 'redox'], cond_vi: 'Nhiệt độ cao', cond_en: 'High temperature' },
  { eq: 'SiO2 + 2 NaOH → Na2SiO3 + H2O', type: ['exchange'], cond_vi: 'Kiềm đặc, đun nóng', cond_en: 'Hot concentrated alkali' },
  { eq: 'SiO2 + 4 HF → SiF4 + 2 H2O', type: ['exchange'], note_vi: 'Vì phản ứng này mà HF ăn mòn thủy tinh, không đựng trong lọ thủy tinh được', note_en: 'This is why HF etches glass and cannot be stored in it' },

  // ===== Khử oxit kim loại =====
  { eq: 'CuO + H2 → Cu + H2O', type: ['redox'], cond_vi: 'Đun nóng', cond_en: 'Heated', phen_vi: 'Chất rắn đen chuyển thành đồng đỏ', phen_en: 'Black solid turns to red copper' },
  { eq: 'CuO + CO → Cu + CO2', type: ['redox'], cond_vi: 'Đun nóng', cond_en: 'Heated' },
  { eq: 'Fe2O3 + 3 CO → 2 Fe + 3 CO2', type: ['redox'], cond_vi: 'Lò cao, nhiệt độ cao', cond_en: 'Blast furnace, high temperature', note_vi: 'Phản ứng chính luyện gang từ quặng sắt', note_en: 'Main reaction of iron smelting' },
  { eq: 'Fe3O4 + 4 CO → 3 Fe + 4 CO2', type: ['redox'], cond_vi: 'Lò cao', cond_en: 'Blast furnace' },
  { eq: '2 Al + Fe2O3 → Al2O3 + 2 Fe', type: ['redox'], cond_vi: 'Cần mồi nhiệt', cond_en: 'Needs an igniter', phen_vi: 'Tỏa nhiệt cực mạnh, sắt nóng chảy chảy ra', phen_en: 'Intensely exothermic; molten iron flows out', note_vi: 'Phản ứng nhiệt nhôm, dùng hàn đường ray', note_en: 'Thermite reaction, used to weld rails' },
  { eq: 'ZnO + C → Zn + CO', type: ['redox'], cond_vi: 'Nhiệt độ cao', cond_en: 'High temperature' },

  // ===== Sắt và nhôm đặc trưng =====
  { eq: '2 FeCl2 + Cl2 → 2 FeCl3', type: ['redox', 'combination'], note_vi: 'Chuyển sắt(II) lên sắt(III)', note_en: 'Oxidizes iron(II) to iron(III)' },
  { eq: '2 FeCl3 + Fe → 3 FeCl2', type: ['redox'], note_vi: 'Sắt dư đưa sắt(III) về sắt(II)', note_en: 'Excess iron reduces iron(III) back to iron(II)' },
  { eq: '4 Fe(OH)2 + O2 + 2 H2O → 4 Fe(OH)3', type: ['redox'], cond_vi: 'Để ngoài không khí', cond_en: 'Left in air', phen_vi: 'Kết tủa trắng xanh chuyển dần sang nâu đỏ', phen_en: 'Pale green precipitate gradually turns red-brown' },
  { eq: '2 Al + 2 NaOH + 2 H2O → 2 NaAlO2 + 3 H2', type: ['redox', 'gas'], phen_vi: 'Nhôm tan trong dung dịch kiềm, sủi bọt khí', phen_en: 'Aluminium dissolves in alkali with bubbling', note_vi: 'Vì vậy không đựng dung dịch kiềm trong nồi nhôm', note_en: 'Hence never store alkali in aluminium pots' },
  { eq: 'Al(OH)3 + NaOH → NaAlO2 + 2 H2O', type: ['exchange'], ionic: 'Al(OH)3 + OH⁻ → AlO2⁻ + 2 H2O', phen_vi: 'Kết tủa keo trắng tan dần', phen_en: 'White gelatinous precipitate dissolves', note_vi: 'Chứng tỏ Al(OH)3 lưỡng tính', note_en: 'Shows Al(OH)3 is amphoteric' },
  { eq: 'CaC2 + 2 H2O → C2H2 + Ca(OH)2', type: ['hydrolysis', 'gas'], phen_vi: 'Sủi bọt khí mạnh, có mùi đặc trưng', phen_en: 'Vigorous bubbling with a characteristic smell', note_vi: 'Cách điều chế axetilen từ đất đèn', note_en: 'How acetylene is made from carbide' },
  { eq: 'Al4C3 + 12 H2O → 4 Al(OH)3 + 3 CH4', type: ['hydrolysis', 'gas'], phen_vi: 'Sủi bọt khí, đồng thời tạo kết tủa keo trắng', phen_en: 'Bubbles form alongside a white gelatinous precipitate' },

  // ===== Đốt cháy hợp chất hữu cơ =====
  { eq: 'CH4 + 2 O2 → CO2 + 2 H2O', type: ['combustion', 'redox'], phen_vi: 'Ngọn lửa xanh nhạt, tỏa nhiều nhiệt', phen_en: 'Pale blue flame, releases much heat' },
  { eq: 'C2H4 + 3 O2 → 2 CO2 + 2 H2O', type: ['combustion', 'redox'] },
  { eq: '2 C2H2 + 5 O2 → 4 CO2 + 2 H2O', type: ['combustion', 'redox'], phen_vi: 'Ngọn lửa rất nóng, sáng chói', phen_en: 'Very hot, brilliant flame', note_vi: 'Dùng trong đèn xì hàn cắt kim loại', note_en: 'Used in oxy-acetylene welding torches' },
  { eq: 'C3H8 + 5 O2 → 3 CO2 + 4 H2O', type: ['combustion', 'redox'], note_vi: 'Phản ứng cháy của khí gas', note_en: 'Combustion of LPG' },
  { eq: 'C2H5OH + 3 O2 → 2 CO2 + 3 H2O', type: ['combustion', 'redox'], phen_vi: 'Ngọn lửa xanh, không khói', phen_en: 'Blue smokeless flame' },
  { eq: 'C6H12O6 + 6 O2 → 6 CO2 + 6 H2O', type: ['combustion', 'redox'], note_vi: 'Chính là phản ứng hô hấp tế bào', note_en: 'This is cellular respiration' },
  { eq: '6 CO2 + 6 H2O → C6H12O6 + 6 O2', type: ['redox'], cond_vi: 'Ánh sáng, diệp lục', cond_en: 'Light and chlorophyll', note_vi: 'Quang hợp, phản ứng ngược của hô hấp', note_en: 'Photosynthesis, the reverse of respiration' },

  // ===== Hữu cơ: cộng, thế =====
  { eq: 'C2H4 + H2 → C2H6', type: ['addition'], cond_vi: 'Xúc tác Ni, đun nóng', cond_en: 'Ni catalyst, heated' },
  { eq: 'C2H4 + Br2 → C2H4Br2', type: ['addition'], phen_vi: 'Dung dịch brom màu nâu đỏ bị mất màu', phen_en: 'Red-brown bromine water decolorizes', note_vi: 'Cách phân biệt anken với ankan', note_en: 'Distinguishes alkenes from alkanes' },
  { eq: 'C2H4 + H2O → C2H5OH', type: ['addition'], cond_vi: 'Axit xúc tác, nhiệt độ và áp suất cao', cond_en: 'Acid catalyst, high T and P', note_vi: 'Cách sản xuất cồn công nghiệp', note_en: 'Industrial route to ethanol' },
  { eq: 'C2H2 + 2 H2 → C2H6', type: ['addition'], cond_vi: 'Xúc tác Ni', cond_en: 'Ni catalyst' },
  { eq: 'C2H2 + 2 Br2 → C2H2Br4', type: ['addition'], note_vi: 'Ankin cộng được hai phân tử brom', note_en: 'Alkynes add two bromine molecules' },
  { eq: 'C6H6 + 3 H2 → C6H12', type: ['addition'], cond_vi: 'Ni, nhiệt độ và áp suất cao', cond_en: 'Ni, high T and P', note_vi: 'Vòng benzen rất bền nên khó cộng', note_en: 'The benzene ring resists addition' },
  { eq: 'C6H6 + Br2 → C6H5Br + HBr', type: ['substitution'], cond_vi: 'Xúc tác bột sắt', cond_en: 'Iron powder catalyst', note_vi: 'Benzen ưu tiên phản ứng thế hơn phản ứng cộng', note_en: 'Benzene prefers substitution over addition' },
  { eq: 'CH4 + Cl2 → CH3Cl + HCl', type: ['substitution'], cond_vi: 'Ánh sáng khuếch tán', cond_en: 'Diffuse light', note_vi: 'Ankan chỉ tham gia phản ứng thế', note_en: 'Alkanes only undergo substitution' },

  // ===== Hữu cơ: ancol, axit, este =====
  { eq: '2 C2H5OH + 2 Na → 2 C2H5ONa + H2', type: ['redox', 'gas'], phen_vi: 'Sủi bọt khí, natri tan dần', phen_en: 'Bubbling as sodium dissolves', note_vi: 'Êm dịu hơn nhiều so với natri gặp nước', note_en: 'Much gentler than sodium with water' },
  { eq: 'CH3COOH + NaOH → CH3COONa + H2O', type: ['neutralization'], ionic: 'CH3COOH + OH⁻ → CH3COO⁻ + H2O', note_vi: 'Axit hữu cơ vẫn trung hòa được bazơ', note_en: 'Organic acids still neutralize bases' },
  { eq: '2 CH3COOH + Na2CO3 → 2 CH3COONa + H2O + CO2', type: ['exchange', 'gas'], ionic: '2 CH3COOH + CO3²⁻ → 2 CH3COO⁻ + H2O + CO2', phen_vi: 'Sủi bọt khí', phen_en: 'Fizzing', note_vi: 'Chứng tỏ axit axetic mạnh hơn axit cacbonic', note_en: 'Shows acetic acid is stronger than carbonic acid' },
  { eq: 'CH3COOH + C2H5OH → CH3COOC2H5 + H2O', type: ['esterification'], cond_vi: 'H2SO4 đặc xúc tác, đun nóng', cond_en: 'Concentrated H2SO4, heated', phen_vi: 'Tạo chất lỏng mùi thơm nổi lên trên', phen_en: 'A fragrant liquid layer forms on top', note_vi: 'Phản ứng thuận nghịch, không xảy ra hoàn toàn', note_en: 'Reversible; never goes to completion' },
  { eq: 'CH3COOC2H5 + NaOH → CH3COONa + C2H5OH', type: ['saponification', 'hydrolysis'], cond_vi: 'Đun nóng', cond_en: 'Heated', note_vi: 'Thủy phân este trong kiềm, xảy ra một chiều', note_en: 'Alkaline ester hydrolysis; irreversible' },
  { eq: 'C6H12O6 → 2 C2H5OH + 2 CO2', type: ['decomposition', 'gas'], phen_vi: 'Sủi bọt khí đều đặn trong nhiều giờ, dung dịch đục dần', phen_en: 'Steady bubbling for hours as the liquid turns cloudy', cond_vi: 'Men rượu, 30-35°C', cond_en: 'Yeast, 30-35°C', note_vi: 'Lên men rượu, cơ sở của nghề nấu rượu', note_en: 'Alcoholic fermentation' },
  { eq: 'C12H22O11 + H2O → 2 C6H12O6', type: ['hydrolysis'], cond_vi: 'Axit xúc tác hoặc enzim', cond_en: 'Acid catalyst or enzyme', note_vi: 'Cho một phân tử glucozơ và một phân tử fructozơ', note_en: 'Gives one glucose and one fructose molecule' },
  { eq: 'C2H5OH → C2H4 + H2O', type: ['decomposition'], cond_vi: 'H2SO4 đặc, 170°C', cond_en: 'Concentrated H2SO4, 170°C', note_vi: 'Tách nước tạo anken; ở 140°C lại cho ete', note_en: 'Dehydration to an alkene; at 140°C it gives an ether instead' },
  { eq: '2 C2H5OH + O2 → 2 CH3CHO + 2 H2O', type: ['redox'], cond_vi: 'Xúc tác Cu, đun nóng', cond_en: 'Cu catalyst, heated', note_vi: 'Oxi hóa không hoàn toàn ancol bậc một cho anđehit', note_en: 'Partial oxidation of a primary alcohol gives an aldehyde' },
  { eq: 'C2H5OH + O2 → CH3COOH + H2O', type: ['redox'], cond_vi: 'Men giấm, 25-30°C', cond_en: 'Acetobacter, 25-30°C', note_vi: 'Lên men giấm, cách làm giấm ăn truyền thống', note_en: 'Vinegar fermentation' },
  { eq: 'CH3CHO + 2 AgNO3 + 3 NH3 + H2O → CH3COONH4 + 2 Ag + 2 NH4NO3', type: ['redox'], cond_vi: 'Đun nhẹ', cond_en: 'Gentle heating', phen_vi: 'Bạc bám thành lớp sáng như gương trên thành ống nghiệm', phen_en: 'Silver deposits as a mirror on the tube wall', note_vi: 'Phản ứng tráng gương, dùng nhận biết nhóm CHO', note_en: 'Silver mirror test for the aldehyde group' },
  { eq: 'CH3COOCH3 + H2O → CH3COOH + CH3OH', type: ['hydrolysis'], cond_vi: 'H2SO4 loãng xúc tác, đun nóng', cond_en: 'Dilute H2SO4, heated', note_vi: 'Thủy phân este trong axit là thuận nghịch, khác với trong kiềm', note_en: 'Acidic ester hydrolysis is reversible, unlike the alkaline route' },

  // ===== Hữu cơ: gluxit =====
  { eq: 'C6H12O6 + 2 AgNO3 + 2 NH3 + H2O → C6H12O7 + 2 Ag + 2 NH4NO3', type: ['redox'], cond_vi: 'Dung dịch AgNO3 trong NH3, đun nhẹ', cond_en: 'AgNO3 in ammonia, gently heated', phen_vi: 'Lớp bạc sáng bám vào thành ống nghiệm', phen_en: 'A bright silver layer coats the tube', note_vi: 'Glucozơ có nhóm CHO nên tráng gương được; fructozơ cũng cho kết quả này vì chuyển hóa thành glucozơ trong môi trường kiềm', note_en: 'Glucose has a CHO group; fructose also responds after isomerizing in base' },
  { eq: '2 C6H12O6 + Cu(OH)2 → (C6H11O6)2Cu + 2 H2O', type: ['combination'], cond_vi: 'Nhiệt độ thường', cond_en: 'Room temperature', phen_vi: 'Kết tủa xanh tan ra cho dung dịch xanh lam trong suốt', phen_en: 'The blue precipitate dissolves to a clear deep-blue solution', note_vi: 'Dấu hiệu của nhiều nhóm OH kề nhau', note_en: 'Signature of neighbouring hydroxyl groups' },
  { eq: 'C6H12O6 + H2 → C6H14O6', type: ['addition', 'redox'], cond_vi: 'Xúc tác Ni, đun nóng', cond_en: 'Ni catalyst, heated', note_vi: 'Tạo sobitol, chất tạo ngọt và giữ ẩm trong kem đánh răng', note_en: 'Gives sorbitol, a sweetener and humectant in toothpaste' },
  { eq: '2 C12H22O11 + Cu(OH)2 → (C12H21O11)2Cu + 2 H2O', type: ['combination'], phen_vi: 'Dung dịch xanh lam trong suốt', phen_en: 'Clear deep-blue solution', note_vi: 'Saccarozơ không tráng gương được nhưng vẫn hòa tan Cu(OH)2', note_en: 'Sucrose gives no silver mirror yet still dissolves Cu(OH)2' },
  { eq: '(C6H10O5)n + n H2O → n C6H12O6', type: ['hydrolysis'], cond_vi: 'Axit loãng đun nóng hoặc enzim amilaza', cond_en: 'Hot dilute acid or amylase', note_vi: 'Thủy phân tinh bột; nhai cơm lâu thấy ngọt chính là phản ứng này', note_en: 'Starch hydrolysis; why rice tastes sweet when chewed', symbolic: true },
  { eq: '(C6H10O5)n + 3n HNO3 → (C6H7N3O11)n + 3n H2O', type: ['substitution'], cond_vi: 'HNO3 đặc, H2SO4 đặc xúc tác', cond_en: 'Fuming HNO3 with H2SO4', note_vi: 'Xenlulozơ trinitrat dùng làm thuốc súng không khói', note_en: 'Cellulose trinitrate, the basis of smokeless powder', symbolic: true },

  // ===== Hữu cơ: chất béo =====
  { eq: '(C17H35COO)3C3H5 + 3 NaOH → 3 C17H35COONa + C3H5(OH)3', type: ['saponification', 'hydrolysis'], cond_vi: 'Đun nóng', cond_en: 'Heated', note_vi: 'Xà phòng hóa tristearin; muối natri thu được chính là xà phòng', note_en: 'Saponification of tristearin; the sodium salt is soap' },
  { eq: '(C17H35COO)3C3H5 + 3 H2O → 3 C17H35COOH + C3H5(OH)3', type: ['hydrolysis'], cond_vi: 'Axit xúc tác, đun nóng', cond_en: 'Acid catalyst, heated', note_vi: 'Thủy phân trong axit cho lại axit béo, không cho xà phòng', note_en: 'Acidic hydrolysis returns the fatty acid, not soap' },
  { eq: '(C17H33COO)3C3H5 + 3 H2 → (C17H35COO)3C3H5', type: ['addition', 'redox'], cond_vi: 'Xúc tác Ni, 175-190°C', cond_en: 'Ni catalyst, 175-190°C', note_vi: 'Hiđro hóa dầu lỏng thành mỡ rắn, cách làm bơ thực vật', note_en: 'Hardening liquid oil into solid fat; how margarine is made' },
  { eq: '(C17H33COO)3C3H5 + 3 NaOH → 3 C17H33COONa + C3H5(OH)3', type: ['saponification', 'hydrolysis'], cond_vi: 'Đun nóng', cond_en: 'Heated', note_vi: 'Xà phòng hóa triolein, chất béo chính trong dầu ô liu', note_en: 'Saponification of triolein, the main fat in olive oil' },

  // ===== Hữu cơ: amino axit, peptit =====
  { eq: 'H2NCH2COOH + HCl → ClH3NCH2COOH', type: ['combination'], note_vi: 'Nhóm NH2 nhận proton nên amino axit tác dụng được với axit', note_en: 'The NH2 group accepts a proton, so amino acids react with acids' },
  { eq: 'H2NCH2COOH + NaOH → H2NCH2COONa + H2O', type: ['neutralization'], ionic: 'H2NCH2COOH + OH⁻ → H2NCH2COO⁻ + H2O', note_vi: 'Nhóm COOH nhường proton; hai phản ứng này cho thấy tính lưỡng tính', note_en: 'The COOH group donates a proton; together these show amphoterism' },
  { eq: 'H2NCH2COOH + C2H5OH → H2NCH2COOC2H5 + H2O', type: ['esterification'], cond_vi: 'HCl khan xúc tác', cond_en: 'Dry HCl catalyst', note_vi: 'Amino axit este hóa qua nhóm COOH như axit thường', note_en: 'Amino acids esterify through the COOH group' },
  { eq: '2 H2NCH2COOH → H2NCH2CONHCH2COOH + H2O', type: ['combination'], note_vi: 'Tạo liên kết peptit CO-NH, bước đầu dựng nên protein', note_en: 'Forms the CO-NH peptide bond that builds proteins' },
  { eq: 'H2NCH2CONHCH2COOH + H2O → 2 H2NCH2COOH', type: ['hydrolysis'], cond_vi: 'Axit, bazơ hoặc enzim', cond_en: 'Acid, base or enzyme', note_vi: 'Thủy phân peptit; tiêu hóa đạm trong dạ dày đi theo đường này', note_en: 'Peptide hydrolysis; how the stomach digests protein' },

  // ===== Muối: trao đổi, nhiệt phân, đẩy halogen =====
  { eq: 'AgNO3 + KI → AgI + KNO3', type: ['exchange', 'precipitation'], ionic: 'Ag⁺ + I⁻ → AgI', phen_vi: 'Kết tủa vàng đậm, đậm màu hơn hẳn AgCl trắng và AgBr vàng nhạt', phen_en: 'Deep yellow precipitate, darker than white AgCl or pale AgBr', note_vi: 'Ba kết tủa bạc halogenua khác màu nhau nên dùng để phân biệt', note_en: 'The three silver halides differ in colour, so they can be told apart' },
  { eq: 'Pb(NO3)2 + 2 NaCl → PbCl2 + 2 NaNO3', type: ['exchange', 'precipitation'], ionic: 'Pb²⁺ + 2 Cl⁻ → PbCl2', phen_vi: 'Kết tủa trắng, tan lại khi đun nóng rồi kết tinh hình kim lúc nguội', phen_en: 'White precipitate that redissolves on heating and recrystallises as needles' },
  { eq: '2 AgBr → 2 Ag + Br2', type: ['decomposition', 'redox'], cond_vi: 'Ánh sáng', cond_en: 'Light', phen_vi: 'Chất rắn hóa xám đen dần', phen_en: 'The solid darkens to grey', note_vi: 'Chính phản ứng này làm nên phim ảnh đen trắng ngày trước', note_en: 'The reaction behind old black-and-white photographic film' },
  { eq: '2 KBr + Cl2 → 2 KCl + Br2', type: ['redox', 'substitution'], phen_vi: 'Dung dịch hóa nâu đỏ do brom sinh ra', phen_en: 'Solution turns red-brown as bromine forms', note_vi: 'Halogen mạnh đẩy halogen yếu ra khỏi muối; clo mạnh hơn brom', note_en: 'A stronger halogen displaces a weaker one from its salt' },
  { eq: 'NaOH + HF → NaF + H2O', type: ['neutralization'], ionic: 'HF + OH⁻ → F⁻ + H2O' },
  { eq: 'CaF2 + H2SO4 → CaSO4 + 2 HF', type: ['exchange'], cond_vi: 'H2SO4 đặc, đun nóng', cond_en: 'Hot concentrated H2SO4', note_vi: 'Cách điều chế HF trong công nghiệp; HF ăn mòn được thủy tinh', note_en: 'Industrial route to HF, the acid that etches glass' },
  { eq: 'CuSO4.5H2O → CuSO4 + 5 H2O', type: ['decomposition'], cond_vi: 'Đun nóng trên 100°C', cond_en: 'Heated above 100°C', phen_vi: 'Tinh thể xanh lam chuyển thành bột trắng; nhỏ nước vào lại hóa xanh', phen_en: 'Blue crystals turn to white powder; adding water restores the blue', note_vi: 'Dùng CuSO4 khan để nhận biết nước lẫn trong dung môi', note_en: 'Anhydrous CuSO4 is used to detect traces of water' },
  { eq: 'ZnO + H2SO4 → ZnSO4 + H2O', type: ['exchange'], ionic: 'ZnO + 2 H⁺ → Zn²⁺ + H2O' },
  { eq: 'Ca(OH)2 + H2SO4 → CaSO4 + 2 H2O', type: ['neutralization', 'precipitation'], ionic: 'Ca²⁺ + 2 OH⁻ + 2 H⁺ + SO4²⁻ → CaSO4 + 2 H2O', phen_vi: 'Kết tủa trắng ít tan', phen_en: 'Sparingly soluble white precipitate' },
  { eq: '2 Al(OH)3 + 3 H2SO4 → Al2(SO4)3 + 6 H2O', type: ['neutralization'], ionic: 'Al(OH)3 + 3 H⁺ → Al³⁺ + 3 H2O' },
  { eq: 'Pb(NO3)2 + H2SO4 → PbSO4 + 2 HNO3', type: ['exchange', 'precipitation'], ionic: 'Pb²⁺ + SO4²⁻ → PbSO4', phen_vi: 'Kết tủa trắng', phen_en: 'White precipitate' },
  { eq: 'NaCl + H2SO4 → NaHSO4 + HCl', type: ['exchange', 'gas'], phen_vi: 'Khí không màu, mùi xốc, bốc khói trắng trong không khí ẩm', phen_en: 'Colourless pungent gas that fumes white in moist air', cond_vi: 'H2SO4 đặc, đun nhẹ', cond_en: 'Concentrated H2SO4, gentle heat', note_vi: 'Cách điều chế HCl trong phòng thí nghiệm', note_en: 'Laboratory preparation of hydrogen chloride' },
  { eq: 'CaCO3 + 2 HNO3 → Ca(NO3)2 + H2O + CO2', type: ['exchange', 'gas'], ionic: 'CaCO3 + 2 H⁺ → Ca²⁺ + H2O + CO2', phen_vi: 'Đá vôi tan, sủi bọt khí', phen_en: 'Limestone dissolves with fizzing' },
  { eq: 'Ba(OH)2 + 2 HNO3 → Ba(NO3)2 + 2 H2O', type: ['neutralization'], ionic: 'H⁺ + OH⁻ → H2O' },
  { eq: '2 NaNO3 → 2 NaNO2 + O2', type: ['decomposition', 'gas'], phen_vi: 'Chất rắn nóng chảy rồi sủi khí làm bùng cháy que đóm', phen_en: 'The molten solid bubbles; the gas relights a glowing splint', cond_vi: 'Đun nóng chảy', cond_en: 'Heated to melting', note_vi: 'Nitrat của kim loại kiềm chỉ mất một nguyên tử oxi, không cho oxit', note_en: 'Alkali metal nitrates lose only one oxygen; no oxide forms' },
  { eq: '2 KOH + CO2 → K2CO3 + H2O', type: ['combination'] },
  { eq: 'MgCO3 → MgO + CO2', type: ['decomposition', 'gas'], phen_vi: 'Chất rắn xốp dần, khí thoát ra làm đục nước vôi trong', phen_en: 'The solid grows porous; the gas turns limewater milky', cond_vi: 'Nung', cond_en: 'Heated' },
  { eq: 'BaCl2 + Na2CO3 → BaCO3 + 2 NaCl', type: ['exchange', 'precipitation'], ionic: 'Ba²⁺ + CO3²⁻ → BaCO3', phen_vi: 'Kết tủa trắng', phen_en: 'White precipitate' },
  { eq: '(NH4)2CO3 → 2 NH3 + CO2 + H2O', type: ['decomposition', 'gas'], cond_vi: 'Đun nóng', cond_en: 'Heated', phen_vi: 'Chất rắn tiêu hết, có mùi khai bay ra', phen_en: 'The solid vanishes, leaving a sharp ammonia smell' },
  { eq: 'NH4HCO3 → NH3 + CO2 + H2O', type: ['decomposition', 'gas'], phen_vi: 'Chất rắn tiêu hết, bốc mùi khai', phen_en: 'The solid disappears entirely, leaving a sharp ammonia smell', cond_vi: 'Đun nóng', cond_en: 'Heated', note_vi: 'Bột nở làm bánh: khí sinh ra làm bánh phồng lên', note_en: 'Baking ammonia: the gases make dough rise' },
  { eq: '2 LiOH + CO2 → Li2CO3 + H2O', type: ['combination'], note_vi: 'Dùng hấp thụ CO2 trong tàu vũ trụ và tàu ngầm', note_en: 'Used to scrub CO2 in spacecraft and submarines' },
  { eq: 'Ca3(PO4)2 + 3 H2SO4 → 3 CaSO4 + 2 H3PO4', type: ['exchange'], note_vi: 'Cơ sở sản xuất phân lân supephotphat', note_en: 'Basis of superphosphate fertiliser production' },
  { eq: 'H3PO4 + NaOH → NaH2PO4 + H2O', type: ['neutralization'], ionic: 'H3PO4 + OH⁻ → H2PO4⁻ + H2O', note_vi: 'Mới trung hòa nấc một nên còn là muối axit', note_en: 'Only the first proton is neutralised, giving an acid salt' },
  { eq: 'Na2S + 2 HCl → 2 NaCl + H2S', type: ['exchange', 'gas'], ionic: 'S²⁻ + 2 H⁺ → H2S', phen_vi: 'Khí mùi trứng thối bay ra', phen_en: 'Gas with a rotten-egg smell' },
  { eq: 'CuSO4 + H2S → CuS + H2SO4', type: ['exchange', 'precipitation'], ionic: 'Cu²⁺ + H2S → CuS + 2 H⁺', phen_vi: 'Kết tủa đen', phen_en: 'Black precipitate' },
  { eq: 'ZnSO4 + Na2S → ZnS + Na2SO4', type: ['exchange', 'precipitation'], ionic: 'Zn²⁺ + S²⁻ → ZnS', phen_vi: 'Kết tủa trắng', phen_en: 'White precipitate' },
  { eq: 'Pb(NO3)2 + H2S → PbS + 2 HNO3', type: ['exchange', 'precipitation'], ionic: 'Pb²⁺ + H2S → PbS + 2 H⁺', phen_vi: 'Kết tủa đen', phen_en: 'Black precipitate', note_vi: 'Giấy tẩm Pb(NO3)2 hóa đen là cách nhận ra khí H2S', note_en: 'Lead nitrate paper turning black is the classic H2S test' },
  { eq: '4 Ag + 2 H2S + O2 → 2 Ag2S + 2 H2O', type: ['redox'], phen_vi: 'Bề mặt bạc xỉn đen dần', phen_en: 'Silver tarnishes to black', note_vi: 'Vì sao đồ bạc để lâu bị đen, nhất là gần trứng và hành tỏi', note_en: 'Why silverware blackens, especially near eggs and onions' },
  { eq: 'Na2S2O3 + 2 HCl → 2 NaCl + S + SO2 + H2O', type: ['exchange', 'gas'], phen_vi: 'Dung dịch vẩn đục vàng do lưu huỳnh tách ra, kèm khí mùi hắc', phen_en: 'Solution turns cloudy yellow as sulfur separates, with a pungent gas' },
  { eq: 'K2Cr2O7 + 14 HCl → 2 KCl + 2 CrCl3 + 3 Cl2 + 7 H2O', type: ['redox', 'gas'], cond_vi: 'HCl đặc', cond_en: 'Concentrated HCl', phen_vi: 'Màu da cam chuyển sang lục, khí vàng lục thoát ra', phen_en: 'Orange turns green as yellow-green gas evolves' },
  { eq: '2 K2CrO4 + H2SO4 → K2Cr2O7 + K2SO4 + H2O', type: ['exchange'], phen_vi: 'Dung dịch vàng chuyển sang da cam', phen_en: 'Yellow solution turns orange', note_vi: 'Thêm kiềm vào thì quay lại màu vàng — cân bằng cromat và đicromat', note_en: 'Adding base reverses it; the chromate-dichromate equilibrium' },

  // ===== Oxit =====
  { eq: 'K2O + H2O → 2 KOH', type: ['combination'] },
  { eq: 'BaO + H2O → Ba(OH)2', type: ['combination'] },
  { eq: 'FeO + CO → Fe + CO2', type: ['redox'], cond_vi: 'Nhiệt độ cao', cond_en: 'High temperature' },
  { eq: 'Cu2O + H2 → 2 Cu + H2O', type: ['redox'], cond_vi: 'Đun nóng', cond_en: 'Heated' },
  { eq: 'PbO + 2 HNO3 → Pb(NO3)2 + H2O', type: ['exchange'], ionic: 'PbO + 2 H⁺ → Pb²⁺ + H2O' },
  { eq: 'Cr2O3 + 2 Al → 2 Cr + Al2O3', type: ['redox'], cond_vi: 'Nhiệt độ cao', cond_en: 'High temperature', note_vi: 'Phản ứng nhiệt nhôm, cách điều chế crom kim loại', note_en: 'Aluminothermic reaction, the route to chromium metal' },
  { eq: '4 CrO3 → 2 Cr2O3 + 3 O2', type: ['decomposition', 'gas'], phen_vi: 'Chất rắn đỏ sẫm chuyển sang lục, có khí thoát ra', phen_en: 'Dark red solid turns green as gas evolves', cond_vi: 'Trên 250°C', cond_en: 'Above 250°C' },
  { eq: '2 Ag2O → 4 Ag + O2', type: ['decomposition', 'gas'], phen_vi: 'Bột đen chuyển thành bạc kim loại sáng, có khí thoát ra', phen_en: 'Black powder turns to bright silver metal as gas escapes', cond_vi: 'Đun nóng', cond_en: 'Heated' },

  // ===== Axit =====
  { eq: '2 HI + Cl2 → 2 HCl + I2', type: ['redox', 'substitution'], phen_vi: 'Dung dịch hóa nâu, hồ tinh bột hóa xanh tím', phen_en: 'Solution browns; starch paper turns blue-violet' },
  { eq: '2 HClO → 2 HCl + O2', type: ['decomposition', 'gas'], phen_vi: 'Dung dịch nhạt màu dần và mất mùi đặc trưng', phen_en: 'The solution fades and loses its characteristic smell', cond_vi: 'Ánh sáng', cond_en: 'Light', note_vi: 'Vì sao nước Javen mất tác dụng khi để ngoài sáng', note_en: 'Why bleach loses strength in the light' },
  { eq: 'Na2SiO3 + 2 HCl → 2 NaCl + H2SiO3', type: ['exchange', 'precipitation'], ionic: 'SiO3²⁻ + 2 H⁺ → H2SiO3', phen_vi: 'Kết tủa keo trắng', phen_en: 'White gelatinous precipitate' },

  // ===== Đơn chất =====
  { eq: '2 O3 → 3 O2', type: ['decomposition'], note_vi: 'Ozon kém bền, tự phân hủy nên có tính oxi hóa rất mạnh', note_en: 'Ozone is unstable and decomposes, hence its strong oxidising power' },
  { eq: '2 F2 + 2 H2O → 4 HF + O2', type: ['redox'], note_vi: 'Flo mạnh tới mức bốc cháy trong nước, không như các halogen khác', note_en: 'Fluorine is so reactive it burns in water, unlike other halogens' },
  { eq: 'P4 + 5 O2 → 2 P2O5', type: ['combination', 'combustion'], phen_vi: 'Cháy sáng chói, tạo khói trắng dày đặc', phen_en: 'Burns with a brilliant flame and dense white smoke' },
  { eq: 'S8 + 8 O2 → 8 SO2', type: ['combustion', 'redox'], phen_vi: 'Ngọn lửa xanh mờ, khí mùi hắc', phen_en: 'Pale blue flame, pungent gas' },

  // ===== Hiđrocacbon =====
  { eq: '2 C4H10 + 13 O2 → 8 CO2 + 10 H2O', type: ['combustion', 'redox'], note_vi: 'Butan trong bình gas mini và bật lửa', note_en: 'Butane in camping gas and lighters' },
  { eq: 'C4H10 → C2H6 + C2H4', type: ['decomposition'], cond_vi: 'Xúc tác, 500°C', cond_en: 'Catalyst, 500°C', note_vi: 'Phản ứng cracking, bẻ mạch dài thành mạch ngắn dùng làm xăng', note_en: 'Cracking: long chains broken into short ones for petrol' },
  { eq: 'C5H12 + 8 O2 → 5 CO2 + 6 H2O', type: ['combustion', 'redox'] },
  { eq: 'C7H8 + 3 HNO3 → C7H5N3O6 + 3 H2O', type: ['substitution'], cond_vi: 'HNO3 đặc, H2SO4 đặc xúc tác', cond_en: 'Fuming HNO3 with H2SO4', note_vi: 'Điều chế thuốc nổ TNT từ toluen', note_en: 'Making TNT from toluene' },

  // ===== Ancol, ete, anđehit, xeton =====
  { eq: '2 C2H5OH → C4H10O + H2O', type: ['decomposition'], cond_vi: 'H2SO4 đặc, 140°C', cond_en: 'Concentrated H2SO4, 140°C', note_vi: 'Ở 140°C cho ete, còn ở 170°C lại cho anken — khác nhau ở nhiệt độ', note_en: 'At 140°C an ether forms; at 170°C an alkene does' },
  { eq: '2 C3H7OH + 2 Na → 2 C3H7ONa + H2', type: ['redox', 'gas'], phen_vi: 'Natri tan dần, sủi bọt khí đều, êm hơn khi gặp nước', phen_en: 'Sodium dissolves with steady bubbling, gentler than in water' },
  { eq: 'C4H9OH → C4H8 + H2O', type: ['decomposition'], cond_vi: 'H2SO4 đặc, 170°C', cond_en: 'Concentrated H2SO4, 170°C' },
  { eq: 'HCHO + H2 → CH3OH', type: ['addition', 'redox'], cond_vi: 'Xúc tác Ni, đun nóng', cond_en: 'Ni catalyst, heated' },
  { eq: 'C7H6O + H2 → C7H8O', type: ['addition', 'redox'], cond_vi: 'Xúc tác Ni', cond_en: 'Ni catalyst' },
  { eq: 'CH3COCH3 + H2 → (CH3)2CHOH', type: ['addition', 'redox'], cond_vi: 'Xúc tác Ni, đun nóng', cond_en: 'Ni catalyst, heated', note_vi: 'Xeton bị khử cho ancol bậc hai, khác anđehit cho ancol bậc một', note_en: 'Ketones reduce to secondary alcohols, aldehydes to primary ones' },

  // ===== Este, axit cacboxylic =====
  { eq: 'HCOOCH3 + NaOH → HCOONa + CH3OH', type: ['saponification', 'hydrolysis'], cond_vi: 'Đun nóng', cond_en: 'Heated' },
  { eq: 'HCOOH + NaOH → HCOONa + H2O', type: ['neutralization'] },
  { eq: '2 C2H5COOH + Na2CO3 → 2 C2H5COONa + H2O + CO2', type: ['exchange', 'gas'], phen_vi: 'Sủi bọt khí', phen_en: 'Fizzing' },
  { eq: 'C6H5COOH + NaOH → C6H5COONa + H2O', type: ['neutralization'], note_vi: 'Natri benzoat là chất bảo quản thực phẩm quen thuộc', note_en: 'Sodium benzoate is a common food preservative' },
  { eq: 'C15H31COOH + NaOH → C15H31COONa + H2O', type: ['neutralization'] },
  { eq: 'C17H33COOH + H2 → C17H35COOH', type: ['addition', 'redox'], cond_vi: 'Xúc tác Ni', cond_en: 'Ni catalyst', note_vi: 'Axit béo không no thành no; đây là bước làm cứng dầu ăn', note_en: 'Unsaturated fatty acid becomes saturated; the fat-hardening step' },

  // ===== Amin =====
  { eq: 'CH3NH2 + HCl → CH3NH3Cl', type: ['combination'], note_vi: 'Amin có tính bazơ nên tác dụng với axit tạo muối', note_en: 'Amines are basic and form salts with acids' },
  { eq: 'C6H5NH2 + HCl → C6H5NH3Cl', type: ['combination'], note_vi: 'Anilin bazơ yếu hơn amin no vì vòng benzen hút electron', note_en: 'Aniline is a weaker base than alkylamines; the ring pulls electrons away' },
  { eq: 'C6H5NH2 + 3 Br2 → C6H2Br3NH2 + 3 HBr', type: ['substitution', 'precipitation'], phen_vi: 'Kết tủa trắng xuất hiện ngay', phen_en: 'A white precipitate appears at once', note_vi: 'Cách nhận biết anilin bằng nước brom', note_en: 'The bromine-water test for aniline' },

  // ===== Trùng hợp (phương trình tượng trưng) =====
  { eq: 'n C2H4 → (C2H4)n', type: ['polymerization'], cond_vi: 'Nhiệt độ, áp suất, xúc tác', cond_en: 'Heat, pressure, catalyst', note_vi: 'Sản xuất nhựa PE làm túi nilon', note_en: 'Makes polyethylene for plastic bags', symbolic: true },
  { eq: 'n C2H3Cl → (C2H3Cl)n', type: ['polymerization'], cond_vi: 'Xúc tác, áp suất', cond_en: 'Catalyst and pressure', note_vi: 'Sản xuất nhựa PVC làm ống nước', note_en: 'Makes PVC for water pipes', symbolic: true },
  { eq: 'n C3H6 → (C3H6)n', type: ['polymerization'], cond_vi: 'Xúc tác, nhiệt độ và áp suất', cond_en: 'Catalyst, heat and pressure', note_vi: 'Nhựa PP làm hộp đựng thực phẩm chịu nóng', note_en: 'Polypropylene for heat-resistant food boxes', symbolic: true },
  { eq: 'n C8H8 → (C8H8)n', type: ['polymerization'], cond_vi: 'Xúc tác, đun nóng', cond_en: 'Catalyst, heated', note_vi: 'Nhựa PS làm hộp xốp, vỏ bút', note_en: 'Polystyrene for foam boxes and pen barrels', symbolic: true },
  { eq: 'n C4H6 → (C4H6)n', type: ['polymerization'], cond_vi: 'Natri xúc tác, đun nóng', cond_en: 'Sodium catalyst, heated', note_vi: 'Cao su buna, cao su tổng hợp đầu tiên được sản xuất công nghiệp', note_en: 'Buna rubber, the first industrial synthetic rubber', symbolic: true },
  { eq: 'n C5H8 → (C5H8)n', type: ['polymerization'], cond_vi: 'Xúc tác', cond_en: 'Catalyst', note_vi: 'Cao su isopren, giống hệt cao su thiên nhiên về cấu tạo', note_en: 'Isoprene rubber, structurally identical to natural rubber', symbolic: true },
  { eq: 'n C2F4 → (C2F4)n', type: ['polymerization'], cond_vi: 'Áp suất cao, xúc tác', cond_en: 'High pressure, catalyst', note_vi: 'Teflon phủ chảo chống dính, chịu được tới 260°C', note_en: 'Teflon non-stick coating, stable to 260°C', symbolic: true },
  { eq: 'n C5H8O2 → (C5H8O2)n', type: ['polymerization'], cond_vi: 'Xúc tác, đun nóng', cond_en: 'Catalyst, heated', note_vi: 'Thủy tinh hữu cơ plexiglas, trong suốt và nhẹ hơn thủy tinh', note_en: 'Plexiglas, clearer and lighter than glass', symbolic: true },
  { eq: 'n C6H11NO → (C6H11NO)n', type: ['polymerization'], cond_vi: 'Đun nóng, xúc tác', cond_en: 'Heated with catalyst', note_vi: 'Tơ nilon-6 từ caprolactam, dùng dệt vải và làm dây dù', note_en: 'Nylon-6 fibre from caprolactam', symbolic: true },
];
