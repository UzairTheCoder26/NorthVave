-- Seed default keys for legal pages + key links.
-- Safe to run multiple times.

INSERT INTO public.site_content (key, value)
VALUES
  ('contact.instagram_url', 'https://instagram.com/northvave'),
  ('contact.handle', '@northvave'),
  ('contact.email', 'hafizuxair26@gmail.com'),
  ('footer.instagram_url', 'https://instagram.com/northvave'),
  ('privacy.title', 'Privacy Policy'),
  ('privacy.updated_at_value', 'May 4, 2026'),
  ('privacy.body', 'Write your Privacy Policy here.\n\nTip: use blank lines to create paragraphs.'),
  ('privacy.meta_title', 'Privacy Policy — NorthVave'),
  ('privacy.meta_description', 'Read NorthVave''s Privacy Policy.'),
  ('terms.title', 'Terms of Service'),
  ('terms.updated_at_value', 'May 4, 2026'),
  ('terms.body', 'Write your Terms of Service here.\n\nTip: use blank lines to create paragraphs.'),
  ('terms.meta_title', 'Terms of Service — NorthVave'),
  ('terms.meta_description', 'Read NorthVave''s Terms of Service.')
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value;

