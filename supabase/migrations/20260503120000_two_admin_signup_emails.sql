-- New signups: both addresses get admin by default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE
      WHEN lower(NEW.email) IN (
        'hafizumarm55@gmail.com',
        'hafizuxair26@gmail.com'
      ) THEN 'admin'::app_role
      ELSE 'user'::app_role
    END
  )
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Existing auth users: ensure admin role row exists
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE lower(email) IN (
  'hafizumarm55@gmail.com',
  'hafizuxair26@gmail.com'
)
ON CONFLICT (user_id, role) DO NOTHING;
