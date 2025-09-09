import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronDown, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { content } from './content';

// SimpleWildPage - עמוד נחיתה יצירתי עם טקסט מפוזר

// קומפוננט דודלים מצוירים בלייב
const LiveDoodle = ({ path, x, y, size = 100, delay = 0, color = "#D67D65" }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isVisible ? 1 : 0 }}
          transition={{ 
            duration: 2, 
            delay: delay + 0.5,
            ease: "easeInOut"
          }}
        />
      </svg>
    </motion.div>
  );
};

// קומפוננט לאיורים קיימים - ברקע עדין
const FloatingIllustration = ({ src, x, y, size = 100, delay = 0, rotation = 0 }) => {
  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        transform: `rotate(${rotation}deg)`
      }}
      initial={{ opacity: 0, scale: 0, rotate: rotation + 45 }}
      animate={{ opacity: 0.15, scale: 1, rotate: rotation }}
      transition={{ 
        duration: 1.5, 
        delay: delay,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
    >
      <img 
        src={src} 
        alt="" 
        width={size} 
        height={size}
        className="drop-shadow-sm filter grayscale opacity-60"
      />
    </motion.div>
  );
};

// קומפוננט כפתורי CTA לשימוש חוזר
const CTAButtons = ({ onFormOpen, className = "" }) => {
  return (
    <div className={`flex flex-col gap-3 items-center justify-center ${className}`}>
      <motion.button
        onClick={onFormOpen}
        className="bg-gradient-to-r from-luxe-accent to-luxe-soft text-white px-6 py-3 rounded-[1.5rem] font-semibold text-base md:text-lg shadow-lg hover:shadow-luxe-accent/30 transition-all duration-300 border border-white/30 w-full max-w-[280px]"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 40px -12px rgba(214, 125, 101, 0.4)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center justify-center">
          {content.hero.cta.primary}
        </span>
      </motion.button>

      <motion.a
        href="https://wa.me/972545886779"
        className="bg-gradient-to-r from-luxe-primary to-luxe-secondary text-white px-6 py-3 rounded-[1.5rem] font-semibold text-base md:text-lg shadow-lg hover:shadow-luxe-primary/30 transition-all duration-300 border border-white/30 flex items-center gap-2 w-full max-w-[280px] justify-center"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 40px -12px rgba(42, 57, 52, 0.4)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageCircle className="w-5 h-5" />
        {content.hero.cta.secondary}
      </motion.a>
    </div>
  );
};

// קומפוננט טקסט מפוזר פשוט
const ScatteredText = ({ text, className, x, y, rotation = 0, size = "text-lg", weight = "font-normal", color = "text-luxe-primary", delay = 0 }) => {
  return (
    <motion.div 
      className={`absolute ${className} ${size} ${weight} ${color} cursor-default select-none`}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        transform: `rotate(${rotation}deg)`,
        fontFamily: 'Playpen Sans Hebrew, sans-serif'
      }}
      initial={{ 
        opacity: 0, 
        scale: 0,
        rotate: rotation + (Math.random() - 0.5) * 30,
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: rotation,
      }}
      transition={{
        duration: 1 + Math.random(),
        delay: delay + Math.random() * 2,
        ease: "easeOut"
      }}
    >
      {text}
    </motion.div>
  );
};

// קומפוננט FAQ פזור
const ScatteredFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  return (
    <div className="relative py-12 px-0 sm:px-5 z-10">
      {/* כותרת ראשית */}
      <ScatteredText 
        text="שאלות שאתם שואלים" 
        x={15} 
        y={5} 
        size="text-3xl md:text-5xl" 
        weight="font-black"
        color="text-luxe-primary"
        rotation={-2}
      />
      
      <ScatteredText 
        text="התשובות שאתם מחפשים" 
        x={55} 
        y={8} 
        size="text-xl md:text-3xl" 
        weight="font-bold"
        color="text-luxe-accent"
        rotation={2}
        delay={0.5}
      />

      {/* איורים נוספים לאזור FAQ */}
      <FloatingIllustration 
        src="/illustrations/undraw_fun-arrow.svg" 
        x={8} 
        y={15} 
        size={80} 
        delay={7} 
        rotation={-10}
      />
      
      <FloatingIllustration 
        src="/illustrations/team-work-1-75.svg" 
        x={85} 
        y={20} 
        size={90} 
        delay={8} 
        rotation={15}
      />
      
      <FloatingIllustration 
        src="/illustrations/undraw_asymmetric-parallels.svg" 
        x={5} 
        y={70} 
        size={100} 
        delay={9} 
        rotation={-5}
      />

      {/* שאלות מאורגנות בצורה יפה */}
      <div className="mt-32 max-w-4xl mx-auto relative">
        <div className="grid gap-6 md:gap-8">
          {content.faq.map((item, index) => {
            // סידור אנכי רגיל במקום זיג-זג
            const rotation = 0;
            
            return (
              <motion.div
                key={index}
                className="max-w-full mx-auto"
                style={{ transform: `rotate(${rotation}deg)` }}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 1 + index * 0.1, 
                  duration: 0.6, 
                  ease: "easeOut" 
                }}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-4 shadow-xl border-2 border-luxe-soft/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 relative z-20">
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
      </div>
    </div>
  );
};

// הקומפוננט הראשי
const SimpleWildPage = () => {
  // קומפוננט ראשי - עמוד נחיתה יצירתי
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    childName: '',
    subjectInterest: '',
    childGrade: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ולידציה - בדיקה שכל השדות מלאים
    if (!formData.parentName.trim() || !formData.parentPhone.trim() || !formData.childName.trim() || !formData.subjectInterest.trim()) {
      toast.error('אנא מלאו את כל השדות');
      return;
    }

    // ולידציה לטלפון ישראלי
    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(formData.parentPhone)) {
      toast.error('מספר הטלפון חייב להתחיל ב-05 ולכלול 10 ספרות');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.eu2.make.com/fyjhdrxdlc60se4nry8ux0i3xy6qb84b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('הפרטים נשלחו בהצלחה! אילנית תיצור איתכם קשר בקרוב.');
        setFormData({
          parentName: '', parentPhone: '', childName: '', subjectInterest: '', childGrade: ''
        });
        setShowForm(false);
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
    <div 
      className="min-h-screen relative overflow-x-hidden bg-cream px-4 sm:px-6 lg:px-0"
      style={{ 
        fontFamily: 'Playpen Sans Hebrew, sans-serif'
      }}
    >
      <Toaster position="top-center" />
      
      {/* רקע עדין */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-luxe-soft/10" />
      
      {/* איורים צפים מהתיקייה שלך */}
      <FloatingIllustration 
        src="/illustrations/undraw_star.svg" 
        x={2} 
        y={3} 
        size={80} 
        delay={1} 
        rotation={-15}
      />
      
      <FloatingIllustration 
        src="/illustrations/undraw_balloon.svg" 
        x={85} 
        y={5} 
        size={90} 
        delay={1.5} 
        rotation={10}
      />
      
      <FloatingIllustration 
        src="/illustrations/undraw_fun-star.svg" 
        x={1} 
        y={40} 
        size={70} 
        delay={2} 
        rotation={-20}
      />
      
      <FloatingIllustration 
        src="/illustrations/undraw_rocket.svg" 
        x={90} 
        y={45} 
        size={100} 
        delay={2.5} 
        rotation={15}
      />
      
      <FloatingIllustration 
        src="/illustrations/undraw_love.svg" 
        x={35} 
        y={2} 
        size={60} 
        delay={3} 
        rotation={5}
      />
      
      <FloatingIllustration 
        src="/illustrations/undraw_ice-cream.svg" 
        x={85} 
        y={75} 
        size={80} 
        delay={3.5} 
        rotation={-10}
      />

      {/* לוגו */}
      <motion.div
        className="absolute top-4 left-8 sm:left-10 lg:left-4 z-30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img 
          src="/images/logo.png" 
          alt="לוגו לב ללמידה" 
          className="h-12 md:h-14 w-auto drop-shadow-lg"
        />
      </motion.div>

      {/* תוכן ראשי - טקסט מפוזר */}
      <div className="relative min-h-screen z-20">
        {/* כותרת ראשית - טקסט רציף וממורכז */}
        <motion.div
          className="absolute left-0 right-0 px-4"
          style={{ top: '15%' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-luxe-primary leading-tight mb-6">
              למידה אמיתית מתרחשת כשיש{' '}
              <span className="text-luxe-accent">
                חופש לגלות
              </span>
              {' '}ותחושת{' '}
              <span className="text-orange-500">
                ביטחון לנסות
              </span>
            </h1>
          </div>
        </motion.div>

        {/* תת-כותרת עם הדגשות */}
        <motion.div
          className="absolute left-0 right-0 px-4"
          style={{ top: '30%' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-luxe-primary leading-relaxed">
              קבוצות למידה חווייתיות ב
              <span className="text-luxe-primary bg-yellow-200 px-3 py-1 mx-2 rounded-lg font-black">
                מתמטיקה
              </span>
              ,{' '}
              <span className="text-luxe-primary bg-yellow-200 px-3 py-1 mx-2 rounded-lg font-black">
                אנגלית
              </span>
              {' '}ו
              <span className="text-luxe-primary bg-yellow-200 px-3 py-1 mx-2 rounded-lg font-black">
                הכנה לכיתה א'
              </span>
            </h2>
          </div>
        </motion.div>

        {/* הפסקה "נתחיל מהסוף" - חלק מההירו */}
        <motion.div
          className="absolute left-0 right-0 px-4"
          style={{ top: '50%' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
        >
          <div className="max-w-4xl mx-auto text-right space-y-3 text-luxe-secondary text-base md:text-lg leading-relaxed">
            <div className="whitespace-pre-line">
              {content.hero.intro}
            </div>
          </div>
        </motion.div>

        {/* כפתורי פעולה - עם פדינג מהטקסט */}
        <motion.div
          className="absolute left-0 right-0"
          style={{ top: '75%' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
        >
          <CTAButtons onFormOpen={() => setShowForm(true)} />
        </motion.div>
      </div>

      {/* סקשן השירותים */}
      <motion.section 
        className="relative py-16 px-0 sm:px-5 z-10 bg-white/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-5xl font-black text-luxe-primary text-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            מה תמצאו אצלי?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-[3rem] p-8 shadow-xl border-2 border-luxe-soft/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-6xl mb-6">{service.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-luxe-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-luxe-secondary leading-relaxed">
                  {service.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* סקשן אודות איילנית */}
      <motion.section 
        className="relative py-12 px-0 sm:px-5 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-right mb-6">
                <h2 className="text-3xl md:text-5xl font-black text-luxe-primary">
                  מי זאת אילנית?
                </h2>
              </div>
              
              <div className="mt-6 space-y-4 text-luxe-secondary text-lg leading-relaxed relative">
                <FloatingIllustration 
                  src="/illustrations/undraw_selfie-fun_0qzh.svg" 
                  x={-10} 
                  y={-5} 
                  size={60} 
                  delay={1} 
                  rotation={15}
                />
                
                <div className="whitespace-pre-line">
                  {content.about.content}
                </div>
                
                <div className="flex flex-nowrap gap-2 mt-6 justify-start">
                  <div className="bg-luxe-soft/20 px-3 py-1 rounded-full">
                    <span className="text-luxe-primary font-semibold text-sm">מאמנת לימודית</span>
                  </div>
                  <div className="bg-luxe-accent/20 px-3 py-1 rounded-full">
                    <span className="text-luxe-primary font-semibold text-sm">הוראה מתקנת</span>
                  </div>
                  <div className="bg-luxe-primary/20 px-3 py-1 rounded-full">
                    <span className="text-luxe-primary font-semibold text-sm">למידה חווייתית</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <FloatingIllustration 
                src="/illustrations/undraw_bird.svg" 
                x={70} 
                y={-10} 
                size={80} 
                delay={1.5} 
                rotation={-15}
              />
              
              <div className="space-y-6">
                <img 
                  src="/images/ilanit.png" 
                  alt="אילנית" 
                  className="w-full h-64 object-cover rounded-[2rem] shadow-xl"
                />
                <div className="text-center space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-luxe-primary">
                    אילנית - המורה שלכם
                  </h3>
                  <p className="text-lg md:text-xl text-luxe-secondary leading-relaxed italic">
                    "{content.belief.text}"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* סקשן התהליך */}
      <motion.section 
        className="relative py-16 px-0 sm:px-5 z-10 bg-gradient-to-br from-luxe-soft/10 to-white/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-5xl font-black text-luxe-primary text-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            איך זה עובד?
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.process.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-6 shadow-xl border-2 border-luxe-soft/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-luxe-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-luxe-secondary leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* שאלות ותשובות מפוזרות */}
      <ScatteredFAQ />

      {/* קריאה לפעולה אחרונה */}
      <motion.section 
        className="relative py-8 px-0 sm:px-5 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <CTAButtons onFormOpen={() => setShowForm(true)} />
        </div>
      </motion.section>

      {/* פוטר מינימלי */}
      <motion.footer 
        className="relative bg-gradient-to-r from-luxe-primary to-luxe-secondary text-white py-4 px-0 sm:px-5 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo.png" 
                alt="לוגו לב ללמידה" 
                className="w-8 h-8 drop-shadow-lg"
              />
              <span className="font-semibold">אילנית - לב ללמידה</span>
            </div>
            <span className="text-white/70">© 2025 כל הזכויות שמורות</span>
          </div>
        </div>
      </motion.footer>

      {/* טופס מרחף */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-[2rem] md:rounded-[3rem] p-4 md:p-6 lg:p-8 max-w-md w-full mx-4 md:mx-0 shadow-2xl border-2 border-luxe-soft/30 relative max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.5, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* כפתור סגירה */}
              <motion.button
                onClick={() => setShowForm(false)}
                className="absolute top-4 left-4 w-10 h-10 bg-luxe-primary/10 hover:bg-luxe-primary/20 rounded-full flex items-center justify-center transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-luxe-primary" />
              </motion.button>
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 lg:space-y-6">
                <h3 className="text-2xl md:text-3xl font-black text-luxe-primary text-center mb-4 md:mb-6">
                  בואו נכיר!
                </h3>
                
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="שם הורה"
                  required
                  className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-luxe-soft rounded-[1.5rem] focus:border-luxe-accent focus:outline-none transition-colors text-base md:text-lg"
                />
                
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  placeholder="טלפון (05XXXXXXXX)"
                  pattern="05[0-9]{8}"
                  title="מספר הטלפון חייב להתחיל ב-05 ולכלול 10 ספרות"
                  required
                  className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-luxe-soft rounded-[1.5rem] focus:border-luxe-accent focus:outline-none transition-colors text-base md:text-lg"
                />
                
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  placeholder="שם הילד/ה"
                  required
                  className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-luxe-soft rounded-[1.5rem] focus:border-luxe-accent focus:outline-none transition-colors text-base md:text-lg"
                />
                
                <select
                  name="subjectInterest"
                  value={formData.subjectInterest}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-luxe-soft rounded-[1.5rem] focus:border-luxe-accent focus:outline-none transition-colors text-base md:text-lg bg-white/95 backdrop-blur-sm shadow-lg appearance-none cursor-pointer hover:border-luxe-primary"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'left 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
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
                  className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-luxe-soft rounded-[1.5rem] focus:border-luxe-accent focus:outline-none transition-colors text-base md:text-lg bg-white/95 backdrop-blur-sm shadow-lg appearance-none cursor-pointer hover:border-luxe-primary"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'left 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
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
                  className="w-full bg-gradient-to-r from-luxe-accent to-luxe-soft text-white py-3 md:py-4 rounded-[1.5rem] font-bold text-lg md:text-xl shadow-2xl hover:shadow-luxe-accent/50 transition-all duration-300 disabled:opacity-50"
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

export default SimpleWildPage;
