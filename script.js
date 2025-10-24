/* script.js - language toggle + hamburger + i18n (declarative) */

/*
  How it works:
  - Elements that should be translated must have attribute: data-i18n="key"
  - Strings are stored in the `strings` object for 'en' and 'hi'
  - Single translate button toggles between en <-> hi and saves selection to localStorage
  - Hamburger toggles nav-panel; clicking outside closes it; Esc closes it
*/

const strings = {
  en: {
    'nav.episodes':'Episodes','nav.about':'About','nav.contact':'Contact',
    'hero.title':'Devo Ke Dev Mahadev',
    'hero.sub':'“Experience the divine journey of Lord Shiva — now with English subtitles.”',
    'hero.purpose':'<strong>Explain the project purpose:</strong><br>This website is dedicated to bringing the divine story of Lord Shiva closer to everyone through English-translated subtitles. Our goal is to make this masterpiece understandable and accessible worldwide, spreading the message of devotion, balance, and eternal truth.',
    'hero.mantra':'“ॐ नमः शिवाय”',
    'cta.episodes':'Episodes','cta.about':'About',
    'hero.watch':'Watch Devo Ke Dev Mahadev in HD, understand every divine moment, and feel the devotion beyond language.',
    'hero.disclaimer':'Disclaimer / Legal: <em>placeholder — will add later</em>',
    'footer.copy':'Copyright © [2025] Devo Ke Dev Mahadev fan made Hindi to English translated subtitles series'
  },
  hi: {
    'nav.episodes':'एपिसोड','nav.about':'जानिए','nav.contact':'संपर्क',
    'hero.title':'देवो के देव महादेव',
    'hero.sub':'"भगवान शिव की दिव्य यात्रा का अनुभव करें — अब अंग्रेज़ी उपशीर्षक के साथ।"',
    'hero.purpose':'<strong>परियोजना का उद्देश्य समझाइए:</strong><br>यह वेबसाइट भगवान शिव की दिव्य कहानी को अंग्रेज़ी अनुवादित उपशीर्षकों के माध्यम से सभी के करीब लाने के लिए समर्पित है। हमारा लक्ष्य इस महान कृति को विश्व भर में समझने योग्य और सुलभ बनाना है, भक्ति, संतुलन, और शाश्वत सत्य का संदेश फैलाना है।',
    'hero.mantra':'"ॐ नमः शिवाय"',
    'cta.episodes':'एपिसोड','cta.about':'जानिए',
    'hero.watch':'देवो के देव महादेव को HD में देखें, हर दिव्य क्षण को समझें, और भाषा के परे भक्ति का अनुभव करें।',
    'hero.disclaimer':'अस्वीकरण / कानूनी: <em>बाद में जोड़ा जाएगा</em>',
    'footer.copy':'कॉपीराइट © [2025] देवो के देव महादेव फैन मेड हिंदी से अंग्रेज़ी अनुवादित उपशीर्षक सीरीज़'
  }
};

/* helper: apply language strings to DOM */
function applyLang(lang) {
  const els = document.querySelectorAll('[data-i18n]');
  els.forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if (strings[lang] && strings[lang][key]) el.innerHTML = strings[lang][key];
  });
  // update translate button UI
  const tbtn = document.querySelector('.translate-btn');
  if (tbtn) {
    tbtn.classList.toggle('active', lang === 'hi');
    tbtn.textContent = (lang === 'hi') ? 'HI' : 'EN';
    tbtn.setAttribute('aria-pressed', String(lang==='hi'));
    tbtn.setAttribute('title', (lang === 'hi') ? 'हिन्दी' : 'English');
  }
  localStorage.setItem('dkd_lang', lang);
}

/* init language from storage or browser */
const savedLang = localStorage.getItem('dkd_lang');
const defaultLang = (savedLang) ? savedLang : (navigator.language && navigator.language.startsWith('hi') ? 'hi' : 'en');
document.addEventListener('DOMContentLoaded', ()=> {
  applyLang(defaultLang);

  /* translate button (single) */
  const tbtn = document.querySelector('.translate-btn');
  if (tbtn) {
    tbtn.addEventListener('click', ()=>{
      const current = localStorage.getItem('dkd_lang') || defaultLang;
      const next = (current === 'en') ? 'hi' : 'en';
      applyLang(next);
    });
  }

  /* hamburger panel */
  const hamburger = document.getElementById('hamburger');
  const navPanel = document.getElementById('navPanel');
  if (hamburger && navPanel) {
    hamburger.addEventListener('click', (e)=>{
      const isOpen = navPanel.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      navPanel.setAttribute('aria-hidden', String(!isOpen));
      e.stopPropagation();
    });

    // close when clicking outside
    document.addEventListener('click', (e)=>{
      if (!navPanel.contains(e.target) && !hamburger.contains(e.target)) {
        navPanel.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        navPanel.setAttribute('aria-hidden', 'true');
      }
    });

    // Esc to close
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') {
        navPanel.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        navPanel.setAttribute('aria-hidden', 'true');
      }
    });
  }
});