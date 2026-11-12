import { useMemo, useState } from 'react';

const categories = ['Todos', 'Casa & Decoração', 'Cozinha', 'Beleza', 'Moda & Acessórios', 'Presentes'];
const products = [
  { id: 1, name: 'Vaso Orgânico em Cerâmica', category: 'Casa & Decoração', price: 89.90, oldPrice: 119.90, tag: 'MAIS VENDIDO', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Organizador Minimalista', category: 'Cozinha', price: 54.90, oldPrice: 69.90, tag: 'ESCOLHA DA CASA', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Bolsa Casual Essencial', category: 'Moda & Acessórios', price: 129.90, oldPrice: null, tag: 'NOVIDADE', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Kit Autocuidado', category: 'Beleza', price: 74.90, oldPrice: 94.90, tag: '', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Luminária de Mesa', category: 'Casa & Decoração', price: 109.90, oldPrice: null, tag: '', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Acessório para Servir', category: 'Cozinha', price: 39.90, oldPrice: 49.90, tag: 'OFERTA', image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'Óculos de Sol Clássico', category: 'Moda & Acessórios', price: 69.90, oldPrice: null, tag: '', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'Presente Especial', category: 'Presentes', price: 99.90, oldPrice: null, tag: '', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=85' },
];
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function App() {
  const [category, setCategory] = useState('Todos');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const visible = useMemo(() => products.filter(p => (category === 'Todos' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase())), [category, search]);
  const count = cart.reduce((n, item) => n + item.qty, 0);
  const total = cart.reduce((n, item) => n + item.price * item.qty, 0);
  function notify(message) { setNotice(message); window.clearTimeout(window.__valoreeToast); window.__valoreeToast = window.setTimeout(() => setNotice(''), 2600); }
  function add(product) {
    setCart(old => old.some(x => x.id === product.id) ? old.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x) : [...old, { ...product, qty: 1 }]);
    notify('Adicionado à sua sacola');
  }
  function changeQty(id, delta) { setCart(old => old.map(x => x.id === id ? { ...x, qty: x.qty + delta } : x).filter(x => x.qty > 0)); }
  return <div className="store">
    <div className="topline">UMA EXPERIÊNCIA DE COMPRA FEITA PARA VOCÊ <span>•</span> CONHEÇA A VALOREE</div>
    <header className="header">
      <a className="logo" href="#" aria-label="Valoree início">valor<span>ee</span><small>ESCOLHAS QUE FAZEM SENTIDO</small></a>
      <nav className="nav"><a href="#colecao">Novidades</a><a href="#colecao">Mais procurados</a><a href="#manifesto">Nossa essência</a></nav>
      <div className="header-actions">
        <label className="searchbox"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar produtos" aria-label="Buscar produtos" /></label>
        <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="Abrir sacola">Sacola <i>{count}</i></button>
      </div>
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="kicker">O NOVO JEITO DE ESCOLHER</span>
          <h1>Seu estilo.<br/><em>Seu jeito de viver.</em></h1>
          <p>Descubra produtos que unem beleza, praticidade e personalidade. Uma curadoria especial para os detalhes que fazem a diferença.</p>
          <a className="button-dark" href="#colecao">Explore a coleção <span>↗</span></a>
          <div className="hero-footnote"><span>01 / 03</span><span>CURADORIA VALOREE</span></div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=90" alt="Ambiente acolhedor com decoração contemporânea" />
          <div className="image-note"><span>VALOREE / HOME</span><b>Beleza nos detalhes.</b></div>
        </div>
      </section>
      <section className="benefits">
        <div><span>✳</span><p><b>Curadoria especial</b><small>Escolhas que inspiram</small></p></div>
        <div><span>◇</span><p><b>Compra com tranquilidade</b><small>Experiência simples e segura</small></p></div>
        <div><span>♡</span><p><b>Atendimento próximo</b><small>Estamos aqui para ajudar</small></p></div>
      </section>
      <section className="categories">
        <div className="section-title"><div><span className="kicker">EXPLORE POR CATEGORIA</span><h2>Um mundo de boas escolhas.</h2></div><p>Encontre algo especial para cada momento.</p></div>
        <div className="category-grid">
          <button onClick={() => {setCategory('Casa & Decoração'); document.getElementById('colecao').scrollIntoView({behavior:'smooth'});}}><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=85" alt="Decoração de interiores"/><span>Casa & decoração <b>↗</b></span></button>
          <button onClick={() => {setCategory('Cozinha'); document.getElementById('colecao').scrollIntoView({behavior:'smooth'});}}><img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=85" alt="Cozinha organizada"/><span>Cozinha <b>↗</b></span></button>
          <button onClick={() => {setCategory('Beleza'); document.getElementById('colecao').scrollIntoView({behavior:'smooth'});}}><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=85" alt="Produtos de beleza"/><span>Beleza <b>↗</b></span></button>
          <button onClick={() => {setCategory('Moda & Acessórios'); document.getElementById('colecao').scrollIntoView({behavior:'smooth'});}}><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85" alt="Moda e acessórios"/><span>Moda & acessórios <b>↗</b></span></button>
        </div>
      </section>
      <section className="collection" id="colecao">
        <div className="section-title collection-title"><div><span className="kicker">SELEÇÃO VALOREE</span><h2>Favoritos para descobrir.</h2></div><p>Produtos escolhidos para trazer mais beleza e praticidade à sua rotina.</p></div>
        <div className="filters">{categories.map(c => <button key={c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div>
        <div className="product-grid">{visible.map(p => <article className="product-card" key={p.id}>
          <div className="product-photo"><img src={p.image} alt={p.name} loading="lazy"/>{p.tag && <span className="product-tag">{p.tag}</span>}<button className="quick-add" onClick={() => add(p)} aria-label={'Adicionar '+p.name}>+</button></div>
          <div className="product-meta"><div><small>{p.category}</small><h3>{p.name}</h3></div><div className="prices"><b>{money(p.price)}</b>{p.oldPrice && <del>{money(p.oldPrice)}</del>}</div></div>
          <button className="add-line" onClick={() => add(p)}>Adicionar à sacola <span>↗</span></button>
        </article>)}</div>
        {visible.length === 0 && <p className="no-results">Não encontramos produtos com esse nome. Tente outra busca.</p>}
        <p className="catalog-note">Vitrine demonstrativa: produtos, imagens e preços serão substituídos pelo catálogo real da Valoree antes da abertura das vendas.</p>
      </section>
      <section className="manifesto" id="manifesto">
        <div className="manifesto-image"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90" alt="Interior elegante e acolhedor"/></div>
        <div className="manifesto-copy"><span className="kicker">A ESSÊNCIA VALOREE</span><h2>Não é sobre ter mais.<br/><em>É sobre escolher bem.</em></h2><p>Acreditamos que os melhores detalhes são aqueles que fazem sentido para você. Por isso, buscamos unir design, utilidade e valor em uma experiência de compra leve e descomplicada.</p><a href="#colecao">Conheça nossa seleção ↗</a></div>
      </section>
      <section className="newsletter"><span className="kicker">FIQUE POR PERTO</span><h2>Boas escolhas começam<br/>com uma boa descoberta.</h2><p>Em breve, novidades e seleções especiais da Valoree.</p><a className="button-light" href="https://wa.me/5511950264701" target="_blank" rel="noreferrer">Fale com a Valoree ↗</a></section>
    </main>
    <footer className="footer"><div className="footer-main"><div><a className="logo footer-logo" href="#">valor<span>ee</span></a><p>Escolhas que fazem sentido.</p></div><div><b>Institucional</b><a href="#manifesto">Nossa essência</a><a href="#colecao">Produtos</a></div><div><b>Atendimento</b><a href="https://wa.me/5511950264701" target="_blank" rel="noreferrer">Fale conosco</a><span>Segunda a sexta, horário comercial</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Valoree. Todos os direitos reservados.</span><span>Uma loja em construção, feita com cuidado.</span></div></footer>
    {notice && <div className="toast">{notice}</div>}
    {cartOpen && <div className="scrim" onClick={() => setCartOpen(false)}><aside className="drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><span className="kicker">SUA SELEÇÃO</span><h2>Sacola ({count})</h2></div><button onClick={() => setCartOpen(false)} aria-label="Fechar sacola">×</button></div>
      {cart.length === 0 ? <div className="empty"><span>◇</span><h3>Sua sacola está vazia.</h3><p>Descubra algo especial para levar com você.</p><button className="button-dark" onClick={() => setCartOpen(false)}>Continuar explorando</button></div> : <>
        <div className="drawer-items">{cart.map(item => <div className="drawer-item" key={item.id}><img src={item.image} alt=""/><div className="drawer-product"><b>{item.name}</b><span>{money(item.price)}</span><div className="qty"><button onClick={() => changeQty(item.id,-1)}>−</button><span>{item.qty}</span><button onClick={() => changeQty(item.id,1)}>+</button></div></div><strong>{money(item.price*item.qty)}</strong></div>)}</div>
        <div className="drawer-bottom"><div className="subtotal"><span>Subtotal</span><b>{money(total)}</b></div><p>Frete e pagamento serão configurados na próxima etapa.</p><button className="button-dark full" onClick={() => notify('A etapa de pagamento será ativada após a integração segura.')}>Continuar <span>↗</span></button><small>Ambiente em desenvolvimento. Nenhuma cobrança será realizada.</small></div>
      </>}
    </aside></div>}
  </div>;
}
