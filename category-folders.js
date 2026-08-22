// Blog category folders — non-destructive UI layer.
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".blog-hero");
  const cat = document.querySelector("#cat");
  if (!hero || !cat) return;

  const categories = [
    ["💻", "Digital / Technology", "Digital, मोबाइल, इंटरनेट और तकनीक"],
    ["📰", "News / समाचार", "खबरें और समाचार विश्लेषण"],
    ["👨‍💻", "Career / Jobs", "नौकरी, Resume और Career"],
    ["🌾", "छत्तीसगढ़ | संस्कृति और त्योहार", "छत्तीसगढ़ के तीज-त्योहार और संस्कृति"],
    ["📚", "Education / शिक्षा", "पढ़ाई और ज्ञान"],
    ["💼", "Business / Finance", "बिजनेस और वित्त"],
    ["🤖", "AI / Artificial Intelligence", "AI और ChatGPT"],
    ["🌐", "Internet / Social Media", "वेबसाइट और सोशल मीडिया"],
    ["🎭", "Culture / संस्कृति", "कला, लोकजीवन और संस्कृति"],
    ["📝", "मेरे विचार", "विशेष लेख और व्यक्तिगत विचार"]
  ];

  if (document.querySelector("#categoryFolders")) return;
  const section = document.createElement("section");
  section.id = "categoryFolders";
  section.className = "category-folders";
  section.innerHTML = `<div class="category-folders-head"><span>📂 BLOG CATEGORIES</span><h2>जिस विषय में रुचि हो, वही चुनें</h2><p>किसी भी कैटेगरी पर क्लिक करें और उसी विषय के लेख पढ़ें।</p></div><div class="category-folder-grid">${categories.map(([icon,name,desc]) => `<button type="button" class="category-folder" data-category="${name.replace(/&/g,"&amp;").replace(/"/g,"&quot;")}"><span class="folder-icon">${icon}</span><strong>${name}</strong><small>${desc}</small><span class="folder-open">लेख देखें →</span></button>`).join("")}</div>`;
  hero.insertAdjacentElement("afterend", section);

  const style = document.createElement("style");
  style.textContent = `
    .category-folders{width:min(1100px,92%);margin:0 auto 32px;padding:26px 0 4px}
    .category-folders-head{text-align:center;margin-bottom:20px}
    .category-folders-head>span{font-size:12px;font-weight:800;letter-spacing:2px;color:#ff2027}
    .category-folders-head h2{margin:7px 0 5px;font-size:28px;color:#fff}
    .category-folders-head p{margin:0;color:#999;font-size:14px}
    .category-folder-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
    .category-folder{min-height:155px;text-align:left;padding:17px;border:1px solid rgba(255,255,255,.10);border-radius:16px;background:linear-gradient(145deg,#151515,#0d0d0d);color:#fff;cursor:pointer;display:flex;flex-direction:column;transition:.25s;box-shadow:0 8px 25px rgba(0,0,0,.14)}
    .category-folder:hover{transform:translateY(-4px);border-color:#ff2027;box-shadow:0 12px 30px rgba(255,32,39,.12)}
    .folder-icon{font-size:29px;margin-bottom:10px}.category-folder strong{font-size:14px;line-height:1.35}.category-folder small{color:#999;line-height:1.45;margin-top:6px;font-size:11px}.folder-open{margin-top:auto;padding-top:12px;color:#ff6066;font-size:12px;font-weight:700}
    @media(max-width:900px){.category-folder-grid{grid-template-columns:repeat(3,1fr)}}
    @media(max-width:600px){.category-folder-grid{grid-template-columns:repeat(2,1fr)}.category-folders-head h2{font-size:23px}.category-folder{min-height:145px;padding:14px}}
    @media(max-width:380px){.category-folder-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  section.querySelectorAll(".category-folder").forEach(btn => {
    btn.addEventListener("click", () => {
      const wanted = btn.dataset.category;
      const option = Array.from(cat.options).find(o => o.value === wanted);
      if (!option) {
        alert("इस कैटेगरी में अभी कोई लेख उपलब्ध नहीं है।");
        return;
      }
      cat.value = wanted;
      cat.dispatchEvent(new Event("change", { bubbles: true }));
      document.querySelector(".blog-tools")?.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });
});
