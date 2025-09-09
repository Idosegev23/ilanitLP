import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Lottie from 'lottie-react';
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
  Baby
} from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const LandingPage = () => {
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
  const [submitMessage, setSubmitMessage] = useState('');

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
      setSubmitMessage('מספר הטלפון חייב להתחיל ב-05 ולכלול 10 ספרות');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('https://hook.eu2.make.com/fyjhdrxdlc60se4nry8ux0i3xy6qb84b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('הפרטים נשלחו בהצלחה! אילנית תיצור איתכם קשר בקרוב.');
        setFormData({
          parentName: '',
          parentPhone: '',
          childName: '',
          childAge: '',
          childGrade: ''
        });
        setTimeout(() => {
          setShowSignupModal(false);
          setSubmitMessage('');
        }, 2000);
      } else {
        setSubmitMessage('אירעה שגיאה בשליחת הפרטים. אנא נסו שוב.');
      }
    } catch (error) {
      setSubmitMessage('אירעה שגיאה בשליחת הפרטים. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const services = [
    {
      icon: BookOpen,
      title: "אנגלית - עד כיתה ח'",
      description: "למידת אנגלית בצורה חווייתית ומהנה, עם דגש על דיבור, הבנה וביטחון עצמי בשפה."
    },
    {
      icon: Calculator,
      title: "חשבון ומתמטיקה - מכיתה א' ועד י\"ב",
      description: "בניית יסודות חזקים במתמטיקה, פתרון בעיות ופיתוח חשיבה לוגית ואנליטית."
    },
    {
      icon: GraduationCap,
      title: "הכנה דידקטית וחברתית לכיתה א'",
      description: "הכנה מושלמת לכיתה א' - כישורי קריאה, כתיבה, חשבון וכישורים חברתיים."
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

  return (
    <div className="min-h-screen bg-gradient-hero font-playpen">
      {/* Header with Logo */}
      <motion.header 
        className="bg-gradient-clay backdrop-blur-sm shadow-clay py-6 px-8 lg:px-16 sticky top-0 z-50 rounded-b-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto flex justify-center">
          <img 
            src="/images/logo.png" 
            alt="לב ללמידה - לוגו" 
            className="h-20 w-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden bg-gradient-hero py-16 px-8 lg:py-24 lg:px-16"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp} className="text-center lg:text-right">
              <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                קבוצות למידה חווייתיות במתמטיקה, אנגלית והכנה לכיתה א' 
                <span className="inline-block mr-2">
                  <Star className="inline w-8 h-8 lg:w-12 lg:h-12 text-secondary fill-current" />
                </span>
              </h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg lg:text-xl text-primary/80 mb-8 leading-relaxed"
              >
                היי,<br />
                שמי אילנית.<br />
                לפני שאספר על עצמי, אתחיל מהסוף:<br />
                אני מקדישה את כל כולי ללמד ילדים ולא רק מתמטיקה, חשבון ואנגלית אלא גם ובעיקר להאמין בעצמם, לגלות את החוזקות שלהם, לקבל בטחון, לרכוש הרגלי למידה ולמצוא את הדרך הייחודית שלהם ללמוד, בקצב שלהם.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end"
              >
                <button 
                  onClick={() => setShowSignupModal(true)}
                  className="bg-gradient-primary text-white px-8 py-4 rounded-3xl font-semibold text-lg shadow-clay hover:shadow-clay-hover transition-all duration-300 transform hover:-translate-y-1 active:shadow-clay-inset"
                >
                  הרשמה לקבוצות
                </button>
                <a 
                  href="https://wa.me/972545886779"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-clay text-primary px-8 py-4 rounded-3xl font-semibold text-lg shadow-clay hover:shadow-clay-hover transition-all duration-300 flex items-center justify-center gap-2 active:shadow-clay-inset"
                >
                  <MessageCircle className="w-5 h-5" />
                  דברו איתי בוואטסאפ
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex justify-center lg:justify-start"
            >
              {heroAnimation ? (
                <Lottie 
                  animationData={heroAnimation} 
                  loop={true}
                  autoplay={true}
                  className="w-80 h-80 lg:w-96 lg:h-96"
                />
              ) : (
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-soft rounded-3xl shadow-lg flex items-center justify-center">
                  <div className="text-primary text-center">
                    <GraduationCap className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-lg font-medium">טוען אנימציה...</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Ilanit Section */}
      <motion.section 
        className="py-16 px-8 lg:py-24 lg:px-16 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp} className="order-2 lg:order-1">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-3xl shadow-clay overflow-hidden mx-auto hover:shadow-clay-hover transition-all duration-300">
                <img 
                  src="/images/ilanit.png" 
                  alt="אילנית - מאמנת לימודית" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                היי, שמי אילנית.
              </h2>
              
              <div className="text-lg text-primary/80 leading-relaxed space-y-4">
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
                <p>
                  היום אני מאמנת לימודית, בעלת הסמכה בהוראה מתקנת בשפה וחשבון (ובתקופה הקרובה גם אבחון דידקטי), בעלת הסמכה בהכנה לכיתות א׳.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Belief Section */}
      <motion.section 
        className="py-16 px-8 lg:py-24 lg:px-16 bg-gradient-soft"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-clay rounded-3xl p-12 shadow-clay">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-8">
              אני מאמינה
            </h2>
            <p className="text-xl lg:text-2xl text-primary font-semibold leading-relaxed">
              אני מאמינה שילדים לא צריכים רק עוד שיעור. הם צריכים מקום שבו הם מרגישים טוב עם עצמם, להאמין שהם יכולים, ולגלות שהלמידה יכולה להיות גם חוויה מהנה.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="py-16 px-8 lg:py-24 lg:px-16 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl lg:text-4xl font-bold text-primary text-center mb-12"
          >
            מה תמצאו אצלי?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-clay rounded-3xl p-8 shadow-clay hover:shadow-clay-hover transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-primary mb-6">
                  <service.icon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-primary leading-relaxed text-center font-medium">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section 
        className="py-16 px-8 lg:py-24 lg:px-16 bg-gradient-warm"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl lg:text-4xl font-bold text-primary text-center mb-12"
          >
            איך זה עובד?
          </motion.h2>
          
          <motion.div variants={fadeInUp} className="relative">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              pagination={{ 
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active bg-secondary',
                bulletClass: 'swiper-pagination-bullet bg-accent/40'
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              className="pb-12"
            >
              {processSteps.map((step, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-clay rounded-3xl p-8 shadow-clay hover:shadow-clay-hover h-64 flex flex-col justify-center items-center text-center transition-all duration-300"
                  >
                    <div className="text-primary mb-4">
                      <step.icon className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-dark mb-4">
                      {step.title}
                    </h3>
                    <p className="text-primary leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section 
        className="py-16 px-8 lg:py-24 lg:px-16 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-clay rounded-3xl p-12 shadow-clay text-center relative">
            <div className="absolute top-6 right-8 text-secondary text-6xl font-serif">"</div>
            <div className="absolute bottom-6 left-8 text-secondary text-6xl font-serif">"</div>
            <p className="text-xl lg:text-2xl text-primary-dark font-semibold leading-relaxed mb-6">
              "אילנית לא רק לימדה את הבת שלי מתמטיקה, היא החזירה לה את הביטחון העצמי. היא מגיעה עכשיו לשיעורים בחיוך ואומרת שמתמטיקה זה כיף! תודה אילנית על הסבלנות והאהבה שאת נותנת לכל ילד."
            </p>
            <p className="text-lg text-primary font-medium">
              - אמא של נועה, כיתה ו'
            </p>
            <div className="flex justify-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-secondary fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        className="py-16 px-8 lg:py-24 lg:px-16 bg-gradient-hero"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl lg:text-4xl font-bold text-primary-dark mb-8"
          >
            מזמינה אתכם להצטרף לקבוצות שבהן לומדים – וגם מאמינים בעצמם
          </motion.h2>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-gradient-primary text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-clay hover:shadow-clay-hover transition-all duration-300 transform hover:-translate-y-1 active:shadow-clay-inset"
            >
              הרשמה לקבוצות
            </button>
            <a 
              href="https://wa.me/972545886779"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-clay text-primary px-12 py-6 rounded-3xl font-bold text-xl shadow-clay hover:shadow-clay-hover transition-all duration-300 flex items-center justify-center gap-3 active:shadow-clay-inset"
            >
              <Phone className="w-6 h-6" />
              שיחת היכרות בוואטסאפ
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-clay rounded-3xl p-8 max-w-md w-full shadow-clay relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowSignupModal(false)}
              className="absolute top-4 left-4 text-primary hover:text-primary-dark transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-primary-dark mb-2">הרשמה לקבוצות למידה</h3>
              <p className="text-primary">מלאו את הפרטים ואילנית תיצור איתכם קשר בהקדם</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Parent Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary-dark font-semibold">
                  <User className="w-5 h-5" />
                  <span>פרטי ההורה</span>
                </div>
                
                <div>
                  <label className="block text-primary font-medium mb-2">שם מלא</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-accent/30 focus:border-primary focus:outline-none shadow-clay bg-white text-primary"
                    placeholder="שם ההורה"
                  />
                </div>

                <div>
                  <label className="block text-primary font-medium mb-2">טלפון נייד</label>
                  <input
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-accent/30 focus:border-primary focus:outline-none shadow-clay bg-white text-primary"
                    placeholder="05XXXXXXXX"
                    pattern="05[0-9]{8}"
                  />
                </div>
              </div>

              {/* Child Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary-dark font-semibold">
                  <Baby className="w-5 h-5" />
                  <span>פרטי הילד/ה</span>
                </div>
                
                <div>
                  <label className="block text-primary font-medium mb-2">שם הילד/ה</label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-accent/30 focus:border-primary focus:outline-none shadow-clay bg-white text-primary"
                    placeholder="שם הילד/ה"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-primary font-medium mb-2">גיל</label>
                    <select
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-accent/30 focus:border-primary focus:outline-none shadow-clay bg-white text-primary"
                    >
                      <option value="">בחר גיל</option>
                      {Array.from({ length: 13 }, (_, i) => i + 5).map(age => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-primary font-medium mb-2">כיתה</label>
                    <select
                      name="childGrade"
                      value={formData.childGrade}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-accent/30 focus:border-primary focus:outline-none shadow-clay bg-white text-primary"
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

              {submitMessage && (
                <div className={`text-center p-3 rounded-2xl ${
                  submitMessage.includes('בהצלחה') 
                    ? 'bg-accent-light text-accent-dark' 
                    : 'bg-secondary-light text-secondary-dark'
                }`}>
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary text-white py-4 rounded-2xl font-bold text-lg shadow-clay hover:shadow-clay-hover transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'שולח...' : 'שלח פרטים'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
