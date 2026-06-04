/* global React */
function CoachScreen() {
  return (
    <div className="dta-screen">
      <div className="dta-coach-h">
        <h2>Coach Nina</h2>
        <p>Weekly call · Friday 18:30 · 45 min</p>
      </div>

      <div className="dta-coach-card">
        <div className="dta-coach-avatar">NK</div>
        <div className="dta-coach-info">
          <div className="dta-coach-eb">Live in 2 days</div>
          <div className="dta-coach-t">Weekly protocol review</div>
          <div className="dta-coach-meta">Body scan · macros · lift PRs</div>
        </div>
        <button className="dta-coach-cta"><i data-lucide="video"></i></button>
      </div>

      <div className="dta-coach-chip"><i data-lucide="calendar"></i>Yesterday · 19:04</div>

      <div className="dta-msg">
        <div className="dta-msg-av">NK</div>
        <div>
          <div className="dta-msg-b them">
            Your last scan shows fat loss is plateauing. I'm cutting carbs by 30g for the next 7 days. Push session intensity stays the same.
          </div>
        </div>
      </div>
      <div className="dta-msg me">
        <div className="dta-msg-av" style={{ background: 'var(--volt-deep)', color: 'var(--ink-0)' }}>S</div>
        <div>
          <div className="dta-msg-b me">Understood. Stack the extra protein with the post‑workout shake?</div>
        </div>
      </div>
      <div className="dta-msg">
        <div className="dta-msg-av">NK</div>
        <div>
          <div className="dta-msg-b them">
            Yes. Whey Protocol, 40g, within 30 min of the last set. New protocol pushed to your app.
          </div>
          <div className="dta-msg-t">19:08 · read</div>
        </div>
      </div>

      <div className="dta-protocol-log">
        <div className="dta-protocol-h">
          <span className="dta-protocol-h-l">— Protocol changelog · W17</span>
          <span className="dta-protocol-h-r">Live</span>
        </div>
        <div className="dta-prot-row"><i data-lucide="utensils"></i><span className="dta-prot-row-t">Daily carbs target</span><span className="dta-prot-row-v">220g → 190g</span></div>
        <div className="dta-prot-row"><i data-lucide="flame"></i><span className="dta-prot-row-t">Protein target</span><span className="dta-prot-row-v">200g → 215g</span></div>
        <div className="dta-prot-row"><i data-lucide="dumbbell"></i><span className="dta-prot-row-t">Bench press 1RM</span><span className="dta-prot-row-v">112 → 115 kg</span></div>
        <div className="dta-prot-row"><i data-lucide="moon"></i><span className="dta-prot-row-t">Sleep window</span><span className="dta-prot-row-v">22:30 → 22:00</span></div>
      </div>
    </div>
  );
}

window.CoachScreen = CoachScreen;
