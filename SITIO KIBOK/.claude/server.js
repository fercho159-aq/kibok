const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const TIPOS={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.svg':'image/svg+xml','.json':'application/json'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);
  if(p==='/')p='/index.html';
  const f=path.join(ROOT,p);
  if(!f.startsWith(ROOT)){res.writeHead(403);return res.end('no');}
  fs.readFile(f,(e,d)=>{
    if(e){res.writeHead(404,{'Content-Type':'text/plain'});return res.end('404');}
    res.writeHead(200,{'Content-Type':TIPOS[path.extname(f)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(d);
  });
}).listen(4173,()=>console.log('http://localhost:4173'));
