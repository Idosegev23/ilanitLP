import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Star,
  BookOpen, 
  Calculator, 
  Pencil,
  GraduationCap, 
  Dice6, 
  Puzzle,
  Lightbulb, 
  Heart, 
  Smile,
  MessageCircle,
  Phone,
  X,
  User,
  Baby,
  Send,
  ArrowLeft,
  Briefcase,
  BookHeart,
  Sparkles
} from 'lucide-react';
import { content, emojiToIcon, highlights } from './content';

import 'swiper/css';
import 'swiper/css/pagination';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// קומפוננטת אייקון דינמית
const DynamicIcon = ({ emojiOrIcon, className = "w-6 h-6" }) => {
  const iconComponents = {
    Star, BookOpen, Calculator, Pencil, GraduationCap, 
    Dice6, Puzzle, Lightbulb, Heart, Smile
  };
  
  if (typeof emojiOrIcon === 'string' && emojiToIcon[emojiOrIcon]) {
    const IconComponent = iconComponents[emojiToIcon[emojiOrIcon]];
    return IconComponent ? <IconComponent className={className} /> : null;
  }
  
  return null;
};

// קומפוננטת טקסט עם הדגשות
const HighlightedText = ({ children }) => {
  if (typeof children !== 'string') return children;
  
  let processedText = children;
  highlights.forEach(highlight => {
    const regex = new RegExp(`(${highlight})`, 'gi');
    processedText = processedText.replace(regex, `<mark class="highlight">$1</mark>`);
  });
  
  return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
};

// קומפוננטת אנימציה עדינה
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.24, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const LandingPageProfessional = () => {
  const [heroAnimation, setHeroAnimation] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    childName: '',
    childAge: '',
    childGrade: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const decorRef = useRef(null);

  useEffect(() => {
    // טעינת אנימציית Lottie באופן lazy
    const loadAnimation = async () => {
      try {
        const response = await fetch('/lottie/hero.json');
        if (response.ok) {
          const data = await response.json();
          setHeroAnimation(data);
        }
      } catch (error) {
        console.log('Animation not found, continuing without it');
      }
    };
    
    // טעינה עם delay קצר
    setTimeout(loadAnimation, 500);

    // אלמנטים דקורטיביים עם GSAP (אופציונלי)
    if (decorRef.current) {
      const decorElements = decorRef.current.querySelectorAll('.decor-dot');
      
      gsap.fromTo(decorElements, 
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: decorRef.current,
            start: "top 80%",
            once: true
          }
        }
      );
    }
  }, []);

  const validatePhone = (phone) => {
    return /^05\d{8}$/.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePhone(formData.parentPhone)) {
      toast.error('מספר הטלפון חייב להתחיל ב-05 ולכלול 10 ספרות');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.eu2.make.com/fyjhdrxdlc60se4nry8ux0i3xy6qb84b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('הפרטים נשלחו בהצלחה! אילנית תיצור איתכם קשר בקרוב.');
        setFormData({
          parentName: '', parentPhone: '', childName: '', childAge: '', childGrade: ''
        });
        setTimeout(() => setShowSignupModal(false), 2000);
      } else {
        toast.error('אירעה שגיאה בשליחת הפרטים. אנא נסו שוב.');
      }
    } catch (error) {
      toast.error('אירעה שגיאה בשליחת הפרטים. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream font-heebo text-ink">
      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#FAF7F2',
            fontFamily: 'Heebo',
            direction: 'rtl'
          }
        }}
      />

      {/* Header עם לוגו */}
      <header className="relative z-50 bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6">
          <div className="flex justify-center">
            <img 
              src="/images/logo.png" 
              alt="לב ללמידה - לוגו אילנית" 
              className="h-16 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-5 py-16 md:px-10 md:py-24">
        {/* אלמנטים דקורטיביים */}
        <div ref={decorRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }, (_, i) => (
            <div 
              key={i}
              className="decor-dot absolute w-2 h-2 bg-accent rounded-full opacity-0"
              style={{
                top: `${10 + (i * 7)}%`,
                right: `${5 + (i % 3) * 15}%`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* תוכן טקסטואלי */}
            <div className="text-center lg:text-right">
              <FadeInSection>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-ink-heading leading-tight mb-8">
                  <HighlightedText>{content.hero.title.replace('🌟', '')}</HighlightedText>
                  <DynamicIcon emojiOrIcon="🌟" className="inline-block w-10 h-10 md:w-12 md:h-12 mr-3 text-accent" />
                </h1>
              </FadeInSection>

              <FadeInSection delay={0.1}>
                <div className="bg-white rounded-card p-6 md:p-8 shadow-soft mb-8">
                  <p className="text-lg md:text-xl leading-relaxed text-ink whitespace-pre-line">
                    <HighlightedText>{content.hero.intro}</HighlightedText>
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                  <button 
                    onClick={() => setShowSignupModal(true)}
                    className="bg-gradient-to-l from-accent to-accent-dark text-white px-8 py-4 rounded-card font-semibold text-lg shadow-soft hover:shadow-card focus:shadow-focus transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    {content.hero.cta.primary}
                  </button>
                  
                  <a 
                    href="https://wa.me/972545886779"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border-2 border-ink-light text-ink px-8 py-4 rounded-card font-semibold text-lg shadow-soft hover:shadow-card focus:shadow-focus transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {content.hero.cta.secondary}
                  </a>
                </div>
              </FadeInSection>
            </div>

            {/* אזור אנימציה */}
            <div className="flex justify-center">
              <FadeInSection delay={0.3}>
                <div className="relative">
                  {/* מיקרו-אייקונים דקורטיביים */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-soft">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-soft border-2 border-accent">
                    <BookHeart className="w-6 h-6 text-accent" />
                  </div>

                  <div className="w-80 h-80 md:w-96 md:h-96 bg-white rounded-section p-8 shadow-card flex items-center justify-center">
                    {heroAnimation ? (
                      <Lottie 
                        animationData={heroAnimation} 
                        loop
                        autoplay
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="text-center text-ink-light">
                        <GraduationCap className="w-24 h-24 mx-auto mb-4" />
                        <p>טוען אנימציה...</p>
                      </div>
                    )}
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-5 py-16 md:px-10 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* תמונת אילנית */}
            <FadeInSection className="order-2 lg:order-1">
              <div className="relative">
                {/* ציר דקורטיבי */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent-dark to-accent opacity-20 rounded-full"></div>
                <div className="absolute right-2 top-8 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-soft">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <div className="absolute right-2 top-1/2 w-8 h-8 bg-white border-2 border-accent rounded-full flex items-center justify-center shadow-soft">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <div className="absolute right-2 bottom-8 w-8 h-8 bg-accent-dark rounded-full flex items-center justify-center shadow-soft">
                  <Heart className="w-4 h-4 text-white" />
                </div>

                <div className="mr-12">
                  <img 
                    src="/images/ilanit.png" 
                    alt="אילנית - מאמנת לימודית מוסמכת" 
                    className="w-full h-auto rounded-section shadow-card"
                  />
                </div>
              </div>
            </FadeInSection>

            {/* תוכן על אילנית */}
            <FadeInSection delay={0.1} className="order-1 lg:order-2">
              <div className="bg-cream rounded-section p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-black text-ink-heading mb-8">
                  {content.about.title}
                </h2>
                
                <div className="text-lg leading-relaxed text-ink whitespace-pre-line">
                  <HighlightedText>{content.about.content}</HighlightedText>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Belief Section */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="bg-white rounded-section p-8 md:p-12 shadow-card text-center relative overflow-hidden">
              {/* אלמנטים דקורטיביים */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <div className="absolute bottom-6 left-6 w-12 h-12 bg-accent-dark bg-opacity-10 rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-accent-dark" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-ink-heading mb-8">
                אני מאמינה
              </h2>
              
              <p className="text-xl md:text-2xl leading-relaxed text-ink font-medium">
                <HighlightedText>{content.belief.text}</HighlightedText>
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-5 py-16 md:px-10 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-black text-ink-heading text-center mb-16">
              מה תמצאו אצלי?
            </h2>
          </FadeInSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.services.map((service, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div className="bg-cream rounded-card p-8 shadow-soft hover:shadow-card transition-all duration-200 h-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                      <DynamicIcon emojiOrIcon={service.icon} className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-ink-heading mb-4">
                      {service.title.replace(service.icon, '').trim()}
                    </h3>
                  </div>
                  <p className="text-ink leading-relaxed text-center">
                    {service.content}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-black text-ink-heading text-center mb-16">
              איך זה עובד?
            </h2>
          </FadeInSection>
          
          <FadeInSection delay={0.1}>
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1.1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 }
              }}
              pagination={{ 
                clickable: true,
                bulletClass: 'swiper-pagination-bullet bg-ink-light opacity-30',
                bulletActiveClass: 'swiper-pagination-bullet-active bg-accent opacity-100'
              }}
              className="pb-12"
            >
              {content.process.map((step, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-card p-6 md:p-8 shadow-soft h-64 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                      <DynamicIcon emojiOrIcon={step.icon} className="w-8 h-8 text-accent" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-ink-heading mb-4">
                      {step.title.replace(step.icon, '').trim()}
                    </h3>
                    
                    <p className="text-ink leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </FadeInSection>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-5 py-16 md:px-10 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="bg-cream rounded-section p-8 md:p-12 shadow-card text-center relative">
              <div className="absolute top-6 right-6 text-4xl text-accent opacity-50">"</div>
              <div className="absolute bottom-6 left-6 text-4xl text-accent opacity-50">"</div>
              
              <p className="text-xl md:text-2xl leading-relaxed text-ink font-medium mb-6">
                {content.testimonial.quote}
              </p>
              
              <p className="text-lg text-accent font-semibold">
                {content.testimonial.author}
              </p>
              
              <div className="flex justify-center mt-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-5 py-16 md:px-10 md:py-24 bg-ink-heading">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-12">
              {content.finalCta.title}
            </h2>
          </FadeInSection>
          
          <FadeInSection delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => setShowSignupModal(true)}
                className="bg-gradient-to-l from-accent to-accent-dark text-white px-12 py-6 rounded-card font-bold text-xl shadow-soft hover:shadow-card focus:shadow-focus transition-all duration-200 flex items-center justify-center gap-3"
              >
                <User className="w-6 h-6" />
                {content.finalCta.buttons.primary}
              </button>
              
              <a 
                href="https://wa.me/972545886779"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-ink-heading px-12 py-6 rounded-card font-bold text-xl shadow-soft hover:shadow-card focus:shadow-focus transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
                {content.finalCta.buttons.secondary}
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-section p-8 max-w-md w-full shadow-card max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowSignupModal(false)}
                className="absolute top-4 left-4 w-10 h-10 bg-cream rounded-full flex items-center justify-center text-ink-light hover:text-ink focus:text-ink transition-colors"
                aria-label="סגור טופס"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-accent" />
                </div>
                
                <h3 className="text-2xl font-black text-ink-heading mb-2">
                  הרשמה לקבוצות למידה
                </h3>
                <p className="text-ink-light">מלאו את הפרטים ואילנית תיצור איתכם קשר בהקדם</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* פרטי ההורה */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-accent font-bold">
                    <User className="w-5 h-5" />
                    <span>פרטי ההורה</span>
                  </div>
                  
                  <div>
                    <label htmlFor="parentName" className="block text-ink font-semibold mb-2">שם מלא</label>
                    <input
                      id="parentName"
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-ink-light rounded-card focus:border-accent focus:outline-none transition-colors text-ink"
                      placeholder="שם ההורה"
                    />
                  </div>

                  <div>
                    <label htmlFor="parentPhone" className="block text-ink font-semibold mb-2">טלפון נייד</label>
                    <input
                      id="parentPhone"
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      required
                      pattern="05[0-9]{8}"
                      className="w-full px-4 py-3 border border-ink-light rounded-card focus:border-accent focus:outline-none transition-colors text-ink"
                      placeholder="05XXXXXXXX"
                    />
                  </div>
                </div>

                {/* פרטי הילד/ה */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-accent font-bold">
                    <Baby className="w-5 h-5" />
                    <span>פרטי הילד/ה</span>
                  </div>
                  
                  <div>
                    <label htmlFor="childName" className="block text-ink font-semibold mb-2">שם הילד/ה</label>
                    <input
                      id="childName"
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-ink-light rounded-card focus:border-accent focus:outline-none transition-colors text-ink"
                      placeholder="שם הילד/ה"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="childAge" className="block text-ink font-semibold mb-2">גיל</label>
                      <select
                        id="childAge"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-ink-light rounded-card focus:border-accent focus:outline-none transition-colors text-ink"
                      >
                        <option value="">בחר גיל</option>
                        {Array.from({ length: 13 }, (_, i) => i + 5).map(age => (
                          <option key={age} value={age}>{age}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="childGrade" className="block text-ink font-semibold mb-2">כיתה</label>
                      <select
                        id="childGrade"
                        name="childGrade"
                        value={formData.childGrade}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-ink-light rounded-card focus:border-accent focus:outline-none transition-colors text-ink"
                      >
                        <option value="">בחר כיתה</option>
                        {['גן', 'כיתה א', 'כיתה ב', 'כיתה ג', 'כיתה ד', 'כיתה ה', 'כיתה ו', 'כיתה ז', 'כיתה ח', 'כיתה ט', 'כיתה י', 'כיתה יא', 'כיתה יב'].map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-l from-accent to-accent-dark text-white py-4 rounded-card font-bold text-lg shadow-soft hover:shadow-card focus:shadow-focus transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      שולח...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      שלח פרטים
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPageProfessional;

