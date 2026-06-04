/* global React */
function Frame({ children, tab, onTab }) {
  return (
    <div className="dta-phone">
      <div className="dta-notch" />
      <div className="dta-phone-screen">
        <div className="dta-status">
          <span>9:41</span>
          <div className="dta-status-r">
            <span>●●●●●</span>
            <span style={{ marginLeft: 4 }}>5G</span>
            <div className="bat"><span /></div>
          </div>
        </div>
        {children}
        <Tabbar tab={tab} onTab={onTab} />
      </div>
      <div className="dta-home-ind" />
    </div>
  );
}

function Tabbar({ tab, onTab }) {
  const tabs = [
    { id: 'home',     icon: 'home',         label: 'Home' },
    { id: 'train',    icon: 'dumbbell',     label: 'Train' },
    { id: 'scan',     icon: 'scan-line',    label: 'Scan', special: true },
    { id: 'progress', icon: 'line-chart',   label: 'Progress' },
    { id: 'coach',    icon: 'message-circle', label: 'Coach' },
  ];
  return (
    <div className="dta-tabbar">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={`${t.special ? 'scan' : ''} ${tab === t.id ? 'on' : ''}`}
          onClick={() => onTab(t.id)}
        >
          <i data-lucide={t.icon}></i>
          {!t.special && <span>{t.label}</span>}
        </button>
      ))}
    </div>
  );
}

window.Frame = Frame;
window.Tabbar = Tabbar;
