// Danh pháp IUPAC — tên gọi theo hệ thống quốc tế.
//
// VÌ SAO CẦN: rất nhiều chất quen được gọi bằng TÊN THƯỜNG, đặt theo nguồn gốc
// hay tính chất chứ không theo cấu tạo — "axit fomic" lấy từ tiếng Latinh
// formica là con kiến, "axeton" từ acetum là giấm. Tên thường không cho biết
// phân tử có mấy cacbon, nhóm chức ở vị trí nào. Tên IUPAC thì đọc ra là dựng
// lại được công thức, và đây mới là tên học sinh bị hỏi trong bài kiểm tra.
//
// VÌ SAO KHÔNG VIỆT HÓA: danh pháp IUPAC là chuẩn quốc tế, chỉ có MỘT cách
// viết. Việt hóa thành "axit etanoic" thì mỗi sách phiên âm một kiểu, tra cứu
// tài liệu nước ngoài lại không khớp. Giao diện tiếng Việt vẫn hiện nguyên
// dạng tiếng Anh — tên thường tiếng Việt đã nằm ngay bên trên rồi.
//
// CHỈ GHI KHI KHÁC tên đang dùng. Methane, ethanol, phenol, benzene… vốn đã là
// tên IUPAC nên không lặp lại ở đây cho khỏi rườm.
//
// Khóa tra là keyOf(chất) — tức id nếu có, không thì lấy chính công thức.

export const IUPAC: Record<string, string> = {

  // ===== ĐƠN CHẤT =====
  // Tên hệ thống ghi rõ số nguyên tử trong một phân tử: khí oxi ta thở là
  // phân tử hai nguyên tử, khác hẳn ozon ba nguyên tử tuy cùng là oxi.
  H2: 'Dihydrogen',
  O2: 'Dioxygen',
  O3: 'Trioxygen',
  N2: 'Dinitrogen',
  F2: 'Difluorine',
  Cl2: 'Dichlorine',
  Br2: 'Dibromine',
  I2: 'Diiodine',
  P4: 'Tetraphosphorus',
  S8: 'Octasulfur (cyclo-S8)',

  // ===== VÔ CƠ: chỗ đang dùng tên truyền thống =====
  NO: 'Nitrogen monoxide',
  N2O: 'Dinitrogen monoxide',
  P4O10: 'Diphosphorus pentaoxide',
  V2O5: 'Divanadium pentaoxide',
  MnO2: 'Manganese(IV) oxide',
  TiO2: 'Titanium(IV) oxide',
  CrO3: 'Chromium(VI) oxide',
  HF: 'Hydrogen fluoride',
  HCl: 'Hydrogen chloride',
  HBr: 'Hydrogen bromide',
  HI: 'Hydrogen iodide',
  HCN: 'Hydrogen cyanide',

  // ===== HIĐROCACBON =====
  C2H4: 'Ethene',
  'C3H6-propene': 'Propene',
  C2H2: 'Ethyne',
  C5H8: '2-Methylbuta-1,3-diene',
  C7H8: 'Methylbenzene',
  C8H10: '1,2-Dimethylbenzene',
  C8H8: 'Ethenylbenzene',
  C7H5N3O6: '2,4,6-Trinitrotoluene',

  // ===== ANCOL, ETE =====
  C2H6O2: 'Ethane-1,2-diol',
  C3H8O3: 'Propane-1,2,3-triol',
  C7H8O: 'Phenylmethanol',
  C10H20O: '2-Isopropyl-5-methylcyclohexan-1-ol',
  C4H10O: 'Ethoxyethane',
  'C4H8O-thf': 'Oxolane',

  // ===== ANĐEHIT, XETON =====
  HCHO: 'Methanal',
  CH3CHO: 'Ethanal',
  C8H8O3: '4-Hydroxy-3-methoxybenzaldehyde',
  CH3COCH3: 'Propan-2-one',

  // ===== AXIT CACBOXYLIC =====
  HCOOH: 'Methanoic acid',
  CH3COOH: 'Ethanoic acid',
  C2H5COOH: 'Propanoic acid',
  C3H7COOH: 'Butanoic acid',
  C15H31COOH: 'Hexadecanoic acid',
  C17H35COOH: 'Octadecanoic acid',
  C17H33COOH: '(9Z)-Octadec-9-enoic acid',
  C17H31COOH: '(9Z,12Z)-Octadeca-9,12-dienoic acid',
  C7H6O3: '2-Hydroxybenzoic acid',
  H2C2O4: 'Ethanedioic acid',
  C4H6O4: 'Butanedioic acid',
  C6H10O4: 'Hexanedioic acid',
  C3H4O2: 'Prop-2-enoic acid',
  C6H8O7: '2-Hydroxypropane-1,2,3-tricarboxylic acid',
  C3H6O3: '(2S)-2-Hydroxypropanoic acid',
  C4H6O6: '(2R,3R)-2,3-Dihydroxybutanedioic acid',
  C4H6O5: '(2S)-2-Hydroxybutanedioic acid',

  // ===== ESTE =====
  HCOOCH3: 'Methyl methanoate',
  CH3COOCH3: 'Methyl ethanoate',
  CH3COOC2H5: 'Ethyl ethanoate',
  C7H14O2: '3-Methylbutyl ethanoate',
  C9H10O2: 'Benzyl ethanoate',
  C6H12O2: 'Ethyl butanoate',
  C5H8O2: 'Methyl 2-methylprop-2-enoate',
  C9H8O4: '2-(Acetyloxy)benzoic acid',
  C57H110O6: 'Propane-1,2,3-triyl trioctadecanoate',
  C57H104O6: 'Propane-1,2,3-triyl tri[(9Z)-octadec-9-enoate]',
  C3H5N3O9: 'Propane-1,2,3-triyl trinitrate',

  // ===== AMIN, HỢP CHẤT NITƠ =====
  'C2H7N-dime': 'N-Methylmethanamine',
  CH3NH2: 'Methanamine',
  C2H7N: 'Ethanamine',
  C6H5NH2: 'Phenylamine',
  'CO(NH2)2': 'Carbamide',
  C2H8N2: 'Ethane-1,2-diamine',
  C3H6N6: '1,3,5-Triazine-2,4,6-triamine',

  // ===== AMINO AXIT (dạng L, tên hệ thống) =====
  C2H5NO2: '2-Aminoethanoic acid',
  C3H7NO2: '(2S)-2-Aminopropanoic acid',
  C5H11NO2: '(2S)-2-Amino-3-methylbutanoic acid',
  C6H13NO2: '(2S)-2-Amino-4-methylpentanoic acid',
  C3H7NO3: '(2S)-2-Amino-3-hydroxypropanoic acid',
  C5H9NO4: '(2S)-2-Aminopentanedioic acid',
  C4H7NO4: '(2S)-2-Aminobutanedioic acid',
  C6H14N2O2: '(2S)-2,6-Diaminohexanoic acid',

  // ===== DẪN XUẤT HALOGEN =====
  CH3Cl: 'Chloromethane',
  CHCl3: 'Trichloromethane',
  CCl4: 'Tetrachloromethane',
  C2H3Cl: 'Chloroethene',
  CCl2F2: 'Dichlorodifluoromethane',
  C14H9Cl5: '1,1,1-Trichloro-2,2-bis(4-chlorophenyl)ethane',

  // ===== POLIME (gọi theo mắt xích) =====
  '(C2H4)n': 'Poly(ethene)',
  '(C3H6)n': 'Poly(propene)',
  '(C2H3Cl)n': 'Poly(chloroethene)',
  '(C8H8)n': 'Poly(ethenylbenzene)',
  '(C2F4)n': 'Poly(tetrafluoroethene)',
  '(C5H8O2)n': 'Poly(methyl 2-methylprop-2-enoate)',
  '(C4H6)n': 'Poly(buta-1,3-diene)',
  '(C5H8)n': 'Poly(2-methylbuta-1,3-diene)',
  '(C10H8O4)n': 'Poly(ethylene terephthalate)',

  // ===== CHẤT KHÁC HAY GẶP =====
  C2H6OS: 'Methylsulfinylmethane',
  C6H8O6: 'L-Ascorbic acid',
  C8H10N4O2: '1,3,7-Trimethylpurine-2,6-dione',
  C8H9NO2: 'N-(4-Hydroxyphenyl)acetamide',
  C10H14N2: '3-[(2S)-1-Methylpyrrolidin-2-yl]pyridine',
  C9H13NO3: '4-[(1R)-1-Hydroxy-2-(methylamino)ethyl]benzene-1,2-diol',
  C8H11NO2: '4-(2-Aminoethyl)benzene-1,2-diol',
  C10H12N2O: '3-(2-Aminoethyl)-1H-indol-5-ol',
  C7H5NO3S: '1,1-Dioxo-1,2-benzothiazol-3-one',
  C5H5N5: '7H-Purin-6-amine',
  C4H4N2O2: 'Pyrimidine-2,4(1H,3H)-dione',
  C5H6N2O2: '5-Methylpyrimidine-2,4(1H,3H)-dione',
  C4H5N3O: '4-Aminopyrimidin-2(1H)-one',
};

/** Tên IUPAC của một chất theo khóa tra, hoặc undefined nếu chưa ghi. */
export const iupacOf = (key: string): string | undefined => IUPAC[key];

/**
 * Tên IUPAC để HIỂN THỊ, hoặc null nếu trùng đúng tên đang hiện.
 * Vài chất vốn đã mang tên IUPAC ở phần tên tiếng Anh (vd CH3Cl là
 * "Chloromethane"); lúc đó hiện lại y nguyên chỉ tổ rườm mắt.
 */
export function iupacKhacTen(key: string, tenDangHien: string): string | null {
  const ten = IUPAC[key];
  if (!ten) return null;
  return ten === tenDangHien ? null : ten;
}
