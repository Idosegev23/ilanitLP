import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronDown } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { content } from './content';

// רישום GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// קומפוננט ציור SVG מצוייר בהדרגה
const AnimatedSVG = ({ children, className, style, delay = 0 }) => {
  const svgRef = useRef(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || isDrawn) return;

    const paths = svg.querySelectorAll('path, line, circle, rect, polygon');
    
    paths.forEach((path, index) => {
      if (path.tagName === 'path') {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      }
    });

    const tl = gsap.timeline({ delay });
    
    paths.forEach((path, index) => {
      if (path.tagName === 'path') {
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 2 + Math.random(),
          ease: "power2.inOut"
        }, index * 0.5);
      } else {
        tl.from(path, {
          scale: 0,
          rotation: Math.random() * 360,
          duration: 1,
          ease: "back.out(1.7)"
        }, index * 0.3);
      }
    });

    tl.call(() => setIsDrawn(true));

    return () => {
      tl.kill();
    };
  }, [delay, isDrawn]);

  return (
    <svg 
      ref={svgRef}
      className={className}
      style={style}
      viewBox="0 0 200 200"
    >
      {children}
    </svg>
  );
};

// קומפוננט טקסט מפוזר
const ScatteredText = ({ text, className, x, y, rotation = 0, size = "text-lg", weight = "font-normal", color = "text-luxe-primary" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    gsap.fromTo(element, 
      { 
        opacity: 0, 
        scale: 0,
        rotation: rotation + (Math.random() - 0.5) * 30,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100
      },
      { 
        opacity: 1, 
        scale: 1,
        rotation: rotation,
        x: 0,
        y: 0,
        duration: 1.5 + Math.random(),
        ease: "elastic.out(1, 0.8)",
        delay: Math.random() * 2,
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [rotation]);

  return (
    <div 
      ref={textRef}
      className={`absolute ${className} ${size} ${weight} ${color} cursor-default select-none`}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        transform: `rotate(${rotation}deg)`,
        fontFamily: 'Playpen Sans Hebrew, sans-serif'
      }}
    >
      {text}
    </div>
  );
};

// קומפוננט FAQ פזור
const ScatteredFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  return (
    <div className="relative min-h-screen py-20">
      {/* כותרת ראשית */}
      <ScatteredText 
        text="שאלות שאתם שואלים" 
        x={15} 
        y={10} 
        size="text-4xl md:text-6xl" 
        weight="font-black"
        color="text-luxe-primary"
        rotation={-5}
      />
      
      <ScatteredText 
        text="התשובות שאתם מחפשים" 
        x={60} 
        y={15} 
        size="text-2xl md:text-4xl" 
        weight="font-bold"
        color="text-luxe-accent"
        rotation={3}
      />

      {/* שאלות מפוזרות */}
      {content.faq.map((item, index) => {
        const positions = [
          { x: 10, y: 25 + index * 8, rotation: -2 },
          { x: 55, y: 30 + index * 8, rotation: 1 },
          { x: 15, y: 35 + index * 8, rotation: -1 },
          { x: 60, y: 40 + index * 8, rotation: 2 },
          { x: 20, y: 45 + index * 8, rotation: -3 },
          { x: 50, y: 50 + index * 8, rotation: 1 },
          { x: 25, y: 55 + index * 8, rotation: -2 },
          { x: 65, y: 60 + index * 8, rotation: 2 },
          { x: 30, y: 65 + index * 8, rotation: -1 }
        ];
        
        const pos = positions[index] || { x: 20, y: 30 + index * 10, rotation: 0 };
        
        return (
          <motion.div
            key={index}
            className="absolute max-w-md"
            style={{ 
              left: `${pos.x}%`, 
              top: `${pos.y}%`,
              transform: `rotate(${pos.rotation}deg)`
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8, ease: "back.out(1.7)" }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] p-6 shadow-xl border-2 border-luxe-soft/30 hover:shadow-2xl transition-all duration-300">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-right flex items-start justify-between gap-4"
              >
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-luxe-accent flex-shrink-0 mt-1" />
                </motion.div>
                <h3 className="text-lg font-bold text-luxe-primary leading-tight">
                  {item.question}
                </h3>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="w-full h-px bg-gradient-to-r from-luxe-accent/30 to-luxe-soft/30 mb-4" />
                    <p className="text-luxe-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// הקומפוננט הראשי
const WildLandingPage = () => {
  const containerRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    childName: '',
    subjectInterest: '',
    childGrade: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // אנימציות רקע עם GSAP
    const container = containerRef.current;
    if (!container) return;

    // יצירת חלקיקים מרחפים
    const createFloatingElements = () => {
      for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'absolute w-2 h-2 bg-luxe-accent/20 rounded-full';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        container.appendChild(element);

        gsap.to(element, {
          y: `-=${Math.random() * 300 + 100}`,
          x: `+=${(Math.random() - 0.5) * 200}`,
          rotation: Math.random() * 360,
          scale: Math.random() * 2 + 0.5,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };

    createFloatingElements();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('הפרטים נשלחו בהצלחה! אילנית תיצור איתכם קשר בקרוב.');
      setFormData({
        parentName: '', parentPhone: '', childName: '', subjectInterest: '', childGrade: ''
      });
      setShowForm(false);
    } catch (error) {
      toast.error('אירעה שגיאה. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-cream via-white to-luxe-soft/5 relative overflow-hidden"
      style={{ fontFamily: 'Playpen Sans Hebrew, sans-serif' }}
    >
      <Toaster position="top-center" />
      
      {/* איורים מצויירים ברקע */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* לב */}
        <AnimatedSVG 
          className="absolute w-32 h-32 text-luxe-accent/30"
          style={{ top: '10%', left: '5%' }}
          delay={0.5}
        >
          <path 
            d="M100,40 C90,25 70,25 60,40 C50,25 30,25 20,40 C20,60 50,90 100,120 C150,90 180,60 180,40 C170,25 150,25 140,40 C130,25 110,25 100,40 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </AnimatedSVG>

        {/* כוכב */}
        <AnimatedSVG 
          className="absolute w-24 h-24 text-luxe-primary/25"
          style={{ top: '15%', right: '10%' }}
          delay={1}
        >
          <polygon 
            points="100,20 110,70 160,70 120,100 130,150 100,125 70,150 80,100 40,70 90,70"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
          />
        </AnimatedSVG>

        {/* ספר */}
        <AnimatedSVG 
          className="absolute w-28 h-28 text-luxe-secondary/30"
          style={{ top: '25%', left: '15%' }}
          delay={1.5}
        >
          <rect x="50" y="60" width="100" height="80" rx="5" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line x1="70" y1="80" x2="130" y2="80" stroke="currentColor" strokeWidth="2"/>
          <line x1="70" y1="95" x2="120" y2="95" stroke="currentColor" strokeWidth="2"/>
          <line x1="70" y1="110" x2="125" y2="110" stroke="currentColor" strokeWidth="2"/>
        </AnimatedSVG>

        {/* עיגול עם קווים */}
        <AnimatedSVG 
          className="absolute w-36 h-36 text-luxe-soft/40"
          style={{ bottom: '20%', right: '5%' }}
          delay={2}
        >
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line x1="100" y1="50" x2="100" y2="150" stroke="currentColor" strokeWidth="2"/>
          <line x1="50" y1="100" x2="150" y2="100" stroke="currentColor" strokeWidth="2"/>
        </AnimatedSVG>

        {/* משולש */}
        <AnimatedSVG 
          className="absolute w-20 h-20 text-luxe-accent/25"
          style={{ bottom: '30%', left: '20%' }}
          delay={2.5}
        >
          <polygon 
            points="100,40 60,140 140,140"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
        </AnimatedSVG>

        {/* חץ */}
        <AnimatedSVG 
          className="absolute w-32 h-16 text-luxe-primary/30"
          style={{ top: '40%', right: '25%' }}
          delay={3}
        >
          <line x1="30" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          <line x1="150" y1="80" x2="170" y2="100" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          <line x1="150" y1="120" x2="170" y2="100" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        </AnimatedSVG>
      </div>

      {/* תוכן ראשי - טקסט מפוזר */}
      <div className="relative min-h-screen z-10">
        {/* כותרת ראשית */}
        <ScatteredText 
          text="למידה אמיתית" 
          x={10} 
          y={15} 
          size="text-4xl md:text-7xl" 
          weight="font-black"
          color="text-luxe-primary"
          rotation={-3}
        />
        
        <ScatteredText 
          text="מתרחשת כשיש" 
          x={45} 
          y={20} 
          size="text-3xl md:text-6xl" 
          weight="font-black"
          color="text-luxe-secondary"
          rotation={2}
        />
        
        <ScatteredText 
          text="חופש לגלות" 
          x={15} 
          y={28} 
          size="text-4xl md:text-7xl" 
          weight="font-black"
          color="text-luxe-accent"
          rotation={-1}
        />
        
        <ScatteredText 
          text="ותחושת ביטחון" 
          x={55} 
          y={35} 
          size="text-3xl md:text-6xl" 
          weight="font-black"
          color="text-luxe-primary"
          rotation={3}
        />
        
        <ScatteredText 
          text="לנסות" 
          x={30} 
          y={42} 
          size="text-5xl md:text-8xl" 
          weight="font-black"
          color="text-luxe-soft"
          rotation={-2}
        />

        {/* כותרת משנה */}
        <ScatteredText 
          text="קבוצות למידה חווייתיות" 
          x={20} 
          y={55} 
          size="text-xl md:text-3xl" 
          weight="font-bold"
          color="text-luxe-secondary"
          rotation={1}
        />
        
        <ScatteredText 
          text="במתמטיקה, אנגלית והכנה לכיתה א'" 
          x={25} 
          y={60} 
          size="text-lg md:text-2xl" 
          weight="font-medium"
          color="text-luxe-primary"
          rotation={-1}
        />

        {/* מידע נוסף מפוזר */}
        <ScatteredText 
          text="🌟 יחס אישי" 
          x={5} 
          y={70} 
          size="text-lg md:text-xl" 
          weight="font-semibold"
          color="text-luxe-accent"
          rotation={-2}
        />
        
        <ScatteredText 
          text="🎯 למידה חווייתית" 
          x={70} 
          y={68} 
          size="text-lg md:text-xl" 
          weight="font-semibold"
          color="text-luxe-soft"
          rotation={2}
        />
        
        <ScatteredText 
          text="💝 הרבה אהבה" 
          x={35} 
          y={75} 
          size="text-lg md:text-xl" 
          weight="font-semibold"
          color="text-luxe-primary"
          rotation={-1}
        />

        {/* כפתורי פעולה */}
        <motion.div
          className="absolute"
          style={{ left: '15%', top: '85%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 1, ease: "back.out(1.7)" }}
        >
          <motion.button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-luxe-accent to-luxe-soft text-white px-8 py-4 rounded-[2rem] font-bold text-xl shadow-2xl hover:shadow-luxe-accent/50 transition-all duration-300"
            whileHover={{ 
              scale: 1.05, 
              rotate: [0, -1, 1, 0],
              boxShadow: "0 20px 40px rgba(214, 125, 101, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            📚 הרשמה לקבוצות
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute"
          style={{ right: '15%', top: '88%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5, duration: 1, ease: "back.out(1.7)" }}
        >
          <motion.a
            href="https://wa.me/1234567890"
            className="bg-white/90 backdrop-blur-sm border-3 border-luxe-primary text-luxe-primary px-8 py-4 rounded-[2rem] font-bold text-xl shadow-2xl hover:shadow-luxe-primary/30 transition-all duration-300 flex items-center gap-3"
            whileHover={{ 
              scale: 1.05, 
              rotate: [0, 1, -1, 0],
              backgroundColor: "rgba(42, 56, 52, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-6 h-6" />
            שיחת היכרות
          </motion.a>
        </motion.div>
      </div>

      {/* שאלות ותשובות מפוזרות */}
      <ScatteredFAQ />

      {/* טופס מרחף */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-[3rem] p-8 max-w-md w-full shadow-2xl border-2 border-luxe-soft/30"
              initial={{ opacity: 0, scale: 0.5, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-3xl font-black text-luxe-primary text-center mb-6">
                  בואו נכיר!
                </h3>
                
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="שם הורה"
                  required
                  className="w-full px-6 py-4 border-2 border-luxe-soft rounded-[1.5rem] focus:border-luxe-accent focus:outline-none transition-colors text-lg"
                />
                
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  placeholder="טלפון"
                  required
                  className="w-full px-6 py-4 border-2 border-luxe-soft rounded-[1.5rem] focus:border-luxe-accent focus:outline-none transition-colors text-lg"
                />
                
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  placeholder="שם הילד/ה"
                  required
                  className="w-full px-6 py-4 border-2 border-luxe-soft rounded-[1.5rem] focus:border-luxe-accent focus:outline-none transition-colors text-lg"
                />
                
                <select
                  name="subjectInterest"
                  value={formData.subjectInterest}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 border-2 border-luxe-soft rounded-[1.5rem] focus:border-luxe-accent focus:outline-none transition-colors text-lg"
                >
                  <option value="">בחר תחום עניין</option>
                  <option value="מתמטיקה">מתמטיקה</option>
                  <option value="אנגלית">אנגלית</option>
                  <option value="הכנה לכיתה א'">הכנה לכיתה א'</option>
                  <option value="כמה תחומים">כמה תחומים</option>
                </select>
                
                <select
                  name="childGrade"
                  value={formData.childGrade}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 border-2 border-luxe-soft rounded-[1.5rem] focus:border-luxe-accent focus:outline-none transition-colors text-lg"
                >
                  <option value="">בחר כיתה</option>
                  <option value="גן">גן</option>
                  <option value="א'">א'</option>
                  <option value="ב'">ב'</option>
                  <option value="ג'">ג'</option>
                  <option value="ד'">ד'</option>
                  <option value="ה'">ה'</option>
                  <option value="ו'">ו'</option>
                  <option value="ז'">ז'</option>
                  <option value="ח'">ח'</option>
                  <option value="ט'">ט'</option>
                  <option value="י'">י'</option>
                  <option value="יא'">יא'</option>
                  <option value="יב'">יב'</option>
                </select>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-luxe-accent to-luxe-soft text-white py-4 rounded-[1.5rem] font-bold text-xl shadow-2xl hover:shadow-luxe-accent/50 transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? '📤 שולח...' : '✨ בואו נתחיל!'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WildLandingPage;
