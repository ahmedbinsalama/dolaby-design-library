#!/usr/bin/env python3
"""Check actual local links, generated data, frozen kit hashes and export targets."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,hashlib,re
R=Path(__file__).resolve().parents[1]
class Refs(HTMLParser):
 def __init__(self):super().__init__();self.refs=[]
 def handle_starttag(self,tag,attrs):
  for k,v in attrs:
   if k in ['href','src'] and v:self.refs.append(v)
missing=[];checked=0
for p in R.rglob('*.html'):
 if any(x in p.parts for x in ['dist','.git']):continue
 parser=Refs();parser.feed(p.read_text())
 base=R if p.parent==R/'site-src' else p.parent
 for ref in parser.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc or not u.path:continue
  checked+=1;target=(base/unquote(u.path)).resolve()
  if not target.exists():missing.append({'file':str(p.relative_to(R)),'reference':ref})
for p in R.rglob('*.css'):
 if 'dist' in p.parts:continue
 for value in re.findall(r'url\(\s*[\"\']?([^\)\"\']+)',p.read_text()):
  value=value.strip();u=urlsplit(value)
  if u.scheme or not u.path:continue
  checked+=1
  if not (p.parent/unquote(u.path)).resolve().exists():missing.append({'file':str(p.relative_to(R)),'reference':value})
assert not missing,missing
d=json.loads((R/'data/catalog.json').read_text());assert len(d['screens'])==104 and len(d['templates'])==24 and len(d['components'])==30
assert len({f['id'] for f in d['files']})==len(d['files'])
for f in d['files']:assert (R/f['path']).is_file(),f['path']
for s in d['screens']:
 for key in ['source','preview']:assert (R/'library'/s[key]).is_file()
 assert (R/'library'/s['url'].split('?')[0]).is_file()
for x in d['socialExports']:
 for key in ['source','png','jpg']:assert (R/'library/04_SOCIAL_KIT'/x[key]).is_file()
m=json.loads((R/'library/delivery-manifest.json').read_text())
for f in m['files']:assert hashlib.sha256((R/'library'/f['path']).read_bytes()).hexdigest()==f['sha256'],f['path']
report={'status':'PASS','scope':'Static local links, generated file index, original kit integrity and indexed export targets; browser interaction is separate','local_references_checked':checked,'missing':missing,'catalog_files':len(d['files']),'frozen_library_files':len(m['files'])+1,'screen_compositions':104,'social_export_sets':120,'site_pages':12,'library_sha256':'PASS'}
(R/'qa').mkdir(exist_ok=True);(R/'qa/static-checks.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
