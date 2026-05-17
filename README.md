# Bible vs. Qur'an — A Neutral Arbiter's Dossier

A comparative religious-studies project that examines the **Bible** and the
**Qur'an** side by side, written as a **referee, not an advocate**.

It asks two things and only these two:

1. **Historical / textual** — How reliably was each scripture transmitted,
   and how strong are the mutual *corruption* (*tahrif*) accusations,
   tested by the **same standard in both directions**?
2. **Theological / logical** — How do **strict monotheism** (*tawhid* / the
   *Shema*) and the **Trinity** compare in textual support and internal
   logical coherence?

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
| 07 | [Final arbiter verdict](docs/07-arbiter-verdict.md) |
| 08 | [Sources & further reading](docs/08-sources.md) |

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
