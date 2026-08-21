(() => {
  const $ = id => document.getElementById(id);
  let posts = Array.isArray(window.posts) ? window.posts.map(p => ({...p})) : [];
  let editingIndex = -1;

  function today(){
    return new Date().toISOString().slice(0,10);
  }
  function slugify(text){
    return text.toLowerCase().trim()
      .replace(/[^a-z0-9\u0900-\u097f\s-]/g,'')
      .replace(/\s+/g,'-').replace(/-+/g,'-')
      .slice(0,60) || 'new-post';
  }
  function escapeHtml(s){
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
    }[c]));
  }
  function renderList(){
    const q = $('listSearch').value.toLowerCase();
    const box = $('postList');
    const filtered = posts.map((p,i)=>({p,i})).filter(({p}) =>
      (p.title+' '+p.category).toLowerCase().includes(q)
    );
    box.innerHTML = filtered.length ? filtered.map(({p,i}) => `
      <div class="post-item ${i===editingIndex?'active':''}" data-index="${i}">
        <strong>${escapeHtml(p.title)}</strong>
        <span>${escapeHtml(p.category || '')} • ${escapeHtml(p.date || '')}</span>
      </div>`).join('') : '<div class="empty">कोई लेख नहीं मिला</div>';
    box.querySelectorAll('.post-item').forEach(el => el.onclick = () => loadPost(+el.dataset.index));
  }
  function clearForm(){
    editingIndex = -1;
    $('formTitle').textContent = 'नया लेख';
    $('postForm').reset();
    $('date').value = today();
    $('postId').value = '';
    $('preview').classList.add('hidden');
    renderList();
  }
  function loadPost(i){
    const p = posts[i];
    editingIndex = i;
    $('formTitle').textContent = 'लेख संपादित करें';
    $('postId').value = p.id || '';
    $('title').value = p.title || '';
    $('category').value = p.category || '';
    $('date').value = p.date || today();
    $('image').value = p.image || '';
    $('excerpt').value = p.excerpt || '';
    $('content').value = htmlToText(p.content || '');
    $('preview').classList.add('hidden');
    renderList();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function htmlToText(html){
    const div=document.createElement('div'); div.innerHTML=html;
    return div.innerText.replace(/\n{3,}/g,'\n\n').trim();
  }
  function textToHtml(text){
    return text.split(/\n\s*\n/).map(x => `<p>${escapeHtml(x).replace(/\n/g,'<br>')}</p>`).join('\n    ');
  }
  function collect(){
    const title=$('title').value.trim();
    return {
      id: $('postId').value.trim() || slugify(title),
      title,
      date: $('date').value || today(),
      category: $('category').value.trim(),
      image: $('image').value.trim(),
      excerpt: $('excerpt').value.trim(),
      content: textToHtml($('content').value.trim())
    };
  }
  function saveForm(e){
    e.preventDefault();
    const p=collect();
    if(!p.title || !p.category || !p.content) return;
    if(editingIndex>=0) posts[editingIndex]=p; else posts.unshift(p);
    alert('लेख सेव हो गया। अब "posts.js डाउनलोड" करके GitHub में upload करें।');
    renderList();
  }
  function jsString(value){
    return JSON.stringify(String(value ?? ''));
  }
  function generateJS(){
    const body = posts.map(p => `{
    id: ${jsString(p.id)},
    title: ${jsString(p.title)},
    date: ${jsString(p.date)},
    category: ${jsString(p.category)},
    image: ${jsString(p.image)},
    excerpt: ${jsString(p.excerpt)},
    content: ${jsString(p.content)}
}`).join(',\n\n');
    return `window.posts = [\n\n${body}\n\n];\n`;
  }
  function download(){
    const blob=new Blob([generateJS()],{type:'application/javascript;charset=utf-8'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='posts.js';
    a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }
  function preview(){
    const p=collect();
    $('preview').innerHTML = `<h2>${escapeHtml(p.title)}</h2>
      <div class="meta">${escapeHtml(p.category)} • ${escapeHtml(p.date)}</div>
      <p><strong>${escapeHtml(p.excerpt)}</strong></p>
      <div>${p.content}</div>`;
    $('preview').classList.remove('hidden');
    $('preview').scrollIntoView({behavior:'smooth'});
  }

  $('postForm').addEventListener('submit',saveForm);
  $('downloadBtn').onclick=download;
  $('previewBtn').onclick=preview;
  $('newBtn').onclick=clearForm;
  $('clearBtn').onclick=clearForm;
  $('listSearch').oninput=renderList;

  $('date').value=today();
  renderList();
})();
