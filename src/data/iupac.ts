// Danh pháp IUPAC — tên gọi theo hệ thống quốc tế.
//
// VÌ SAO CẦN: rất nhiều chất quen được gọi bằng TÊN THƯỜNG, đặt theo nguồn gốc
// hay tính chất chứ không theo cấu tạo — "axit fomic" lấy từ tiếng Latinh
// formica là con kiến, "axeton" từ acetum là giấm. Tên thường không cho biết
// phân tử có mấy cacbon, nhóm chức ở vị trí nào. Tên IUPAC thì đọc ra là dựng
// lại được công thức, và đây mới là tên học sinh bị hỏi trong bài kiểm tra.
//
// CHỈ GHI KHI KHÁC tên đang dùng. Metan, etanol, phenol, benzen… vốn đã là tên
// IUPAC nên không lặp lại ở đây cho khỏi rườm.
//
// Khóa tra là keyOf(chất) — tức id nếu có, không thì lấy chính công thức.

export interface IupacName {
  vi: string;
  en: string;
}

export const IUPAC: Record<string, IupacName> = {
  // ===== ĐƠN CHẤT =====
  // Tên hệ thống ghi rõ số nguyên tử trong một phân tử: khí oxi ta thở là
  // phân tử hai nguyên tử, khác hẳn ozon ba nguyên tử tuy cùng là oxi.
  H2: { vi: 'Đihiđro', en: 'Dihydrogen' },
  O2: { vi: 'Đioxi', en: 'Dioxygen' },
  O3: { vi: 'Trioxi', en: 'Trioxygen' },
  N2: { vi: 'Đinitơ', en: 'Dinitrogen' },
  F2: { vi: 'Điflo', en: 'Difluorine' },
  Cl2: { vi: 'Điclo', en: 'Dichlorine' },
  Br2: { vi: 'Đibrom', en: 'Dibromine' },
  I2: { vi: 'Điiot', en: 'Diiodine' },
  P4: { vi: 'Tetraphotpho', en: 'Tetraphosphorus' },
  S8: { vi: 'Octalưu huỳnh (vòng S8)', en: 'Octasulfur (cyclo-S8)' },

  // ===== VÔ CƠ: chỗ đang dùng tên truyền thống =====
  NO: { vi: 'Nitơ monoxit', en: 'Nitrogen monoxide' },
  N2O: { vi: 'Đinitơ monoxit', en: 'Dinitrogen monoxide' },
  P4O10: { vi: 'Điphotpho pentaoxit', en: 'Diphosphorus pentaoxide' },
  V2O5: { vi: 'Đivanađi pentaoxit', en: 'Divanadium pentaoxide' },
  MnO2: { vi: 'Mangan(IV) oxit', en: 'Manganese(IV) oxide' },
  TiO2: { vi: 'Titan(IV) oxit', en: 'Titanium(IV) oxide' },
  CrO3: { vi: 'Crom(VI) oxit', en: 'Chromium(VI) oxide' },
  HF: { vi: 'Hiđro florua', en: 'Hydrogen fluoride' },
  HCl: { vi: 'Hiđro clorua', en: 'Hydrogen chloride' },
  HBr: { vi: 'Hiđro bromua', en: 'Hydrogen bromide' },
  HI: { vi: 'Hiđro iotua', en: 'Hydrogen iodide' },
  HCN: { vi: 'Hiđro xianua', en: 'Hydrogen cyanide' },

  // ===== HIĐROCACBON =====
  C2H4: { vi: 'Eten', en: 'Ethene' },
  'C3H6-propene': { vi: 'Propen', en: 'Propene' },
  C2H2: { vi: 'Etin', en: 'Ethyne' },
  C5H8: { vi: '2-Metylbuta-1,3-đien', en: '2-Methylbuta-1,3-diene' },
  C7H8: { vi: 'Metylbenzen', en: 'Methylbenzene' },
  C8H10: { vi: '1,2-Đimetylbenzen', en: '1,2-Dimethylbenzene' },
  C8H8: { vi: 'Vinylbenzen', en: 'Ethenylbenzene' },
  C7H5N3O6: { vi: '2,4,6-Trinitrotoluen', en: '2,4,6-Trinitrotoluene' },

  // ===== ANCOL, ETE =====
  C2H6O2: { vi: 'Etan-1,2-điol', en: 'Ethane-1,2-diol' },
  C3H8O3: { vi: 'Propan-1,2,3-triol', en: 'Propane-1,2,3-triol' },
  C7H8O: { vi: 'Phenylmetanol', en: 'Phenylmethanol' },
  C10H20O: { vi: '2-Isopropyl-5-metylxiclohexan-1-ol', en: '2-Isopropyl-5-methylcyclohexan-1-ol' },
  C4H10O: { vi: 'Etoxyetan', en: 'Ethoxyethane' },
  'C4H8O-thf': { vi: 'Oxolan', en: 'Oxolane' },

  // ===== ANĐEHIT, XETON =====
  HCHO: { vi: 'Metanal', en: 'Methanal' },
  CH3CHO: { vi: 'Etanal', en: 'Ethanal' },
  C8H8O3: { vi: '4-Hiđroxi-3-metoxibenzanđehit', en: '4-Hydroxy-3-methoxybenzaldehyde' },
  CH3COCH3: { vi: 'Propan-2-on', en: 'Propan-2-one' },

  // ===== AXIT CACBOXYLIC =====
  HCOOH: { vi: 'Axit metanoic', en: 'Methanoic acid' },
  CH3COOH: { vi: 'Axit etanoic', en: 'Ethanoic acid' },
  C2H5COOH: { vi: 'Axit propanoic', en: 'Propanoic acid' },
  C3H7COOH: { vi: 'Axit butanoic', en: 'Butanoic acid' },
  C15H31COOH: { vi: 'Axit hexađecanoic', en: 'Hexadecanoic acid' },
  C17H35COOH: { vi: 'Axit octađecanoic', en: 'Octadecanoic acid' },
  C17H33COOH: { vi: 'Axit (9Z)-octađec-9-enoic', en: '(9Z)-Octadec-9-enoic acid' },
  C17H31COOH: { vi: 'Axit (9Z,12Z)-octađeca-9,12-đienoic', en: '(9Z,12Z)-Octadeca-9,12-dienoic acid' },
  C7H6O3: { vi: 'Axit 2-hiđroxibenzoic', en: '2-Hydroxybenzoic acid' },
  H2C2O4: { vi: 'Axit etanđioic', en: 'Ethanedioic acid' },
  C4H6O4: { vi: 'Axit butanđioic', en: 'Butanedioic acid' },
  C6H10O4: { vi: 'Axit hexanđioic', en: 'Hexanedioic acid' },
  C3H4O2: { vi: 'Axit prop-2-enoic', en: 'Prop-2-enoic acid' },
  C6H8O7: { vi: 'Axit 2-hiđroxipropan-1,2,3-tricacboxylic', en: '2-Hydroxypropane-1,2,3-tricarboxylic acid' },
  C3H6O3: { vi: 'Axit (2S)-2-hiđroxipropanoic', en: '(2S)-2-Hydroxypropanoic acid' },
  C4H6O6: { vi: 'Axit (2R,3R)-2,3-đihiđroxibutanđioic', en: '(2R,3R)-2,3-Dihydroxybutanedioic acid' },
  C4H6O5: { vi: 'Axit (2S)-2-hiđroxibutanđioic', en: '(2S)-2-Hydroxybutanedioic acid' },

  // ===== ESTE =====
  HCOOCH3: { vi: 'Metyl metanoat', en: 'Methyl methanoate' },
  CH3COOCH3: { vi: 'Metyl etanoat', en: 'Methyl ethanoate' },
  CH3COOC2H5: { vi: 'Etyl etanoat', en: 'Ethyl ethanoate' },
  C7H14O2: { vi: '3-Metylbutyl etanoat', en: '3-Methylbutyl ethanoate' },
  C9H10O2: { vi: 'Benzyl etanoat', en: 'Benzyl ethanoate' },
  C6H12O2: { vi: 'Etyl butanoat', en: 'Ethyl butanoate' },
  C5H8O2: { vi: 'Metyl 2-metylprop-2-enoat', en: 'Methyl 2-methylprop-2-enoate' },
  C9H8O4: { vi: 'Axit 2-(axetyloxy)benzoic', en: '2-(Acetyloxy)benzoic acid' },
  C57H110O6: { vi: 'Propan-1,2,3-triyl trioctađecanoat', en: 'Propane-1,2,3-triyl trioctadecanoate' },
  C57H104O6: { vi: 'Propan-1,2,3-triyl tri[(9Z)-octađec-9-enoat]', en: 'Propane-1,2,3-triyl tri[(9Z)-octadec-9-enoate]' },
  C3H5N3O9: { vi: 'Propan-1,2,3-triyl trinitrat', en: 'Propane-1,2,3-triyl trinitrate' },

  // ===== AMIN, HỢP CHẤT NITƠ =====
  'C2H7N-dime': { vi: 'N-Metylmetanamin', en: 'N-Methylmethanamine' },
  CH3NH2: { vi: 'Metanamin', en: 'Methanamine' },
  C2H7N: { vi: 'Etanamin', en: 'Ethanamine' },
  C6H5NH2: { vi: 'Phenylamin', en: 'Phenylamine' },
  'CO(NH2)2': { vi: 'Cacbamit', en: 'Carbamide' },
  C2H8N2: { vi: 'Etan-1,2-điamin', en: 'Ethane-1,2-diamine' },
  C3H6N6: { vi: '1,3,5-Triazin-2,4,6-triamin', en: '1,3,5-Triazine-2,4,6-triamine' },

  // ===== AMINO AXIT (dạng L, tên hệ thống) =====
  C2H5NO2: { vi: 'Axit 2-aminoetanoic', en: '2-Aminoethanoic acid' },
  C3H7NO2: { vi: 'Axit (2S)-2-aminopropanoic', en: '(2S)-2-Aminopropanoic acid' },
  C5H11NO2: { vi: 'Axit (2S)-2-amino-3-metylbutanoic', en: '(2S)-2-Amino-3-methylbutanoic acid' },
  C6H13NO2: { vi: 'Axit (2S)-2-amino-4-metylpentanoic', en: '(2S)-2-Amino-4-methylpentanoic acid' },
  C3H7NO3: { vi: 'Axit (2S)-2-amino-3-hiđroxipropanoic', en: '(2S)-2-Amino-3-hydroxypropanoic acid' },
  C5H9NO4: { vi: 'Axit (2S)-2-aminopentanđioic', en: '(2S)-2-Aminopentanedioic acid' },
  C4H7NO4: { vi: 'Axit (2S)-2-aminobutanđioic', en: '(2S)-2-Aminobutanedioic acid' },
  C6H14N2O2: { vi: 'Axit (2S)-2,6-điaminohexanoic', en: '(2S)-2,6-Diaminohexanoic acid' },

  // ===== DẪN XUẤT HALOGEN =====
  CH3Cl: { vi: 'Clometan', en: 'Chloromethane' },
  CHCl3: { vi: 'Triclometan', en: 'Trichloromethane' },
  CCl4: { vi: 'Tetraclometan', en: 'Tetrachloromethane' },
  C2H3Cl: { vi: 'Cloeten', en: 'Chloroethene' },
  CCl2F2: { vi: 'Điclođiflometan', en: 'Dichlorodifluoromethane' },
  C14H9Cl5: {
    vi: '1,1,1-Triclo-2,2-bis(4-clophenyl)etan',
    en: '1,1,1-Trichloro-2,2-bis(4-chlorophenyl)ethane',
  },

  // ===== POLIME (gọi theo mắt xích) =====
  '(C2H4)n': { vi: 'Polieten', en: 'Poly(ethene)' },
  '(C3H6)n': { vi: 'Polipropen', en: 'Poly(propene)' },
  '(C2H3Cl)n': { vi: 'Poli(cloeten)', en: 'Poly(chloroethene)' },
  '(C8H8)n': { vi: 'Poli(vinylbenzen)', en: 'Poly(ethenylbenzene)' },
  '(C2F4)n': { vi: 'Poli(tetrafloeten)', en: 'Poly(tetrafluoroethene)' },
  '(C5H8O2)n': { vi: 'Poli(metyl 2-metylprop-2-enoat)', en: 'Poly(methyl 2-methylprop-2-enoate)' },
  '(C4H6)n': { vi: 'Poli(buta-1,3-đien)', en: 'Poly(buta-1,3-diene)' },
  '(C5H8)n': { vi: 'Poli(2-metylbuta-1,3-đien)', en: 'Poly(2-methylbuta-1,3-diene)' },
  '(C10H8O4)n': { vi: 'Poli(etylen terephtalat)', en: 'Poly(ethylene terephthalate)' },

  // ===== CHẤT KHÁC HAY GẶP =====
  C2H6OS: { vi: 'Metylsunfinylmetan', en: 'Methylsulfinylmethane' },
  C6H8O6: { vi: 'Axit L-ascorbic', en: 'L-Ascorbic acid' },
  C8H10N4O2: { vi: '1,3,7-Trimetylpurin-2,6-đion', en: '1,3,7-Trimethylpurine-2,6-dione' },
  C8H9NO2: { vi: 'N-(4-Hiđroxiphenyl)axetamit', en: 'N-(4-Hydroxyphenyl)acetamide' },
  C10H14N2: { vi: '3-[(2S)-1-Metylpirolidin-2-yl]piriđin', en: '3-[(2S)-1-Methylpyrrolidin-2-yl]pyridine' },
  C9H13NO3: {
    vi: '4-[(1R)-1-Hiđroxi-2-(metylamino)etyl]benzen-1,2-điol',
    en: '4-[(1R)-1-Hydroxy-2-(methylamino)ethyl]benzene-1,2-diol',
  },
  C8H11NO2: { vi: '4-(2-Aminoetyl)benzen-1,2-điol', en: '4-(2-Aminoethyl)benzene-1,2-diol' },
  C10H12N2O: { vi: '3-(2-Aminoetyl)-1H-inđol-5-ol', en: '3-(2-Aminoethyl)-1H-indol-5-ol' },
  C7H5NO3S: { vi: '1,1-Đioxo-1,2-benzothiazol-3-on', en: '1,1-Dioxo-1,2-benzothiazol-3-one' },
  C5H5N5: { vi: '7H-Purin-6-amin', en: '7H-Purin-6-amine' },
  C4H4N2O2: { vi: 'Pirimiđin-2,4(1H,3H)-đion', en: 'Pyrimidine-2,4(1H,3H)-dione' },
  C5H6N2O2: { vi: '5-Metylpirimiđin-2,4(1H,3H)-đion', en: '5-Methylpyrimidine-2,4(1H,3H)-dione' },
  C4H5N3O: { vi: '4-Aminopirimiđin-2(1H)-on', en: '4-Aminopyrimidin-2(1H)-one' },
};

/** Tên IUPAC của một chất theo khóa tra, hoặc undefined nếu chưa ghi. */
export const iupacOf = (key: string): IupacName | undefined => IUPAC[key];

/**
 * Tên IUPAC để HIỂN THỊ, hoặc null nếu trùng đúng tên đang hiện.
 * Vài chất đã được gọi bằng tên IUPAC sẵn ở một thứ tiếng (vd NO tiếng Việt
 * vốn là "Nitơ monoxit"); lúc đó hiện lại y nguyên chỉ tổ rườm mắt.
 */
export function iupacKhacTen(
  key: string,
  tenDangHien: string,
  lang: 'vi' | 'en',
): string | null {
  const t = IUPAC[key];
  if (!t) return null;
  const ten = lang === 'vi' ? t.vi : t.en;
  return ten === tenDangHien ? null : ten;
}
