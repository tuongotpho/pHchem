import type { Formula } from './formulas';

// ---------- HÓA LÝ: công thức & định luật ----------
// Nhóm này là PHƯƠNG TRÌNH, không phải chất, nên không có hình cấu tạo.

export const PHYSICAL: Formula[] = [
  // === Mol & nồng độ ===
  { formula: 'n = m / M', vi: 'Số mol theo khối lượng', en: 'Moles from mass', cat: 'physical', note_vi: 'Khối lượng chia khối lượng mol.', note_en: 'Mass divided by molar mass.' },
  { formula: 'n = V / 22,4', vi: 'Số mol khí ở đktc', en: 'Moles of gas at STP', cat: 'physical', note_vi: 'Thể tích khí (lít) ở điều kiện tiêu chuẩn chia 22,4.', note_en: 'Gas volume in litres at STP divided by 22.4.' },
  { formula: 'N = n × NA', vi: 'Số hạt vi mô', en: 'Number of particles', cat: 'physical', note_vi: 'Số mol nhân số Avogadro 6,022×10²³.', note_en: 'Moles times Avogadro number 6.022×10²³.' },
  { formula: 'CM = n / V', vi: 'Nồng độ mol', en: 'Molar concentration', cat: 'physical', note_vi: 'Số mol chất tan chia thể tích dung dịch (mol/L).', note_en: 'Moles of solute per litre of solution.' },
  { formula: 'C% = mct/mdd × 100', vi: 'Nồng độ phần trăm', en: 'Mass percent concentration', cat: 'physical', note_vi: 'Khối lượng chất tan chia khối lượng dung dịch.', note_en: 'Solute mass divided by solution mass.' },
  { formula: 'd = m / V', vi: 'Khối lượng riêng', en: 'Density', cat: 'physical', note_vi: 'Khối lượng chia thể tích.', note_en: 'Mass per unit volume.' },
  { formula: 'C1V1 = C2V2', vi: 'Công thức pha loãng', en: 'Dilution equation', cat: 'physical', note_vi: 'Số mol chất tan không đổi khi pha loãng.', note_en: 'Moles of solute stay constant on dilution.' },
  { formula: 'H% = tt/lt × 100', vi: 'Hiệu suất phản ứng', en: 'Percent yield', cat: 'physical', note_vi: 'Lượng thực tế chia lượng lý thuyết.', note_en: 'Actual yield over theoretical yield.' },

  // === Chất khí ===
  { formula: 'PV = nRT', vi: 'Phương trình khí lý tưởng', en: 'Ideal gas law', cat: 'physical', note_vi: 'Liên hệ áp suất, thể tích, số mol và nhiệt độ.', note_en: 'Relates pressure, volume, moles and temperature.' },
  { formula: 'P1V1/T1 = P2V2/T2', vi: 'Phương trình trạng thái khí', en: 'Combined gas law', cat: 'physical', note_vi: 'Gộp ba định luật Boyle, Charles, Gay-Lussac.', note_en: 'Combines Boyle, Charles and Gay-Lussac laws.' },
  { formula: 'PV = const (T)', vi: 'Định luật Boyle-Mariotte', en: 'Boyle law', cat: 'physical', note_vi: 'Nhiệt độ không đổi: áp suất tỉ lệ nghịch thể tích.', note_en: 'At constant T, pressure is inversely proportional to volume.' },
  { formula: 'V/T = const (P)', vi: 'Định luật Charles', en: 'Charles law', cat: 'physical', note_vi: 'Áp suất không đổi: thể tích tỉ lệ thuận nhiệt độ tuyệt đối.', note_en: 'At constant P, volume is proportional to absolute temperature.' },
  { formula: 'Ptổng = ΣPi', vi: 'Định luật Dalton (áp suất riêng phần)', en: 'Dalton law of partial pressures', cat: 'physical', note_vi: 'Áp suất hỗn hợp khí bằng tổng áp suất riêng phần.', note_en: 'Total pressure equals the sum of partial pressures.' },
  { formula: 'r1/r2 = √(M2/M1)', vi: 'Định luật khuếch tán Graham', en: 'Graham law of effusion', cat: 'physical', note_vi: 'Khí nhẹ khuếch tán nhanh hơn khí nặng.', note_en: 'Lighter gases effuse faster than heavier ones.' },
  { formula: 'dA/B = MA / MB', vi: 'Tỉ khối chất khí', en: 'Relative gas density', cat: 'physical', note_vi: 'So sánh khối lượng mol hai khí cùng điều kiện.', note_en: 'Ratio of molar masses at the same conditions.' },

  // === Axit - bazơ ===
  { formula: 'pH = -log[H⁺]', vi: 'Độ pH', en: 'pH definition', cat: 'physical', note_vi: 'Đo độ axit theo nồng độ ion H⁺.', note_en: 'Acidity based on H⁺ concentration.' },
  { formula: 'pOH = -log[OH⁻]', vi: 'Độ pOH', en: 'pOH definition', cat: 'physical', note_vi: 'Đo độ bazơ theo nồng độ ion OH⁻.', note_en: 'Basicity based on OH⁻ concentration.' },
  { formula: 'pH + pOH = 14', vi: 'Quan hệ pH và pOH', en: 'pH and pOH relation', cat: 'physical', note_vi: 'Đúng với dung dịch nước ở 25°C.', note_en: 'Holds for aqueous solutions at 25°C.' },
  { formula: 'Kw = [H⁺][OH⁻] = 10⁻¹⁴', vi: 'Tích số ion của nước', en: 'Ion product of water', cat: 'physical', note_vi: 'Hằng số tự phân li của nước ở 25°C.', note_en: 'Self-ionization constant of water at 25°C.' },
  { formula: 'Ka = [H⁺][A⁻]/[HA]', vi: 'Hằng số phân li axit', en: 'Acid dissociation constant', cat: 'physical', note_vi: 'Ka càng lớn thì axit càng mạnh.', note_en: 'Larger Ka means a stronger acid.' },
  { formula: 'pH = pKa + log([A⁻]/[HA])', vi: 'Phương trình Henderson-Hasselbalch', en: 'Henderson-Hasselbalch equation', cat: 'physical', note_vi: 'Tính pH của dung dịch đệm.', note_en: 'Calculates pH of buffer solutions.' },
  { formula: 'Ksp = [Aⁿ⁺]ˣ[Bᵐ⁻]ʸ', vi: 'Tích số tan', en: 'Solubility product', cat: 'physical', note_vi: 'Vượt Ksp thì bắt đầu kết tủa.', note_en: 'Precipitation starts when Ksp is exceeded.' },

  // === Nhiệt động lực học ===
  { formula: 'Q = m·c·ΔT', vi: 'Nhiệt lượng', en: 'Heat energy', cat: 'physical', note_vi: 'Khối lượng × nhiệt dung riêng × biến thiên nhiệt độ.', note_en: 'Mass × specific heat × temperature change.' },
  { formula: 'ΔU = Q + W', vi: 'Nguyên lý I nhiệt động lực học', en: 'First law of thermodynamics', cat: 'physical', note_vi: 'Năng lượng được bảo toàn.', note_en: 'Energy is conserved.' },
  { formula: 'ΔH = ΔU + PΔV', vi: 'Entanpi', en: 'Enthalpy', cat: 'physical', note_vi: 'Nhiệt phản ứng ở áp suất không đổi.', note_en: 'Heat of reaction at constant pressure.' },
  { formula: 'ΔG = ΔH − TΔS', vi: 'Năng lượng tự do Gibbs', en: 'Gibbs free energy', cat: 'physical', note_vi: 'ΔG < 0 thì phản ứng tự xảy ra.', note_en: 'Reaction is spontaneous when ΔG < 0.' },
  { formula: 'ΔH = ΣΔHsp − ΣΔHtg', vi: 'Định luật Hess', en: 'Hess law', cat: 'physical', note_vi: 'Nhiệt phản ứng không phụ thuộc đường đi.', note_en: 'Reaction enthalpy is path-independent.' },
  { formula: 'S = k·lnW', vi: 'Entropy Boltzmann', en: 'Boltzmann entropy', cat: 'physical', note_vi: 'Entropy đo số cách sắp xếp vi mô.', note_en: 'Entropy counts microscopic arrangements.' },

  // === Cân bằng & tốc độ phản ứng ===
  { formula: 'Kc = [C]ᶜ[D]ᵈ/[A]ᵃ[B]ᵇ', vi: 'Hằng số cân bằng', en: 'Equilibrium constant', cat: 'physical', note_vi: 'Tỉ lệ nồng độ khi phản ứng đạt cân bằng.', note_en: 'Concentration ratio at equilibrium.' },
  { formula: 'ΔG° = −RT·lnK', vi: 'Liên hệ ΔG° và hằng số cân bằng', en: 'Free energy and equilibrium', cat: 'physical', note_vi: 'Nối nhiệt động lực học với cân bằng hóa học.', note_en: 'Links thermodynamics to chemical equilibrium.' },
  { formula: 'v = k[A]ᵐ[B]ⁿ', vi: 'Phương trình tốc độ phản ứng', en: 'Rate law', cat: 'physical', note_vi: 'Bậc phản ứng m, n xác định bằng thực nghiệm.', note_en: 'Orders m, n are determined experimentally.' },
  { formula: 'k = A·e^(−Ea/RT)', vi: 'Phương trình Arrhenius', en: 'Arrhenius equation', cat: 'physical', note_vi: 'Nhiệt độ tăng thì tốc độ phản ứng tăng nhanh.', note_en: 'Reaction rate rises sharply with temperature.' },
  { formula: 't½ = ln2 / k', vi: 'Chu kỳ bán rã (bậc 1)', en: 'Half-life (first order)', cat: 'physical', note_vi: 'Thời gian để lượng chất giảm còn một nửa.', note_en: 'Time for the amount to halve.' },
  { formula: 'v = Vmax[S]/(Km+[S])', vi: 'Phương trình Michaelis-Menten', en: 'Michaelis-Menten equation', cat: 'physical', note_vi: 'Mô tả tốc độ phản ứng có enzym xúc tác.', note_en: 'Describes enzyme-catalysed reaction rates.' },

  // === Điện hóa ===
  { formula: 'E°pin = E°catot − E°anot', vi: 'Suất điện động của pin', en: 'Standard cell potential', cat: 'physical', note_vi: 'Hiệu điện thế chuẩn giữa hai điện cực.', note_en: 'Standard potential difference between electrodes.' },
  { formula: 'E = E° − (RT/nF)lnQ', vi: 'Phương trình Nernst', en: 'Nernst equation', cat: 'physical', note_vi: 'Thế điện cực thay đổi theo nồng độ.', note_en: 'Electrode potential varies with concentration.' },
  { formula: 'm = (A·I·t)/(n·F)', vi: 'Định luật Faraday điện phân', en: 'Faraday law of electrolysis', cat: 'physical', note_vi: 'Khối lượng chất thoát ra tỉ lệ điện lượng.', note_en: 'Mass deposited is proportional to charge passed.' },
  { formula: 'ΔG° = −nFE°', vi: 'Liên hệ ΔG° và thế pin', en: 'Free energy and cell potential', cat: 'physical', note_vi: 'Pin có E° dương thì phản ứng tự xảy ra.', note_en: 'Positive E° means a spontaneous reaction.' },

  // === Cấu tạo nguyên tử & quang phổ ===
  { formula: 'E = h·ν', vi: 'Năng lượng photon (Planck)', en: 'Photon energy', cat: 'physical', note_vi: 'Năng lượng ánh sáng tỉ lệ với tần số.', note_en: 'Light energy is proportional to frequency.' },
  { formula: 'λ = h / (m·v)', vi: 'Bước sóng de Broglie', en: 'de Broglie wavelength', cat: 'physical', note_vi: 'Hạt vật chất cũng có tính chất sóng.', note_en: 'Matter particles also behave as waves.' },
  { formula: 'Δx·Δp ≥ ħ/2', vi: 'Nguyên lý bất định Heisenberg', en: 'Heisenberg uncertainty principle', cat: 'physical', note_vi: 'Không thể biết chính xác đồng thời vị trí và động lượng.', note_en: 'Position and momentum cannot both be exact.' },
  { formula: 'A = ε·l·c', vi: 'Định luật Lambert-Beer', en: 'Beer-Lambert law', cat: 'physical', note_vi: 'Độ hấp thụ tỉ lệ nồng độ — cơ sở phép đo màu.', note_en: 'Absorbance is proportional to concentration.' },
  { formula: 'nλ = 2d·sinθ', vi: 'Định luật Bragg', en: 'Bragg law', cat: 'physical', note_vi: 'Cơ sở xác định cấu trúc tinh thể bằng tia X.', note_en: 'Basis of X-ray crystal structure determination.' },
];
