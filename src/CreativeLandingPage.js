import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Phone, Star, Heart, BookOpen, Calculator, Pencil } from 'lucide-react';
import rough from 'roughjs/bundled/rough.esm';
import toast, { Toaster } from 'react-hot-toast';
import { content } from './content';

// קומפוננט קישוטי Rough.js - נטען פעם אחת
const RoughDecoration = ({ type, className, style }) => {
  const canvasRef = useRef(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered && canvasRef.current) {
      const canvas = canvasRef.current;
      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      
      // הגדרת גודל
      canvas.width = 200;
      canvas.height = 200;
      
      // ציור לפי סוג
      switch (type) {
        case 'circle':
          rc.circle(100, 100, 80, { 
            stroke: '#D67D65', 
            strokeWidth: 3,
            roughness: 2,
            fill: '#ECAA92',
            fillStyle: 'hachure'
          });
          break;
        case 'rect':
          rc.rectangle(50, 50, 100, 80, { 
            stroke: '#2A3934', 
            strokeWidth: 2,
            roughness: 1.5
          });
          break;
        case 'star':
          const points = [];
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5;
            points.push([100 + 30 * Math.cos(angle), 100 + 30 * Math.sin(angle)]);
          }
          rc.polygon(points, { 
            stroke: '#D67D65', 
            strokeWidth: 2,
            fill: '#ECAA92',
            fillStyle: 'zigzag'
          });
          break;
        case 'arrow':
          rc.line(30, 100, 170, 100, { stroke: '#2E4B46', strokeWidth: 3 });
          rc.line(150, 80, 170, 100, { stroke: '#2E4B46', strokeWidth: 3 });
          rc.line(150, 120, 170, 100, { stroke: '#2E4B46', strokeWidth: 3 });
          break;
      }
      
      setRendered(true);
    }
  }, [type, rendered]);

  return (
    <canvas 
      ref={canvasRef}
      className={className}
      style={{
        ...style,
        pointerEvents: 'none',
        transform: 'scale(0.5)',
        transformOrigin: 'center'
      }}
    />
  );
};

// קומפוננט FAQ יצירתי
const CreativeFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 px-5 relative overflow-hidden">
      {/* רקע יצירתי */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-luxe-soft/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-luxe-accent/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-luxe-primary to-luxe-accent bg-clip-text text-transparent">
              שאלות נפוצות
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-luxe-accent to-luxe-soft mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {content.faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* קישוטי Rough.js */}
              <div className="absolute -top-5 -right-5 opacity-30">
                <RoughDecoration type={index % 2 === 0 ? 'circle' : 'star'} />
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-luxe-soft/30 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-right p-6 hover:bg-luxe-soft/10 transition-colors duration-300 flex items-center justify-between"
                >
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-luxe-accent" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-luxe-primary mr-4">
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
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="w-full h-px bg-gradient-to-r from-luxe-accent/30 to-luxe-soft/30 mb-4" />
                        <p className="text-luxe-secondary leading-relaxed text-lg">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// הקומפוננט הראשי עם פריצה של המבנה
const CreativeLandingPage = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    childName: '',
    subjectInterest: '',
    childGrade: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
      // כאן תהיה השליחה בפועל
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
    <div className="min-h-screen bg-gradient-to-br from-luxe-soft/5 via-white to-luxe-accent/5 font-playpen relative overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Hero Section - מבנה שבור */}
      <section className="min-h-screen flex items-center relative">
        {/* רקע יצירתי עם rough elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20">
            <RoughDecoration type="circle" />
          </div>
          <div className="absolute top-40 right-40">
            <RoughDecoration type="star" />
          </div>
          <div className="absolute bottom-40 left-1/3">
            <RoughDecoration type="rect" />
          </div>
          <div className="absolute bottom-20 right-20">
            <RoughDecoration type="arrow" />
          </div>
        </div>

        <div className="container mx-auto px-5 relative z-10">
          {/* פריסה לא רגילה - זיגזג */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* תוכן ראשי - עמודה שמאלית */}
            <motion.div
              className="lg:col-span-7 lg:col-start-1 text-center lg:text-right"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="relative">
                {/* כותרת עם אפקטים */}
                <motion.h1 
                  className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <span className="bg-gradient-to-r from-luxe-primary via-luxe-accent to-luxe-primary bg-300% animate-gradient bg-clip-text text-transparent">
                    {content.hero.title}
                  </span>
                </motion.h1>

                {/* כותרת משנה בצורה לא רגילה */}
                <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-6 shadow-xl border border-luxe-soft/30 transform -rotate-1">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-luxe-accent to-luxe-soft bg-clip-text text-transparent">
                      {content.hero.subtitle}
                    </h2>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* כפתורי פעולה - בצורה לא רגילה */}
            <motion.div
              className="lg:col-span-5 lg:col-start-8 flex flex-col space-y-6"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.button
                onClick={() => setShowForm(true)}
                className="group relative bg-gradient-to-r from-luxe-accent to-luxe-soft text-white px-8 py-4 rounded-[2rem] font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                whileHover={{ rotate: [0, -1, 1, 0] }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  📚 הרשמה לקבוצות
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-luxe-primary to-luxe-secondary rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.a
                href="https://wa.me/1234567890"
                className="group relative bg-white/80 backdrop-blur-sm border-2 border-luxe-accent text-luxe-primary px-8 py-4 rounded-[2rem] font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                whileHover={{ rotate: [0, 1, -1, 0] }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  שיחת היכרות בוואטסאפ
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* תיבת מידע צפה */}
          <motion.div
            className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-luxe-soft/30 max-w-sm"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="text-luxe-primary">
              <Heart className="w-8 h-8 text-luxe-accent mb-2" />
              <p className="font-bold text-lg mb-2">למידה עם הלב</p>
              <p className="text-sm leading-relaxed">
                אני מאמינה שילדים צריכים מקום שבו הם מרגישים טוב עם עצמם
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* טופס הרשמה מרחף */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-black text-luxe-primary text-center mb-6">
                  הרשמה לקבוצות
                </h3>
                
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="שם הורה"
                  required
                  className="w-full px-4 py-3 border border-luxe-soft rounded-xl focus:border-luxe-accent focus:outline-none transition-colors"
                />
                
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  placeholder="טלפון"
                  required
                  className="w-full px-4 py-3 border border-luxe-soft rounded-xl focus:border-luxe-accent focus:outline-none transition-colors"
                />
                
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  placeholder="שם הילד/ה"
                  required
                  className="w-full px-4 py-3 border border-luxe-soft rounded-xl focus:border-luxe-accent focus:outline-none transition-colors"
                />
                
                <select
                  name="subjectInterest"
                  value={formData.subjectInterest}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-luxe-soft rounded-xl focus:border-luxe-accent focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 border border-luxe-soft rounded-xl focus:border-luxe-accent focus:outline-none transition-colors"
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
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-luxe-accent to-luxe-soft text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? '📤 שולח...' : '✨ שלח פרטים'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* שאלות ותשובות */}
      <CreativeFAQ />

      {/* סקציה אחרונה עם עיצוב שבור */}
      <section className="py-20 px-5 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-luxe-primary to-luxe-secondary text-white rounded-[3rem] p-12 shadow-2xl transform -rotate-1"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              {content.finalCta.title}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setShowForm(true)}
                className="bg-white text-luxe-primary px-8 py-4 rounded-[2rem] font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📚 הרשמה לקבוצות
              </motion.button>
              <motion.a
                href="https://wa.me/1234567890"
                className="bg-luxe-accent text-white px-8 py-4 rounded-[2rem] font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                שיחת היכרות
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CreativeLandingPage;
