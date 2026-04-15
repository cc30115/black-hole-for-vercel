import { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'motion/react';
import { Rocket, Activity, Navigation, AlertTriangle } from 'lucide-react';

// rotationSpeed ramps evenly (均分) from 0.3 at stage 0 → 1.2 at stage 3 (fastest) → stays fast through 4 & 5
const stages = [
  { time: 0,     name: "Descent",       text: "Initiating descent sequence. Trajectory locked.",                                        scale: 1.0,  chromatic: 0.0, tilt: 0.0, rotationSpeed: 0.3, overdrive: 0.0, dist: "10,000 km",  dilation: "1.00x",    temp: "2.7 K"      },
  { time: 3000,  name: "Accretion Disk", text: "Approaching the Accretion Disk. Radiation shielding at maximum.",                         scale: 2.0,  chromatic: 0.2, tilt: 0.2, rotationSpeed: 0.6, overdrive: 0.0, dist: "3,000 km",   dilation: "1.15x",    temp: "10^6 K"     },
  { time: 7000,  name: "Photon Sphere",  text: "Crossing the Photon Sphere. Optical sensors detecting infinite light loops.",              scale: 4.0,  chromatic: 0.5, tilt: 0.4, rotationSpeed: 0.9, overdrive: 0.05, dist: "1,500 km",   dilation: "2.50x",    temp: "10^7 K"     },
  { time: 12000, name: "Tidal Forces",   text: "Critical structural stress. Spaghettification imminent.",                                  scale: 8.0,  chromatic: 0.8, tilt: 0.6, rotationSpeed: 1.2, overdrive: 0.25, dist: "500 km",     dilation: "10.0x",    temp: "10^8 K"     },
  { time: 17000, name: "Event Horizon",  text: "Event Horizon proximity alert. External communication lost.",                              scale: 16.0, chromatic: 1.0, tilt: 0.8, rotationSpeed: 1.2, overdrive: 0.75, dist: "0 km",       dilation: "Infinite", temp: "Unknown"    },
  { time: 22000, name: "Singularity",    text: "Point of no return crossed. Physics models breaking down.",                                scale: 30.0, chromatic: 0.0, tilt: 0.0, rotationSpeed: 1.5, overdrive: 1.0, starsOnly: 1.0,  dist: "Singularity", dilation: "Undefined", temp: "Undefined" },
];

export default function Immersive({ setShaderProps, onGoHome }: any) {
  const [isStarted, setIsStarted] = useState(false);
  const [journeyId, setJourneyId] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const startJourney = () => {
    setIsStarted(true);
    setJourneyId(id => id + 1);
    setCurrentStage(0);
    setIsFinished(false);
    setShaderProps((p: any) => ({ ...p, bhScale: 1.0, chromatic: 0.0, tilt: 0.0, starsOnly: 0.0, overdrive: 0.0 }));
  };

  useEffect(() => {
    if (!isStarted) return;

    let timeouts: any[] = [];
    let animations: any[] = [];
    
    stages.forEach((stage, index) => {
      const t = setTimeout(() => {
        setCurrentStage(index);
        
        // Smoothly animate the overdrive state over 3 seconds
        const prevOverdrive = index > 0 ? stages[index - 1].overdrive : 0;
        const anim = animate(prevOverdrive, stage.overdrive, {
          duration: 3,
          ease: "easeInOut",
          onUpdate: (latest) => {
            setShaderProps((p: any) => ({ ...p, overdrive: latest }));
          }
        });
        animations.push(anim);

        setShaderProps((p: any) => ({
          ...p,
          bhScale: stage.scale,
          chromatic: stage.chromatic,
          tilt: stage.tilt,
          rotationSpeed: stage.rotationSpeed,
          starsOnly: stage.starsOnly !== undefined ? stage.starsOnly : p.starsOnly,
        }));
        
        if (index === stages.length - 1) {
          const finishTimeout = setTimeout(() => {
            setIsFinished(true);
          }, 3000);
          timeouts.push(finishTimeout);
        }
      }, stage.time);
      timeouts.push(t);
    });

    return () => {
      timeouts.forEach(clearTimeout);
      animations.forEach(anim => anim.stop && anim.stop());
    };
  }, [isStarted, journeyId]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full pointer-events-none relative flex items-center justify-center">
      
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
          <Navigation className="w-4 h-4 text-[#E1E0CC]/50" />
          <div className="font-tomorrow text-xs md:text-sm tracking-widest text-[#E1E0CC]/80 uppercase">
            <span className="text-[#E1E0CC]/40">Protocol //</span> Descent
          </div>
        </div>
      </div>

      {!isStarted ? (
        <div className="bg-black/80 p-10 rounded-[4px] backdrop-blur-md border border-white/10 shadow-2xl max-w-md pointer-events-auto">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <div className="w-8 h-8 rounded-[4px] bg-white/10 flex items-center justify-center border border-white/20">
              <Rocket className="w-4 h-4 text-[#E1E0CC]" />
            </div>
            <div>
              <div className="font-tomorrow text-[10px] uppercase tracking-widest text-[#E1E0CC]/50">Simulation</div>
              <h3 className="text-lg font-light text-[#E1E0CC]">Journey to the Center</h3>
            </div>
          </div>
          <p className="text-[#E1E0CC]/70 mb-8 text-sm leading-relaxed">Experience a simulated fall into a black hole. Warning: intense visual effects and structural stress simulated.</p>
          <button 
            onClick={startJourney}
            className="font-tomorrow w-full py-3 bg-[#E1E0CC] hover:bg-white text-black rounded-[4px] font-light tracking-widest uppercase text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Activity className="w-4 h-4" /> Initiate Sequence
          </button>
        </div>
      ) : (
        <>
          {/* Flight Path Tracker (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="absolute left-6 md:left-12 top-1/3 bottom-1/3 w-64 bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-[4px] flex flex-col pointer-events-auto shadow-2xl hidden md:flex"
          >
            <div className="font-tomorrow text-[10px] uppercase tracking-widest text-[#E1E0CC]/50 mb-6">Flight Path</div>
            <div className="relative flex-1 flex flex-col justify-between">
              <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-white/10" />
              {stages.map((stage, i) => (
                <div key={i} className="relative flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full z-10 transition-colors ${i < currentStage ? 'bg-[#E1E0CC]/50' : i === currentStage ? 'bg-red-400 shadow-[0_0_8px_#f87171]' : 'bg-black border border-white/30'}`} />
                  <span className={`font-tomorrow text-xs uppercase tracking-widest transition-colors ${i === currentStage ? 'text-red-400 font-bold' : 'text-[#E1E0CC]/40'}`}>
                    {stage.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Telemetry (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="absolute right-6 md:right-12 top-1/3 w-64 bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-[4px] pointer-events-auto shadow-2xl hidden md:block"
          >
            <div className="font-tomorrow text-[10px] uppercase tracking-widest text-[#E1E0CC]/50 mb-6">Live Telemetry</div>
            <div className="space-y-4">
              <TelemetryItem label="Distance to Singularity" value={stages[currentStage].dist} alert={currentStage >= 4} />
              <TelemetryItem label="Time Dilation Factor" value={stages[currentStage].dilation} alert={currentStage >= 3} />
              <TelemetryItem label="External Temp" value={stages[currentStage].temp} alert={currentStage >= 2} />
            </div>
          </motion.div>

          {/* Main Readout (Bottom Center) */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-center z-20 pointer-events-none px-6">
            <AnimatePresence mode="wait">
              {!isFinished && (
                <motion.div
                  key={currentStage}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-black/80 backdrop-blur-md px-8 py-4 rounded-[4px] border border-white/20 shadow-2xl max-w-2xl w-full flex items-center gap-4"
                >
                  {currentStage >= 3 && <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse flex-shrink-0" />}
                  <p className={`font-tomorrow text-sm md:text-base font-mono tracking-wide ${currentStage >= 3 ? 'text-red-400' : 'text-[#E1E0CC]'}`}>
                    {">"} {stages[currentStage].text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isFinished && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-30 pointer-events-auto"
              >
                <div className="bg-black border border-red-500/30 p-8 rounded-[4px] max-w-md text-center">
                  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-6" />
                  <h2 className="font-tomorrow text-2xl font-light mb-2 text-red-400 uppercase tracking-widest">Signal Lost</h2>
                  <p className="text-[#E1E0CC]/70 mb-8 text-sm">Telemetry connection severed at Event Horizon. Simulation concluded.</p>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={startJourney} 
                      className="font-tomorrow w-full py-3 bg-transparent border border-white/20 hover:bg-white/10 text-[#E1E0CC] rounded-[4px] transition-colors text-xs uppercase tracking-widest"
                    >
                      Restart Simulation
                    </button>
                    <button 
                      onClick={onGoHome} 
                      className="font-tomorrow w-full py-3 bg-[#E1E0CC] hover:bg-white text-black rounded-[4px] transition-colors text-xs uppercase tracking-widest"
                    >
                      Return to Database
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

function TelemetryItem({ label, value, alert }: { label: string, value: string, alert?: boolean }) {
  return (
    <div>
      <div className="font-tomorrow text-[10px] text-[#E1E0CC]/40 tracking-widest uppercase mb-1">{label}</div>
      <div className={`font-tomorrow text-sm font-mono ${alert ? 'text-red-400 animate-pulse' : 'text-[#E1E0CC]'}`}>{value}</div>
    </div>
  );
}
