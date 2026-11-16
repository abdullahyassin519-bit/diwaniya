/* مباريات كاملة لطخطخة بلاعبين آليين على ساعة محاكاة */
const fs=require('fs'),vm=require('vm'),path=require('path');const dir=path.join(__dirname,'../public/js');
for(const f of['kit','g-strike'])vm.runInThisContext(fs.readFileSync(path.join(dir,f+'.js'),'utf8'));
const g=G.by.strike,T=g._t;let fail=0;
for(const map of Object.keys(T.RAW))for(const n of[2,6,12]){
  const ps=Array.from({length:n},(_,i)=>'p'+i),H={hostId:()=>'p0'};const st=g.init(ps,{map,w:3},H);
  const m=T.parseMap(st.map),S=T.newS(st),pos={};let now=0,over=null,kills=0,plants=0,defs=0,booms=0;const reasons={};
  const host=T.makeHost({m,S,pos,isBot:()=>true,emit:q=>{if(q[0]==='k')kills++;if(q[0]==='e'){if(q[1]==='pl')plants++;if(q[1]==='df')defs++;if(q[1]==='boom')booms++}},now:()=>now,diff:1,target:3,over:w=>{over=w}},true);
  let last='',steps=0;
  try{while(over===null&&steps<400000){now+=50;steps++;host.tick();if(S.ph==='end'&&last!=='end')reasons[S.msg]=(reasons[S.msg]||0)+1;last=S.ph;
    for(const id in pos){const P=pos[id];if(!(P.x>0&&P.y>0)||m.g[(P.y|0)*m.w+(P.x|0)])throw new Error('bot in wall/NaN '+id+' '+P.x+','+P.y)}}
    if(over===null)throw new Error('match did not finish');
    const fin={};for(const id in S.pl)fin[id]=[S.pl[id].k,S.pl[id].d];g.act(st,'p0',{t:'over',win:over,fin,rs:S.sc},H);
    if(!st.over||!st.over.win.length)throw new Error('platform over missing');const html=g.view(st,'p0',{av:()=>'🙂',nm:x=>x});if(/undefined|NaN/.test(html))throw new Error('bad final view');
    console.log(map.padEnd(9),n+'p','rounds',S.sc.join('-'),'simMin',(now/60000).toFixed(1),'kills',kills,'plants',plants,'defuses',defs,'booms',booms,JSON.stringify(reasons));
  }catch(e){fail++;console.log('FAIL',map,n,e.message)}
}
console.log('strike failures:',fail);process.exit(fail?1:0);
