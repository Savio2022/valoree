import { useMemo, useState } from 'react';

const categories = ['Todos', 'Cama, Mesa & Banho', 'Cozinha', 'Organização', 'Decoração'];
const products = [
  { id: 1, name: 'Jogo de Cama Aconchego', category: 'Cama, Mesa & Banho', price: 119.90, oldPrice: 149.90, tag: 'MAIS VENDIDO', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=85', color: 'rose' },
  { id: 2, name: 'Kit Toalhas Macias', category: 'Cama, Mesa & Banho', price: 79.90, oldPrice: 99.90, tag: 'OFERTA', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=85', color: 'blue' },
  { id: 3, name: 'Kit Potes para Cozinha', category: 'Cozinha', price: 49.90, oldPrice: null, tag: 'NOVIDADE', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85', color: 'yellow' },
  { id: 4, name: 'Organizador Multiuso', category: 'Organização', price: 39.90, oldPrice: 54.90, tag: '', image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=900&q=85', color: 'green' },
  { id: 5, name: 'Caminho de Mesa Natural', category: 'Cama, Mesa & Banho', price: 44.90, oldPrice: null, tag: '', image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=85', color: 'orange' },
  { id: 6, name: 'Utensílios para o Dia a Dia', category: 'Cozinha', price: 34.90, oldPrice: 44.90, tag: 'ESCOLHA DA CASA', image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=900&q=85', color: 'blue' },
  { id: 7, name: 'Vaso Decorativo', category: 'Decoração', price: 59.90, oldPrice: null, tag: '', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85', color: 'green' },
  { id: 8, name: 'Cesto Organizador', category: 'Organização', price: 64.90, oldPrice: null, tag: '', image: 'https://images.unsplash.com/photo-1593085260707-5377ba37f868?auto=format&fit=crop&w=900&q=85', color: 'yellow' },
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
  function chooseCategory(value) { setCategory(value); document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth' }); }
  return <div className="store">
    <div className="topline">SUA CASA, SEU JEITO, SEU ACONCHEGO <span>✳</span> BEM-VINDO À VALOREE</div>
    <header className="header">
      <a className="logo" href="#" aria-label="Valoree início">valor<span>ee</span><small>CASA • COZINHA • ACONCHEGO</small></a>
      <nav className="nav"><a href="#categorias">Categorias</a><a href="#colecao">Mais procurados</a><a href="#manifesto">Nossa história</a></nav>
      <div className="header-actions">
        <label className="searchbox"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar produtos" aria-label="Buscar produtos" /></label>
        <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="Abrir sacola">Sacola <i>{count}</i></button>
      </div>
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="kicker">UM CARINHO EM CADA CANTO</span>
          <h1>Deixe sua casa<br/><em>com a sua cara.</em></h1>
          <p>Detalhes que transformam a rotina: cama, mesa, banho e cozinha com beleza, praticidade e aquele toque especial de aconchego.</p>
          <a className="button-dark" href="#colecao">Descobrir produtos <span>↗</span></a>
          <div className="hero-stamp"><span>♥</span><b>Seu lar merece<br/>esse carinho.</b></div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1500&q=90" alt="Sala de estar acolhedora com decoração e cores naturais" />
          <div className="image-note"><span>VALOREE • CASA</span><b>O aconchego mora nos detalhes.</b></div>
          <div className="hero-bubble">FEITO<br/>PARA<br/><i>seu lar</i></div>
        </div>
      </section>
      <section className="benefits">
        <div><span>✿</span><p><b>Seleção para seu lar</b><small>Produtos úteis e cheios de charme</small></p></div>
        <div><span>♡</span><p><b>Compra tranquila</b><small>Uma experiência simples e segura</small></p></div>
        <div><span>✳</span><p><b>Atendimento próximo</b><small>Conte com a gente</small></p></div>
      </section>
      <section className="categories" id="categorias">
        <div className="section-title"><div><span className="kicker">ENCONTRE SEU CANTINHO</span><h2>Um toque especial em cada ambiente.</h2></div><p>Ideias e produtos para deixar sua casa ainda mais gostosa de viver.</p></div>
        <div className="category-grid">
          <button className="cat-rose" onClick={() => chooseCategory('Cama, Mesa & Banho')}><img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=700&q=85" alt="Cama arrumada com roupa de cama"/><span><small>CONFORTO E CUIDADO</small>Cama, mesa & banho <b>↗</b></span></button>
          <button className="cat-yellow" onClick={() => chooseCategory('Cozinha')}><img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=85" alt="Cozinha bonita e funcional"/><span><small>PRATICIDADE COM CHARME</small>Cozinha <b>↗</b></span></button>
          <button className="cat-green" onClick={() => chooseCategory('Organização')}><img src="https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=700&q=85" alt="Ambiente organizado"/><span><small>TUDO EM SEU LUGAR</small>Organização <b>↗</b></span></button>
          <button className="cat-blue" onClick={() => chooseCategory('Decoração')}><img src="https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=85" alt="Objetos decorativos"/><span><small>BELEZA NOS DETALHES</small>Decoração <b>↗</b></span></button>
        </div>
      </section>
      <section className="collection" id="colecao">
        <div className="section-title collection-title"><div><span className="kicker">ESCOLHIDOS COM CARINHO</span><h2>Favoritos para sua casa.</h2></div><p>Pequenas mudanças que fazem uma grande diferença no dia a dia.</p></div>
        <div className="filters">{categories.map(c => <button key={c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div>
        <div className="product-grid">{visible.map(p => <article className="product-card" key={p.id}>
          <div className={'product-photo tone-'+p.color}><img src={p.image} alt={p.name} loading="lazy"/>{p.tag && <span className="product-tag">{p.tag}</span>}<button className="quick-add" onClick={() => add(p)} aria-label={'Adicionar '+p.name}>+</button></div>
          <div className="product-meta"><div><small>{p.category}</small><h3>{p.name}</h3></div><div className="prices"><b>{money(p.price)}</b>{p.oldPrice && <del>{money(p.oldPrice)}</del>}</div></div>
          <button className="add-line" onClick={() => add(p)}>Adicionar à sacola <span>↗</span></button>
        </article>)}</div>
        {visible.length === 0 && <p className="no-results">Não encontramos produtos com esse nome. Tente outra busca.</p>}
        <p className="catalog-note">Vitrine demonstrativa: produtos, imagens e preços serão substituídos pelo catálogo real antes da abertura das vendas.</p>
      </section>
      <section className="color-banner"><div><span className="kicker">MAIS COR, MAIS ACONCHEGO</span><h2>O prazer de cuidar<br/>do lugar que é seu.</h2><p>Inspire-se, renove os detalhes e transforme sua casa no seu lugar favorito.</p><a href="#colecao">Ver seleção da casa ↗</a></div><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90" alt="Sala decorada com tons quentes e plantas"/></section>
      <section className="manifesto" id="manifesto">
        <div className="manifesto-copy"><span className="kicker">A ESSÊNCIA VALOREE</span><h2>Casa bonita é casa<br/><em>com vida e carinho.</em></h2><p>Acreditamos que o aconchego está nas pequenas coisas: uma mesa bem posta, uma cama gostosa, uma cozinha prática e detalhes que fazem você se sentir em casa.</p><a href="#colecao">Conheça nossa seleção ↗</a></div>
        <div className="manifesto-image"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90" alt="Ambiente de casa iluminado e acolhedor"/></div>
      </section>
      <section className="newsletter"><span className="kicker">VAMOS DEIXAR SUA CASA MAIS ESPECIAL?</span><h2>Seu lar merece<br/>um toque Valoree.</h2><p>Tem alguma dúvida? Nossa equipe está pronta para conversar com você.</p><a className="button-light" href="https://wa.me/5511950264701" target="_blank" rel="noreferrer">Fale com a Valoree ↗</a></section>
    </main>
    <footer className="footer"><div className="footer-main"><div><a className="logo footer-logo" href="#">valor<span>ee</span></a><p>Casa, cozinha e aconchego.</p></div><div><b>Explore</b><a href="#categorias">Categorias</a><a href="#colecao">Produtos</a><a href="#manifesto">Nossa história</a></div><div><b>Atendimento</b><a href="https://wa.me/5511950264701" target="_blank" rel="noreferrer">Fale conosco</a><span>Estamos aqui para ajudar.</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Valoree. Todos os direitos reservados.</span><span>Feito com carinho para o seu lar.</span></div></footer>
    {notice && <div className="toast">{notice}</div>}
    {cartOpen && <div className="scrim" onClick={() => setCartOpen(false)}><aside className="drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><span className="kicker">SUA SELEÇÃO</span><h2>Sacola ({count})</h2></div><button onClick={() => setCartOpen(false)} aria-label="Fechar sacola">×</button></div>
      {cart.length === 0 ? <div className="empty"><span>♡</span><h3>Sua sacola está vazia.</h3><p>Encontre algo especial para deixar sua casa ainda mais bonita.</p><button className="button-dark" onClick={() => setCartOpen(false)}>Continuar explorando</button></div> : <>
        <div className="drawer-items">{cart.map(item => <div className="drawer-item" key={item.id}><img src={item.image} alt=""/><div className="drawer-product"><b>{item.name}</b><span>{money(item.price)}</span><div className="qty"><button onClick={() => changeQty(item.id,-1)}>−</button><span>{item.qty}</span><button onClick={() => changeQty(item.id,1)}>+</button></div></div><strong>{money(item.price*item.qty)}</strong></div>)}</div>
        <div className="drawer-bottom"><div className="subtotal"><span>Subtotal</span><b>{money(total)}</b></div><p>Frete e pagamento serão configurados na próxima etapa.</p><button className="button-dark full" onClick={() => notify('A etapa de pagamento será ativada após a integração segura.')}>Continuar <span>↗</span></button><small>Ambiente em desenvolvimento. Nenhuma cobrança será realizada.</small></div>
      </>}
    </aside></div>}
  </div>;
}
