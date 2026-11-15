const fs=require('fs'),vm=require('vm'),path=require('path');const dir=path.join(__dirname,'../public/js');
for(const f of['kit','g-board1'])vm.runInThisContext(fs.readFileSync(path.join(dir,f+'.js'),'utf8'));
const {chLegal,chApply}=G.by.chess._t;
function perft(s,d){if(!d)return 1;let n=0;for(const m of chLegal(s)){const c={b:s.b.slice(),cas:s.cas,ep:s.ep,k:s.k};chApply(c,m);n+=perft(c,d-1)}return n}
const fen=(rows,k,cas,ep)=>({b:rows.replace(/\//g,'').replace(/\d/g,d=>'.'.repeat(d)).split(''),k,cas,ep});
const start=G.by.chess.init(['a','b']);
console.log('start d3',perft(start,3),'expect 8902');console.log('start d4',perft(start,4),'expect 197281');
// Kiwipete: castling, en passant, pins (promotion is queen-only here so compare d1,d2 only: 48, 2039)
const kp=fen('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R',0,'KQkq',-1);
console.log('kiwipete d1',perft(kp,1),'expect 48');console.log('kiwipete d2',perft(kp,2),'expect 2039');console.log('kiwipete d3',perft(kp,3),'expect 97862');
