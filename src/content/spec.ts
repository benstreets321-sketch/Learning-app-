// Specification coverage map: every section of each exam board specification -> the topics in this app that teach it.
// A test checks that every point maps to real topics with practice, so nothing in the exam is missed.
// Sources: DfE GCSE Mathematics subject content (codes N, A, R, G, P, S); AQA 8461/8462/8463 (sections 4.x.y);
// AQA 8700 / 8702; Edexcel 1BS0; Pearson BTEC Tech Award in Enterprise; Edexcel 1ST0; OCR J834 (R093-R099);
// Edexcel 1HI0 and AQA 8145.
import type { Subject, Unit } from './types';

export interface SpecPoint { code: string; title: string; topics: string[]; tier?: 'H'; note?: string }
export interface SpecSection { title: string; option?: { group: string; value: string }; points: SpecPoint[] }
export interface SubjectSpec { name: string; sections: SpecSection[] }

const P = (code: string, title: string, topics: string[], extra: Partial<SpecPoint> = {}): SpecPoint => ({ code, title, topics, ...extra });

const MATHS: SubjectSpec = {
  name: 'GCSE Mathematics subject content (DfE) - all boards',
  sections: [
    { title: 'Number', points: [
      P('N1', 'Order integers, decimals and fractions; use inequality symbols', ['m-num-basics']),
      P('N2', 'Four operations with integers, decimals, fractions and negatives', ['m-num-basics', 'm-num-fractions']),
      P('N3', 'Inverse operations and priority of operations (BIDMAS)', ['m-num-basics']),
      P('N4', 'Primes, factors, multiples, HCF, LCM and prime factorisation', ['m-num-factors']),
      P('N5', 'Systematic listing and the product rule for counting', ['m-prob-basics']),
      P('N6', 'Powers and roots; index notation', ['m-num-indices']),
      P('N7', 'Fractional and negative indices; laws of indices', ['m-num-indices']),
      P('N8', 'Exact calculations with fractions, multiples of π and surds', ['m-num-fractions', 'm-num-surds']),
      P('N9', 'Standard form', ['m-num-standard']),
      P('N10', 'Fractions ⇄ decimals, including recurring decimals', ['m-num-fdp']),
      P('N11', 'Fractions in ratio problems', ['m-rat-ratio']),
      P('N12', 'Fractions and percentages as operators', ['m-num-percent', 'm-num-fdp']),
      P('N13', 'Standard and compound units of measure', ['m-rat-compound']),
      P('N14', 'Estimation and checking', ['m-num-rounding']),
      P('N15', 'Rounding to decimal places and significant figures', ['m-num-rounding']),
      P('N16', 'Error intervals and bounds', ['m-num-rounding']),
      P('N-money', 'Money: best buys, interest and finance problems', ['m-num-money', 'm-num-growth']),
    ] },
    { title: 'Algebra', points: [
      P('A1-A3', 'Notation, vocabulary and substitution', ['m-alg-basics']),
      P('A4', 'Simplify and manipulate: collect, expand, factorise; laws of indices', ['m-alg-basics', 'm-alg-quad-expand']),
      P('A5', 'Rearrange formulae', ['m-alg-rearrange']),
      P('A6', 'Identities and algebraic argument/proof', ['m-alg-functions', 'm-alg-basics']),
      P('A7', 'Functions: inverse and composite', ['m-alg-functions'], { tier: 'H' }),
      P('A8-A10', 'Coordinates, straight-line graphs, gradient and intercept; parallel and perpendicular lines', ['m-alg-graphs']),
      P('A11', 'Roots, intercepts and turning points of quadratics; completing the square', ['m-alg-quadratics']),
      P('A12', 'Recognise and sketch linear, quadratic, cubic, reciprocal, exponential and trig graphs', ['m-alg-graphs2']),
      P('A13', 'Transformations of graphs', ['m-alg-graphs2'], { tier: 'H' }),
      P('A14-A15', 'Real-life graphs; gradients as rates; area under a graph', ['m-rat-rates']),
      P('A16', 'Equation of a circle and tangents', ['m-alg-graphs2'], { tier: 'H' }),
      P('A17', 'Linear equations', ['m-alg-equations']),
      P('A18', 'Quadratic equations: factorising, completing the square, formula', ['m-alg-quadratics', 'm-alg-quad-expand']),
      P('A19', 'Simultaneous equations (including linear and quadratic)', ['m-alg-simultaneous']),
      P('A20', 'Approximate solutions by iteration', ['m-alg-functions'], { tier: 'H' }),
      P('A21', 'Translate situations into equations', ['m-alg-equations']),
      P('A22', 'Linear and quadratic inequalities', ['m-alg-inequalities']),
      P('A23-A25', 'Sequences: term-to-term, nth term, special sequences', ['m-alg-sequences']),
    ] },
    { title: 'Ratio, proportion and rates of change', points: [
      P('R1', 'Change between standard units', ['m-rat-compound']),
      P('R2', 'Scale factors, scale diagrams and maps', ['m-geo-construct']),
      P('R3-R8', 'Ratio: notation, simplifying, dividing, linking to fractions', ['m-rat-ratio']),
      P('R9', 'Percentages: change, reverse, simple interest', ['m-num-percent']),
      P('R10, R13', 'Direct and inverse proportion', ['m-rat-proportion']),
      P('R11', 'Compound units: speed, density, pressure', ['m-rat-compound']),
      P('R12', 'Similarity and scale factors for length, area and volume', ['m-geo-transform']),
      P('R14-R15', 'Gradient as rate of change; instantaneous and average rates', ['m-rat-rates']),
      P('R16', 'Growth and decay; compound interest', ['m-num-growth']),
    ] },
    { title: 'Geometry and measures', points: [
      P('G1-G4', 'Angle facts, parallel lines, polygons and properties of shapes', ['m-geo-angles']),
      P('G2', 'Constructions and loci', ['m-geo-construct']),
      P('G5-G6', 'Congruence and geometric reasoning', ['m-geo-transform']),
      P('G7-G8', 'Transformations (including negative scale factors and invariance)', ['m-geo-transform']),
      P('G9-G10', 'Circle definitions and circle theorems', ['m-geo-circles']),
      P('G11', 'Geometric problems on coordinate axes', ['m-alg-graphs']),
      P('G12-G13', '3D shapes; plans and elevations', ['m-geo-construct', 'm-geo-volume']),
      P('G14-G15', 'Units of measure; bearings and scale drawings', ['m-rat-compound', 'm-geo-angles', 'm-geo-construct']),
      P('G16-G18', 'Area, perimeter, circles, arcs and sectors; surface area and volume', ['m-geo-area', 'm-geo-volume']),
      P('G19', 'Similar shapes: lengths, areas and volumes', ['m-geo-transform'], { tier: 'H' }),
      P('G20-G21', "Pythagoras' theorem, trigonometry and exact values", ['m-geo-pythag', 'm-geo-trig']),
      P('G22-G23', 'Sine rule, cosine rule and ½ab sin C', ['m-geo-sincos'], { tier: 'H' }),
      P('G24-G25', 'Vectors', ['m-geo-vectors']),
    ] },
    { title: 'Probability', points: [
      P('P1-P5', 'Relative frequency, expected outcomes, probabilities summing to 1', ['m-prob-basics']),
      P('P6-P7', 'Sample spaces: tables, frequency trees, Venn diagrams', ['m-prob-basics', 'm-prob-combined']),
      P('P8', 'Combined events and tree diagrams', ['m-prob-combined']),
      P('P9', 'Conditional probability', ['m-prob-combined'], { tier: 'H' }),
    ] },
    { title: 'Statistics', points: [
      P('S1', 'Populations and samples', ['m-stat-charts']),
      P('S2-S3', 'Charts and diagrams; cumulative frequency, box plots, histograms', ['m-stat-charts']),
      P('S4-S5', 'Averages, spread and comparing distributions', ['m-stat-averages']),
      P('S6', 'Scatter graphs, correlation and lines of best fit', ['m-stat-charts']),
    ] },
  ],
};

const BIOLOGY: SubjectSpec = {
  name: 'AQA GCSE Biology (8461)',
  sections: [
    { title: '4.1 Cell biology', points: [
      P('4.1.1', 'Cell structure, microscopy and culturing microorganisms', ['bio-cells', 'bio-microbes']),
      P('4.1.2', 'Cell division, mitosis and stem cells', ['bio-division']),
      P('4.1.3', 'Transport in cells: diffusion, osmosis, active transport', ['bio-transport']),
    ] },
    { title: '4.2 Organisation', points: [
      P('4.2.1-4.2.2.1', 'Principles of organisation; digestive system and enzymes', ['bio-digestion']),
      P('4.2.2.2-4.2.2.3', 'The heart, blood vessels and blood', ['bio-heart']),
      P('4.2.2.4-4.2.2.7', 'Coronary heart disease, health, lifestyle and cancer', ['bio-heart', 'bio-health']),
      P('4.2.3', 'Plant tissues, transpiration and translocation', ['bio-plants']),
    ] },
    { title: '4.3 Infection and response', points: [
      P('4.3.1', 'Communicable diseases, defences, vaccination, drugs', ['bio-pathogens', 'bio-immunity']),
      P('4.3.2', 'Monoclonal antibodies', ['bio-mab'], { tier: 'H' }),
      P('4.3.3', 'Plant disease and defences', ['bio-mab']),
    ] },
    { title: '4.4 Bioenergetics', points: [
      P('4.4.1', 'Photosynthesis and limiting factors', ['bio-photosynthesis']),
      P('4.4.2', 'Respiration and metabolism', ['bio-respiration']),
    ] },
    { title: '4.5 Homeostasis and response', points: [
      P('4.5.1-4.5.2', 'Homeostasis; the nervous system, reflexes, brain and eye', ['bio-nervous']),
      P('4.5.3', 'Hormones: blood glucose, adrenaline, thyroxine, reproduction, contraception, IVF', ['bio-hormones', 'bio-reproduction-h']),
      P('4.5.2.5, 4.5.3.3', 'Temperature control, water and nitrogen balance, the kidney', ['bio-kidney']),
      P('4.5.4', 'Plant hormones', ['bio-kidney']),
    ] },
    { title: '4.6 Inheritance, variation and evolution', points: [
      P('4.6.1', 'Reproduction, meiosis, DNA, protein synthesis and inheritance', ['bio-dna', 'bio-genetics']),
      P('4.6.2', 'Variation, evolution, selective breeding, genetic engineering, cloning', ['bio-evolution', 'bio-division']),
      P('4.6.3', 'Development of understanding: Mendel, Darwin, Wallace, speciation, fossils, extinction, resistant bacteria', ['bio-evolution']),
      P('4.6.4', 'Classification', ['bio-classification']),
    ] },
    { title: '4.7 Ecology', points: [
      P('4.7.1-4.7.2', 'Adaptations, interdependence, competition and ecosystems; sampling', ['bio-ecosystems']),
      P('4.7.2.2-4.7.2.4', 'Material cycles and decomposition', ['bio-cycles']),
      P('4.7.3', 'Biodiversity and human impact', ['bio-biodiversity']),
      P('4.7.4', 'Trophic levels and pyramids of biomass', ['bio-cycles']),
      P('4.7.5', 'Food production and biotechnology', ['bio-biodiversity']),
    ] },
  ],
};

const CHEMISTRY: SubjectSpec = {
  name: 'AQA GCSE Chemistry (8462)',
  sections: [
    { title: '4.1 Atomic structure and the periodic table', points: [
      P('4.1.1', 'Atoms, mixtures, history of the atom, isotopes, electron structure', ['chem-atoms']),
      P('4.1.2', 'The periodic table: development, groups 0, 1 and 7', ['chem-periodic']),
      P('4.1.3', 'Transition metals', ['chem-periodic']),
    ] },
    { title: '4.2 Bonding, structure and properties', points: [
      P('4.2.1', 'Ionic, covalent and metallic bonding', ['chem-bonding']),
      P('4.2.2-4.2.3', 'Structure and properties; carbon structures', ['chem-structure']),
      P('4.2.4', 'Nanoparticles', ['chem-structure']),
    ] },
    { title: '4.3 Quantitative chemistry', points: [
      P('4.3.1-4.3.2', 'Conservation of mass, moles, concentration', ['chem-moles']),
      P('4.3.3-4.3.5', 'Yield, atom economy, titrations and gas volumes', ['chem-yield']),
    ] },
    { title: '4.4 Chemical changes', points: [
      P('4.4.1', 'Reactivity of metals, extraction, oxidation and reduction', ['chem-reactivity']),
      P('4.4.2', 'Reactions of acids, salts, pH, strong and weak acids', ['chem-acids']),
      P('4.4.3', 'Electrolysis', ['chem-electrolysis']),
    ] },
    { title: '4.5 Energy changes', points: [
      P('4.5.1', 'Exothermic and endothermic reactions, bond energies', ['chem-energychanges']),
      P('4.5.2', 'Chemical cells and fuel cells', ['chem-energychanges']),
    ] },
    { title: '4.6 Rate and extent of chemical change', points: [
      P('4.6.1', 'Rates of reaction and collision theory', ['chem-rate']),
      P('4.6.2', 'Reversible reactions and dynamic equilibrium', ['chem-equilibrium']),
    ] },
    { title: '4.7 Organic chemistry', points: [
      P('4.7.1', 'Crude oil, hydrocarbons, fractional distillation, cracking', ['chem-crude']),
      P('4.7.2-4.7.3', 'Alkenes, alcohols, carboxylic acids, polymers, DNA and amino acids', ['chem-organic2']),
    ] },
    { title: '4.8 Chemical analysis', points: [
      P('4.8.1-4.8.2', 'Purity, formulations, chromatography and gas tests', ['chem-tests']),
      P('4.8.3', 'Identifying ions: flame tests, precipitates, instrumental methods', ['chem-tests']),
    ] },
    { title: '4.9 Chemistry of the atmosphere', points: [
      P('4.9.1-4.9.3', 'Evolution of the atmosphere, greenhouse gases, pollutants', ['chem-atmosphere']),
    ] },
    { title: '4.10 Using resources', points: [
      P('4.10.1-4.10.2', 'Potable water, waste water, metal extraction, LCA and recycling', ['chem-resources']),
      P('4.10.3-4.10.4', 'Corrosion, alloys, ceramics, composites; Haber process and NPK fertilisers', ['chem-resources']),
    ] },
  ],
};

const PHYSICS: SubjectSpec = {
  name: 'AQA GCSE Physics (8463)',
  sections: [
    { title: '4.1 Energy', points: [
      P('4.1.1', 'Energy stores, work and power', ['phys-stores']),
      P('4.1.1.3, 4.1.2', 'Specific heat capacity, dissipation and efficiency', ['phys-efficiency']),
      P('4.1.3', 'National and global energy resources', ['phys-resources']),
    ] },
    { title: '4.2 Electricity', points: [
      P('4.2.1-4.2.2', 'Current, potential difference, resistance; series and parallel', ['phys-circuits']),
      P('4.2.3-4.2.4', 'Mains electricity, power and the National Grid', ['phys-mains']),
      P('4.2.5', 'Static electricity and electric fields', ['phys-static']),
    ] },
    { title: '4.3 Particle model of matter', points: [
      P('4.3.1-4.3.3', 'Density, changes of state, internal energy, latent heat, gas pressure', ['phys-particles']),
    ] },
    { title: '4.4 Atomic structure', points: [
      P('4.4.1-4.4.2', 'Atoms, isotopes, radioactive decay, half-life, contamination and irradiation', ['phys-radiation']),
      P('4.4.3-4.4.4', 'Background radiation, uses in medicine, fission and fusion', ['phys-nuclear']),
    ] },
    { title: '4.5 Forces', points: [
      P('4.5.1-4.5.2', 'Forces, resultant forces, weight and work done', ['phys-force-basics']),
      P('4.5.3', 'Forces and elasticity', ['phys-elastic']),
      P('4.5.4-4.5.5', 'Moments, levers, gears; pressure in fluids', ['phys-moments']),
      P('4.5.6.1', 'Describing motion: speed, velocity, acceleration, graphs', ['phys-motion']),
      P('4.5.6.2-4.5.7', "Newton's laws, stopping distances and momentum", ['phys-newton']),
    ] },
    { title: '4.6 Waves', points: [
      P('4.6.1', 'Wave properties, reflection, sound, ultrasound and seismic waves', ['phys-wave-props', 'phys-light-sound']),
      P('4.6.2', 'Electromagnetic waves, lenses, visible light and black body radiation', ['phys-em', 'phys-light-sound']),
    ] },
    { title: '4.7 Magnetism and electromagnetism', points: [
      P('4.7.1-4.7.3', 'Magnets, electromagnets, the motor effect, induction and transformers', ['phys-magnetism']),
    ] },
    { title: '4.8 Space physics', points: [
      P('4.8.1-4.8.2', 'Solar system, life cycle of stars, orbits, red-shift and the Big Bang', ['phys-space-topic']),
    ] },
  ],
};

const ENGLISH_LANGUAGE: SubjectSpec = {
  name: 'AQA GCSE English Language (8700)',
  sections: [
    { title: 'Skills across both papers', points: [
      P('AO2', 'Language and structure methods and terminology', ['el-methods']),
      P('AO6', 'Technical accuracy: vocabulary, sentences, spelling and punctuation', ['el-spag']),
    ] },
    { title: 'Paper 1: Explorations in creative reading and writing', points: [
      P('P1 Q1', 'List four things (AO1)', ['el-p1q1']),
      P('P1 Q2', 'Language analysis (AO2)', ['el-p1q2']),
      P('P1 Q3', 'Structure analysis (AO2)', ['el-p1q3']),
      P('P1 Q4', 'Critical evaluation (AO4)', ['el-p1q4']),
      P('P1 Q5', 'Descriptive or narrative writing (AO5, AO6)', ['el-p1q5']),
    ] },
    { title: "Paper 2: Writers' viewpoints and perspectives", points: [
      P('P2 Q1-Q2', 'True statements and summary of differences (AO1)', ['el-p2q1q2']),
      P('P2 Q3', 'Language analysis (AO2)', ['el-p2q3']),
      P('P2 Q4', 'Comparing writers\' perspectives (AO3)', ['el-p2q4']),
      P('P2 Q5', 'Writing to present a viewpoint (AO5, AO6)', ['el-p2q5']),
    ] },
    { title: 'Non-exam assessment', points: [
      P('AO7-AO9', 'Spoken Language endorsement', ['el-spoken']),
    ] },
  ],
};

const BUSINESS: SubjectSpec = {
  name: 'Edexcel GCSE Business (1BS0) / Pearson BTEC Tech Award in Enterprise',
  sections: [
    { title: 'Edexcel Theme 1: Investigating small business', option: { group: 'business-course', value: 'gcse' }, points: [
      P('1.1', 'Enterprise and entrepreneurship', ['bus-enterprise']),
      P('1.2', 'Spotting a business opportunity: customer needs, market research, segmentation, competition', ['bus-research', 'bus-competition']),
      P('1.3', 'Putting an idea into practice: aims, revenue, costs, profit, cash and finance', ['bus-enterprise', 'bus-costs', 'bus-cash', 'bus-sources']),
      P('1.4', 'Making the business effective: ownership, location, marketing mix, business plan', ['bus-ownership', 'bus-mix', 'bus-stakeholders']),
      P('1.5', 'External influences: stakeholders, technology, legislation, the economy', ['bus-stakeholders', 'bus-external']),
    ] },
    { title: 'Edexcel Theme 2: Building a business', option: { group: 'business-course', value: 'gcse' }, points: [
      P('2.1', 'Growing the business: growth, globalisation, ethics and the environment', ['bus-growth']),
      P('2.2', 'Marketing decisions: product, price, promotion, place', ['bus-mix']),
      P('2.3', 'Operational decisions: production, supply chain, quality, sales process', ['bus-ops']),
      P('2.4', 'Financial decisions: calculations and performance', ['bus-costs', 'bus-performance']),
      P('2.5', 'Human resource decisions: structure, recruitment, motivation, training', ['bus-hr']),
      P('Skills', 'Calculate, explain, analyse and evaluate questions', ['bus-technique']),
    ] },
    { title: 'BTEC Enterprise Component 1: Exploring enterprises', option: { group: 'business-course', value: 'btec' }, points: [
      P('C1 A', 'Characteristics of enterprises and entrepreneurs', ['ent-types']),
      P('C1 B-C', 'Market research, customers, competitors, PEST and SWOT', ['ent-market']),
    ] },
    { title: 'BTEC Enterprise Component 2: Planning and pitching', option: { group: 'business-course', value: 'btec' }, points: [
      P('C2 A-C', 'Planning, pitching and reviewing an enterprise activity', ['ent-pitch']),
    ] },
    { title: 'BTEC Enterprise Component 3: Promotion and finance (exam)', option: { group: 'business-course', value: 'btec' }, points: [
      P('C3 A', 'Promotion and targeting', ['ent-promotion']),
      P('C3 B', 'Financial documents and payment methods', ['ent-documents']),
      P('C3 B-C', 'Financial statements, cash flow and break-even', ['ent-finance']),
      P('C3 D', 'Sources of business support and finance', ['ent-finance']),
    ] },
  ],
};

const STATISTICS: SubjectSpec = {
  name: 'Edexcel GCSE Statistics (1ST0)',
  sections: [
    { title: 'The collection of data', points: [
      P('Planning', 'Hypotheses, data types, experimental design and variables', ['st-planning']),
      P('Sampling', 'Populations, sampling methods and capture-recapture', ['st-sampling']),
      P('Collecting', 'Questionnaires, interviews and data sources', ['st-questionnaires']),
    ] },
    { title: 'Processing, representing and analysing data', points: [
      P('Diagrams', 'Tables and diagrams including histograms, choropleths, population pyramids', ['st-diagrams']),
      P('Averages', 'Measures of central tendency', ['st-averages']),
      P('Spread', 'Range, IQR, standard deviation, skew and outliers', ['st-spread']),
      P('Index numbers', 'Index numbers, CPI/RPI, crude and standardised rates', ['st-index']),
      P('Correlation', 'Scatter diagrams, regression lines, Spearman and PMCC', ['st-correlation']),
      P('Time series', 'Moving averages, trend and seasonal variation', ['st-timeseries']),
      P('Quality assurance', 'Control charts', ['st-quality']),
    ] },
    { title: 'Probability', points: [
      P('Probability', 'Probability, risk, Venn and tree diagrams', ['st-probability']),
      P('Distributions', 'Binomial and normal distributions', ['st-distributions'], { tier: 'H' }),
    ] },
  ],
};

const IMEDIA: SubjectSpec = {
  name: 'OCR Cambridge National in Creative iMedia (J834)',
  sections: [
    { title: 'R093 Creative iMedia in the media industry (exam)', points: [
      P('TA1', 'The media industry: sectors, products and job roles', ['im-sectors', 'im-roles']),
      P('TA2', 'Factors influencing product design: purpose, audience, research, codes and conventions', ['im-purpose', 'im-audience', 'im-codes']),
      P('TA3', 'Pre-production planning: work plans, ideas documents, planning documents, legal issues', ['im-workplans', 'im-ideas', 'im-planning', 'im-legal']),
      P('TA4', 'Distribution: platforms, media and file formats', ['im-distribution', 'im-files']),
    ] },
    { title: 'R094 Visual identity and digital graphics (NEA)', points: [P('R094', 'Visual identity and digital graphics', ['im-r094-guide'])] },
    { title: 'R097 Interactive digital media (NEA)', option: { group: 'imedia-optional', value: 'r097' }, points: [P('R097', 'Interactive digital media', ['im-r097-guide'])] },
    { title: 'R095 Characters and comics (NEA)', option: { group: 'imedia-optional', value: 'r095' }, points: [P('R095', 'Characters and comics', ['im-r095-guide'])] },
    { title: 'R096 Animation with audio (NEA)', option: { group: 'imedia-optional', value: 'r096' }, points: [P('R096', 'Animation with audio', ['im-r096-guide'])] },
    { title: 'R098 Visual imaging (NEA)', option: { group: 'imedia-optional', value: 'r098' }, points: [P('R098', 'Visual imaging', ['im-r098-guide'])] },
    { title: 'R099 Digital games (NEA)', option: { group: 'imedia-optional', value: 'r099' }, points: [P('R099', 'Digital games', ['im-r099-guide'])] },
  ],
};

/** Literature and History: the specification IS the set texts / units the school chose, so it is built from the units. */
function fromUnits(subject: Subject, name: string, label: (u: Unit) => string): SubjectSpec {
  return {
    name,
    sections: subject.units.map((u) => ({
      title: label(u),
      option: u.option,
      points: u.topics.map((t, i) => P(`${i + 1}`, t.title, [t.id])),
    })),
  };
}

const BUILT: Record<string, SubjectSpec> = {
  maths: MATHS, biology: BIOLOGY, chemistry: CHEMISTRY, physics: PHYSICS,
  'english-language': ENGLISH_LANGUAGE, business: BUSINESS, statistics: STATISTICS, imedia: IMEDIA,
};

export function specFor(subject: Subject): SubjectSpec {
  if (BUILT[subject.id]) return BUILT[subject.id];
  if (subject.id === 'english-literature') {
    return fromUnits(subject, 'AQA GCSE English Literature (8702)', (u) => {
      const g = u.option?.group;
      const paper = g === 'lit-shakespeare' ? 'Paper 1A Shakespeare' : g === 'lit-novel' ? 'Paper 1B 19th-century novel' : g === 'lit-modern' ? 'Paper 2A Modern text' : g === 'lit-poetry' ? 'Paper 2B Poetry anthology' : u.id === 'unseen' ? 'Paper 2C Unseen poetry' : 'Assessment objectives and essay skills';
      return `${paper}: ${u.title}`;
    });
  }
  return fromUnits(subject, subject.id === 'history' ? 'Edexcel GCSE History (1HI0) / AQA GCSE History (8145)' : subject.name, (u) => u.title);
}

export const SPEC_SUBJECTS = Object.keys(BUILT);
