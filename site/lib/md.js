'use strict';

// Minimal, dependency-free Markdown -> HTML converter.
// Supports exactly the subset used by this project's docs:
//   ATX headings (# .. ####), paragraphs, unordered lists (- ),
//   ordered lists (1. ), blockquotes (> ), thematic breaks (---),
//   GFM tables, inline **bold**, *italic*, `code`, and [text](url).
// It is intentionally small and predictable rather than fully CommonMark.

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Inline formatting. Operates on already HTML-escaped text.
function inline(text) {
  let t = text;
  // links: [label](url) -- url is validated to http(s) or relative .md/#
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, label, url) {
    let safe = url;
    if (/^https?:\/\//i.test(url)) {
      safe = url;
    } else if (/^[\w./#-]+$/.test(url)) {
      // local doc link: rewrite .md -> .html for the site
      safe = url.replace(/\.md(#|$)/, '.html$1');
    } else {
      return escapeHtml(m);
    }
    return '<a href="' + safe + '">' + label + '</a>';
  });
  // inline code
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  // bold then italic (bold first to avoid * collisions)
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return t;
}

function isTableSep(line) {
  return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(line);
}

function splitRow(line) {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map(function (c) { return c.trim(); });
}

function render(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    let line = lines[i];

    // blank
    if (/^\s*$/.test(line)) { i++; continue; }

    // thematic break
    if (/^---+\s*$/.test(line)) { out.push('<hr>'); i++; continue; }

    // heading
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      const lvl = h[1].length;
      out.push('<h' + lvl + '>' + inline(escapeHtml(h[2].trim())) + '</h' + lvl + '>');
      i++;
      continue;
    }

    // table: current line has '|' and next line is a separator
    if (line.indexOf('|') !== -1 && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const header = splitRow(line);
      i += 2; // skip header + separator
      const rows = [];
      while (i < lines.length && lines[i].indexOf('|') !== -1 && !/^\s*$/.test(lines[i])) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      let tbl = '<table><thead><tr>';
      header.forEach(function (c) { tbl += '<th>' + inline(escapeHtml(c)) + '</th>'; });
      tbl += '</tr></thead><tbody>';
      rows.forEach(function (r) {
        tbl += '<tr>';
        for (let c = 0; c < header.length; c++) {
          tbl += '<td>' + inline(escapeHtml(r[c] || '')) + '</td>';
        }
        tbl += '</tr>';
      });
      tbl += '</tbody></table>';
      out.push(tbl);
      continue;
    }

    // blockquote (consecutive > lines)
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push('<blockquote>' + render(buf.join('\n')) + '</blockquote>');
      continue;
    }

    // unordered list
    if (/^\s*-\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        let item = lines[i].replace(/^\s*-\s+/, '');
        i++;
        // continuation lines (indented, not a new list/blank)
        while (i < lines.length && /^\s+\S/.test(lines[i]) && !/^\s*-\s+/.test(lines[i])) {
          item += ' ' + lines[i].trim();
          i++;
        }
        items.push('<li>' + inline(escapeHtml(item)) + '</li>');
      }
      out.push('<ul>' + items.join('') + '</ul>');
      continue;
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        let item = lines[i].replace(/^\s*\d+\.\s+/, '');
        i++;
        while (i < lines.length && /^\s+\S/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i])) {
          item += ' ' + lines[i].trim();
          i++;
        }
        items.push('<li>' + inline(escapeHtml(item)) + '</li>');
      }
      out.push('<ol>' + items.join('') + '</ol>');
      continue;
    }

    // paragraph (gather until blank / block start)
    const para = [];
    while (
      i < lines.length &&
      !/^\s*$/.test(lines[i]) &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !/^---+\s*$/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^\s*-\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      para.push(lines[i].trim());
      i++;
    }
    if (para.length) {
      out.push('<p>' + inline(escapeHtml(para.join(' '))) + '</p>');
    }
  }

  return out.join('\n');
}

module.exports = { render: render };
