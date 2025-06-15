
export interface Chapter {
  id: string;
  title: string;
  description?: string;
  file_link?: string;
  download_count?: number;
  content_url?: string | null;
}

export interface SubjectChapters {
  [subject: string]: {
    [classLevel: string]: Chapter[];
  };
}

// JEE Chapters Data
export const jeeChapters: SubjectChapters = {
  "Mathematics": {
    "class11": [
      { id: "math11-1", title: "Sets", description: "Basic concepts of sets and operations" },
      { id: "math11-2", title: "Relations and Functions", description: "Understanding relations and functions" },
      { id: "math11-3", title: "Trigonometric Functions", description: "Sine, cosine, tangent and their properties" },
      { id: "math11-4", title: "Principle of Mathematical Induction", description: "Proof technique using mathematical induction" },
      { id: "math11-5", title: "Complex Numbers and Quadratic Equations", description: "Complex number system and quadratic equations" },
      { id: "math11-6", title: "Linear Inequalities", description: "Solving linear inequalities in one and two variables" },
      { id: "math11-7", title: "Permutations and Combinations", description: "Counting principles and arrangements" },
      { id: "math11-8", title: "Binomial Theorem", description: "Expansion of binomial expressions" },
      { id: "math11-9", title: "Sequences and Series", description: "Arithmetic and geometric progressions" },
      { id: "math11-10", title: "Straight Lines", description: "Coordinate geometry of straight lines" },
      { id: "math11-11", title: "Conic Sections", description: "Circle, parabola, ellipse, and hyperbola" },
      { id: "math11-12", title: "Introduction to Three Dimensional Geometry", description: "3D coordinate system basics" },
      { id: "math11-13", title: "Limits and Derivatives", description: "Introduction to calculus concepts" },
      { id: "math11-14", title: "Mathematical Reasoning", description: "Logic and mathematical statements" },
      { id: "math11-15", title: "Statistics", description: "Measures of central tendency and dispersion" },
      { id: "math11-16", title: "Probability", description: "Basic probability concepts and applications" }
    ],
    "class12": [
      { id: "math12-1", title: "Relations and Functions", description: "Advanced concepts of relations and functions" },
      { id: "math12-2", title: "Inverse Trigonometric Functions", description: "Properties of inverse trigonometric functions" },
      { id: "math12-3", title: "Matrices", description: "Matrix operations and properties" },
      { id: "math12-4", title: "Determinants", description: "Determinant calculation and properties" },
      { id: "math12-5", title: "Continuity and Differentiability", description: "Advanced calculus concepts" },
      { id: "math12-6", title: "Application of Derivatives", description: "Real-world applications of derivatives" },
      { id: "math12-7", title: "Integrals", description: "Integration techniques and methods" },
      { id: "math12-8", title: "Application of Integrals", description: "Area calculation and applications" },
      { id: "math12-9", title: "Differential Equations", description: "Solving differential equations" },
      { id: "math12-10", title: "Vector Algebra", description: "Vector operations and properties" },
      { id: "math12-11", title: "Three Dimensional Geometry", description: "Advanced 3D geometry concepts" },
      { id: "math12-12", title: "Linear Programming", description: "Optimization using linear programming" },
      { id: "math12-13", title: "Probability", description: "Advanced probability and distributions" }
    ]
  },
  "Physics": {
    "class11": [
      { id: "phy11-1", title: "Physical World", description: "Nature of physical laws and physics" },
      { id: "phy11-2", title: "Units and Measurements", description: "Units, dimensions, and measurement" },
      { id: "phy11-3", title: "Motion in a Straight Line", description: "Kinematics in one dimension" },
      { id: "phy11-4", title: "Motion in a Plane", description: "Two-dimensional motion" },
      { id: "phy11-5", title: "Laws of Motion", description: "Newton's laws and their applications" },
      { id: "phy11-6", title: "Work, Energy, and Power", description: "Energy concepts and conservation" },
      { id: "phy11-7", title: "System of Particles and Rotational Motion", description: "Center of mass and rotation" },
      { id: "phy11-8", title: "Gravitation", description: "Universal gravitation and planetary motion" },
      { id: "phy11-9", title: "Mechanical Properties of Solids", description: "Elasticity and stress-strain" },
      { id: "phy11-10", title: "Mechanical Properties of Fluids", description: "Pressure, buoyancy, and viscosity" },
      { id: "phy11-11", title: "Thermal Properties of Matter", description: "Heat, temperature, and thermal expansion" },
      { id: "phy11-12", title: "Thermodynamics", description: "Laws of thermodynamics" },
      { id: "phy11-13", title: "Kinetic Theory", description: "Molecular theory of gases" },
      { id: "phy11-14", title: "Oscillations", description: "Simple harmonic motion" },
      { id: "phy11-15", title: "Waves", description: "Wave motion and properties" }
    ],
    "class12": [
      { id: "phy12-1", title: "Electric Charges and Fields", description: "Electrostatics and electric field" },
      { id: "phy12-2", title: "Electrostatic Potential and Capacitance", description: "Electric potential and capacitors" },
      { id: "phy12-3", title: "Current Electricity", description: "Electric current and circuits" },
      { id: "phy12-4", title: "Moving Charges and Magnetism", description: "Magnetic effects of current" },
      { id: "phy12-5", title: "Magnetism and Matter", description: "Magnetic properties of materials" },
      { id: "phy12-6", title: "Electromagnetic Induction", description: "Faraday's law and Lenz's law" },
      { id: "phy12-7", title: "Alternating Current", description: "AC circuits and power" },
      { id: "phy12-8", title: "Electromagnetic Waves", description: "Properties of EM waves" },
      { id: "phy12-9", title: "Ray Optics and Optical Instruments", description: "Reflection, refraction, and optical devices" }
    ]
  },
  "Organic Chemistry": {
    "class11": [
      { id: "org11-1", title: "Organic Chemistry – Some Basic Principles and Techniques", description: "Fundamentals of organic chemistry" },
      { id: "org11-2", title: "Hydrocarbons", description: "Alkanes, alkenes, alkynes, and aromatic compounds" }
    ],
    "class12": [
      { id: "org12-1", title: "Haloalkanes and Haloarenes", description: "Organic compounds with halogens" },
      { id: "org12-2", title: "Alcohols, Phenols and Ethers", description: "Oxygen-containing organic compounds" },
      { id: "org12-3", title: "Aldehydes, Ketones and Carboxylic Acids", description: "Carbonyl compounds" },
      { id: "org12-4", title: "Organic Compounds containing Nitrogen (Amines)", description: "Nitrogen-containing organic compounds" },
      { id: "org12-5", title: "Biomolecules", description: "Carbohydrates, proteins, and nucleic acids" },
      { id: "org12-6", title: "Polymers", description: "Synthetic and natural polymers" },
      { id: "org12-7", title: "Chemistry in Everyday Life", description: "Applications of chemistry in daily life" }
    ]
  },
  "Inorganic Chemistry": {
    "class11": [
      { id: "inorg11-1", title: "Classification of Elements and Periodicity in Properties", description: "Periodic table and periodic properties" },
      { id: "inorg11-2", title: "Chemical Bonding and Molecular Structure", description: "Types of chemical bonds" },
      { id: "inorg11-3", title: "Hydrogen", description: "Properties and compounds of hydrogen" },
      { id: "inorg11-4", title: "The s-Block Elements", description: "Alkali and alkaline earth metals" },
      { id: "inorg11-5", title: "The p-Block Elements", description: "Groups 13-18 elements" },
      { id: "inorg11-6", title: "Environmental Chemistry", description: "Chemistry of environment and pollution" }
    ],
    "class12": [
      { id: "inorg12-1", title: "General Principles and Processes of Isolation of Elements", description: "Metallurgy and extraction processes" },
      { id: "inorg12-2", title: "The p-Block Elements", description: "Advanced p-block chemistry" },
      { id: "inorg12-3", title: "The d- and f-Block Elements", description: "Transition and inner transition elements" },
      { id: "inorg12-4", title: "Coordination Compounds", description: "Complex compounds and coordination chemistry" }
    ]
  },
  "Physical Chemistry": {
    "class11": [
      { id: "phys11-1", title: "Some Basic Concepts of Chemistry", description: "Atomic mass, molecular mass, and mole concept" },
      { id: "phys11-2", title: "Structure of Atom", description: "Atomic structure and electronic configuration" },
      { id: "phys11-3", title: "States of Matter", description: "Gaseous, liquid, and solid states" },
      { id: "phys11-4", title: "Thermodynamics", description: "Chemical thermodynamics" },
      { id: "phys11-5", title: "Equilibrium", description: "Chemical and ionic equilibrium" },
      { id: "phys11-6", title: "Redox Reactions", description: "Oxidation-reduction reactions" }
    ],
    "class12": [
      { id: "phys12-1", title: "The Solid State", description: "Crystal structure and solid state properties" },
      { id: "phys12-2", title: "Solutions", description: "Types of solutions and colligative properties" },
      { id: "phys12-3", title: "Electrochemistry", description: "Electrochemical cells and electrolysis" },
      { id: "phys12-4", title: "Chemical Kinetics", description: "Rate of reactions and factors affecting rate" },
      { id: "phys12-5", title: "Surface Chemistry", description: "Adsorption, catalysis, and colloids" }
    ]
  }
};

// NEET Chapters Data
export const neetChapters: SubjectChapters = {
  "Physics": {
    "class11": [
      { id: "neet-phy11-1", title: "Physical World", description: "Nature of physical laws and physics" },
      { id: "neet-phy11-2", title: "Units and Measurements", description: "Units, dimensions, and measurement" },
      { id: "neet-phy11-3", title: "Motion in a Straight Line", description: "Kinematics in one dimension" },
      { id: "neet-phy11-4", title: "Motion in a Plane", description: "Two-dimensional motion" },
      { id: "neet-phy11-5", title: "Laws of Motion", description: "Newton's laws and their applications" },
      { id: "neet-phy11-6", title: "Work, Energy, and Power", description: "Energy concepts and conservation" },
      { id: "neet-phy11-7", title: "System of Particles and Rotational Motion", description: "Center of mass and rotation" },
      { id: "neet-phy11-8", title: "Gravitation", description: "Universal gravitation and planetary motion" },
      { id: "neet-phy11-9", title: "Mechanical Properties of Solids", description: "Elasticity and stress-strain" },
      { id: "neet-phy11-10", title: "Mechanical Properties of Fluids", description: "Pressure, buoyancy, and viscosity" },
      { id: "neet-phy11-11", title: "Thermal Properties of Matter", description: "Heat, temperature, and thermal expansion" },
      { id: "neet-phy11-12", title: "Thermodynamics", description: "Laws of thermodynamics" },
      { id: "neet-phy11-13", title: "Kinetic Theory", description: "Molecular theory of gases" },
      { id: "neet-phy11-14", title: "Oscillations", description: "Simple harmonic motion" },
      { id: "neet-phy11-15", title: "Waves", description: "Wave motion and properties" }
    ],
    "class12": [
      { id: "neet-phy12-1", title: "Electric Charges and Fields", description: "Electrostatics and electric field" },
      { id: "neet-phy12-2", title: "Electrostatic Potential and Capacitance", description: "Electric potential and capacitors" },
      { id: "neet-phy12-3", title: "Current Electricity", description: "Electric current and circuits" },
      { id: "neet-phy12-4", title: "Moving Charges and Magnetism", description: "Magnetic effects of current" },
      { id: "neet-phy12-5", title: "Magnetism and Matter", description: "Magnetic properties of materials" },
      { id: "neet-phy12-6", title: "Electromagnetic Induction", description: "Faraday's law and Lenz's law" },
      { id: "neet-phy12-7", title: "Alternating Current", description: "AC circuits and power" },
      { id: "neet-phy12-8", title: "Electromagnetic Waves", description: "Properties of EM waves" },
      { id: "neet-phy12-9", title: "Ray Optics and Optical Instruments", description: "Reflection, refraction, and optical devices" }
    ]
  },
  "Botany": {
    "class11": [
      { id: "neet-bot11-1", title: "The Living World", description: "Characteristics and diversity of living organisms" },
      { id: "neet-bot11-2", title: "Biological Classification", description: "Classification systems and taxonomy" },
      { id: "neet-bot11-3", title: "Plant Kingdom", description: "Classification and characteristics of plants" },
      { id: "neet-bot11-4", title: "Morphology of Flowering Plants", description: "External structure of flowering plants" },
      { id: "neet-bot11-5", title: "Anatomy of Flowering Plants", description: "Internal structure of flowering plants" },
      { id: "neet-bot11-6", title: "Cell – The Unit of Life", description: "Cell structure and organelles" },
      { id: "neet-bot11-7", title: "Cell Cycle and Cell Division", description: "Mitosis, meiosis, and cell cycle" },
      { id: "neet-bot11-8", title: "Transport in Plants", description: "Water and mineral transport" },
      { id: "neet-bot11-9", title: "Mineral Nutrition", description: "Essential nutrients for plants" },
      { id: "neet-bot11-10", title: "Photosynthesis in Higher Plants", description: "Light and dark reactions" },
      { id: "neet-bot11-11", title: "Respiration in Plants", description: "Cellular respiration in plants" },
      { id: "neet-bot11-12", title: "Plant Growth and Development", description: "Growth regulators and development" }
    ],
    "class12": [
      { id: "neet-bot12-1", title: "Reproduction in Organisms", description: "Types of reproduction" },
      { id: "neet-bot12-2", title: "Sexual Reproduction in Flowering Plants", description: "Pollination and fertilization" },
      { id: "neet-bot12-3", title: "Principles of Inheritance and Variation", description: "Mendel's laws and genetic principles" },
      { id: "neet-bot12-4", title: "Molecular Basis of Inheritance", description: "DNA, RNA, and protein synthesis" },
      { id: "neet-bot12-5", title: "Strategies for Enhancement in Food Production", description: "Plant breeding and biotechnology" },
      { id: "neet-bot12-6", title: "Microbes in Human Welfare", description: "Beneficial microorganisms" },
      { id: "neet-bot12-7", title: "Biotechnology: Principles and Processes", description: "Genetic engineering techniques" },
      { id: "neet-bot12-8", title: "Biotechnology and its Applications", description: "Applications in agriculture and medicine" },
      { id: "neet-bot12-9", title: "Organisms and Populations", description: "Population ecology" },
      { id: "neet-bot12-10", title: "Ecosystem", description: "Ecosystem structure and function" },
      { id: "neet-bot12-11", title: "Biodiversity and Conservation", description: "Conservation of biodiversity" },
      { id: "neet-bot12-12", title: "Environmental Issues", description: "Pollution and environmental problems" }
    ]
  },
  "Zoology": {
    "class11": [
      { id: "neet-zoo11-1", title: "Animal Kingdom", description: "Classification of animals" },
      { id: "neet-zoo11-2", title: "Structural Organisation in Animals", description: "Tissues and organ systems" },
      { id: "neet-zoo11-3", title: "Biomolecules", description: "Carbohydrates, proteins, lipids, and nucleic acids" },
      { id: "neet-zoo11-4", title: "Digestion and Absorption", description: "Digestive system and nutrition" },
      { id: "neet-zoo11-5", title: "Breathing and Exchange of Gases", description: "Respiratory system" },
      { id: "neet-zoo11-6", title: "Body Fluids and Circulation", description: "Circulatory system" },
      { id: "neet-zoo11-7", title: "Excretory Products and their Elimination", description: "Excretory system" },
      { id: "neet-zoo11-8", title: "Locomotion and Movement", description: "Muscular and skeletal systems" },
      { id: "neet-zoo11-9", title: "Neural Control and Coordination", description: "Nervous system" },
      { id: "neet-zoo11-10", title: "Chemical Coordination and Integration", description: "Endocrine system" }
    ],
    "class12": [
      { id: "neet-zoo12-1", title: "Human Reproduction", description: "Reproductive system and processes" },
      { id: "neet-zoo12-2", title: "Reproductive Health", description: "Population control and reproductive health" },
      { id: "neet-zoo12-3", title: "Evolution", description: "Origin and evolution of life" },
      { id: "neet-zoo12-4", title: "Human Health and Disease", description: "Immunity and diseases" }
    ]
  },
  "Organic Chemistry": {
    "class11": [
      { id: "neet-org11-1", title: "Organic Chemistry – Some Basic Principles and Techniques", description: "Fundamentals of organic chemistry" },
      { id: "neet-org11-2", title: "Hydrocarbons", description: "Alkanes, alkenes, alkynes, and aromatic compounds" }
    ],
    "class12": [
      { id: "neet-org12-1", title: "Haloalkanes and Haloarenes", description: "Organic compounds with halogens" },
      { id: "neet-org12-2", title: "Alcohols, Phenols and Ethers", description: "Oxygen-containing organic compounds" },
      { id: "neet-org12-3", title: "Aldehydes, Ketones and Carboxylic Acids", description: "Carbonyl compounds" },
      { id: "neet-org12-4", title: "Organic Compounds containing Nitrogen (Amines)", description: "Nitrogen-containing organic compounds" },
      { id: "neet-org12-5", title: "Biomolecules", description: "Carbohydrates, proteins, and nucleic acids" },
      { id: "neet-org12-6", title: "Polymers", description: "Synthetic and natural polymers" },
      { id: "neet-org12-7", title: "Chemistry in Everyday Life", description: "Applications of chemistry in daily life" }
    ]
  },
  "Inorganic Chemistry": {
    "class11": [
      { id: "neet-inorg11-1", title: "Classification of Elements and Periodicity in Properties", description: "Periodic table and periodic properties" },
      { id: "neet-inorg11-2", title: "Chemical Bonding and Molecular Structure", description: "Types of chemical bonds" },
      { id: "neet-inorg11-3", title: "Hydrogen", description: "Properties and compounds of hydrogen" },
      { id: "neet-inorg11-4", title: "The s-Block Elements", description: "Alkali and alkaline earth metals" },
      { id: "neet-inorg11-5", title: "The p-Block Elements", description: "Groups 13-18 elements" },
      { id: "neet-inorg11-6", title: "Environmental Chemistry", description: "Chemistry of environment and pollution" }
    ],
    "class12": [
      { id: "neet-inorg12-1", title: "General Principles and Processes of Isolation of Elements", description: "Metallurgy and extraction processes" },
      { id: "neet-inorg12-2", title: "The p-Block Elements", description: "Advanced p-block chemistry" },
      { id: "neet-inorg12-3", title: "The d- and f-Block Elements", description: "Transition and inner transition elements" },
      { id: "neet-inorg12-4", title: "Coordination Compounds", description: "Complex compounds and coordination chemistry" }
    ]
  },
  "Physical Chemistry": {
    "class11": [
      { id: "neet-phys11-1", title: "Some Basic Concepts of Chemistry", description: "Atomic mass, molecular mass, and mole concept" },
      { id: "neet-phys11-2", title: "Structure of Atom", description: "Atomic structure and electronic configuration" },
      { id: "neet-phys11-3", title: "States of Matter", description: "Gaseous, liquid, and solid states" },
      { id: "neet-phys11-4", title: "Thermodynamics", description: "Chemical thermodynamics" },
      { id: "neet-phys11-5", title: "Equilibrium", description: "Chemical and ionic equilibrium" },
      { id: "neet-phys11-6", title: "Redox Reactions", description: "Oxidation-reduction reactions" }
    ],
    "class12": [
      { id: "neet-phys12-1", title: "The Solid State", description: "Crystal structure and solid state properties" },
      { id: "neet-phys12-2", title: "Solutions", description: "Types of solutions and colligative properties" },
      { id: "neet-phys12-3", title: "Electrochemistry", description: "Electrochemical cells and electrolysis" },
      { id: "neet-phys12-4", title: "Chemical Kinetics", description: "Rate of reactions and factors affecting rate" },
      { id: "neet-phys12-5", title: "Surface Chemistry", description: "Adsorption, catalysis, and colloids" }
    ]
  }
};
