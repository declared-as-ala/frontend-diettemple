/* global React */
function ProgressScreen() {
  const thumbs = ['D0','D14','D28','D42','D56','D70','D84','D98','D124'];
  return (
    <div className="dta-screen">
      <div className="dta-prog-h">
        <h2>Body evolution</h2>
        <button className="dta-icon-btn"><i data-lucide="camera"></i></button>
      </div>

      <div className="dta-prog-compare">
        <div className="dta-prog-compare-pics">
          <div className="dta-prog-pic"><span className="dta-prog-pic-tag">Day 0</span></div>
          <div className="dta-prog-pic after"><span className="dta-prog-pic-tag">Day 124</span></div>
        </div>
        <div className="dta-prog-delta">
          <div className="dta-prog-delta-c">
            <div className="dta-prog-delta-v">−9.4 kg</div>
            <div className="dta-prog-delta-l">Mass</div>
          </div>
          <div className="dta-prog-delta-c">
            <div className="dta-prog-delta-v">−12.6%</div>
            <div className="dta-prog-delta-l">Body fat</div>
          </div>
          <div className="dta-prog-delta-c">
            <div className="dta-prog-delta-v">+3.2 kg</div>
            <div className="dta-prog-delta-l">Lean mass</div>
          </div>
        </div>
      </div>

      <div className="dta-sec-head">
        <span className="dta-sec-h-l">— Archive · 9 captures</span>
        <span className="dta-sec-h-r">View all</span>
      </div>
      <div className="dta-prog-grid">
        {thumbs.map((d) => (
          <div key={d} className="dta-prog-thumb"><div className="dta-prog-thumb-d">{d}</div></div>
        ))}
      </div>

      <div className="dta-rank-ascent">
        <img src="../../assets/ranks/elite.svg" alt="" />
        <div className="dta-rank-ascent-info">
          <div className="dta-rank-ascent-eb">Next rank · Elite</div>
          <div className="dta-rank-ascent-t">62% to ascent · 22 days to evaluation</div>
          <div className="dta-rank-ascent-bar"><span style={{ width: '62%' }} /></div>
        </div>
      </div>
    </div>
  );
}

window.ProgressScreen = ProgressScreen;
