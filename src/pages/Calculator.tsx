import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { parseFormula, percentComposition } from '../lib/formula';
import { balance, formatBalanced } from '../lib/balance';

type Tab = 'mass' | 'balance';

const QUICK = ['H2O', 'H2SO4', 'NaCl', 'Ca(OH)2', 'C6H12O6', 'CuSO4.5H2O'];

export default function Calculator() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<Tab>('mass');

  return (
    <>
      <PageHeader title={t('nav_calc')} />
      <div className="p-4 md:p-6 max-w-2xl">
        {/* Chọn tab */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTab('mass')}
            className={tab === 'mass' ? 'btn-accent flex-1' : 'btn-ghost flex-1'}
          >
            {lang === 'vi' ? 'Khối lượng mol' : 'Molar mass'}
          </button>
          <button
            onClick={() => setTab('balance')}
            className={tab === 'balance' ? 'btn-accent flex-1' : 'btn-ghost flex-1'}
          >
            {lang === 'vi' ? 'Cân bằng PT' : 'Balance eq.'}
          </button>
        </div>

        {tab === 'mass' ? <MassTab /> : <BalanceTab />}
      </div>
    </>
  );
}

function MassTab() {
  const { lang } = useLang();
  const [input, setInput] = useState('');
  const res = input.trim() ? parseFormula(input) : null;
  const pct =
    res?.ok && res.comp && res.mass
      ? percentComposition(res.comp, res.mass)
      : [];

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
        <div className="card border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">
          {res.error}
        </div>
      )}

      {res?.ok && res.mass != null && (
        <>
          <div className="card p-5 text-center">
            <div className="text-xs text-slate-400 mb-1">
              {lang === 'vi' ? 'Khối lượng mol' : 'Molar mass'}
            </div>
            <div className="text-4xl font-bold text-accent font-mono">
              {res.mass}
            </div>
            <div className="text-sm text-slate-400 mt-1">g/mol</div>
          </div>

          <div className="card divide-y divide-base-800">
            <div className="px-4 py-2 text-xs text-slate-500 flex justify-between">
              <span>{lang === 'vi' ? 'Nguyên tố' : 'Element'}</span>
              <span>{lang === 'vi' ? '% khối lượng' : 'mass %'}</span>
            </div>
            {pct.map((p) => (
              <div key={p.sym} className="px-4 py-2.5 flex items-center gap-3">
                <span className="font-mono font-semibold text-slate-100 w-10">
                  {p.sym}
                </span>
                <span className="text-xs text-slate-500 w-8">×{p.count}</span>
                <div className="flex-1 h-2 bg-base-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${p.percent}%` }}
                  />
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
        {['H2 + O2 -> H2O', 'Fe + O2 -> Fe2O3', 'C3H8 + O2 -> CO2 + H2O'].map(
          (q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="text-xs font-mono px-2 py-1 rounded-lg bg-base-800 hover:bg-base-700 text-slate-300"
            >
              {q}
            </button>
          ),
        )}
      </div>

      {res && !res.ok && (
        <div className="card border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">
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
