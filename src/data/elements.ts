// Dữ liệu 118 nguyên tố — số liệu chuẩn (IUPAC).
// Khối lượng nguyên tử: giá trị tiêu chuẩn; nguyên tố phóng xạ dùng số khối
// đồng vị bền/thọ nhất, đặt trong ngoặc theo quy ước (ở đây lưu số).
// Cấu hình electron viết theo ký hiệu khí hiếm (noble-gas shorthand).

export type Category =
  | 'alkali' // kim loại kiềm
  | 'alkaline' // kim loại kiềm thổ
  | 'transition' // kim loại chuyển tiếp
  | 'post-transition' // kim loại sau chuyển tiếp
  | 'metalloid' // á kim (bán kim)
  | 'nonmetal' // phi kim
  | 'halogen' // halogen
  | 'noble' // khí hiếm
  | 'lanthanide' // họ Lantan
  | 'actinide' // họ Actini
  | 'unknown'; // chưa rõ tính chất (siêu nặng)

export interface ElementRaw {
  n: number;
  sym: string;
  en: string;
  vi: string;
  mass: number;
  cat: Category;
  group: number; // 1..18; 0 = khối f (họ Lantan/Actini)
  period: number;
  config: string; // cấu hình electron
}

export interface Element extends ElementRaw {
  xpos: number; // cột trong lưới hiển thị (1..18)
  ypos: number; // hàng trong lưới hiển thị (1..7 chính, 9-10 khối f)
}

// [n, sym, en, vi, mass, cat, group, period, config]
type Row = [number, string, string, string, number, Category, number, number, string];

const RAW: Row[] = [
  [1, 'H', 'Hydrogen', 'Hydro', 1.008, 'nonmetal', 1, 1, '1s1'],
  [2, 'He', 'Helium', 'Heli', 4.0026, 'noble', 18, 1, '1s2'],
  [3, 'Li', 'Lithium', 'Lithi', 6.94, 'alkali', 1, 2, '[He] 2s1'],
  [4, 'Be', 'Beryllium', 'Beryli', 9.0122, 'alkaline', 2, 2, '[He] 2s2'],
  [5, 'B', 'Boron', 'Bo', 10.81, 'metalloid', 13, 2, '[He] 2s2 2p1'],
  [6, 'C', 'Carbon', 'Cacbon', 12.011, 'nonmetal', 14, 2, '[He] 2s2 2p2'],
  [7, 'N', 'Nitrogen', 'Nitơ', 14.007, 'nonmetal', 15, 2, '[He] 2s2 2p3'],
  [8, 'O', 'Oxygen', 'Oxy', 15.999, 'nonmetal', 16, 2, '[He] 2s2 2p4'],
  [9, 'F', 'Fluorine', 'Flo', 18.998, 'halogen', 17, 2, '[He] 2s2 2p5'],
  [10, 'Ne', 'Neon', 'Neon', 20.18, 'noble', 18, 2, '[He] 2s2 2p6'],
  [11, 'Na', 'Sodium', 'Natri', 22.99, 'alkali', 1, 3, '[Ne] 3s1'],
  [12, 'Mg', 'Magnesium', 'Magie', 24.305, 'alkaline', 2, 3, '[Ne] 3s2'],
  [13, 'Al', 'Aluminium', 'Nhôm', 26.982, 'post-transition', 13, 3, '[Ne] 3s2 3p1'],
  [14, 'Si', 'Silicon', 'Silic', 28.085, 'metalloid', 14, 3, '[Ne] 3s2 3p2'],
  [15, 'P', 'Phosphorus', 'Photpho', 30.974, 'nonmetal', 15, 3, '[Ne] 3s2 3p3'],
  [16, 'S', 'Sulfur', 'Lưu huỳnh', 32.06, 'nonmetal', 16, 3, '[Ne] 3s2 3p4'],
  [17, 'Cl', 'Chlorine', 'Clo', 35.45, 'halogen', 17, 3, '[Ne] 3s2 3p5'],
  // Argon: 39,95 chứ KHÔNG phải 39,948. Từ 2017 IUPAC không còn cho argon một
  // con số nữa mà cho hẳn một KHOẢNG [39,792 ; 39,963] — thành phần đồng vị
  // của argon thay đổi theo nguồn gốc mẫu vật (kali-40 phân rã thành argon-40).
  // 39,95 là giá trị quy ước dùng cho dạy học và thương mại. Số 39,948 là
  // khuyến nghị từ năm 1979, đã lạc hậu gần nửa thế kỷ.
  [18, 'Ar', 'Argon', 'Argon', 39.95, 'noble', 18, 3, '[Ne] 3s2 3p6'],
  [19, 'K', 'Potassium', 'Kali', 39.098, 'alkali', 1, 4, '[Ar] 4s1'],
  [20, 'Ca', 'Calcium', 'Canxi', 40.078, 'alkaline', 2, 4, '[Ar] 4s2'],
  [21, 'Sc', 'Scandium', 'Scandi', 44.956, 'transition', 3, 4, '[Ar] 3d1 4s2'],
  [22, 'Ti', 'Titanium', 'Titan', 47.867, 'transition', 4, 4, '[Ar] 3d2 4s2'],
  [23, 'V', 'Vanadium', 'Vanadi', 50.942, 'transition', 5, 4, '[Ar] 3d3 4s2'],
  [24, 'Cr', 'Chromium', 'Crom', 51.996, 'transition', 6, 4, '[Ar] 3d5 4s1'],
  [25, 'Mn', 'Manganese', 'Mangan', 54.938, 'transition', 7, 4, '[Ar] 3d5 4s2'],
  [26, 'Fe', 'Iron', 'Sắt', 55.845, 'transition', 8, 4, '[Ar] 3d6 4s2'],
  [27, 'Co', 'Cobalt', 'Coban', 58.933, 'transition', 9, 4, '[Ar] 3d7 4s2'],
  [28, 'Ni', 'Nickel', 'Niken', 58.693, 'transition', 10, 4, '[Ar] 3d8 4s2'],
  [29, 'Cu', 'Copper', 'Đồng', 63.546, 'transition', 11, 4, '[Ar] 3d10 4s1'],
  [30, 'Zn', 'Zinc', 'Kẽm', 65.38, 'transition', 12, 4, '[Ar] 3d10 4s2'],
  [31, 'Ga', 'Gallium', 'Gali', 69.723, 'post-transition', 13, 4, '[Ar] 3d10 4s2 4p1'],
  [32, 'Ge', 'Germanium', 'Gemani', 72.63, 'metalloid', 14, 4, '[Ar] 3d10 4s2 4p2'],
  [33, 'As', 'Arsenic', 'Asen', 74.922, 'metalloid', 15, 4, '[Ar] 3d10 4s2 4p3'],
  [34, 'Se', 'Selenium', 'Selen', 78.971, 'nonmetal', 16, 4, '[Ar] 3d10 4s2 4p4'],
  [35, 'Br', 'Bromine', 'Brom', 79.904, 'halogen', 17, 4, '[Ar] 3d10 4s2 4p5'],
  [36, 'Kr', 'Krypton', 'Krypton', 83.798, 'noble', 18, 4, '[Ar] 3d10 4s2 4p6'],
  [37, 'Rb', 'Rubidium', 'Rubidi', 85.468, 'alkali', 1, 5, '[Kr] 5s1'],
  [38, 'Sr', 'Strontium', 'Stronti', 87.62, 'alkaline', 2, 5, '[Kr] 5s2'],
  [39, 'Y', 'Yttrium', 'Ytri', 88.906, 'transition', 3, 5, '[Kr] 4d1 5s2'],
  // Ziriconi: IUPAC sửa thành 91,222 ± 0,003 vào năm 2024 (trước đó là 91,22
  // suốt từ 1931). Đây đúng loại lỗi mà chỉ đối chiếu nguồn ngoài mới bắt được:
  // con số cũ không sai về logic, chỉ là đã bị thay.
  [40, 'Zr', 'Zirconium', 'Ziriconi', 91.222, 'transition', 4, 5, '[Kr] 4d2 5s2'],
  [41, 'Nb', 'Niobium', 'Niobi', 92.906, 'transition', 5, 5, '[Kr] 4d4 5s1'],
  [42, 'Mo', 'Molybdenum', 'Molypden', 95.95, 'transition', 6, 5, '[Kr] 4d5 5s1'],
  [43, 'Tc', 'Technetium', 'Techneti', 98, 'transition', 7, 5, '[Kr] 4d5 5s2'],
  [44, 'Ru', 'Ruthenium', 'Rutheni', 101.07, 'transition', 8, 5, '[Kr] 4d7 5s1'],
  [45, 'Rh', 'Rhodium', 'Rhodi', 102.91, 'transition', 9, 5, '[Kr] 4d8 5s1'],
  [46, 'Pd', 'Palladium', 'Paladi', 106.42, 'transition', 10, 5, '[Kr] 4d10'],
  [47, 'Ag', 'Silver', 'Bạc', 107.87, 'transition', 11, 5, '[Kr] 4d10 5s1'],
  [48, 'Cd', 'Cadmium', 'Cadimi', 112.41, 'transition', 12, 5, '[Kr] 4d10 5s2'],
  [49, 'In', 'Indium', 'Indi', 114.82, 'post-transition', 13, 5, '[Kr] 4d10 5s2 5p1'],
  [50, 'Sn', 'Tin', 'Thiếc', 118.71, 'post-transition', 14, 5, '[Kr] 4d10 5s2 5p2'],
  [51, 'Sb', 'Antimony', 'Antimon', 121.76, 'metalloid', 15, 5, '[Kr] 4d10 5s2 5p3'],
  [52, 'Te', 'Tellurium', 'Teluri', 127.6, 'metalloid', 16, 5, '[Kr] 4d10 5s2 5p4'],
  [53, 'I', 'Iodine', 'Iot', 126.9, 'halogen', 17, 5, '[Kr] 4d10 5s2 5p5'],
  [54, 'Xe', 'Xenon', 'Xenon', 131.29, 'noble', 18, 5, '[Kr] 4d10 5s2 5p6'],
  [55, 'Cs', 'Caesium', 'Xesi', 132.91, 'alkali', 1, 6, '[Xe] 6s1'],
  [56, 'Ba', 'Barium', 'Bari', 137.33, 'alkaline', 2, 6, '[Xe] 6s2'],
  [57, 'La', 'Lanthanum', 'Lantan', 138.91, 'lanthanide', 0, 6, '[Xe] 5d1 6s2'],
  [58, 'Ce', 'Cerium', 'Xeri', 140.12, 'lanthanide', 0, 6, '[Xe] 4f1 5d1 6s2'],
  [59, 'Pr', 'Praseodymium', 'Praseodim', 140.91, 'lanthanide', 0, 6, '[Xe] 4f3 6s2'],
  [60, 'Nd', 'Neodymium', 'Neodim', 144.24, 'lanthanide', 0, 6, '[Xe] 4f4 6s2'],
  [61, 'Pm', 'Promethium', 'Prometi', 145, 'lanthanide', 0, 6, '[Xe] 4f5 6s2'],
  [62, 'Sm', 'Samarium', 'Samari', 150.36, 'lanthanide', 0, 6, '[Xe] 4f6 6s2'],
  [63, 'Eu', 'Europium', 'Europi', 151.96, 'lanthanide', 0, 6, '[Xe] 4f7 6s2'],
  [64, 'Gd', 'Gadolinium', 'Gadolini', 157.25, 'lanthanide', 0, 6, '[Xe] 4f7 5d1 6s2'],
  [65, 'Tb', 'Terbium', 'Terbi', 158.93, 'lanthanide', 0, 6, '[Xe] 4f9 6s2'],
  [66, 'Dy', 'Dysprosium', 'Dysprosi', 162.5, 'lanthanide', 0, 6, '[Xe] 4f10 6s2'],
  [67, 'Ho', 'Holmium', 'Holmi', 164.93, 'lanthanide', 0, 6, '[Xe] 4f11 6s2'],
  [68, 'Er', 'Erbium', 'Erbi', 167.26, 'lanthanide', 0, 6, '[Xe] 4f12 6s2'],
  [69, 'Tm', 'Thulium', 'Thuli', 168.93, 'lanthanide', 0, 6, '[Xe] 4f13 6s2'],
  [70, 'Yb', 'Ytterbium', 'Ytterbi', 173.05, 'lanthanide', 0, 6, '[Xe] 4f14 6s2'],
  [71, 'Lu', 'Lutetium', 'Luteti', 174.97, 'lanthanide', 0, 6, '[Xe] 4f14 5d1 6s2'],
  [72, 'Hf', 'Hafnium', 'Hafni', 178.49, 'transition', 4, 6, '[Xe] 4f14 5d2 6s2'],
  [73, 'Ta', 'Tantalum', 'Tantali', 180.95, 'transition', 5, 6, '[Xe] 4f14 5d3 6s2'],
  [74, 'W', 'Tungsten', 'Wolfram', 183.84, 'transition', 6, 6, '[Xe] 4f14 5d4 6s2'],
  [75, 'Re', 'Rhenium', 'Rheni', 186.21, 'transition', 7, 6, '[Xe] 4f14 5d5 6s2'],
  [76, 'Os', 'Osmium', 'Osimi', 190.23, 'transition', 8, 6, '[Xe] 4f14 5d6 6s2'],
  [77, 'Ir', 'Iridium', 'Iridi', 192.22, 'transition', 9, 6, '[Xe] 4f14 5d7 6s2'],
  [78, 'Pt', 'Platinum', 'Bạch kim', 195.08, 'transition', 10, 6, '[Xe] 4f14 5d9 6s1'],
  [79, 'Au', 'Gold', 'Vàng', 196.97, 'transition', 11, 6, '[Xe] 4f14 5d10 6s1'],
  [80, 'Hg', 'Mercury', 'Thủy ngân', 200.59, 'transition', 12, 6, '[Xe] 4f14 5d10 6s2'],
  [81, 'Tl', 'Thallium', 'Tali', 204.38, 'post-transition', 13, 6, '[Xe] 4f14 5d10 6s2 6p1'],
  [82, 'Pb', 'Lead', 'Chì', 207.2, 'post-transition', 14, 6, '[Xe] 4f14 5d10 6s2 6p2'],
  [83, 'Bi', 'Bismuth', 'Bitmut', 208.98, 'post-transition', 15, 6, '[Xe] 4f14 5d10 6s2 6p3'],
  [84, 'Po', 'Polonium', 'Poloni', 209, 'post-transition', 16, 6, '[Xe] 4f14 5d10 6s2 6p4'],
  [85, 'At', 'Astatine', 'Astatin', 210, 'halogen', 17, 6, '[Xe] 4f14 5d10 6s2 6p5'],
  [86, 'Rn', 'Radon', 'Radon', 222, 'noble', 18, 6, '[Xe] 4f14 5d10 6s2 6p6'],
  [87, 'Fr', 'Francium', 'Franxi', 223, 'alkali', 1, 7, '[Rn] 7s1'],
  [88, 'Ra', 'Radium', 'Radi', 226, 'alkaline', 2, 7, '[Rn] 7s2'],
  [89, 'Ac', 'Actinium', 'Actini', 227, 'actinide', 0, 7, '[Rn] 6d1 7s2'],
  [90, 'Th', 'Thorium', 'Thori', 232.04, 'actinide', 0, 7, '[Rn] 6d2 7s2'],
  [91, 'Pa', 'Protactinium', 'Protactini', 231.04, 'actinide', 0, 7, '[Rn] 5f2 6d1 7s2'],
  [92, 'U', 'Uranium', 'Urani', 238.03, 'actinide', 0, 7, '[Rn] 5f3 6d1 7s2'],
  [93, 'Np', 'Neptunium', 'Neptuni', 237, 'actinide', 0, 7, '[Rn] 5f4 6d1 7s2'],
  [94, 'Pu', 'Plutonium', 'Plutoni', 244, 'actinide', 0, 7, '[Rn] 5f6 7s2'],
  [95, 'Am', 'Americium', 'Americi', 243, 'actinide', 0, 7, '[Rn] 5f7 7s2'],
  [96, 'Cm', 'Curium', 'Curi', 247, 'actinide', 0, 7, '[Rn] 5f7 6d1 7s2'],
  [97, 'Bk', 'Berkelium', 'Berkeli', 247, 'actinide', 0, 7, '[Rn] 5f9 7s2'],
  [98, 'Cf', 'Californium', 'Californi', 251, 'actinide', 0, 7, '[Rn] 5f10 7s2'],
  [99, 'Es', 'Einsteinium', 'Einsteini', 252, 'actinide', 0, 7, '[Rn] 5f11 7s2'],
  [100, 'Fm', 'Fermium', 'Fermi', 257, 'actinide', 0, 7, '[Rn] 5f12 7s2'],
  [101, 'Md', 'Mendelevium', 'Mendelevi', 258, 'actinide', 0, 7, '[Rn] 5f13 7s2'],
  [102, 'No', 'Nobelium', 'Nobeli', 259, 'actinide', 0, 7, '[Rn] 5f14 7s2'],
  [103, 'Lr', 'Lawrencium', 'Lawrenci', 266, 'actinide', 0, 7, '[Rn] 5f14 7s2 7p1'],
  [104, 'Rf', 'Rutherfordium', 'Rutherfordi', 267, 'transition', 4, 7, '[Rn] 5f14 6d2 7s2'],
  [105, 'Db', 'Dubnium', 'Dubni', 268, 'transition', 5, 7, '[Rn] 5f14 6d3 7s2'],
  [106, 'Sg', 'Seaborgium', 'Seaborgi', 269, 'transition', 6, 7, '[Rn] 5f14 6d4 7s2'],
  [107, 'Bh', 'Bohrium', 'Bohri', 270, 'transition', 7, 7, '[Rn] 5f14 6d5 7s2'],
  [108, 'Hs', 'Hassium', 'Hassi', 269, 'transition', 8, 7, '[Rn] 5f14 6d6 7s2'],
  [109, 'Mt', 'Meitnerium', 'Meitneri', 278, 'unknown', 9, 7, '[Rn] 5f14 6d7 7s2'],
  [110, 'Ds', 'Darmstadtium', 'Darmstadti', 281, 'unknown', 10, 7, '[Rn] 5f14 6d8 7s2'],
  [111, 'Rg', 'Roentgenium', 'Roentgeni', 282, 'unknown', 11, 7, '[Rn] 5f14 6d9 7s2'],
  [112, 'Cn', 'Copernicium', 'Coperniki', 285, 'transition', 12, 7, '[Rn] 5f14 6d10 7s2'],
  [113, 'Nh', 'Nihonium', 'Nihoni', 286, 'unknown', 13, 7, '[Rn] 5f14 6d10 7s2 7p1'],
  [114, 'Fl', 'Flerovium', 'Flerovi', 289, 'unknown', 14, 7, '[Rn] 5f14 6d10 7s2 7p2'],
  [115, 'Mc', 'Moscovium', 'Moscovi', 290, 'unknown', 15, 7, '[Rn] 5f14 6d10 7s2 7p3'],
  [116, 'Lv', 'Livermorium', 'Livermori', 293, 'unknown', 16, 7, '[Rn] 5f14 6d10 7s2 7p4'],
  [117, 'Ts', 'Tennessine', 'Tennessin', 294, 'unknown', 17, 7, '[Rn] 5f14 6d10 7s2 7p5'],
  [118, 'Og', 'Oganesson', 'Oganesson', 294, 'unknown', 18, 7, '[Rn] 5f14 6d10 7s2 7p6'],
];

function toElement(r: Row): Element {
  const [n, sym, en, vi, mass, cat, group, period, config] = r;
  let xpos: number;
  let ypos: number;
  if (cat === 'lanthanide') {
    ypos = 9;
    xpos = 3 + (n - 57); // 57→3 ... 71→17
  } else if (cat === 'actinide') {
    ypos = 10;
    xpos = 3 + (n - 89); // 89→3 ... 103→17
  } else {
    xpos = group;
    ypos = period;
  }
  return { n, sym, en, vi, mass, cat, group, period, config, xpos, ypos };
}

export const ELEMENTS: Element[] = RAW.map(toElement);

export const byNumber = (n: number) => ELEMENTS.find((e) => e.n === n);

// Nhãn + màu cho từng phân loại (dùng chung cho lưới và chú giải)
export const CATEGORY_META: Record<
  Category,
  { vi: string; en: string; color: string; text: string }
> = {
  alkali: { vi: 'Kim loại kiềm', en: 'Alkali metal', color: 'bg-rose-500/25 border-rose-400/40', text: 'text-rose-700 dark:text-rose-200' },
  alkaline: { vi: 'Kim loại kiềm thổ', en: 'Alkaline earth', color: 'bg-orange-500/25 border-orange-400/40', text: 'text-orange-700 dark:text-orange-200' },
  transition: { vi: 'Kim loại chuyển tiếp', en: 'Transition metal', color: 'bg-amber-500/20 border-amber-400/40', text: 'text-amber-700 dark:text-amber-100' },
  'post-transition': { vi: 'Kim loại sau chuyển tiếp', en: 'Post-transition metal', color: 'bg-teal-500/20 border-teal-400/40', text: 'text-teal-700 dark:text-teal-100' },
  metalloid: { vi: 'Á kim', en: 'Metalloid', color: 'bg-cyan-500/20 border-cyan-400/40', text: 'text-cyan-700 dark:text-cyan-100' },
  nonmetal: { vi: 'Phi kim', en: 'Nonmetal', color: 'bg-emerald-500/25 border-emerald-400/40', text: 'text-emerald-700 dark:text-emerald-100' },
  halogen: { vi: 'Halogen', en: 'Halogen', color: 'bg-sky-500/25 border-sky-400/40', text: 'text-sky-700 dark:text-sky-100' },
  noble: { vi: 'Khí hiếm', en: 'Noble gas', color: 'bg-violet-500/25 border-violet-400/40', text: 'text-violet-700 dark:text-violet-100' },
  lanthanide: { vi: 'Họ Lantan', en: 'Lanthanide', color: 'bg-fuchsia-500/20 border-fuchsia-400/40', text: 'text-fuchsia-700 dark:text-fuchsia-100' },
  actinide: { vi: 'Họ Actini', en: 'Actinide', color: 'bg-pink-500/20 border-pink-400/40', text: 'text-pink-700 dark:text-pink-100' },
  unknown: { vi: 'Chưa rõ tính chất', en: 'Unknown', color: 'bg-slate-500/20 border-slate-400/30', text: 'text-slate-200' },
};
