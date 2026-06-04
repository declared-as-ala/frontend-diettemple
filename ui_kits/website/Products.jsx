/* global React */
const PRODUCTS = [
  { id: '01', cat: 'Supplément',  t: 'Whey Protocol',        s: 'Vanille · 1 kg',          std: 220, uh: 159 },
  { id: '02', cat: 'Supplément',  t: 'Créatine Mono',        s: 'Qualité pharma · 300g',   std: 120, uh: 89  },
  { id: '03', cat: 'Pack repas',  t: 'Lean Stack 7 jours',   s: 'Protocole · F1 / Sèche',  std: 330, uh: 245 },
  { id: '04', cat: 'Performance', t: 'Électrolytes',         s: 'Agrume · 30 sticks',      std: 89,  uh: 68  },
  { id: '05', cat: 'Bien‑être',   t: 'Sleep Architecture',   s: 'Mg + Glycine · 60 caps',  std: 145, uh: 105 },
  { id: '06', cat: 'Bien‑être',   t: 'Recovery Complex',     s: 'Oméga + Curcuma',         std: 165, uh: 119 },
  { id: '07', cat: 'Supplément',  t: 'Caséine Nuit',         s: 'Cacao · 1 kg',            std: 199, uh: 145 },
  { id: '08', cat: 'Performance', t: 'Pre‑Workout Calme',    s: 'Sans crash · 30 doses',   std: 145, uh: 109 },
  { id: '09', cat: 'Pack repas',  t: 'Cut Stack 7 jours',    s: 'Protocole · C2 / Sèche',  std: 355, uh: 269 },
];

function ProductCard({ p, member }) {
  const save = Math.round((1 - p.uh / p.std) * 100);
  return (
    <article className={`dt-product ${member ? 'is-member' : ''} dt-reveal`}>
      <div className="dt-product-vis">
        <div className="dt-product-glow" />
        <div className="dt-product-tube">
          <div className="dt-product-tube-cap" />
          <div className="dt-product-tube-label">
            <div className="dt-product-tube-mono">DT · {p.id}</div>
            <div className="dt-product-tube-name">{p.t.split(' ')[0]}</div>
          </div>
        </div>
        <div className="dt-product-cat">— {p.cat}</div>
        {member && <div className="dt-product-save">UH −{save}%</div>}
      </div>
      <div className="dt-product-body">
        <h3 className="dt-product-t">{p.t}<span>{p.s}</span></h3>
        <div className="dt-product-prices">
          <div className="dt-product-pr">
            <div className="dt-product-pr-l">Standard</div>
            <div className={`dt-product-pr-v ${member ? 'strike' : ''}`}>{p.std}<span className="dt-cur">TND</span></div>
          </div>
          <div className="dt-product-pr">
            <div className="dt-product-pr-l champ">Tarif UH</div>
            <div className="dt-product-pr-v volt">{p.uh}<span className="dt-cur">TND</span></div>
          </div>
        </div>
        <button className={`dt-btn dt-btn-sm ${member ? 'dt-btn-primary' : 'dt-btn-ghost'}`}>
          {member ? 'Ajouter au protocole' : 'Voir le produit'} →
        </button>
      </div>
    </article>
  );
}

window.PRODUCTS = PRODUCTS;
window.ProductCard = ProductCard;
