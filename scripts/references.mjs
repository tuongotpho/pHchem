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

  // --- Vô cơ có cấu trúc dễ viết nhầm ---
  // P4O10: khung tứ diện 4 photpho, 6 cầu oxi, 4 oxi đầu mút
  'P4O10': 'O=P1(OP2(=O)OP3(=O)O1)OP(=O)(O2)O3',
  'K3[Fe(CN)6]': '[K+].[K+].[K+].[Fe-3](C#N)(C#N)(C#N)(C#N)(C#N)C#N',

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
  'C10H20O': 'CC1CCC(C(C)C)C(O)C1', // menthol — lập thể do bảng InChI lo

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
  // Mantozơ và lactozơ: hai vòng 6 cạnh nối 1-4, khác nhau ở lập thể
  'C12H22O11-mal': 'OCC1OC(O)C(O)C(O)C1OC1OC(CO)C(O)C(O)C1O',
  'C12H22O11-lac': 'OCC1OC(O)C(O)C(O)C1OC1OC(CO)C(O)C(O)C1O',
  // Chất béo: ba gốc axit béo gắn vào glixerol
  'C57H110O6': 'CCCCCCCCCCCCCCCCCC(=O)OCC(COC(=O)CCCCCCCCCCCCCCCCC)OC(=O)CCCCCCCCCCCCCCCCC',
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
// MÃ InChI CHÍNH THỨC — đối chiếu với nguồn ngoài
//
// InChI là mã định danh hóa chất chuẩn quốc tế (IUPAC). Mỗi chuỗi dưới đây
// được chép về từ PubChem (Viện Y tế Quốc gia Mỹ), tra ngày 23/08/2026, trừ
// xylitol lấy từ Wikipedia vì record PubChem bỏ trống tâm giữa.
//
// Đây là lớp kiểm CHẶT NHẤT: so cả phân tử — cấu tạo lẫn từng tâm lập thể —
// với bên thứ ba, không phụ thuộc vào hiểu biết của người viết dữ liệu.
//
// Muốn tự kiểm lại một dòng: mở
//   https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/<TÊN>/property/InChI/TXT
// thay <TÊN> bằng tên ghi trong chú thích, rồi so chuỗi trả về.
//
// Thêm chất mới có tâm bất đối thì tra InChI rồi bổ sung vào đây.
// ---------------------------------------------------------------------------

export const VERIFIED_INCHI = {
  // tên tra cứu: L-lactic acid
  'C3H6O3':
    'InChI=1S/C3H6O3/c1-2(4)3(5)6/h2,4H,1H3,(H,5,6)/t2-/m0/s1',
  // L-malic acid
  'C4H6O5':
    'InChI=1S/C4H6O5/c5-2(4(8)9)1-3(6)7/h2,5H,1H2,(H,6,7)(H,8,9)/t2-/m0/s1',
  // L-tartaric acid
  'C4H6O6':
    'InChI=1S/C4H6O6/c5-1(3(7)8)2(6)4(9)10/h1-2,5-6H,(H,7,8)(H,9,10)/t1-,2-/m1/s1',
  // alpha-D-glucopyranose
  'C6H12O6':
    'InChI=1S/C6H12O6/c7-1-2-3(8)4(9)5(10)6(11)12-2/h2-11H,1H2/t2-,3-,4+,5-,6+/m1/s1',
  // alpha-D-galactopyranose
  'C6H12O6-gal':
    'InChI=1S/C6H12O6/c7-1-2-3(8)4(9)5(10)6(11)12-2/h2-11H,1H2/t2-,3+,4+,5-,6+/m1/s1',
  // beta-D-fructofuranose — đúng dạng nằm trong saccarozơ
  'C6H12O6-fru':
    'InChI=1S/C6H12O6/c7-1-3-4(9)5(10)6(11,2-8)12-3/h3-5,7-11H,1-2H2/t3-,4-,5+,6-/m1/s1',
  // beta-D-ribofuranose — đúng dạng ribozơ nằm trong ARN
  'C5H10O5':
    'InChI=1S/C5H10O5/c6-1-2-3(7)4(8)5(9)10-2/h2-9H,1H2/t2-,3-,4-,5-/m1/s1',
  // 2-deoxy-beta-D-ribofuranose — đúng dạng đường nằm trong ADN
  'C5H10O4':
    'InChI=1S/C5H10O4/c6-2-4-3(7)1-5(8)9-4/h3-8H,1-2H2/t3-,4+,5+/m0/s1',
  // sucrose
  'C12H22O11':
    'InChI=1S/C12H22O11/c13-1-4-6(16)8(18)9(19)11(21-4)23-12(3-15)10(20)7(17)5(2-14)22-12/h4-11,13-20H,1-3H2/t4-,5-,6-,7-,8+,9-,10+,11-,12+/m1/s1',
  // D-sorbitol
  'C6H14O6':
    'InChI=1S/C6H14O6/c7-1-3(9)5(11)6(12)4(10)2-8/h3-12H,1-2H2/t3-,4+,5-,6-/m1/s1',
  // xylitol — nguồn Wikipedia. Record PubChem để trống tâm giữa (…,5?), mà tâm
  // đó chính là chỗ phân biệt xylitol (5+) với ribitol (5-).
  'C5H12O5':
    'InChI=1S/C5H12O5/c6-1-3(8)5(10)4(9)2-7/h3-10H,1-2H2/t3-,4+,5+',
  // L-ascorbic acid
  'C6H8O6':
    'InChI=1S/C6H8O6/c7-1-2(8)5-3(9)4(10)6(11)12-5/h2,5,7-10H,1H2/t2-,5+/m0/s1',
  // nicotine
  'C10H14N2':
    'InChI=1S/C10H14N2/c1-12-7-3-5-10(12)9-4-2-6-11-8-9/h2,4,6,8,10H,3,5,7H2,1H3/t10-/m0/s1',
  // epinephrine (adrenalin)
  'C9H13NO3':
    'InChI=1S/C9H13NO3/c1-10-5-9(13)6-2-3-7(11)8(12)4-6/h2-4,9-13H,5H2,1H3/t9-/m0/s1',
  // aspartame
  'C14H18N2O5':
    'InChI=1S/C14H18N2O5/c1-21-14(20)11(7-9-5-3-2-4-6-9)16-13(19)10(15)8-12(17)18/h2-6,10-11H,7-8,15H2,1H3,(H,16,19)(H,17,18)/t10-,11-/m0/s1',
  // levomenthol = (1R,2S,5R)-menthol, dạng có trong tinh dầu bạc hà
  'C10H20O':
    'InChI=1S/C10H20O/c1-7(2)9-5-4-8(3)6-10(9)11/h7-11H,4-6H2,1-3H3/t8-,9+,10-/m1/s1',
  // beta-maltose
  'C12H22O11-mal':
    'InChI=1S/C12H22O11/c13-1-3-5(15)6(16)9(19)12(22-3)23-10-4(2-14)21-11(20)8(18)7(10)17/h3-20H,1-2H2/t3-,4-,5-,6+,7-,8-,9-,10-,11-,12-/m1/s1',
  // beta-lactose
  'C12H22O11-lac':
    'InChI=1S/C12H22O11/c13-1-3-5(15)6(16)9(19)12(22-3)23-10-4(2-14)21-11(20)8(18)7(10)17/h3-20H,1-2H2/t3-,4-,5+,6+,7-,8-,9-,10-,11-,12+/m1/s1',
  // tristearin
  'C57H110O6':
    'InChI=1S/C57H110O6/c1-4-7-10-13-16-19-22-25-28-31-34-37-40-43-46-49-55(58)61-52-54(63-57(60)51-48-45-42-39-36-33-30-27-24-21-18-15-12-9-6-3)53-62-56(59)50-47-44-41-38-35-32-29-26-23-20-17-14-11-8-5-2/h54H,4-53H2,1-3H3',
  // triolein
  'C57H104O6':
    'InChI=1S/C57H104O6/c1-4-7-10-13-16-19-22-25-28-31-34-37-40-43-46-49-55(58)61-52-54(63-57(60)51-48-45-42-39-36-33-30-27-24-21-18-15-12-9-6-3)53-62-56(59)50-47-44-41-38-35-32-29-26-23-20-17-14-11-8-5-2/h25-30,54H,4-24,31-53H2,1-3H3/b28-25-,29-26-,30-27-',
  // morphine
  'C17H19NO3':
    'InChI=1S/C17H19NO3/c1-18-7-6-17-10-3-5-13(20)16(17)21-15-12(19)4-2-9(14(15)17)8-11(10)18/h2-5,10-11,13,16,19-20H,6-8H2,1H3/t10-,11+,13-,16-,17-/m0/s1',
  // penicillin G
  'C16H18N2O4S':
    'InChI=1S/C16H18N2O4S/c1-16(2)12(15(21)22)18-13(20)11(14(18)23-16)17-10(19)8-9-6-4-3-5-7-9/h3-7,11-12,14H,8H2,1-2H3,(H,17,19)(H,21,22)/t11-,12+,14-/m1/s1',
  // cholesterol
  'C27H46O':
    'InChI=1S/C27H46O/c1-18(2)7-6-8-19(3)23-11-12-24-22-10-9-20-17-21(28)13-15-26(20,4)25(22)14-16-27(23,24)5/h9,18-19,21-25,28H,6-8,10-17H2,1-5H3/t19-,21+,22+,23-,24+,25+,26+,27-/m1/s1',
};

// Chất mà RDKit báo "còn tâm lập thể bỏ trống" nhưng không phải lỗi.
//
// PH3: RDKit coi P hình tháp là tâm bất đối, thực tế nó đảo chóp liên tục.
//
// Bốn polime vinyl: cacbon mang nhánh đúng là tâm bất đối, nhưng chiều xoay
// của nó là ĐỘ ĐỀU MẠCH (tacticity) — tính chất của cả sợi polime, không phải
// của một mắt xích. Nhựa thường dùng phần lớn là mạch không đều, nên để trống
// mới đúng; khai một chiều cụ thể là vẽ sai chất.
export const ALLOW_UNDEFINED_STEREO = new Set([
  'PH3',
  '(C3H6)n',
  '(C2H3Cl)n',
  '(C8H8)n',
  '(C5H8O2)n',
]);
