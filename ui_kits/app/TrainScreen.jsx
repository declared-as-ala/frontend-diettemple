/* global React */
function TrainScreen() {
  const sets = [
    { name: 'Barbell Bench Press', sub: '4 × 6 · 90s rest', v: '102.5 kg', done: true },
    { name: 'Incline DB Press', sub: '3 × 10', v: '32 kg', done: true },
    { name: 'Cable Fly', sub: '3 × 12', v: '18 kg', done: false },
    { name: 'Overhead Press', sub: '4 × 8', v: '55 kg', done: false },
    { name: 'Triceps Pushdown', sub: '3 × 15', v: '32 kg', done: false },
  ];
  return (
    <div className="dta-screen">
      <div className="dta-h-row">
        <div>
          <div className="dta-h-greet">— Today · push</div>
          <div className="dta-h-name" style={{ fontSize: 22 }}>Chest, shoulders,<br/>triceps.</div>
        </div>
        <button className="dta-icon-btn"><i data-lucide="list"></i></button>
      </div>

      <div className="dta-train-reel">
        <div className="dta-train-reel-grade" />
        <div className="dta-train-reel-top">
          <div className="dta-train-reel-counter">02 / 14 reels</div>
          <button className="dta-icon-btn" style={{ background: 'rgba(0,0,0,.4)', border: '1px solid rgba(255,255,255,.15)' }}><i data-lucide="volume-x"></i></button>
        </div>
        <button className="dta-train-reel-play"><i data-lucide="play"></i></button>
        <div className="dta-train-reel-meta">
          <div className="dta-train-reel-eb">— Form demo</div>
          <h3 className="dta-train-reel-t">Bench press · scapular retraction</h3>
          <div className="dta-train-reel-sub">Coach Nina · 38 sec</div>
        </div>
      </div>

      <div className="dta-sec-head">
        <span className="dta-sec-h-l">— Today's lifts · 2 of 5 done</span>
        <span className="dta-sec-h-r">Start session →</span>
      </div>
      <div className="dta-card">
        {sets.map((s, i) => (
          <div key={i} className={`dta-set-row ${s.done ? 'done' : ''}`}>
            <div className="dta-set-num">{s.done ? '✓' : i + 1}</div>
            <div className="dta-set-name">{s.name}<span>{s.sub}</span></div>
            <div className="dta-set-v">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.TrainScreen = TrainScreen;
