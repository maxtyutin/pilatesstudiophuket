import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import { 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Calendar, 
  Clock, 
  Users, 
  HeartHandshake, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  X, 
  ArrowRight, 
  Activity,
  Coffee,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Custom Minimal Instagram Icon SVG
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Base asset path resolver for GitHub Pages / Vite
const getAssetUrl = (path) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanBase + cleanPath;
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [openFaq, setOpenFaq] = useState(null);
  
  // Booking Form State
  const [bookingData, setBookingData] = useState({
    goal: 'Group Reformer (First Timer 490 THB)',
    date: '2026-08-01',
    time: '08:00 AM',
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = translations[lang] || translations.en;

  // Intersection Observer for Smooth Scroll Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleOpenBooking = (goal = null) => {
    if (goal) setBookingData(prev => ({ ...prev, goal }));
    setIsSubmitted(false);
    setIsSubmitting(false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send form submission directly to maxtyutin@gmail.com via FormSubmit AJAX service
      await fetch("https://formsubmit.co/ajax/maxtyutin@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Maison 14 Pilates Booking: ${bookingData.name}`,
          _template: "table",
          "Client Name": bookingData.name,
          "Phone / WhatsApp": bookingData.phone,
          "Class / Pass": bookingData.goal,
          "Preferred Date": bookingData.date,
          "Preferred Time": bookingData.time,
          "Submitted At": new Date().toLocaleString()
        })
      });
    } catch (err) {
      console.warn("Form submission email fallback triggered", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Gallery tabs images using relative URL resolver
  const galleryImages = {
    tab1: getAssetUrl("images/hero.jpg"),
    tab2: getAssetUrl("images/reformer_detail.jpg"),
    tab3: getAssetUrl("images/instructor_jeab.jpg"),
    tab4: getAssetUrl("images/lounge_vibes.jpg")
  };

  const groupScheduleSlots = [
    { time: "08:00 AM", title: t.programs.prog1Title, seats: 3 },
    { time: "09:00 AM", title: t.programs.prog1Title, seats: 2 },
    { time: "10:00 AM", title: t.programs.prog1Title, seats: 4 },
    { time: "04:00 PM", title: t.programs.prog1Title, seats: 2 },
    { time: "06:00 PM", title: t.programs.prog1Title, seats: 1 },
    { time: "07:00 PM", title: t.programs.prog1Title, seats: 3 }
  ];

  const privateScheduleSlots = [
    { time: "01:00 PM", title: t.programs.prog2Title, seats: 1 },
    { time: "02:00 PM", title: t.programs.prog2Title, seats: 1 },
    { time: "03:00 PM", title: t.programs.prog2Title, seats: 1 }
  ];

  return (
    <div className="app-root">
      {/* Top Announcement Bar */}
      <div className="top-announcement">
        {t.topBar}
      </div>

      {/* Sleek Minimalist Navigation Header */}
      <header className="header">
        <div className="container nav-row">
          <a href="#" className="logo-brand">
            <span className="logo-title">MAISON 14</span>
            <span className="logo-subtitle">PILATES & YOGA • PHUKET</span>
          </a>

          {/* Navigation Links */}
          <ul className="nav-menu">
            <li><a href="#atmosphere" className="nav-link">{t.nav.studio}</a></li>
            <li><a href="#classes" className="nav-link">{t.nav.classes}</a></li>
            <li><a href="#instructors" className="nav-link">{t.nav.instructors}</a></li>
            <li><a href="#pricing" className="nav-link">{t.nav.pricing}</a></li>
            <li><a href="#reviews" className="nav-link">{t.nav.reviews}</a></li>
            <li><a href="#contact" className="nav-link">{t.nav.contact}</a></li>
          </ul>

          <div className="header-actions">
            {/* Ultra Compact Language Switcher Pill */}
            <div className="lang-switcher-header">
              <button 
                className={`lang-btn-header ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button 
                className={`lang-btn-header ${lang === 'ru' ? 'active' : ''}`}
                onClick={() => setLang('ru')}
              >
                RU
              </button>
              <button 
                className={`lang-btn-header ${lang === 'zh' ? 'active' : ''}`}
                onClick={() => setLang('zh')}
              >
                ZH
              </button>
              <button 
                className={`lang-btn-header ${lang === 'th' ? 'active' : ''}`}
                onClick={() => setLang('th')}
              >
                TH
              </button>
            </div>

            <a href="tel:+66945932245" className="phone-link">
              <Phone size={13} />
              <span>094-593-2245</span>
            </a>
            <button className="btn-primary" onClick={() => handleOpenBooking()}>
              {t.nav.bookBtn}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="ambient-glow" style={{ top: '-100px', right: '-50px' }}></div>
        <div className="container hero-grid">
          <div className="hero-text-col reveal">
            <div className="hero-badge">
              <Sparkles size={14} className="text-accent-warm" />
              <span>{t.hero.badge}</span>
            </div>
            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-desc">{t.hero.subtitle}</p>
            
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => handleOpenBooking()}>
                {t.hero.ctaTrial}
                <ArrowRight size={16} />
              </button>
              <a href="#atmosphere" className="btn-secondary">
                {t.hero.ctaTour}
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-val">{t.hero.stat1Val}</span>
                <span className="stat-lbl">{t.hero.stat1Lbl}</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">{t.hero.stat2Val}</span>
                <span className="stat-lbl">{t.hero.stat2Lbl}</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">{t.hero.stat3Val}</span>
                <span className="stat-lbl">{t.hero.stat3Lbl}</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">{t.hero.stat4Val}</span>
                <span className="stat-lbl">{t.hero.stat4Lbl}</span>
              </div>
            </div>
          </div>

          <div className="hero-media reveal delay-1">
            <img 
              src={getAssetUrl("images/hero.jpg")} 
              alt="Maison 14 Pilates Studio Interior" 
              className="hero-img"
            />
            <div className="hero-floating-card">
              <div className="contact-icon">
                <Coffee size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px' }}>Organic Tea & Relaxation Lounge</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Included after every session</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="benefits" className="section">
        <div className="container">
          <div className="reveal">
            <span className="section-tag">{t.whyUs.tag}</span>
            <h2 className="section-title">{t.whyUs.title}</h2>
            <p className="section-subtitle">{t.whyUs.subtitle}</p>
          </div>

          <div className="why-grid">
            <div className="why-card reveal">
              <div className="why-icon"><Activity size={26} /></div>
              <h3>{t.whyUs.item1Title}</h3>
              <p>{t.whyUs.item1Desc}</p>
            </div>
            <div className="why-card reveal delay-1">
              <div className="why-icon"><HeartHandshake size={26} /></div>
              <h3>{t.whyUs.item2Title}</h3>
              <p>{t.whyUs.item2Desc}</p>
            </div>
            <div className="why-card reveal delay-2">
              <div className="why-icon"><Users size={26} /></div>
              <h3>{t.whyUs.item3Title}</h3>
              <p>{t.whyUs.item3Desc}</p>
            </div>
            <div className="why-card reveal delay-3">
              <div className="why-icon"><Sparkles size={26} /></div>
              <h3>{t.whyUs.item4Title}</h3>
              <p>{t.whyUs.item4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Atmosphere Section */}
      <section id="atmosphere" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="ambient-glow" style={{ bottom: '-50px', left: '-50px' }}></div>
        <div className="container">
          <div className="reveal">
            <span className="section-tag">{t.gallery.tag}</span>
            <h2 className="section-title">{t.gallery.title}</h2>
            <p className="section-subtitle">{t.gallery.subtitle}</p>
          </div>

          <div className="gallery-tabs reveal delay-1">
            <button 
              className={`gallery-tab-btn ${activeTab === 'tab1' ? 'active' : ''}`}
              onClick={() => setActiveTab('tab1')}
            >
              {t.gallery.tab1}
            </button>
            <button 
              className={`gallery-tab-btn ${activeTab === 'tab2' ? 'active' : ''}`}
              onClick={() => setActiveTab('tab2')}
            >
              {t.gallery.tab2}
            </button>
            <button 
              className={`gallery-tab-btn ${activeTab === 'tab3' ? 'active' : ''}`}
              onClick={() => setActiveTab('tab3')}
            >
              {t.gallery.tab3}
            </button>
            <button 
              className={`gallery-tab-btn ${activeTab === 'tab4' ? 'active' : ''}`}
              onClick={() => setActiveTab('tab4')}
            >
              {t.gallery.tab4}
            </button>
          </div>

          <div className="gallery-display reveal delay-2">
            <img 
              src={galleryImages[activeTab]} 
              alt="Maison 14 Studio Atmosphere" 
              className="gallery-display-img"
            />
          </div>
        </div>
      </section>

      {/* Classes & Schedule Section */}
      <section id="classes" className="section">
        <div className="container">
          <div className="reveal">
            <span className="section-tag">{t.programs.tag}</span>
            <h2 className="section-title">{t.programs.title}</h2>
            <p className="section-subtitle">{t.programs.subtitle}</p>
          </div>

          <div className="programs-grid" style={{ marginBottom: '60px' }}>
            <div className="program-card reveal">
              <div>
                <div className="program-meta">
                  <span>{t.programs.duration}: 50 MIN</span>
                  <span>•</span>
                  <span>LIMITED TO 6 CLIENTS</span>
                </div>
                <h3>{t.programs.prog1Title}</h3>
                <p>{t.programs.prog1Desc}</p>
              </div>
              <button className="btn-primary" onClick={() => handleOpenBooking('Group Reformer Pilates')}>
                {t.programs.bookAction}
              </button>
            </div>

            <div className="program-card reveal delay-1">
              <div>
                <div className="program-meta">
                  <span>{t.programs.duration}: 1 HOUR</span>
                  <span>•</span>
                  <span>REFORMER + CADILLAC</span>
                </div>
                <h3>{t.programs.prog2Title}</h3>
                <p>{t.programs.prog2Desc}</p>
              </div>
              <button className="btn-primary" onClick={() => handleOpenBooking('Private 1:1 Pilates')}>
                {t.programs.bookAction}
              </button>
            </div>

            <div className="program-card reveal delay-2">
              <div>
                <div className="program-meta">
                  <span>{t.programs.duration}: 50 MIN</span>
                  <span>•</span>
                  <span>POSTURE & SPINE</span>
                </div>
                <h3>{t.programs.prog3Title}</h3>
                <p>{t.programs.prog3Desc}</p>
              </div>
              <button className="btn-primary" onClick={() => handleOpenBooking('Posture & Back Health')}>
                {t.programs.bookAction}
              </button>
            </div>

            <div className="program-card reveal delay-3">
              <div>
                <div className="program-meta">
                  <span>{t.programs.duration}: 50 MIN</span>
                  <span>•</span>
                  <span>LOW CORTISOL</span>
                </div>
                <h3>{t.programs.prog4Title}</h3>
                <p>{t.programs.prog4Desc}</p>
              </div>
              <button className="btn-primary" onClick={() => handleOpenBooking('Low Cortisol & Lymphatic Flow')}>
                {t.programs.bookAction}
              </button>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="schedule-container reveal">
            <span className="section-tag">{t.schedule.tag}</span>
            <h3 style={{ fontSize: '32px', marginBottom: '8px' }}>{t.schedule.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>{t.schedule.subtitle}</p>

            <div className="schedule-columns">
              {/* Group Reformer Schedule */}
              <div>
                <div className="schedule-block-header">
                  <span>{t.schedule.groupTitle}</span>
                  <span style={{ fontSize: '13px', color: 'var(--accent-warm)' }}>Trial 490 THB</span>
                </div>
                <div className="slots-grid">
                  {groupScheduleSlots.map((slot, idx) => (
                    <div key={idx} className="slot-card">
                      <div>
                        <div className="slot-time">{slot.time}</div>
                        <div className="slot-title">{slot.title}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="slot-seats">{slot.seats} {t.schedule.seatsLeft}</div>
                        <button 
                          className="btn-primary" 
                          style={{ padding: '7px 16px', fontSize: '12px', marginTop: '6px' }}
                          onClick={() => handleOpenBooking(`Group Reformer (${slot.time})`)}
                        >
                          {t.schedule.reserveBtn}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Private 1:1 Schedule */}
              <div>
                <div className="schedule-block-header">
                  <span>{t.schedule.privateTitle}</span>
                  <span style={{ fontSize: '13px', color: 'var(--accent-warm)' }}>Trial 1,590 THB</span>
                </div>
                <div className="slots-grid">
                  {privateScheduleSlots.map((slot, idx) => (
                    <div key={idx} className="slot-card">
                      <div>
                        <div className="slot-time">{slot.time}</div>
                        <div className="slot-title">{slot.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Reformer + Cadillac</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="slot-seats" style={{ color: 'var(--accent-warm)' }}>1:1 VIP Session</div>
                        <button 
                          className="btn-primary" 
                          style={{ padding: '7px 16px', fontSize: '12px', marginTop: '6px' }}
                          onClick={() => handleOpenBooking(`Private 1:1 (${slot.time})`)}
                        >
                          {t.schedule.reserveBtn}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Section (Jeab & Anna) */}
      <section id="instructors" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="reveal">
            <span className="section-tag">{t.instructors.tag}</span>
            <h2 className="section-title">{t.instructors.title}</h2>
            <p className="section-subtitle">{t.instructors.subtitle}</p>
          </div>

          <div className="instructors-grid">
            <div className="instructor-card reveal">
              <img src={getAssetUrl("images/instructor_jeab.jpg")} alt={t.instructors.inst1Name} className="instructor-img" />
              <div className="instructor-body">
                <h3>{t.instructors.inst1Name}</h3>
                <div className="instructor-role">{t.instructors.inst1Role}</div>
                <p className="instructor-bio">{t.instructors.inst1Bio}</p>
              </div>
            </div>

            <div className="instructor-card reveal delay-1">
              <img src={getAssetUrl("images/instructor_anna.jpg")} alt={t.instructors.inst2Name} className="instructor-img" />
              <div className="instructor-body">
                <h3>{t.instructors.inst2Name}</h3>
                <div className="instructor-role">{t.instructors.inst2Role}</div>
                <p className="instructor-bio">{t.instructors.inst2Bio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section">
        <div className="container">
          <div className="reveal">
            <span className="section-tag">{t.pricing.tag}</span>
            <h2 className="section-title">{t.pricing.title}</h2>
            <p className="section-subtitle">{t.pricing.subtitle}</p>
          </div>

          <div className="pricing-grid">
            <div className="price-card reveal">
              <span className="popular-tag">FIRST TIMER TRIAL</span>
              <div>
                <h3>{t.pricing.plan1Title}</h3>
                <div className="price-val">
                  {t.pricing.plan1Price}
                  <span className="price-old">{t.pricing.plan1Old}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  {t.pricing.plan1Sub}
                </p>
              </div>
              <button className="btn-primary" onClick={() => handleOpenBooking('First Timer Group Reformer (490 THB)')}>
                {t.pricing.btnSelect}
              </button>
            </div>

            <div className="price-card reveal delay-1">
              <span className="popular-tag">FIRST TIMER PRIVATE</span>
              <div>
                <h3>{t.pricing.plan2Title}</h3>
                <div className="price-val">
                  {t.pricing.plan2Price}
                  <span className="price-old">{t.pricing.plan2Old}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  {t.pricing.plan2Sub}
                </p>
              </div>
              <button className="btn-primary" onClick={() => handleOpenBooking('First Timer Private 1:1 (1,590 THB)')}>
                {t.pricing.btnSelect}
              </button>
            </div>

            <div className="price-card reveal delay-2">
              <div>
                <h3>{t.pricing.plan3Title}</h3>
                <div className="price-val">{t.pricing.plan3Price}</div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  {t.pricing.plan3Sub}
                </p>
              </div>
              <button className="btn-secondary" onClick={() => handleOpenBooking('10-Class Group Pass (6,000 THB)')}>
                {t.pricing.btnSelect}
              </button>
            </div>

            <div className="price-card popular reveal delay-3">
              <span className="popular-tag">{t.pricing.popularBadge}</span>
              <div>
                <h3>{t.pricing.plan4Title}</h3>
                <div className="price-val">{t.pricing.plan4Price}</div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  {t.pricing.plan4Sub}
                </p>
              </div>
              <button className="btn-primary" onClick={() => handleOpenBooking('20-Class Group Pass (10,000 THB)')}>
                {t.pricing.btnSelect}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="reveal">
            <span className="section-tag">{t.reviews.tag}</span>
            <h2 className="section-title">{t.reviews.title}</h2>
          </div>

          <div className="reviews-grid" style={{ marginTop: '40px' }}>
            <div className="review-card reveal">
              <div className="stars">★★★★★</div>
              <p className="review-text">"{t.reviews.rev1}"</p>
              <div className="review-author">{t.reviews.rev1Author}</div>
            </div>

            <div className="review-card reveal delay-1">
              <div className="stars">★★★★★</div>
              <p className="review-text">"{t.reviews.rev2}"</p>
              <div className="review-author">{t.reviews.rev2Author}</div>
            </div>

            <div className="review-card reveal delay-2">
              <div className="stars">★★★★★</div>
              <p className="review-text">"{t.reviews.rev3}"</p>
              <div className="review-author">{t.reviews.rev3Author}</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section">
        <div className="container">
          <div className="reveal">
            <span className="section-tag" style={{ textAlign: 'center', display: 'block' }}>{t.faq.tag}</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>{t.faq.title}</h2>
          </div>

          <div className="faq-list reveal delay-1" style={{ marginTop: '40px' }}>
            {[
              { q: t.faq.q1, a: t.faq.a1 },
              { q: t.faq.q2, a: t.faq.a2 },
              { q: t.faq.q3, a: t.faq.a3 },
              { q: t.faq.q4, a: t.faq.a4 }
            ].map((item, idx) => (
              <div key={idx} className="faq-item">
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <span>{item.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === idx && (
                  <div className="faq-answer">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Google Maps Section */}
      <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="reveal">
            <span className="section-tag">{t.contact.tag}</span>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-subtitle">{t.contact.subtitle}</p>
          </div>

          <div className="contact-grid reveal delay-1">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon"><MapPin size={22} /></div>
                <div>
                  <strong>{t.contact.addressTitle}</strong>
                  <p style={{ color: 'var(--text-muted)' }}>{t.contact.addressText}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Phone size={22} /></div>
                <div>
                  <strong>{t.contact.phoneTitle}</strong>
                  <p><a href="tel:+66945932245" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>+66 94 593 2245</a></p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><InstagramIcon size={22} /></div>
                <div>
                  <strong>{t.contact.igTitle}</strong>
                  <p><a href="https://instagram.com/maison14.pilatesphuket" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-warm)', fontWeight: '600' }}>@maison14.pilatesphuket</a></p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><MessageCircle size={22} /></div>
                <div>
                  <strong>{t.contact.waTitle}</strong>
                  <p><a href="https://wa.me/66945932245" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-warm)', fontWeight: '600' }}>{t.contact.waVal}</a></p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Clock size={22} /></div>
                <div>
                  <strong>{t.contact.hoursTitle}</strong>
                  <p style={{ color: 'var(--text-muted)' }}>{t.contact.hoursText}</p>
                </div>
              </div>
            </div>

            <div className="map-card">
              <MapPin size={42} style={{ color: 'var(--accent-warm)', marginBottom: '12px' }} />
              <strong style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Maison 14 Pilates & Yoga</strong>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                274/1 Yaowarad Rd, Tambon Ratsada, Mueang Phuket 83000, Thailand
              </p>
              <a 
                href="https://maps.app.goo.gl/iMkMAZ2x63JubA7V7?g_st=ic" 
                target="_blank" 
                rel="noreferrer"
                className="btn-primary"
              >
                Open Google Maps Location
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <>
                <h3 style={{ fontSize: '28px', marginBottom: '8px' }}>{t.modal.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                  First Timer Group Trial: <strong>490 THB</strong> | Private Trial: <strong>1,590 THB</strong>
                </p>

                <form className="modal-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label">{t.modal.step1Title}</label>
                    <select 
                      className="form-select"
                      value={bookingData.goal}
                      onChange={e => setBookingData({ ...bookingData, goal: e.target.value })}
                    >
                      <option value={t.modal.goal1}>{t.modal.goal1}</option>
                      <option value={t.modal.goal2}>{t.modal.goal2}</option>
                      <option value={t.modal.goal3}>{t.modal.goal3}</option>
                      <option value={t.modal.goal4}>{t.modal.goal4}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t.modal.step2Title}</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <input 
                        type="date" 
                        className="form-input"
                        value={bookingData.date}
                        onChange={e => setBookingData({ ...bookingData, date: e.target.value })}
                        required
                      />
                      <select 
                        className="form-select"
                        value={bookingData.time}
                        onChange={e => setBookingData({ ...bookingData, time: e.target.value })}
                      >
                        <option value="08:00 AM">08:00 AM (Group)</option>
                        <option value="09:00 AM">09:00 AM (Group)</option>
                        <option value="10:00 AM">10:00 AM (Group)</option>
                        <option value="01:00 PM">01:00 PM (Private 1:1)</option>
                        <option value="02:00 PM">02:00 PM (Private 1:1)</option>
                        <option value="03:00 PM">03:00 PM (Private 1:1)</option>
                        <option value="04:00 PM">04:00 PM (Group)</option>
                        <option value="06:00 PM">06:00 PM (Group)</option>
                        <option value="07:00 PM">07:00 PM (Group)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t.modal.step3Title}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder={t.modal.namePlaceholder}
                      value={bookingData.name}
                      onChange={e => setBookingData({ ...bookingData, name: e.target.value })}
                      required
                    />
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder={t.modal.phonePlaceholder}
                      value={bookingData.phone}
                      onChange={e => setBookingData({ ...bookingData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    style={{ marginTop: '12px', width: '100%' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending reservation...
                      </>
                    ) : (
                      t.modal.submitBtn
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={56} style={{ color: 'var(--accent-green)', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '28px', marginBottom: '12px' }}>{t.modal.successTitle}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  {t.modal.successDesc}
                </p>
                <button className="btn-primary" onClick={() => setIsModalOpen(false)}>
                  {t.modal.closeBtn}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <div className="logo-title" style={{ color: '#FFFFFF' }}>MAISON 14</div>
              <div className="logo-subtitle">PILATES & YOGA • PHUKET</div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '8px' }}>
                {t.footer.tagline}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'right' }}>
              <a href="tel:+66945932245" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: '600' }}>
                +66 94 593 2245
              </a>
              <a href="https://instagram.com/maison14.pilatesphuket" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-warm)', textDecoration: 'none', fontSize: '14px' }}>
                @maison14.pilatesphuket
              </a>
            </div>
          </div>
          <div className="footer-rights">
            {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
