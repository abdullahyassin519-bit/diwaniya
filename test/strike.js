/* مباريات كاملة لطخطخة بلاعبين آليين على ساعة محاكاة + فحوص النواة */
const C=require('../public/js/strike-core.js');let fail=0;const ok=(c,m)=>{if(!c){fail++;console.log('FAIL',m)}};
for(const n of Object.keys(C.RAW)){const m=C.parseMap(n);const F=C.field(m,m.sp[0][0][0]|0,m.sp[0][0][1]|0);let un=0;for(let i=0;i<m.w*m.h;i++)if(!m.g[i]&&F[i]<0)un++;
  const reach=p=>F[(p[1]|0)*m.w+(p[0]|0)]>=0;ok(m.sp[0].length>=6&&m.sp[1].length>=6,n+' spawns');ok(m.sp[0].every(reach)&&m.sp[1].every(reach)&&reach(m.sc.a)&&reach(m.sc.b),n+' reachability');
  const d=(s,k)=>C.field(m,m.sc[k][0]|0,m.sc[k][1]|0)[(m.sp[s][0][1]|0)*m.w+(m.sp[s][0][0]|0)];
  console.log(n,m.w+'x'+m.h,'spawns',m.sp[0].length,m.sp[1].length,'unreachable floor',un,'| steps T→A',d(0,'a'),'T→B',d(0,'b'),'D→A',d(1,'a'),'D→B',d(1,'b'))}
{const m=C.parseMap('الحارة');ok(C.ray3(m,1.5,1.5,.8,-1,0,0,50)<.6,'wall blocks');ok(C.R3.kind==='w','kind w');ok(Math.abs(C.ray3(m,1.5,1.5,.8,.6,0,-.8,50)-1)<.01&&C.R3.kind==='f','floor hit');
 /* ساتر منخفض عند (13,3): يحجب الرصاصة المنخفضة ولا يحجب العالية */ ok(C.ray3(m,10.5,3.5,.3,1,0,0,50)<2.6,'low cover blocks low shot');ok(C.ray3(m,10.5,3.5,.8,1,0,0,50)>5,'low cover passes high shot');
 ok(C.hitPlayer(0,0,.82,1,0,0,5,0,0)&&C.H3.part===1&&Math.abs(C.H3.t-4.905)<.01,'headshot');ok(C.hitPlayer(0,0,.4,1,0,0,5,0,0)&&C.H3.part===0,'body');ok(!C.hitPlayer(0,0,.82,1,0,0,5,0,1),'crouch dodges head-height shot');ok(!C.hitPlayer(0,0,.4,1,0,0,5,.5,0),'miss sideways')}
for(const map of Object.keys(C.RAW))for(const n of[2,6,12])for(const diff of[0,2]){
  const ps=Array.from({length:n},(_,i)=>'p'+i),tm={},bots={};ps.forEach((p,i)=>{tm[p]=i%2;bots[p]=1});let now=1e6,kills=0,plants=0,defs=0,booms=0,shots=0,over=null;const reasons={};
  const sim=C.Sim({ps,tm,map,target:3,diff,bots,connected:()=>true,now:()=>now,emit:q=>{if(q[0]==='k')kills++;if(q[0]==='f')shots++;if(q[0]==='e'){if(q[1]==='pl')plants++;if(q[1]==='df')defs++;if(q[1]==='boom')booms++}},onOver:s=>{over=s}});
  const m=C.parseMap(map);let last='',steps=0;
  try{while(!over&&steps<600000){now+=50;steps++;sim.tick();const S=sim.S;if(S.ph==='end'&&last!=='end')reasons[S.msg]=(reasons[S.msg]||0)+1;last=S.ph;
      for(const id in sim.pos){const P=sim.pos[id];if(!(P.x>0&&P.y>0)||m.g[(P.y|0)*m.w+(P.x|0)])throw new Error('bot in wall/NaN '+id)}}
    if(!over)throw new Error('match did not finish');if(!over.mvp||!over.pl[over.mvp])throw new Error('no mvp');
    console.log(map.padEnd(9),n+'p','diff',diff,'rounds',over.sc.join('-'),'simMin',((now-1e6)/60000).toFixed(1),'kills',kills,'shots',shots,'plants',plants,'defuses',defs,'booms',booms,JSON.stringify(reasons));
  }catch(e){fail++;console.log('FAIL',map,n,e.message)}
}
/* لاعب بشري: التحقق من الضرر والشراء والزرع على الخادم */
{let now=1e6;const out=[];const sim=C.Sim({ps:['h','e'],tm:{h:0,e:1},map:'القلعة',target:3,diff:1,bots:{},connected:()=>true,now:()=>now,emit:(q,to)=>out.push([q,to])});const S=sim.S,m=C.parseMap('القلعة');
 sim.msg('h',['buy','rifle']);ok(!S.pl.h.w,'cannot afford rifle at 800');S.pl.h.$=5000;sim.msg('h',['buy','rifle']);sim.msg('h',['buy','armor']);ok(S.pl.h.w==='rifle'&&S.pl.h.ar===100&&S.pl.h.$===5000-2700-650,'buy rifle+armor');
 sim.msg('h',['p',6.5,6.5,0,0,0]);sim.msg('e',['p',9.5,6.5,3.14,0,0]);sim.msg('h',['h','e',0,1,1]);ok(S.pl.e.hp===100,'no damage in freeze');
 now+=10100;sim.tick();ok(S.ph==='live','live');sim.msg('h',['h','e',0,1,1]);ok(S.pl.e.hp<100&&S.pl.e.hp>60,'rifle body dmg '+S.pl.e.hp);const hp=S.pl.e.hp;sim.msg('h',['h','e',1,1,1]);ok(S.pl.e.hp===hp,'fire-rate limit rejects instant second hit');
 now+=120;sim.msg('h',['h','e',1,1,1]);ok(!S.pl.e.al&&S.pl.h.k===1&&S.pl.h.hs===1,'headshot kills');sim.tick();ok(S.ph==='end'&&S.sc[0]===1,'round to attackers');
 now+=6100;sim.tick();now+=10100;sim.tick();sim.msg('h',['p',3.5,3.5,0,0,0]);sim.msg('e',['p',28.5,19.5,0,0,0]);sim.msg('h',['h','e',1,1,1]);ok(S.pl.e.hp===100,'hit through walls rejected');
 sim.msg('h',['p',12.5,3.5,0,0,8]);sim.msg('h',['pl']);ok(!S.bomb,'plant needs hold time');now+=3000;sim.msg('h',['p',12.5,3.5,0,0,8]);sim.msg('h',['pl']);ok(S.bomb&&Math.abs(S.bomb.x-12.5)<.01,'plant after hold');
 now+=40100;sim.tick();ok(S.ph==='end'&&S.sc[0]===2&&!S.pl.h.al,'bomb explodes: round + planter caught in blast')}
console.log('strike failures:',fail);process.exit(fail?1:0);
