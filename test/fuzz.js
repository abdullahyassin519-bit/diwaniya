const fs=require('fs'),vm=require('vm'),path=require('path');
const dir=path.join(__dirname,'../public/js');
for(const f of['kit','g-board1','g-board2','g-party','g-brain','g-creative','g-original','g-strike'])vm.runInThisContext(fs.readFileSync(path.join(dir,f+'.js'),'utf8'),{filename:f});
const junk=[{},{t:'x'},{c:99},{i:-1},{p:'zz'},{t:'v',p:'zz'},{t:'w'},{t:'p',i:99},{t:'mv',i:7},{f:1,t:2},{t:'b',x:'abc'},{t:'obj',p:'zz',c:9},{t:'ac',p:'zz'},{t:'gs'},{x:'q'},{t:'st',s:'no'},{t:'g',i:5},{t:'kill',p:'zz'}];
let fail=0;
for(const g of G.list){if(g.rt)continue;
  const sizes=[...new Set([g.min,Math.min(g.max,Math.max(g.min,4)),g.max])];
  let runs=0,steps=0,maxSteps=0,overs={};
  for(const n of sizes)for(let r=0;r<12;r++){
    const ps=Array.from({length:n},(_,i)=>'p'+i);const o={};(g.opts||[]).forEach(x=>o[x.k]=r%2?x.d:x.v[r%x.v.length]);
    const H={ps,nm:p=>'لاعب'+p,av:p=>'🙂',now:1e6,o,ui:{}};
    try{
      let st=g.init(ps,o,H),i=0;
      for(;i<60000&&!st.over;i++){
        H.now+=500;
        if(g.tick&&g.tick(st,H)){}
        for(const p of ps){if(st.over)break;const a=g.bot&&g.bot(st,p,H);if(a)g.act(st,p,a,H);}
        if(i%7===0&&!st.over){g.act(st,ps[i%n],junk[i%junk.length],H);g.act(st,'ghost',{t:'roll'},H)}
        st=JSON.parse(JSON.stringify(st));
        if(i%5===0)for(const p of ps){const h=g.view(st,p,H);if(typeof h!=='string'||h.includes('undefined')||h.includes('NaN'))throw new Error('bad view: '+String(h).slice(0,300).replace(/\s+/g,' '))}
        if(g.turn&&!st.over&&!ps.includes(g.turn(st)))throw new Error('bad turn');
      }
      if(!st.over)throw new Error('did not finish in '+i+' steps, ph='+st.ph);
      for(const p of ps){const h=g.view(st,p,H);if(h.includes('undefined')||h.includes('NaN'))throw new Error('bad final view')}
      if(!Array.isArray(st.over.win)||st.over.win.some(p=>!ps.includes(p)))throw new Error('bad win '+JSON.stringify(st.over));
      for(const p of ps)if(typeof st.sc[p]!=='number'||isNaN(st.sc[p]))throw new Error('bad score');
      runs++;steps+=i;maxSteps=Math.max(maxSteps,i);overs[st.over.win.length?'win':'draw']=(overs[st.over.win.length?'win':'draw']||0)+1;
    }catch(e){fail++;console.log('FAIL',g.id,'n='+n,e.stack.split('\n').slice(0,4).join(' | '));break}
  }
  console.log(g.id.padEnd(9),'runs',runs,'avgSteps',Math.round(steps/Math.max(runs,1)),'max',maxSteps,JSON.stringify(overs));
}
console.log(G.list.length,'games; failures:',fail);process.exit(fail?1:0);
