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
  // ===== CHỖ TÊN TIẾNG ANH LÀ TÊN THƯƠNG MẠI / TÊN KHOÁNG VẬT =====
  // Những chất này KHÔNG được lấy tên tiếng Anh làm tên IUPAC.
  'CaSO4.2H2O': 'Calcium sulfate dihydrate',
  CaOCl2: 'Calcium chloride hypochlorite',
  'KAl(SO4)2.12H2O': 'Potassium aluminium sulfate dodecahydrate',
  'C3H8O-iso': 'Propan-2-ol',
  C4H8: 'Butan-2-one',
  '(C6H11NO)n': 'Poly[imino(1-oxohexane-1,6-diyl)]',
  '(C12H22N2O2)n': 'Poly[imino(1,6-dioxohexane-1,6-diyl)iminohexane-1,6-diyl]',
  C16H18N2O4S:
    '(2S,5R,6R)-3,3-Dimethyl-7-oxo-6-(2-phenylacetamido)-4-thia-1-azabicyclo[3.2.0]heptane-2-carboxylic acid',
  C14H18N2O5: 'Methyl L-alpha-aspartyl-L-phenylalaninate',
  C17H19NO3:
    '(4R,4aR,7S,7aR,12bS)-3-Methyl-2,4,4a,7,7a,13-hexahydro-1H-4,12-methanobenzofuro[3,2-e]isoquinoline-7,9-diol',

  // ===== AMINO AXIT CÒN LẠI (cho đủ bộ, dạng L) =====
  C3H7NO2S: '(2R)-2-Amino-3-sulfanylpropanoic acid',
  C9H11NO2: '(2S)-2-Amino-3-phenylpropanoic acid',
  C5H11NO2S: '(2S)-2-Amino-4-(methylsulfanyl)butanoic acid',
  C11H12N2O2: '(2S)-2-Amino-3-(1H-indol-3-yl)propanoic acid',
  C9H11NO3: '(2S)-2-Amino-3-(4-hydroxyphenyl)propanoic acid',
  C5H9NO2: '(2S)-Pyrrolidine-2-carboxylic acid',
  C6H14N4O2: '(2S)-2-Amino-5-carbamimidamidopentanoic acid',
  C5H5N5O: '2-Amino-1,7-dihydro-6H-purin-6-one',

  // ===== ĐƯỜNG: tên IUPAC ghi rõ dạng vòng và cấu hình =====
  // Đây chính là dạng đã đối chiếu InChI với PubChem ở scripts/references.mjs,
  // nên tên và hình vẽ trong app luôn nói cùng một chuyện.
  C6H12O6: 'alpha-D-Glucopyranose',
  'C6H12O6-fru': 'beta-D-Fructofuranose',
  'C6H12O6-gal': 'alpha-D-Galactopyranose',
  C5H10O5: 'beta-D-Ribofuranose',
  C5H10O4: '2-Deoxy-beta-D-ribofuranose',
  C12H22O11: 'beta-D-Fructofuranosyl alpha-D-glucopyranoside',
  'C12H22O11-mal': '4-O-(alpha-D-Glucopyranosyl)-beta-D-glucopyranose',
  'C12H22O11-lac': '4-O-(beta-D-Galactopyranosyl)-beta-D-glucopyranose',
  // Xenlulozơ là polime XÁC ĐỊNH: mắt xích glucozơ nối β-1,4 đều đặn, nên gọi
  // tên hệ thống được. Tinh bột thì không — nó là hỗn hợp amilozơ và
  // amilopectin, xem KHONG_LAY_TEN_ANH bên dưới.
  '(C6H10O5)n-xenlulozo': 'Poly[beta-(1->4)-D-glucopyranose]',
  C6H14O6: 'D-Glucitol',
  C5H12O5: '(2R,3r,4S)-Pentane-1,2,3,4,5-pentol',
};

/**
 * Chất mà tên tiếng Anh KHÔNG phải tên IUPAC và cũng chưa có tên IUPAC gọn để
 * ghi. Phải liệt kê ra để không bị lấy nhầm tên tiếng Anh làm tên IUPAC.
 *
 * TINH BỘT: không phải một chất mà là HỖN HỢP amilozơ (mạch thẳng) và
 * amilopectin (mạch nhánh, có thêm nối α-1,6). Hỗn hợp thì không có tên hệ
 * thống nào đúng cho cả hai thành phần, nên để trống là trung thực nhất.
 *
 * Xenlulozơ thì ngược lại — một polime xác định, nối β-1,4 đều đặn — nên có
 * tên hệ thống hẳn hoi, ghi ở bảng IUPAC bên trên.
 */
const KHONG_LAY_TEN_ANH = new Set(['(C6H10O5)n-tinhbot']);

/**
 * Tên IUPAC của một chất.
 *
 * Phần lớn chất trong kho có TÊN TIẾNG ANH chính là tên IUPAC (nước là Water,
 * oxy già là Hydrogen peroxide…), nên chỉ cần lấy luôn. Bảng IUPAC ở trên chỉ
 * để ĐÈ LÊN những chỗ tên tiếng Anh là tên thường hay tên thương mại —
 * "Acetone" phải thành "Propan-2-one", "Aspirin" thành tên hệ thống.
 *
 * Nhờ vậy người đọc giao diện tiếng Việt luôn thấy được tên IUPAC, chứ không
 * chỉ thấy ở 111 chất được ghi tay.
 */
export function iupacOf(key: string, tenTiengAnh?: string): string | undefined {
  const rieng = IUPAC[key];
  if (rieng) return rieng;
  if (KHONG_LAY_TEN_ANH.has(key)) return undefined;
  return tenTiengAnh || undefined;
}

/**
 * Tên IUPAC để HIỂN THỊ, hoặc null nếu trùng đúng tên đang hiện.
 * Ở giao diện tiếng Anh, phần lớn chất sẽ trùng nên dòng này tự ẩn; ở giao
 * diện tiếng Việt thì gần như luôn hiện.
 */
export function iupacKhacTen(
  key: string,
  tenDangHien: string,
  tenTiengAnh?: string,
): string | null {
  const ten = iupacOf(key, tenTiengAnh);
  if (!ten) return null;
  return ten === tenDangHien ? null : ten;
}
