// Blog category folders: articles stay hidden until a folder is tapped.
document.addEventListener("DOMContentLoaded",()=>{
  const hero=document.querySelector(".blog-hero");
  if(!hero||typeof posts==="undefined"||document.querySelector("#categoryFolders"))return;

  const style=document.createElement("style");
  style.id="category-folder-styles";
  style.textContent=`
    .category-folders{width:min(1100px,92%);margin:36px auto 70px;box-sizing:border-box}
    .category-folders-head{text-align:left;margin-bottom:24px}
    .category-folders-head span{display:inline-block;color:#ff2027;font-size:13px;font-weight:800;letter-spacing:.5px;margin-bottom:8px}
    .category-folders-head h2{margin:0 0 8px;color:#fff;font-size:28px;line-height:1.25}
    .category-folders-head p{margin:0;color:#aaa;font-size:14px;line-height:1.7}
    .category-folder-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
    .category-folder{position:relative;display:flex;flex-direction:column;align-items:flex-start;text-align:left;min-height:150px;padding:20px;border:1px solid rgba(255,255,255,.12);border-radius:18px;background:linear-gradient(145deg,#171717,#0d0d0d);color:#fff;cursor:pointer;box-sizing:border-box;transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease;background-clip:padding-box}
    .category-folder:hover{transform:translateY(-4px);border-color:rgba(255,32,39,.75);box-shadow:0 12px 30px rgba(0,0,0,.28)}
    .category-folder:focus-visible{outline:2px solid #ff2027;outline-offset:3px}
    .category-folder .folder-icon{font-size:30px;line-height:1;margin-bottom:12px}
    .category-folder strong{display:block;font-size:16px;line-height:1.35;color:#fff;margin-bottom:7px}
    .category-folder small{display:block;color:#aaa;font-size:12px;line-height:1.55}
    .category-folder .folder-open{display:block;margin-top:auto;padding-top:13px;color:#ff5a5f;font-size:12px;font-weight:800}
    .folder-modal{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.78);display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box}
    .folder-modal-box{width:min(900px,100%);max-height:min(760px,90vh);overflow:auto;background:#101010;color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:20px;box-shadow:0 25px 80px rgba(0,0,0,.55);padding:22px;box-sizing:border-box}
    .folder-modal-head{display:flex;align-items:center;justify-content:space-between;gap:15px;padding-bottom:15px;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:15px}
    .folder-modal-head h3{margin:0;color:#fff;font-size:20px}
    .folder-close{border:1px solid rgba(255,255,255,.15);background:#181818;color:#fff;width:38px;height:38px;border-radius:10px;cursor:pointer;font-size:18px}
    .folder-close:hover{border-color:#ff2027;color:#ff5a5f}
    .folder-posts{display:grid;gap:12px}
    .folder-post{padding:16px;border:1px solid rgba(255,255,255,.09);border-radius:14px;background:#151515}
    .folder-post small{color:#999;font-size:11px}
    .folder-post h4{margin:7px 0;color:#fff;font-size:17px;line-height:1.45}
    .folder-post p{margin:0 0 10px;color:#aaa;font-size:13px;line-height:1.65}
    .folder-post a{color:#ff5a5f;text-decoration:none;font-weight:800;font-size:13px}
    .folder-post a:hover{text-decoration:underline}
    @media(max-width:900px){.category-folder-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:560px){.category-folders{width:92%;margin-top:28px}.category-folders-head h2{font-size:23px}.category-folder-grid{grid-template-columns:1fr;gap:12px}.category-folder{min-height:132px;padding:17px}.folder-modal{padding:12px}.folder-modal-box{padding:16px;border-radius:16px}}
  `;
  document.head.appendChild(style);

  const categories=[["💻","Digital / Technology","Digital, मोबाइल, इंटरनेट और तकनीक","digital"],["📰","News / समाचार","खबरें और समाचार विश्लेषण","news"],["👨‍💻","Career / Jobs","नौकरी, Resume और Career","career"],["🌾","छत्तीसगढ़ | संस्कृति और त्योहार","छत्तीसगढ़ के तीज-त्योहार और संस्कृति","chhattisgarh"],["📚","Education / शिक्षा","पढ़ाई और ज्ञान","education"],["💼","Business / Finance","बिजनेस और वित्त","business"],["🤖","AI / Artificial Intelligence","AI और ChatGPT","ai"],["🌐","Internet / Social Media","वेबसाइट और सोशल मीडिया","internet"],["🎭","Culture / संस्कृति","कला, लोकजीवन और संस्कृति","culture"],["📝","मेरे विचार","विशेष लेख और व्यक्तिगत विचार","thoughts"]];
  const norm=v=>String(v||"").toLowerCase();
  const classify=(p,key)=>{const t=norm(`${p.title||""} ${p.category||""} ${p.excerpt||""}`);if(key==="chhattisgarh")return /छत्तीसगढ़|chhattisgarh/.test(t)&&!/डिजिटल बदलाव|digital/.test(t);if(key==="digital")return /डिजिटल|digital|technology|तकनीक/.test(t)&&!/छत्तीसगढ़/.test(t);if(key==="news")return /news|समाचार|खबर/.test(t);if(key==="career")return /career|job|jobs|नौकरी|resume|रिज्यूमे/.test(t);if(key==="education")return /education|शिक्षा|पढ़ाई|परीक्षा/.test(t);if(key==="business")return /business|finance|बिजनेस|व्यापार|वित्त/.test(t);if(key==="ai")return /\bai\b|artificial intelligence|chatgpt|एआई/.test(t);if(key==="internet")return /internet|इंटरनेट|social media|सोशल मीडिया|facebook|instagram|youtube/.test(t);if(key==="culture")return /culture|संस्कृति|लोककला|लोकजीवन/.test(t);if(key==="thoughts")return /विचार|thought/.test(t);return false};
  const esc=s=>String(s||"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
  const date=s=>{const d=new Date((s||"")+"T00:00:00");return isNaN(d)?"":d.toLocaleDateString("hi-IN",{day:"numeric",month:"long",year:"numeric"})};
  const hideOutsideCards=()=>{const p=document.querySelector("#posts"),t=document.querySelector(".blog-tools");if(p)p.style.setProperty("display","none","important");if(t)t.style.setProperty("display","none","important");};
  hideOutsideCards();
  const observer=new MutationObserver(hideOutsideCards);if(document.body)observer.observe(document.body,{childList:true,subtree:true});
  const section=document.createElement("section");section.id="categoryFolders";section.className="category-folders";
  section.innerHTML=`<div class="category-folders-head"><span>📂 BLOG CATEGORIES</span><h2>जिस विषय में रुचि हो, वही चुनें</h2><p>फोल्डर पर टैप करें — उसी विषय के ब्लॉग यहीं खुलेंगे।</p></div><div class="category-folder-grid">${categories.map(([i,n,d,k])=>`<button type="button" class="category-folder" data-key="${k}"><span class="folder-icon">${i}</span><strong>${n}</strong><small>${d}</small><span class="folder-open">फोल्डर खोलें →</span></button>`).join("")}</div>`;
  hero.insertAdjacentElement("afterend",section);
  function openFolder(key,name){const unique=new Map();posts.filter(p=>classify(p,key)).forEach(p=>unique.set(`${norm(p.title)}|${p.date||""}`,p));const matches=Array.from(unique.values()).sort((a,b)=>String(b.date).localeCompare(String(a.date)));const modal=document.createElement("div");modal.className="folder-modal";modal.innerHTML=`<div class="folder-modal-box"><div class="folder-modal-head"><h3>📂 ${esc(name)} <span style="color:#999;font-size:13px;font-weight:400">(${matches.length} लेख)</span></h3><button class="folder-close" type="button">✕</button></div><div class="folder-posts">${matches.length?matches.map(p=>`<article class="folder-post"><small>${esc(p.category||"सामान्य")} • ${date(p.date)}</small><h4>${esc(p.title)}</h4><p>${esc(p.excerpt||"")}</p><a href="blog.html?post=${encodeURIComponent(p.id)}">पूरा लेख पढ़ें →</a></article>`).join(""):`<p style="color:#aaa">इस फोल्डर में अभी कोई लेख उपलब्ध नहीं है।</p>`}</div></div>`;document.body.appendChild(modal);const close=()=>modal.remove();modal.querySelector(".folder-close").onclick=close;modal.onclick=e=>{if(e.target===modal)close()};}
  section.querySelectorAll(".category-folder").forEach(b=>b.onclick=()=>{const x=categories.find(a=>a[3]===b.dataset.key);if(x)openFolder(x[3],x[1])});
});
