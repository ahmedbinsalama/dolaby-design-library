#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path');
const dir=path.resolve(__dirname,'../../03_UIUX_KIT/components');
const input=JSON.parse(fs.readFileSync(path.join(dir,'component-catalog.json'),'utf8'));
if(!Array.isArray(input)||input.length!==30||new Set(input.map(x=>x.id)).size!==30)throw Error('Expected 30 unique component records');
const target=path.join(dir,'catalog-data.js');
if(process.argv.includes('--write')){
 fs.writeFileSync(target,'// Generated from component-catalog.json; edit JSON and regenerate.\nwindow.COMPONENT_CATALOG='+JSON.stringify(input)+';\n');
 console.log(JSON.stringify({status:'PASS',action:'WROTE_COMPANION',records:input.length}));
}else{
 const source=fs.readFileSync(target,'utf8');const at=source.indexOf('window.COMPONENT_CATALOG=');
 if(at<0)throw Error('Companion assignment missing');
 const output=JSON.parse(source.slice(at+'window.COMPONENT_CATALOG='.length).trim().replace(/;$/,''));
 const equal=JSON.stringify(input)===JSON.stringify(output);
 console.log(JSON.stringify({status:equal?'PASS':'FAIL',action:'READ_ONLY_CHECK',records:input.length,identical_data:equal}));
 process.exitCode=equal?0:1;
}
