#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
import argparse,json
R=Path(__file__).resolve().parents[1]
prefix=json.loads((R/'site.config.json').read_text())['base_path']
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(R),**kw)
 def do_GET(self):
  if self.path=='/':self.send_response(302);self.send_header('Location',prefix);self.end_headers();return
  if not self.path.startswith(prefix):self.send_error(404);return
  self.path='/'+self.path[len(prefix):]
  if self.path=='/':self.path='/index.html'
  super().do_GET()
 def do_HEAD(self):
  if not self.path.startswith(prefix):self.send_error(404);return
  self.path='/'+self.path[len(prefix):];super().do_HEAD()
ap=argparse.ArgumentParser();ap.add_argument('--port',type=int,default=8765);args=ap.parse_args()
print(f'DoLaby local preview: http://127.0.0.1:{args.port}{prefix}',flush=True)
ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
