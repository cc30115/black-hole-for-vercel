import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BlackHoleShader from './components/BlackHoleShader';

import Entry from './sections/Entry';
import InteractiveModel from './sections/InteractiveModel';
import Simulation from './sections/Simulation';
import Immersive from './sections/Immersive';
import Comparison from './sections/Comparison';
import Education from './sections/Education';
import Quiz from './sections/Quiz';

export type Section = 'entry' | 'model' | 'simulation' | 'immersive' | 'comparison' | 'education' | 'quiz';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('entry');
  const [learningMode, setLearningMode] = useState('basic');

  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const accelerationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const [shaderProps, setShaderProps] = useState({
    rotationSpeed: 0.3,
    diskIntensity: 1.0,
    starsOnly: 0.0,
    tilt: 0.0,
    rotate: 0.0,
    bhCenterX: 0.5,
    bhCenterY: 0.5,
    bhScale: 1.0,
    chromatic: 0.0,
    overdrive: 0.0,
  });

  useEffect(() => {
    switch (currentSection) {
      case 'entry':
        setShaderProps(p => ({ ...p, bhScale: 1.0, bhCenterX: 0.5, bhCenterY: 0.5, tilt: 0.1, rotate: p.rotate, rotationSpeed: 0.2, chromatic: 0.0, starsOnly: 0.0, overdrive: 0.0, diskIntensity: 1.0 }));
        break;
      case 'model':
        setShaderProps(p => ({ ...p, bhScale: 0.7, bhCenterX: 0.7, bhCenterY: 0.5, tilt: 0.2, rotate: 0.0, rotationSpeed: 0.3, chromatic: 0.0, starsOnly: 0.0 }));
        break;
      case 'simulation':
        setShaderProps(p => ({ ...p, bhScale: 1.0, bhCenterX: 0.5, bhCenterY: 0.5, rotate: 0.0, chromatic: 0.0, starsOnly: 0.0 }));
        break;
      case 'immersive':
        setShaderProps(p => ({ ...p, bhScale: 1.0, bhCenterX: 0.5, bhCenterY: 0.5, tilt: 0.0, rotate: 0.0, chromatic: 0.0, starsOnly: 0.0 }));
        break;
      case 'comparison':
        setShaderProps(p => ({ ...p, bhScale: 1.0, bhCenterX: 0.7, bhCenterY: 0.5, tilt: 0.1, rotate: 0.0, rotationSpeed: 0.5, chromatic: 0.0, starsOnly: 0.0 }));
        break;
      case 'education':
      case 'quiz':
        setShaderProps(p => ({ ...p, bhScale: 1.2, bhCenterX: 0.8, bhCenterY: 0.5, tilt: 0.3, rotate: 0.0, rotationSpeed: 0.1, chromatic: 0.0, starsOnly: 1.0 }));
        break;
    }
  }, [currentSection]);

  const navItems = [
    { id: 'model', label: 'Anatomy' },
    { id: 'simulation', label: 'Simulation' },
    { id: 'immersive', label: 'Journey' },
    { id: 'comparison', label: 'Scale' },
    { id: 'education', label: 'Myths' },
    { id: 'quiz', label: 'Quiz' },
  ] as const;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (currentSection !== 'entry') return;
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });

    // Hold-to-accelerate logic
    startTimeRef.current = performance.now();
    
    const animate = () => {
      const elapsed = (performance.now() - startTimeRef.current) / 1000; // in seconds
      const maxTime = 6.5; // Reduced by 35% from 10s
      const initialSpeed = 0.2;
      const maxSpeed = 7.5;
      
      // Calculate new speed (clamped to maxSpeed)
      const t = Math.min(elapsed / maxTime, 1.0);
      const currentSpeed = initialSpeed + (maxSpeed - initialSpeed) * t;
      
      const currentOverdrive = elapsed > maxTime ? Math.min((elapsed - maxTime) / 2.0, 1.0) : 0.0;
      
      setShaderProps(p => ({ ...p, rotationSpeed: currentSpeed, overdrive: currentOverdrive }));
      accelerationRef.current = requestAnimationFrame(animate);
    };
    
    accelerationRef.current = requestAnimationFrame(animate);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || currentSection !== 'entry') return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    
    setShaderProps(p => ({
      ...p,
      rotate: p.rotate + dx * 0.005,
      // tilt remains constant during drag to keep movement purely horizontal
    }));
    
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => {
    if (accelerationRef.current) {
      cancelAnimationFrame(accelerationRef.current);
      accelerationRef.current = null;
    }

    if (isDragging && currentSection === 'entry') {
      setShaderProps(p => ({ ...p, rotate: 0.0, tilt: 0.1, rotationSpeed: 0.2, overdrive: 0.0 }));
    }
    setIsDragging(false);
  };

  const overdrive = shaderProps.overdrive || 0.0;
  
  // Cap the UI distortion if we are in the immersive journey so it remains readable
  const uiOverdrive = currentSection === 'immersive' ? overdrive * 0.1 : overdrive;

  const isGlitched = uiOverdrive > 0.01;
  const glitchStyle: React.CSSProperties = isGlitched ? {
    filter: `contrast(${100 + uiOverdrive * 100}%) saturate(${100 + uiOverdrive * 200}%) hue-rotate(${(Math.random() - 0.5) * 180 * uiOverdrive}deg)`,
    transform: `translate(${(Math.random() - 0.5) * 30 * uiOverdrive}px, ${(Math.random() - 0.5) * 10 * uiOverdrive}px) skewX(${(Math.random() - 0.5) * 40 * uiOverdrive}deg)`,
    opacity: Math.max(0.5, 1.0 - Math.random() * uiOverdrive * 0.5),
    clipPath: Math.random() > 0.8 ? `inset(${Math.random() * 30}% 0 ${Math.random() * 30}% 0)` : 'none',
    textShadow: `${(Math.random() - 0.5) * 20 * uiOverdrive}px 0 0 rgba(255,0,0,1), ${(Math.random() - 0.5) * -20 * uiOverdrive}px 0 0 rgba(0,0,255,1)`,
  } : {};

  return (
    <div className="relative w-full h-screen bg-black text-[#E1E0CC] font-sans p-4 md:p-6">
      <div className="relative w-full h-full rounded-[4px] overflow-hidden bg-black">
        <div 
          className={`absolute inset-0 z-0 ${currentSection === 'entry' ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : 'pointer-events-none'}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <BlackHoleShader {...shaderProps} />
        </div>

        {/* Global Navbar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
          <div 
            style={glitchStyle}
            className="bg-black rounded-b-[4px] px-4 py-3 md:px-8 flex items-center justify-center gap-3 sm:gap-4 md:gap-8 lg:gap-10 border-x border-b border-white/10"
          >
            <button 
            onClick={() => setCurrentSection('entry')} 
            className={`font-tomorrow text-[10px] sm:text-xs md:text-sm transition-colors whitespace-nowrap ${currentSection === 'entry' ? 'text-[#E1E0CC]' : 'text-[#E1E0CC]/50 hover:text-[#E1E0CC]/80'}`}
          >
            Home
          </button>
          {navItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => setCurrentSection(item.id)} 
              className={`font-tomorrow text-[10px] sm:text-xs md:text-sm transition-colors whitespace-nowrap ${currentSection === item.id ? 'text-[#E1E0CC]' : 'text-[#E1E0CC]/50 hover:text-[#E1E0CC]/80'}`}
            >
              {item.label}
            </button>
          ))}
          </div>
        </div>

        <div style={glitchStyle} className="absolute inset-0 z-10 pointer-events-none">
          <AnimatePresence mode="wait">
            {currentSection === 'entry' && <Entry key="entry" onEnter={() => setCurrentSection('immersive')} />}
            {currentSection === 'model' && <InteractiveModel key="model" mode={learningMode} />}
            {currentSection === 'simulation' && <Simulation key="simulation" shaderProps={shaderProps} setShaderProps={setShaderProps} />}
            {currentSection === 'immersive' && <Immersive key="immersive" setShaderProps={setShaderProps} onGoHome={() => setCurrentSection('entry')} />}
            {currentSection === 'comparison' && <Comparison key="comparison" setShaderProps={setShaderProps} />}
            {currentSection === 'education' && <Education key="education" />}
            {currentSection === 'quiz' && <Quiz key="quiz" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
