
-- Update employees table to support both employees and interns
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS employee_type TEXT DEFAULT 'employee' CHECK (employee_type IN ('employee', 'intern')),
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS department TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'completed' CHECK (status IN ('active', 'completed', 'terminated'));

-- Update the table comment
COMMENT ON TABLE public.employees IS 'Stores both employee and intern verification data';

-- Add some sample data for testing
INSERT INTO public.employees (employee_code, full_name, position, employee_type, start_date, end_date, status, department, is_active) 
VALUES 
  ('UI12345', 'John Doe', 'Content Developer', 'employee', '2024-06-01', '2024-09-01', 'completed', 'Educational Resources', false),
  ('UI54321', 'Jane Smith', 'Software Engineer', 'employee', '2024-01-01', NULL, 'active', 'Technology', true),
  ('INT001', 'Alice Johnson', 'Content Intern', 'intern', '2024-07-01', '2024-09-01', 'completed', 'Educational Resources', false),
  ('INT002', 'Bob Wilson', 'Marketing Intern', 'intern', '2024-06-01', NULL, 'active', 'Marketing', true)
ON CONFLICT (employee_code) DO NOTHING;
