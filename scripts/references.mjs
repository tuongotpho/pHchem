// BẢNG ĐỐI CHỨNG CẤU TẠO — viết tay LẦN THỨ HAI, theo cách khác với smiles.json.
//
// Ý tưởng: cùng một phân tử, viết bằng hai chuỗi SMILES khác nhau (khác nguyên tử
// bắt đầu, khác thứ tự nhánh). Nếu cả hai quy về cùng một mã InChI thì gần như
// chắc chắn cả hai đều đúng; nếu lệch nhau thì có ít nhất một cái sai — phải soi.
// Giống lối ghi sổ kép: một nghiệp vụ ghi hai lần, lệch là biết có lỗi.
//
// Phép so CHỈ xét CẤU TẠO (nguyên tử nào nối nguyên tử nào), BỎ QUA lập thể —
// lập thể do các phép kiểm riêng ở gen-structures.mjs lo.
//
// Chỉ cần liệt kê chất nào CÓ THỂ viết sai, tức là có đồng phân. Những chất mà
// công thức chỉ ứng với đúng một cấu tạo (CH4, H2O, NaCl…) không cần đối chứng.

export const REFERENCES = {
  // --- Hiđrocacbon ---
  'C4H10': 'C(C)CC',
  'C5H12': 'C(C)CCC',
  'C6H14': 'C(C)CCCC',
  'C7H16': 'C(C)CCCCC',
  'C8H18': 'C(C)CCCCCC',
  'C6H12': 'C1CCCCC1',
  'C3H6-cyclo': 'C1CC1',
  'C3H6-propene': 'C(=C)C',
  'C4H8': 'C(=C)CC',
  'C4H6': 'C(=C)C=C',
  'C5H8': 'C=C(C)C=C',
  'C3H4': 'C(#C)C',

  // --- Thơm ---
  'C7H8': 'c1ccccc1C',
  'C8H10': 'c1cc(C)c(C)cc1',
  'C8H8': 'c1ccccc1C=C',
  'C10H8': 'C1=CC=C2C=CC=CC2=C1',
  'C14H10': 'C1=CC=C2C=C3C=CC=CC3=CC2=C1',
  'C6H5NO2': 'O=[N+]([O-])c1ccccc1',
  'C7H5N3O6': 'Cc1c([N+]([O-])=O)cc([N+]([O-])=O)cc1[N+]([O-])=O',

  // --- Ancol, phenol ---
  'C3H7OH': 'C(O)CC',
  'C3H8O-iso': 'C(C)(C)O',
  'C4H9OH': 'C(O)CCC',
  'C2H6O2': 'C(O)CO',
  'C3H8O3': 'C(O)C(O)CO',
  'C6H5OH': 'c1ccccc1O',
  'C7H8O': 'c1ccccc1CO',
  'C10H20O': 'CC1CCC(C(C)C)C(O)C1',

  // --- Ete, anđehit, xeton ---
  'C4H10O': 'C(C)OCC',
  'C4H8O-thf': 'C1OCCC1',
  'CH3CHO': 'C(C)=O',
  'C2H5CHO': 'C(CC)=O',
  'C7H6O': 'c1ccccc1C=O',
  'C8H8O3': 'O=Cc1ccc(O)c(OC)c1',
  'CH3COCH3': 'C(C)(C)=O',
  'C4H8O': 'C(C)(=O)CC',
  'C6H10O': 'C1CCC(=O)CC1',

  // --- Axit cacboxylic ---
  'C2H5COOH': 'C(CC)(O)=O',
  'C3H7COOH': 'C(CCC)(O)=O',
  'C6H5COOH': 'c1ccccc1C(O)=O',
  'C7H6O3': 'Oc1ccccc1C(O)=O',
  'H2C2O4': 'OC(=O)C(O)=O',
  'C4H6O4': 'C(CC(O)=O)C(O)=O',
  'C6H8O7': 'OC(CC(O)=O)(CC(O)=O)C(O)=O',
  'C6H10O4': 'C(CCC(O)=O)CC(O)=O',
  'C3H4O2': 'C=CC(O)=O',
  'C15H31COOH': 'CCCCCCCCCCCCCCCC(O)=O',
  'C17H35COOH': 'CCCCCCCCCCCCCCCCCC(O)=O',
  "C17H33COOH": "OC(=O)CCCCCCC/C=C\\CCCCCCCC",
  "C17H31COOH": "OC(=O)CCCCCCC/C=C\\C/C=C\\CCCCC",
  'C3H6O3': 'C(C)(O)C(O)=O',
  'C4H6O6': 'OC(=O)C(O)C(O)C(O)=O',
  'C4H6O5': 'OC(=O)CC(O)C(O)=O',

  // --- Este ---
  'HCOOCH3': 'O=COC',
  'CH3COOCH3': 'O=C(C)OC',
  'CH3COOC2H5': 'O=C(C)OCC',
  'C7H14O2': 'O=C(C)OCCC(C)C',
  'C9H10O2': 'O=C(C)OCc1ccccc1',
  'C6H12O2': 'O=C(CCC)OCC',
  'C5H8O2': 'C=C(C)C(=O)OC',
  'C9H8O4': 'O=C(O)c1ccccc1OC(C)=O',
  'C3H5N3O9': 'O=[N+]([O-])OCC(CO[N+]([O-])=O)O[N+]([O-])=O',

  // --- Amin, hợp chất nitơ ---
  'CH3NH2': 'NC',
  'C2H7N': 'NCC',
  'C2H7N-dime': 'CNC',
  'C6H5NH2': 'c1ccccc1N',
  'CO(NH2)2': 'O=C(N)N',
  'C2H8N2': 'NCCN',
  'C3H6N6': 'NC1=NC(N)=NC(N)=N1',
  'C14H18N2O5': 'O=C(OC)C(Cc1ccccc1)NC(=O)C(N)CC(O)=O',

  // --- Amino axit (cấu tạo; lập thể do phép kiểm luật L lo) ---
  'C2H5NO2': 'C(N)C(O)=O',
  'C3H7NO2': 'CC(N)C(O)=O',
  'C5H11NO2': 'CC(C)C(N)C(O)=O',
  'C6H13NO2': 'CC(C)CC(N)C(O)=O',
  'C3H7NO3': 'OCC(N)C(O)=O',
  'C3H7NO2S': 'SCC(N)C(O)=O',
  'C9H11NO2': 'c1ccccc1CC(N)C(O)=O',
  'C6H14N2O2': 'NCCCCC(N)C(O)=O',
  'C5H9NO4': 'OC(=O)CCC(N)C(O)=O',
  'C4H7NO4': 'OC(=O)CC(N)C(O)=O',
  'C5H11NO2S': 'CSCCC(N)C(O)=O',
  'C11H12N2O2': 'OC(=O)C(N)Cc1c[nH]c2ccccc12',
  'C9H11NO3': 'OC(=O)C(N)Cc1ccc(O)cc1',
  'C5H9NO2': 'C1CC(C(O)=O)NC1',
  'C6H14N4O2': 'NC(=N)NCCCC(N)C(O)=O',

  // --- Cacbohiđrat (cấu tạo; lập thể do bảng R/S lo) ---
  'C6H12O6': 'OCC1OC(O)C(O)C(O)C1O',
  'C6H12O6-fru': 'OCC1OC(O)(CO)C(O)C1O',
  'C6H12O6-gal': 'OCC1OC(O)C(O)C(O)C1O',
  'C5H10O5': 'OCC1OC(O)C(O)C1O',
  'C5H10O4': 'OCC1OC(O)CC1O',
  'C6H14O6': 'OCC(O)C(O)C(O)C(O)CO',
  // Saccarozơ: vòng glucozơ 6 cạnh nối qua oxi sang vòng fructozơ 5 cạnh
  'C12H22O11': 'OCC1OC(OC2(CO)OC(CO)C(O)C2O)C(O)C(O)C1O',
  'C5H12O5': 'OCC(O)C(O)C(O)CO',

  // --- Dẫn xuất halogen ---
  'CH2Cl2': 'C(Cl)Cl',
  'CHCl3': 'C(Cl)(Cl)Cl',
  'CCl4': 'C(Cl)(Cl)(Cl)Cl',
  'C2H3Cl': 'C(=C)Cl',
  'CCl2F2': 'ClC(Cl)(F)F',
  'C14H9Cl5': 'ClC(Cl)(Cl)C(c1ccc(Cl)cc1)c1ccc(Cl)cc1',

  // --- Sinh học, dược ---
  'C6H8O6': 'OCC(O)C1OC(=O)C(O)=C1O',
  'C8H10N4O2': 'Cn1c(=O)c2c(ncn2C)n(C)c1=O',
  'C10H14N2': 'CN1CCCC1c1cccnc1',
  'C8H9NO2': 'O=C(C)Nc1ccc(O)cc1',
  'C9H13NO3': 'OC(c1ccc(O)c(O)c1)CNC',
  'C8H11NO2': 'OC1=CC=C(CCN)C=C1O',
  'C10H12N2O': 'OC1=CC2=C(C=C1)NC=C2CCN',
  'C5H5N5': 'NC1=NC=NC2=C1NC=N2',
  'C4H5N3O': 'NC1=NC(=O)NC=C1',
  'C5H6N2O2': 'CC1=CNC(=O)NC1=O',
  'C7H5NO3S': 'O=S1(=O)NC(=O)c2ccccc21',
  'C2H6OS': 'O=S(C)C',
  // Cholesterol: khung steroit 4 vòng + mạch nhánh 8 cacbon, viết từ đầu mạch nhánh
  'C27H46O': 'CC(C)CCCC(C)C1CCC2C1(C)CCC1C2CC=C2CC(O)CCC12C',
};

// ---------------------------------------------------------------------------
// CẤU HÌNH R/S MONG ĐỢI
//
// Chuỗi ký tự R/S xếp theo thứ tự nguyên tử RDKit đánh số. Chữ thường (r/s) là
// tâm giả bất đối — đúng theo quy ước, không phải lỗi.
// ---------------------------------------------------------------------------

// ĐÃ TRA CHUẨN từ tên gọi IUPAC / dạng có trong tự nhiên. Lệch là LỖI.
export const EXPECTED_CIP = {
  'C3H6O3': 'S',            // axit L-(+)-lactic
  'C4H6O5': 'S',            // axit L-(-)-malic
  'C4H6O6': 'RR',           // axit L-(+)-tartric (trong nho)
  'C6H12O6': 'RSRSS',       // α-D-glucopyranozơ = (2S,3R,4S,5S,6R) theo tên oxan
  'C6H12O6-gal': 'RSRSR',   // α-D-galactopyranozơ — đồng phân C4 của glucozơ
  'C6H14O6': 'SRRR',        // D-sorbitol (D-glucitol)
  'C6H8O6': 'SR',           // axit L-ascorbic (vitamin C)
  'C10H14N2': 'S',          // (S)-(-)-nicotin
  'C9H13NO3': 'R',          // (R)-(-)-adrenalin
  'C14H18N2O5': 'SS',       // aspartam = este metyl của L-Asp-L-Phe, cả hai tâm S
};

// CHƯA TRA CHUẨN — mới chỉ chốt lại hiện trạng để chặn sửa nhầm về sau.
// Lệch thì KHÔNG chắc là sai, nhưng phải có người soi lại.
// >>> Đây là danh sách cần nhờ kiểm tra ngoài. <<<
export const CIP_SNAPSHOT = {
  'C6H12O6-fru': 'RRSS',    // fructozơ dạng vòng 5 cạnh
  'C5H10O5': 'RSRS',        // xylozơ — lưu ý đang vẽ vòng 5 cạnh, SGK hay vẽ 6 cạnh
  'C5H10O4': 'RSS',         // 2-đeoxyribozơ
  'C12H22O11': 'RRSRSSRSS', // saccarozơ — 9 tâm, nhiều nhất bộ
  'C5H12O5': 'SrR',         // xylitol (dạng meso)
  'C27H46O': 'RRSSSRSR',    // cholesterol — 8 tâm
};

// Chất mà RDKit báo "còn tâm lập thể bỏ trống" nhưng không phải lỗi.
// PH3: RDKit coi P hình tháp là tâm bất đối, thực tế nó đảo chóp liên tục.
export const ALLOW_UNDEFINED_STEREO = new Set(['PH3']);
