import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotherSolvingMath3D from "@/components/MotherSolvingMath3D";

const exampleUser = {
  full_name: "Wobyeb Graphlain",
  email: "wobyeb@ebsaeafrica.org",
  role: "teacher"
};

const Home = () => {
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.5 }
    })
  };

  const features = [
    {
      title: "AI-Generated Lesson Plans",
      description: "Create structured lesson plans aligned with the Cameroon primary math curriculum",
      icon: "✏️"
    },
    {
      title: "Student Work Analysis",
      description: "Upload photos of student work for AI analysis and feedback",
      icon: "📝"
    },
    {
      title: "Math Error Analysis",
      description: "Identify specific errors and get practical remediation strategies",
      icon: "🔍"
    },
    {
      title: "Performance Tracking",
      description: "Weekly summaries to track student progress and identify trends",
      icon: "📊"
    }
  ];

  const testimonials = [
    {
      quote: "Math Mama Mentor has transformed how I teach mathematics - the AI-generated lesson plans save me hours of preparation time.",
      author: "Mrs. Nkeng, Primary School Teacher"
    },
    {
      quote: "As a parent, I can now understand my child's math difficulties and help them improve with the suggested remediation activities.",
      author: "Mama Josephine, Parent"
    }
  ];

  const handleGetStarted = () => {
    navigate("/sign-up"); // Redirect to signup page
  };

  return (
    <div className="min-h-screen flex flex-col bg-mama-light">
      <Header />
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col md:flex-row items-center justify-between p-4 md:p-12 overflow-hidden bg-gradient-to-br from-mama-purple/10 to-[#e0218a]/10 animate-fade-in">
        {/* Animated SVG Blobs */}
        <svg className="absolute -top-32 -left-32 w-[400px] h-[400px] z-0 animate-float-slow" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="blob1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientTransform="rotate(45)">
              <stop offset="0%" stopColor="#a259c1" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#e0218a" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="200" rx="180" ry="160" fill="url(#blob1)" />
        </svg>
        <svg className="absolute -bottom-40 -right-40 w-[400px] h-[400px] z-0 animate-float-slow2" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="blob2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientTransform="rotate(-30)">
              <stop offset="0%" stopColor="#e0218a" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#a259c1" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="200" rx="170" ry="150" fill="url(#blob2)" />
        </svg>
        <motion.div 
          className="md:w-1/2 z-10 mb-8 md:mb-0"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in-up bg-gradient-to-r from-mama-purple via-pink-500 to-[#e0218a] bg-clip-text text-transparent">
            <span className="font-extrabold">Mothers for Mathematics</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-xl animate-fade-in-up">
            Empowering teachers and parents in Cameroon with AI-assisted mathematics education.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-mama-purple hover:bg-mama-purple/90 shadow-lg transition-transform duration-200 hover:scale-105 animate-bounce-in" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>
        </motion.div>
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={1}
        >
          <div className="relative w-full max-w-md animate-fade-in">
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-mama-purple to-[#e0218a] opacity-75 blur"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-2xl border-2 border-mama-purple/10">
              <div className="w-full h-56 flex items-center justify-center mb-4">
                <MotherSolvingMath3D />
              </div>
              <div className="bg-mama-light p-4 rounded border border-mama-purple/20 animate-fade-in-up">
                <h3 className="font-semibold mb-2 text-mama-purple">Try asking:</h3>
                <ul className="text-sm space-y-2">
                  <li className="italic cursor-pointer hover:text-mama-purple transition-colors" onClick={() => handleGetStarted()}>"Give me a lesson on Sets and Logic for Class 1"</li>
                  <li className="italic cursor-pointer hover:text-mama-purple transition-colors" onClick={() => handleGetStarted()}>"Create a math exercise about counting to 20"</li>
                  <li className="italic cursor-pointer hover:text-mama-purple transition-colors" onClick={() => handleGetStarted()}>"Upload a photo of student work for analysis"</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-mama-purple/10 rounded-full blur-3xl animate-fade-in"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#e0218a]/10 rounded-full blur-3xl animate-fade-in"></div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-20 px-4 bg-gradient-to-r from-mama-purple/5 via-white to-[#e0218a]/5 relative overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-mama-purple via-pink-500 to-[#e0218a] bg-clip-text text-transparent drop-shadow-lg animate-gradient-x"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            How Math Mama Mentor Works
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="group bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-mama-purple/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7, type: 'spring' }}
              >
                <div className="flex items-center justify-center mb-6">
                  <span className="text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-125">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-mama-purple group-hover:text-[#e0218a] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {feature.description}
                </p>
                {/* Animated gradient border effect */}
                <span className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-mama-purple/40 group-hover:animate-pulse-gradient"></span>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Animated background blobs */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-mama-purple/10 rounded-full blur-3xl animate-float-slow z-0"></div>
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-[#e0218a]/10 rounded-full blur-3xl animate-float-slow2 z-0"></div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-4 bg-mama-purple/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-mama-purple"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            What Our Users Say
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-md"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={index * 0.2 + 0.5}
              >
                <p className="text-lg italic mb-6">{testimonial.quote}</p>
                <p className="font-semibold text-mama-purple">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-mama-purple to-[#e0218a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            Ready to Transform Mathematics Education?
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8 opacity-90"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0.2}
          >
            Join teachers and parents across Cameroon in using AI to enhance mathematics learning
          </motion.p>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0.4}
          >
            <Button size="lg" className="bg-white text-mama-purple hover:bg-gray-100" onClick={handleGetStarted}>
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
