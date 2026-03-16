(function(){
  async function loadShops(){
    const res = await fetch('assets/data/shops.json');
    const shops = await res.json();
    return shops;
  }
  function walink(num, text){
    const n = (num||'').replace(/[^0-9+]/g,'');
    const msg = encodeURIComponent(text||'Hi! I want a haircut token.');
    return `https://wa.me/${n.replace(/^\+/, '')}?text=${msg}`;
  }
  function formUrlFor(shopId){
    const cfg = window.MVP_CONFIG || {}; 
    const map = (cfg.SHOP_PREFILL||{});
    return map[shopId] || cfg.FORM_URL || '#';
  }
  function shopCard(s){
    return `
      <div class="card">
        <h3>${s.name}</h3>
        <div class="small">${s.address}</div>
        <div class="small">Typical: ${s.services.map(x=>x.name+" ₹"+x.price).join(' · ')}</div>
        <div class="cta" style="margin-top:10px">
          <a class="btn primary" href="book.html?shop=${s.id}">Get Token</a>
          <a class="btn" href="${walink(s.whatsapp, 'Hi! I want a haircut token at '+s.name)}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>`;
  }
  async function homeGrid(){
    const wrap = document.getElementById('shopGrid');
    if(!wrap) return;
    const shops = await loadShops();
    wrap.innerHTML = shops.map(shopCard).join('');
  }
  async function shopsPage(){
    const list = document.getElementById('shopList');
    if(!list) return;
    const shops = await loadShops();
    list.innerHTML = shops.map(shopCard).join('');
  }
  async function bookPage(){
    const select = document.getElementById('shopSelect');
    const openBtn = document.getElementById('openForm');
    const frame = document.getElementById('formFrame');
    const wBtn = document.getElementById('whatsAppBtn');
    if(!select||!openBtn) return;
    const shops = await loadShops();
    select.innerHTML = shops.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
    const url = new URL(window.location.href);
    const initial = url.searchParams.get('shop') || shops[0]?.id;
    select.value = initial;
    function refresh(){
      const sid = select.value;
      frame.src = formUrlFor(sid);
      const shop = shops.find(x=>x.id===sid);
      if(shop){
        wBtn.href = walink(shop.whatsapp, `Hi! I want a haircut token at ${shop.name}`);
        wBtn.textContent = 'WhatsApp '+shop.name.split(' ')[0];
      }
    }
    openBtn.addEventListener('click', refresh);
    refresh();
  }
  homeGrid();
  shopsPage();
  bookPage();
})();
