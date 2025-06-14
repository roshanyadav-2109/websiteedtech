
-- 1. Create the employees table for tracking intern/employee details
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_code TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  position TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Enable RLS (public can verify but only admin can insert/update/delete)
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone can SELECT (for verification portal)
CREATE POLICY "Allow select for all users"
  ON public.employees
  FOR SELECT
  USING (true);

-- 4. Policy: Only admins can INSERT/UPDATE/DELETE
CREATE POLICY "Allow modify for admins"
  ON public.employees
  FOR ALL
  USING (EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE email = auth.email()
  ) );

-- 5. Auto-update updated_at on change
CREATE OR REPLACE FUNCTION public.update_employees_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_employees_updated_at ON public.employees;

CREATE TRIGGER trg_update_employees_updated_at
BEFORE UPDATE ON public.employees
FOR EACH ROW
EXECUTE FUNCTION public.update_employees_updated_at();
