
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView, Variants } from 'framer-motion';
import { 
  Menu, X, Rocket, Github, Twitter, Send, 
  Terminal, Code2, Cpu, Eye, Download, Sparkles, 
  Layers, MessageSquare, Zap, RefreshCcw, AlertTriangle,
  ArrowLeft, Tag, Activity, ShieldCheck, Coins
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import ParticleBackground from './components/ParticleBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';

// --- Glitch Animation Variants ---
// Added Variants type to fix inferred string errors in transitions
const glitchTransition: Variants = {
  initial: { 
    opacity: 0,
    x: 0,
    skewX: 0,
    filter: 'hue-rotate(0deg) brightness(100%)',
    clipPath: 'inset(0 0 0 0)'
  },
  animate: { 
    opacity: 1,
    x: 0,
    skewX: 0,
    filter: 'hue-rotate(0deg) brightness(100%)',
    clipPath: 'inset(0 0 0 0)',
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: [1, 0.8, 0.9, 0.5, 0],
    x: [0, -20, 20, -10, 0],
    skewX: [0, 10, -10, 5, 0],
    filter: [
      'hue-rotate(0deg) brightness(100%)',
      'hue-rotate(90deg) brightness(150%)',
      'hue-rotate(-90deg) brightness(200%)',
      'hue-rotate(180deg) brightness(120%)',
      'hue-rotate(0deg) brightness(100%)'
    ],
    clipPath: [
      'inset(10% 0 30% 0)',
      'inset(40% 0 10% 0)',
      'inset(0% 20% 0% 10%)',
      'inset(80% 0 5% 0)',
      'inset(0 0 0 0)'
    ],
    transition: {
      duration: 0.5,
      times: [0, 0.2, 0.4, 0.6, 1],
      ease: "easeInOut"
    }
  }
};

// Added Variants type and fixed "power4.out" which is not a standard Framer Motion easing
const enterGlitch: Variants = {
  initial: {
    opacity: 0,
    x: [20, -20, 10, 0],
    skewX: [20, -20, 0],
    filter: 'hue-rotate(120deg) contrast(200%)',
  },
  animate: {
    opacity: 1,
    x: 0,
    skewX: 0,
    filter: 'hue-rotate(0deg) contrast(100%)',
    transition: {
      duration: 0.5,
      ease: "circOut"
    }
  }
};

// --- Vanta Background Components ---
const HeroVanta: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current && (window as any).VANTA) {
      const effect = (window as any).VANTA.HALO({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        baseColor: 0x31326f,
        backgroundColor: 0x1a1b3b,
        amplitudeFactor: 1.5,
        size: 1.5
      });
      setVantaEffect(effect);
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="absolute inset-0 z-0 opacity-60 pointer-events-none" />;
};

const VisionVanta: React.FC = () => {
  const visionVantaRef = useRef<HTMLDivElement>(null);
  const [visionEffect, setVisionEffect] = useState<any>(null);

  useEffect(() => {
    if (!visionEffect && visionVantaRef.current && (window as any).VANTA) {
      const effect = (window as any).VANTA.GLOBE({
        el: visionVantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.50,
        scaleMobile: 1.20,
        color: 0x4fb7b3,
        backgroundColor: 0x050505,
        size: 1.1
      });
      setVisionEffect(effect);
    }
    return () => {
      if (visionEffect) visionEffect.destroy();
    };
  }, [visionEffect]);

  return <div ref={visionVantaRef} className="absolute inset-0 z-0 opacity-60 pointer-events-none" />;
};

// --- Typewriter Code Component ---
const TypewriterCode: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState("");
  const fullCode = `export const websiteBuilderPrompt = ai.definePrompt({
  name: 'websiteBuilderPrompt',
  prompt: \`You are an expert developer...

**USER'S REQUEST:**
"{{{prompt}}}"

**CURRENT PROJECT FILES:**
{{#each files}}
  \`\`\`{{name}}
  {{{content}}}
  \`\`\`
{{/each}}

**OUTPUT INSTRUCTIONS:**
JSON with "files" and "message".
\`,
});`;

  useEffect(() => {
    if (isInView) {
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx <= fullCode.length) {
          setDisplayText(fullCode.slice(0, currentIdx));
          currentIdx++;
        } else {
          clearInterval(interval);
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [isInView, fullCode]);

  const highlightCode = (code: string) => {
    const parts = code.split(/(\bexport\b|\bconst\b|\bai\b|\bdefinePrompt\b|'.*?'|`[\s\S]*?`|\{|\}|\(|\)|:)/g);
    
    return parts.map((part, i) => {
      if (part === 'export' || part === 'const') return <span key={i} style={{ color: '#c678dd' }}>{part}</span>;
      if (part === 'ai' || part === 'definePrompt') return <span key={i} style={{ color: '#61afef' }}>{part}</span>;
      if (part.startsWith("'") && part.endsWith("'")) return <span key={i} style={{ color: '#98c379' }}>{part}</span>;
      if (part.startsWith("`")) return <span key={i} style={{ color: '#d19a66' }}>{part}</span>;
      if (['{', '}', '(', ')'].includes(part)) return <span key={i} style={{ color: '#abb2bf' }}>{part}</span>;
      if (part === ':') return <span key={i} style={{ color: '#abb2bf' }}>{part}</span>;
      return part;
    });
  };

  return (
    <div ref={containerRef} className="p-4 sm:p-12 overflow-x-auto min-h-[300px]">
      <pre className="font-mono text-[9px] sm:text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
        {highlightCode(displayText)}
        {/* Fixed "steps(2)" as it is not a valid Framer Motion easing string */}
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-2 h-4 bg-[#a8fbd3] ml-1 align-middle"
        />
      </pre>
    </div>
  );
};

// --- 3D Tilt Component ---
const TiltImage: React.FC<{ 
  src: string; 
  bgSrc?: string; 
  alt: string; 
  className?: string; 
  removeBg?: boolean;
  isComposite?: boolean;
}> = ({ src, bgSrc, alt, className = "", removeBg = false, isComposite = false }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group perspective-1000 flex items-center justify-center ${className}`}
    >
      <motion.div
        style={{ transform: "translateZ(80px)" }}
        className={`w-full h-full relative rounded-2xl overflow-hidden transition-all duration-500 ${!removeBg ? 'border border-white/20 shadow-2xl bg-black' : 'bg-transparent'}`}
      >
        {bgSrc && (
          <img 
            src={bgSrc} 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-lighten"
          />
        )}
        <div className={`relative w-full h-full flex items-center justify-center p-4 md:p-8 ${isComposite ? 'z-10' : ''}`}>
          <img 
            src={src} 
            alt={alt} 
            className={`w-full h-full transition-transform duration-500 group-hover:scale-110 
              ${removeBg ? 'mix-blend-screen object-contain drop-shadow-[0_0_40px_rgba(79,183,179,0.9)]' : 'object-cover'}`} 
          />
        </div>
        {!removeBg && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        className="absolute w-[95%] h-[95%] bg-[#4fb7b3] rounded-full blur-[130px] pointer-events-none -z-10"
      />
    </motion.div>
  );
};

const HoverTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <motion.h2 
      whileHover={{ scale: 1.02, letterSpacing: "0.05em" }}
      className={`cursor-default transition-all duration-300 font-heading font-bold uppercase ${className}`}
    >
      {children}
    </motion.h2>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleLaunchBuilder = () => {
    setIsBuilderOpen(true);
    setMobileMenuOpen(false);
  };

  const handleBackToWebsite = () => {
    setIsBuilderOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || isBuilderOpen ? 'hidden' : 'auto';
  }, [mobileMenuOpen, isBuilderOpen]);

  const navItems = ['Vision', 'Flow', 'Tokenomics', 'Features', 'Chart', 'Code'];

  return (
    <div className="relative min-h-screen text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {!isBuilderOpen ? (
          <motion.div
            key="website"
            variants={glitchTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative"
          >
            <FluidBackground />
            
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[70] flex items-center justify-between px-6 md:px-12 py-4 md:py-6 mix-blend-difference">
              <div 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-heading text-lg md:text-2xl font-bold tracking-tighter text-white cursor-pointer z-[70]"
              >
                AGIXCLOUD
              </div>
              
              <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase items-center">
                {navItems.map((item) => (
                  <button 
                    key={item} 
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="hover:text-[#a8fbd3] transition-colors text-white cursor-pointer bg-transparent border-none"
                    data-hover="true"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-4 text-white/70">
                  <a href="https://t.me/AgixCloudAI" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" data-hover="true"><Send className="w-5 h-5" /></a>
                  <a href="https://x.com/AgixCloud" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" data-hover="true"><Twitter className="w-5 h-5" /></a>
                  <a href="https://github.com/agixcloud/Agix-cloud-Ai-Builder" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" data-hover="true"><Github className="w-5 h-5" /></a>
                </div>
                <button 
                  onClick={handleLaunchBuilder}
                  className="border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent" 
                  data-hover="true"
                >
                  Launch Builder
                </button>
              </div>

              <button className="md:hidden text-white z-[80] relative w-10 h-10 flex items-center justify-center bg-black/40 rounded-full backdrop-blur-md border border-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden p-8"
                >
                  <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
                    {navItems.map((item, idx) => (
                      <motion.button
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="text-3xl sm:text-4xl font-heading font-black tracking-tighter uppercase text-white hover:text-[#a8fbd3] transition-colors"
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                  <button 
                    onClick={handleLaunchBuilder}
                    className="w-full bg-white text-black py-4 font-heading font-black tracking-widest uppercase text-sm mt-8"
                  >
                    Launch Builder
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hero */}
            <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4 md:px-8">
              <HeroVanta />
              <ParticleBackground />
              <div className="absolute inset-0 bg-black/20 z-[1] pointer-events-none" />
              <motion.div style={{ y, opacity }} className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-8 md:pb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 md:gap-6 text-[10px] md:text-base font-mono text-[#a8fbd3] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 bg-black/40 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-2xl">
                  <span>Ai</span>
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#4fb7b3] rounded-full animate-pulse"/>
                  <span>Web Builder</span>
                </motion.div>
                <div className="relative w-full flex justify-center items-center px-4">
                  <GradientText 
                    text="AGIXCLOUD" 
                    as="h1" 
                    className="text-[13vw] sm:text-[12vw] md:text-[11vw] leading-[0.85] font-black tracking-tighter text-center" 
                  />
                </div>
                <motion.div 
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 1.2, ease: "circOut" }}
                  className="flex items-center gap-4 w-full max-w-[180px] sm:max-w-xs md:max-w-md my-4 md:my-6"
                >
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#4fb7b3] to-[#a8fbd3]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a8fbd3] shadow-[0_0_12px_#a8fbd3] flex-shrink-0 animate-pulse" />
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#4fb7b3] to-[#a8fbd3]" />
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-xs sm:text-base md:text-2xl font-light max-w-xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-6 mt-2 md:mt-4">
                  Agix Cloud Ai transforms your words into code. Build, modify, and deploy websites through natural, conversational language.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mt-8 md:mt-16 w-full flex justify-center px-6">
                  <button 
                    onClick={handleLaunchBuilder}
                    className="group relative w-full sm:w-auto px-10 md:px-14 py-4 md:py-5 bg-white text-black font-heading font-black tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,251,211,0.5)] cursor-pointer text-xs sm:text-sm" 
                    data-hover="true"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">Launch Builder <Rocket className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  </button>
                </motion.div>
              </motion.div>
            </header>

            {/* Marquee */}
            <div className="relative z-30 w-full py-4 md:py-10 bg-white text-black overflow-hidden border-y-[4px] sm:border-y-[6px] border-black">
              <motion.div className="flex w-fit whitespace-nowrap" animate={{ x: "-50%" }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="text-xl sm:text-4xl md:text-7xl font-heading font-black px-6 sm:px-12 flex items-center gap-4 sm:gap-8">
                    AI WEB BUILDER <span className="text-black text-lg sm:text-3xl md:text-5xl">●</span> 
                    AGIXCLOUD 2026 <span className="text-black text-lg sm:text-3xl md:text-5xl">●</span> 
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Vision Section */}
            <section id="vision" className="relative z-10 py-16 md:py-48 px-6 md:px-16 bg-black overflow-hidden">
              <VisionVanta />
              <div className="max-w-7xl mx-auto relative z-10">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 gap-10 md:gap-24 items-center">
                  <div className="text-left">
                    <HoverTitle className="text-2xl sm:text-4xl md:text-7xl mb-6 md:mb-10 leading-[1.1] tracking-tighter">
                      Our Vision: <br/> <span className="text-[#a8fbd3]">The Future</span> of Creation
                    </HoverTitle>
                    <div className="space-y-4 md:space-y-6 text-sm sm:text-lg md:text-xl text-white/80 font-light leading-relaxed">
                      <p>In the digital age, the ability to create on the web is a fundamental form of expression. Yet, for millions, the barrier of technical complexity remains too high.</p>
                      <p>Agix Cloud AI was born to bridge this gap. We envision a world where anyone can translate their ideas into professional websites through conversational language.</p>
                      <p>Our platform is more than just a tool; it's an AI that understands context, iterates on feedback, and handles the complexities of modern development, freeing you to focus on your vision.</p>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                </motion.div>
              </div>
            </section>

            {/* Flow Section */}
            <section id="flow" className="relative z-10 py-16 md:py-48 px-6 md:px-16 bg-black/20 backdrop-blur-sm overflow-hidden">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 md:mb-32">
                  <HoverTitle className="text-3xl sm:text-6xl md:text-9xl mb-4 tracking-tighter">THE FLOW</HoverTitle>
                  <p className="text-[#4fb7b3] font-mono uppercase tracking-[0.2em] md:tracking-[0.4em] text-[9px] sm:text-xs">Conversational Development</p>
                </div>
                <div className="space-y-16 sm:space-y-24 md:space-y-56">
                  {[
                    { id: '01', title: 'The Prompt', desc: 'Describe your goal in plain English—"Create a minimalist portfolio with a dark theme." This is the seed of creation.', icon: MessageSquare, img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop' },
                    { id: '02', title: 'AI Analysis', desc: 'The AI analyzes your prompt alongside the entire project structure. It understands context to determine the right updates.', icon: Cpu, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop' },
                    { id: '03', title: 'Generation', desc: 'The AI determines the optimal set of changes across HTML, CSS, and JS simultaneously for precise modifications.', icon: Code2, img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop' },
                    { id: '04', title: 'Feedback', desc: 'Instant results. The file tree is updated and the live preview refreshes in real-time. Immediate loop for rapid dev.', icon: Eye, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop' },
                    { id: '05', title: 'Iteration', desc: 'Continue the conversation to refine: "Make the header sticky," or "Animate the title." Context is always preserved.', icon: RefreshCcw, img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop' }
                  ].map((step, i) => (
                    <motion.div key={step.id} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-20 items-center`}>
                      <div className="flex-1 text-left w-full">
                        <span className="text-4xl sm:text-7xl md:text-[10rem] font-heading font-black opacity-10 mb-2 md:mb-6 block leading-none">{step.id}</span>
                        <div className="flex items-center gap-3 md:gap-6 mb-3 md:mb-8">
                          <step.icon className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 text-[#a8fbd3] flex-shrink-0" />
                          <HoverTitle className="text-xl sm:text-3xl md:text-6xl tracking-tighter">{step.title}</HoverTitle>
                        </div>
                        <p className="text-sm sm:text-lg md:text-2xl text-white/70 leading-relaxed font-light">{step.desc}</p>
                      </div>
                      <div className="flex-1 w-full relative group">
                         <div className="absolute -inset-4 bg-[#a8fbd3]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                         <TiltImage src={step.img} alt={step.title} className="w-full h-[200px] sm:h-[350px] md:h-[550px]" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tokenomics Section */}
            <section id="tokenomics" className="relative z-10 py-16 md:py-48 px-6 md:px-16 bg-black overflow-hidden border-y border-white/5">
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12 md:mb-32">
                  <HoverTitle className="text-3xl sm:text-6xl md:text-9xl mb-4 tracking-tighter">TOKENOMICS</HoverTitle>
                  <p className="text-[#a8fbd3] font-mono uppercase tracking-[0.2em] md:tracking-[0.4em] text-[9px] sm:text-xs">Economy of the Future</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                  {[
                    { label: 'NAME', value: 'Agix Cloud Ai', icon: Tag },
                    { label: 'TICKER', value: '$AGIXAI', icon: Activity },
                    { label: 'CONTRACT', value: 'REVOKED', icon: ShieldCheck },
                    { label: 'SUPPLY', value: '1,000,000,000', icon: Coins }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl group hover:border-[#a8fbd3]/50 transition-all duration-500"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="w-3 h-3 text-[#a8fbd3] opacity-50 group-hover:opacity-100 transition-opacity" />
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{item.label}</p>
                      </div>
                      <p className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-[#a8fbd3] transition-colors">{item.value}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="mt-12 md:mt-20 p-8 md:p-12 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-3xl backdrop-blur-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <Zap className="w-32 h-32 text-[#a8fbd3]" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-mono text-[#a8fbd3] uppercase tracking-[0.3em] mb-4">Official Contract Address</p>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="relative w-full group/tooltip">
                        <code className="text-xs sm:text-sm md:text-2xl font-mono text-white break-all bg-black/40 p-4 md:p-6 rounded-xl border border-white/5 w-full block cursor-help">
                          ESDZu5jUmh1MaH7kq4PX4joVPmf61qNy3LstUXoNpump
                        </code>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 bg-white text-black text-[10px] font-mono rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl z-50">
                          FULL ADDRESS: ESDZu5jUmh1MaH7kq4PX4joVPmf61qNy3LstUXoNpump
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: "#a8fbd3" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          navigator.clipboard.writeText('ESDZu5jUmh1MaH7kq4PX4joVPmf61qNy3LstUXoNpump');
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="whitespace-nowrap px-8 py-4 bg-white text-black font-heading font-bold uppercase tracking-widest text-xs transition-colors rounded-xl flex items-center gap-2"
                      >
                        {copied ? (
                          <>
                            <Sparkles className="w-4 h-4" />
                            COPIED!
                          </>
                        ) : (
                          'Copy Address'
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4fb7b3]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a8fbd3]/10 rounded-full blur-[120px]" />
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-16 md:py-48 px-6 md:px-16 bg-white text-black">
              <div className="max-w-7xl mx-auto">
                <div className="mb-12 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                  <HoverTitle className="text-3xl sm:text-5xl md:text-8xl uppercase leading-[0.9] tracking-tighter">Creative <br/>Toolkit</HoverTitle>
                  <p className="max-w-md text-sm sm:text-lg md:text-xl opacity-70 font-medium leading-relaxed">Simply describe the website you want to build, and our AI handles the technical heavy lifting.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { icon: Zap, title: 'AI Refactoring', desc: 'Improve code with a click. Convert CSS to Tailwind or optimize performance.' },
                    { icon: Terminal, title: 'Code Explanation', desc: "Don't understand a piece of code? Let the AI explain it in plain English." },
                    { icon: Layers, title: 'Live Preview', desc: 'No more switching between editor and browser. See changes reflected instantly.' },
                    { icon: Download, title: 'Full Ownership', desc: 'Never locked in. Download a complete, clean ZIP file of your entire project.' }
                  ].map((feat, i) => (
                    <motion.div key={i} whileHover={{ y: -8, backgroundColor: "#000", color: "#fff" }} className="p-6 md:p-12 border-[2px] md:border-4 border-black group transition-all duration-300 h-full flex flex-col">
                      <feat.icon className="w-8 h-8 md:w-14 md:h-14 mb-6 md:mb-8 transition-transform duration-500 group-hover:scale-110" />
                      <h4 className="text-lg md:text-2xl font-heading font-bold mb-3 md:mb-8 leading-tight break-words">{feat.title}</h4>
                      <p className="text-xs md:text-base opacity-70 leading-relaxed flex-1">{feat.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Live Chart Section */}
            <section id="chart" className="relative z-10 py-16 md:py-24 px-6 md:px-16 bg-black">
              <div className="max-w-7xl mx-auto">
                <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <HoverTitle className="text-3xl sm:text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter">Live <br/>Market</HoverTitle>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/80 uppercase">Real-time Feed Active</span>
                  </div>
                </div>
                <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
                  <style dangerouslySetInnerHTML={{ __html: `
                    #dexscreener-embed{position:relative;width:100%;padding-bottom:125%;}
                    @media(min-width:1400px){#dexscreener-embed{padding-bottom:65%;}}
                    #dexscreener-embed iframe{position:absolute;width:100%;height:100%;top:0;left:0;border:0;}
                  ` }} />
                  <div id="dexscreener-embed">
                    <iframe 
                      src="https://dexscreener.com/solana/2sN5M18oXLe2vuvHHjTK5tM98f5dK21xrDKuE7fKkpNZ?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
                      title="DexScreener Live Chart"
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>

            {/* Code Section */}
            <section id="code" className="relative z-10 py-16 md:py-48 px-6 md:px-16 bg-[#1a1b3b]">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-24 items-center">
                  <div className="text-left">
                     <HoverTitle className="text-2xl sm:text-4xl md:text-7xl mb-6 md:mb-10 leading-[1.1] tracking-tighter">Under <br/>The Hood</HoverTitle>
                     <p className="text-sm sm:text-lg md:text-xl text-white/60 font-light leading-relaxed mb-6 md:mb-8">
                       The heart of our platform is the Genkit flow. The prompt is carefully engineered to provide the AI with context and strict guidelines for its output.
                     </p>
                  </div>
                  <div className="bg-black/60 rounded-xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-2 p-3 sm:p-4 bg-white/5 border-b border-white/10">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      <span className="ml-2 text-[8px] sm:text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">websiteBuilderPrompt.ts</span>
                    </div>
                    <TypewriterCode />
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 py-12 md:py-24 bg-black">
              <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
                <div className="flex flex-col items-center md:items-start">
                   <div className="font-heading text-2xl md:text-4xl font-bold tracking-tighter mb-2">AGIXCLOUD</div>
                   <p className="text-white/40 text-[9px] md:text-xs font-mono uppercase tracking-[0.3em]">The Future of Web Creation — 2026</p>
                </div>
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 font-mono text-[9px] md:text-xs uppercase tracking-[0.2em]">
                  <a href="https://github.com/agixcloud/Agix-cloud-Ai-Builder" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">Github</a>
                  <a href="https://x.com/AgixCloud" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#a8fbd3] transition-colors">Twitter</a>
                  <a href="https://t.me/AgixCloudAI" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#a8fbd3] transition-colors">Telegram</a>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="builder"
            variants={glitchTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col"
          >
            {/* Floating Back Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToWebsite}
              className="fixed top-6 left-6 z-[10000] flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-[#a8fbd3] group-hover:-translate-x-1 transition-transform" />
              <span className="font-heading font-bold text-[10px] tracking-widest uppercase text-white">Back to Website</span>
            </motion.button>

            {/* Studio Iframe */}
            <iframe 
              src="https://ai-website-builder-184681924464.us-west1.run.app/"
              className="w-full h-full border-none shadow-2xl"
              title="AGIXCLOUD Studio"
              allow="camera; microphone; geolocation"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
