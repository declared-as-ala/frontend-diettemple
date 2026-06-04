/* global React */
function ScanScreen() {
  return (
    <div className="dta-screen">
      <div className="dta-scan-h">
        <div className="dta-scan-title">Scan a plate</div>
        <button className="dta-icon-btn"><i data-lucide="settings-2"></i></button>
      </div>
      <div className="dta-scan-view">
        <div className="dta-scan-frame">
          <div className="dta-scan-line" />
        </div>
        <div className="dta-scan-meta">— ANALYZING · 6 elements</div>
        <button className="dta-scan-shoot" aria-label="Capture" />
      </div>
      <div className="dta-scan-result">
        <div className="dta-scan-result-h">
          <div>
            <div className="dta-scan-result-eb">Detected</div>
            <div className="dta-scan-result-t">Grilled chicken + quinoa bowl, avocado, edamame</div>
          </div>
          <div className="dta-scan-result-cal">612<span>kcal</span></div>
        </div>
        <div className="dta-scan-macros">
          <div className="dta-scan-macro">
            <div className="dta-scan-macro-l">Protein</div>
            <div className="dta-scan-macro-v p">58 g</div>
            <div className="dta-scan-macro-bar"><span style={{ width: '74%', background: '#C8FF3D' }} /></div>
          </div>
          <div className="dta-scan-macro">
            <div className="dta-scan-macro-l">Carbs</div>
            <div className="dta-scan-macro-v">46 g</div>
            <div className="dta-scan-macro-bar"><span style={{ width: '52%', background: '#D8C9A3' }} /></div>
          </div>
          <div className="dta-scan-macro">
            <div className="dta-scan-macro-l">Fat</div>
            <div className="dta-scan-macro-v">22 g</div>
            <div className="dta-scan-macro-bar"><span style={{ width: '36%', background: '#B8B5AB' }} /></div>
          </div>
        </div>
        <div className="dta-scan-actions">
          <button className="dta-pri-btn">Log to protocol →</button>
          <button className="dta-sec-btn">Edit</button>
        </div>
      </div>
    </div>
  );
}

window.ScanScreen = ScanScreen;
