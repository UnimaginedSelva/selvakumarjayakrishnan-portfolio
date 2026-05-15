// SelvaOS — Personal Dashboard
// React app compiled via browser Babel (no build step required)

const { useState, useEffect, useCallback } = React;

const STORAGE_KEY = "selvaos_v1";

const DEFAULT_EXPENSE_CATEGORIES = [
  "Housing & Rent", "Groceries", "Dining Out", "Transport & Fuel",
  "Utilities", "Healthcare", "Entertainment", "Clothing & Shopping",
  "Education", "Savings & Investments"
];

const DEFAULT_MORNING_RITUALS = [
  { id: "m1", label: "20 mins movement & exercise" },
  { id: "m2", label: "20 mins mindfulness & visualisation" },
  { id: "m3", label: "20 mins journaling & intentions" },
];

const DEFAULT_EVENING_RITUALS = [
  { id: "e1", label: "10 mins light stretching / body scan" },
  { id: "e2", label: "10 mins affirmations & reflection" },
  { id: "e3", label: "10 mins journaling & tomorrow's plan" },
];

const todayStr = () => new Date().toISOString().split("T")[0];
const currentMonth = () => new Date().toISOString().slice(0, 7);

const fmtMonth = (ym) => {
  const [y, m] = ym.split('-');
  return new Date(+y, +m - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const shiftMonth = (ym, delta) => {
  const [y, m] = ym.split('-').map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const fmt = (n, cur = "MYR") =>
  new Intl.NumberFormat("en-MY", {
    style: "currency", currency: cur,
    minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(n || 0);

const initState = () => ({
  currency: "MYR",
  income: { byMonth: {} },
  // expenses.byMonth[month][category] = { planned, actual }
  expenses: { categories: [...DEFAULT_EXPENSE_CATEGORIES], byMonth: {} },
  cards: [],
  health: {
    morningRituals: [...DEFAULT_MORNING_RITUALS],
    eveningRituals: [...DEFAULT_EVENING_RITUALS],
    log: {}
  }
});

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const base = initState();
      const merged = { ...base, ...parsed, health: { ...base.health, ...(parsed.health || {}) } };

      // Migrate income
      if (parsed.income && !parsed.income.byMonth) {
        const cm = currentMonth();
        merged.income = { byMonth: { [cm]: { salary: parsed.income.salary || "", other: parsed.income.other || [] } } };
      } else {
        merged.income = { byMonth: {}, ...(parsed.income || {}) };
      }

      // Migrate expenses — old format had entries[], new format has { [category]: { planned, actual } }
      if (parsed.expenses) {
        const cats = parsed.expenses.categories || [...DEFAULT_EXPENSE_CATEGORIES];
        const oldByMonth = parsed.expenses.byMonth || {};
        const newByMonth = {};
        Object.entries(oldByMonth).forEach(([month, monthData]) => {
          if (monthData.entries) {
            // Old entries format → sum per category as actual
            const catData = {};
            (monthData.entries || []).forEach(e => {
              if (!catData[e.category]) catData[e.category] = { planned: '', actual: 0 };
              catData[e.category].actual = (catData[e.category].actual || 0) + (parseFloat(e.amount) || 0);
            });
            // Convert actual numbers to strings
            Object.keys(catData).forEach(k => { catData[k].actual = String(catData[k].actual || ''); });
            newByMonth[month] = catData;
          } else {
            // Already new format
            newByMonth[month] = monthData;
          }
        });
        merged.expenses = { categories: cats, byMonth: newByMonth };
      } else {
        merged.expenses = { ...base.expenses };
      }

      // Migrate cards
      if (Array.isArray(parsed.cards)) {
        const cm = currentMonth();
        merged.cards = parsed.cards.map((c, i) => {
          if (c.months) return c;
          return {
            id: c.id || ('card-' + i),
            name: c.name || '',
            billingDate: c.billingDate || '',
            months: { [cm]: { planned: c.limit || '', outstanding: c.balance || '' } }
          };
        });
      }

      return merged;
    }
  } catch (e) {}
  return initState();
};

// ─── CSS ───────────────────────────────────────────────────────────────────────
const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  :root {
    --bg: #0f172a; --surface: #1e293b; --surface2: #263044;
    --border: rgba(148,163,184,0.15); --text: #f1f5f9; --muted: #94a3b8;
    --faint: #475569; --accent: #2563eb; --accent2: #3b82f6;
    --success: #16a34a; --warn: #d97706; --danger: #dc2626;
    --radius: 12px; --radius-sm: 8px;
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 1.5; min-height: 100vh; overflow-x: hidden; }
  input, select, button { font-family: inherit; }
  input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }

  .app-header { position: sticky; top: 0; z-index: 50; background: rgba(15,23,42,0.95); backdrop-filter: blur(12px); border-bottom: 0.5px solid var(--border); padding: 0 1rem; display: flex; align-items: center; justify-content: space-between; height: 56px; }
  .logo { font-size: 18px; font-weight: 700; letter-spacing: -0.5px; }
  .logo span { color: var(--accent2); }
  .logo em { font-style: normal; font-size: 11px; font-weight: 400; color: var(--faint); margin-left: 6px; }

  .content { max-width: 540px; margin: 0 auto; padding: 1.25rem 1rem 5rem; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .section-title { font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }

  .month-nav { display: flex; align-items: center; gap: 6px; background: var(--surface); border-radius: 20px; padding: 4px 8px; border: 0.5px solid var(--border); }
  .month-nav-btn { width: 24px; height: 24px; border-radius: 6px; border: none; background: transparent; color: var(--muted); font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; padding: 0; }
  .month-nav-btn:hover { background: var(--surface2); color: var(--text); }
  .month-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .month-nav-label { font-size: 12px; font-weight: 600; color: var(--text); white-space: nowrap; min-width: 80px; text-align: center; }
  .month-badge { font-size: 10px; font-weight: 600; padding: 1px 6px; border-radius: 8px; background: rgba(37,99,235,0.2); color: var(--accent2); }

  .sub-tabs { display: flex; gap: 6px; margin-bottom: 1.25rem; overflow-x: auto; padding-bottom: 4px; }
  .sub-tabs::-webkit-scrollbar { display: none; }
  .sub-tab { flex-shrink: 0; padding: 6px 14px; border-radius: 20px; border: 0.5px solid var(--border); background: transparent; color: var(--muted); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; }
  .sub-tab.active { background: var(--accent); color: #fff; border-color: var(--accent); }

  .card { background: var(--surface); border-radius: var(--radius); border: 0.5px solid var(--border); padding: 1.25rem; margin-bottom: 1rem; }
  .card-title { font-size: 11px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1rem; }

  .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 1rem; }
  .metric { background: var(--surface2); border-radius: var(--radius-sm); padding: 12px 14px; border: 0.5px solid var(--border); }
  .metric-label { font-size: 11px; color: var(--muted); margin-bottom: 4px; font-weight: 500; }
  .metric-value { font-size: 18px; font-weight: 700; letter-spacing: -0.5px; }
  .metric-sub { font-size: 10px; color: var(--faint); margin-top: 2px; }

  .progress { height: 5px; border-radius: 3px; background: var(--surface2); overflow: hidden; margin-top: 8px; }
  .progress-fill { height: 100%; border-radius: 3px; transition: width 0.4s ease; }

  .field { margin-bottom: 12px; }
  .field label { display: block; font-size: 12px; color: var(--muted); margin-bottom: 4px; font-weight: 500; }
  .input { width: 100%; padding: 10px 12px; border-radius: var(--radius-sm); border: 0.5px solid var(--border); background: var(--surface2); color: var(--text); font-size: 14px; outline: none; transition: border-color 0.15s; }
  .input:focus { border-color: var(--accent2); }
  .input-sm { padding: 7px 10px; font-size: 13px; }
  .select { width: 100%; padding: 10px 12px; border-radius: var(--radius-sm); border: 0.5px solid var(--border); background: var(--surface2); color: var(--text); font-size: 14px; outline: none; appearance: none; }

  .btn { padding: 9px 16px; border-radius: var(--radius-sm); border: 0.5px solid var(--border); background: transparent; color: var(--text); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
  .btn:active { transform: scale(0.97); }
  .btn-primary { background: var(--accent); border-color: var(--accent); color: #fff; }
  .btn-ghost { background: var(--surface2); border-color: var(--border); color: var(--muted); font-size: 12px; }
  .btn-danger { background: rgba(220,38,38,0.15); border-color: var(--danger); color: var(--danger); }
  .btn-sm { padding: 5px 10px; font-size: 12px; }

  .row { display: flex; align-items: center; gap: 8px; }
  .row-between { display: flex; align-items: center; justify-content: space-between; }

  /* Budget row — category plan vs actual */
  .budget-row { padding: 10px 0; border-bottom: 0.5px solid var(--border); }
  .budget-row:last-child { border-bottom: none; }
  .budget-row-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
  .budget-cat-name { font-size: 13px; font-weight: 500; }
  .budget-remaining { font-size: 12px; font-weight: 600; }
  .budget-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .budget-input-label { font-size: 10px; color: var(--faint); margin-bottom: 2px; }

  /* Spend row (overview breakdown) */
  .spend-row { display: flex; align-items: center; justify-content: space-between; padding: 9px 0; border-bottom: 0.5px solid var(--border); }
  .spend-row:last-child { border-bottom: none; }
  .spend-cat { font-size: 13px; font-weight: 500; }
  .spend-meta { font-size: 11px; color: var(--faint); margin-top: 1px; }
  .spend-amt { font-size: 15px; font-weight: 700; }

  /* Credit card widget */
  .cc-card { background: linear-gradient(135deg, #1e3a5f 0%, #1e293b 100%); border-radius: var(--radius); border: 0.5px solid rgba(37,99,235,0.3); padding: 1rem; margin-bottom: 10px; }
  .cc-name { font-size: 14px; font-weight: 600; margin-bottom: 8px; }
  .cc-stats { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-top: 8px; }
  .cc-billing { font-size: 11px; color: var(--faint); margin-top: 6px; }

  /* Ritual rows */
  .ritual-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 0.5px solid var(--border); cursor: pointer; user-select: none; transition: opacity 0.2s; }
  .ritual-row:last-child { border-bottom: none; }
  .ritual-row.done { opacity: 0.55; }
  .check-box { width: 24px; height: 24px; border-radius: 6px; flex-shrink: 0; border: 2px solid var(--faint); background: transparent; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
  .check-box.checked { background: var(--accent); border-color: var(--accent); }
  .ritual-label { font-size: 14px; }
  .ritual-label.done { text-decoration: line-through; color: var(--faint); }

  .badge { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 10px; background: rgba(37,99,235,0.2); color: var(--accent2); letter-spacing: 0.04em; }

  /* History */
  .history-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 1rem; }
  .history-cell { aspect-ratio: 1; border-radius: 4px; cursor: pointer; transition: transform 0.1s; }
  .history-cell:active { transform: scale(0.9); }
  .legend { display: flex; gap: 12px; flex-wrap: wrap; }
  .legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--muted); }
  .legend-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }

  .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(15,23,42,0.97); backdrop-filter: blur(12px); border-top: 0.5px solid var(--border); display: flex; padding: 8px 0 max(8px, env(safe-area-inset-bottom)); z-index: 50; }
  .bottom-nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 4px 0; background: none; border: none; cursor: pointer; font-size: 10px; font-weight: 500; color: var(--faint); transition: color 0.15s; }
  .bottom-nav-btn.active { color: var(--accent2); }
  .bottom-nav-btn svg { width: 22px; height: 22px; }

  .install-banner { background: rgba(37,99,235,0.12); border: 0.5px solid rgba(37,99,235,0.3); border-radius: var(--radius); padding: 12px 14px; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; }
  .install-banner-text { font-size: 13px; color: var(--muted); flex: 1; line-height: 1.4; }

  .carry-notice { display: flex; align-items: center; justify-content: space-between; background: rgba(37,99,235,0.08); border: 0.5px solid rgba(37,99,235,0.2); border-radius: var(--radius-sm); padding: 10px 12px; margin-bottom: 12px; }
  .carry-notice-text { font-size: 12px; color: var(--muted); }

  .date-label { font-size: 12px; color: var(--muted); }
  .empty { text-align: center; padding: 2rem 0; color: var(--faint); font-size: 14px; }
  .divider { height: 0.5px; background: var(--border); margin: 1rem 0; }

  /* Overview summary banner */
  .summary-banner { border-radius: var(--radius); padding: 1rem 1.25rem; margin-bottom: 1rem; border: 0.5px solid; }
  .summary-banner.positive { background: rgba(22,163,74,0.08); border-color: rgba(22,163,74,0.3); }
  .summary-banner.negative { background: rgba(220,38,38,0.08); border-color: rgba(220,38,38,0.3); }
  .summary-banner.neutral { background: var(--surface); border-color: var(--border); }

  @media (max-width: 380px) {
    .content { padding: 1rem 0.75rem 5rem; }
    .metric-value { font-size: 16px; }
    .month-nav-label { min-width: 68px; font-size: 11px; }
  }
`;

const Check = () => (
  React.createElement('svg', { width: 13, height: 10, viewBox: "0 0 13 10", fill: "none" },
    React.createElement('path', { d: "M1 5L5 8.5L12 1", stroke: "#fff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
  )
);

const FinIcon = ({ active }) => (
  React.createElement('svg', { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: active ? 2.2 : 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement('rect', { x: 2, y: 5, width: 20, height: 14, rx: 3 }),
    React.createElement('line', { x1: 2, y1: 10, x2: 22, y2: 10 }),
    React.createElement('line', { x1: 6, y1: 15, x2: 10, y2: 15 })
  )
);
const HealthIcon = ({ active }) => (
  React.createElement('svg', { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: active ? 2.2 : 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement('path', { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" })
  )
);

// ─── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const [state, setState] = useState(load);
  const [tab, setTab] = useState("finance");
  const [finTab, setFinTab] = useState("overview");
  const [healthTab, setHealthTab] = useState("today");
  const [showInstall, setShowInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [selMonth, setSelMonth] = useState(currentMonth);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }, [state]);

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); setShowInstall(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const update = useCallback((fn) => setState(prev => fn(prev)), []);
  const today = todayStr();
  const cm = currentMonth();
  const todayLog = state.health.log[today] || { morning: {}, evening: {} };

  // ── Data accessors ───────────────────────────────────────────────────────────
  const getMonthIncome = (month) => state.income.byMonth?.[month] || { salary: "", other: [] };

  // expenses.byMonth[month] = { [category]: { planned, actual } }
  const getMonthCats = (month) => state.expenses.byMonth?.[month] || {};

  const updateMonthIncome = (month, fn) => update(s => {
    const cur = s.income.byMonth?.[month] || { salary: "", other: [] };
    return { ...s, income: { ...s.income, byMonth: { ...s.income.byMonth, [month]: fn(cur) } } };
  });

  const updateCatField = (month, cat, field, value) => update(s => {
    const monthData = s.expenses.byMonth?.[month] || {};
    const catData = monthData[cat] || { planned: '', actual: '' };
    return {
      ...s,
      expenses: {
        ...s.expenses,
        byMonth: {
          ...s.expenses.byMonth,
          [month]: { ...monthData, [cat]: { ...catData, [field]: value } }
        }
      }
    };
  });

  const updateCardMonth = (cardId, field, value) => update(s => ({
    ...s,
    cards: s.cards.map(c => {
      if (c.id !== cardId) return c;
      const prev = c.months?.[selMonth] || {};
      return { ...c, months: { ...c.months, [selMonth]: { ...prev, [field]: value } } };
    })
  }));

  // ── Totals ───────────────────────────────────────────────────────────────────
  const totalIncome = (month) => {
    const inc = getMonthIncome(month || selMonth);
    return (parseFloat(inc.salary) || 0) + (inc.other || []).reduce((a, x) => a + (parseFloat(x.amount) || 0), 0);
  };

  const totalActualExpenses = (month) => {
    const m = month || selMonth;
    const cats = getMonthCats(m);
    const catTotal = Object.values(cats).reduce((a, v) => a + (parseFloat(v.actual) || 0), 0);
    const cardTotal = (state.cards || []).reduce((a, card) => a + (parseFloat(card.months?.[m]?.outstanding) || 0), 0);
    return catTotal + cardTotal;
  };

  const totalPlannedExpenses = (month) => {
    const m = month || selMonth;
    const cats = getMonthCats(m);
    const catTotal = Object.values(cats).reduce((a, v) => a + (parseFloat(v.planned) || 0), 0);
    const cardTotal = (state.cards || []).reduce((a, card) => a + (parseFloat(card.months?.[m]?.planned) || 0), 0);
    return catTotal + cardTotal;
  };

  const ritualScore = (key) => {
    const log = state.health.log[key];
    if (!log) return null;
    const total = state.health.morningRituals.length + state.health.eveningRituals.length;
    const done = Object.values(log.morning || {}).filter(Boolean).length + Object.values(log.evening || {}).filter(Boolean).length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  const toggleRitual = (period, id) => {
    update(s => {
      const log = { ...s.health.log };
      const day = { morning: {}, evening: {}, ...(log[today] || {}) };
      day[period] = { ...day[period], [id]: !day[period][id] };
      log[today] = day;
      return { ...s, health: { ...s.health, log } };
    });
  };

  // ── Month Navigator ──────────────────────────────────────────────────────────
  const MonthNav = () => {
    const maxFuture = shiftMonth(cm, 12);
    const atMax = selMonth >= maxFuture;
    return React.createElement('div', { className: 'month-nav' },
      React.createElement('button', { className: 'month-nav-btn', onClick: () => setSelMonth(shiftMonth(selMonth, -1)) }, '‹'),
      React.createElement('span', { className: 'month-nav-label' },
        fmtMonth(selMonth),
        selMonth === cm && React.createElement('span', { className: 'month-badge', style: { marginLeft: 5 } }, 'now')
      ),
      React.createElement('button', { className: 'month-nav-btn', disabled: atMax, onClick: () => setSelMonth(shiftMonth(selMonth, 1)) }, '›')
    );
  };

  // ── Finance: Overview ────────────────────────────────────────────────────────
  const FinOverview = () => {
    const inc = totalIncome();
    const planned = totalPlannedExpenses();
    const actual = totalActualExpenses();
    const plannedSaving = inc - planned;
    const actualSaving = inc - actual;
    const hasIncome = inc > 0;
    const hasAny = hasIncome || planned > 0 || actual > 0;

    // Build breakdown rows: categories + cards, only those with data
    const cats = getMonthCats(selMonth);
    const breakdownRows = [];
    state.expenses.categories.forEach(cat => {
      const d = cats[cat];
      if (!d || (!d.planned && !d.actual)) return;
      breakdownRows.push({ name: cat, planned: parseFloat(d.planned) || 0, actual: parseFloat(d.actual) || 0, isCard: false });
    });
    (state.cards || []).forEach(card => {
      const md = card.months?.[selMonth] || {};
      if (!md.planned && !md.outstanding) return;
      breakdownRows.push({ name: card.name, planned: parseFloat(md.planned) || 0, actual: parseFloat(md.outstanding) || 0, isCard: true });
    });

    if (!hasAny) return React.createElement('div', { className: 'card' },
      React.createElement('div', { className: 'empty' }, `No data for ${fmtMonth(selMonth)} yet. Start by setting your income and planned spend.`)
    );

    return React.createElement('div', null,

      // Top summary: income vs planned vs actual savings
      React.createElement('div', { className: 'metric-grid' },
        React.createElement('div', { className: 'metric' },
          React.createElement('div', { className: 'metric-label' }, 'Monthly Income'),
          React.createElement('div', { className: 'metric-value' }, fmt(inc, state.currency))
        ),
        React.createElement('div', { className: 'metric' },
          React.createElement('div', { className: 'metric-label' }, 'Total Planned Spend'),
          React.createElement('div', { className: 'metric-value' }, fmt(planned, state.currency))
        ),
        React.createElement('div', { className: 'metric' },
          React.createElement('div', { className: 'metric-label' }, 'Planned Savings'),
          React.createElement('div', { className: 'metric-value', style: { color: plannedSaving < 0 ? 'var(--danger)' : 'var(--success)' } },
            fmt(plannedSaving, state.currency)
          ),
          React.createElement('div', { className: 'metric-sub' }, plannedSaving < 0 ? 'over budget plan' : 'target')
        ),
        React.createElement('div', { className: 'metric' },
          React.createElement('div', { className: 'metric-label' }, 'Actual Savings'),
          React.createElement('div', { className: 'metric-value', style: { color: actualSaving < 0 ? 'var(--danger)' : actual === 0 ? 'var(--faint)' : 'var(--success)' } },
            actual === 0 ? '—' : fmt(actualSaving, state.currency)
          ),
          React.createElement('div', { className: 'metric-sub' }, actual === 0 ? 'no actuals yet' : actualSaving < 0 ? 'overspent' : 'so far')
        )
      ),

      // Breakdown table
      breakdownRows.length > 0 && React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, 'Plan vs Actual'),
        // Header
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, padding: '4px 0 8px', borderBottom: '0.5px solid var(--border)', marginBottom: 4 } },
          React.createElement('span', { style: { fontSize: 10, color: 'var(--faint)', fontWeight: 600 } }, 'CATEGORY'),
          React.createElement('span', { style: { fontSize: 10, color: 'var(--faint)', fontWeight: 600, textAlign: 'right' } }, 'PLAN'),
          React.createElement('span', { style: { fontSize: 10, color: 'var(--faint)', fontWeight: 600, textAlign: 'right' } }, 'ACTUAL'),
          React.createElement('span', { style: { fontSize: 10, color: 'var(--faint)', fontWeight: 600, textAlign: 'right' } }, 'LEFT')
        ),
        breakdownRows.map(({ name, planned: p, actual: a, isCard }) => {
          const left = p - a;
          const overSpent = p > 0 && left < 0;
          const leftColor = p === 0 ? 'var(--faint)' : overSpent ? 'var(--danger)' : 'var(--success)';
          return React.createElement('div', { key: name, style: { display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, padding: '8px 0', borderBottom: '0.5px solid var(--border)', alignItems: 'center' } },
            React.createElement('div', null,
              React.createElement('span', { style: { fontSize: 12, fontWeight: 500 } }, name),
              isCard && React.createElement('span', { style: { fontSize: 10, marginLeft: 4, color: 'var(--accent2)' } }, '💳')
            ),
            React.createElement('span', { style: { fontSize: 12, textAlign: 'right', color: 'var(--muted)' } }, p ? fmt(p, state.currency) : '—'),
            React.createElement('span', { style: { fontSize: 12, textAlign: 'right' } }, a ? fmt(a, state.currency) : '—'),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 600, textAlign: 'right', color: leftColor } },
              p === 0 ? '—' : overSpent ? `-${fmt(Math.abs(left), state.currency)}` : fmt(left, state.currency)
            )
          );
        })
      )
    );
  };

  // ── Finance: Income ──────────────────────────────────────────────────────────
  const FinIncome = () => {
    const monthInc = getMonthIncome(selMonth);
    const prevInc = getMonthIncome(shiftMonth(selMonth, -1));
    const [sal, setSal] = useState(monthInc.salary);
    const [label, setLabel] = useState('');
    const [amount, setAmount] = useState('');
    const hasNoData = !monthInc.salary && (monthInc.other || []).length === 0;

    return React.createElement('div', { className: 'card' },
      React.createElement('div', { className: 'card-title' }, `Income — ${fmtMonth(selMonth)}`),

      hasNoData && prevInc.salary && React.createElement('div', { className: 'carry-notice' },
        React.createElement('span', { className: 'carry-notice-text' },
          `Carry salary (${fmt(prevInc.salary, state.currency)}) from ${fmtMonth(shiftMonth(selMonth, -1))}?`
        ),
        React.createElement('button', { className: 'btn btn-ghost btn-sm', onClick: () => {
          updateMonthIncome(selMonth, cur => ({ ...cur, salary: prevInc.salary }));
          setSal(prevInc.salary);
        } }, 'Copy')
      ),

      React.createElement('div', { className: 'field' },
        React.createElement('label', null, 'Monthly Salary'),
        React.createElement('input', {
          className: 'input', type: 'number', placeholder: '0', value: sal,
          onChange: e => setSal(e.target.value),
          onBlur: () => updateMonthIncome(selMonth, cur => ({ ...cur, salary: sal }))
        })
      ),
      React.createElement('div', { className: 'divider' }),
      React.createElement('div', { style: { fontSize: 12, color: 'var(--muted)', fontWeight: 600, marginBottom: 8 } }, 'Other income sources'),
      (monthInc.other || []).map((o, i) =>
        React.createElement('div', { key: i, className: 'spend-row' },
          React.createElement('div', null,
            React.createElement('div', { className: 'spend-cat' }, o.label),
            React.createElement('div', { className: 'spend-meta' }, 'Other income')
          ),
          React.createElement('div', { className: 'row', style: { gap: 8 } },
            React.createElement('span', { className: 'spend-amt' }, fmt(o.amount, state.currency)),
            React.createElement('button', { className: 'btn btn-danger btn-sm', onClick: () =>
              updateMonthIncome(selMonth, cur => ({ ...cur, other: cur.other.filter((_, j) => j !== i) }))
            }, '×')
          )
        )
      ),
      React.createElement('div', { className: 'row', style: { marginTop: 12, flexWrap: 'wrap', gap: 8 } },
        React.createElement('input', { className: 'input', style: { flex: '2 1 120px' }, placeholder: 'Source label', value: label, onChange: e => setLabel(e.target.value) }),
        React.createElement('input', { className: 'input', type: 'number', style: { flex: '1 1 80px' }, placeholder: 'Amount', value: amount, onChange: e => setAmount(e.target.value) }),
        React.createElement('button', { className: 'btn btn-primary', onClick: () => {
          if (!label || !amount) return;
          updateMonthIncome(selMonth, cur => ({ ...cur, other: [...(cur.other || []), { label, amount }] }));
          setLabel(''); setAmount('');
        } }, 'Add')
      )
    );
  };

  // ── Finance: Expenses ────────────────────────────────────────────────────────
  const FinExpenses = () => {
    const cats = getMonthCats(selMonth);
    const totalP = state.expenses.categories.reduce((a, c) => a + (parseFloat(cats[c]?.planned) || 0), 0);
    const totalA = state.expenses.categories.reduce((a, c) => a + (parseFloat(cats[c]?.actual) || 0), 0);

    return React.createElement('div', null,

      // Month totals
      React.createElement('div', { className: 'metric-grid' },
        React.createElement('div', { className: 'metric' },
          React.createElement('div', { className: 'metric-label' }, 'Total Planned'),
          React.createElement('div', { className: 'metric-value' }, totalP ? fmt(totalP, state.currency) : '—')
        ),
        React.createElement('div', { className: 'metric' },
          React.createElement('div', { className: 'metric-label' }, 'Total Actual'),
          React.createElement('div', { className: 'metric-value', style: { color: totalA > totalP && totalP > 0 ? 'var(--danger)' : 'var(--text)' } },
            totalA ? fmt(totalA, state.currency) : '—'
          )
        )
      ),

      // Category rows
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, `Expense categories — ${fmtMonth(selMonth)}`),
        state.expenses.categories.map(cat => {
          const d = cats[cat] || { planned: '', actual: '' };
          const p = parseFloat(d.planned) || 0;
          const a = parseFloat(d.actual) || 0;
          const remaining = p - a;
          const hasP = p > 0;
          const overSpent = hasP && remaining < 0;
          const pct = hasP ? Math.min(100, Math.round((a / p) * 100)) : 0;
          const barColor = pct > 90 ? 'var(--danger)' : pct > 70 ? 'var(--warn)' : 'var(--accent)';

          return React.createElement('div', { key: cat, className: 'budget-row' },
            React.createElement('div', { className: 'budget-row-header' },
              React.createElement('span', { className: 'budget-cat-name' }, cat),
              hasP && React.createElement('span', { className: 'budget-remaining', style: { color: overSpent ? 'var(--danger)' : 'var(--success)' } },
                overSpent
                  ? `Over by ${fmt(Math.abs(remaining), state.currency)}`
                  : `${fmt(remaining, state.currency)} left`
              )
            ),
            React.createElement('div', { className: 'budget-inputs' },
              React.createElement('div', null,
                React.createElement('div', { className: 'budget-input-label' }, 'Planned'),
                React.createElement('input', {
                  className: 'input input-sm', type: 'number', placeholder: '0',
                  defaultValue: d.planned,
                  key: selMonth + cat + 'p',
                  onBlur: e => updateCatField(selMonth, cat, 'planned', e.target.value)
                })
              ),
              React.createElement('div', null,
                React.createElement('div', { className: 'budget-input-label' }, 'Actual so far'),
                React.createElement('input', {
                  className: 'input input-sm', type: 'number', placeholder: '0',
                  defaultValue: d.actual,
                  key: selMonth + cat + 'a',
                  onBlur: e => updateCatField(selMonth, cat, 'actual', e.target.value)
                })
              )
            ),
            hasP && React.createElement('div', { className: 'progress', style: { marginTop: 6 } },
              React.createElement('div', { className: 'progress-fill', style: { width: pct + '%', background: barColor } })
            )
          );
        })
      )
    );
  };

  // ── Finance: Cards ───────────────────────────────────────────────────────────
  const FinCards = () => {
    const [form, setForm] = useState({ name: '', billingDate: '' });

    const daysUntil = (day) => {
      const now = new Date();
      const next = new Date(now.getFullYear(), now.getMonth(), parseInt(day));
      if (next <= now) next.setMonth(next.getMonth() + 1);
      return Math.ceil((next - now) / 86400000);
    };

    return React.createElement('div', null,
      (state.cards || []).length === 0 && React.createElement('div', { className: 'empty' }, 'No cards added yet'),

      (state.cards || []).map(card => {
        const md = card.months?.[selMonth] || {};
        const planned = parseFloat(md.planned) || 0;
        const outstanding = parseFloat(md.outstanding) || 0;
        const remaining = planned - outstanding;
        const overBudget = planned > 0 && remaining < 0;
        const pct = planned > 0 ? Math.min(100, Math.round((outstanding / planned) * 100)) : 0;
        const barColor = pct > 90 ? 'var(--danger)' : pct > 70 ? 'var(--warn)' : 'var(--success)';

        return React.createElement('div', { key: card.id, className: 'cc-card' },
          React.createElement('div', { className: 'row-between', style: { marginBottom: 10 } },
            React.createElement('div', { className: 'cc-name' }, card.name),
            React.createElement('button', { className: 'btn btn-danger btn-sm', onClick: () =>
              update(s => ({ ...s, cards: s.cards.filter(c => c.id !== card.id) }))
            }, 'Remove')
          ),

          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 11, color: 'var(--muted)', marginBottom: 3 } }, 'Planned spend'),
              React.createElement('input', {
                className: 'input', type: 'number', placeholder: '0',
                defaultValue: md.planned || '',
                key: selMonth + card.id + 'p',
                onBlur: e => updateCardMonth(card.id, 'planned', e.target.value)
              })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 11, color: 'var(--muted)', marginBottom: 3 } }, 'Current outstanding'),
              React.createElement('input', {
                className: 'input', type: 'number', placeholder: '0',
                defaultValue: md.outstanding || '',
                key: selMonth + card.id + 'o',
                onBlur: e => updateCardMonth(card.id, 'outstanding', e.target.value)
              })
            )
          ),

          planned > 0 && React.createElement('div', { className: 'progress', style: { marginBottom: 8 } },
            React.createElement('div', { className: 'progress-fill', style: { width: pct + '%', background: barColor } })
          ),

          React.createElement('div', { className: 'cc-stats' },
            React.createElement('span', null, `Spent: ${fmt(outstanding, state.currency)}`),
            planned > 0 && React.createElement('span', { style: { color: overBudget ? 'var(--danger)' : 'var(--success)', fontWeight: 600 } },
              overBudget ? `Over by ${fmt(Math.abs(remaining), state.currency)}` : `${fmt(remaining, state.currency)} left`
            ),
            planned > 0 && React.createElement('span', null, `${pct}% of plan`)
          ),

          card.billingDate && React.createElement('div', { className: 'cc-billing' },
            `Billing in ${daysUntil(card.billingDate)} days (day ${card.billingDate})`
          )
        );
      }),

      (state.cards || []).length < 10 && React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, 'Add card'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 } },
          React.createElement('div', { className: 'field', style: { margin: 0 } },
            React.createElement('label', null, 'Card name'),
            React.createElement('input', { className: 'input', placeholder: 'e.g. HDFC Visa', value: form.name, onChange: e => setForm(f => ({ ...f, name: e.target.value })) })
          ),
          React.createElement('div', { className: 'field', style: { margin: 0 } },
            React.createElement('label', null, 'Billing date (1–31)'),
            React.createElement('input', { className: 'input', type: 'number', min: 1, max: 31, placeholder: '15', value: form.billingDate, onChange: e => setForm(f => ({ ...f, billingDate: e.target.value })) })
          )
        ),
        React.createElement('button', { className: 'btn btn-primary', style: { width: '100%' }, onClick: () => {
          if (!form.name) return;
          update(s => ({ ...s, cards: [...(s.cards || []), { id: 'card-' + Date.now(), name: form.name, billingDate: form.billingDate, months: {} }] }));
          setForm({ name: '', billingDate: '' });
        } }, 'Add Card')
      )
    );
  };

  // ── Health: Today ────────────────────────────────────────────────────────────
  const HealthToday = () => {
    const mDone = state.health.morningRituals.filter(r => todayLog.morning[r.id]).length;
    const eDone = state.health.eveningRituals.filter(r => todayLog.evening[r.id]).length;
    const mTotal = state.health.morningRituals.length;
    const eTotal = state.health.eveningRituals.length;
    return React.createElement('div', null,
      React.createElement('div', { className: 'metric-grid' },
        [['Morning', mDone, mTotal, 'var(--accent)'], ['Evening', eDone, eTotal, '#8b5cf6']].map(([label, done, total, color]) =>
          React.createElement('div', { key: label, className: 'metric' },
            React.createElement('div', { className: 'metric-label' }, label + ' routine'),
            React.createElement('div', { className: 'metric-value' }, `${done}/${total}`),
            React.createElement('div', { className: 'progress' },
              React.createElement('div', { className: 'progress-fill', style: { width: `${total > 0 ? Math.round((done / total) * 100) : 0}%`, background: done === total && total > 0 ? 'var(--success)' : color } })
            )
          )
        )
      ),
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'row-between', style: { marginBottom: '0.75rem' } },
          React.createElement('div', { className: 'card-title', style: { margin: 0 } }, 'Morning rituals'),
          React.createElement('span', { className: 'badge' }, '20:20:20')
        ),
        state.health.morningRituals.map(r => {
          const checked = !!todayLog.morning[r.id];
          return React.createElement('div', { key: r.id, className: `ritual-row${checked ? ' done' : ''}`, onClick: () => toggleRitual('morning', r.id) },
            React.createElement('div', { className: `check-box${checked ? ' checked' : ''}` }, checked && React.createElement(Check)),
            React.createElement('span', { className: `ritual-label${checked ? ' done' : ''}` }, r.label)
          );
        })
      ),
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'row-between', style: { marginBottom: '0.75rem' } },
          React.createElement('div', { className: 'card-title', style: { margin: 0 } }, 'Evening wind-down'),
          React.createElement('span', { className: 'badge' }, '10:10:10')
        ),
        state.health.eveningRituals.map(r => {
          const checked = !!todayLog.evening[r.id];
          return React.createElement('div', { key: r.id, className: `ritual-row${checked ? ' done' : ''}`, onClick: () => toggleRitual('evening', r.id) },
            React.createElement('div', { className: `check-box${checked ? ' checked' : ''}` }, checked && React.createElement(Check)),
            React.createElement('span', { className: `ritual-label${checked ? ' done' : ''}` }, r.label)
          );
        })
      )
    );
  };

  // ── Health: History ──────────────────────────────────────────────────────────
  const HealthHistory = () => {
    const days = Array.from({ length: 28 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (27 - i));
      return d.toISOString().split('T')[0];
    });
    const color = (pct) => {
      if (pct === null) return 'rgba(71,85,105,0.3)';
      if (pct >= 80) return 'var(--success)';
      if (pct >= 50) return 'var(--warn)';
      return 'var(--danger)';
    };
    const scored = days.map(d => ({ d, pct: ritualScore(d) }));
    const streak = (() => { let s = 0; for (let i = scored.length - 1; i >= 0; i--) { if (scored[i].pct !== null && scored[i].pct >= 80) s++; else break; } return s; })();
    const avg = (() => { const valid = scored.filter(x => x.pct !== null); return valid.length > 0 ? Math.round(valid.reduce((a, x) => a + x.pct, 0) / valid.length) : 0; })();
    return React.createElement('div', null,
      React.createElement('div', { className: 'metric-grid' },
        [['Current streak', streak + ' days'], ['28-day avg', avg + '%']].map(([l, v]) =>
          React.createElement('div', { key: l, className: 'metric' },
            React.createElement('div', { className: 'metric-label' }, l),
            React.createElement('div', { className: 'metric-value' }, v)
          )
        )
      ),
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, '28-day ritual log'),
        React.createElement('div', { className: 'history-grid' },
          scored.map(({ d, pct }) =>
            React.createElement('div', { key: d, className: 'history-cell', style: { background: color(pct) }, title: `${d}: ${pct !== null ? pct + '%' : 'no data'}` })
          )
        ),
        React.createElement('div', { className: 'legend' },
          [['var(--success)', '≥80%'], ['var(--warn)', '50–79%'], ['var(--danger)', '<50%']].map(([c, l]) =>
            React.createElement('div', { key: l, className: 'legend-item' },
              React.createElement('div', { className: 'legend-dot', style: { background: c } }),
              React.createElement('span', null, l)
            )
          )
        )
      )
    );
  };

  // ── Finance: Customize ───────────────────────────────────────────────────────
  const FinCustomize = () => {
    return React.createElement('div', null,
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-title' }, 'Currency'),
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement('select', {
            className: 'select',
            value: state.currency,
            onChange: e => update(s => ({ ...s, currency: e.target.value })),
            style: { paddingRight: 36 }
          },
            ['MYR', 'SGD', 'USD', 'EUR', 'INR', 'THB', 'AUD', 'GBP'].map(c =>
              React.createElement('option', { key: c }, c)
            )
          ),
          React.createElement('span', { style: { position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)', fontSize: 12 } }, '▾')
        )
      )
    );
  };

  // ── Health: Customize ────────────────────────────────────────────────────────
  const HealthCustomize = () => {
    const [mLabel, setMLabel] = useState('');
    const [eLabel, setELabel] = useState('');
    return React.createElement('div', null,
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'row-between', style: { marginBottom: '0.75rem' } },
          React.createElement('div', { className: 'card-title', style: { margin: 0 } }, 'Morning rituals'),
          React.createElement('span', { className: 'badge' }, '20:20:20')
        ),
        state.health.morningRituals.map((r, i) =>
          React.createElement('div', { key: r.id, className: 'spend-row' },
            React.createElement('span', { style: { fontSize: 13 } }, r.label),
            state.health.morningRituals.length > 1 && React.createElement('button', { className: 'btn btn-danger btn-sm', onClick: () => update(s => ({ ...s, health: { ...s.health, morningRituals: s.health.morningRituals.filter((_, j) => j !== i) } })) }, 'Remove')
          )
        ),
        React.createElement('div', { className: 'row', style: { marginTop: 10 } },
          React.createElement('input', { className: 'input', style: { flex: 1 }, placeholder: 'Add morning ritual...', value: mLabel, onChange: e => setMLabel(e.target.value) }),
          React.createElement('button', { className: 'btn btn-primary', onClick: () => { if (!mLabel) return; update(s => ({ ...s, health: { ...s.health, morningRituals: [...s.health.morningRituals, { id: 'm' + Date.now(), label: mLabel }] } })); setMLabel(''); } }, 'Add')
        )
      ),
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'row-between', style: { marginBottom: '0.75rem' } },
          React.createElement('div', { className: 'card-title', style: { margin: 0 } }, 'Evening rituals'),
          React.createElement('span', { className: 'badge' }, '10:10:10')
        ),
        state.health.eveningRituals.map((r, i) =>
          React.createElement('div', { key: r.id, className: 'spend-row' },
            React.createElement('span', { style: { fontSize: 13 } }, r.label),
            state.health.eveningRituals.length > 1 && React.createElement('button', { className: 'btn btn-danger btn-sm', onClick: () => update(s => ({ ...s, health: { ...s.health, eveningRituals: s.health.eveningRituals.filter((_, j) => j !== i) } })) }, 'Remove')
          )
        ),
        React.createElement('div', { className: 'row', style: { marginTop: 10 } },
          React.createElement('input', { className: 'input', style: { flex: 1 }, placeholder: 'Add evening ritual...', value: eLabel, onChange: e => setELabel(e.target.value) }),
          React.createElement('button', { className: 'btn btn-primary', onClick: () => { if (!eLabel) return; update(s => ({ ...s, health: { ...s.health, eveningRituals: [...s.health.eveningRituals, { id: 'e' + Date.now(), label: eLabel }] } })); setELabel(''); } }, 'Add')
        )
      ),
    );
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return React.createElement('div', null,
    React.createElement('style', null, css),
    React.createElement('header', { className: 'app-header' },
      React.createElement('div', { className: 'logo' },
        React.createElement('span', null, 'Selva'), 'OS',
        React.createElement('em', null, 'Personal Dashboard')
      ),
      React.createElement('div', { className: 'date-label' },
        new Date().toLocaleDateString('en-MY', { weekday: 'short', day: 'numeric', month: 'short' })
      )
    ),
    React.createElement('div', { className: 'content' },
      showInstall && React.createElement('div', { className: 'install-banner' },
        React.createElement('div', { className: 'install-banner-text' }, '📲 Install SelvaOS on your phone for the full app experience'),
        React.createElement('button', { className: 'btn btn-primary btn-sm', onClick: async () => { if (deferredPrompt) { deferredPrompt.prompt(); setShowInstall(false); } } }, 'Install'),
        React.createElement('button', { className: 'btn btn-sm', onClick: () => setShowInstall(false) }, '×')
      ),
      tab === 'finance' && React.createElement('div', null,
        React.createElement('div', { className: 'section-header' },
          React.createElement('h2', { className: 'section-title' }, 'Financials'),
          React.createElement(MonthNav)
        ),
        React.createElement('div', { className: 'sub-tabs' },
          [['overview', 'Overview'], ['income', 'Income'], ['expenses', 'Expenses'], ['cards', 'Cards'], ['customize', 'Customize']].map(([k, l]) =>
            React.createElement('button', { key: k, className: `sub-tab${finTab === k ? ' active' : ''}`, onClick: () => setFinTab(k) }, l)
          )
        ),
        finTab === 'overview'  && React.createElement(FinOverview,  { key: selMonth }),
        finTab === 'income'    && React.createElement(FinIncome,    { key: selMonth }),
        finTab === 'expenses'  && React.createElement(FinExpenses,  { key: selMonth }),
        finTab === 'cards'     && React.createElement(FinCards,     { key: selMonth }),
        finTab === 'customize' && React.createElement(FinCustomize)
      ),
      tab === 'health' && React.createElement('div', null,
        React.createElement('div', { className: 'section-header' },
          React.createElement('h2', { className: 'section-title' }, 'Health & Rituals')
        ),
        React.createElement('div', { className: 'sub-tabs' },
          [['today', 'Today'], ['history', '28-Day Log'], ['customize', 'Customize']].map(([k, l]) =>
            React.createElement('button', { key: k, className: `sub-tab${healthTab === k ? ' active' : ''}`, onClick: () => setHealthTab(k) }, l)
          )
        ),
        healthTab === 'today'     && React.createElement(HealthToday),
        healthTab === 'history'   && React.createElement(HealthHistory),
        healthTab === 'customize' && React.createElement(HealthCustomize)
      )
    ),
    React.createElement('nav', { className: 'bottom-nav' },
      [['finance', 'Financials', React.createElement(FinIcon, { active: tab === 'finance' })],
       ['health', 'Health', React.createElement(HealthIcon, { active: tab === 'health' })]].map(([key, label, icon]) =>
        React.createElement('button', { key, className: `bottom-nav-btn${tab === key ? ' active' : ''}`, onClick: () => setTab(key) },
          icon, React.createElement('span', null, label)
        )
      )
    )
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
