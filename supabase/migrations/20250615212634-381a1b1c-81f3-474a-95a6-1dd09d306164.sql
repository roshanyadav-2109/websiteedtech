
-- 1. Remove all existing notes from iitm_branch_notes to ensure a clean update
DELETE FROM public.iitm_branch_notes;

-- 2. Data Science: Populate subjects for each level as per new lists

-- Qualifier (Weeks 1–4)
DO $$
DECLARE
  subj TEXT;
  w INT;
  ds_qualifier TEXT[] := ARRAY[
    'Mathematics for Data Science I',
    'Statistics for Data Science I',
    'Computational Thinking',
    'English I'
  ];
BEGIN
  FOREACH subj IN ARRAY ds_qualifier LOOP
    FOR w IN 1..4 LOOP
      INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number, is_active)
      VALUES (
        'Week ' || w || ' - ' || subj,
        'Notes and practice for week ' || w || ' ' || subj,
        'data-science',
        'qualifier',
        subj,
        w,
        true
      );
    END LOOP;
  END LOOP;
END$$;

-- Foundation (Weeks 1–12)
DO $$
DECLARE
  subj TEXT;
  w INT;
  ds_foundation TEXT[] := ARRAY[
    'Mathematics for Data Science I',
    'Statistics for Data Science I',
    'Computational Thinking',
    'English I',
    'Mathematics for Data Science II',
    'Statistics for Data Science II',
    'Programming in Python',
    'English II'
  ];
BEGIN
  FOREACH subj IN ARRAY ds_foundation LOOP
    FOR w IN 1..12 LOOP
      INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number, is_active)
      VALUES (
        'Week ' || w || ' - ' || subj,
        'Notes and practice for week ' || w || ' ' || subj,
        'data-science',
        'foundation',
        subj,
        w,
        true
      );
    END LOOP;
  END LOOP;
END$$;

-- Diploma (Programming Specialization)
DO $$
DECLARE
  subj TEXT;
  w INT;
  ds_diploma_programming TEXT[] := ARRAY[
    'Database Management Systems',
    'Programming, Data Structures and Algorithms using Python',
    'Modern Application Development I',
    'Modern Application Development I - Project',
    'Programming Concepts using Java',
    'Modern Application Development II',
    'Modern Application Development II - Project',
    'System Commands'
  ];
BEGIN
  FOREACH subj IN ARRAY ds_diploma_programming LOOP
    FOR w IN 1..12 LOOP
      INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number, is_active, diploma_specialization)
      VALUES (
        'Week ' || w || ' - ' || subj,
        'Notes and practice for week ' || w || ' ' || subj,
        'data-science',
        'diploma',
        subj,
        w,
        true,
        'Programming'
      );
    END LOOP;
  END LOOP;
END$$;

-- Diploma (Data Science Specialization)
DO $$
DECLARE
  subj TEXT;
  w INT;
  ds_diploma_datasci TEXT[] := ARRAY[
    'Machine Learning Foundations',
    'Business Data Management',
    'Business Data Management - Project',
    'Machine Learning Techniques',
    'Machine Learning Practice',
    'Machine Learning Practice - Project',
    'Business Analytics',
    'Tools in Data Science'
  ];
BEGIN
  FOREACH subj IN ARRAY ds_diploma_datasci LOOP
    FOR w IN 1..12 LOOP
      INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number, is_active, diploma_specialization)
      VALUES (
        'Week ' || w || ' - ' || subj,
        'Notes and practice for week ' || w || ' ' || subj,
        'data-science',
        'diploma',
        subj,
        w,
        true,
        'Data Science'
      );
    END LOOP;
  END LOOP;
END$$;

-- Degree (Weeks 1–12) - All degree level subjects, group as frontend wants
DO $$
DECLARE
  subj TEXT;
  w INT;
  ds_deg TEXT[] := ARRAY[
    'Software Engineering',
    'Software Testing',
    'AI: Search Methods for Problem Solving',
    'Deep Learning',
    'Algorithmic Thinking in Bioinformatics',
    'Big Data and Biological Networks',
    'Data Visualization Design',
    'Special Topics in Machine Learning (Reinforcement Learning)',
    'Speech Technology',
    'Design Thinking for Data-Driven App Development',
    'Industry 4.0',
    'Sequential Decision Making',
    'Market Research',
    'Privacy & Security in Online Social Media',
    'Introduction to Big Data',
    'Financial Forensics',
    'Linear Statistical Models',
    'Advanced Algorithms',
    'Statistical Computing',
    'Computer Systems Design',
    'Programming in C',
    'Mathematical Thinking',
    'Large Language Models',
    'Introduction to Natural Language Processing (i-NLP)',
    'Deep Learning for Computer Vision',
    'Managerial Economics',
    'Game Theory and Strategy',
    'Corporate Finance',
    'Deep Learning Practice',
    'Operating Systems',
    'Mathematical Foundations of Generative AI',
    'Algorithms for Data Science (ADS)',
    'Machine Learning Operations (MLOps)'
  ];
BEGIN
  FOREACH subj IN ARRAY ds_deg LOOP
    FOR w IN 1..12 LOOP
      INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number, is_active)
      VALUES (
        'Week ' || w || ' - ' || subj,
        'Notes and practice for week ' || w || ' ' || subj,
        'data-science',
        'degree',
        subj,
        w,
        true
      );
    END LOOP;
  END LOOP;
END$$;

-- 3. Electronic Systems: Same process for each level and subjects

-- Qualifier (Weeks 1–4)
DO $$
DECLARE
  subj TEXT;
  w INT;
  es_qualifier TEXT[] := ARRAY[
    'English I',
    'Math for Electronics I',
    'Electronic Systems Thinking and Circuits',
    'Introduction to C Programming'
  ];
BEGIN
  FOREACH subj IN ARRAY es_qualifier LOOP
    FOR w IN 1..4 LOOP
      INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number, is_active)
      VALUES (
        'Week ' || w || ' - ' || subj,
        'Notes and practice for week ' || w || ' ' || subj,
        'electronic-systems',
        'qualifier',
        subj,
        w,
        true
      );
    END LOOP;
  END LOOP;
END$$;

-- Foundation (Weeks 1–12)
DO $$
DECLARE
  subj TEXT;
  w INT;
  es_foundation TEXT[] := ARRAY[
    'English I',
    'Math for Electronics I',
    'English II',
    'Electronic Systems Thinking and Circuits',
    'Electronic Systems Thinking and Circuits Lab',
    'Introduction to C Programming',
    'C Programming Laboratory',
    'Introduction to Linux and Programming',
    'Linux Systems Laboratory',
    'Digital Systems',
    'Electrical and Electronic Circuits',
    'Electronics Laboratory',
    'Embedded C Programming',
    'Embedded C Programming Laboratory'
  ];
BEGIN
  FOREACH subj IN ARRAY es_foundation LOOP
    FOR w IN 1..12 LOOP
      INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number, is_active)
      VALUES (
        'Week ' || w || ' - ' || subj,
        'Notes and practice for week ' || w || ' ' || subj,
        'electronic-systems',
        'foundation',
        subj,
        w,
        true
      );
    END LOOP;
  END LOOP;
END$$;

-- Diploma (All under Embedded Systems & Design specialization)
DO $$
DECLARE
  subj TEXT;
  w INT;
  es_diploma TEXT[] := ARRAY[
    'Math for Electronics II',
    'Signals and Systems',
    'Signals and Systems Lab',
    'Analog Electronic Systems',
    'Analog Electronics Laboratory',
    'Python Programming',
    'Digital System Design',
    'Digital System Design Laboratory',
    'Digital Signal Processing',
    'Sensors and Applications',
    'Sensors Laboratory',
    'Control Engineering',
    'Electronics System Project'
  ];
BEGIN
  FOREACH subj IN ARRAY es_diploma LOOP
    FOR w IN 1..12 LOOP
      INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number, is_active, diploma_specialization)
      VALUES (
        'Week ' || w || ' - ' || subj,
        'Notes and practice for week ' || w || ' ' || subj,
        'electronic-systems',
        'diploma',
        subj,
        w,
        true,
        'Embedded Systems & Design'
      );
    END LOOP;
  END LOOP;
END$$;

-- Degree (Weeks 1–12) - grouped as you wish on frontend
DO $$
DECLARE
  subj TEXT;
  w INT;
  es_degree TEXT[] := ARRAY[
    'Embedded Linux and FPGAs',
    'Embedded Linux and FPGAs Lab',
    'Electromagnetic Fields and Transmission Lines',
    'Electronic Product Design',
    'Computer Organisation',
    'Strategies for Professional Growth',
    'Probability and Statistics',
    'Communication Systems',
    'Internet of Things (IoT)',
    'Semiconductor Devices and VLSI Technology',
    'Analog Circuits',
    'Digital IC Design',
    'Power Management for Electronic Systems',
    'Biomedical Electronic Systems',
    'Operating Systems',
    'Database Management Systems (DBMS)',
    'Programming Data Structures and Algorithms using Python',
    'Modern Application Development I',
    'Machine Learning Foundation',
    'Programming Concepts using Java',
    'Modern Application Development II',
    'Machine Learning Techniques',
    'Machine Learning Practice',
    'Deep Learning',
    'Deep Learning for Computer Vision',
    'Speech Technology',
    'Industry 4.0',
    'Design Thinking for Data-Driven App Development',
    'Financial Forensics',
    'Market Research',
    'Game Theory and Strategy',
    'Managerial Economics',
    'Corporate Finance',
    'Deep Learning Practice',
    'Apprenticeship in Electronics Systems 1 & 2'
  ];
BEGIN
  FOREACH subj IN ARRAY es_degree LOOP
    FOR w IN 1..12 LOOP
      INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number, is_active)
      VALUES (
        'Week ' || w || ' - ' || subj,
        'Notes and practice for week ' || w || ' ' || subj,
        'electronic-systems',
        'degree',
        subj,
        w,
        true
      );
    END LOOP;
  END LOOP;
END$$;
