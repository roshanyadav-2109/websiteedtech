
-- Create the iitm_branch_notes table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.iitm_branch_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    branch TEXT NOT NULL,
    level TEXT NOT NULL,
    subject TEXT NOT NULL,
    week_number INT NOT NULL,
    download_count INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    file_link TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT iitm_branch_notes_unique_note UNIQUE (branch, level, subject, week_number)
);

-- Add a trigger to automatically update the 'updated_at' column
-- The function handle_updated_at() already exists in your project.
DROP TRIGGER IF EXISTS set_timestamp ON public.iitm_branch_notes; -- This makes the script runnable multiple times
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.iitm_branch_notes
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS iitm_branch_notes_idx ON public.iitm_branch_notes (branch, level, subject);

DO $$
DECLARE
  -- Branch: data-science subjects
  ds_qualifier_subjects TEXT[] := ARRAY['English I', 'Mathematics for Data Science I', 'Statistics for Data Science I', 'Computational Thinking'];
  ds_foundation_subjects TEXT[] := ARRAY['Mathematics for Data Science I', 'Statistics for Data Science I', 'Computational Thinking', 'English I', 'Mathematics for Data Science II', 'Statistics for Data Science II', 'Programming in Python', 'English II'];
  ds_diploma_subjects TEXT[] := ARRAY['Database Management Systems', 'Programming, Data Structures and Algorithms using Python', 'Modern Application Development I', 'Modern Application Development I - Project', 'Programming Concepts using Java', 'Modern Application Development II', 'Modern Application Development II - Project', 'System Commands', 'Machine Learning Foundations', 'Business Data Management', 'Business Data Management - Project', 'Machine Learning Techniques', 'Machine Learning Practice', 'Machine Learning Practice - Project', 'Business Analytics', 'Tools in Data Science'];
  ds_degree_subjects TEXT[] := ARRAY['Software Engineering', 'Software Testing', 'AI: Search Methods for Problem Solving', 'Deep Learning', 'Strategies for Professional Growth', 'Algorithmic Thinking in Bioinformatics', 'Big Data and Biological Networks', 'Data Visualization Design', 'Special topics in Machine Learning (Reinforcement Learning)', 'Speech Technology', 'Design Thinking for Data-Driven App Development', 'Industry 4.0', 'Sequential Decision Making', 'Market Research', 'Privacy & Security in Online Social Media', 'Introduction to Big Data', 'Financial Forensics', 'Linear Statistical Models', 'Advanced Algorithms', 'Statistical Computing', 'Computer Systems Design', 'Programming in C', 'Mathematical Thinking', 'Large Language Models', 'Introduction to Natural Language Processing (i-NLP)', 'Deep Learning for Computer Vision', 'Managerial Economics', 'Game Theory and Strategy', 'Corporate Finance', 'Deep Learning Practice', 'Operating Systems', 'Mathematical Foundations of Generative AI', 'Algorithms for Data Science (ADS)', 'Machine Learning Operations (MLOps)'];

  -- Branch: electronic-systems subjects
  es_qualifier_subjects TEXT[] := ARRAY['English I', 'Math for Electronics I', 'Electronic Systems Thinking and Circuits', 'Introduction to C Programming'];
  es_foundation_subjects TEXT[] := ARRAY['English I', 'Math for Electronics I', 'English II', 'Electronic Systems Thinking and Circuits', 'Electronic Systems Thinking and Circuits Lab', 'Introduction to C Programming', 'C Programming Laboratory', 'Introduction to Linux and Programming', 'Linux Systems Laboratory', 'Digital Systems', 'Electrical and Electronic Circuits', 'Electronics Laboratory', 'Embedded C Programming', 'Embedded C Programming Laboratory'];
  es_diploma_subjects TEXT[] := ARRAY['Math for Electronics II', 'Signals and Systems', 'Analog Electronic Systems', 'Analog Electronics Laboratory', 'Python Programming', 'Digital System Design', 'Digital System Design Laboratory', 'Digital Signal Processing', 'Sensors and Applications', 'Sensors Laboratory', 'Control Engineering', 'Electronics System Project'];
  es_degree_subjects TEXT[] := ARRAY['Embedded Linux and FPGAs', 'Embedded Linux and FPGAs Lab', 'Electromagnetic Fields and Transmission Lines', 'Electronic Product Design', 'Computer Organisation', 'Strategies for Professional Growth', 'Probability and Statistics', 'Communication Systems', 'Internet of Things (IoT)', 'Semiconductor Devices and VLSI Technology', 'Analog Circuits', 'Digital IC Design', 'Power Management for Electronic Systems', 'Biomedical Electronic Systems', 'Operating Systems', 'Database Management Systems', 'Programming Data Structures and Algorithms using Python', 'Modern Application Development I', 'Machine Learning Foundation', 'Programming Concepts using Java', 'Modern Application Development II', 'Machine Learning Techniques', 'Machine Learning Practice', 'Deep Learning', 'Deep Learning for Computer Vision', 'Speech Technology', 'Deep Learning Practice', 'Industry 4.0', 'Design Thinking for Data-Driven App Development', 'Financial Forensics', 'Market Research', 'Game Theory and Strategy', 'Managerial Economics', 'Corporate Finance', 'Apprenticeship in Electronics Systems 1', 'Apprenticeship in Electronics Systems 2'];

  current_branch TEXT;
  current_level TEXT;
  current_subject TEXT;
  week_num INT;
  max_weeks INT;

BEGIN
  -- Populate Data Science notes
  current_branch := 'data-science';
  -- DS Qualifier
  current_level := 'qualifier'; max_weeks := 4;
  FOREACH current_subject IN ARRAY ds_qualifier_subjects LOOP FOR week_num IN 1..max_weeks LOOP INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number) VALUES ('Week ' || week_num || ' - ' || current_subject, 'Week ' || week_num || ' lecture notes and practice problems for ' || current_subject, current_branch, current_level, current_subject, week_num) ON CONFLICT (branch, level, subject, week_number) DO NOTHING; END LOOP; END LOOP;
  -- DS Foundation
  current_level := 'foundation'; max_weeks := 12;
  FOREACH current_subject IN ARRAY ds_foundation_subjects LOOP FOR week_num IN 1..max_weeks LOOP INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number) VALUES ('Week ' || week_num || ' - ' || current_subject, 'Week ' || week_num || ' lecture notes and practice problems for ' || current_subject, current_branch, current_level, current_subject, week_num) ON CONFLICT (branch, level, subject, week_number) DO NOTHING; END LOOP; END LOOP;
  -- DS Diploma
  current_level := 'diploma'; max_weeks := 12;
  FOREACH current_subject IN ARRAY ds_diploma_subjects LOOP FOR week_num IN 1..max_weeks LOOP INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number) VALUES ('Week ' || week_num || ' - ' || current_subject, 'Week ' || week_num || ' lecture notes and practice problems for ' || current_subject, current_branch, current_level, current_subject, week_num) ON CONFLICT (branch, level, subject, week_number) DO NOTHING; END LOOP; END LOOP;
  -- DS Degree
  current_level := 'degree'; max_weeks := 12;
  FOREACH current_subject IN ARRAY ds_degree_subjects LOOP FOR week_num IN 1..max_weeks LOOP INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number) VALUES ('Week ' || week_num || ' - ' || current_subject, 'Week ' || week_num || ' lecture notes and practice problems for ' || current_subject, current_branch, current_level, current_subject, week_num) ON CONFLICT (branch, level, subject, week_number) DO NOTHING; END LOOP; END LOOP;

  -- Populate Electronic Systems notes
  current_branch := 'electronic-systems';
  -- ES Qualifier
  current_level := 'qualifier'; max_weeks := 4;
  FOREACH current_subject IN ARRAY es_qualifier_subjects LOOP FOR week_num IN 1..max_weeks LOOP INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number) VALUES ('Week ' || week_num || ' - ' || current_subject, 'Week ' || week_num || ' lecture notes and practice problems for ' || current_subject, current_branch, current_level, current_subject, week_num) ON CONFLICT (branch, level, subject, week_number) DO NOTHING; END LOOP; END LOOP;
  -- ES Foundation
  current_level := 'foundation'; max_weeks := 12;
  FOREACH current_subject IN ARRAY es_foundation_subjects LOOP FOR week_num IN 1..max_weeks LOOP INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number) VALUES ('Week ' || week_num || ' - ' || current_subject, 'Week ' || week_num || ' lecture notes and practice problems for ' || current_subject, current_branch, current_level, current_subject, week_num) ON CONFLICT (branch, level, subject, week_number) DO NOTHING; END LOOP; END LOOP;
  -- ES Diploma
  current_level := 'diploma'; max_weeks := 12;
  FOREACH current_subject IN ARRAY es_diploma_subjects LOOP FOR week_num IN 1..max_weeks LOOP INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number) VALUES ('Week ' || week_num || ' - ' || current_subject, 'Week ' || week_num || ' lecture notes and practice problems for ' || current_subject, current_branch, current_level, current_subject, week_num) ON CONFLICT (branch, level, subject, week_number) DO NOTHING; END LOOP; END LOOP;
  -- ES Degree
  current_level := 'degree'; max_weeks := 12;
  FOREACH current_subject IN ARRAY es_degree_subjects LOOP FOR week_num IN 1..max_weeks LOOP INSERT INTO public.iitm_branch_notes (title, description, branch, level, subject, week_number) VALUES ('Week ' || week_num || ' - ' || current_subject, 'Week ' || week_num || ' lecture notes and practice problems for ' || current_subject, current_branch, current_level, current_subject, week_num) ON CONFLICT (branch, level, subject, week_number) DO NOTHING; END LOOP; END LOOP;
END$$;
