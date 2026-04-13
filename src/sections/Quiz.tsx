import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Target, AlertTriangle } from 'lucide-react';

const questions = [
  {
    q: "What is the boundary around a black hole where nothing can escape?",
    options: ["Photon Sphere", "Event Horizon", "Singularity", "Accretion Disk"],
    answer: 1
  },
  {
    q: "What happens to time as you get closer to a black hole?",
    options: ["It speeds up", "It stops completely", "It slows down", "It moves backwards"],
    answer: 2
  },
  {
    q: "What is the glowing ring of matter spiraling into the black hole called?",
    options: ["Accretion Disk", "Event Horizon", "Corona", "Photon Sphere"],
    answer: 0
  }
];

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[currentQ].answer) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full pointer-events-none relative flex items-center justify-center px-6 md:px-12">
      
      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E1E0CC08_1px,transparent_1px),linear-gradient(to_bottom,#E1E0CC08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Center Crosshair */}
        
        {/* Center Reticles */}
        <div className="absolute top-1/2 left-1/2 w-32 h-32 -ml-16 -mt-16 border border-[#E1E0CC]/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 -ml-32 -mt-32 border border-[#E1E0CC]/5 rounded-full" />

        {/* Top Left Location */}
        <div className="absolute top-24 left-6 md:left-12 flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-[#E1E0CC]/50" />
          <div className="font-tomorrow text-xs md:text-sm tracking-widest text-[#E1E0CC]/80 uppercase">
            <span className="text-[#E1E0CC]/40">System //</span> Knowledge Assessment
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg bg-black/80 backdrop-blur-md border border-white/10 p-8 rounded-[4px] shadow-2xl pointer-events-auto">
        {!showResult ? (
          <>
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[4px] bg-white/10 flex items-center justify-center border border-white/20">
                  <Target className="w-4 h-4 text-[#E1E0CC]" />
                </div>
                <div>
                  <div className="font-tomorrow text-[10px] uppercase tracking-widest text-[#E1E0CC]/50">Evaluation Protocol</div>
                  <h3 className="text-lg font-light text-[#E1E0CC]">Active Assessment</h3>
                </div>
              </div>
              <div className="font-tomorrow text-xs font-mono text-[#E1E0CC]/50">
                SEQ {currentQ + 1}/{questions.length}
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                <p className="text-lg mb-8 text-[#E1E0CC] font-light leading-relaxed">{questions[currentQ].q}</p>
                <div className="space-y-3">
                  {questions[currentQ].options.map((opt, i) => {
                    let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 text-[#E1E0CC]/80";
                    let icon = null;
                    if (selected !== null) {
                      if (i === questions[currentQ].answer) {
                        btnClass = "bg-green-500/10 border-green-500/50 text-green-400";
                        icon = <ShieldCheck className="w-4 h-4" />;
                      } else if (i === selected) {
                        btnClass = "bg-red-500/10 border-red-500/50 text-red-400";
                        icon = <AlertTriangle className="w-4 h-4" />;
                      } else {
                        btnClass = "bg-white/5 border-white/10 text-[#E1E0CC]/30";
                      }
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        disabled={selected !== null}
                        className={`w-full text-left px-6 py-4 rounded-[4px] border transition-all flex justify-between items-center ${btnClass}`}
                      >
                        <span className="font-tomorrow text-sm tracking-wide">{opt}</span>
                        {icon}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-[#E1E0CC]" />
            </div>
            <h2 className="font-tomorrow text-2xl font-light mb-2 text-[#E1E0CC] uppercase tracking-widest">Assessment Complete</h2>
            <p className="font-tomorrow text-5xl font-mono text-[#E1E0CC] mb-6">{score}<span className="text-2xl text-[#E1E0CC]/30">/{questions.length}</span></p>
            <p className="text-[#E1E0CC]/70 mb-8 text-sm">
              {score === questions.length ? "Clearance granted. Expert level achieved." : 
               score > 0 ? "Partial clearance. Further study recommended." : 
               "Clearance denied. Review database and retry."}
            </p>
            <button 
              onClick={() => {
                setCurrentQ(0);
                setSelected(null);
                setShowResult(false);
                setScore(0);
              }}
              className="font-tomorrow w-full py-3 bg-[#E1E0CC] hover:bg-white text-black rounded-[4px] font-light tracking-widest uppercase text-xs transition-colors"
            >
              Restart Protocol
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
