# Bible vs. Qur'an — A Neutral Arbiter's Dossier

A comparative religious-studies project that examines the **Bible** and the
**Qur'an** side by side, written as a **referee, not an advocate**.

It is organized in three parts:

1. **Part I — Historical / textual & logical core:** how reliably was each
   scripture transmitted, how strong are the mutual *corruption* (*tahrif*)
   accusations under the **same standard both ways**, and how do **strict
   monotheism** (*tawhid* / the *Shema*) and the **Trinity** compare.
2. **Part II — The nature of God:** the doctrine of God in each text,
   from text and logic, with verse evidence.
3. **Part III — Chronology:** the shared storyline from creation to the
   end, showing one continuous dividing seam at every stage.

It does **not** decide whose religion is true — that is not a question
historical evidence or logic can settle, and saying so is part of being an
honest arbiter.

## Principles

- No confessional premises — neither scripture is assumed inerrant.
- Symmetry: any argument used against one text is run against the other.
- Mainstream peer-reviewed scholarship is the baseline, not the loudest
  apologetic claim.
- Debate "wins" are rhetoric, not evidence.
- Each chapter ends with a 3-part verdict: **present** both cases →
  **weigh** strong/weak/contested → **judge** (name the stronger side only
  where the evidence warrants it, with caveats).

## Read it

### As Markdown (source of truth)

| # | Chapter |
|---|---|
| 00 | [Introduction — the arbiter's framing](docs/00-introduction.md) |
| 01 | [Methodology — evidentiary & logical rules](docs/01-methodology.md) |
| 02 | [Bible — textual transmission](docs/02-bible-textual-transmission.md) |
| 03 | [Qur'an — textual transmission](docs/03-quran-textual-transmission.md) |
| 04 | [Corruption claims (*tahrif*), both directions](docs/04-corruption-claims-tahrif.md) |
| 05 | [Monotheism vs. the Trinity](docs/05-monotheism-vs-trinity.md) |
| 06 | [Debates & scholars — who argues what](docs/06-debates-and-scholars.md) |
| 07 | [Arbiter verdict — core textual & logical inquiry](docs/07-arbiter-verdict.md) |
| 09 | [The nature of God in both religions](docs/09-nature-of-god.md) |
| 10 | [Chronology — Creation](docs/10-chronology-creation.md) |
| 11 | [Chronology — The Fall & origin of sin](docs/11-chronology-fall.md) |
| 12 | [Chronology — The Flood & Noah](docs/12-chronology-flood.md) |
| 13 | [Chronology — Abraham](docs/13-chronology-abraham.md) |
| 14 | [Chronology — Moses & the Exodus](docs/14-chronology-moses.md) |
| 15 | [Chronology — David, Solomon & prophethood](docs/15-chronology-david-prophets.md) |
| 16 | [Chronology — Jesus: birth, mission, crucifixion](docs/16-chronology-jesus.md) |
| 17 | [Chronology — Muhammad & the seal of prophethood](docs/17-chronology-muhammad.md) |
| 18 | [Chronology — Eschatology: the end](docs/18-chronology-eschatology.md) |
| 19 | [Focused question — was Jesus a Jew, a Christian, or a Muslim?](docs/19-was-jesus-a-muslim.md) |
| 20 | [Focused question — does God deceive? (*makr* & judicial hardening)](docs/20-does-god-deceive.md) |
| 21 | [Focused question — the teachings of Muhammad vs. Jesus (and the two systems)](docs/21-muhammad-vs-jesus.md) |
| 98 | [Scripture index — every verse cited, by chapter](docs/98-scripture-index.md) |
| 99 | [Sources & further reading](docs/99-sources.md) |

### As a website

A self-contained static site (no network, no third-party dependencies —
the Markdown renderer is vendored in `site/lib/`).

```sh
node site/build.js
# then open site/dist/index.html in a browser
```

The prebuilt site is committed under `site/dist/`, so it can also be
served directly (e.g., GitHub Pages pointed at that folder).

## Repository layout

```
docs/        the dossier, in Markdown (source of truth)
site/
  lib/md.js  minimal dependency-free Markdown -> HTML renderer
  build.js   static site generator
  dist/      prebuilt website (open dist/index.html)
```

## A note on tone

This dossier will, by design, sometimes conclude **"too close to call"**
or **"this is not a question evidence can answer."** That is not evasion —
it is what neutrality looks like when the data genuinely does not pick a
winner. Where the evidence *does* point, the verdict says so plainly.
