-- Portfolio projects (editable in /admin). Skips rows if URL already exists.
INSERT INTO public.projects (name, url, category, description, tags, display_order)
SELECT v.name, v.url, v.category, v.description, v.tags, v.display_order
FROM (
  VALUES
    ('Everything Teeth', 'https://everythingteeth.lovable.app/', 'Healthcare', 'Premium dental clinic website with booking system', ARRAY['Web Design', 'Healthcare', 'Booking']::text[], 1),
    ('MyOutreach', 'https://myoutreach.lovable.app', 'SaaS', 'AI-powered sales outreach automation platform', ARRAY['SaaS', 'AI', 'Automation']::text[], 2),
    ('Khaalis Foods', 'https://khaalis.lovable.app', 'E-Commerce', 'Premium artisan food brand from Kashmir', ARRAY['E-Com', 'Food', '3D']::text[], 3),
    ('Zarmeen Aesthetics', 'https://zarmeenaesthetics.lovable.app', 'Healthcare', 'Luxury aesthetic clinic with AI voice assistant', ARRAY['Clinic', 'AI', 'Luxury']::text[], 4),
    ('Shinde Eyecare', 'https://shindeeyecare.lovable.app', 'Healthcare', 'Premium optical clinic with 3D iris animation', ARRAY['Healthcare', '3D', 'Premium']::text[], 5),
    ('Tuler Honey', 'https://tulerhoney.lovable.app', 'E-Commerce', 'Kashmir honey brand with 3D product viewer', ARRAY['E-Com', '3D', 'Food']::text[], 6),
    ('Gurugram Estate', 'https://gurugramestatepvtltd.lovable.app', 'Real Estate', 'Zero-brokerage real estate firm website', ARRAY['Real Estate', 'Premium']::text[], 7),
    ('Harkaar IVF', 'https://harkaarivfandmaternity.lovable.app/', 'Healthcare', 'IVF and maternity centre in Srinagar', ARRAY['Healthcare', 'Medical']::text[], 8),
    ('Rehmaniya Connect', 'https://rehmaniyaconnect.lovable.app', 'Community', 'Library community chat and social platform', ARRAY['Community', 'Chat', 'Social']::text[], 9),
    ('Smile Miami', 'https://smile-miami-magic.lovable.app/', 'Healthcare', 'Miami dental clinic with before/after gallery', ARRAY['Dental', 'Miami', 'Booking']::text[], 10),
    ('Samvaad', 'https://samvaad-growth-journey.lovable.app/', 'Coaching', 'Life coaching platform for parents and students', ARRAY['Coaching', 'Wellness']::text[], 11),
    ('Maison Attire', 'https://maisonattire.lovable.app', 'Fashion', 'Luxury modest fashion e-commerce brand', ARRAY['Fashion', 'E-Com', 'Luxury']::text[], 12)
) AS v(name, url, category, description, tags, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.projects p WHERE p.url = v.url);
