// Thư viện công thức hóa học. Nội dung thật, kiểm chứng được.
// Muốn thêm: chỉ việc thêm một dòng vào mảng FORMULAS, app tự cập nhật.
// cat: 'inorganic' (vô cơ) | 'organic' (hữu cơ) | 'physical' (hóa lý — phương trình)

export type FormulaCat = 'inorganic' | 'organic' | 'physical';

export interface Formula {
  formula: string; // hiển thị (dùng số thường, app tự bo chỉ số dưới khi render)
  vi: string;
  en: string;
  cat: FormulaCat;
  note_vi: string;
  note_en: string;
}

export const FORMULA_CAT_META: Record<FormulaCat, { vi: string; en: string }> = {
  inorganic: { vi: 'Vô cơ', en: 'Inorganic' },
  organic: { vi: 'Hữu cơ', en: 'Organic' },
  physical: { vi: 'Hóa lý', en: 'Physical' },
};

// Mã SMILES (chuỗi mô tả cấu trúc phân tử chuẩn quốc tế) là NGUỒN CHÂN LÝ để
// sinh hình cấu tạo. Đặt ở file JSON dùng chung (src/data/smiles.json) để cả app
// và script sinh hình (scripts/gen-structures.mjs) cùng đọc.
// Chỉ có cho phân tử cộng hóa trị; muối ion (NaCl, CaCO3...) không có hình cấu tạo.
import SMILES_JSON from './smiles.json';

export const SMILES: Record<string, string> = SMILES_JSON;

export const getSmiles = (formula: string): string | undefined => SMILES[formula];

export const FORMULAS: Formula[] = [
  // ---------- VÔ CƠ ----------
  { formula: 'H2O', vi: 'Nước', en: 'Water', cat: 'inorganic', note_vi: 'Dung môi phổ biến nhất, phân tử phân cực.', note_en: 'The most common solvent; a polar molecule.' },
  { formula: 'H2O2', vi: 'Hydro peroxit', en: 'Hydrogen peroxide', cat: 'inorganic', note_vi: 'Chất oxi hóa mạnh, dùng sát trùng, tẩy trắng.', note_en: 'Strong oxidizer; used as disinfectant and bleach.' },
  { formula: 'HCl', vi: 'Axit clohydric', en: 'Hydrochloric acid', cat: 'inorganic', note_vi: 'Axit mạnh; có trong dịch vị dạ dày.', note_en: 'Strong acid; present in gastric juice.' },
  { formula: 'H2SO4', vi: 'Axit sunfuric', en: 'Sulfuric acid', cat: 'inorganic', note_vi: 'Axit mạnh, hút nước mạnh; "máu của công nghiệp".', note_en: 'Strong, hygroscopic acid; the "king of chemicals".' },
  { formula: 'HNO3', vi: 'Axit nitric', en: 'Nitric acid', cat: 'inorganic', note_vi: 'Axit mạnh, tính oxi hóa mạnh, làm vàng protein.', note_en: 'Strong oxidizing acid; stains proteins yellow.' },
  { formula: 'H3PO4', vi: 'Axit photphoric', en: 'Phosphoric acid', cat: 'inorganic', note_vi: 'Axit trung bình, ba nấc; dùng trong nước ngọt.', note_en: 'Triprotic medium acid; used in soft drinks.' },
  { formula: 'H2CO3', vi: 'Axit cacbonic', en: 'Carbonic acid', cat: 'inorganic', note_vi: 'Axit yếu, kém bền, tạo khi CO2 tan trong nước.', note_en: 'Weak unstable acid formed when CO2 dissolves.' },
  { formula: 'NaOH', vi: 'Natri hydroxit (xút)', en: 'Sodium hydroxide', cat: 'inorganic', note_vi: 'Bazơ mạnh, ăn da; dùng làm xà phòng, giấy.', note_en: 'Strong caustic base; used for soap and paper.' },
  { formula: 'KOH', vi: 'Kali hydroxit', en: 'Potassium hydroxide', cat: 'inorganic', note_vi: 'Bazơ mạnh; dùng làm xà phòng mềm, pin.', note_en: 'Strong base; used in soft soap and batteries.' },
  { formula: 'Ca(OH)2', vi: 'Canxi hydroxit (vôi tôi)', en: 'Calcium hydroxide', cat: 'inorganic', note_vi: 'Bazơ ít tan; nước vôi trong nhận biết CO2.', note_en: 'Slightly soluble base; limewater detects CO2.' },
  { formula: 'NH3', vi: 'Amoniac', en: 'Ammonia', cat: 'inorganic', note_vi: 'Khí mùi khai, tan nhiều trong nước, làm phân bón.', note_en: 'Pungent gas; very soluble; fertilizer feedstock.' },
  { formula: 'NaCl', vi: 'Natri clorua (muối ăn)', en: 'Sodium chloride', cat: 'inorganic', note_vi: 'Muối ăn; điện phân cho xút, clo, hydro.', note_en: 'Table salt; electrolysis yields NaOH, Cl2, H2.' },
  { formula: 'Na2CO3', vi: 'Natri cacbonat (soda)', en: 'Sodium carbonate', cat: 'inorganic', note_vi: 'Muối của axit yếu; dùng làm thủy tinh, tẩy rửa.', note_en: 'Used in glass making and cleaning.' },
  { formula: 'NaHCO3', vi: 'Natri bicacbonat (thuốc muối)', en: 'Sodium bicarbonate', cat: 'inorganic', note_vi: 'Bột nở; trung hòa axit dạ dày.', note_en: 'Baking soda; antacid.' },
  { formula: 'CaCO3', vi: 'Canxi cacbonat (đá vôi)', en: 'Calcium carbonate', cat: 'inorganic', note_vi: 'Thành phần đá vôi, vỏ sò; nung ra vôi sống.', note_en: 'Limestone and shells; calcined to quicklime.' },
  { formula: 'CaO', vi: 'Canxi oxit (vôi sống)', en: 'Calcium oxide', cat: 'inorganic', note_vi: 'Oxit bazơ; tỏa nhiệt mạnh khi gặp nước.', note_en: 'Basic oxide; reacts exothermically with water.' },
  { formula: 'CO2', vi: 'Cacbon đioxit', en: 'Carbon dioxide', cat: 'inorganic', note_vi: 'Khí nhà kính; sản phẩm hô hấp và đốt cháy.', note_en: 'Greenhouse gas; product of respiration/combustion.' },
  { formula: 'CO', vi: 'Cacbon monoxit', en: 'Carbon monoxide', cat: 'inorganic', note_vi: 'Khí độc không màu; cháy không hoàn toàn tạo ra.', note_en: 'Toxic colorless gas from incomplete combustion.' },
  { formula: 'SO2', vi: 'Lưu huỳnh đioxit', en: 'Sulfur dioxide', cat: 'inorganic', note_vi: 'Khí mùi hắc; gây mưa axit.', note_en: 'Pungent gas; causes acid rain.' },
  { formula: 'CuSO4', vi: 'Đồng(II) sunfat', en: 'Copper(II) sulfate', cat: 'inorganic', note_vi: 'Tinh thể ngậm nước màu xanh lam.', note_en: 'Blue hydrated crystals.' },
  { formula: 'KMnO4', vi: 'Kali pemanganat (thuốc tím)', en: 'Potassium permanganate', cat: 'inorganic', note_vi: 'Chất oxi hóa mạnh màu tím; sát trùng.', note_en: 'Strong purple oxidizer; disinfectant.' },
  { formula: 'K2Cr2O7', vi: 'Kali đicromat', en: 'Potassium dichromate', cat: 'inorganic', note_vi: 'Chất oxi hóa màu da cam.', note_en: 'Orange oxidizing agent.' },
  { formula: 'AgNO3', vi: 'Bạc nitrat', en: 'Silver nitrate', cat: 'inorganic', note_vi: 'Nhận biết ion clorua (kết tủa trắng AgCl).', note_en: 'Detects chloride (white AgCl precipitate).' },
  { formula: 'FeCl3', vi: 'Sắt(III) clorua', en: 'Iron(III) chloride', cat: 'inorganic', note_vi: 'Muối màu vàng nâu; dùng khắc bảng mạch.', note_en: 'Yellow-brown salt; etches circuit boards.' },
  { formula: 'Fe2O3', vi: 'Sắt(III) oxit', en: 'Iron(III) oxide', cat: 'inorganic', note_vi: 'Gỉ sắt; bột màu đỏ nâu.', note_en: 'Rust; reddish-brown powder.' },
  { formula: 'Al2O3', vi: 'Nhôm oxit', en: 'Aluminium oxide', cat: 'inorganic', note_vi: 'Rất cứng; có trong đá quý ruby, saphia.', note_en: 'Very hard; found in ruby and sapphire.' },
  { formula: 'O2', vi: 'Khí oxy', en: 'Oxygen', cat: 'inorganic', note_vi: 'Duy trì sự sống và sự cháy.', note_en: 'Supports life and combustion.' },
  { formula: 'O3', vi: 'Ozon', en: 'Ozone', cat: 'inorganic', note_vi: 'Chắn tia UV ở tầng bình lưu; mùi hắc.', note_en: 'Blocks UV in stratosphere; pungent smell.' },
  { formula: 'N2', vi: 'Khí nitơ', en: 'Nitrogen', cat: 'inorganic', note_vi: 'Chiếm 78% không khí; khá trơ.', note_en: '78% of air; fairly inert.' },
  { formula: 'HgO', vi: 'Thủy ngân(II) oxit', en: 'Mercury(II) oxide', cat: 'inorganic', note_vi: 'Nung ra oxy — thí nghiệm lịch sử của Priestley.', note_en: 'Decomposes to oxygen — Priestley’s classic experiment.' },

  // ---------- HỮU CƠ ----------
  { formula: 'CH4', vi: 'Metan', en: 'Methane', cat: 'organic', note_vi: 'Ankan đơn giản nhất; khí thiên nhiên.', note_en: 'Simplest alkane; natural gas.' },
  { formula: 'C2H6', vi: 'Etan', en: 'Ethane', cat: 'organic', note_vi: 'Ankan hai cacbon.', note_en: 'Two-carbon alkane.' },
  { formula: 'C2H4', vi: 'Etilen (eten)', en: 'Ethylene', cat: 'organic', note_vi: 'Anken; kích thích quả chín, làm nhựa PE.', note_en: 'Alkene; ripens fruit; makes polyethylene.' },
  { formula: 'C2H2', vi: 'Axetilen', en: 'Acetylene', cat: 'organic', note_vi: 'Ankin; cháy nóng dùng hàn cắt kim loại.', note_en: 'Alkyne; hot flame for welding.' },
  { formula: 'C3H8', vi: 'Propan', en: 'Propane', cat: 'organic', note_vi: 'Thành phần khí hóa lỏng LPG.', note_en: 'Component of LPG.' },
  { formula: 'C4H10', vi: 'Butan', en: 'Butane', cat: 'organic', note_vi: 'Nhiên liệu bật lửa, bếp ga mini.', note_en: 'Lighter and camping-stove fuel.' },
  { formula: 'C6H6', vi: 'Benzen', en: 'Benzene', cat: 'organic', note_vi: 'Hydrocacbon thơm vòng 6 cạnh.', note_en: 'Aromatic six-membered ring.' },
  { formula: 'CH3OH', vi: 'Metanol', en: 'Methanol', cat: 'organic', note_vi: 'Ancol độc, gây mù; dung môi, nhiên liệu.', note_en: 'Toxic alcohol (blindness); solvent/fuel.' },
  { formula: 'C2H5OH', vi: 'Etanol (cồn)', en: 'Ethanol', cat: 'organic', note_vi: 'Cồn uống được; sát trùng, nhiên liệu sinh học.', note_en: 'Drinking alcohol; antiseptic, biofuel.' },
  { formula: 'CH3COOH', vi: 'Axit axetic (giấm)', en: 'Acetic acid', cat: 'organic', note_vi: 'Axit hữu cơ yếu; giấm ăn ~5%.', note_en: 'Weak organic acid; vinegar is ~5%.' },
  { formula: 'HCOOH', vi: 'Axit fomic', en: 'Formic acid', cat: 'organic', note_vi: 'Axit trong nọc kiến, ong.', note_en: 'Acid in ant and bee stings.' },
  { formula: 'HCHO', vi: 'Fomandehit (formol)', en: 'Formaldehyde', cat: 'organic', note_vi: 'Andehit đơn giản; dung dịch formol bảo quản.', note_en: 'Simplest aldehyde; formalin preserves specimens.' },
  { formula: 'CH3CHO', vi: 'Axetandehit', en: 'Acetaldehyde', cat: 'organic', note_vi: 'Sinh ra khi cơ thể chuyển hóa rượu.', note_en: 'Formed when the body metabolizes alcohol.' },
  { formula: 'CH3COOC2H5', vi: 'Etyl axetat', en: 'Ethyl acetate', cat: 'organic', note_vi: 'Este mùi thơm; dung môi sơn móng.', note_en: 'Fragrant ester; nail-polish solvent.' },
  { formula: 'C6H12O6', vi: 'Glucozơ', en: 'Glucose', cat: 'organic', note_vi: 'Đường đơn; nguồn năng lượng của tế bào.', note_en: 'Simple sugar; cellular energy source.' },
  { formula: 'C12H22O11', vi: 'Saccarozơ (đường mía)', en: 'Sucrose', cat: 'organic', note_vi: 'Đường đôi; đường ăn hằng ngày.', note_en: 'Disaccharide; common table sugar.' },
  { formula: '(C6H10O5)n', vi: 'Tinh bột / Xenlulozơ', en: 'Starch / Cellulose', cat: 'organic', note_vi: 'Polime của glucozơ; lương thực và chất xơ.', note_en: 'Glucose polymers; food and fiber.' },
  { formula: 'CH3NH2', vi: 'Metylamin', en: 'Methylamine', cat: 'organic', note_vi: 'Amin đơn giản; mùi tanh giống cá.', note_en: 'Simple amine; fishy odor.' },
  { formula: 'C6H5OH', vi: 'Phenol', en: 'Phenol', cat: 'organic', note_vi: 'Có tính axit yếu; sát trùng, làm nhựa.', note_en: 'Weakly acidic; antiseptic and resins.' },
  { formula: 'CH3COCH3', vi: 'Axeton', en: 'Acetone', cat: 'organic', note_vi: 'Xeton đơn giản; dung môi tẩy sơn móng.', note_en: 'Simplest ketone; nail-polish remover.' },

  // ---------- HÓA LÝ (phương trình) ----------
  { formula: 'PV = nRT', vi: 'Phương trình khí lý tưởng', en: 'Ideal gas law', cat: 'physical', note_vi: 'Liên hệ áp suất P, thể tích V, số mol n, nhiệt độ T.', note_en: 'Relates pressure, volume, moles and temperature.' },
  { formula: 'C = n / V', vi: 'Nồng độ mol', en: 'Molar concentration', cat: 'physical', note_vi: 'Số mol chất tan chia thể tích dung dịch (mol/L).', note_en: 'Moles of solute per liter of solution.' },
  { formula: 'pH = -log[H⁺]', vi: 'Độ pH', en: 'pH definition', cat: 'physical', note_vi: 'Đo độ axit/bazơ theo nồng độ ion H⁺.', note_en: 'Acidity based on H⁺ concentration.' },
  { formula: 'n = m / M', vi: 'Số mol theo khối lượng', en: 'Moles from mass', cat: 'physical', note_vi: 'Khối lượng chia khối lượng mol.', note_en: 'Mass divided by molar mass.' },
  { formula: 'Q = m·c·ΔT', vi: 'Nhiệt lượng', en: 'Heat energy', cat: 'physical', note_vi: 'Nhiệt = khối lượng × nhiệt dung riêng × biến thiên nhiệt độ.', note_en: 'Heat = mass × specific heat × temperature change.' },
  { formula: 'ΔG = ΔH − TΔS', vi: 'Năng lượng tự do Gibbs', en: 'Gibbs free energy', cat: 'physical', note_vi: 'ΔG < 0 thì phản ứng tự xảy ra.', note_en: 'Reaction is spontaneous when ΔG < 0.' },
];
