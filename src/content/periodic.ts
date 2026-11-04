// Periodic table data in the form used on GCSE data sheets (relative atomic masses rounded as on the AQA sheet).
// Lanthanides (58-71) and actinides (90-103) are omitted, as on GCSE sheets.

export interface Element {
  z: number;
  sym: string;
  name: string;
  ar: number;
  group: number; // 1-18 (18 = group 0)
  period: number;
  kind: 'alkali' | 'alkaline' | 'transition' | 'metal' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble';
}

const RAW: [number, string, string, number][] = [
  [1, 'H', 'Hydrogen', 1], [2, 'He', 'Helium', 4], [3, 'Li', 'Lithium', 7], [4, 'Be', 'Beryllium', 9], [5, 'B', 'Boron', 11],
  [6, 'C', 'Carbon', 12], [7, 'N', 'Nitrogen', 14], [8, 'O', 'Oxygen', 16], [9, 'F', 'Fluorine', 19], [10, 'Ne', 'Neon', 20],
  [11, 'Na', 'Sodium', 23], [12, 'Mg', 'Magnesium', 24], [13, 'Al', 'Aluminium', 27], [14, 'Si', 'Silicon', 28], [15, 'P', 'Phosphorus', 31],
  [16, 'S', 'Sulfur', 32], [17, 'Cl', 'Chlorine', 35.5], [18, 'Ar', 'Argon', 40], [19, 'K', 'Potassium', 39], [20, 'Ca', 'Calcium', 40],
  [21, 'Sc', 'Scandium', 45], [22, 'Ti', 'Titanium', 48], [23, 'V', 'Vanadium', 51], [24, 'Cr', 'Chromium', 52], [25, 'Mn', 'Manganese', 55],
  [26, 'Fe', 'Iron', 56], [27, 'Co', 'Cobalt', 59], [28, 'Ni', 'Nickel', 59], [29, 'Cu', 'Copper', 63.5], [30, 'Zn', 'Zinc', 65],
  [31, 'Ga', 'Gallium', 70], [32, 'Ge', 'Germanium', 73], [33, 'As', 'Arsenic', 75], [34, 'Se', 'Selenium', 79], [35, 'Br', 'Bromine', 80],
  [36, 'Kr', 'Krypton', 84], [37, 'Rb', 'Rubidium', 85], [38, 'Sr', 'Strontium', 88], [39, 'Y', 'Yttrium', 89], [40, 'Zr', 'Zirconium', 91],
  [41, 'Nb', 'Niobium', 93], [42, 'Mo', 'Molybdenum', 96], [43, 'Tc', 'Technetium', 98], [44, 'Ru', 'Ruthenium', 101], [45, 'Rh', 'Rhodium', 103],
  [46, 'Pd', 'Palladium', 106], [47, 'Ag', 'Silver', 108], [48, 'Cd', 'Cadmium', 112], [49, 'In', 'Indium', 115], [50, 'Sn', 'Tin', 119],
  [51, 'Sb', 'Antimony', 122], [52, 'Te', 'Tellurium', 128], [53, 'I', 'Iodine', 127], [54, 'Xe', 'Xenon', 131], [55, 'Cs', 'Caesium', 133],
  [56, 'Ba', 'Barium', 137], [57, 'La', 'Lanthanum', 139], [72, 'Hf', 'Hafnium', 178], [73, 'Ta', 'Tantalum', 181], [74, 'W', 'Tungsten', 184],
  [75, 'Re', 'Rhenium', 186], [76, 'Os', 'Osmium', 190], [77, 'Ir', 'Iridium', 192], [78, 'Pt', 'Platinum', 195], [79, 'Au', 'Gold', 197],
  [80, 'Hg', 'Mercury', 201], [81, 'Tl', 'Thallium', 204], [82, 'Pb', 'Lead', 207], [83, 'Bi', 'Bismuth', 209], [84, 'Po', 'Polonium', 209],
  [85, 'At', 'Astatine', 210], [86, 'Rn', 'Radon', 222], [87, 'Fr', 'Francium', 223], [88, 'Ra', 'Radium', 226], [89, 'Ac', 'Actinium', 227],
  [104, 'Rf', 'Rutherfordium', 267], [105, 'Db', 'Dubnium', 268], [106, 'Sg', 'Seaborgium', 269], [107, 'Bh', 'Bohrium', 270], [108, 'Hs', 'Hassium', 269],
  [109, 'Mt', 'Meitnerium', 278], [110, 'Ds', 'Darmstadtium', 281], [111, 'Rg', 'Roentgenium', 282], [112, 'Cn', 'Copernicium', 285], [113, 'Nh', 'Nihonium', 286],
  [114, 'Fl', 'Flerovium', 289], [115, 'Mc', 'Moscovium', 290], [116, 'Lv', 'Livermorium', 293], [117, 'Ts', 'Tennessine', 294], [118, 'Og', 'Oganesson', 294],
];

function position(z: number): { period: number; group: number } {
  if (z === 1) return { period: 1, group: 1 };
  if (z === 2) return { period: 1, group: 18 };
  const starts = [[3, 2], [11, 3], [19, 4], [37, 5], [55, 6], [87, 7]] as const;
  let period = 2, start = 3;
  for (const [s, p] of starts) if (z >= s) { start = s; period = p; }
  const i = z - start; // index within the period
  if (period <= 3) return { period, group: i < 2 ? i + 1 : i + 11 };
  if (period <= 5) return { period, group: i + 1 };
  // periods 6 and 7 (lanthanides/actinides removed: 57/89 sit in group 3, then 72/104 in group 4)
  if (i < 2) return { period, group: i + 1 };
  if (i === 2) return { period, group: 3 };
  return { period, group: i - 14 + 1 };
}

function kind(z: number, group: number): Element['kind'] {
  if (group === 18) return 'noble';
  if (group === 17) return z >= 117 ? 'metal' : 'halogen';
  if (z === 1) return 'nonmetal';
  if (group === 1) return 'alkali';
  if (group === 2) return 'alkaline';
  if (group >= 3 && group <= 12) return 'transition';
  if ([5, 14, 32, 33, 51, 52].includes(z)) return 'metalloid';
  if ([6, 7, 8, 15, 16, 34].includes(z)) return 'nonmetal';
  return 'metal';
}

export const ELEMENTS: Element[] = RAW.map(([z, sym, name, ar]) => {
  const { period, group } = position(z);
  return { z, sym, name, ar, period, group, kind: kind(z, group) };
});

/** Electron arrangement as taught at GCSE (first 20 elements) */
export function electronShells(z: number): string | null {
  if (z > 20) return null;
  const shells: number[] = [];
  let left = z;
  for (const cap of [2, 8, 8, 2]) {
    if (left <= 0) break;
    const n = Math.min(cap, left);
    shells.push(n);
    left -= n;
  }
  return shells.join(', ');
}
