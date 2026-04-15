// ─────────────────────────────────────────────────────────────
// AGN Black Hole Mass Database — Pre-parsed from mbh.csv
// Source: Reverberation-mapped AGN catalogue (f=4.3)
// ─────────────────────────────────────────────────────────────

export interface BlackHole {
  id: string;
  name: string;
  ra_deg: number;
  dec_deg: number;
  redshift: number;
  log_mass: number | null;
  mass: number | null;        // solar masses (10^log_mass)
  distance_mpc: number;       // Megaparsecs
  distance_ly: number;        // light-years (derived)
  category: string;
  eddington_proxy: number;    // normalized 0–1
}

// ─── Parsing helpers ──────────────────────────────────────────

function parseRA(ra: string): number {
  const [h, m, s] = ra.split(':').map(Number);
  return 15 * (h + m / 60 + s / 3600);
}

function parseDec(dec: string): number {
  const sign = dec.startsWith('-') ? -1 : 1;
  const clean = dec.replace(/^[+-]/, '');
  const [d, m, s] = clean.split(':').map(Number);
  return sign * (d + m / 60 + s / 3600);
}

function classifyMass(logMass: number | null): string {
  if (logMass === null) return 'unknown';
  if (logMass < 6.5) return 'low-mass';
  if (logMass < 7.5) return 'intermediate';
  if (logMass < 8.5) return 'massive';
  return 'ultra-massive';
}

// ─── Raw data (pre-parsed from mbh.csv) ──────────────────────

const rawData: { name: string; ra: string; dec: string; z: number; logM: number | null }[] = [
  { name: "Mrk335", ra: "00:06:19.5", dec: "+20:12:10", z: 0.02579, logM: 7.230 },
  { name: "Mrk1501", ra: "00:10:31.0", dec: "+10:58:30", z: 0.08934, logM: 8.067 },
  { name: "PG0026+129", ra: "00:29:13.6", dec: "+13:16:03", z: 0.142, logM: 8.487 },
  { name: "PG0052+251", ra: "00:54:52.1", dec: "+25:25:38", z: 0.15445, logM: 8.462 },
  { name: "Fairall9", ra: "01:23:45.8", dec: "-58:48:21", z: 0.04702, logM: 8.299 },
  { name: "Mrk590", ra: "02:14:33.5", dec: "-00:46:00", z: 0.02639, logM: 7.570 },
  { name: "Mrk1044", ra: "02:30:05.5", dec: "-08:59:53", z: 0.016451, logM: null },
  { name: "1H0323+342", ra: "03:24:41.1", dec: "+34:10:46", z: 0.061, logM: null },
  { name: "3C120", ra: "04:33:11.1", dec: "+05:21:16", z: 0.03301, logM: 7.745 },
  { name: "IRAS 04416+1215", ra: "04:44:28.8", dec: "+12:21:12", z: 0.0889, logM: null },
  { name: "H0507+164", ra: "05:10:45.5", dec: "+16:29:56", z: 0.017879, logM: 6.876 },
  { name: "Ark120", ra: "05:16:11.4", dec: "-00:08:59", z: 0.03271, logM: 8.068 },
  { name: "MCG+08-11-011", ra: "05:54:53.6", dec: "+46:26:22", z: 0.02048, logM: 7.288 },
  { name: "Mrk6", ra: "06:52:12.2", dec: "+74:25:37", z: 0.01881, logM: 8.102 },
  { name: "Mrk374", ra: "06:59:38.1", dec: "+54:11:48", z: 0.04263, logM: 7.248 },
  { name: "Mrk79", ra: "07:42:32.8", dec: "+49:48:35", z: 0.02219, logM: 7.612 },
  { name: "SDSS J074352+271240", ra: "07:43:52.0", dec: "+27:12:40", z: 0.252, logM: 7.912 },
  { name: "SDSS J075051+245409", ra: "07:50:51.1", dec: "+24:54:09", z: 0.4004, logM: 7.223 },
  { name: "SDSS J075101+291419", ra: "07:51:01.4", dec: "+29:14:19", z: 0.1209, logM: 7.369 },
  { name: "Mrk382", ra: "07:55:25.3", dec: "+39:11:10", z: 0.033687, logM: null },
  { name: "SDSS J075949+320024", ra: "07:59:49.5", dec: "+32:00:24", z: 0.1879, logM: 7.199 },
  { name: "PG0804+761", ra: "08:10:58.6", dec: "+76:02:43", z: 0.1, logM: 8.735 },
  { name: "SDSS J081441+212919", ra: "08:14:41.9", dec: "+21:29:19", z: 0.1626, logM: 7.507 },
  { name: "APM08279+5255", ra: "08:31:41.7", dec: "+52:45:18", z: 3.9122, logM: 9.869 },
  { name: "NGC2617", ra: "08:35:38.8", dec: "-04:05:18", z: 0.01421, logM: 6.934 },
  { name: "SDSS J083553+055317", ra: "08:35:53.4", dec: "+05:53:17", z: 0.20512, logM: 7.200 },
  { name: "S5 0836+71", ra: "08:41:24.3", dec: "+70:53:42", z: 2.172, logM: null },
  { name: "SDSS J084533+474935", ra: "08:45:33.3", dec: "+47:49:35", z: 0.30237, logM: 7.326 },
  { name: "PG0844+349", ra: "08:47:42.4", dec: "+34:45:04", z: 0.064, logM: 7.858 },
  { name: "Mrk704", ra: "09:18:26.0", dec: "+16:18:19", z: 0.02863, logM: 7.565 },
  { name: "Mrk110", ra: "09:25:12.9", dec: "+52:17:11", z: 0.03529, logM: 7.292 },
  { name: "SDSS J093302+385228", ra: "09:33:02.7", dec: "+38:52:28", z: 0.17721, logM: 7.049 },
  { name: "PG0934+013", ra: "09:37:01.0", dec: "+01:05:43", z: 0.05034, logM: 6.407 },
  { name: "PG0953+414", ra: "09:56:52.4", dec: "+41:15:22", z: 0.2341, logM: 8.333 },
  { name: "SDSS J100402+285535", ra: "10:04:02.6", dec: "+28:55:35", z: 0.3272, logM: 7.570 },
  { name: "SDSS J101000+300322", ra: "10:10:00.7", dec: "+30:03:22", z: 0.25643, logM: 7.650 },
  { name: "NGC3227", ra: "10:23:30.6", dec: "+19:51:54", z: 0.00386, logM: 6.684 },
  { name: "Mrk142", ra: "10:25:31.3", dec: "+51:40:35", z: 0.04494, logM: 6.294 },
  { name: "NGC3516", ra: "11:06:47.5", dec: "+72:34:07", z: 0.00884, logM: 7.399 },
  { name: "SBS1116+583A", ra: "11:18:57.7", dec: "+58:03:24", z: 0.02787, logM: 6.558 },
  { name: "SBS1116+603", ra: "11:19:14.3", dec: "+60:04:57", z: 2.64146, logM: null },
  { name: "Arp151", ra: "11:25:36.2", dec: "+54:22:57", z: 0.02109, logM: 6.672 },
  { name: "NGC3783", ra: "11:39:01.7", dec: "-37:44:19", z: 0.00973, logM: 7.079 },
  { name: "SDSS J1139+3355", ra: "11:39:13.9", dec: "+33:55:51", z: 0.032753, logM: null },
  { name: "MCG+06-26-012", ra: "11:39:13.9", dec: "+33:55:51", z: 0.032753, logM: null },
  { name: "UGC06728", ra: "11:45:16.0", dec: "+79:40:53", z: 0.00652, logM: 5.858 },
  { name: "Mrk1310", ra: "12:01:14.3", dec: "-03:40:41", z: 0.01956, logM: 6.212 },
  { name: "NGC4051", ra: "12:03:09.6", dec: "+44:31:53", z: 0.00234, logM: 5.891 },
  { name: "NGC4151", ra: "12:10:32.6", dec: "+39:24:21", z: 0.00332, logM: 7.374 },
  { name: "PG1211+143", ra: "12:14:17.7", dec: "+14:03:13", z: 0.0809, logM: null },
  { name: "Mrk202", ra: "12:17:55.0", dec: "+58:39:35", z: 0.02102, logM: 6.133 },
  { name: "NGC4253", ra: "12:18:26.5", dec: "+29:48:46", z: 0.01293, logM: 6.822 },
  { name: "Mrk50", ra: "12:23:24.1", dec: "+02:40:45", z: 0.02343, logM: 7.551 },
  { name: "NGC4395", ra: "12:25:48.8", dec: "+33:32:49", z: 0.00106, logM: 5.449 },
  { name: "PG1226+023", ra: "12:29:06.7", dec: "+02:03:09", z: 0.15834, logM: 8.839 },
  { name: "PG1229+204", ra: "12:32:03.6", dec: "+20:09:29", z: 0.06301, logM: 7.758 },
  { name: "NGC4593", ra: "12:39:39.4", dec: "-05:20:39", z: 0.009, logM: 6.912 },
  { name: "WAS61", ra: "12:42:10.6", dec: "+33:17:03", z: 0.043513, logM: null },
  { name: "PG1247+267", ra: "12:50:05.7", dec: "+26:31:08", z: 2.038, logM: null },
  { name: "NGC4748", ra: "12:52:12.4", dec: "-13:24:53", z: 0.01463, logM: 6.407 },
  { name: "PG1307+085", ra: "13:09:47.0", dec: "+08:19:48", z: 0.155, logM: 8.537 },
  { name: "MCG-06-30-15", ra: "13:35:53.7", dec: "-34:17:44", z: 0.00749, logM: 6.295 },
  { name: "NGC5273", ra: "13:42:08.3", dec: "+35:39:15", z: 0.003619, logM: 6.660 },
  { name: "IC4329A", ra: "13:49:19.2", dec: "-30:18:34", z: 0.01605, logM: null },
  { name: "Mrk279", ra: "13:53:03.4", dec: "+69:18:30", z: 0.03045, logM: 7.435 },
  { name: "PG1411+442", ra: "14:13:48.3", dec: "+44:00:14", z: 0.0896, logM: 8.539 },
  { name: "NGC5548", ra: "14:17:59.5", dec: "+25:08:12", z: 0.01718, logM: 7.692 },
  { name: "SBS1425+606", ra: "14:26:56.2", dec: "+60:25:51", z: 3.19716, logM: null },
  { name: "PG1426+015", ra: "14:29:06.6", dec: "+01:17:06", z: 0.08657, logM: 9.007 },
  { name: "Mrk817", ra: "14:36:22.1", dec: "+58:47:39", z: 0.03146, logM: 7.586 },
  { name: "NGC5940", ra: "15:31:18.1", dec: "+07:27:28", z: 0.03393, logM: 7.035 },
  { name: "Mrk290", ra: "15:35:52.3", dec: "+57:54:09", z: 0.02958, logM: 7.277 },
  { name: "Mrk486", ra: "15:36:38.3", dec: "+54:33:33", z: 0.038934, logM: null },
  { name: "Mrk493", ra: "15:59:09.6", dec: "+35:01:47", z: 0.031328, logM: null },
  { name: "PG1613+658", ra: "16:13:57.2", dec: "+65:43:10", z: 0.129, logM: 8.339 },
  { name: "PG1617+175", ra: "16:20:11.3", dec: "+17:24:28", z: 0.11244, logM: 8.667 },
  { name: "PG1700+518", ra: "17:01:24.8", dec: "+51:49:20", z: 0.292, logM: 8.786 },
  { name: "Arp102B", ra: "17:19:14.5", dec: "+48:58:49", z: 0.024167, logM: null },
  { name: "3C382", ra: "18:35:03.4", dec: "+32:41:47", z: 0.05787, logM: 8.847 },
  { name: "3C390.3", ra: "18:42:09.0", dec: "+79:46:17", z: 0.0561, logM: 8.711 },
  { name: "1RXS J1858+4850", ra: "18:58:01.1", dec: "+48:50:23", z: 0.079, logM: 6.705 },
  { name: "Zw229-015", ra: "19:05:25.9", dec: "+42:27:40", z: 0.02788, logM: 6.913 },
  { name: "NGC6814", ra: "19:42:40.6", dec: "-10:19:25", z: 0.00521, logM: 7.038 },
  { name: "Mrk509", ra: "20:44:09.7", dec: "-10:43:25", z: 0.0344, logM: 8.049 },
  { name: "PG2130+099", ra: "21:32:27.8", dec: "+10:08:19", z: 0.06298, logM: 7.433 },
  { name: "NGC7469", ra: "23:03:15.6", dec: "+08:52:26", z: 0.01632, logM: 6.956 },
];

// ─── Build the typed array ──────────────────────────────────

// Find max redshift for normalizing eddington_proxy
const maxRedshift = Math.max(...rawData.map(d => d.z));

export const blackHoles: BlackHole[] = rawData.map((d, i) => {
  const distance_mpc = (d.z * 299792) / 70;
  const distance_ly = distance_mpc * 3.2616e6;
  const mass = d.logM !== null ? Math.pow(10, d.logM) : null;

  return {
    id: `bh-${i}`,
    name: d.name,
    ra_deg: parseRA(d.ra),
    dec_deg: parseDec(d.dec),
    redshift: d.z,
    log_mass: d.logM,
    mass,
    distance_mpc: Math.round(distance_mpc * 100) / 100,
    distance_ly: Math.round(distance_ly),
    category: classifyMass(d.logM),
    eddington_proxy: Math.min(d.z / maxRedshift, 1.0),
  };
});

// Only black holes with known mass (for shader mapping)
export const knownMassBHs = blackHoles.filter(bh => bh.mass !== null);

// ─── Shader mapping ──────────────────────────────────────────

export interface ShaderMapping {
  bhScale: number;
  rotationSpeed: number;
  diskIntensity: number;
  chromatic: number;
  tilt: number;
  rotate: number;
  mass: number;           // for u_mass uniform (clamped RS)
  overdrive?: number;     // for cinematic glitch
}

export function mapToShader(bh: BlackHole, mode: 'scientific' | 'cinematic' = 'scientific'): ShaderMapping {
  const logM = bh.log_mass ?? 6.0; // fallback for unknown masses

  // RS clamped between 0.5–3.0 for visual stability
  const massUniform = Math.max(0.5, Math.min(3.0, logM * 0.2));

  // Scale: larger mass = larger visual footprint
  let bhScale = Math.max(0.6, Math.min(2.5, logM * 0.15));

  // Rotation speed: slightly faster for heavier black holes
  let rotationSpeed = 0.1 + logM * 0.03;

  // Disk brightness: proportional to activity (eddington_proxy)
  let diskIntensity = Math.max(0.5, Math.min(3.0, 0.5 + bh.eddington_proxy * 2.5));

  // Chromatic: more redshifted = more colorful lensing
  let chromatic = Math.min(bh.redshift * 2.0, 1.0);

  let overdrive = 0.0;

  if (mode === 'cinematic') {
    // Exaggerate visuals for dramatic effect
    bhScale *= 1.3;
    rotationSpeed *= 1.5;
    diskIntensity *= 1.5;
    chromatic *= 1.8;
    overdrive = Math.min(bh.eddington_proxy * 0.2, 0.15); // Add subtle glitch mapping based on activity
  }

  // Tilt & rotate: pseudo-random from RA/Dec to give each BH a unique orientation
  const tilt = ((bh.ra_deg % 10) / 10) * 0.5;
  const rotate = ((bh.dec_deg % 10) / 10) * 0.3;

  return { bhScale, rotationSpeed, diskIntensity, chromatic, tilt, rotate, mass: massUniform, overdrive };
}

// ─── Filter function ─────────────────────────────────────────

export interface Filters {
  search?: string;
  category?: string | null;
  massMin?: number | null;
  massMax?: number | null;
  zMin?: number | null;
  zMax?: number | null;
}

export function filterBlackHoles(data: BlackHole[], filters: Filters): BlackHole[] {
  return data.filter(bh => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!bh.name.toLowerCase().includes(q)) return false;
    }
    if (filters.category && bh.category !== filters.category) return false;
    if (filters.massMin != null && (bh.log_mass === null || bh.log_mass < filters.massMin)) return false;
    if (filters.massMax != null && (bh.log_mass === null || bh.log_mass > filters.massMax)) return false;
    if (filters.zMin != null && bh.redshift < filters.zMin) return false;
    if (filters.zMax != null && bh.redshift > filters.zMax) return false;
    return true;
  });
}

// ─── Format helpers ──────────────────────────────────────────

export function formatMass(logM: number | null): string {
  if (logM === null) return 'Unknown';
  return `10^${logM.toFixed(1)} M☉`;
}

export function formatDistance(bh: BlackHole): string {
  if (bh.distance_ly > 1e9) return `${(bh.distance_ly / 1e9).toFixed(1)} Gly`;
  if (bh.distance_ly > 1e6) return `${(bh.distance_ly / 1e6).toFixed(1)} Mly`;
  return `${(bh.distance_ly / 1e3).toFixed(0)} kly`;
}

export function formatRedshift(z: number): string {
  return `z = ${z.toFixed(4)}`;
}
