import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { parseFormula, percentComposition } from '../lib/formula';
import { balance, formatBalanced } from '../lib/balance';
import { convert, dilution, VM_STP, type KnownQuantity } from '../lib/solution';
import { computePh, ACIDS_BASES, KIND_META, type AcidBaseKind } from '../lib/ph';

type Tab = 'mass' | 'convert' | 'dilute' | 'ph' | 'balance';

const QUICK = ['H2O', 'H2SO4', 'NaCl', 'Ca(OH)2', 'C6H12O6', 'CuSO4.5H2O'];

/** Hiển thị số gọn: số rất nhỏ/rất lớn dùng dạng mũ, còn lại bỏ số 0 thừa. */
function fmt(x: number, digits = 4): string {
  if (!Number.isFinite(x)) return '—';
  if (x !== 0 && (Math.abs(x) < 1e-4 || Math.abs(x) >= 1e6)) {
    return x.toExponential(3).replace('e', ' × 10^').replace('^+', '^');
  }
  return String(Number(x.toFixed(digits)));
}

const inputCls =
  'w-full bg-base-850 border border-base-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent';

export default function Calculator() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<Tab>('mass');

  const TABS: { id: Tab; vi: string; en: string }[] = [
    { id: 'mass', vi: 'Khối lượng mol', en: 'Molar mass' },
    { id: 'convert', vi: 'Chuyển đổi', en: 'Convert' },
    { id: 'dilute', vi: 'Pha loãng', en: 'Dilution' },
    { id: 'ph', vi: 'Tính pH', en: 'pH' },
    { id: 'balance', vi: 'Cân bằng PT', en: 'Balance' },
  ];

  return (
    <>
      <PageHeader title={t('nav_calc')} />
      <div className="p-4 md:p-6 max-w-3xl">
        <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
          {TABS.map((x) => (
            <button
              key={x.id}
              onClick={() => setTab(x.id)}
              className={`text-xs px-3 py-2 rounded-lg border whitespace-nowrap transition ${
                tab === x.id
                  ? 'bg-accent/15 border-accent/40 text-accent font-semibold'
                  : 'border-base-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'vi' ? x.vi : x.en}
            </button>
          ))}
        </div>

        {tab === 'mass' && <MassTab />}
        {tab === 'convert' && <ConvertTab />}
        {tab === 'dilute' && <DilutionTab />}
        {tab === 'ph' && <PhTab />}
        {tab === 'balance' && <BalanceTab />}
      </div>
    </>
  );
}

/* ---------------- Khối lượng mol ---------------- */
function MassTab() {
  const { lang } = useLang();
  const [input, setInput] = useState('');
  const res = input.trim() ? parseFormula(input) : null;
  const pct =
    res?.ok && res.comp && res.mass ? percentComposition(res.comp, res.mass) : [];

  return (
    <div className="space-y-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={lang === 'vi' ? 'Nhập công thức, vd H2SO4' : 'Enter formula, e.g. H2SO4'}
        className="w-full bg-base-850 border border-base-700 rounded-xl px-4 py-3 text-lg font-mono outline-none focus:border-accent"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      <div className="flex flex-wrap gap-1.5">
        {QUICK.map((q) => (
          <button
            key={q}
            onClick={() => setInput(q)}
            className="text-xs font-mono px-2 py-1 rounded-lg bg-base-800 hover:bg-base-700 text-slate-300"
          >
            {q}
          </button>
        ))}
      </div>

      {res && !res.ok && (
        <div className="card border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-200">
          {res.error}
        </div>
      )}

      {res?.ok && res.mass != null && (
        <>
          <div className="card p-5 text-center">
            <div className="text-xs text-slate-400 mb-1">
              {lang === 'vi' ? 'Khối lượng mol' : 'Molar mass'}
            </div>
            <div className="text-4xl font-bold text-accent font-mono">{res.mass}</div>
            <div className="text-sm text-slate-400 mt-1">g/mol</div>
          </div>

          <div className="card divide-y divide-base-800">
            <div className="px-4 py-2 text-xs text-slate-500 flex justify-between">
              <span>{lang === 'vi' ? 'Nguyên tố' : 'Element'}</span>
              <span>{lang === 'vi' ? '% khối lượng' : 'mass %'}</span>
            </div>
            {pct.map((p) => (
              <div key={p.sym} className="px-4 py-2.5 flex items-center gap-3">
                <span className="font-mono font-semibold text-slate-100 w-10">{p.sym}</span>
                <span className="text-xs text-slate-500 w-8">×{p.count}</span>
                <div className="flex-1 h-2 bg-base-800 rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${p.percent}%` }} />
                </div>
                <span className="font-mono text-sm text-slate-200 w-16 text-right">
                  {p.percent}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------- Chuyển đổi mol ↔ khối lượng ↔ thể tích ↔ nồng độ ---------------- */
function ConvertTab() {
  const { lang } = useLang();
  const [formula, setFormula] = useState('H2O');
  const [known, setKnown] = useState<KnownQuantity>('mass');
  const [value, setValue] = useState('18');
  const [volume, setVolume] = useState('');

  const parsed = formula.trim() ? parseFormula(formula) : null;
  const M = parsed?.ok ? parsed.mass! : null;
  const v = parseFloat(value.replace(',', '.'));
  const solV = volume.trim() ? parseFloat(volume.replace(',', '.')) : null;

  const res =
    M && Number.isFinite(v) && v > 0
      ? convert({ M, known, value: v, solutionVolume: solV })
      : null;

  const KNOWNS: { id: KnownQuantity; vi: string; en: string; unit: string }[] = [
    { id: 'mass', vi: 'Khối lượng', en: 'Mass', unit: 'g' },
    { id: 'moles', vi: 'Số mol', en: 'Moles', unit: 'mol' },
    { id: 'gasVolume', vi: 'Thể tích khí (đktc)', en: 'Gas volume (STP)', unit: 'L' },
  ];
  const cur = KNOWNS.find((k) => k.id === known)!;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-slate-500">
          {lang === 'vi' ? 'Công thức chất' : 'Formula'}
        </label>
        <input
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          className={`${inputCls} font-mono mt-1`}
          spellCheck={false}
          autoCapitalize="none"
        />
        {parsed && !parsed.ok && (
          <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">{parsed.error}</p>
        )}
        {M && (
          <p className="text-xs text-slate-500 mt-1">
            M = <span className="font-mono text-slate-300">{M}</span> g/mol
          </p>
        )}
      </div>

      <div>
        <label className="text-xs text-slate-500">
          {lang === 'vi' ? 'Đại lượng đã biết' : 'Known quantity'}
        </label>
        <div className="flex gap-1.5 mt-1 flex-wrap">
          {KNOWNS.map((k) => (
            <button
              key={k.id}
              onClick={() => setKnown(k.id)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                known === k.id
                  ? 'bg-accent/15 border-accent/40 text-accent'
                  : 'border-base-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'vi' ? k.vi : k.en}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-slate-500">
            {lang === 'vi' ? cur.vi : cur.en} ({cur.unit})
          </label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputMode="decimal"
            className={`${inputCls} font-mono mt-1`}
          />
        </div>
        <div>
          <label className="text-xs text-slate-500">
            {lang === 'vi' ? 'Thể tích dung dịch (L)' : 'Solution volume (L)'}
          </label>
          <input
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            inputMode="decimal"
            placeholder={lang === 'vi' ? 'không bắt buộc' : 'optional'}
            className={`${inputCls} font-mono mt-1`}
          />
          <p className="text-[11px] text-slate-600 mt-1">
            {lang === 'vi' ? '500 mL = 0,5 L' : '500 mL = 0.5 L'}
          </p>
        </div>
      </div>

      {res && (
        <div className="card divide-y divide-base-800">
          {[
            { l: lang === 'vi' ? 'Số mol' : 'Moles', v: `${fmt(res.moles)} mol` },
            { l: lang === 'vi' ? 'Khối lượng' : 'Mass', v: `${fmt(res.mass)} g` },
            {
              l: lang === 'vi' ? 'Thể tích khí (đktc)' : 'Gas volume (STP)',
              v: `${fmt(res.gasVolume)} L`,
            },
            {
              l: lang === 'vi' ? 'Số phân tử / nguyên tử' : 'Particles',
              v: fmt(res.particles),
            },
            ...(res.concentration !== null
              ? [
                  {
                    l: lang === 'vi' ? 'Nồng độ mol' : 'Molar concentration',
                    v: `${fmt(res.concentration)} mol/L`,
                  },
                ]
              : []),
          ].map((r) => (
            <div key={r.l} className="flex justify-between gap-3 px-4 py-2.5">
              <span className="text-sm text-slate-400">{r.l}</span>
              <span className="text-sm font-mono font-medium text-slate-100">{r.v}</span>
            </div>
          ))}
        </div>
      )}

      <p className="text-[11px] text-slate-600">
        {lang === 'vi'
          ? `Thể tích khí quy về điều kiện tiêu chuẩn: 1 mol = ${VM_STP} L.`
          : `Gas volume at STP: 1 mol = ${VM_STP} L.`}
      </p>
    </div>
  );
}

/* ---------------- Pha loãng ---------------- */
function DilutionTab() {
  const { lang } = useLang();
  const [f, setF] = useState({ c1: '1', v1: '100', c2: '', v2: '500' });

  const num = (s: string) => {
    const x = s.trim();
    return x === '' ? null : parseFloat(x.replace(',', '.'));
  };
  const vals = { c1: num(f.c1), v1: num(f.v1), c2: num(f.c2), v2: num(f.v2) };
  const soTrong = Object.values(vals).filter((x) => x === null).length;
  const hopLe = Object.values(vals).every((x) => x === null || Number.isFinite(x));

  let out: { field: string; value: number } | null = null;
  let loi: string | null = null;
  if (soTrong === 1 && hopLe) {
    try {
      out = dilution(vals.c1, vals.v1, vals.c2, vals.v2);
    } catch (e) {
      loi = (e as Error).message;
    }
  }

  const FIELDS = [
    { id: 'c1' as const, label: 'C₁', hint: lang === 'vi' ? 'nồng độ đầu' : 'initial conc.' },
    { id: 'v1' as const, label: 'V₁', hint: lang === 'vi' ? 'thể tích đầu' : 'initial volume' },
    { id: 'c2' as const, label: 'C₂', hint: lang === 'vi' ? 'nồng độ sau' : 'final conc.' },
    { id: 'v2' as const, label: 'V₂', hint: lang === 'vi' ? 'thể tích sau' : 'final volume' },
  ];

  return (
    <div className="space-y-4">
      <div className="card p-4 text-center">
        <div className="text-lg font-mono text-accent">C₁ × V₁ = C₂ × V₂</div>
        <p className="text-xs text-slate-500 mt-1">
          {lang === 'vi'
            ? 'Để trống đúng một ô, app tính ô đó.'
            : 'Leave exactly one box empty and it will be calculated.'}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FIELDS.map((fd) => (
          <div key={fd.id}>
            <label className="text-xs text-slate-400 font-mono">{fd.label}</label>
            <input
              value={f[fd.id]}
              onChange={(e) => setF({ ...f, [fd.id]: e.target.value })}
              inputMode="decimal"
              className={`${inputCls} font-mono mt-1 ${
                out?.field === fd.id ? 'border-accent bg-accent/10' : ''
              }`}
              placeholder={out?.field === fd.id ? fmt(out.value) : ''}
            />
            <p className="text-[11px] text-slate-600 mt-0.5">{fd.hint}</p>
          </div>
        ))}
      </div>

      {soTrong !== 1 && (
        <p className="text-xs text-amber-700 dark:text-amber-300">
          {lang === 'vi'
            ? `Đang để trống ${soTrong} ô — cần đúng 1 ô.`
            : `${soTrong} boxes empty — need exactly 1.`}
        </p>
      )}
      {loi && <p className="text-xs text-rose-700 dark:text-rose-300">{loi}</p>}

      {out && (
        <div className="card p-5 text-center">
          <div className="text-xs text-slate-400 mb-1">
            {lang === 'vi' ? 'Kết quả' : 'Result'}
          </div>
          <div className="text-3xl font-bold text-accent font-mono">
            {FIELDS.find((x) => x.id === out.field)!.label} = {fmt(out.value)}
          </div>
        </div>
      )}

      <p className="text-[11px] text-slate-600">
        {lang === 'vi'
          ? 'Nồng độ dùng chung một đơn vị, thể tích dùng chung một đơn vị (mL hay L đều được, miễn là giống nhau).'
          : 'Use the same unit for both concentrations and the same unit for both volumes (mL or L).'}
      </p>
    </div>
  );
}

/* ---------------- Tính pH ---------------- */
function PhTab() {
  const { lang } = useLang();
  const [chon, setChon] = useState(0); // chỉ số trong ACIDS_BASES
  const [C, setC] = useState('0.01');
  const chat = ACIDS_BASES[chon];

  const c = parseFloat(C.replace(',', '.'));
  let res: ReturnType<typeof computePh> | null = null;
  let loi: string | null = null;
  if (Number.isFinite(c) && c > 0) {
    try {
      res = computePh({ kind: chat.kind, C: c, z: chat.z, k: chat.k });
    } catch (e) {
      loi = (e as Error).message;
    }
  }

  const mauSac =
    res === null
      ? ''
      : res.pH < 6.5
        ? 'text-rose-700 dark:text-rose-300'
        : res.pH > 7.5
          ? 'text-sky-700 dark:text-sky-300'
          : 'text-emerald-700 dark:text-emerald-300';

  const nhom: AcidBaseKind[] = ['strongAcid', 'weakAcid', 'strongBase', 'weakBase'];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-slate-500">
          {lang === 'vi' ? 'Chọn chất' : 'Choose substance'}
        </label>
        <div className="space-y-2 mt-1">
          {nhom.map((k) => (
            <div key={k}>
              <div className="text-[11px] text-slate-600 mb-1">
                {lang === 'vi' ? KIND_META[k].vi : KIND_META[k].en}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ACIDS_BASES.map((ab, i) =>
                  ab.kind !== k ? null : (
                    <button
                      key={ab.formula}
                      onClick={() => setChon(i)}
                      className={`text-xs font-mono px-2.5 py-1.5 rounded-lg border transition ${
                        chon === i
                          ? 'bg-accent/15 border-accent/40 text-accent'
                          : 'border-base-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {ab.formula}
                    </button>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-slate-500">
          {lang === 'vi' ? 'Nồng độ (mol/L)' : 'Concentration (mol/L)'}
        </label>
        <input
          value={C}
          onChange={(e) => setC(e.target.value)}
          inputMode="decimal"
          className={`${inputCls} font-mono mt-1`}
        />
        <div className="flex gap-1.5 mt-1.5 flex-wrap">
          {['1', '0.1', '0.01', '0.001', '1e-8'].map((q) => (
            <button
              key={q}
              onClick={() => setC(q)}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-base-800 hover:bg-base-700 text-slate-400"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="card p-3 text-sm">
        <span className="text-slate-500 text-xs">
          {lang === 'vi' ? 'Đang tính cho: ' : 'Calculating for: '}
        </span>
        <span className="font-mono text-slate-200">{chat.formula}</span>
        <span className="text-slate-400"> — {lang === 'vi' ? chat.vi : chat.en}</span>
        <span className="text-slate-500 text-xs">
          {' '}
          ({lang === 'vi' ? KIND_META[chat.kind].vi : KIND_META[chat.kind].en}
          {chat.k ? `, ${chat.kind === 'weakAcid' ? 'Ka' : 'Kb'} = ${chat.k}` : ''}
          {chat.z && chat.z > 1 ? `, ${chat.z} nấc` : ''})
        </span>
      </div>

      {loi && <p className="text-xs text-rose-700 dark:text-rose-300">{loi}</p>}

      {res && (
        <>
          <div className="card p-5 text-center">
            <div className="text-xs text-slate-400 mb-1">pH</div>
            <div className={`text-5xl font-bold font-mono ${mauSac}`}>
              {res.pH.toFixed(2)}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              {res.pH < 6.5
                ? lang === 'vi' ? 'Môi trường axit' : 'Acidic'
                : res.pH > 7.5
                  ? lang === 'vi' ? 'Môi trường bazơ' : 'Basic'
                  : lang === 'vi' ? 'Gần trung tính' : 'Near neutral'}
            </div>
          </div>

          <div className="card divide-y divide-base-800">
            {[
              { l: 'pOH', v: res.pOH.toFixed(2) },
              { l: '[H⁺]', v: `${fmt(res.h)} mol/L` },
              { l: '[OH⁻]', v: `${fmt(res.oh)} mol/L` },
            ].map((r) => (
              <div key={r.l} className="flex justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-400 font-mono">{r.l}</span>
                <span className="text-sm font-mono font-medium text-slate-100">{r.v}</span>
              </div>
            ))}
          </div>

          <div className="card p-3">
            <div className="text-[11px] text-slate-500 mb-1">
              {lang === 'vi' ? 'Công thức đã dùng' : 'Formula used'}
            </div>
            <div className="text-xs font-mono text-slate-300">{res.formula}</div>
          </div>

          {(chat.note_vi || chat.note_en) && (
            <p className="text-[11px] text-amber-700 dark:text-amber-300/80">
              ⚠ {lang === 'vi' ? chat.note_vi : chat.note_en}
            </p>
          )}
        </>
      )}
    </div>
  );
}

/* ---------------- Cân bằng phương trình ---------------- */
function BalanceTab() {
  const { lang } = useLang();
  const [input, setInput] = useState('');
  const res = input.trim() ? balance(input) : null;

  return (
    <div className="space-y-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={lang === 'vi' ? 'vd: H2 + O2 -> H2O' : 'e.g. H2 + O2 -> H2O'}
        className="w-full bg-base-850 border border-base-700 rounded-xl px-4 py-3 text-base font-mono outline-none focus:border-accent"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      <p className="text-xs text-slate-500">
        {lang === 'vi'
          ? 'Dùng dấu → hoặc -> hoặc = giữa hai vế, dấu + giữa các chất.'
          : 'Use →, -> or = between sides, + between species.'}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {['H2 + O2 -> H2O', 'Fe + O2 -> Fe2O3', 'C3H8 + O2 -> CO2 + H2O'].map((q) => (
          <button
            key={q}
            onClick={() => setInput(q)}
            className="text-xs font-mono px-2 py-1 rounded-lg bg-base-800 hover:bg-base-700 text-slate-300"
          >
            {q}
          </button>
        ))}
      </div>

      {res && !res.ok && (
        <div className="card border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-200">
          {res.error}
        </div>
      )}

      {res?.ok && (
        <div className="card p-5 text-center">
          <div className="text-xs text-slate-400 mb-2">
            {lang === 'vi' ? 'Đã cân bằng' : 'Balanced'}
          </div>
          <div className="text-lg md:text-xl font-mono font-semibold text-accent break-words">
            {formatBalanced(res)}
          </div>
        </div>
      )}
    </div>
  );
}
