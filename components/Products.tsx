'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { API_URL } from '@/lib/config';

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  uhPrice?: number | null;
  discount?: number;
  images: string[];
  stock: number;
}

function ProductSkeleton() {
  return (
    <div className="dt-product">
      <div className="dt-product-vis">
        <div className="dt-skeleton" style={{ width: '100px', height: '150px' }} />
      </div>
      <div className="dt-product-body" style={{ gap: 12 }}>
        <div className="dt-skeleton" style={{ height: 24, width: '70%' }} />
        <div className="dt-skeleton" style={{ height: 16, width: '50%' }} />
        <div className="dt-skeleton" style={{ height: 40, marginTop: 8 }} />
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const savePct = product.uhPrice
    ? Math.round(((product.price - product.uhPrice) / product.price) * 100)
    : product.discount ?? 0;
  const memberPrice = product.uhPrice ?? (product.discount ? product.price * (1 - product.discount / 100) : null);
  const imageUrl = product.images?.[0]
    ? (product.images[0].startsWith('http') ? product.images[0] : `${API_URL.replace('/api', '')}${product.images[0]}`)
    : null;

  return (
    <article className="dt-product">
      <div className="dt-product-vis">
        <div className="dt-product-glow" />
        {imageUrl ? (
          <Image src={imageUrl} alt={product.name} fill className="dt-product-img" style={{ objectFit: 'cover' }} />
        ) : (
          <div className="dt-product-tube">
            <div className="dt-product-tube-cap" />
            <div className="dt-product-tube-label">
              <div className="dt-product-tube-mono">{product.brand}</div>
              <div className="dt-product-tube-name">{product.name.split(' ').slice(0, 2).join(' ')}</div>
            </div>
          </div>
        )}
        <div className="dt-product-cat">{product.category}</div>
        {savePct > 0 && <div className="dt-product-save">UH −{savePct}%</div>}
      </div>
      <div className="dt-product-body">
        <h3 className="dt-product-t">
          {product.name}
          <span>{product.brand}</span>
        </h3>
        <div className="dt-product-prices">
          <div>
            <div className="dt-product-pr-l">Prix public</div>
            <div className={`dt-product-pr-v ${memberPrice ? 'strike' : ''}`}>
              {product.price}<span className="dt-cur">TND</span>
            </div>
          </div>
          {memberPrice && (
            <div>
              <div className="dt-product-pr-l champ">Tarif Membre</div>
              <div className="dt-product-pr-v volt">
                {Math.round(memberPrice)}<span className="dt-cur">TND</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/products?limit=9&sort=popular`)
      .then((r) => r.json())
      .then((data) => { setProducts(data.products ?? []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section className="dt-section dt-products" id="produits">
      <div className="dt-container">
        <div className="dt-products-head">
          <SectionHeader
            eyebrow="Nos Produits"
            title={<>Nutrition <em>élite</em>. Tarif membre.</>}
            kicker="Des suppléments sélectionnés pour la performance, disponibles à tarif préférentiel pour les membres Ultimate Human."
          />
        </div>

        <div className="dt-products-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
            : error || products.length === 0
              ? <FallbackProducts />
              : products.map((p) => <ProductCard key={p._id} product={p} />)
          }
        </div>

        {!loading && !error && products.length > 0 && (
          <div className="dt-products-cta dt-reveal">
            <p style={{ margin: 0, fontSize: 14, color: 'var(--bone-2)' }}>
              Les membres Ascension et Elite bénéficient du tarif membre sur toute la boutique.
            </p>
            <Link className="dt-btn dt-btn-ghost" href="/produits">
              Voir tous les produits <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

const FALLBACK = [
  { name: 'Whey Protocol', brand: 'DietTemple', category: 'protéines', price: 220, uhPrice: 159 },
  { name: 'Creatine Mono', brand: 'DietTemple', category: 'force', price: 120, uhPrice: 89 },
  { name: 'Lean Stack', brand: 'DietTemple', category: 'prise de masse', price: 330, uhPrice: 245 },
  { name: 'Electrolytes+', brand: 'DietTemple', category: 'hydratation', price: 89, uhPrice: 68 },
  { name: 'Sleep Architecture', brand: 'DietTemple', category: 'récupération', price: 145, uhPrice: 105 },
  { name: 'Pre-Workout', brand: 'DietTemple', category: 'performance', price: 145, uhPrice: 109 },
];

function FallbackProducts() {
  return (
    <>
      {FALLBACK.map((p) => (
        <ProductCard key={p.name} product={{ _id: p.name, images: [], stock: 10, discount: 0, ...p }} />
      ))}
    </>
  );
}
