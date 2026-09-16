import type { APIRoute } from 'astro';

export const prerender = false;

const MY_LINK = 'https://to.dordir.com/5C3A/2J2B7/';

const REDIRECTS: Record<string, string> = {
  'nte':                    MY_LINK,
  'star-trek-fleet-command':MY_LINK,
  'war-thunder':            MY_LINK,
  'enlisted':               MY_LINK,
  'foundation-galactic':    MY_LINK,
  'genshin-impact':         MY_LINK,
  'zenless-zone-zero':      MY_LINK,
  'ragnarok-online':        MY_LINK,
  'world-of-tanks':         MY_LINK,
  'three-kingdoms':         MY_LINK,
  'sea-of-conquest':        MY_LINK,
  'wuthering-waves':        MY_LINK,
  'delta-force':            MY_LINK,
  'soul-land':              MY_LINK,
  'arknights-endfield':     MY_LINK,
  'project-entropy':        MY_LINK,
  'raid-shadow-legends':    MY_LINK,
  'where-winds-meet':       MY_LINK,
  'nikke':                  MY_LINK,
  'mu-dark-epoch':          MY_LINK,
  'world-of-sea-battle':    MY_LINK,
  'tiles-survive':          MY_LINK,
  'infinity-kingdom':       MY_LINK,
  'nte-steam':              MY_LINK,
  'ragnarok-steam':         MY_LINK,
  'rise-of-kingdoms':       MY_LINK,
};

export const GET: APIRoute = ({ params }) => {
  const url = REDIRECTS[params.slug ?? ''];
  if (!url) {
    return new Response('Not found', { status: 404 });
  }
  return Response.redirect(url, 302);
};
