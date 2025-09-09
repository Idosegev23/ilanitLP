import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCards, EffectCoverflow } from 'swiper/modules';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from '@tsparticles/react';
import { loadAll } from '@tsparticles/all';
import AOS from 'aos';
import toast, { Toaster } from 'react-hot-toast';
import Confetti from 'react-confetti';
import { useInView } from 'react-intersection-observer';
import { 
  BookOpen, 
  Calculator, 
  GraduationCap, 
  Users, 
  Gamepad2, 
  Target, 
  Lightbulb, 
  Heart, 
  Smile,
  Star,
  MessageCircle,
  Phone,
  X,
  User,
  Baby,
  Sparkles,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Shield
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'aos/dist/aos.css';

gsap.registerPlugin(ScrollTrigger);

const LandingPageNew = () => {
  const [heroAnimation, setHeroAnimation] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [particlesReady, setParticlesReady] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    childName: '',
    childAge: '',
    childGrade: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: 'ease-in-out',
      once: true
    });

    // Load Lottie animation
    fetch('/lottie/hero.json')
      .then(response => response.json())
      .then(data => setHeroAnimation(data))
      .catch(error => console.log('Error loading animation:', error));

    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const particlesLoaded = async (container) => {
    console.log('Particles loaded', container);
  };

  const initParticles = async (engine) => {
    await loadAll(engine);
    setParticlesReady(true);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^05\d{8}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('הפרטים נשלחו בהצלחה! אילנית תיצור איתכם קשר בקרוב.');
        setFormData({
          parentName: '',
          parentPhone: '',
          childName: '',
          childAge: '',
          childGrade: ''
        });
        setShowConfetti(true);
        setTimeout(() => {
          setShowSignupModal(false);
          setShowConfetti(false);
        }, 3000);
      } else {
        toast.error('אירעה שגיאה בשליחת הפרטים. אנא נסו שוב.');
      }
    } catch (error) {
      toast.error('אירעה שגיאה בשליחת הפרטים. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: BookOpen,
      title: "אנגלית - עד כיתה ח'",
      description: "למידת אנגלית בצורה חווייתית ומהנה, עם דגש על דיבור, הבנה וביטחון עצמי בשפה.",
      color: "from-blue-400 to-purple-600",
      delay: 100
    },
    {
      icon: Calculator,
      title: "חשבון ומתמטיקה - מכיתה א' ועד י\"ב",
      description: "בניית יסודות חזקים במתמטיקה, פתרון בעיות ופיתוח חשיבה לוגית ואנליטית.",
      color: "from-green-400 to-blue-500",
      delay: 200
    },
    {
      icon: GraduationCap,
      title: "הכנה דידקטית וחברתית לכיתה א'",
      description: "הכנה מושלמת לכיתה א' - כישורי קריאה, כתיבה, חשבון וכישורים חברתיים.",
      color: "from-pink-400 to-red-500",
      delay: 300
    }
  ];

  const processSteps = [
    {
      icon: Users,
      title: "קבוצות קטנות",
      description: "יחס אישי וקשב לכל ילד.",
      color: "from-purple-400 to-pink-600"
    },
    {
      icon: Gamepad2,
      title: "למידה חווייתית",
      description: "משחקים (תואמי גיל), תחרות בריאה, עבודה בקבוצה וכלים חדשניים.",
      color: "from-blue-400 to-indigo-600"
    },
    {
      icon: Target,
      title: "התאמה לרמה",
      description: "כל אחד ואחת מתקדמים בקצב וביכולות שלהם.",
      color: "from-green-400 to-teal-600"
    },
    {
      icon: Lightbulb,
      title: "הוראה מתקנת",
      description: "שילוב אסטרטגיות למידה מותאמות.",
      color: "from-yellow-400 to-orange-600"
    },
    {
      icon: Heart,
      title: "חיזוק ביטחון עצמי",
      description: "הרבה רגישות, חיזוק ביטחון עצמי ותחושת שייכות.",
      color: "from-red-400 to-pink-600"
    },
    {
      icon: Smile,
      title: "אווירה חיובית",
      description: "מקום שילדים אוהבים לבוא אליו.",
      color: "from-indigo-400 to-purple-600"
    }
  ];

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe"],
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        directions: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  const [beliefRef, beliefInView] = useInView({ threshold: 0.3 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-inter overflow-x-hidden" ref={containerRef}>
      <Toaster position="top-center" />
      {showConfetti && <Confetti />}
      
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={initParticles}
        loaded={particlesLoaded}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Cursor Follower */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-glass backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center">
            <motion.img 
              src="/images/logo.png" 
              alt="לב ללמידה - לוגו" 
              className="h-16 w-auto"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-aurora opacity-20"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center lg:text-right"
            >
              <motion.h1 
                className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-8 leading-tight"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, type: "spring" }}
              >
                קבוצות למידה חווייתיות
                <br />
                <span className="text-4xl lg:text-6xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  במתמטיקה, אנגלית והכנה לכיתה א'
                </span>
                <motion.div 
                  className="inline-block ml-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-12 h-12 text-yellow-400" />
                </motion.div>
              </motion.h1>
              
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="bg-glass backdrop-blur-xl rounded-3xl p-8 mb-10 border border-white/20 shadow-glass"
              >
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                  היי,<br />
                  שמי אילנית.<br />
                  לפני שאספר על עצמי, אתחיל מהסוף:<br />
                  אני מקדישה את כל כולי ללמד ילדים ולא רק מתמטיקה, חשבון ואנגלית אלא גם ובעיקר להאמין בעצמם, לגלות את החוזקות שלהם, לקבל בטחון, לרכוש הרגלי למידה ולמצוא את הדרך הייחודית שלהם ללמוד, בקצב שלהם.
                </p>
              </motion.div>

              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-end"
              >
                <motion.button 
                  onClick={() => setShowSignupModal(true)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-glow overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    הרשמה לקבוצות
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
                
                <motion.a 
                  href="https://wa.me/972545886779"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-glass backdrop-blur-xl text-white font-bold text-lg rounded-2xl border border-white/20 shadow-glass flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
                  דברו איתי בוואטסאפ
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Animation/Visual */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <motion.div 
                  className="w-96 h-96 lg:w-[500px] lg:h-[500px] relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full animate-pulse" />
                  <div className="absolute inset-4 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute inset-8 bg-gradient-to-r from-pink-400/20 to-yellow-600/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                </motion.div>
                
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {heroAnimation ? (
                    <Lottie 
                      animationData={heroAnimation} 
                      loop={true}
                      autoplay={true}
                      className="w-80 h-80 lg:w-96 lg:h-96 drop-shadow-2xl"
                    />
                  ) : (
                    <div className="w-80 h-80 lg:w-96 lg:h-96 bg-glass backdrop-blur-xl rounded-full flex items-center justify-center shadow-magical">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <GraduationCap className="w-32 h-32 text-white" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative group">
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                  animate={{ rotate: [0, 1, -1, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px] rounded-3xl overflow-hidden shadow-aurora">
                  <img 
                    src="/images/ilanit.png" 
                    alt="אילנית - מאמנת לימודית" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="bg-glass backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-glass">
                <motion.h2 
                  className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  היי, שמי אילנית.
                </motion.h2>
                
                <div className="text-lg text-white/80 leading-relaxed space-y-6">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    איך הגעתי לשם? האמת שתמיד הייתי שם<br />
                    זכיתי במקצוע רואת חשבון, אבל הלב שלי תמיד היה עם ילדים ונוער.
                  </motion.p>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    במשך יותר מ־15 שנה לימדתי שיעורים פרטיים במקביל לעבודה במשרד.
                  </motion.p>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    ואז, אחרי ה־7 באוקטובר, קיבלתי החלטה לעזוב את המסלול הבטוח, ולהתמקד במה שאני באמת אוהבת - העצמה והדרכה חווייתית לילדים ונוער.
                  </motion.p>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="font-semibold text-blue-300"
                  >
                    היום אני מאמנת לימודית, בעלת הסמכה בהוראה מתקנת בשפה וחשבון (ובתקופה הקרובה גם אבחון דידקטי), בעלת הסמכה בהכנה לכיתות א׳.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Belief Section */}
      <section 
        ref={beliefRef}
        className="relative py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={beliefInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="relative bg-glass backdrop-blur-xl rounded-3xl p-16 border border-white/20 shadow-magical">
              <motion.div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-glow">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={beliefInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                אני מאמינה
              </motion.h2>
              
              <motion.p 
                className="text-2xl lg:text-3xl text-white font-semibold leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={beliefInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                אני מאמינה שילדים לא צריכים רק עוד שיעור. הם צריכים מקום שבו הם מרגישים טוב עם עצמם, להאמין שהם יכולים, ולגלות שהלמידה יכולה להיות גם חוויה מהנה.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-16"
          >
            מה תמצאו אצלי?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`absolute -inset-2 bg-gradient-to-r ${service.color} rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl`} />
                
                <div className="relative bg-glass backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-glass hover:shadow-magical transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-glow`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 text-center">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed text-center">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-16"
          >
            איך זה עובד?
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Swiper
              modules={[Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              spaceBetween={30}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              className="pb-16"
            >
              {processSteps.map((step, index) => (
                <SwiperSlide key={index} className="!w-80">
                  <motion.div
                    initial={{ rotateY: 90, opacity: 0 }}
                    whileInView={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative h-80"
                  >
                    <div className={`absolute -inset-2 bg-gradient-to-r ${step.color} rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl`} />
                    
                    <div className="relative bg-glass backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-glass h-full flex flex-col justify-center items-center text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-glow`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-white/80 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative bg-glass backdrop-blur-xl rounded-3xl p-16 border border-white/20 shadow-magical text-center"
          >
            <div className="absolute -top-8 right-8 text-6xl text-yellow-400 font-serif">"</div>
            <div className="absolute -bottom-8 left-8 text-6xl text-yellow-400 font-serif">"</div>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl lg:text-3xl text-white font-semibold leading-relaxed mb-6"
            >
              "אילנית לא רק לימדה את הבת שלי מתמטיקה, היא החזירה לה את הביטחון העצמי. היא מגיעה עכשיו לשיעורים בחיוך ואומרת שמתמטיקה זה כיף! תודה אילנית על הסבלנות והאהבה שאת נותנת לכל ילד."
            </motion.p>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-blue-300 font-medium mb-6"
            >
              - אמא של נועה, כיתה ו'
            </motion.p>
            
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="w-8 h-8 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-12"
          >
            מזמינה אתכם להצטרף לקבוצות שבהן לומדים – וגם מאמינים בעצמם
          </motion.h2>
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-8 justify-center"
          >
            <motion.button 
              onClick={() => setShowSignupModal(true)}
              className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-black text-xl rounded-2xl shadow-glow overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(59, 130, 246, 0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Award className="w-6 h-6" />
                הרשמה לקבוצות
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            
            <motion.a 
              href="https://wa.me/972545886779"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-12 py-6 bg-glass backdrop-blur-xl text-white font-black text-xl rounded-2xl border border-white/20 shadow-glass flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-6 h-6 group-hover:animate-bounce" />
              שיחת היכרות בוואטסאפ
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="relative bg-glass backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-magical border border-white/20 max-h-[90vh] overflow-y-auto"
            >
              <motion.button
                onClick={() => setShowSignupModal(false)}
                className="absolute top-4 left-4 w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                  הרשמה לקבוצות למידה
                </h3>
                <p className="text-white/80">מלאו את הפרטים ואילנית תיצור איתכם קשר בהקדם</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Parent Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-300 font-bold">
                    <User className="w-5 h-5" />
                    <span>פרטי ההורה</span>
                  </div>
                  
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-white font-semibold mb-2">שם מלא</label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl focus:border-blue-400 focus:outline-none backdrop-blur-sm text-white placeholder-white/50"
                      placeholder="שם ההורה"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-white font-semibold mb-2">טלפון נייד</label>
                    <input
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl focus:border-blue-400 focus:outline-none backdrop-blur-sm text-white placeholder-white/50"
                      placeholder="05XXXXXXXX"
                      pattern="05[0-9]{8}"
                    />
                  </motion.div>
                </div>

                {/* Child Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-pink-300 font-bold">
                    <Baby className="w-5 h-5" />
                    <span>פרטי הילד/ה</span>
                  </div>
                  
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-white font-semibold mb-2">שם הילד/ה</label>
                    <input
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl focus:border-blue-400 focus:outline-none backdrop-blur-sm text-white placeholder-white/50"
                      placeholder="שם הילד/ה"
                    />
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-white font-semibold mb-2">גיל</label>
                      <select
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl focus:border-blue-400 focus:outline-none backdrop-blur-sm text-white"
                      >
                        <option value="" className="bg-gray-800">בחר גיל</option>
                        {Array.from({ length: 13 }, (_, i) => i + 5).map(age => (
                          <option key={age} value={age} className="bg-gray-800">{age}</option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-white font-semibold mb-2">כיתה</label>
                      <select
                        name="childGrade"
                        value={formData.childGrade}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl focus:border-blue-400 focus:outline-none backdrop-blur-sm text-white"
                      >
                        <option value="" className="bg-gray-800">בחר כיתה</option>
                        <option value="גן" className="bg-gray-800">גן</option>
                        <option value="כיתה א" className="bg-gray-800">כיתה א'</option>
                        <option value="כיתה ב" className="bg-gray-800">כיתה ב'</option>
                        <option value="כיתה ג" className="bg-gray-800">כיתה ג'</option>
                        <option value="כיתה ד" className="bg-gray-800">כיתה ד'</option>
                        <option value="כיתה ה" className="bg-gray-800">כיתה ה'</option>
                        <option value="כיתה ו" className="bg-gray-800">כיתה ו'</option>
                        <option value="כיתה ז" className="bg-gray-800">כיתה ז'</option>
                        <option value="כיתה ח" className="bg-gray-800">כיתה ח'</option>
                        <option value="כיתה ט" className="bg-gray-800">כיתה ט'</option>
                        <option value="כיתה י" className="bg-gray-800">כיתה י'</option>
                        <option value="כיתה יא" className="bg-gray-800">כיתה יא'</option>
                        <option value="כיתה יב" className="bg-gray-800">כיתה יב'</option>
                      </select>
                    </motion.div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      שולח...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      שלח פרטים
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPageNew;
