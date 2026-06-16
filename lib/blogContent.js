const HTML_PARAGRAPH_PATTERN = /<p(\s[^>]*)?>([\s\S]*?)<\/p>/gi;
const HTML_LINE_BREAK_PATTERN = /<br\s*\/?>/gi;
const MARKDOWN_TABLE_SEPARATOR_CELL_PATTERN = /^:?-{3,}:?$/;

export function formatBlogContent({ content }) {
  if (!content) {
    return '';
  }

  return content.replace(
    HTML_PARAGRAPH_PATTERN,
    function replaceParagraphWithMarkdownTable(
      match,
      _attributes,
      paragraphHtml
    ) {
      return buildMarkdownTableHtml({ paragraphHtml }) || match;
    }
  );
}

function buildMarkdownTableHtml({ paragraphHtml }) {
  const lines = paragraphHtml
    .replace(/\r\n?/g, '\n')
    .replace(HTML_LINE_BREAK_PATTERN, '\n')
    .split('\n')
    .map(function trimLine(line) {
      return line.trim();
    })
    .filter(Boolean);

  if (lines.length < 3 || !lines.every(isMarkdownTableRow)) {
    return null;
  }

  if (!isMarkdownTableSeparatorRow({ row: lines[1] })) {
    return null;
  }

  const headerCells = splitMarkdownTableRow({ row: lines[0] });
  const separatorCells = splitMarkdownTableRow({ row: lines[1] });
  const bodyRows = lines.slice(2).map(function mapBodyRow(row) {
    return splitMarkdownTableRow({ row });
  });

  if (
    headerCells.length < 2 ||
    separatorCells.length !== headerCells.length ||
    bodyRows.length === 0
  ) {
    return null;
  }

  const headerHtml = headerCells
    .map(function renderHeaderCell(cell) {
      return `<th>${cell}</th>`;
    })
    .join('');

  const bodyHtml = bodyRows
    .map(function renderBodyRow(cells) {
      const rowHtml = headerCells
        .map(function renderBodyCell(_headerCell, index) {
          return `<td>${cells[index] || ''}</td>`;
        })
        .join('');
      return `<tr>${rowHtml}</tr>`;
    })
    .join('');

  return `<div class="blog-table-wrapper"><table><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`;
}

function isMarkdownTableRow(row) {
  return row.startsWith('|') && row.endsWith('|');
}

function isMarkdownTableSeparatorRow({ row }) {
  const cells = splitMarkdownTableRow({ row });
  return (
    cells.length >= 2 &&
    cells.every(function checkSeparatorCell(cell) {
      return MARKDOWN_TABLE_SEPARATOR_CELL_PATTERN.test(
        cell.replace(/\s+/g, '')
      );
    })
  );
}

function splitMarkdownTableRow({ row }) {
  const normalizedRow = row.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells = [];
  let cell = '';
  let previousCharacter = '';

  for (const character of normalizedRow) {
    if (character === '|' && previousCharacter !== '\\') {
      cells.push(cell);
      cell = '';
    } else {
      cell += character;
    }
    previousCharacter = character;
  }

  cells.push(cell);

  return cells.map(function normalizeCell(value) {
    return value.replace(/\\\|/g, '|').trim();
  });
}
