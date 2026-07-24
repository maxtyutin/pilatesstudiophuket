#!/usr/bin/env python3
"""
Post-build script: Inlines JS and CSS into a single self-contained index.html
for offline file:// opening without any CORS or module-type restrictions.
"""

import re
import os
import shutil

# Project root is one level up from this script
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dist_dir = os.path.join(project_root, 'dist')

# Vite outputs to index.template.html as configured in vite.config.js
html_path = os.path.join(dist_dir, 'index.template.html')
js_path = os.path.join(dist_dir, 'assets', 'index.js')
css_path = os.path.join(dist_dir, 'assets', 'index.css')

if not os.path.exists(html_path):
    # Fallback to index.html if template doesn't exist
    html_path = os.path.join(dist_dir, 'index.html')

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

# Remove ALL external <link> tags (stylesheet + Google Fonts preconnect)
html = re.sub(
    r'<link[^>]+(?:rel=["\']stylesheet["\']|fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*/?>',
    '',
    html
)

# Remove modulepreload links
html = re.sub(r'<link[^>]+rel=["\']modulepreload["\'][^>]*/?>', '', html)

# Remove ALL <script ...src=...></script> tags completely (Vite asset references)
html = re.sub(
    r'<script\b[^>]*\bsrc=["\'][^"\']*["\'][^>]*>\s*</script>',
    '',
    html
)
# Also handle self-closing / void opening tags with src
html = re.sub(
    r'<script\b[^>]*\bsrc=["\'][^"\']*["\'][^>]*/?>',
    '',
    html
)

# Remove any remaining stray standalone </script> in the head/body area (stray ones)
body_pos = html.find('</body>')
if body_pos != -1:
    head_and_body = html[:body_pos]
    tail = html[body_pos:]
    head_and_body = head_and_body.replace('</script>', '')
    html = head_and_body + tail

# Inject CSS before </head>
if css_content:
    css_tag = f'\n  <style>\n{css_content}\n  </style>'
    html = html.replace('</head>', css_tag + '\n</head>')

# Inject JS before </body> (no type="module", no crossorigin)
if js_content:
    js_tag = f'\n<script>\n{js_content}\n</script>'
    html = html.replace('</body>', js_tag + '\n</body>')

# Verify final structure
script_open = html.count('<script')
script_close = html.count('</script>')
has_module = 'type="module"' in html
has_import_meta = 'import.meta' in html
print('Script open:', script_open, '| close:', script_close)
print('type=module in output:', has_module)
print('import.meta in output:', has_import_meta)

# Write output to dist/index.html
final_dist_html_path = os.path.join(dist_dir, 'index.html')
with open(final_dist_html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Written dist/index.html: {len(html)} bytes')

# Write output to root index.html
root_html_path = os.path.join(project_root, 'index.html')
with open(root_html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Written root index.html: {len(html)} bytes')

# Clean up temporary build assets
if os.path.exists(html_path) and html_path != final_dist_html_path:
    os.remove(html_path)
    print('Removed temporary index.template.html')

assets_dir = os.path.join(dist_dir, 'assets')
if os.path.exists(assets_dir):
    shutil.rmtree(assets_dir)
    print('Cleaned up assets directory from dist/')

print('Done! Single-file HTML ready for offline file:// opening.')
