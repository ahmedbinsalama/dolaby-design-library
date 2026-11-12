from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os,webbrowser
os.chdir(Path(__file__).resolve().parent)
url='http://127.0.0.1:8765/00_START_HERE/index.html'
print('DoLaby local design preview:',url)
webbrowser.open(url)
ThreadingHTTPServer(('127.0.0.1',8765),SimpleHTTPRequestHandler).serve_forever()
