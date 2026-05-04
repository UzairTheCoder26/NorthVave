-- Static thumbnail path (served from /public). Falls back to live screenshot API in the app when null.
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS thumbnail_url text;

UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/everythingteeth.webp' WHERE url = 'https://everythingteeth.lovable.app/';
UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/myoutreach.webp' WHERE url = 'https://myoutreach.lovable.app';
UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/khaalis.webp' WHERE url = 'https://khaalis.lovable.app';
UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/zarmeenaesthetics.webp' WHERE url = 'https://zarmeenaesthetics.lovable.app';
UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/shindeeyecare.webp' WHERE url = 'https://shindeeyecare.lovable.app';
UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/tulerhoney.webp' WHERE url = 'https://tulerhoney.lovable.app';
UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/gurugramestate.webp' WHERE url = 'https://gurugramestatepvtltd.lovable.app';
UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/harkaarivf.webp' WHERE url = 'https://harkaarivfandmaternity.lovable.app/';
UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/rehmaniyaconnect.webp' WHERE url = 'https://rehmaniyaconnect.lovable.app';
UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/smile-miami-magic.webp' WHERE url = 'https://smile-miami-magic.lovable.app/';
UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/samvaad-growth-journey.webp' WHERE url = 'https://samvaad-growth-journey.lovable.app/';
UPDATE public.projects SET thumbnail_url = '/portfolio-thumbnails/maisonattire.webp' WHERE url = 'https://maisonattire.lovable.app';
