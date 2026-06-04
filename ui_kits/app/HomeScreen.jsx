/* global React */
function HomeScreen() {
  return (
    <div className="dta-screen">
      <div className="dta-h-row">
        <div>
          <div className="dta-h-greet">Wednesday · D124</div>
          <div className="dta-h-name">Hi, <em>Sahil</em>.</div>
        </div>
        <div className="dta-h-actions">
          <button className="dta-icon-btn"><i data-lucide="search"></i></button>
          <button className="dta-icon-btn notif"><i data-lucide="bell"></i></button>
        </div>
      </div>

      <div className="dta-rank-row">
        <div className="dta-rank-row-l">
          <img src="../../assets/ranks/warrior.svg" alt="" />
          <div>
            <div className="dta-rank-row-eb">Tier 03</div>
            <div className="dta-rank-row-name">Warrior</div>
          </div>
        </div>
        <div className="dta-rank-row-r">
          <b>62%</b>to Elite ascent
        </div>
      </div>

      <div className="dta-ring-card">
        <div className="dta-ring">
          <svg viewBox="0 0 120 120" width="110" height="110">
            <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,.08)" strokeWidth="7" fill="none" />
            <circle cx="60" cy="60" r="52" stroke="#C8FF3D" strokeWidth="7" fill="none" strokeDasharray="326" strokeDashoffset="68" strokeLinecap="round" transform="rotate(-90 60 60)" style={{ filter: 'drop-shadow(0 0 6px rgba(200,255,61,.5))' }} />
          </svg>
          <div className="dta-ring-c">
            <div className="dta-ring-n">79<span>%</span></div>
            <div className="dta-ring-l">Day score</div>
          </div>
        </div>
        <div className="dta-ring-info">
          <div className="eb">— Today's protocol</div>
          <div className="t">Push day +<br/>protein loading</div>
          <div className="d">5 lifts · 2 040 kcal target · sleep window 22:30</div>
        </div>
      </div>

      <div className="dta-metrics">
        <div className="dta-metric">
          <div className="dta-metric-h"><span>— Protein</span><i data-lucide="flame"></i></div>
          <div className="dta-metric-v">142<span>/ 200 g</span></div>
          <div className="dta-metric-bar"><span style={{ width: '71%' }} /></div>
        </div>
        <div className="dta-metric">
          <div className="dta-metric-h"><span>— kcal</span><i data-lucide="utensils"></i></div>
          <div className="dta-metric-v">1 760<span>/ 2 040</span></div>
          <div className="dta-metric-bar"><span style={{ width: '86%' }} /></div>
        </div>
        <div className="dta-metric">
          <div className="dta-metric-h"><span>— Steps</span><i data-lucide="footprints"></i></div>
          <div className="dta-metric-v">11 420</div>
          <div className="dta-metric-sub">+18% vs 7d avg</div>
        </div>
        <div className="dta-metric">
          <div className="dta-metric-h"><span>— Sleep</span><i data-lucide="moon"></i></div>
          <div className="dta-metric-v">7:24<span>h</span></div>
          <div className="dta-metric-sub">HRV 64 · readiness 81</div>
        </div>
      </div>

      <div className="dta-sec-head">
        <span className="dta-sec-h-l">— Next coaching</span>
        <span className="dta-sec-h-r">In 2 days</span>
      </div>
      <div className="dta-coach-card">
        <div className="dta-coach-avatar">NK</div>
        <div className="dta-coach-info">
          <div className="dta-coach-eb">Your coach</div>
          <div className="dta-coach-t">Nina K.</div>
          <div className="dta-coach-meta">Friday · 18:30 · 45 min</div>
        </div>
        <button className="dta-coach-cta"><i data-lucide="video"></i></button>
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
