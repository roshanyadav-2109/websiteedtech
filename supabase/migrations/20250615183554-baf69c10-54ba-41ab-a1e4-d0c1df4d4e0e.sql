
-- This script will insert the remaining chapters for JEE and NEET into your 'notes' table.

-- JEE Class 11 - Physics (Missing)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Motion in a Plane', 'Physics', 'class11', 'JEE', 'Vectors, scalar and vector products, projectile motion.', true),
  ('Laws of Motion', 'Physics', 'class11', 'JEE', 'Newton''s laws of motion, friction, circular motion.', true),
  ('Work, Energy and Power', 'Physics', 'class11', 'JEE', 'Work-energy theorem, conservative forces, potential energy.', true),
  ('System of Particles and Rotational Motion', 'Physics', 'class11', 'JEE', 'Centre of mass, torque, angular momentum, moment of inertia.', true),
  ('Gravitation', 'Physics', 'class11', 'JEE', 'Kepler''s laws, universal law of gravitation, gravitational potential energy.', true),
  ('Mechanical Properties of Solids', 'Physics', 'class11', 'JEE', 'Elastic behaviour, stress-strain relationship, Hooke''s law.', true),
  ('Mechanical Properties of Fluids', 'Physics', 'class11', 'JEE', 'Pressure, viscosity, surface tension, Bernoulli''s principle.', true),
  ('Thermal Properties of Matter', 'Physics', 'class11', 'JEE', 'Heat, temperature, thermal expansion, specific heat capacity.', true),
  ('Thermodynamics', 'Physics', 'class11', 'JEE', 'Zeroth, first, and second laws of thermodynamics.', true),
  ('Kinetic Theory', 'Physics', 'class11', 'JEE', 'Kinetic theory of gases, degrees of freedom, Avogadro''s number.', true),
  ('Oscillations', 'Physics', 'class11', 'JEE', 'Simple harmonic motion, damped and forced oscillations.', true),
  ('Waves', 'Physics', 'class11', 'JEE', 'Wave motion, principle of superposition, Doppler effect.', true);

-- JEE Class 11 - Mathematics (Missing)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Trigonometric Functions', 'Mathematics', 'class11', 'JEE', 'Positive and negative angles, measuring angles in radians and in degrees.', true),
  ('Principle of Mathematical Induction', 'Mathematics', 'class11', 'JEE', 'Process of the proof by induction, motivating the application.', true),
  ('Complex Numbers and Quadratic Equations', 'Mathematics', 'class11', 'JEE', 'Algebraic properties of complex numbers, argand plane.', true),
  ('Linear Inequalities', 'Mathematics', 'class11', 'JEE', 'Algebraic solutions of linear inequalities in one variable and their representation on the number line.', true),
  ('Permutations and Combinations', 'Mathematics', 'class11', 'JEE', 'Fundamental principle of counting, factorial n.', true),
  ('Binomial Theorem', 'Mathematics', 'class11', 'JEE', 'History, statement and proof of the binomial theorem.', true),
  ('Sequences and Series', 'Mathematics', 'class11', 'JEE', 'Arithmetic progression (A. P.), arithmetic mean (A.M.).', true),
  ('Straight Lines', 'Mathematics', 'class11', 'JEE', 'Slope of a line and angle between two lines.', true),
  ('Conic Sections', 'Mathematics', 'class11', 'JEE', 'Sections of a cone, circle, ellipse, parabola, hyperbola.', true),
  ('Introduction to Three Dimensional Geometry', 'Mathematics', 'class11', 'JEE', 'Coordinate axes and coordinate planes in three dimensions.', true),
  ('Limits and Derivatives', 'Mathematics', 'class11', 'JEE', 'Intuitive idea of derivatives, limits of polynomials and rational functions.', true),
  ('Mathematical Reasoning', 'Mathematics', 'class11', 'JEE', 'Mathematically acceptable statements, connecting words/ phrases.', true),
  ('Statistics', 'Mathematics', 'class11', 'JEE', 'Measures of dispersion: range, mean deviation, variance and standard deviation.', true),
  ('Probability', 'Mathematics', 'class11', 'JEE', 'Random experiments, outcomes, sample spaces.', true);

-- JEE Class 11 - Chemistry (Missing)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('States of Matter: Gases and Liquids', 'Physical Chemistry', 'class11', 'JEE', 'Three states of matter, intermolecular interactions, type of bonding.', true),
  ('Thermodynamics', 'Physical Chemistry', 'class11', 'JEE', 'Concepts of system, types of systems, surroundings.', true),
  ('Equilibrium', 'Physical Chemistry', 'class11', 'JEE', 'Equilibrium in physical and chemical processes, dynamic nature of equilibrium.', true),
  ('Redox Reactions', 'Inorganic Chemistry', 'class11', 'JEE', 'Concept of oxidation and reduction, redox reactions.', true),
  ('Hydrogen', 'Inorganic Chemistry', 'class11', 'JEE', 'Position of hydrogen in periodic table, occurrence, isotopes.', true),
  ('s-Block Elements', 'Inorganic Chemistry', 'class11', 'JEE', 'Group 1 and group 2 elements, general introduction, electronic configuration.', true),
  ('Some p-Block Elements', 'Inorganic Chemistry', 'class11', 'JEE', 'General introduction to p-block elements.', true),
  ('Environmental Chemistry', 'Organic Chemistry', 'class11', 'JEE', 'Environmental pollution: Air, water and soil pollution.', true);
  
-- JEE Class 12 - Physics (Missing)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Current Electricity', 'Physics', 'class12', 'JEE', 'Electric current, flow of electric charges in a metallic conductor.', true),
  ('Moving Charges and Magnetism', 'Physics', 'class12', 'JEE', 'Concept of magnetic field, Oersted''s experiment.', true),
  ('Magnetism and Matter', 'Physics', 'class12', 'JEE', 'Bar magnet, bar magnet as an equivalent solenoid, magnetic field lines.', true),
  ('Electromagnetic Induction', 'Physics', 'class12', 'JEE', 'Experiments of Faraday and Henry, magnetic flux.', true),
  ('Alternating Current', 'Physics', 'class12', 'JEE', 'Alternating currents, peak and rms value of alternating current/voltage.', true),
  ('Electromagnetic Waves', 'Physics', 'class12', 'JEE', 'Need for displacement current, electromagnetic waves and their characteristics.', true),
  ('Ray Optics and Optical Instruments', 'Physics', 'class12', 'JEE', 'Reflection of light, spherical mirrors, mirror formula.', true),
  ('Wave Optics', 'Physics', 'class12', 'JEE', 'Wavefront and Huygens'' principle, reflection and refraction of plane wave.', true),
  ('Dual Nature of Radiation and Matter', 'Physics', 'class12', 'JEE', 'Dual nature of radiation, Photoelectric effect, Hertz and Lenard''s observations.', true),
  ('Atoms', 'Physics', 'class12', 'JEE', 'Alpha-particle scattering experiment; Rutherford''s model of atom.', true),
  ('Nuclei', 'Physics', 'class12', 'JEE', 'Composition and size of nucleus, atomic masses, isotopes, isobars.', true),
  ('Semiconductor Electronics: Materials, Devices and Simple Circuits', 'Physics', 'class12', 'JEE', 'Energy bands in solids, conductors, insulators and semiconductors.', true),
  ('Communication Systems', 'Physics', 'class12', 'JEE', 'Elements of a communication system, basic terminology used in electronic communication systems.', true);

-- JEE Class 12 - Mathematics (Missing)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Matrices', 'Mathematics', 'class12', 'JEE', 'Concept, notation, order, equality, types of matrices, zero and identity matrix.', true),
  ('Determinants', 'Mathematics', 'class12', 'JEE', 'Determinant of a square matrix, properties of determinants.', true),
  ('Continuity and Differentiability', 'Mathematics', 'class12', 'JEE', 'Continuity and differentiability, derivative of composite functions, chain rule.', true),
  ('Application of Derivatives', 'Mathematics', 'class12', 'JEE', 'Rate of change of bodies, increasing/decreasing functions, tangents and normals.', true),
  ('Integrals', 'Mathematics', 'class12', 'JEE', 'Integration as inverse process of differentiation.', true),
  ('Application of Integrals', 'Mathematics', 'class12', 'JEE', 'Applications in finding the area under simple curves.', true),
  ('Differential Equations', 'Mathematics', 'class12', 'JEE', 'Definition, order, degree, general and particular solutions of a differential equation.', true),
  ('Vector Algebra', 'Mathematics', 'class12', 'JEE', 'Vectors and scalars, magnitude and direction of a vector.', true),
  ('Three Dimensional Geometry', 'Mathematics', 'class12', 'JEE', 'Direction cosines and direction ratios of a line joining two points.', true),
  ('Linear Programming', 'Mathematics', 'class12', 'JEE', 'Introduction, related terminology such as constraints, objective function, optimization.', true),
  ('Probability', 'Mathematics', 'class12', 'JEE', 'Conditional probability, multiplication theorem on probability.', true);

-- JEE Class 12 - Chemistry (Missing)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Solid State', 'Physical Chemistry', 'class12', 'JEE', 'Classification of solids based on different binding forces.', true),
  ('Chemical Kinetics', 'Physical Chemistry', 'class12', 'JEE', 'Rate of a reaction, factors affecting rates of reaction.', true),
  ('Surface Chemistry', 'Physical Chemistry', 'class12', 'JEE', 'Adsorption, physisorption and chemisorption.', true),
  ('General Principles and Processes of Isolation of Elements', 'Inorganic Chemistry', 'class12', 'JEE', 'Principles and methods of extraction.', true),
  ('p-Block Elements', 'Inorganic Chemistry', 'class12', 'JEE', 'Group 15, 16, 17 and 18 elements.', true),
  ('Aldehydes, Ketones and Carboxylic Acids', 'Organic Chemistry', 'class12', 'JEE', 'Nomenclature, nature of carbonyl group, methods of preparation.', true),
  ('Organic Compounds Containing Nitrogen', 'Organic Chemistry', 'class12', 'JEE', 'Amines: Nomenclature, classification, structure, methods of preparation.', true),
  ('Biomolecules', 'Organic Chemistry', 'class12', 'JEE', 'Carbohydrates, proteins, vitamins, nucleic acids.', true),
  ('Polymers', 'Organic Chemistry', 'class12', 'JEE', 'Classification, methods of polymerization.', true),
  ('Chemistry in Everyday Life', 'Organic Chemistry', 'class12', 'JEE', 'Chemicals in medicines, food and cleaning agents.', true);

-- NEET Class 11 - Biology (Missing)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Plant Kingdom', 'Botany', 'class11', 'NEET', 'Algae, Bryophytes, Pteridophytes, Gymnosperms and Angiosperms.', true),
  ('Animal Kingdom', 'Zoology', 'class11', 'NEET', 'Basis of classification; phyla, classes and main characters.', true),
  ('Morphology of Flowering Plants', 'Botany', 'class11', 'NEET', 'Morphology and modifications; Tissues.', true),
  ('Anatomy of Flowering Plants', 'Botany', 'class11', 'NEET', 'Anatomy and functions of different parts of flowering plants.', true),
  ('Cell: The Unit of Life', 'Zoology', 'class11', 'NEET', 'Cell theory and cell as the basic unit of life.', true),
  ('Cell Cycle and Cell Division', 'Zoology', 'class11', 'NEET', 'Cell cycle, mitosis, meiosis and their significance.', true),
  ('Transport in Plants', 'Botany', 'class11', 'NEET', 'Movement of water, gases and nutrients; cell to cell transport.', true),
  ('Mineral Nutrition', 'Botany', 'class11', 'NEET', 'Essential minerals, macro and micronutrients and their role.', true),
  ('Photosynthesis in Higher Plants', 'Botany', 'class11', 'NEET', 'Photosynthesis as a means of autotrophic nutrition.', true),
  ('Respiration in Plants', 'Botany', 'class11', 'NEET', 'Exchange of gases; cellular respiration.', true),
  ('Plant Growth and Development', 'Botany', 'class11', 'NEET', 'Seed germination; phases of plant growth and plant growth rate.', true),
  ('Digestion and Absorption', 'Zoology', 'class11', 'NEET', 'Alimentary canal and digestive glands; role of digestive enzymes.', true),
  ('Breathing and Exchange of Gases', 'Zoology', 'class11', 'NEET', 'Respiratory organs in animals; respiratory system in humans.', true),
  ('Body Fluids and Circulation', 'Zoology', 'class11', 'NEET', 'Composition of blood, blood groups, coagulation of blood.', true),
  ('Excretory Products and their Elimination', 'Zoology', 'class11', 'NEET', 'Modes of excretion; human excretory system.', true),
  ('Locomotion and Movement', 'Zoology', 'class11', 'NEET', 'Types of movement; skeletal system and its functions.', true),
  ('Neural Control and Coordination', 'Zoology', 'class11', 'NEET', 'Neuron and nerves; nervous system in humans.', true),
  ('Chemical Coordination and Integration', 'Zoology', 'class11', 'NEET', 'Endocrine glands and hormones; human endocrine system.', true);

-- NEET Class 11 - Physics (Missing - same as JEE)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Motion in a Plane', 'Physics', 'class11', 'NEET', 'Vectors, scalar and vector products, projectile motion.', true),
  ('Laws of Motion', 'Physics', 'class11', 'NEET', 'Newton''s laws of motion, friction, circular motion.', true),
  ('Work, Energy and Power', 'Physics', 'class11', 'NEET', 'Work-energy theorem, conservative forces, potential energy.', true),
  ('System of Particles and Rotational Motion', 'Physics', 'class11', 'NEET', 'Centre of mass, torque, angular momentum, moment of inertia.', true),
  ('Gravitation', 'Physics', 'class11', 'NEET', 'Kepler''s laws, universal law of gravitation, gravitational potential energy.', true),
  ('Mechanical Properties of Solids', 'Physics', 'class11', 'NEET', 'Elastic behaviour, stress-strain relationship, Hooke''s law.', true),
  ('Mechanical Properties of Fluids', 'Physics', 'class11', 'NEET', 'Pressure, viscosity, surface tension, Bernoulli''s principle.', true),
  ('Thermal Properties of Matter', 'Physics', 'class11', 'NEET', 'Heat, temperature, thermal expansion, specific heat capacity.', true),
  ('Thermodynamics', 'Physics', 'class11', 'NEET', 'Zeroth, first, and second laws of thermodynamics.', true),
  ('Kinetic Theory', 'Physics', 'class11', 'NEET', 'Kinetic theory of gases, degrees of freedom, Avogadro''s number.', true),
  ('Oscillations', 'Physics', 'class11', 'NEET', 'Simple harmonic motion, damped and forced oscillations.', true),
  ('Waves', 'Physics', 'class11', 'NEET', 'Wave motion, principle of superposition, Doppler effect.', true);

-- NEET Class 11 - Chemistry (Missing - same as JEE)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('States of Matter: Gases and Liquids', 'Physical Chemistry', 'class11', 'NEET', 'Three states of matter, intermolecular interactions, type of bonding.', true),
  ('Thermodynamics', 'Physical Chemistry', 'class11', 'NEET', 'Concepts of system, types of systems, surroundings.', true),
  ('Equilibrium', 'Physical Chemistry', 'class11', 'NEET', 'Equilibrium in physical and chemical processes, dynamic nature of equilibrium.', true),
  ('Redox Reactions', 'Inorganic Chemistry', 'class11', 'NEET', 'Concept of oxidation and reduction, redox reactions.', true),
  ('Hydrogen', 'Inorganic Chemistry', 'class11', 'NEET', 'Position of hydrogen in periodic table, occurrence, isotopes.', true),
  ('s-Block Elements', 'Inorganic Chemistry', 'class11', 'NEET', 'Group 1 and group 2 elements, general introduction, electronic configuration.', true),
  ('Some p-Block Elements', 'Inorganic Chemistry', 'class11', 'NEET', 'General introduction to p-block elements.', true),
  ('Environmental Chemistry', 'Organic Chemistry', 'class11', 'NEET', 'Environmental pollution: Air, water and soil pollution.', true);

-- NEET Class 12 - Biology (Missing)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Principles of Inheritance and Variation', 'Botany', 'class12', 'NEET', 'Heredity and variation: Mendelian inheritance.', true),
  ('Molecular Basis of Inheritance', 'Botany', 'class12', 'NEET', 'Search for genetic material and DNA as genetic material.', true),
  ('Evolution', 'Zoology', 'class12', 'NEET', 'Origin of life; biological evolution and evidences for biological evolution.', true),
  ('Human Health and Disease', 'Zoology', 'class12', 'NEET', 'Pathogens; parasites causing human diseases; Basic concepts of immunology.', true),
  ('Strategies for Enhancement in Food Production', 'Botany', 'class12', 'NEET', 'Improvement in food production; plant breeding, tissue culture.', true),
  ('Microbes in Human Welfare', 'Zoology', 'class12', 'NEET', 'In household food processing, industrial production, sewage treatment.', true),
  ('Biotechnology: Principles and Processes', 'Botany', 'class12', 'NEET', 'Genetic engineering (Recombinant DNA technology).', true),
  ('Biotechnology and its Applications', 'Botany', 'class12', 'NEET', 'Application of biotechnology in health and agriculture.', true),
  ('Organisms and Populations', 'Botany', 'class12', 'NEET', 'Organisms and environment: Habitat and niche, population and ecological adaptations.', true),
  ('Ecosystem', 'Botany', 'class12', 'NEET', 'Patterns, components; productivity and decomposition; energy flow.', true),
  ('Biodiversity and Conservation', 'Botany', 'class12', 'NEET', 'Concept of biodiversity; patterns of biodiversity; importance of biodiversity.', true),
  ('Environmental Issues', 'Botany', 'class12', 'NEET', 'Air pollution and its control; water pollution and its control.', true);

-- NEET Class 12 - Physics (Missing - same as JEE)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Current Electricity', 'Physics', 'class12', 'NEET', 'Electric current, flow of electric charges in a metallic conductor.', true),
  ('Moving Charges and Magnetism', 'Physics', 'class12', 'NEET', 'Concept of magnetic field, Oersted''s experiment.', true),
  ('Magnetism and Matter', 'Physics', 'class12', 'NEET', 'Bar magnet, bar magnet as an equivalent solenoid, magnetic field lines.', true),
  ('Electromagnetic Induction', 'Physics', 'class12', 'NEET', 'Experiments of Faraday and Henry, magnetic flux.', true),
  ('Alternating Current', 'Physics', 'class12', 'NEET', 'Alternating currents, peak and rms value of alternating current/voltage.', true),
  ('Electromagnetic Waves', 'Physics', 'class12', 'NEET', 'Need for displacement current, electromagnetic waves and their characteristics.', true),
  ('Ray Optics and Optical Instruments', 'Physics', 'class12', 'NEET', 'Reflection of light, spherical mirrors, mirror formula.', true),
  ('Wave Optics', 'Physics', 'class12', 'NEET', 'Wavefront and Huygens'' principle, reflection and refraction of plane wave.', true),
  ('Dual Nature of Radiation and Matter', 'Physics', 'class12', 'NEET', 'Dual nature of radiation, Photoelectric effect, Hertz and Lenard''s observations.', true),
  ('Atoms', 'Physics', 'class12', 'NEET', 'Alpha-particle scattering experiment; Rutherford''s model of atom.', true),
  ('Nuclei', 'Physics', 'class12', 'NEET', 'Composition and size of nucleus, atomic masses, isotopes, isobars.', true),
  ('Semiconductor Electronics: Materials, Devices and Simple Circuits', 'Physics', 'class12', 'NEET', 'Energy bands in solids, conductors, insulators and semiconductors.', true),
  ('Communication Systems', 'Physics', 'class12', 'NEET', 'Elements of a communication system, basic terminology used in electronic communication systems.', true);

-- NEET Class 12 - Chemistry (Missing - same as JEE)
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Solid State', 'Physical Chemistry', 'class12', 'NEET', 'Classification of solids based on different binding forces.', true),
  ('Chemical Kinetics', 'Physical Chemistry', 'class12', 'NEET', 'Rate of a reaction, factors affecting rates of reaction.', true),
  ('Surface Chemistry', 'Physical Chemistry', 'class12', 'NEET', 'Adsorption, physisorption and chemisorption.', true),
  ('General Principles and Processes of Isolation of Elements', 'Inorganic Chemistry', 'class12', 'NEET', 'Principles and methods of extraction.', true),
  ('p-Block Elements', 'Inorganic Chemistry', 'class12', 'NEET', 'Group 15, 16, 17 and 18 elements.', true),
  ('Aldehydes, Ketones and Carboxylic Acids', 'Organic Chemistry', 'class12', 'NEET', 'Nomenclature, nature of carbonyl group, methods of preparation.', true),
  ('Organic Compounds Containing Nitrogen', 'Organic Chemistry', 'class12', 'NEET', 'Amines: Nomenclature, classification, structure, methods of preparation.', true),
  ('Biomolecules', 'Organic Chemistry', 'class12', 'NEET', 'Carbohydrates, proteins, vitamins, nucleic acids.', true),
  ('Polymers', 'Organic Chemistry', 'class12', 'NEET', 'Classification, methods of polymerization.', true),
  ('Chemistry in Everyday Life', 'Organic Chemistry', 'class12', 'NEET', 'Chemicals in medicines, food and cleaning agents.', true);
