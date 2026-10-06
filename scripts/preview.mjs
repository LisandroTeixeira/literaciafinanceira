// Servidor local opcional. O GitHub Pages publica apenas a pasta docs.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../docs');
const args=process.argv.slice(2);
const option=(name,fallback)=>args.includes(name)?args[args.indexOf(name)+1]:fallback;
const port=Number(option('--port','4173'));
const host=option('--host','127.0.0.1');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.pdf':'application/pdf'};
const server=http.createServer(async(req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  try{
    const url=new URL(req.url,'http://localhost');
    // Vista de verificação local, sem fazer parte das páginas publicadas.
    if(url.pathname==='/__preview-mobile__'){
      res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
      res.end('<!doctype html><html><head><title>Verificação no telemóvel</title><style>body{margin:0;background:#d8dae6;display:flex;justify-content:center}iframe{border:0;width:390px;height:1100px;background:white}</style></head><body><iframe title="Site num telemóvel de 390 pixels" src="/"></iframe></body></html>');return;
    }
    const pathname=decodeURIComponent(url.pathname);
    const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
    if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    const content=await fs.readFile(file);
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(req.method==='HEAD'?undefined:content);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Ficheiro não encontrado.');}
});
server.on('error',error=>{console.error(error.message);process.exit(1);});
server.listen(port,host,()=>console.log('Pré-visualização pronta na porta '+port+'.'));
