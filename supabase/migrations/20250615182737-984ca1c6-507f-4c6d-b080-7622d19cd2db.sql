
-- This script will insert the chapter lists for JEE and NEET into your 'notes' table.
-- This makes them manageable from the backend instead of being hardcoded in the app.

-- JEE Class 11 Chapters
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Units and Measurement', 'Physics', 'class11', 'JEE', 'Basic concepts of units, dimensions, and measurements.', true),
  ('Motion in a Straight Line', 'Physics', 'class11', 'JEE', 'Kinematics of motion in one dimension.', true),
  ('Sets', 'Mathematics', 'class11', 'JEE', 'Introduction to set theory.', true),
  ('Relations and Functions', 'Mathematics', 'class11', 'JEE', 'Understanding relations and different types of functions.', true),
  ('Some Basic Concepts of Chemistry', 'Physical Chemistry', 'class11', 'JEE', 'Mole concept, stoichiometry, and calculations.', true),
  ('Structure of Atom', 'Physical Chemistry', 'class11', 'JEE', 'Atomic models and quantum numbers.', true),
  ('General Organic Chemistry', 'Organic Chemistry', 'class11', 'JEE', 'Nomenclature, isomerism, and reaction mechanisms.', true),
  ('Hydrocarbons', 'Organic Chemistry', 'class11', 'JEE', 'Alkanes, alkenes, alkynes, and aromatic hydrocarbons.', true),
  ('Classification of Elements and Periodicity', 'Inorganic Chemistry', 'class11', 'JEE', 'Periodic table and trends in properties.', true),
  ('Chemical Bonding and Molecular Structure', 'Inorganic Chemistry', 'class11', 'JEE', 'VSEPR, valence bond theory, and MOT.', true);

-- JEE Class 12 Chapters
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Electric Charges and Fields', 'Physics', 'class12', 'JEE', 'Coulomb''s law, electric field, and Gauss''s law.', true),
  ('Electrostatic Potential and Capacitance', 'Physics', 'class12', 'JEE', 'Potential, potential energy, and capacitors.', true),
  ('Relations and Functions', 'Mathematics', 'class12', 'JEE', 'Types of relations and functions, composition, and inverse functions.', true),
  ('Inverse Trigonometric Functions', 'Mathematics', 'class12', 'JEE', 'Properties and graphs of inverse trigonometric functions.', true),
  ('Solutions', 'Physical Chemistry', 'class12', 'JEE', 'Colligative properties and concentration terms.', true),
  ('Electrochemistry', 'Physical Chemistry', 'class12', 'JEE', 'Electrochemical cells, Nernst equation, and conductivity.', true),
  ('Haloalkanes and Haloarenes', 'Organic Chemistry', 'class12', 'JEE', 'Properties and reactions of halogen compounds.', true),
  ('Alcohols, Phenols and Ethers', 'Organic Chemistry', 'class12', 'JEE', 'Preparation and properties.', true),
  ('The d-and f-Block Elements', 'Inorganic Chemistry', 'class12', 'JEE', 'Transition and inner transition elements.', true),
  ('Coordination Compounds', 'Inorganic Chemistry', 'class12', 'JEE', 'Werner''s theory, VBT, and CFT.', true);

-- NEET Class 11 Chapters
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('The Living World', 'Botany', 'class11', 'NEET', 'Diversity in the living world.', true),
  ('Biological Classification', 'Botany', 'class11', 'NEET', 'Kingdoms of life.', true),
  ('Structural Organisation in Animals', 'Zoology', 'class11', 'NEET', 'Animal tissues.', true),
  ('Biomolecules', 'Zoology', 'class11', 'NEET', 'Structure and function of biomolecules.', true),
  ('Some Basic Concepts of Chemistry', 'Physical Chemistry', 'class11', 'NEET', 'Mole concept, stoichiometry, and calculations.', true),
  ('Structure of Atom', 'Physical Chemistry', 'class11', 'NEET', 'Atomic models and quantum numbers.', true),
  ('General Organic Chemistry', 'Organic Chemistry', 'class11', 'NEET', 'Nomenclature, isomerism, and reaction mechanisms.', true),
  ('Hydrocarbons', 'Organic Chemistry', 'class11', 'NEET', 'Alkanes, alkenes, alkynes, and aromatic hydrocarbons.', true),
  ('Classification of Elements and Periodicity', 'Inorganic Chemistry', 'class11', 'NEET', 'Periodic table and trends in properties.', true),
  ('Chemical Bonding and Molecular Structure', 'Inorganic Chemistry', 'class11', 'NEET', 'VSEPR, valence bond theory, and MOT.', true),
  ('Units and Measurement', 'Physics', 'class11', 'NEET', 'Basic concepts of units, dimensions, and measurements.', true),
  ('Motion in a Straight Line', 'Physics', 'class11', 'NEET', 'Kinematics of motion in one dimension.', true);
  
-- NEET Class 12 Chapters
INSERT INTO public.notes (title, subject, class_level, exam_type, description, is_active)
VALUES
  ('Reproduction in Organisms', 'Botany', 'class12', 'NEET', 'Asexual and sexual reproduction.', true),
  ('Sexual Reproduction in Flowering Plants', 'Botany', 'class12', 'NEET', 'Flower structure, pollination, and fertilization.', true),
  ('Human Reproduction', 'Zoology', 'class12', 'NEET', 'Male and female reproductive systems.', true),
  ('Reproductive Health', 'Zoology', 'class12', 'NEET', 'Problems and strategies, population explosion.', true),
  ('Solutions', 'Physical Chemistry', 'class12', 'NEET', 'Colligative properties and concentration terms.', true),
  ('Electrochemistry', 'Physical Chemistry', 'class12', 'NEET', 'Electrochemical cells, Nernst equation, and conductivity.', true),
  ('Haloalkanes and Haloarenes', 'Organic Chemistry', 'class12', 'NEET', 'Properties and reactions of halogen compounds.', true),
  ('Alcohols, Phenols and Ethers', 'Organic Chemistry', 'class12', 'NEET', 'Preparation and properties.', true),
  ('The d-and f-Block Elements', 'Inorganic Chemistry', 'class12', 'NEET', 'Transition and inner transition elements.', true),
  ('Coordination Compounds', 'Inorganic Chemistry', 'class12', 'NEET', 'Werner''s theory, VBT, and CFT.', true),
  ('Electric Charges and Fields', 'Physics', 'class12', 'NEET', 'Coulomb''s law, electric field, and Gauss''s law.', true),
  ('Electrostatic Potential and Capacitance', 'Physics', 'class12', 'NEET', 'Potential, potential energy, and capacitors.', true);
