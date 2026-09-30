/* ============================================================
   NAQAA CLEANING SERVICES – script.js
   Features:
     1. Dark Mode (with localStorage persistence)
     2. Language Switch – English / Arabic (RTL)
     3. Sticky Navbar + Active Link Highlight
     4. Mobile Menu (hamburger)
     5. Scroll Reveal (IntersectionObserver)
     6. Animated Counters (IntersectionObserver)
     7. Testimonials Slider (auto-play + dots + swipe)
     8. Lightbox Gallery
     9. Contact Form Validation
    10. Back-to-Top Button
    11. Footer Year
    12. Request-Service Page – pre-select service from URL param
   ============================================================ */

'use strict';

/* ============================================================
   TRANSLATION DICTIONARY
   ============================================================ */
const TRANSLATIONS = {
  en: {
    /* Brand */
    brand: 'Naqaa',

    /* Navbar */
    nav_home:     'Home',
    nav_about:    'About',
    nav_services: 'Services',
    nav_gallery:  'Gallery',
    nav_contact:  'Contact',

    /* Hero */
    hero_eyebrow:  'Trusted Cleaning Experts',
    hero_title:    'Naqaa Cleaning\nServices',
    hero_subtitle: 'Professional Cleaning Solutions for Homes and Businesses',
    hero_desc:     'Spotless results, every time. We combine eco-friendly products with modern equipment to deliver a cleaner, healthier space you can be proud of.',
    hero_cta:      'Request a Service',
    hero_explore:  'Explore Services',

    /* About */
    about_eyebrow: 'About Us',
    about_title:   'Why Choose Naqaa?',
    about_desc:    "We've been raising the bar for cleaning services since 2014 — delivering consistent quality you can feel the moment you walk through the door.",
    ab1_title: 'Experienced Specialists',
    ab1_text:  'Our team holds verified certifications and brings years of hands-on expertise to every project, large or small.',
    ab2_title: 'High Quality Service',
    ab2_text:  'We follow a rigorous checklist on every visit so nothing is ever missed and every surface meets our exacting standard.',
    ab3_title: 'Affordable Pricing',
    ab3_text:  "Premium cleaning shouldn't break the bank. Our transparent, flat-rate pricing means no surprise fees — ever.",
    ab4_title: 'Fast Response',
    ab4_text:  'Book online and get a confirmed appointment within hours. Same-day service is available for urgent situations.',
    ab5_title: 'Customer Satisfaction',
    ab5_text:  "98% of our clients rate us 5 stars. If you're not satisfied, we'll re-clean the area at no additional cost.",
    ab6_title: 'Eco-Friendly Products',
    ab6_text:  'Every product we use is biodegradable and safe for children, pets, and the planet — without sacrificing cleaning power.',
    ab7_title: 'Modern Equipment',
    ab7_text:  "Industrial-grade steam cleaners, HEPA vacuums, and pressure washers ensure a deep clean traditional methods simply can't match.",
    ab8_title: 'Fully Insured',
    ab8_text:  'Every Naqaa team member is background-checked, insured, and bonded, giving you total peace of mind in your home or office.',

    /* Services */
    srv_eyebrow: 'What We Offer',
    srv_title:   'Our Services',
    srv_desc:    'From a quick tidy-up to a full deep-clean, we have a service that fits every need and every budget.',
    srv_badge_popular: 'Popular',
    srv_badge_best:    'Best Value',
    srv_cta:  'Book Now',
    from:     'From',
    srv1_name: 'Home Cleaning',
    srv1_desc: 'A thorough clean of your entire home — kitchens, bathrooms, bedrooms, and living areas — leaving every corner spotless.',
    srv2_name: 'Office Cleaning',
    srv2_desc: 'Keep your workspace hygienic and professional. Ideal for corporate offices, clinics, and retail spaces of all sizes.',
    srv3_name: 'Carpet Cleaning',
    srv3_desc: 'Hot-water extraction removes deep-set dirt, allergens, and stains, restoring your carpets to like-new condition.',
    srv4_name: 'Pigeon Control',
    srv4_desc: 'Humane deterrents and professional removal to protect your property from pigeon damage and health hazards.',
    srv5_name: 'Deep Cleaning',
    srv5_desc: 'Our most comprehensive service — every inch of your property is cleaned, sanitised, and deodorised from top to bottom.',
    srv6_name: 'Window Cleaning',
    srv6_desc: 'Streak-free, crystal-clear windows inside and out, using pure-water pole systems that are safe at any height.',

    /* Gallery */
    gal_eyebrow: 'Before & After',
    gal_title:   'Our Work',
    gal_desc:    "Seeing is believing. Here's a glimpse at the transformations our team delivers on every job.",
    before: 'Before',
    after:  'After',

    /* Stats */
    stat1: 'Happy Clients',
    stat2: 'Completed Jobs',
    stat3: 'Years Experience',
    stat4: 'Support',

    /* Testimonials */
    test_eyebrow: 'Client Reviews',
    test_title:   'What Our Clients Say',
    test1_text:   '"Naqaa completely transformed our home. The team was professional, thorough, and incredibly respectful of our space. I won\'t use anyone else."',
    test1_name:   'Sarah M.',
    test1_role:   'Homeowner',
    test2_text:   '"Our office has never looked better. They arrive on time, work quietly around our staff, and leave everything spotless. Highly recommended."',
    test2_name:   'James R.',
    test2_role:   'Business Owner',
    test3_text:   '"The deep-clean package was worth every penny. Stubborn stains I thought were permanent are completely gone. Truly impressive results."',
    test3_name:   'Layla K.',
    test3_role:   'Apartment Resident',
    test4_text:   '"Fast, friendly, and very affordable. Booked a carpet clean at short notice and they fitted us in the very next morning. Brilliant service."',
    test4_name:   'Omar S.',
    test4_role:   'Property Manager',

    /* Contact */
    con_eyebrow:          'Get in Touch',
    con_title:            'Contact Us',
    con_desc:             "Have a question or ready to book? Fill in the form and we'll get back to you within one business hour.",
    con_info_heading:     'Naqaa Cleaning Services',
    con_address:          '123 Clean Street, Suite 4, Cairo, Egypt',
    con_hours:            'Mon – Sat: 8:00 AM – 8:00 PM',
    con_services_heading: 'Our Services',

    /* Form */
    form_name:                'Full Name',
    form_phone:               'Phone Number',
    form_email:               'Email Address',
    form_location:            'Location / Address',
    form_service:             'Service Type',
    form_service_placeholder: 'Select a service…',
    form_message:             'Message',
    form_submit:              'Send Message',
    form_submit_request:      'Submit Request',
    form_success:             "Your message was sent! We'll be in touch shortly.",
    form_success_request:     "Request submitted! We'll confirm your booking within the hour.",

    /* Form errors */
    err_name:    'Please enter your full name.',
    err_phone:   'Please enter a valid phone number.',
    err_email:   'Please enter a valid email address.',
    err_location:'Please enter your location.',
    err_service: 'Please select a service.',
    err_message: 'Please enter a message (min 10 characters).',

    /* Footer */
    footer_tagline: 'Professional Cleaning Solutions for Homes and Businesses.',
    footer_quick:   'Quick Links',
    footer_copy:    'Cleaning Services. All rights reserved.',

    /* Request page */
    req_eyebrow: 'Book a Service',
    req_title:   'Request a Service',
    req_desc:    "Fill in the form below and our team will confirm your booking within the hour.",
    req_card_title: 'Service Request Form',
    req_card_sub:   'All fields marked are required. We\'ll get back to you promptly.',
  },

  ar: {
    /* Brand */
    brand: 'نقاء',

    /* Navbar */
    nav_home:     'الرئيسية',
    nav_about:    'عن الشركة',
    nav_services: 'خدماتنا',
    nav_gallery:  'معرض الأعمال',
    nav_contact:  'تواصل معنا',

    /* Hero */
    hero_eyebrow:  'خبراء التنظيف الموثوقون',
    hero_title:    'خدمات نقاء\nللتنظيف',
    hero_subtitle: 'حلول تنظيف احترافية للمنازل والشركات',
    hero_desc:     'نتائج لامعة في كل مرة. نجمع بين المنتجات الصديقة للبيئة والمعدات الحديثة لتوفير مساحة أنظف وأكثر صحة تفخر بها.',
    hero_cta:      'طلب خدمة',
    hero_explore:  'استكشف خدماتنا',

    /* About */
    about_eyebrow: 'من نحن',
    about_title:   'لماذا تختار نقاء؟',
    about_desc:    'نرفع معايير خدمات التنظيف منذ عام 2014 — نقدم جودة ثابتة تشعر بها لحظة دخولك.',
    ab1_title: 'متخصصون ذوو خبرة',
    ab1_text:  'يحمل فريقنا شهادات معتمدة ويجلب سنوات من الخبرة العملية لكل مشروع، كبيراً كان أم صغيراً.',
    ab2_title: 'جودة خدمة عالية',
    ab2_text:  'نتبع قائمة تدقيق صارمة في كل زيارة حتى لا يُفوَّت شيء وتلتزم كل سطح بمعيارنا الدقيق.',
    ab3_title: 'أسعار معقولة',
    ab3_text:  'التنظيف المميز لا يجب أن يُثقل كاهلك. أسعارنا الثابتة والشفافة تعني عدم وجود رسوم مفاجئة — أبداً.',
    ab4_title: 'استجابة سريعة',
    ab4_text:  'احجز عبر الإنترنت واحصل على موعد مؤكد خلال ساعات. الخدمة في نفس اليوم متاحة للحالات العاجلة.',
    ab5_title: 'رضا العملاء',
    ab5_text:  'يمنحنا 98% من عملائنا تقييم 5 نجوم. إن لم تكن راضياً، سنعيد تنظيف المنطقة دون أي تكلفة إضافية.',
    ab6_title: 'منتجات صديقة للبيئة',
    ab6_text:  'كل منتج نستخدمه قابل للتحلل وآمن للأطفال والحيوانات الأليفة والكوكب — دون التضحية بقوة التنظيف.',
    ab7_title: 'معدات حديثة',
    ab7_text:  'تضمن أجهزة تنظيف البخار الصناعية ومكانس HEPA وأجهزة الضغط تنظيفاً عميقاً لا تستطيع الطرق التقليدية مجاراته.',
    ab8_title: 'مؤمن بالكامل',
    ab8_text:  'كل عضو في فريق نقاء يخضع للتحقق من الخلفية ومؤمن ومكفول، مما يمنحك راحة بال كاملة في منزلك أو مكتبك.',

    /* Services */
    srv_eyebrow: 'ما نقدمه',
    srv_title:   'خدماتنا',
    srv_desc:    'من ترتيب سريع إلى تنظيف عميق شامل، لدينا خدمة تناسب كل احتياج وكل ميزانية.',
    srv_badge_popular: 'الأكثر طلباً',
    srv_badge_best:    'أفضل قيمة',
    srv_cta:  'احجز الآن',
    from:     'يبدأ من',
    srv1_name: 'تنظيف المنازل',
    srv1_desc: 'تنظيف شامل لمنزلك بالكامل — المطابخ والحمامات وغرف النوم وغرف المعيشة — مع ترك كل ركن لامعاً.',
    srv2_name: 'تنظيف المكاتب',
    srv2_desc: 'حافظ على مكان عملك نظيفاً واحترافياً. مثالي للمكاتب الشركات والعيادات ومساحات البيع بالتجزئة بجميع أحجامها.',
    srv3_name: 'تنظيف السجاد',
    srv3_desc: 'يزيل الاستخراج بالماء الساخن الأوساخ العميقة والمسببات والبقع، مستعيداً سجادك إلى حالة جديدة.',
    srv4_name: 'مكافحة الحمام',
    srv4_desc: 'رادعات إنسانية وإزالة احترافية لحماية ممتلكاتك من أضرار الحمام والمخاطر الصحية.',
    srv5_name: 'التنظيف العميق',
    srv5_desc: 'خدمتنا الأكثر شمولاً — كل بوصة من ممتلكاتك يتم تنظيفها وتطهيرها وإزالة الروائح منها من الأعلى إلى الأسفل.',
    srv6_name: 'تنظيف النوافذ',
    srv6_desc: 'نوافذ خالية من الخطوط وبلورية الوضوح من الداخل والخارج، باستخدام أنظمة أعمدة المياه النقية الآمنة على أي ارتفاع.',

    /* Gallery */
    gal_eyebrow: 'قبل وبعد',
    gal_title:   'أعمالنا',
    gal_desc:    'الرؤية هي التصديق. هنا لمحة عن التحولات التي يحققها فريقنا في كل مهمة.',
    before: 'قبل',
    after:  'بعد',

    /* Stats */
    stat1: 'عميل سعيد',
    stat2: 'مهمة منجزة',
    stat3: 'سنوات خبرة',
    stat4: 'دعم متواصل',

    /* Testimonials */
    test_eyebrow: 'آراء العملاء',
    test_title:   'ماذا يقول عملاؤنا',
    test1_text:   '"حوّلت نقاء منزلنا تحويلاً كاملاً. كان الفريق محترفاً ودقيقاً ومحترماً لمساحتنا بشكل مذهل. لن أستخدم أي شركة أخرى."',
    test1_name:   'سارة م.',
    test1_role:   'صاحبة منزل',
    test2_text:   '"مكتبنا لم يبدُ بهذه الروعة من قبل. يصلون في الوقت المحدد ويعملون بهدوء حول موظفينا ويتركون كل شيء لامعاً. موصى به بشدة."',
    test2_name:   'جيمس ر.',
    test2_role:   'صاحب عمل',
    test3_text:   '"كانت حزمة التنظيف العميق تستحق كل قرش. بقع عنيدة اعتقدت أنها دائمة اختفت تماماً. نتائج مذهلة حقاً."',
    test3_name:   'ليلى ك.',
    test3_role:   'ساكنة شقة',
    test4_text:   '"سريع وودود وبأسعار معقولة جداً. حجزت تنظيف سجاد في وقت قصير وأدرجونا في صباح اليوم التالي مباشرة. خدمة رائعة."',
    test4_name:   'عمر س.',
    test4_role:   'مدير عقارات',

    /* Contact */
    con_eyebrow:          'تواصل معنا',
    con_title:            'اتصل بنا',
    con_desc:             'هل لديك سؤال أو أنت مستعد للحجز؟ املأ النموذج وسنرد عليك خلال ساعة عمل واحدة.',
    con_info_heading:     'خدمات نقاء للتنظيف',
    con_address:          '123 شارع النظافة، جناح 4، القاهرة، مصر',
    con_hours:            'الاثنين – السبت: 8:00 صباحاً – 8:00 مساءً',
    con_services_heading: 'خدماتنا',

    /* Form */
    form_name:                'الاسم الكامل',
    form_phone:               'رقم الهاتف',
    form_email:               'البريد الإلكتروني',
    form_location:            'الموقع / العنوان',
    form_service:             'نوع الخدمة',
    form_service_placeholder: 'اختر خدمة…',
    form_message:             'الرسالة',
    form_submit:              'إرسال الرسالة',
    form_submit_request:      'إرسال الطلب',
    form_success:             'تم إرسال رسالتك! سنتواصل معك قريباً.',
    form_success_request:     'تم تقديم طلبك! سنؤكد حجزك خلال الساعة.',

    /* Form errors */
    err_name:    'يرجى إدخال اسمك الكامل.',
    err_phone:   'يرجى إدخال رقم هاتف صحيح.',
    err_email:   'يرجى إدخال عنوان بريد إلكتروني صحيح.',
    err_location:'يرجى إدخال موقعك.',
    err_service: 'يرجى اختيار خدمة.',
    err_message: 'يرجى إدخال رسالة (10 أحرف على الأقل).',

    /* Footer */
    footer_tagline: 'حلول تنظيف احترافية للمنازل والشركات.',
    footer_quick:   'روابط سريعة',
    footer_copy:    'خدمات نقاء للتنظيف. جميع الحقوق محفوظة.',

    /* Request page */
    req_eyebrow: 'احجز خدمة',
    req_title:   'طلب خدمة',
    req_desc:    'املأ النموذج أدناه وسيؤكد فريقنا حجزك خلال الساعة.',
    req_card_title: 'نموذج طلب الخدمة',
    req_card_sub:   'جميع الحقول المشار إليها مطلوبة. سنرد عليك في أقرب وقت.',
  }
};

/* ============================================================
   STATE
   ============================================================ */
let currentLang  = localStorage.getItem('naqaa_lang')  || 'en';
let currentTheme = localStorage.getItem('naqaa_theme') || 'light';

/* ============================================================
   HELPERS
   ============================================================ */
/**
 * Query a single element, with optional scope.
 * Returns null if not found (no throw).
 */
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

/* ============================================================
   1. DARK MODE
   ============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = $('#themeIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  localStorage.setItem('naqaa_theme', theme);
  currentTheme = theme;
}

function initTheme() {
  applyTheme(currentTheme);

  const btn = $('#themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

/* ============================================================
   2. LANGUAGE SWITCH
   ============================================================ */
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('naqaa_lang', lang);

  /* Set HTML direction & lang attribute */
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';

  /* Update lang toggle label */
  const label = $('#langLabel');
  if (label) label.textContent = lang === 'ar' ? 'English' : 'عربي';

  /* Translate every element carrying data-i18n */
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = TRANSLATIONS[lang]?.[key];
    if (text === undefined) return;

    /* Special handling for hero title line-breaks */
    if (key === 'hero_title') {
      el.innerHTML = text.replace(/\n/g, '<br>');
    } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else if (el.tagName === 'OPTION') {
      el.textContent = text;
    } else {
      el.textContent = text;
    }
  });
}

function initLanguage() {
  applyLanguage(currentLang);

  const btn = $('#langToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'ar' : 'en');
  });
}

/* ============================================================
   3. STICKY NAVBAR + ACTIVE LINK
   ============================================================ */
function initNavbar() {
  const navbar  = $('#navbar');
  const navLinks = $$('.nav-link');
  if (!navbar) return;

  /* Scrolled class for shadow */
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveLink(navLinks);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* run once on load */
}

function highlightActiveLink(links) {
  /* Find which section is in view */
  const sections = $$('section[id]');
  let activeId   = '';

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 100) activeId = sec.id;
  });

  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active', href === `#${activeId}`);
  });
}

/* ============================================================
   4. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger = $('#hamburger');
  const navLinks  = $('#navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    /* Prevent body scroll when menu is open */
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close menu when a link is clicked */
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* Close menu on outside click */
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   5. SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
function initScrollReveal() {
  const items = $$('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); /* animate once */
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(el => observer.observe(el));
}

/* ============================================================
   6. ANIMATED COUNTERS (IntersectionObserver)
   ============================================================ */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800; /* ms */
  const startTime = performance.now();

  /* Easing: ease-out cubic */
  const ease = t => 1 - Math.pow(1 - t, 3);

  const tick = now => {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value    = Math.round(ease(progress) * target);
    el.textContent = value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = $$('.stat-item__number');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/* ============================================================
   7. TESTIMONIALS SLIDER
   ============================================================ */
function initSlider() {
  const track    = $('#testimonialsTrack');
  const prevBtn  = $('#sliderPrev');
  const nextBtn  = $('#sliderNext');
  const dotsWrap = $('#sliderDots');
  if (!track) return;

  const cards        = $$('.testimonial-card', track);
  const totalCards   = cards.length;
  let currentIndex   = 0;
  let autoPlayTimer  = null;
  let touchStartX    = 0;

  /* On mobile show 1 card, on desktop show 2 */
  const visibleCount = () => window.innerWidth <= 768 ? 1 : 2;
  const maxIndex     = () => Math.max(0, totalCards - visibleCount());

  /* Build dot buttons */
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    $$('.slider-dot', dotsWrap).forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex()));
    /* Each card takes (100% / visibleCount) of the track */
    const cardWidth = track.parentElement.offsetWidth;
    const gap       = 24; /* --space-6 */
    const perCard   = (cardWidth + gap) / visibleCount();
    track.style.transform = `translateX(${currentIndex * -perCard}px)`;
    if (document.documentElement.dir === 'rtl') {
      track.style.transform = `translateX(${currentIndex * perCard}px)`;
    }
    updateDots();
  }

  function next() { goTo(currentIndex >= maxIndex() ? 0 : currentIndex + 1); }
  function prev() { goTo(currentIndex <= 0 ? maxIndex() : currentIndex - 1); }

  /* Auto-play */
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(next, 5000);
  }
  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  /* Touch / swipe */
  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
    stopAutoPlay();
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    startAutoPlay();
  }, { passive: true });

  /* Arrow buttons */
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); stopAutoPlay(); startAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); stopAutoPlay(); startAutoPlay(); });

  /* Pause on hover */
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);

  /* Recalculate on resize */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      goTo(Math.min(currentIndex, maxIndex()));
    }, 200);
  });

  /* Init */
  buildDots();
  goTo(0);
  startAutoPlay();
}

/* ============================================================
   8. LIGHTBOX GALLERY
   ============================================================ */
function initLightbox() {
  const lightbox     = $('#lightbox');
  const lightboxImg  = $('#lightboxImg');
  const closeBtn     = $('#lightboxClose');
  if (!lightbox || !lightboxImg) return;

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  /* Zoom buttons on gallery items */
  $$('.gallery-item__zoom').forEach(btn => {
    btn.addEventListener('click', () => {
      openLightbox(btn.getAttribute('data-img'));
    });
  });

  /* Close button */
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  /* Click outside image */
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  /* Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}

/* ============================================================
   9. FORM VALIDATION (shared logic)
   ============================================================ */

/**
 * Validate a single field.
 * @param {HTMLElement} field  – the input / select / textarea
 * @param {string}      errKey – translation key for the error message
 * @param {Function}    test   – function(value) => boolean (true = valid)
 * @param {HTMLElement} errEl  – the <span> where the error is displayed
 * @returns {boolean}
 */
function validateField(field, errKey, test, errEl) {
  const value = field.value.trim();
  const valid = test(value);
  field.classList.toggle('error', !valid);
  if (errEl) errEl.textContent = valid ? '' : (TRANSLATIONS[currentLang]?.[errKey] || '');
  return valid;
}

/** Rules */
const RULES = {
  name:     v => v.length >= 2,
  phone:    v => /^[\d\s\+\-\(\)]{7,20}$/.test(v),
  email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  location: v => v.length >= 3,
  service:  v => v !== '',
  message:  v => v.length >= 10,
};

/* ---- Contact Form ---- */
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  const fields = {
    name:    { el: $('#con-name'),    errEl: $('#con-name-err'),    rule: 'name'    },
    phone:   { el: $('#con-phone'),   errEl: $('#con-phone-err'),   rule: 'phone'   },
    email:   { el: $('#con-email'),   errEl: $('#con-email-err'),   rule: 'email'   },
    service: { el: $('#con-service'), errEl: $('#con-service-err'), rule: 'service' },
    message: { el: $('#con-message'), errEl: $('#con-message-err'), rule: 'message' },
  };
  const successEl = $('#con-success');

  /* Live validation on blur */
  Object.values(fields).forEach(({ el, errEl, rule }) => {
    if (!el) return;
    el.addEventListener('blur', () =>
      validateField(el, `err_${rule}`, RULES[rule], errEl)
    );
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        validateField(el, `err_${rule}`, RULES[rule], errEl);
      }
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let allValid = true;
    Object.values(fields).forEach(({ el, errEl, rule }) => {
      if (el && !validateField(el, `err_${rule}`, RULES[rule], errEl)) {
        allValid = false;
      }
    });
    if (!allValid) return;

    /* Simulate successful submission */
    if (successEl) {
      successEl.hidden = false;
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    form.reset();

    /* Hide success after 6 seconds */
    setTimeout(() => { if (successEl) successEl.hidden = true; }, 6000);
  });
}

/* ---- Request Service Form ---- */
function initRequestForm() {
  const form = $('#requestForm');
  if (!form) return;

  const fields = {
    name:     { el: $('#req-name'),     errEl: $('#req-name-err'),     rule: 'name'     },
    phone:    { el: $('#req-phone'),    errEl: $('#req-phone-err'),    rule: 'phone'    },
    email:    { el: $('#req-email'),    errEl: $('#req-email-err'),    rule: 'email'    },
    location: { el: $('#req-location'), errEl: $('#req-location-err'), rule: 'location' },
    service:  { el: $('#req-service'),  errEl: $('#req-service-err'),  rule: 'service'  },
    message:  { el: $('#req-message'),  errEl: $('#req-message-err'),  rule: 'message'  },
  };
  const successEl = $('#req-success');

  /* Live validation */
  Object.values(fields).forEach(({ el, errEl, rule }) => {
    if (!el) return;
    el.addEventListener('blur', () =>
      validateField(el, `err_${rule}`, RULES[rule], errEl)
    );
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        validateField(el, `err_${rule}`, RULES[rule], errEl);
      }
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let allValid = true;
    Object.values(fields).forEach(({ el, errEl, rule }) => {
      if (el && !validateField(el, `err_${rule}`, RULES[rule], errEl)) {
        allValid = false;
      }
    });
    if (!allValid) return;

    if (successEl) {
      successEl.hidden = false;
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    form.reset();

    setTimeout(() => { if (successEl) successEl.hidden = true; }, 6000);
  });
}

/* ============================================================
   10. BACK-TO-TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.hidden = window.scrollY < 400;
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   11. FOOTER YEAR
   ============================================================ */
function initFooterYear() {
  const el = $('#footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   12. REQUEST SERVICE PAGE – pre-select from URL param
   ============================================================ */
function initRequestPagePreselect() {
  const serviceSelect = $('#req-service');
  if (!serviceSelect) return;

  const params  = new URLSearchParams(window.location.search);
  const service = params.get('service');
  if (!service) return;

  /* Find matching option (case-insensitive) */
  const options = $$('option', serviceSelect);
  options.forEach(opt => {
    if (opt.value.toLowerCase() === service.toLowerCase()) {
      opt.selected = true;
    }
  });
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   (fallback for browsers that don't support CSS scroll-behavior)
   ============================================================ */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   BOOT – run everything when DOM is ready
   ============================================================ */
function boot() {
  initTheme();
  initLanguage();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initSlider();
  initLightbox();
  initContactForm();
  initRequestForm();
  initBackToTop();
  initFooterYear();
  initRequestPagePreselect();
  initSmoothScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot(); /* DOM already parsed */
}
