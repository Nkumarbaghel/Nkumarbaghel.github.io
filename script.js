const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
if (menu && links) {
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));
}
function sendMessage(event) {
  event.preventDefault();
  const status = document.getElementById('form-status');
  if (status) status.textContent = 'धन्यवाद! संपर्क फॉर्म तैयार है। ईमेल/WhatsApp लिंक जोड़ने पर संदेश सीधे भेजा जा सकेगा।';
  return false;
}
