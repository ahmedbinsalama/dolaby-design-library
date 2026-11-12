#!/usr/bin/env python3
"""Read-only verification of this delivery's manifest and optional ZIP. Stdlib only."""
from pathlib import Path
import argparse, hashlib, json, sys, zipfile

def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[2])
    ap.add_argument('--archive',type=Path)
    args=ap.parse_args();root=args.root.resolve()
    manifest=json.loads((root/'delivery-manifest.json').read_text(encoding='utf8'))
    errors=[]
    for entry in manifest['files']:
        target=(root/entry['path']).resolve()
        if not target.is_relative_to(root):errors.append('Invalid path: '+entry['path']);continue
        if not target.is_file():errors.append('Missing: '+entry['path']);continue
        data=target.read_bytes()
        if len(data)!=entry['bytes'] or hashlib.sha256(data).hexdigest()!=entry['sha256']:errors.append('Changed: '+entry['path'])
    archive_result='NOT_REQUESTED'
    if args.archive:
        with zipfile.ZipFile(args.archive) as z:
            if z.testzip() is not None:errors.append('ZIP CRC failed')
            names=z.namelist();prefix=next((n[:-len('delivery-manifest.json')] for n in names if n.endswith('/delivery-manifest.json')),None)
            if prefix is None:errors.append('ZIP manifest missing')
            else:
                zipped=json.loads(z.read(prefix+'delivery-manifest.json'))
                if zipped!=manifest:errors.append('ZIP manifest differs from local manifest')
                for entry in manifest['files']:
                    try:data=z.read(prefix+entry['path'])
                    except KeyError:errors.append('ZIP missing: '+entry['path']);continue
                    if len(data)!=entry['bytes'] or hashlib.sha256(data).hexdigest()!=entry['sha256']:errors.append('ZIP changed: '+entry['path'])
            archive_result='PASS' if not errors else 'FAIL'
    result={'status':'PASS' if not errors else 'FAIL','files_checked':len(manifest['files']),'manifest_excludes_itself':True,'archive':archive_result,'errors':errors,'scope':'Byte integrity only; not visual, functional, security, legal or market validation'}
    print(json.dumps(result,ensure_ascii=False,indent=2));return 0 if not errors else 1

if __name__=='__main__':sys.exit(main())
