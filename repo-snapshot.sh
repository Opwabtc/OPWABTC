#!/bin/bash
OUTPUT="claude-context.md"
MAX_LINES=300
echo "# REPO SNAPSHOT" > "$OUTPUT"
echo "> $(date)" >> "$OUTPUT"
echo "" >> "$OUTPUT"
echo "## Estrutura" >> "$OUTPUT"
echo '```' >> "$OUTPUT"
find . -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' -type f | sort >> "$OUTPUT"
echo '```' >> "$OUTPUT"
echo "" >> "$OUTPUT"
[ -f package.json ] && { echo "## package.json" >> "$OUTPUT"; echo '```json' >> "$OUTPUT"; cat package.json >> "$OUTPUT"; echo '```' >> "$OUTPUT"; echo "" >> "$OUTPUT"; }
[ -f tsconfig.json ] && { echo "## tsconfig.json" >> "$OUTPUT"; echo '```json' >> "$OUTPUT"; cat tsconfig.json >> "$OUTPUT"; echo '```' >> "$OUTPUT"; echo "" >> "$OUTPUT"; }
echo "## Código Fonte" >> "$OUTPUT"
find . -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' -not -name 'package-lock.json' \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.scss" \) -type f | sort | while read -r file; do
  echo "### \`$file\`" >> "$OUTPUT"
  ext="${file##*.}"
  echo '```'"$ext" >> "$OUTPUT"
  lines=$(wc -l < "$file")
  if [ "$lines" -gt "$MAX_LINES" ]; then
    head -n "$MAX_LINES" "$file" >> "$OUTPUT"
    echo "... [TRUNCADO - $lines linhas] ..." >> "$OUTPUT"
  else
    cat "$file" >> "$OUTPUT"
  fi
  echo '```' >> "$OUTPUT"
  echo "" >> "$OUTPUT"
done
echo "## Erros TypeScript" >> "$OUTPUT"
echo '```' >> "$OUTPUT"
npx tsc --noEmit 2>&1 | head -60 >> "$OUTPUT"
echo '```' >> "$OUTPUT"
echo "## Git Log" >> "$OUTPUT"
echo '```' >> "$OUTPUT"
git log --oneline -10 >> "$OUTPUT"
echo '```' >> "$OUTPUT"
echo "Gerado: $(wc -l < $OUTPUT) linhas | $(wc -c < $OUTPUT | awk '{print int($1/1024)}') KB"
