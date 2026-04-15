import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, AlertTriangle, Activity, Target, Search, Filter } from 'lucide-react';
import { blackHoles, knownMassBHs, filterBlackHoles, mapToShader, BlackHole, Filters, formatMass, formatDistance, formatRedshift } from '../data/blackHoleData';

const parts = [
  {
    id: 'singularity',
    name: 'Singularity',
    category: 'Critical Anomaly',
    desc: 'The infinitely dense center where gravity is so strong that spacetime curves infinitely. Our current laws of physics break down here.',
    stats: [
      { label: 'Density', value: 'Infinite' },
      { label: 'Volume', value: 'Zero' },
      { label: 'Escape Vel.', value: '> c' }
    ],
    x: '70%', y: '50%',
    alert: true,
    labelDir: 'right'
  },
  {
    id: 'event-horizon',
    name: 'Event Horizon',
    category: 'Boundary',
    desc: 'The boundary of no return. Beyond this point, the escape velocity exceeds the speed of light. Nothing, not even light, can escape.',
    stats: [
      { label: 'Radius', value: 'r_s = 2GM/c²' },
      { label: 'Time Dilation', value: 'Infinite' },
      { label: 'Visibility', value: 'Absolute Black' }
    ],
    x: '60%', y: '50%',
    alert: true,
    labelDir: 'left'
  },
  {
    id: 'accretion-disk',
    name: 'Accretion Disk',
    category: 'Matter Structure',
    desc: 'A superheated disk of gas and dust spiraling into the black hole. Friction heats it to millions of degrees, emitting intense X-rays.',
    stats: [
      { label: 'Temperature', value: '~10^7 K' },
      { label: 'Velocity', value: '0.5c - 0.9c' },
      { label: 'Emission', value: 'X-Ray / Gamma' }
    ],
    x: '70%', y: '25%',
    alert: false,
    labelDir: 'right'
  },
  {
    id: 'photon-sphere',
    name: 'Photon Sphere',
    category: 'Optical Phenomenon',
    desc: 'A region where gravity is so strong that light travels in circles. If you stood here, you could see the back of your own head.',
    stats: [
      { label: 'Location', value: 'r = 1.5 r_s' },
      { label: 'Orbit', value: 'Unstable' },
      { label: 'Visual', value: 'Infinite Mirrors' }
    ],
    x: '82%', y: '40%',
    alert: false,
    labelDir: 'right'
  },
];

export default function InteractiveModel({ mode, setShaderProps }: { mode: string, key?: string, setShaderProps: any }) {
  const [activePart, setActivePart] = useState<string | null>(null);
  
  // Catalog State
  const [selectedBH, setSelectedBH] = useState<BlackHole>(knownMassBHs.find(b => b.name === 'Mrk335') || knownMassBHs[0]);
  const [filters, setFilters] = useState<Filters>({ search: '', category: null });
  const [isCatalogOpen, setIsCatalogOpen] = useState(true);

  const activeData = parts.find(p => p.id === activePart);
  const filteredData = filterBlackHoles(knownMassBHs, filters);

  // Sync shader with selected black hole
  useEffect(() => {
    if (selectedBH) {
      const shaderData = mapToShader(selectedBH);
      setShaderProps((p: any) => ({ ...p, ...shaderData }));
    }
  }, [selectedBH, setShaderProps]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full pointer-events-none relative flex flex-col items-start pt-24 px-6 md:px-12">
      
      {/* Background Grids & Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E1E0CC08_1px,transparent_1px),linear-gradient(to_bottom,#E1E0CC08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        {/* Center Reticles */}
        <div className="absolute top-1/2 left-[70%] w-32 h-32 -ml-16 -mt-16 border border-[#E1E0CC]/10 rounded-full" />
        <div className="absolute top-1/2 left-[70%] w-64 h-64 -ml-32 -mt-32 border border-[#E1E0CC]/5 rounded-full" />
      </div>

      {/* Top HUD Location Marker */}
      <div className="flex items-center gap-3 mb-6 relative z-20">
        <MapPin className="w-4 h-4 text-[#E1E0CC]/50" />
        <div className="font-tomorrow text-xs md:text-sm tracking-widest text-[#E1E0CC]/80 uppercase">
          <span className="text-[#E1E0CC]/40">TARGET //</span> {selectedBH.name}
        </div>
      </div>

      {/* Catalog Panel - Fixed on the left side */}
      <div className="pointer-events-auto flex flex-col w-full md:w-80 h-[55vh] md:h-[65vh] bg-black/60 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden shadow-2xl z-20">
        
        {/* Search Header */}
        <div className="p-4 border-b border-white/10 shrink-0">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E1E0CC]/40" />
            <input 
              type="text" 
              placeholder="Search database..." 
              value={filters.search || ''}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-sm py-2 pl-9 pr-3 text-xs md:text-sm font-tomorrow text-[#E1E0CC] focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {['low-mass', 'intermediate', 'massive', 'ultra-massive'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilters(f => ({ ...f, category: f.category === cat ? null : cat }))}
                className={`font-tomorrow text-[9px] uppercase tracking-wider px-2 py-1 rounded-sm border transition-colors ${
                  filters.category === cat 
                    ? 'bg-[#E1E0CC] text-black border-[#E1E0CC]' 
                    : 'bg-transparent text-[#E1E0CC]/50 border-white/10 hover:border-white/30'
                }`}
              >
                {cat.split('-').join(' ')}
              </button>
            ))}
          </div>
          <div className="mt-3 font-tomorrow text-[10px] text-[#E1E0CC]/40 tracking-widest uppercase">
            {filteredData.length} records found
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <AnimatePresence>
            {filteredData.map(bh => (
              <motion.button
                key={bh.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBH(bh)}
                className={`w-full text-left p-4 border-b border-white/5 transition-colors group ${
                  selectedBH.id === bh.id ? 'bg-white/10 border-l-2 border-l-[#E1E0CC]' : 'hover:bg-white/5 border-l-2 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-sans text-sm tracking-wide text-[#E1E0CC] group-hover:text-white transition-colors">{bh.name}</h4>
                  <span className="font-tomorrow text-[10px] text-[#E1E0CC]/50">{bh.category}</span>
                </div>
                <div className="font-tomorrow text-xs text-[#E1E0CC]/70 min-w-0 font-mono">
                  M = {formatMass(bh.log_mass)}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
          {filteredData.length === 0 && (
            <div className="p-8 text-center font-tomorrow text-xs tracking-wider text-[#E1E0CC]/30">No matches found</div>
          )}
        </div>
      </div>

      {/* Anatomy Info Panel - Appears when hovering a part */}
      <AnimatePresence mode="wait">
        {activeData && (
          <motion.div 
            key={activePart}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-6 md:right-12 bottom-32 w-72 md:w-80 bg-black/80 backdrop-blur-md border border-white/10 rounded-[4px] p-6 pointer-events-auto shadow-2xl z-30"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              {activeData.alert ? (
                <div className="w-8 h-8 rounded-[4px] bg-red-500/20 flex items-center justify-center border border-red-500/50">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-[4px] bg-white/10 flex items-center justify-center border border-white/20">
                  <Target className="w-4 h-4 text-[#E1E0CC]" />
                </div>
              )}
              <div>
                <div className={`font-tomorrow text-[10px] uppercase tracking-widest ${activeData.alert ? 'text-red-400' : 'text-[#E1E0CC]/50'}`}>
                  {activeData.category}
                </div>
                <h3 className="text-lg font-light text-[#E1E0CC]">{activeData.name}</h3>
              </div>
            </div>

            {/* Desc */}
            <p className="text-sm text-[#E1E0CC]/70 leading-relaxed mb-6">
              {activeData.desc}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {activeData.stats.map((stat, i) => (
                <div key={i}>
                  <div className="font-tomorrow text-[10px] text-[#E1E0CC]/40 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="font-tomorrow text-sm font-mono text-[#E1E0CC]/90">{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Telemetry for Selected Black Hole */}
      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pointer-events-none z-10">
        <div className="flex gap-8 md:gap-12">
          <TelemetryItem label="Mass" value={formatMass(selectedBH.log_mass)} />
          <TelemetryItem label="Redshift" value={formatRedshift(selectedBH.redshift)} />
          <TelemetryItem label="Distance" value={formatDistance(selectedBH)} />
        </div>
        <div className="text-left md:text-right">
          <div className="font-tomorrow text-[10px] text-[#E1E0CC]/40 tracking-widest uppercase mb-1">System Status</div>
          <div className="font-tomorrow text-xs md:text-sm text-green-400 tracking-widest uppercase flex items-center gap-2">
            <Activity className="w-4 h-4" /> Live DB Sync
          </div>
        </div>
      </div>

      {/* Hotspots (Radar Targets) */}
      {parts.map(part => {
        const isActive = activePart === part.id;
        const isAlert = part.alert;
        const colorClass = isAlert ? 'text-red-400' : 'text-[#E1E0CC]';
        const bgClass = isAlert ? 'bg-red-400' : 'bg-[#E1E0CC]';
        const borderClass = isAlert ? 'border-red-400' : 'border-[#E1E0CC]';

        return (
          <button
            key={part.id}
            onMouseEnter={() => setActivePart(part.id)}
            onMouseLeave={() => setActivePart(null)}
            className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center group pointer-events-auto z-20"
            style={{ left: part.x, top: part.y }}
          >
            {/* Outer pulsing ring */}
            <div className={`absolute inset-0 rounded-full border ${borderClass} opacity-45 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 ${isActive ? 'scale-150 opacity-100 animate-pulse' : ''}`} />
            
            {/* Inner dot */}
            <div className={`w-2 h-2 rounded-full ${bgClass} shadow-[0_0_10px_currentColor]`} />

            {/* Label line & Text */}
            <div className={`absolute top-1/2 h-[1px] ${bgClass} opacity-0 group-hover:opacity-50 transition-opacity ${part.labelDir === 'right' ? 'left-8 w-8' : 'right-8 w-8'}`} />
            <div className={`font-tomorrow absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] md:text-xs tracking-widest uppercase ${colorClass} ${part.labelDir === 'right' ? 'left-20' : 'right-20'}`}>
              {part.name}
            </div>
          </button>
        );
      })}
    </motion.div>
  );
}

function TelemetryItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <div className="font-tomorrow text-[10px] text-[#E1E0CC]/40 tracking-widest uppercase mb-1 flex items-center gap-2">
        <div className="w-1 h-1 bg-[#E1E0CC]/40 rounded-full" />
        {label}
      </div>
      <div className="font-tomorrow text-sm font-mono text-[#E1E0CC]">{value}</div>
    </div>
  );
}
