// Blog categories: icon-only. Legacy folder/card styles are intentionally bypassed.
document.addEventListener("DOMContentLoaded",()=>{
  const hero=document.querySelector(".blog-hero");
  if(!hero||typeof posts==="undefined"||document.querySelector("#categoryFolders"))return;

  const style=document.createElement("style");
  style.id="category-icon-styles-v2";
  style.textContent=`
    #categoryFolders.category-icon-section{width:min(1100px,94%);margin:34px auto 54px;box-sizing:border-box}
    #categoryFolders .category-folders-head{margin:0 0 26px;text-align:left}
    #categoryFolders .category-folders-head span{display:inline-flex;align-items:center;gap:8px;color:#ff2027;font-size:13px;font-weight:800;letter-spacing:.5px}
    #categoryFolders .category-icon-grid{display:grid;grid-template-columns:repeat(5,minmax(90px,1fr));gap:30px 34px;align-items:start;justify-items:center}
    #categoryFolders .category-icon-item{appearance:none!important;position:relative!important;width:100%!important;min-width:0!important;height:auto!important;min-height:0!important;padding:0!important;margin:0!important;border:0!important;border-radius:0!important;background:transparent!important;background-image:none!important;box-shadow:none!important;color:#fff!important;cursor:pointer;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;text-align:center!important;box-sizing:border-box!important;transition:transform .18s,filter .18s!important}
    #categoryFolders .category-icon-item::before,#categoryFolders .category-icon-item::after{content:none!important;display:none!important}
    #categoryFolders .category-icon-item:hover{transform:translateY(-5px)!important;filter:brightness(1.12)!important}
    #categoryFolders .category-icon-item:focus-visible{outline:2px solid #ff2027!important;outline-offset:8px!important;border-radius:12px!important}
    #categoryFolders .category-icon-item .category-icon-symbol{display:flex!important;align-items:center!important;justify-content:center!important;width:78px!important;height:78px!important;padding:0!important;margin:0 0 9px!important;border:0!important;border-radius:0!important;background:transparent!important;background-image:none!important;box-shadow:none!important;font-size:48px!important;line-height:1!important}
    #categoryFolders .category-icon-item strong{display:block!important;width:100%!important;max-width:150px!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;color:#fff!important;font-size:13px!important;line-height:1.3!important;font-weight:700!important;white-space:normal!important;text-shadow:0 1px 8px rgba(0,0,0,.4)!important}
    #categoryFolders .category-icon-item span{border:0!important;background:transparent!important;box-shadow:none!important}
    .folder-modal{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.82);display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}
    .folder-modal-box{width:min(900px,100%);max-height:90vh;overflow:auto;background:#101010;color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:18px;box-shadow:0 25px 80px rgba(0,0,0,.55);padding:20px;box-sizing:border-box}
    .folder-modal-head{display:flex;align-items:center;justify-content:space-between;gap:15px;padding-bottom:13px;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:13px}
    .folder-modal-head h3{margin:0;color:#fff;font-size:19px}.folder-close{border:1px solid rgba(255,255,255,.15);background:#181818;color:#fff;width:36px;height:36px;border-radius:9px;cursor:pointer;font-size:17px}.folder-close:hover{border-color:#ff2027;color:#ff5a5f}
    .folder-posts{display:grid;gap:10px}.folder-post{padding:14px;border:1px solid rgba(255,255,255,.09);border-radius:12px;background:#151515}.folder-post small{color:#999;font-size:11px}.folder-post h4{margin:6px 0;color:#fff;font-size:16px;line-height:1.4}.folder-post p{margin:0 0 9px;color:#aaa;font-size:12px;line-height:1.6}.folder-post a{color:#ff5a5f;text-decoration:none;font-weight:800;font-size:12px}.folder-post a:hover{text-decoration:underline}
    @media(max-width:900px){#categoryFolders .category-icon-grid{grid-template-columns:repeat(4,minmax(80px,1fr));gap:26px 18px}#categoryFolders .category-icon-item .category-icon-symbol{width:70px!important;height:70px!important;font-size:42px!important}}
    @media(max-width:560px){#categoryFolders.category-icon-section{width:92%;margin-top:25px}#categoryFolders .category-icon-grid{grid-template-columns:repeat(3,minmax(70px,1fr));gap:24px 10px}#categoryFolders .category-icon-item .category-icon-symbol{width:60px!important;height:60px!important;font-size:34px!important}#categoryFolders .category-icon-item strong{font-size:11px!important;line-height:1.2!important}.folder-modal{padding:10px}.folder-modal-box{padding:15px;border-radius:15px}}
  `;
  document.head.appendChild(style);

  const categories=[["💻","Digital / Technology","digital"],["📰","News / समाचार","news"],["👨‍💻","Career / Jobs","career"],["🌾","छत्तीसगढ़ | संस्कृति और त्योहार","chhattisgarh"],["📚","Education / शिक्षा","education"],["💼","Business / Finance","business"],["🤖","AI / Artificial Intelligence","ai"],["🌐","Internet / Social Media","internet"],["🎭","Culture / संस्कृति","culture"],["📝","मेरे विचार","thoughts"]];
  const norm=v=>String(v||"").toLowerCase();
  const classify=(p,key)=>{const t=norm(`${p.title||""} ${p.category||""} ${p.excerpt||""}`);if(key==="chhattisgarh")return /छत्तीसगढ़|chhattisgarh/.test(t)&&!/डिजिटल बदलाव|digital/.test(t);if(key==="digital")return /डिजिटल|digital|technology|तकनीक/.test(t)&&!/छत्तीसगढ़/.test(t);if(key==="news")return /news|समाचार|खबर/.test(t);if(key==="career")return /career|job|jobs|नौकरी|resume|रिज्यूमे/.test(t);if(key==="education")return /education|शिक्षा|पढ़ाई|परीक्षा/.test(t);if(key==="business")return /business|finance|बिजनेस|व्यापार|वित्त/.test(t);if(key==="ai")return /\bai\b|artificial intelligence|chatgpt|एआई/.test(t);if(key==="internet")return /internet|इंटरनेट|social media|सोशल मीडिया|facebook|instagram|youtube/.test(t);if(key==="culture")return /culture|संस्कृति|लोककला|लोकजीवन/.test(t);if(key==="thoughts")return /विचार|thought/.test(t);return false};
  const esc=s=>String(s||"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
  const date=s=>{const d=new Date((s||"")+"T00:00:00");return isNaN(d)?"":d.toLocaleDateString("hi-IN",{day:"numeric",month:"long",year:"numeric"})};

  const hideOutsideCards=()=>{const p=document.querySelector("#posts"),t=document.querySelector(".blog-tools");if(p)p.style.setProperty("display","none","important");if(t)t.style.setProperty("display","none","important")};
  hideOutsideCards();
  const observer=new MutationObserver(hideOutsideCards);if(document.body)observer.observe(document.body,{childList:true,subtree:true});

  const section=document.createElement("section");
  section.id="categoryFolders";
  section.className="category-icon-section";
  section.innerHTML=`<div class="category-folders-head"><span>▦ &nbsp;BLOG CATEGORIES</span></div><div class="category-icon-grid">${categories.map(([i,n,k])=>`<button type="button" class="category-icon-item" data-key="${k}" aria-label="${n} के लेख खोलें"><span class="category-icon-symbol" aria-hidden="true">${i}</span><strong>${n}</strong></button>`).join("")}</div>`;
  hero.insertAdjacentElement("afterend",section);

  function openFolder(key,name){
    const unique=new Map();
    posts.filter(p=>classify(p,key)).forEach(p=>unique.set(`${norm(p.title)}|${p.date||""}`,p));
    const matches=Array.from(unique.values()).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
    const modal=document.createElement("div");
    modal.className="folder-modal";
    modal.innerHTML=`<div class="folder-modal-box"><div class="folder-modal-head"><h3>${esc(name)} <span style="color:#999;font-size:12px;font-weight:400">(${matches.length} लेख)</span></h3><button class="folder-close" type="button" aria-label="बंद करें">✕</button></div><div class="folder-posts">${matches.length?matches.map(p=>`<article class="folder-post"><small>${esc(p.category||"सामान्य")} • ${date(p.date)}</small><h4>${esc(p.title)}</h4><p>${esc(p.excerpt||"")}</p><a href="blog.html?post=${encodeURIComponent(p.id)}">पूरा लेख पढ़ें →</a></article>`).join(""):`<p style="color:#aaa">इस category में अभी कोई लेख उपलब्ध नहीं है।</p>`}</div></div>`;
    document.body.appendChild(modal);
    const close=()=>modal.remove();
    modal.querySelector(".folder-close").onclick=close;
    modal.onclick=e=>{if(e.target===modal)close()};
  }
  section.querySelectorAll(".category-icon-item").forEach(b=>b.onclick=()=>{const x=categories.find(a=>a[2]===b.dataset.key);if(x)openFolder(x[2],x[1])});
});
