// Từ điển thuật ngữ hóa học. Nội dung thật; thêm mục bằng cách thêm một dòng.

export interface Term {
  vi: string;
  en: string;
  def_vi: string;
  def_en: string;
}

export const TERMS: Term[] = [
  { vi: 'Nguyên tử', en: 'Atom', def_vi: 'Hạt nhỏ nhất của nguyên tố còn giữ tính chất hóa học; gồm hạt nhân và các electron.', def_en: 'Smallest unit of an element retaining its chemical properties.' },
  { vi: 'Phân tử', en: 'Molecule', def_vi: 'Nhóm hai hay nhiều nguyên tử liên kết với nhau.', def_en: 'A group of two or more atoms bonded together.' },
  { vi: 'Nguyên tố', en: 'Element', def_vi: 'Chất chỉ gồm một loại nguyên tử, không thể phân nhỏ bằng phản ứng hóa học.', def_en: 'A substance made of a single type of atom.' },
  { vi: 'Ion', en: 'Ion', def_vi: 'Nguyên tử hoặc nhóm nguyên tử mang điện do mất hoặc nhận electron.', def_en: 'A charged atom or group from losing/gaining electrons.' },
  { vi: 'Cation', en: 'Cation', def_vi: 'Ion mang điện tích dương (mất electron).', def_en: 'A positively charged ion.' },
  { vi: 'Anion', en: 'Anion', def_vi: 'Ion mang điện tích âm (nhận electron).', def_en: 'A negatively charged ion.' },
  { vi: 'Đồng vị', en: 'Isotope', def_vi: 'Các nguyên tử cùng số proton nhưng khác số neutron.', def_en: 'Atoms with same protons but different neutrons.' },
  { vi: 'Liên kết ion', en: 'Ionic bond', def_vi: 'Liên kết do lực hút giữa các ion trái dấu.', def_en: 'Bond from attraction between oppositely charged ions.' },
  { vi: 'Liên kết cộng hóa trị', en: 'Covalent bond', def_vi: 'Liên kết do các nguyên tử dùng chung electron.', def_en: 'Bond formed by sharing electron pairs.' },
  { vi: 'Độ âm điện', en: 'Electronegativity', def_vi: 'Khả năng hút electron của nguyên tử trong liên kết.', def_en: 'An atom’s tendency to attract bonding electrons.' },
  { vi: 'Mol', en: 'Mole', def_vi: 'Lượng chất chứa 6,022×10²³ hạt (số Avogadro).', def_en: 'Amount containing 6.022×10²³ particles.' },
  { vi: 'Khối lượng mol', en: 'Molar mass', def_vi: 'Khối lượng của một mol chất, đơn vị g/mol.', def_en: 'Mass of one mole of a substance (g/mol).' },
  { vi: 'Nồng độ mol', en: 'Molarity', def_vi: 'Số mol chất tan trong một lít dung dịch.', def_en: 'Moles of solute per liter of solution.' },
  { vi: 'Chất xúc tác', en: 'Catalyst', def_vi: 'Chất làm tăng tốc phản ứng mà không bị tiêu hao.', def_en: 'Speeds up a reaction without being consumed.' },
  { vi: 'Phản ứng oxi hóa - khử', en: 'Redox reaction', def_vi: 'Phản ứng có sự chuyển electron giữa các chất.', def_en: 'Reaction involving transfer of electrons.' },
  { vi: 'Sự oxi hóa', en: 'Oxidation', def_vi: 'Quá trình nhường (mất) electron.', def_en: 'Loss of electrons.' },
  { vi: 'Sự khử', en: 'Reduction', def_vi: 'Quá trình nhận (thu) electron.', def_en: 'Gain of electrons.' },
  { vi: 'Axit', en: 'Acid', def_vi: 'Chất cho ion H⁺ (proton) khi tan trong nước.', def_en: 'A substance that donates H⁺ (protons).' },
  { vi: 'Bazơ', en: 'Base', def_vi: 'Chất nhận proton hoặc cho ion OH⁻ trong nước.', def_en: 'A substance that accepts protons or gives OH⁻.' },
  { vi: 'Muối', en: 'Salt', def_vi: 'Hợp chất tạo từ phản ứng giữa axit và bazơ.', def_en: 'Compound formed from an acid–base reaction.' },
  { vi: 'Trung hòa', en: 'Neutralization', def_vi: 'Phản ứng axit với bazơ tạo muối và nước.', def_en: 'Acid reacting with base to give salt and water.' },
  { vi: 'Chất chỉ thị', en: 'Indicator', def_vi: 'Chất đổi màu theo môi trường axit/bazơ (vd quỳ tím).', def_en: 'Changes color with pH (e.g. litmus).' },
  { vi: 'Dung dịch', en: 'Solution', def_vi: 'Hỗn hợp đồng nhất của chất tan trong dung môi.', def_en: 'Homogeneous mixture of solute in solvent.' },
  { vi: 'Chất tan', en: 'Solute', def_vi: 'Chất bị hòa tan trong dung môi.', def_en: 'The substance dissolved in a solvent.' },
  { vi: 'Dung môi', en: 'Solvent', def_vi: 'Chất hòa tan chất khác (thường là nước).', def_en: 'The substance that dissolves the solute.' },
  { vi: 'Độ tan', en: 'Solubility', def_vi: 'Lượng chất tan tối đa trong một lượng dung môi ở nhiệt độ cho trước.', def_en: 'Max solute that dissolves at a given temperature.' },
  { vi: 'Kết tủa', en: 'Precipitate', def_vi: 'Chất rắn không tan tách ra khỏi dung dịch.', def_en: 'Insoluble solid that separates from solution.' },
  { vi: 'Chất điện li', en: 'Electrolyte', def_vi: 'Chất phân li thành ion, dẫn điện khi tan hoặc nóng chảy.', def_en: 'Dissociates into ions and conducts electricity.' },
  { vi: 'Điện phân', en: 'Electrolysis', def_vi: 'Dùng dòng điện để gây phản ứng hóa học phân hủy chất.', def_en: 'Using electric current to drive a reaction.' },
  { vi: 'Đồng phân', en: 'Isomer', def_vi: 'Các chất cùng công thức phân tử nhưng khác cấu tạo.', def_en: 'Same molecular formula, different structure.' },
  { vi: 'Polime', en: 'Polymer', def_vi: 'Phân tử lớn gồm nhiều mắt xích lặp lại.', def_en: 'Large molecule of repeating units.' },
  { vi: 'Hydrocacbon', en: 'Hydrocarbon', def_vi: 'Hợp chất chỉ gồm cacbon và hydro.', def_en: 'Compound of only carbon and hydrogen.' },
  { vi: 'Nhóm chức', en: 'Functional group', def_vi: 'Nhóm nguyên tử quyết định tính chất hóa học của hợp chất hữu cơ.', def_en: 'Atom group defining an organic compound’s chemistry.' },
  { vi: 'Đồng đẳng', en: 'Homolog', def_vi: 'Các chất hơn kém nhau một hay nhiều nhóm CH₂ nhưng cùng loại.', def_en: 'Members differing by CH₂ units in a series.' },
  { vi: 'Hóa trị', en: 'Valence', def_vi: 'Số liên kết mà một nguyên tử có thể tạo ra.', def_en: 'Number of bonds an atom can form.' },
  { vi: 'Số oxi hóa', en: 'Oxidation state', def_vi: 'Điện tích quy ước của nguyên tử trong hợp chất.', def_en: 'Hypothetical charge of an atom in a compound.' },
  { vi: 'Nhiệt phản ứng', en: 'Enthalpy of reaction', def_vi: 'Nhiệt lượng tỏa ra hay thu vào của phản ứng (ΔH).', def_en: 'Heat released or absorbed by a reaction (ΔH).' },
  { vi: 'Phản ứng tỏa nhiệt', en: 'Exothermic reaction', def_vi: 'Phản ứng giải phóng nhiệt ra môi trường.', def_en: 'Reaction that releases heat.' },
  { vi: 'Phản ứng thu nhiệt', en: 'Endothermic reaction', def_vi: 'Phản ứng hấp thụ nhiệt từ môi trường.', def_en: 'Reaction that absorbs heat.' },
  { vi: 'Cân bằng hóa học', en: 'Chemical equilibrium', def_vi: 'Trạng thái tốc độ phản ứng thuận bằng phản ứng nghịch.', def_en: 'State where forward and reverse rates are equal.' },
  { vi: 'Chất khử', en: 'Reducing agent', def_vi: 'Chất nhường electron (bị oxi hóa).', def_en: 'Electron donor (gets oxidized).' },
  { vi: 'Chất oxi hóa', en: 'Oxidizing agent', def_vi: 'Chất nhận electron (bị khử).', def_en: 'Electron acceptor (gets reduced).' },
  { vi: 'Đơn chất', en: 'Elementary substance', def_vi: 'Chất tạo bởi một nguyên tố duy nhất (vd O₂, Fe).', def_en: 'Substance made of a single element.' },
  { vi: 'Hợp chất', en: 'Compound', def_vi: 'Chất tạo bởi hai nguyên tố trở lên liên kết hóa học.', def_en: 'Substance of two or more bonded elements.' },
  { vi: 'Xúc tác enzym', en: 'Enzyme', def_vi: 'Protein làm xúc tác cho phản ứng sinh hóa.', def_en: 'Protein catalyst for biochemical reactions.' },
  { vi: 'Bảng tuần hoàn', en: 'Periodic table', def_vi: 'Bảng sắp xếp các nguyên tố theo số hiệu và tính chất tuần hoàn.', def_en: 'Elements arranged by atomic number and properties.' },
];
