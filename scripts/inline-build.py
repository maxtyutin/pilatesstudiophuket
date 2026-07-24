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

# Remove Google Fonts @import (doesn't work offline) - use system fallbacks
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

# Remove leading whitespace/newlines
css_content = css_content.strip()

# Replace <link rel="stylesheet"> with inlined <style>
html = re.sub(
    r'<link[^>]+rel=["\']stylesheet["\'][^>]*/?>',
    '',
    html
)

# Replace <script type="module"> references with empty
html = re.sub(
    r'<script\s+type=["\']module["\'][^>]*src=["\'][^"\']*["\'][^>]*/?>',
    '',
    html
)
html = re.sub(
    r'<link[^>]+rel=["\']modulepreload["\'][^>]*/?>',
    '',
    html
)

# Inject CSS before </head>
if css_content:
    css_tag = f'\n  <style>\n{css_content}\n  </style>'
    html = html.replace('</head>', css_tag + '\n</head>')

# Inject JS before </body> (no type="module", no crossorigin)
if js_content:
    js_tag = f'\n  <script>\n{js_content}\n  </script>'
    html = html.replace('</body>', js_tag + '\n</body>')

# Write to dist/index.html and root index.html
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Written dist/index.html: {len(html)} bytes')

root_html_path = os.path.join(os.path.dirname(dist_dir), 'index.html')
with open(root_html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Written root index.html: {len(html)} bytes')
print('Done! Single-file HTML ready for offline file:// opening.')
