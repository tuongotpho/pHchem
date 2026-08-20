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
  { eq: 'Ba + 2 H2O → Ba(OH)2 + H2', type: ['redox', 'substitution', 'gas'], cond_vi: 'Nhiệt độ thường', cond_en: 'Room temperature' },

  // ===== Kim loại + axit =====
  { eq: 'Zn + 2 HCl → ZnCl2 + H2', type: ['redox', 'substitution', 'gas'], phen_vi: 'Kẽm tan dần, sủi bọt khí không màu', phen_en: 'Zinc dissolves with colorless bubbles', ionic: 'Zn + 2 H⁺ → Zn²⁺ + H2' },
  { eq: 'Fe + 2 HCl → FeCl2 + H2', type: ['redox', 'substitution', 'gas'], phen_vi: 'Sắt tan, khí thoát ra, dung dịch màu lục nhạt', phen_en: 'Iron dissolves, gas evolves, pale green solution', ionic: 'Fe + 2 H⁺ → Fe²⁺ + H2', note_vi: 'Chỉ tạo muối sắt(II), không tạo sắt(III)', note_en: 'Gives iron(II) only, never iron(III)' },
  { eq: '2 Al + 6 HCl → 2 AlCl3 + 3 H2', type: ['redox', 'substitution', 'gas'], ionic: '2 Al + 6 H⁺ → 2 Al³⁺ + 3 H2' },
  { eq: 'Mg + H2SO4 → MgSO4 + H2', type: ['redox', 'substitution', 'gas'], cond_vi: 'Axit loãng', cond_en: 'Dilute acid', ionic: 'Mg + 2 H⁺ → Mg²⁺ + H2' },
  { eq: 'Fe + H2SO4 → FeSO4 + H2', type: ['redox', 'substitution', 'gas'], cond_vi: 'Axit loãng', cond_en: 'Dilute acid' },
  { eq: 'Cu + 2 H2SO4 → CuSO4 + SO2 + 2 H2O', type: ['redox', 'gas'], cond_vi: 'H2SO4 đặc, đun nóng', cond_en: 'Hot concentrated H2SO4', phen_vi: 'Đồng tan, dung dịch hóa xanh, khí mùi hắc thoát ra', phen_en: 'Copper dissolves, blue solution, pungent gas', note_vi: 'Đồng không phản ứng với H2SO4 loãng', note_en: 'Copper does not react with dilute H2SO4' },
  { eq: '2 Fe + 6 H2SO4 → Fe2(SO4)3 + 3 SO2 + 6 H2O', type: ['redox', 'gas'], cond_vi: 'H2SO4 đặc, đun nóng', cond_en: 'Hot concentrated H2SO4', note_vi: 'Axit đặc nguội làm sắt và nhôm bị thụ động, không phản ứng', note_en: 'Cold concentrated acid passivates iron and aluminium' },
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
  { eq: 'CuO + 2 HCl → CuCl2 + H2O', type: ['exchange'], phen_vi: 'Chất rắn đen tan, dung dịch hóa xanh lục', phen_en: 'Black solid dissolves giving a green solution' },
  { eq: 'Fe2O3 + 6 HCl → 2 FeCl3 + 3 H2O', type: ['exchange'], phen_vi: 'Gỉ sắt tan, dung dịch hóa vàng nâu', phen_en: 'Rust dissolves giving a yellow-brown solution' },
  { eq: 'CaO + 2 HCl → CaCl2 + H2O', type: ['exchange'] },
  { eq: 'Al2O3 + 6 HCl → 2 AlCl3 + 3 H2O', type: ['exchange'] },
  { eq: 'Al2O3 + 2 NaOH → 2 NaAlO2 + H2O', type: ['exchange'], note_vi: 'Chứng tỏ Al2O3 là oxit lưỡng tính', note_en: 'Shows Al2O3 is amphoteric' },
  { eq: 'CO2 + 2 NaOH → Na2CO3 + H2O', type: ['exchange'], note_vi: 'Nếu CO2 dư sẽ tạo muối axit NaHCO3', note_en: 'Excess CO2 gives the acid salt NaHCO3' },
  { eq: 'CO2 + Ca(OH)2 → CaCO3 + H2O', type: ['exchange', 'precipitation'], phen_vi: 'Nước vôi trong hóa đục', phen_en: 'Limewater turns cloudy', note_vi: 'Cách nhận biết khí CO2', note_en: 'The standard test for CO2' },
  { eq: 'SO2 + 2 NaOH → Na2SO3 + H2O', type: ['exchange'] },

  // ===== Trung hòa =====
  { eq: 'HCl + NaOH → NaCl + H2O', type: ['neutralization', 'exchange'], phen_vi: 'Không có dấu hiệu bên ngoài, phải dùng chất chỉ thị', phen_en: 'No visible change; needs an indicator', ionic: 'H⁺ + OH⁻ → H2O' },
  { eq: 'H2SO4 + 2 NaOH → Na2SO4 + 2 H2O', type: ['neutralization', 'exchange'], ionic: 'H⁺ + OH⁻ → H2O' },
  { eq: 'H2SO4 + 2 KOH → K2SO4 + 2 H2O', type: ['neutralization', 'exchange'], ionic: 'H⁺ + OH⁻ → H2O' },
  { eq: '2 HCl + Ca(OH)2 → CaCl2 + 2 H2O', type: ['neutralization', 'exchange'], ionic: 'H⁺ + OH⁻ → H2O' },
  { eq: '3 HCl + Al(OH)3 → AlCl3 + 3 H2O', type: ['neutralization', 'exchange'], ionic: 'Al(OH)3 + 3 H⁺ → Al³⁺ + 3 H2O', note_vi: 'Al(OH)3 không tan nên giữ nguyên dạng phân tử trong phương trình ion', note_en: 'Al(OH)3 is insoluble so stays undissociated' },
  { eq: 'H3PO4 + 3 NaOH → Na3PO4 + 3 H2O', type: ['neutralization', 'exchange'] },
  { eq: 'NH3 + HCl → NH4Cl', type: ['combination'], phen_vi: 'Tạo khói trắng dày đặc', phen_en: 'Dense white smoke forms' },
  { eq: '2 NH3 + H2SO4 → (NH4)2SO4', type: ['combination'], note_vi: 'Phản ứng sản xuất phân đạm một lá', note_en: 'Used to make ammonium sulfate fertilizer' },

  // ===== Muối + axit =====
  { eq: 'CaCO3 + 2 HCl → CaCl2 + H2O + CO2', type: ['exchange', 'gas'], phen_vi: 'Đá vôi tan, sủi bọt khí mạnh', phen_en: 'Limestone dissolves with vigorous fizzing', ionic: 'CaCO3 + 2 H⁺ → Ca²⁺ + H2O + CO2' },
  { eq: 'Na2CO3 + 2 HCl → 2 NaCl + H2O + CO2', type: ['exchange', 'gas'], ionic: 'CO3²⁻ + 2 H⁺ → H2O + CO2' },
  { eq: 'NaHCO3 + HCl → NaCl + H2O + CO2', type: ['exchange', 'gas'], ionic: 'HCO3⁻ + H⁺ → H2O + CO2', note_vi: 'Cơ chế thuốc muối trung hòa axit dạ dày', note_en: 'How baking soda neutralizes stomach acid' },
  { eq: 'Na2SO3 + 2 HCl → 2 NaCl + H2O + SO2', type: ['exchange', 'gas'], phen_vi: 'Khí mùi hắc thoát ra', phen_en: 'Pungent gas evolves' },
  { eq: 'FeS + 2 HCl → FeCl2 + H2S', type: ['exchange', 'gas'], phen_vi: 'Khí mùi trứng thối thoát ra', phen_en: 'Rotten-egg smelling gas evolves' },
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
  { eq: 'CaCO3 → CaO + CO2', type: ['decomposition', 'gas'], cond_vi: 'Nung khoảng 900°C', cond_en: 'Calcined around 900°C', note_vi: 'Phản ứng nung vôi', note_en: 'Lime kiln reaction' },
  { eq: '2 NaHCO3 → Na2CO3 + H2O + CO2', type: ['decomposition', 'gas'], cond_vi: 'Đun nóng', cond_en: 'Heated', note_vi: 'Là lý do bột nở làm bánh phồng lên', note_en: 'Why baking soda makes cakes rise' },
  { eq: '2 KClO3 → 2 KCl + 3 O2', type: ['decomposition', 'redox', 'gas'], cond_vi: 'Đun nóng, xúc tác MnO2', cond_en: 'Heated with MnO2 catalyst', note_vi: 'Cách điều chế oxy trong phòng thí nghiệm', note_en: 'Lab preparation of oxygen' },
  { eq: '2 KMnO4 → K2MnO4 + MnO2 + O2', type: ['decomposition', 'redox', 'gas'], cond_vi: 'Đun nóng', cond_en: 'Heated' },
  { eq: 'Cu(OH)2 → CuO + H2O', type: ['decomposition'], cond_vi: 'Đun nóng', cond_en: 'Heated', phen_vi: 'Kết tủa xanh lam chuyển thành chất rắn đen', phen_en: 'Blue precipitate turns into a black solid' },
  { eq: '2 Fe(OH)3 → Fe2O3 + 3 H2O', type: ['decomposition'], cond_vi: 'Nung', cond_en: 'Calcined' },
  { eq: '2 HgO → 2 Hg + O2', type: ['decomposition', 'redox', 'gas'], cond_vi: 'Đun nóng', cond_en: 'Heated', note_vi: 'Thí nghiệm lịch sử tìm ra oxy của Priestley', note_en: 'Priestley historic discovery of oxygen' },
  { eq: 'NH4Cl → NH3 + HCl', type: ['decomposition'], cond_vi: 'Đun nóng', cond_en: 'Heated', note_vi: 'Hai khí gặp lại chỗ nguội sẽ kết hợp thành khói trắng', note_en: 'The gases recombine to white smoke on cooling' },
  { eq: '2 Cu(NO3)2 → 2 CuO + 4 NO2 + O2', type: ['decomposition', 'redox', 'gas'], cond_vi: 'Đun nóng', cond_en: 'Heated', phen_vi: 'Khí nâu đỏ thoát ra, chất rắn hóa đen', phen_en: 'Brown gas evolves; residue turns black' },
  { eq: '2 H2O2 → 2 H2O + O2', type: ['decomposition', 'redox', 'gas'], cond_vi: 'Xúc tác MnO2 hoặc enzim catalaza', cond_en: 'MnO2 or catalase catalyst', phen_vi: 'Sủi bọt khí mạnh', phen_en: 'Vigorous bubbling' },
  { eq: 'NH4NO3 → N2O + 2 H2O', type: ['decomposition'], cond_vi: 'Đun nóng nhẹ', cond_en: 'Gently heated', note_vi: 'Sinh khí cười; đun quá mạnh có thể gây nổ', note_en: 'Produces laughing gas; overheating can explode' },

  // ===== Điện phân =====
  { eq: '2 H2O → 2 H2 + O2', type: ['electrolysis', 'decomposition', 'redox', 'gas'], cond_vi: 'Điện phân, có thêm chất điện li', cond_en: 'Electrolysis with an electrolyte added', phen_vi: 'Khí thoát ra ở hai điện cực, thể tích hydro gấp đôi oxy', phen_en: 'Gas at both electrodes; twice as much hydrogen as oxygen' },
  { eq: '2 NaCl → 2 Na + Cl2', type: ['electrolysis', 'decomposition', 'redox'], cond_vi: 'Điện phân nóng chảy', cond_en: 'Molten electrolysis', note_vi: 'Cách điều chế natri kim loại', note_en: 'How sodium metal is produced' },
  { eq: '2 NaCl + 2 H2O → 2 NaOH + H2 + Cl2', type: ['electrolysis', 'redox', 'gas'], cond_vi: 'Điện phân dung dịch, có màng ngăn', cond_en: 'Electrolysis of brine with a diaphragm', note_vi: 'Cho ba sản phẩm công nghiệp giá trị cùng lúc', note_en: 'Yields three valuable industrial products at once' },
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
  { eq: 'Cl2 + 2 NaOH → NaCl + NaClO + H2O', type: ['redox', 'exchange'], phen_vi: 'Tạo nước Javen dùng để tẩy trắng', phen_en: 'Forms bleach solution', note_vi: 'Clo vừa bị oxi hóa vừa bị khử trong cùng phản ứng', note_en: 'Chlorine is both oxidized and reduced here' },
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
  { eq: 'Al(OH)3 + NaOH → NaAlO2 + 2 H2O', type: ['exchange'], phen_vi: 'Kết tủa keo trắng tan dần', phen_en: 'White gelatinous precipitate dissolves', note_vi: 'Chứng tỏ Al(OH)3 lưỡng tính', note_en: 'Shows Al(OH)3 is amphoteric' },
  { eq: 'CaC2 + 2 H2O → C2H2 + Ca(OH)2', type: ['hydrolysis', 'gas'], phen_vi: 'Sủi bọt khí mạnh, có mùi đặc trưng', phen_en: 'Vigorous bubbling with a characteristic smell', note_vi: 'Cách điều chế axetilen từ đất đèn', note_en: 'How acetylene is made from carbide' },
  { eq: 'Al4C3 + 12 H2O → 4 Al(OH)3 + 3 CH4', type: ['hydrolysis', 'gas'] },

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
  { eq: 'CH3COOH + NaOH → CH3COONa + H2O', type: ['neutralization'], note_vi: 'Axit hữu cơ vẫn trung hòa được bazơ', note_en: 'Organic acids still neutralize bases' },
  { eq: '2 CH3COOH + Na2CO3 → 2 CH3COONa + H2O + CO2', type: ['exchange', 'gas'], phen_vi: 'Sủi bọt khí', phen_en: 'Fizzing', note_vi: 'Chứng tỏ axit axetic mạnh hơn axit cacbonic', note_en: 'Shows acetic acid is stronger than carbonic acid' },
  { eq: 'CH3COOH + C2H5OH → CH3COOC2H5 + H2O', type: ['esterification'], cond_vi: 'H2SO4 đặc xúc tác, đun nóng', cond_en: 'Concentrated H2SO4, heated', phen_vi: 'Tạo chất lỏng mùi thơm nổi lên trên', phen_en: 'A fragrant liquid layer forms on top', note_vi: 'Phản ứng thuận nghịch, không xảy ra hoàn toàn', note_en: 'Reversible; never goes to completion' },
  { eq: 'CH3COOC2H5 + NaOH → CH3COONa + C2H5OH', type: ['saponification', 'hydrolysis'], cond_vi: 'Đun nóng', cond_en: 'Heated', note_vi: 'Thủy phân este trong kiềm, xảy ra một chiều', note_en: 'Alkaline ester hydrolysis; irreversible' },
  { eq: 'C6H12O6 → 2 C2H5OH + 2 CO2', type: ['decomposition', 'gas'], cond_vi: 'Men rượu, 30-35°C', cond_en: 'Yeast, 30-35°C', note_vi: 'Lên men rượu, cơ sở của nghề nấu rượu', note_en: 'Alcoholic fermentation' },
  { eq: 'C12H22O11 + H2O → 2 C6H12O6', type: ['hydrolysis'], cond_vi: 'Axit xúc tác hoặc enzim', cond_en: 'Acid catalyst or enzyme', note_vi: 'Cho một phân tử glucozơ và một phân tử fructozơ', note_en: 'Gives one glucose and one fructose molecule' },

  // ===== Trùng hợp (phương trình tượng trưng) =====
  { eq: 'n C2H4 → (C2H4)n', type: ['polymerization'], cond_vi: 'Nhiệt độ, áp suất, xúc tác', cond_en: 'Heat, pressure, catalyst', note_vi: 'Sản xuất nhựa PE làm túi nilon', note_en: 'Makes polyethylene for plastic bags', symbolic: true },
  { eq: 'n C2H3Cl → (C2H3Cl)n', type: ['polymerization'], cond_vi: 'Xúc tác, áp suất', cond_en: 'Catalyst and pressure', note_vi: 'Sản xuất nhựa PVC làm ống nước', note_en: 'Makes PVC for water pipes', symbolic: true },
];
