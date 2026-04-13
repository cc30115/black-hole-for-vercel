import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const WordsPullUp = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block relative"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </div>
  );
};

export default function Entry({ onEnter }: { onEnter: () => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full pointer-events-none"
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 pb-6 px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-stretch gap-[24px] md:gap-[32px]">
            <div className="flex-1 flex items-end">
              <h1 className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-light leading-[0.85] tracking-[-0.07em] text-[#E1E0CC]">
                <WordsPullUp text="Horizon" />
              </h1>
            </div>
            <div className="w-full md:w-[35%] lg:w-[30%] flex flex-col justify-end items-start md:items-end pb-2 md:pb-4 pointer-events-auto">
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/70 text-[15px] leading-[1.4] mb-4 md:text-right w-full"
              >
                Horizon interactively simulates extreme cosmic phenomena, using gravity to unlock the universe's deepest mysteries.
              </motion.p>
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={onEnter}
                className="font-tomorrow group w-full md:w-auto border border-[#E1E0CC]/20 bg-black/40 backdrop-blur-md hover:bg-[#E1E0CC]/10 hover:border-[#E1E0CC]/50 text-[#E1E0CC] rounded-[4px] font-light text-[11px] sm:text-xs md:text-sm flex items-center justify-between md:justify-center px-6 py-3 gap-6 transition-all uppercase tracking-widest"
              >
                <span>Enter the Void</span>
                <ArrowRight className="text-[#E1E0CC] w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
