PS D:\Timepilot1\frontend> npm run build 2>&1 | Select-String -Pattern "Hero|Starfield|error|Error|Expected|got|line|column"

FATAL: An unexpected Turbopack error occurred. A panic log has been written to 
C:\Users\nette\AppData\Local\Temp\next-panic-cd61fb526364f9ebd07e413f800142b0.log.
To help make Turbopack better, report this error by clicking here.
> Build error occurred
Error [TurbopackInternalError]:   ├ù Expected ',', got 'ident'
-   ├ù Expected ',', got 'ident'
   1275 Γöé           tp-hero-glow
   1276 Γöé           tp-hero-glow-left
  lineHeight: "1",
  flexDirection: "column",
  gridTemplateColumns: "1fr 1fr",
  throw new Error("[lucide]: iconNode is required when icon name is used");
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  name: "chart-column",
  const ChartColumn = createLucideIcon(__iconData1);
     HERO CONFIG
  ================================================================ */ const HERO = {
  titleLine1: "Take control",
  titleLine2: "of your time.",
  headline: "Your strongest focus window is",
  headlineStrong: "9:00 ΓÇô 11:00.",
  function Hero() {
  const heroRef = (0, __TURBOPACK__imported__module__71645__1["useRef"])(null);
  const hero = heroRef.current;
  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  hero.addEventListener("mousemove", handleMouseMove);
  hero.addEventListener("mouseleave", handleMouseLeave);
  hero.removeEventListener("mousemove", handleMouseMove);
  hero.removeEventListener("mouseleave", handleMouseLeave);
  ref: heroRef,
  className: "jsx-6bfc920dc97b9d6f" + " " + "tp-hero",
  className: "jsx-6bfc920dc97b9d6f" + " " + "tp-hero-background",
  playsInline: true,
            tp-hero-glow
            tp-hero-glow-left
            tp-hero-glow
            tp-hero-glow-right
  className: "jsx-6bfc920dc97b9d6f" + " " + "tp-hero-container",
  className: "jsx-6bfc920dc97b9d6f" + " " + "tp-hero-eyebrow",
  children: HERO.eyebrow
  className: "jsx-6bfc920dc97b9d6f" + " " + "tp-hero-title",
  children: HERO.titleLine1
  className: "jsx-6bfc920dc97b9d6f" + " " + "tp-hero-title-light",
  children: HERO.titleLine2
  className: "jsx-6bfc920dc97b9d6f" + " " + "tp-hero-description",
  children: HERO.description
  className: "jsx-6bfc920dc97b9d6f" + " " + "tp-hero-buttons",
  href: HERO.primaryCta.href,
  children: HERO.primaryCta.label
  href: HERO.secondaryCta.href,
  children: HERO.secondaryCta.label
  children: HERO.trust.map((item, index)=>/*#__PURE__*/ (0, 
__TURBOPACK__imported__module__43476__2["jsxs"])("div", {
  const Icon = item.icon === "calendar" ? CalendarDays : item.icon === "brain" ? Brain : ChartColumn;
  APP_DASHBOARD.aiPanel.headline,
  children: APP_DASHBOARD.aiPanel.headlineStrong
  children: '.tp-hero.jsx-6bfc920dc97b9d6f{color:#fff;background:#020408;width:100%;min-height:100vh;padd
ing-top:150px;padding-bottom:100px;position:relative;overflow:hidden}.tp-hero-background.jsx-6bfc920dc97b
9d6f{z-index:0;pointer-events:none;background:#020408;position:absolute;inset:0;overflow:hidden}.tp-earth
-video.jsx-6bfc920dc97b9d6f{object-fit:cover;object-position:center center;opacity:.9;filter:brightness(.
7)saturate(1.12)contrast(1.06);will-change:transform;background:#020408;width:106%;height:106%;display:bl
ock;position:absolute;inset:-3%;transform:scale(1.045)}.tp-earth-overlay.jsx-6bfc920dc97b9d6f{z-index:1;b
ackground:linear-gradient(#01030761 0%,#01030726 28%,#0103073d 50%,#010307a3 76%,#020408 100%);position:a
bsolute;inset:0}.tp-earth-overlay.jsx-6bfc920dc97b9d6f:after{content:"";background:radial-gradient(#00000
005 0%,#0000001f 48%,#00000080 100%);position:absolute;inset:0}.tp-earth-glow.jsx-6bfc920dc97b9d6f{z-inde
x:3;filter:blur(55px);pointer-events:none;background:radial-gradient(#2891ff33,#1964dc12 38%,#0000 72%);b
order-radius:50%;width:min(1000px,90vw);height:300px;position:absolute;bottom:-8%;left:50%;transform:tran
slate(-50%)}.tp-hero-glow.jsx-6bfc920dc97b9d6f{z-index:5;filter:blur(120px);pointer-events:none;opacity:.
22;will-change:transform;border-radius:50%;width:600px;height:600px;position:absolute}.tp-hero-glow-left.
jsx-6bfc920dc97b9d6f{background:#5c3ebe2b;top:100px;left:-430px}.tp-hero-glow-right.jsx-6bfc920dc97b9d6f{
background:#2864b426;top:450px;right:-430px}.tp-hero-container.jsx-6bfc920dc97b9d6f{z-index:10;text-align
:center;width:min(1280px,100% - 40px);margin:0 auto;position:relative}.tp-hero-eyebrow.jsx-6bfc920dc97b9d
6f{color:#ffffffc2;-webkit-backdrop-filter:blur(18px);background:#0a0f1694;border:1px solid 
#ffffff24;border-radius:999px;align-items:center;gap:9px;height:34px;padding:0 
14px;font-size:11px;font-weight:600;display:inline-flex;box-shadow:0 10px 35px #00000047}.tp-eyebrow-dot.
jsx-6bfc920dc97b9d6f{background:#62f7c2;border-radius:50%;width:6px;height:6px;animation:2.5s 
ease-in-out infinite tp-pulse;box-shadow:0 0 12px #62f7c2e6}.tp-eyebrow-arrow.jsx-6bfc920dc97b9d6f{color:
#ffffff6b}.tp-hero-title.jsx-6bfc920dc97b9d6f{letter-spacing:-.075em;color:#fff;text-shadow:0 8px 50px 
#000000a6;max-width:1000px;margin:25px auto 0;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI
,sans-serif;font-size:max(58px,min(8.5vw,118px));font-weight:720;line-height:.9}.tp-hero-title.jsx-6bfc92
0dc97b9d6f>span.jsx-6bfc920dc97b9d6f{display:block}.tp-hero-title-light.jsx-6bfc920dc97b9d6f{color:#fffff
f85;letter-spacing:-.082em;font-weight:420}.tp-hero-description.jsx-6bfc920dc97b9d6f{color:#ffffffad;lett
er-spacing:-.018em;text-shadow:0 4px 25px #000000a6;max-width:620px;margin:30px auto 0;font-size:max(15px
,min(1.5vw,18px));line-height:1.6}.tp-hero-buttons.jsx-6bfc920dc97b9d6f{justify-content:center;align-item
s:center;gap:12px;margin-top:32px;display:flex}.tp-get-started.jsx-6bfc920dc97b9d6f{color:#050505;backgro
und:#fff;border:1px solid 
#ffffffe6;border-radius:999px;justify-content:center;align-items:center;gap:18px;height:58px;padding:0 
9px 0 25px;font-size:15px;font-weight:650;text-decoration:none;transition:transform .3s,box-shadow 
.3s;display:inline-flex;box-shadow:0 12px 35px 
#00000073}.tp-get-started.jsx-6bfc920dc97b9d6f:hover{transform:translateY(-3px);box-shadow:0 18px 45px #0
0000094}.tp-get-started-icon.jsx-6bfc920dc97b9d6f{color:#fff;background:#050505;border-radius:50%;justify
-content:center;align-items:center;width:40px;height:40px;display:flex}.tp-explore.jsx-6bfc920dc97b9d6f{c
olor:#ffffffe6;-webkit-backdrop-filter:blur(15px);background:#080d148c;border:1px solid 
#ffffff2e;border-radius:999px;justify-content:center;align-items:center;gap:20px;height:58px;padding:0 
22px;font-size:15px;font-weight:600;text-decoration:none;transition:transform .3s,background .3s;display:
inline-flex}.tp-explore.jsx-6bfc920dc97b9d6f:hover{background:#ffffff1a;transform:translateY(-3px)}.tp-ex
plore-arrow.jsx-6bfc920dc97b9d6f{color:#ffffff8c;font-size:19px;transition:transform 
.3s}.tp-explore.jsx-6bfc920dc97b9d6f:hover .tp-explore-arrow.jsx-6bfc920dc97b9d6f{transform:translateY(3p
x)}.tp-trust.jsx-6bfc920dc97b9d6f{color:#ffffff85;justify-content:center;align-items:center;gap:17px;marg
in-top:27px;font-size:12px;display:flex}.tp-trust-group.jsx-6bfc920dc97b9d6f{align-items:center;gap:17px;
display:flex}.tp-trust-item.jsx-6bfc920dc97b9d6f{align-items:center;gap:8px;display:flex}.tp-trust-icon.j
sx-6bfc920dc97b9d6f{border-radius:50%;justify-content:center;align-items:center;width:19px;height:19px;di
splay:flex}.tp-trust-purple.jsx-6bfc920dc97b9d6f .tp-trust-icon.jsx-6bfc920dc97b9d6f{color:#a78bfa;backgr
ound:#8b5cf62e}.tp-trust-blue.jsx-6bfc920dc97b9d6f .tp-trust-icon.jsx-6bfc920dc97b9d6f{color:#60a5fa;back
ground:#3b82f62e}.tp-trust-green.jsx-6bfc920dc97b9d6f .tp-trust-icon.jsx-6bfc920dc97b9d6f{color:#34d399;b
ackground:#10b9812e}.tp-trust-divider.jsx-6bfc920dc97b9d6f{background:#ffffff29;width:1px;height:18px}.tp
-preview-wrapper.jsx-6bfc920dc97b9d6f{width:100%;margin-top:70px;position:relative}.tp-browser-window.jsx
-6bfc920dc97b9d6f{background:#fff;border:1px solid #ffffff24;border-radius:30px;width:min(1080px,100% - 
80px);margin:0 auto;transition:transform 
.5s;position:relative;overflow:hidden;transform:perspective(1600px)rotateX(1deg);box-shadow:0 45px 120px 
#0009,0 15px 45px #00000059}.tp-browser-window.jsx-6bfc920dc97b9d6f:hover{transform:perspective(1600px)ro
tateX(0)translateY(-4px)}.tp-browser-header.jsx-6bfc920dc97b9d6f{background:#fffffff5;border-bottom:1px 
solid #00000012;grid-template-columns:1fr auto 1fr;align-items:center;height:58px;padding:0 22px;display:
grid}.tp-browser-controls.jsx-6bfc920dc97b9d6f{align-items:center;gap:8px;display:flex}.tp-browser-contro
ls.jsx-6bfc920dc97b9d6f span.jsx-6bfc920dc97b9d6f{background:#d8d8d8;border-radius:50%;width:9px;height:9
px}.tp-browser-controls.jsx-6bfc920dc97b9d6f span.jsx-6bfc920dc97b9d6f:first-child{background:#c5c5c5}.tp
-browser-address.jsx-6bfc920dc97b9d6f{color:#9a9a9a;background:#f8f8f8;border:1px solid #00000012;border-
radius:999px;justify-content:center;align-items:center;min-width:130px;height:34px;padding:0 18px;font-si
ze:10px;display:flex}.tp-browser-more.jsx-6bfc920dc97b9d6f{color:#aaa;justify-self:end}.tp-app.jsx-6bfc92
0dc97b9d6f{text-align:left;background:#f6f6f6;grid-template-columns:190px 
minmax(0,1fr);min-height:475px;display:grid}.tp-app.jsx-6bfc920dc97b9d6f .jsx-6bfc920dc97b9d6f{text-align
:left}.tp-app-sidebar.jsx-6bfc920dc97b9d6f{background:#fff;border-right:1px solid 
#00000012;flex-direction:column;padding:22px 13px;display:flex}.tp-app-logo.jsx-6bfc920dc97b9d6f{color:#f
ff;background:#000;border-radius:11px;justify-content:center;align-items:center;width:36px;height:36px;ma
rgin:0 8px 30px;font-size:14px;font-weight:700;display:flex}.tp-app-navigation.jsx-6bfc920dc97b9d6f{flex-
direction:column;gap:5px;display:flex}.tp-app-nav.jsx-6bfc920dc97b9d6f{color:#999;border-radius:11px;alig
n-items:center;gap:10px;height:42px;padding:0 11px;font-size:11px;font-weight:550;display:flex;position:r
elative}.tp-app-nav.active.jsx-6bfc920dc97b9d6f{color:#111;background:#f1f1f1}.tp-app-nav.active.jsx-6bfc
920dc97b9d6f:before{content:"";background:#000;border-radius:999px;width:3px;height:24px;position:absolut
e;top:9px;left:-13px}.tp-app-user.jsx-6bfc920dc97b9d6f{border-top:1px solid 
#0000000f;align-items:center;gap:9px;margin-top:auto;padding:15px 8px 8px;display:flex}.tp-user-avatar.js
x-6bfc920dc97b9d6f{color:#fff;background:#111;border-radius:50%;justify-content:center;align-items:center
;width:30px;height:30px;font-size:9px;font-weight:700;display:flex}.tp-user-name.jsx-6bfc920dc97b9d6f{col
or:#333;font-size:9px;font-weight:650}.tp-user-type.jsx-6bfc920dc97b9d6f{color:#aaa;margin-top:2px;font-s
ize:8px}.tp-app-main.jsx-6bfc920dc97b9d6f{background:linear-gradient(#f7f7f7 0%,#f4f4f4 
100%);min-width:0;padding:28px 30px 32px}.tp-app-heading.jsx-6bfc920dc97b9d6f{justify-content:space-betwe
en;align-items:center;display:flex}.tp-app-date.jsx-6bfc920dc97b9d6f{color:#a1a1a1;letter-spacing:.09em;f
ont-size:9px;font-weight:650}.tp-app-heading.jsx-6bfc920dc97b9d6f 
h2.jsx-6bfc920dc97b9d6f{color:#111;letter-spacing:-.055em;margin:7px 0 
4px;font-size:29px;font-weight:650;line-height:1}.tp-app-heading.jsx-6bfc920dc97b9d6f p.jsx-6bfc920dc97b9
d6f{color:#999;margin:0;font-size:10px}.tp-profile.jsx-6bfc920dc97b9d6f{color:#fff;background:#111;border
-radius:50%;justify-content:center;align-items:center;width:36px;height:36px;font-size:10px;font-weight:7
00;display:flex}.tp-stats.jsx-6bfc920dc97b9d6f{grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;mar
gin-top:24px;display:grid}.tp-mini-stat.jsx-6bfc920dc97b9d6f{background:#ffffffd1;border:1px solid 
#0001;border-radius:14px;padding:15px 16px}.tp-mini-stat-label.jsx-6bfc920dc97b9d6f{color:#9b9b9b;text-tr
ansform:uppercase;letter-spacing:.06em;font-size:8px;font-weight:650}.tp-mini-stat-value.jsx-6bfc920dc97b
9d6f{color:#111;margin-top:7px;font-size:18px;font-weight:700;line-height:1}.tp-mini-stat-change.jsx-6bfc
920dc97b9d6f{color:#777;margin-top:7px;font-size:8px}.tp-mini-stat.jsx-6bfc920dc97b9d6f:after{content:"";
background:#8b5cf6;border-radius:999px;width:20px;height:2px;margin-top:10px;display:block}.tp-mini-stat.
jsx-6bfc920dc97b9d6f:nth-child(2):after{background:#3b82f6}.tp-mini-stat.jsx-6bfc920dc97b9d6f:nth-child(3
):after{background:#10b981}.tp-dashboard-grid.jsx-6bfc920dc97b9d6f{grid-template-columns:minmax(0,1.55fr)
 minmax(220px,.75fr);gap:12px;margin-top:12px;display:grid}.tp-schedule.jsx-6bfc920dc97b9d6f{background:#
fff;border:1px solid #0001;border-radius:16px;padding:18px}.tp-section-heading.jsx-6bfc920dc97b9d6f{justi
fy-content:space-between;align-items:center;margin-bottom:10px;display:flex}.tp-section-heading.jsx-6bfc9
20dc97b9d6f span.jsx-6bfc920dc97b9d6f{color:#aaa;letter-spacing:.08em;font-size:8px;font-weight:650}.tp-s
ection-heading.jsx-6bfc920dc97b9d6f h3.jsx-6bfc920dc97b9d6f{color:#111;margin:5px 0 
0;font-size:15px;font-weight:650;line-height:1}.tp-section-heading.jsx-6bfc920dc97b9d6f 
button.jsx-6bfc920dc97b9d6f{color:#888;background:#fafafa;border:1px solid 
#00000012;border-radius:7px;padding:6px 
9px;font-size:9px}.tp-schedule-row.jsx-6bfc920dc97b9d6f{grid-template-columns:54px minmax(0,1fr);min-heig
ht:57px;display:grid}.tp-schedule-time.jsx-6bfc920dc97b9d6f{color:#a0a0a0;padding-top:10px;font-size:9px;
font-weight:650}.tp-schedule-content.jsx-6bfc920dc97b9d6f{border-left:1px solid #e5e5e5;padding:9px 
12px}.tp-schedule-row.active.jsx-6bfc920dc97b9d6f 
.tp-schedule-content.jsx-6bfc920dc97b9d6f{background:linear-gradient(90deg,#f7f7f7,#fff);border-left:2px 
solid #111;border-radius:0 10px 10px 0}.tp-schedule-title.jsx-6bfc920dc97b9d6f{color:#1c1c1c;font-size:10
px;font-weight:700}.tp-schedule-description.jsx-6bfc920dc97b9d6f{color:#a0a0a0;margin-top:4px;font-size:8
px}.tp-schedule-row[data-type=break].jsx-6bfc920dc97b9d6f 
.tp-schedule-content.jsx-6bfc920dc97b9d6f{background:0 0;border-left-style:dashed}.tp-ai-panel.jsx-6bfc92
0dc97b9d6f{color:#fff;background:linear-gradient(145deg,#151515,#0c0c0c);border-radius:16px;flex-directio
n:column;min-width:0;min-height:100%;padding:19px;display:flex;box-shadow:0 10px 30px 
#00000021}.tp-ai-panel-icon.jsx-6bfc920dc97b9d6f{background:#ffffff14;border:1px solid #ffffff14;border-r
adius:10px;justify-content:center;align-items:center;width:35px;height:35px;display:flex}.tp-ai-panel-lab
el.jsx-6bfc920dc97b9d6f{color:#777;letter-spacing:.12em;margin-top:20px;font-size:8px;font-weight:650}.tp
-ai-panel.jsx-6bfc920dc97b9d6f h3.jsx-6bfc920dc97b9d6f{color:#fff;max-width:240px;margin:10px 0 
0;font-size:15px;font-weight:450;line-height:1.38}.tp-ai-panel.jsx-6bfc920dc97b9d6f 
h3.jsx-6bfc920dc97b9d6f strong.jsx-6bfc920dc97b9d6f{font-weight:700}.tp-ai-panel.jsx-6bfc920dc97b9d6f 
p.jsx-6bfc920dc97b9d6f{color:#777;max-width:220px;margin:11px 0 0;font-size:9px;line-height:1.55}.tp-prog
ress.jsx-6bfc920dc97b9d6f{background:#ffffff14;border-radius:999px;height:4px;margin-top:auto;overflow:hi
dden}.tp-progress.jsx-6bfc920dc97b9d6f span.jsx-6bfc920dc97b9d6f{border-radius:inherit;background:linear-
gradient(90deg,#fff,#d0d0d0);height:100%;display:block}.tp-ai-panel-bottom.jsx-6bfc920dc97b9d6f{color:#66
6;justify-content:space-between;align-items:center;margin-top:8px;font-size:8px;display:flex}.tp-ai-panel
-bottom.jsx-6bfc920dc97b9d6f strong.jsx-6bfc920dc97b9d6f{color:#aaa}.tp-ai-card.jsx-6bfc920dc97b9d6f{z-in
dex:12;-webkit-backdrop-filter:blur(20px);background:#0a0d12b8;border:1px solid 
#ffffff24;border-radius:14px;align-items:center;gap:10px;width:190px;padding:11px;animation:5s 
ease-in-out infinite tp-float-one;display:flex;position:absolute;top:75px;left:max(0px,50% - 
580px);box-shadow:0 20px 45px #0006}.tp-ai-card-icon.jsx-6bfc920dc97b9d6f{color:#000;background:#fff;bord
er-radius:10px;flex-shrink:0;justify-content:center;align-items:center;width:35px;height:35px;display:fle
x}.tp-ai-card-content.jsx-6bfc920dc97b9d6f{min-width:0}.tp-ai-card-title.jsx-6bfc920dc97b9d6f{color:#fff;
font-size:10px;font-weight:700}.tp-ai-card-subtitle.jsx-6bfc920dc97b9d6f{color:#ffffff7a;margin-top:3px;f
ont-size:8px}.tp-ai-live.jsx-6bfc920dc97b9d6f{background:#62f7c2;border-radius:50%;width:6px;height:6px;m
argin-left:auto;animation:2s ease-in-out infinite tp-pulse;box-shadow:0 0 10px #62f7c2cc}.tp-focus-card.j
sx-6bfc920dc97b9d6f{z-index:12;-webkit-backdrop-filter:blur(18px);background:#0a0d12b8;border:1px solid 
#ffffff24;border-radius:14px;align-items:center;gap:9px;width:150px;padding:11px;animation:6s 
ease-in-out infinite tp-float-two;display:flex;position:absolute;bottom:75px;right:max(0px,50% - 
580px);box-shadow:0 20px 45px #0006}.tp-focus-card-icon.jsx-6bfc920dc97b9d6f{color:#fff;background:#fffff
f1a;border-radius:10px;justify-content:center;align-items:center;width:34px;height:34px;display:flex}.tp-
focus-card-label.jsx-6bfc920dc97b9d6f{color:#ffffff73;font-size:8px}.tp-focus-card-time.jsx-6bfc920dc97b9
d6f{color:#fff;margin-top:2px;font-size:14px;font-weight:700}@keyframes 
tp-pulse{0%,to{opacity:.5;transform:scale(.8)}50%{opacity:1;transform:scale(1.1)}}@keyframes 
tp-float-one{0%,to{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes 
tp-float-two{0%,to{transform:translateY(0)}50%{transform:translateY(8px)}}@media 
(width<=1100px){.tp-browser-window.jsx-6bfc920dc97b9d6f{width:calc(100% - 40px)}}@media 
(width<=900px){.tp-app.jsx-6bfc920dc97b9d6f{grid-template-columns:165px minmax(0,1fr)}.tp-app-main.jsx-6b
fc920dc97b9d6f{padding:23px}.tp-dashboard-grid.jsx-6bfc920dc97b9d6f{grid-template-columns:minmax(0,1fr)}.
tp-ai-panel.jsx-6bfc920dc97b9d6f{min-height:190px}.tp-ai-card.jsx-6bfc920dc97b9d6f{left:4px}.tp-focus-car
d.jsx-6bfc920dc97b9d6f{right:4px}}@media (width<=720px){.tp-hero.jsx-6bfc920dc97b9d6f{padding-top:115px;p
adding-bottom:60px}.tp-hero-container.jsx-6bfc920dc97b9d6f{width:calc(100% - 28px)}.tp-hero-title.jsx-6bf
c920dc97b9d6f{font-size:max(48px,min(14vw,76px))}.tp-hero-description.jsx-6bfc920dc97b9d6f{max-width:480p
x;font-size:15px}.tp-trust.jsx-6bfc920dc97b9d6f{flex-wrap:wrap;max-width:440px;margin-left:auto;margin-ri
ght:auto}.tp-trust-divider.jsx-6bfc920dc97b9d6f{display:none}.tp-preview-wrapper.jsx-6bfc920dc97b9d6f{mar
gin-top:50px}.tp-browser-window.jsx-6bfc920dc97b9d6f{border-radius:22px;width:100%}.tp-app.jsx-6bfc920dc9
7b9d6f{grid-template-columns:1fr}.tp-app-sidebar.jsx-6bfc920dc97b9d6f{display:none}.tp-app-main.jsx-6bfc9
20dc97b9d6f{padding:18px}.tp-app-heading.jsx-6bfc920dc97b9d6f h2.jsx-6bfc920dc97b9d6f{font-size:23px}.tp-
dashboard-grid.jsx-6bfc920dc97b9d6f{grid-template-columns:1fr}.tp-ai-panel.jsx-6bfc920dc97b9d6f{min-heigh
t:180px}.tp-ai-card.jsx-6bfc920dc97b9d6f{transform-origin:0 
0;top:45px;left:0;transform:scale(.78)}.tp-focus-card.jsx-6bfc920dc97b9d6f{transform-origin:100% 100%;bot
tom:55px;right:0;transform:scale(.78)}.tp-earth-video.jsx-6bfc920dc97b9d6f{object-position:center 
center;width:110%;height:110%;inset:-5%}}@media (width<=600px){.tp-hero-buttons.jsx-6bfc920dc97b9d6f{flex
-direction:column;gap:10px;width:100%}.tp-get-started.jsx-6bfc920dc97b9d6f,.tp-explore.jsx-6bfc920dc97b9d
6f{width:100%}.tp-trust.jsx-6bfc920dc97b9d6f{flex-direction:column;gap:10px}.tp-browser-header.jsx-6bfc92
0dc97b9d6f{height:50px;padding:0 
14px}.tp-browser-address.jsx-6bfc920dc97b9d6f{min-width:90px;height:30px;padding:0 
12px}.tp-app-main.jsx-6bfc920dc97b9d6f{padding:15px}.tp-app-heading.jsx-6bfc920dc97b9d6f h2.jsx-6bfc920dc
97b9d6f{font-size:21px}.tp-profile.jsx-6bfc920dc97b9d6f{width:31px;height:31px}.tp-stats.jsx-6bfc920dc97b
9d6f{grid-template-columns:1fr 1fr}.tp-mini-stat.jsx-6bfc920dc97b9d6f:last-child{grid-column:span 2}.tp-m
ini-stat.jsx-6bfc920dc97b9d6f{padding:12px}.tp-mini-stat-value.jsx-6bfc920dc97b9d6f{font-size:15px}.tp-sc
hedule.jsx-6bfc920dc97b9d6f{padding:14px}.tp-earth-video.jsx-6bfc920dc97b9d6f{object-position:center 
center}}@media (prefers-reduced-motion:reduce){.tp-ai-card.jsx-6bfc920dc97b9d6f,.tp-focus-card.jsx-6bfc92
0dc97b9d6f,.tp-eyebrow-dot.jsx-6bfc920dc97b9d6f,.tp-ai-live.jsx-6bfc920dc97b9d6f{animation:none!important
}.tp-browser-window.jsx-6bfc920dc97b9d6f,.tp-earth-video.jsx-6bfc920dc97b9d6f{transform:none}}'
  className: "text-xs font-medium text-[#F5A623] hover:underline",
  className: `truncate text-sm font-medium ${task.status === "Completed" ? "text-white/45 line-through" 
: "text-white"}`,
  description: "Give TimePilot your tasks, deadlines and available hours. AI turns them into a realistic 
plan that protects your focus.",
  className: "jsx-a002e8e286f8a439" + " " + "tp-section-eyebrow-line"
  className: "jsx-a002e8e286f8a439" + " " + "tp-feature-intro-line",
  index === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__4["jsx"])(ChartColumn, {
  children: '.tp-features.jsx-a002e8e286f8a439{color:#080808;background:#fff;width:100%;padding:130px 
24px 140px;position:relative;overflow:hidden}.tp-features-background.jsx-a002e8e286f8a439{pointer-events:
none;background:radial-gradient(circle at 15% 25%,#8b5cf606,#0000 30%),radial-gradient(circle at 85% 
70%,#3b82f606,#0000 30%);position:absolute;inset:0}.tp-features-glow.jsx-a002e8e286f8a439{filter:blur(110
px);opacity:.7;pointer-events:none;border-radius:50%;width:500px;height:500px;transition:background .7s;p
osition:absolute;top:28%;right:-260px}.tp-features-container.jsx-a002e8e286f8a439{z-index:2;width:min(118
0px,100%);margin:0 
auto;position:relative}.tp-features-header.jsx-a002e8e286f8a439{grid-template-columns:.9fr 1.1fr;align-it
ems:end;gap:80px;display:grid}.tp-section-eyebrow.jsx-a002e8e286f8a439{letter-spacing:.24em;align-items:c
enter;gap:11px;margin-bottom:22px;font-size:11px;font-weight:800;display:flex}.tp-section-eyebrow-line.js
x-a002e8e286f8a439{width:30px;height:2px;transition:background 
.5s}.tp-features-heading.jsx-a002e8e286f8a439 h2.jsx-a002e8e286f8a439{color:#070707;letter-spacing:-.075e
m;margin:0;font-size:max(48px,min(6vw,78px));font-weight:700;line-height:.94}.tp-features-heading.jsx-a00
2e8e286f8a439 h2.jsx-a002e8e286f8a439 span.jsx-a002e8e286f8a439{color:#555;font-weight:500}.tp-features-i
ntro.jsx-a002e8e286f8a439{padding-bottom:4px}.tp-features-intro.jsx-a002e8e286f8a439 p.jsx-a002e8e286f8a4
39{color:#555;letter-spacing:-.015em;max-width:520px;margin:0;font-size:16px;font-weight:500;line-height:
1.8}.tp-feature-intro-line.jsx-a002e8e286f8a439{gap:5px;margin-top:26px;display:flex}.tp-feature-intro-li
ne.jsx-a002e8e286f8a439 span.jsx-a002e8e286f8a439{background:#e7e7e7;border-radius:999px;width:28px;heigh
t:3px}.tp-feature-intro-line.jsx-a002e8e286f8a439 span.jsx-a002e8e286f8a439:first-child{background:#111;w
idth:52px}.tp-feature-list.jsx-a002e8e286f8a439{border-top:1px solid #0000001f;margin-top:75px}.tp-featur
e-row.jsx-a002e8e286f8a439{color:#111;text-align:left;cursor:pointer;background:0 
0;border:0;border-bottom:1px solid #0000001f;grid-template-columns:55px 52px minmax(0,1fr) 
42px;align-items:center;gap:22px;width:100%;min-height:126px;padding:25px 0;transition:background 
.35s,padding .35s;display:grid;position:relative}.tp-feature-row.jsx-a002e8e286f8a439:hover{background:#0
0000005;padding-left:10px;padding-right:10px}.tp-feature-row.is-active.jsx-a002e8e286f8a439{background:va
r(--feature-soft);padding-left:14px;padding-right:14px}.tp-feature-row.jsx-a002e8e286f8a439:before{conten
t:"";background:var(--feature-color);border-radius:999px;width:3px;height:0;transition:height .35s;positi
on:absolute;top:0;left:0}.tp-feature-row.is-active.jsx-a002e8e286f8a439:before{height:100%}.tp-feature-nu
mber.jsx-a002e8e286f8a439{color:#999;letter-spacing:.08em;font-size:12px;font-weight:700;transition:color
 .3s}.tp-feature-row.is-active.jsx-a002e8e286f8a439 .tp-feature-number.jsx-a002e8e286f8a439{color:var(--f
eature-color)}.tp-feature-icon.jsx-a002e8e286f8a439{color:#888;background:#fafafa;border:1.5px solid #000
0001f;border-radius:13px;justify-content:center;align-items:center;width:44px;height:44px;transition:all 
.35s;display:flex}.tp-feature-row.jsx-a002e8e286f8a439:hover 
.tp-feature-icon.jsx-a002e8e286f8a439{color:#333;background:#fff;transform:translateY(-2px);box-shadow:0 
7px 20px #00000014}.tp-feature-row.is-active.jsx-a002e8e286f8a439 
.tp-feature-icon.jsx-a002e8e286f8a439{box-shadow:0 8px 24px #00000014}.tp-feature-content.jsx-a002e8e286f
8a439{min-width:0}.tp-feature-title-row.jsx-a002e8e286f8a439{align-items:center;gap:16px;display:flex}.tp
-feature-content.jsx-a002e8e286f8a439 h3.jsx-a002e8e286f8a439{color:#333;letter-spacing:-.045em;margin:0;
font-size:26px;font-weight:700;line-height:1.1;transition:color 
.3s}.tp-feature-row.jsx-a002e8e286f8a439:hover .tp-feature-content.jsx-a002e8e286f8a439 
h3.jsx-a002e8e286f8a439{color:#000}.tp-feature-row.is-active.jsx-a002e8e286f8a439 
.tp-feature-content.jsx-a002e8e286f8a439 
h3.jsx-a002e8e286f8a439{color:#0a0a0a}.tp-feature-content.jsx-a002e8e286f8a439 
p.jsx-a002e8e286f8a439{color:#666;max-width:650px;margin:9px 0 
0;font-size:13px;font-weight:500;line-height:1.6;transition:color 
.3s}.tp-feature-row.is-active.jsx-a002e8e286f8a439 .tp-feature-content.jsx-a002e8e286f8a439 p.jsx-a002e8e
286f8a439{color:#555}.tp-feature-tag.jsx-a002e8e286f8a439{color:#888;letter-spacing:.15em;background:#000
0000f;border-radius:999px;padding:6px 10px;font-size:9px;font-weight:800;transition:color 
.3s}.tp-feature-arrow.jsx-a002e8e286f8a439{color:#999;background:#fff;border:1.5px solid #0000001f;border
-radius:50%;justify-content:center;align-items:center;width:38px;height:38px;transition:all .35s 
cubic-bezier(.16,1,.3,1);display:flex}.tp-feature-row.jsx-a002e8e286f8a439:hover .tp-feature-arrow.jsx-a0
02e8e286f8a439{color:#111;border-color:#00000040;transform:translate(3px)}.tp-feature-row.is-active.jsx-a
002e8e286f8a439 .tp-feature-arrow.jsx-a002e8e286f8a439{transform:translate(0)}.tp-feature-preview.jsx-a00
2e8e286f8a439{margin-top:26px;animation:.45s ease-out tp-preview-in}@keyframes tp-preview-in{0%{opacity:0
;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.tp-preview.jsx-a002e8e286f8a439{backgr
ound:#f7f7f7;border:1px solid #0000001f;border-radius:28px;min-height:390px;padding:32px;position:relativ
e;overflow:hidden;box-shadow:0 25px 70px #00000014}.tp-preview.jsx-a002e8e286f8a439:before{content:"";poi
nter-events:none;background:linear-gradient(135deg,#ffffffe6,#0000 
45%);position:absolute;inset:0}.tp-ai-preview.jsx-a002e8e286f8a439{grid-template-columns:.75fr 1.25fr;ali
gn-items:center;gap:50px;display:grid}.tp-preview-copy.jsx-a002e8e286f8a439{z-index:2;position:relative}.
tp-preview-icon.jsx-a002e8e286f8a439{color:#8b5cf6;background:#8b5cf61f;border:1.5px solid #8b5cf633;bord
er-radius:14px;justify-content:center;align-items:center;width:46px;height:46px;display:flex}.tp-preview-
label.jsx-a002e8e286f8a439{color:#8b5cf6;letter-spacing:.2em;margin-top:20px;font-size:10px;font-weight:8
00}.tp-preview-copy.jsx-a002e8e286f8a439 
h3.jsx-a002e8e286f8a439{color:#111;letter-spacing:-.06em;max-width:430px;margin:11px 0 0;font-size:max(25
px,min(3vw,36px));font-weight:700;line-height:1.1}.tp-preview-copy.jsx-a002e8e286f8a439>p.jsx-a002e8e286f
8a439{color:#666;max-width:410px;margin-top:16px;font-size:14px;font-weight:500;line-height:1.7}.tp-sched
ule-card.jsx-a002e8e286f8a439{z-index:2;-webkit-backdrop-filter:blur(15px);backdrop-filter:blur(15px);bac
kground:#ffffffe6;border:1px solid 
#0000001f;border-radius:20px;padding:21px;position:relative;box-shadow:0 20px 45px #00000014}.tp-card-top
.jsx-a002e8e286f8a439{justify-content:space-between;align-items:center;margin-bottom:18px;display:flex}.t
p-card-title.jsx-a002e8e286f8a439{color:#111;font-size:13px;font-weight:700}.tp-card-subtitle.jsx-a002e8e
286f8a439{color:#888;margin-top:3px;font-size:9px;font-weight:500}.tp-card-pill.jsx-a002e8e286f8a439{colo
r:#8b5cf6;letter-spacing:.1em;background:#8b5cf61f;border-radius:999px;padding:6px 
10px;font-size:8px;font-weight:800}.tp-ai-row.jsx-a002e8e286f8a439{background:#fafafa;border:1px solid 
#00000014;border-radius:11px;grid-template-columns:48px 4px minmax(0,1fr) 
auto;align-items:center;gap:10px;min-height:54px;padding:9px;transition:transform .25s,background .25s;di
splay:grid}.tp-ai-row.jsx-a002e8e286f8a439:hover{background:#fff;transform:translate(3px)}.tp-ai-time.jsx
-a002e8e286f8a439{color:#999;font-size:9px;font-weight:700}.tp-ai-line.jsx-a002e8e286f8a439{background:#d
dd;border-radius:999px;width:3px;height:28px}.tp-ai-row.primary.jsx-a002e8e286f8a439 
.tp-ai-line.jsx-a002e8e286f8a439{background:#8b5cf6}.tp-ai-row.break.jsx-a002e8e286f8a439 .tp-ai-line.jsx
-a002e8e286f8a439{background:#ddd}.tp-ai-title.jsx-a002e8e286f8a439{color:#333;font-size:10px;font-weight
:700}.tp-ai-duration.jsx-a002e8e286f8a439{color:#999;font-size:9px;font-weight:600}.tp-task-preview.jsx-a
002e8e286f8a439{grid-template-columns:.75fr 1.25fr;align-items:center;gap:50px;display:grid}.tp-task-icon
.jsx-a002e8e286f8a439{color:#3b82f6;background:#3b82f61f;border-color:#3b82f633}.tp-task-label.jsx-a002e8
e286f8a439{color:#3b82f6}.tp-task-card.jsx-a002e8e286f8a439{z-index:2;-webkit-backdrop-filter:blur(15px);
backdrop-filter:blur(15px);background:#ffffffe6;border:1px solid 
#0000001f;border-radius:20px;padding:21px;position:relative;box-shadow:0 20px 45px #00000014}.tp-task-hea
der.jsx-a002e8e286f8a439{justify-content:space-between;align-items:center;margin-bottom:18px;display:flex
}.tp-task-count.jsx-a002e8e286f8a439{color:#888;font-size:9px;font-weight:600}.tp-task-item.jsx-a002e8e28
6f8a439{background:#fafafa;border:1px solid 
#00000014;border-radius:12px;padding:13px;transition:transform .25s,box-shadow .25s}.tp-task-item.jsx-a00
2e8e286f8a439+.tp-task-item.jsx-a002e8e286f8a439{margin-top:9px}.tp-task-item.jsx-a002e8e286f8a439:hover{
transform:translateY(-2px);box-shadow:0 8px 22px #00000014}.tp-task-item-top.jsx-a002e8e286f8a439{justify
-content:space-between;align-items:center;gap:15px;display:flex}.tp-task-name.jsx-a002e8e286f8a439{color:
#333;white-space:nowrap;text-overflow:ellipsis;font-size:10px;font-weight:700;overflow:hidden}.tp-task-pe
rcent.jsx-a002e8e286f8a439{color:#3b82f6;font-size:9px;font-weight:800}.tp-task-meta.jsx-a002e8e286f8a439
{color:#888;margin-top:4px;font-size:8px;font-weight:600}.tp-task-progress.jsx-a002e8e286f8a439{backgroun
d:#e9e9e9;border-radius:999px;height:4px;margin-top:10px;overflow:hidden}.tp-task-progress.jsx-a002e8e286
f8a439 span.jsx-a002e8e286f8a439{border-radius:inherit;background:#3b82f6;height:100%;display:block}.tp-a
nalytics-preview.jsx-a002e8e286f8a439{grid-template-columns:.75fr 1.25fr;align-items:center;gap:50px;disp
lay:grid}.tp-analytics-icon.jsx-a002e8e286f8a439{color:#10b981;background:#10b9811f;border-color:#10b9813
3}.tp-analytics-label.jsx-a002e8e286f8a439{color:#10b981}.tp-analytics-stats.jsx-a002e8e286f8a439{gap:30p
x;margin-top:24px;display:flex}.tp-analytics-stat.jsx-a002e8e286f8a439 strong.jsx-a002e8e286f8a439{color:
#111;letter-spacing:-.05em;font-size:28px;font-weight:800;line-height:1;display:block}.tp-analytics-stat.
jsx-a002e8e286f8a439 span.jsx-a002e8e286f8a439{color:#888;margin-top:6px;font-size:9px;font-weight:700;di
splay:block}.tp-chart-card.jsx-a002e8e286f8a439{z-index:2;background:#ffffffe6;border:1px solid 
#0000001f;border-radius:20px;padding:21px;position:relative;box-shadow:0 20px 45px #00000014}.tp-chart-he
ader.jsx-a002e8e286f8a439{justify-content:space-between;align-items:center;margin-bottom:22px;display:fle
x}.tp-chart-title.jsx-a002e8e286f8a439{color:#222;font-size:12px;font-weight:800}.tp-chart-change.jsx-a00
2e8e286f8a439{color:#10b981;font-size:9px;font-weight:700}.tp-bars.jsx-a002e8e286f8a439{border-bottom:1px
 solid #00000014;align-items:flex-end;gap:8px;height:170px;padding:10px 3px 0;display:flex}.tp-bar.jsx-a0
02e8e286f8a439{flex:1;align-items:flex-end;height:100%;display:flex;position:relative}.tp-bar.jsx-a002e8e
286f8a439 span.jsx-a002e8e286f8a439{background:#e8e8e8;border-radius:5px 5px 2px 
2px;width:100%;min-height:8px;transition:height .5s,background .25s}.tp-bar.jsx-a002e8e286f8a439:hover 
span.jsx-a002e8e286f8a439{background:#bdbdbd}.tp-bar.jsx-a002e8e286f8a439:last-child span.jsx-a002e8e286f
8a439{background:#10b981}.tp-chart-labels.jsx-a002e8e286f8a439{justify-content:space-between;padding-top:
10px;display:flex}.tp-chart-labels.jsx-a002e8e286f8a439 
span.jsx-a002e8e286f8a439{color:#888;font-size:8px;font-weight:700}@media 
(width<=900px){.tp-features.jsx-a002e8e286f8a439{padding:100px 22px 110px}.tp-features-header.jsx-a002e8e
286f8a439{grid-template-columns:1fr;gap:30px}.tp-feature-list.jsx-a002e8e286f8a439{margin-top:55px}.tp-fe
ature-row.jsx-a002e8e286f8a439{grid-template-columns:45px 48px minmax(0,1fr) 40px;gap:15px}.tp-ai-preview
.jsx-a002e8e286f8a439,.tp-task-preview.jsx-a002e8e286f8a439,.tp-analytics-preview.jsx-a002e8e286f8a439{gr
id-template-columns:1fr;gap:30px}.tp-preview.jsx-a002e8e286f8a439{padding:25px}}@media 
(width<=640px){.tp-features.jsx-a002e8e286f8a439{padding:80px 18px 
90px}.tp-features-heading.jsx-a002e8e286f8a439 
h2.jsx-a002e8e286f8a439{font-size:max(44px,min(13vw,62px))}.tp-features-intro.jsx-a002e8e286f8a439 p.jsx-
a002e8e286f8a439{font-size:14px;line-height:1.7}.tp-feature-list.jsx-a002e8e286f8a439{margin-top:45px}.tp
-feature-row.jsx-a002e8e286f8a439{grid-template-columns:35px 42px minmax(0,1fr);gap:10px;padding:22px 0}.
tp-feature-row.jsx-a002e8e286f8a439:hover,.tp-feature-row.is-active.jsx-a002e8e286f8a439{padding-left:10p
x;padding-right:10px}.tp-feature-arrow.jsx-a002e8e286f8a439{display:none}.tp-feature-number.jsx-a002e8e28
6f8a439{font-size:10px}.tp-feature-icon.jsx-a002e8e286f8a439{border-radius:11px;width:38px;height:38px}.t
p-feature-content.jsx-a002e8e286f8a439 h3.jsx-a002e8e286f8a439{font-size:18px}.tp-feature-title-row.jsx-a
002e8e286f8a439{flex-wrap:wrap;gap:8px}.tp-feature-tag.jsx-a002e8e286f8a439{font-size:7px}.tp-feature-con
tent.jsx-a002e8e286f8a439 p.jsx-a002e8e286f8a439{font-size:11px;line-height:1.6}.tp-feature-preview.jsx-a
002e8e286f8a439{margin-top:18px}.tp-preview.jsx-a002e8e286f8a439{border-radius:22px;min-height:auto;paddi
ng:20px}.tp-preview-copy.jsx-a002e8e286f8a439 h3.jsx-a002e8e286f8a439{font-size:28px}.tp-preview-copy.jsx
-a002e8e286f8a439>p.jsx-a002e8e286f8a439{font-size:12px}.tp-schedule-card.jsx-a002e8e286f8a439,.tp-task-c
ard.jsx-a002e8e286f8a439,.tp-chart-card.jsx-a002e8e286f8a439{border-radius:16px;padding:15px}.tp-ai-row.j
sx-a002e8e286f8a439{grid-template-columns:42px 3px minmax(0,1fr) 
auto;gap:7px}.tp-bars.jsx-a002e8e286f8a439{gap:5px;height:135px}}@media (prefers-reduced-motion:reduce){.
tp-feature-preview.jsx-a002e8e286f8a439,.tp-feature-row.jsx-a002e8e286f8a439,.tp-feature-icon.jsx-a002e8e
286f8a439,.tp-feature-arrow.jsx-a002e8e286f8a439,.tp-ai-row.jsx-a002e8e286f8a439,.tp-task-item.jsx-a002e8
e286f8a439,.tp-bar.jsx-a002e8e286f8a439 
span.jsx-a002e8e286f8a439{transition:none!important;animation:none!important}}'
  children: "TimePilot looks at priority, estimated effort, deadlines and your available time to create 
a balanced schedule."
  children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__4["jsx"])(ChartColumn, {
  className: `tp-ai-line ${primary ? "primary" : muted ? "break" : ""}`
  // so the sample data always lines up with whatever "today" actually is.
  function goToMonth(offset) {
  onClick: ()=>goToMonth(-1)
  onClick: ()=>goToMonth(1)
  line: "bg-[#F5A623]",
  line: "bg-[#EF4444]",
  line: "bg-white/30",
  className: `w-1 shrink-0 rounded-full ${config.line}`
  /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__8["jsx"])(TimelineItem, {
  /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__8["jsx"])(TimelineItem, {
  /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__8["jsx"])(TimelineItem, {
  /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__8["jsx"])(TimelineItem, {
  /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__8["jsx"])(TimelineItem, {
  children: "Linear"
     Timeline item component
  ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓ
öÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */ function TimelineItem({ time, task, color, duration, focused }) {
  className: "inline-flex items-center gap-3",
  /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__9["jsxs"])(FooterColumn, {
  /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__9["jsxs"])(FooterColumn, {
  /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__9["jsxs"])(FooterColumn, {
  /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__9["jsxs"])(FooterColumn, {
  className: "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white 
placeholder:text-white/25 outline-none transition focus:border-[#F5A623]/60 focus:ring-2 
focus:ring-[#F5A623]/20 disabled:opacity-60"
  ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓ
öÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */ function FooterColumn({ title, children }) {
  className: "flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] 
bg-white/[0.02] text-white/40 transition hover:border-white/[0.18] hover:bg-white/[0.06] 
hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5A623]/60",
  children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__43476__["jsx"])(Hero, {})
  } catch (error) {
  // @TBD Should we throw an error?
  } catch (error) {
  throw new Error("StyleSheet: " + message + ".");
  throw new Error("StyleSheetRegistry: " + message + ".");
    at <unknown> (TurbopackInternalError:   ├ù Expected ',', got 'ident') {
  type: 'TurbopackInternalError',


PS D:\Timepilot1\frontend>   