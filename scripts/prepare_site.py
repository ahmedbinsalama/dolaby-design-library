#!/usr/bin/env python3
"""Copy only the publishable site tree to dist; no Git metadata or local state."""
from pathlib import Path
import shutil
R=Path(__file__).resolve().parents[1];out=R/'dist'
if out.exists():shutil.rmtree(out)
out.mkdir()
for name in ['assets','data','library','downloads','docs','qa','scripts','site-src']:
 shutil.copytree(R/name,out/name,ignore=shutil.ignore_patterns('__pycache__','*.pyc','.DS_Store','node_modules'))
for p in R.glob('*.html'):shutil.copy2(p,out/p.name)
for name in ['README.md','site.config.json','.nojekyll']:shutil.copy2(R/name,out/name)
print('Prepared static site in dist/')
