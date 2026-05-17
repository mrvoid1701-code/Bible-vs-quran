'use strict';

// Static site generator. Reads ../docs/*.md, converts each to a styled
// HTML page with sidebar navigation, writes to ./dist/. No network, no
// third-party dependencies.

const fs = require('fs');
const path = require('path');
const { render } = require('./lib/md');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const DIST = path.join(__dirname, 'dist');

const TITLES = {
  '00-introduction': 'Introduction',
  '01-methodology': 'Methodology',
  '02-bible-textual-transmission': 'Bible — Transmission',
  '03-quran-textual-transmission': "Qur'an — Transmission",
  '04-corruption-claims-tahrif': 'Corruption (Tahrif)',
  '05-monotheism-vs-trinity': 'Monotheism vs. Trinity',
  '06-debates-and-scholars': 'Debates & Scholars',
  '07-arbiter-verdict': 'Final Verdict',
  '08-sources': 'Sources',
};

function navHtml(files, current) {
  const links = files.map(function (f) {
    const slug = f.replace(/\.md$/, '');
    const cls = slug === current ? ' class="active"' : '';
    return '<li><a' + cls + ' href="' + slug + '.html">' +
      (TITLES[slug] || slug) + '</a></li>';
  });
  return '<nav><div class="brand">Bible vs. Qur’an<span>a neutral arbiter</span></div><ol>' +
    links.join('') + '</ol></nav>';
}

function page(title, nav, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + title + ' — Bible vs. Qur’an</title>' +
    '<link rel="stylesheet" href="style.css"></head><body>' +
    '<button id="menu" aria-label="Toggle menu">☰</button>' +
    '<aside>' + nav + '</aside><main><article>' + body +
    '</article><footer>Comparative religious-studies dossier &middot; ' +
    'written as a neutral arbiter &middot; sources in the Sources page.' +
    '</footer></main>' +
    '<script>document.getElementById("menu").onclick=function(){' +
    'document.body.classList.toggle("nav-open")};</script>' +
    '</body></html>';
}

function build() {
  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

  const files = fs.readdirSync(DOCS)
    .filter(function (f) { return f.endsWith('.md'); })
    .sort();

  files.forEach(function (f) {
    const slug = f.replace(/\.md$/, '');
    const md = fs.readFileSync(path.join(DOCS, f), 'utf8');
    const html = page(TITLES[slug] || slug, navHtml(files, slug), render(md));
    fs.writeFileSync(path.join(DIST, slug + '.html'), html);
    process.stdout.write('  built ' + slug + '.html\n');
  });

  // landing page redirects to the introduction
  fs.writeFileSync(
    path.join(DIST, 'index.html'),
    '<!DOCTYPE html><meta charset="utf-8">' +
    '<meta http-equiv="refresh" content="0; url=00-introduction.html">' +
    '<title>Bible vs. Qur’an</title>' +
    '<a href="00-introduction.html">Enter</a>'
  );

  fs.writeFileSync(path.join(DIST, 'style.css'), CSS);
  process.stdout.write('Done. Open site/dist/index.html\n');
}

const CSS = `
:root{--bg:#0f1115;--panel:#171a21;--ink:#e8e8ea;--mut:#9aa0aa;
--line:#2a2f3a;--accent:#c9a24b;--link:#7fb2ff}
*{box-sizing:border-box}
body{margin:0;display:flex;font:16px/1.65 Georgia,"Times New Roman",serif;
background:var(--bg);color:var(--ink)}
aside{width:280px;min-height:100vh;background:var(--panel);
border-right:1px solid var(--line);position:sticky;top:0;height:100vh;
overflow:auto}
nav .brand{padding:22px 22px 14px;font:600 20px/1.2 Georgia,serif;
border-bottom:1px solid var(--line)}
nav .brand span{display:block;font:400 12px/1 system-ui;color:var(--mut);
margin-top:6px;letter-spacing:.12em;text-transform:uppercase}
nav ol{list-style:none;margin:0;padding:14px 0;counter-reset:n}
nav li{counter-increment:n}
nav a{display:block;padding:9px 22px;color:var(--mut);text-decoration:none;
font:400 15px/1.3 system-ui}
nav a::before{content:counter(n,decimal-leading-zero) "  ";color:var(--line)}
nav a:hover{color:var(--ink);background:#1d212b}
nav a.active{color:var(--accent);border-left:3px solid var(--accent);
padding-left:19px}
main{flex:1;display:flex;flex-direction:column;min-width:0}
article{max-width:820px;margin:0 auto;padding:56px 40px 24px}
footer{max-width:820px;margin:0 auto;padding:24px 40px 56px;color:var(--mut);
font:400 13px/1.6 system-ui;border-top:1px solid var(--line);width:100%}
h1{font-size:34px;line-height:1.2;margin:.2em 0 .6em;color:#fff}
h2{font-size:25px;margin:1.6em 0 .5em;color:#fff;
border-bottom:1px solid var(--line);padding-bottom:.25em}
h3{font-size:20px;margin:1.4em 0 .4em;color:var(--accent)}
h4{font-size:17px;margin:1.2em 0 .3em;color:#cdd3df}
p{margin:.7em 0}
a{color:var(--link)}
strong{color:#fff}
code{background:#222733;padding:.1em .4em;border-radius:4px;
font:14px/1 ui-monospace,Menlo,monospace;color:#e6c98c}
blockquote{margin:1.1em 0;padding:.6em 1.1em;border-left:3px solid var(--accent);
background:#161a22;color:#cdd3df;font-style:italic}
ul,ol{padding-left:1.4em}
li{margin:.32em 0}
hr{border:0;border-top:1px solid var(--line);margin:2em 0}
table{border-collapse:collapse;width:100%;margin:1.2em 0;font:400 14px/1.5 system-ui}
th,td{border:1px solid var(--line);padding:8px 11px;text-align:left;
vertical-align:top}
th{background:#1d212b;color:#fff}
tr:nth-child(even) td{background:#14171e}
#menu{display:none;position:fixed;top:12px;right:12px;z-index:10;
background:var(--panel);color:var(--ink);border:1px solid var(--line);
font-size:20px;padding:6px 12px;border-radius:6px}
@media(max-width:880px){
aside{position:fixed;left:-300px;transition:left .2s;z-index:9}
body.nav-open aside{left:0}
#menu{display:block}
article,footer{padding-left:20px;padding-right:20px}
}`;

build();
