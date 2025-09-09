import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import Lottie from 'lottie-react';
import toast, { Toaster } from 'react-hot-toast';
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
  ChevronRight,
  Monitor,
  Cpu,
  Database,
  Network,
  Code,
  Zap,
  ArrowRight,
  CheckCircle,
  Send
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const LandingPageTech = () => {
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

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    // Load Lottie animation
    fetch('/lottie/hero.json')
      .then(response => response.json())
      .then(data => setHeroAnimation(data))
      .catch(error => console.log('Error loading animation:', error));
  }, []);

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
        setTimeout(() => {
          setShowSignupModal(false);
        }, 2000);
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
      color: "blue"
    },
    {
      icon: Calculator,
      title: "חשבון ומתמטיקה - מכיתה א' ועד י\"ב",
      description: "בניית יסודות חזקים במתמטיקה, פתרון בעיות ופיתוח חשיבה לוגית ואנליטית.",
      color: "tech"
    },
    {
      icon: GraduationCap,
      title: "הכנה דידקטית וחברתית לכיתה א'",
      description: "הכנה מושלמת לכיתה א' - כישורי קריאה, כתיבה, חשבון וכישורים חברתיים.",
      color: "primary"
    }
  ];

  const processSteps = [
    {
      icon: Users,
      title: "קבוצות קטנות",
      description: "יחס אישי וקשב לכל ילד."
    },
    {
      icon: Gamepad2,
      title: "למידה חווייתית",
      description: "משחקים (תואמי גיל), תחרות בריאה, עבודה בקבוצה וכלים חדשניים."
    },
    {
      icon: Target,
      title: "התאמה לרמה",
      description: "כל אחד ואחת מתקדמים בקצב וביכולות שלהם."
    },
    {
      icon: Lightbulb,
      title: "הוראה מתקנת",
      description: "שילוב אסטרטגיות למידה מותאמות."
    },
    {
      icon: Heart,
      title: "חיזוק ביטחון עצמי",
      description: "הרבה רגישות, חיזוק ביטחון עצמי ותחושת שייכות."
    },
    {
      icon: Smile,
      title: "אווירה חיובית",
      description: "מקום שילדים אוהבים לבוא אליו."
    }
  ];

  const [beliefRef, beliefInView] = useInView({ threshold: 0.3 });
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden" ref={containerRef}>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#F8FAFC',
            border: '1px solid #3B82F6'
          }
        }}
      />
      
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-dot-pattern opacity-5 bg-[length:24px_24px]" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-b border-primary-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center">
            <motion.img 
              src="/images/logo.png" 
              alt="לב ללמידה - לוגו" 
              className="h-16 w-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] bg-[length:60px_60px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-7 text-center lg:text-right"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 font-medium mb-8"
              >
                <Zap className="w-4 h-4" />
                פלטפורמה דיגיטלית ללמידה
              </motion.div>

              <motion.h1 
                className="text-5xl lg:text-7xl font-black text-primary-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                קבוצות למידה
                <br />
                <span className="text-blue-600">חווייתיות</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl lg:text-2xl text-primary-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                במתמטיקה, אנגלית והכנה לכיתה א' עם טכנולוגיה מתקדמת ושיטות חדשניות
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="bg-primary-50 border border-primary-200 rounded-2xl p-8 mb-10"
              >
                <p className="text-lg text-primary-700 leading-relaxed">
                  היי, שמי אילנית. אני מקדישה את כל כולי ללמד ילדים ולא רק מתמטיקה, חשבון ואנגלית אלא גם ובעיקר להאמין בעצמם, לגלות את החוזקות שלהם, לקבל בטחון, לרכוש הרגלי למידה ולמצוא את הדרך הייחודית שלהם ללמוד, בקצב שלהם.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end"
              >
                <motion.button 
                  onClick={() => setShowSignupModal(true)}
                  className="group relative px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl shadow-tech-lg hover:shadow-tech-xl transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Monitor className="w-5 h-5" />
                  הרשמה לקבוצות
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.a 
                  href="https://wa.me/972545886779"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-white border-2 border-primary-300 text-primary-700 font-semibold text-lg rounded-xl shadow-tech hover:shadow-tech-lg transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  דברו איתי בוואטסאפ
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Animation/Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative">
                {/* Tech Elements */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-blue-600" />
                </div>
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-tech-100 rounded-2xl flex items-center justify-center">
                  <Database className="w-8 h-8 text-tech-600" />
                </div>
                <div className="absolute top-1/2 -left-12 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Network className="w-6 h-6 text-primary-600" />
                </div>
                
                <motion.div 
                  className="relative w-96 h-96 lg:w-[450px] lg:h-[450px] bg-white border border-primary-200 rounded-3xl shadow-tech-xl p-8 flex items-center justify-center"
                  style={{ y }}
                >
                  {heroAnimation ? (
                    <Lottie 
                      animationData={heroAnimation} 
                      loop={true}
                      autoplay={true}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <GraduationCap className="w-16 h-16 text-blue-600" />
                      </motion.div>
                      <p className="text-primary-500">טוען אנימציה...</p>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="relative py-24 bg-primary-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "שנות ניסיון" },
              { number: "200+", label: "תלמידים מרוצים" },
              { number: "95%", label: "שיפור בציונים" },
              { number: "100%", label: "שביעות רצון הורים" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white rounded-2xl p-8 shadow-tech"
              >
                <div className="text-4xl font-black text-blue-600 mb-2">{stat.number}</div>
                <div className="text-primary-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-tech-border opacity-20 rounded-3xl"></div>
                <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-tech-xl border border-primary-200">
                  <img 
                    src="/images/ilanit.png" 
                    alt="אילנית - מאמנת לימודית" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary-900/10"></div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="bg-white border border-primary-200 rounded-3xl p-10 shadow-tech-lg">
                <h2 className="text-4xl lg:text-5xl font-black text-primary-900 mb-8">
                  היי, שמי אילנית
                </h2>
                
                <div className="text-lg text-primary-600 leading-relaxed space-y-6">
                  <p>
                    איך הגעתי לשם? האמת שתמיד הייתי שם<br />
                    זכיתי במקצוע רואת חשבון, אבל הלב שלי תמיד היה עם ילדים ונוער.
                  </p>
                  <p>
                    במשך יותר מ־15 שנה לימדתי שיעורים פרטיים במקביל לעבודה במשרד.
                  </p>
                  <p>
                    ואז, אחרי ה־7 באוקטובר, קיבלתי החלטה לעזוב את המסלול הבטוח, ולהתמקד במה שאני באמת אוהבת - העצמה והדרכה חווייתית לילדים ונוער.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <p className="font-semibold text-blue-700">
                      היום אני מאמנת לימודית, בעלת הסמכה בהוראה מתקנת בשפה וחשבון (ובתקופה הקרובה גם אבחון דידקטי), בעלת הסמכה בהכנה לכיתות א׳.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Belief Section */}
      <section 
        ref={beliefRef}
        className="relative py-24 bg-primary-50"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={beliefInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="bg-white border border-primary-200 rounded-3xl p-16 shadow-tech-xl relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-8 right-8 w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-blue-600" />
              </div>
              <div className="absolute bottom-8 left-8 w-16 h-16 bg-tech-50 rounded-full flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-tech-600" />
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black text-primary-900 mb-8">
                אני מאמינה
              </h2>
              
              <p className="text-2xl lg:text-3xl text-primary-700 font-medium leading-relaxed max-w-4xl mx-auto">
                אני מאמינה שילדים לא צריכים רק עוד שיעור. הם צריכים מקום שבו הם מרגישים טוב עם עצמם, להאמין שהם יכולים, ולגלות שהלמידה יכולה להיות גם חוויה מהנה.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-center text-primary-900 mb-16"
          >
            מה תמצאו אצלי?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white border border-primary-200 rounded-3xl p-8 shadow-tech hover:shadow-tech-hover transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-${service.color}-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary-900 mb-4 text-center">
                    {service.title}
                  </h3>
                  
                  <p className="text-primary-600 leading-relaxed text-center">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 bg-primary-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-center text-primary-900 mb-16"
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
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              pagination={{ 
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !bg-primary-300',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-600'
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false
              }}
              className="pb-16"
            >
              {processSteps.map((step, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-primary-200 rounded-3xl p-8 shadow-tech h-80 flex flex-col justify-center items-center text-center"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                      <step.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-primary-900 mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-primary-600 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation */}
            <div className="swiper-button-prev !text-blue-600 !left-0 !top-1/2 -translate-y-1/2 !w-12 !h-12 !bg-white !rounded-full !shadow-tech after:!text-lg"></div>
            <div className="swiper-button-next !text-blue-600 !right-0 !top-1/2 -translate-y-1/2 !w-12 !h-12 !bg-white !rounded-full !shadow-tech after:!text-lg"></div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white border border-primary-200 rounded-3xl p-16 shadow-tech-xl text-center relative"
          >
            <div className="absolute top-8 right-8 text-6xl text-blue-300">"</div>
            <div className="absolute bottom-8 left-8 text-6xl text-blue-300">"</div>
            
            <p className="text-2xl lg:text-3xl text-primary-700 font-medium leading-relaxed mb-8">
              "אילנית לא רק לימדה את הבת שלי מתמטיקה, היא החזירה לה את הביטחון העצמי. היא מגיעה עכשיו לשיעורים בחיוך ואומרת שמתמטיקה זה כיף! תודה אילנית על הסבלנות והאהבה שאת נותנת לכל ילד."
            </p>
            
            <p className="text-lg text-blue-600 font-semibold mb-6">
              - אמא של נועה, כיתה ו'
            </p>
            
            <div className="flex justify-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 bg-primary-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-white mb-12"
          >
            מזמינה אתכם להצטרף לקבוצות שבהן לומדים – וגם מאמינים בעצמם
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button 
              onClick={() => setShowSignupModal(true)}
              className="group px-12 py-6 bg-blue-600 text-white font-bold text-xl rounded-xl shadow-tech-lg hover:shadow-tech-xl transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CheckCircle className="w-6 h-6" />
              הרשמה לקבוצות
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.a 
              href="https://wa.me/972545886779"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-12 py-6 bg-white text-primary-900 font-bold text-xl rounded-xl shadow-tech-lg hover:shadow-tech-xl transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-6 h-6" />
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-tech-xl border border-primary-200 max-h-[90vh] overflow-y-auto"
            >
              <motion.button
                onClick={() => setShowSignupModal(false)}
                className="absolute top-4 left-4 w-10 h-10 bg-primary-100 hover:bg-primary-200 rounded-full flex items-center justify-center text-primary-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-2xl font-black text-primary-900 mb-2">
                  הרשמה לקבוצות למידה
                </h3>
                <p className="text-primary-600">מלאו את הפרטים ואילנית תיצור איתכם קשר בהקדם</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Parent Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 font-bold">
                    <User className="w-5 h-5" />
                    <span>פרטי ההורה</span>
                  </div>
                  
                  <div>
                    <label className="block text-primary-700 font-semibold mb-2">שם מלא</label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-primary-900"
                      placeholder="שם ההורה"
                    />
                  </div>

                  <div>
                    <label className="block text-primary-700 font-semibold mb-2">טלפון נייד</label>
                    <input
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-primary-900"
                      placeholder="05XXXXXXXX"
                      pattern="05[0-9]{8}"
                    />
                  </div>
                </div>

                {/* Child Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-tech-600 font-bold">
                    <Baby className="w-5 h-5" />
                    <span>פרטי הילד/ה</span>
                  </div>
                  
                  <div>
                    <label className="block text-primary-700 font-semibold mb-2">שם הילד/ה</label>
                    <input
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-primary-900"
                      placeholder="שם הילד/ה"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-primary-700 font-semibold mb-2">גיל</label>
                      <select
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-primary-900"
                      >
                        <option value="">בחר גיל</option>
                        {Array.from({ length: 13 }, (_, i) => i + 5).map(age => (
                          <option key={age} value={age}>{age}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-primary-700 font-semibold mb-2">כיתה</label>
                      <select
                        name="childGrade"
                        value={formData.childGrade}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-primary-900"
                      >
                        <option value="">בחר כיתה</option>
                        <option value="גן">גן</option>
                        <option value="כיתה א">כיתה א'</option>
                        <option value="כיתה ב">כיתה ב'</option>
                        <option value="כיתה ג">כיתה ג'</option>
                        <option value="כיתה ד">כיתה ד'</option>
                        <option value="כיתה ה">כיתה ה'</option>
                        <option value="כיתה ו">כיתה ו'</option>
                        <option value="כיתה ז">כיתה ז'</option>
                        <option value="כיתה ח">כיתה ח'</option>
                        <option value="כיתה ט">כיתה ט'</option>
                        <option value="כיתה י">כיתה י'</option>
                        <option value="כיתה יא">כיתה יא'</option>
                        <option value="כיתה יב">כיתה יב'</option>
                      </select>
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-tech-lg hover:shadow-tech-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      שולח...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      שלח פרטים
                    </>
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

export default LandingPageTech;

