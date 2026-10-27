# Service page imagery — sources and licence

Every photograph on a Service Detail page, each chosen to match the copy it sits
beside rather than to be decorative. Several pages' worth, sharing one folder and
one import script (`make page-images`):

- **Strategy pillars** — seven category cards plus the page's own photography,
  page 338 (Digital Strategy & Marketing)
- **Paid search coverage** — six category cards plus the page's own photography,
  `/services/pay-per-click/`
- **AI search optimization** — six category cards plus the page's own
  photography, `/services/ai-search-optimization/`
- **Search engine optimization** — six category cards plus the page's own
  photography, `/services/search-engine-optimization/`
- **Social media marketing** — six category cards plus the page's own
  photography, `/services/social-media-marketing/`
- **Email marketing** — **seven** category cards plus the page's own
  photography, `/services/email-marketing/`
- **AI automation systems** — **seven** category cards plus the page's own
  photography, `/services/ai-automation-systems/`
- **Targeted TV advertising** — six category cards plus the page's own
  photography, `/services/targeted-tv-advertising/`. The first page with
  **twelve** files rather than thirteen: it declares no related-services card,
  because block 15 is a blog grid and `card.image` paints nowhere.
- **Billboard advertising** — six category cards plus the page's own
  photography, `/services/billboard-advertising/`. Twelve files, for the same
  reason. The hardest logo round in the folder: see the note on that page.
- **Website design** — six category cards plus the page's own photography,
  `/services/website-design/`. Twelve files. The page runs on one metaphor — a
  storefront with the door locked — so the hero, one card and the closing band
  are all doors, knowingly. See the note on that page for the four clichés it
  bans, three of which are new to this folder.
- **Media production** — six category cards plus the page's own photography,
  `/services/media-production/`. Twelve files. **The one page in this folder
  whose stock is explicitly provisional** — it sells Production Connections' own
  craft, so these twelve should be replaced with the client's own production
  stills as soon as they exist. See the note on that page.
- **Website development** — six category cards plus the page's own photography,
  `/services/website-development/`. Twelve files, and **the one page in this
  folder that runs on code screens on purpose**: it was built once on metaphor
  like every other page, the client said the imagery did not read as web
  development, and the no-code-screen rule was lifted for this page only. See
  the note on that page for what the lift did and did not change.
- **Logo design** — six category cards plus the page's own photography,
  `/services/logo-design/`. Twelve files, and **the second page in this folder
  built twice**: the first round ran on craft metaphors, the client said the
  imagery did not read as logo design, and the imagery is now literal. The
  no-third-party-mark rule was NOT lifted, which on this subject is the whole
  difficulty. See the note on that page.
- **Brand identity** — six category cards plus the page's own photography,
  `/services/brand-identity/`. Twelve files, and **the one page in this folder
  where the set was specified before the frames were chosen**: the copy argues
  that showing up differently every time destroys recognition, so the twelve had
  to be coherent as well as relevant. One palette, one lighting register, one
  subject world. See the note on that page for the four clichés it bans, three
  of which are contradicted by the copy itself.

All are from **Unsplash**, under the
[Unsplash Licence](https://unsplash.com/license) — free for commercial use, no
permission needed, attribution appreciated but not required.

**Category cards** are downloaded at 1260x880, which is 2x the 631x440 the
section renders and the same 1.43 aspect ratio as the demo images they replace.
**Page photography** is sized to its slot instead: 1920x1080 for the full-bleed
hero and closing bands, 1200x1500 for the portrait Quick Answer panel, 1600x1000
for the Outcome accordion rows.

## What each slot is

Five kinds of slot. Only the first is per-term; the rest are the page's own
photography, and anything left undeclared falls back to Nimo's demo stock — the
build prints a warning when it has to.

| Slot | Declared in | Notes |
|---|---|---|
| Category card | `coverage.terms[].image` | One per term, with its own `alt` |
| Hero background | `images.hero` | Full-bleed behind the H1 |
| Quick Answer panel | `images.quick_answer` | Portrait, right-hand side |
| Outcome rows | `images.outcome_0..N` | One per accordion row — a shared image reads as a bug |
| Closing band | `images.cta` | Full-bleed, below the FAQ |
| Related-services card | `card.image` | How the page looks inside a sibling's grid |

**Where they are declared depends on how the page was built.** An engine-built
page (`make page`) declares everything in its own
`scripts/content/<slug>.php` — `scripts/lib/pc-service-builder.php` reads it.
The two pages that predate the engine keep the same slot names in a
`$photography` array inside the script that owns their copy:

| Page | Declared in | Applied by |
|---|---|---|
| `/services/ai-search-optimization/` | `scripts/content/ai-search-optimization.php` | `make page SLUG=…` |
| `/services/pay-per-click/` | `scripts/apply-ppc-copy.php` | `make ppc` |
| `/services/digital-strategy-marketing/` | `scripts/apply-strategy-copy.php` | `make strategy` |

Either way `make page-images` is what puts the file in the media library, and the
build looks it up by file stem. So a brand-new picture needs **two** commands:
`make page-images`, then the page's own build. Both builds say which files were
missing rather than silently shipping demo stock.

### Sizing, and why the closing band is fussy

Sized to the slot: **1920x1080** full-bleed hero, **1200x1500** portrait Quick
Answer panel, **1600x1000** Outcome rows, **1920x1080** closing band.

The hero is `background-size: cover`, so its whole frame is used. The closing
band is **not**: `.nm-cta-2-wrap` is `background-size: auto` with
`background-position: 50% 0%`, so the picture paints at natural pixel size,
centre-cropped horizontally and top-aligned — at a 1280 viewport only the middle
~1260x994 of it is ever on screen. Undersizing is worse than oversizing there
(the background `repeat`s and tiles visibly), so 1920x1080 stands, but **the
subject has to sit in the centre-top of the frame** or the band renders as flat
black. Check a candidate before committing it:

```
python3 -c "
from PIL import Image, ImageStat
im = Image.open('x-cta.jpg'); w, h = im.size; l = (w - 1260) // 2
print(ImageStat.Stat(im.crop((l, 0, l + 1260, min(h, 994))).convert('L')).mean[0])
"
```

A slot may also be written as `array( 'file' => 'x.jpg', 'url' => 'https://…' )`,
in which case `make page-images` downloads it once into this folder and imports
it. Pictures are never hot-linked from a live page: an external URL is someone
else's uptime and a broken image the day it moves.

## Strategy pillars

| Pillar (term slug) | File | Why this picture | Source |
|---|---|---|---|
| `audience-and-buying-behaviour` | `pillar-audience-and-buying-behaviour.jpg` | One shopper facing an entire wall of choice — the copy is about who actually buys and what talks them out of it. | `https://images.unsplash.com/photo-1526152505827-d2f3b5b4a52a` |
| `positioning` | `pillar-positioning.jpg` | A single green form in a field of identical black ones — "the one thing you can say that your competitors flat-out cannot", and it sits naturally on the dark page. | `https://images.unsplash.com/photo-1764621005112-a65aa88abc5e` |
| `message` | `pillar-message.jpg` | A typewriter on dark wood — writing, done by a person. "Written in human, not in LinkedIn." | `https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50` |
| `channels` | `pillar-channels.jpg` | A thumb over a phone full of the actual channels — the handful of places attention really goes. | `https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1` |
| `film-and-brand-direction` | `pillar-film-and-brand-direction.jpg` | A working film set, crew and lighting — this is the pillar Production Connections shoots itself. | `https://images.unsplash.com/photo-1632187981988-40f3cbaeef5e` |
| `offer-and-funnel` | `pillar-offer-and-funnel.jpg` | A card being handed across a counter — the end of the path, "shut up and take my money". | `https://images.unsplash.com/photo-1654263937085-48fb17a63d66` |
| `measurement` | `pillar-measurement.jpg` | A real analytics dashboard, dark UI. Numbers that mean something. | `https://images.unsplash.com/photo-1551288049-bebda4e38f71` |

### The page's own photography

Prefix is `strategy-`, not `pillar-`: the `pillar-*` files above are this page's
seven category cards, and the page's own photography is not a pillar.

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `strategy-hero.jpg` | Three dice mid-roll on black. The H1 is "Costing You A Fortune **In Guesswork**" — this is guesswork, and it is almost entirely black with the whole left half empty, which is where the headline and the paragraph sit. | `https://images.unsplash.com/photo-1608231883522-2efb1897a608` |
| Quick Answer panel | `strategy-quick-answer.jpg` | Someone mid-sentence at a desk in a dim office, talking to whoever is off-frame. The three boxes beside it are "We Show Up In Person / We Get Under The Hood / We Stay As Your Partner" — this is that conversation, and it is not a boardroom. | `https://images.unsplash.com/photo-1758520145132-b0ecdb967295` |
| Outcome 01 — a plan you can act on | `strategy-outcome-plan.jpg` | A hand writing a plan out by hand on paper. The row's whole argument is that it is not "a 90-slide monument to buzzwords" — so the picture is the opposite of a slide deck. The brightest file in the set (mean 149, against a 36–103 range on the AI page); acceptable because it is warm rather than white, but it is the one to replace first if the row ever looks hot. | `https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd` |
| Outcome 02 — total clarity | `strategy-outcome-clarity.jpg` | A lighthouse lantern lit against a near-black sky. Clarity, and the gold of the lamp lands on the brand's own gold. Chosen after two better-on-paper "clarity" shots were rejected — see the note below. | `https://images.unsplash.com/photo-1417754214622-9de410e7af21` |
| Outcome 03 — the why behind every move | `strategy-outcome-why.jpg` | A hand placing a chess piece, dark background, cream piece. A move with a reason behind it, which is the row verbatim. | `https://images.unsplash.com/photo-1571236207041-5fb70cec466e` |
| Outcome 04 — a growth partner | `strategy-outcome-partner.jpg` | Two people across a table, one mid-explanation with notes open, warm browns and a gold coat in the foreground. "A partner who's seen your business from the inside" — a conversation, not a handshake. | `https://images.unsplash.com/photo-1685609238489-0385b14a0635` |
| Closing band | `strategy-cta.jpg` | A dark road curving away at night, one streetlight, the centre line running gold through the frame. Quiet, forward, and the last thing before the contact form. Its subject sits in the centre-top, which the band's crop requires. | `https://images.unsplash.com/photo-1637863611072-7441a3609d28` |

## Paid search coverage

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `google-search-ads` | `ppc-google-search-ads.jpg` | A search bar mid-query with the suggestions dropping down — the exact second someone goes hunting for what you sell. Dark browser chrome, so it sits naturally on the page. | `https://images.unsplash.com/photo-1762330465551-5217a6dec84f` |
| `meta-ads` | `ppc-meta-ads.jpg` | A phone held in both hands showing a feed of sponsored posts — catching buyers before they have started looking. | `https://images.unsplash.com/photo-1759215524472-1b0686fdbd87` |
| `youtube-and-video-ads` | `ppc-youtube-and-video-ads.jpg` | A cinema camera and monitor on a lit studio floor. This is the one line of the section Production Connections shoots itself, so the picture is the actual work. | `https://images.unsplash.com/photo-1654723011680-0e037c2a4f18` |
| `retargeting` | `ppc-retargeting.jpg` | A woman walking past a lit shop window, half of her in the reflection — the window-shopper who looked and left, which is precisely who retargeting is for. | `https://images.unsplash.com/photo-1746379023758-af54282fc8b1` |
| `landing-pages` | `ppc-landing-pages.jpg` | Page layouts sketched and blocked out by hand. Deliberately a wireframe and not a screenshot of a real site: a recognisable third-party brand on this page would read as a client of ours. | `https://images.unsplash.com/photo-1522542550221-31fd19575a2d` |
| `conversion-tracking` | `ppc-conversion-tracking.jpg` | A finger about to tap a card reader showing a sale total. The end of the chain — the sale a dollar of spend is supposed to trace back to. | `https://images.unsplash.com/photo-1750263160599-53c7974bc79d` |

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `ppc-hero.jpg` | Banknotes burning on a dark surface. The H1 is "Pay Per Click Is Bleeding You Dry / One Wasted Click At A Time" and the closing band says "profits when your money burns" — this is the page's own words, and the flame happens to land almost exactly on the brand's gold. | `https://images.unsplash.com/photo-1554768803-2ae381da5645` |
| Quick Answer panel | `ppc-quick-answer.jpg` | Two people talking in a working studio, palette and brushes in hand. The boxes beside it are "In Person / What A Customer Is Worth / Made In-House" — a real workroom covers the first and the last, and the muted neutrals sit on the dark page. | `https://images.unsplash.com/photo-1758522274399-8d3fd26a02f7` |
| Outcome 01 — what a customer is worth | `ppc-outcome-customer-worth.jpg` | Hands counting US dollar bills in low light. The row is "the only number that matters, and the one almost no agency asks for" — so the picture is somebody working it out. | `https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9` |
| Outcome 02 — a report you can read | `ppc-outcome-report.jpg` | Hands mid-explanation across a desk, one plain chart on the laptop, a notebook open. The row's bullet is "numbers you can act on in a meeting". Deliberately NOT a dense dashboard: a trading-terminal shot was the first pick and was dropped for being the literal decoder ring the copy mocks. | `https://images.unsplash.com/photo-1517245386807-bb43f82c33c4` |
| Outcome 03 — spend that acts like an investment | `ppc-outcome-investment.jpg` | A fan of hundreds on black. "Money going where it comes back with more of itself", and dark enough to sit on the page. Reads as a flat-lay against row 01's hands, so the two money rows do not look like the same photograph twice. | `https://images.unsplash.com/photo-1716782494065-e9268365ef9f` |
| Closing band | `ppc-cta.jpg` | One person still at a desk late, a single pool of warm lamp light in a dark office. Quiet, and the last thing before the contact form. The lit desk sits centre-frame, which the band's crop requires. | `https://images.unsplash.com/photo-1758520145147-c30bc656f314` |

## AI search optimization

Six category cards. The page is near-black with a gold accent, so these lean dark
on purpose — the two that did not were replaced (see the note below).

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `entity-optimization` | `geo-entity-optimization.jpg` | One lit window in an otherwise black facade. Entity work is about a machine being able to pick you out and be sure it is you — this is that, and it is almost entirely black, so it sits on the page rather than on top of it. | `https://images.unsplash.com/photo-1784238277604-f1aeafd0c800` |
| `structured-data-and-schema` | `geo-structured-data-and-schema.jpg` | A dark editor showing a nested document tree beside a CSS inspector. Schema is the one line of this section that genuinely is code, so the picture is the code. | `https://images.unsplash.com/photo-1518773553398-650c184e0bb3` |
| `answer-first-content` | `geo-answer-first-content.jpg` | A phone in the dark with an assistant asking "What can I help with?". The literal moment the page is about, one second before the answer that either names you or does not. | `https://images.unsplash.com/photo-1762330465857-07e4c81c0dfa` |
| `citation-building` | `geo-citation-building.jpg` | A thick stack of newspapers. Citations are other people's sources mentioning you, and the masthead is deliberately not readable — see the note below. | `https://images.unsplash.com/photo-1478940020726-e9e191651f1a` |
| `multi-engine-coverage` | `geo-multi-engine-coverage.jpg` | Someone on a phone lit by several monitors at once. Four engines answering the same question four ways. | `https://images.unsplash.com/photo-1773517385366-c099e6f0f7fa` |
| `video-and-multimodal-content` | `geo-video-and-multimodal-content.jpg` | A medium-format camera suspended against black. This is the line of the section Production Connections shoots itself, so the picture is the kit. | `https://images.unsplash.com/photo-1561721632-a0d70ac1d15b` |

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `geo-hero.jpg` | Someone on a phone in a dark room lit by screens — asking the machines, which is the whole premise of the page. | `https://images.unsplash.com/photo-1783520093896-e8591d0bdcf9` |
| Quick Answer panel | `geo-quick-answer.jpg` | Two people with a laptop on the floor of a real workshop, machinery everywhere. The section's claim is "we come to meet you in person"; this is what that actually looks like, and it is not a boardroom. | `https://images.unsplash.com/photo-1581093202598-ba4769217e86` |
| Outcome 01 — named in the answer | `geo-outcome-named.jpg` | A gold neon sign glowing in the dark. Your name, lit. It also happens to land almost exactly on the brand's gold-on-black palette. | `https://images.unsplash.com/photo-1785813124557-f09637abed2b` |
| Outcome 02 — treated as a trusted source | `geo-outcome-trusted.jpg` | An old repair specialist at a bench walled with labelled parts. The archetype of the business everyone in town sends people to. | `https://images.unsplash.com/photo-1742989667140-c69adadf556b` |
| Outcome 03 — a head start | `geo-outcome-head-start.jpg` | The start line of an empty running track. Nobody has set off yet, which is the argument the section is making. | `https://images.unsplash.com/photo-1474546652694-a33dd8161d66` |
| Closing band | `geo-cta.jpg` | Hands and a phone in near-darkness. Quiet, and the last thing before the contact form. | `https://images.unsplash.com/photo-1689348909596-8b747b9ff30f` |

## Search engine optimization

Six category cards. Same rule as the rest: dark, and matched to the one line of
copy that sits beside it. Four of the twelve picks for this page were swapped
after being downloaded at final crop and looked at — see the note below.

No Google or Search Console UI anywhere on this page. It is the obvious SEO stock
photograph and it is the wrong call twice over: it is a third party's interface,
and the copy is explicitly about not living in one.

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `technical-seo` | `seo-technical-seo.jpg` | Rusted valves and pipework along a dim wall. The copy is literally "the broken plumbing under your site", so the picture is plumbing. | `https://images.unsplash.com/photo-1618840626133-54463084a141` |
| `keyword-research` | `seo-keyword-research.jpg` | A laptop keyboard glowing out of pure black. "The phrases people type when they're ready to spend" — the typing, at the moment it happens, and the amber glow lands on the brand's gold. | `https://images.unsplash.com/photo-1708518804744-51c3ff8e5c83` |
| `on-page-optimization` | `seo-on-page-optimization.jpg` | Stacked printer's trays of metal type in a dark workshop. Titles, structure and copy, physically arranged — the row is about the page's own furniture, not its subject. | `https://images.unsplash.com/photo-1777621543796-f6c62717d932` |
| `content-and-video` | `seo-content-and-video.jpg` | A crew silhouetted around a camera rig at night. This is the line of the section Production Connections shoots itself, so the picture is the crew doing it. | `https://images.unsplash.com/photo-1681137063068-081072cf04b4` |
| `local-seo` | `seo-local-seo.jpg` | A lit main street threading through a dark town from above. "The searches near you" — a map pack, seen from where the map is actually drawn. | `https://images.unsplash.com/photo-1574876463941-993c490e6643` |
| `authority-building` | `seo-authority-building.jpg` | Marble columns rising out of shadow. "Done clean, the kind that holds up instead of blowing up" — authority that is load-bearing. | `https://images.unsplash.com/photo-1607553218764-af756cd2f15d` |

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `seo-hero.jpg` | A deserted parking deck at night, two-thirds pure black with one strip light. The H1 is "Your SEO Has You Parked On **Page Two Of Google**" — this is parked, and abandoned, and the empty black upper half is exactly where the headline sits. | `https://images.unsplash.com/photo-1637970067784-927e66e07e36` |
| Quick Answer panel | `seo-quick-answer.jpg` | Two people talking across a table in a dim room under warm pendants. The boxes beside it are "In Person / The Words Your Customers Use / Made In-House" — this is the first one, and it is a room, not a boardroom. | `https://images.unsplash.com/photo-1756017872910-85d31c56188f` |
| Outcome 01 — rankings that bring buyers | `seo-outcome-rankings.jpg` | A small cafe full of customers at night. "Buyers to your door", photographed from inside the door. | `https://images.unsplash.com/photo-1752920802444-19cda73b74bf` |
| Outcome 02 — traffic that compounds | `seo-outcome-traffic.jpg` | Long-exposure headlight trails curving through a near-black frame. Traffic, accumulating — the darkest file in the set and the one that most obviously is not a chart. | `https://images.unsplash.com/photo-1598566665290-e59c95256dc3` |
| Outcome 03 — earns while you sleep | `seo-outcome-asleep.jpg` | A lit monitor on an empty desk, city windows behind it. Nobody is there and the thing is still working, which is the row verbatim. | `https://images.unsplash.com/photo-1776391853674-92d8ee2369b0` |
| Closing band | `seo-cta.jpg` | One person lit only by their phone in a dark street, the whole frame in the brand's gold. "Own the searches your customers are typing today" — that is the person typing, and the last thing before the contact form. | `https://images.unsplash.com/photo-1769507333071-32b2d65fb39d` |

## Social media marketing

Six category cards. The page argues that stock photography is the problem, so
none of these is a stock-looking photograph of a smiling stranger: every one is
either the work being done or the thing the copy names. Mean luma across the
thirteen files is 11–86, which is inside the range the other four pages already
sit in. Seven of the first thirteen picks were swapped after being downloaded at
final crop and looked at — see the note below.

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `video-and-reels` | `sm-video-and-reels.jpg` | A camera operator beside a rigged monitor on a dark warehouse floor, more crew behind him. The row says "shot in-house", so the picture is the in-house crew mid-shoot rather than a phone on a tripod. | `https://images.unsplash.com/photo-1576714645490-1ed8c9a14045` |
| `content-strategy` | `sm-content-strategy.jpg` | Dozens of small prints pinned across a dim wall under one lamp. "Deciding what to post, which platform it belongs on" — the candidates, laid out where you can see them all at once. Deliberately not a whiteboard: every whiteboard shot on Unsplash is white, and this page is near-black. | `https://images.unsplash.com/photo-1754044818336-b8200b13ffa4` |
| `captions-and-ghostwriting` | `sm-captions-and-ghostwriting.jpg` | A person silhouetted against a wall of projected handwriting. "Read like a human with a pulse wrote them" — a human, and their handwriting, and nothing typed. | `https://images.unsplash.com/photo-1533709475520-a0745bba78bf` |
| `account-management` | `sm-account-management.jpg` | A hand in silhouette holding a phone up against a field of out-of-focus city lights. The accounts, run from one phone, out in all that noise. Chosen over the obvious shot of a home screen full of app icons — see the note below. | `https://images.unsplash.com/photo-1571524437639-2f76745813d7` |
| `community-management` | `sm-community-management.jpg` | Two hands cradling a lit phone in a dark room with a thread open on it. "Actually replying to the people who comment" — that is what replying looks like, at the hour it usually happens. | `https://images.unsplash.com/photo-1662711206755-70784211a1c0` |
| `analytics` | `sm-analytics.jpg` | A climbing amber-and-blue line chart filling a near-black screen. The amber lands on the brand's gold, and it is a plain chart rather than a dense dashboard, which is what "so you can see the customers your feed actually brought in" asks for. Its underlying data is a public health dataset with a two-word Portuguese legend; no brand, no product UI. | `https://images.unsplash.com/photo-1587400563263-e77a5590bfe7` |

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `sm-hero.jpg` | A hand holding a blank white phone screen out of pure black. Mean luma 11, the darkest file in the folder, and the entire left half is empty — which is exactly where the white H1 and the paragraph sit. The H1 is "Gets Thumbed Past **In Half A Second**"; this is the half-second, and the screen is blank because nothing on it held anyone. | `https://images.unsplash.com/photo-1510717029971-27681a0e9da9` |
| Quick Answer panel | `sm-quick-answer.jpg` | A camera rig and a light stand set up between the tables of a cafe, the owner working at the back. The boxes beside it are "In Person / How You Sound, Who Buys / Shot In-House" — this is all three in one frame, and it is somebody's actual business, not a studio. The brightest file in the set (86) because the room is; the foreground kit and floor are dark. | `https://images.unsplash.com/photo-1632256541048-49d80d3c06a3` |
| Outcome 01 — a feed that sounds like you | `sm-outcome-voice.jpg` | An interview lit and rolling in a brick room, two people in chairs, crew adjusting a stand. "Sounds like a real human runs it, specifically you" — the moment that voice actually gets captured. | `https://images.unsplash.com/photo-1602743297108-4c9061884285` |
| Outcome 02 — video that stops thumbs | `sm-outcome-video.jpg` | Hands holding a phone up in near-darkness, the screen the only lit thing in the frame. The row is about the viewer, not the crew, so this row is the watching and row 01 is the making. | `https://images.unsplash.com/photo-1496898422753-dbe303b23299` |
| Outcome 03 — real leads, not a follower count | `sm-outcome-leads.jpg` | A night market packed with actual customers at actual stalls. "Real leads into your business instead of inflating a follower number" — the opposite of a number on a screen. | `https://images.unsplash.com/photo-1772588181186-b4476f380ea3` |
| Closing band | `sm-cta.jpg` | A camera operator in profile behind a rigged cinema camera, lit only by a tube light and a little neon. The closing line is "Put a real camera on your business" — so the last thing before the contact form is a real camera. Band-crop mean luma 16.9, the same as `strategy-cta.jpg`, and the operator and camera sit centre-frame, which that crop requires. | `https://images.unsplash.com/photo-1673539554001-8c1a1fae1694` |

## Email marketing

**Seven** category cards, not six — this page's coverage list has seven terms.
Mean luma across the thirteen files is 7–82, inside the range the other pages
sit in, and the darkest single file in the whole folder (`email-broadcast-
campaigns.jpg`, 7) is on this page.

The obvious stock photograph for email is a screenshot of Gmail, Mailchimp or
Outlook, and it is the wrong call twice over, exactly as Google/Search Console
is on the SEO page: it is a third party's interface, and this page's whole
argument is that the tool is not the work. There is none anywhere on the page.

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `automated-flows` | `email-automated-flows.jpg` | A dark plant at night with one furnace line glowing orange and nobody on the floor. The row is "sell on autopilot around the clock" — so the picture is a shift nobody is working. | `https://images.unsplash.com/photo-1720036236697-018370867320` |
| `list-segmentation` | `email-list-segmentation.jpg` | A hand lifting one card out of a long drawer of tabbed index cards. "The right message hits the right person instead of one dumb blast" — the act of picking one out of the pile. The card carries a library citation, not a company name. | `https://images.unsplash.com/photo-1747147292047-7c61f1110897` |
| `broadcast-campaigns` | `email-broadcast-campaigns.jpg` | One microphone lit gold out of near-black. The row is "written in your actual voice"; this is the voice, and at mean luma 7 it is the darkest file in the folder. | `https://images.unsplash.com/photo-1710360683896-e0506fb3579a` |
| `lead-magnets-and-list-growth` | `email-lead-magnets-and-list-growth.jpg` | A single bulb in pure black with winged insects drawn in towards it. A lead magnet is a light in the dark that pulls them to you — literally the picture. | `https://images.unsplash.com/photo-1697998494734-11412e70cc91` |
| `deliverability` | `email-deliverability.jpg` | A worn brass letter slot in a black front door. Deliverability is the unglamorous business of getting through the door at all, so the picture is the door. The slot reads `BRIEVEN` — Dutch for "letters", a common noun, not a business. | `https://images.unsplash.com/photo-1770816341375-f17f01705030` |
| `video-in-email` | `email-video-in-email.jpg` | A camera operator in silhouette behind a rigged cinema camera in a smoke-filled studio. This is the line of the section Production Connections shoots itself, so the picture is the shoot. | `https://images.unsplash.com/photo-1642512755472-2d54403cdd1b` |
| `revenue-tracking` | `email-revenue-tracking.jpg` | The worn keys of an old shop till, each stamped with a dollar amount, one reading `NO SALE`. "Tied to actual sales instead of vanity opens" — the money as it is actually rung up. No maker's mark in frame. | `https://images.unsplash.com/photo-1564986410613-97e0b371efe5` |

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `email-hero.jpg` | A single stack of gold coins backlit out of pure black. The H1 is "Email Marketing Is The Easiest **Money You're Not Making**", and the opener's own metaphor is sitting "on it like a dragon who forgot the gold was there" — this is that hoard, untouched. Mean luma 31, and the entire upper-left third, where the white headline and the paragraph sit, is black. | `https://images.unsplash.com/photo-1755369355222-8146801ccf90` |
| Quick Answer panel | `email-quick-answer.jpg` | Two people at a small table under warm light, one mid-explanation, the other listening with a hand on his chin. The boxes beside it are "In Person / Your Real Voice / Made In-House" — this is the first one, and it is somebody explaining their own business rather than a meeting room. | `https://images.unsplash.com/photo-1774592630528-eca3427a322f` |
| Outcome 01 — a list that prints money | `email-outcome-autopilot.jpg` | The oiled innards of a press mid-run, paper spinning through it. "A list that prints money on autopilot" — a machine running, with no operator in frame. | `https://images.unsplash.com/photo-1729997310009-8afaf117288a` |
| Outcome 02 — sales closed while you sleep | `email-outcome-asleep.jpg` | A dark timber cabin room with unmade beds and one small lit window. Nobody is there and it is already morning, which is the row verbatim. | `https://images.unsplash.com/photo-1475592827823-4e8548bbc506` |
| Outcome 03 — emails they actually open | `email-outcome-opened.jpg` | Someone laughing at what is on their phone, lit gold against black. "Because for once they sound like a human they know" — that reaction is the row, and it is the opposite of the phone-in-the-dark shots the other pages use. | `https://images.unsplash.com/photo-1662988836971-aefba0a7907a` |
| Closing band | `email-cta.jpg` | Five warm pendant lamps hanging in front of dark panelled doors. The manifesto's line is that the list "saves your ass and **keeps the lights on**", so the last thing before the contact form is the lights, on. Band-crop mean luma 23.0, and the lamps hang from the top edge, which is exactly what a `background-position: 50% 0%` crop wants. | `https://images.unsplash.com/photo-1767500263347-4eef1b448fc2` |

## AI automation systems

**Seven** category cards plus the page's own photography — thirteen files, the
same count as the email page. Mean luma across the thirteen is 12–72, inside the
range the other pages sit in.

Two stock clichés are banned on this page for the same reason the SEO page bans
Google's UI. The first is any **ChatGPT / OpenAI / Zapier / n8n interface**: it
is a third party's screen, and this page's copy names those tools disparagingly
("a Zapier login and a thumbs-up emoji"), so putting their branding in our own
imagery would be arguing for the other side. The second is the **glowing AI
brain / humanoid robot**, which says nothing about a real business and undercuts
a page whose entire argument is that the other guys sell buzzwords. There is
none of either anywhere on the page. Every frame here is a real business or a
real mechanism.

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `instant-lead-response` | `automation-instant-lead-response.jpg` | A hand holding a lit phone up out of near-black, warm bokeh behind it. The row is "answers and qualifies every inquiry in seconds, day or night" — this is the inquiry, at the hour the opener says it arrives (11:47pm). Mean luma 13. | `https://images.unsplash.com/photo-1767334850102-b37f04d4e2b0` |
| `ai-chat-and-reception` | `automation-ai-chat-and-reception.jpg` | A vintage black-and-chrome desk telephone against a dark slate wall. The line the house style keeps taking: an analogue object for a digital idea, as the shop till does for revenue tracking. The phone that always gets picked up, and no branding on it. | `https://images.unsplash.com/photo-1534536281715-e28d76689b4d` |
| `follow-up-automation` | `automation-follow-up-automation.jpg` | Dominoes standing in a curve on a black reflective surface. A sequence that keeps going once it starts, which is exactly what "the nurture and reminder sequences that chase leads so your team doesn't have to" is. The brightest file on the page (72) because the dominoes are white, but they sit on black. | `https://images.unsplash.com/photo-1769029174092-d26bc1a51efc` |
| `workflow-automation` | `automation-workflow-automation.jpg` | Blue cables fanning symmetrically out of a patch panel of amber indicator lights, on black. "Wiring your tools together so data stops getting re-typed by hand" — so the picture is the wiring, literally. Mean luma 17, and the amber LEDs land on the brand's gold. | `https://images.unsplash.com/photo-1683322499436-f4383dd59f5a` |
| `booking-and-scheduling` | `automation-booking-and-scheduling.jpg` | A lit wall of wooden cubbies, each holding a numbered brass tag. Every slot taken — "customers self-serving their way onto your calendar without the phone tag" — and the tags carry room numbers only, no hotel's name. Warm gold on dark wood. | `https://images.unsplash.com/photo-1769065649791-fde54d23f699` |
| `back-office-automation` | `automation-back-office-automation.jpg` | Rows of dark wooden pigeonholes stuffed with paperwork. "The repetitive grunt work quietly stealing your team's week", filed. Mean luma 22 and not a single word legible anywhere in it. | `https://images.unsplash.com/photo-1544906210-073c36ccee65` |
| `custom-ai-agents` | `automation-custom-ai-agents.jpg` | A smith working at an anvil in a dark workshop hung with tools. "Trained on your business to actually sound like they work there" — somebody making one thing to fit, in a trade they obviously know. | `https://images.unsplash.com/photo-1528717384022-f8d665c86909` |

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `automation-hero.jpg` | A dim office at night, shot through blinds, three or four people still at their desks under warm Edison bulbs. The H1 is "Your Team Is Burning Hours On Work **AI Automation Should Do**" — this is that, exactly, with no metaphor required. Mean luma 18, the upper-left third is empty and dark where the white headline and the paragraph sit, and the bulbs land on the brand's gold. | `https://images.unsplash.com/photo-1572423589021-a294e9ef8b85` |
| Quick Answer panel | `automation-quick-answer.jpg` | A dim garage with bonnets up and one mechanic standing in it. The boxes beside it are "In Person / Your Real Bottlenecks / Built In-House", and the Approach opens "You cannot automate a business you've never watched run" — so the picture is somebody's actual operation mid-job, not a meeting room. Two vehicle registration plates are legible at full size and illegible at the rendered size; a plate is not a company name, so the DUMBO MARKET rule does not bite. | `https://images.unsplash.com/photo-1756575527484-2839c593ed84` |
| Outcome 01 — hours handed back | `automation-outcome-hours.jpg` | A desk of monitors with the chair pushed away, city at dusk through the glass. "Hours of your week handed back" — you have gone, and the work has not. | `https://images.unsplash.com/photo-1712111878737-c1d644970d1a` |
| Outcome 02 — every lead answered | `automation-outcome-every-lead.jpg` | Someone in a lit phone booth on a warm, empty street at night. "Every lead answered in seconds, day or night, so none of them wander off to a competitor while you sleep" — the call being made at the hour nobody is on the desk. | `https://images.unsplash.com/photo-1767286694089-3baabe05a17a` |
| Outcome 03 — built to fit your stack | `automation-outcome-your-stack.jpg` | Black metal gears meshing on a dark shaft. "Wired into the stack you already use" — a new part driving machinery that was already there. Mean luma 27. | `https://images.unsplash.com/photo-1524514587686-e2909d726e9b` |
| Closing band | `automation-cta.jpg` | A near-black tower facade with a single window lit. **Chosen on the measurement, not on the subject** — see the note below. It reads as the one operation still running while everything around it is dark, which is the closing line's argument. | `https://images.unsplash.com/photo-1759496722430-d1d8e46dfb93` |

### The closing band, measured

Worth writing down, because on this page the best-looking candidate was not the
one that shipped and the full-frame mean luma actively misled.

`.nm-cta-2-wrap` is `background-size: auto` at `background-position: 50% 0%`, so
only the middle ~1260x994 is ever visible — confirmed live at 375px, where the
computed values are `auto` / `50% 0%` / `repeat`. White copy sits on the raw
photograph above 991px (`.nm-cta-2-area::after` only supplies its 0.78 scrim
below that), so the band crop was scored for white-text contrast, not eyeballed:

| Candidate | Band mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| **Lit window, black facade (shipped)** | **17.5** | **3.64%** | **8.32:1** |
| Gold-lit refinery at night | 45.3 | 8.81% | 2.85:1 |
| `LAUNDROMAT` frontage at night | 27.9 | 7.02% | 2.78:1 |
| Dark laundromat interior | 49.7 | 17.56% | 1.41:1 |
| `LAUNDERETTE` frontage | 60.9 | 23.86% | 1.06:1 |

Only the shipped file is in the same class as `email-deliverability.jpg` (0.6%,
8.45:1). The refinery was the better photograph and the better metaphor — plant
running itself on the night shift, gold on black — and it puts a white headline
straight onto lit pipework. Note too that the two laundromat frames scored
*worse* in the band than their full-frame luma suggested, because the crop
throws away the dark sky and foreground that pulled the average down: **score
the crop, never the file.**

The lit-window frame does repeat an idea already used at card size on
`/services/ai-search-optimization/` (`geo-entity-optimization.jpg`, also one lit
window in a black facade). That is a real cost, accepted knowingly: the two are
visually unalike (a warm single window close-up there, a cold grid of many
windows with one lit here), and no other candidate cleared the contrast bar.

### Shots that were rejected, and why — AI automation

Nine of twenty-eight candidates, and the striking thing is that **every single
rejection on the reception and Quick Answer slots was the DUMBO MARKET rule.**
Real receptions have the company's name on the wall; that is what a reception
is. Twice the best frame of the round died on it:

33. A **dim lobby counter** with one person working it and a corridor of lights
    running away behind — the best `ai-chat-and-reception` frame by a distance,
    mean luma 39. `WAKECUP` is legible on the menu board and `TEA STATION` is a
    lit sign on the right wall. Two company names in one frame.
34. A **hotel lobby** with a lit reception desk and staff at it, the fallback for
    the same slot. `THE WESTIN` in gold letters across the stone wall.
35. A **restaurant open kitchen** seen from the dining room, one chef at the
    pass under copper lamps, mean luma 30 — the best Quick Answer frame of the
    round. `RAVINTOLA Nokka` is legible in script across the glass partition.
36. A **vending machine lit in an empty street at night** had the best band
    numbers of any closing-band candidate (mean 16.3, 1.65% failing, 8.59:1) and
    was dropped on two counts: `エイブル` and a phone number are legible on the
    wall beside it, and the band's centre crop pushes the machine to the right
    edge and leaves two-thirds of the frame empty black. A second alley shot had
    `KIRIN` in foot-high red letters plus a Kirin Beer neon.
37. A **chrome stopwatch on pure black** for `instant-lead-response`. `HEUER` is
    legible on the dial. Same rule as the Canon lens and the Addo-X.
38. A **router and patch cables** for `workflow-automation`, with
    `Cloud Router Switch` and `ProSAFE S3300` legible across it, and lime-green
    LEDs on the darkest page on the site.
39. A **trade-show floor** with a robot arm and a crowd for outcome 03 — mean
    luma 128, orange racking, third-party branding on the arm. The same
    rejection, for the same reasons, as the strategy page's trade-show shot.
40. Six **corporate-stock "colleagues round a laptop"** frames for the Quick
    Answer, mean luma 85–169. These are the anonymous person in the anonymous
    office that this whole exercise exists to replace, and they say nothing
    about anybody's actual operation.
41. Bright-palette rejects, all for coverage cards: **white flat-lay planners**
    (up to 149) and **white office printers** for booking and back-office, a
    **rotary phone on white** (202), a **grey metal mailbox bank** in daylight
    (87), and a **rusted teal gear** (64, and the wrong two colours). A
    **wooden wall telephone** was dropped purely for its green marbled wall —
    the brand audit is on record as 0 green.

Also passed over at search time: **antique ledgers with quill pens** for
back-office automation, which are genuinely the right idea — doing it by hand —
but read as 1850 rather than as a business operating now, the same objection as
the archival workshop photographs on the strategy page.

## Targeted TV advertising

Six category cards plus the page's own photography — twelve files, the smallest
set since the paid search page, because this page declares no
related-services card (block 15 is a blog grid, so `card.image` paints
nowhere). Mean luma across the twelve is **6.9–36.9**, the darkest spread of any
page in the folder: the subject genuinely is a lit screen in an unlit room, so
the palette came for free rather than being fought for.

**One banned cliché, and it is the hardest one yet.** The copy names Hulu, Roku,
YouTube TV and Peacock, and the obvious stock photograph for "connected TV" is a
screen filled with exactly those logos. Every one of those is out under the
DUMBO MARKET rule — on our own service page a streaming brand's mark filling the
frame reads as a partnership we do not have, and it is a *worse* claim here than
`ChatGPT` is on the AI automation page, because these are the platforms we sell
placement on. So every frame here shoots the **situation** instead: a dark room
lit by an unreadable screen, a couch from behind, a phone in the dark, a studio
with the camera already rigged. **No screen anywhere on this page carries
readable content**, and the closing band contains no screen at all.

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `connected-tv-and-streaming-ads` | `tv-connected-tv-and-streaming-ads.jpg` | A flat screen on a dark wall glowing with an abstract band of colour, in an otherwise unlit room. Mean luma 18.5. Modern panel, so it reads as connected TV rather than as nostalgia, and the picture on it is pure abstraction — which is the whole point of the ban above. | `https://images.unsplash.com/photo-1585666638719-56ca4993579b` |
| `household-level-targeting` | `tv-household-level-targeting.jpg` | One suburban house at night with two downstairs windows lit and everything around it black. Household-level targeting is *this house and not the one next door*, so the picture is one house. Chosen over a near-identical frame shot through foliage, which was dropped on palette — see below. | `https://images.unsplash.com/photo-1570905810373-a8ae44f954cb` |
| `commercial-production` | `tv-commercial-production.jpg` | An empty wooden chair on a black studio floor with a cinema camera, boom mic, softbox and ladder already rigged on it. Mean luma 10.0, the darkest file on the page. This is the line of the section Production Connections shoots itself, so the picture is our own room with nobody in it yet. No maker's mark legible on the body. | `https://images.unsplash.com/photo-1666858443985-fead1d59b4f7` |
| `programmatic-placement` | `tv-programmatic-placement.jpg` | A wall of small monitors above a console of switches and indicator lights, **with nobody at the desk**. "Drops your ad into the right homes automatically" — many outputs, running unattended, which is the only part of that sentence a photograph can carry. The house move of an analogue object for a digital idea, same as the shop till for revenue tracking. Note the risk taken: see the note below. | `https://images.unsplash.com/photo-1714596282575-82d224db8c70` |
| `cross-device-retargeting` | `tv-cross-device-retargeting.jpg` | A man in near-darkness lit only by the phone in his hand, city lights out of focus behind him. Mean luma 6.9, the darkest file in the whole folder. He has left the big screen and the ad has followed him, which is the row verbatim. Screen content is an indistinct blue wash. | `https://images.unsplash.com/photo-1630993094890-f7d47e9dcf56` |
| `real-measurement` | `tv-real-measurement.jpg` | A pair of steel drafting dividers and a pen lit on black. Measuring, by an instrument that either reads a real number or does not — against "fuzzy impression counts". Deliberately **not** a dashboard: the social page already spends its analytics card on a chart, and a chart here would argue for the report the copy mocks. There is embossed lettering on the pen barrel, unreadable even at 4x and 2.2x brightness, so it is weaker than the registration plates already accepted on `automation-quick-answer.jpg`. | `https://images.unsplash.com/photo-1605066902012-ba3ed05b8a2c` |

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `tv-hero.jpg` | One silhouetted head against an abstract blue screen in a pitch-black room. Mean luma 32.2, but that number is misleading in the useful direction: the lit area is a tight rectangle in the centre and both text zones are near-black. **Scored, not eyeballed** — see the note below. One person, one screen, which is the argument; a public-screening frame that scored better was rejected for arguing the opposite. Screen content is water and horizon, wholly unbranded. | `https://images.unsplash.com/photo-1588823400943-b85ba1a6d19a` |
| Quick Answer panel | `tv-quick-answer.jpg` | Two men under a single hanging lamp in a dark room, one fitting a coat on the other. The boxes beside it are "In Person / Exactly Who Buys From You / We Make It And Place It" — and a fitting is all three: somebody measuring the actual person in front of them and making the thing to suit. Made to measure against a bulk buy is this page's whole argument. Mean luma 32.1. Chosen after two rounds of the obvious searches returned only darkroom red and bright corporate stock. | `https://images.unsplash.com/photo-1752920538721-745c05957bd0` |
| Outcome 01 — a national brand on the big screen | `tv-outcome-big-screen.jpg` | A couple on a couch in a dark room in front of a screen big enough to fill the wall, popcorn on the table, fire going. "Looking like a national brand, in front of the exact households that buy" — the household, at the moment the ad would land. Was the first hero candidate and lost that slot on geometry, not on merit: its bright half sits exactly where the H1 goes. | `https://images.unsplash.com/photo-1721733258410-35e699661ad6` |
| Outcome 02 — a commercial that looks like real money | `tv-outcome-real-money.jpg` | A car lit by a single film panel on a dark wet lot, light stands around it. A car commercial mid-shoot is the most expensive-looking thing a crew does, which is the row verbatim — "so it looks like real money, not a cable-access afterthought". No badge legible anywhere on the body. | `https://images.unsplash.com/photo-1698533188601-2432adf826f4` |
| Outcome 03 — TV reach without the Super Bowl invoice | `tv-outcome-reach.jpg` | A near-black facade at night with a scattered grid of warm lit windows. Mean luma 13.2. Reach, counted in households rather than in impressions. Knowingly rhymes with `automation-cta.jpg` and `geo-entity-optimization.jpg`, both of which are ONE lit window; this one is deliberately *many*, which is the opposite point and the reason it earns the repeat. | `https://images.unsplash.com/photo-1772142113342-3979117130db` |
| Closing band | `tv-cta.jpg` | An empty couch in a dark living room with the light of an off-frame screen falling across the cushions. The closing line is "Stop letting your competitor own the big screen in your customer's living room" — so the last thing before the contact form is the living room, lit by a screen, with the seat empty. **It contains no screen at all**, which makes it the one frame on the page with zero logo risk, and it scores better in the band than any file shipped so far. | `https://images.unsplash.com/photo-1687870593213-78c6dadb0847` |

### The hero, measured

The H1 sits **upper-left** and the paragraph **lower-right** — that is
`service-detail.css` §18's grid (`.nm-hero-4-title-wrap` row 1 left/top,
`.hero-btn` row 2 left, `.hero-disc` row 3 right with `align-self: end`), so a
hero needs *both* of those zones dark and the middle is free. Scored against
pure white before the mobile scrim is applied at all:

| Zone | Mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| H1, upper-left | 37.4 | 4.36% | 4.67:1 |
| Paragraph, lower-right | 22.7 | 0.00% | 17.04:1 |

The 4.36% is the screen's left edge clipping the corner of the H1 box, and it is
fine on purpose: the H1 is large text, whose AA floor is **3:1**, and 4.67:1
clears even the 4.5 bar for body copy. The paragraph zone — where the small text
actually is — is 17:1. Below 991px §18's 0.82 scrim covers both regardless.

### The closing band, measured

Same method as the AI automation round, and the same lesson: **score the crop,
never the file.** `.nm-cta-2-wrap` is `background-size: auto` at
`background-position: 50% 0%` — confirmed live again on this page at 1440
(`auto` / `50% 0%` / `repeat`) — so only the middle ~1260x994 is ever visible.

| Candidate | Band mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| **Empty couch lit by an off-frame screen (shipped)** | **20.7** | **1.80%** | **13.58:1** |
| Woman with a mug lit by a laptop | 25.3 | 2.87% | 7.11:1 |
| Dark audience in front of a screen | 37.4 | 3.81% | 6.29:1 |
| Family in the dark lit by a screen | 38.4 | 6.43% | 3.69:1 |
| Retro lounge with a CRT on | 53.9 | 10.09% | 2.71:1 |
| Outdoor screening round a fire pit | 44.1 | 11.98% | 2.17:1 |

The shipped file is the best band score in the folder — better than
`email-deliverability.jpg` (0.6%, 8.45:1) on the worst-case percentile and
better than the AI automation band (17.5, 3.64%, 8.32:1) on the failure rate.
Its subject also sits dead centre and reaches the top edge, which is what a
`50% 0%` crop needs; there is no flat-black band at any width.

### The one risk knowingly taken — programmatic placement

`tv-programmatic-placement.jpg` is a **preserved 1960s broadcast gallery**, and
this page's problem section opens "Old-school media buyers are still running the
1980s playbook with a straight face." A vintage control room is therefore one
step from arguing for the other side, and that was weighed rather than missed.
It ships because the card's own label and description sit directly against it
("Programmatic Placement / Drops your ad into the right homes automatically"),
because the thing the frame actually says is *nobody is at the desk and it is
still routing*, and because the house style already reaches for the analogue
object for the digital idea four times over (the shop till, the desk phone, the
index-card drawer, the pigeonholes). If the section ever reads as nostalgic,
this is the first file on the page to replace.

### Shots that were rejected, and why — targeted TV

Twelve of roughly sixty candidates, and the hit-rate story is the reverse of the
social page: the palette was effortless and **the logos were brutal.** Six
separate rejections were a streaming service's own mark.

42. A **remote control** with `NETFLIX`, `YouTube` and `prime video` buttons
    legible across it — the single most literal `connected-tv` photograph in the
    search, dropped on the DUMBO MARKET rule. Then a **wall-mounted TV showing
    the Netflix splash screen**, a second showing the **Netflix "N" on a lit
    wall**, an **Apple TV home screen** full of app icons, an **Apple TV remote
    beside an iPad**, and a **blurred streaming grid of thumbnails** that is
    unmistakably one service's row layout even out of focus. Six frames, six
    brands, one rule.
43. A **news broadcast behind a silhouetted head** — dark, beautifully composed,
    and carrying `ANC` and `TZMM` broadcaster bugs plus two lines of readable
    chyron. A broadcaster's mark is the same claim as a client's.
44. **Green-lit server rooms**, seven of them, for `programmatic-placement`.
    Rejected twice over: the brand audit is on record as 0 green and every frame
    was lime from edge to edge, and `MIDAS`, `openGear`, `Huawei`, `ProSAFE
    S3300` and `Cloud Router Switch` were legible across them. The AI automation
    round dropped a patch-panel shot for the identical pair of reasons.
45. **Container terminals at night** for the same slot — the automated-placement
    metaphor was good and the palette was right. `EVERGREEN`, `HMM`, `MAERSK`,
    `Hapag-Lloyd`, `MSC` and `TERMINAL BURCHARDKAI` between them made it
    unusable. A **parcel-locker bank** in an empty street went the same way with
    `amazon` lit blue across the front, as did a **doorstep parcel** printed
    `MEALPRO`.
46. A **projector product render** — couple on a sofa, astronaut on the wall,
    warm and dark and very nearly the hero. It is a manufacturer's own marketing
    render with their name on the projector body, which is a third party's ad,
    not a photograph.
47. An **outdoor screening round a fire pit** and a **poolside screen**: both
    manufacturer renders again, pink-and-blue lit, worst two band scores of the
    round.
48. A **cricket match on a living-room TV**, over the shoulder from the couch —
    the best "household watching the big screen" composition in the whole
    search. It is AI-generated: the sponsor hoardings read `Canion`, `EASM` and
    `F..T`, the batsman's hands are malformed and the foreground viewer is a
    smear. Garbled text technically passes the logo rule and the frame still
    fails, because it is visibly not a photograph.
49. A **family in the dark lit by a screen** was the second hero pick and the
    last to fall. Mean luma 33 with a pure-black left third, genuinely lovely —
    and at the card crop an event poster reads `WED 14TH JAN / DOORS OPEN 9:00
    PM / RINGSIDE IS WHERE IT'S AT` in the top-right and the man's shirt reads
    `...ARLEYS`. Two pieces of legible third-party text, and the thing they are
    watching is off-frame and reads as a tablet at bedtime rather than a TV.
50. A **dark audience in front of a screen** scored better in the H1 zone than
    the shipped hero (1.17% against 4.36%) and was rejected on argument, not on
    contrast: it is a roomful of strangers at a public screening, which is
    precisely the "aimed at roughly everyone" the copy spends three paragraphs
    demolishing. Recorded because it is the one case this round where the better
    number lost.
51. **CRT sets showing static**, nine of them across three searches. Dark,
    cheap to find, and all arguing *no signal* on a page selling airtime. The
    same instinct that makes them attractive — retro, moody, unbranded — is what
    makes them wrong.
52. A **house glimpsed through leaves** with one lit window, for
    `household-level-targeting`. The right idea and mean luma 22, dropped on
    palette: green foliage fills two-thirds of the frame.
53. **Darkroom red safelight** frames, six of them, returned by every "business
    owner talking in a dim room" query. The email page already rejected a
    darkroom for reading as a darkroom; these also had no conversation in them.
54. Bright rejects, for completeness: **staged 3D interiors with the TV off**
    (up to 214, and an off TV says nobody is watching), **daylight living rooms**
    (91–182), a **FUJIFILM lens cap** and a **Timberland t-shirt** in the crew
    search, and six **filming-in-a-shop** frames at luma 79–167 carrying Nike,
    `Check` banners and an `OPEN` neon.

## Billboard advertising

Six category cards plus the page's own photography — **twelve** files, the same
count as the targeted TV page and for the same reason: this page declares no
related-services card, because block 15 is a blog grid and `card.image` paints
nowhere. Mean luma across the twelve is **17.3–83.4**, inside the range the other
pages sit in.

**The hardest logo round yet, and it is structural rather than incidental.** On
every other page the third-party mark is something that happened to be in the
frame. Here it is the subject: a billboard photograph is, almost by definition, a
photograph of somebody else's advertisement. A Coca-Cola or McDonald's board
filling the frame on our own service page reads as a client we do not have, and
the two searches that should have been easiest — `billboard night` and
`billboards city night` — returned Wendy's, Coca-Cola, LG, Samsung, JD, adidas,
Boots, H&M, NIKKA, Novotel and a wall of Broadway posters between them.

So **no board on this page shows a readable board face.** The frames are: a
blank board, an unlit board, a board's scaffolding seen from below, an LED
surface at pixel range, a lit screen standing alone in the dark, the road itself,
and the people on it. The `YOUR AD HERE` mockup was ruled out separately — it is
the stock-photo tell that says we could not find a real photograph, and
`blank billboard` returns almost nothing else (fifteen results, thirteen of them
daylight mockups with a pure-white panel).

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `static-billboards` | `billboard-static-billboards.jpg` | A weathered, completely **blank** board on one pole against a near-black starry sky, a single power line running under it. The cleanest board photograph in the whole search — nothing to read, nobody's brand, and the classic static panel this row is named after. The brightest file on the page (83.4) because the horizon glows; the board and the sky above it are dark. | `https://images.unsplash.com/photo-1633777783568-085312a3d44a` |
| `digital-billboards` | `billboard-digital-billboards.jpg` | An LED display at pixel range, its individual diodes lit cyan with a magenta edge. The row is "swap messages by time of day and rotate creative", and this is the surface that lets you: the mechanism, photographed close enough that there is no message on it at all. | `https://images.unsplash.com/photo-1669236392019-6e8e0cbef4c1` |
| `programmatic-out-of-home` | `billboard-programmatic-out-of-home.jpg` | A lit outdoor screen standing alone in a pitch-black lot with nobody anywhere near it. Mean luma 17.3, the darkest file on the page. The same house move as `tv-programmatic-placement.jpg` — the thing a photograph can actually say about automated buying is *it is running and nobody is at the desk* — but a screen in a field rather than a control gallery, so the two pages do not repeat a frame. | `https://images.unsplash.com/photo-1632477829576-775f9b8c0e35` |
| `location-strategy` | `billboard-location-strategy.jpg` | A motorway interchange from directly above at night, its lit loops drawn on near-black ground. "Where your buyers really drive, live, and work" — the roads themselves, seen from the altitude the decision is actually made at. Graphic rather than pretty, and no signage legible at 2.2x brightness. | `https://images.unsplash.com/photo-1700463108327-635ce9346d55` |
| `billboard-design` | `billboard-design.jpg` | Large wooden letterpress letters standing on a dark bench, lit gold from one side. "A few words and one image that hits" — a few words, physically, at the size where each one has to earn its place. Knowingly rhymes with `seo-on-page-optimization.jpg` (trays of metal type) and earns the repeat by arguing the opposite: that page is a tray of hundreds of small sorts, this is four letters the height of a hand. The letters read `WOOD TYPE` mirrored — a common noun, no maker's mark. | `https://images.unsplash.com/photo-1699662585139-140a988be1a8` |
| `mobile-retargeting` | `billboard-mobile-retargeting.jpg` | Someone leaning on their car on a foggy road at night, lit only by the phone in their hand, tail lights red behind them. "Chasing the people who passed your board onto their phones afterward" — that is the person, on that road, on their phone, at the hour it happens. | `https://images.unsplash.com/photo-1582472978953-12929ab18f3e` |

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `billboard-hero.jpg` | An **unlit** billboard silhouetted dead centre against a crimson dusk, over a wide empty road whose whole lower half is near-black. Mean luma 37.3. The brief's own answer to this slot was "a lit board against a night sky, or a highway at dusk"; this is both at once, with no brand and no readable board face anywhere in it. **Scored, not eyeballed** — see the note below. | `https://images.unsplash.com/photo-1736317854932-a29ef134958d` |
| Quick Answer panel | `billboard-quick-answer.jpg` | A man at his dim roadside workshop mid-sentence, hand raised, while a customer stands over him listening with his hands behind his back. The boxes beside it are "In Person / Where Your Customers Actually Go / The Spot And The Ad" — this is the first one, and it is somebody's actual trade rather than a meeting room. Mean luma 64.2. | `https://images.unsplash.com/photo-1770447607455-95f60e877e14` |
| Outcome 01 — where your customers actually drive | `billboard-outcome-drive.jpg` | A near-black city at night with red light trails curving along an elevated road. Mean luma 21.2. The row is "exactly where your customers actually drive" — so the picture is the driving, counted in headlights. | `https://images.unsplash.com/photo-1542642839-4792527ea1df` |
| Outcome 02 — the presence of a brand ten times your size | `billboard-outcome-presence.jpg` | A billboard's structure shot from directly beneath, its floodlight arms lit against a teal night sky, the board face invisible at that angle. Monumental, which is the row verbatim, and it is the one frame on the page that shows the scale of the thing without showing anybody's ad on it. | `https://images.unsplash.com/photo-1687216037475-997f80aefd2b` |
| Outcome 03 — a board that pulls its weight | `billboard-outcome-three-seconds.jpg` | A driver's hands on the wheel at night, city lights out of focus through the glass. Mean luma 24.3. The opener spends a paragraph on this exact person — "doing 65, sipping coffee, half-listening to a podcast" — so the last row is the three seconds themselves, from the only seat that matters. The one interior on the page, which keeps three exterior night frames from reading as one photograph three times. | `https://images.unsplash.com/photo-1518783211485-10fd3bfb2ce2` |
| Closing band | `billboard-cta.jpg` | A foggy tree-lined road at night under amber street lamps, one car's tail lights receding into it. The closing lines are "Stop letting a rep park your money over a highway your customers never drive" and "where the right people will actually see it" — so the last thing before the contact form is that highway, and the amber lands on the brand's own gold. **It contains no board at all**, the same call the TV page made for the same reason: zero logo risk on the one frame that gets the largest crop. | `https://images.unsplash.com/photo-1495709165577-351d14380bdd` |

### The hero, measured

`service-detail.css` §18 puts the H1 **upper-left** and the paragraph
**lower-right**, so a hero needs both of those zones dark and the middle is
free. Scored against pure white before the mobile scrim is applied at all:

| Zone | Mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| H1, upper-left | 43.7 | 0.00% | 9.00:1 |
| Paragraph, lower-right | 22.6 | 6.31% | 4.23:1 |

The H1 zone is the best on the site — the crimson never reaches it. The
paragraph zone's 6.31% is the horizon band clipping the top edge of that box,
and it is accepted knowingly: the failing pixels are the thin crimson stripe at
`y≈0.72–0.78`, the paragraph is bottom-aligned in its cell (`align-self: end`)
and sits below it on black, and below 991px §18's 0.82 scrim covers the whole
thing. It is a slightly worse worst-case than the TV page's paragraph zone
(0.00%, 17.04:1) and a much better H1 zone (4.36%, 4.67:1). **If either hero
zone ever reads hot, this is the file to replace, and the fix is a tighter crop
rather than a different photograph.**

The obvious alternative was the blank starry board now on the `static-billboards`
card. It shipped as a card and not as the hero for a measured reason: at the
hero's 16:9 crop its sky opens up to mean 81.7, and the H1 zone fails **26.47%**
against white at 2.05:1. It is a good photograph and a bad hero, which is the
same trap `tv-outcome-big-screen.jpg` fell into one page over — **lost the hero
slot on geometry, not on merit.**

### The closing band, measured

Same method and the same lesson as the previous two rounds: **score the crop,
never the file.** `.nm-cta-2-wrap` is `background-size: auto` at
`background-position: 50% 0%` — confirmed live on this page at 375 and 1440
(`auto` / `50% 0%` / `repeat`) — so only the middle ~1260x994 is ever visible,
top-aligned, and an undersized file tiles.

| Candidate | Band mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| **Foggy lamplit road, tail lights (shipped)** | **34.1** | **0.71%** | **9.15:1** |
| Near-black lane, one lamp | 6.1 | 0.21% | 16.86:1 |
| Dusk rural road, utility poles | 41.2 | 0.00% | 11.90:1 |
| Wet city street, lamps and reflections | 27.4 | 1.32% | 8.32:1 |
| Mountain road, yellow centre line | 31.1 | 0.24% | 8.86:1 |
| Dark tower with CJK signage | 24.1 | 2.06% | 9.59:1 |
| Elevated highway, tail-light river | 23.9 | 4.35% | 5.02:1 |
| Black-and-white street under an overpass | 21.8 | 4.90% | 4.61:1 |

The shipped file has the second-best failure rate of the round and is the only
one of the top five whose **subject reaches the top edge across the full width**,
which is what a `50% 0%` crop needs. Three candidates that scored better on
paper were rejected on the crop or the frame, and they are the useful part of
this table:

- the **near-black lane** (6.1 mean, the best numbers on the page) is so dark
  that the band renders as the flat black the whole exercise exists to avoid —
  a number this good is a warning, not a result;
- the **elevated highway** puts 40% of the crop into empty black sky above the
  city, which is the same flat-black band arriving from the other direction. It
  is now Outcome 01, where the full frame is used and the sky is an asset;
- the **dusk rural road** scored 0.00% and lost on composition: its top half is
  featureless blue-grey.

The **dark tower** frame was dropped on the DUMBO MARKET rule despite the best
worst-case percentile in the table: 明家实业 is legible across the tower and
浙江天然气 on a building behind it. Two company names, in the same class as the
`KIRIN` neon the TV round rejected.

### Shots that were rejected, and why — billboard advertising

Roughly a hundred and thirty candidates across fourteen searches, and the
striking figure is that **six of the fourteen searches produced nothing usable at
all.** Recorded because the pattern is specific to this subject and will repeat
if anybody builds an OOH page again:

55. **`blank billboard` is a trap, not a shortcut.** Fifteen results, and
    thirteen are daylight mockup renders with a pure-white panel — the "YOUR AD
    HERE" tell — at mean luma up to 169. Of the remaining two, one is a
    blown-white bus-shelter panel at night that punches a hole through the card
    exactly as the email round's white window did. The blank board that shipped
    came from `billboard night`, not from `blank billboard`.
56. **`billboard worker` produced nothing at all** — fifteen frames, every one
    of them a board with a live campaign on it: `NHS`, `NYX JUMBO`, `ChatGPT`,
    `PERRIER-JOUËT`, `Naked` insurance, a `Michael` film release, `OUTFRONT`
    twice, and `Walgreens` behind one of them. The `ChatGPT` board is a double
    rejection: the AI automation page already bans that interface by name.
57. **`poster paste wall` produced nothing** — the paste-up crew idea was right
    for `billboard-design` and the results are all bright brick walls carrying
    real gig posters, plus `Coca-Cola`, `Estrella Damm`, `VANS OFF THE WALL`,
    `Herforder Pils` and a `pott.mockups` set. `sign painter` returns three
    photographs in total; `signwriter` returns zero; `hand lettering` is
    seventeen pastel craft flat-lays.
58. A **low-angle board with a gold logo mark and a phone number** on the sliver
    of visible face (`UNVEILING SOON`, `98…7070`). It was the best "presence of
    a brand ten times your size" frame in the search, mean luma 25.4, and 85% of
    the frame is scaffolding — but a gold company mark is still legible at normal
    exposure. Replaced by the same idea shot from further under the board, where
    the face is edge-on and empty.
59. A **lit board among dark trees** over a road, mean luma 36.9, was the first
    `static-billboards` pick and the best "spot your customers actually pass"
    composition of the round. At 2x brightness the board carries a film-festival
    poster with legible CJK text and a QR code. A festival is not a company, but
    it is still a third party's identity and a QR code is still a call to
    action, and the blank board says the same thing while claiming nothing.
60. The **Cross-Harbour Tunnel at night** — heavy traffic pouring into a tunnel
    mouth flanked by two lit portrait boards, mean luma 35.9, and by a distance
    the best "your name on a giant board where your customers actually drive"
    frame anywhere in the search. `Panasonic` is lit blue on a tower in the
    background. The same rejection as the strategy page's trade-show floor: the
    frame is right and the claim is not ours to make.
61. A **PUMA cap** worn by the subject of the best Quick Answer portrait in the
    round — a man mid-sentence against a dark workshop, mean luma 96.3. Same
    rule as the Canon lens and the Addo-X, and the reason a maker's mark on
    clothing is no different from one on a wall.
62. **Times-Square-class frames, eight of them**, from three separate searches.
    They are the most literal "billboard" photographs that exist and every one
    is a wall of other people's logos, which is the one thing this page cannot
    show. Also a **Shibuya crossing** aerial and a **Kuala Lumpur** junction,
    same problem in a different city.
63. **`drive safe` on a red board above a muscle car** and two **projector
    marketing renders**: manufacturer or agency renders rather than
    photographs, exactly as the TV round found. A render of an advertisement is
    somebody's ad twice over.
64. **Green-dominated frames**, three of them: a mountain road with a green
    hillside (band mean 31.1 and otherwise a good candidate), a tree-lined lane
    at mean luma 6.1, and an aerial overpass with two-thirds foliage. The brand
    audit is on record as 0 green, and the TV round dropped a house-at-night
    frame for the same reason.
65. Bright rejects, for completeness: a **drive-in board in a daylight field**
    (124.0), a **Tibetan plateau board** (120.1), an **ornate rooftop board
    against blue sky** (132.5), a **sky-mural board** (169.6), **two boards
    over daylight trees** (132.9), the **`9 to 5 The Musical` board** carrying
    `PATTISON`, and a **tiny board against a flat mauve sky** which was the most
    minimal composition of the round and the only pastel object considered.
66. Marginal, and **accepted** rather than rejected, recorded so the next round
    knows where the line was drawn: the shipped `mobile-retargeting` frame has a
    **Lexus** boot badge on the car and a lit but illegible registration plate,
    and the shipped `outcome-three-seconds` frame has a radio display reading
    `NRJ` at 2.4x brightness and nothing at normal exposure. Both are a
    vehicle's own marks rather than a business's signage — the same line
    `automation-quick-answer.jpg` drew for its registration plates — and in both
    frames the subject is the person, not the car.

## Media production

Six category cards plus the page's own photography — **twelve** files. Mean luma
across the twelve is **2.7–64.2**, and the 2.7 is the hero, which is the darkest
file in the whole folder by a wide margin (the previous record was
`email-broadcast-campaigns.jpg` at 7).

### The problem this page has and the others did not

Every other page in this folder illustrates something the client *sells*. This
one illustrates something the client *does*, and does better than stock: it is
the media production page. A photograph of somebody else's film crew standing in
for "we make video that looks like real money" is a weaker argument than the
copy makes, and a visitor who thinks about it for two seconds will notice.

**These twelve files are provisional. Replace them with Production Connections'
own production stills as soon as the client can supply them — hero and closing
band first, then the six coverage cards.** That instruction is repeated in the
header of `scripts/content/media-production.php` so it cannot be lost. It is the
only page in the folder carrying it.

Two things were done to blunt it in the meantime. First, **the two largest slots
show no crew at all**: the hero is a lone figure in a stage spotlight and the
closing band is a single lamp on a truss, so neither claims anything about who
is holding the camera. Second, the six cards lean on the *object* or the *setup*
rather than on a crew at work, which is the same house move the shop till makes
for revenue tracking and the index-card drawer for list segmentation.

### Avoiding the eight camera photographs already live

More frames were off-limits here than on any previous page, because six sibling
pages already spend a card or a row on video:

| Already live | What it is | Avoided by |
|---|---|---|
| `pillar-film-and-brand-direction.jpg` | warehouse set, crew scattered, wide from above | no wide crew-on-a-stage frame anywhere |
| `video-production-services.jpg` | second frame of that same warehouse shoot | as above |
| `ppc-youtube-and-video-ads.jpg` | field monitor on a white studio floor | no monitor-on-a-stand frame |
| `sm-video-and-reels.jpg` | operator's portrait beside a light | — |
| `sm-cta.jpg` | operator in profile behind a rigged camera | no operator-behind-camera silhouette |
| `email-video-in-email.jpg` | same, in magenta smoke | as above, and no magenta |
| `tv-commercial-production.jpg` | empty chair on a black studio floor, camera rigged | no empty-studio-with-kit frame |
| `geo-video-and-multimodal-content.jpg` | camera body suspended against black | no camera-body-on-black frame |

The first two are the reason a genuinely good Outcome candidate was dropped: a
full soundstage with a Technocrane, a lit cyc and fifteen crew, mean luma 58.3.
It is a **near-identical framing** of both — wide, high, crew scattered across a
big dark room — and would have read as a third print of one photograph. Recorded
because it was the best single frame of the round on its own merits.

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `commercials-and-tv-spots` | `media-commercials-and-tv-spots.jpg` | A film projector's lamp burning white in a dark room, gold spill behind it. Mean luma 30.8. The row is "built for the big screen and the brand", so the picture is the thing that puts it on the big screen — and it is the projector rather than the screen, which keeps it clear of the TV page's lit-screen frames. | `https://images.unsplash.com/photo-1694903631966-f0e5d06cd703` |
| `social-video-and-reels` | `media-social-video-and-reels.jpg` | A woman standing in a black studio lit by one hard LED panel, a camera just visible on a stand at the left. Mean luma 41.7. Deliberately **not a gimbal and not a ring light** — this page's own problem section mocks "a guy with a gimbal, a ring light, and a website", so the obvious social-video stock photograph argues for the other side. See the rejections below; that cost the round its two best-lit candidates. | `https://images.unsplash.com/photo-1595021247055-08791274983f` |
| `brand-films` | `media-brand-films.jpg` | A woman lit under a diffusion frame in a black studio while a crew films her, two more silhouettes at the edges. Mean luma 12.3, the darkest card on the page. "The story that makes a customer actually feel something about you" — the moment that story gets captured, with the people who capture it present but unlit. Knowingly rhymes with the social card above (both are a person and a light in a black room) and earns the repeat by arguing the opposite: this one is crew-heavy and warm, that one is one person, one cold panel, lean. | `https://images.unsplash.com/photo-1691491918178-8a2e68b44919` |
| `product-and-explainer-video` | `media-product-and-explainer-video.jpg` | A wine glass and a dark bottle rim-lit against pure black, nothing else in frame. Mean luma 13.8. "Showing exactly why yours is the one to buy" — a product lit the way a product gets lit when somebody is being paid to sell it. No label, no maker, no branding of any kind, which is rare in this subject. | `https://images.unsplash.com/photo-1781942610266-4013e9b78af0` |
| `video-built-for-ads` | `media-video-built-for-ads.jpg` | A cinema camera fitted with a long fast lens, teal light falling off behind it. Mean luma 21.7. "Shot specifically to convert when the budget's behind it" — the glass you put on when there is money riding on the frame. Distinct from `geo-video-and-multimodal-content.jpg` (a camera body suspended against black) by being a lens in a working room rather than kit on display. `ROTATE` is legible on the monitor above it; that is a control label, not a brand. | `https://images.unsplash.com/photo-1535540878298-a155c6d065ef` |
| `photography-and-stills` | `media-photography-and-stills.jpg` | A person in a black hoodie and beanie raising a stills camera to their face, lens straight down the barrel at the viewer, near-total darkness around them. Mean luma 18.1. "Because the whole brand needs to look the part, not just the video" — a photographer, and the one frame on the page where the camera is pointed at *you*. The only frame in the round with a stills camera and no legible maker's mark; see the rejections. | `https://images.unsplash.com/photo-1547619292-870fe4aeadb8` |

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `media-hero.jpg` | One figure alone in a spotlight on a pitch-black stage, the cone of light and a wisp of haze the only things in frame. **Mean luma 2.7 — the darkest file in the folder.** The H1 is "Most Media Production Looks Great **And Sells Nothing**", and this is exactly that: something beautifully lit, performing to nobody. It also solves the slot outright — see the measurement below — and it shows no camera and no crew, so the biggest picture on the page claims nothing it cannot back up. | `https://images.unsplash.com/photo-1615754890634-69ac8bca7189` |
| Quick Answer panel | `media-quick-answer.jpg` | Two people in caps shoulder to shoulder, both watching the same shot on a small monitor clamped to a camera. Mean luma 64.2. The boxes beside it are "In Person / What The Video Has To Accomplish / Marketers Holding The Camera" — and two people agreeing about what the frame has to do is all three at once. Chosen after four rounds of searching for the sibling pages' usual "conversation in a dim workplace" returned nothing usable: see the rejections. | `https://images.unsplash.com/photo-1598267416816-2fc7a6058eaa` |
| Outcome 01 — video that looks like real money | `media-outcome-real-money.jpg` | Two figures in silhouette in front of a large film light firing through haze, everything else near-black. Mean luma 31.3. The row is "real gear, real crew, real lighting, so it looks like the money it'll make you" — this is what that money buys, photographed from behind it. | `https://images.unsplash.com/photo-1639070882750-99dd6ba7dff6` |
| Outcome 02 — content for every channel | `media-outcome-every-channel.jpg` | Three people silhouetted in a studio lit edge to edge in deep blue, softboxes and stands ranged around them. Mean luma 49.2. The row's second half is "all from one crew that actually knows your business", and this is that crew, kitted out, mid-setup. **The one palette outlier in the folder**: it is saturated blue rather than gold-on-black. Accepted because the alternative frames for this row were a monitor wall (which the TV page already owns) or the rejected soundstage; if the Outcome accordion ever reads cold, this is the file to replace. | `https://images.unsplash.com/photo-1710272899027-3f7de54c8978` |
| Outcome 03 — every frame shot with a job to do | `media-outcome-job-to-do.jpg` | A close black-and-white view of the viewfinder window on a camera body, the frame lines and a blown highlight inside it. Mean luma 57.8. "Every frame was shot with a job to do" — so the picture is the frame itself, at the moment somebody decides what goes in it. The only monochrome file on any service page besides `card-social-media-marketing.jpg`. Numbers on the focus ring are a distance scale, not a maker's mark. | `https://images.unsplash.com/photo-1713346858593-86b05171ea45` |
| Closing band | `media-cta.jpg` | A single profile lantern hanging off a truss at the top of the frame, its beam falling away to the left through black. Mean luma 14.7. The closing line is "Get video that looks like real money and is built to bring in customers", so the last thing before the contact form is the light itself — and it bookends the hero, which opens the page on a lit stage. **Best band score of the round and among the best in the folder** — see the measurement below. Its subject reaches the top edge dead centre, which is precisely what a `50% 0%` crop needs. | `https://images.unsplash.com/photo-1715318755388-100298581a17` |

### The hero, measured

`service-detail.css` §18 puts the H1 **upper-left** and the paragraph
**lower-right**, so a hero needs both of those zones dark. This one does not need
zone scoring, which is the point of it: the whole 1920x1080 frame is mean luma
**2.7**, and the lit region is a narrow cone in the centre column between the two
text zones. Scored as a band crop for comparability it fails AA 4.5:1 on **0.50%**
of pixels at a worst 5th percentile of **20.26:1** — the best contrast figures of
any full-bleed image in this folder, better than the TV page's paragraph zone
(0.00%, 17.04:1) on the percentile and better than every hero on the failure rate.

The risk with a file this dark is the opposite one: that it renders as flat black
and looks like a missing image. It does not, because the spotlight cone is a hard
graphic shape running top-centre to bottom-centre — there is always something in
the middle of the hero. **A mean this low is normally a warning** (the billboard
round rejected a 6.1 band candidate for exactly that), so it was checked by eye
before it shipped rather than accepted on the number.

### The closing band, measured

Same method and the same lesson as the previous three rounds: **score the crop,
never the file.** `.nm-cta-2-wrap` is `background-size: auto` at
`background-position: 50% 0%` — confirmed live on this page at 375 and 1440
(`auto` / `50% 0%` / `repeat`) — so only the middle ~1260x994 is ever visible,
top-aligned, and an undersized file tiles.

| Candidate | Band mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| **Profile lantern on a truss (shipped)** | **19.6** | **1.69%** | **8.45:1** |
| Gold lantern beam, subject at the right edge | 24.7 | 1.86% | 7.11:1 |
| Fresnel with barn doors, beam to the left | 36.3 | 4.60% | 4.81:1 |
| Camera silhouetted against a sunset disc | 60.2 | 11.07% | 2.68:1 |
| Crew on a rooftop at night, black and white | 42.1 | 10.00% | 3.50:1 |
| Backlight through haze, two figures | 48.1 | 14.64% | 2.85:1 |
| Large octabox over a bag in a black studio | 107.8 | 44.43% | 1.12:1 |

The shipped file ties `email-deliverability.jpg` on the worst-case percentile
(8.45:1) and beats the AI automation band (17.5, 3.64%, 8.32:1) on failure rate.

Three of those rejections are worth keeping:

- the **octabox** was the first pick and looked ideal on the brief — a big soft
  light hanging from the top edge, dead centre, exactly the composition a
  `50% 0%` crop wants. It is also a **white** light filling the top half of the
  crop, so white body copy sits straight on it: 44% of pixels below AA and a
  worst case of 1.12:1. The composition rule and the contrast rule pull in
  opposite directions on this slot and contrast wins. It also carried airport
  codes stencilled on the bag beneath it.
- the **gold lantern beam** scored second and lost on the crop, not the numbers:
  its lamp sits at the right edge of the 1920 frame, so the band's centre crop
  clips the subject and leaves two-thirds flat black — the failure SOURCES.md
  warns about, arriving via good contrast figures.
- the **Fresnel with barn doors** was the best-looking lamp of the round and has
  `Godox` and `SL2…` legible across the body. Same rule as the Canon lens, the
  Rekam softbox and the Addo-X.

### Shots that were rejected, and why — media production

Roughly a hundred and eighty candidates across twenty-two searches, and the
shape of the round is specific to this subject: **the copy itself banned the most
obvious imagery.**

67. **The gimbal is out, because this page insults it.** The problem section
    reads "A guy with a gimbal, a ring light, and a website, churning out clips
    so amateur they make your business look held together with tape." That
    disqualified the two best-lit `social-video-and-reels` candidates in the
    round: a gimbal silhouetted against an amber LED panel (dark, gold, the
    strongest frame of that search) and a phone in a cage rig with a shotgun mic
    — the latter twice over, because `RONIN` is legible across the arm. Fifteen
    further phone-gimbal frames were daylight, and carried `Champion` on a
    t-shirt, `VISUALS` on three hoodies, and an Apple mark on the phone. **Every
    ring-light frame is out for the same reason**, which removes most of the
    "content creator" search space.
68. **Colour-grading software is a harder no than a camera logo.** The obvious
    `video-built-for-ads` picture is a grading suite, and fourteen of fifteen
    results are DaVinci Resolve UI — colour wheels, timelines, scopes. That is a
    third party's screen on a page whose copy disparages outsourced production,
    and a chrome screenshot reads as a tutorial blog rather than as a service.
    The physical fallback, a colourist's trackball panel, went the same way: the
    dark one is an out-of-focus blur with a **macOS dock** of app icons across
    the top, the sharp ones are product renders on white, and one has
    `DAVINCI RESOLVE` printed on the keyboard.
69. **Slates read well and photograph badly.** The best `Every Frame Shot With A
    Job To Do` candidate by a distance was a hand holding a digital slate in low
    light — and it carries `Worry Doll` (a third party's production title), two
    crew names, and `DENECKE INC. / Dcode TS-C` on the body, at mean luma 67
    with the slate blown white. A film-strip lightbox for the same row was the
    right idea and 113.8. The viewfinder shipped instead.
70. **Stills-camera photography is a logo minefield.** Thirty candidates across
    two searches; `Canon`, `Nikon`, `Sony`, `Sigma` and `SUPER PARAGON` are
    legible and usually centred, because a lens photograph *is* a photograph of
    a brand name. One viewfinder frame that was otherwise ideal has `CANON` and
    `4.3-43.0mm` embossed across the ring. The shipped card works because the
    camera is a black shape in a dark room and the body is turned away.
71. **The "conversation in a dim workplace" search failed four times**, which is
    new — every sibling page found its Quick Answer that way. What came back:
    two men across a table with **green foliage filling two-thirds of the frame**
    (the brand audit is on record as 0 green; the TV round dropped a house for
    this); a warm restaurant table under a `Santa…` neon and another under
    `Grand Cafe 18…`; a `…achi …asto` neon over a counter; a butcher's cold room
    with `BARKER BROS BUTCHERS FRIDG…` legible on a checklist; a market alley
    rigged with a light panel and a red banner of legible Chinese including a
    branch name; a tailor at a sewing machine, pink and cluttered, with nobody
    talking; and fifteen dark factory interiors with no people in them at all.
    Also a forge with a smith at it, which is `automation-custom-ai-agents.jpg`
    almost exactly.
72. **Six wide crew-on-a-set frames** beyond the soundstage noted above, all
    rejected as reruns of the two warehouse photographs already live. Also nine
    concert-lighting rigs (blue and magenta edge to edge), fifteen architectural
    ceiling grids returned by `studio lighting grid` (bright office ceilings, up
    to 214), and a `Timberland` t-shirt — the same garment brand the billboard
    round rejected on a `PUMA` cap.
73. **A dolly track receding into the dark** was the first
    `commercials-and-tv-spots` pick, chosen off the thumbnail and dropped at
    final crop: mean luma **155.5**. The same search returned a dolly with
    `616-647…` — a phone number — legible on the truck behind it, and a rig with
    `RED` on the body.
74. **Fifteen fashion and beauty portraits** for `brand-films`, from
    `studio portrait lighting dark backdrop`. Correctly dark, and every one reads
    as a portfolio portrait rather than as a story about a business — which is
    the "art crowd" this page spends a paragraph demolishing.
75. Bright rejects, for completeness: white product-studio setups (six, with
    `Rekam` and `Godox` on the softboxes), an LED tube over a **Gundam model kit**
    with Japanese packaging in frame, a live-event control area with `DiGiCo`
    across it, nine retro CRTs (the TV round already rejected these), and a
    B&W hilltop crew at 112.3.

### Related-services cards

How each page looks inside a sibling's related grid. The three pre-engine pages
re-use a photograph already licensed for that page rather than adding three more
files — each is already that page's own visual language, so the card reads as a
thumbnail of it.

| Page | File |
|---|---|
| `/services/ai-search-optimization/` | `card-ai-search-optimization.jpg` (`https://images.unsplash.com/photo-1423784346385-c1d4dac9893a`) |
| `/services/social-media-marketing/` | `card-social-media-marketing.jpg` (`https://images.unsplash.com/photo-1651804805680-3565ef7807f6`) — hands scrolling a lit phone in black and white, a face going past on the screen. The page is about being thumbed past, so the card is the thumb. |
| `/services/digital-strategy-marketing/` | `pillar-measurement.jpg` (re-used) |
| `/services/pay-per-click/` | `ppc-google-search-ads.jpg` (re-used) |
| `/services/full-service-video-production/` | `pillar-film-and-brand-direction.jpg` (re-used) |

### Shots that were rejected, and why

Worth recording: nearly all of them broke one of three rules — a third party's
name in the frame, the wrong palette for a near-black page, or a picture that
argues against the copy beside it.

**On the AI page:**

1. A storefront reading **DUMBO MARKET** was the best "entity" photograph by
   some distance — a single business, unmistakably identified, at night. It was
   dropped because a real company's name dominated the frame. On an agency's own
   service page that reads as a client, which is a claim we cannot make.
2. A shop interior under a large **THE LEATHER TRADING CO** sign was the best
   "we show up in person" photograph, and went for the same reason.
3. Five yellow stars on **pastel pink and blue** was the most literal
   "citations" image. It was dropped on palette, not on licence: this page is
   near-black throughout and it would have been the only pastel object on it.
   A later candidate was a readable **Wall Street Journal** front page, dropped
   because press coverage of that kind is a specific claim, not a mood.

**On the paid search and strategy pages:**

4. A **clip-art 3D pie chart** on white paper was the first "a report you can
   read" candidate. It is precisely the vanity scoreboard the row mocks, and at
   mean luma 184 it was the brightest thing on a near-black page.
5. A **trading terminal** — green and red tickers on black — was the second. It
   is beautifully dark and exactly wrong: the row is called "A Report You Can
   Read **Without A Decoder Ring**".
6. A **packed matcha cafe** was the "spend that comes back" candidate. Busy to
   the point of noise at accordion size, and identifiable shop signage on the
   wall.
7. A **hand holding glasses with trees sharp through the lens** was the most
   literal "total clarity" shot there is. Dropped on palette: the frame is
   mostly green, and the brand audit is on record as 0 lime / 0 green.
8. A **Canon lens on black** replaced it and was itself dropped — gorgeous, but
   "CANON LENS RF-S18-45mm" is legible across the middle of the frame. Same rule
   as DUMBO MARKET.
9. Two **posed hi-vis construction shots** for "we get under the hood": lime and
   orange vests against a bright sky, on the darkest page on the site.
10. A **trade-show floor** for "a growth partner" — busy, orange racking, and
    third-party branding legible on the machinery.
11. A **dim knife-sharpening workshop** was the best "in person" photograph of
    the round and was still dropped: the shop's name is readable twice, on a
    wall sign and on leaflets by the till.
12. Two **archival black-and-white workshop photographs** read as historical
    record rather than as a business operating now.
13. A **hand on a fogged window** for "total clarity" — it is a picture of not
    being able to see, which is the argument backwards.

**On the SEO page** — four of twelve, all caught by downloading at the final crop
and looking at it. A thumbnail is not the picture; three of these four looked
right in preview and wrong at 1260x880:

14. A **black-and-white boiler wall** was the first `technical-seo` pick. At the
    card's crop it is nearly all pale grey wall — the brightest thing on a
    near-black page, and the dark bottom third that sold it in preview is
    cropped away.
15. A **string-lit high street at night** was the first `local-seo` pick. Two
    estate-agent boards reading **TO LET** and an agency's name sit legibly on
    the right, and a vacancy sign is the wrong argument next to copy about
    customers finding you.
16. **Dark cathedral columns** for `authority-building` were murky rather than
    monumental at the card's crop, with devotional portraits legible in the
    left third. Replaced with lit marble.
17. A **daylight coffee counter** for outcome 01 was a studio-bright, blue-white
    frame of the kind the rest of the page has none of. Replaced with the same
    subject at night.

Two more were passed over at search time rather than at crop: a **KIOSK
storefront** carrying a Red Bull neon, and a **record shop** with its name in the
window — both for the closing band, both the DUMBO MARKET rule.

**On the social media page** — seven of the first thirteen, which is the worst
hit-rate of any round so far. Social is the category where the obvious stock
photograph is always a brand's own interface, so the DUMBO MARKET rule bites
harder here than anywhere else:

18. A phone home screen with **Instagram, Twitter, Facebook and Clubhouse**
    icons was by a distance the most literal `account-management` picture. Four
    readable company names filling the frame; dropped on the DUMBO MARKET rule
    even though this page's own copy names those platforms in the row beside it.
    A row of **SMARTISAN** handsets and a desk carrying **BOSE**, **Dell** and a
    Spotify screen went the same way.
19. A **videographer filming in a white kitchen** was the first Quick Answer
    pick and the best "we come to you" frame in the search. Dropped on palette:
    mean luma 143, an all-white room, on a page that is near-black throughout.
20. A phone on a tripod captioned **LIVE NOW** against pale green foliage was
    the first `video-and-reels` pick. Right idea, mean luma 151, and the only
    pastel object on the page.
21. A smiling woman on her phone at a **dim office desk** was the first
    `content-strategy` pick. Dark enough, but it is the anonymous person in the
    anonymous office that this whole exercise exists to replace, and it says
    nothing about strategy.
22. Three chart screens were tried for `analytics` and dropped in turn: a blurred
    **red-and-green trading chart**, a **dextools.io** crypto pair with the URL
    legible in the address bar, and a monitor showing the **Social Psychological
    Bulletin** website. Two were somebody's product UI; all three were finance or
    academia rather than a business's own numbers.
23. An **Irish pub** was the first "real leads" outcome — a full room, exactly
    the argument. Guinness, Jameson, Smirnoff and two university pennants are all
    legible in it. Replaced with a night market: same full room, no mastheads.
24. An **empty mall food court** was the second. Dark and handsome, and it argues
    the precise opposite of the row it sits on.
25. A **dark desk with the laptop closed and unlit** was a late
    `account-management` candidate. Beautiful, and it says nobody is running your
    accounts.

**On the email page** — eight of the first twenty-one candidates, all caught by
downloading at final crop and looking. The two rules that bit were the palette
and, again, DUMBO MARKET:

26. Two **gold-coin** heroes were tried before the one that shipped: a studio
    pile on **grey seamless** (mean luma 99, and it reads as a bank's stock
    library), and a **frame packed edge to edge with pennies** (76, warm but
    busy everywhere, so a white headline over it would have been mud).
27. A **red-lit videographer** was the best `video-in-email` frame in the search
    and was dropped on the Canon-lens rule: `TILTA` and `CANON` are both legible
    across the middle of the rig. A second candidate had **SONY** on the body
    and two **Coca-Cola** bottles on a table behind it, and its subject — the
    operator sitting head-in-hands — argues the wrong thing anyway.
28. **`Addo-X`** in gold script across a 1930s adding machine was by some way
    the most beautiful `revenue-tracking` frame of the round (mean luma 11).
    Dropped on the maker's-mark rule even though the company is long defunct;
    the shop till says the same thing and claims nothing.
29. A **lit night frontage with people going in** was the first
    `lead-magnets-and-list-growth` pick. `MEE SUM PASTRY` is legible twice and a
    `ROAD WORK AHEAD` board sits in the foreground — two names and an argument
    against the copy in one frame.
30. A **darkroom under a red safelight** looked like a video shoot in preview
    and is a photographic darkroom at full size.
31. A **blown-out white window between two diners** was the first Quick Answer
    pick: dark room, right idea, and the window is the brightest object on the
    page by a distance, punching a hole through a portrait panel.
32. Two **outcome 03** candidates were dropped on expression rather than
    palette. A man frowning at his phone in near-black is technically perfect
    and reads as bad news; another was a blurred torso crop with no subject at
    all. The row is about somebody being pleased to hear from you.

**Also check** `premium_photo-` in a CDN URL — those are Unsplash+ and are **not**
covered by the free Unsplash Licence this folder relies on. Several of the
strongest search results for every query above were Unsplash+.

**On picking replacements:** avoid frames dominated by another company's logo or
website. One strong candidate for `landing-pages` was a full-screen shot of a
real fintech's landing page; it was the better photograph, but on an agency's
own service page a prominent third-party brand implies a client relationship
that does not exist. The wireframe says the same thing and claims nothing.

Also check `premium_photo-` in a CDN URL — those are Unsplash+ and are **not**
covered by the free Unsplash Licence this folder relies on.

## Website design

Six category cards plus the page's own photography — twelve files, no
related-services card (block 15 is a blog grid, so `card.image` paints
nowhere). Mean luma across the twelve is **5.2–70.6**, and the darkest file in
the whole folder is on this page (`web-conversion-focused-design.jpg`, 5.2).

**The page has one metaphor and the imagery runs on it.** The H1 is "Most
Website Design Is A Pretty Storefront **With The Door Locked**", so the hero is
a shuttered door, the conversion card is a door opening, and the closing band is
a figure walking through one. Three doors on one page is a knowing repeat, not
laziness: a wide shuttered service door, a warm gold door ajar in pure black,
and a cold white doorway in a black room read as three different pictures, and
they carry the argument the copy makes in that order.

**Four clichés are banned on this page, and three of them are new.** The copy
sells web design, so the obvious stock is exactly what cannot be used:

1. **A screenshot of a real website** on a laptop or phone — somebody else's
   brand filling the frame on our own web-design page, the `DUMBO MARKET` rule
   at its most direct.
2. **Figma / Webflow / Wix / Squarespace / WordPress admin UI** — a third
   party's interface, and it makes the page read as a tutorial blog.
3. **A wall of code in an editor** — it says "developer", not "design that
   sells", and `/services/ai-search-optimization/` already spends a dark code
   screen on its structured-data card, so this page would echo it.
4. The usual **corporate "colleagues round a laptop"** stock, rejected here for
   the same reason as on the AI automation page.

No screen anywhere on this page carries readable content. The one lit display in
frame (`web-outcome-customers.jpg`, inside the shop) is an abstract fashion
visual, and the one phone (`web-mobile-first-layouts.jpg`) is angled so no UI is
visible at all.

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `conversion-focused-design` | `web-conversion-focused-design.jpg` | A door opening into pure black with warm light spilling around it and across the floor. "Every page built to move a visitor one step closer to buying" — the step, and the gold-on-black is the brand's own palette. Mean luma 5.2, the darkest file in the folder. | `https://images.unsplash.com/photo-1643695211836-1b721438f9e6` |
| `mobile-first-layouts` | `web-mobile-first-layouts.jpg` | A phone held in one hand in the dark interior of a parked car, screen content an indistinct grey wash. "Most of your traffic shows up on a phone and judges you in seconds" — a real person doing exactly that, and a car interior is the one phone setting this folder has not already used. Chosen over a near-black two-handed frame that turned out to be `card-ai-search-optimization.jpg` already. Mean 24.9. | `https://images.unsplash.com/photo-1769082320453-e3bba8992ec1` |
| `site-speed` | `web-site-speed.jpg` | A chrome stopwatch on a dark reflective surface with one warm bottle out of focus behind it. The house move of an analogue object for a digital idea, as the shop till does for revenue tracking. The dial carries a maker's mark that is an illegible smudge at 4x on a 2400px source — weaker than the registration plates already accepted on `automation-quick-answer.jpg`, and nothing like the `HEUER` dial rejected for `instant-lead-response`. Mean 20.4. | `https://images.unsplash.com/photo-1534672062631-cc37c6fea687` |
| `messaging-and-copy` | `web-messaging-and-copy.jpg` | A fountain pen nib resting mid-word on a page of handwriting, half the frame black. "The words do most of the selling", written by a person. Deliberately not the strategy page's typewriter or the social page's projected handwriting: this is the nib actually touching paper. The brightest card on the page (63.8) because the paper is. | `https://images.unsplash.com/photo-1710010966147-35c53f427a9b` |
| `clear-paths-to-action` | `web-clear-paths-to-action.jpg` | White painted arrows on near-black asphalt. "So nobody ever has to wonder what to do next" — the most literal possible reading, and the most graphic file on the page. No text, no branding, nothing to date it. | `https://images.unsplash.com/photo-1668399613276-cc7fca3c34e3` |
| `search-ready-website-structure` | `web-search-ready-website-structure.jpg` | Gold-lit steel lattice girders against a black sky. Structure, load-bearing and visible, for the one row that is genuinely about how a site is built rather than how it looks — and the amber lands on the brand's gold. Chosen after a round of brass house numbers came back uniformly bright daylight, which this page cannot use. | `https://images.unsplash.com/photo-1493476523860-a6de6ce1b0c3` |

The slug is `search-ready-website-structure`, not `search-ready-structure`: the
SEO page owns `technical-seo` and `on-page-optimization` and the AI search page
owns `structured-data-and-schema`, so this one is spelled out to read
unambiguously as an archive URL next to them.

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `web-hero.jpg` | A shuttered service door and a locked steel gate in a dark yard, one security light above them. The H1 is a locked storefront, so the hero is the lock. **Scored, not eyeballed** — see below. Mean 14.0, and both text zones are near-black. | `https://images.unsplash.com/photo-1553677261-b6d63cc18127` |
| Quick Answer panel | `web-quick-answer.jpg` | A customer with his back to camera and an older shopkeeper showing him a part across a bench in a dim workshop lit by one bare bulb. The boxes beside it are "In Person / Your Business And Your Buyers / Designed Around Results" — this is the first two, and it is somebody's actual trade, not a meeting room. Mean 36.0. Replaced a pub-hatch frame that was the better photograph and died on two counts: a green wall wash (the brand audit is on record as 0 green) and a lit cigarette. | `https://images.unsplash.com/photo-1618614195185-8be64cc8103d` |
| Outcome 01 — visitors turned into customers | `web-outcome-customers.jpg` | Silhouetted shoppers walking towards a brightly lit shop front at night. "A website that turns visitors into customers ... looks like a business worth buying from" — the walking-in, photographed from behind the visitors. The brightest file on the page (70.6), inside the range the email and social pages already sit in. | `https://images.unsplash.com/photo-1704541254219-479af1d49f5d` |
| Outcome 02 — a path from just landed to just bought | `web-outcome-clear-path.jpg` | A brick colonnade at night, hanging lamps receding to a lit end. "A clear path ... without making them think", with the lamps doing the thinking. Mean 19.1. Replaced a Kyoto arcade that was the better photograph and carried two readable shop names — the same rejection as `エイブル` on the AI automation page. | `https://images.unsplash.com/photo-1771162411352-416ea7e0e88b` |
| Outcome 03 — a site you are proud to send people to | `web-outcome-proud.jpg` | A small homeware shop lit up behind its windows at night with the door standing open, ceramics arranged on glass shelves. Somebody's own place, cared for, and worth pointing people at — which is the row verbatim. A `CHO THUÊ` (Vietnamese for "for rent") notice is taped to the left edge, cropped and illegible at the rendered size; it is a common phrase, not a business name. Mean 39.3. | `https://images.unsplash.com/photo-1742830895916-6a2105cb1222` |
| Closing band | `web-cta.jpg` | A figure standing in an open, brightly lit doorway in a pitch-black room, light beams sweeping across the floor. The hero's door was locked; this one is open and somebody is walking through it, which is the whole page in one frame and the last thing before the contact form. **The best band numbers of any file in this folder** — see below. | `https://images.unsplash.com/photo-1634335572482-c43700ecbc23` |

### The hero, measured

Same zones as the TV page: the H1 sits **upper-left** and the paragraph
**lower-right** (`service-detail.css` §18), scored against pure white before the
mobile scrim is applied at all.

| Zone | Mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| H1, upper-left | 15.0 | 5.05% | 4.40:1 |
| Paragraph, lower-right | 18.2 | 0.08% | 12.51:1 |

The 5.05% is the security light and the lit brickwork under it clipping the
bottom of the H1 box, and it is fine on the same reading as the TV page's 4.36%:
the H1 is large text, whose AA floor is **3:1**, and 4.40:1 clears it
comfortably. The paragraph zone — where the small text actually is — is 12.5:1.
Below 991px §18's 0.82 scrim covers both regardless (confirmed live at 375px:
`rgba(8, 8, 8, 0.82)` on the hero, `rgba(8, 8, 8, 0.78)` on the band).

Two frames that scored better on the H1 zone were rejected on the paragraph
zone, which is the trap on this slot: a lit `CHINESE TAKEAWAY` shopfront scored
0.25% / 9.15:1 on the H1 and **15.39%** on the paragraph, because the only lit
thing in the frame sits exactly where the small copy lands.

### The closing band, measured

Scored on the crop, never on the file — `.nm-cta-2-wrap` is
`background-size: auto` at `background-position: 50% 0%`, so only the middle
~1260x994 is ever visible. Confirmed live: computed `auto` / `50% 0%` /
`repeat`, and the wrap measures 355px at a 375 viewport and 1413px at 1440, so
the 1920x1080 file never tiles.

| Candidate | Band mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| **Figure in a lit doorway, black room (shipped)** | **10.3** | **1.06%** | **15.91:1** |
| Warm doorway in a dark hall | 13.3 | 2.77% | 6.15:1 |
| `OPEN` neon high in a black frame | 15.1 | 4.23% | 5.33:1 |
| Lit shopfront, dark street | 34.9 | 6.63% | 3.39:1 |
| Amber circular `open` neon | 44.7 | 7.65% | 1.59:1 |
| Silhouetted shoppers at a lit shop | 87.8 | 28.80% | 1.41:1 |

The shipped file beats `email-deliverability.jpg` (0.6%, 8.45:1), which was the
folder's benchmark. Two things worth writing down. The **amber `open` neon** was
the best-looking candidate and the best fit for "around the clock", and it
scores in the same class as the gold-lit refinery that was rejected on the AI
automation page — the same mistake was available twice and was declined twice.
And the **`OPEN` neon high in a black frame** scored well but was rejected on
composition: the band's centre crop cuts the word to `PEN` and leaves two-thirds
of the band empty black, which is exactly the failure the "subject must sit
centre-top" note exists to prevent. **Score the crop, then look at the crop.**

### Shots that were rejected, and why — website design

Four of the twelve slots were re-shot after being downloaded at final crop and
looked at, which is the highest replacement rate since the social media round,
and every one failed for a reason a thumbnail cannot show:

42. The **pub hatch** for the Quick Answer — two men talking across the counter
    of a real bar, warm and low-key and by some distance the best "in person"
    frame of the round. Rejected at portrait crop for a green wall wash behind
    the seated man and a lit cigarette in his mouth.
43. The **Kyoto shopping arcade** for outcome 02 — lit lanterns receding down a
    covered street, mean 36.5. Two shop names (`大安`, `祇園小舎`) are legible
    in the upper left. Same rule, same rejection, as `エイブル`.
44. The **amber `open` neon** for the closing band, on the measurement above.
45. A **phone held in two hands in near-black** for `mobile-first-layouts`,
    which was the cleanest phone frame found — no screen, no branding, mean
    26.0 — and turned out to be `photo-1423784346385-c1d4dac9893a`, already in
    this folder as `card-ai-search-optimization.jpg`. A duplicate file paints
    nowhere today, since block 15 is a blog grid, but one frame serves one place
    in here.
46. **Every `OPEN` neon** in a fifteen-candidate round except one: blue, magenta
    and green tubes (off-palette), `PEOPLES BEDROOMS` and `THE PELICANS`
    (business names), and a red `18` age-restriction disc.
47. Two **`SHERWIN-WILLIAMS` storefronts**, a **7-Eleven**, a **`LEGO`** sign, a
    **Coca-Cola** awning, `FARMACIA GENERICOS Esperanza`, `TOBACCO SHOP
    HAYASAKI`, `FRUIT MARKET` with a phone number, `DIEDS` (three separate
    frames) and `CHAPS & Co` — all hero or closing-band candidates, all the
    `DUMBO MARKET` rule.
48. A **fifteen-frame round of brass house numbers** for
    `search-ready-website-structure`, which was the right idea — an address a
    machine can find — and came back uniformly bright daylight: white render,
    red doors, a pastel green door. The brand audit is on record as 0 green and
    this page is near-black.
49. Fifteen **corporate meeting-room frames** for the Quick Answer, mean 85–169.
    The anonymous person in the anonymous office, again.
50. **Phone lock screens** for `mobile-first-layouts` — several strong dark
    frames, each showing iOS or Android UI with an Apple Music or Instagram icon
    on it. That is app UI and a third-party mark in one, on the page where both
    are banned outright.

## Website development

Six category cards plus the page's own photography — twelve files, no
related-services card (block 15 is a blog grid, so `card.image` paints
nowhere). Mean luma across the twelve is **12.3–85.1**.

**This page is the one deliberate exception to the no-code-screen rule, and it
was a second round.** The first twelve files ran on metaphor, the way every
other page in this folder does — a tangle of overhead wires for the hero, a
mixing desk for the CMS, exhaust headers for integrations, a padlock for
security, a lighthouse for the closing band. The client looked at the live page
and said the imagery did not read as web development, and lifted the ban
explicitly: **code on screen is allowed here, editors included.** So every one
of the twelve was replaced with something literally of the trade.

What that changes, and what it does not:

- **The one-code-frame cap is gone**, along with the concern about echoing
  `geo-structured-data-and-schema.jpg`. Six of these twelve are a screen of
  code or a dev tool, on purpose.
- **The DUMBO MARKET rule still holds.** It was never part of what was lifted:
  a Coca-Cola can front and centre killed the best-scoring closing-band
  candidate of the round, and an Adidas-trefoil sleeve killed the only
  two-person Quick Answer frame found in six rounds.
- **Dark and low-key still holds**, because the page is near-black with a gold
  accent. This is the one thing code screens make *easier* — editors ship dark
  themes, and the hero and band both landed on their best numbers in the whole
  folder.
- **Still no server-farm racks.** They imply hosting, which is not what this
  page sells; nothing here needed them.

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `clean-custom-build` | `dev-clean-custom-build.jpg` | Neatly nested closing `</div>` tags stepping back out of a dark editor, `style.css` and `main.css` open in tabs. Mean 25.3. "Made for what you actually need instead of a junk drawer of plugins" — the picture is markup that closes cleanly, which is what a clean build looks like from the inside. No product name in frame. | `https://images.unsplash.com/photo-1583339793403-3d9b001b6008` |
| `speed-and-performance` | `dev-speed-and-performance.jpg` | The word `LOADING...` and a five-segment progress bar, empty, painted on a dark grimy wall. Mean 46.0. "So the site loads before an impatient visitor bails" — a bar that has not filled, and the only frame of the round that says *waiting* without needing a screen at all. No branding, nothing to date it. Chosen over a browser performance panel whose `RAM Opera GX can use` was legible mid-frame, and over a stopwatch, which `/services/website-design/` already owns. | `https://images.unsplash.com/photo-1607434472257-d9f8e57a643d` |
| `cms-you-can-actually-use` | `dev-cms-you-can-actually-use.jpg` | A home desk at night: a laptop with a document open beside a monitor showing a dark content dashboard, warm lamp, plants, notebook. Mean 25.2. "So you update your own content without paying a ransom every time" — somebody's own desk, not an agency's, which is the whole claim. | `https://images.unsplash.com/photo-1650661926447-9efb2610f64c` |
| `integrations` | `dev-integrations.jpg` | A dark editor showing `events.forEach` wiring `dragenter` / `dragleave` / `drop` listeners onto a file drop zone, then `handleFiles`. Mean 27.1. "Wiring the site into your CRM, booking, payments, and the tools you already run" — this is literally the wiring, and it is the one card where the code itself is the argument. Amber and gold syntax on near-black. | `https://images.unsplash.com/photo-1537884944318-390069bb8665` |
| `security` | `dev-security.jpg` | A dark security settings panel: three checks passed on the left, a column of amber warnings beside them. Mean 39.6. "Built in so you're not leaving the back door open for the next breach" — the panel you only look at when something is already flagged. Chosen after a fifteen-frame round of the red-and-green neon padlock-on-a-keyboard cliché, all of which were off-palette (the brand audit is on record as 0 green). | `https://images.unsplash.com/photo-1751448555253-f39c06e29d82` |
| `search-ready-architecture` | `dev-search-ready-architecture.jpg` | A browser inspector panel with the element tree expanded — `<header id="nav">`, `page-section`, `container` — tabs reading Inspector / Console / Debugger / Style Editor. Mean 47.0. "The technical bones that let Google and AI engines find and trust you" — the bones, in the tool that shows them. A `chrome` URL appears inside one `href` string at small size; it is a link in source code, not a mark on the page. | `https://images.unsplash.com/photo-1565106430482-8f6e74349ca1` |

Term slugs are unchanged from the first round and were checked against the live
taxonomy: `speed-and-performance` rather than `site-speed` and
`search-ready-architecture` rather than `search-ready-structure`, because
`/services/website-design/` owns those two and `/services/search-engine-optimization/`
owns `technical-seo`.

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `dev-hero.jpg` | A near-black screen at an angle: a `RegisterController.php` tab, an `app.js` tab, a project tree, and a zsh Terminal window sitting on top of all of it. Mean 12.3. Unmistakably **web** rather than app development, which is why it beat two better-composed VS Code frames that turned out to be Dart and Flutter. **Scored, not eyeballed, and shipped on `crop=top`** — see below. Two accepted costs: a ~20px Apple logo in the menu bar, and a username and hostname in the Terminal title bar (see the note). | `https://images.unsplash.com/photo-1625838144804-300f3907c110` |
| Quick Answer panel | `dev-quick-answer.jpg` | Someone at a desktop in a warm wood-panelled room, hands on the keyboard, code on the left screen and a page of styled components on the right. Mean 82.1 at portrait crop — the brightest file on the page and just inside the folder's ceiling (`sm-quick-answer.jpg`, 86). The boxes beside it are "In Person / How Your Business Runs / Built To Hold Up", and this is a real workspace rather than a meeting room. **Six rounds failed to find a two-person literal frame**: see the rejections. | `https://images.unsplash.com/photo-1542744094-3a31f272c490` |
| Outcome 01 — a site that holds up when plugins update | `dev-outcome-holds-up.jpg` | A laptop screen tilted in low light showing a system update downloading, with the installed-updates list behind it. Mean 51.6. "A fast, solid site that doesn't fall over the second a plugin updates" — the update running, which is the moment the row is about. The weakest literal match of the twelve, and it is here because uptime dashboards on Unsplash are all COVID-era Johns Hopkins screens: bright, green, and about something else entirely. | `https://images.unsplash.com/photo-1758780690553-8bc703fabca6` |
| Outcome 02 — a build you can update yourself | `dev-outcome-you-control-it.jpg` | Someone at a laptop between two monitors in a dark room, a web page on one screen and code on the other. Mean 27.7. "A build clean enough that you can actually update it yourself, wired into the tools you already run" — one person with the whole thing in front of them. | `https://images.unsplash.com/photo-1719400471588-575b23e27bd7` |
| Outcome 03 — a real human who answers | `dev-outcome-real-human.jpg` | Someone at their desk with a phone to their ear and a laptop open in front of them. Mean 85.1, the brightest file on the page. "A real human who answers when something breaks, instead of a disconnected number" — a person mid-call *at the machine*, which is the difference between this and `automation-ai-chat-and-reception.jpg`, an unattended telephone. | `https://images.unsplash.com/photo-1621255457330-7ef4e88ec27f` |
| Closing band | `dev-cta.jpg` | A developer still at the keyboard, lit only by the screen, in an otherwise black room. Mean 13.4. The closing line is "Get a website built solid, fast, and backed by people who stick around" — so the last thing before the contact form is somebody who has not gone home. **The best band score in the folder** — see below. Its one cost is a violet cast rather than the brand's gold; it is the second knowing palette outlier here, after `media-outcome-every-channel.jpg`. | `https://images.unsplash.com/photo-1624377632657-3902bfd35958` |

### The hero, measured

Same zones as the TV, billboard and website-design pages: the H1 sits
**upper-left** and the paragraph **lower-right** (`service-detail.css` §18),
scored against pure white before the mobile scrim is applied at all.

| Zone | Mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| H1, upper-left | 7.7 | 0.81% | 18.73:1 |
| Paragraph, lower-right | 19.4 | 0.34% | 17.04:1 |

**The best hero numbers in the folder**, and they came from the crop rather
than the file: the default centre crop scores 1.04% / 15.72:1 on the H1 zone,
and `fit=crop&crop=top` pushes the lit screen down and leaves the whole
upper-left third pure black. Compare the first round's file on this same slot,
which shipped at 6.92% / 3.79:1 and needed the large-text 3:1 floor to justify
it. Dark editor themes are the reason: a code screen is mostly black, so the
literal brief that looked like a constraint turned out to solve the hardest
contrast slot on the page.

**The one accepted cost, written down so nobody has to re-find it.** The
Terminal title bar reads `Developer — noor.mohammad@nlsrv01-netlinks — -zsh`,
legible at the rendered size. That is a person's account name and a machine
hostname rather than a company mark filling the frame, so it is weaker than the
registration plates already accepted on `automation-quick-answer.jpg` and the
`DE LA SAVANE` station name on the first round's speed card — but `netlinks`
does read like a business, and `crop` cannot remove it. If the slot is ever
revisited, this is the reason to revisit it.

### The closing band, measured

Scored on the crop, never on the file — `.nm-cta-2-wrap` is
`background-size: auto` at `background-position: 50% 0%`, so only the middle
~1260x994 is ever visible. Confirmed live at 375px: the wrap's background is
applied by the theme's own script as an inline
`background-position: 50% 0%; background-image: url(.../dev-cta.jpg)`, with
computed `auto` / `repeat`, so a 1920x1080 file never tiles.

| Candidate | Band mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| **Developer at a keyboard, black room (shipped)** | **13.0** | **0.13%** | **14.16:1** |
| Developer at dual monitors, dark room | 25.4 | 2.20% | 12.82:1 |
| Laptop and lamp, city window | 31.3 | 6.06% | 4.12:1 |
| Developer at laptop and monitors | 35.3 | 6.48% | 3.74:1 |
| Home desk at night | 34.1 | 11.90% | 3.19:1 |
| Desk with an iMac showing code | 69.1 | 28.75% | 1.25:1 |

0.13% failing is the best figure in this folder, ahead of `web-cta.jpg` (1.06%)
and the old `email-deliverability.jpg` benchmark (0.6%). The runner-up was the
better photograph — two monitors, more of the work visible — and died on a
**Coca-Cola can** sitting legibly in the middle of the band crop, which is the
same rejection a Coca-Cola awning got on the website-design page.

### Shots that were rejected, and why — website development, literal round

The failure modes inverted between the two rounds. Metaphor-hunting kept
failing on **daylight** (rebar, viaducts, lighthouses, bollards, house keys all
came back bright). Literal-hunting fails on **branding**, because the trade's
real objects are branded objects.

64. A **Coca-Cola can** dead centre of the closing-band crop, on the
    round's second-best-scoring frame. The DUMBO MARKET rule.
65. An **Adidas-trefoil sleeve** filling the left third of the only
    two-person Quick Answer frame found — two developers side by side at code
    monitors, which is exactly what that slot wants. Also a laptop sticker with
    a logo, a bright fluorescent ceiling, and a green floor marking.
66. Two **VS Code frames that were better hero compositions than the one
    shipped** — one with a gold `PROBLEMS 14` badge that would have been a gift
    for an H1 about a pile waiting to break — and both are **Dart and Flutter**,
    which is app development, not web. On the page whose whole revision was
    "make it read as web development", that is disqualifying.
67. A **wxPython editor with five red `Module 'wx' has no member` errors**, an
    even better fit for "waiting to break", rejected for the same reason plus a
    Chinese-language UI and a screen filled edge to edge with blue.
68. A **climbing-rope bundle** and a **blue starry sky behind overhead wires**
    from the first round, both of which scored better than anything else
    available and neither of which is web development at all.
69. A **browser performance panel** with `RAM Opera GX can use` legible
    mid-frame, in cyan and green.
70. **Fifteen padlock-on-a-keyboard frames** for `security`, lit red and green
    almost without exception, plus a `Master` dial on white at mean 193 and a
    row of **browser logos** (Edge, Firefox, Chrome, Opera, Brave) as a
    desktop-icon strip.
71. **Nine COVID-19 dashboards** for outcome 01 — Johns Hopkins case counters
    in green on black. Right shape, catastrophically wrong subject.
72. A **WordPress `Add Plugins` screen** at mean 119, which is the single most
    on-the-nose picture for this page's problem section and is far too bright
    for a near-black page, and a **WordPress.com laptop** at 89.
73. **Twelve bright phone-support frames** for outcome 03 (mean 110–167) — the
    anonymous person in the anonymous office, and one with a company polo shirt.
74. A **3D-rendered monitor with `html`, `JS`, `php` and `css` cubes floating
    round it** on a yellow ground, mean 152. Literal to the point of being
    clip art.

**Two knowing repeats inside the page.** Six of the twelve are a screen, so the
set separates them by *what kind*: an editor at an angle (hero), closing markup
(clean build), event listeners (integrations), an inspector tree (architecture),
a settings panel (security), and a content dashboard (CMS) — six different
tools rather than six pictures of code. And three of the twelve have a person at
a keyboard (Quick Answer, outcome 02, closing band); they are a warm room, a
dark room with two monitors, and a black room with one, which is the page's own
arc from "we sit with you" to "we are still here at night".

## Logo design

Six category cards plus the page's own photography — **twelve** files. Mean luma
across the twelve is **39.1–177.9**, the brightest spread of any page in this
folder, and that is a deliberate trade explained below.

### This page was built twice

**The first round was rejected by the client for not reading as logo design.**
It was built on metaphor like every other page in this folder — the copy talks
about a mark being "embroidered, etched, stamped, or printed cheap" and working
"on a sign flying past at 40", so the twelve frames were a dark workshop,
drafting compasses on black, one thread stitched on black cloth, a rack of tools
in size order, an illuminated letter at night, a neon arrow. Every frame was
dark, on palette, and free of any third-party mark. It also did not look like a
page about logos, and the client said so in one line: *"images are not relevant,
logo development is topic."*

That is the same correction `/services/website-development/` took, and the
resolution is the same shape: **on this page the imagery is literal.** Every
frame is now logo design being done — a mark drawn on a tablet, construction
curves on a big sheet, a page of pencil thumbnails, lettering built in a design
app, an emblem embossed into dark stock.

**What the lift did not change.** The DUMBO MARKET rule still holds absolutely,
and it bites harder here than anywhere else in the folder: `brand identity
design` returns `vagaro`, `Kraft`, `gaia & co`, `poster house` and `lituta
graphics` in the first fifteen results, and `logo sketches notebook` returns the
**Unsplash** mark itself. **The only marks shown anywhere on this page are
unattributable — an embossed crest, an enamel pin, four foil icons, and marks
still being drawn.** Not one is a real company's.

**What it cost.** Logo design is photographed on white paper under daylight, so
the palette had to give. Five of the twelve are above luma 80 where the previous
eleven pages have almost nothing above 90, and
`logo-every-variation-you-need.jpg` at 177.9 is the brightest file in the whole
folder. The two full-bleed slots, where white copy sits on the photograph, were
**not** allowed to give — see the measurements below.

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `custom-mark` | `logo-custom-mark.jpg` | A designer drawing a mark over construction curves on a large sheet, pen in hand. Mean luma 160.2. "Designed from scratch for your business instead of pulled from a stock library" — the single most literal frame of the round, and the geometry under the mark is visible. | `https://images.unsplash.com/photo-1600697395543-ef3ee6e9af7b` |
| `works-at-any-size` | `logo-works-at-any-size.jpg` | Hands drawing a circular mark on a tablet with a stylus at a dark desk. Mean luma 71.2. The row is "sharp on a billboard and still clear shrunk to a favicon", and a mark drawn as vector on a tablet is the one that is resolution-independent by construction. | `https://images.unsplash.com/photo-1611241893603-3c359704e0ee` |
| `works-in-one-color` | `logo-works-in-one-color.jpg` | Four small icon marks foil-stamped in a single colour each on dark textured stock. Mean luma 76.0. "So it holds up embroidered, etched, stamped, or printed cheap" — this is the stamped case, and each mark is one colour and nothing else. No words in the frame. | `https://images.unsplash.com/photo-1622134336272-f294c0abdec4` |
| `built-on-an-idea` | `logo-built-on-an-idea.jpg` | A hand pencilling concept thumbnails into a spiral sketchpad. Mean luma 112.7. "Carrying something true about who you are rather than a random shape" — the stage where the idea is still being found, before anything is drawn properly. | `https://images.unsplash.com/photo-1581464668854-0da56c32393c` |
| `every-variation-you-need` | `logo-every-variation-you-need.jpg` | A sheet covered in dozens of small pencil logo thumbnails, a second pad of more behind it. **Mean luma 177.9, the brightest file in the folder.** "The full lockup, the icon, horizontal, stacked, light and dark" — many versions of one idea, all visible at once, which no darker frame in the round could say. A small eraser carries a partly legible stationery brand at 2.2x and nothing at normal exposure — the line already drawn for the `NRJ` radio display and the Lexus boot badge. | `https://images.unsplash.com/photo-1713616147761-c126f8009c6f` |
| `every-file-format` | `logo-every-file-format.jpg` | Ornate lettering being drawn on a tablet in a design application, its tool panels down both edges. Mean luma 81.9. "So you're never stuck emailing a blurry JPEG to a printer at midnight" — the place the files actually come out of. The app chrome carries no product name. | `https://images.unsplash.com/photo-1776278734540-a64f6c0b6318` |

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `logo-hero.jpg` | A bird-in-shield emblem blind-embossed into dark blue-black stock, filling the frame. Mean luma 41.7. The H1 is "Most Logo Design Is Clipart **Wearing A Confident Font**", so the biggest picture on the page is the opposite of clipart: a mark with no colour, no words and no gimmick, pressed into the material. **It also solves the slot outright** — see the measurement below. No text anywhere in the frame and no attributable owner. | `https://images.unsplash.com/photo-1648211924989-4d32964a8355` |
| Quick Answer panel | `logo-quick-answer.jpg` | A hand drawing a white animal-head mark on a black tablet screen with a stylus, on a dark wooden desk. Mean luma 50.0 at the portrait crop, the second-darkest file on the page. The boxes beside it are "In Person / What You Stand For / A Recognizable Asset", and this is the mark itself being made. The one frame that is both unmistakably logo design *and* dark. | `https://images.unsplash.com/photo-1748326650737-33500fdfda30` |
| Outcome 01 — a mark that is unmistakably yours | `logo-outcome-yours.jpg` | An ornate word hand-lettered in pencil on kraft paper, flourishes and trial marks around it, a drafting pen resting on it. Mean luma 82.5. "A logo built from scratch that's unmistakably yours" — drawn by hand, so it exists once. The lettered word is a common noun. | `https://images.unsplash.com/photo-1617328332024-e5a942ff38bc` |
| Outcome 02 — it holds up from a billboard to a favicon | `logo-outcome-anywhere.jpg` | A hand sketching rows of small mark ideas in pencil in a notebook. Mean luma 98.0. **The weakest frame on the page against its row** — see the note below; the free pool contains no photograph of one mark at billboard and favicon scale together, and this at least shows the mark being worked at thumbnail size. | `https://images.unsplash.com/photo-1685661242103-888850e9b8b8` |
| Outcome 03 — simple enough to stick | `logo-outcome-remember.jpg` | A hand holding a drafting pen over an open notebook in a near-dark room. Mean luma 20.2, the darkest file on the page. The mark still being drawn at the hour when the fiddly decisions get made. Reads slightly as a desk setup rather than a studio; the second file to replace. | `https://images.unsplash.com/photo-1610547169194-c385fdf25e76` |
| Closing band | `logo-cta.jpg` | An enamel pin carrying a decorative mark, pinned to a black leather jacket. Mean luma 39.1. The closing line is "Get a mark that's unmistakably yours and works everywhere it has to", and the standfirst above it is "A logo you're proud to put on everything" — so the last thing before the contact form is the finished mark, worn. The pin sits centre and the jacket fills the frame, which is what a `50% 0%` crop needs; no flat-black band at any width. | `https://images.unsplash.com/photo-1664231307227-26288f3acf36` |

### The hero, measured — and why an embossed mark won it

`service-detail.css` §18 puts the H1 **upper-left** and the paragraph
**lower-right**, so a hero needs both zones dark. This is where the literal
imagery nearly broke the page: **logo design is photographed on white paper and
lit screens, and every candidate blew the floor.** Scored against pure white
before the mobile scrim is applied at all:

| Candidate | H1 zone | Paragraph zone |
|---|---|---|
| **Embossed emblem on dark stock (shipped)** | **0.45% fail, 11.37:1** | **0.19% fail, 9.89:1** |
| Designer's tools on a dark table | 0.06%, 15.72:1 | 0.01%, 11.03:1 |
| Drafting pen over a notebook, dark room | 4.16%, 7.23:1 | 33.48%, 2.41:1 |
| Designer at a lit screen, dark room | 19.01%, 1.21:1 | 0.01%, 19.56:1 |
| Lettering on a tablet in a design app | 9.84%, 1.92:1 | 33.25%, 1.86:1 |
| Hands sketching a mark on a tablet | 29.31%, 1.56:1 | 0.00%, 12.27:1 |
| A mark drawn on a black tablet | 21.78%, 1.28:1 | 60.37%, 1.57:1 |

Only two candidates cleared, and **the better-scoring one was rejected on
inspection, which is the lesson of this round**: the "designer's tools on a dark
table" frame has the best numbers on the page and at 2.2x brightness it is a
**makeup table** — eyeshadow palettes, brushes, and a `got2b GLUED` tube legible
across the middle. A wrong subject and a readable brand, caught only because the
brightened scan is mandatory before a file ships.

The embossed emblem wins on both counts. A single mark pressed into flat dark
stock is almost perfectly even in luminance, so it behaves like a solid colour
under the headline, and it is the most on-topic frame available — it is a logo,
photographed, with nobody's name on it.

### The closing band, measured

`.nm-cta-2-wrap` is `background-size: auto` at `background-position: 50% 0%` —
confirmed live on this page at 375 and 1440 (`auto` / `50% 0%` / `repeat`) — so
only the middle ~1260x994 is ever visible, top-aligned, and an undersized file
tiles. **Score the crop, never the file.**

| Candidate | Band mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| **Enamel pin mark on a leather jacket (shipped)** | **44.0** | **4.30%** | **5.41:1** |
| Embossed emblem on dark stock | 41.5 | 0.35% | 10.86:1 |
| Debossed circular badge on ribbed black | 42.2 | 0.65% | 6.69:1 |
| Black leather with water droplets | 42.2 | 0.68% | 8.32:1 |
| Drafting pen over a notebook | 27.6 | 8.84% | 3.64:1 |
| Foil icon marks on dark leather | 82.6 | 12.37% | 3.54:1 |

The embossed emblem is the best band score in this folder — **0.35% failing at
10.86:1, better than `billboard-cta.jpg` (0.71%, 9.15:1)** — and it went to the
hero instead, because the hero is the larger slot and the harder one to fill.
The pin at 4.30% is the worst band shipped in this folder and is accepted
knowingly: it is the only remaining frame that shows a *finished* mark out in
the world rather than one still being drawn, which is what the closing lines
ask for. The debossed circular badge scored better and was dropped because its
mark is ambiguously close to a car maker's badge.

### The one row the pool could not serve

**Outcome 02, "It Holds Up From A Billboard To A Favicon."** There is no
free-licence photograph of one mark at both ends of that range — the searches
that should produce it (`logo mockup`, `brand identity`, `signage`) return real
companies' marks without exception, which is the one thing this page cannot
show. The shipped frame shows the mark being worked at thumbnail size and
carries half the sentence. If a frame ever turns up showing one mark large and
small in the same shot, this is the slot for it.

### Shots that were rejected, and why — logo design (second round)

Roughly a hundred and forty candidates across twenty-two searches on top of the
first round's twenty-two.

87. **`brand identity design` is unusable as a search.** First fifteen results
    carry `vagaro`, `Kraft`, `gaia & co`, `poster house`, `lituta graphics`,
    `best`, and a `Ray-Ban | FACEBOOK` co-branded card. Every one is a real
    company's mark filling the frame.
88. **`logo sketches notebook` returns the Unsplash logo itself**, on a sticker
    beside a thank-you card. Rejected for the same reason as everything else in
    this list, and worth recording for the irony.
89. A **`HEY DESIGN studio` gold-foil card** (mean 56, genuinely beautiful) and
    **`ZACHARY EASTWOOD-BLOOM` embossed on black books** (81). A design studio's
    or a designer's own name on our page reads as a client, or worse, as a
    competitor we are advertising.
90. A **`PALMO EXCLUSIVE` badge** on black leather and a shelf of **car maker
    badges** — the entire `debossed emblem` search is car badges below the top
    three results.
91. **A `BENQ` monitor bezel** behind an otherwise perfect outcome frame of
    letterforms being drawn on a tablet, with `MI&M` legible on the screen
    behind it. Replaced after the brightened scan.
92. **3D-rendered "LOGO DESIGN" and "BRAND DESIGN" title cards** in gold and in
    neon glass. On-topic to the point of absurdity, and they are renders rather
    than photographs — clip art on a page whose H1 is about clipart.
93. **Abstract generated marks on black** (one at mean luma 10, the darkest
    candidate of the round). Rejected on argument, not on contrast: an abstract
    swirl is precisely "a random pretty shape", which the copy spends a
    paragraph demolishing.
94. **`logo grid geometry` returns fifteen pattern renders** — wireframe
    diamonds, golden-ratio spirals, grid textures. Diagrams, not photographs.
95. **iPad, Surface and iMac frames** across four searches. The device is the
    subject and the maker's mark is on it.
96. Bright rejects, for completeness: **white-desk magnifier and stationery
    flat-lays** (up to 201, including a `Desk Notebook` mockup), a **blind-
    embossed braille book** (169), and a **`STATU QUO` printed sheet** (175.5)
    which was the first Quick Answer pick and lost to the tablet on both
    brightness and crop.

### Shots that were rejected, and why — logo design (first round, superseded)

Kept because the frames are good and the reasoning still holds for any page in
this folder that runs on metaphor. Roughly a hundred and forty candidates.

97. **`sign painter lettering` returns one photograph**; `signwriter` returns
    zero. The billboard round found the same thing.
98. **Neon is a trap.** `neon sign workshop` and `illuminated sign at night`
    return `Shit Happens`, `Do Something Great`, `Coco Plsss`, `Dream Brig`,
    `Joe's bar`, `bistro cresta`, `stylowa`, `Ocean lodge` and `Fairfield inn`
    — every one a slogan or a business name, which is a wordmark.
99. **Petroglyphs and stone crests** for "built to outlast the trends": the best
    argument of the round (a mark still legible after three thousand years) and
    all six frames are daylight rock at mean 78–166, one with grass across the
    bottom third.
100. **Weathervanes, barber poles and manhole covers**, same slot. The
     weathervane is always against a bright sky; the one dark barber pole sits
     on a **dark green** wall and the brand audit is on record as 0 green; every
     manhole is grey daylight asphalt at 93–111 with a city name cast into it.
101. **Wax seals**, mean 79–215 — this subject is wedding stationery on white
     paper. The one dark candidate is an **embassy seal** reading
     `AMBASADA … OTTAWA`.
102. **`BAUM`, `FORCE` and `INDESTRO`** on three separate wrench and socket
     sets, and a stamp-maker's shop with `IZRADA PEČATA` on the sign and a wall
     of readable plaques.
103. **Letterpress and wood type**, passed over rather than rejected:
     `seo-on-page-optimization.jpg` is already trays of metal type and
     `billboard-design.jpg` is already large wooden letters on a dark bench.
104. A **blacksmith at an anvil** (mean 41, good) — `automation-custom-ai-
     agents.jpg` is already a smith at an anvil.

## Brand identity

Six category cards plus the page's own photography — **twelve** files. Mean luma
across the twelve is **28.6–80.7**, and eleven of the twelve are warm (mean R
minus mean B, +5.6 to +62.8).

### The one page where the set matters more than the frame

This page argues that showing up differently every time destroys recognition. A
jumble of unrelated palettes and lighting here would refute the copy in front of
the reader, so the set was decided **before** the first frame was picked, and
every candidate was judged against it as well as against its slot:

> **Near-black low-key frames from one dark printing and marking workshop, lit
> by a single warm source — type, ink, presses, stamped and pressed marks in
> gold and amber on black.**

A strong subject in the wrong palette is the exact failure this page is about,
so cool-blue, pastel and bright-white candidates were rejected on palette alone
regardless of subject — including several that were the best frame for their
slot.

**Four clichés banned outright, three of them new to this folder**, and each one
is contradicted by the page's own copy as well as being stock shorthand:

* Any readable third-party logo, wordmark or brand name — the standing DUMBO
  MARKET rule, and it bites here the way it does on `/services/logo-design/`.
* **A Pantone swatch fan or a spread of paint chips.** The single most overused
  image in the genre, and the copy mocks "the colors-and-a-vibe crowd" who pick
  a palette that way.
* **A fat brand-guidelines book, open or closed.** The copy spends a whole
  paragraph demolishing "an 80-page brand book heavy enough to prop a door
  open"; illustrating the page with one would argue for the other side.
* **A moodboard flat-lay.** Same problem — "looked cute on a mood board at 2am"
  is something this copy is attacking, not selling.
* Illustrator / Figma / Canva UI, and the generic designer-at-two-monitors. The
  copy names Canva as the failure mode.

| Term slug | File | Why this picture | Source |
|---|---|---|---|
| `logo-system` | `brand-logo-system.jpg` | A printer's case of labelled compartments, each holding a stack of the same sorts. Mean luma 49.2. The row is "the full set of marks and lockups", so the picture is a SET in a case rather than one mark — the brief's own "sign letters in a case". Labels carry numbers only. | `https://images.unsplash.com/photo-1604516093130-a6a5cc020f9a` |
| `color-palette` | `brand-color-palette.jpg` | A roller loaded with orange and two worn rollers in a black tray. Mean luma 28.6, the darkest file on the page. Ink and the thing that lays it down, **not** swatches — the one rule this slot had. **The weakest frame on the page against its row** and the first to replace: it reads as rollers more than as colour. Every "ink" search that could beat it returned white studio flat-lays or a readable maker's name (Winsor & Newton, Foellie, COSRX, Schreibtinte). | `https://images.unsplash.com/photo-1572627614522-1c56af1d9d72` |
| `typography` | `brand-typography.jpg` | An extreme close-up of metal letterforms, one ringed in gold. Mean luma 39.8. Checked against `pillar-message.jpg` as the brief required: that is a whole typewriter on dark wood at object distance, this is a macro of the letterforms themselves, and the two do not read as the same photograph. | `https://images.unsplash.com/photo-1634573615282-84b2338aeea3` |
| `visual-style` | `brand-visual-style.jpg` | Rows and rows of the same white letterform on black card, with two in red. Mean luma 44.8. The brief asked for "a consistent SERIES… repeated forms with one treatment" and this is exactly that, with the two odd ones out doing the page's own argument. **The one palette deviation on the page**: white and red rather than gold. Accepted knowingly — the frame is the argument, and at mean 44.8 it still sits on the dark page. | `https://images.unsplash.com/photo-1610454059909-f9a5a6eb4e58` |
| `brand-voice` | `brand-brand-voice.jpg` | An embossed brass gramophone horn lit gold out of a dark workshop. Mean luma 60.9, warm +41.3. The brief asked for something **audible** rather than visual, which is the whole point of the term. Chosen over the obvious vintage microphone because `email-broadcast-campaigns.jpg` is already a gold-lit microphone on black. | `https://images.unsplash.com/photo-1518893883800-45cd0954574b` |
| `usable-guidelines-and-templates` | `brand-usable-guidelines.jpg` | A single specification card: gold foil letters beside a column of exact sizes. Mean luma 47.8. Deliberately the opposite of the 80-page book — one card, one page, exact rules you could actually follow. The only words in frame are `GOLD`, `FOIL`, `M222`, `M224` and millimetre sizes: a foil reference, not a company. Its card stock measures very slightly cool (warm −6.4) and brightening to 2.2x shows a teal cast; at normal exposure it reads as near-black with warm gold. | `https://images.unsplash.com/photo-1598132521173-9023a3357da7` |

### The page's own photography

| Slot | File | Why this picture | Source |
|---|---|---|---|
| Hero background | `brand-hero.jpg` | A forme of wood type locked up in a chase on a press bed, spot-lit out of near-black. Mean luma 33.5. The H1 is about never looking the same twice, so the biggest picture on the page is the opposite: one system, locked tight, which is the opener's own phrase. **It also solves the slot outright** — `service-detail.css` §18 puts the H1 upper-left and the paragraph lower-right, and both zones here are pure black. The type is mirrored, as type is; flipped and read it says "even a SUPERHERO has to…", a phrase and not a company. | `https://images.unsplash.com/photo-1471890701797-59336a877de4` |
| Quick Answer panel | `brand-quick-answer.jpg` | Four men talking in a warm-lit workshop at the end of a shift. Mean luma 62.2. The section is about learning who you are in person, and this is what that looks like in somebody's actual operation — not a boardroom. Checked against `strategy-quick-answer.jpg` as the brief required and it does not repeat that framing (that one is a single person mid-sentence at a dim desk). Two vehicle plates are legible at full size and illegible at the rendered size, the line already drawn on `automation-quick-answer.jpg`. | `https://images.unsplash.com/photo-1657627926885-3e773817dd33` |
| Outcome 01 — recognized on the third touch | `brand-outcome-recognized.jpg` | A gold wax seal pressed into wax on dark cloth. Mean luma 80.7, the brightest file on the page, and the warmest (+62.8). The row is recognition built by repeat contact, so the picture is one mark that comes out the same every time it is pressed. The seal reads `HAND MADE`, a common phrase and nobody's name. | `https://images.unsplash.com/photo-1632164230792-f0c5ceb26c42` |
| Outcome 02 — one system, all marching in the same direction | `brand-outcome-one-system.jpg` | Rows of metal type standing in line in a wooden tray. Mean luma 44.6. "All marching in the same direction" is an image brief in itself and this is it, literally — every piece facing the same way in one frame. Knowingly rhymes with `seo-on-page-optimization.jpg`, which is also trays of metal type; that one is stacked trays seen square-on in a workshop, this is one tray of aligned rows on the diagonal. | `https://images.unsplash.com/photo-1776320267046-48aad358db5b` |
| Outcome 03 — it stays consistent in every hand | `brand-outcome-consistent.jpg` | Hands lifting a screen-printing frame over a press bed in dim light. Mean luma 52.8. The row is consistency surviving many hands, so the picture is the hands and the thing that makes every pull identical. | `https://images.unsplash.com/photo-1637729099669-3881fe3e4de0` |
| Closing band | `brand-cta.jpg` | Lines of metal type set and locked in a stick, everything in line, warm out of near-black. Mean luma 38.2. The closing line is "Get a brand system that makes you instantly recognizable everywhere you show up", so the last thing before the contact form is the finished setting. **Chosen on the measurement** — see below. It bookends the hero, which is the same trade one step earlier. | `https://images.unsplash.com/photo-1604516087408-a7cde81ecf0f` |

### The closing band, measured

`.nm-cta-2-wrap` is `background-size: auto` at `background-position: 50% 0%` —
confirmed live on this page at 375, 768, 1024 and 1440 (`auto` / `50% 0%` /
`repeat`) — so only the middle ~1260x994 is ever visible, top-aligned, and an
undersized file tiles. **Score the crop, never the file.**

| Candidate | Band mean | % failing AA 4.5:1 | Worst 5th pct |
|---|---|---|---|
| **Lines of metal type in a stick (shipped)** | **40.1** | **1.21%** | **5.55:1** |
| Metalworker at his bench, dark shop | 37.3 | 1.40% | 6.03:1 |
| Metal letterforms, macro | 38.6 | 8.00% | 3.34:1 |
| Wall of wood type | 69.0 | 8.15% | 3.92:1 |
| Four men in a workshop | 59.5 | 12.06% | 2.21:1 |
| Wood type shop, wider | 75.7 | 13.95% | 2.58:1 |
| Composing stick on concrete | 72.0 | 18.88% | 3.23:1 |
| Platen press in a workshop | 65.2 | 28.30% | 2.01:1 |

Only two candidates cleared, and **the better-scoring one was rejected on
inspection, which is the lesson of this round** — the same lesson the logo page
learned from its makeup table. The metalworker frame scores fractionally better
and the brightened scan shows product packaging on the shelves behind him:
`APA` on a box, `Pastane Servis Seti` on another, and a printed tin. Legible at
2x on the file, in a full-bleed slot, with a three-letter word that could be a
company. Dropped rather than argued about.

The shipped frame has no text in it at all beyond the mirrored German words in
the type itself, and at 1.21% failing / 5.55:1 it is the second-best band in
this folder after `logo-hero.jpg`'s 0.35%.

### Shots that were rejected, and why — brand identity

Around three hundred candidates across twenty-four searches, triaged at 630x440
and then re-downloaded at final crop.

105. **Every "brand identity" search is unusable**, exactly as the logo round
     recorded. This page never ran one: the four banned clichés above are what
     those searches return, and the folder already has the evidence.
106. **The `ink` searches are a product-photography aisle.** `ink bottle dark`
     and `ink tin` returned `Winsor & Newton`, `Foellie` (twice), `COSRX`,
     `Schreibtinte` and a `BATH HOUSE` bottle on moss — a readable maker's name
     on all but two frames, and the two clean ones were white studio flat-lays
     at mean 181 and 208.
107. A **`trodat` self-inking stamp pile** (mean 52, dark, and the right idea for
     the logo-system slot) with the maker's name repeated on every stamp in
     frame.
108. A **`Dalton` typewriter with amber keys** (89) for typography, and a
     **`BENQ`-adjacent** repeat of the logo round: readable maker's mark on the
     body.
109. A **gramophone with a `COLUMBIA` record label on a `CROSLEY` deck** (32) and
     a second with `Brunswick` cast into the arm (54). Two company names each.
110. **`VASSE FELIX` foil on black** (51) — a real winery, and otherwise the best
     foil frame of the round.
111. **`FLIGHT 175` engraved in gold on wet stone** (79). A 9/11 memorial. Right
     palette, wholly wrong to use.
112. **Contact sheets and film strips**, the brief's own suggestion for visual
     style: every frame in the pool is teal or green (mean 73–125, warm −2 to
     −15). The one page in this folder that cannot afford an off-palette frame
     is this one.
113. **Poster walls and paste-ups** for the same slot — `KAPA FESTIVAL`,
     `RAMONES`, `DISOBEY`, `HERBIE HANCOCK`, `UTAH ETHER`, a wall of band
     stickers. Every one is somebody's name, at mean 95–128.
114. **Darkroom and pigment searches**, run for the colour slot: safelight red
     (mean 39–42) and CRT teal (34–51) throughout, plus one rainbow powder
     explosion on white. Two palettes this page does not have.
115. **Six "workshop meeting" corporate-stock frames** at mean 85–169 for the
     Quick Answer — the anonymous person in the anonymous office this whole
     exercise exists to replace, the same rejection the AI automation round
     made.
116. A **`CAVANI` tailor's bench** (85) and **`THE LEATHER TRADING CO`** again
     (68), the latter already on record from an earlier round.
117. Bright rejects for completeness: **letterpress studios shot through
     windows** (118–198), **white office printers** across three searches
     (86–208), a **`KODAK PORTRA 400` box** (85), and a **marquee letter A on a
     blue wall** (40, and the wrong two colours — the brand audit is on record
     as 0 blue for accents).

## Searching — the API route is gone

`SERVICE-PAGES.md` says to search through `unsplash.com/napi/search/photos`
because "the API and CDN do not" bot-gate. **That is no longer true.** As of the
AI automation round the napi endpoint returns `307` + `Authorization required`
to curl and an Anubis proof-of-work interstitial to a browser, including to
same-origin `fetch()` from a page that has already passed the gate.

What still works:

- **The rendered search page** in a real browser — `unsplash.com/s/photos/<terms>`
  — whose own interstitial resolves during a normal page load. Photo ids can then
  be read out of the grid's `img[src]`. Filter on
  `images.unsplash.com/photo-` and reject `plus.unsplash.com` **and**
  `premium_photo-` explicitly: `premium_photo-1673…` contains the substring
  `photo-1673…`, so a loose regex quietly lets Unsplash+ results through.
- **`images.unsplash.com`**, unchanged. Downloading by id is unaffected, which is
  all the pipeline itself needs.

Two search habits worth keeping: Unsplash matches keywords, so **short queries
win** — a five-word query routinely returns one or two results where a two-word
one returns twenty — and it is far cheaper to download a wide batch at final crop
and look at it than to keep refining the query.

## Re-fetching

The download used for every file, with the width and height from the sizing table
above:

```
curl -sSL -o <file> "<source>?auto=format&fm=jpg&fit=crop&w=<W>&h=<H>&q=80"
```

`fm=jpg` is not optional. Without it `auto=format` will hand a modern browser a
**PNG** for some sources — one of these came back as a 2 MB PNG named `.jpg`,
which WordPress imports happily and then serves at ten times the size. Check
what actually landed:

```
file -b <file>
```

## Applying them

```
make page-images
```

Imports each file into the media library (idempotent — matched by attachment
slug, so a second run re-uses the existing attachment) and writes it to the
term's `nimo_child_category_image` meta, replacing the `s4-img-*` demo
placeholder `make cat-images` put there.

Category cards are done at that point. A page's own photography needs the page
built again afterwards, because the body stores the attachment id:

```
make page SLUG=ai-search-optimization
make ppc
make strategy
```

These are stock, not Production Connections' own work. When real photography
exists, drop it in here under the same file names and re-run, or set it per
category under **Services → Service Categories → Edit → Category Image**.

---

## Law Firms page — RETIRED (the ten Claude Design photographs)

`lawfirm-hero.jpg`, `lawfirm-opener.jpg`, `lawfirm-client.jpg`,
`lawfirm-verdict.jpg`, `lawfirm-torch.jpg`, `lawfirm-video.jpg`,
`lawfirm-approach.jpg`, `lawfirm-walkaway.jpg`, `lawfirm-compare.jpg`,
`lawfirm-faq.jpg` — **all ten deleted from this folder, and their attachments
deleted from the media library.**

They were extracted from a Claude Design canvas export
(`law-firm-marketing.html`) rather than sourced from a stock library, so they
carried no photographer credit and no third-party licence — there is nothing left
to record here beyond the fact that they are gone. `nimo-child/inc/law-firms/`,
which resolved them by stem through `pclf_img()`, and
`scripts/content-custom/law-firms.php`, which declared them, are both deleted
too. The page is now built by the **industry-detail engine**, lives at
`/industries/law-firms/`, and its photography is the fourteen Unsplash frames in
the section below.

They in turn had replaced five Unsplash photographs from a still earlier version
of that page (Sebastian Pichler, Patrick Fore, Clarisse Meyer, Giammarco
Boscaro, Hunters Race), whose files and entries went with them.

> **One dangling reference is left, deliberately, and it is not new.**
> `nimo-child/inc/professional-services/render.php` reads nine of these ten stems
> through `pcd_img()`. That render path was ALREADY orphaned before this
> retirement: no page carries `_pc_custom_layout = professional-services`, and
> `/industries/professional-services/` is built by the industry-detail engine, so
> the file never executes. Retiring it was explicitly out of scope for this
> change. If it is ever revived it will want nine photographs that no longer
> exist — delete the directory, or re-source them, rather than assuming it works.

## Law Firms page — fourteen photographs

`/industries/law-firms/`, imported by `make industry-images` and declared in
`scripts/content-industries/law-firms.php`. The page moved UP a level during this
build, from `/industries/professional-services/law-firms/`, so that it sits beside
Professional Services rather than inside it.

FOURTEEN rather than the parent page's thirteen, because §7 runs seven rows.
Every file is a **hand-framed crop, not a straight download**: `url` is
provenance, and the checked-in JPEG is the source of truth. Deleting one and
re-running the importer fetches the ORIGINAL framing back, not this one — re-cut
it instead.

Free Unsplash Licence throughout (`images.unsplash.com/photo-*`). No
`plus.unsplash.com` and no `premium_photo-*`: that is a paid subscription
licence, and the filter has to reject `premium_photo-` **by name**, because
`premium_photo-1673…` contains the substring `photo-1673…`. Harvesting the search
pages rejected 8 such results on the law-library page alone.

**Every credit below was read off the rendered Unsplash photo page, one page at a
time**, and cross-checked two ways: the page's own `images.unsplash.com` id
against the id recorded here, and "Free Photo on Unsplash" in the page title.
None is from memory. The bulk shortcut — fetching the fourteen photo pages
same-origin from a search tab — returns HTTP 401 and a bot challenge, and was not
worked around.

Luminance is the mean of the **final crop**, which is the only figure that means
anything once the framing is fixed. Range 12.1–72.9, against the parent page's
8–80.

| File | Slot | Cut | Lum | Subject | Unsplash id | Credit |
|---|---|---|---|---|---|---|
| `law-hero.jpg` | §1 hero | 2000×1000 | 6.3 | Corner of a dark office tower at night, lit floors diagonal across the lower right | `photo-1630107753878-866b364cdbd9` | Brady Bellini |
| `law-quick-answer.jpg` | §3 quick answer | 1400×1400 | 45.8 | An interview being filmed — lights, boom, operator | `photo-1602743297108-4c9061884285` | Jonah De Oliveira |
| `law-shared-leads.jpg` | §5 card 1 | 1116×1800 | 42.6 | Dark screen of dense, repeating identical rows | `photo-1714846201700-35b42d937158` | Lukas |
| `law-bar-rules.jpg` | §5 card 2 | 1116×1800 | 42.7 | Numbered official statute volumes on a shelf | `photo-1619771766980-368d32e44b82` | Nasser Eledroos |
| `law-spend.jpg` | §5 card 3 | 1116×1800 | 12.1 | Candlestick chart falling away on near-black | `photo-1611974789855-9c2a0a7236a3` | Maxim Hopman |
| `law-svc-video.jpg` | §7 row 01 | 1200×1500 | 34.5 | Film crew at monitors on a darkened soundstage | `photo-1612544409025-e1f6a56c1152` | Brands&People |
| `law-svc-ppc.jpg` | §7 row 02 | 1200×1500 | 27.0 | Dark performance panel, red/green figures and sparklines | `photo-1651341050677-24dba59ce0fd` | Anne Nygård |
| `law-svc-seo.jpg` | §7 row 03 | 1200×1500 | 60.0 | Dark assistant prompt box — "Ask anything", "Tools" | `photo-1762330470070-249e7c23c8c0` | Zulfugar Karimov |
| `law-svc-automation.jpg` | §7 row 04 | 1200×1500 | 25.9 | Phone lit on a dark desk, lock screen reading 2:18 | `photo-1570398584781-deb16ae3bb4c` | Akshar Dave🌻 |
| `law-svc-brand.jpg` | §7 row 05 | 1200×1500 | 37.6 | Hand-drawn website wireframes on dark blue | `photo-1600132806370-bf17e65e942f` | Compagnons |
| `law-svc-email.jpg` | §7 row 06 | 1200×1500 | 47.0 | Blank notepad and pencil beside a typewriter, dark desk | `photo-1752137666154-34d38ba92dd7` | Ajay Deewan |
| `law-svc-strategy.jpg` | §7 row 07 | 1200×1500 | 72.9 | Compass rose on a dark navy chart, route plotted | `photo-1730371851241-aad9cf97525f` | Ali Alauda |
| `law-compare.jpg` | §10 compare | 1120×1600 | 54.8 | Courthouse colonnade receding to one lit doorway | `photo-1603644448048-28a7e5122f0a` | Adrien Delforge |
| `law-cta.jpg` | §13 closing band | 1400×1400 | 60.7 | Two colleagues at a lit desk in a dark office | `photo-1758520145123-6deed27f0ff5` | Vitaly Gariev |

### Why each ratio

Each slot is an `object-fit: cover` box whose aspect ratio **moves with the
viewport** — §3 runs 0.732 at 1280 and 1.059 at 1792; §13 runs 0.633 and 1.157 —
so each file is cut to its slot rather than downloaded and hoped over. A **square
is the only shape that survives §3 and §13**, because every ratio in their range
contains the centred square of a 1:1 file. §7's panel is a fixed
`aspect-ratio: 4/5` in `pc-components.css`, so 1200×1500 is exact there and
nothing is cropped at paint time.

**§5's three share a subject scale by construction, not by adjustment.** The
parent page had to re-cut one of its three at 0.82 zoom to bring a gavel up to
its neighbours' size. All three here are full-frame texture — repeating rows, book
spines, a candlestick chart — so there is no subject whose scale could disagree,
and the slot's 0.605–0.649 swing costs them nothing. That was a selection
criterion.

### The hero, measured — and the round it took to get right

A banner is not judged by its average; it is judged by what sits behind the
words. **There are THREE text blocks, not two**, and missing the middle one cost
this page a round.

The first hero was a county courthouse clock tower under strings of festoon bulbs
(`photo-1643947681040`, Pete Alexopoulos). It was measured against the two
regions the parent page's notes name — behind the H1 and behind the body copy —
scored well on both, shipped, and was **rejected by the client on sight**. The
measurement was not wrong, it was incomplete: the gold eyebrow sits *between*
those two blocks, and that is exactly where the bulbs and the lit clock face
landed.

So the regions are now read off the built page, all three of them, at both
aspects the band actually takes — 2.244 at 1850, and 0.388 at 375 where section
22 of `industry-detail.css` shifts the crop window to 15%:

| Region | x | y |
|---|---|---|
| desktop H1 | 0.152 – 0.749 | 0.227 – 0.563 |
| desktop eyebrow | 0.152 – 0.848 | 0.570 – 0.612 |
| desktop body | 0.152 – 0.437 | 0.650 – 0.880 |
| mobile H1 | 0.042 – 0.957 | 0.197 – 0.399 |
| mobile body | 0.042 – 0.957 | 0.406 – 0.850 |

Scored on the **brightest 5%** of each region — a mean hides a lit window, a
blown highlight behind a letterform does not — worst region reported, measured on
the **served AVIF**:

| Frame | Worst region | Note |
|---|---|---|
| `law-hero` (chosen) | **25** | every region's mean under 8/255 |
| parent page's `pro-hero`, for scale | 161 | |
| `photo-1643947681040` clock tower, rejected | 225 | eyebrow 225, H1 194 |

**It wins on composition, not just exposure.** The lit floors run diagonally
across the lower right — the one part of the band no text occupies, since the
type stops at x 0.848 and y 0.880. So the frame has a subject and the subject is
nowhere near a letterform. Cut at `cy 0.45` rather than centred: `cy 0.30`
measured a hair darker and pushed the building out of frame, which is the
photograph-of-empty-sky trap this page already walked into once.

Rule 9 was checked at **3.2× brightness**, not at true exposure — a near-black
frame hides text. No signage, no logos, no legible window interiors, nobody
identifiable.

**Knowingly close to the parent.** `pro-hero` is also a dark office building at
night with a diagonal run of lit floors; this is the same idea photographed
differently — a corner seen from below across two faces rather than one facade
flat on. The alternative, `photo-1558627563`, scored 54 and is abstract mirrored
glass: better numbers, no place and no story.

**Every law-specific frame measured worse, for one structural reason:**
classical courthouse stone is pale, so it is bright behind white type. The best
scored 147 (`photo-1783091478517`), the rest 199–250. Dark law libraries were no
better (140–246) — book spines and lit shelves are high-contrast by nature.

### Shots that were rejected, and why — law firms

Two were rejected on rule 9 — no stranger's personal data, no third parties'
brands in frame — and **both were caught only at full size, after being cut**. A
thumbnail cannot clear a frame for brand marks.

| Frame | Slot it lost | Why |
|---|---|---|
| `photo-1598703900524` | §7 video | The best-composed, best-exposed camera frame found (57/255, backlit by tube lights on near-black). At full size the body reads SONY and XDCAM, the follow-focus Movo, the cage SmallRig, the rail Manfrotto. Five brands. |
| `photo-1718670014130` | §7 brand | Matte-black stationery embossed ZACHARY EASTWOOD-BLOOM — a real person's name, the exact fault the parent page recorded. Its set-mates carry the same name. |
| `photo-1495846414472` | §7 brand | Reads NeONBRAND. |
| `photo-1780145705554` | §7 brand | A paper-stock product tag, "VELVET TOUCH DEEP BLACK". |
| `photo-1602832168038` | §7 brand | Darkest of the identity frames (34/255) and a memorial inscription carrying a surname. Wrong on both counts. |
| `photo-1512149673953` | §7 automation | An Android home screen — every app icon is a third-party mark. |
| `photo-1614091473310` | §7 SEO | A Google search page. |
| `photo-1762330468765` | §7 SEO | facebook.com in the address bar. |
| `photo-1745674684468` | §7 SEO | A recognisable assistant's greeting screen. |
| `photo-1764419737690` | §1 hero | **The parent page's own hero** (`pro-hero`). Surfaced first on the office-at-night search. |
| `photo-1548607634` | §7 video | **The parent page's own** `pro-svc-video`. Surfaced first on the cinema-camera search. |
| `photo-1570884200343` | §5 card 1 | Better exposed (18.8) and the brief's own "many claimants on one item" — many hands raised out of the dark. Reads as a congregation, and has a distinct subject at a distinct scale, which its two neighbours do not. |
| `photo-1563791922083` | §1 hero | A photograph of empty grey sky. See the hero table above. |
| `photo-1643947681040` | §1 hero | **Shipped and rejected.** Courthouse clock tower under festoon bulbs. Measured behind the H1 and the body but never behind the eyebrow between them, which is where the bulbs and the lit clock face fell — worst region 225. |
| `photo-1558627563` | §1 hero | Worst region 54, the best number found, and abstract mirrored glass: no place, no story. |
| `photo-1597265543804` | §1 hero | Dark enough (worst 80) and the tower reads `Marriott`. |

### Two slots the free licence could not serve literally

**A dark inbox, for §7 row 06.** Every well-exposed dark-mode mail or message
screen found was a named product, and the parent page already spends its email
card on a mail app icon (`pro-svc-email`), so even a clean one would have
collided. Envelope frames were measured instead and came in bright — 109, 118,
132 — except one magenta close-up that reads as a valentine. The row carries a pad
and pencil beside a typewriter instead: nurturing is writing, repeatedly, to
someone who has not decided yet.

**Dark campaign metrics, for §7 row 02.** `law-svc-ppc` is a market summary
rather than a campaign report. Recorded honestly as the closest the free licence
gets.

### The closing band, and one knowing repeat

`law-cta` is a **Vitaly Gariev frame from the same late-night office set as three
of the parent page's files** — `pro-quick-answer`, `pro-trust` and `pro-cta`. The
parent's own notes argue that several framings from one set "read as one page
rather than three stock purchases", a house style; this is a fourth framing of
that set on the direct child, so the risk it reads as a repeat is real and is why
it is written down.

What makes it defensible: the rule forbids reusing the parent's **files** and this
is not one of them, and both the situation and the people differ — the parent's
three are one man alone, one man with his head in his hands, and a room seen
through glass from outside; this is two colleagues over a monitor. The parent's
notes record dropping a fourth frame for being "the same man in the same suit at
the same desk", and this is not that. Nothing law-specific was available: every
"lawyer working late" search under the free licence returned either nothing or
Unsplash+ only. **If this is ever judged too close, replace this file rather than
the parent's — it is the newer one.**

## Applying them

```
make industry-images
make industry-detail SLUG=law-firms
```

---

## Financial Services page — thirteen photographs

`/industries/financial-services/`, imported by `make industry-images` and
declared in `scripts/content-industries/financial-services.php`.

THIRTEEN, the parent page's count rather than the Law Firms page's fourteen,
because §7 runs six rows. Every file is a **hand-framed crop, not a straight
download**: `url` is provenance, and the checked-in JPEG is the source of truth.
Deleting one and re-running the importer fetches the ORIGINAL framing back, not
this one — re-cut it instead.

Free Unsplash Licence throughout (`images.unsplash.com/photo-*`). No
`plus.unsplash.com` and no `premium_photo-*`: that is a paid subscription
licence, and the filter has to reject `premium_photo-` **by name**, because
`premium_photo-1673…` contains the substring `photo-1673…`. The cutting script
asserts that substring is absent from every id before it writes a file.

**Every credit below was read off the rendered Unsplash photo page**, one page at
a time, and cross-checked two ways: the id recorded here was confirmed present in
that page's own markup, and the page title carried "Free Photo on Unsplash". None
is from memory.

> **The bulk shortcut worked this round, and both sibling sections say it does
> not.** `fetch()`ing a photo page same-origin from an unsplash.com tab returned
> **200** with full rendered markup for all thirteen; the Law Firms section
> records HTTP 401 and a "Making sure you're not a bot!" challenge for exactly
> that request. The rendered search page also serves over `fetch()`, which is how
> the photo-page URLs were harvested. Treat this as a gate that opens and closes,
> not as settled — if it 401s again, load each page in a real browser tab.

Luminance is the mean of the **final crop**, which is the only figure that means
anything once the framing is fixed. Range 8.9–89.5 against the parent page's
8–80 and Law Firms' 12.1–72.9; only §13 sits outside the family band, and
deliberately — see the closing band below.

| File | Slot | Cut | Lum | Subject | Unsplash id | Credit |
|---|---|---|---|---|---|---|
| `fin-hero.jpg` | §1 hero | 2000×1000 | 26.5 | Lit crown of a dark office tower, black sky left | `photo-1593427995298-cad6731716d8` | Klim Musalimov |
| `fin-quick-answer.jpg` | §3 quick answer | 1400×1400 | 17.8 | Someone being filmed under a light, crew in silhouette | `photo-1691491918178-8a2e68b44919` | Kartabya Aryal |
| `fin-compliance.jpg` | §5 card 1 | 1116×1800 | 26.4 | Dense numbered grid and small print on black paper | `photo-1662152333949-9ceb7d64ac4c` | Natali Hordiiuk |
| `fin-sameness.jpg` | §5 card 2 | 1116×1800 | 40.0 | A rank of identical grey suit jackets on a rail | `photo-1553315164-49bb0615e0c6` | Nate Johnston |
| `fin-shared-leads.jpg` | §5 card 3 | 1116×1800 | 14.0 | Empty chair on a dark set, camera rigged, boom up | `photo-1666858443985-fead1d59b4f7` | Philip Waern |
| `fin-svc-video.jpg` | §7 row 01 | 1200×1500 | 42.5 | Crew around a camera crane and a lit softbox | `photo-1681137063068-081072cf04b4` | Huong Do |
| `fin-svc-seo.jpg` | §7 row 02 | 1200×1500 | 13.5 | Red neon question mark on a black wall | `photo-1606595898127-a06c52b4e2b3` | Simone Secci |
| `fin-svc-ppc.jpg` | §7 row 03 | 1200×1500 | 10.6 | Dot-matrix market ticker, quote over a rising chart | `photo-1648275913341-7973ae7bc9b3` | Tyler Prahm |
| `fin-svc-brand.jpg` | §7 row 04 | 1200×1500 | 42.4 | Black marble veined with copper | `photo-1738664926458-d8ca7f56549f` | HW KIM |
| `fin-svc-email.jpg` | §7 row 05 | 1200×1500 | 8.9 | A phone held edge-on, lighting a hand in a black room | `photo-1600856209923-34372e319a5d` | Akshar Dave🌻 |
| `fin-svc-strategy.jpg` | §7 row 06 | 1200×1500 | 39.0 | Black notebook, gold spiral, NOTES blocked in gold | `photo-1772408186777-7bbc603c4fb3` | James Thompson |
| `fin-compare.jpg` | §10 compare | 1120×1600 | 41.9 | Committee table receding to a wall of arched doors | `photo-1636619047982-1573518ec1fa` | David Vives |
| `fin-cta.jpg` | §13 closing band | 1400×1400 | 89.5 | Two lit office floors at night, people still at desks | `photo-1772059409102-86d89782265b` | Bruno BD |

### Why each ratio

Each slot is an `object-fit: cover` box whose aspect ratio **moves with the
viewport**, and it moves a long way — measured on the parent page, §3 runs 0.732
at a 1280 viewport and 1.059 at 1792, and §13 runs 0.633 and 1.157. `cover` will
not frame a photograph for you, so each file is cut to its slot:

```
§1  hero          2000x1000  2.00  full-bleed background band, stable
§3  quick answer  1400x1400  1.00  spans 0.732-1.059, so square
§5  bento x3      1116x1800  0.62  spans 0.605-0.649
§7  index x6      1200x1500  0.80  fixed by pc-components.css, exact
§10 compare       1120x1600  0.70  spans 0.590-0.800
§13 closing band  1400x1400  1.00  spans 0.633-1.157, so square
```

A square is the only shape that survives §3 and §13: every ratio in their range
contains the centred square of a 1:1 file.

Three files are cut off-centre, and each for a stated reason —
`fin-hero` at 0.85 zoom / cx 0.40 to push the tower crown right of the headline,
`fin-compliance` at 0.70 / cx 0.45 / cy 0.62 to put a lit candle and a box of
matches out of shot, and `fin-compare` at 0.80 / cx 0.60 to land the vanishing
point on the centre line so §10's tight crop keeps the recession.

### The hero, measured behind the text

The whole-frame mean is the wrong number for a banner — it is judged by what sits
behind the words. The white H1 occupies x 0.02–0.76, y 0.18–0.52 of the painted
band; the gold accent line and body copy occupy x 0.02–0.46, y 0.55–0.88. Both
regions measured directly, on the **brightest 5%** of their pixels, because a
mean hides a window and a letterform does not:

| Frame | H1 mean | H1 brightest-5% | Body mean | Body brightest-5% |
|---|---|---|---|---|
| **`fin-hero` (shipped)** | 27.7 | **48** | 29.1 | **40** |
| `law-hero` | 10.7 | 110 | 4.9 | 43 |
| `pro-hero` | 28 | 127 | — | — |

So it is the best of the three family heroes on the number that decides
legibility, by roughly a factor of two, while sitting mid-band on the whole-frame
mean. The 48 is warm uplighting washing the underside of the crown — a large even
midtone, not the row of lit office windows that got three of the parent page's
candidates rejected at 240–245.

**Two darker frames were measured and not taken**, which is the whole lesson of
this slot. `photo-1630107753878` is an office tower corner at night and scans
better than anything else found (H1 brightest-5% **24**, body 21) but the whole
crop measures **6.4** and at hero size reads as a black band with a scatter of
dots. `photo-1558627563` is 8.8 and near-abstract mirrored glazing. Chasing the
luminance optimum alone gets a picture of nothing — the scan is a filter, not a
chooser.

### §5's three cards, measured on the lower half

The card title and description are white and bottom-anchored over the
photograph, so the **lower half** is the figure that matters. Target under ~55.

| File | Whole | Lower half |
|---|---|---|
| `fin-compliance` | 26.4 | **20.9** |
| `fin-sameness` | 40.0 | **27.6** |
| `fin-shared-leads` | 14.0 | **14.5** |

**Subject scale across the three is the known compromise here.** Two are
full-frame texture and the third is a chair centred in a dark room, so its
subject reads smaller than its neighbours'. Cropping the chair to 0.75 and 0.60
zoom brings it up in scale and takes the frame to 9.2 and 5.9 — at which point
the set dressing that makes the picture an argument, the rigged camera and the
boom, goes black and the card is just a chair. The surround *is* the claim on
that card, so the scale disagreement was accepted and the full frame kept.

### Shots that were rejected, and why — financial services

**On rule 9 — no stranger's personal data, no third party's brand in frame.**
All of these were cut and measured first; a thumbnail cannot clear a frame for
brand marks, only a full-size look can.

| Id | Measured | Why it went |
|---|---|---|
| `photo-1654257649889` | 16.9 | Camera body reads KRASNOGORSK-3 |
| `photo-1761361326811` | 15.3 lower | Barrel reads CANON LENS RF-S18-45mm |
| `photo-1648620384752` | 19.2 lower | Canon again, on the body |
| `photo-1649217941135` | **2.2 lower** — the darkest §5 candidate found | Not a camera at all: a Godox SK400 strobe, brand across the housing |
| `photo-1601784551446` | 23.6 | Phone dock is a row of third-party app icons |
| `photo-1718670013921` / `-014130` / `-014361` | — | The embossed-stationery set Law Firms already rejected; carries a real person's name |
| `photo-1495846414472` / `photo-1495846111602` | — | NeonBrand, on the box |

**Every dark-mode search UI in the free licence is a named product**, which is
why §7's search card is not a screen at all. The pool across `dark-mode-search`
and `search-bar-dark-screen` was Google, TikTok, Gemini, Wikipedia, LinkedIn,
Facebook, Quora, Pinterest and Medium — plus `photo-1762330470070`, which is the
Law Firms page's own `law-svc-seo`.

**On exposure.** The literal subject for a compliance card is bright, every time:
tax forms on a dark desk 108.6 whole / 127.4 lower, a stamped legal document
209.7 / 207.4, a pen on a stack of papers 164.9 / 222.9, a row of compliance
binders 81.8 / 86.3, a shelf of ring binders 54.6 / 51.2 with a brightest-5% of
170. White paper lit well enough to read is white paper. A ledger printed on
black stock is the only version of this subject that survives white type on it.

Corporate-video frames failed the same way — `photo-1632187989763` 89.5,
`photo-1637250067262` 89.6, `photo-1634677652981` 125.3 — because a corporate
video is shot in a lit office.

**On subject.** `photo-1643323592702` was cut first for §7 row 01 and is better
exposed at 36.3: an operator silhouetted behind a rig with its monitor lit. It
went because the monitor shows a woman posing beside a car under teal and magenta
neon, which reads as a music video on a page about advisors.
`photo-1727451139462` (42.6) is an empty set with the camera rigged and collides
with `fin-shared-leads`. `photo-1691040986240` (36.6) is monochrome, which
nothing else on the page is. `photo-1678010057610` (22.7 / 21.2, the best numbers
found for any §5 slot) lost the sameness card on subject scale alone.

### Two subject bans, honoured

This is the third page in the family and repetition is the main risk, so:
**no gavel** — `pro-rules` is already a gavel on near-black and `law-bar-rules`
covers legal compliance, so §5's compliance card is a ruled filing — and **no
chess**, which `pro-svc-strategy` owns, so §7's strategy card is a notebook. A
compass was avoided too, unbanned but already spent by `law-svc-strategy`.

### One knowing repeat, and the brightest file

`fin-svc-email` is an **Akshar Dave🌻** frame of a phone lit in the dark, and
`law-svc-automation` is the same photographer on the same idea. Rule 8 forbids
reusing the sibling's *files* and this is not one of them; the framings differ (a
phone held edge-on in a black room against one lying flat with its lock screen
up), and the build prompt names "a phone lit in a dark room" as this slot's
subject. **If it is ever judged too close, replace this file rather than the
sibling's — it is the newer one.** Same convention Law Firms recorded for
`law-cta`.

`fin-cta` at **89.5** is the brightest file on the page and the only one outside
the family's 8–80 band. Deliberate, and the same call both siblings made in this
slot: §13's root is recoloured to the brand gold, **nothing sits on top of this
picture**, and it is the one lit room in a band that is otherwise gold on black.
`law-cta` is 60.7 whole with its lower half at 84.1, so the family has already
painted a local 84 here. It is also the prompt's subject exactly — "a practice
working late, lit room filling a dark square frame" — and the stated target for
the nine slots without text over them is "well under 100". The crop was pushed
for something darker and the frame will not give it: five variants ran 85.6 to
112.4, because the lit windows *are* the picture. The two darker alternatives
both lost on subject — `photo-1773946870146` (32.6) is a lit room that does not
fill the square and has nobody in it, and `photo-1510851896000` (30.5) is the
better photograph of an empty desk. Both siblings put people in this slot, and
the closing band is where the page asks for a call.

## Applying them

```
make industry-images
make industry-detail SLUG=financial-services
make verify
```

The container copy of `/tmp/pillar-images` is **not writable**, so the importer's
download-and-cache path fails inside it. These thirteen were fetched on the host
into this folder first; the importer then reads them with no network at all.

## Construction page — fifteen photographs

`/industries/construction/`, imported by `make industry-images` and declared in
`scripts/content-industries/construction.php`.

**FIFTEEN, not fourteen.** Fourteen are page slots — Law Firms' count rather
than Financial Services' thirteen, because §7 runs seven rows. The fifteenth,
`build-industries-card`, is not used by this page at all: it replaces the
PLACEHOLDER photograph on the `/industries/` landing page's Construction card,
and it is declared in this page's `images` block because the importer walks
content files and nothing else. (`pro-industries-card` is declared nowhere, which
is why it cannot be re-imported and has to survive in the database. Do not follow
that precedent.)

**Prefix `build-*` and `build-svc-*`, not `con-*`.** These filenames appear in
the media library and in every served `<img src>`, and "con-" on a page arguing
that other contractors are cowboys is a bad look.

Every file is a **hand-framed crop, not a straight download**: `url` is
provenance, and the checked-in JPEG is the source of truth. Deleting one and
re-running the importer fetches the ORIGINAL framing back, not this one — re-cut
it instead. **No photograph was darkened in post.** This repository selects on
measurement; it does not edit exposure. Where a number moved it moved because the
crop moved, and the crop is recorded.

Free Unsplash Licence throughout (`images.unsplash.com/photo-*`). No
`plus.unsplash.com` and no `premium_photo-*`: that is a paid subscription
licence, and the filter has to reject `premium_photo-` **by name**, because
`premium_photo-1673…` contains the substring `photo-1673…`. That is not
theoretical here — the *first* result on `construction site night` is
`plus.unsplash.com/premium_photo-1673453455523`. The cutting script asserts the
substring is absent from every id before it writes a file.

**Every credit below was read off the rendered Unsplash photo page**, one page at
a time, and cross-checked two ways: the id recorded here was confirmed present in
that page's own markup, and the page title carried "Free Photo on Unsplash". None
is from memory. The bulk `fetch()` shortcut worked this round, as it did for
Financial Services and did not for Law Firms — treat it as a gate that opens and
closes. Plain `curl` from the host is still refused with a 401 "Making sure
you're not a bot!" challenge, so every fetch was made same-origin from a real
browser tab.

| File | Slot | Cut | Lum | Subject | Unsplash id | Credit |
|---|---|---|---|---|---|---|
| `build-hero.jpg` | §1 hero | 2000×1000 | 30.7 | Scaffolded building against a blue-hour sky, one street lamp lit | `photo-1772512073419-a167e08e850d` | Winston Tjia |
| `build-quick-answer.jpg` | §3 quick answer | 1400×1400 | **156.0** | A videographer in hard hat and hi-vis filming on a job site | `photo-1708692323435-822205e518a8` | Harold Jonker |
| `build-shared-leads.jpg` | §5 card 1 | 1116×1800 | 32.1 | Silhouetted crew on a concrete deck against a low sun | `photo-1579847188804-ecba0e2ea330` | Shivendu Shukla |
| `build-no-proof.jpg` | §5 card 2 | 1116×1800 | 31.7 | A welder throwing sparks on a timber frame at dusk | `photo-1736097100931-72e215ab5736` | Kabiur Rahman Riyad |
| `build-no-trust.jpg` | §5 card 3 | 1116×1800 | 13.4 | A half-built house roof frame in silhouette at golden hour | `photo-1786859864999-2a969564ae2e` | Troy Mortier |
| `build-svc-video.jpg` | §7 row 01 | 1200×1500 | 57.9 | Camera operator in silhouette behind a rigged camera | `photo-1685673609257-c72bbe7e5655` | Anastase Maragos |
| `build-svc-seo.jpg` | §7 row 02 | 1200×1500 | 10.1 | A lit house number on a dark wall at night | `photo-1708515835981-d84accbb7013` | Bùi Hoàng Long |
| `build-svc-ppc.jpg` | §7 row 03 | 1200×1500 | 90.5 | Straight-down aerial of a suburban neighbourhood | `photo-1556231673-79c47d27cde0` | Neal E. Johnson |
| `build-svc-brand.jpg` | §7 row 04 | 1200×1500 | 35.4 | A grid of named colour swatches on a black wall | `photo-1729992530956-912936b9785d` | Harrison Chang |
| `build-svc-social.jpg` | §7 row 05 | 1200×1500 | 53.2 | A phone on a tripod filming at night, screen lit | `photo-1701631629857-c903b2dfb164` | Eugene Chystiakov |
| `build-svc-email.jpg` | §7 row 06 | 1200×1500 | 8.7 | The dial of an old telephone in near-darkness | `photo-1739816098620-9b53f44b9602` | Andrey Soldatov |
| `build-svc-strategy.jpg` | §7 row 07 | 1200×1500 | 29.1 | A cutaway floor plan seen from above on black | `photo-1770200395451-58bbe896a57b` | Thịnh Lưu |
| `build-compare.jpg` | §10 compare | 1120×1600 | 38.6 | A concrete passage receding to a dark end under one strip light | `photo-1784407089153-4998b881d6b0` | argelis disla |
| `build-cta.jpg` | §13 closing band | 1400×1400 | 31.8 | A newly built timber house uplit against a blue evening sky | `photo-1784748651825-6975ce926dd5` | John Petter Fagerhaug |
| `build-industries-card.jpg` | landing card | 1920×1080 | 31.1 | The hero frame, re-cut landscape | `photo-1772512073419-a167e08e850d` | Winston Tjia |

### Why each ratio

Each slot is an `object-fit: cover` box whose aspect ratio **moves with the
viewport**, and it moves a long way — measured on the parent page, §3 runs 0.732
at a 1280 viewport and 1.059 at 1792, and §13 runs 0.633 and 1.157. `cover` will
not frame a photograph for you, so each file is cut to its slot:

```
§1  hero          2000x1000  2.00  full-bleed background band, stable
§3  quick answer  1400x1400  1.00  spans 0.732-1.059, so square
§5  bento x3      1116x1800  0.62  spans 0.605-0.649
§7  index x7      1200x1500  0.80  fixed by pc-components.css, exact
§10 compare       1120x1600  0.70  spans 0.590-0.800
§13 closing band  1400x1400  1.00  spans 0.633-1.157, so square
--  landing card  1920x1080  1.78  matches pro-industries-card
```

A square is the only shape that survives §3 and §13: every ratio in their range
contains the centred square of a 1:1 file. Verified on the built page — every
generated size preserves its source ratio exactly (hero 1536×768 = 2.000, §5
952×1536 = 0.620, §7 819×1024 = 0.800, §10 1075×1536 = 0.700).

Three files are cut off-centre, each for a stated reason: `build-hero` at cy 0.64
to keep a street lamp above the headline band and a banner reading "LTC" out of
shot, `build-shared-leads` at 0.60 zoom / cx 0.70 / cy 0.80 to lift the paper
clear of the card title (see below), and `build-svc-ppc` at 0.72 / cx 0.58 /
cy 0.40 to put a legend out of shot.

### The hero, measured behind the text — at three viewports, not one

The whole-frame mean is the wrong number for a banner; it is judged by what sits
behind the words. Measured on the **brightest 5%** of the pixels each text block
actually covers, on the built page, at 1920, 800 and 500 — the last two because
section 22 of `industry-detail.css` shifts the crop window to
`object-position: 15%` below 1200px and the family has been caught by that before.

| Region | 1920 | 800 | 500 |
|---|---|---|---|
| H1 | 35.4 / **82.5** | 65.1 / **82.8** | 68.7 / **81.7** |
| gold accent | 20.5 / **69.2** | 15.8 / **71.1** | 49.1 / **86.9** |
| body copy | 6.4 / **36.7** | 9.4 / **48.5** | 9.3 / **48.1** |

Worst region anywhere: **86.9**, against a target of ~130, `fin-hero` at 48,
`law-hero` at 25 and `pro-hero` at 127.

**The numbers barely move across the three viewports, and that is the point of
this frame.** Section 22's note says a hero that "breaks the convention — subject
centred, or subject left — must override this rule". This one breaks it by having
no side that is different: it is scaffolding edge to edge, so the 15% shift
neither helps nor hurts and no override is needed.

`photo-1772512073419` at cy 0.70 was measured too and is darker on every count
(whole 20.1, worst region 70.5). Not taken: it is scaffolding with no sky, no
lamp and no anchor, which is the "photograph of nothing" trap Financial Services
records against `photo-1630107753878`.

### §5's three cards — rebuilt in daylight, and why they are still dark

**The first three were replaced at the client's request for not looking like
construction**, and they were right: a kitchen order rail, a phone holding a
harbour at night, and a handshake in a dark room. Two of the three were recorded
here as off-trade compromises when they shipped.

**Why the replacements are still golden-hour rather than broad daylight.** §3
could take a bright frame because nothing sits on it. These three cannot:
`.bg-img` and `.nm-choose-1-item` carry no scrim — checked on the built page,
`background-image: none` on both — so the white title and description sit
straight on the photograph, over x 0.114–0.887, y 0.371–0.876 of the painted
crop. Daylight crew shots do not survive that, and the numbers are worth keeping
because the next page will try the same subjects:

| Daylight candidate | Type band |
|---|---|
| workers shaking hands after a deal | 159.3 |
| a group of men on a roof | 157.1 |
| two workers in vests on site | 130.0 |
| crew in vests by a site vehicle | 123.2 |
| two workers in hard hats | 99.1 |
| crew inspecting plans on the jobsite | 75.1 |

**So the answer is golden hour, and it is the best answer rather than a
consolation.** A site shot into a low sun gives a subject that is unmistakably
construction in the top third and a foreground that falls to black exactly where
the type goes.

| File | Whole | Lower half | Type band |
|---|---|---|---|
| `build-shared-leads` | 32.1 | 1.0 | **0.8** / b5 2.0 |
| `build-no-proof` | 31.7 | 11.7 | **22.5** / b5 122.6 |
| `build-no-trust` | 13.4 | 5.2 | **5.0** / b5 51.9 |

Against the nine §5 files the three siblings ship — 19.7–57.8 on that band, with
brightest-5% of 126–211 — this is the cleanest set in the family by a wide
margin.

**And the subject-scale problem is gone.** The previous set was a texture, an
object and a person at three different distances, recorded here as a known
compromise. These three are one register — a construction site against a low sun,
figures at roughly the same size in all three — so §5's cards now agree the way
Law Firms' do, and for the same reason: they were chosen as a set rather than one
slot at a time.

**What each card argues.** Card 1 is the *other contractors* — a rank of figures
on a deck, all the same size, all after the same job. Card 2 does not show a
phone: it shows **the thing that is not being shown**, a welder throwing sparks,
the most photogenic thirty seconds of a contractor's week and the one nobody
outside the site ever sees. Card 3 is not the handshake but **what the deposit
buys before it exists** — a house that is still a frame, nothing to inspect,
which is exactly why the homeowner is frightened.

**A note on the lower half as a proxy.** It is one, and it failed once on this
page already: the original `build-shared-leads` passed the family's ~55 lower-half
target at 39.0 while measuring 72.8 on the band the type actually covers. Measure
the region, not the frame.

### The real difficulty: construction photography is daylight

The three sibling pages were offices and lawyers and could be shot at night. A
job site mostly cannot. Every literal frame of the build prompt's own subjects
came back bright, and the numbers are kept because the next page in this family
will hit the same wall:

| Subject | Measured |
|---|---|
| a builder or crew being filmed | 100.2, 103.1, 110.8, 117.7, 120.8, 122.5, 135.6, 139.1, 158.9 |
| a camera in a finished room | 93.2, 99.9, 114.7, 121.8, 129.9 |
| hard hats, racked or in a row | 72.6, 85.2, 87.1, 119.6, 127.9 |
| a row of work vans in a yard | 113.7 |
| an architect at a drawing board | 107.5, 121.8, 156.2, 211.5 |
| a calculator and paperwork | 69.1, 101.7, 120.6 |

So the pool was searched in the directions that *can* be dark — blue hour, night
work, a lit doorway in an unfinished shell, an object lit hard from one side —
and **two slots are honest compromises rather than the prompt's literal
subject**, each recorded in its own note in `construction.php`:

- **`build-shared-leads`** is a kitchen order rail, not a construction picture,
  and it is the weakest link to the trade in this folder. Four trucks lined up is
  the prompt's own suggestion and every version of it was bright or branded.
- **`build-svc-social`** is a phone on a tripod filming a **city**, not a project.
  What carries at card size is a phone on sticks with its screen live.

### §3 is daylight, and it is the one file here not chosen on a number

**Added after the page was first built.** Every other file in this folder is
selected against a luminance target; `build-quick-answer` is not. It measures
**156.0**, roughly three times the page's next brightest, and that is a client
decision to shoot this slot in daylight rather than an oversight. Do not "fix" it
by finding something darker.

**Why the exception is affordable here specifically.** The target the rest of the
folder is held to exists to keep white type legible, and §3 is the one section in
this component set where **nothing sits on the photograph**: `tx_about` style_4
puts the picture in its own column with the heading, the three feature rows and
the button beside it. The only thing a bright frame can cost in that slot is
visual agreement with the sections around it. The legibility argument still
applies to the hero and to §5's three cards, and those four are still measured
behind their type.

**Why it is worth spending there.** All three siblings put the video argument in
this slot — `pro-quick-answer`, `law-quick-answer` and `fin-quick-answer` are all
somebody being filmed. Held to a dark target this page could not: every
construction-filming frame in the free licence measures 100–159, because you film
a job site in daylight. Released from it, the slot carries the prompt's literal
subject and better than literal — the man in frame is **both** halves of the
sentence beside him, in a hard hat and hi-vis vest *and* running the camera
("putting your work and your crew on camera"). The first cut of this slot was a
half-built interior at night at 50.7, the prompt's fallback subject, which said
nothing about video at all.

**The crop is load-bearing, not cosmetic.** The full frame carries a second,
out-of-focus figure across its left third whose jacket reads "…Scaffolding" with a
company name ahead of it — a third party's brand, and the reason a centred cut is
not an option. Cut at **0.72 zoom, cx 0.63**, which drops the lettering out of
shot and places the operator, which §3 needs anyway: the slot swings 0.732–1.059
and keeps only the middle ~73% at its narrowest, so the subject has to survive
being cut on both sides. Checked at all three ratios — 0.732, the 0.894 it paints
at 1440, and 1.059 — and the operator is whole in every one.

cx 0.65 was cut first and is cleaner on paper (no trace of the second figure at
all). It was replaced because at 0.732 — what a 1280 viewport paints — it pushes
the operator hard against the left edge and reads as a framing mistake. cx 0.63
leaves a soft out-of-focus sliver of his shoulder at the extreme left, checked at
2.4× brightness with no lettering anywhere in it, because the words sit further
left in the source than this window reaches. **Re-cutting left of about cx 0.60
brings them back.**

The gimbal collar carries a maker's mark. It is 12×5 pixels in the finished file
and does not resolve into letters at 10× magnification — a different case from the
`law-svc-video` frame thrown away because "the body reads SONY and XDCAM" at full
size. The operator's face is in frame and in focus: a person in a photograph, not
a person's data, the same call `law-cta` and `fin-quick-answer` both make.

### §7 row 03 is an aerial of houses, not a chart

**Replaced at the client's request.** The first file was a gold line climbing a
dark chart with its figures printed along it (`photo-1586448317606`, 36.3) —
better exposed and on-brand in colour.

Worth recording what the change bought rather than what it cost: **this page no
longer has a chart anywhere on it.** `law-spend` is a falling candlestick run,
`law-svc-ppc` a panel of figures and sparklines, and `fin-svc-ppc` a dot-matrix
ticker — three pages in a row spending this subject on a market. An aerial of
housing stock is the first genuinely industry-specific answer the family has
given it.

The row reads "aimed at homeowners with real jobs and run on real cost-per-job
math, not a shared-lead free-for-all", and the card is now **the target rather
than the dashboard**: every roof in frame is a household, and the job is picking
the few behind which there is actually a kitchen worth sixty grand. A map of
houses says that. A rising line says the number went up, which is what every
agency report says.

At 90.5 it sits under the 100 this page sets for slots with no text on them.
Uncropped — the frame is already a straight-down grid and any cut just makes it a
smaller grid. Shot from high enough that no plate is readable and nobody is in a
garden; no street sign, no house number, nothing that locates it.

### Shots that were rejected, and why — construction

**On rule 9 — no stranger's personal data, no third party's brand in frame.**
All of these were cut and measured first; a thumbnail cannot clear a frame, and
on a near-black frame only a look at 3–4× brightness can.

| Id | Measured | Why it went |
|---|---|---|
| `photo-1641023388239` | 11.9 whole, worst type region **50.6** — better than the hero that shipped | Three tower cranes over a half-built block at night. A hoarding reads "Otto Reiachl" with its logo; re-cut at 0.78 / cx 0.404 to lose it (14.3 / 57.7) and thrown away anyway, because a crane jib reads POTAIN and a cab reads MOSER, both mid-frame and uncroppable. **A tower crane is a photograph of a maker's name.** |
| `photo-1642736875217` | 34.3 | Truck tailgate carries a dealer's URL and a legible plate |
| `photo-1726718583639` | 43.4 | CHEVROLET across the tailgate, plate below it |
| `photo-1697365434863` | 42.6 / 35.0 lower | A VW badge and a readable registration |
| `photo-1736885755036` | 39.7 / 54.8 lower — the most on-subject §5 candidate found | A phone number painted down the crane boom, Volvo on the cab |
| `photo-1730223322781` | 39.1 / type band **30.7 / b5 55.9** — the best §5 numbers found | A work van at night, and a fully legible registration plate |
| `photo-1702611485535` | 15.0 / 13.3 lower | Vans at night with identifiable faces inside |
| `photo-1784240696289` | 24.9 | Camera body reads ZV-E10 |
| `photo-1641146715549` | 14.2, the darkest camera frame found | Canon twice and EOS once, which is the whole picture |
| `photo-1695192655920` | 39.9 / 94.7, the best-composed video frame in the folder | Three faults at once: a Sachtler mark on the tripod, one identifiable face filling the frame, and a drum kit that makes it a band shoot |
| `photo-1634320498239` | 11.2 | Phone home screen is a row of third-party app icons |
| `photo-1652533625932` | 23.7, the most on-message PPC frame found | Reads BITCOIN across the panel |

**Every dark-mode search UI in the free licence is still a named product**, which
Financial Services already recorded and this build re-confirmed — three pages in
a row. The pool on `search bar dark screen` was Google, TikTok, Facebook,
Wikipedia, Gemini, Quora, Pinterest, Medium and WhatsApp, plus
`photo-1762330470070`, which is Law Firms' own `law-svc-seo`. **Do not spend
another round on it — shoot the idea instead.** This page's search card is a lit
house number: "near me" as a place rather than as a query.

### Three subject bans, honoured

Fourth page in the family, so repetition is the main risk rather than exposure.
**No gavel** (`pro-rules`, `law-bar-rules`). **No chess** (`pro-svc-strategy`).
**No question mark** — unbanned, and avoided anyway: it is `fin-svc-seo`, and it
was the first thing the search for §7 row 02 returned. A candlestick chart was
avoided for the same reason: `law-spend` is a falling candlestick run and
`fin-svc-ppc` a price board, so this page's advertising card is a single rising
line with its own figures printed along it.

**Not one file is shared with any sibling.** Three phones now exist across the
family and they are deliberately three different objects: `law-svc-automation` is
a handset lying flat with its lock screen lit, `fin-svc-email` one held edge-on
lighting a hand, and `build-svc-email` a rotary dial filling the frame. Four
strategy cards, four objects: a chess king, a compass rose, a notebook, and a
floor plan.

### Naming for a card that is not a page slot

`build-industries-card.jpg` is 1920×1080, **matching `pro-industries-card`
exactly**, and the ratio is the whole reason. Section 2 of `industries.css` gives
`.bg-img img` `object-fit: contain` by default, because five of the eight cards
are transparent-PNG cutouts and `cover` decapitates a full-body cutout. The band
is `height: 290px` at a card width of roughly 500px — about 1.72 — so a 16:9 file
letterboxes by a hair and effectively fills, needing no CSS of its own.

Measured lower half **11.3** (b5 55.8), against the 140/255 that failed on this
page once before: `industries.css` sets the card title and description in white
under the picture while the picture still carries a scrim.

**It took a CSS rule with it.** The card carried
`house-loan-estate-sell-mortgage-concept_53876-125097` under a PLACEHOLDER
comment, and `industries.css` carried a matching `img[src*="house-loan-estate"]`
selector forcing `object-fit: cover` — a rule whose own comment said it "is
expected to be deleted, not maintained, once real photography lands". Both are
gone. The `business-meeting-night` half of that selector stays, because the
Meetings & Events card is still a placeholder.

## Applying them

```
make industry-images
make industry-detail SLUG=construction
make industries
make verify
```

The container copy of `/tmp/pillar-images` is **not writable**, so the importer's
download-and-cache path fails inside it. These fifteen were fetched on the host
into this folder first; the importer then reads them with no network at all.

**Re-cutting a file that is already imported takes two steps, not one.**
`pcii_sideload()` matches by attachment slug and returns the existing id without
looking at the bytes, so a re-cut JPEG is silently ignored. Delete the attachment
first:

```
make wp CMD="post delete $(make wp CMD='post list --post_type=attachment --name=build-shared-leads --field=ID') --force"
make industry-images
make industry-detail SLUG=construction
```

The rebuild is not optional — the new attachment gets a new id, and
`_elementor_data` stores the id alongside the URL.

---

## Restoration page — thirteen photographs

`/industries/restoration/`, imported by `make industry-images` and declared in
`scripts/content-industries/restoration.php`.

**Thirteen, and all thirteen are page slots.** Financial Services' count rather
than Law Firms' fourteen or Construction's fifteen: §7 runs six rows, and the
`/industries/` landing card is **not** replaced by this build — see "The landing
card is kept" below, which is a verdict rather than an omission.

**Prefix `resto-*` and `resto-svc-*`, not `rest-*`.** These filenames appear in
the media library and in every served `<img src>`, and "rest-" reads as *sleep*
on a page whose whole argument is that you answer the phone at 2am and the other
guy does not. `resto-` was free: the library's nearest neighbours are
`restoration-worker`, `restorationpagetop` and the `restaurant-*` group, none of
which takes the hyphenated stem.

Every file is a **hand-framed crop, not a straight download**: `url` is
provenance, and the checked-in JPEG is the source of truth. Deleting one and
re-running the importer fetches the ORIGINAL framing back, not this one — re-cut
it instead. **No photograph was darkened in post.** This repository selects on
measurement; it does not edit exposure. Where a number moved it moved because the
crop moved, and the crop is recorded.

Free Unsplash Licence throughout (`images.unsplash.com/photo-*`). No
`plus.unsplash.com` and no `premium_photo-*`: that is a paid subscription
licence, and the filter has to reject `premium_photo-` **by name**, because
`premium_photo-1673…` contains the substring `photo-1673…`. The cutting script
asserts that substring is absent from every id and refuses any id that does not
start with `photo-`, before it writes a file.

**Every credit below was read off the rendered Unsplash photo page**, one page at
a time, and cross-checked two ways: the CDN id recorded here was confirmed
present in that page's own markup, and the page title carried "Free Photo on
Unsplash". None is from memory. **The photo page URL is not derivable from the
CDN id** — the page slug carries an 11-character short id, not the `photo-17…`
hash — so each credit was reached by mapping the search grid's `img[src]` to its
own `a[href]` and then fetching that page. The bulk `fetch()` shortcut worked
this round, as it did for Financial Services and Construction and did not for Law
Firms; treat it as a gate that opens and closes.

| File | Slot | Cut | Lum | Subject | Unsplash id | Credit |
|---|---|---|---|---|---|---|
| `resto-hero.jpg` | §1 hero | 2000×1000 | 26.1 | Water against a building at night, one lamp on the wall and on the water | `photo-1719413920768-5e19f462eb05` | Caleb Wright |
| `resto-quick-answer.jpg` | §3 quick answer | 1400×1400 | 30.4 | Two workers in hi-vis and hard hats over a job sheet at night | `photo-1740928980373-41aea101359a` | Julien |
| `resto-asleep.jpg` | §5 card 1 | 1116×1800 | 41.9 | An empty office chair beside a dark monitor, lights off | `photo-1761446812503-5d9a3d298cd7` | Clevenider Petit |
| `resto-shared-leads.jpg` | §5 card 2 | 1116×1800 | 30.6 | Two hands holding a phone edge-on in near darkness | `photo-1423784346385-c1d4dac9893a` | Gilles Lambert |
| `resto-no-trust.jpg` | §5 card 3 | 1116×1800 | **12.9** | A dark, empty roof space, floor broken up, one small skylight | `photo-1571058367867-4e11fbe4b5a7` | Isaac Quesada |
| `resto-svc-video.jpg` | §7 row 01 | 1200×1500 | 41.7 | A crew member in silhouette setting a film light at a house at night | `photo-1569620977730-70b5eba01e9f` | Kyle Loftus |
| `resto-svc-seo.jpg` | §7 row 02 | 1200×1500 | 17.5 | A hand holding a phone in a black room, blank screen the only light | `photo-1510717029971-27681a0e9da9` | Andrew Guan |
| `resto-svc-ppc.jpg` | §7 row 03 | 1200×1500 | 36.4 | A lightning strike over the lit windows of a tower block | `photo-1654243177527-dbf97c211fab` | Oleksandr Horbach |
| `resto-svc-brand.jpg` | §7 row 04 | 1200×1500 | 26.8 | Trays of antique metal printing type in a dark workshop | `photo-1777621543796-f6c62717d932` | Fabian Kleiser |
| `resto-svc-email.jpg` | §7 row 05 | 1200×1500 | **51.3** | A payphone handset off the hook at night, city bokeh behind | `photo-1495185878032-1b8deb37c110` | Clem Onojeghuo |
| `resto-svc-strategy.jpg` | §7 row 06 | 1200×1500 | 36.7 | Straight down on a suburban crossroads at dusk | `photo-1623422180948-229db3f8d1ed` | Rodney Truitt Jr |
| `resto-compare.jpg` | §10 compare | 1120×1600 | 30.7 | A dark tiled corridor receding to one closed door | `photo-1783858479206-0ee7cda79a99` | Julien |
| `resto-cta.jpg` | §13 closing band | 1400×1400 | 45.1 | A house lit at dusk, mirrored in the water across its lawn | `photo-1695910139223-b6ab112beb69` | Quinn Simonson |

### Why each ratio

Unchanged from the four siblings, because the slots are unchanged. Each is an
`object-fit: cover` box whose aspect ratio **moves with the viewport** — §3 runs
0.732 at 1280 and 1.059 at 1792, §13 runs 0.633 and 1.157 — so `cover` will not
frame a photograph for you and each file is cut to its slot:

```
§1  hero          2000x1000  2.00  full-bleed background band, stable
§3  quick answer  1400x1400  1.00  spans 0.732-1.059, so square
§5  bento x3      1116x1800  0.62  spans 0.605-0.649
§7  index x6      1200x1500  0.80  fixed by pc-components.css, exact
§10 compare       1120x1600  0.70  spans 0.590-0.800
§13 closing band  1400x1400  1.00  spans 0.633-1.157, so square
```

A square is the only shape that survives §3 and §13. **Verified on the built
page** — every one of the thirteen serves at exactly its slot ratio: hero 2.000,
§3 and §13 1.000, §5 0.620, §7 0.800, §10 0.700.

### For once, dark was an asset rather than a fight

Construction had to spend two rounds and one released exception on daylight,
because you photograph a job site in daylight, and its own notes warn the next
page in the family to expect the same wall. **Restoration does not hit it.** The
copy is *set* at 2am — the pipe at 2am, the storm, the ankle-deep water, the crew
rolling up like the cavalry — so the honest photograph of this business is
already dark. All thirteen came in between **12.9 and 51.3** on the whole-crop
mean against the family's 8–90 band, with **no exception spent and nothing chosen
against its subject**. Nine of the thirteen are literally night photographs.

For scale, the same count on the siblings: Professional Services 8.7–92.6,
Law Firms 6.3–72.9, Financial Services 8.9–89.5, Construction 8.7–**156.0**.

### The hero, measured behind the text — at four viewports

The whole-frame mean is the wrong number for a banner; it is judged by what sits
behind the words. Measured on the **brightest 5%** of the pixels each text block
actually covers, on the built page, by painting the image's visible `cover`
window into a canvas and sampling the live text rects. Both the bounding box and
the **ink** rects (the glyph runs themselves, via `Range.getClientRects`) are
reported, because a long three-sentence headline has a box much wider than its
longest line.

| Region | 1920 | 1440 | 1154 | 800 | 500 |
|---|---|---|---|---|---|
| H1 box | **90.6** | **99.7** | **34.8** | **17.7** | **14.0** |
| H1 ink | 58.2 | 63.9 | 29.6 | 14.8 | 12.3 |
| gold accent | 53.2 | 23.7 | 5.7 | 5.9 | 6.8 |
| body copy | 30.0 | 23.4 | 27.3 | 28.4 | 28.9 |

**Measure after the reveal has settled, or the numbers lie.** The theme runs
WOW.js: everything below the fold is `visibility: hidden` with a transform until
its trigger fires, and the band's own width has not resolved. Taken mid-flight
the same hero read 142.5 at 1920 and §5's three cards read 266/288/310 wide
against a grid whose tracks were already `292px 292px 292px`. Every figure in
this section is post-settle.

Worst region 99.7 against a target of ~130, with the family at `law-hero` 25,
`fin-hero` 48, `build-hero` 82.6 and `pro-hero` 127. Below 1200px section 22 of
`industry-detail.css` moves the crop window to `object-position: 15%` and every
number *improves*, which is the good case: that rule exists for frames with the
subject right and the ground left, and this one is exactly that — the left two
thirds are near-black water and the lit doorway is hard right.

**The crop is the whole decision, and the light source moves through the frame as
`cy` moves.** Measured on the file before it was committed:

```
cy 0.42   H1 b5 210.5   the lamp lands inside the headline band
cy 0.50   H1 b5 150.4   the lamp sits above it, its glow does not
cy 0.53   H1 b5 123.2   under target, lamp still in frame
cy 0.55   H1 b5 106.3   TAKEN
cy 0.58   H1 b5  81.9   darker, and loses the mooring post
```

0.55 is the last cut that keeps an anchor in the middle distance. 0.58 is darker
on every count and was not taken: it is water and a wall with nothing between
them, which is the "photograph of nothing" trap Financial Services records
against `photo-1630107753878`.

**Zoom stays at 1.00 deliberately.** Cutting to 0.85 zoom at cx 0.40 measures
better still (H1 b5 62.7) by pushing the lit wall right, and was rejected: it
magnifies the frame by a fifth, and the frame needs its full width to have a dark
left side for the `object-position: 15%` rule to find.

### §5's three cards — one register, chosen as a set

**Absence in the dark.** Card 1 is a chair nobody is sitting in, card 2 a phone
nobody is answering, card 3 a room nobody photographed. Every one of the three
complaints is about something that *isn't* happening at 2am, which is why a
chair, a pair of hands and a roof void read as a set rather than as three
distances.

These three cannot be bright. `.bg-img` and `.nm-choose-1-item` carry no scrim —
`background-image: none` on both, checked on the built page — so the white title
and description sit straight on the photograph, covering x 0.114–0.887,
y 0.371–0.876 of a card that paints 505×845 at 1920.

| File | whole | lower half | type band | type b5 |
|---|---|---|---|---|
| `resto-asleep` | 41.9 | **11.6** | 21.4 | 128.1 |
| `resto-shared-leads` | 30.6 | 32.9 | 40.1 | **134.5** |
| `resto-no-trust` | 12.9 | 19.7 | 17.6 | **56.5** |

Against the twelve §5 files the four siblings ship — 0.8–57.8 on that band with
brightest-5% of 2.0–211 — this set is mid-table on the mean and near the top on
the brightest-5%, which is the number that decides whether a letterform
disappears. `resto-shared-leads` is the one to re-measure first if this section is
ever re-typeset.

**Verified on the built page**, post-settle, at five viewports — three cards,
identical size, on one row down to 1154, then a single column:

```
1920   505x845 x3   one row      1440   402x845 x3   one row
1154   292x645 x3   one row       800   696x645 x3   one column
 500   456x585 x3   one column
```

1154 is the one that matters: it is inside the 992–1199 band where nimo-core
drops the wrap to `1fr 1fr` and section 18 of `industry-detail.css` forces
`repeat(3, minmax(0, 1fr))` back. The orphan-wider-than-its-neighbours fault that
rule was written for does not appear.

At the same five viewports: **no horizontal overflow** (`scrollWidth ===
clientWidth` throughout), all fifteen section roots present, none zero-height,
none overlapping, and §13's image cell non-zero at every width —
731×797, 582×839, 833×527, 696×392, 456×342. That last check is section 19's:
the §13 photograph used to collapse below 1200px.

### The one file that is not its slot's literal subject

`resto-no-trust`. The brief asks for "drying equipment running in a dark, empty
damaged room — the stock cliché done properly and darkly". **The free licence has
no restoration air movers.** Searched six ways — `air blower machine`,
`dehumidifier`, `industrial blower`, `carpet dryer`, `wet carpet`, `industrial
fan floor` — and the whole pool is domestic desk fans on white backgrounds,
factory extractors in daylight, and one set of wet-floor signs carrying a
manufacturer's logo. Every candidate measured 96–151. **Do not spend another
round on it.**

So the card takes the other half of its own sentence, and it is a better picture
of it. The bullet is not really about a fan; it is about proof that "never gets
shot", so "you stay a stranger at the worst possible moment". The frame is the
inside of a water-damaged roof — floorboards lifted, nobody there, no camera, one
small skylight. A photograph of the work nobody ever sees, which is the
complaint. The same trade Construction made with `build-no-proof`.

### Shots that were rejected, and why — restoration

Two rules did the rejecting, and one of them is new to this page.

**The distress line, drawn before the search started.** `fit` includes biohazard
and trauma cleanup and §4 describes a family standing in water at 2am, so the
brief bans identifiable distressed people, injury, blood, body-recovery contexts
and anything that reads as voyeurism. Not one frame here shows any of it; what
the people in these frames are doing is *working*. Rejected on this rule before
being measured:

- every `firefighter` and `fire hose` result — `photo-1576707995936`,
  `photo-1561439740`, `photo-1522208615167` and the rest of that pool. A fire
  crew is a different trade from a restoration crew, and a burning house with
  people in it is the moment this page has decided not to photograph.
- `photo-1592806088932` — a man on a phone in the dark with his head in his
  hand, 56. That is the panicking homeowner, not the company that answers.
- `photo-1512953771805` — a person inside a wrecked room.

**Rule 9 — no stranger's personal data and no third party's branding in frame**,
checked on the finished file at 2.6× and 3.2× brightness, which is the only check
that works on a near-black frame. Every one of these was cut and measured first:

| id | what | why it went |
|---|---|---|
| `photo-1755795603894` | **the first quick answer**, whole 82.0 | Four crew in white protective coveralls and hard hats working a night call-out under work lights — the best-composed frame found for this whole page, and exactly what §3 argues. A large lit board upper right reads **TDG**. Re-cut three ways at 0.62–0.80 zoom to lose the board; every crop that loses it also cuts the crew off at the waist. |
| `photo-1785080372346` | a night crew around yellow trucks, 42.2 | three legible registration plates |
| `photo-1772817337477` | a pickup with headlights on, 83 | grille badge dead centre |
| `photo-1673669231301` | a headset on black, 14.0 — the darkest §7 candidate found | maker's mark on the earcup |
| `photo-1718670014130` and two siblings | black embossed identity work, 64–98 | a real studio's name across the whole frame |
| `photo-1717298812095` | wet-floor caution signs — §5 card 3's own cliché, done literally | manufacturer's logo on both signs |
| `photo-1777894162454` | a call panel with the lines lit, 85 — the best "answers every call" frame in the pool | handwritten ward labels, i.e. somebody's workplace data |
| `photo-1698779051087` | an operator behind a camera, 12.0 | lettering across the cap |

### Repetition was the risk, not exposure

Fifth page in the family. `pro-*` owns thirteen, `law-*` fourteen, `fin-*`
thirteen and `build-*` fifteen, so **not one file here is shared with any
sibling** and three slots moved specifically to avoid a near-neighbour:

- **`resto-svc-brand`.** Both of the brief's subjects were blocked. The
  signwritten truck went on rule 9 twice (above); "dark premium identity work" is
  spent four times over — `build-svc-brand` colour swatches on a black wall,
  `fin-svc-brand` black marble veined with copper, `pro-svc-brand` matte black
  packaging with gold, `law-svc-brand` wireframes on dark blue. A fifth flat dark
  surface would be the fifth. The card is a case of hand-cut metal type instead:
  the opposite of a flat surface, and an object that argues "established" by
  being a trade somebody has taken seriously for a hundred years.
- **`resto-svc-email`.** `build-svc-email` is the dial of an old telephone, so
  the vintage telephone is not free — but this page already spends two slots on a
  mobile phone (`resto-shared-leads`, `resto-svc-seo`) and a third would make it
  look like it owns one prop. A payphone off the hook splits it: a telephone
  rather than a dial, mid-call rather than at rest, outdoors at night in a city.
- **`resto-svc-strategy`.** Not chess (`pro-svc-strategy`; the search was run
  once only to confirm what was being avoided). The paper map is spent twice —
  `law-svc-strategy` compass rose on a navy chart, `fin-svc-strategy` a gold-
  blocked notebook — and every literal candidate failed on exposure anyway:
  rolled plans under a desk lamp 90.4–105.5, a blueprint under a lamp 111, a hand
  drafting a plan 156, an antique city map 197. So the map is a photograph of the
  *place*: a suburban crossroads from above at dusk, which is what a service area
  actually is. Deliberately not `build-svc-ppc`, which is also an aerial — that
  one is straight-down at midday over dense suburb at 90.5; this is dusk, looser,
  at 36.7. **Worth knowing before a sixth page reaches for an aerial.**

**The dark-mode search UI was not searched for at all.** Financial Services
recorded that every one in the free licence is a named product, Construction
re-confirmed it, and that file's own advice is "do not spend another round on it —
shoot the idea instead". `resto-svc-seo` is a **blank** lit screen in a black
room: no product, no app icons, no query, and a better picture of a 2am search
than a screenshot of somebody else's search box.

### The landing card is kept, not replaced

Construction declared a fifteenth file so `make industry-images` would import a
replacement for the `/industries/` Construction card, which was on a
**placeholder** — a `house-loan-estate-sell-mortgage-concept` stock frame with a
comment saying no construction photograph existed in the library.

**The Restoration card is not on a placeholder.** It points at
`restoration-worker` (2094), a real attachment, and it was examined on the built
page before this build began rather than replaced on principle. It is kept, for
three reasons in the order they matter:

1. **It is one of the seven cutouts that make that grid a set.** Section 2 of
   `industries.css` gives `.bg-img img` `object-fit: contain` by default because
   most of those cards are transparent-PNG cutouts of a single worker; Law Firms,
   Financial Advisors, Medical Practices and Nonprofits are the same treatment.
   A full-bleed photograph would make Restoration the odd card out — which is
   the exact fault the Law Firms card was fixed for.
2. **It passes the one measurement that card has to pass.** `industries.css` sets
   the card title and description in white *under* the picture, and this page has
   already had to replace one card photograph whose lower half measured 140/255.
   A cutout on the section ground has no such problem and never will.
3. **It is on subject.** It is a restoration worker. The Construction card was
   replaced because a mortgage stock photo is not a contractor, not because it
   was labelled a placeholder.

What *did* change on that card is its `link`, which was `''` and is now
`/industries/restoration/`. Verified 200 after `make industries`.

## Applying them

```
make industry-images
make industry-detail SLUG=restoration
make industries
make verify
```

The container copy of `/tmp/pillar-images` is **not writable**, so the importer's
download-and-cache path fails inside it. These thirteen were fetched on the host
into this folder first; the importer then reads them with no network at all.

**Re-cutting a file that is already imported takes two steps, not one.**
`pcii_sideload()` matches by attachment slug and returns the existing id without
looking at the bytes, so a re-cut JPEG is silently ignored. Delete the attachment
first:

```
make wp CMD="post delete $(make wp CMD='post list --post_type=attachment --name=resto-hero --field=ID') --force"
make industry-images
make industry-detail SLUG=restoration
```

The rebuild is not optional — the new attachment gets a new id, and
`_elementor_data` stores the id alongside the URL.

## Hospitality & Travel page — fourteen photographs

`/industries/hospitality-travel/`, imported by `make industry-images` and declared
in `scripts/content-industries/hospitality-travel.php`.

**Fourteen: thirteen page slots plus one landing card.** Construction's
arrangement rather than Restoration's. `trav-industries-card` is not rendered by
the Industry Detail page at all — it is declared in that file so the importer
picks it up, and it is the photograph on the **ninth** card this build added to
the `/industries/` landing page. See "The landing page gained a card" below,
which is the first time in this family that this has been an addition rather than
a link being filled in.

**Prefix `trav-*` and `trav-svc-*`, not `hosp-*` or `hotel-*`.** The page's
primary keyword is *travel marketing*, not hospitality marketing, so the stems
match what the page is optimised for; and `hotel-` would be wrong on a page whose
`fit` list runs from tour operators to tourism boards to cruise and rail, most of
which are not hotels. `trav-` was free — the 250 checked-in files contain no
`trav`, `hosp` or `hotel` stem, and the nearest neighbour is the unrelated `tv-*`
group.

Every file is a **hand-framed crop, not a straight download**: `url` is
provenance, and the checked-in JPEG is the source of truth. Deleting one and
re-running the importer fetches the ORIGINAL framing back, not this one — re-cut
it instead. **No photograph was darkened in post.** This repository selects on
measurement; it does not edit exposure. Where a number moved it moved because the
crop moved, and the crop is recorded.

Free Unsplash Licence throughout (`images.unsplash.com/photo-*`). No
`plus.unsplash.com` and no `premium_photo-*`: that is a paid subscription
licence, and the filter has to reject `premium_photo-` **by name**, because
`premium_photo-1673…` contains the substring `photo-1673…`. The cutting script
asserts that substring is absent from every id and refuses any id that does not
start with `photo-`, before it writes a file.

**Every credit below was confirmed twice.** Once off the rendered *search* page
that surfaced it, by mapping the grid's `img[src]` to its own `a[href^="/@"]` —
which is also the only way to learn the photo page's slug, since the page URL is
not derivable from the CDN id. And once off the photo's **own page**, where the
CDN id recorded here was confirmed present in that page's markup and the page
title carried "Free Photo on Unsplash". 13/13 passed both. None is from memory.

**The Anubis gate is not random, and this is the finding worth keeping.** The
precedents describe the bulk-fetch shortcut as "a gate that opens and closes".
It is a **user-agent check**. Every request made with headless Chrome's default
UA returned the challenge page ("Oh noes!") or a 403 on `/napi/`; every request
made with a real desktop UA string went straight through, on both `/s/photos/`
and `/photos/`. Plain `curl` is refused outright whatever the UA — the challenge
needs a real JS engine. So: drive a real browser, set a real UA, and both the
search grid and the photo page are readable. Do not spend a round on this again.

| File | Slot | Cut | Lum | Subject | Unsplash id | Credit |
|---|---|---|---|---|---|---|
| `trav-hero.jpg` | §1 hero | 2000×1000 | 42.0 | Overwater bungalows lit warm against a black sky, reflections on dark water | `photo-1774442960704-ae246b01f28d` | R.W |
| `trav-quick-answer.jpg` | §3 quick answer | 1400×1400 | 41.3 | A hotel bar and terrace open to a dark lawn at night | `photo-1735494630929-d82e8f7d1977` | Abishanth Ahilan |
| `trav-checkout.jpg` | §5 card 1 | 1116×1800 | 18.1 | A lit ATM sign on a dark wall at night | `photo-1778085285953-3840c86c3b74` | Gabriel Gilmore |
| `trav-aggregator.jpg` | §5 card 2 | 1116×1800 | 50.9 | A bank of closed ticket gates in a dim hall at night | `photo-1766521661173-b69413ac9531` | Ivan Baton |
| `trav-stockphoto.jpg` | §5 card 3 | 1116×1800 | 41.6 | A block of identical balconies at night, one window lit | `photo-1781453861998-409dc1e6feca` | Julien |
| `trav-svc-video.jpg` | §7 row 01 | 1200×1500 | 44.1 | A hand holding a camera out over a street at night, bokeh behind | `photo-1627126974256-54254f660e3b` | HamZa NOUASRIA |
| `trav-svc-seo.jpg` | §7 row 02 | 1200×1500 | **10.1** | A hand holding a phone up in a dark room, screen the only light | `photo-1537979072594-d5d8d7874459` | Emilie Cotterill |
| `trav-svc-reviews.jpg` | §7 row 03 | 1200×1500 | 49.2 | A hand writing on paper by candlelight, the table in darkness | `photo-1706726080890-e004621ba852` | Lara John |
| `trav-svc-ppc.jpg` | §7 row 04 | 1200×1500 | 18.9 | Large lit numerals standing in a black room | `photo-1740062450744-2e295c2512fc` | Jesús Vidal |
| `trav-svc-email.jpg` | §7 row 05 | 1200×1500 | 22.4 | Handwritten letters heaped on a dark table beside one lit candle | `photo-1706726633556-478df028832a` | Lara John |
| `trav-svc-brand.jpg` | §7 row 06 | 1200×1500 | 10.3 | Two neon signs on a dark building, reading BAR and HOTEL | `photo-1728485837856-6e99f70dca33` | Rafael Garcin |
| `trav-svc-social.jpg` | *retired* | 1200×1500 | 49.1 | A man from behind filming a lit street on his phone at night | `photo-1768732774706-c83796d38ef1` | Kevin Woblick |
| `trav-compare.jpg` | §10 compare | 1120×1600 | 22.1 | A dark hotel lobby at night, two runs of wall lamps receding | `photo-1749788873243-65087660f55c` | Dmitry Spravko |
| `trav-cta.jpg` | §13 closing band | 1400×1400 | 30.4 | A timber lodge lit warm at night, dark trees closing in | `photo-1769859228347-739f86098a49` | Kerem Öz |
| `trav-industries-card.jpg` | landing card | 1920×1080 | 40.4 | The hero frame, re-cut landscape | `photo-1774442960704-ae246b01f28d` | R.W |

**§7 was reordered and one card replaced by the 2026-09-12 copy revision.** That
brief folds paid social into the Pay Per Click card and has no standalone social
service, so row 06 became *Email Marketing and Automation* and moved to row 05.
`trav-svc-email.jpg` is `dine-svc-email.jpg` copied byte for byte — §7's slot is
a fixed `aspect-ratio: 4 / 5` and that file is already 1200×1500, so a crop cut
for restaurants' §7 is cut for this one exactly. It is the only `*-svc-email`
crop on the shelf with no screen in it, which is what this page's photographic
argument needs. `trav-svc-social.jpg` is retired from the page but still
declared and still imported, so the stem stays documented.

### Why each ratio

Unchanged from the five siblings, because the slots are unchanged. Each is an
`object-fit: cover` box whose aspect ratio **moves with the viewport** — §3 runs
0.732 at 1280 and 1.059 at 1792, §13 runs 0.633 and 1.157 — so `cover` will not
frame a photograph for you and each file is cut to its slot:

```
§1  hero          2000x1000  2.00  full-bleed background band, stable
§3  quick answer  1400x1400  1.00  spans 0.732-1.059, so square
§5  bento x3      1116x1800  0.62  spans 0.605-0.649
§7  index x6      1200x1500  0.80  fixed by pc-components.css, exact
§10 compare       1120x1600  0.70  spans 0.590-0.800
§13 closing band  1400x1400  1.00  spans 0.633-1.157, so square
--  landing card  1920x1080  1.78  matches pro-industries-card
```

A square is the only shape that survives §3 and §13. **Verified on the built
page** — every one of the fourteen serves at exactly its slot ratio, and all
fourteen return 200 at their original bytes.

### The double bind: this page's copy attacks bright travel imagery by name

Travel stock is overwhelmingly bright, which was expected — it is the same wall
Construction hit with daylight. What is new is that **the copy insults the
imagery**:

- §5 card 3 — "the same *luxury, comfort, unforgettable* sh\*t every property on
  earth slaps up, so you blend into a sea of identical beach shots"
- §8 aside — "(No, we're not going to slap a sunset on a discount and pray
  someone books.)"
- §10 row 3, Generic Agencies column — "A stock sunset"

So dark is not merely a legibility rule on this page. It is **the differentiator
the copy is asking for**, and a bright frame would not just measure badly, it
would put the page in its own comparison table's losing column. The test applied
to every candidate before any of them was measured: *would this frame fit in the
"Generic Agencies" column?* If yes, rejected on sight.

Banned on this page specifically, and not one file breaks it: no sunsets, no
daytime beaches, no blue-sky pool loungers, nothing that reads as the
travel-brochure look. Rejected on that rule alone, all of them otherwise usable
and several well exposed: `photo-1781457588338` (a lit pool at a Mediterranean
resort at night — night, and still a brochure), `photo-1560200353` (hotel and lit
pool with sun loungers), `photo-1787059717832` (a grand hotel mirrored in a pool
with lit palms, the best-composed brochure frame found), `photo-1741981439993`,
`photo-1784136372956` (the hero's own subject against a sunset),
`photo-1626469090562`.

**Which searches worked, for the next travel page.** Productive:
`overwater bungalow night`, `hotel bar night`, `hotel reception desk night`,
`hotel corridor night`, `cabin lit at night`, `lodge fireplace night`.
Unproductive at any hour: every query containing `resort`, `pool` or `beach` —
`resort at night` returns snow and sunsets, `hotel pool at night` is a brochure
catalogue. **Search the building and the light, not the holiday.**

All thirteen page files came in between **10.1 and 50.9** on the whole-crop mean
against the family's 8–90 band, with **no exception spent**. That is a tighter
spread than Restoration's 12.9–51.3 and much harder won: Restoration's copy is
set at 2am, so its honest photograph was already dark, whereas this page had to
find night in an industry that photographs itself in daylight on principle.
Eleven of the thirteen are literally night photographs; the other two are unlit
rooms.

### The hero, measured on the built page — and why the file measurement lied

**Measuring the file is not measuring the hero.** The hero paints into a box that
is 1900×812.5 at a 1920 viewport — ratio 2.339 — and the file is 2.000. `cover`
scales the file to 1900 wide, overshoots the box height by 137.5px, and crops
68.75px off the top and bottom. The band on screen is **file y 0.0724–0.9276**,
not 0–1, so every type region maps onto a different part of the file than its own
fraction suggests, and the lit strip's share of the headline band goes up.

This file was first cut at **cy 0.54**, which measured H1 b5 **129.7** against the
file's own geometry — a pass against the ~130 target. On the built page the same
file measured **138.3**. The crop was wrong and the measurement was flattering it.

The second sweep was run against the **rendered** geometry, using type regions
read off the built page (H1 x 0.166–0.739 y 0.222–0.550 of the hero box, accent
x 0.166–0.249 y 0.558–0.599, body x 0.166–0.439 y 0.658–0.883) mapped back
through that 0.0724–0.9276 band:

```
cy 0.54   H1 b5 140.1   accent 37.9   body 24.5   over target
cy 0.50   H1 b5 139.0   accent 36.0   body 38.9   over target
cy 0.46   H1 b5 139.0   accent 22.9   body 48.8   over target
cy 0.44   H1 b5 114.1   accent 19.9   body 55.2
cy 0.42   H1 b5  82.3   accent 40.5   body 55.2   TAKEN
cy 0.38   H1 b5  70.7   accent 50.9   body 49.5   darker, and rejected
```

There is a **cliff between 0.46 and 0.42**: it is the roofline of the huts
crossing the bottom edge of the headline block. 0.42 is the first cut clear of it.
0.38 measures better still and was not taken — it pushes the huts onto the bottom
edge of the rendered band and cuts their reflections off entirely, leaving a hero
that is four-fifths empty sea and sky, which is the "photograph of nothing" trap
Financial Services recorded against `photo-1630107753878`.

**Final numbers, measured on the built page at 1920 with every text node hidden,
so they are the photograph and not the white letters on it:**

```
H1      1089x267 @(325,285)     59.7 mean,  83.3 b5
accent   159x33  @(325,558)     22.8 mean,  41.1 b5
body     520x183 @(325,639)     33.9 mean,  56.5 b5
```

Worst region **83.3** against a target of ~130. The family: `law-hero` 25,
`fin-hero` 48, `build-hero` 82.6, `resto-hero` 106.3, `pro-hero` 127.

**The accent and the button are not gates on this page.** The accent is
`.nm-hero-1-subtitle span`, 159×33 — a short label at the far *left* of the band,
where this frame is dark at every cy. An earlier sweep assumed a full-width gold
rule at x 0.152–0.848 and produced a fake 225.9 reading at cy 0.42 that nearly
cost the page its best crop. The button is `a.nm-pr-btn-1`, a solid
`rgb(210, 151, 55)` pill with `#0E0E0E` text and no background image, so what
sits behind it is irrelevant; it lands on the reflections and that is fine.

**The three alternative heroes were measured against the same geometry and all
three are worse**, so this frame is not merely the nicest one:
`photo-1758612853656` (a villa on a dark hillside, whole 15.1 and the darkest
frame in the whole pool) reads H1 b5 233.7–242.0, because its one lit building
sits dead centre; `photo-1786698853070` (a temple silhouette over a glowing city)
152.9–186.3; `photo-1735494630929`, the frame that shipped as
`trav-quick-answer`, 208.6–218.7. **A very dark whole-frame mean tells you
nothing about a hero.**

### §5's three cards — one register, and the cleanest set in the family

The register is **a man-made surface in the dark, lit from inside itself.** Card 1
is a sign, card 2 a bank of gates, card 3 a façade. Every one is infrastructure
standing between a traveller and the thing they wanted, and in every one the only
light in frame comes out of the obstacle. The section's argument is that the
generic playbook meets the traveller at the machine instead of in the dream, so
the three cards are three machines.

`.bg-img` and `.nm-choose-1-item` carry no scrim — `background-image: none` on
both, checked on the built page — so white title and description sit straight on
the photograph. Measured on the built page at 1920, where each card paints
505×845, with the type hidden:

```
                 whole   lower half   TYPE band     b5
trav-checkout     10.9      1.3        4.1 (438px)   12.6
trav-aggregator   21.9      8.9        8.4 (336px)   24.6
trav-stockphoto   17.0      8.1        8.8 (336px)   23.0
```

Against the fifteen §5 files the five siblings ship (0.8–57.8 on that band, b5
2.0–211) **this is the cleanest set in the family** — top b5 of 24.6 against
Restoration's 134.5 and Law Firms' 211 — and all three lower halves are far under
the ~55 target.

**Why the built numbers are so much darker than the files'**, because the gap is
large enough to look like an error. On the file the same three measure whole
18.1 / 50.9 / 41.6 with type bands of 9.1 / 46.4 / 34.0. The card's `.bg-img` is
a fixed 845px box and each file is 1116×1800, so `cover` keeps roughly the middle
three-quarters of the file's height — and all three crops were cut with their
subject *high* in the frame, so what the card paints in its lower half is the dark
bottom of each file. The file numbers are the conservative ones: trust them when
choosing, and re-measure on the page before recording.

**Where this set is honestly weaker than Restoration's:** subject scale varies.
Restoration got three objects at one room distance. These are a sign at arm's
length, a hall at twenty paces and a building across a street — the compromise
Professional Services recorded against its own §5. It is mitigated but not solved
by the shared register: all three are flat lit surfaces filling the frame, so they
read as a set of textures even though they are not a set of distances. If this
section is ever re-shot, matching the distances is the improvement to make.

### Shots that were rejected, and why — hospitality & travel

Hotel marques, OTA logos and review-site UI are everywhere in this subject matter,
so **rule 9 cost more frames here than on any previous page in this family**. The
copy names Booking and Expedia in the FAQ and **neither mark is anywhere on this
page**. Every finished file was checked at 2.8× brightness and 1.4× magnification,
which is the only check that works on a near-black frame.

Rejected on a third party's branding or a stranger's data:

| id | what it was | what killed it |
|---|---|---|
| `photo-1766164027844` | a grand hotel lit at night, whole 39.2 — one of the two best hero candidates found | a large lit sign reads GRANDHOTEL PUPP across the façade, and the sign *is* the lit part |
| `photo-1636391679819` | a hotel neon at night | the neon is a property's name. Its near-twin `photo-1728485837856` says only BAR and HOTEL, and that is the one that shipped |
| `photo-1683576221423` | a DEPARTS split-flap board, the best "cost-per-booking math" frame in the pool | TWA marks on two rows |
| `photo-1537724326059` | a black card in near-darkness, the brief's literal §5 card 1 subject | a card-network mark dead centre |
| `photo-1718010571964` | a payment terminal in use | MASTERCARD and VISA both legible |
| `photo-1688149013444` | a contactless tap | VISA fills a fifth of the frame |
| `photo-1787551415737` | a card at a terminal on wood | the terminal is a named product |
| `photo-1503792243040` | a key against black, whole 5.1 — the darkest candidate found for any slot | the bow is stamped DOMINION LOCK CO MONTREAL, fully legible at 2.8×, and cropping to the shaft loses the key |
| `photo-1774451606686` | a car at a lowered barrier beside a lit booth at night — the best `trav-aggregator` metaphor found | a legible registration plate, *and* the booth blows the §5 type band to 62–68 in every crop that keeps the barrier. Lost twice over |
| `photo-1758874910859` | a metro exit | SORTIE and two street names |
| `photo-1759300634017` | a convenience store at dusk | the store's name is the brightest thing in it |

Rejected on exposure rather than subject, each of them the front-runner for its
slot when it was cut:

| id | what it was | number |
|---|---|---|
| `photo-1768411263801` | a silhouette with a camera on a waterfront at night — the frame this page wanted for `trav-svc-video`, because no sibling is outdoors by water | whole 88.2 at every crop tried; the city behind it *is* the picture, and cropping the sky out only brings the reflections in |
| `photo-1751759192797` | a green neon ATM in darkness | the neon lands in the §5 type band at 94.6 mean / 186.3 b5 |
| `photo-1735937248405` | a line of red stars rising on black — the brief's literal `trav-svc-reviews` subject, and a rising rating into the bargain | whole **1.7**, b5 **0.9**. Zoom crops at 0.6/0.4/0.3 reached only 4.3/6.2/6.5. The card renders as a black rectangle |
| `photo-1640027659402` | paper stars on grey | whole 76.7, and shot in daylight |
| `photo-1762385055151` | an antique cash register in a dark attic, whole 14.6 — the clean alternative to a branded payment card | at that exposure the register does not resolve *into* a register |

**Too dark is a real failure mode, not a safe direction.** `photo-1735937248405`
is the clearest case in this whole folder: it satisfies the brief's stated subject
exactly, measures far darker than anything else considered, and is unusable. The
line to hold is whether the subject is still legible — `trav-svc-seo` sits at 10.1
and passes it, because there is still a hand, a phone, a sleeve and bokeh.

### What was legible in `trav-aggregator`, and why it is not a rule 9 failure

Checked at 2.4× on a 3× magnification of the gate band, the turnstile signs read
"Выход" and the orange sign at the left edge reads "…ет прохода" — Russian for
*exit* and *no passage*. Those are **public wayfinding words, not a mark, not a
logo and not anybody's data**, which is the distinction Restoration drew when it
rejected `photo-1777894162454` for handwritten ward labels and
`photo-1717298812095` for a manufacturer's logo. Nothing in frame identifies an
operator. Worth recording that the sign reads *no passage*, because that is the
card's own argument written on the obstacle by accident.

### Repetition was the risk again, and it moved three choices

`pro-*` owns thirteen files, `law-*` fourteen, `fin-*` thirteen, `build-*` fifteen
and `resto-*` thirteen, so on the sixth page repetition is the main risk rather
than exposure. Not one file is shared with any sibling. Three choices moved
because of it, and each says so in its own note:

- **`trav-svc-video`** — five sibling video cards and every one is a crew or a
  studio. This is one person shooting hand-held in a street, which is what a
  travel shoot actually is.
- **`trav-svc-seo`** — three siblings already spend a phone in the dark, all three
  at rest (flat in a hand, edge-on, lying on a desk). This one is held *up* at
  arm's length, which is the gesture of looking something up where you are
  standing, and that is the gesture in the card's own sentence.
- **`trav-svc-social`** — `build-svc-social` is a phone on a tripod filming at
  night, so the tripod is not free. That ruled out `photo-1786084390004`, the
  best-composed frame in the pool and near enough a duplicate of the neighbour.

`trav-svc-brand` is also the first brand card in the family that is not a studio
still life: `build-svc-brand` is colour swatches on a black wall, `fin-svc-brand`
black marble, `pro-svc-brand` matte black packaging, `law-svc-brand` wireframes,
`resto-svc-brand` metal type. Five pages, five flat dark surfaces. This one is a
building in a street, which is where a hospitality brand is actually encountered.

**`trav-svc-reviews` had no precedent at all.** No sibling ships a Reviews card —
every previous §7 runs Marketing Strategy in that position, and this brief does
not. It is the only file in this folder chosen with a clean sheet.

The standing bans were honoured: **no gavel** (`pro-rules`, `law-bar-rules`) and
**no chess** (`pro-svc-strategy`). Neither search was run, because nothing in this
brief points at either.

And the dark-mode search UI is **still** a named product, which Financial Services
recorded, Construction re-confirmed and Restoration refused to spend a round on.
This page did not spend one either.

### The landing page gained a card, rather than a link being filled in

Every Industry Detail page built so far found a card already sitting in
`scripts/lib/pc-industries-content.php` with an empty `'link'`, and its build did
nothing there but fill that link in. **There was no hospitality or travel card.**
That file declared exactly eight industries, so this build added a ninth, with
three knock-on effects:

1. **The section heading was a literal count.** It read "Eight Industries. Eight
   Different Playbooks." A ninth card makes that false. It is client copy, so it
   was not changed on the build's own authority — the client was asked and chose
   "Nine Industries. Nine Different Playbooks." over a count-free line that would
   never go stale again.
2. **The grid was measured before and after, at 1920, 1440 and 1154**, because
   eight cards divide cleanly into both a three-column and a two-column grid and
   nine divide cleanly into only one of them:

   ```
   EIGHT CARDS                          NINE CARDS
   1920  402px 402px 402px  3/3/2       1920  402px 402px 402px  3/3/3
   1440  402px 402px 402px  3/3/2       1440  402px 402px 402px  3/3/3
   1154  453px 453px        2/2/2/2     1154  453px 453px        2/2/2/2/1
   ```

   **No override was added.** At 1920 and 1440 the ninth card *improves* the grid:
   nine divides into three columns exactly, so the ragged two-card last row that
   eight always produced is gone. At 1154 there is an orphan, but it measures
   453px — identical to all eight of its neighbours — so section 18 of
   `industry-detail.css`'s bug does not reproduce. The reason is reusable: these
   cards' photographs are `position: absolute` inside `.bg-img`, and an
   out-of-flow child contributes no intrinsic width, so there is no `auto`
   minimum for a bare `1fr` to honour. The §5 cards on the detail pages paint
   their photograph *in flow*, which is the whole difference. Argued in full in
   `industries.css`.
3. **The card needed a photograph**, and it is `trav-industries-card` — 1920×1080,
   matching `pro-industries-card` and `build-industries-card`, whole 40.4 and
   lower half 32.3. The lower half is the number that matters, because that grid
   sets the card title and description in white *under* the picture and the page
   has already had to replace one card photograph whose lower half measured
   140/255.

## Applying them

```
make industry-images
make industry-detail SLUG=hospitality-travel
make industries
make verify
```

The container copy of `/tmp/pillar-images` is **not writable**, so the importer's
download-and-cache path fails inside it. These fourteen were fetched on the host
into this folder first; the importer then reads them with no network at all.

**Re-cutting a file that is already imported takes two steps, not one.**
`pcii_sideload()` matches by attachment slug and returns the existing id without
looking at the bytes, so a re-cut JPEG is silently ignored. This build hit that
when the hero crop was corrected from cy 0.54 to cy 0.42 — delete the attachment
first, then re-import, then rebuild BOTH pages, because the landing card comes
from the same source file:

```
make wp CMD="post delete $(make wp CMD='post list --post_type=attachment --name=trav-hero --field=ID') --force"
make industry-images
make industry-detail SLUG=hospitality-travel
make industries
```

The rebuild is not optional — the new attachment gets a new id, and
`_elementor_data` stores the id alongside the URL.

## Meetings & Events page — fourteen photographs

`/industries/meetings-events/`, imported by `make industry-images` and declared
in `scripts/content-industries/meetings-events.php`.

**Fourteen: thirteen page slots plus one landing card.** Construction's and
Hospitality's arrangement. `event-industries-card` is not rendered by the
Industry Detail page at all — it is declared in that file so the importer picks
it up, and it is the photograph that **replaces the last placeholder** on the
`/industries/` landing page. See "The landing page lost its last placeholder"
below.

**Prefix `event-*` and `event-svc-*`.** Free, and the readable choice: the 263
checked-in files contained no `event`, `venue` or `meet` stem, and `venue-` would
be wrong on a page whose `fit` list runs from planners to AV companies to
destination management companies, none of which is a venue.

Every file is a **hand-framed crop, not a straight download**: `url` is
provenance, and the checked-in JPEG is the source of truth. Deleting one and
re-running the importer fetches the ORIGINAL framing back, not this one — re-cut
it instead. **No photograph was darkened in post.** This repository selects on
measurement; it does not edit exposure. Where a number moved it moved because the
crop moved, and the crop is recorded.

Free Unsplash Licence throughout (`images.unsplash.com/photo-*`). No
`plus.unsplash.com` and no `premium_photo-*`: that is a paid subscription
licence, and the filter has to reject `premium_photo-` **by name**, because
`premium_photo-1673…` contains the substring `photo-1673…`. The cutting script
asserts that substring is absent from every id and refuses any id that does not
start with `photo-`, before it writes a file.

**Every credit below was read off the photo's own rendered page**, where three
things were checked together: the CDN id recorded here is present in that page's
markup, the page title carries "Free Photo on Unsplash", and the photographer's
name comes from that page's JSON-LD `author.name` **rather than from the profile
slug** — `@headwayio` is "Headway" and `@tama66` is "Peter Herrmann", so the slug
is not the credit. 14/14 passed. None is from memory.

**The Anubis gate is a user-agent check, and Hospitality's finding held exactly.**
Plain `curl` to unsplash.com is refused with a **401** whatever the UA; a real
browser walks straight through both `/s/photos/` and `/photos/`. The CDN itself
(`images.unsplash.com`) is open to `curl`, which is how the sources were fetched.
Do not spend a round on this again.

| File | Slot | Cut | Lum | Subject | Unsplash id | Credit |
|---|---|---|---|---|---|---|
| `event-hero.jpg` | §1 hero | 2000×1000 | 24.0 | A packed audience seated in a darkened hall, a wall of small lights above | `photo-1540575467063-178a50c2df87` | Headway |
| `event-quick-answer.jpg` | §3 quick answer | 1400×1400 | 22.1 | A packed auditorium, a camera operator on a tripod at the back of house | `photo-1763962274119-1a0a0d418520` | Luigi Ritchie |
| `event-sells-room.jpg` | §5 card 1 | 1116×1800 | **10.1** | A black board covered in a regular grid of small coloured lights | `photo-1783729254717-1ffa5830880f` | Liam Scotchmer |
| `event-how-planners-buy.jpg` | §5 card 2 | 1116×1800 | 31.7 | A man in a suit working alone at a lit desk late at night | `photo-1758520144667-3041caeff3c1` | Vitaly Gariev |
| `event-blend-in.jpg` | §5 card 3 | 1116×1800 | 12.0 | A run of identical fluted columns receding into the dark | `photo-1746558615653-72614f54d363` | Amir Arsalan Shamsabadi |
| `event-svc-video.jpg` | §7 row 01 | 1200×1500 | 34.3 | A broadcast camera and operator covering a lit event | `photo-1591635326635-4098686c678b` | John Benitez |
| `event-svc-seo.jpg` | §7 row 02 | 1200×1500 | 50.6 | A lightbox wall holding hundreds of small illuminated slides | `photo-1717326086495-fced92fb7121` | Peter Herrmann |
| `event-svc-ppc.jpg` | §7 row 03 | 1200×1500 | 14.3 | A red LED display reading 4:59, alone in a black room | `photo-1658330288588-d460ff76c597` | max im |
| `event-svc-brand.jpg` | §7 row 04 | 1200×1500 | 42.0 | A banquet table under candlelight, place settings running into the dark | `photo-1770217614410-61afadc4f220` | Alexander Mass |
| `event-svc-social.jpg` | §7 row 05 | 1200×1500 | 31.9 | Dozens of photographic prints pinned on a wall, lit by one warm lamp | `photo-1754044818336-b8200b13ffa4` | Minh Khang Le |
| `event-svc-automation.jpg` | §7 row 06 | 1200×1500 | 33.9 | A backlit laptop keyboard glowing in an otherwise dark room | `photo-1612383401597-cdfb8bdfa0d9` | Christian Lue |
| `event-compare.jpg` | §10 compare | 1120×1600 | 19.8 | A colonnade at night, uplit columns receding to a lit doorway | `photo-1764532189911-7e4dd8225f8a` | Luyi He |
| `event-cta.jpg` | §13 closing band | 1400×1400 | 43.3 | A speaker seen from behind facing a packed tiered auditorium | `photo-1544531586-fde5298cdd40` | Miguel Henriques |
| `event-industries-card.jpg` | landing card | 1920×1080 | 24.0 | The hero frame, re-cut landscape | `photo-1540575467063-178a50c2df87` | Headway |

### Why each ratio

Unchanged from the six siblings, because the slots are unchanged. Each is an
`object-fit: cover` box whose aspect ratio **moves with the viewport** — §3 runs
0.732 at 1280 and 1.059 at 1792, §13 runs 0.633 and 1.157 — so `cover` will not
frame a photograph for you and each file is cut to its slot:

```
§1  hero          2000x1000  2.00  full-bleed background band, stable
§3  quick answer  1400x1400  1.00  spans 0.732-1.059, so square
§5  bento x3      1116x1800  0.62  spans 0.605-0.649
§7  index x6      1200x1500  0.80  fixed by pc-components.css, exact
§10 compare       1120x1600  0.70  spans 0.590-0.800
§13 closing band  1400x1400  1.00  spans 0.633-1.157, so square
--  landing card  1920x1080  1.78  matches pro-industries-card
```

A square is the only shape that survives §3 and §13. **Verified on the built
page** — every one of the fourteen serves at exactly its slot ratio (hero
1920×960 = 2.000, §3 and §13 1919×1919 = 1.000, §5 1919×3096 = 0.620, §7
1920×2400 = 0.800, §10 1920×2742 = 0.700) and all fourteen return 200.

### The room must be full: this page's copy dictates content, not just exposure

Dark was cheap here and everybody expected it to be. An awards night, a keynote,
a banquet under warm light and a gala are all naturally dark photographs, and the
exposure numbers came in without a fight — **10.1 to 50.6 whole-crop mean against
the family's 8–90 band, with no exception spent.** What this page's copy demands
instead is *content*:

- §1 hero — "a packed, buzzing, flawless event"
- §8 aside — "(No, we're not going to post a photo of empty chairs and call it a
  campaign.)"
- §5 card 1 — "Capacity charts and floor plans, the dull stuff"
- §5 card 3 — "every other ballroom with a chandelier"
- §10 row 2, Generic Agencies column — "A photo of empty chairs"

Banned on this page specifically, and not one file breaks it: **no empty chairs,
no empty rooms, no floor plans, no capacity diagrams, no chandelier-ballroom
shot.** The test applied to every candidate before any of them was measured is
Hospitality's: *would this frame fit in the "Generic Agencies" column of this
page's own comparison table?* If yes, rejected on sight. An empty venue here
would put the page's own insult on its own wall.

**That ban collided with the brief's own subject for §5 card 1**, and it is the
one place this build departed from the subject table. The table asks for "a plan
or spec sheet on a dark desk"; the definition of done says "not one of them … a
floor plan". Both cannot be satisfied literally, and the intent behind them is
the same — card 1 is the dull artefact, the data instead of the night — so the
slot took a frame that is the artefact without being the banned object. Cut and
rejected reaching that: `photo-1549828043` (a dark desk under a lamp with rolled
technical drawings and a spreadsheet on the monitor, whole 20.8 — the literal
subject, and it has both rolled plans *and* an empty desk chair in frame) and
`photo-1616441065120` (a blank black card on lit wood, whole 42.1 — the
"photograph of nothing" trap).

### And it must not read as a nightclub

Dark plus crowded plus coloured lighting slides into concert territory in about
one search, and that is the wrong buyer. Every crowd frame in this set is
**seated, dressed and deliberate**. Rejected on that rule alone, all well
exposed: `photo-1626125345510` (hands up, stage haze — a gig),
`photo-1603985863797` (teal-and-magenta stage, silhouetted arms, whole 37.2),
`photo-1769889882240` (a filmmaker working a gimbal *at an event*, whole 30.4 and
the best "an event being filmed" frame in the pool — lost on its venue, a tent
under blue and pink wash with a standing crowd), `photo-1764593820436` (a
dancefloor, named in the brief as the thing to avoid), and
`photo-1707079422190` / `photo-1512573314` / `photo-1558391131`
(crowd-at-a-party frames, all three concert-shaped).

### Rejected on third-party branding or personal data

This mattered more here than on any previous page in the family: event
photography is full of sponsor boards, step-and-repeats, logo'd lecterns and name
badges. Every finished file was checked at 2.8× brightness and 1.4×
magnification, the only check that works on a near-black frame.

- `photo-1758799009559` — a colonnade at night, whole 41.2 and the front-runner
  for `event-compare`; **cut, measured and shipped-ready before the check.** A
  lit sign in the middle distance reads VILLA MAKUNA BOX OFFICE, dead on the
  vanishing point where no crop reaches it without losing the perspective that
  made the frame. Replaced by `photo-1764532189911`, which measures better anyway.
- `photo-1768396855390` — a gala with a stage and seated guests, on subject and
  the right kind of room. A large red LED sign across the back wall carries the
  organisation's name and the event title. Unrecoverable: the sign is the lit part.
- `photo-1582192730841` — an auditorium panel, whole 21.6; the screen reads "…CON"
  and carries a product mark.
- `photo-1587825140708` — a fisheye of a packed hall, three screens of legible
  conference copy.
- `photo-1543980932` — an audience clapping, whole 34.1; a banner carries a
  company name.
- `photo-1647067517631` — a lit grid of engraved names, whole 56.2 and the best
  literal "spreadsheet" frame found. The cells are a donor wall, so the grid is
  several hundred people's names.
- `photo-1666027092835` — a stopwatch reading 00:00.00, the neatest response-time
  metaphor in the pool. It is a screenshot of a named operating system's clock app.

**The one mark left in frame,** recorded rather than hidden: `event-svc-video`
carries "perfect bal…" moulded into the tripod head — a fluid-head feature label,
not a maker's name. It resolves only at 3.2× brightness and heavy magnification
and is invisible at the size the card paints. Nothing else in the fourteen
carries a legible word.

### The hero: two type regions pulling in opposite directions

Measured on the **brightest 5%** of each type region, mapped through the rendered
geometry: the hero box is 1900×812.5 at a 1920 viewport (ratio 2.339) while the
file is 2.000, so `cover` shows file y 0.0724–0.9276. Type regions in box
coordinates are H1 x 0.166–0.739 y 0.222–0.550, accent x 0.166–0.249 y
0.558–0.599, body x 0.166–0.439 y 0.658–0.883.

```
cy 0.42   H1  30.1   accent 150.0   body 192.3   body fails
cy 0.46   H1  71.5   accent 196.1   body 156.1   body fails
cy 0.48   H1 104.7   accent 195.0   body 132.4   body marginal
cy 0.49   H1 124.7   accent 171.2   body 120.7   TAKEN
cy 0.50   H1 143.7   accent  89.1   body 107.1   H1 fails
cy 0.54   H1 181.1   accent  86.7   body  61.3   H1 fails
```

The bright thing in this frame is a horizontal band of ceiling lights across the
upper third: slide the crop up and it leaves the headline and lands on the body
copy, slide it down and the reverse. **cy 0.49 is the crossover and the only cut
where both gates clear ~130.** Against the family at `law-hero` 25, `fin-hero`
48, `trav-hero` 83, `build-hero` 82.6, `resto-hero` 106.3 and `pro-hero` 127.

**Zooming is not the answer and it was tried properly.** A 0.60–0.75 zoom low in
the frame excludes the light band entirely and measures beautifully — z 0.65
cx 0.28 reads H1 b5 59.6, accent 20.4, body 27.2 — and every one of those crops
was rejected on *what it shows*: at that magnification the frame stops being a
full room and becomes four or five strangers' heads at portrait scale, which
loses the only thing the hero is there to say. The wide frame is the picture; the
measurement is the constraint, not the goal.

### §5: measure the title box, not a half of the file

The three cards paint 505×845 at a 1920 viewport with the white title and
description sitting **straight on the photograph** — `.bg-img` and
`.nm-choose-1-item` carry no scrim, verified on the built page. Measured on the
built page against the real `.title` and `.disc` boxes:

| file | lower half | `.title` | `.disc` |
|---|---|---|---|
| `event-sells-room` | 9.6 | 9.2 / b5 127.7 | 7.6 / b5 113.7 |
| `event-how-planners-buy` | 41.0 | 38.8 / b5 153.4 | 43.1 / b5 190.0 |
| `event-blend-in` | 12.8 | 12.0 / b5 36.2 | 14.1 / b5 34.5 |

All three lower halves are far under the ~55 target and every band is inside the
family's §5 range of 2.0–211.

**`event-blend-in` is the second frame cut for that slot, and the first one
failed on the built page rather than on the file.** `photo-1767500263347` — six
warm cylindrical pendant lamps hung in a line in a dark panelled room — was cut,
measured, imported and shipped before the check that caught it. It is a better
picture and a much more venue-ish one, and on the file it looks fine: whole 21.3,
lower half 28.4. On the built card it is the worst §5 file this family has
produced: `.title` **38.5 mean / 249.2 b5**, with `.disc` at 7.4 / 16.8. The
description is nearly black and the *title* sits squarely on a lit lamp. The
lamps hang across source y 0.30–0.75 and `cover` shows the whole file height in
the 845px card, so the title strip lands on lamp bodies at every cut — cx 0.20
reads 250.4, cx 0.80 reads 244.8 — and the zoomed crops that do clear it
(z 0.60–0.70 at cy 0.75, b5 15.5–17.0) get there by cropping down to one lamp,
which deletes the repetition the card exists to show.

**The lesson, and it is `trav-hero`'s lesson in a different form: measuring the
file is not measuring the card.** A lower-half mean of 28.4 passed the ~55 target
comfortably and hid a 249 highlight sitting exactly where the title goes. Measure
the `.title` and `.disc` boxes on the built page, not a half of the file.

### Where this set is honestly weaker

**Three grids.** `event-svc-seo` is a lightbox wall of slides, `event-svc-social`
is a wall of pinned prints, and `event-sells-room` is a board of lit cells. They
read differently and sit in different sections, but three grids on one page is
one more than this family has shipped before. The alternative was worse in every
case tried: the non-grid candidates for those slots were either a second
keyboard, a second phone-at-night (`trav-svc-seo` and `trav-svc-social` already
own that between them), or a frame rejected above.

**Two colonnades.** `event-blend-in` and `event-compare` are both runs of
columns — a close, cold, carved stone detail and a wide, warm, modern walkway,
eight sections apart, but the same building type twice. It is the price of
replacing the pendant-lamp frame late.

**One monochrome file.** `event-quick-answer` is near-desaturated, the only such
file in seven pages. It was taken anyway because it is the best "packed room,
mid-event, being filmed" photograph found by a distance, and because §3 sets its
picture in its own column beside the copy, where a monochrome frame reads as a
deliberate plate rather than as a mistake.

**Subject scale varies across §5** — a flat surface at arm's length, a person at
desk distance, a fitting at room distance — which is the compromise
professional-services and hospitality-travel both recorded against their own §5.
It is mitigated but not solved by the shared register: all three are emitting
light into a black frame.

### The landing page lost its last placeholder

The Meetings & Events card on `/industries/` carried
`business-meeting-night_53876-89025` (840) under a comment reading "PLACEHOLDER:
no conference or venue photograph exists. Closest available. Replace before
go-live." Thirteen now exist. Both the placeholder and the comment describing it
are gone from `scripts/lib/pc-industries-content.php` — the Construction card's
treatment exactly — and the card's empty `'link'` is filled in with
`/industries/meetings-events/`, verified 200 after `make industries`.

**The card count heading is untouched.** Meetings & Events was one of the original
eight declared cards, so unlike Hospitality & Travel this build adds no card and
the heading still reads "Nine Industries. Nine Different Playbooks."

**And `industries.css`'s `img[src*="business-meeting-night"]` override went with
it.** That rule's own comment said it "is expected to be deleted, not maintained,
once real photography lands", and it was the last of the two. What remains in
section 2 of that file is the `object-fit: contain` default alone.

`event-industries-card` is a landscape re-cut of this page's own hero — the same
arrangement `build-industries-card` and `trav-industries-card` use, so the card
and the page it opens are the same picture. 1920×1080, matching
`pro-industries-card`. Whole-crop mean 24.0/255 and **lower half 28.4**, and the
lower half is the number that matters, because that grid sets the card title and
description in white *under* the picture and this page has already had to replace
one card photograph whose lower half measured 140/255.

## Applying them

```
make industry-images
make industry-detail SLUG=meetings-events
make industries
make verify
```

The container copy of `/tmp/pillar-images` is **not writable**, so the importer's
download-and-cache path fails inside it. These fourteen were fetched on the host
into this folder first; the importer then reads them with no network at all.

**Re-cutting a file that is already imported takes two steps, not one.**
`pcii_sideload()` matches by attachment slug and returns the existing id without
looking at the bytes, so a re-cut JPEG is silently ignored. This build hit that
when `event-blend-in` was replaced — delete the attachment first, then re-import,
then rebuild:

```
make wp CMD="post delete $(make wp CMD='post list --post_type=attachment --name=event-blend-in --field=ID') --force"
make industry-images
make industry-detail SLUG=meetings-events
```

The rebuild is not optional — the new attachment gets a new id, and
`_elementor_data` stores the id alongside the URL. Rebuild `make industries` too
if the file you re-cut is `event-industries-card` or the hero it is cut from.

## Medical Practices page — fourteen photographs

`/industries/medical-practices/`, imported by `make industry-images` and declared
in `scripts/content-industries/medical-practices.php`.

**Fourteen: thirteen page slots plus one landing card.** Construction's,
Hospitality's and Meetings & Events' arrangement. `med-industries-card` is not
rendered by the Industry Detail page at all — it is declared in that file so the
importer picks it up, and it is the photograph that **replaces `doctor-smiling`
(2088)** on the `/industries/` landing page. That card was **not** a placeholder;
see "The landing card was replaced, not filled in" below.

**Prefix `med-*` and `med-svc-*`.** Free, and checked before it was used: the 278
checked-in files contain no `med-` stem. `media-*` exists (14 files, the Media
Production service page) and does not collide — the importer matches on the whole
attachment slug, so `med-hero` and `media-hero` are two different attachments.

Every file is a **hand-framed crop, not a straight download**: `url` is
provenance, and the checked-in JPEG is the source of truth. Deleting one and
re-running the importer fetches the ORIGINAL framing back, not this one — re-cut
it instead. **No photograph was darkened in post.** This repository selects on
measurement; it does not edit exposure. Where a number moved it moved because the
crop moved, and the crop is recorded.

Free Unsplash Licence throughout (`images.unsplash.com/photo-*`). No
`plus.unsplash.com` and no `premium_photo-*`: that is a paid subscription
licence, and the filter has to reject `premium_photo-` **by name**, because
`premium_photo-1673…` contains the substring `photo-1673…`. The cutting script
asserts that substring is absent from every id and refuses any id that does not
start with `photo-`, before it writes a file. 14/14 passed.

**Every credit below was read off the photo's own rendered page**, where three
things were checked together: the CDN id recorded here is present in that page's
JSON-LD `contentUrl`, the page title carries "Free Photo on Unsplash", and the
photographer's name comes from that page's JSON-LD `author.name` rather than from
the profile slug. 13/13 distinct sources passed. None is from memory. One name
carries a camera emoji on Unsplash ("Bernd 📷 Dittrich") and is credited without
it.

**The gate is a user-agent check**, and the last two pages' finding held exactly.
Plain `curl` to unsplash.com is refused with a **401** whatever the UA; a real
browser walks straight through both `/s/photos/` and `/photos/`. The CDN itself
(`images.unsplash.com`) is open to `curl`, which is how the sources were fetched.
Do not spend a round on this again.

| File | Slot | Cut | Lum | Subject | Unsplash id | Credit |
|---|---|---|---|---|---|---|
| `med-hero.jpg` | §1 hero | 2000×1000 | 16.2 | A calm interior at night, arched doorways and a staircase lit warm | `photo-1764061972408-6eaa446932e3` | Hammilton Ojijo |
| `med-quick-answer.jpg` | §3 quick answer | 1400×1400 | 46.0 | A man in an armchair being filmed, boom mic and softbox on stands | `photo-1602743297108-4c9061884285` | Jonah De Oliveira |
| `med-no-trust.jpg` | §5 card 1 | 1116×1800 | 23.5 | A row of identical empty moulded seats in cold blue-grey light | `photo-1771707691434-12ea601b5c2b` | Cansu Sarp |
| `med-wrong-clicks.jpg` | §5 card 2 | 1116×1800 | 19.5 | A red line falling across a dark screen, out of focus | `photo-1639754390580-2e7437267698` | Behnam Norouzi |
| `med-reviews-rot.jpg` | §5 card 3 | 1116×1800 | 38.0 | A single lit paper star hanging on a thread in a black frame | `photo-1766318981697-629f139c9f0c` | Joanna |
| `med-svc-video.jpg` | §7 row 01 | 1200×1500 | 54.8 | A camera monitor showing a lone figure standing in a lit space | `photo-1496680392913-a0417ec1a0ad` | Jakob Owens |
| `med-svc-seo.jpg` | §7 row 02 | 1200×1500 | 26.1 | A blank illuminated sign box on a dark building at night | `photo-1707066155653-d187e6f1386f` | Mohammad Reza |
| `med-svc-ppc.jpg` | §7 row 03 | 1200×1500 | 64.0 | A single dart standing in the bullseye of a dark dartboard | `photo-1761226938600-14bedd26d145` | Taven |
| `med-svc-reviews.jpg` | §7 row 04 | 1200×1500 | 24.0 | A five-pointed star of hundreds of small warm lights, on black | `photo-1670359548666-eceb6afbaef4` | Bernd Dittrich |
| `med-svc-brand.jpg` | §7 row 05 | 1200×1500 | **14.8** | An illuminated cross glowing over an empty wet street at night | `photo-1776900976077-f90f854e0f69` | Maria Vasiliki Kassou |
| `med-svc-email.jpg` | §7 row 06 | 1200×1500 | **8.3** | A digital clock face reading 23:14 in an otherwise black room | `photo-1778136157872-44684bf44c57` | Hadi Samadzad |
| `med-compare.jpg` | §10 compare | 1120×1600 | 11.3 | A symmetrical corridor of closed doors, one lit door at the end | `photo-1685107306307-147226ea476f` | Maxim |
| `med-cta.jpg` | §13 closing band | 1400×1400 | 66.5 | MEDICAL CLINIC in red neon above a shuttered entrance at night | `photo-1631507623442-fee09e89c6a8` | Erik Mclean |
| `med-industries-card.jpg` | landing card | 1920×1080 | 15.3 | The hero frame, re-cut landscape | `photo-1764061972408-6eaa446932e3` | Hammilton Ojijo |

`med-svc-email` at 8.3 is the second-darkest file in the family, behind
`build-svc-email` at 8.7. `med-cta` at 66.5 is the brightest here and still well
inside the family's 8–90 band. **No exception was spent on this page.**

### Why each ratio

Unchanged from the seven siblings, because the slots are unchanged. Each is an
`object-fit: cover` box whose aspect ratio **moves with the viewport** — §3 runs
0.732 at 1280 and 1.059 at 1792, §13 runs 0.633 and 1.157 — so `cover` will not
frame a photograph for you and each file is cut to its slot:

```
§1  hero          2000x1000  2.00  full-bleed background band, stable
§3  quick answer  1400x1400  1.00  spans 0.732-1.059, so square
§5  bento x3      1116x1800  0.62  spans 0.605-0.649
§7  index x6      1200x1500  0.80  fixed by pc-components.css, exact
§10 compare       1120x1600  0.70  spans 0.590-0.800
§13 closing band  1400x1400  1.00  spans 0.633-1.157, so square
--  landing card  1920x1080  1.78  matches pro-industries-card
```

A square is the only shape that survives §3 and §13. **Verified on the built
page** — all fourteen serve at exactly their slot's ratio (hero 2.000, §3 and §13
1.000, §5 0.620, §7 0.800, §10 0.700, card 1.778) and all fourteen return 200.

### Healthcare has limits the other seven pages did not

This is the first page in this family where the binding constraint was not
exposure and not the copy's own insults, but **editorial permission**. Five bans
were applied to every candidate *before* it was measured, and all five threw away
frames that would have measured fine:

- **No patient.** No identifiable person shown receiving care, being examined, in
  a gown, in a bed, or in any frame implying they are a real patient. Patient
  imagery carries consent and privacy expectations a stock licence does not
  settle, and a practice's own marketing is the worst place to be casual about it.
- **No clinical or distressing content.** No needles, injections, blood, wounds,
  surgery, procedures, dental work in progress, exposed anatomy. The page exists
  to calm a frightened person.
- **Nothing that reads as a vulnerable person at a difficult moment.** `fit`
  includes mental health and counselling, paediatrics and women's health: no
  children with clinicians, no therapy-session tableaux, no distressed people.
- **No before-and-after or body transformation.** `fit` includes med spas and
  cosmetic clinics, and cosmetic before/after advertising is heavily regulated in
  many jurisdictions. Avoided entirely rather than judged case by case.
- **No drug, device or manufacturer branding**, and nothing implying a specific
  treatment or product.

**And the copy names its own clichés, so those are banned too.** §4 mocks "a stock
photo of a smiling stethoscope"; §5b is "You don't win patients with buzzwords and
a f\*cking stethoscope photo"; §10 row 2 puts "A smiling stethoscope" in the
Generic Agencies column. So: **no stethoscope**, no white-coat-with-clipboard, no
blue-gloved-hands-with-test-tube. Same test as the last three pages: *would this
frame fit in the Generic Agencies column of this page's own comparison table?*

**Slot by slot, what is actually depicted** — none is a patient, a procedure, a
child with a clinician, a distressed person or a cosmetic before/after, and none
is a stethoscope:

| slot | in frame | people |
|---|---|---|
| `med-hero` | a warm-lit interior at night | none |
| `med-quick-answer` | one man being **filmed** on a set | 1, in profile, no clinical content |
| `med-no-trust` | a row of empty moulded seats | none |
| `med-wrong-clicks` | a falling line on a dark screen | none |
| `med-reviews-rot` | a lit paper star on a thread | none |
| `med-svc-video` | a camera monitor, a lone figure in a lit space | 1 at ~1/8 monitor height, no face |
| `med-svc-seo` | a blank illuminated sign box | none |
| `med-svc-ppc` | a dart in a bullseye | none |
| `med-svc-reviews` | a star of small lights on black | none |
| `med-svc-brand` | an illuminated cross over a wet street | 1 distant silhouette, no face |
| `med-svc-email` | a digital clock face | none |
| `med-compare` | an empty corridor of closed doors | none |
| `med-cta` | a shuttered practice front at night | none |
| `med-industries-card` | the hero frame, re-cut | none |

### Rejected on the healthcare limits, and why

Recorded because the next editor will find the same frames at the top of the same
searches:

| id | what it is | why rejected |
|---|---|---|
| `photo-1758691462878` | "Doctor consults with patient in medical office" | the most on-subject frame in the free licence, and an outright patient depiction. Rejected without measuring. |
| `photo-1758691463582` | "A smiling doctor with glasses and stethoscope, arms crossed" | patient-facing clinician portrait **and** the stethoscope the copy attacks by name |
| `photo-1758691462651` | "A female doctor wearing a stethoscope sits at her desk" | same stethoscope ban |
| `photo-1758653500534` | "Medical staff transport patient down hospital hallway" | a patient in a bed |
| `photo-1758654859923` | "Nurses attend to patients in a hospital ward" | a ward of patients |
| `photo-1662837775272` | "a woman standing next to a person in a hospital bed" | a patient in a bed |
| `photo-1576085898477`, `photo-1576085898384` | hospital beds and rooms | not patients, but a made bed in a clinical room reads as one waiting |
| `photo-1643216503879` | "a medical machine with a lot of needles in it" | needles, explicitly |
| `photo-1643660527076`, `photo-1642844819197`, `photo-1722586663860`, `photo-1578152960762` | dental chairs under operating lights | no patient in any of them, and rejected anyway: a rigged dental chair is the frame that makes a nervous reader flinch, which is the thing this page sells against |
| `photo-1766299892549` | "Medical diagnostic tools mounted on a wall" | device branding on the charging base, and 190.6 whole |
| `photo-1758404958502` | "EMERGENCY" in red neon, whole **9.8** at the hero ratio — the darkest exterior found | register, not a ban: an emergency department is the wrong building and the wrong feeling for a page whose job is to calm somebody down, and it is restoration.php's territory |
| `photo-1656189721573` | "a baby stroller with pink shoes" in a clinic | reads as a child at a clinic |

### Rejected on third-party branding or personal data

Every finished file was checked at 2.8× brightness and up to 3× magnification,
which is the only check that works on a near-black frame:

| id | what it is | what was found |
|---|---|---|
| `photo-1535541101896` | a man on a red seamless with an operator and a light. Cut, measured (52.5 / 45.5) and **shipped-ready** for `med-svc-video` | a legible maker's swoosh on trainers on the floor, ~1/12 of the frame width, near the centre — no crop removes it without removing the composition |
| `photo-1745848413060` | a camera's flip-out monitor, whole 39.9 | "No card in camera" legible on the monitor. Not branding, but a camera that is not recording is a poor advertisement for a video service |
| `photo-1774712029963`, `photo-1774712029911` | a camera with an external monitor | "FEELWORLD" moulded into the bezel in white, legible at card size |
| `photo-1711344397160` | a desk calculator reading 2024, whole 48.8 — the best literal "cost-per-patient math" object found | "JOINUS" printed across the case |
| `photo-1637239990694` | a business calculator | reads BUSINESS CONSULTANT and carries a maker's mark |
| `photo-1785775848583`, `photo-1787692106522`, `photo-1773270775830` | lit pharmacy fronts at night | each carries a chain's wordmark or a trading name |
| `photo-1675583102516` | a lit doorway on a dark facade — hero 21.2 whole, H1 b5 **16.3**, the best-measuring hero candidate found | a plate beside the door reads "5796 Stirling", somebody's address |
| `photo-1737207491904` | a warm-lit entrance — hero 28.1, H1 b5 83.0, body b5 11.1, and a strong picture | two lines of gold lettering above the door resolve into a trading name and a number |
| `photo-1742690023387` | a lit counter in a dark lobby, whole 38.7 | it is a cafe, and it carries a menu board, a wayfinding word and a red FIRE ESCAPE sign |
| `photo-1760080590420` | "Empty waiting area with chairs and elevator", whole 22.2 — on the nose for §5 card 1 | it is a ferry deck, papered in green safety notices |
| `photo-1758611195875` | a dim corridor — hero 21.9, H1 b5 60.4, body b5 26.2, the cleanest full sweep of any hero candidate | a school corridor lined with recycling bins and pinned notices |
| `photo-1634097537825` | a tablet showing a chart, whole 28.3 | a named product's UI and a named trading pair |

**The three things left in frame, recorded rather than hidden.** `med-svc-brand`
carries a vertical sign reading the Greek word for pharmacy and `med-cta` carries
MEDICAL CLINIC in red neon — both **common nouns rather than marques**, the
distinction `trav-svc-brand` established when it shipped a frame reading BAR and
HOTEL. `med-wrong-clicks` has the word "History" legible on an out-of-focus
screen: a generic UI label, no product name, no numbers, no personal data.
Nothing else in the fourteen carries a legible word.

### Dark fought back harder here than anywhere except Construction

Clinics are deliberately bright, white and evenly lit. That is the point of them,
and it is the opposite of this page's palette, where §1, §2, §4, §5 and §11 are
`#000` or `#0e0e0e`. The whole search had to be pushed to after-hours: night
exteriors, corridors lit at one end, a single lamp, dusk, warm light behind dark
glass. Roughly nine candidates in ten were thrown away on exposure alone *before*
any of the bans above was applied.

**It cost the hero its literal subject**, and that is the one place this build
departed from the brief's subject table. The table asks for "a practice exterior
or reception lit warm at night". The best frame of that in the free licence is
`photo-1631507623442` — MEDICAL CLINIC in red neon over a shuttered entrance — and
it cannot carry the hero's type. Swept through the whole frame at the hero ratio:

```
cy 0.20   H1 b5  30.2   body b5  37.2   both pass, sign not in frame
cy 0.30   H1 b5 149.8   body b5 246.9   body fails
cy 0.40   H1 b5 245.1   body b5 255.0   both fail
cy 0.80   H1 b5 227.2   body b5  43.4   H1 fails
```

The only crop where both type regions pass excludes the sign and the doorway,
which turns the picture into a photograph of a dark wall — the "photograph of
nothing" trap financial-services records against `photo-1630107753878`. So the
frame moved to **§13**, where nothing sits on it and it is the page's payoff
rather than its banner, and the hero took a calm warm interior instead.

### The hero, measured behind the text

The hero box is 1900×812.5 at a 1920 viewport (ratio 2.339) while the file is
2.000, so `cover` scales to width and shows file y 0.0724–0.9276. The type regions
in **box** coordinates are H1 x 0.166–0.739 y 0.222–0.550, accent x 0.166–0.249
y 0.558–0.599, body x 0.166–0.439 y 0.658–0.883. Measured on the **brightest 5%**
of each region, because a mean hides a blown highlight and a letterform does not:

```
H1      11.1 mean,  71.7 b5
accent  66.8 mean, 130.7 b5
body    25.7 mean, 103.8 b5
```

Both gates under the ~130 target, against the family at `event-hero` 124.7,
`law-hero` 25, `fin-hero` 48, `trav-hero` 83, `build-hero` 82.6, `resto-hero`
106.3 and `pro-hero` 127. **The accent is not a gate**, as Hospitality and
Meetings & Events both record: `.nm-hero-1-subtitle span` is a 159×33 gold label
at the far left, and the button below it is a solid `rgb(210,151,55)` pill with no
background image.

### §5: measure the title box, not a half of the file — twice running now

Meetings & Events had to throw away a **shipped** §5 file whose lower half read
28.4 and whose `.title` strip read 249.2. **This build hit the same trap.**

`med-reviews-rot` was first cut as a straight centre crop: whole 22.2, lower half
20.7, which passes the ~55 target with room to spare. Measured on the real
geometry read off the built card at 1440 — `.title` 342×132 at card y 0.575–0.731,
`.disc` 342×90 at card y 0.769–0.876, file painted `cover` into a 402×845 box so
only file x 0.116–0.884 is visible — that crop reads **`.title` 50.4 mean / 214.4
b5**: the 40px white title sitting on the lit star. That would have been the worst
§5 file this family has shipped.

All twenty-one sibling §5 files were measured on the same geometry to find that
out. The range is **2.1** (`build-shared-leads`) to **185.8** (`law-spend`), median
about 130.

**The fix was the crop, not the frame, and it took a bigger source.** A lit star is
a spiky object: at any magnification keeping the whole star in a 0.62 portrait box,
a point reaches into the title strip. Three other star frames were cut and measured
on the same geometry before that was believed — `photo-1638000707475` (title b5
201.0), `photo-1670359548666` (220.3), `photo-1701877339447` (245.2) — and all
three fail the same way. So the star had to move up and out of the strip, which
needs a zoom, and a zoom on the 4000px fetch would have upscaled. The Unsplash
original is 4752×3168; re-fetched at that size, z 0.60 cy 0.70 gives a 1178px
window for a 1116px slot — no upscaling.

`cx` was swept and the centre kept anyway: cx 0.60 reads title b5 38.2 and cx 0.66
reads 37.4, and both were rejected on what they show — they buy those points by
pushing the star's centre off-frame, so the card becomes a fragment of a star. Same
call `event-blend-in` records.

**Final, on the built card's own geometry:**

```
                       .title mean/b5     .disc mean/b5
med-no-trust             8.9 /  12.2       8.7 /  11.0
med-wrong-clicks        21.1 /  42.1      15.4 /  25.4
med-reviews-rot          5.7 /  55.3       1.3 /  13.6
```

All six at or under the ~55 target; 2nd, 7th and 8th darkest of twenty-four.
**Measure the `.title` and `.disc` boxes on the built page before shipping any
replacement for these three.** A lower half is not a title strip.

### Where this set is honestly weaker

1. **The hero does not read as a medical practice.** It reads as a calm, warm-lit
   interior at night — on the brief's own list of safe territory ("architectural
   detail of a calm, well-designed space") and the right *feeling* for the H1, but
   a reader who lands cold will not know what building they are looking at until
   §3. The alternatives were the MEDICAL CLINIC frame, which fails the type gate,
   or the green cross, which reads unambiguously healthcare and washes a
   full-bleed 1900px banner a single saturated green on a black-and-gold page.
   **On a re-shoot, change this first.**
2. **Two of the fourteen are stars.** `med-reviews-rot` (§5) and
   `med-svc-reviews` (§7) are both a lit star on black. They differ in kind — a
   soft paper lantern on a thread against a wire frame of small lights — sit two
   sections apart, and the copy names reviews in both places, which is the
   argument Meetings & Events made for shipping two crowd frames. It is still one
   idea twice.
3. **`med-svc-ppc` is monochrome and it is a metaphor, not a metric.** The brief
   asks for "dark campaign metrics" and that well is dry: the family already ships
   a dark performance panel (law), a dot-matrix ticker (fin), a green chart on a
   laptop (pro), lit numerals (trav) and a red LED readout (event), and **this
   page's own §5 card 2** is a falling line on a dark screen. A sixth screen would
   have been the sixth. So the card took its own first word — "Aimed at real local
   patients" — and a dart in a bullseye is aim. It is the one desaturated file on
   the page, the same single exception Meetings & Events recorded.

`med-compare` was also replaced on colour rather than content:
`photo-1728595611544` is a more perfectly symmetrical corridor measuring 12.3 /
8.7, and it is **fully desaturated**. `med-svc-ppc` is already the one monochrome
file this page can afford, so §10 took `photo-1685107306307` instead — a cool
teal-green corridor measuring a point darker.

### The phone was spent, and the brief asked for it twice

The brief's subjects for `med-svc-seo` and `med-svc-email` are both "a phone lit
in a dark room". That frame is already `trav-svc-seo` (a phone held up in the
dark), `resto-svc-seo` (a hand holding a phone with a blank screen),
`fin-svc-email` (a phone held edge-on), `law-svc-automation` (a phone lying on a
desk) and `trav-svc-social` (a phone filming a street). A sixth and a seventh
would have made this page look like the fifth and the sixth. Both slots took the
**idea** instead of the object:

- `med-svc-seo` is the *finding* rather than the searching — a blank illuminated
  sign box, the only thing switched on when somebody comes looking. Rule-9-proof
  by construction: there is no mark to find.
- `med-svc-email` is the *hour* — 23:14, lit, in an empty room: the moment an
  automated recall goes out and a practice does not have to be awake for it.

The seven existing `*-svc-video` frames were checked first and hardest. Every one
of them is **the rig** — a crew at monitors (pro), a crew around a crane (fin), a
cinema camera on a tripod (law), an operator in silhouette (build), a crew member
setting a light (resto), a hand holding a camera over a street (trav), a broadcast
camera covering an event (event). `med-svc-video` is the first in the family that
is **what the rig is seeing**.

The standing bans were honoured: **no gavel** (`pro-rules`, `law-bar-rules`) and
**no chess** (`pro-svc-strategy`). Neither search was run — nothing in this brief
points at either.

### The landing card was replaced, not filled in

The first card on `/industries/` to be swapped out **while carrying a real,
on-subject photograph**. Construction and Meetings & Events were both on stock
stand-ins under "replace before go-live" comments. Restoration carried a real
restoration-worker cutout and was **kept**, and the reasoning at the end of that
page's section is the test this card was put through:

1. does it hold up beside the new page's photography, and
2. is it the kind of frame this page's own copy attacks?

**It fails both, and (2) is not close.** `doctor-smiling` (2088) is a
transparent-PNG cutout of a smiling clinician in blue scrubs, arms folded,
**wearing a stethoscope**. §4 mocks "a stock photo of a smiling stethoscope", §5b
says "You don't win patients with buzzwords and a f\*cking stethoscope photo", and
§10 puts "A smiling stethoscope" in the Generic Agencies column. Keeping it would
have put the page's own insult on the page's own door.

**And it carries a real person's details.** Checked at 1.6× brightness and 2.2×
magnification: the scrub top is embroidered in white with a **surname and a
profession**, both fully legible, and the stethoscope chest-piece carries a maker's
mark. That is an identifiable individual's name and occupation on a client's
marketing page — on the one page in this family whose whole subject is other
people's privacy.

(1) fails more mildly: a brightly lit studio cutout on a grid that now sits beside
four full-frame night photographs, opening a page fourteen dark frames deep.

**What is lost, stated honestly.** 2088 is one of the transparent-PNG cutouts that
make the nine-card grid read as a set — section 2 of `industries.css` gives
`.bg-img img` `object-fit: contain` for exactly them — and a cutout on the section
ground cannot fail the lower-half luminance check that cost that page a card
photograph once already. Going in, the split was five cutouts to four photographs;
coming out it is **four to five**, and the photographs are now the majority
treatment. That is a real change to that grid, which is why the decision is
written out at length rather than made quietly. Swapping in a background-removed
cutout later is a one-line change in `pc-industries-content.php`.

`med-industries-card` is a landscape re-cut of that page's own hero, so the card
and the page it opens are the same picture — the arrangement
`build-industries-card`, `trav-industries-card` and `event-industries-card` all
use. 1920×1080, matching `pro-industries-card`. Whole 15.3 and **lower half 14.8**
— the lower half is the number that matters, because this grid sets the card title
and description in white *under* the picture, and this page has already had to
replace one card photograph whose lower half measured 140/255. 14.8 is the darkest
lower half of the five full-frame photographs on the grid, ahead of
`trav-industries-card` at 23.4 and `event-industries-card` at 28.4.

**The count heading was NOT touched.** Medical Practices is one of the original
eight declared cards, so this build adds no card and the heading still reads "Nine
Industries. Nine Different Playbooks."

## Applying them

```
make industry-images
make industry-detail SLUG=medical-practices
make industries
make verify
```

The container copy of `/tmp/pillar-images` is **not writable**, so the importer's
download-and-cache path fails inside it. These fourteen were fetched on the host
into this folder first; the importer then reads them with no network at all.

**Re-cutting a file that is already imported takes two steps, not one.**
`pcii_sideload()` matches by attachment slug and returns the existing id without
looking at the bytes, so a re-cut JPEG is silently ignored. This build hit that
when `med-reviews-rot` was replaced — delete the attachment first, then re-import,
then rebuild:

```
make wp CMD="post delete $(make wp CMD='post list --post_type=attachment --name=med-reviews-rot --field=ID') --force"
make industry-images
make industry-detail SLUG=medical-practices
```

The rebuild is not optional — the new attachment gets a new id, and
`_elementor_data` stores the id alongside the URL. Rebuild `make industries` too
if the file you re-cut is `med-industries-card` or the hero it is cut from.

## Nonprofits page — thirteen photographs

`npo-*` and `npo-svc-*`, for `/industries/nonprofits/`. The prefix was free: the
library's 292 checked-in files contained no `npo-` stem and no other prefix in it
starts with those three letters, so nothing could collide — the importer matches
on the whole attachment slug. Declared in
`scripts/content-industries/nonprofits.php`, because the importer walks content
files and nothing else.

**Thirteen, not fourteen.** Every recent page in this family brought a
fourteenth file, a 1920×1080 `*-industries-card` re-cut from its own hero, to
replace its card on the `/industries/` landing grid. This one does not. The
Nonprofits card **keeps** `marketing-for-nonprofits-page-image` (1990); the
argument is at the end of this section.

Free Unsplash Licence only — `images.unsplash.com/photo-*`. Unsplash+ /
`premium_photo-*` is a paid subscription licence, so none is used, and the filter
rejects `premium_photo-` **by name**, because `premium_photo-1673…` contains the
substring `photo-1673…` and a loose match lets it through. The cutting script
asserts that substring is absent from every id and refuses any id that does not
start with `photo-`, before it writes a file. 13/13 passed. All 271 CDN ids
already used by the eight sibling pages were extracted and every one of these
thirteen was checked against that list: **no duplicates**.

Every credit below was read off the photograph's **own** Unsplash page, where
three things were checked together: the CDN id recorded here appears in that
page's JSON-LD `contentUrl`, the page title carries "Free Photo on Unsplash", and
the photographer's name comes from that page's JSON-LD `author.name` rather than
from the profile slug. 13/13 passed. One name is written in runic script on
Unsplash and is reproduced exactly as that page gives it.

### The measurements

Whole-crop mean / lower half, against the family's 8–90 band:

| file | slot | size | whole | lower half |
|---|---|---|---|---|
| `npo-hero` | §1 | 2000×1000 | 13.2 | 18.0 |
| `npo-quick-answer` | §3 | 1400×1400 | 24.7 | 22.8 |
| `npo-guilt-trip` | §5 | 1116×1800 | 7.2 | 8.8 |
| `npo-buried-stats` | §5 | 1116×1800 | 32.5 | 27.1 |
| `npo-thin-budget` | §5 | 1116×1800 | 13.1 | 17.0 |
| `npo-svc-video` | §7 | 1200×1500 | 32.6 | 59.4 |
| `npo-svc-seo` | §7 | 1200×1500 | 15.0 | 18.2 |
| `npo-svc-ppc` | §7 | 1200×1500 | 3.9 | 4.9 |
| `npo-svc-brand` | §7 | 1200×1500 | 60.1 | 61.7 |
| `npo-svc-social` | §7 | 1200×1500 | 57.2 | 42.4 |
| `npo-svc-email` | §7 | 1200×1500 | 7.3 | 6.6 |
| `npo-compare` | §10 | 1120×1600 | 18.2 | 13.6 |
| `npo-cta` | §13 | 1400×1400 | 39.9 | 52.2 |

**No exception spent, and this is the darkest set in the family.** `npo-hero` at
13.2 is the darkest hero of the nine (`law-hero` 25 was the previous holder);
`npo-svc-ppc` at 3.9 and `npo-svc-email` at 7.3 are the two darkest files
anywhere in it, ahead of `build-svc-email` at 8.7. `npo-svc-brand` at 60.1 is
the brightest here and still well inside the band — `resto-hero` is 106.3 and
`build-quick-answer` 156.0 as recorded exceptions.

**Not one file is upscaled.** Every cut came from a source fetched at 4000–5000px
on the long edge and every crop window was checked against the output size before
the file was written. The tightest margin is `npo-quick-answer` at 0.884; every
other file is a heavier downsample.

Four of the thirteen carry text over them and those four were measured on the
**brightest 5%** of the pixels each text block covers, not on a mean — a mean
hides a blown highlight and a letterform does not.

**Hero type regions**, mapped through the rendered geometry (hero box 1900×812.5
at a 1920 viewport, ratio 2.339; a 2.000 file painted `cover` shows file y
0.0724–0.9276; H1 x 0.166–0.739 y 0.222–0.550, accent x 0.166–0.249 y
0.558–0.599, body x 0.166–0.439 y 0.658–0.883):

```
H1      13.8 mean    95.4 brightest-5%
accent  10.4 mean    48.6 brightest-5%
body    11.0 mean    57.1 brightest-5%
```

All three under the ~130 target, and the best sweep of the nine: the family runs
`event-hero` 124.7, `pro-hero` 127, `resto-hero` 106.3, `trav-hero` 83,
`build-hero` 82.6, `med-hero` 71.7, `fin-hero` 48, `law-hero` 25 behind the H1.

**§5's three, on the built card's own geometry** (`.bg-img` a 402×845 box,
`.title` 342×132 at card y 0.575–0.731, `.disc` 342×90 at card y 0.769–0.876,
the 0.62 file painted `cover` so only file x 0.116–0.884 shows and the centred
strips land on file x 0.173–0.826):

```
                     .title mean/b5     .disc mean/b5
npo-guilt-trip         1.9 /   6.4       1.6 /   5.1
npo-buried-stats      21.8 /  88.8      22.1 /  85.3
npo-thin-budget       26.6 /  78.8       8.8 /  13.0
```

`npo-guilt-trip` is the darkest §5 file in this family, ahead of
`build-shared-leads` at 2.1. **`npo-buried-stats` is the one that moved because
of the strip and not the half:** as a straight centre cut it read whole 40.6,
lower half 44.3 — a comfortable pass on the ~55 gate — and `.title` b5 **131.8**,
which would have been the worst on this page. cx was swept and 0.65 took it to
88.8. cy has no effect on that file at all: the source is 4000×2250 landscape, so
a 0.62 window is full height at any zoom of 1.0. That is two pages running
(`meetings-events`, `medical-practices`) where the lower half passed and the title
strip did not. **Measure the strips.**

### Why each frame won: warm light inside darkness

Every page in this family needed dark frames. This is the only one where getting
dark *right* was harder than getting it at all, because a dark photograph of a
cause reads by default as bleak, mournful and pitying — and that is precisely the
register this page exists to reject. The copy attacks it by name four times: §4's
"a sad stock photo, and a piano-music video that looks exactly like every other
charity's piano-music video"; §5's "The same sad-photo, heavy-sigh appeal every
charity runs"; §10's "Guilt-trips and sad photos" in the Generic Agencies column;
§8's "(No, we're not going to run another sad-piano guilt-trip…)".

**A dark, sad image here would make the page an example of the thing it is
insulting.** So the target was never "dark". It was **warm light inside
darkness**, and the test every frame had to pass was: *does it feel like
something good is happening in the dark, rather than like something sad is being
documented in it?*

Eleven of the thirteen are literally that — a fire with people round it, a
lantern in a vaulted passage, a lamp on a desk, a coin in a shaft of light, a lit
stage over a crowd, gold on a dark cover. The two that are not are the two §5
cards whose whole job is to be the cold thing, and they are cold on purpose.

| file | Unsplash id | photographer | why this frame |
|---|---|---|---|
| `npo-hero` | photo-1784813489506-c1adf9df142f | Florian Schindler | The H1 is "your cause is drowning in a sea of worthy causes, and good work isn't loud enough". This is that sentence answered: a lot of people, in the dark, round the one light there is. Fire small, central and low; top third and both edges near-black, which is where the type lands. |
| `npo-quick-answer` | photo-1552599886-9ce09547b190 | Kyle Loftus | §3 is "putting your story on camera", so the frame needs the verb. A rigged camera filming a lit street at night — and deliberately **no subject being filmed**, so there is nobody in it who could be depicted badly. |
| `npo-guilt-trip` | photo-1642355008521-236f1d29d0a8 | Tareq Ajalyakin | The card's operative word is *same*. A dozen identical heavy slabs stacked one on the next, going back until they disappear, none of them opened. Donor fatigue as a physical object. |
| `npo-buried-stats` | photo-1701523600650-007b393ed2fe | A Chosen Soul | A field of loose numerals with no sentence anywhere in it and no face anywhere in it. Also the literal picture of §4's "Stat after stat after stat". |
| `npo-thin-budget` | photo-1612734425688-d7a59377e5f7 | Thomas Fatin | The card is *a single dollar*. One coin on its edge, alone, one beam on it, a long shadow off it. The one warm frame in §5, and its gold is the page's gold. |
| `npo-svc-video` | photo-1782342707237-a11cb38a9f7e | Anton Borzenkov | Had to differ from all eight existing `*-svc-video`, which are all cameras. So this is the **light going up** — the part of a shoot that happens before any of them. |
| `npo-svc-seo` | photo-1698151256842-e658014ea99a | Muhammad Fauzan Azhima | "When people search for your cause or how to help." Somebody looking something up at night at a desk with one lamp on it — which is when a stranger actually goes looking. |
| `npo-svc-ppc` | photo-1643962578277-0e7e2f7b7c63 | lonely blue | A performance line, jagged, red where it drops and green where it climbs — **drawn in light rather than rendered in a window**. The metric without the screenshot, and with no product's interface anywhere near it. |
| `npo-svc-brand` | photo-1755541608494-5c02cf56e1f4 | The New York Public Library | "Look as credible as your work." An object somebody took real trouble over, shot close enough that the trouble is the subject — and gold on dark leather is this site's exact palette. |
| `npo-svc-social` | photo-1571900260060-a903ec912b3e | George Brynzan | The half of the brief's subject nobody in the family has used: a **gathering**, with a phone in the air over it. `event-svc-social` is a street and `event-svc-seo` is the nearest thing to a feed grid, so both alternatives were spent. |
| `npo-svc-email` | photo-1776702701448-36220108225d | ᛟᛞᚨᛚᚹ | The phone, lying where somebody put it down, still lit — which is what a nurture sequence actually meets: a screen in the dark at some hour nobody chose. |
| `npo-compare` | photo-1686316614258-6597ff2c4f87 | Anna Hunko | §10's crop is the tightest on the page (0.590–0.800), and a passage running straight away from camera cannot be hurt by it. The **lantern** is why this frame rather than another corridor: on a page whose thesis is warm light inside darkness, the arch is only how it survives the crop. |
| `npo-cta` | photo-1781728924617-1f0859a0e808 | Carolin Thiergart | The page's closing argument as a picture: the work is the fire, the support is everybody who came and stood next to it. |

### Why each frame is inside the ethical limits

`fit` includes international aid and NGOs, youth programmes, human services and
animal welfare, so six things were hard-banned and every candidate was tested
against them **before** it was measured: no "poverty porn" — no identifiable
person shown as a passive, suffering recipient of aid; no identifiable children in
any context; nobody destitute, distressed, crying or helpless for emotional
effect; dignity and agency, so where people appear they read as *doing something*;
no distressed, injured or caged animals; no real charity, NGO or campaign branding
in frame.

**Slot by slot. No frame depicts an identifiable child, a person as a passive
recipient of aid, anyone distressed or destitute, or a distressed animal. No frame
reads as sad rather than hopeful.**

| file | who is in it | why it clears the limits |
|---|---|---|
| `npo-hero` | a crowd, all silhouettes | Every figure is a pure silhouette at about a sixth of the frame height. At 3× magnification and 2.8× brightness **not one face resolves**, so nobody in it is identifiable — child or adult. Nobody is receiving anything; they are standing together round a light. Hopeful. |
| `npo-quick-answer` | one operator, ear and shoulder only | A person doing a job. Nobody is being helped, watched, or documented in distress. |
| `npo-guilt-trip` | nobody | No person and no living thing in the photograph. Cold on purpose — it is the card that says every appeal looks the same. |
| `npo-buried-stats` | nobody | As above. Cold on purpose. |
| `npo-thin-budget` | nobody | One coin and a table. |
| `npo-svc-video` | one silhouette rigging a light | **No subject being filmed appears anywhere in the frame**, so there is nobody in it who could be depicted badly. The only person is doing a job. |
| `npo-svc-seo` | nobody | A laptop and a lamp. Screen carries a generic thumbnail grid: no product name, no personal data. |
| `npo-svc-ppc` | nobody | A trace of light. |
| `npo-svc-brand` | nobody | An ornament. No living thing in frame. |
| `npo-svc-social` | a crowd, backs of heads | No face turned to camera, no child, nobody distressed, nobody receiving anything — an audience enjoying something. The only frame on the page where people are visibly enjoying themselves, which on this page is worth something. |
| `npo-svc-email` | nobody | A phone on a surface. |
| `npo-compare` | nobody | A passage and a lantern. |
| `npo-cta` | a crowd, all silhouettes | Same silhouette test as the hero, same result: no face resolves at any magnification. Nobody is receiving anything, nobody is distressed, no animal in frame. |

**No animal appears in any of the thirteen at all**, which is the simplest way to
be sure of the animal-welfare ban.

### Rejected on the ethical limits or on register

The next editor will find these at the top of the same searches.

- **photo-1783869084356** — "People in a cluttered, dimly lit room", the single
  most on-subject hero candidate found. Contains an **identifiable child** in the
  foreground. Rejected without measuring.
- **photo-1759430709806** — a street vendor cooking under a lantern, warm light
  in deep dark, whole 28.9, technically ideal. Rejected on **register**: a
  night-market frame in a low-income setting reads as the *subject* of aid rather
  than the *work* of it, which is the poverty-porn register even though nobody in
  it is suffering.
- **photo-1776140211238 / photo-1780319229779 / photo-1765113143546** — the same
  territory, rejected the same way. The third also carries the word WEED on a
  stall sign.
- **photo-1785951339880** — hands packing food into paper bags, which is the
  brief's "hands lit warm doing something" almost exactly. Monochrome, whole
  135.1. Rejected on exposure alone, and it is the frame this page most wishes it
  could have used.
- **photo-1779037805855** — a crowd at a lit shrine. A religious icon sits at the
  focal point, and the frame is saturated blue and magenta on a black-and-gold
  page.
- **photo-1607036723598** — a figure reading a phone at night, whole 8.7 and the
  darkest svc candidate found. Their sleeve carries a row of embroidered
  **organisational badges**, which is exactly the real-charity-branding ban.
- **photo-1774016591315** — a silhouette reading a phone against a glowing halo,
  whole 21.8, lower half 15.7, and the better picture. **Shipped-ready for
  `npo-svc-email` before the 2.8× check: the figure is bare-chested.** Not a
  luminance problem and not a branding problem — a
  fitness-for-a-client's-website problem.
- **photo-1486583293277** — silhouettes watching a dawn through a window wall,
  and the best type numbers of any hero candidate (H1 b5 **3.2**). Rejected
  because every crop that keeps the body copy legible is 85% black with a
  two-centimetre band of picture — the "photograph of nothing" trap
  `financial-services.php` records against photo-1630107753878.

### Rejected on third-party branding or legible personal data

Every finished file was checked at 2.8× brightness and up to 4× magnification,
which is the only check that works on a near-black frame. **This build lost four
frames to it — more than any sibling.**

- **photo-1759357761048** — a doorway layered with years of pasted appeal
  posters, whole 24.5, lower half 12.7. The best literal illustration of "the
  same appeal every charity runs" found anywhere, cut, measured and shipped-ready
  for `npo-guilt-trip`. At 2.8× the posters resolve into "FORMATION EMPLOI",
  "FORUM DES ETUDES" and **a legible mobile number**. Crops at cx 0.62, 0.72 and
  0.80 were tried; the first two keep a legible word and the third deletes the
  doorway and leaves a bare wall.
- **photo-1784240696289** — a camera on a tripod whose flip-out screen shows the
  crowd round a fire it is filming: the brief's §3 subject exactly, and it rhymed
  with the hero. **"ZV-E10 4K" is engraved on the top plate, dead centre of every
  crop**, and a maker's wordmark sits on the tripod head.
- **photo-1756382526604** — a figure filming a lit plaza at night, whole 27.6,
  cut for `npo-svc-video`. **"GRIZZLY"** is woven into the shoulder of their
  jacket at about a twelfth of the frame width and no crop at any zoom removes it
  without removing the subject. Same failure `med-svc-video` records for a
  trainer's swoosh.
- **photo-1622134336272** — a foil line drawing embossed on dark card, whole
  66.5, cut for `npo-svc-brand`. **The drawing is a wordmark.** Shipping a real
  brand's identity on the card that sells brand identity is the one mistake that
  slot cannot make.
- **photo-1763085674120** — a camera against a wall of flame. The lens barrel
  reads "Canon" plainly, and it would have been a third fire on a page that
  already has two.
- **photo-1761241494934** — a lit facade carrying "TARU MARTANI 1918", a trading
  name, across its full width.
- **photo-1637686824826** — a CRT glowing in a blue room; maker's mark on the
  bezel, and saturated blue.
- **photo-1771308355433** — a warm-lit workshop at night, the strongest hero
  candidate of its kind. A shop sign in frame resolves into a trading name and
  "12:15-19:00".
- **photo-1778940936081 / photo-1726146469671** — laptops glowing in dark rooms,
  both rejected on the operating system's own dock and wallpaper being
  identifiable product UI.

**The one thing left in frame, recorded rather than hidden.** `npo-svc-email`
shows a phone screen reading a time and then Phone, Camera, Clock, Contacts.
Those are **generic UI labels** — no product name, no application name, no
notification content, nobody's data. That is the distinction `med-wrong-clicks`
established when it shipped a frame with "History" legible on an out-of-focus
screen. `npo-quick-answer`'s camera monitor carries an unresolvable dark mark on
its bezel and a standard recording overlay; checked at 4× and 1.6× brightness, no
word in it resolves. Nothing else in the thirteen carries a legible word, except
the moulded digits that *are* the subject of `npo-buried-stats`.

No photograph was darkened in post. This repository selects on measurement; it
does not edit exposure. Where a number moved it moved because the crop moved.

### Where this set is honestly weaker

**The opening and closing bands rhyme.** `npo-hero` and `npo-cta` are both a
crowd gathered round a fire at night, by two different photographers, and it is
one idea twice. Kept because the two sit at the extreme ends of a 4,000-pixel
page and read as bookends rather than as repetition — §1 is a scattered crowd
round a small fire seen from far off, §13 is a single big blaze filling a square —
and because every alternative that was as dark, as hopeful and as clean of the
bans was worse on one of the three. The precedent is `medical-practices.php`
shipping two stars two sections apart and saying so. **If this page is ever
re-shot, this is the first thing to change.**

`npo-cta` was chosen for the hero first and moved. Swept through eighteen
combinations of zoom and centre at the hero's 2:1 ratio: every crop that keeps
its crowd puts the flame under the headline (H1 brightest-5% between 136.2 and
190.0 against a ~130 target), and the one crop that passes (z 0.85, cy 0.40, H1
b5 90.2) cuts the crowd off and leaves a photograph of fire. So it went to §13,
where nothing sits on it.

**§5 cards 1 and 2 are abstract.** The brief asks for "a dim, unread appeal
leaflet" and "a dense report or spreadsheet on a dark desk". What shipped is a
stack of slabs and a field of numerals, because every literal candidate failed a
gate that mattered more: the poster doorway carried a legible phone number, and
**eight separate paper-under-a-lamp frames were cut and measured at lower halves
of 62.1, 66.9, 92.0, 103.4, 119.4, 133.5, 165.8 and 192.7** against a ~55 target.
Printed paper is white, and white paper under a lamp is the one subject that
section cannot have.

Against that, **subject scale is matched across §5 better than on any sibling** —
`professional-services`, `hospitality-travel`, `meetings-events` and
`medical-practices` all had to admit the opposite about their own. All three of
these are one object mass at roughly table distance with a single hard light
across it.

**`npo-svc-video` overlaps `build-svc-video`.** That one is "a crew member in
silhouette setting a film light against the wall of a house at night" and this is
a figure holding a light on a pole over a dark set — the same sentence. What
separates them is where: an exterior against brickwork in blue light versus an
interior against a black flat in red. Two frames of one idea, said plainly rather
than pretended away.

**`npo-svc-ppc` is the one place the palette gets a third colour** — red, green
and blue on black in a set that is otherwise gold and grey. Confined to one card
in a six-card grid, and it is the only file that could carry that copy without
either a brand or a seventh screenshot of a dashboard.

### The landing card was KEPT, and that was a decision

`marketing-for-nonprofits-page-image` (1990) stays on the Nonprofits card. It is
**not a placeholder**: it is a transparent-PNG cutout of five adults standing
shoulder to shoulder with their arms round each other, seen from behind. Four
reasons.

1. **It passes this page's own ban list**, which is the strictest in the family.
   Every figure is an adult, every face is turned away, and what they are doing is
   standing together. Nobody in the frame is being helped by anybody.
2. **It is not the cliché the page attacks.** §10 puts "Guilt-trips and sad
   photos" in the Generic Agencies column and §4 mocks "a sad stock photo". This
   is the opposite register — bright, warm, solidarity. It would fail the test
   that cost the Medical Practices card its photograph (*would this frame fit in
   the Generic Agencies column of the page it opens?*) only if the page were
   arguing against hopeful imagery, and it is arguing for it.
3. **It is one of the four remaining cutouts** on a grid that is now five
   photographs to four, and a cutout on the section ground cannot fail the
   lower-half luminance check that cost this page a card photograph once already.
   Composited on black it measures whole **39.5** and lower half **59.9**, both
   far under the 140/255 that failed before.
4. **Nothing was cut to replace it.** The other three replacements on that grid
   are landscape re-cuts of their own page's hero. This page's hero is a crowd of
   silhouettes round a fire at whole 13.2, which would have been the darkest card
   on the grid by a distance and would have read at card size as a black
   rectangle.

**Where it is weak, stated rather than hidden:** it is a high-key studio cutout,
brighter than the five night photographs it now sits beside, and it opens a page
that is thirteen dark frames deep. That is the same objection
`medical-practices.php` recorded against 2088 — but there it was the *second* of
two reasons, and the first (a real person's surname legible on their scrubs, plus
the stethoscope the page insults by name) is what actually decided it. Nothing
like that applies here. Re-cutting this card belongs in the
cutout-versus-photograph decision the client has not yet made, not in this build.

**The count heading was NOT touched.** Nonprofits is one of the original eight
declared cards, so this build adds no card and the heading still reads "Nine
Industries. Nine Different Playbooks."

## Applying them

```
make industry-images
make industry-detail SLUG=nonprofits
make industries
make verify
```

The container copy of `/tmp/pillar-images` is **not writable**, so the importer's
download-and-cache path fails inside it. These thirteen were fetched on the host
into this folder first; the importer then reads them with no network at all.

**Re-cutting a file that is already imported takes two steps, not one.**
`pcii_sideload()` matches by attachment slug and returns the existing id without
looking at the bytes, so a re-cut JPEG is silently ignored. Delete the attachment
first, then re-import, then rebuild:

```
make wp CMD="post delete $(make wp CMD='post list --post_type=attachment --name=npo-hero --field=ID') --force"
make industry-images
make industry-detail SLUG=nonprofits
```

The rebuild is not optional — the new attachment gets a new id, and
`_elementor_data` stores the id alongside the URL.

**The Unsplash gate is a user-agent check**, and the finding of the last three
pages held exactly. Plain `curl` to unsplash.com is refused with a 401 whatever
the UA; a real browser walks straight through both `/s/photos/` and `/photos/`.
The CDN itself (`images.unsplash.com`) is open to `curl`, which is how all
thirteen sources were fetched. Do not spend a round on this again.

## Public Adjusters page — fourteen photographs

Thirteen page slots plus a landing card, for
`scripts/content-industries/public-adjusters.php` and the tenth card on
`/industries/`. Prefix `adj-*` / `adj-svc-*`; the stem was free (the library has
no `adj-` file, and `adjuster` appears only inside the service page's slug).

Every file is a **hand-framed crop**, not a download. `url` in the content file is
provenance only — deleting a JPEG and re-running `make industry-images` fetches
the *original* framing back, not this one. The zoom/cx/cy of every non-centre cut
is in the table below and in that file's own per-slot notes.

Luminance is `PIL.Image.convert('L')` (ITU-R 601-2 luma, 0–255), the same number
the nine sibling sections quote. `b5` is the mean of the brightest 5% of the
pixels in the region named — a mean hides a blown highlight and a letterform does
not.

### The measurements

Four of the thirteen carry text **over** them and were measured on the text
regions. The other nine sit beside text, so the whole-crop mean is the number.

| stem | source id | slot | cut | whole | lower ½ | text region |
|---|---|---|---|---|---|---|
| `adj-hero` | photo-1732495122088-196f893e0453 | 2000×1000 | z1.00 cx0.50 **cy0.35** | 35.6 | 22.2 | H1 26.5 / **b5 66.3** · accent 18.2 / b5 21.3 · body 28.9 / b5 58.6 |
| `adj-quick-answer` | photo-1746906082255-2a6f83e3b3d1 | 1400×1400 | centre | 39.0 | 37.0 | — (nothing sits on §3) |
| `adj-unknown-world` | photo-1678800119720-e8e4ffe4bb17 | 1116×1800 | centre | 43.4 | 33.9 | type 35.2 / b5 106.2 |
| `adj-shared-leads` | photo-1703114585390-cc095031ad84 | 1116×1800 | centre | 24.9 | 26.4 | type 26.4 / b5 101.5 |
| `adj-solicitation` | photo-1729536700035-9d37bc0fcb84 | 1116×1800 | **z0.80 cx0.50 cy0.38** | 30.2 | 50.7 | type 45.4 / b5 132.9 |
| `adj-svc-video` | photo-1683341359089-e97310cab7f1 | 1200×1500 | centre | 20.9 | 30.1 | — |
| `adj-svc-seo` | photo-1780299805439-0b461c26e9b7 | 1200×1500 | centre | 30.9 | 17.3 | — |
| `adj-svc-ppc` | photo-1457327289196-f38b88d97147 | 1200×1500 | centre | **80.5** | 67.4 | — |
| `adj-svc-brand` | photo-1758413355194-353da4fa09c1 | 1200×1500 | **z0.45 cx0.88 cy0.50** | 27.0 | 25.5 | — |
| `adj-svc-email` | photo-1698151256842-e658014ea99a | 1200×1500 | centre | **15.0** | 18.2 | — |
| `adj-svc-ai-search` | photo-1670359548666-eceb6afbaef4 | 1200×1500 | centre | 24.0 | 25.7 | — |
| `adj-svc-strategy` | photo-1646142745218-debe66bc645f | 1200×1500 | centre | 15.5 | 20.5 | — |
| `adj-compare` | photo-1761058816717-ab349a252d1b | 1120×1600 | centre | **12.2** | 19.6 | — |
| `adj-cta` | photo-1787555807438-5276f4badd9c | 1400×1400 | centre | 30.1 | 39.4 | — |
| `adj-industries-card` | photo-1732495122088-196f893e0453 | 1920×1080 | z1.00 cx0.50 **cy0.40** | 34.6 | **23.4** | — (white type under the card) |

**Credits, every one read off the rendered Unsplash photo page** and cross-checked
two ways — the CDN id recorded above was confirmed present in that page's own
markup, and the page title carried "Free Photo on Unsplash". None from memory;
seven were wrong on the reference page for exactly that reason.

| stem | photographer | photo page |
|---|---|---|
| `adj-hero`, `adj-industries-card` | Giorgio Trovato | `/photos/a-house-with-a-dark-sky-in-the-background-rrAqwsDna9U` |
| `adj-quick-answer` | Farzane Mohammadi | `/photos/a-hand-is-writing-on-a-clipboard-8s6ny61hjfM` |
| `adj-unknown-world` | neil macc | `/photos/a-stack-of-old-books-sitting-on-top-of-each-other-0G86bAfUxr8` |
| `adj-shared-leads` | Shino Nakamura | `/photos/a-close-up-of-a-drawer-with-many-drawers--k6waESYDyc` |
| `adj-solicitation` | Sophie Symons | `/photos/an-old-fashioned-typewriter-sitting-on-top-of-a-table-KAut3dx9oS0` |
| `adj-svc-video` | Venkatesan P | `/photos/a-camera-sitting-on-top-of-a-tripod-l19BQeHf9xA` |
| `adj-svc-seo` | Qeis Ismail | `/photos/bright-light-illuminates-a-dark-textured-underground-space-8K42OugJP1c` |
| `adj-svc-ppc` | NASA | `/photos/hurricane-as-seen-from-space-5477L9Z5eqI` |
| `adj-svc-brand` | Nhan Hoang | `/photos/ornate-building-facade-illuminated-at-night-with-warm-lights-1WQ0HVTmtLU` |
| `adj-svc-email` | Muhammad Fauzan Azhima | `/photos/a-desk-with-a-lamp-and-a-telephone-on-it-Tvuo62HVNy0` |
| `adj-svc-ai-search` | Bernd Dittrich | inherited from `med-svc-reviews` — CDN id `photo-1670359548666-eceb6afbaef4`. **No photo-page slug is recorded** anywhere in this repository for this frame and none was invented here; read it off the rendered Unsplash page before quoting one. |
| `adj-svc-strategy` | Objective Calvary | `/photos/a-model-of-a-house-in-the-dark-jm-JHPv-4Ps` |
| `adj-compare` | Yaqing Wei | `/photos/dark-hallway-with-light-reflecting-on-floor-e8xSjQTk9bw` |
| `adj-cta` | set.sj | `/photos/doorway-casting-light-on-concrete-floor-2u6kovaJULs` |

**2026-09-12 — THE COPY REVISION ADDED ONE STEM AND RETIRED ONE, AND THE ADDED
ONE IS NOT THIS PAGE'S OWN CUT.** The revision split §7's combined SEO-and-AI-search
card into two and dropped its Marketing Strategy card, so an AI Search
Optimization row needed a picture and the brief forbade downloading anything.
`adj-svc-ai-search.jpg` IS A BYTE COPY OF `med-svc-reviews.jpg` — a five-point star
built from hundreds of small lights against black, 24.0 whole, already cut to
1200×1500, which is §7's fixed 4/5 slot. The other two candidates offered
(`auto-svc-reviews`, a tachometer dial with "x1000r/min" legible across it, and
`trav-svc-reviews`, a hand writing by candlelight) were rejected: the first is
the wrong industry in the strip, and the second is the same subject, distance and
colour temperature as `adj-quick-answer`, which is already a hand writing in low
warm light. THE CLAIM "NOT ONE FILE IS SHARED WITH ANY SIBLING" NO LONGER HOLDS
FOR THIS PAGE. The stem is its own, so re-cutting either page cannot silently
move the other. `adj-svc-strategy` stays declared and checked in, rendered
nowhere, because its search cost a round and should not be paid for twice.

**The hero is the cleanest in the family and it was not close.** Worst type region
66.3 on the brightest 5%, against `law-hero` 25, `fin-hero` 48, `build-hero` 82.6,
`resto-hero` 106.3 and `pro-hero` 127. The `cy` sweep is worth keeping because the
lit eave runs diagonally through the headline band: cy 0.50 measures **better**
(H1 b5 41.0) and was rejected, because at 0.50 the roofline crosses the H1 band and
the sky is gone. 0.35 keeps the weather, which is half of what the page is about.
The numbers are not the only thing being optimised.

No photograph was darkened in post. Where a number moved it moved because the crop
moved, and every crop is recorded.

### Slot by slot: how each frame differs from the nearest `resto-*`

This is the note a future editor will need, and it was the whole job. Restoration
and public adjusting share the same disasters, the same 2am and the same damaged
rooms, so **all thirteen `resto-*` files were opened and looked at** — not read off
their alt text — before anything here was committed. The rule applied to every
candidate: *if a frame could sit on either page, it belongs to Restoration.*

The differentiator is **the job, not the disaster**. Restoration owns drying,
cleaning and rebuilding — fans, PPE, trucks, the crew arriving to fix it. Public
adjusting owns **reading, measuring, documenting and negotiating** — the policy,
the clipboard, the file, the camera, the drawer, the plan. Twelve of the thirteen
are an object or a space; **not one is a work crew.**

| stem | nearest `resto-*` | how it differs |
|---|---|---|
| `adj-hero` | `resto-hero` (water against a lit wall at night) and `resto-cta` (whole lit house mirrored in floodwater) | **The two closest calls on the page.** Both `resto-*` frames are **wet and warm**. This is dry, cold and architectural: no water anywhere in frame, no lit window, and the subject is the **structure itself** — a roofline, an eave and an attic vent under a loaded sky, which is the roof-and-storm claim this page's `fit` list is full of. Restoration photographs the water; this photographs the building the claim is about. |
| `adj-quick-answer` | `resto-quick-answer` (two men in hi-vis and hard hats at night beside a work truck) | A **crew on a call-out** versus **one pair of hands on a document**. Restoration turns up to fix it; a public adjuster turns up to write it down. No face here, so nobody to identify. |
| `adj-unknown-world` | `resto-svc-brand` (trays of metal printing type) | Nothing in `resto-*` is a book or a document of any kind. The nearest thing is a workshop object shot from above at a different scale; this is a stack of shut volumes at table distance. |
| `adj-shared-leads` | `resto-shared-leads` (hands holding a phone edge-on) — **the same slot on the sibling page** | Restoration's is a **phone**; `law-shared-leads` is already the **duplicate-rows-on-a-screen** idea. Repeating either would be the most obvious copy-paste available on this build, so the queue is a **physical** one: the same drawer, pull and plate over and over, running out of frame both ways. |
| `adj-solicitation` | `resto-svc-email` (payphone off the hook at night) | Both are mechanisms, but that one is outdoors, in a city, at arm's length, lit by traffic. This is a machine on a dark table indoors with an **empty carriage** — the second before the sentence gets written. |
| `adj-svc-video` | `resto-svc-video` (silhouette setting a film light at a house exterior) | Restoration's has a **person** in it, outdoors; so do `law-`, `fin-` and `build-svc-video`, all indoors with crews. This has **nobody**: one camera, set up and pointed, in an empty dark room. The invitation rather than the shoot. |
| `adj-svc-seo` | `resto-svc-seo` (hand holding a blank lit phone in a black room) | The phone pool is spent — Restoration owns **two** phone frames between this slot and `resto-shared-leads`. A third here would make the two pages look like one page. This is a light behind **cracked glass**: the only frame on the page that shows damage, and it shows it as the reason the search happens. **Not** a wet ceiling, water stain or burst pipe. |
| `adj-svc-ppc` | `resto-svc-ppc` (lightning strike over a lit tower block) | Lightning is one strike, one street, one second — the 2am call-out. A hurricane from orbit is a **region**, days out, with a track: the scale a "surge the moment a region gets hit" campaign is aimed at, and the scale of loss this page's `fit` list is written for. The two files could not be swapped without breaking both pages. |
| `adj-svc-brand` | `resto-cta` (lit house at dusk in floodwater) and `resto-svc-brand` (metal type) | Worked stone at night, close, cropped to columns and arches, no water and no house — versus a whole domestic house standing in flood. And **premises rather than stationery**, which is what keeps it off the five dark tabletops the family already owns. |
| `adj-svc-email` | `resto-svc-email` (payphone) and `resto-asleep` (empty chair, dead monitor) | Restoration photographs the **caller**; this photographs the **answer** — a desk indoors with the lights off and one lamp on. Against `resto-asleep`, the closer call: same room type, **opposite claim** — that lamp is on and that screen is live, and one is a §5 complaint while this is a §7 promise. |
| `adj-svc-strategy` | `resto-svc-strategy` (aerial of a suburban crossroads at dusk) | A **service area** seen from above, at 36.7, for a company with trucks to dispatch — versus **one building** seen across a table, at 15.5, for a business that argues one property at a time. Restoration aims at a map; a public adjuster aims at an address. |
| `adj-compare` | `resto-compare` (tiled back-of-house corridor under ceiling fluorescents) | Both are recessions, because §10's crop is the tightest on the page and a symmetrical corridor is the only composition that survives being cut on both sides. What differs is **material and light**: Restoration's is institutional — glazed tile, a run of fluorescents **on**. This is domestic and **unlit** — bare boards, no fixture on at all, the only light arriving from a far window and bouncing off the floor. A service corridor versus somebody's house with the power off. |
| `adj-cta` | `resto-cta` (whole lit house at dusk, mirrored in floodwater) | **The closest call after the hero.** Exterior, wet, job finished — versus interior, dry, **unfinished**: one door, one light, bare walls, nothing repaired. Restoration closes on the house put back together; this closes on the moment somebody credible walks in. |
| `adj-industries-card` | — | A landscape re-cut of this page's own hero, as `build-`, `event-`, `med-` and `trav-industries-card` all are, so the card and the page it opens are the same picture. |

**The one motif this page repeats on purpose** is *one light in a dark space* —
§7's SEO card, §10 and §13. Three different compositions at three different
distances, in three sections that never appear on screen together. The page's
argument is "be the name they find in the dark", so a recurring single light source
is the page agreeing with itself. Worth knowing before an eleventh page reaches for
it.

### The three confirmations the brief asked for

- **No door-to-door solicitation, anywhere.** The copy makes storm-chasers and
  door-knockers the villains and says post-disaster solicitation is regulated, so
  nobody stands on a doorstep, no clipboard appears at a front door, no leaflet
  goes through a letterbox and no van sits in a damaged street. This cost
  `adj-svc-brand` its two most obvious subjects and is why that card is a facade
  seen from the street rather than an entrance seen from the step.
  `photo-1759803545394` (dark double doors, frosted panels) was cut and thrown
  away on this rule at 69.3. `adj-cta`'s doorway is **interior** — no street, no
  step, no threshold visible from outside.
- **No distressed person, anywhere.** Only one frame contains a person at all and
  it is a pair of hands writing. Rejected on this rule after being cut and
  measured: `photo-1763510386078` (a man in a beanie reading a document by dim
  teal light, 18.8 whole — **the best §3 candidate found**; the coats on the wall
  behind him and the band on his wrist read as an institutional or shelter
  interior, and a page selling calm competence cannot open on somebody having the
  worst week of their life), plus `photo-1767884162314` and `photo-1786815889365`
  for the same reason.
- **No wet ceiling, water stain or burst pipe.** §10 puts "A stock photo of a wet
  ceiling" in the Generic Agencies column of this page's own comparison table.
  Nothing in this folder would fit in that column. The only damage on the page is
  `adj-svc-seo`'s cracked pane, lit from behind.

### Rejected on third-party branding or personal data

Checked at **2.6× brightness** on the finished file, not at thumbnail size, which
is the only check that works on a near-black frame.

- **`photo-1758413355194`** — the full frame of `adj-svc-brand`. The frame is
  *kept*, but only at z0.45 cx0.88. Its centre carries "VĂN PHÒNG TUYỂN SINH /
  Admissions Office" in legible white across the entrance, plus a second sign
  below. Four crops measured; left of about cx 0.82, or wider than 0.50 zoom,
  brings lettering back.
- **`photo-1648037620224`** — the first §7 video card, and the best "we put you on
  camera" frame found for this page: a camera monitor with a man being interviewed
  on it, 24.3 whole. Thrown away at 2.0× — the rig carries a legible maker's mark
  along the cage and the monitor carries recording UI. Every crop that loses the
  mark also loses the screen, which is the entire subject.
- **`photo-1723609275983`** — a phone screen filling the frame, 52.6: a grid of
  third-party app icons, the exact fault the reference page recorded against
  `photo-1512149673953`.
- **`photo-1571524437639`** — a phone against city bokeh, 21.1 and the darkest
  lower half found for §7: the screen is a named camera app's UI, controls labelled.
- **`photo-1760612484753`** — a person at a laptop under red light, 31.1: the
  screen is a third party's web page.
- **`photo-1505682634904`** — a typewriter, and the obvious §5 card 3: the maker's
  name is cast into the front panel in the middle of the frame.
- **`photo-1648211924989`** — "a logo on a black surface", which is what it says.

**Accepted with the judgement recorded,** because it is the one legible string in
the folder: `adj-shared-leads` carries **"A - BE"** on a card-catalogue drawer
plate, read at 2.4×. That is an alphabetical range label on a piece of furniture —
not a brand, not an organisation's name, not anybody's data — and it is the thing
the card's copy is actually about. Restoration rejected a call panel for
"handwritten ward labels … which is somebody's workplace data"; two letters of the
alphabet on a drawer is not that. Re-cutting can push it out of frame by moving
`cx` left, at the cost of the repetition that makes the card work.

### What the free licence does not have

So the eleventh page does not spend a round on any of it either.

- **Paper is bright.** Twenty-odd document frames were cut for §5 and §3 —
  `insurance policy document`, `insurance claim paperwork dark`, `contract pages
  close up low light`, `law book statute page dark`, `wax seal certificate document
  dark` — and the **entire pool measures 74 to 206** on the §5 type band against a
  target under 55. A sheet of paper filling a frame cannot be a §5 card, however
  moody the light. The two document-adjacent cards here work because the paper is a
  **small lit object in a dark frame**, not the frame. Seals and stamps
  specifically: `photo-1641477176034` 149.5, `photo-1578531500970` 186.0,
  `photo-1642069526127` 82.0, `photo-1782364742370` 94.5 with a b5 of **253.6**.
- **Dark-mode search UI is still a named product** — fifth page to record it — and
  now **the phone is spent too**, because `resto-svc-seo` and `resto-shared-leads`
  own the lit phone and the edge-on phone between them.
- **There is no unbranded illuminated sign.** `illuminated sign lettering night`
  returns a named business in every single result — a nightclub, a body shop, a
  restaurant, a billboard. The brief offers "lit signage" for `adj-svc-brand` and
  it is not available on this licence at all.
- **Nor a clean tape measure on a plan.** `tape measure blueprint plan` is fifteen
  yellow tapes on white or pine, 90 to 197; `blueprint floor plan drawing dark` is
  white paper at 99.6, 105.6 and 129.9. §7's strategy card is a lit architectural
  model on black instead.
- **Rows of identical mailboxes and lockers are daylight metal.**
  `photo-1685483056399` 120.1, `photo-1674752407687` 110.6, `photo-1606168510560`
  147.1, `photo-1463717738788` 96.3, `photo-1736953072477` 84.2. Dark wood raked by
  one warm light is what worked.

**Standing bans honoured:** no gavel (`pro-rules`, `law-bar-rules`) and no chess
(`pro-svc-strategy`). Neither search was run beyond confirming what was being
avoided.

### Where this set is honestly weaker

- **`adj-svc-ppc` at 80.5 is the one exposure exception on the page,** and the only
  file above 40. It is inside the family's 8–90 band but at the top of it. A cloud
  top photographed in full sunlight cannot be dark, and this is the darkest
  hurricane on the licence by a wide margin — the frame is more than half black sky
  and dark ocean (alternatives: `photo-1722080767309` 158.5,
  `photo-1454789476662` 141.5, `photo-1578309876267` 164.9). It sits beside text,
  never under it, so 80.5 costs nothing legible; it costs one bright card in a dark
  strip, and the card is a hurricane, so that reads as intent.
- **`adj-solicitation` is the weakest of the three §5 cards** and the one to
  re-measure first if that section is ever re-typeset. Its b5 of 132.9 is the top
  of Restoration's own range, and it took a crop to get there — at z1.00 it is
  137.1 and out of band. Note that `cy` does nothing until the zoom comes down: the
  source is 0.667 against a 0.62 slot, so at z1.00 the full height is already in
  frame and `cy` is clamped (identical 48.6 / 137.1 at cy 0.38, 0.45, 0.52, 0.60).
- **`adj-solicitation` is also not its slot's literal subject.** The brief asked for
  "a regulatory or licensing document on near-black". That does not exist on this
  licence at this exposure (see the seals and stamps above), so the card takes the
  moment *before* the document instead — an empty carriage in a machine that
  commits words to paper. Defensible, and argued in the content file, but it is a
  substitution and it is the first thing to revisit if a licensing frame ever
  becomes available.
- **`adj-quick-answer` is hands rather than a professional.** Both of the brief's
  subjects for that slot were lost — the filming half went to §7 where the service
  actually lives, and the reviewing half was `photo-1763510386078`, rejected on the
  distress rule. Hands on a document is the better half of that compromise, but a
  credible human face on this page would have been stronger, and the licence did
  not offer one that was also safe.

### The landing card was CREATED, not filled in

Public Adjusters is the **tenth** industry and there was no card at all — no entry
in `scripts/lib/pc-industries-content.php`, no image, not even an empty `'link'`
waiting. Same situation Hospitality & Travel was in for the ninth, handled the same
way: appended rather than slotted in beside Professional Services or Restoration,
because the order of that array is the order of the rendered grid and the client
has signed off the existing sequence.

**It is a photograph rather than a cutout, which makes the split six to four**, and
**that does not resolve the open question.** The Nonprofits build was asked to
report on the cutout-versus-photograph mix and the comment it left says resolving it
"is production work" and a later call. Nothing here closes it. This one card goes
with the photograph for three reasons, in the order they matter: the photographs are
already the majority, five to four; **there is no cutout to join** — a cutout card
is a background-removed portrait of a worker in that trade, the four that exist were
all inherited from service pages that already had one, and no public-adjuster cutout
exists anywhere in this library; and it passes the one measurement that card has to
pass, with a **lower half of 23.4** against the 140/255 that got a card photograph
replaced once already.

**The count heading WAS changed, with the client's confirmation.** "Nine
Industries. Nine Different Playbooks." → **"Ten Industries. Ten Different
Playbooks."** It is client copy and a literal count of the cards beneath it. The
count-free alternative ("Every Industry. Its Own Playbook.") was offered a second
time and declined a second time: the client wants the number. Third value that line
has held — "Eight", "Nine", now "Ten" — and an eleventh industry will need a fourth.

**No grid override was needed, and that was measured rather than assumed.** The
build prompt expected an orphan bug on the precedent of section 18 of
`industry-detail.css`; there isn't one. Read off the built page immediately before
this card landed and immediately after:

| viewport | nine cards | ten cards |
|---|---|---|
| 1920 | `402px 402px 402px` | `402px 402px 402px` |
| 1440 | `402px 402px 402px` | `402px 402px 402px` |
| 1154 | `453px 453px` | `453px 453px` |

Every card's `offsetWidth` equals its track exactly — ten values of 402 at 1920 and
1440, ten of 453 at 1154 — and `document.scrollWidth` came back 1913, 1433 and
1154, so nothing overflows. This grid is `repeat(3, minmax(0, 1fr))`, and
`minmax(0, 1fr)` holds every track to its share; §5's orphan measured 527px against
462px only because nimo-core hands *that* wrap a bare `1fr`, which lets a
1116px-wide photograph push its own track past its share. **Ten is better
arithmetic than nine**: at three columns nine was three full rows and ten is three
plus a left-aligned orphan measuring 402px like its neighbours, and at two columns
nine was four rows plus an orphan while **ten is five full rows and no orphan at
all** (confirmed by counting five distinct row offsets).

**One measurement trap, recorded so the next person does not chase it.**
`getBoundingClientRect().width` on these cards returns 354, 393.9, 433.8, 348.5 … —
a different number per card, rising left to right within each row, which looks
exactly like the §5 orphan bug. **It is not.** The wrap carries `wa-pp-2000`, a
2000px CSS perspective, so those are *projected* widths; the identical spread is
present with nine cards and with ten. Measure `offsetWidth` and
`gridTemplateColumns` here, never the client rect.

## Applying them

```
make industry-images
make industry-detail SLUG=public-adjusters
make industries
make verify
```

The container copy of `/tmp/pillar-images` is **not writable**, so the importer's
download-and-cache path fails inside it. These fourteen were fetched on the host
into this folder first; the importer then reads them with no network at all.

**The Unsplash gate held exactly as the last three pages recorded it** — four pages
running now. Plain `curl` to `unsplash.com/s/photos/…` is refused with a 401
whatever the user agent; a rendered browser walks straight through both
`/s/photos/` and `/photos/`. The CDN itself (`images.unsplash.com/photo-*`) is open
to `curl`, which is how all fourteen sources were fetched. Do not spend a round on
this again.

**The `premium_photo-` filter fired for real on this build.** The first result of
the very first search (`insurance policy document`) was
`plus.unsplash.com/premium_photo-1723507291530`, and the host filter dropped it
before it was ever measured. The filter has to reject `premium_photo-` **by name**,
because `premium_photo-1673…` contains the substring `photo-1673…` and a loose
match lets it through.

## Merchant Services page — fourteen photographs

Thirteen page slots plus a landing card, for
`scripts/content-industries/merchant-processing.php` and the eleventh card on
`/industries/`. Prefix `merch-*` / `merch-svc-*`; the stem was free (the library
has no `merch-` file, and `merchant` appears only inside the service page's slug).

Every file is a **hand-framed crop**, not a download. `url` in the content file is
provenance only — deleting a JPEG and re-running `make industry-images` fetches the
*original* framing back, not this one. The zoom/cx/cy of every non-centre cut is in
the table below and in that file's own per-slot notes.

Luminance is `PIL.Image.convert('L')` (ITU-R 601-2 luma, 0–255), the same number the
ten sibling sections quote. `b5` is the mean of the brightest 5% of the pixels in
the region named — a mean hides a blown highlight and a letterform does not.

### The measurements

Four of the thirteen carry text **over** them and were measured on the text regions.
The other nine sit beside text, so the whole-crop mean is the number.

| stem | source id | slot | cut | whole | lower ½ | text region |
|---|---|---|---|---|---|---|
| `merch-hero` | photo-1759430709806-4b60f0fc90d3 | 2000×1000 | **z0.70 cx0.75 cy0.75** | 19.1 | 12.9 | as rendered: H1 19.1 / **b5 62.8** · accent 29.9 / b5 69.1 · body 4.0 / b5 20.6 |
| `merch-quick-answer` | photo-1640260340954-681c16a22baa | 1400×1400 | **z0.78 cx0.20 cy0.45** | 66.2 | 72.5 | — (nothing sits on §3) |
| `merch-same-script` | photo-1777694081039-a58c4f7f2695 | 1116×1800 | centre | **16.6** | **9.9** | own box 17.0 / b5 81.1 (canon 13.0 / b5 48.8) |
| `merch-no-trust` | photo-1770463784849-3df73686c2f6 | 1116×1800 | centre | 44.2 | 40.2 | own box 42.5 / b5 88.9 (canon 42.8 / b5 94.7) |
| `merch-aged-leads` | photo-1766232272162-221a7a3dc874 | 1116×1800 | **z0.80 cx0.70 cy0.60** | 42.0 | 19.7 | own box **12.6 / b5 40.3** (canon 47.1 / b5 189.7) |
| `merch-svc-video` | photo-1643323592702-9064d12e6114 | 1200×1500 | centre | 36.3 | 18.0 | — |
| `merch-svc-seo` | photo-1763272594120-da570c6bc318 | 1200×1500 | centre | 36.9 | 32.2 | — |
| `merch-svc-ppc` | photo-1545402138-0c105c73cb4d | 1200×1500 | **z0.90 cx0.95 cy0.50** | **14.2** | **3.1** | — |
| `merch-svc-brand` | photo-1634245482261-4c38661cd614 | 1200×1500 | centre | 41.5 | 48.1 | — |
| `merch-svc-email` | photo-1748792321323-25d97044ba2c | 1200×1500 | centre | 24.8 | 21.1 | — |
| `merch-svc-strategy` | photo-1781690643160-73d0743dfbde | 1200×1500 | **z0.82 cx0.50 cy0.40** | 29.0 | 41.3 | — |
| `merch-compare` | photo-1781354771724-06fae09f6bf9 | 1120×1600 | centre | 20.4 | 23.3 | — |
| `merch-cta` | photo-1774978611869-7fffcb1786f0 | 1400×1400 | centre | 29.3 | 45.6 | — |
| `merch-industries-card` | photo-1759430709806-4b60f0fc90d3 | 1920×1080 | **z0.80 cx0.75 cy0.72** | 30.1 | **17.8** | — (white type under the card) |

### The hero was measured twice, and both numbers matter

`.nm-hero-1-area` paints the 2000×1000 file into a **2082×813** box at
`object-fit: cover`, `object-position: 50% 50%`. The file is 2.000 and the box is
2.561, so the full width shows and the browser discards **10.96% off the top and the
bottom**. Mapping is `file_y = 0.1096 + band_y × 0.7808`, x 1:1.

| region | family-canonical band | **as this page renders it** |
|---|---|---|
| H1 | 21.6 / b5 121.7 | **19.1 / b5 62.8** |
| gold accent | 31.0 / b5 113.9 | 29.9 / b5 69.1 |
| body copy | 9.5 / b5 48.8 | 4.0 / b5 20.6 |

The right-hand column is what a reader actually sees. Quote 121.7 only as the
conservative comparison against `law-hero` 25, `fin-hero` 48, `adj-hero` 66.3,
`build-hero` 82.6, `resto-hero` 106.3 and `pro-hero` 127; do **not** quote it as
"what sits behind the headline", because the canonical y-range straddles a strip of
the file that is never painted on this page.

### §5 was measured twice too, and it reversed the ranking

The canonical §5 band (x 0.114–0.887, y 0.371–0.876) is one envelope for three cards
whose titles are different lengths, so it starts higher than two of them really do.
Read off the built page at 1920, title-top to description-bottom, per card:

| card | rendered band | mean | b5 |
|---|---|---|---|
| `merch-same-script` | y 0.241–0.873 | 17.0 | 81.1 |
| `merch-no-trust` | y 0.527–0.873 | 42.5 | 88.9 |
| `merch-aged-leads` | y 0.562–0.873 | **12.6** | **40.3** |

`merch-aged-leads` looks like the weakest of the three on the canonical band (b5
189.7) and is in fact the strongest. Its subject is white paper, so the brightest 5%
of any window containing a docket *is* paper — but the crop puts every sheet in the
top half and the card's three-word title starts below them. **Lengthen that title and
the card breaks.**

### Credits, every one read off the rendered Unsplash photo page

Cross-checked two ways — the CDN id recorded above was confirmed present in that
page's own markup, and the page title carried "Free Photo on Unsplash". None from
memory; seven were wrong on the reference page for exactly that reason.

| stem | photographer | photo page |
|---|---|---|
| `merch-hero`, `merch-industries-card` | Adhitya Sibikumar | `/photos/street-vendor-preparing-food-under-lantern-light-at-night-D5Im6HL6_QM` |
| `merch-quick-answer` | Wesley Balten | `/photos/a-man-working-at-a-counter-in-a-store-31Ne5a1xUSY` |
| `merch-same-script` | Pranav Rasal | `/photos/rectangular-frames-cast-shadows-on-a-wall-37JCL2lIHV0` |
| `merch-no-trust` | Nhung Le | `/photos/outdoor-cafe-tables-and-chairs-at-night-IgXFVwheYfA` |
| `merch-aged-leads` | mediha ekici | `/photos/torn-receipts-hanging-from-a-metal-dispenser-s26Waan4roY` |
| `merch-svc-video` | Johannes Blenke | `/photos/a-person-standing-in-front-of-a-camera-in-a-dark-room-deDVTahqXsg` |
| `merch-svc-seo` | Vincent Leyva | `/photos/man-looking-at-phone-in-dimly-lit-cafe-Fux6-9wmlBk` |
| `merch-svc-ppc` | Joost Crop | `/photos/vintage-black-and-green-cash-register-qLCu1i6L23U` |
| `merch-svc-brand` | Kelly Sikkema | `/photos/a-person-holding-a-piece-of-black-paper-tB7O04_6dCw` |
| `merch-svc-email` | Tarikul Raana | `/photos/person-with-headphones-using-a-phone-in-the-dark-KnXoLKPCPnQ` |
| `merch-svc-strategy` | Barney Goodman | `/photos/a-lit-desk-lamp-illuminates-a-notebook-and-pen-LOk7sNVCNJU` |
| `merch-compare` | Jeswin Thomas | `/photos/person-walks-down-a-wet-dark-market-street-at-night--6YmTEn0g0o` |
| `merch-cta` | Adhitya Sibikumar | `/photos/a-street-vendor-stall-illuminated-at-night-HORkAp6xb-4` |

Licence: `images.unsplash.com/photo-*` only. No `plus.unsplash.com`, no
`premium_photo-*` — the cutting script rejects that substring **by name**, because
`premium_photo-1673…` contains `photo-1673…` and a loose match lets it through.

### THE TRADEMARK CHECK — slot by slot, and it is the point of this page

Payment hardware is covered in marks: card networks on cards and terminal screens,
maker's names on readers and gateways, POS software on every tablet in every cafe.
**Not one file on this page has a payment device as its subject.** Every frame was
opened at full resolution and 2.4× brightness before it was committed.

| stem | card network? | POS / hardware / gateway? | reads as fraud, hacking or a secret transaction? |
|---|---|---|---|
| `merch-hero` | none | none | no — a working food stall with the lights on |
| `merch-quick-answer` | none | **blank tablet, checked at 3×**: no logo, no interface, no bezel or stand mark | no — one person working behind a counter |
| `merch-same-script` | none | none | no — an architectural wall |
| `merch-no-trust` | none | none | no — a cafe terrace after closing |
| `merch-aged-leads` | none | none — a paper rail, no till in frame | no — dockets on a wall |
| `merch-svc-video` | none | none; no maker's mark on cage, monitor or tripod | no — a film crew at work |
| `merch-svc-seo` | none | none; phone is edge-on, screen not in shot | no — a man in a cafe |
| `merch-svc-ppc` | none | **maker's name cropped out**, verified at 3× and 2.2× magnification | no — a machine on a table |
| `merch-svc-brand` | none — the card is blank uncoated stock, no stripe, chip or embossing | none | no |
| `merch-svc-email` | none | none; headphones unbranded, screen carries no legible interface or contact data | no — a person in their own room |
| `merch-svc-strategy` | none | none | no — a desk lamp and a notebook |
| `merch-compare` | none | none | no — a market street, two people, both distant |
| `merch-cta` | none | none | no — a lit stall with a customer at it |
| `merch-industries-card` | none | none | no |

Legible text anywhere in the fourteen, in full: an opening-hours card reading
`1:00PM to 11:00PM` and a window decal ending `…w Year` (`merch-svc-seo`); a
chalkboard reading `COMBI DEAL` (`merch-quick-answer`); `20K` and `15K` on a price
board plus the last letters of a country name (`merch-compare`); two characters and a
number on a docket that do not form a word (`merch-aged-leads`). Nothing else.

### How each frame differs from the nearest `fin-*`

Financial Services is the nearest neighbour on subject and had already taken the
obvious money, screen and metrics frames. **Not one `merch-*` file is an office, a
tower, a trading screen or a boardroom.**

| slot | nearest `fin-*` | the difference |
|---|---|---|
| hero | `fin-hero` lit office tower against black | a person's hands at a counter from four feet |
| quick answer | `fin-quick-answer` woman under studio lights, crew around her | one person working alone in a shop |
| §5 ×3 | `fin-svc-ppc` ticker; `fin-svc-brand` marble | a wall, a terrace, a paper rail — no screens, no surfaces |
| svc-video | `fin-svc-video` crew round a crane on an empty stage | a subject standing at the end of the lens |
| svc-seo | `fin-svc-seo` red neon question mark | a person and a place, and the place is a shop |
| svc-ppc | `fin-svc-ppc` dot-matrix market ticker | analogue, one light source, the only thing on it is paper |
| svc-brand | `fin-svc-brand` black marble veined with copper | an object being held by a person |
| svc-email | `fin-svc-email` hand holding a phone edge-on | a face, a posture and a room |
| svc-strategy | `fin-svc-strategy` closed gold-bound notebook | open, and written in |
| compare | `fin-compare` committee table under sconces | outdoors, wet, small independent businesses |
| cta | `fin-cta` two lit office floors, people at desks | a shop still open, one customer at it |

### Rejected on third-party branding, after being cut and measured

| id | what it was | why |
|---|---|---|
| `photo-1553171403` | **the best hero composition found** — lit serving hatch, dark left 40%, H1 b5 83.8 | a POS terminal with a legible maker's mark, plus labelled bottles running the full width |
| `photo-1574808489950` | **the best hero numbers found** — H1 b5 31.7, whole 9.9 | the illuminated fascia is the shop's own name in display type |
| `photo-1757062016584` | warm doorway beside a shutter, H1 b5 106.4 | a poster carrying ad copy **and a phone number** |
| `photo-1638455817002` | 8.2 whole, lit sign on a black facade | the sign is a named cafe's identity |
| `photo-1764649841381` | 10.7 whole, shuttered storefront under green light | a real pharmacy's name, twice |
| `photo-1731432837390` | best `merch-svc-strategy` candidate on subject, 44.4 | a juicer and a knife blade, both with legible maker's marks |
| `photo-1648757838556` | hands typing in the dark, 19.2 | the keyboard's brand across its top edge |
| `photo-1781450077130` | **best `merch-compare` on composition**, 36.8 | at least three real traders' shop names in display type |
| `photo-1768720407554` | corner grocery at night, 52.2 | shop name on the fascia, lottery brand on a pavement sign |
| `photo-1634733988138` | a payment terminal with a receipt — the brief's own literal subject | branded twice over |
| `photo-1631691173550` | a credit card | banned twice: trademark, and §10's own Generic Agencies column |

Two were **kept only because a crop removed the mark**: `merch-quick-answer` at
z0.78 cx0.20 (a cleaning-products brand on a towel dispenser at the right edge, at a
cost of 13 points of exposure — the wider crop measures 53.5) and `merch-svc-ppc` at
z0.90 cx0.95 (the maker's name in gold script on the machine body).

### Rejected on "dark + payments + scam reads as cybercrime"

The page's argument is *"we are the honest one in an industry full of sharks"*, so a
frame that looks like a break-in would make the page describe **its own client** as
the threat. All three of these measure better than anything shipped:

- `photo-1680507637901` — hands on a red-backlit keyboard, 13.6 whole
- `photo-1704717700477` — code on black, **3.7 whole**, the darkest candidate found
- `photo-1517512006864` — a blurred code editor, 25.3

### Rejected on what it turned out to be

`photo-1634692804747` is captioned *"a row of metal faucets mounted to a wall"* and
measured 27.7 whole / 28.6 lower half — a clean §5 pass. Opened at 2.4× it is **a row
of urinals**. Nothing in the Unsplash caption said so. **Look at every frame; do not
read the alt text.**

### Where this set is honestly weaker

- **`merch-quick-answer` is the brightest file on the page at 66.2**, and it is
  brighter than it needed to be: the wider crop measures 53.5 and was given up to
  remove a trademark. §3 carries no text over the picture, so nothing is illegible
  (`build-quick-answer` ships at 156.0 in the same slot), but it is the one file that
  reads cool where the rest of the page reads warm.
- **`merch-svc-ppc` is more abstract than the photograph it came from.** Cutting past
  the maker's mark took the keys and the machine's full profile out of frame; what
  ships reads as a dark machine with a paper roll rather than as an adding machine at
  a glance. It is the file most worth replacing if a better unbranded candidate
  appears.
- **`merch-svc-strategy` is nearly monochrome.** It is a low-light frame lit by one
  tungsten lamp rather than a black-and-white conversion, but it carries less colour
  than anything else here. It was kept because every open ledger, quill and blueprint
  in the free library ran 78–148 whole.
- **§5's subject scale is two-thirds consistent, not three-thirds.** The frames and
  the dockets are both one repeating structure at roughly arm's length; the cafe
  terrace is the same idea at street distance.
- **The brief asked for "dark spend or cost-per-merchant metrics" at `merch-no-trust`
  and did not get them.** The metrics pool is exhausted — `fin-svc-ppc` is a market
  ticker, `law-svc-ppc` a performance panel, and the best remaining candidate
  (`photo-1640552435845`, 26.1) is a third version of the same picture. The slot took
  the argument rather than the noun.

### The landing card was CREATED, not filled in

`/industries/` had no Merchant Services card at all — the third time this page has
had to gain one rather than fill in a `'link'`, after Hospitality & Travel and Public
Adjusters. `merch-industries-card` is a landscape re-cut of this page's own hero at
1920×1080, the same arrangement `build-`, `event-`, `med-`, `trav-` and
`adj-industries-card` use, so the card and the page it opens are the same picture.
Whole 30.1, **lower half 17.8** — the number that matters, because that grid sets the
card title and description in white *under* the picture.

A wider cut than the hero's (z0.80 against z0.70): a 16:9 card is read at about 400px
in a grid of eleven and has to be legible as a scene at that size, where the hero is
read at 1850px and needs a dark left third for an 84px headline. Same frame, two
jobs, two crops.

## Real Estate page — fifteen photographs

Fourteen page slots plus a landing card, for
`scripts/content-industries/real-estate.php` and the **twelfth** card on
`/industries/`. Fifteen rather than fourteen because §7 runs **seven** rows here
instead of six. Prefix `estate-*` / `estate-svc-*`; the stem was free (the
library has no `estate-` file and no `real-` file).

Every file is a **hand-framed crop**, not a download. `url` in the content file is
provenance only — deleting a JPEG and re-running `make industry-images` fetches
the *original* framing back, not this one. The zoom/cx/cy of every non-centre cut
is in the table below and in that file's own per-slot notes.

Luminance is `PIL.Image.convert('L')` (ITU-R 601-2 luma, 0–255), the same number
the ten sibling sections quote. `b5` is the mean of the brightest 5% of the pixels
in the region named — a mean hides a blown highlight and a letterform does not.

**The measuring tool was calibrated against the last build before it was
trusted,** because the first version of it was wrong: it had the aspect-ratio
branch inverted, silently padding every crop with black, and the giveaway was
that `cy` had no effect on any sweep. Re-pointed at `adj-hero` after the fix it
reproduces the Public Adjusters numbers exactly — whole 35.7 against a recorded
35.6, H1 b5 66.3 against 66.3, and that page's recorded cy 0.50 alternative at
H1 b5 41.0 against 41.0. Re-pin it the same way after any change.

### The measurements

Four of the fourteen carry text **over** them and were measured on the text
regions. The other ten sit beside text, so the whole-crop mean is the number.

| stem | source id | slot | cut | whole | lower ½ | text region |
|---|---|---|---|---|---|---|
| `estate-hero` | photo-1642447260162-8d52ac4348ad | 2000×1000 | **z0.60 cx0.46** cy0.50 | 40.1 | 14.9 | H1 10.1 / **b5 95.4** · accent 4.1 / b5 16.3 · body 1.3 / b5 6.7 |
| `estate-quick-answer` | photo-1769117549887-d7ab37279060 | 1400×1400 | centre | 22.9 | 19.1 | — (nothing sits on §3) |
| `estate-recycled-leads` | photo-1640552435845-d65c23b75934 | 1116×1800 | **cx0.20** | 21.2 | 23.5 | type 22.9 / b5 111.0 |
| `estate-no-brand` | photo-1728165562601-f2d00b1f15f4 | 1116×1800 | centre | 17.1 | 15.6 | type 13.2 / b5 94.5 |
| `estate-dead-content` | photo-1785441968243-62889a59d2f3 | 1116×1800 | centre | **14.4** | 8.4 | type 6.5 / **b5 39.1** |
| `estate-svc-video` | photo-1785746730462-74049651fa26 | 1200×1500 | **z0.80 cy0.62** | **75.7** | 69.0 | — |
| `estate-svc-social` | photo-1768946131737-2cb776035f5c | 1200×1500 | centre | 48.1 | 63.3 | — |
| `estate-svc-seo` | photo-1762339937486-cc0dabb2a2cd | 1200×1500 | centre | 22.4 | 21.8 | — |
| `estate-svc-ppc` | photo-1774967550635-182fb37cf31f | 1200×1500 | centre | 17.7 | 12.3 | — |
| `estate-svc-brand` | photo-1756667329216-ac31b58d0f15 | 1200×1500 | centre | 33.0 | 32.5 | — |
| `estate-svc-email` | photo-1598912592915-26ac8f20d44e | 1200×1500 | centre | 18.2 | **7.5** | — |
| `estate-svc-strategy` | photo-1692206171544-09e48ec2f04b | 1200×1500 | **z0.80 cy0.75** | 38.7 | 9.2 | — |
| `estate-compare` | photo-1774188537862-c57d7fb659dc | 1120×1600 | centre | 24.2 | 13.8 | — |
| `estate-cta` | photo-1786491708004-f4be283b7032 | 1400×1400 | centre | 24.3 | 32.5 | — |
| `estate-industries-card` | photo-1642447260162-8d52ac4348ad | 1920×1080 | z0.60 cx0.46 cy0.50 | 36.6 | **9.7** | — (white type under the card) |

**Credits, every one read off the rendered Unsplash photo page** and cross-checked
two ways — the CDN id recorded above was confirmed present in that page's own
markup, and the page title carried "Free Photo on Unsplash". The name was taken
from each page's `og:title`, not from the search grid and not from memory; seven
were wrong on the reference page for exactly that reason.

| stem | photographer | photo page |
|---|---|---|
| `estate-hero`, `estate-industries-card` | Marco Bianchetti | `/photos/a-house-lit-up-at-night-with-lights-on-28RpzhHlLQ0` |
| `estate-quick-answer` | Helena Lopes | `/photos/dimly-lit-living-room-with-framed-art-on-wall-Kojm4nCE65c` |
| `estate-recycled-leads` | Lukas | `/photos/a-computer-screen-with-a-lot-of-data-on-it-MU8w72PzRow` |
| `estate-no-brand` | Jahanzeb Ahsan | `/photos/a-building-with-many-windows-lit-up-at-night-jlXe75DNvfA` |
| `estate-dead-content` | Family Life | `/photos/abstract-vertical-light-trails-on-a-dark-background-ZLXDUFIp910` |
| `estate-svc-video` | rawkkim | `/photos/modern-house-at-dusk-illuminated-windows-camera-tripod-vfXzIJadDXY` |
| `estate-svc-social` | Caroline Badran | `/photos/tripod-with-ring-light-in-a-modern-bedroom-n7u9wmBydVE` |
| `estate-svc-seo` | Aditya Parikh | `/photos/laptop-with-glowing-keyboard-and-blue-light-JuFeAYaz2fs` |
| `estate-svc-ppc` | Yosuke Ota | `/photos/a-single-spotlight-shines-through-smoke-in-a-dark-room-SskIhXN5p5Q` |
| `estate-svc-brand` | NOMAD GULL | `/photos/modern-building-facade-against-a-dark-starry-sky-9Ky-tSmYCvY` |
| `estate-svc-email` | Nate Smith | `/photos/black-qwerty-phone-turned-on-in-dark-room-Qw_u8x5XS68` |
| `estate-svc-strategy` | David Moorhouse | `/photos/a-table-that-has-a-bunch-of-papers-on-it-2Vq_yWHIjbU` |
| `estate-compare` | Julien | `/photos/dark-staircase-leading-to-a-bright-opening-above-n3oJoSLa284` |
| `estate-cta` | Liam Scotchmer | `/photos/curved-apartment-building-at-night-BbkVQbE4xN0` |

### The hero, and why `cx` is the whole frame

The villa is the brightest object in the photograph by an order of magnitude, so
where it sits relative to the H1 box decides everything:

| cx | H1 b5 | what it costs |
|---|---|---|
| 0.50 | 128.0 | the lit terrace clips the right edge of the H1 |
| **0.46** | **95.4** | the terrace clears it — **kept** |
| 0.42 | 59.1 | better number, the villa starts leaving frame |
| 0.38 | 50.4 | best number, and the house is half gone |

0.46 is the last crop that keeps the whole lit terrace in frame. The numbers are
not the only thing being optimised: a hero for a real-estate page has to contain a
property, and below 0.42 it stops being one. The zoom matters the same way in the
other direction — at z1.00 the frame is a wide panorama and the H1 lands on the
town lights at b5 188.3; z0.60 pulls in enough to put the dark hillside and the
stone arch behind the type.

Worst type region 95.4, against `law-hero` 25, `fin-hero` 48, `adj-hero` 66.3,
`build-hero` 82.6, `resto-hero` 106.3 and `pro-hero` 127. **No photograph was
darkened in post.** Where a number moved it moved because the crop moved.

### `build-*` and `trav-*` already owned the twilight exterior

This was the whole job. Both sets were opened and looked at — not read off their
alt text — before anything here was committed:

- `build-cta` — a newly built timber house uplit against a deep blue evening sky,
  warm light in its windows. The textbook "dusk exterior", and Construction has it.
- `trav-cta` — a timber lodge, windows and porch lit warm, dark trees closing in.
- `trav-hero` — overwater bungalows lit warm against a black sky.
- `build-hero` — a building in scaffolding against a deep blue night sky.

**The rule applied: a lit timber house standing among trees belongs to
Construction or Travel, and this page does not take one.** `photo-1721739263063`
(a lit cabin in woods) measured well and is simply `trav-cta` again — rejected.

What this page took instead is **the inhabited building, at three distances**, and
none of the three is a house in trees: a hillside villa seen across a valley with
a town's lights below it (§1 and the card); a facade grid of a hundred identical
lit windows, which is the opposite of a hero shot and is there to be depressing
(§5.2); and a curved modern apartment tower shot upward against black (§13).
Construction owns the building going up, Travel owns the place you go to, Real
Estate owns the building somebody **lives in** and somebody else wants.

### Slot by slot: distance from the nearest existing frame

| stem | nearest existing | how it differs |
|---|---|---|
| `estate-svc-video` | `build-quick-answer` | that is a videographer in hard hat and hi-vis on a job site in daylight; this is an unattended camera at dusk on a finished house |
| `estate-svc-social` | `build-svc-social`, `trav-svc-social` | those are a phone on a tripod at night and a man filming a street; this is a ring light in a domestic interior |
| `estate-svc-seo` | `npo-svc-seo` | that is a laptop beside a warm lamp in a furnished room; this is a cold screen in pure black with no room around it |
| `estate-svc-brand` | `adj-svc-brand` | that is warm uplighting on an older building's stone columns seen frontally; this is a modern facade at a steep raking angle, half the frame black |
| `estate-svc-email` | `build-svc-email` | that is the dial of an old telephone; this is a phone keypad, sixty years apart, same idea. No hand, no silhouette, no screen — unlike the four sibling "hand holding a phone in blackness" frames |
| `estate-svc-strategy` | `build-svc-strategy`, `adj-svc-strategy` | those are a cutaway floor plan and an architectural model; this is a physical chart spread on a dark table |
| `estate-compare` | `build/trav/resto/adj-compare` | all four are **horizontal** spaces you walk along; this is a **vertical** space you climb, and its opening is dark rather than lit |
| `estate-no-brand` | `trav-stockphoto` | that is identical **balconies** with one window lit and the rest dark — about isolation, mostly black; this is a dense grid of lit windows — about sameness, mostly lit |

### The three confirmations the brief asked for

**No banned frame, slot by slot.** Checked on the finished files: no agent
headshot or posed portrait of any kind; no sold, listed, for-sale or bandit
signage; no keys in an open palm, no house model, no handshake over a contract, no
couple being handed keys. Only two of the fifteen contain a person at all and both
are anonymous — a pair of hands on a phone, and nobody in the other thirteen. No
portal's branding appears anywhere, and no portal is named in copy or picture.

**Nothing reads as foreclosure or decline.** Aspirational and dark, not bleak.
Rejected on this rule after being cut and measured: `photo-1706212701249`, a grey
concrete slab block of identical unlit windows, 29.9 whole and 70.8 on the §5 type
band and the best "sameness" frame found on the numbers — it reads as a rundown
panel block, and a page selling aspiration cannot make its own audience's homes
look grim.

**The hero, both text regions:** brightest-5% behind the H1 is **95.4**, behind
the body copy **6.7**, with the accent line at **16.3**. **§5's three cards** are
identical in size (measured 292px each at a 1154 viewport, one row, three equal
columns) with lower-half means of 23.5, 15.6 and 8.4.

### Rejected on third-party branding, personal data, or a sibling

The 2.6× brightness check is the only one that works on a near-black frame, and it
**fired twice**. Both would have shipped without it.

- `photo-1652533625932` — the original §7 PPC card: a laptop at an angle in the
  dark showing a clean dashboard with a rising gold line, 23.8 whole, by some
  distance the best "campaign metrics" frame found. At 2.2× it is a
  **cryptocurrency exchange** — the Bitcoin logo, "BITCOIN / BTC", a US dollar
  price and a Buy/Sell control, all legible. Thrown away.
- `photo-1761473838107` — the original §7 social card: hands holding a phone
  filming a lit domed building at night, 47.4 whole, and exactly the "phone
  shooting a lit property" the brief asked for. The building is the **Holy Shrine
  of Imam Ali at Najaf**, which the photographer's own caption names. A place of
  worship standing in for a listing on a real-estate marketing page is not a
  framing this repository will ship. Thrown away.
- `photo-1689307172671` — a wall of numbered apartment mailboxes, 49.8 whole and
  105.2 on the §5 type band, and semantically the best "your own market, parcelled
  up and handed back" frame found. Put side by side with **the file** of
  `adj-shared-leads` — not its alt text — it is the same photograph: a warm-lit
  wall of identical small compartments with number plates, shot at a shallow
  angle. *If a frame could sit on either page it belongs to the earlier page.*
  Thrown away.

### The PPC slot departed from the brief, and why

The brief asks for "dark campaign metrics". **Eleven literal metrics frames were
cut and measured and every one failed**: the best was the Bitcoin exchange above;
the next carried a legible browser URL bar; two were stock candlestick charts,
which is `fin-svc-ppc` again; one was a Portuguese pandemic case chart with
legible "Suspeitos / Confirmados" labels; and the rest measured between 85.2 and
221.2. The one genuinely dark unbranded graph left, `photo-1643917853964`, is a
coloured jagged trace on black — `npo-svc-ppc` almost exactly.

So the card is **the metaphor instead**, and it is the right one: paid search is
buying a light aimed at one spot in the dark, and row 04's own promise is that the
light is aimed on "real cost-per-deal math" rather than sprayed. It is also the
only frame in the set with no object in it at all, which stops §7 reading as seven
photographs of devices.

### Where this set is honestly weaker

**§7 rows 01 and 02 are both a tripod.** That is a repeat inside one section and
it was taken knowingly, after the alternative was exhausted. The brief asks for "a
phone shooting a lit property" on row 02; **no such frame exists in the free pool
that is dark enough.** Seven candidates were cut and measured — the darkest was
90.3 and the rest ran 121.8 to 154.8, every one a daylight photograph — and the
single dark exception was the Najaf shrine rejected above. The two frames that
remain are at least strongly differentiated: exterior against interior, blue dusk
against warm white, a camera against a lamp, and §7 shows one preview panel at a
time so they never appear together. **If a dark phone-filming-a-house frame ever
turns up, row 02 is the slot to spend it on.**

**`estate-svc-video` at 75.7 is the brightest file in the set** by a wide margin
(next is 48.1). §7 cards sit beside text and never under it, so the bar is a
whole-crop mean well under 100 and it clears it — but it is the one frame here
that would not survive a §5 slot. It is worth the exposure because it is the only
frame found that shows property video being *made* rather than a camera standing
in a studio, which is what all ten existing `*-svc-video` frames show.

**Two abstracts on one page.** `estate-dead-content` (light trails) and
`estate-svc-ppc` (a spotlight cone) are the only two frames with no identifiable
object. They sit in §5 and §7 and never appear on screen together, and each was
chosen because the literal alternative was spent by a sibling — but a third
abstract would tip the page.

### The landing card was CREATED, not filled in

There was no Real Estate card waiting with an empty `'link'` — the fourth page in
this family in that position, after Hospitality & Travel, Public Adjusters and
Merchant Services. `estate-industries-card` is the hero frame re-cut to 1920×1080;
its **lower half measures 9.7/255**, which is the number that matters, because the
card's white title and body sit under the photograph. The landing page once had to
replace a card whose lower half measured 140 and rendered its title unreadable.

## Applying them

```
make industry-images
make industry-detail SLUG=real-estate
make industries
make verify
```

The container copy of `/tmp/pillar-images` is **not writable**, so the importer's
download-and-cache path fails inside it. These fifteen were fetched on the host
into this folder first; the importer then reads them with no network at all.

**The Unsplash gate held exactly as the last four pages recorded it** — five pages
running now. Plain `curl` to `unsplash.com/s/photos/…` is refused with a 401
whatever the user agent; a rendered browser walks straight through both
`/s/photos/` and `/photos/`. The CDN itself (`images.unsplash.com/photo-*`) is open
to `curl`, which is how all fifteen sources were fetched. Do not spend a round on
this again.

**The `premium_photo-` filter stayed shut.** It has to reject `premium_photo-` by
name, because `premium_photo-1673…` contains the substring `photo-1673…` and a
loose match lets it through; the cutting script also refuses any id that does not
start with `photo-`.

## Supply Chain page — fourteen photographs

Thirteen for `/industries/supply-chain/` plus a fourteenth for the new
`/industries/` card. Prefix `supply-*` / `supply-svc-*`, which was free.

Every file is a **hand-framed crop, not a straight download.** The URL is
provenance; the checked-in JPEG is the source of truth. Deleting one and
re-running `make industry-images` fetches the *original* framing back, not this
one — re-cut it instead, using the zoom/cx/cy recorded below.

**Licence:** free Unsplash Licence, `images.unsplash.com/photo-*` only. No
`plus.unsplash.com` and no `premium_photo-*` — the host-side fetcher rejects
`premium_photo-` **by name**, because `premium_photo-1673…` contains the
substring `photo-1673…` and a loose regex lets it through. That filter fired
repeatedly on this page: a clear majority of the top results for every logistics
query on Unsplash are Getty Unsplash+ assets.

**Credits** were read off the rendered Unsplash search page, not from memory.

### The catch this page had that its siblings did not

§10 row 2 of this page's own comparison table puts **"A stock photo of a
warehouse"** in the Generic Agencies column — and the page is *about*
warehousing. The test the sibling pages use ("if a frame would fit in the Generic
Agencies column of this page's own comparison table, reject it") therefore bites
harder here than anywhere else in the library.

- **Banned:** the generic stock warehouse — bright, evenly lit, wide-angle down an
  empty aisle, blue-grey cast, nobody in it, nothing specific. The frame on all
  forty of the websites this page is mocking.
- **Wanted:** a *specific* operation shot dark — one aisle lit, a dock at night, a
  yard under sodium, a signal gantry, a lit plant.

Not one of the fourteen is an empty bright aisle. The two closest to "warehouse
interior" — `supply-compare` and `supply-no-proof` — are 24.4 and 12.8/255 and
both have a specific thing in them.

**Also banned by the copy's own argument:** buzzword-illustration imagery —
glowing global network overlays, arrows over a world map, holographic supply-chain
diagrams. The page's whole complaint is buzzword soup; there is none of it here,
and `supply-svc-strategy` — the slot most likely to attract a glowing world map —
is a railway signal gantry instead.

### No third-party livery in any frame, and the rule cost a picture

Freight photography is covered in carrier liveries, trailer logos and shipping-line
names. Every frame was checked at full resolution, brightened, before it was cut.

**The one that failed:** `photo-1682285625743-24cca1c2c88b`, a 9.0/255 night dock
with a trailer backed in under one strip light — the best hero candidate found. At
full resolution the trailer flank reads **"Trans & M…er GmbH — Kompetenz in
Frische"** in red. Rejected outright rather than retouched.

No frame here carries a carrier, trailer, 3PL or shipping-line mark. The only
lettering anywhere on the fourteen is:

| file | lettering | what it is |
|---|---|---|
| `supply-hero`, `supply-industries-card` | "545" | a wagon asset number |
| `supply-sameness` | faint wagon numbers | asset numbers |
| `supply-svc-brand` | LODORE STREET, WILLIS STREET, BROWN… | municipal street plates — the *subject* |
| `supply-svc-video` | "Rosco V-Hazer", "DIFFUSION DF-50" | lighting flight-case model text, illegible at card size |

That last row is recorded rather than claimed absent. It is film-equipment model
text, not a freight brand, and it is the same class of mark the camera bodies in
all thirteen sibling `*-svc-video` frames carry.

**No road truck appears anywhere on this page.** Trucks at night were the single
most likely collision with `build-*` (15 files, trucks/yards/sites) and `resto-*`
(13 files, night call-outs under lights), so the freight here is rail, dock and
building instead. Standing bans observed: no gavel, no chess.

### Measured, on the final crop

| file | source | ratio | whole | lower half | brightest 5% |
|---|---|---|---|---|---|
| `supply-hero` | 2000x1000 | 2.00 | **21.2** | 18.2 | 72.6 |
| `supply-quick-answer` | 1400x1400 | 1.00 | **41.5** | 55.2 | 200.4 |
| `supply-slow-sale` | 1116x1800 | 0.62 | **40.0** | 13.3 | 163.9 |
| `supply-sameness` | 1116x1800 | 0.62 | **29.8** | 34.4 | 159.6 |
| `supply-no-proof` | 1116x1800 | 0.62 | **12.8** | 13.7 | 62.0 |
| `supply-svc-video` | 1200x1500 | 0.80 | **52.0** | 31.9 | 180.0 |
| `supply-svc-seo` | 1200x1500 | 0.80 | **22.5** | 40.2 | 166.4 |
| `supply-svc-ppc` | 1200x1500 | 0.80 | **42.8** | 50.9 | 157.2 |
| `supply-svc-brand` | 1200x1500 | 0.80 | **48.5** | 51.5 | 164.7 |
| `supply-svc-email` | 1200x1500 | 0.80 | **25.3** | 29.0 | 110.3 |
| `supply-svc-strategy` | 1200x1500 | 0.80 | **13.4** | 17.4 | 63.7 |
| `supply-compare` | 1120x1600 | 0.70 | **24.4** | 18.8 | 120.1 |
| `supply-cta` | 1400x1400 | 1.00 | **29.4** | 38.1 | 152.4 |
| `supply-industries-card` | 1920x1080 | 1.78 | **20.7** | 18.4 | 69.6 |

Set mean **30.2/255**. The brightest file on the page is `supply-svc-video` at
52.0, which is darker than the brightest file on any of the twelve siblings.
Dark was easy here — logistics runs at night and photographs that way.

### Only four of the fourteen carry type, and those four were measured differently

**The hero.** A banner is judged by what sits behind the words, not by its
average. Measured directly on the regions the type occupies, on the **brightest
5%** of their pixels:

| crop | behind the H1 | behind the body copy |
|---|---|---|
| cy 0.70 | mean 27.6 / **b5 69.4** | mean 28.3 / b5 116.6 |
| cy 0.85 | mean 28.5 / **b5 74.5** | mean 25.9 / b5 112.5 |
| **cy 0.90 — TAKEN** | mean 28.0 / **b5 72.6** | mean 23.4 / **b5 106.8** |

All three clear the ~130 ceiling with room; 0.90 is best on both regions at once
and is also the only one that keeps the whole loading gantry. Read back off the
built page at 1440, the served banner measures **b5 57.2 behind the H1 and 87.6
behind the body** — the best hero numbers in the family (`adj-hero` 66.3,
`pro-hero` 126).

**§5's three cards.** These are the ones that matter: white title and description,
bottom-anchored, sitting *directly* on the photograph with no gradient overlay
(`background: rgba(0,0,0,0)` — verified on the built page). And the file is not
what gets painted: §5 paints a 0.62 file into a **402x845** box, which is 0.476,
so `cover` keeps only the **middle 76.8%** of the width. Measured over *that*
region:

| card | painted lower half | behind the type |
|---|---|---|
| 1 `supply-slow-sale` | 11.7 / b5 91.1 | **7.5** / b5 49.8 |
| 2 `supply-sameness` | 32.8 / b5 148.4 | **29.1** / b5 143.0 |
| 3 `supply-no-proof` | 14.5 / b5 42.6 | **15.7** / b5 41.5 |

All three cards render **402x845, identical, on one row** at 1440 (505px at 1920,
292px at 1154, single column below 992).

**`supply-sameness` moved from cx 0.65 to cx 0.95 on this measurement, and it is
the one thing on this page worth reading.** At 0.65 the frame was better composed
— two ranks of wagons converging on the centre — and it **passed** the brief's
stated §5 rule: lower half 43.2 against a ceiling of ~55. It failed a check the
brief only asks for on the hero: the brightest 5% of the band the white title
actually sits in measured **185.1**, because the lit roof of the centre wagon runs
straight through it. A mean hides a specular highlight; a specular highlight behind
a letterform does not hide itself.

A zoom sweep from 1.00 to 1.50 could not move that roof out of the band — b5 stayed
at 182–186 throughout and the whole-frame mean got *worse* at every step — so the
fix had to be lateral. At cx 0.95 the foreground under the type is the unlit
interior of an open hopper: **b5 185.1 → 143.0**, whole file 37.7 → 29.8, and the
composition improved rather than degraded (a rank of identical hoppers in the near
field, a whole yard of more of the same behind).

The rejected alternative for this slot was a rank of identical roller doors
(`photo-1672545754259`), and it lost on geometry, not on subject. Its repetition
runs left to right; §5's slot is 0.62 portrait and then gets cropped again to
0.476, so the row of doors becomes one door at every zoom that fixes its luminance.
**A railyard repeats in depth as well as across, so it survives a narrow portrait
crop.** That is the whole reason it won.

### The files

| file | Unsplash id | photographer | crop | subject |
|---|---|---|---|---|
| `supply-hero` | `photo-1768974522003-6ce1ccc096b0` | Chelaxy Designs | z1.00 cx0.50 **cy0.90** | a loaded bulk freight wagon under one gantry light in fog at night |
| `supply-quick-answer` | `photo-1779599507383-edc44cba289c` | LOGAN WEAVER \| @LGNWVR | centre | two workers and a dog silhouetted in a dark dock doorway |
| `supply-slow-sale` | `photo-1663725867222-9bd0103d221d` | Nick Brice | z1.00 **cx0.40** | a long meeting table ranked with chairs in a quiet room at night |
| `supply-sameness` | `photo-1771150535337-debe34189e58` | Yuriy Vertikov | z1.00 **cx0.95** | rows of identical open freight wagons in a railyard at night |
| `supply-no-proof` | `photo-1572283046480-e990be92d301` | Ralph Darabos | centre | a near-black industrial bay, one small doorway lit at the back |
| `supply-svc-video` | `photo-1632187981988-40f3cbaeef5e` | Jakob Owens | z1.00 **cx0.15 cy0.85** | a film crew at work inside a bare industrial building |
| `supply-svc-seo` | `photo-1540404203560-79ffbc3ddd8a` | Jeroen den Otter | z1.00 **cx0.55** | a laptop half open in a black room, amber light along the keyboard |
| `supply-svc-ppc` | `photo-1634542984003-e0fb8e200e91` | rc.xyz NFT gallery | z1.00 **cx0.60** | a rising chart in green and orange on a dark ruled screen |
| `supply-svc-brand` | `photo-1470298514008-8f2df2b182da` | Boris Stefanik | z1.00 **cx0.22** | a stack of old street name plates in a dark undercroft |
| `supply-svc-email` | `photo-1702726001096-096efcf640b8` | Dastan Eraliev | centre | a laptop open in an otherwise black room, its screen the only light |
| `supply-svc-strategy` | `photo-1763895470866-25fba9d7c5cc` | Ivan Baton | z1.00 **cy0.45** | a railway signal gantry at night over unlit track |
| `supply-compare` | `photo-1762965619718-26dd70adbd51` | Eugene Chystiakov | centre | a dark storage aisle, caged units both sides, one lit doorway |
| `supply-cta` | `photo-1708809086837-b9d8f826c149` | Tasha Kostyuk | centre | a processing plant lit up at night, tanks and gantries |
| `supply-industries-card` | `photo-1768974522003-6ce1ccc096b0` | Chelaxy Designs | z1.00 **cx0.45 cy0.95** | the hero frame, cut again wider and lower for the 1920x1080 card |

`supply-industries-card` is a **second cut of the hero source, not a resize of the
hero file** — the card is a ~300px tile in a grid of twelve others and wants the
wagon and the light and nothing else.

### Why each frame differs from its nearest `build-*` and `resto-*` neighbour

| slot | nearest `build-*` | nearest `resto-*` | how this one differs |
|---|---|---|---|
| hero | scaffolding against a night sky | water against a wall under one lamp | rail bulk freight in fog; no building, no water, no road vehicle |
| quick answer | a videographer in hi-vis on a job site | two workers over a job sheet beside a work truck | full silhouette, no faces, no hi-vis, no colour — a doorway picture, not a crew picture |
| slow sale | — | — | nothing in either library is an interior with furniture |
| sameness | `build-compare`, a concrete passage | — | repeated *objects* receding, not architecture |
| no proof | — | a dark roof space with one skylight | a working bay, not a void; 12.8 vs a lit skylight |
| svc-video | an operator in silhouette, blue-lit room | a crew member setting a light on a house | a **whole crew** working inside a building — the only one of fourteen |
| svc-seo | a lit house number on a dark wall | a hand holding a phone, blank screen | a laptop; no hand, no house |
| svc-ppc | a straight-down aerial of a suburb | lightning over a tower block | screen-based; neither neighbour is |
| svc-brand | a grid of colour swatches on black | trays of metal printing type | found signage in situ, not a designed artefact on a table |
| svc-email | the dial of an old telephone | a payphone against city bokeh | a whole dark interior with one small light, not a close object |
| svc-strategy | a cutaway floor plan from above | an aerial of a suburban crossroads | a ground-level photograph of equipment, not a drawing or a plan view |
| compare | a concrete passage, one strip light | a tiled corridor, ceiling lights | **caged storage** — mesh walls with contents, light at the far end, not a finished interior |
| cta | a timber house uplit at dusk | a house with every window lit | plant, not domestic architecture |
| card | scaffolding at night | — | as hero |

### Applying them

```
make industry-images
make industry-detail SLUG=supply-chain
make industries
make verify
```

The container copy of `/tmp/pillar-images` is **not writable**, so the importer's
download-and-cache path fails inside it. These fourteen were fetched on the host
into this folder first; the importer then reads them with no network at all.

**The Unsplash gate held exactly as the last five pages recorded it.** Plain `curl`
to `unsplash.com/s/photos/…` is refused with a 401 whatever the user agent; a
rendered browser walks straight through. The CDN itself
(`images.unsplash.com/photo-*`) is open to `curl`, which is how all fourteen
sources were fetched. Do not spend a round on this again.

## Transportation page — fourteen photographs

Thirteen page slots plus a landing card, for
`scripts/content-industries/transportation.php` and the fourteenth card on
`/industries/`. Prefix `fleet-*` / `fleet-svc-*`; the stem was free. Chosen over
`trans-*` (ambiguous in a filename list) and `truck-*` (too narrow for the
intermodal, drayage and last-mile operations §11 lists).

Every file is a **hand-framed crop**, not a download. `url` in the content file is
provenance only — deleting a JPEG and re-running `make industry-images` fetches the
*original* framing back, not this one. The zoom/cx/cy of every non-centre cut is in
the table below and in that file's own per-slot notes.

Luminance is `PIL.Image.convert('L')` (ITU-R 601-2 luma, 0–255), the same number the
eleven sibling sections quote. `b5` is the mean of the brightest 5% of the pixels in
the region named — a mean hides a blown highlight and a letterform does not.

**The measuring tool was re-pinned against the last build before it was trusted.**
Pointed at `estate-hero`'s recorded cut (photo-1642447260162, 2000×1000, z0.60
cx0.46 cy0.50) it reproduces real-estate.php's published numbers: whole 40.4 against
a recorded 40.1, **H1 b5 95.4 against 95.4 exactly**, accent b5 16.5 against 16.3,
body b5 6.9 against 6.7. The committed `estate-hero.jpg` itself measures 40.2 / 14.9.

### The measurements

Four of the thirteen carry text **over** them and were measured on the text regions.
The other nine sit beside text, so the whole-crop mean is the number.

| stem | source id | slot | cut | whole | lower ½ | text region |
|---|---|---|---|---|---|---|
| `fleet-hero` | photo-1714009889233-6699f04623ff | 2000×1000 | **z0.55 cx0.33 cy0.36** | **13.8** | 19.1 | H1 12.9 / **b5 43.8** · accent 16.3 / b5 46.4 · body 14.5 / b5 25.2 |
| `fleet-quick-answer` | photo-1693645325820-03c4be5b7031 | 1400×1400 | centre | 26.6 | 15.5 | — (nothing sits on §3) |
| `fleet-commodity` | photo-1625838144804-300f3907c110 | 1116×1800 | centre | 15.0 | **19.4** | white title + description, bottom-anchored |
| `fleet-no-proof` | photo-1632477829576-775f9b8c0e35 | 1116×1800 | centre | 14.6 | **6.0** | lower-half b5 41.5 (whole b5 218.2 — see below) |
| `fleet-broker-mercy` | photo-1611974789855-9c2a0a7236a3 | 1116×1800 | centre | **12.1** | **13.4** | white title + description, bottom-anchored |
| `fleet-svc-video` | photo-1570729024570-c124b403fe4c | 1200×1500 | centre | 22.6 | 16.8 | — |
| `fleet-svc-seo` | photo-1652194928910-5bd06fc43435 | 1200×1500 | centre | 12.2 | 17.8 | — |
| `fleet-svc-ppc` | photo-1639428530618-e70b1ff28da2 | 1200×1500 | centre | **41.3** | 15.1 | — (brightest file on the page) |
| `fleet-svc-brand` | photo-1770515853604-4487b6370bc1 | 1200×1500 | centre | 23.1 | 27.1 | — |
| `fleet-svc-email` | photo-1590501949668-2442efd4d3d7 | 1200×1500 | centre | **3.4** | **4.4** | — (darkest file in the repository) |
| `fleet-svc-strategy` | photo-1779436667163-c954c7d6938a | 1200×1500 | centre | 27.9 | 29.1 | — |
| `fleet-compare` | photo-1690467195954-8828afccce95 | 1120×1600 | centre | 14.5 | 23.5 | — |
| `fleet-cta` | photo-1775206959399-e6cea9d8abb0 | 1400×1400 | centre | 16.9 | 21.3 | — |
| `fleet-industries-card` | photo-1714009889233-6699f04623ff | 1920×1080 | **z0.62 cx0.36 cy0.30** | 11.4 | **18.8** | — (white type under the card) |

### The hero's cy sweep is a BRANDING fix, not an exposure one

This is the only file in this repository whose crop was driven by trademark rather
than by light, and it is the reason the page has a hero at all. The full frame is a
superb photograph and **unshippable as shot**:

- a carrier's wordmark on the cab door (a legible `...acker` with a fleet number
  under it) at roughly x 0.69 / y 0.61 of the source
- a **readable licence plate** on the front bumper at x 0.49 / y 0.85
- the **maker's script on the hood** at y 0.60

All three had to leave the frame without taking the truck with them:

| cut | whole | what is still in shot |
|---|---|---|
| z0.70 cx0.40 cy0.45 | 25.8 | the door wordmark is back in |
| z0.62 cx0.38 cy0.45 | 26.1 | wordmark out, plate and hood in |
| z0.55 cx0.33 cy0.42 | 18.1 | plate out, hood script at the edge |
| **z0.55 cx0.33 cy0.36** | **13.8** | **nothing legible — kept** |
| z0.55 cx0.33 cy0.30 | 11.2 | darker, and the cab is leaving |

0.36 is the last crop that keeps the whole lit roof line, the stacks, the mirror and
the aerial while putting every legible mark outside the frame. Verified on the
finished file at 2.8× brightness: no wordmark, no plate, no maker's badge, no
legible text anywhere in it.

`cx0.33` is what buys the headline its darkness. The building wall fills the left two
thirds and every lamp sits in the right third, so the H1 box lands on unlit
brickwork — **b5 43.8** rather than the 120–190 a centred crop of the same frame
measures. Against the family on the worst text region: `law-hero` 25, **this page
46.4**, `fin-hero` 48, `adj-hero` 66.3, `build-hero` 82.6, `estate-hero` 95.4,
`resto-hero` 106.3, `pro-hero` 127. Second-darkest hero on the engine.

### `fleet-no-proof` looks like the weakest §5 card and is the strongest

Whole-frame b5 is **218.2**, which is alarming until you see why: the subject is a
blank lit screen in a black field, so the brightest 5% of any window containing it
*is* that screen. The crop puts the screen entirely in the **top** half and the
card's type starts below it — lower-half mean **6.0**, lower-half b5 **41.5**. The
darkest §5 card on the engine.

**Lengthen that card's title and the card breaks** — the same warning
`merch-aged-leads` carries, for the same reason.

§5's three lower halves are 19.4 / 6.0 / 13.4 against a target of under ~55, and the
three cards render at an identical 505×845 on one row at a 1920 viewport.

### Credits, every one read off the rendered Unsplash photo page

Cross-checked two ways — the CDN id recorded above was confirmed present in that
page's own markup, and the page title carried "Free Photo on Unsplash". None from
memory; seven were wrong on the reference page for exactly that reason.

| stem | photographer |
|---|---|
| `fleet-hero`, `fleet-industries-card` | Austin |
| `fleet-quick-answer` | Oleg Brovchenko |
| `fleet-commodity` | Mohammad Rahmani |
| `fleet-no-proof` | Artur Kechter |
| `fleet-broker-mercy` | Maxim Hopman |
| `fleet-svc-video` | Miguel Ángel Hernández |
| `fleet-svc-seo` | Jason Williams |
| `fleet-svc-ppc` | Asa E-K |
| `fleet-svc-brand` | Fumiaki Hayashi |
| `fleet-svc-email` | willy wo |
| `fleet-svc-strategy` | Avtar Singh |
| `fleet-compare` | luana niemann |
| `fleet-cta` | Mustafi Numann |

Free licence only (`images.unsplash.com/photo-*`). The cutting script rejects
`premium_photo-` **by name**, because `premium_photo-1673…` contains the substring
`photo-1673…` and a loose match lets it through, and refuses any id that does not
start with `photo-`.

### The three confirmations the brief asked for

**1. None is a generic highway shot.** §10 puts *"A stock photo of a highway"* in the
Generic Agencies column, so the ban is enforced on the page's own authority: no
motion-blurred asphalt, no lone truck on an empty interstate, no aerial road curves,
no sunset-over-the-freeway. Rejected on this rule despite measuring well:
`photo-1784353897316` (a black-and-white overpass with trucks on it, **24.2** whole,
the darkest wide frame found in the first two rounds) and `photo-1774177474253`
(trucks on a wet road in teal fog, 44.2).

`fleet-compare` is a **road tunnel** and is deliberately not the banned frame: the
ban is on the wide, empty, sunlit-or-sunset highway that appears on four hundred
carrier homepages, and this is a sodium-lit bore shot from inside at night. It is
also the only symmetrical frame in the set, which is what §10's tight crop needs.

**2. None carries vehicle-make or carrier-livery branding.** Checked on every
finished file at 2.4×–3.2× brightness, which is the only check that works on a
near-black frame. It fired more often on this page than on any other — see the
rejection list below.

**3. None depicts unsafe driving or an incident.** No driver on a phone at the
wheel, no unsecured or overloaded load, no collision, no roadside incident. The
page's argument is a clean safety record and the imagery must not undercut it. This
rule cost the best atmospheric frame in the whole search (see below).

### Slot by slot: how each frame differs from the nearest `supply-*`, `build-*` and `resto-*`

The line is drawn on **what the business is**, not on what the photograph contains.
Supply Chain is the *facility* — static infrastructure, the building, the racking,
the dock. Transportation is the *vehicle and the road*.

**Not one frame here contains a warehouse interior, a racking aisle, a loading dock
or a pallet.** Rejected on exactly that rule after being cut and measured:
`photo-1720759043544` (trailers backed onto a lit service apron at night, 53.0 whole
— a good frame, and a dock, so it is Supply Chain's), `photo-1771387515473` (a
warehouse frontage) and `photo-1783971573755` (vans and a forklift under a lit
canopy).

| slot | nearest sibling frame | how it differs |
|---|---|---|
| `fleet-hero` | `supply-hero` bulk freight **wagon** under a gantry light; `build-hero` a scaffolded building; `resto-hero` a vehicle under a work light at a call-out | a **tractor unit** at rest under its own lamps against a plain wall. No wagon, no rail, no building under construction, no incident |
| `fleet-quick-answer` | `supply-quick-answer` workers in a dock doorway | a rigged camera with **nobody in frame**; the subject is the act of filming, not the facility |
| `fleet-commodity` | `supply-sameness` rows of identical **freight wagons** in a railyard | a screen of identical unreadable rows — the brief's own second option for this slot, taken because the rank-of-vehicles frames all failed on branding |
| `fleet-no-proof` | `supply-no-proof` a near-black industrial bay with one lit doorway | a single blank lit screen in a black field. Both are "nothing to see", one architectural, one a screen |
| `fleet-broker-mercy` | `supply-svc-ppc` a chart **rising** | a candlestick chart **falling**, and it sits in §5 here rather than §7 |
| `fleet-svc-video` | `supply-svc-video` a whole crew around a camera in an industrial building; twelve existing `*-svc-video` | **one operator in silhouette** against a light panel — a person with the hardware unreadable, where §3 above is hardware with nobody there |
| `fleet-svc-seo` | `supply-svc-seo` a laptop in a black room lit **amber**; `estate-svc-seo` a laptop in blue and violet | lit **red and blue** and shot along the lid rather than head-on |
| `fleet-svc-ppc` | `fin-svc-ppc` a market ticker; `law-svc-ppc` a performance panel | two dark monitors carrying line charts and a histogram |
| `fleet-svc-brand` | `supply-svc-brand` street name plates under a strip light | brass, timber and warm light — the printed-piece reading of "worth trusting" |
| `fleet-svc-email` | `merch-svc-email` (`photo-1748792321323`) a person in headphones with a phone | a **face lit only by the phone**, checked against merch's before cutting |
| `fleet-svc-strategy` | `pro-svc-strategy` chess (standing ban) | a desk with the work on it at night. Not chess, and **not a glowing route map**, which the brief bans by name |
| `fleet-compare` | `supply-compare` a caged **storage aisle** running to a lit doorway | a **road tunnel** bore. See the honest note below — this is the closest pair between the two pages |
| `fleet-cta` | `resto-*` vehicles under lights at night | a rear lamp cluster filling a dark square; only light is legible in it |

**The two sets were sourced blind to each other and share not one source frame.**
`supply-*` did not exist when these were chosen — Supply Chain built while this page
was being photographed. Compared id by id once both existed: twenty `photo-*` ids in
supply-chain.php, thirty-three here, **zero intersection**.

### Rejected on third-party branding, after being cut and measured

Truck photography is covered in marks, and this check fired more often here than on
any prior page:

- `photo-1714009889233` **at its original framing** — this page's own hero source. A
  carrier livery on the cab door, a readable plate, and a maker's script on the hood.
  Not retouched: **re-cut twice** until all three sat outside the frame.
- `photo-1717012676345` — a truck's front wheel and fender lit by a bollard, 42.6
  whole, and the best hardware detail found. At 2.6× the tyre sidewall reads
  **GOODYEAR** and the hood carries model lettering.
- `photo-1764507652448` — a fuel island at night with trucks under it, 46.7, exactly
  the "fuel island at 3am" the brief asked for. The trucks carry **RYDER** livery.
- `photo-1775387331978` — a trailer outlined in red lamps in the wet, 46.3, the most
  striking night frame in the entire search. A **SCANIA** carrying a named haulier's
  livery **and its telephone number**.
- `photo-1640916610450` — a rank of identical coaches under streetlights, 18.2, and
  semantically the best "rank of identical vehicles" frame found. **SUNWAY** operator
  livery, **VAN HOOL** maker's mark, and two hotel signs legible behind it.
- `photo-1670431089414` — a wheel lit in the dark, **9.4 whole**, the darkest
  candidate of the entire build. A maker's emblem on the centre cap.
- `photo-1780322179791` — hands on a wheel in a dash-lit cab at night, 11.4, and
  precisely the "driver's hands on the wheel" the brief lists. The boss carries the
  **Ford Mustang** running-horse emblem, and it is a sports car rather than a cab.
- `photo-1726718583639` — a **Chevrolet** tailgate with a legible plate.
- `photo-1633794978582` — a vintage lorry with **MORESJÖ** on the door.
- `photo-1772839791137` — captioned as a **Peterbilt** grille; rejected unopened.

### Rejected on subject rather than on branding

- `photo-1785080372346` — a rank of yellow trucks and hi-vis crews in a lit depot at
  night, 35.2, compositionally ideal for §5. Opened at 2.2× it is a **municipal
  roadworks depot** with maker badges and plates on every unit, and this page is
  about freight carriers, not street maintenance.
- `photo-1730929496464` — a truck outside an industrial hall at night, 46.1. It is a
  **mobile crane** — construction plant, which is `build-*`'s.
- `photo-1766980172417` — a truck in fog under amber beacons, 31.7, and the best
  atmospheric frame found anywhere in the search. It is a works vehicle under
  **flashing beacons on a road**, which reads as a roadside incident. Rejected on the
  safety rule: this page's argument is a clean safety record.
- `photo-1768207750854` — a lone truck in a desert at dusk with pylons, 63.5 whole
  but **26.1 lower half**, which would have passed §5 comfortably. It is the banned
  generic-highway frame.

### Where this set is honestly weaker

- **`fleet-svc-ppc` is the brightest file on the page at 41.3** and the one most
  worth replacing. "Run on cost-per-load math" wants dark campaign metrics, and the
  free library's metrics pool is almost entirely **light-mode screenshots** — the six
  best-matching candidates measured 181 to 221 whole, which is unusable on sections
  that are `#000`. This is the darkest frame found that actually contains charts, and
  it reads as a streamer's desk more than as a campaign dashboard. Nothing sits on
  §7's panels, so nothing is illegible.
- **§5 is three screens.** The brief offers each of the three cards a screen as its
  second option and all three ended up taking it, because every "rank of identical
  vehicles" candidate failed the branding check. The three are visually distinct — a
  wall of dense rows, a blank lit screen, a falling chart — and their subject scale is
  consistent, but a trucking page's most visual section containing no vehicle is the
  weakest thing about this set.
- **`fleet-compare` and `supply-compare` are the same composition.** Both are
  receding symmetrical corridors shot at night toward a single distant light — a
  caged storage aisle there, a road tunnel bore here — and they sit in the same slot
  on two pages one click apart. Different enough to ship; close enough that if either
  is ever re-cut, this is the pair to re-check.
- **Only one frame in the set is a truck.** `fleet-hero` and its card re-cut are the
  same tractor unit, `fleet-cta` is a rear lamp cluster and `fleet-compare` is a road.
  The free library's supply of dark, unbranded, non-highway heavy-vehicle frames is
  genuinely thin, and ten of the fourteen carry no vehicle at all.
- **`fleet-svc-brand` is the least literal file here.** "Not one more name buried on a
  load board" wanted a clean unbranded cab door, lit signage or a printed piece. Every
  unbranded cab door in the free library is unbranded because it is a pickup, and
  every lit sign found named a real business (a bank, a hotel, two fast-food chains).
  What ships is the printed-piece reading and carries no mark of any kind.

### The landing card was CREATED, not filled in

`/industries/` had no Transportation card — the fourth time this page has had to gain
one rather than fill in a `'link'`, after Hospitality & Travel, Public Adjusters and
Merchant Services. `fleet-industries-card` is a landscape re-cut of this page's own
hero at 1920×1080 — a second cut, not a resize — the same arrangement `build-`,
`event-`, `med-`, `trav-`, `adj-`, `merch-`, `estate-` and `supply-industries-card`
use, so the card and the page it opens are the same picture.

Whole 11.4, **lower half 18.8** — the number that matters, because that grid sets the
card title and description in white *under* the picture, and a card photograph
measuring 140 in its lower half is what forced a replacement on the parent page.

**Wider than the hero (z0.62 against z0.55) but higher (cy0.30 against cy0.36)**, and
the second number is the branding one again: a wider crop pulls the tractor's hood
script back into shot, so the frame had to rise to keep it out. Verified at 2.8× on
the finished file. A 16:9 card is read at about 400px in a grid of sixteen and has to
be legible as a scene at that size; the hero is read at 1850px and needs a dark left
two thirds for an 84px headline. Same frame, two jobs, two crops.

## Restaurants page — thirteen photographs used, one rejected

For `scripts/content-industries/restaurants.php` and the fifteenth card on
`/industries/`. Prefix `dine-*` / `dine-svc-*`.

**`resto-` was not available** — it belongs to Restoration (water and fire damage),
not Restaurants. `food-*` was rejected as too broad for the bars and breweries in
`fit`. Hence `dine-*`.

### PROVENANCE IS MISSING FOR THIS SET, AND IT CANNOT BE RECOVERED FROM HERE

The fourteen `dine-*` files were cut and committed by an earlier session that never
wrote the content file and never wrote this entry. **The Unsplash source id and the
photographer credit for every one of them are lost.** The content file therefore
declares `file`, `title` and `alt` for each slot and omits `url` and `credit`
rather than guessing them — a wrong credit is worse than no credit, which is why
the standing rule says to read the photographer off the rendered search page.

**Consequence, and it is the reason this is the first thing in this section:
deleting one of these JPEGs and re-running `make industry-images` cannot fetch it
back.** There is no URL to fetch from. These files are the only copy. Anyone who
can recover the source ids should add them to the content file and to this table.

Everything below **was** verified directly against the committed crops.

### The measurements

`PIL.Image.convert('L')` (ITU-R 601-2 luma, 0–255) over the committed crop, the
same measure every other section here quotes. `b5` is the mean of the brightest 5%.

| stem | cut | whole | lower ½ | b5 | slot target |
|---|---|---|---|---|---|
| `dine-hero` | 2000×1000 | 34.1 | 37.6 | **116.9** | H1 band under ~130 — passes |
| `dine-quick-answer` | 1400×1400 | 63.0 | 45.3 | 226.4 | nothing sits on §3 |
| `dine-vanity-likes` | 1116×1800 | 19.5 | **9.7** | 171.7 | §5 lower half under 55 — passes |
| `dine-flat-food` | 1116×1800 | 48.3 | **53.2** | 131.2 | §5 lower half under 55 — passes |
| `dine-svc-video` | 1200×1500 | 51.2 | 49.6 | 147.2 | beside text |
| `dine-svc-seo` | 1200×1500 | 18.5 | 17.9 | 109.4 | beside text |
| `dine-svc-ppc` | 1200×1500 | 41.5 | 33.8 | 155.2 | beside text |
| `dine-svc-brand` | 1200×1500 | 69.1 | 36.2 | 198.8 | beside text |
| `dine-svc-social` | 1200×1500 | 78.8 | 88.7 | 198.7 | beside text — the brightest in the set |
| `dine-svc-email` | 1200×1500 | 22.4 | 35.0 | 200.8 | beside text |
| `dine-compare` | 1120×1600 | 46.5 | 52.1 | 132.7 | beside text |
| `dine-cta` | 1400×1400 | 44.8 | 40.1 | 142.4 | beside text |
| `dine-industries-card` | 1920×1080 | 35.8 | 39.3 | 123.5 | landing grid |

Every file is cut to its slot's exact aspect ratio: square for §3 and §13 (their
boxes run 0.732→1.059 and 0.633→1.157 across the viewport range, so square is the
only shape that survives both), a fixed 4:5 for §7's panel, 2000×1000 for the hero.

### The dark-food paradox, and how these resolve it

This page's copy attacks dim food photography three times — "dim, lifeless photos
that kill the craving", "a dark photo of a plate", "boost a dark photo of a burger"
— while the house rule for the whole series is dark imagery. The two are not the
same thing: **low-key food photography is high contrast, not low light.** The frame
falls to black; the food is hard-lit with real specular highlights.

`dine-quick-answer` is the clearest case: whole 63.0 with a b5 of **226.4**, because
a copper heat lamp is a hard key straight down onto the plate while the kitchen
behind it measures near nothing.

**`dine-flat-food` is the one deliberate exception in this folder.** Its card is
titled "Dim, Lifeless Photos That Kill The Craving" and its job is to *depict* the
cliché: a blue cast, no specular highlight, food that reads as cold. **Do not
"improve" this picture.** Brightening or warming it would make the card illustrate
the opposite of its own heading.

### `dine-app-tax.jpg` — ON DISK, REJECTED, DO NOT USE

Cut correctly to 1116×1800 and measures inside the §5 target (whole 59.9, lower half
36.2). It is still not used, and the §5 card "They Leave You At The Apps' Mercy"
ships with **no photograph at all**.

It is an **IKEA restaurant counter**. Two digital menu boards carry the IKEA
wordmark legibly at full resolution — one advertising a hot dog at `3.-` — and a
third screen lower in the frame carries it again. The page's build prompt bans
third-party branding outright, and this is the card attacking delivery apps for
taking a cut of other people's food: a restaurant marketing page carrying another
company's logo, on that card, is the own goal the ban exists to prevent. It also
misses the slot's subject, which is "a dark screen of an order queue, or a stack of
unbranded takeout containers under one light" — a self-service canteen is neither.

**The file is left in place rather than deleted** so nobody re-sources the same
frame. To finish the slot: one frame matching that subject, cut to 1116×1800, lower
half under 55/255, added to the `images` block and to that row's `image` key.

### Collision check against the three prefixes that already own food at night

`merch-*` has a street vendor over a griddle, a counter under a hanging lamp, café
terraces and a wet market street. `trav-*` has a hotel bar, neon reading BAR and
HOTEL, and a dark lobby. `event-*` has a candlelit banquet table and a colonnade.

This set takes **the dining room and the pass**, which none of them had: a full
restaurant at night from inside (hero, card, cta), a plated dish under a heat lamp
at the pass (§3), and a run of banquette seating laid up for service (§10 — not a
colonnade, which both `event-*` and `trav-*` already have). `dine-vanity-likes` is
the one neon, and it is a social-media glyph showing a count of **zero**, not venue
signage — a different subject from `trav-*`'s, and it is the card's own argument.

### Open, for whoever shoots Retail

`dine-svc-social` is a phone held over a plated dish under hard light. The retail
social card must not be a phone held over merchandise from the same angle, or the
two pages' §7 panels will read as the same picture twice.

---

## Retail page — fourteen photographs

`/industries/retail-consumer/retail/`. Thirteen page pictures plus
`retail-industries-card` for the /industries/ card. Prefix `retail-*` /
`retail-svc-*`, which was free.

**This page shipped once with no photography at all.** The first build recorded,
correctly, that `assets/pillar-images/` had a prefix for all fifteen siblings and
none for Retail, and it declined to borrow a frame from another page's prefix to
hide the gap. This set closes it to that note's own spec. The reasoning, the
rejected frames and the per-slot distance from the nearest `merch-*` and `dine-*`
frame live in the `images` block of `scripts/content-industries/retail.php`; this
is the licence and measurement record.

All from **Unsplash**, free Unsplash Licence, `images.unsplash.com/photo-*` only.
No `plus.unsplash.com`, no `premium_photo-*` — the cutting script rejects that
substring by name, because `premium_photo-1673…` contains `photo-1673…`. Every
credit below was read off the rendered Unsplash photo page, one page at a time,
with the CDN id confirmed present in that page's own markup and the page title
carrying "Free Photo on Unsplash".

| stem | size | ratio | whole | lower half | source | photographer |
|---|---|---|---|---|---|---|
| `retail-hero` | 2000×1000 | 2.00 | **23.1** | 19.2 | `photo-1646930981992` | Minh Dương |
| `retail-quick-answer` | 1400×1400 | 1.00 | 57.5 | 26.8 | `photo-1742830895916` | Gia Minh |
| `retail-vanity-clicks` | 1116×1800 | 0.62 | 19.5 | **19.5** | `photo-1639754390580` | Behnam Norouzi |
| `retail-blend-in` | 1116×1800 | 0.62 | 60.8 | **20.5** | `photo-1761244105558` | Fujiphilm |
| `retail-no-reason` | 1116×1800 | 0.62 | 22.5 | **27.4** | `photo-1786561210115` | Stefan Szankowski |
| `retail-svc-video` | 1200×1500 | 0.80 | 51.6 | 44.3 | `photo-1641499303047` | Jason Pischke |
| `retail-svc-seo` | 1200×1500 | 0.80 | **13.8** | 14.3 | `photo-1767334850102` | Mahesh Ranaweera |
| `retail-svc-ppc` | 1200×1500 | 0.80 | 55.3 | 42.7 | `photo-1775740396815` | Haberdoedas |
| `retail-svc-brand` | 1200×1500 | 0.80 | 28.7 | 21.7 | `photo-1545263137` | Tim Mossholder |
| `retail-svc-social` | 1200×1500 | 0.80 | 52.9 | 20.4 | `photo-1768732774706` | Kevin Woblick |
| `retail-svc-email` | 1200×1500 | 0.80 | 15.7 | 10.1 | `photo-1655927584774` | Erwi |
| `retail-compare` | 1120×1600 | 0.70 | 54.1 | 59.6 | `photo-1743449695702` | Ahmed Abouelleil |
| `retail-cta` | 1400×1400 | 1.00 | 32.7 | 30.6 | `photo-1646930981992` | Minh Dương |
| `retail-industries-card` | 1920×1080 | 1.78 | 26.7 | 27.6 | `photo-1646930981992` | Minh Dương |

**Twelve distinct sources for fourteen files.** `photo-1646930981992` is cut three
ways — the hero takes its right half (cx 0.80), the closing band its left
(cx 0.05), and the landing card is the hero's crop again in landscape. The hero
and the closing band share no subject and no pixel. That is the same device
`merch-hero` / `merch-industries-card` uses, and it is deliberate: see the motif
note in the content file.

### Crops that are not centre cuts

| stem | zoom | cx | cy | why |
|---|---|---|---|---|
| `retail-hero` | 0.50 | 0.80 | 0.50 | keeps the rail out of the body-copy band; wider cuts read 177–185 b5 there |
| `retail-quick-answer` | 0.75 | 0.10 | 0.50 | drops a shop name and a phone number on the right half of the shopfront |
| `retail-svc-social` | — | — | — | centre cut |
| `retail-compare` | 0.50 | 0.50 | 0.20 | drops two traders' names, one of them at the vanishing point |
| `retail-cta` | 0.50 | 0.05 | 0.50 | the hero frame's other window |
| `retail-industries-card` | 0.55 | 0.78 | 0.50 | the hero's framing, landscape |

### The four files with text over them

`retail-hero` and the three §5 cards. Measured on the **brightest 5%**, not a mean.

§5's canonical type band, read off the built page at 1920 where the card paints
505×845: x 0.114–0.887, y 0.371–0.876.

| §5 card | whole | lower half | TYPE band | TYPE b5 |
|---|---|---|---|---|
| `retail-vanity-clicks` | 19.5 | 19.5 | 17.7 | **45.3** |
| `retail-blend-in` | 60.8 | 20.5 | 47.5 | 186.8 |
| `retail-no-reason` | 22.5 | 27.4 | 42.7 | 176.2 |

All three lower halves are under the ~55 target. **`retail-blend-in`'s 186.8 is the
mannequins, not the type** — they stand in the top two thirds, the card's title and
description are bottom-anchored, and the lower half reads 20.5. Re-cut it with a
lower `cy` and the figures come down into the words.

The hero was measured three ways because the first two disagree by 177 points:

| region | mean | b5 |
|---|---|---|
| family-canonical H1 (x 0.152–0.749, y 0.227–0.563) | 10.0 | **42.2** |
| family-canonical accent | 6.7 | 16.7 |
| family-canonical body | 8.5 | 31.2 |
| rendered H1 **element box** (x 0.120–0.955, y 0.276–0.495) | 24.9 | 213.1 |
| rendered H1 **letterforms** (x 0.194–0.719, y 0.217–0.572) | 9.1 | **36.1** |
| rendered body **letterforms** (x 0.194–0.445, y 0.694–0.871) | 7.3 | **20.8** |

`.nm-hero-1-title` is a full-width block, so its bounding box swallows the white
woven bag at the top right — the whole of that 213.1. The H1 is four lines and the
longest ends at x 0.719. **Quote 36.1, not 213.1**, and re-measure if the H1 copy
is ever lengthened.

The hero also breaks the family convention by putting its subject **left**, which
section 22 of `industry-detail.css` warns must override its `object-position: 15%`
rule. It was measured rather than assumed and **no override was needed**: on the
visible window at 1154 / 800 / 375 the worst region is 121.7, inside the ~130
target, because the left-hand subject is a red dress on a dark form and red is a
low-luma colour.

### Third-party branding — the whole job on this page

Retail photography is thick with other people's trademarks. Every frame was opened
at full resolution at 2.2–3.0× brightness before it was committed. **Nothing in
these fourteen files is a shopfront name, product packaging, a till-system mark, a
brand graphic on a garment, or a name reflected in glass.** The only words in the
whole set are "OPEN" on a generic neon sign (`retail-svc-brand`), "SALE" on garment
tags (`retail-svc-ppc`) and "History" on a defocused soft button
(`retail-vanity-clicks`) — three common nouns and nobody's mark.

Twenty frames were cut, measured and thrown away on that rule, several of them with
better numbers than what shipped. Among them: the best hero composition found
(22.8 whole) for four separate marks; the darkest street frame found (9.9 whole)
for two illuminated shop names; the best CTA candidate on warmth (47.0) for a shop
name in metre-high type plus a coffee brand's enamel sign; the darkest §7 candidate
found (6.6) because a camera is a photograph of a maker's name; and a dark data
screen at 38.8 that turned out to be a named university's pandemic dashboard with a
running death toll. The full list, with the reason for each, is in the `images`
block of the content file.

One frame was rejected on **exposure** alone and it is the one the Restaurants page
left a note about — see below.

### The copy bans its own obvious shot

§10 puts **"A stock photo of a shelf"** in the Generic Agencies column. So the
generic supermarket run is banned outright, and the test every frame had to pass is
the siblings': *if it would fit in the Generic Agencies column of this page's own
comparison table, reject it*. A dark grocery aisle was cut for §10 and thrown out on
exactly that rule — the banned frame with the lights turned down is still the
banned frame.

### Collision check: `merch-*` had already taken this neighbourhood

Merchant Services owns the lit-small-business-at-night look wholesale — a street
vendor's stall (hero, cta, card), a counter under a hanging lamp, café terraces, a
wet market street, a man with a phone in a dim café, a matte black card, a desk
lamp over a pad, a silhouetted camera operator, a person in headphones over a phone.
Retail is the closest subject in the whole set.

**The dividing line is what the business is.** Merchant Services is the
*transaction* — the counter, the till, the moment of payment. Retail is the
*merchandise and the display* — the window, the rail, the shelf, the product, the
choosing. Not one file here is a counter, a till, a payment device or a person
serving. Slot by slot:

| slot | `merch-*` counterpart | how this one differs |
|---|---|---|
| hero | vendor's hands over a griddle at a stall | merchandise nobody is touching, through glass, from the street |
| quick answer | a man behind a counter under a hanging lamp | nobody in frame at all — a display left lit after close |
| §5 card 1 | a wall of identical empty frames (`same-script`) | a defocused screen; merchant's set has no screen anywhere |
| §5 card 2 | empty café tables on a terrace (`no-trust`) | six identical mannequins in one window — retail furniture, not café furniture |
| §5 card 3 | torn dockets on a lit rail (`aged-leads`) | a street of shut frontages; not paper, not a rail |
| svc-video | camera operator silhouetted behind a rig | no person and no camera — a light and a monitor |
| svc-seo | a man with a phone **in a dim café** | a hand and a phone, no room, bokeh only. Café banned by name |
| svc-ppc | a mechanical adding machine (banned by name) | SALE tags on a garment rail — not a screen, not a machine |
| svc-brand | a plain matte black card on dark slate | an identity that is switched on |
| svc-social | — (merchant has no social card) | a man filming a street at night |
| svc-email | a person in headphones over a phone | no person; a phone put down on a dark couch |
| compare | a wet market street between two rows of stalls | indoors, under a glass roof, between permanent shopfronts |
| closing band | a whole lit market stall in a black field | a display behind glass; nobody works in it |
| card | the hero frame in landscape | same device, different shop |

`trav-*` (lit properties at night) and `estate-*` (twilight exteriors) were checked
too, because a lit shop window is adjacent to both. Everything here is street-level
and merchandise-forward: **no building is photographed as a building.**

### Answering the note the Restaurants page left open

> `dine-svc-social` is a phone held over a plated dish under hard light. The retail
> social card must not be a phone held over merchandise from the same angle, or the
> two pages' §7 panels will read as the same picture twice.

**Honoured.** `retail-svc-social` is a man holding a phone **up and outward** to
film a street at night, shot from behind him — different axis, different subject,
different distance.

And the frame that *would* have repeated it was found, cut and rejected:
`photo-1567182617421`, a hand holding a phone **down** over a rail of shirts. It is
the build prompt's own first choice for the slot and it is `dine-svc-social`'s
axis. It failed on exposure before the framing note ever had to be invoked — the
rail is white cotton, so it measures **88.4** whole at a centre cut and **98.5** at
zoom 0.70, and no crop gets white shirts under the bar.

### Open, for whoever shoots the next consumer page

Nothing outstanding on Retail. The one thing worth carrying forward: the two
monochrome frames in §5 (`retail-vanity-clicks`, a defocused screen whose only
colour is one red line, and `retail-blend-in`, black and white) are the only
monochrome files in this set, and they are together in the one section that argues
about sameness. That reads as a register rather than an accident. A third
monochrome frame elsewhere on the page would break it.

## Restaurants page — fourteen photographs

`/industries/retail-consumer/restaurants/`, built from
`scripts/content-industries/restaurants.php`.

Prefix **`dine-*` and `dine-svc-*`**. Not `resto-*`: that belongs to Restoration
(13 files, water and fire damage), and it is the obvious abbreviation for this page
precisely because it is already gone. `food-*` was the other candidate and was
rejected as too broad for the bars and breweries in §11.

Free licence only — every source is `images.unsplash.com/photo-*`. No
`plus.unsplash.com`, and `premium_photo-` is rejected **by name**, because
`premium_photo-1673…` contains the substring `photo-1673…` and a loose match lets
it through. Every credit was read off the rendered Unsplash search page, never from
memory.

### The measurements

Every file is cut to its slot's own aspect ratio; the set means **46.5/255**.

| file | size | slot | whole | lower ½ | text band |
|---|---|---|---|---|---|
| `dine-hero` | 2000×1000 | §1 | 34.7 | 41.2 | — |
| `dine-quick-answer` | 1400×1400 | §3 | 63.0 | 45.3 | — |
| `dine-vanity-likes` | 1116×1800 | §5 | 19.5 | 9.7 | **15.5** |
| `dine-flat-food` | 1116×1800 | §5 | 41.0 | 34.2 | **26.1** |
| `dine-app-tax` | 1116×1800 | §5 | 67.7 | 56.3 | **45.3** |
| `dine-svc-video` | 1200×1500 | §7 | 51.2 | 49.6 | — |
| `dine-svc-seo` | 1200×1500 | §7 | 37.2 | 64.4 | — |
| `dine-svc-ppc` | 1200×1500 | §7 | 41.5 | 33.8 | — |
| `dine-svc-brand` | 1200×1500 | §7 | 69.1 | 36.2 | — |
| `dine-svc-social` | 1200×1500 | §7 | 78.8 | 88.7 | — |
| `dine-svc-email` | 1200×1500 | §7 | 22.4 | 35.0 | — |
| `dine-compare` | 1120×1600 | §10 | 46.5 | 52.1 | — |
| `dine-cta` | 1400×1400 | §13 | 44.8 | 40.1 | — |
| `dine-industries-card` | 1920×1080 | card | 34.1 | 39.1 | — |

**The hero, measured on the built page rather than on the file.** §1 is a split
band: at a 1920 viewport the band is 1893×652 and the photograph is absolutely
positioned across x −0.060…0.599 of it, so both type regions sit over the picture.
Mapped back through `object-fit: cover` to source coordinates, the H1 occupies
x 0.120–0.955, y 0.276–0.495 and the body copy x 0.120–0.520, y 0.854–1.000.
Measured on the **brightest 5%** of those regions, not their means:

    H1    b5  89.6      body  b5  90.4      (ceiling ~130)

The build prompt's assumed body region — y 0.55–0.88 — is **not** where this
theme puts the body copy. It sits at the very bottom of the band, y 0.854–1.000.
The first cut of the hero measured 95.8 on the assumed region and **130.3** on the
real one, right on the ceiling. Re-cut at zoom 1.00, cx 0.30, cy 0.50 and it is
90.4. Measure where the type actually lands.

### Measure the §5 text band, not the lower half

The single most useful finding on this page, and it cost a picture.

§5's white title and description are **not** in the lower half. Measured on the
rendered card at 1920, the image box is 505×845 with `object-fit: cover` over a
1116×1800 file, and the title+description occupy **y 0.443–0.873, x 0.128–0.874**
of the painted image — a band straddling the *middle*.

`dine-flat-food` was first cut from `photo-1650532826345` (a plate of rice in
blue-cast light). It passed every check the brief names — whole 48.3, **lower half
53.2**, inside the `<55` target — and it was still unreadable, because the rice sat
exactly on the text band and that band measured **70.7**. The dark plate rim below
the rice dragged the lower-half figure down and hid the problem completely.

All three §5 frames are now measured on the band, and all three clear it: **15.5,
26.1, 45.3**. The siblings' recorded lower-half figures of 1–28 are the standard
being matched.

### Problem 1: the copy attacks dark food photography, and the answer is measurable

The page mocks "dim, lifeless photos" three times while the house rule for this
series is dark imagery. The resolution the brief sets out is that *dim and
lifeless* and *dark and appetising* are opposite things: low-key food photography
is **high contrast, not low light**. So every food frame is measured twice — the
whole crop, and the food itself against the ground it sits on:

| file | frame | food | ground behind it | food ÷ ground |
|---|---|---|---|---|
| `dine-svc-video` | 51.2 | **98.0** | 14.2 | **6.9×** |
| `dine-quick-answer` | 63.0 | **83.5** | 31.9 | **2.6×** |
| `dine-svc-social` | 78.8 | **101.2** | 66.5 | 1.5× |
| `dine-flat-food` | 41.0 | 48.7 | 35.1 | **1.39×** |

That last row is the whole argument in one number. `dine-flat-food` is the one
frame on this page **allowed to look bad**, and its food-to-ground ratio of 1.39
against `dine-svc-video`'s 6.9 is exactly what "dim and lifeless" means: the food
does not separate from what it is sitting on. **Do not "fix" it** — brightening or
warming it would make the card illustrate the opposite of its own heading, which
is "They Make Your Food Look Flat".

`dine-svc-social` is the weakest of the three positive frames and the brightest
file on the page. Nothing sits on §7's panel, so it is not a legibility risk, but
it is the frame to replace first if a darker phone-over-a-dish ever turns up.

### Problem 2: how each frame differs from `merch-*`, `trav-*` and `event-*`

Those three prefixes had already taken street food stalls, market food streets,
café interiors and terraces, a counter under a hanging lamp, hotel bars, neon BAR
signage and a candlelit banquet table. **None of the fourteen is any of those.**
What nobody had taken, and what this page now owns, is **the kitchen and the
pass** — no other file in the set has a kitchen interior, a plating shot, a range
or an expo window.

| slot | this frame | nearest neighbour, and the distance |
|---|---|---|
| `dine-hero` | a long table of diners under paper lanterns, seen from inside | `merch-hero` is a street vendor over a griddle at a *stall*; this is an interior dining room with no counter and no street |
| `dine-quick-answer` | a plated dish under a copper heat lamp at the pass | nothing in the set has a pass, a heat lamp or a plating shot |
| `dine-vanity-likes` | a neon speech bubble reading a heart and a **0** | `trav-svc-brand` is neon *signage* spelling BAR and HOTEL; this is a social glyph, not a venue sign |
| `dine-flat-food` | picked-over plates on a dark table, flatly lit | no sibling has a deliberately bad frame |
| `dine-app-tax` | a stack of plain unbranded takeaway cups under one light | `merch-aged-leads` is torn dockets on a lit rail — deliberately avoided here, see rejects |
| `dine-svc-video` | a camera shooting a lit pastry against concrete | all 13 existing `*-svc-video` frames are crews, rigs or monitors; this is the only one pointed at **food** |
| `dine-svc-seo` | a phone face down in a black room, screen light spilling | `trav-svc-seo` is a hand *holding* a phone up; no hand here, and not in a café (`merch-svc-seo`) |
| `dine-svc-ppc` | a tablet dashboard, teal dials on near-black | not lit numerals (`trav-*`), not an LED clock (`event-*`) |
| `dine-svc-brand` | a dark spirit over ice beside a blank cream menu card | no neon (`trav-*`), no candlelit place settings (`event-svc-brand`) |
| `dine-svc-social` | a hand shooting a board of breads on a phone | `trav-svc-social` films a *street*; `event-svc-social` is pinned prints |
| `dine-svc-email` | a heap of letters by one candle | the **only** `*-svc-email` in the family with no screen in it; not `trav-svc-reviews`, which is a hand *writing* by candlelight |
| `dine-compare` | a wood-lined room, banquettes receding to a lit wall | **not a colonnade** — `event-compare` and `trav-compare` both have one |
| `dine-cta` | a warm-lit room with diners at several tables | a different room from the hero's, and not a terrace (`merch-no-trust`) |
| `dine-industries-card` | the hero source re-cut to 1920×1080 | matches every sibling's `*-industries-card` |

**Confirmed absent from all fourteen:** a market stall, a café interior or terrace,
a hotel bar, a candlelit banquet table, neon venue signage, and any delivery app's
branding. No named delivery company appears anywhere on the page, in copy or in
picture. Standing bans observed: no gavel (`pro-rules`, `law-bar-rules`) and no
chess (`pro-svc-strategy`).

### Rejected on third-party branding — and both were caught by brightening, not by measuring

Two of fourteen failed rule 9, and **neither failed on its numbers**. Both were
dark. That is the point.

- **`photo-1720097943284` — an IKEA restaurant counter.** Cut to 1116×1800 it
  measured whole 59.9, lower half 36.2, comfortably inside the §5 target. At full
  resolution two digital menu screens carry the **IKEA wordmark**, one advertising
  a hot dog at 3.-, and a third screen lower in the frame carries it again. A
  restaurant marketing page carrying another company's logo is an own goal, and
  this is the card attacking delivery apps for taking a cut of other people's food.
  It also fails on subject: a self-service canteen is neither an order queue nor a
  stack of unbranded containers.
- **`photo-1596184518166` — a Razer gaming desk.** whole 18.5, lower half 17.9,
  **the darkest frame sourced for this page**, and it had already been written up
  in the content file as "a phone held in a dark room". Brightened 3.2× it is a
  mechanical keyboard, a mousepad and the **Razer three-headed-snake mark** glowing
  on the mouse.

**The lesson:** a low mean is what makes a logo hard to see, not what makes it
absent — and the darker the frame, the better it hides one. Every frame in this set
was subsequently inspected at 2.4–3.2× brightness as well as measured. Do not clear
a frame on its numbers alone.

Also rejected, on branding, before cutting: `photo-1783685094395` (a lit menu board
reading APEROL SPZ — a legible liqueur brand), `photo-1632460733798` (a McDonald's
bag), `photo-1732024007841` (a Tim Hortons bag), `photo-1600728619239` and
`photo-1604167504016` (printed logos on the bags), and every bottle-wall frame
considered for `dine-svc-brand` — back bars are solid with spirit labels.

Rejected on colliding with a sibling: `photo-1766232272162` (torn receipts on a
metal dispenser) is `merch-aged-leads` almost exactly; `photo-1571524437639` and
`photo-1658837721890` (a phone shooting bokeh at night) are `trav-svc-social`;
`photo-1540404203560` (a laptop lit amber in a black room) is already a sibling's
`*-svc-seo`.

### The landing card

`dine-industries-card` is the hero source re-cut to 1920×1080, matching the four
card photographs. Its **lower half measures 39.1**, which is the number that
matters, because the card's white title and body sit under the photograph. The
landing page once had to replace a card whose lower half measured 140 and rendered
its title unreadable.

### Applying them

```
make industry-images
make industry-category SLUG=retail-consumer
make industry-detail SLUG=restaurants
make industries
make verify
```

The container copy of `/tmp/pillar-images` is **not writable**, so the importer's
download-and-cache path fails inside it. All fourteen were fetched on the host into
this folder first; the importer then reads them with no network.

**The importer re-uses an existing attachment by `post_name` and will not replace
its file.** Re-cutting a `dine-*` JPEG is therefore not enough — delete the
attachment first, or `make industry-images` will silently keep the old picture.
That is how the Razer frame survived a re-cut once.

`url` and `credit` are complete for all fourteen, so deleting a JPEG and
re-importing **will** fetch the source back — but it fetches the **original
framing**, not the hand-cut one. Re-cut instead; the zoom/cx/cy of every non-centre
cut is recorded in that slot's note in `restaurants.php`.

---

## Food & Beverage page — fourteen photographs

Thirteen for `/industries/retail-consumer/food-beverage/` plus a fourteenth for
the new `/industries/` card. Prefix `fnb-*` / `fnb-svc-*`, which was free.
`food-*` was rejected (the Restaurants brief had already rejected it as too
broad, and it would now read as `dine-*`'s), `fb-*` reads as a social network in
a filename list, and `cpg-*` is jargon matching nothing else in this folder.

Every file is a **hand-framed crop, not a straight download.** The URL is
provenance; the checked-in JPEG is the source of truth. Deleting one and
re-running `make industry-images` fetches the *original* framing back, not this
one — re-cut it instead, using the zoom/cx/cy recorded below.

**Licence:** free Unsplash Licence, `images.unsplash.com/photo-*` only. No
`plus.unsplash.com` and no `premium_photo-*` — the cutting script rejects
`premium_photo-` **by name**, because `premium_photo-1673…` contains the
substring `photo-1673…` and a loose regex lets it through.

**Credits** were read off the rendered Unsplash *photo page*, one at a time. Each
was cross-checked twice: the CDN id recorded here was confirmed present in that
page's own markup, and the page title carried "Free Photo on Unsplash". None is
from memory.

### The catch this page had that its siblings did not: a sibling took two of these frames mid-build

`retail-*` did not exist when this photography was chosen. It was built while
this page's frames were being cut, and it shipped **two of the exact Unsplash ids
already cut and measured for this page**:

| id | what it is | cut here for | shipped as |
|---|---|---|---|
| `photo-1641499303047` | a studio light on a stand throwing hard light across a dark room | §3 quick answer | `retail-svc-video` |
| `photo-1767334850102` | a hand holding a phone up in a dark room, warm bokeh behind | §7 search panel | `retail-svc-seo` |

**Both were thrown away and re-shot** rather than shipped as duplicates. Two
pages one click apart carrying the same photograph is the single failure this
discipline exists to prevent, and "we chose it first" is not a defence a reader
can see. §3 became the amber swing-top bottle; the search panel became the lit
phone screen with a hand in front of it.

Every other prefix was then checked id by id: **fourteen `photo-*` ids here, zero
intersection** with `dine-*`, `retail-*`, `merch-*`, `supply-*`, `fleet-*`,
`resto-*`, `build-*`, `trav-*`, `event-*`, `med-*`, `npo-*`, `pro-*`, `law-*`,
`fin-*`, `estate-*` or `adj-*`. One further frame was lost to a sibling's
*subject* rather than its id: `photo-1510717029971` (a hand holding a blank white
phone screen in a black room, 9.4 whole, the darkest search candidate found) **is
`resto-svc-seo`**.

### Who owns the shelf — the boundary this page drew, recorded for the siblings

This page's opening image is a shelf, and Retail's brief had claimed "the window,
the rail, the shelf, the product, the choosing". The line drawn, and it is drawn
on whose business it is:

**Retail is the STORE. Food & Beverage is the PRODUCT.**

Retail owns the shop, the window, the rail, the mannequin, the arcade, the
customer choosing inside a place. This page owns the package, the bottle, the
case, the rank of stock and the maker's hands — **the shelf shot tight, as
competition, never wide as an interior.** Not one frame here is a shop interior,
a window display, a rail, or a customer in a store; and since Restaurants owns
the prepared dish, the kitchen and the pass, there is no plated food either.

### The measurements

| file | source | ratio | whole | lower half | brightest 5% |
|---|---|---|---|---|---|
| `fnb-hero` | 2000x1000 | 2.00 | **13.0** | 10.2 | 99.4 |
| `fnb-quick-answer` | 1400x1400 | 1.00 | **28.1** | 33.2 | 75.3 |
| `fnb-forgettable` | 1116x1800 | 0.62 | **11.2** | 16.0 | 90.6 |
| `fnb-vanity-reach` | 1116x1800 | 0.62 | **30.4** | 30.2 | 72.1 |
| `fnb-no-craving` | 1116x1800 | 0.62 | **3.9** | 5.7 | 48.3 |
| `fnb-svc-video` | 1200x1500 | 0.80 | **21.8** | 14.9 | 207.6 |
| `fnb-svc-seo` | 1200x1500 | 0.80 | **15.3** | 13.8 | 210.7 |
| `fnb-svc-ppc` | 1200x1500 | 0.80 | **38.0** | 32.6 | 140.1 |
| `fnb-svc-brand` | 1200x1500 | 0.80 | **54.7** | 46.7 | 221.1 |
| `fnb-svc-social` | 1200x1500 | 0.80 | **53.6** | 59.6 | 235.9 |
| `fnb-svc-email` | 1200x1500 | 0.80 | **16.9** | 11.1 | 76.7 |
| `fnb-compare` | 1120x1600 | 0.70 | **12.5** | 13.6 | 91.9 |
| `fnb-cta` | 1400x1400 | 1.00 | **51.1** | 78.5 | 202.7 |
| `fnb-industries-card` | 1920x1080 | 1.78 | **13.4** | 9.0 | 111.4 |

Set mean **26.0/255**, against `supply-*` 30.2 and the family's 30-40 band.
`fnb-no-craving` at 3.9 is the second-darkest file in this repository, after
`fleet-svc-email` at 3.4.

The measuring tool was re-pinned against three committed files before it was
trusted: `supply-hero.jpg` returns 21.2 / 18.2 / b5 72.6 against that page's
recorded 21.2 / 18.2 / 72.6; `fleet-svc-email.jpg` returns 3.4 / 4.4 against a
recorded 3.4 / 4.4; `estate-hero.jpg` returns 40.2 / 14.9 against the 40.2 / 14.9
transportation.php records. Exact on all three.

### Only four of the fourteen carry type, and those four were measured differently

**The hero.** Measured on the regions the type occupies, on the **brightest 5%**
of their pixels, after a cy sweep:

| crop | behind the H1 | behind the accent | behind the body |
|---|---|---|---|
| cy 0.25 | 21.7 / b5 145.4 | 22.9 / b5 140.4 | 37.8 / b5 136.1 |
| cy 0.40 | 22.8 / b5 131.6 | 14.6 / b5 116.9 | 18.6 / b5 122.4 |
| **cy 0.55 — TAKEN** | 12.9 / **b5 109.1** | 9.4 / **b5 109.4** | 18.8 / **b5 106.5** |
| cy 0.70 | 11.2 / b5 104.2 | 20.7 / b5 124.9 | 31.3 / b5 121.4 |

0.55 is the only value that puts all three regions under the ~130 ceiling at
once. 0.70 is darker behind the H1 and worse behind the other two, because the
lit rank runs diagonally through the frame.

**§5's three cards.** White title and description, bottom-anchored, sitting
*directly* on the photograph. §5 paints a 0.62 file into a **402x845** box, which
is 0.476, so `cover` keeps only the middle **76.8%** of the width. Measured over
that region:

| card | painted lower half | behind the type |
|---|---|---|
| 1 `fnb-forgettable` | 16.4 / b5 82.4 | **20.9** / b5 86.6 |
| 2 `fnb-vanity-reach` | 30.5 / b5 72.4 | **28.4** / b5 66.8 |
| 3 `fnb-no-craving` | 6.2 / b5 55.6 | **6.5** / b5 36.6 |

All three render **402x845, identical, on one row** at 1440 — measured on the
built page.

### Dark and appetising is not dim and lifeless, and both were measured

The rule the Restaurants build settled applies to every frame here with a product
in it: the **frame** falls to black, the **product** is hard-lit with real
specular highlights. `fnb-svc-social` is the clearest case — 53.6 over the whole
crop with a chocolate surface carrying blown speculars at 235.9 b5. Nothing sits
over §7's panels, so a high b5 there is craving rather than a legibility problem.

**`fnb-no-craving` is the one deliberate exception** and the only frame on the
page allowed to be unappetising: a package with no light on it, 3.9 whole,
because the copy beside it says "your brand dies inside a beautiful package
nobody picks up". **Do not "improve" its exposure.**

### The files

| file | Unsplash id | photographer | crop | subject |
|---|---|---|---|---|
| `fnb-hero` | `photo-1633119985201-7fb2c6eb1aec` | Roland Telegdi | z1.00 cx0.50 **cy0.55** | a long rank of bottle necks running away down a dark stone cellar |
| `fnb-quick-answer` | `photo-1726758004519-7ccecda8b076` | Sixteen Miles Out | centre | an amber swing-top bottle lit from one side against near-black |
| `fnb-forgettable` | `photo-1554230561-31bdc707b537` | Thomas Thompson | centre | five identical unlabelled bottles, red capsules hard-lit |
| `fnb-vanity-reach` | `photo-1635714611305-878e0ab360b0` | Mathias Reding | centre | a wall of empty stacked wooden crates raked by a low light |
| `fnb-no-craving` | `photo-1668290489991-57e108d7119e` | meriç tuna | centre | one unlabelled bottle alone on black, a thin rim of light |
| `fnb-svc-video` | `photo-1694903631966-f0e5d06cd703` | Meizhi Lang | centre | a lamp head burning white in a black room |
| `fnb-svc-seo` | `photo-1622856939297-b5381608cbb6` | Akshar Dave | centre | a phone screen glowing at an angle, a hand in silhouette before it |
| `fnb-svc-ppc` | `photo-1631644069009-ee31a1dc5ba5` | George Kroeker | centre | roasted beans weighed in a glass dish on a digital scale |
| `fnb-svc-brand` | `photo-1619893993570-0173fca3248f` | Anna Kumpan | centre | a macro of embossed glass, botanical names raised in the surface |
| `fnb-svc-social` | `photo-1771930396959-808d393d718a` | Shubham Dhage | centre | a grid of glossy chocolate squares raked by hard light |
| `fnb-svc-email` | `photo-1742690023373-38189c5498fa` | Anton Kotlovskii | centre | a red letterbox on a black door, lit from one side |
| `fnb-compare` | `photo-1548025396-689d647d00c5` | Biljana Martinić | centre | a regular grid of bottle bases seen end-on in a dark rack |
| `fnb-cta` | `photo-1608586283588-123ebe4e6e45` | Hugo Clément | centre | two cupped hands holding roasted beans under a hard light |
| `fnb-industries-card` | `photo-1633119985201-7fb2c6eb1aec` | Roland Telegdi | **z0.75 cx0.55** cy0.50 | the hero frame, cut tighter and pushed right for the 1920x1080 card |

`fnb-industries-card` is a **second cut of the hero source, not a resize of the
hero file** — a 16:9 card is read at about 400px in a grid of seventeen and wants
the lit rank filling it, where the hero is read at 1850px and needs a dark left
third for an 84px headline.

### Rejected on third-party branding, after being cut and measured

This is the hardest page in the folder for that rule, because every frame
contains packaging and packaging carries marks. Checked at 3x brightness, which
is the only check that works on a near-black frame.

| id | what it was | why it went |
|---|---|---|
| `photo-1777372291938` | two shelves of identical tins under one strip light, 46.8 — **the best hero candidate found**, literally the H1's own sentence | every tin reads **LOTÓ1**, plus SHIO, UNERI, CEREMONIAL GRADE MATCHA. The wordmark is *on the subject*, so no crop fixes it |
| `photo-1706536413975` | a hand holding a bottle up in near-black, 10.9, cut for §13 | a designed label with artwork, and the gesture reads as drinking at a party rather than reaching on a shelf |
| `photo-1566835800321` | a phone in an open palm, screen glowing, 17.7 | the phone back reads **SAMSUNG** |
| `photo-1561721632` | a camera suspended in the dark, 6.3 — the darkest candidate of the build | **MAMIYA** on the body |
| `photo-1613254025905` | a can on a black table, 92.2 | **GUINNESS** |
| `photo-1592369625625` | a bottle hard-lit on black, 40.1 | **ISLAND LAGER** |
| `photo-1614766443743` | a bottle on charcoal, 38.5 | **AEGIS BREWING** |
| `photo-1617800553712` | an amber bottle on black, 16.4 | **AESOP** |
| `photo-1619556139373` | a bottle on dark cloth, 15.4 | **ITALICUS** |
| `photo-1707425197455` | three jars on dark wood, 55.4 | **PRAKASH** |
| `photo-1560521166` | seven small bottles on dark stone, 29.0, and exactly the §5 "wall of look-alikes" | **OILY LIFE** hand-lettered across the frame |
| `photo-1655444177143`, `photo-1685798830559` | coffee packs | both branded |

### Rejected on the copy's own bans

§10 puts **"A stock photo of your box"** in the Generic Agencies column and §5
mocks **"the same 'premium, all natural' sh*t every brand slaps on"**, so:

- **the e-commerce packshot** — product centred on white or grey, evenly lit, no
  context. Not one of the fourteen is one.
- **the wholesome-natural cliché** — kraft paper and twine on a rustic board, a
  wheat field, hands cupping grain, the "clean eating" flat-lay.
  `photo-1474979266404` (an olive oil cruet with olives on stone, 82.9) and
  `photo-1759749597913` (a bottle with artisan breads, 49.8) both went on this,
  and the second measured dark enough to ship.
- **the bright supermarket aisle** — `photo-1582401656474` (98.4) and
  `photo-1670684684445`.

### What lettering survives anywhere in the fourteen

Recorded rather than claimed absent:

| file | lettering | what it is |
|---|---|---|
| `fnb-svc-brand` | TANACETUM, JUNIPERUS, MYRICA, ARTEMISIA, MENTHA, CHAMAEMELUM | botanical genus names **embossed in the glass** — plant names, not a brand, and they are the subject |
| `fnb-svc-ppc` | "max: 3kg d=0.1g", UNITS, TARE | a kitchen scale's own function markings — the same class of mark as the "Rosco V-Hazer" flight-case text `supply-svc-video` records |
| `fnb-svc-email` | an embossed relief and two words too small to read at 3x | a domestic letterbox's own decoration; no postal service mark identifiable |
| `fnb-svc-seo` | a clock and a wallpaper on a lock screen | no account, no name, no notification, no maker's mark |

**No stranger's personal data** anywhere: no plate, no phone number, no legible
screen, no identifiable face. The only people in the set are two anonymous hands
(`fnb-svc-seo`, `fnb-cta`).

### Where this set is honestly weaker

**It is bottle-heavy.** Six of the fourteen are glass containers, because that is
what the free library has that is unbranded, packaged and dark. They are pulled
apart by treatment rather than by subject — a lit rank in a cellar, a hard-lit
row of red capsules, a warm amber swing-top, a black rim-lit silhouette, a macro
of embossed glass, a cold grid of bases — and the four non-glass frames (crates,
chocolate, scale, letterbox) plus the lamp head carry the variety. Two frames are
coffee (`fnb-svc-ppc`, `fnb-cta`) and they are unalike: a top-down flat-lay of a
scale, and hands under a roaster.

**A shoot of the client's own product would replace half of this set and should.**
That is truer here than on any sibling: this is the one industry where the
photograph *is* the product being sold.

### Applying them

```bash
make industry-images                        # imports by filename stem, idempotent
make industry-detail SLUG=food-beverage
make industry-category SLUG=retail-consumer # picks up the third child
make industries                             # picks up the seventeenth card
make verify
```

## Automotive page — fourteen photographs

Thirteen for `/industries/retail-consumer/automotive/` plus a fourteenth for the
new `/industries/` card. Prefix `auto-*` / `auto-svc-*`, which was free.

**One near-miss on the prefix, recorded because a loose glob hits it.**
`automation-*` — thirteen files for `/services/ai-automation-systems/` — begins
with the letters "auto". It does not collide (no filename is shared) but
`ls auto*` in this folder now returns twenty-seven files rather than fourteen.
Use `auto-*`, with the hyphen.

Every file is a **hand-framed crop, not a straight download.** The URL is
provenance; the checked-in JPEG is the source of truth. Deleting one and
re-running `make industry-images` fetches the *original* framing back, not this
one — re-cut it instead, using the zoom/cx/cy recorded below.

**Licence:** free Unsplash Licence, `images.unsplash.com/photo-*` only. No
`plus.unsplash.com` and no `premium_photo-*` — the cutting script rejects
`premium_photo-` **by name**, because `premium_photo-1673…` contains the
substring `photo-1673…` and a loose regex lets it through, and it refuses any id
that does not start with `photo-`.

**Credits** were read off the rendered Unsplash *photo page*, one at a time, and
cross-checked twice: the CDN id recorded here was confirmed present in that
page's own markup, and the page title carried "Free Photo on Unsplash". None is
from memory. The photo-page slug is recorded with each file, because the page URL
is **not** derivable from the CDN id.

**The measuring tool was re-pinned against three committed files before it was
trusted.** `supply-hero.jpg` returns 21.2 / 18.2 / b5 72.6 against that page's
recorded 21.2 / 18.2 / 72.6. `fnb-no-craving.jpg` returns 3.9 / 5.8 / b5 48.3
against a recorded 3.9 / 5.7 / 48.3. `retail-hero.jpg` returns b5 42.2 / 16.7 /
31.2 on the three canonical hero type regions against a recorded 42.0 / 16.7 /
31.2. Exact on the brightest-5% figure, which is the number every rule here is
stated on.

### The garage was untaken, and that held up

Seventeen prefixes existed and not one had a workshop interior, a lift, an engine
bay or a hand tool in use. The four prefixes that own adjacent vehicle imagery
were checked frame by frame — `fleet-*` (tractor units, cabs, yards, fuel
islands), `build-*` (site trucks, signwritten vehicles, tools on site), `resto-*`
(vehicles under lights at night, call-outs) and `merch-*` (after-hours small
businesses, counters).

**Nothing here is a commercial fleet, a highway, a yard, a fuel island, a pickup
bed, a tool outdoors, a van arriving somewhere, or a service counter.** Every
frame is indoors and mechanical, or an instrument, or an object on a dark
surface. The one frame that leaves the bay is `auto-svc-brand`; see the weakness
note at the end.

**One frame was lost to a sibling's id and it was the best hero candidate found.**
`photo-1756575527484` is a dim garage with bonnets up and one mechanic standing
in it — literally this page's subject — and it is already
`automation-quick-answer.jpg` on `/services/ai-automation-systems/`, a page this
one links to. Thrown away rather than shipped as a duplicate one click away.
`photo-1652533625932` was caught by the same check and had already been rejected
by `real-estate.php` for reading BITCOIN.

**All fourteen ids were checked against every `photo-*` id anywhere in `scripts/`
and in this file — 657 ids, used and rejected — with zero intersection.**

### The measurements

| file | source | ratio | whole | lower half | brightest 5% |
|---|---|---|---|---|---|
| `auto-hero` | 2000x1000 | 2.00 | **26.0** | 14.2 | 165.5 |
| `auto-quick-answer` | 1400x1400 | 1.00 | **37.7** | 45.1 | 174.3 |
| `auto-ignored-trust` | 1116x1800 | 0.62 | **11.8** | 2.4 | 108.3 |
| `auto-wrong-clicks` | 1116x1800 | 0.62 | **22.7** | 21.4 | 105.0 |
| `auto-reviews-rot` | 1116x1800 | 0.62 | **9.4** | 8.6 | 61.9 |
| `auto-svc-video` | 1200x1500 | 0.80 | **46.2** | 38.5 | 138.4 |
| `auto-svc-seo` | 1200x1500 | 0.80 | **57.1** | 68.3 | 155.5 |
| `auto-svc-ppc` | 1200x1500 | 0.80 | **23.1** | 22.9 | 63.4 |
| `auto-svc-brand` | 1200x1500 | 0.80 | **38.9** | 43.1 | 173.2 |
| `auto-svc-reviews` | 1200x1500 | 0.80 | **10.1** | 11.9 | 136.5 |
| `auto-svc-email` | 1200x1500 | 0.80 | **24.7** | 20.8 | 123.2 |
| `auto-compare` | 1120x1600 | 0.70 | **34.1** | 26.2 | 172.7 |
| `auto-cta` | 1400x1400 | 1.00 | **39.7** | 45.5 | 187.8 |
| `auto-industries-card` | 1920x1080 | 1.78 | **41.0** | 34.4 | 167.1 |

Set mean **30.2/255**, identical to `supply-*` and the middle of the family's
30-40 band. No exception spent. `auto-svc-seo` at 57.1 is the brightest and is
deliberate — the frame is a lit screen in a dark room, and a screen that measures
dark is a screen that is off. It sits beside `fnb-svc-brand` 54.7 and
`fnb-svc-social` 53.6.

### Only four of the fourteen carry type, and those four were measured differently

**The hero.** Measured on the regions the type occupies, on the **brightest 5%**
of their pixels, after a cy sweep:

| crop | behind the H1 | behind the accent | behind the body |
|---|---|---|---|
| cy 0.62 | 23.4 / b5 101.3 | 24.3 / **b5 155.5** | 13.3 / b5 19.6 |
| **cy 0.70 — TAKEN** | 19.2 / **b5 70.8** | 15.7 / **b5 30.0** | 13.2 / **b5 17.9** |
| cy 0.78 | 16.3 / b5 45.2 | 13.4 / b5 19.0 | 13.4 / b5 19.0 |
| cy 0.86 | 14.4 / b5 27.0 | 13.5 / b5 19.0 | 13.6 / b5 19.0 |

0.62 fails on the **accent**, not the H1 — the lit wall crosses that band. 0.78
and 0.86 are darker still and were rejected on **reading**, not on number: they
crop down to bare bodywork and the frame stops being a garage. 0.70 is the
deepest cut that keeps the warm lit wall in the top right, which is the only
thing telling a reader this is an interior. Against the family: `retail-hero`
42.0 on its headline region, `law-hero` 25 on its worst, `fin-hero` 48,
`adj-hero` 66.3, `build-hero` 82.6, `resto-hero` 106.3, `merch-hero` 121.7,
`pro-hero` 127. The target is ~130.

**Two better subjects failed this test outright and are why the hero is a car's
flank rather than a bay.** `photo-1703632998797` (hands and a wrench deep in a
dark engine bay, 37.6 whole — now `auto-quick-answer`) reads H1 b5 176-208 at
every cy from 0.25 to 0.75, because a hard specular on the rag lands under the
headline. `photo-1728474751252` (two hands and a gasket, 33.5) reads H1 b5 150.7
and body 147.3 at its best cy. Both are fine as panels with nothing over them.

**§5's three cards.** White title and description, bottom-anchored, sitting
*directly* on the photograph. §5 paints a 0.62 file into a **402x845** box, which
is 0.476, so `cover` keeps only the middle **76.8%** of the width. Measured over
that region:

| card | painted whole | lower half where the type sits |
|---|---|---|
| 1 `auto-ignored-trust` | 10.7 | **1.5** / b5 11.2 |
| 2 `auto-wrong-clicks` | 22.7 | **20.0** / b5 87.9 |
| 3 `auto-reviews-rot` | 10.0 | **9.4** / b5 62.5 |

Target is under ~55 and all three clear it by a wide margin. `auto-ignored-trust`
at 1.5 is the darkest §5 type band in this repository. All three render
**402x845, identical, on one row** at 1440 — measured on the built page, and
identical at 1920 (505px) and 1154 (292px) too.

### Manufacturer badging was the binding constraint, and it is why the hero is not a car on a lift

A multi-brand independent shop's page carrying one manufacturer's badge implies a
franchise it does not have. Every candidate was opened at full resolution at
2.2-3.6x brightness — the only check that works on a near-black file — and
checked for badges, boot lettering, wheel-centre caps, steering-wheel logos,
dealership signage, lift-maker wordmarks and registration plates, **including in
reflections in paint and glass.** No frame was retouched; a frame carrying a mark
was replaced.

| id | what it was | why it went |
|---|---|---|
| `photo-1730461749048` | **the best hero composition found** — a saloon up on a blue two-post lift in a dark bay, 44.0 whole | a three-pointed star **and** the maker's name across the boot lid, a fully legible plate "AS-020-QA", and "TWIN BUSCH" plus "twinbusch.de" down the lift post. Four marks |
| `photo-1730461749346` | the same shop wider, 60.8 | same car, same plate, same lift wordmark |
| `photo-1730461747788` | the same car side-on, wheel off, 71.2 | same |
| `photo-1783207938137` | a vehicle in a dark garage, 46.7 | a three-pointed star centred on the bonnet |
| `photo-1669437921238` | a rear engine lid on a lift, 57.9 | the model name across it |
| `photo-1786489283327` | a supercar in a workshop, 67.8 | the rear badge plus an "ADVAN" tyre-brand sign behind it |
| `photo-1786489623043` | two cars in a dim bay, 73.3 | two manufacturer badges and two legible plates |
| `photo-1785033156637`, `photo-1767480351268` | workshop signs, and the two best "lit sign" candidates | both are a **manufacturer's service sign** — a franchise claim in a photograph |
| `photo-1783427402535` | exposed front suspension with the wheel off, 46.1 — genuinely the brief's own preferred subject | a maker's letterform on the orange panel at the right edge survives every crop that keeps the hub |
| `photo-1726994133940`, `photo-1735980968208` | a lens filling a black frame, 5.9 and 6.2 — **the darkest candidates of the build** | "CANON ZOOM LENS" and "EF-S 18-55mm" set across the barrel. A camera is a photograph of a maker's name; `photo-1561721632` went the same way on the Food & Beverage page for MAMIYA |
| `photo-1601465752808`, `photo-1549047608`, `photo-1752959809846`, `photo-1764847997209`, `photo-1758985057293`, `photo-1572284911328`, `photo-1585694588374` | assorted | rejected on the maker named in the frame or the caption, before being cut |

**What survived the badge rule is not a wide bay shot, and that is the honest
shape of this set.** Every badge-free wide frame then failed the hero's type test
instead, so the page's vehicle frames are close: the engine, the hands, the tool
in use, the flank in the dark. That is the brief's own fallback — "prefer engine
bays, wheels off the car, tools, and interiors where no badge is legible" —
followed to the letter.

### Two frames were cut, measured and then rejected on legible third-party content

Both had already been placed before the brightness pass caught them.

| id | slot it was cut for | what the pass found |
|---|---|---|
| `photo-1672220182394` | §7 search, 22.6 whole — the best candidate on numbers | at 2.6x the screen is an identifiable social app: another user's post, a username, a caption, a Follow control, and a legible mobile carrier name in the status bar. The brief asks for "no personal data on screen" |
| `photo-1757230199395` | §5 wrong-clicks, 7.9 at zoom 0.40 | captioned "red digital numbers on a dark background"; the "numbers" are a scrolling **LED sign with readable word fragments** on it, of unknown content |

`photo-1644079295201` and `photo-1681083465785` were cut for §7 email and
rejected the same way — both phone screens are a full grid of app icons, which is
dozens of third-party logos in one frame.

### The copy bans its own obvious shot

§10 puts **"A stock photo of a wrench"** in the Generic Agencies column, so the
isolated tool is banned outright: a wrench on white, a crossed
spanner-and-screwdriver, a socket set as still life. Two frames went on exactly
that rule after being cut and measured:

- `photo-1611288875785` — an adjustable wrench held up against black, 26.2, the
  second-darkest §7 candidate found. It **is** the banned frame.
- `photo-1761544775537` — tools hanging on a dark wall with nothing else, 36.7,
  and woodworking rather than automotive.

Where a tool appears here it is **in a hand, in a dark bay, with the job
visible** — `auto-hero`, `auto-quick-answer`, `auto-industries-card`.
`auto-compare` is a workshop *interior* at working distance with the bench, the
floor and the dark in frame, which is the far side of the same line.

### No chart frame survived, and the reasons will recur

The two "campaign metrics" slots wanted a chart and did not get one:

- **Exposure.** Every "analytics dashboard" frame in the free library is a white
  dashboard: `photo-1686061594225` 212.9, `photo-1686061593213` 222.0,
  `photo-1686061592689` 200.1, `photo-1625296276703` 188.4,
  `photo-1518734549841` 160.4. Not one is within 100 of the band.
- **Repetition.** The dark candlestick chart that *does* measure well is already
  this family's most-used picture — three siblings run one. A fourth was not
  worth having.
- **Message.** `photo-1745270917331` (36.6) and `photo-1671459922221` (23.4) both
  measure well and both show a chart going **up**, which contradicts the sentence
  beside them.

So `auto-wrong-clicks` is a fuel gauge on empty and `auto-svc-ppc` is an
unmeasured field of red interference. `trav-svc-ppc` set the precedent for the
abstract register on that slot with "a lit numeral on black".

### The instrument dial is this page's motif, three times, reading three things

The page argues that drivers cannot verify anything and so read whatever gauge
they are given. The readout is therefore the repeated figure, and the three are
pulled apart by what they show and by two and a half stops:

| file | reading | whole |
|---|---|---|
| `auto-wrong-clicks` | a chrome-ringed speedometer, **FUEL needle on empty** — the budget burned | 22.7 |
| `auto-reviews-rot` | an **unlit** cluster, two faint needles, one amber tell-tale — the thing nobody is tending | 9.4 |
| `auto-svc-reviews` | a crisp **blue-lit** tachometer, redline picked out — the reading a driver actually checks | 10.1 |

The first two are adjacent §5 cards, the closest pairing, and they are the two
furthest apart in treatment: a bright chrome bezel against a near-black panel.
**This is deliberate. Do not "fix" it into three unrelated pictures.**

### The reviews card is the third distinct treatment in the family

`trav-svc-reviews` is a hand writing by candlelight. `med-svc-reviews` is a star
of small lights on black. Both were read before this one was chosen.
`auto-svc-reviews` is **neither a star nor a rating on a dark surface** — it is a
graduated instrument dial, this industry's own way of showing a reading.
`auto-reviews-rot` is a dial too, so it is not a star-rating-on-dark either.
**Neither frame contains a review-site UI, a platform, a star glyph or a score.**

The trav page's note records the opposite failure on this slot and it was heeded:
a frame of stars measuring 1.7 whole with a brightest-5% of 0.9 renders as a
black rectangle, and **too dark is a real failure mode.** At 10.1 whole
`auto-svc-reviews` has a brightest-5% of 136.5 — near-black frame, legible dial.

### `auto-svc-video`: the one slot where the brief's specification could not be met

The brief asks for "a camera in a bay", on the correct reasoning that a vehicle
in frame is the one thing that would separate this card from all seventeen
existing `*-svc-video` frames. **All seventeen were read**, and every one is a
camera, a light, a crew or a monitor in a dark space — tripods, operators in
silhouette, crews at monitors, lamp heads, studio lights, a hand holding a camera
over a street.

**No camera-in-a-bay frame exists in the free library that is also dark and
badge-free.** The two "filming a car" frames measure 139.4 and 171.9 (daylight);
`photo-1653254668485` is a rigged camera against warm bokeh at 38.4 and is
`trav-svc-video`'s exact register; `photo-1629132588337` is a gimbal on a bright
yellow wall at 70.0; `photo-1563053581` is a man filming at a fuel forecourt,
which is `fleet-*`'s territory; and the two darkest lens macros carry maker names
on the barrel.

**So the differentiator is the object, not the place: a clapperboard is not a
camera, a light, a crew or a monitor,** and none of the seventeen has one. That
is a real distinction and it is the only one available. It is also **the weakest
frame in this set on relevance** — it says "filming" generically where the copy
says "your techs, your bays, and your owner on camera", and it is the
film-industry cliché.

### What lettering survives anywhere in the fourteen

Recorded rather than claimed absent.

| file | lettering | what it is |
|---|---|---|
| `auto-wrong-clicks` | MPH, km/h, FUEL, E, F, 1/2, numerals 0-65 | the instrument's own function markings — same class as the "max: 3kg d=0.1g" on `fnb-svc-ppc`'s scale. No maker's name on dial, bezel or trim at 3.0x |
| `auto-svc-reviews` | "x1000r/min", numerals 0-8 | the instrument's own units. No maker's name on dial face, needle boss or bezel — unusual for a cluster, and why this one was taken over four better-composed alternatives |
| `auto-svc-video` | PROD.NO., SCENE, TAKE, ROLL, SOUND, DATE, PROD.CO., DIRECTOR, CAMERAMAN | blank field labels printed on the slate itself. **Every field is empty** — no production name, no person, no date. No maker's mark on the slate |
| `auto-reviews-rot` | needle graduations too dim to resolve | nothing legible |

**Nowhere else in the fourteen is there any legible text at all.** No shop name,
no fascia, no signage, no plate, no screen content, no packaging.

### Slot-by-slot: no badge, no wrench-on-white, no fleet or site vehicle

| file | manufacturer badge | isolated wrench | reads as fleet / site vehicle | nearest `fleet-*` / `build-*` / `resto-*` frame, and the distance |
|---|---|---|---|---|
| `auto-hero` | none — the round chrome object is a plain filler cap, checked at 3.2x on the right half at full res; no emblem, no name | no | no — a car's flank indoors under a work lamp | `resto-*` photographs vehicles under lights **at night outdoors, arriving**; this is stationary, indoors, nobody present |
| `auto-quick-answer` | none — the frame never leaves the engine bay, so no panel, boot, grille or wheel centre is in it | no — tool in a hand, job visible | no | `build-*` owns tools **on site, outdoors**; this is inside a bonnet |
| `auto-ignored-trust` | none — the tyres are stacked crown-outward, so the frame shows **tread pattern only**; no sidewall faces camera, no maker's name, no size code, no DOT stamp | no | no — a rack of parts indoors | `fleet-*` owns **yards of trucks**; this is four tyres in a dark bay |
| `auto-wrong-clicks` | none on dial, bezel or trim at 3.0x | no | no — an instrument, no vehicle exterior | none of the three has an instrument dial |
| `auto-reviews-rot` | none on dial or binnacle at 3.0x | no | no | as above |
| `auto-svc-video` | none on the slate | no | no vehicle in frame | `fleet-svc-video` is an operator against a lit panel; `build-svc-video` an operator behind a rig; `resto-svc-video` a crew setting a light at a house. **None is a clapperboard** |
| `auto-svc-seo` | none legible on the handset at 3.0x; screen blank, no UI, no icon, no wallpaper, no face | no | no | `retail-svc-seo` and `resto-svc-seo` both hold a phone **up and outward**; this is held low and flat with a second hand behind |
| `auto-svc-ppc` | no object, no lettering, no person of any kind | no | no | none of the three is abstract |
| `auto-svc-brand` | none — the card is **unprinted**; no wordmark, no logo, no lettering, no face | no | no | `build-*` owns signwritten vehicles and site branding; this is a bench indoors |
| `auto-svc-reviews` | none at 3.0x | no | no | none has an instrument dial |
| `auto-svc-email` | none on the dial ring, body or base at 3.0x; no number on the dial card; nobody in frame | no | no | `fnb-svc-email` is a letterbox, `med-svc-email` a clock, `build-svc-email` a different frame again. **None is a telephone** |
| `auto-compare` | none legible on any tool or on the lamp at 3.0x; no signage, no fascia, no business name | **no — a workshop interior at working distance**, not a tool as still life | no | `build-*` owns tools **outdoors on site**; this is a roofed workshop at night |
| `auto-cta` | none — inside the engine bay, no panel, grille, boot or wheel centre; reflections on the rocker cover checked at 2.4x. Hands at the top edge are anonymous | no | no | `resto-*` is outdoors at night; this is a lit bay mid-job |
| `auto-industries-card` | none — never leaves the engine bay; hands and wrist anonymous, no face | no — tool in a hand across a radiator core | no | distinct from `auto-quick-answer` too: different plane, distance and photographer |

### The files

| file | Unsplash id | photographer | photo page | crop | subject |
|---|---|---|---|---|---|
| `auto-hero` | `photo-1783207938161-416ae533a7c1` | Bruno Guerrero | `dark-garage-with-a-classic-car-illuminated-by-window-light-X49Ze58GPJU` | z1.00 cx0.50 **cy0.70** | the flank and lamp of a car in a dark garage, one warm work light across the wing |
| `auto-quick-answer` | `photo-1703632998797-a8d220ce58ce` | Salvatore Tonnara | `a-man-working-on-a-car-engine-with-a-wrench-vvmIhgAlBk0` | centre | two greased hands working a spanner onto a fitting deep in a dark engine bay |
| `auto-ignored-trust` | `photo-1685883927190-1ea1c77b3e6c` | Samuel Jerónimo | `a-stack-of-tires-sitting-in-a-dark-room-VPf3IiYf73Q` | centre | a stack of four identical tyres in a dark workshop, one tread edge catching light |
| `auto-wrong-clicks` | `photo-1565105158989-36e27c7469e6` | Liam Briese | `round-meter-close-up-photography-liSsLkiQsgE` | centre | a chrome-ringed speedometer with a fuel gauge inset, the fuel needle on empty |
| `auto-reviews-rot` | `photo-1607092272679-50a2f9d0b92c` | Erik Mclean | `black-and-red-analog-speedometer-wZkRKVD-fLk` | centre | an unlit instrument cluster, two faint needles, one amber tell-tale still burning |
| `auto-svc-video` | `photo-1780516000985-08f96af45c9c` | Darko Sokoleski | `hands-holding-a-black-film-clapperboard-gj8Fsr_E68Q` | centre | two hands holding an open black clapperboard, all fields blank |
| `auto-svc-seo` | `photo-1718866033984-c3ddab9af2a0` | Jakub Żerdzicki | `a-person-holding-a-cell-phone-in-their-hand-nKGlH6_PDxk` | centre | a phone held low in a dark room, screen lit and blank, a second hand behind |
| `auto-svc-ppc` | `photo-1629406690480-3a427368c7c9` | Sajad Nori | `red-light-in-dark-room-fbc3Wt5AzWg` | centre | a dense red interference pattern raking diagonally across a black field |
| `auto-svc-brand` | `photo-1634245482457-2c64a4c893f2` | Kelly Sikkema | `a-person-holding-a-piece-of-black-paper-FsKvFy3CXy0` | centre | two hands holding a blank dark card over a slate surface, scalpel and rule beside |
| `auto-svc-reviews` | `photo-1517026575980-3e1e2dedeab4` | Chris Liverani | `white-and-blue-analog-tachometer-gauge-HUJDz6CJEaM` | centre | a tachometer lit cold blue in the dark, graduations 0-8, upper band picked out |
| `auto-svc-email` | `photo-1764583883925-24ec82b849ff` | Vanburn Gonsalves | `vintage-rotary-dial-telephone-on-a-dark-surface-Dx1lOMcX5oI` | centre | a black rotary-dial desk telephone on a dark surface, lit from one side |
| `auto-compare` | `photo-1750498407644-ed88cc6bbac4` | Sofie D. | `tools-in-a-workshop-illuminated-by-a-single-light-b5vBGnCsq_g` | centre | a dark workshop under one hanging lamp, tools ranked on the wall above a bench |
| `auto-cta` | `photo-1734535677978-b97074e264f0` | Ahmet Debelemez | `a-man-working-on-a-car-engine-in-a-garage-PqLR9V06qEo` | centre | an open engine bay lit hard from above, spanners and a screwdriver on the block |
| `auto-industries-card` | `photo-1619642751034-765dfdf7c58e` | Christian Buehner | `hands-working-on-car-engine-Fd6osyVbtG4` | centre, 1920x1080 | greased hands and a ring spanner across a radiator core in a dark engine bay |

**`auto-industries-card` is NOT a re-cut of this page's hero,** which breaks the
convention `merch-*`, `retail-*` and `fnb-*` all follow. The hero is a 26.0/255
near-black frame built to leave room for an 84px headline, and at the ~400px a
card is read at in a grid of eighteen it resolves as a dark rectangle with an
amber smear. The card is the set's most legible frame instead — hands, grease and
a spanner, three shapes a reader parses at any size. **Do not "restore" the
convention by swapping the hero in.**

### Where this set is honestly weaker

**Three of the fourteen are instrument dials.** That is the deliberate motif
described above, and it is still three dials. They are pulled apart by reading
and by exposure, and the two adjacent ones are the two furthest apart in
treatment — but a reader who dislikes the repetition is not wrong.

**`auto-svc-video` is a clapperboard, not a camera in a bay.** It is distinct from
all seventeen siblings, which was the requirement, and it is generic about
*filming* where the copy is specific about *your techs and your bays*. First in
the queue if the client's own production stills ever land.

**`auto-svc-brand` is the one frame that leaves the workshop.** The brief offered
"a lit sign, an embroidered patch, a printed card" and the first two are
unavailable under the badge rule — every lit sign is a business's name and the two
best were manufacturers' service signs. So it is the card, blank, on a designer's
bench. Honest for a slot about building an identity the client does not yet have,
and thin as illustration. `photo-1718670013988` was the alternative and it is a
finished card carrying **a real person's name**, which is worse on two rules.

**A shoot in one real independent shop would replace nine of these fourteen and
should.** This is the one industry in the series where the badge rule and the
free-stock library fight each other directly: the honest photograph of the trade
is a car with a badge on it, and the client cannot use one.

### Applying them

```bash
make industry-images                        # imports by filename stem, idempotent
make industry-detail SLUG=automotive
make industry-category SLUG=retail-consumer # picks up the fourth child + numeral
make industries                             # picks up the eighteenth card + numeral
make verify
```

## Sports page — fourteen photographs

Thirteen for `/industries/hospitality-experience/sports/` plus a fourteenth for
the new `/industries/` card — which **also serves the category page**, because
`pcic_industries()` reads `image` straight off the hub card rather than declaring
card art of its own. One file, two grids. Prefix `sport-*` / `sport-svc-*`.

**The prefix was clean, unlike Automotive's.** `ls sport*` in this folder returned
nothing before this build, so there is no adjacent prefix a loose glob catches
(compare `auto-` against `automation-`, recorded above). `ls sport*` now returns
exactly fourteen files.

Every file is a **hand-framed crop, not a straight download.** The URL is
provenance; the checked-in JPEG is the source of truth. Deleting one and
re-running `make industry-images` fetches the *original* framing back, not this
one — re-cut it instead, using the zoom/cx/cy recorded below.

**Licence:** free Unsplash Licence, `images.unsplash.com/photo-*` only. No
`plus.unsplash.com` and no `premium_photo-*` — the cutting script rejects
`premium_photo-` **by name**, because `premium_photo-1673…` contains the substring
`photo-1673…` and a loose regex lets it through, and it refuses any id that does
not start with `photo-`.

**Credits** were read off the rendered Unsplash *photo page*, one at a time, and
cross-checked twice: the CDN id recorded here was confirmed present in that page's
own markup, and the page title carried "Free Photo on Unsplash". None is from
memory. The photo-page slug is recorded with each file, because the page URL is
**not** derivable from the CDN id.

**The measuring tool was re-pinned against three committed files before it was
trusted.** `supply-hero.jpg` returns 21.2 / 18.2 / b5 72.6 against that page's
recorded 21.2 / 18.2 / 72.6. `fnb-no-craving.jpg` returns 3.9 / 5.8 / b5 48.3
against a recorded 3.9 / 5.7 / 48.3. `retail-hero.jpg` returns b5 42.2 / 16.7 /
31.2 on the three canonical hero type regions against a recorded 42.0 / 16.7 /
31.2. Exact on the brightest-5% figure, which is the number every rule here is
stated on.

**No photograph was darkened in post.** Where a number moved it moved because the
*crop* moved. The brightened renders used to hunt for marks were inspection copies
in a scratch directory; no brightened pixel was committed.

### `event-*` owns the crowd, the camera and the numerals, and it is one click away

This is the sharpest collision in the folder, because `event-*` sits in the **same
category** — `/industries/hospitality-experience/meetings-events/` — and already
owns the three frames a sports page reaches for first. Read out of
`meetings-events.php` before anything was sourced:

| event slot | subject taken |
|---|---|
| `event-hero`, `event-industries-card` | a packed audience seated in a darkened hall, a wall of small lights above |
| `event-quick-answer` | a packed auditorium over the heads of the audience, a camera operator on a platform |
| `event-cta` | a speaker from behind on stage, facing a packed tiered auditorium |
| `event-svc-video` | a broadcast camera and operator covering a lit event from the back of a dark hall |
| `event-svc-ppc` | a red LED display reading 4:59, alone in a black room |
| `event-svc-seo` | a lightbox wall of hundreds of small illuminated slides |
| `event-sells-room` | a black board of small coloured lights receding |
| `event-blend-in`, `event-compare` | runs of identical fluted columns; a colonnade at night |
| `event-svc-brand` | a banquet table under candlelight |

**So none of these is here:** the seated crowd in a dark hall, the over-the-heads
audience shot, the figure on stage facing tiers, the broadcast camera at the back
of a hall, lit numerals or a countdown, grids of small lights, colonnades. Not one
was re-shot from another angle.

**What this page owns instead is the playing surface and the structure round it,**
which no prefix in this folder had touched: floodlit turf, a stadium bowl from
outside, empty seating, a tunnel, lane lines, hurdles, a court, a hoop, a
floodlight pylon, a blank hoarding, a changing room. Eleven of the fourteen are
outdoors at night at a sports facility — a register no other prefix uses.

### Slot-by-slot: how each frame differs from its nearest `event-*` counterpart

| file | nearest `event-*` | how it differs |
|---|---|---|
| `sport-hero` | `event-hero` (seated crowd, dark hall) | outdoors, no people at all; a bowl seen from *outside* against a black sky, not an interior full of seated backs |
| `sport-quick-answer` | `event-quick-answer` (auditorium over heads, camera on a platform) | no crowd, no camera, no auditorium; a rock tunnel bore. Also not `event-blend-in`/`event-compare`: those are colonnades, this is a single bore |
| `sport-scores-only` | `event-sells-room` (board of small coloured lights) | no lights, no board; an unlit outdoor court behind chain-link |
| `sport-no-fanbase` | `event-hero` (a hall full of occupied seats) | the exact inverse — seating with nobody in it, and a short row at arm's length rather than a bank |
| `sport-no-proof` | `event-quick-answer` (a camera on a platform) | a consumer phone in two hands at arm's length, not a rig at distance |
| `sport-svc-video` | `event-svc-video` (broadcast camera, back of a dark hall) | **outdoors on the ground under a floodlight**, one operator with a handheld rig. The only outdoor camera frame among eighteen `*-svc-video`, all of which are indoors |
| `sport-svc-seo` | `event-svc-seo` (lightbox wall of small slides) | one phone, screen **off**; no array, no backlit panel |
| `sport-svc-ppc` | `event-svc-ppc` (red LED reading 4:59) | **no numeral, no digit, no display anywhere** — a painted backboard under a lamp |
| `sport-svc-brand` | `event-svc-brand` (banquet table under candlelight) | a changing room with nothing laid out and nobody in it, cold green against that frame's warm candle |
| `sport-svc-social` | `event-svc-social` (prints pinned on a wall under a lamp) | outdoors, no prints, no phone, no interior; a lamp head and snow |
| `sport-svc-sponsorship` | `event-svc-ppc` (a lit rectangle in the dark) | that one is a display *showing something*; this is a surface **showing nothing** |
| `sport-compare` | `event-compare` (a colonnade at night) | **not a colonnade** — a lane run with hurdles, horizontal repetition on the ground rather than vertical uprights |
| `sport-cta` | `event-cta` (speaker on stage facing tiers) | no stage, no figure, no crowd; turf and two floodlight banks |
| `sport-industries-card` | `event-industries-card` (seated crowd, dark hall) | outdoors, nobody in frame, a floodlit track |

### Rights: no crest, no league mark, no kit, no stadium sponsor, no athlete, no minor

Sports photography carries more third-party rights than any subject in this
folder. Every candidate was opened at full resolution at **1.5–3.2x brightness** —
the only check that works on a near-black file — and read for marks including on
advertising hoardings, big-screen content and reflections.

**Confirmed for all fourteen files:** no team crest, no league or competition
mark, no kit or equipment branding, no stadium sponsor naming, **no identifiable
athlete, and no identifiable minor.** Thirteen of the fourteen contain no person
at all; the fourteenth is noted below.

**Rejected on a legible third-party mark,** every one after being cut and
measured:

| id | what it was | the mark |
|---|---|---|
| `photo-1763854413165` | **the best §3 frame found** — a stadium bowl from the upper tier, crowd in pure silhouette, **9.5/255**, the darkest frame of the search | a run of advertising bands round the middle tier, a screen upper right, a circular mark on a panel at the left edge — and a roofline that makes the ground identifiable. Three marks; no crop saves it |
| `photo-1781624417285` | a billboard structure from below, 22.9 — **cut and placed as the sponsorship card** | the panel is not blank: a gold emblem, a brand name in display letters, two legible lines of body copy. The one slot that must carry no real brand |
| `photo-1764703666646` | a stadium interior, 105.6 | "THE HOLTE END" across the seating — a named stand, so a named club. Also failed exposure |
| `photo-1541986001468` | a floodlit field at night, 24.4 | "UNIVERSITY OF ROCHESTER" legible across the stand |
| `photo-1646186017677` | a broadcast camera, 33.0 | "DIGIPOWER 55" and the lens maker's name across the body. Same rule that took `photo-1726994133940` for CANON and `photo-1561721632` for MAMIYA |
| `photo-1780766382547` | a stadium ringed with lit LED ribbon boards, 48.2 | sponsor names by definition, and the lit display is `event-svc-ppc` |
| `photo-1787069006842` | — | rejected on the brand named in the caption |

**Rejected on people,** which on this subject is a separate rule:

| id | what it was | why |
|---|---|---|
| `photo-1770698693897` | a floodlit track and field with pylons, 26.1 — **cut as the hub card and then replaced** | ~twenty small figures in bibs on what reads as a school ground. `fit` includes "recreational and youth sports organizations" and the brief bans identifiable minors. At 1920x1080 the figures are ~25px and almost certainly unrecognisable; "almost certainly" is not the standard for a photograph of children on a client's card |
| `photo-1556764420` | a stadium from inside the crowd, 35.8 | sponsor boards on the tiers, a man in a cap filling the foreground |
| `photo-1639914771829` | a silhouette with a baseball bat against a pink sunset, 76.5 | bright, off-palette, one identifiable figure |

**The one frame containing a person is `sport-svc-video`:** an adult camera
operator, three-quarters from behind, the near side of the face catching the
floodlight so the profile is discernible at full resolution. Not retouched, not
cropped to hide it. **Not an athlete and not a minor** — a crew member at work,
the same class of subject as `pro-trust`'s man with a folder,
`event-how-planners-buy`'s man at a desk and `auto-quick-answer`'s hands. No
legible mark on the camera body, checked at 2.6x.

### What lettering survives anywhere in the fourteen

One thing, and it is recorded rather than claimed absent. **`sport-svc-brand`**
carries locker numbering — 037, 038, 039, 040, 042, 044, 045, 046, 047, 048, 083,
085 in gold on green — plus a small instruction plaque per door whose two or three
lines are illegible at any zoom. Those are the **facility's own function
markings**, the same class as the "MPH", "km/h", "FUEL", "E", "F" on
`auto-wrong-clicks` and the "max: 3kg d=0.1g" on `fnb-svc-ppc`. No club name, no
crest, no maker.

Everything else was checked and is clean: `sport-hero`'s "WARD" crowd barriers are
**cropped out entirely** at cy 0.22 (a fact about the crop — re-cutting lower
brings them back); `sport-no-fanbase`'s wall panel is a **blank rectangle** at
3.0x; `sport-no-proof`'s screen is the phone's **native camera UI** over an
indistinct blur, with no personal data, account, username or third-party app;
`sport-svc-sponsorship`'s board is an **even white field** with one weather stain
and no letterform.

### The measurements

| file | source | ratio | whole | lower half |
|---|---|---|---|---|
| `sport-hero` | 2000x1000 | 2.00 | **21.9** | 32.1 |
| `sport-quick-answer` | 1400x1400 | 1.00 | **55.1** | 53.7 |
| `sport-scores-only` | 1116x1800 | 0.62 | **34.1** | 20.4 |
| `sport-no-fanbase` | 1116x1800 | 0.62 | **36.5** | 44.9 |
| `sport-no-proof` | 1116x1800 | 0.62 | **20.8** | 14.0 |
| `sport-svc-video` | 1200x1500 | 0.80 | **15.0** | 13.3 |
| `sport-svc-seo` | 1200x1500 | 0.80 | **35.3** | 28.9 |
| `sport-svc-ppc` | 1200x1500 | 0.80 | **21.5** | 23.9 |
| `sport-svc-brand` | 1200x1500 | 0.80 | **28.4** | 40.9 |
| `sport-svc-social` | 1200x1500 | 0.80 | **33.9** | 41.8 |
| `sport-svc-sponsorship` | 1200x1500 | 0.80 | **23.0** | 29.0 |
| `sport-compare` | 1120x1600 | 0.70 | **26.3** | 21.9 |
| `sport-cta` | 1400x1400 | 1.00 | **48.4** | 6.7 |
| `sport-industries-card` | 1920x1080 | 1.78 | **50.6** | 51.7 |

**Set mean 32.9/255** over the fourteen, against `auto-*` 30.2, `supply-*` 30.2
and `fnb-*` 26.0 — the top of the family's 26–40 band, and the honest consequence
of a subject lit by floodlights. No exception spent.

### Only four of the fourteen carry type, and those four were measured differently

**The hero.** Measured on the regions the type occupies, on the **brightest 5%**
of their pixels, after a cy sweep. Note that **cx is inert on this frame**: the
source is 1.328 wide and the slot is 2.00, so the crop keeps the full width and
cuts height only — sweeping cx returned three identical numbers before that was
spotted.

| crop | behind the H1 | behind the accent | behind the body |
|---|---|---|---|
| **cy 0.22 — TAKEN** | **b5 100.5** | **b5 124.4** | **b5 58.8** |
| cy 0.25 | b5 102.3 | b5 125.8 | b5 60.2 |
| cy 0.28 | b5 104.0 | b5 126.9 | b5 68.7 |
| cy 0.38 | b5 109.7 | b5 128.9 | b5 99.9 |
| cy 0.42 | b5 111.6 | b5 129.0 | b5 108.0 |

Every cy passes, which is unusual in this folder, and 0.22 was taken because it is
the darkest while still holding the warm timber cladding and the run of lamp
standards along the bottom edge — the only things telling a reader this is a
ground and not a bridge. **The accent at 124.4 is the tightest margin on the
page** and the reason cy did not go higher. Against the family: `retail-hero` 42.0
on its headline region, `law-hero` 25, `fin-hero` 48, `adj-hero` 66.3,
`build-hero` 82.6, `resto-hero` 106.3, `merch-hero` 121.7, `pro-hero` 127. The
target is ~130.

**Two better subjects failed this test outright.** `photo-1612607696387` (floodlit
turf, 36.0 whole and 5.4 in the lower half — the strongest single frame of the
build, now `sport-cta`) reads **H1 b5 199.7–244.5 at every cy from 0.10 to 0.70**,
because the two floodlight banks sit in the headline band wherever it is cut.
`photo-1770698693897` reads a superb H1 b5 3.6 at cy 0.32, but at that cut the
frame is mostly black sky and stops reading as a venue; the first cy that keeps
the track puts body b5 at 181–196.

**§5's three cards.** White title and description, bottom-anchored, sitting
*directly* on the photograph. §5 paints a 0.62 file into a **402x845** box, which
is 0.476, so `cover` keeps only the middle **76.8%** of the width. Measured over
that region:

| card | painted whole | lower half where the type sits |
|---|---|---|
| 1 `sport-scores-only` | 36.6 | **21.3** / b5 51.5 |
| 2 `sport-no-fanbase` | 37.2 | **46.3** / b5 104.5 |
| 3 `sport-no-proof` | 22.0 | **13.3** / b5 49.9 |

Target is under ~55 and all three clear it. `sport-no-fanbase` at 46.3 is the
brightest §5 type band of the three and the tightest on the page after the hero's
accent; its b5 of 104.5 is recorded rather than buried. All three render
**402x845, identical, on one row** at 1440 — measured on the built page with
`offsetWidth`, and identical at 1920 (505px) and 1154 (292px), stacking to one
column at 800 and 500.

### Subject scale across §5 is a retreat, not a mismatch

Card one is a court at maybe twenty metres, card two a row of seats at three, card
three a pair of hands at one. **Wide, mid, close** — tracking the copy's own move
from "they post results" through "they never build the fanbase" to "no proof for
sponsors". Deliberate, and recorded so nobody flattens it to three matched middle
distances.

### Three frames depart from the brief's suggested subject

| file | brief asked for | shipped | why |
|---|---|---|---|
| `sport-quick-answer` | a camera at pitchside or in the stands | a tunnel with light at the far end | the one clean pitchside-camera frame is better spent on §7's video card, where it differs from all eighteen `*-svc-video`; the other camera candidate (`photo-1777587537110`) measures **82.0 at its darkest cy and 105.4 at its brightest**, and zooming past the flare makes it worse (78–143). The family band is 30–40 and the brightest §3 that ever shipped is 37.7 |
| `sport-scores-only` | a dark screen of bare numbers or a fixture list | an empty court through a chain-link fence | no dark numeric board survived both exposure and lettering — see below |
| `sport-svc-social` | a phone filming a floodlit surface | a floodlight pylon in falling snow | three phones already appear on the page; a fourth would have made it a page about phones |

**No dark numeric board survived.** `photo-1761384531674` is a hand-painted board
of large numerals — precisely the brief's picture — at **68.6 whole and 67.3 in
the type band**, failing §5's under-55 at every cx, and it is a Danish church hymn
board with "EFTER PRÆDIKEN" set across the middle in legible gold.
`photo-1728981815235` is a departures board at 62.2, and a board like that carries
carrier names. `photo-1576450684081` is a monitor in a teal-lit room showing rows
of coloured data bars, 24.1 in the lower half and **cut for this slot** before the
screen was read at 3.2x: it is a **music sequencer**, with track names and a
transport bar. At card size it passes for "metrics", which is exactly why it was
thrown away — `professional-services.php` records what borrowed furniture standing
in for an argument did to that page.

**No chart frame survived either, and the reasons recur.** Automotive recorded
them first and this build re-confirmed every one: every "analytics dashboard"
frame in the free library is a *white* dashboard, the dark candlestick chart that
does measure well is already this family's most-used picture across three
siblings, and the two dark data screens this build found are both taken
(`photo-1643917853964`, `photo-1643962578277`). `sport-svc-ppc` uses **the target
you aim at** instead — a lit hoop — which is sport's own native object for the
idea, and which contains no numeral, digit or display of any kind.

### The copy bans its own obvious shot, twice

§10 puts "A blurry phone photo" in the Generic Agencies column and §4 mocks "four
sh*tty phone photos your cousin took". So **no deliberately degraded phone-snap
frame is used** — unlike the Restaurants page, no slot here wants the bad version.
Where a phone appears it is a properly exposed photograph *of* a phone being used
(`sport-no-proof`, `sport-svc-seo`), never a frame pretending to be one. The test
every candidate had to pass is the siblings': **if it would fit in the Generic
Agencies column of this page's own comparison table, it is rejected.**

### Eleven id collisions, the most of any page in this family

All fourteen ids were checked against every `photo-*` id anywhere in `scripts/`
and in this file — **711 ids, used and rejected** — and there is zero
intersection. The check earned its keep: it caught `photo-1633777783568` (already
`billboard-static-billboards.jpg`, **and the blank board this page wanted**),
`photo-1767334850102` (the darkest phone frame found, 12.5),
`photo-1647067517631`, `photo-1714846201700`, `photo-1701631629857`,
`photo-1643917853964`, `photo-1643962578277`, `photo-1748792321323`,
`photo-1600856209923`, `photo-1632477829576` and `photo-1474546652694`.

### The files

| file | Unsplash id | photographer | photo page | crop | subject |
|---|---|---|---|---|---|
| `sport-hero` | `photo-1778957489702-6455b42cf3eb` | Jay Alexander | `a-stadium-at-night-with-bright-lights-and-metal-barriers-MBBOOZHElig` | z1.00 cx0.50 **cy0.22** | a stadium bowl from outside at night, roof truss white against a black sky, seating lit magenta |
| `sport-quick-answer` | `photo-1671759938110-786b3ff559ef` | Brad Switzer | `a-long-tunnel-with-a-light-at-the-end-8_YlNGOwHVY` | centre | a long tunnel receding to a bright opening, rough walls washed warm, wet floor reflecting |
| `sport-scores-only` | `photo-1775719768947-8e0266fb8ac3` | Gunay Topaloglu | `empty-basketball-court-at-night-through-a-fence-_WRDyFnB97w` | centre | an empty floodlit court at night seen through chain-link, hoop lit, nobody on the surface |
| `sport-no-fanbase` | `photo-1746051195939-097a8f848afb` | Egor Myznik | `red-seats-are-illuminated-in-a-dark-arena-bl5QDPDs2y8` | centre | a row of empty red tip-up seats along a dark arena wall, running away into shadow |
| `sport-no-proof` | `photo-1733683177710-9d4a243d4d19` | Jahanzeb Ahsan | `a-person-taking-a-picture-with-a-cell-phone-HYhKQj537QE` | centre | two hands holding up a phone in a dark warm-lit crowd, the moment small and blurred on screen |
| `sport-svc-video` | `photo-1645048985205-08ecac8495c0` | Logan Lambert | `a-man-standing-in-the-dark-holding-a-cell-phone-E5F1yYBZddg` | centre | a camera operator alone on a dark ground, one floodlight behind, monitor glowing blue |
| `sport-svc-seo` | `photo-1624948456785-4b114a80a9bd` | HamZa NOUASRIA | `person-holding-black-android-smartphone-yONWMG6cKVU` | centre | an open hand holding a phone with a blank dark screen, night street bokeh behind |
| `sport-svc-ppc` | `photo-1768168853307-3c89fd4e6cbf` | Adithya Ramakrishnan | `basketball-hoop-illuminated-at-night-on-court-XX2mlDz_rXU` | centre | a single hoop lit hard against a deep blue night sky, court marking beneath |
| `sport-svc-brand` | `photo-1781274326569-7120016a6c7e` | Alex Lion | `a-dark-locker-room-with-wooden-benches-and-black-lockers-run2RLJ_fb0` | centre | a dark changing room, green lockers numbered in gold, two pale timber benches |
| `sport-svc-social` | `photo-1509928015542-fcc9b3bcd048` | Daniel van den Berg | `stadium-floodlights-illuminating-night-snow-29Jx9qyTW14` | centre | a floodlight head throwing four hard beams down through heavy falling snow, black sky |
| `sport-svc-sponsorship` | `photo-1709107568743-03946eb2251d` | Lukas Čerkauskas | `an-empty-parking-lot-at-night-with-a-large-screen-5ZtzZcTTlhc` | centre | a large board standing lit and completely blank above a dark empty lot at night |
| `sport-compare` | `photo-1781520422375-33e7156e3546` | Steve Pancrate | `white-hurdles-on-a-black-running-track-with-lane-lines-tlaeGx8-jZU` | z1.00 **cx0.00** cy0.50 | white hurdles in a row across a black track, hard white lane lines between them |
| `sport-cta` | `photo-1612607696387-f139f76bdd6c` | Michal Balog | `green-grass-field-during-night-time-YERcZ48CyVc` | centre | a floodlit pitch at night, two banks burning through mist, green surface lit hard below |
| `sport-industries-card` | `photo-1728908053186-54a888346f82` | Mikhail K | `a-running-track-at-night-with-a-bench-in-the-background-60YIcM2JAxw` | centre, 1920x1080 | a floodlit running track curving away, white lane lines converging under one floodlight |

`sport-compare` is the one **cx** cut on the page, for the mirror of the hero's
reason: the source is 1.50 and the slot is 0.70, so the crop keeps the full height
and cuts width. cy is inert. The sweep was cx 0.00 → 26.3/21.9, cx 0.25 →
30.5/29.6, cx 0.50 → 32.6/38.1, cx 1.00 → 22.7/30.8. cx 1.00 is darker whole but
brighter in the lower half and loses the left-hand hurdle that starts the row;
0.00 is the darkest cut that keeps the full run reading as a sequence.

**`sport-industries-card` is NOT a re-cut of this page's hero,** which breaks the
convention `merch-*`, `retail-*` and `fnb-*` all follow. The hero is a 21.9/255
near-black frame built to leave a black field for a 180px headline, and at the
~400px a card is read at in a grid of nineteen it resolves as a dark rectangle
with a pink stripe. The card is the set's most legible frame instead — bright
converging lane lines under a floodlight, which reads as "sport, at night" at any
size. **Do not "restore" the convention by swapping the hero in.** At 50.6/51.7 it
is the second-brightest card in this folder after `pro-industries-card`
(102.1/89.5); the constraint is the white card title over its lower half, and the
frame this page had to beat measured 140/255 there.

### Where this set is honestly weaker

**`sport-quick-answer` is the outlier on both tone and subject.** At 55.1 it is
the brightest file in the set against a mean of 32.9, and it is warm orange
against a set that is otherwise blue, green and near-black. It is also the one
frame that does not say "sport" — a rock tunnel, not a players' tunnel. It is the
price of refusing the two camera frames above, and §3 carries no text over the
picture, so the exposure is a legibility question about nothing. If a dark,
unbranded pitchside-camera frame ever appears in the free library, this is the
slot to revisit first.

**`sport-svc-sponsorship` is not at pitchside.** The brief asked for a blank board
*under floods at a ground*; this board stands over an empty lot. The pitchside
version does not exist free and unbranded — a board at a ground has a sponsor on
it by definition, which is the whole difficulty of the slot.

**Two hoops appear on one page**, deliberately and pulled apart: `sport-svc-ppc`
is a single hoop lit hard and close, seen clean; `sport-scores-only` is a whole
court at distance behind wire with its hoop small in the middle. Different
distance, different subject, different section, and the §5 card is the negative of
the §7 one — the game unreachable versus the target in the open. Recorded so
nobody "fixes" it into two unrelated pictures.

## E-learning & Education page — fourteen photographs

Thirteen for `/industries/health-nonprofit/education/` plus a fourteenth for the
`/industries/` landing card, which the category grid reuses. Prefix `edu-*` /
`edu-svc-*`, which was free — no file in this folder began with either.

All fourteen are **free Unsplash Licence** (`images.unsplash.com/photo-*`). No
`premium_photo-*` and no `plus.unsplash.com`; the cutting script rejects the
`premium_photo-` substring **by name** before it writes a file, because
`premium_photo-1673…` contains `photo-1673…` and a loose match lets it through.
Several Unsplash+ and Getty-credited frames were surfaced by the searches and named
as such on the result pages; all were discarded unread.

**Set mean 30.8/255** over the fourteen, against `supply-*` 30.2, `auto-*` 30.2 and
`fnb-*` 26.0 — the middle of the family's 30-40 band. No exception spent.

Every file is a **hand-framed crop, not a straight download.** The id is
provenance; the committed JPEG is the source of truth. Deleting one and re-running
`make industry-images` fetches the ORIGINAL framing back, not this one — re-cut it
using the crop recorded below. No photograph was darkened, flipped, retouched or
recoloured; where a number moved, the crop moved.

### The files

| file | Unsplash id | photographer | photo page | crop | whole / lower | subject |
|---|---|---|---|---|---|---|
| `edu-hero` | `photo-1641735123823-90856d1efd39` | Denise Schuld | `gyawGRVItNE` | z1.00 cx0.50 **cy0.08** | 24.7 / 31.8 | an empty raked lecture hall after hours, identical wooden seat-desks running away under one ceiling strip light |
| `edu-quick-answer` | `photo-1770719269462-d3c1ed7e184f` | Erwan Hesry | `blackboard-with-complex-mathematical-formulas-and-symbols-aTpgq-1PdrU` | z1.00 **cx0.35** cy0.50 | 37.6 / 38.6 | a dark board packed edge to edge with handwritten mathematics, lit hard |
| `edu-sounds-like-hustlers` | `photo-1721099163762-344c8549620f` | Gildásio Filho | `721099163762` | **z0.55 cx0.90 cy0.00** | 18.1 / 15.5 | a grid of identical closed dark lockers, same lock and same number plate, dying to black at the right |
| `edu-vanity-signups` | `photo-1669049700424-2ee27c54341d` | thisGUYshoots | `669049700424` | **z0.50 cx0.52 cy0.60** | 15.4 / 28.4 | a closed notebook shut on a stack of two more on black, one warm light along its edge |
| `edu-no-proof` | `photo-1544550822-2889088fc7ba` | Viktor Talashuk | `544550822` | z1.00 **cx0.06** cy0.50 | 19.0 / 21.0 | a blank standing chalkboard on its A-frame in near-darkness, nothing written on it |
| `edu-svc-video` | `photo-1758685845902-acd5db1b532b` | Vitaly Gariev | `758685845902` | z1.00 **cx0.00** cy0.50 | 73.0 / 69.6 | a woman seen from behind at a vast chalkboard wall of dense equations, chalk in hand |
| `edu-svc-seo` | `photo-1512413294297-496b8ce65ed7` | Keyur Hardas | `512413294297` | z1.00 **cx0.60** cy0.50 | 50.0 / 40.4 | an open book, reading glasses and a phone lit with the time at 1:07 on dark cloth |
| `edu-svc-ppc` | `photo-1503789101408-444b37749472` | Matt Artz | `503789101408` | centre | 13.4 / 13.2 | two drawing compasses opened out and lit hard against pure black |
| `edu-svc-brand` | `photo-1617936805450-ae3b3796137f` | Mishaal Zahed | `617936805450` | centre | 45.2 / 19.5 | the gilded page block of a closed book seen edge-on, warm light raking the leaves |
| `edu-svc-social` | `photo-1683304554869-8a871c913096` | Jake Hill | `683304554869` | z1.00 cx0.50 **cy0.25** | 14.0 / 16.2 | a single microphone on a tall stand alone in a black room, teal and red rim light |
| `edu-svc-email` | `photo-1582567257180-eff71017288d` | an_vision | `582567257180` | z1.00 cx0.50 **cy0.00** | 25.7 / 17.8 | a sealed unmarked black envelope on black tissue and a dark box, lit from one side |
| `edu-compare` | `photo-1786397685301-2421a92593ee` | Spencer Liao | `empty-chairs-with-desks-in-classroom-r-fQhUkbMsg` | z1.00 **cx0.25** cy0.50 | 31.2 / 19.8 | a tight rank of identical empty tablet-arm chairs receding in cold blue light |
| `edu-cta` | `photo-1761635095574-3c63c3584e19` | Claire | `761635095574` | z1.00 **cx0.53** cy0.50 | 15.7 / 19.7 | a large open book on a stand under one hard light, the pages the only bright thing |
| `edu-industries-card` | `photo-1780342256302-be0e99a276c3` | Al Butler | `780342256302` | z1.00 cx0.50 **cy1.00**, 1920x1080 | 48.5 / **34.3** | an empty raked auditorium down its centre line, rank after rank of identical folded seats |

Credits were read off rendered Unsplash pages, never from memory — seven were wrong
on the reference page for exactly that reason.

### The four that carry text, measured on the brightest 5%

A mean hides a blown highlight and a letterform does not, so the hero's three type
regions and each §5 card's type band were measured on the brightest 5% of the
pixels the text actually covers. The other ten sit *beside* text, so the whole-crop
mean is the number.

`edu-hero`, on the family-canonical regions:

| region | box | mean | b5 |
|---|---|---|---|
| H1 | x 0.152-0.749, y 0.227-0.563 | 8.9 | **15.7** |
| accent | x 0.152-0.848, y 0.570-0.612 | 15.6 | 44.1 |
| body | x 0.152-0.437, y 0.650-0.880 | 41.7 | 98.3 |

**H1 b5 15.7 is the darkest headline region in this folder** — against `auto-hero`
70.8, `law-hero` 25, `retail-hero` 42.0, `fin-hero` 48, `adj-hero` 66.3,
`build-hero` 82.6, `resto-hero` 106.3, `merch-hero` 121.7, `pro-hero` 127. Target
~130.

**cy 0.00 is the trap on this frame and it fails at H1 b5 186.9** — the ceiling
strip light lands inside the headline band. Eight hundredths lower and the same
light is above it, lighting the room and touching no type. Sweep: cy 0.00 → 186.9,
**cy 0.08 → 15.7**, cy 0.14 → 59.2, cy 0.20 → 85.2, cy 0.35 → 109.0, cy 0.50 →
129.6. That single margin is why the cut is recorded to two decimals.

The §5 cards, measured over the **region §5 actually paints** — a 0.62 file into a
402x845 box is 0.476, so `cover` keeps only the middle 76.8% of the width:

| card | painted whole | type band mean | type band b5 |
|---|---|---|---|
| `edu-sounds-like-hustlers` | 15.5 | **12.2** | 39.5 |
| `edu-vanity-signups` | 15.5 | 28.6 | 58.8 |
| `edu-no-proof` | 16.5 | 18.9 | 55.4 |

Target under ~55 on the mean; the family's own §5 bands run 6.2-24.5 mean and
26.7-99.7 b5. All three are inside it, and the three whole-frame means (18.1 / 15.4
/ 19.0) are tight enough that the cards read as a set — the spread is narrower than
`npo-*`'s own trio (7.2 / 32.5 / 13.1).

`edu-sounds-like-hustlers` is the one card whose default cut **failed**: the source
has a hard raking light on the left of the locker bank and a bright tiled floor
across the bottom, and the obvious framing keeps both. Sweep: cx 0.60 → 45.4 mean /
167.0 b5, cx 0.75 → 20.0 / 89.4, **cx 0.90 → 12.2 / 39.5**, cx 1.00 at z0.45 → 7.5
/ 20.4. A b5 of 167 under white type is outside the family, not merely worse. The
darkest cut was rejected on reading: it crops down to two or three doors and stops
being a grid, and the grid is the point.

### The motif, repeated on purpose

**The board, three times, as a three-step argument** — the page's claim is that the
teaching is real and the proof of it was never gathered:

- `edu-quick-answer` — a board packed with real working, 37.6. *The teaching exists.*
- `edu-svc-video` — a lecturer at a board of the same density, 73.0. *Somebody is doing it.*
- `edu-no-proof` — a board standing in the dark with nothing on it, 19.0. *Nobody wrote the evidence down.*

Pulled apart by exposure, by scale and by whether a person is in frame, and no two
are adjacent on the built page. Deliberate, in the way `auto-*` repeats the
instrument dial three times — not a repetition to be "fixed" into three unrelated
pictures.

**The empty room, twice** — `edu-hero` (raked wooden lecture hall from the back,
2:1, warm, one strip light) and `edu-compare` (tight modern tablet-arm chairs, cold
blue, 0.70 portrait, from inside the rows). Different buildings, photographers,
colour temperature and scale. Two is the limit and a third was refused:
`photo-1780342256302` was held back for the **landing card**, where it is seen on a
different page, rather than spent as a third empty room on this one.

### How this set differs from its nearest neighbours

The brief named the three prefixes most likely to collide. Every frame in all three
was read before sourcing:

- **`npo-*`** is this page's nearest sibling — same category, same "warm light in
  darkness" territory. All thirteen were checked. Its closest approaches are
  `npo-svc-brand` (gold ornament **tooled into a leather cover**) against
  `edu-svc-brand` (the **page block edge-on**, no cover, no tooling, the gold being
  gilding on leaves); and `npo-guilt-trip` (a stack of **featureless moulded
  slabs**) against `edu-sounds-like-hustlers` (**lockers with locks and numbers**, a
  wall not a stack). `npo-svc-email` is a lit phone face-up on black;
  `edu-svc-email` is an unlit sealed envelope.
- **`merch-*`** owns the two frames this page would most obviously have reached for:
  a **desk lamp over an open pad of handwritten notes** (svc-strategy) and a
  **person in headphones bent over a phone** (svc-email). `edu-vanity-signups` is
  the deliberate inverse of the first — the book is **closed**, there is **no lamp
  in frame**, and nothing is written anywhere in it. `edu-svc-email` has no person
  and no screen at all. `merch-svc-ppc`'s antique adding machine is why the
  calculator route was abandoned for `edu-svc-ppc`.
- **`event-*`** owns the **packed auditorium seen over the heads of the audience**
  and the **speaker on stage facing tiered seating**, so the full lecture hall is
  gone; `edu-hero` and `edu-industries-card` are both **empty**, which is a
  different argument. It also owns the **backlit glowing keyboard**
  (svc-automation) and the **lightbox wall of illuminated slides** (svc-seo) —
  neither appears here.

Per-slot, against the rest of the family: `edu-svc-video` is the only one of
nineteen that is a **person teaching** rather than a rig, crew, monitor,
clapperboard or lamp head. `edu-svc-ppc` is the only **drawing instrument** among
nineteen dashboards, tickers, dials and charts. `edu-svc-social` is the only
**microphone** among nine. `edu-compare` is the only **desks** — eight of the
siblings' compare frames are a receding corridor and two more are an arcade and a
colonnade, which the brief bans by name. `edu-svc-email` is the only **sealed
envelope** among sixteen.

### The bans, and confirmation

**No countdown timer, urgency badge, "limited spots" overlay, fake-scarcity UI or
grinning-presenter-with-a-headset frame** anywhere in the fourteen — which matters
more than usual here, because this page's own comparison table puts "A countdown
timer" in the Generic Agencies column and the copy mocks one three more times. The
test applied to every frame is the siblings': *if it would fit in the Generic
Agencies column of this page's own comparison table, it is rejected.* **No
graduation cap on a laptop and no lightbulb over a book**, the two laziest
education clichés. **No gavel** (`pro-rules`, `law-bar-rules`) and **no chess**
(`pro-svc-strategy`) — the latter came up as `photo-1597774344371` in the
drawing-instruments search and was dropped on the name.

*One honest note on that ban:* `edu-quick-answer` is a board of roughly two hundred
chalk marks and one of them is a small hand-drawn lightbulb among the equations.
That is incidental working inside a frame whose subject is dense real mathematics,
not the stock cliché, which is a lit bulb *as the subject* standing in for "ideas".
Recorded rather than quietly kept.

**No identifiable minor.** This was the hardest single rule, because `fit` includes
private and charter schools and tutoring. **Twelve of the fourteen contain no
people at all.** The two that do are `edu-svc-video` — one adult woman seen entirely
from behind — and nothing else. Every "child in a classroom" frame the searches
surfaced was rejected on sight, including three from one shoot:
`photo-1758685733699` and `photo-1758685733685` ("Boy standing before a
blackboard", "Young boy writing complex formulas") and the `V1yA4dDTXg8` frame of
the same subject.

**No platform UI, no third-party branding, no institution crest.** Every candidate
was opened at full resolution at 1.3-4.0x brightness — the only check that works on
a near-black file — and screens, spines, covers, instruments and reflections were
read. Specifically: `edu-svc-seo`'s phone shows a **lock-screen clock reading 1:07
and nothing else** — no app, no notification, no username, which is the exact check
`photo-1672220182394` failed on the Automotive page when its screen turned out to
carry a stranger's social post. `edu-hero`'s seat backs carry **illegible pencil
graffiti and a small arrow doodle**, unreadable at 3x and invisible at the
committed exposure. `edu-sounds-like-hustlers` carries **pressed numerals 22-27**
and no maker's name on doors or locks. `edu-industries-card` carries **seat
numbers** only. `edu-vanity-signups`' cover carries a **blind-embossed script**,
illegible at 4x and cropped out of the committed frame anyway. `edu-cta`'s open
spread is a **plate-book of historical calligraphy with collector's seals** — a
scholarly reference volume, checked because an open book on a stand under a
spotlight invites a religious reading, and it is not that.

### Rejected after being downloaded, cut or measured

| id | why |
|---|---|
| `photo-1766476210492` | **The brief's own subject for `edu-svc-video`** — a tripod camera in an empty classroom — and it would have been distinct from all nineteen. A daylight interior with windows on both sides: 114.5 at its darkest crop, 119.2 and 136.4 tighter. Exposure. |
| `photo-1741236896522` | **The brief's own subject for `edu-svc-social`** — a phone on a small tripod with the live picture on its screen. 80.1 at its darkest useful crop with b5 240, blown by two ceiling strip lights; plus out-of-focus people whose ages cannot be established, plus a printed banner. Three reasons. |
| `photo-1725384800615` | An open book, glasses and a phone beside a **backlit glowing keyboard**, 26.8 — a good number and the exact frame `event-svc-automation` owns. |
| `photo-1736066330610` | A real lecture in progress at a written board, 42.7 — shot **over the heads of the seated audience**, which is `event-hero`'s frame, with people of indeterminate age in it. Rejected twice over. |
| `photo-1607501197654` | Gold ornament on black, **17.6 — the best `svc-brand` number of the whole search.** At 1x it reads "S.D.A", "SELECTION DES ANGES", "GRANDE CHAMPAGNE", "COGNAC", "FERRAND". Five marks, one an alcohol brand, on a page about schools. No crop saves it. |
| `photo-1556888335` | A blank black sheet with a white pencil carrying a **legible maker's name** across the barrel. Went the way `photo-1726994133940` went for CANON and `photo-1561721632` for MAMIYA. |
| `photo-1616441065574` | Same shoot, same branded pencil, 35.9. |
| `photo-1773867943879` | The **Luxembourg coat of arms** — a legible official crest in a photograph. |
| `photo-1695923142527` | A wiped green-black chalkboard, 40.4, type band 37.0/50.5 at its best cut. **The numbers pass.** Rejected on reading: cropped to 0.62 portrait it is a featureless dark green field with no edge, frame or ledge, and it reads as a wall. A texture in a card slot is a placeholder. |
| `photo-1737053618295` | Four chalk sticks on a wiped board, 68.1. Board genuinely blank and chalk genuinely present — but the chalk is pastel-bright and every portrait crop either put it in the type band or cropped it out and left the texture problem above. |
| `photo-1701505708183` | "A stack of black paper", 41.4 — a **CGI render** of curved paper, not a photograph, and it does not read as study material. |
| `photo-1641199435172` | A half-open laptop spilling rainbow light into total blackness, **7.7 — one of the darkest frames of the build.** It is `supply-svc-seo` and `fleet-svc-seo` over again. |
| `photo-1773507119465`, `photo-1777639629986` | Vintage wooden abacus, 117.9 and 92.4. Exposure. |
| `photo-1711062717319`, `photo-1711062717294` | Chalk sticks on a ledge, 79.9 and 61.4. Exposure. |
| `photo-1777639629775` | A protractor on a chalkboard, 116.2 — the blank-board idea, right subject. Exposure. |
| `photo-1784989966317`, `photo-1777259759623`, `photo-1760121788536`, `photo-1772431176124`, `photo-1738308508484`, `photo-1763706320063` | Empty classrooms, lecture halls and theatres at 84.5, 94.2, 121.8, 78.0, 59.9 and 25.2. All daylight or off-subject (cinema seating); the last is dark but reads cinema, not teaching. |
| `photo-1780342256302` variants at cy 0.00 / 0.50 | Card lower half 56.3 and 44.0 against 34.3 at cy 1.00 — the lit ceiling inside the title band. |
| `photo-1784152633137` | "Vintage books on a dark shelf", 41.7 — **library shelving**, which `pro-*` and `law-*` own. |
| `photo-1749019489428`, `photo-1709989021674` | Envelopes at 109.5 and 60.1. Exposure. |
| `photo-1551396028` | "Closed black book", 205.5. Exposure. |
| `photo-1766117651759` | "An open book on a reflective surface", 112.9. Exposure. |

**Five candidates were lost to the id check alone**, after being downloaded and
measured, because they are already committed elsewhere in this repository:
`photo-1771707691434` (empty seats in a dark room, 31.8), **`photo-1758611195875`**
(a dim hallway of lockers, 24.0 — very close to this page's own §5 card),
`photo-1637239990694` (a calculator, 50.0), `photo-1605066902012` and
`photo-1780171865622`. All fourteen committed ids were checked against every
`photo-*` id anywhere in `scripts/` and in this file — **711 ids, used and
rejected — with zero intersection.**

### Where this set is honestly weaker

**`edu-svc-video` is the outlier on exposure.** At 73.0 it is the brightest of the
fourteen and the only one above 51, against a set mean of 30.8. The brief's stated
ceiling for the nine no-text slots is "whole-crop mean well under 100/255", which it
meets; the family's own ~30 is what it misses. It was kept because the alternative
was a **nineteenth camera rig** — all eighteen existing `*-svc-video` frames are a
rig, crew, monitor, clapperboard or lamp head, and not one has a person teaching in
it, while this card's copy is "Your teaching… on camera". The frame that would have
satisfied both, `photo-1766476210492`, is in the rejection table at 114.5. **This is
the first slot to revisit** if a dark, unbranded camera-on-a-teaching-surface frame
ever appears free.

**`edu-no-proof` is a pavement A-board, not a schoolroom board.** What the slot
needs is a blank writing surface standing in the dark, which is exactly what it is,
and beside copy about unproven claims it reads correctly — but it is the sort of
board a shop puts on the footway. **Second slot to reshoot.**

**`edu-svc-social` is a microphone, and a mic on a stand reads "stage" or "podcast"
before it reads "social media."** It is the right register for a page about being
believed and the wrong one for a page about feeds. It is there because every
phone-filming frame either duplicated a sibling or failed exposure — see
`photo-1741236896522` above. **Third slot to reshoot.**

**`edu-cta` is an object where the brief asked for a space** ("a lit teaching space
filling a dark square frame"). Every available lit interior was daylight (78.0,
59.9). A §13 band is read at a glance, and one bright shape on black carries further
than a dim room, so the substitution is defended rather than merely admitted.

**`edu-svc-brand` has the widest whole-to-lower spread in the set** (45.2 / 19.5):
the gilt page block is bright and the space beneath it is black. §7 carries no text
over the picture, so this is a composition observation, not a legibility one.
