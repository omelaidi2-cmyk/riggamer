import type { APIRoute } from 'astro';

export const prerender = false;

const REDIRECTS: Record<string, string> = {
  'nte':                    'https://to.dordir.com/5C3A/2J2B7/',
  'star-trek-fleet-command':'https://to.dordir.com/5C3A/2J2C7/',
  'war-thunder':            'https://to.dordir.com/5C3A/2J2E9/',
  'enlisted':               'https://to.dordir.com/5C3A/2J2E8/',
  'foundation-galactic':    'https://to.dordir.com/5C3A/2J2E7/',
  'genshin-impact':         'https://to.dordir.com/5C3A/2J2F5/',
  'zenless-zone-zero':      'https://to.dordir.com/5C3A/2J2F4/',
  'ragnarok-online':        'https://to.dordir.com/5C3A/2J2F3/',
  'world-of-tanks':         'https://to.dordir.com/5C3A/2J2F0/',
  'three-kingdoms':         'https://to.dordir.com/5C3A/2J2F1/',
  'sea-of-conquest':        'https://to.dordir.com/5C3A/2J2F6/',
  'wuthering-waves':        'https://to.dordir.com/5C3A/2J2I8/',
  'delta-force':            'https://to.dordir.com/5C3A/2J2I0/',
  'soul-land':              'https://to.dordir.com/5C3A/2J2G0/',
  'arknights-endfield':     'https://to.dordir.com/5C3A/2J1A6/',
  'project-entropy':        'https://to.dordir.com/5C3A/2J1A0/',
  'raid-shadow-legends':    'https://to.dordir.com/5C3A/2J2D3/',
  'where-winds-meet':       'https://to.dordir.com/5C3A/2J1J9/',
  'nikke':                  'https://to.dordir.com/5C3A/2J2C6/',
  'mu-dark-epoch':          'https://to.dordir.com/5C3A/2J1B6/',
  'world-of-sea-battle':    'https://to.dordir.com/5C3A/2J2D2/',
  'tiles-survive':          'https://to.dordir.com/5C3A/2J1A4/',
  'infinity-kingdom':       'https://to.dordir.com/5C3A/2J1A1/',
  'nte-steam':              'https://to.dordir.com/5C3A/2J2D6/',
  'ragnarok-steam':         'https://to.dordir.com/5C3A/2J2E6/',
  'rise-of-kingdoms':       'https://to.dordir.com/5C3A/2J2C5/',
};

export const GET: APIRoute = ({ params }) => {
  const url = REDIRECTS[params.slug ?? ''];
  if (!url) {
    return new Response('Not found', { status: 404 });
  }
  return Response.redirect(url, 302);
};
