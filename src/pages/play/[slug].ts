import type { APIRoute } from 'astro';

export const prerender = false;

const REDIRECTS: Record<string, string> = {
  'nte':                    'https://nte.perfectworld.com/',
  'arknights-endfield':     'https://endfield.arknights.com/',
  'enlisted':               'https://enlisted.net/',
  'once-human':             'https://www.oncehuman.game/',
  'project-entropy':        'https://store.steampowered.com/app/2944600/Project_Entropy/',
  'raid-shadow-legends':    'https://plarium.com/en/strategy/raid-shadow-legends/',
  'rise-of-kingdoms':       'https://www.massplex.com/rok',
  'star-trek-fleet-command':'https://www.startrekfleetcommand.com/',
  'where-winds-meet':       'https://www.wherewindsmeet.com/',
  'war-thunder':            'https://warthunder.com/',
};

export const GET: APIRoute = ({ params }) => {
  const url = REDIRECTS[params.slug ?? ''];
  if (!url) {
    return new Response('Not found', { status: 404 });
  }
  return Response.redirect(url, 302);
};
