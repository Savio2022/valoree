import { useMemo, useState } from 'react';

const categories = ['Todos', 'Casa & Decoração', 'Cozinha', 'Beleza', 'Moda & Acessórios', 'Presentes'];
const products = [
  { id: 1, name: 'Produto em destaque', category: 'Casa & Decoração', price: 79.90, tag: 'DESTAQUE', tone: 'sand', description: 'Cadastre aqui a descrição real do produto.' },
  { id: 2, name: 'Novidade da Valoree', category: 'Cozinha', price: 49.90, tag: 'NOVIDADE', tone: 'sage', description: 'Cadastre aqui a descrição real do produto.' },
  { id: 3, name: 'Escolha especial', category: 'Beleza', price: 59.90, tag: '', tone: 'rose', description: 'Cadastre aqui a descrição real do produto.' },
  { id: 4, name: 'Presente para surpreender', category: 'Presentes', price: 89.90, tag: '', tone: 'stone', description: 'Cadastre aqui a descrição real do produto.' },
];
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function App() {
  const [category, setCategory] = useState('Todos');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const visible = useMemo(() => category === 'Todos' ? products : products.filter(p => p.category === category), [category]);
  const count = cart.reduce((n, item) => n + item.qty, 0);
  const total = cart.reduce((n, item) => n + item.price * item.qty, 0);
  function add(product) {
    setCart(old => old.some(x => x.id === product.id) ? old.map(x => x.id === product.id ? {...x, qty:x.qty+1} : x) : [...old, {...product, qty:1}]);
    setNotice('Produto adicionado à sacola');
    setTimeout(() => setNotice(''), 2200);
  }
  function changeQty(id, delta) {
    setCart(old => old.map(x => x.id === id ? {...x, qty:x.qty+delta} : x).filter(x => x.qty > 0));
  }
  return <div className="site-shell">
    <div className="announcement">FRETE E CONDIÇÕES ESPECIAIS — consulte na finalização do pedido</div>
    <header className="header">
      <a className="wordmark" href="#" aria-label="Valoree início">valor<span>ee</span><small>ESCOLHAS QUE FAZEM SENTIDO</small></a>
      <nav className="desktop-nav"><a href="#colecao">Novidades</a><a href="#colecao">Mais vendidos</a><a href="#sobre">Nossa essência</a></nav>
      <button className="bag-button" onClick={() => setCartOpen(true)} aria-label="Abrir sacola">Sacola <span>{count}</span></button>
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">CURADORIA VALOREE</p><h1>Pequenos detalhes.<br/><em>Grandes diferenças.</em></h1><p>Encontre escolhas especiais para deixar sua rotina mais bonita, prática e cheia de personalidade.</p><a className="dark-button" href="#colecao">Descobrir coleção <span>↗</span></a></div>
        <div className="hero-art"><div className="art-circle"></div><div className="art-caption">O essencial<br/>bem escolhido.</div><div className="art-number">V. / 001</div></div>
      </section>
      <section className="trust-strip"><span>✳ Curadoria especial</span><span>◇ Compra segura</span><span>↗ Atendimento próximo</span></section>
      <section className="collection" id="colecao">
        <div className="section-heading"><div><p className="eyebrow">SELEÇÃO DA CASA</p><h2>Encontre o que combina com você</h2></div><p>Peças e utilidades escolhidas para o seu dia a dia.</p></div>
        <div className="filters">{categories.map(c => <button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
        <div className="product-grid">{visible.map(p => <article className="product-card" key={p.id}>
          <div className={'product-art '+p.tone}><span className="art-monogram">V.</span>{p.tag && <b>{p.tag}</b>}<span className="sample-label">IMAGEM DO PRODUTO</span></div>
          <div className="product-info"><div><p>{p.category}</p><h3>{p.name}</h3></div><strong>{money(p.price)}</strong></div>
          <button className="add-button" onClick={()=>add(p)}>Adicionar à sacola <span>+</span></button>
        </article>)}</div>
        <p className="demo-note">Os itens exibidos são exemplos de demonstração. Cadastre seus produtos, fotos e preços reais antes de publicar a loja.</p>
      </section>
      <section className="brand-story" id="sobre"><p className="eyebrow">SOBRE A VALOREE</p><h2>Comprar melhor é escolher com intenção.</h2><p>Acreditamos que bons produtos unem beleza, utilidade e valor. Nossa loja está sendo preparada para oferecer uma experiência simples, clara e segura.</p></section>
    </main>
    <footer><a className="wordmark footer-logo" href="#">valor<span>ee</span></a><span>© {new Date().getFullYear()} Valoree. Todos os direitos reservados.</span><span>Atendimento ao cliente</span></footer>
    {notice && <div className="toast">{notice}</div>}
    {cartOpen && <div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow">SUA COMPRA</p><h2>Sacola ({count})</h2></div><button className="close" onClick={()=>setCartOpen(false)}>×</button></div>
      {cart.length===0 ? <div className="empty-cart"><span>◇</span><h3>Sua sacola está vazia</h3><p>Adicione seus favoritos para continuar.</p><button className="dark-button" onClick={()=>setCartOpen(false)}>Continuar comprando</button></div> : <>
        <div className="cart-items">{cart.map(item=><div className="cart-item" key={item.id}><div className={'mini-art '+item.tone}>V.</div><div className="cart-description"><b>{item.name}</b><span>{money(item.price)}</span><div className="quantity"><button onClick={()=>changeQty(item.id,-1)}>−</button><span>{item.qty}</span><button onClick={()=>changeQty(item.id,1)}>+</button></div></div><strong>{money(item.price*item.qty)}</strong></div>)}</div>
        <div className="cart-bottom"><div className="subtotal"><span>Subtotal</span><strong>{money(total)}</strong></div><p>Frete e prazo serão calculados na próxima etapa.</p><button className="dark-button checkout-button" onClick={()=>setNotice('Checkout será conectado após configurar o Supabase e a SigiloPay.')}>Continuar para pagamento <span>↗</span></button><small>Ambiente em desenvolvimento — nenhum pagamento será cobrado.</small></div>
      </>}
    </aside></div>}
  </div>;
}
