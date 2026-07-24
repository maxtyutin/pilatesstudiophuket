#!/usr/bin/env python3
"""
Post-build script: Inlines JS and CSS into a single self-contained index.html
for offline file:// opening without any CORS or module-type restrictions.
"""

import re
import os

# Project root is one level up from this script
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dist_dir = os.path.join(project_root, 'dist')
html_path = os.path.join(dist_dir, 'index.html')
js_path = os.path.join(dist_dir, 'assets', 'index.js')
css_path = os.path.join(dist_dir, 'assets', 'index.css')

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Read JS and CSS
js_content = ''
css_content = ''

if os.path.exists(js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        js_content = f.read()
    print(f'Read JS: {len(js_content)} bytes')

if os.path.exists(css_path):
    with open(css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()
    print(f'Read CSS: {len(css_content)} bytes')

# Remove Google Fonts @import (doesn't work offline)
css_content = re.sub(
    r'@import\s+url\([^)]+fonts\.googleapis\.com[^)]*\)\s*;?',
    '',
    css_content
)
css_content = re.sub(
    r'@import\s+"https://fonts\.googleapis\.com[^"]*"\s*;?',
    '',
    css_content
)
css_content = re.sub(
    r"@import\s+'https://fonts\.googleapis\.com[^']*'\s*;?",
    '',
    css_content
)
css_content = css_content.strip()

# Remove ALL external <link> tags (stylesheet + preconnect for Google Fonts)
html = re.sub(
    r'<link[^>]+(?:rel=["\']stylesheet["\']|fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*/?>',
    '',
    html
)

# Remove modulepreload links
html = re.sub(r'<link[^>]+rel=["\']modulepreload["\'][^>]*/?>', '', html)

# Remove ALL <script ...src=...> tags completely including closing </script>
# This covers both self-closing and paired tags with src attributes
html = re.sub(
    r'<script\b[^>]*\bsrc=["\'][^"\']*["\'][^>]*>\s*</script>',
    '',
    html
)
# Also remove any self-closing variant
html = re.sub(
    r'<script\b[^>]*\bsrc=["\'][^"\']*["\'][^>]*/?>',
    '',
    html
)

# Remove any stray </script> closing tags that are NOT preceded by inline content
# (i.e. standalone </script> with only whitespace before it on the line)
html = re.sub(r'\n\s*</script>\s*\n', '\n', html)

# Inject CSS before </head>
if css_content:
    css_tag = f'\n  <style>\n{css_content}\n  </style>'
    html = html.replace('</head>', css_tag + '\n</head>')

# Inject JS before </body> (no type="module", no crossorigin)
if js_content:
    js_tag = f'\n  <script>\n{js_content}\n  </script>'
    html = html.replace('</body>', js_tag + '\n</body>')

# Verify final structure
script_open = html.count('<script')
script_close = html.count('</script>')
has_module = 'type="module"' in html
has_import_meta = 'import.meta' in html
print('Script open:', script_open, '| close:', script_close)
print('type=module in output:', has_module)
print('import.meta in output:', has_import_meta)

# Write to dist/index.html and root index.html
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Written dist/index.html: {len(html)} bytes')

root_html_path = os.path.join(project_root, 'index.html')
with open(root_html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Written root index.html: {len(html)} bytes')
print('Done! Single-file HTML ready for offline file:// opening.')
