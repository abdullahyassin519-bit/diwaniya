(()=>{var Nu=0,zc=1,Uu=2;var ts=1,Fu=2,Ys=3,zi=0,on=1,Qe=2,es=0,ki=1,ln=2,kc=3,Hc=4,Ou=5;var ns=100,Bu=101,zu=102,ku=103,Hu=104,Gu=200,Vu=201,Wu=202,Xu=203,Gc=204,Vc=205,qu=206,Yu=207,Zu=208,Ju=209,$u=210,Ku=211,Qu=212,ju=213,td=214,ao=0,oo=1,lo=2,Ps=3,co=4,ho=5,uo=6,fo=7,Wc=0,ed=1,nd=2,ni=0,Xc=1,qc=2,Yc=3,na=4,Zc=5,Jc=6,$c=7;var Kc=300,is=301,Zs=302,qo=303,Yo=304,Ls=1e3,Jn=1001,po=1002,He=1003,id=1004;var ia=1005;var sn=1006,Zo=1007;var yi=1008;var pn=1009,Qc=1010,jc=1011,Js=1012,Jo=1013,Gn=1014,Ln=1015,Vn=1016,$o=1017,Ko=1018,ss=1020,th=35902,eh=35899,nh=1021,ih=1022,Wn=1023,gi=1026,vi=1027,Qo=1028,jo=1029,Hi=1030,tl=1031;var el=1033,sa=33776,ra=33777,aa=33778,oa=33779,nl=35840,il=35841,sl=35842,rl=35843,al=36196,ol=37492,ll=37496,cl=37488,hl=37489,la=37490,ul=37491,dl=37808,fl=37809,pl=37810,ml=37811,gl=37812,_l=37813,xl=37814,yl=37815,vl=37816,Ml=37817,Sl=37818,bl=37819,El=37820,Tl=37821,wl=36492,Al=36494,Rl=36495,Cl=36283,Il=36284,ca=36285,Pl=36286;var yr=2300,mo=2301,so=2302,Ac=2303,Rc=2400,Cc=2401,Ic=2402;var sd=3200;var Ll=0,rd=1,Mi="",nn="srgb",vr="srgb-linear",Mr="linear",te="srgb";var ro=7680;var ad=519,od=512,ld=513,cd=514,sh=515,hd=516,ud=517,rh=518,ah=519,oh=35044,ha=35048;var lh="300 es",Cn=2e3,Ds=2001;function Mf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Sf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Sr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function dd(){let i=Sr("canvas");return i.style.display="block",i}var Yh={},Ns=null;function br(...i){let t="THREE."+i.shift();Ns?Ns("log",t,...i):console.log(t,...i)}function fd(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Rt(...i){i=fd(i);let t="THREE."+i.shift();if(Ns)Ns("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Dt(...i){i=fd(i);let t="THREE."+i.shift();if(Ns)Ns("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function gr(...i){let t=i.join(" ");t in Yh||(Yh[t]=!0,Rt(...i))}function pd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var md={[ao]:ao,[lo]:uo,[co]:co,[Ps]:ho,[oo]:oo,[uo]:lo,[fo]:fo,[ho]:Ps},$n=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var tc=Math.PI/180,go=180/Math.PI;function Gi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Je[i&255]+Je[i>>8&255]+Je[i>>16&255]+Je[i>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]).toLowerCase()}function Wt(i,t,e){return Math.max(t,Math.min(e,i))}function bf(i,t){return(i%t+t)%t}function ec(i,t,e){return(1-e)*i+e*t}function gd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Dl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function _d(i,t){if(t.constructor===Float32Array)return i;let e=Dl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function xd(i,t){if(t.constructor===Float32Array)return i;let e=Dl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var ph=class ph{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ph.prototype.isVector2=!0;var st=ph,In=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],p=r[a+0],u=r[a+1],g=r[a+2],_=r[a+3];if(d!==_||l!==p||c!==u||h!==g){let f=l*p+c*u+h*g+d*_;f<0&&(p=-p,u=-u,g=-g,_=-_,f=-f);let m=1-o;if(f<.9995){let y=Math.acos(f),b=Math.sin(y);m=Math.sin(m*y)/b,o=Math.sin(o*y)/b,l=l*m+p*o,c=c*m+u*o,h=h*m+g*o,d=d*m+_*o}else{l=l*m+p*o,c=c*m+u*o,h=h*m+g*o,d=d*m+_*o;let y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],p=r[a+1],u=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*u-c*p,t[e+1]=l*g+h*p+c*d-o*u,t[e+2]=c*g+h*u+o*p-l*d,t[e+3]=h*g-o*d-l*p-c*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),p=l(n/2),u=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=p*h*d+c*u*g,this._y=c*u*d-p*h*g,this._z=c*h*g+p*u*d,this._w=c*h*d-p*u*g;break;case"YXZ":this._x=p*h*d+c*u*g,this._y=c*u*d-p*h*g,this._z=c*h*g-p*u*d,this._w=c*h*d+p*u*g;break;case"ZXY":this._x=p*h*d-c*u*g,this._y=c*u*d+p*h*g,this._z=c*h*g+p*u*d,this._w=c*h*d-p*u*g;break;case"ZYX":this._x=p*h*d-c*u*g,this._y=c*u*d+p*h*g,this._z=c*h*g-p*u*d,this._w=c*h*d+p*u*g;break;case"YZX":this._x=p*h*d+c*u*g,this._y=c*u*d+p*h*g,this._z=c*h*g-p*u*d,this._w=c*h*d-p*u*g;break;case"XZY":this._x=p*h*d-c*u*g,this._y=c*u*d-p*h*g,this._z=c*h*g+p*u*d,this._w=c*h*d+p*u*g;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],p=n+o+d;if(p>0){let u=.5/Math.sqrt(p+1);this._w=.25/u,this._x=(h-l)*u,this._y=(r-c)*u,this._z=(a-s)*u}else if(n>o&&n>d){let u=2*Math.sqrt(1+n-o-d);this._w=(h-l)/u,this._x=.25*u,this._y=(s+a)/u,this._z=(r+c)/u}else if(o>d){let u=2*Math.sqrt(1+o-n-d);this._w=(r-c)/u,this._x=(s+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+d-n-o);this._w=(a-s)/u,this._x=(r+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},mh=class mh{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return nc.copy(this).projectOnVector(t),this.sub(nc)}reflect(t){return this.sub(nc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};mh.prototype.isVector3=!0;var D=mh,nc=new D,Zh=new In,gh=class gh{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],p=n[2],u=n[5],g=n[8],_=s[0],f=s[3],m=s[6],y=s[1],b=s[4],v=s[7],w=s[2],T=s[5],x=s[8];return r[0]=a*_+o*y+l*w,r[3]=a*f+o*b+l*T,r[6]=a*m+o*v+l*x,r[1]=c*_+h*y+d*w,r[4]=c*f+h*b+d*T,r[7]=c*m+h*v+d*x,r[2]=p*_+u*y+g*w,r[5]=p*f+u*b+g*T,r[8]=p*m+u*v+g*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,p=o*l-h*r,u=c*r-a*l,g=e*d+n*p+s*u;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=p*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=u*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return gr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ic.makeScale(t,e)),this}rotate(t){return gr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ic.makeRotation(-t)),this}translate(t,e){return gr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ic.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};gh.prototype.isMatrix3=!0;var Nt=gh,ic=new Nt,Jh=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$h=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ef(){let i={enabled:!0,workingColorSpace:vr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===te&&(s.r=mi(s.r),s.g=mi(s.g),s.b=mi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===te&&(s.r=Cs(s.r),s.g=Cs(s.g),s.b=Cs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Mi?Mr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[vr]:{primaries:t,whitePoint:n,transfer:Mr,toXYZ:Jh,fromXYZ:$h,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:t,whitePoint:n,transfer:te,toXYZ:Jh,fromXYZ:$h,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),i}var Jt=Ef();function mi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Cs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var us,_o=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{us===void 0&&(us=Sr("canvas")),us.width=t.width,us.height=t.height;let s=us.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=us}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Sr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=mi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(mi(e[n]/255)*255):e[n]=mi(e[n]);return{data:e,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Tf=0,Us=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=Gi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(sc(s[a].image)):r.push(sc(s[a]))}else r=sc(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function sc(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?_o.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}var wf=0,rc=new D,rn=class i extends $n{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Jn,s=Jn,r=sn,a=yi,o=Wn,l=pn,c=i.DEFAULT_ANISOTROPY,h=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=Gi(),this.name="",this.source=new Us(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(rc).x}get height(){return this.source.getSize(rc).y}get depth(){return this.source.getSize(rc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Rt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ls:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case po:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ls:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case po:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=Kc;rn.DEFAULT_ANISOTROPY=1;var _h=class _h{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],p=l[1],u=l[5],g=l[9],_=l[2],f=l[6],m=l[10];if(Math.abs(h-p)<.01&&Math.abs(d-_)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(d+_)<.1&&Math.abs(g+f)<.1&&Math.abs(c+u+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(c+1)/2,v=(u+1)/2,w=(m+1)/2,T=(h+p)/4,x=(d+_)/4,E=(g+f)/4;return b>v&&b>w?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=T/n,r=x/n):v>w?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=E/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=x/r,s=E/r),this.set(n,s,r,e),this}let y=Math.sqrt((f-g)*(f-g)+(d-_)*(d-_)+(p-h)*(p-h));return Math.abs(y)<.001&&(y=1),this.x=(f-g)/y,this.y=(d-_)/y,this.z=(p-h)/y,this.w=Math.acos((c+u+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this.w=Wt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this.w=Wt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_h.prototype.isVector4=!0;var _e=_h,xo=class extends $n{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new rn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:sn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Us(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},xn=class extends xo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Er=class extends rn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var yo=class extends rn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Xo=class Xo{constructor(t,e,n,s,r,a,o,l,c,h,d,p,u,g,_,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,p,u,g,_,f)}set(t,e,n,s,r,a,o,l,c,h,d,p,u,g,_,f){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=p,m[3]=u,m[7]=g,m[11]=_,m[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xo().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/ds.setFromMatrixColumn(t,0).length(),r=1/ds.setFromMatrixColumn(t,1).length(),a=1/ds.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let p=a*h,u=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=u+g*c,e[5]=p-_*c,e[9]=-o*l,e[2]=_-p*c,e[6]=g+u*c,e[10]=a*l}else if(t.order==="YXZ"){let p=l*h,u=l*d,g=c*h,_=c*d;e[0]=p+_*o,e[4]=g*o-u,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=u*o-g,e[6]=_+p*o,e[10]=a*l}else if(t.order==="ZXY"){let p=l*h,u=l*d,g=c*h,_=c*d;e[0]=p-_*o,e[4]=-a*d,e[8]=g+u*o,e[1]=u+g*o,e[5]=a*h,e[9]=_-p*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let p=a*h,u=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-u,e[8]=p*c+_,e[1]=l*d,e[5]=_*c+p,e[9]=u*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let p=a*l,u=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-p*d,e[8]=g*d+u,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=u*d+g,e[10]=p-_*d}else if(t.order==="XZY"){let p=a*l,u=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=p*d+_,e[5]=a*h,e[9]=u*d-g,e[2]=g*d-u,e[6]=o*h,e[10]=_*d+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Af,t,Rf)}lookAt(t,e,n){let s=this.elements;return gn.subVectors(t,e),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),Ri.crossVectors(n,gn),Ri.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),Ri.crossVectors(n,gn)),Ri.normalize(),Ra.crossVectors(gn,Ri),s[0]=Ri.x,s[4]=Ra.x,s[8]=gn.x,s[1]=Ri.y,s[5]=Ra.y,s[9]=gn.y,s[2]=Ri.z,s[6]=Ra.z,s[10]=gn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],p=n[9],u=n[13],g=n[2],_=n[6],f=n[10],m=n[14],y=n[3],b=n[7],v=n[11],w=n[15],T=s[0],x=s[4],E=s[8],N=s[12],I=s[1],F=s[5],O=s[9],W=s[13],P=s[2],V=s[6],Y=s[10],G=s[14],nt=s[3],q=s[7],j=s[11],tt=s[15];return r[0]=a*T+o*I+l*P+c*nt,r[4]=a*x+o*F+l*V+c*q,r[8]=a*E+o*O+l*Y+c*j,r[12]=a*N+o*W+l*G+c*tt,r[1]=h*T+d*I+p*P+u*nt,r[5]=h*x+d*F+p*V+u*q,r[9]=h*E+d*O+p*Y+u*j,r[13]=h*N+d*W+p*G+u*tt,r[2]=g*T+_*I+f*P+m*nt,r[6]=g*x+_*F+f*V+m*q,r[10]=g*E+_*O+f*Y+m*j,r[14]=g*N+_*W+f*G+m*tt,r[3]=y*T+b*I+v*P+w*nt,r[7]=y*x+b*F+v*V+w*q,r[11]=y*E+b*O+v*Y+w*j,r[15]=y*N+b*W+v*G+w*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],p=t[10],u=t[14],g=t[3],_=t[7],f=t[11],m=t[15],y=l*u-c*p,b=o*u-c*d,v=o*p-l*d,w=a*u-c*h,T=a*p-l*h,x=a*d-o*h;return e*(_*y-f*b+m*v)-n*(g*y-f*w+m*T)+s*(g*b-_*w+m*x)-r*(g*v-_*T+f*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],p=t[10],u=t[11],g=t[12],_=t[13],f=t[14],m=t[15],y=e*o-n*a,b=e*l-s*a,v=e*c-r*a,w=n*l-s*o,T=n*c-r*o,x=s*c-r*l,E=h*_-d*g,N=h*f-p*g,I=h*m-u*g,F=d*f-p*_,O=d*m-u*_,W=p*m-u*f,P=y*W-b*O+v*F+w*I-T*N+x*E;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/P;return t[0]=(o*W-l*O+c*F)*V,t[1]=(s*O-n*W-r*F)*V,t[2]=(_*x-f*T+m*w)*V,t[3]=(p*T-d*x-u*w)*V,t[4]=(l*I-a*W-c*N)*V,t[5]=(e*W-s*I+r*N)*V,t[6]=(f*v-g*x-m*b)*V,t[7]=(h*x-p*v+u*b)*V,t[8]=(a*O-o*I+c*E)*V,t[9]=(n*I-e*O-r*E)*V,t[10]=(g*T-_*v+m*y)*V,t[11]=(d*v-h*T-u*y)*V,t[12]=(o*N-a*F-l*E)*V,t[13]=(e*F-n*N+s*E)*V,t[14]=(_*b-g*w-f*y)*V,t[15]=(h*w-d*b+p*y)*V,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,p=r*c,u=r*h,g=r*d,_=a*h,f=a*d,m=o*d,y=l*c,b=l*h,v=l*d,w=n.x,T=n.y,x=n.z;return s[0]=(1-(_+m))*w,s[1]=(u+v)*w,s[2]=(g-b)*w,s[3]=0,s[4]=(u-v)*T,s[5]=(1-(p+m))*T,s[6]=(f+y)*T,s[7]=0,s[8]=(g+b)*x,s[9]=(f-y)*x,s[10]=(1-(p+_))*x,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=ds.set(s[0],s[1],s[2]).length(),o=ds.set(s[4],s[5],s[6]).length(),l=ds.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Un.copy(this);let c=1/a,h=1/o,d=1/l;return Un.elements[0]*=c,Un.elements[1]*=c,Un.elements[2]*=c,Un.elements[4]*=h,Un.elements[5]*=h,Un.elements[6]*=h,Un.elements[8]*=d,Un.elements[9]*=d,Un.elements[10]*=d,e.setFromRotationMatrix(Un),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=Cn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-s),p=(e+t)/(e-t),u=(n+s)/(n-s),g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===Cn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Ds)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=d,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Cn,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-s),p=-(e+t)/(e-t),u=-(n+s)/(n-s),g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===Cn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Ds)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=d,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Xo.prototype.isMatrix4=!0;var Qt=Xo,ds=new D,Un=new Qt,Af=new D(0,0,0),Rf=new D(1,1,1),Ri=new D,Ra=new D,gn=new D,Kh=new Qt,Qh=new In,zn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],p=s[6],u=s[10];switch(e){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Wt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Kh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Kh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qh.setFromEuler(this),this.setFromQuaternion(Qh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zn.DEFAULT_ORDER="XYZ";var Tr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Cf=0,jh=new D,fs=new In,ci=new Qt,Ca=new D,rr=new D,If=new D,Pf=new In,tu=new D(1,0,0),eu=new D(0,1,0),nu=new D(0,0,1),iu={type:"added"},Lf={type:"removed"},ps={type:"childadded",child:null},ac={type:"childremoved",child:null},De=class i extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=Gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new D,e=new zn,n=new In,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Nt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.multiply(fs),this}rotateOnWorldAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.premultiply(fs),this}rotateX(t){return this.rotateOnAxis(tu,t)}rotateY(t){return this.rotateOnAxis(eu,t)}rotateZ(t){return this.rotateOnAxis(nu,t)}translateOnAxis(t,e){return jh.copy(t).applyQuaternion(this.quaternion),this.position.add(jh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(tu,t)}translateY(t){return this.translateOnAxis(eu,t)}translateZ(t){return this.translateOnAxis(nu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ca.copy(t):Ca.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(rr,Ca,this.up):ci.lookAt(Ca,rr,this.up),this.quaternion.setFromRotationMatrix(ci),s&&(ci.extractRotation(s.matrixWorld),fs.setFromRotationMatrix(ci),this.quaternion.premultiply(fs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Dt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(iu),ps.child=t,this.dispatchEvent(ps),ps.child=null):Dt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Lf),ac.child=t,this.dispatchEvent(ac),ac.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ci.multiply(t.parent.matrixWorld)),t.applyMatrix4(ci),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(iu),ps.child=t,this.dispatchEvent(ps),ps.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,t,If),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,Pf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),p=a(t.skeletons),u=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),p.length>0&&(n.skeletons=p),u.length>0&&(n.animations=u),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};De.DEFAULT_UP=new D(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ce=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},Df={type:"move"},Fs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ce,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ce,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ce,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let f=e.getJointPose(_,n),m=this._getHandJoint(c,_);f!==null&&(m.matrix.fromArray(f.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=f.radius),m.visible=f!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],p=h.position.distanceTo(d.position),u=.02,g=.005;c.inputState.pinching&&p>u+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=u-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Df)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ce;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},yd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},Ia={h:0,s:0,l:0};function oc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ft=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=nn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Jt.workingColorSpace){if(t=bf(t,1),e=Wt(e,0,1),n=Wt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=oc(a,r,t+1/3),this.g=oc(a,r,t),this.b=oc(a,r,t-1/3)}return Jt.colorSpaceToWorking(this,s),this}setStyle(t,e=nn){function n(r){r!==void 0&&parseFloat(r)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Rt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=nn){let n=yd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=mi(t.r),this.g=mi(t.g),this.b=mi(t.b),this}copyLinearToSRGB(t){return this.r=Cs(t.r),this.g=Cs(t.g),this.b=Cs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=nn){return Jt.workingToColorSpace($e.copy(this),t),Math.round(Wt($e.r*255,0,255))*65536+Math.round(Wt($e.g*255,0,255))*256+Math.round(Wt($e.b*255,0,255))}getHexString(t=nn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace($e.copy(this),e);let n=$e.r,s=$e.g,r=$e.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace($e.copy(this),e),t.r=$e.r,t.g=$e.g,t.b=$e.b,t}getStyle(t=nn){Jt.workingToColorSpace($e.copy(this),t);let e=$e.r,n=$e.g,s=$e.b;return t!==nn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ci),this.setHSL(Ci.h+t,Ci.s+e,Ci.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ci),t.getHSL(Ia);let n=ec(Ci.h,Ia.h,e),s=ec(Ci.s,Ia.s,e),r=ec(Ci.l,Ia.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$e=new Ft;Ft.NAMES=yd;var wr=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ft(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ar=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Fn=new D,hi=new D,lc=new D,ui=new D,ms=new D,gs=new D,su=new D,cc=new D,hc=new D,uc=new D,dc=new _e,fc=new _e,pc=new _e,pi=class i{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Fn.subVectors(t,e),s.cross(Fn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Fn.subVectors(s,e),hi.subVectors(n,e),lc.subVectors(t,e);let a=Fn.dot(Fn),o=Fn.dot(hi),l=Fn.dot(lc),c=hi.dot(hi),h=hi.dot(lc),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let p=1/d,u=(c*l-o*h)*p,g=(a*h-o*l)*p;return r.set(1-u-g,g,u)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ui.x),l.addScaledVector(a,ui.y),l.addScaledVector(o,ui.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return dc.setScalar(0),fc.setScalar(0),pc.setScalar(0),dc.fromBufferAttribute(t,e),fc.fromBufferAttribute(t,n),pc.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(dc,r.x),a.addScaledVector(fc,r.y),a.addScaledVector(pc,r.z),a}static isFrontFacing(t,e,n,s){return Fn.subVectors(n,e),hi.subVectors(t,e),Fn.cross(hi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fn.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),Fn.cross(hi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;ms.subVectors(s,n),gs.subVectors(r,n),cc.subVectors(t,n);let l=ms.dot(cc),c=gs.dot(cc);if(l<=0&&c<=0)return e.copy(n);hc.subVectors(t,s);let h=ms.dot(hc),d=gs.dot(hc);if(h>=0&&d<=h)return e.copy(s);let p=l*d-h*c;if(p<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(ms,a);uc.subVectors(t,r);let u=ms.dot(uc),g=gs.dot(uc);if(g>=0&&u<=g)return e.copy(r);let _=u*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(gs,o);let f=h*g-u*d;if(f<=0&&d-h>=0&&u-g>=0)return su.subVectors(r,s),o=(d-h)/(d-h+(u-g)),e.copy(s).addScaledVector(su,o);let m=1/(f+_+p);return a=_*m,o=p*m,e.copy(n).addScaledVector(ms,a).addScaledVector(gs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Kn=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(On.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(On.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=On.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,On):On.fromBufferAttribute(r,a),On.applyMatrix4(t.matrixWorld),this.expandByPoint(On);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Pa.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pa.copy(n.boundingBox)),Pa.applyMatrix4(t.matrixWorld),this.union(Pa)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,On),On.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ar),La.subVectors(this.max,ar),_s.subVectors(t.a,ar),xs.subVectors(t.b,ar),ys.subVectors(t.c,ar),Ii.subVectors(xs,_s),Pi.subVectors(ys,xs),qi.subVectors(_s,ys);let e=[0,-Ii.z,Ii.y,0,-Pi.z,Pi.y,0,-qi.z,qi.y,Ii.z,0,-Ii.x,Pi.z,0,-Pi.x,qi.z,0,-qi.x,-Ii.y,Ii.x,0,-Pi.y,Pi.x,0,-qi.y,qi.x,0];return!mc(e,_s,xs,ys,La)||(e=[1,0,0,0,1,0,0,0,1],!mc(e,_s,xs,ys,La))?!1:(Da.crossVectors(Ii,Pi),e=[Da.x,Da.y,Da.z],mc(e,_s,xs,ys,La))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,On).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(On).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(di),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},di=[new D,new D,new D,new D,new D,new D,new D,new D],On=new D,Pa=new Kn,_s=new D,xs=new D,ys=new D,Ii=new D,Pi=new D,qi=new D,ar=new D,La=new D,Da=new D,Yi=new D;function mc(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Yi.fromArray(i,r);let o=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),l=t.dot(Yi),c=e.dot(Yi),h=n.dot(Yi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Re=new D,Na=new st,Nf=0,Me=class extends $n{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Nf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=oh,this.updateRanges=[],this.gpuType=Ln,this.version=0,this._normalizationScale=t!==void 0?Dl(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Na.fromBufferAttribute(this,e),Na.applyMatrix3(t),this.setXY(e,Na.x,Na.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix3(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix4(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyNormalMatrix(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.transformDirection(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):_d(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):xd(t,this.array)}};var Rr=class extends Me{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Cr=class extends Me{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Xt=class extends Me{constructor(t,e,n){super(new Float32Array(t),e,n)}},Uf=new Kn,or=new D,gc=new D,Qn=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Uf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;or.subVectors(t,this.center);let e=or.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(or,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(gc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(or.copy(t.center).add(gc)),this.expandByPoint(or.copy(t.center).sub(gc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Ff=0,Rn=new Qt,_c=new De,vs=new D,_n=new Kn,lr=new Kn,ke=new D,le=class i extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Mf(t)?Cr:Rr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Rn.makeRotationFromQuaternion(t),this.applyMatrix4(Rn),this}rotateX(t){return Rn.makeRotationX(t),this.applyMatrix4(Rn),this}rotateY(t){return Rn.makeRotationY(t),this.applyMatrix4(Rn),this}rotateZ(t){return Rn.makeRotationZ(t),this.applyMatrix4(Rn),this}translate(t,e,n){return Rn.makeTranslation(t,e,n),this.applyMatrix4(Rn),this}scale(t,e,n){return Rn.makeScale(t,e,n),this.applyMatrix4(Rn),this}lookAt(t){return _c.lookAt(t),_c.updateMatrix(),this.applyMatrix4(_c.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vs).negate(),this.translate(vs.x,vs.y,vs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(ke.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(ke),ke.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(ke)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Dt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let n=this.boundingSphere.center;if(_n.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];lr.setFromBufferAttribute(o),this.morphTargetsRelative?(ke.addVectors(_n.min,lr.min),_n.expandByPoint(ke),ke.addVectors(_n.max,lr.max),_n.expandByPoint(ke)):(_n.expandByPoint(lr.min),_n.expandByPoint(lr.max))}_n.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)ke.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ke));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ke.fromBufferAttribute(o,c),l&&(vs.fromBufferAttribute(t,c),ke.add(vs)),s=Math.max(s,n.distanceToSquared(ke))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Dt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Dt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Me(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let N=0;N<n.count;N++)o[N]=new D,l[N]=new D;let h=new D,d=new D,p=new D,u=new st,g=new st,_=new st,f=new D,m=new D;function y(N,I,F){c[N]=c[I]=c[F]=1,h.fromBufferAttribute(n,N),d.fromBufferAttribute(n,I),p.fromBufferAttribute(n,F),u.fromBufferAttribute(r,N),g.fromBufferAttribute(r,I),_.fromBufferAttribute(r,F),d.sub(h),p.sub(h),g.sub(u),_.sub(u);let O=1/(g.x*_.y-_.x*g.y);isFinite(O)&&(f.copy(d).multiplyScalar(_.y).addScaledVector(p,-g.y).multiplyScalar(O),m.copy(p).multiplyScalar(g.x).addScaledVector(d,-_.x).multiplyScalar(O),o[N].add(f),o[I].add(f),o[F].add(f),l[N].add(m),l[I].add(m),l[F].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let N=0,I=b.length;N<I;++N){let F=b[N],O=F.start,W=F.count;for(let P=O,V=O+W;P<V;P+=3)y(t.getX(P+0),t.getX(P+1),t.getX(P+2))}let v=new D,w=new D,T=new D,x=new D;function E(N){T.fromBufferAttribute(s,N),x.copy(T);let I=o[N];v.copy(I),v.sub(T.multiplyScalar(T.dot(I))).normalize(),w.crossVectors(x,I);let O=w.dot(l[N])<0?-1:1;a.setXYZW(N,v.x,v.y,v.z,O)}for(let N=0,I=n.count;N<I;++N)c[N]&&E(N);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,u=n.count;p<u;p++)n.setXYZ(p,0,0,0);let s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,d=new D;if(t)for(let p=0,u=t.count;p<u;p+=3){let g=t.getX(p+0),_=t.getX(p+1),f=t.getX(p+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,f),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,f),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let p=0,u=e.count;p<u;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ke.fromBufferAttribute(t,e),ke.normalize(),t.setXYZ(e,ke.x,ke.y,ke.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,p=new c.constructor(l.length*h),u=0,g=0;for(let _=0,f=l.length;_<f;_++){o.isInterleavedBufferAttribute?u=l[_]*o.data.stride+o.offset:u=l[_]*h;for(let m=0;m<h;m++)p[g++]=c[u++]}return new Me(p,h,d)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let p=c[h],u=t(p,n);l.push(u)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,p=c.length;d<p;d++){let u=c[d];h.push(u.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let p=0,u=d.length;p<u;p++)h.push(d[p].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},vo=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=oh,this.updateRanges=[],this.version=0,this.uuid=Gi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=ru(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);let n=new this.array.constructor(t.arrayBuffers[e]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=ru(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function ru(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=Gi()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var en=new D,Ir=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s,this._normalizationScale=t!==void 0?Dl(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)en.fromBufferAttribute(this,e),en.applyMatrix4(t),this.setXYZ(e,en.x,en.y,en.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)en.fromBufferAttribute(this,e),en.applyNormalMatrix(t),this.setXYZ(e,en.x,en.y,en.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)en.fromBufferAttribute(this,e),en.transformDirection(t),this.setXYZ(e,en.x,en.y,en.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){br("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){br("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):_d(t,this.data.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):xd(t,this.data.array)}},xc=new D,Of=new D,Bf=new Nt,Bn=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=xc.subVectors(n,e).cross(Of.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(xc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Bf.getNormalMatrix(t),s=this.coplanarPoint(xc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},zf=0,kn=class extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Gi(),this.name="",this.type="Material",this.blending=ki,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gc,this.blendDst=Vc,this.blendEquation=ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=Ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ad,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ro,this.stencilZFail=ro,this.stencilZPass=ro,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Rt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ft().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Bn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new st().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new st().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},jn=class extends kn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Ms,cr=new D,Ss=new D,bs=new D,Es=new st,hr=new st,vd=new Qt,Ua=new D,ur=new D,Fa=new D,au=new st,yc=new st,ou=new st,_i=class extends De{constructor(t=new jn){if(super(),this.isSprite=!0,this.type="Sprite",Ms===void 0){Ms=new le;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new vo(e,5);Ms.setIndex([0,1,2,0,2,3]),Ms.setAttribute("position",new Ir(n,3,0,!1)),Ms.setAttribute("uv",new Ir(n,2,3,!1))}this.geometry=Ms,this.material=t,this.center=new st(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Dt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ss.setFromMatrixScale(this.matrixWorld),vd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),bs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ss.multiplyScalar(-bs.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Oa(Ua.set(-.5,-.5,0),bs,a,Ss,s,r),Oa(ur.set(.5,-.5,0),bs,a,Ss,s,r),Oa(Fa.set(.5,.5,0),bs,a,Ss,s,r),au.set(0,0),yc.set(1,0),ou.set(1,1);let o=t.ray.intersectTriangle(Ua,ur,Fa,!1,cr);if(o===null&&(Oa(ur.set(-.5,.5,0),bs,a,Ss,s,r),yc.set(0,1),o=t.ray.intersectTriangle(Ua,Fa,ur,!1,cr),o===null))return;let l=t.ray.origin.distanceTo(cr);l<t.near||l>t.far||e.push({distance:l,point:cr.clone(),uv:pi.getInterpolation(cr,Ua,ur,Fa,au,yc,ou,new st),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){let e=super.toJSON(t);return e.object.center=this.center.toArray(),e}};function Oa(i,t,e,n,s,r){Es.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(hr.x=r*Es.x-s*Es.y,hr.y=s*Es.x+r*Es.y):hr.copy(Es),i.copy(t),i.x+=hr.x,i.y+=hr.y,i.applyMatrix4(vd)}var fi=new D,vc=new D,Ba=new D,za=new D,Os=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=fi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(fi.copy(this.origin).addScaledVector(this.direction,e),fi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){vc.copy(t).add(e).multiplyScalar(.5),Ba.copy(e).sub(t).normalize(),za.copy(this.origin).sub(vc);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Ba),o=za.dot(this.direction),l=-za.dot(Ba),c=za.lengthSq(),h=Math.abs(1-a*a),d,p,u,g;if(h>0)if(d=a*l-o,p=a*o-l,g=r*h,d>=0)if(p>=-g)if(p<=g){let _=1/h;d*=_,p*=_,u=d*(d+a*p+2*o)+p*(a*d+p+2*l)+c}else p=r,d=Math.max(0,-(a*p+o)),u=-d*d+p*(p+2*l)+c;else p=-r,d=Math.max(0,-(a*p+o)),u=-d*d+p*(p+2*l)+c;else p<=-g?(d=Math.max(0,-(-a*r+o)),p=d>0?-r:Math.min(Math.max(-r,-l),r),u=-d*d+p*(p+2*l)+c):p<=g?(d=0,p=Math.min(Math.max(-r,-l),r),u=p*(p+2*l)+c):(d=Math.max(0,-(a*r+o)),p=d>0?r:Math.min(Math.max(-r,-l),r),u=-d*d+p*(p+2*l)+c);else p=a>0?-r:r,d=Math.max(0,-(a*p+o)),u=-d*d+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(vc).addScaledVector(Ba,p),u}intersectSphere(t,e){if(t.radius<0)return null;fi.subVectors(t.center,this.origin);let n=fi.dot(this.direction),s=fi.dot(fi)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,s=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,s=(t.min.x-p.x)*c),h>=0?(r=(t.min.y-p.y)*h,a=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,a=(t.min.y-p.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-p.z)*d,l=(t.max.z-p.z)*d):(o=(t.max.z-p.z)*d,l=(t.min.z-p.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,fi)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,p=t.y-a.y,u=t.z-a.z,g=e.x-a.x,_=e.y-a.y,f=e.z-a.z,m=n.x-a.x,y=n.y-a.y,b=n.z-a.z,v=Math.abs(l),w=Math.abs(c),T=Math.abs(h),x,E,N,I,F,O,W,P,V,Y,G,nt;if(v>=w&&v>=T?(N=l,O=d,V=g,nt=m,l>=0?(x=c,E=h,I=p,F=u,W=_,P=f,Y=y,G=b):(x=h,E=c,I=u,F=p,W=f,P=_,Y=b,G=y)):w>=T?(N=c,O=p,V=_,nt=y,c>=0?(x=h,E=l,I=u,F=d,W=f,P=g,Y=b,G=m):(x=l,E=h,I=d,F=u,W=g,P=f,Y=m,G=b)):(N=h,O=u,V=f,nt=b,h>=0?(x=l,E=c,I=d,F=p,W=g,P=_,Y=m,G=y):(x=c,E=l,I=p,F=d,W=_,P=g,Y=y,G=m)),N===0)return null;let q=x/N,j=E/N,tt=1/N,bt=I-q*O,Ot=F-j*O,$=W-q*V,gt=P-j*V,vt=Y-q*nt,Ct=G-j*nt,_t=vt*gt-Ct*$,zt=bt*Ct-Ot*vt,we=$*Ot-gt*bt;if(s){if(_t<0||zt<0||we<0)return null}else if((_t<0||zt<0||we<0)&&(_t>0||zt>0||we>0))return null;let Lt=_t+zt+we;if(Lt===0)return null;let ee=tt*(_t*O+zt*V+we*nt);return(Lt>0?ee<0:ee>0)?null:this.at(ee/Lt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},an=class extends kn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=Wc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},lu=new Qt,Zi=new Os,ka=new Qn,cu=new D,Ha=new D,Ga=new D,Va=new D,Mc=new D,Wa=new D,hu=new D,Xa=new D,wt=class extends De{constructor(t=new le,e=new an){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Wa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(Mc.fromBufferAttribute(d,t),a?Wa.addScaledVector(Mc,h):Wa.addScaledVector(Mc.sub(e),h))}e.add(Wa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(r),Zi.copy(t.ray).recast(t.near),!(ka.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(ka,cu)===null||Zi.origin.distanceToSquared(cu)>(t.far-t.near)**2))&&(lu.copy(r).invert(),Zi.copy(t.ray).applyMatrix4(lu),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,p=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){let f=p[g],m=a[f.materialIndex],y=Math.max(f.start,u.start),b=Math.min(o.count,Math.min(f.start+f.count,u.start+u.count));for(let v=y,w=b;v<w;v+=3){let T=o.getX(v),x=o.getX(v+1),E=o.getX(v+2);s=qa(this,m,t,n,c,h,d,T,x,E),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let g=Math.max(0,u.start),_=Math.min(o.count,u.start+u.count);for(let f=g,m=_;f<m;f+=3){let y=o.getX(f),b=o.getX(f+1),v=o.getX(f+2);s=qa(this,a,t,n,c,h,d,y,b,v),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){let f=p[g],m=a[f.materialIndex],y=Math.max(f.start,u.start),b=Math.min(l.count,Math.min(f.start+f.count,u.start+u.count));for(let v=y,w=b;v<w;v+=3){let T=v,x=v+1,E=v+2;s=qa(this,m,t,n,c,h,d,T,x,E),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let g=Math.max(0,u.start),_=Math.min(l.count,u.start+u.count);for(let f=g,m=_;f<m;f+=3){let y=f,b=f+1,v=f+2;s=qa(this,a,t,n,c,h,d,y,b,v),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}};function kf(i,t,e,n,s,r,a,o){let l;if(t.side===on?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===zi,o),l===null)return null;Xa.copy(o),Xa.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Xa);return c<e.near||c>e.far?null:{distance:c,point:Xa.clone(),object:i}}function qa(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Ha),i.getVertexPosition(l,Ga),i.getVertexPosition(c,Va);let h=kf(i,t,e,n,Ha,Ga,Va,hu);if(h){let d=new D;pi.getBarycoord(hu,Ha,Ga,Va,d),s&&(h.uv=pi.getInterpolatedAttribute(s,o,l,c,d,new st)),r&&(h.uv1=pi.getInterpolatedAttribute(r,o,l,c,d,new st)),a&&(h.normal=pi.getInterpolatedAttribute(a,o,l,c,d,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let p={a:o,b:l,c,normal:new D,materialIndex:0};pi.getNormal(Ha,Ga,Va,p.normal),h.face=p,h.barycoord=d}return h}var Pr=class extends rn{constructor(t=null,e=1,n=1,s,r,a,o,l,c=He,h=He,d,p){super(null,a,o,l,c,h,s,r,d,p),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Lr=class extends Me{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ts=new Qt,uu=new Qt,Ya=[],du=new Kn,Hf=new Qt,dr=new wt,fr=new Qn,yn=class extends wt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Lr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Hf)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Kn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ts),du.copy(t.boundingBox).applyMatrix4(Ts),this.boundingBox.union(du)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ts),fr.copy(t.boundingSphere).applyMatrix4(Ts),this.boundingSphere.union(fr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(dr.geometry=this.geometry,dr.material=this.material,dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fr.copy(this.boundingSphere),fr.applyMatrix4(n),t.ray.intersectsSphere(fr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ts),uu.multiplyMatrices(n,Ts),dr.matrixWorld=uu,dr.raycast(t,Ya);for(let a=0,o=Ya.length;a<o;a++){let l=Ya[a];l.instanceId=r,l.object=this,e.push(l)}Ya.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Lr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Pr(new Float32Array(s*this.count),s,this.count,Qo,Ln));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ji=new Qn,Gf=new st(.5,.5),Za=new D,Di=class{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,a=new Bn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Cn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],p=r[6],u=r[7],g=r[8],_=r[9],f=r[10],m=r[11],y=r[12],b=r[13],v=r[14],w=r[15];if(s[0].setComponents(c-a,u-h,m-g,w-y).normalize(),s[1].setComponents(c+a,u+h,m+g,w+y).normalize(),s[2].setComponents(c+o,u+d,m+_,w+b).normalize(),s[3].setComponents(c-o,u-d,m-_,w-b).normalize(),n)s[4].setComponents(l,p,f,v).normalize(),s[5].setComponents(c-l,u-p,m-f,w-v).normalize();else if(s[4].setComponents(c-l,u-p,m-f,w-v).normalize(),e===Cn)s[5].setComponents(c+l,u+p,m+f,w+v).normalize();else if(e===Ds)s[5].setComponents(l,p,f,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ji.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ji.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ji)}intersectsSprite(t){Ji.center.set(0,0,0);let e=Gf.distanceTo(t.center);return Ji.radius=.7071067811865476+e,Ji.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ji)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Za.x=s.normal.x>0?t.max.x:t.min.x,Za.y=s.normal.y>0?t.max.y:t.min.y,Za.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Za)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},fu=new Qt,Mo=class i{constructor(){this.coordinateSystem=Cn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];fu.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Di),n[s].setFromProjectionMatrix(fu,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Di),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var Bs=class extends kn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},So=new D,bo=new D,pu=new Qt,pr=new Os,Ja=new Qn,Sc=new D,mu=new D,Eo=class extends De{constructor(t=new le,e=new Bs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)So.fromBufferAttribute(e,s-1),bo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=So.distanceTo(bo);t.setAttribute("lineDistance",new Xt(n,1))}else Rt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(s),Ja.radius+=r,t.ray.intersectsSphere(Ja)===!1)return;pu.copy(s).invert(),pr.copy(t.ray).applyMatrix4(pu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let u=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=u,f=g-1;_<f;_+=c){let m=h.getX(_),y=h.getX(_+1),b=$a(this,t,pr,l,m,y,_);b&&e.push(b)}if(this.isLineLoop){let _=h.getX(g-1),f=h.getX(u),m=$a(this,t,pr,l,_,f,g-1);m&&e.push(m)}}else{let u=Math.max(0,a.start),g=Math.min(p.count,a.start+a.count);for(let _=u,f=g-1;_<f;_+=c){let m=$a(this,t,pr,l,_,_+1,_);m&&e.push(m)}if(this.isLineLoop){let _=$a(this,t,pr,l,g-1,u,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function $a(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if(So.fromBufferAttribute(o,s),bo.fromBufferAttribute(o,r),e.distanceSqToSegment(So,bo,Sc,mu)>n)return;Sc.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Sc);if(!(c<t.near||c>t.far))return{distance:c,point:mu.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var gu=new D,_u=new D,Dr=class extends Eo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)gu.fromBufferAttribute(e,s),_u.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+gu.distanceTo(_u);t.setAttribute("lineDistance",new Xt(n,1))}else Rt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var $i=class extends kn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},xu=new Qt,Pc=new Os,Ka=new Qn,Qa=new D,Ki=class extends De{constructor(t=new le,e=new $i){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ka.copy(n.boundingSphere),Ka.applyMatrix4(s),Ka.radius+=r,t.ray.intersectsSphere(Ka)===!1)return;xu.copy(s).invert(),Pc.copy(t.ray).applyMatrix4(xu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let p=Math.max(0,a.start),u=Math.min(c.count,a.start+a.count);for(let g=p,_=u;g<_;g++){let f=c.getX(g);Qa.fromBufferAttribute(d,f),yu(Qa,f,l,s,t,e,this)}}else{let p=Math.max(0,a.start),u=Math.min(d.count,a.start+a.count);for(let g=p,_=u;g<_;g++)Qa.fromBufferAttribute(d,g),yu(Qa,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function yu(i,t,e,n,s,r,a){let o=Pc.distanceSqToPoint(i);if(o<e){let l=new D;Pc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Nr=class extends rn{constructor(t=[],e=is,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ur=class extends rn{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var xi=class extends rn{constructor(t,e,n=Gn,s,r,a,o=He,l=He,c,h=gi,d=1){if(h!==gi&&h!==vi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let p={width:t,height:e,depth:d};super(p,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Us(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Fr=class extends xi{constructor(t,e=Gn,n=is,s,r,a=He,o=He,l,c=gi){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Or=class extends rn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Se=class i extends le{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],p=0,u=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Xt(c,3)),this.setAttribute("normal",new Xt(h,3)),this.setAttribute("uv",new Xt(d,2));function g(_,f,m,y,b,v,w,T,x,E,N){let I=v/x,F=w/E,O=v/2,W=w/2,P=T/2,V=x+1,Y=E+1,G=0,nt=0,q=new D;for(let j=0;j<Y;j++){let tt=j*F-W;for(let bt=0;bt<V;bt++){let Ot=bt*I-O;q[_]=Ot*y,q[f]=tt*b,q[m]=P,c.push(q.x,q.y,q.z),q[_]=0,q[f]=0,q[m]=T>0?1:-1,h.push(q.x,q.y,q.z),d.push(bt/x),d.push(1-j/E),G+=1}}for(let j=0;j<E;j++)for(let tt=0;tt<x;tt++){let bt=p+tt+V*j,Ot=p+tt+V*(j+1),$=p+(tt+1)+V*(j+1),gt=p+(tt+1)+V*j;l.push(bt,Ot,gt),l.push(Ot,$,gt),nt+=6}o.addGroup(u,nt,N),u+=nt,p+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Hn=class i extends le{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],p=[],u=[],g=0,_=[],f=n/2,m=0;y(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Xt(d,3)),this.setAttribute("normal",new Xt(p,3)),this.setAttribute("uv",new Xt(u,2));function y(){let v=new D,w=new D,T=0,x=(e-t)/n;for(let E=0;E<=r;E++){let N=[],I=E/r,F=I*(e-t)+t;for(let O=0;O<=s;O++){let W=O/s,P=W*l+o,V=Math.sin(P),Y=Math.cos(P);w.x=F*V,w.y=-I*n+f,w.z=F*Y,d.push(w.x,w.y,w.z),v.set(V,x,Y).normalize(),p.push(v.x,v.y,v.z),u.push(W,1-I),N.push(g++)}_.push(N)}for(let E=0;E<s;E++)for(let N=0;N<r;N++){let I=_[N][E],F=_[N+1][E],O=_[N+1][E+1],W=_[N][E+1];(t>0||N!==0)&&(h.push(I,F,W),T+=3),(e>0||N!==r-1)&&(h.push(F,O,W),T+=3)}c.addGroup(m,T,0),m+=T}function b(v){let w=g,T=new st,x=new D,E=0,N=v===!0?t:e,I=v===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,f*I,0),p.push(0,I,0),u.push(.5,.5),g++;let F=g;for(let O=0;O<=s;O++){let P=O/s*l+o,V=Math.cos(P),Y=Math.sin(P);x.x=N*Y,x.y=f*I,x.z=N*V,d.push(x.x,x.y,x.z),p.push(0,I,0),T.x=V*.5+.5,T.y=Y*.5*I+.5,u.push(T.x,T.y),g++}for(let O=0;O<s;O++){let W=w+O,P=F+O;v===!0?h.push(P,P+1,W):h.push(P+1,P,W),E+=3}c.addGroup(m,E,v===!0?1:2),m+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ti=class i extends Hn{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},zs=class i extends le{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new Xt(r,3)),this.setAttribute("normal",new Xt(r.slice(),3)),this.setAttribute("uv",new Xt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){let b=new D,v=new D,w=new D;for(let T=0;T<e.length;T+=3)u(e[T+0],b),u(e[T+1],v),u(e[T+2],w),l(b,v,w,y)}function l(y,b,v,w){let T=w+1,x=[];for(let E=0;E<=T;E++){x[E]=[];let N=y.clone().lerp(v,E/T),I=b.clone().lerp(v,E/T),F=T-E;for(let O=0;O<=F;O++)O===0&&E===T?x[E][O]=N:x[E][O]=N.clone().lerp(I,O/F)}for(let E=0;E<T;E++)for(let N=0;N<2*(T-E)-1;N++){let I=Math.floor(N/2);N%2===0?(p(x[E][I+1]),p(x[E+1][I]),p(x[E][I])):(p(x[E][I+1]),p(x[E+1][I+1]),p(x[E+1][I]))}}function c(y){let b=new D;for(let v=0;v<r.length;v+=3)b.x=r[v+0],b.y=r[v+1],b.z=r[v+2],b.normalize().multiplyScalar(y),r[v+0]=b.x,r[v+1]=b.y,r[v+2]=b.z}function h(){let y=new D;for(let b=0;b<r.length;b+=3){y.x=r[b+0],y.y=r[b+1],y.z=r[b+2];let v=f(y)/2/Math.PI+.5,w=m(y)/Math.PI+.5;a.push(v,1-w)}g(),d()}function d(){for(let y=0;y<a.length;y+=6){let b=a[y+0],v=a[y+2],w=a[y+4],T=Math.max(b,v,w),x=Math.min(b,v,w);T>.9&&x<.1&&(b<.2&&(a[y+0]+=1),v<.2&&(a[y+2]+=1),w<.2&&(a[y+4]+=1))}}function p(y){r.push(y.x,y.y,y.z)}function u(y,b){let v=y*3;b.x=t[v+0],b.y=t[v+1],b.z=t[v+2]}function g(){let y=new D,b=new D,v=new D,w=new D,T=new st,x=new st,E=new st;for(let N=0,I=0;N<r.length;N+=9,I+=6){y.set(r[N+0],r[N+1],r[N+2]),b.set(r[N+3],r[N+4],r[N+5]),v.set(r[N+6],r[N+7],r[N+8]),T.set(a[I+0],a[I+1]),x.set(a[I+2],a[I+3]),E.set(a[I+4],a[I+5]),w.copy(y).add(b).add(v).divideScalar(3);let F=f(w);_(T,I+0,y,F),_(x,I+2,b,F),_(E,I+4,v,F)}}function _(y,b,v,w){w<0&&y.x===1&&(a[b]=y.x-1),v.x===0&&v.z===0&&(a[b]=w/2/Math.PI+.5)}function f(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}},Br=class i extends zs{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var vn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Rt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],p=n[s+1]-h,u=(a-h)/p;return(s+u)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new st:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new D,s=[],r=[],a=[],o=new D,l=new Qt;for(let u=0;u<=t;u++){let g=u/t;s[u]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(s[u-1],s[u]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Wt(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(l.makeRotationAxis(o,g))}a[u].crossVectors(s[u],r[u])}if(e===!0){let u=Math.acos(Wt(r[0].dot(r[t]),-1,1));u/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(u=-u);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],u*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},ks=class extends vn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new st){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),p=l-this.aX,u=c-this.aY;l=p*h-u*d+this.aX,c=p*d+u*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},To=class extends ks{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function ch(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let p=(a-r)/c-(o-r)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+d)+(l-o)/d;p*=h,u*=h,s(a,o,p,u)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var vu=new D,Mu=new D,bc=new ch,Ec=new ch,Tc=new ch,wo=class extends vn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Mu.subVectors(s[0],s[1]).add(s[0]),c=Mu);let d=s[o%r],p=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(vu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=vu),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),u),_=Math.pow(d.distanceToSquared(p),u),f=Math.pow(p.distanceToSquared(h),u);_<1e-4&&(_=1),g<1e-4&&(g=_),f<1e-4&&(f=_),bc.initNonuniformCatmullRom(c.x,d.x,p.x,h.x,g,_,f),Ec.initNonuniformCatmullRom(c.y,d.y,p.y,h.y,g,_,f),Tc.initNonuniformCatmullRom(c.z,d.z,p.z,h.z,g,_,f)}else this.curveType==="catmullrom"&&(bc.initCatmullRom(c.x,d.x,p.x,h.x,this.tension),Ec.initCatmullRom(c.y,d.y,p.y,h.y,this.tension),Tc.initCatmullRom(c.z,d.z,p.z,h.z,this.tension));return n.set(bc.calc(l),Ec.calc(l),Tc.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Su(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Vf(i,t){let e=1-i;return e*e*t}function Wf(i,t){return 2*(1-i)*i*t}function Xf(i,t){return i*i*t}function _r(i,t,e,n){return Vf(i,t)+Wf(i,e)+Xf(i,n)}function qf(i,t){let e=1-i;return e*e*e*t}function Yf(i,t){let e=1-i;return 3*e*e*i*t}function Zf(i,t){return 3*(1-i)*i*i*t}function Jf(i,t){return i*i*i*t}function xr(i,t,e,n,s){return qf(i,t)+Yf(i,e)+Zf(i,n)+Jf(i,s)}var zr=class extends vn{constructor(t=new st,e=new st,n=new st,s=new st){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new st){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(xr(t,s.x,r.x,a.x,o.x),xr(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ao=class extends vn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(xr(t,s.x,r.x,a.x,o.x),xr(t,s.y,r.y,a.y,o.y),xr(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},kr=class extends vn{constructor(t=new st,e=new st){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new st){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new st){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ro=class extends vn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Hr=class extends vn{constructor(t=new st,e=new st,n=new st){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new st){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(_r(t,s.x,r.x,a.x),_r(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Co=class extends vn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(_r(t,s.x,r.x,a.x),_r(t,s.y,r.y,a.y),_r(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Gr=class extends vn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new st){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Su(o,l.x,c.x,h.x,d.x),Su(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new st().fromArray(s))}return this}},bu=Object.freeze({__proto__:null,ArcCurve:To,CatmullRomCurve3:wo,CubicBezierCurve:zr,CubicBezierCurve3:Ao,EllipseCurve:ks,LineCurve:kr,LineCurve3:Ro,QuadraticBezierCurve:Hr,QuadraticBezierCurve3:Co,SplineCurve:Gr}),Io=class extends vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new bu[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new bu[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},Vr=class extends Io{constructor(t){super(),this.type="Path",this.currentPoint=new st,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new kr(this.currentPoint.clone(),new st(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Hr(this.currentPoint.clone(),new st(t,e),new st(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new zr(this.currentPoint.clone(),new st(t,e),new st(n,s),new st(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Gr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new ks(t,e,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Hs=class extends Vr{constructor(t){super(t),this.uuid=Gi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Vr().fromJSON(s))}return this}};function $f(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Md(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=ep(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let h=o,d=l;for(let p=e;p<s;p+=e){let u=i[p],g=i[p+1];u<o&&(o=u),g<l&&(l=g),u>h&&(h=u),g>d&&(d=g)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return Wr(r,a,e,o,l,c,0),a}function Md(i,t,e,n,s){let r;if(s===dp(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=Eu(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Eu(a/n|0,i[a],i[a+1],r);return r&&Gs(r,r.next)&&(qr(r),r=r.next),r}function Qi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Gs(e,e.next)||ve(e.prev,e,e.next)===0)){if(qr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Wr(i,t,e,n,s,r,a){if(!i)return;!a&&r&&ap(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Qf(i,n,s,r):Kf(i)){t.push(l.i,i.i,c.i),qr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=jf(Qi(i),t),Wr(i,t,e,n,s,r,2)):a===2&&tp(i,t,e,n,s,r):Wr(Qi(i),t,e,n,s,r,1);break}}}function Kf(i){let t=i.prev,e=i,n=i.next;if(ve(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),d=Math.min(o,l,c),p=Math.max(s,r,a),u=Math.max(o,l,c),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=p&&g.y>=d&&g.y<=u&&mr(s,o,r,l,a,c,g.x,g.y)&&ve(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Qf(i,t,e,n){let s=i.prev,r=i,a=i.next;if(ve(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,p=a.y,u=Math.min(o,l,c),g=Math.min(h,d,p),_=Math.max(o,l,c),f=Math.max(h,d,p),m=Lc(u,g,t,e,n),y=Lc(_,f,t,e,n),b=i.prevZ,v=i.nextZ;for(;b&&b.z>=m&&v&&v.z<=y;){if(b.x>=u&&b.x<=_&&b.y>=g&&b.y<=f&&b!==s&&b!==a&&mr(o,h,l,d,c,p,b.x,b.y)&&ve(b.prev,b,b.next)>=0||(b=b.prevZ,v.x>=u&&v.x<=_&&v.y>=g&&v.y<=f&&v!==s&&v!==a&&mr(o,h,l,d,c,p,v.x,v.y)&&ve(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;b&&b.z>=m;){if(b.x>=u&&b.x<=_&&b.y>=g&&b.y<=f&&b!==s&&b!==a&&mr(o,h,l,d,c,p,b.x,b.y)&&ve(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;v&&v.z<=y;){if(v.x>=u&&v.x<=_&&v.y>=g&&v.y<=f&&v!==s&&v!==a&&mr(o,h,l,d,c,p,v.x,v.y)&&ve(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function jf(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Gs(n,s)&&bd(n,e,e.next,s)&&Xr(n,s)&&Xr(s,n)&&(t.push(n.i,e.i,s.i),qr(e),qr(e.next),e=i=s),e=e.next}while(e!==i);return Qi(e)}function tp(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&cp(a,o)){let l=Ed(a,o);a=Qi(a,a.next),l=Qi(l,l.next),Wr(a,t,e,n,s,r,0),Wr(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function ep(i,t,e,n){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Md(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(lp(c))}s.sort(np);for(let r=0;r<s.length;r++)e=ip(s[r],e);return e}function np(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function ip(i,t){let e=sp(i,t);if(!e)return t;let n=Ed(e,i);return Qi(n,n.next),Qi(e,e.next)}function sp(i,t){let e=t,n=i.x,s=i.y,r=-1/0,a;if(Gs(i,e))return e;do{if(Gs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Sd(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let d=Math.abs(s-e.y)/(n-e.x);Xr(e,i)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&rp(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function rp(i,t){return ve(i.prev,i,t.prev)<0&&ve(t.next,i,i.next)<0}function ap(i,t,e,n){let s=i;do s.z===0&&(s.z=Lc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,op(s)}function op(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Lc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function lp(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Sd(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function mr(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&Sd(i,t,e,n,s,r,a,o)}function cp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!hp(i,t)&&(Xr(i,t)&&Xr(t,i)&&up(i,t)&&(ve(i.prev,i,t.prev)||ve(i,t.prev,t))||Gs(i,t)&&ve(i.prev,i,i.next)>0&&ve(t.prev,t,t.next)>0)}function ve(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Gs(i,t){return i.x===t.x&&i.y===t.y}function bd(i,t,e,n){let s=to(ve(i,t,e)),r=to(ve(i,t,n)),a=to(ve(e,n,i)),o=to(ve(e,n,t));return!!(s!==r&&a!==o||s===0&&ja(i,e,t)||r===0&&ja(i,n,t)||a===0&&ja(e,i,n)||o===0&&ja(e,t,n))}function ja(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function to(i){return i>0?1:i<0?-1:0}function hp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&bd(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Xr(i,t){return ve(i.prev,i,i.next)<0?ve(i,t,i.next)>=0&&ve(i,i.prev,t)>=0:ve(i,t,i.prev)<0||ve(i,i.next,t)<0}function up(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Ed(i,t){let e=Dc(i.i,i.x,i.y),n=Dc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Eu(i,t,e,n){let s=Dc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function qr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Dc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function dp(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Nc=class{static triangulate(t,e,n=2){return $f(t,e,n)}},Is=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Tu(t),wu(n,t);let a=t.length;e.forEach(Tu);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,wu(n,e[l]);let o=Nc.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Tu(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function wu(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var ji=class i extends zs{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},Vs=class i extends le{constructor(t=[new st(0,-.5),new st(.5,0),new st(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Wt(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,d=new D,p=new st,u=new D,g=new D,_=new D,f=0,m=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:f=t[y+1].x-t[y].x,m=t[y+1].y-t[y].y,u.x=m*1,u.y=-f,u.z=m*0,_.copy(u),u.normalize(),l.push(u.x,u.y,u.z);break;case t.length-1:_.normalize(),l.push(_.x,_.y,_.z);break;default:f=t[y+1].x-t[y].x,m=t[y+1].y-t[y].y,u.x=m*1,u.y=-f,u.z=m*0,g.copy(u),u.x+=_.x,u.y+=_.y,u.z+=_.z,u.normalize(),l.push(u.x,u.y,u.z),_.copy(g)}for(let y=0;y<=e;y++){let b=n+y*h*s,v=Math.sin(b),w=Math.cos(b);for(let T=0;T<=t.length-1;T++){d.x=t[T].x*v,d.y=t[T].y,d.z=t[T].x*w,a.push(d.x,d.y,d.z),p.x=y/e,p.y=T/(t.length-1),o.push(p.x,p.y);let x=l[3*T+0]*v,E=l[3*T+1],N=l[3*T+0]*w;c.push(x,E,N)}}for(let y=0;y<e;y++)for(let b=0;b<t.length-1;b++){let v=b+y*t.length,w=v,T=v+t.length,x=v+t.length+1,E=v+1;r.push(w,T,E),r.push(x,E,T)}this.setIndex(r),this.setAttribute("position",new Xt(a,3)),this.setAttribute("uv",new Xt(o,2)),this.setAttribute("normal",new Xt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},Yr=class i extends zs{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},ei=class i extends le{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,p=e/l,u=[],g=[],_=[],f=[];for(let m=0;m<h;m++){let y=m*p-a;for(let b=0;b<c;b++){let v=b*d-r;g.push(v,-y,0),_.push(0,0,1),f.push(b/o),f.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){let b=y+c*m,v=y+c*(m+1),w=y+1+c*(m+1),T=y+1+c*m;u.push(b,v,T),u.push(v,w,T)}this.setIndex(u),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(_,3)),this.setAttribute("uv",new Xt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Ws=class i extends le{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],h=[],d=t,p=(e-t)/s,u=new D,g=new st;for(let _=0;_<=s;_++){for(let f=0;f<=n;f++){let m=r+f/n*a;u.x=d*Math.cos(m),u.y=d*Math.sin(m),l.push(u.x,u.y,u.z),c.push(0,0,1),g.x=(u.x/e+1)/2,g.y=(u.y/e+1)/2,h.push(g.x,g.y)}d+=p}for(let _=0;_<s;_++){let f=_*(n+1);for(let m=0;m<n;m++){let y=m+f,b=y,v=y+n+1,w=y+n+2,T=y+1;o.push(b,v,T),o.push(v,w,T)}}this.setIndex(o),this.setAttribute("position",new Xt(l,3)),this.setAttribute("normal",new Xt(c,3)),this.setAttribute("uv",new Xt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Zr=class i extends le{constructor(t=new Hs([new st(0,.5),new st(-.5,-.5),new st(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],a=[],o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Xt(s,3)),this.setAttribute("normal",new Xt(r,3)),this.setAttribute("uv",new Xt(a,2));function c(h){let d=s.length/3,p=h.extractPoints(e),u=p.shape,g=p.holes;Is.isClockWise(u)===!1&&(u=u.reverse());for(let f=0,m=g.length;f<m;f++){let y=g[f];Is.isClockWise(y)===!0&&(g[f]=y.reverse())}let _=Is.triangulateShape(u,g);for(let f=0,m=g.length;f<m;f++){let y=g[f];u=u.concat(y)}for(let f=0,m=u.length;f<m;f++){let y=u[f];s.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let f=0,m=_.length;f<m;f++){let y=_[f],b=y[0]+d,v=y[1]+d,w=y[2]+d;n.push(b,v,w),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return fp(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let a=e[t.shapes[s]];n.push(a)}return new i(n,t.curveSegments)}};function fp(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var Ni=class i extends le{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new D,p=new D,u=[],g=[],_=[],f=[];for(let m=0;m<=n;m++){let y=[],b=m/n,v=a+b*o,w=t*Math.cos(v),T=Math.sqrt(t*t-w*w),x=0;m===0&&a===0?x=.5/e:m===n&&l===Math.PI&&(x=-.5/e);for(let E=0;E<=e;E++){let N=E/e,I=s+N*r;d.x=-T*Math.cos(I),d.y=w,d.z=T*Math.sin(I),g.push(d.x,d.y,d.z),p.copy(d).normalize(),_.push(p.x,p.y,p.z),f.push(N+x,1-b),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){let b=h[m][y+1],v=h[m][y],w=h[m+1][y],T=h[m+1][y+1];(m!==0||a>0)&&u.push(b,v,T),(m!==n-1||l<Math.PI)&&u.push(v,w,T)}this.setIndex(u),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(_,3)),this.setAttribute("uv",new Xt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ui=class i extends le{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],p=new D,u=new D,g=new D;for(let _=0;_<=n;_++){let f=a+_/n*o;for(let m=0;m<=s;m++){let y=m/s*r;u.x=(t+e*Math.cos(f))*Math.cos(y),u.y=(t+e*Math.cos(f))*Math.sin(y),u.z=e*Math.sin(f),c.push(u.x,u.y,u.z),p.x=t*Math.cos(y),p.y=t*Math.sin(y),g.subVectors(u,p).normalize(),h.push(g.x,g.y,g.z),d.push(m/s),d.push(_/n)}}for(let _=1;_<=n;_++)for(let f=1;f<=s;f++){let m=(s+1)*_+f-1,y=(s+1)*(_-1)+f-1,b=(s+1)*(_-1)+f,v=(s+1)*_+f;l.push(m,y,v),l.push(y,b,v)}this.setIndex(l),this.setAttribute("position",new Xt(c,3)),this.setAttribute("normal",new Xt(h,3)),this.setAttribute("uv",new Xt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function rs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Au(s))s.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Au(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function je(i){let t={};for(let e=0;e<i.length;e++){let n=rs(i[e]);for(let s in n)t[s]=n[s]}return t}function Au(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function pp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function hh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}var Td={clone:rs,merge:je},mp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Pn=class extends kn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mp,this.fragmentShader=gp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=rs(t.uniforms),this.uniformsGroups=pp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Ft().setHex(s.value);break;case"v2":this.uniforms[n].value=new st().fromArray(s.value);break;case"v3":this.uniforms[n].value=new D().fromArray(s.value);break;case"v4":this.uniforms[n].value=new _e().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Nt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Qt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Po=class extends Pn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Vt=class extends kn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ll,this.normalScale=new st(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Lo=class extends kn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Do=class extends kn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ws(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function eo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Fi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},No=class extends Fi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Rc,endingEnd:Rc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Cc:r=t,o=2*e-n;break;case Ic:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Cc:a=t,l=2*n-e;break;case Ic:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,p=this._weightPrev,u=this._weightNext,g=(n-e)/(s-e),_=g*g,f=_*g,m=-p*f+2*p*_-p*g,y=(1+p)*f+(-1.5-2*p)*_+(-.5+p)*g+1,b=(-1-u)*f+(1.5+u)*_+.5*g,v=u*f-u*_;for(let w=0;w!==o;++w)r[w]=m*a[h+w]+y*a[c+w]+b*a[l+w]+v*a[d+w];return r}},Uo=class extends Fi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),d=1-h;for(let p=0;p!==o;++p)r[p]=a[c+p]*d+a[l+p]*h;return r}},Fo=class extends Fi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Oo=class extends Fi{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-e)/(s-e),_=1-g;for(let f=0;f!==o;++f)r[f]=a[c+f]*_+a[l+f]*g;return r}let p=o*2,u=t-1;for(let g=0;g!==o;++g){let _=a[c+g],f=a[l+g],m=u*p+g*2,y=d[m],b=d[m+1],v=t*p+g*2,w=h[v],T=h[v+1],x=xp(n,e,y,w,s);r[g]=wd(x,_,b,T,f)}return r}};function wd(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function _p(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function xp(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=wd(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=_p(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Mn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ws(e,this.TimeBufferType),this.values=ws(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ws(t.times,Array),values:ws(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),eo(t.settings)&&(n.settings={inTangents:ws(t.settings.inTangents,Array),outTangents:ws(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Fo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Uo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new No(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Oo(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case yr:e=this.InterpolantFactoryMethodDiscrete;break;case mo:e=this.InterpolantFactoryMethodLinear;break;case so:e=this.InterpolantFactoryMethodSmooth;break;case Ac:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Rt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return yr;case this.InterpolantFactoryMethodLinear:return mo;case this.InterpolantFactoryMethodSmooth:return so;case this.InterpolantFactoryMethodBezier:return Ac}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;eo(this.settings)&&(Ru(this.settings.inTangents,t),Ru(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;eo(this.settings)&&(Cu(this.settings.inTangents,t),Cu(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Dt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Dt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Dt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Dt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Sf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Dt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===so,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*n,p=d-n,u=d+n;for(let g=0;g!==n;++g){let _=e[d+g];if(_!==e[p+g]||_!==e[u+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,p=a*n;for(let u=0;u!==n;++u)e[p+u]=e[d+u]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,eo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Ru(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function Cu(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Mn.prototype.ValueTypeName="";Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=mo;var Oi=class extends Mn{constructor(t,e,n){super(t,e,n)}};Oi.prototype.ValueTypeName="bool";Oi.prototype.ValueBufferType=Array;Oi.prototype.DefaultInterpolation=yr;Oi.prototype.InterpolantFactoryMethodLinear=void 0;Oi.prototype.InterpolantFactoryMethodSmooth=void 0;var Bo=class extends Mn{constructor(t,e,n,s){super(t,e,n,s)}};Bo.prototype.ValueTypeName="color";var zo=class extends Mn{constructor(t,e,n,s){super(t,e,n,s)}};zo.prototype.ValueTypeName="number";var ko=class extends Fi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)In.slerpFlat(r,0,a,c-o,a,c,l);return r}},Jr=class extends Mn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new ko(this.times,this.values,this.getValueSize(),t)}};Jr.prototype.ValueTypeName="quaternion";Jr.prototype.InterpolantFactoryMethodSmooth=void 0;var Bi=class extends Mn{constructor(t,e,n){super(t,e,n)}};Bi.prototype.ValueTypeName="string";Bi.prototype.ValueBufferType=Array;Bi.prototype.DefaultInterpolation=yr;Bi.prototype.InterpolantFactoryMethodLinear=void 0;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ho=class extends Mn{constructor(t,e,n,s){super(t,e,n,s)}};Ho.prototype.ValueTypeName="vector";var Go=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,p=c.length;d<p;d+=2){let u=c[d],g=c[d+1];if(u.global&&(u.lastIndex=0),u.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ad=new Go,Vo=class{constructor(t){this.manager=t!==void 0?t:Ad,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Vo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Xs=class extends De{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},$r=class extends Xs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},wc=new Qt,Iu=new D,Pu=new D,Kr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new st(512,512),this.mapType=pn,this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Di,this._frameExtents=new st(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Iu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Iu),Pu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Pu),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){wc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(wc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Ds||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(wc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},no=new D,io=new In,Zn=new D,Qr=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(no,io,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(no,io,Zn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(no,io,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(no,io,Zn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Li=new D,Lu=new st,Du=new st,Ke=class extends Qr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=go*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(tc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return go*2*Math.atan(Math.tan(tc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Li.x,Li.y).multiplyScalar(-t/Li.z),Li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Li.x,Li.y).multiplyScalar(-t/Li.z)}getViewSize(t,e){return this.getViewBounds(t,Lu,Du),e.subVectors(Du,Lu)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(tc*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Uc=class extends Kr{constructor(){super(new Ke(90,1,.5,500)),this.isPointLightShadow=!0}},jr=class extends Xs{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Uc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},ta=class extends Qr{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Fc=class extends Kr{constructor(){super(new ta(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ea=class extends Xs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Fc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var As=-90,Rs=1,qs=class extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ke(As,Rs,t,e);s.layers=this.layers,this.add(s);let r=new Ke(As,Rs,t,e);r.layers=this.layers,this.add(r);let a=new Ke(As,Rs,t,e);a.layers=this.layers,this.add(a);let o=new Ke(As,Rs,t,e);o.layers=this.layers,this.add(o);let l=new Ke(As,Rs,t,e);l.layers=this.layers,this.add(l);let c=new Ke(As,Rs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ds)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),p=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,p,u),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Wo=class extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var uh="\\[\\]\\.:\\/",yp=new RegExp("["+uh+"]","g"),dh="[^"+uh+"]",vp="[^"+uh.replace("\\.","")+"]",Mp=/((?:WC+[\/:])*)/.source.replace("WC",dh),Sp=/(WCOD+)?/.source.replace("WCOD",vp),bp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",dh),Ep=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",dh),Tp=new RegExp("^"+Mp+Sp+bp+Ep+"$"),wp=["material","materials","bones","map"],Oc=class{constructor(t,e,n){let s=n||ce.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ce=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(yp,"")}static parseTrackName(t){let e=Tp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);wp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Rt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Dt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Dt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Dt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Dt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Dt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Dt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ce.Composite=Oc;ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ce.prototype.GetterByBindingType=[ce.prototype._getValue_direct,ce.prototype._getValue_array,ce.prototype._getValue_arrayElement,ce.prototype._getValue_toArray];ce.prototype.SetterByBindingTypeAndVersioning=[[ce.prototype._setValue_direct,ce.prototype._setValue_direct_setNeedsUpdate,ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_array,ce.prototype._setValue_array_setNeedsUpdate,ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_arrayElement,ce.prototype._setValue_arrayElement_setNeedsUpdate,ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_fromArray,ce.prototype._setValue_fromArray_setNeedsUpdate,ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ny=new Float32Array(1);var xh=class xh{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};xh.prototype.isMatrix2=!0;var Bc=xh;function fh(i,t,e,n){let s=Ap(n);switch(e){case nh:return i*t;case Qo:return i*t/s.components*s.byteLength;case jo:return i*t/s.components*s.byteLength;case Hi:return i*t*2/s.components*s.byteLength;case tl:return i*t*2/s.components*s.byteLength;case ih:return i*t*3/s.components*s.byteLength;case Wn:return i*t*4/s.components*s.byteLength;case el:return i*t*4/s.components*s.byteLength;case sa:case ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case aa:case oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case il:case rl:return Math.max(i,16)*Math.max(t,8)/4;case nl:case sl:return Math.max(i,8)*Math.max(t,8)/2;case al:case ol:case cl:case hl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ll:case la:case ul:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case dl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case pl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ml:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case gl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case _l:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case xl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case yl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case vl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ml:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Sl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case bl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case El:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Tl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case wl:case Al:case Rl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Cl:case Il:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ca:case Pl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ap(i){switch(i){case pn:case Qc:return{byteLength:1,components:1};case Js:case jc:case Vn:return{byteLength:2,components:1};case $o:case Ko:return{byteLength:2,components:4};case Gn:case Jo:case Ln:return{byteLength:4,components:1};case th:case eh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window!="undefined"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Jd(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Cp(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=i.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)u=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=i.SHORT;else if(c instanceof Uint32Array)u=i.UNSIGNED_INT;else if(c instanceof Int32Array)u=i.INT;else if(c instanceof Int8Array)u=i.BYTE;else if(c instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((u,g)=>u.start-g.start);let p=0;for(let u=1;u<d.length;u++){let g=d[p],_=d[u];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++p,d[p]=_)}d.length=p+1;for(let u=0,g=d.length;u<g;u++){let _=d[u];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Ip=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Np=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Up=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Op=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,zp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Vp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,jp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,tm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,em=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,im=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rm="gl_FragColor = linearToOutputTexel( gl_FragColor );",am=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,om=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,cm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,hm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,um=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_m=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ym=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Mm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Sm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Em=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Am=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Cm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Im=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pm=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Lm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Um=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Om=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,km=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vm=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ym=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Zm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$m=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Km=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Qm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,eg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ng=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ig=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,rg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ag=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,og=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ug=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,dg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,fg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,pg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,mg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,_g=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,yg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Eg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Rg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Cg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ig=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lg=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ng=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ug=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Fg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Og=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Bg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Wg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Zg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$g=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Kg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,t0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,n0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,s0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,r0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,l0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gt={alphahash_fragment:Ip,alphahash_pars_fragment:Pp,alphamap_fragment:Lp,alphamap_pars_fragment:Dp,alphatest_fragment:Np,alphatest_pars_fragment:Up,aomap_fragment:Fp,aomap_pars_fragment:Op,batching_pars_vertex:Bp,batching_vertex:zp,begin_vertex:kp,beginnormal_vertex:Hp,bsdfs:Gp,iridescence_fragment:Vp,bumpmap_pars_fragment:Wp,clipping_planes_fragment:Xp,clipping_planes_pars_fragment:qp,clipping_planes_pars_vertex:Yp,clipping_planes_vertex:Zp,color_fragment:Jp,color_pars_fragment:$p,color_pars_vertex:Kp,color_vertex:Qp,common:jp,defaultnormal_vertex:tm,displacementmap_pars_vertex:em,displacementmap_vertex:nm,emissivemap_fragment:im,emissivemap_pars_fragment:sm,colorspace_fragment:rm,colorspace_pars_fragment:am,envmap_fragment:om,envmap_common_pars_fragment:lm,envmap_pars_fragment:cm,envmap_pars_vertex:hm,envmap_physical_pars_fragment:Mm,envmap_vertex:um,fog_vertex:dm,fog_pars_vertex:fm,fog_fragment:pm,fog_pars_fragment:mm,gradientmap_pars_fragment:gm,lightmap_pars_fragment:_m,lights_lambert_fragment:xm,lights_lambert_pars_fragment:ym,lights_pars_begin:vm,lights_toon_fragment:Sm,lights_toon_pars_fragment:bm,lights_phong_fragment:Em,lights_phong_pars_fragment:Tm,lights_physical_fragment:wm,lights_physical_pars_fragment:Am,lights_fragment_begin:Rm,lights_fragment_maps:Cm,lights_fragment_end:Im,lightprobes_pars_fragment:Pm,logdepthbuf_fragment:Lm,logdepthbuf_pars_fragment:Dm,logdepthbuf_pars_vertex:Nm,logdepthbuf_vertex:Um,map_fragment:Fm,map_pars_fragment:Om,map_particle_fragment:Bm,map_particle_pars_fragment:zm,metalnessmap_fragment:km,metalnessmap_pars_fragment:Hm,morphinstance_vertex:Gm,morphcolor_vertex:Vm,morphnormal_vertex:Wm,morphtarget_pars_vertex:Xm,morphtarget_vertex:qm,normal_fragment_begin:Ym,normal_fragment_maps:Zm,normal_pars_fragment:Jm,normal_pars_vertex:$m,normal_vertex:Km,normalmap_pars_fragment:Qm,clearcoat_normal_fragment_begin:jm,clearcoat_normal_fragment_maps:tg,clearcoat_pars_fragment:eg,iridescence_pars_fragment:ng,opaque_fragment:ig,packing:sg,premultiplied_alpha_fragment:rg,project_vertex:ag,dithering_fragment:og,dithering_pars_fragment:lg,roughnessmap_fragment:cg,roughnessmap_pars_fragment:hg,shadowmap_pars_fragment:ug,shadowmap_pars_vertex:dg,shadowmap_vertex:fg,shadowmask_pars_fragment:pg,skinbase_vertex:mg,skinning_pars_vertex:gg,skinning_vertex:_g,skinnormal_vertex:xg,specularmap_fragment:yg,specularmap_pars_fragment:vg,tonemapping_fragment:Mg,tonemapping_pars_fragment:Sg,transmission_fragment:bg,transmission_pars_fragment:Eg,uv_pars_fragment:Tg,uv_pars_vertex:wg,uv_vertex:Ag,worldpos_vertex:Rg,background_vert:Cg,background_frag:Ig,backgroundCube_vert:Pg,backgroundCube_frag:Lg,cube_vert:Dg,cube_frag:Ng,depth_vert:Ug,depth_frag:Fg,distance_vert:Og,distance_frag:Bg,equirect_vert:zg,equirect_frag:kg,linedashed_vert:Hg,linedashed_frag:Gg,meshbasic_vert:Vg,meshbasic_frag:Wg,meshlambert_vert:Xg,meshlambert_frag:qg,meshmatcap_vert:Yg,meshmatcap_frag:Zg,meshnormal_vert:Jg,meshnormal_frag:$g,meshphong_vert:Kg,meshphong_frag:Qg,meshphysical_vert:jg,meshphysical_frag:t0,meshtoon_vert:e0,meshtoon_frag:n0,points_vert:i0,points_frag:s0,shadow_vert:r0,shadow_frag:a0,sprite_vert:o0,sprite_frag:l0},mt={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},si={basic:{uniforms:je([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:je([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Ft(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:je([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:je([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:je([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:je([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:je([mt.points,mt.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:je([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:je([mt.common,mt.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:je([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:je([mt.sprite,mt.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:je([mt.common,mt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:je([mt.lights,mt.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};si.physical={uniforms:je([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Nt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};var Nl={r:0,b:0,g:0},c0=new Qt,$d=new Nt;$d.set(-1,0,0,0,1,0,0,0,1);function h0(i,t,e,n,s,r){let a=new Ft(0),o=s===!0?0:1,l,c,h=null,d=0,p=null;function u(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){let v=y.backgroundBlurriness>0;b=t.get(b,v)}return b}function g(y){let b=!1,v=u(y);v===null?f(a,o):v&&v.isColor&&(f(v,1),b=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(y,b){let v=u(b);v&&v.isCubeTexture?(c===void 0&&(c=new wt(new Se(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:rs(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(c0.makeRotationFromEuler(b.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply($d),c.material.toneMapped=Jt.getTransfer(v.colorSpace)!==te,(h!==v||d!==v.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,p=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new wt(new ei(2,2),new Pn({name:"BackgroundMaterial",uniforms:rs(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(v.colorSpace)!==te,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,p=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function f(y,b){y.getRGB(Nl,hh(i)),e.buffers.color.setClear(Nl.r,Nl.g,Nl.b,b,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,b=1){a.set(y),o=b,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,f(a,o)},render:g,addToRenderList:_,dispose:m}}function u0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null),r=s,a=!1;function o(F,O,W,P,V){let Y=!1,G=d(F,P,W,O);r!==G&&(r=G,c(r.object)),Y=u(F,P,W,V),Y&&g(F,P,W,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,v(F,O,W,P),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return i.createVertexArray()}function c(F){return i.bindVertexArray(F)}function h(F){return i.deleteVertexArray(F)}function d(F,O,W,P){let V=P.wireframe===!0,Y=n[O.id];Y===void 0&&(Y={},n[O.id]=Y);let G=F.isInstancedMesh===!0?F.id:0,nt=Y[G];nt===void 0&&(nt={},Y[G]=nt);let q=nt[W.id];q===void 0&&(q={},nt[W.id]=q);let j=q[V];return j===void 0&&(j=p(l()),q[V]=j),j}function p(F){let O=[],W=[],P=[];for(let V=0;V<e;V++)O[V]=0,W[V]=0,P[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:W,attributeDivisors:P,object:F,attributes:{},index:null}}function u(F,O,W,P){let V=r.attributes,Y=O.attributes,G=0,nt=W.getAttributes();for(let q in nt)if(nt[q].location>=0){let tt=V[q],bt=Y[q];if(bt===void 0&&(q==="instanceMatrix"&&F.instanceMatrix&&(bt=F.instanceMatrix),q==="instanceColor"&&F.instanceColor&&(bt=F.instanceColor)),tt===void 0||tt.attribute!==bt||bt&&tt.data!==bt.data)return!0;G++}return r.attributesNum!==G||r.index!==P}function g(F,O,W,P){let V={},Y=O.attributes,G=0,nt=W.getAttributes();for(let q in nt)if(nt[q].location>=0){let tt=Y[q];tt===void 0&&(q==="instanceMatrix"&&F.instanceMatrix&&(tt=F.instanceMatrix),q==="instanceColor"&&F.instanceColor&&(tt=F.instanceColor));let bt={};bt.attribute=tt,tt&&tt.data&&(bt.data=tt.data),V[q]=bt,G++}r.attributes=V,r.attributesNum=G,r.index=P}function _(){let F=r.newAttributes;for(let O=0,W=F.length;O<W;O++)F[O]=0}function f(F){m(F,0)}function m(F,O){let W=r.newAttributes,P=r.enabledAttributes,V=r.attributeDivisors;W[F]=1,P[F]===0&&(i.enableVertexAttribArray(F),P[F]=1),V[F]!==O&&(i.vertexAttribDivisor(F,O),V[F]=O)}function y(){let F=r.newAttributes,O=r.enabledAttributes;for(let W=0,P=O.length;W<P;W++)O[W]!==F[W]&&(i.disableVertexAttribArray(W),O[W]=0)}function b(F,O,W,P,V,Y,G){G===!0?i.vertexAttribIPointer(F,O,W,V,Y):i.vertexAttribPointer(F,O,W,P,V,Y)}function v(F,O,W,P){_();let V=P.attributes,Y=W.getAttributes(),G=O.defaultAttributeValues;for(let nt in Y){let q=Y[nt];if(q.location>=0){let j=V[nt];if(j===void 0&&(nt==="instanceMatrix"&&F.instanceMatrix&&(j=F.instanceMatrix),nt==="instanceColor"&&F.instanceColor&&(j=F.instanceColor)),j!==void 0){let tt=j.normalized,bt=j.itemSize,Ot=t.get(j);if(Ot===void 0)continue;let $=Ot.buffer,gt=Ot.type,vt=Ot.bytesPerElement,Ct=gt===i.INT||gt===i.UNSIGNED_INT||j.gpuType===Jo;if(j.isInterleavedBufferAttribute){let _t=j.data,zt=_t.isInterleavedBuffer===!0?_t.stride:_t.itemSize,we=j.offset;if(_t.isInstancedInterleavedBuffer||_t.isInstancedBufferAttribute){for(let Lt=0;Lt<q.locationSize;Lt++)m(q.location+Lt,_t.meshPerAttribute);F.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let Lt=0;Lt<q.locationSize;Lt++)f(q.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,$);for(let Lt=0;Lt<q.locationSize;Lt++)b(q.location+Lt,bt/q.locationSize,gt,tt,zt*vt,(we+bt/q.locationSize*Lt)*vt,Ct)}else{if(j.isInstancedBufferAttribute){for(let _t=0;_t<q.locationSize;_t++)m(q.location+_t,j.meshPerAttribute);F.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let _t=0;_t<q.locationSize;_t++)f(q.location+_t);i.bindBuffer(i.ARRAY_BUFFER,$);for(let _t=0;_t<q.locationSize;_t++)b(q.location+_t,bt/q.locationSize,gt,tt,bt*vt,bt/q.locationSize*_t*vt,Ct)}}else if(G!==void 0){let tt=G[nt];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(q.location,tt);break;case 3:i.vertexAttrib3fv(q.location,tt);break;case 4:i.vertexAttrib4fv(q.location,tt);break;default:i.vertexAttrib1fv(q.location,tt)}}}}y()}function w(){N();for(let F in n){let O=n[F];for(let W in O){let P=O[W];for(let V in P){let Y=P[V];for(let G in Y)h(Y[G].object),delete Y[G];delete P[V]}}delete n[F]}}function T(F){if(n[F.id]===void 0)return;let O=n[F.id];for(let W in O){let P=O[W];for(let V in P){let Y=P[V];for(let G in Y)h(Y[G].object),delete Y[G];delete P[V]}}delete n[F.id]}function x(F){for(let O in n){let W=n[O];for(let P in W){let V=W[P];if(V[F.id]===void 0)continue;let Y=V[F.id];for(let G in Y)h(Y[G].object),delete Y[G];delete V[F.id]}}}function E(F){for(let O in n){let W=n[O],P=F.isInstancedMesh===!0?F.id:0,V=W[P];if(V!==void 0){for(let Y in V){let G=V[Y];for(let nt in G)h(G[nt].object),delete G[nt];delete V[Y]}delete W[P],Object.keys(W).length===0&&delete n[O]}}}function N(){I(),a=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:N,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:E,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:f,disableUnusedAttributes:y}}function d0(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let p=0;for(let u=0;u<h;u++)p+=c[u];e.update(p,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function f0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(x){return!(x!==Wn&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let E=x===Vn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==pn&&x!==Ln&&!E&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Rt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.logarithmicDepthBuffer===!0&&d===!1;e.reversedDepthBuffer===!0&&d===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&d===!0&&Rt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:d,maxTextures:u,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:f,maxAttributes:m,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:v,maxSamples:w,samples:T}}function p0(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Bn,o=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){let u=d.length!==0||p||n!==0||s;return s=p,n=d.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,p){e=h(d,p,0)},this.setState=function(d,p,u){let g=d.clippingPlanes,_=d.clipIntersection,f=d.clipShadows,m=i.get(d);if(!s||g===null||g.length===0||r&&!f)r?h(null):c();else{let y=r?0:n,b=y*4,v=m.clippingState||null;l.value=v,v=h(g,p,b,u);for(let w=0;w!==b;++w)v[w]=e[w];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,p,u,g){let _=d!==null?d.length:0,f=null;if(_!==0){if(f=l.value,g!==!0||f===null){let m=u+_*4,y=p.matrixWorldInverse;o.getNormalMatrix(y),(f===null||f.length<m)&&(f=new Float32Array(m));for(let b=0,v=u;b!==_;++b,v+=4)a.copy(d[b]).applyMatrix4(y,o),a.normal.toArray(f,v),f[v+3]=a.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,f}}var fa=class extends xn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Nr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Se(5,5,5),r=new Pn({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:es});r.uniforms.tEquirect.value=e;let a=new wt(s,r),o=e.minFilter;return e.minFilter===yi&&(e.minFilter=sn),new qs(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},Rd=256,m0=3,g0=20,Kd=256,Qd=16,_0=3,x0=new D,y0=new Ft,Fl=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new qs(1,10,null),this._boxMesh=new wt(new Se(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=x0}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let d=l.autoClear,p=l.autoClearColor,u=l.autoClearDepth,g=l.autoClearStencil,_=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(t.background=l.getClearColor(y0));let f=new qs(n,s,h);return f.position.copy(o),f.update(l,t),l.autoClear=d,l.autoClearColor=p,l.autoClearDepth=u,l.autoClearStencil=g,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Id(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Rd,gd(t))}_fromTexture(t,e){t.mapping===is||t.mapping===Zs?this._setSize(t.image.length===0?Rd:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Cd(t,!1,!1),n=Math.log2(t)-m0;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Cd(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===is||t.mapping===Zs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pd()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Id()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=v0(),this._integrationMaterial=M0());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Qd);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-_0)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(Kd*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=S0());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function Cd(i,t,e){return new fa(i,{minFilter:yi,generateMipmaps:t,type:Vn,colorSpace:vr,depthBuffer:e})}function pa(i,t,e){return new Pn({name:i,uniforms:t,vertexShader:Gt.cube_vert,fragmentShader:e,side:on,blending:es,depthTest:!1,depthWrite:!1})}function v0(){return pa("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Kd}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function M0(){return pa("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Qd}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function S0(){return pa("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${g0}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Id(){return pa("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Pd(){return pa("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function b0(i){let t=new WeakMap,e=new WeakMap,n=null;function s(p,u=!1){return p==null?null:u?a(p):r(p)}function r(p){if(p&&p.isTexture){let u=p.mapping;if(u===qo||u===Yo)if(t.has(p)){let g=t.get(p).texture;return o(g,p.mapping)}else{let g=p.image;if(g&&g.height>0){let _=new fa(g.height);return _.fromEquirectangularTexture(i,p),t.set(p,_),p.addEventListener("dispose",c),o(_.texture,p.mapping)}else return null}}return p}function a(p){if(p&&p.isTexture&&p.isPMREMTexture!==!0){let u=p.mapping,g=u===qo||u===Yo,_=u===is||u===Zs;if(g||_){let f=e.get(p),m=f!==void 0?f.texture.pmremVersion:0;if(p.isRenderTargetTexture&&p.pmremVersion!==m)return n===null&&(n=new Fl(i)),f=g?n.fromEquirectangular(p,f):n.fromCubemap(p,f),f.texture.pmremVersion=p.pmremVersion,e.set(p,f),f.texture;if(f!==void 0)return f.texture;{let y=p.image;return g&&y&&y.height>0||_&&y&&l(y)?(n===null&&(n=new Fl(i)),f=g?n.fromEquirectangular(p):n.fromCubemap(p),f.texture.pmremVersion=p.pmremVersion,e.set(p,f),p.addEventListener("dispose",h),f.texture):null}}}return p}function o(p,u){return u===qo?p.mapping=is:u===Yo&&(p.mapping=Zs),p}function l(p){let u=0,g=6;for(let _=0;_<g;_++)p[_]!==void 0&&u++;return u===g}function c(p){let u=p.target;u.removeEventListener("dispose",c);let g=t.get(u);g!==void 0&&(t.delete(u),g.dispose())}function h(p){let u=p.target;u.removeEventListener("dispose",h);let g=e.get(u);g!==void 0&&(e.delete(u),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function E0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&gr("WebGLRenderer: "+n+" extension not supported."),s}}}function T0(i,t,e,n){let s={},r=new WeakMap,a=new FinalizationRegistry(g=>delete s[g]);function o(g){l(g.target)}function l(g){g.index!==null&&t.remove(g.index);for(let f in g.attributes)t.remove(g.attributes[f]);g.removeEventListener("dispose",o),delete s[g.id],a.unregister(g);let _=r.get(g);_&&(t.remove(_),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function c(g,_){return s[_.id]!==void 0||(_.addEventListener("dispose",o),s[_.id]=new WeakRef(_),a.register(_,_.id,_),e.memory.geometries++),_}function h(g){let _=g.attributes;for(let f in _)t.update(_[f],i.ARRAY_BUFFER)}function d(g){let _=g.index,f=g.attributes.position,m=0;if(f===void 0)return;let y=_!==null?_.array.length:f.array.length/3-1,b=f.count>=65535?Cr:Rr,v=new b(Math.ceil(y/3)*6,1),w=v.array;if(_!==null){let x=_.array;m=_.version;for(let E=0,N=0;E<y;E+=3){let I=x[E+0],F=x[E+1],O=x[E+2];w[N++]=I,w[N++]=F,w[N++]=F,w[N++]=O,w[N++]=O,w[N++]=I}}else{m=f.version;for(let x=0,E=0;x<y;x+=3){let N=x+0,I=x+1,F=x+2;w[E++]=N,w[E++]=I,w[E++]=I,w[E++]=F,w[E++]=F,w[E++]=N}}v.version=m;let T=r.get(g);T&&t.remove(T),r.set(g,v)}function p(g){let _=r.get(g);if(_){let f=g.index;f!==null&&_.version<f.version&&d(g)}else d(g);return r.get(g)}function u(){for(let g in s){let _=s[g].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:p,dispose:u}}function w0(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,p){i.drawElements(n,p,r,d*a),e.update(p,n,1)}function c(d,p,u){u!==0&&(i.drawElementsInstanced(n,p,r,d*a,u),e.update(p,n,u))}function h(d,p,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,u);let _=0;for(let f=0;f<u;f++)_+=p[f];e.update(_,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function A0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Dt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function R0(i,t,e){let n=new WeakMap,s=new _e;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,p=n.get(o);if(p===void 0||p.count!==d){let N=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",N)};p!==void 0&&p.texture.dispose();let u=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],b=0;u===!0&&(b=1),g===!0&&(b=2),_===!0&&(b=3);let v=o.attributes.position.count*b,w=1;v>t.maxTextureSize&&(w=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let T=new Float32Array(v*w*4*d),x=new Er(T,v,w,d);x.type=Ln,x.needsUpdate=!0;let E=b*4;for(let I=0;I<d;I++){let F=f[I],O=m[I],W=y[I],P=v*w*4*I;for(let V=0;V<F.count;V++){let Y=V*E;u===!0&&(s.fromBufferAttribute(F,V),T[P+Y+0]=s.x,T[P+Y+1]=s.y,T[P+Y+2]=s.z,T[P+Y+3]=0),g===!0&&(s.fromBufferAttribute(O,V),T[P+Y+4]=s.x,T[P+Y+5]=s.y,T[P+Y+6]=s.z,T[P+Y+7]=0),_===!0&&(s.fromBufferAttribute(W,V),T[P+Y+8]=s.x,T[P+Y+9]=s.y,T[P+Y+10]=s.z,T[P+Y+11]=W.itemSize===4?s.w:1)}}p={count:d,texture:x,size:new st(v,w)},n.set(o,p),o.addEventListener("dispose",N)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let u=0;for(let _=0;_<c.length;_++)u+=c[_];let g=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function C0(i,t,e,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,p=t.get(c,d);if(r.get(p)!==h&&(t.update(p),r.set(p,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let u=c.skeleton;r.get(u)!==h&&(u.update(),r.set(u,h))}return p}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var I0={[Xc]:"LINEAR_TONE_MAPPING",[qc]:"REINHARD_TONE_MAPPING",[Yc]:"CINEON_TONE_MAPPING",[na]:"ACES_FILMIC_TONE_MAPPING",[Jc]:"AGX_TONE_MAPPING",[$c]:"NEUTRAL_TONE_MAPPING",[Zc]:"CUSTOM_TONE_MAPPING"};function P0(i,t,e,n,s,r){let a=new xn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new le;h.setAttribute("position",new Xt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Xt([0,2,0,0,2,0],2));let d=new Po({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new wt(h,d),u=new ta(-1,1,1,-1,0,1),g=null,_=null,f=!1,m,y=null,b=[],v=!1;this.setSize=function(w,T){a.setSize(w,T),o!==null&&o.setSize(w,T),l!==null&&l.setSize(w,T);for(let x=0;x<b.length;x++){let E=b[x];E.setSize&&E.setSize(w,T)}},this.setEffects=function(w){b=w,v=b.length>0&&b[0].isRenderPass===!0;let T=a.width,x=a.height;b.length>0&&o===null&&(o=new xn(T,x,{type:Vn,depthBuffer:!1,stencilBuffer:!1}),l=new xn(T,x,{type:Vn,depthBuffer:!1,stencilBuffer:!1}));let E=s===!0&&b.some(N=>N.needsDepthTexture===!0);E!==(a.depthTexture!==null)&&(E===!0&&c===null&&(c=new xi(T,x),r===!0&&(c.format=vi,c.type=ss)),a.dispose(),a.depthTexture=E?c:null,a.resolveDepthBuffer=E,a.storeMultisampledDepthBuffer=E);for(let N=0;N<b.length;N++){let I=b[N];I.setSize&&I.setSize(T,x),E&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(c)}},this.begin=function(w,T){if(f||w.toneMapping===ni&&b.length===0)return!1;if(y=T,T!==null){let x=T.width,E=T.height;(a.width!==x||a.height!==E)&&this.setSize(x,E)}return v===!1&&w.setRenderTarget(a),m=w.toneMapping,w.toneMapping=ni,!0},this.hasRenderPass=function(){return v},this.end=function(w,T){w.toneMapping=m,f=!0;let x=a,E=o;for(let N=0;N<b.length;N++){let I=b[N];I.enabled!==!1&&(I.render(w,E,x,T),I.needsSwap!==!1&&(x=E,E=E===o?l:o))}if(g!==w.outputColorSpace||_!==w.toneMapping){g=w.outputColorSpace,_=w.toneMapping,d.defines={},Jt.getTransfer(g)===te&&(d.defines.SRGB_TRANSFER="");let N=I0[_];N&&(d.defines[N]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=x.texture,w.setRenderTarget(y),w.render(p,u),y=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),d.dispose()}}var jd=new rn,tf=new xi(1,1),ef=new Fr(1),nf=new Er,sf=new yo,rf=new Nr,Ld=[],Dd=[],Nd=new Float32Array(16),Ud=new Float32Array(9),Fd=new Float32Array(4);function Ks(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Ld[s];if(r===void 0&&(r=new Float32Array(s),Ld[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ne(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ue(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Bl(i,t){let e=Dd[t];e===void 0&&(e=new Int32Array(t),Dd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function L0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function D0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2fv(this.addr,t),Ue(e,t)}}function N0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ne(e,t))return;i.uniform3fv(this.addr,t),Ue(e,t)}}function U0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4fv(this.addr,t),Ue(e,t)}}function F0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;Fd.set(n),i.uniformMatrix2fv(this.addr,!1,Fd),Ue(e,n)}}function O0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;Ud.set(n),i.uniformMatrix3fv(this.addr,!1,Ud),Ue(e,n)}}function B0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;Nd.set(n),i.uniformMatrix4fv(this.addr,!1,Nd),Ue(e,n)}}function z0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function k0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2iv(this.addr,t),Ue(e,t)}}function H0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3iv(this.addr,t),Ue(e,t)}}function G0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4iv(this.addr,t),Ue(e,t)}}function V0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function W0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2uiv(this.addr,t),Ue(e,t)}}function X0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3uiv(this.addr,t),Ue(e,t)}}function q0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4uiv(this.addr,t),Ue(e,t)}}function zl(i){return i.version===0&&(i.compareFunction=ah,i.needsUpdate=!0),i}function Y0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=zl(tf):r=jd,e.setTexture2D(t||r,s)}function Z0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||sf,s)}function J0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=zl(ef):r=rf,e.setTextureCube(t||r,s)}function $0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||nf,s)}function K0(i){switch(i){case 5126:return L0;case 35664:return D0;case 35665:return N0;case 35666:return U0;case 35674:return F0;case 35675:return O0;case 35676:return B0;case 5124:case 35670:return z0;case 35667:case 35671:return k0;case 35668:case 35672:return H0;case 35669:case 35673:return G0;case 5125:return V0;case 36294:return W0;case 36295:return X0;case 36296:return q0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return Z0;case 35680:case 36300:case 36308:case 36293:return J0;case 36289:case 36303:case 36311:case 36292:return $0}}function Q0(i,t){i.uniform1fv(this.addr,t)}function j0(i,t){let e=Ks(t,this.size,2);i.uniform2fv(this.addr,e)}function t_(i,t){let e=Ks(t,this.size,3);i.uniform3fv(this.addr,e)}function e_(i,t){let e=Ks(t,this.size,4);i.uniform4fv(this.addr,e)}function n_(i,t){let e=Ks(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function i_(i,t){let e=Ks(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function s_(i,t){let e=Ks(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function r_(i,t){i.uniform1iv(this.addr,t)}function a_(i,t){i.uniform2iv(this.addr,t)}function o_(i,t){i.uniform3iv(this.addr,t)}function l_(i,t){i.uniform4iv(this.addr,t)}function c_(i,t){i.uniform1uiv(this.addr,t)}function h_(i,t){i.uniform2uiv(this.addr,t)}function u_(i,t){i.uniform3uiv(this.addr,t)}function d_(i,t){i.uniform4uiv(this.addr,t)}function f_(i,t,e){let n=this.cache,s=t.length,r=Bl(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=zl(tf):a=jd;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function p_(i,t,e){let n=this.cache,s=t.length,r=Bl(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||sf,r[a])}function m_(i,t,e){let n=this.cache,s=t.length,r=Bl(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=zl(ef):a=rf;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function g_(i,t,e){let n=this.cache,s=t.length,r=Bl(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||nf,r[a])}function __(i){switch(i){case 5126:return Q0;case 35664:return j0;case 35665:return t_;case 35666:return e_;case 35674:return n_;case 35675:return i_;case 35676:return s_;case 5124:case 35670:return r_;case 35667:case 35671:return a_;case 35668:case 35672:return o_;case 35669:case 35673:return l_;case 5125:return c_;case 36294:return h_;case 36295:return u_;case 36296:return d_;case 35678:case 36198:case 36298:case 36306:case 35682:return f_;case 35679:case 36299:case 36307:return p_;case 35680:case 36300:case 36308:case 36293:return m_;case 36289:case 36303:case 36311:case 36292:return g_}}var Mh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=K0(e.type)}},Sh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=__(e.type)}},bh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},yh=/(\w+)(\])?(\[|\.)?/g;function Od(i,t){i.seq.push(t),i.map[t.id]=t}function x_(i,t,e){let n=i.name,s=n.length;for(yh.lastIndex=0;;){let r=yh.exec(n),a=yh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Od(e,c===void 0?new Mh(o,i,t):new Sh(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new bh(o),Od(e,d)),e=d}}}var $s=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);x_(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Bd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var y_=37297,v_=0;function M_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var zd=new Nt;function S_(i){Jt._getMatrix(zd,Jt.workingColorSpace,i);let t=`mat3( ${zd.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(i)){case Mr:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function kd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+M_(i.getShaderSource(t),o)}else return r}function b_(i,t){let e=S_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var E_={[Xc]:"Linear",[qc]:"Reinhard",[Yc]:"Cineon",[na]:"ACESFilmic",[Jc]:"AgX",[$c]:"Neutral",[Zc]:"Custom"};function T_(i,t){let e=E_[t];return e===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ul=new D;function w_(){Jt.getLuminanceCoefficients(Ul);let i=Ul.x.toFixed(4),t=Ul.y.toFixed(4),e=Ul.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function A_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(da).join(`
`)}function R_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function C_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function da(i){return i!==""}function Hd(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Gd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var I_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eh(i){return i.replace(I_,P_)}function P_(i,t){let e=Gt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Eh(e)}var L_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vd(i){return i.replace(L_,D_)}function D_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var N_={[ts]:"SHADOWMAP_TYPE_PCF",[Ys]:"SHADOWMAP_TYPE_VSM"};function U_(i){return N_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var F_={[Zs]:"ENVMAP_MODE_REFRACTION"};function O_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":F_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var B_={[Wc]:"ENVMAP_BLENDING_MULTIPLY",[ed]:"ENVMAP_BLENDING_MIX",[nd]:"ENVMAP_BLENDING_ADD"};function z_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":B_[i.combine]||"ENVMAP_BLENDING_NONE"}function k_(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=U_(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=O_(e),d=z_(e),p=A_(e),u=R_(r),g=s.createProgram(),_,f,m=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(da).join(`
`),_.length>0&&(_+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(da).join(`
`),f.length>0&&(f+=`
`)):(_=[Wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(da).join(`
`),f=[Wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ni?"#define TONE_MAPPING":"",e.toneMapping!==ni?Gt.tonemapping_pars_fragment:"",e.toneMapping!==ni?T_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,b_("linearToOutputTexel",e.outputColorSpace),w_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(da).join(`
`)),a=Eh(a),a=Hd(a,e),a=Gd(a,e),o=Eh(o),o=Hd(o,e),o=Gd(o,e),a=Vd(a),o=Vd(o),e.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,_=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,f=["#define varying in",e.glslVersion===lh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===lh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let y=m+_+a,b=m+f+o,v=Bd(s,s.VERTEX_SHADER,y),w=Bd(s,s.FRAGMENT_SHADER,b);s.attachShader(g,v),s.attachShader(g,w),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function T(I){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(g)||"",O=s.getShaderInfoLog(v)||"",W=s.getShaderInfoLog(w)||"",P=F.trim(),V=O.trim(),Y=W.trim(),G=!0,nt=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,v,w);else{let q=kd(s,v,"vertex"),j=kd(s,w,"fragment");Dt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+P+`
`+q+`
`+j)}else P!==""?Rt("WebGLProgram: Program Info Log:",P):(V===""||Y==="")&&(nt=!1);nt&&(I.diagnostics={runnable:G,programLog:P,vertexShader:{log:V,prefix:_},fragmentShader:{log:Y,prefix:f}})}s.deleteShader(v),s.deleteShader(w),x=new $s(s,g),E=C_(s,g)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(g,y_)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=v_++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=v,this.fragmentShader=w,this}var H_=0,Th=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new wh(t),e.set(t,n)),n}},wh=class{constructor(t){this.id=H_++,this.code=t,this.usedTimes=0}};function G_(i){return i===Hi||i===la||i===ca}function V_(i,t,e,n,s,r){let a=new Tr,o=new Th,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(x){return l.add(x),x===0?"uv":`uv${x}`}function g(x,E,N,I,F,O){let W=I.fog,P=F.geometry,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,G=t.get(x.envMap||V,Y),nt=p[x.type],q=n.precision;x.precision!==null&&(q=n.getMaxPrecision(x.precision),q!==x.precision&&Rt("WebGLProgram.getParameters:",x.precision,"not supported, using",q,"instead."));let j=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,tt=j!==void 0?j.length:0,bt=0;P.morphAttributes.position!==void 0&&(bt=1),P.morphAttributes.normal!==void 0&&(bt=2),P.morphAttributes.color!==void 0&&(bt=3);let Ot,$,gt,vt;if(nt){let pt=si[nt];Ot=pt.vertexShader,$=pt.fragmentShader}else{Ot=x.vertexShader,$=x.fragmentShader;let pt=o.getVertexShaderStage(x),ne=o.getFragmentShaderStage(x);o.update(x,pt,ne),gt=pt.id,vt=ne.id}let Ct=i.getRenderTarget(),_t=i.state.buffers.depth.getReversed(),zt=F.isInstancedMesh===!0,we=F.isBatchedMesh===!0,Lt=!!x.map,ee=!!x.matcap,se=!!G,qt=se&&G.isPMREMTexture===!0,Xe=!!x.aoMap,Pe=!!x.lightMap,fn=!!x.bumpMap&&x.wireframe===!1,xe=!!x.normalMap,Yn=!!x.displacementMap,Oe=!!x.emissiveMap,En=!!x.metalnessMap,Tn=!!x.roughnessMap,wn=x.anisotropy>0,U=x.clearcoat>0,An=x.diffuseRoughness>0,me=x.dispersion>0,ge=x.retroreflectivity>0,ft=x.iridescence>0,Le=x.sheen>0,It=x.transmission>0,Ut=wn&&!!x.anisotropyMap,A=U&&!!x.clearcoatMap,M=U&&!!x.clearcoatNormalMap,z=U&&!!x.clearcoatRoughnessMap,et=An&&!!x.diffuseRoughnessMap,Q=ft&&!!x.iridescenceMap,at=ft&&!!x.iridescenceThicknessMap,ut=Le&&!!x.sheenColorMap,Z=Le&&!!x.sheenRoughnessMap,J=!!x.specularMap,lt=!!x.specularColorMap,C=!!x.specularIntensityMap,K=It&&!!x.transmissionMap,X=It&&!!x.thicknessMap,ct=!!x.gradientMap,rt=!!x.alphaMap,ot=x.alphaTest>0,Tt=!!x.alphaHash,Ht=!!x.extensions,it=ni;x.toneMapped&&(Ct===null||Ct.isXRRenderTarget===!0)&&(it=i.toneMapping);let At=qt?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,kt={shaderID:nt,shaderType:x.type,shaderName:x.name,vertexShader:Ot,fragmentShader:$,defines:x.defines,customVertexShaderID:gt,customFragmentShaderID:vt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:q,batching:we,batchingColor:we&&F._colorsTexture!==null,instancing:zt,instancingColor:zt&&F.instanceColor!==null,instancingMorph:zt&&F.morphTexture!==null,outputColorSpace:Ct===null?i.outputColorSpace:Ct.isXRRenderTarget===!0?Ct.texture.colorSpace:Jt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Lt,matcap:ee,envMap:se,envMapMode:se&&G.mapping,envMapPMREM:qt,envMapMaxLod:qt?At.length-1:null,envMapSize:qt?At[0].width:null,aoMap:Xe,lightMap:Pe,bumpMap:fn,normalMap:xe,displacementMap:Yn,emissiveMap:Oe,normalMapObjectSpace:xe&&x.normalMapType===rd,normalMapTangentSpace:xe&&x.normalMapType===Ll,packedNormalMap:xe&&x.normalMapType===Ll&&G_(x.normalMap.format),metalnessMap:En,roughnessMap:Tn,anisotropy:wn,anisotropyMap:Ut,clearcoat:U,clearcoatMap:A,clearcoatNormalMap:M,clearcoatRoughnessMap:z,diffuseRoughness:An,diffuseRoughnessMap:et,dispersion:me,retroreflection:ge,iridescence:ft,iridescenceMap:Q,iridescenceThicknessMap:at,sheen:Le,sheenColorMap:ut,sheenRoughnessMap:Z,specularMap:J,specularColorMap:lt,specularIntensityMap:C,transmission:It,transmissionMap:K,thicknessMap:X,gradientMap:ct,opaque:x.transparent===!1&&x.blending===ki&&x.alphaToCoverage===!1,alphaMap:rt,alphaTest:ot,alphaHash:Tt,combine:x.combine,mapUv:Lt&&u(x.map.channel),aoMapUv:Xe&&u(x.aoMap.channel),lightMapUv:Pe&&u(x.lightMap.channel),bumpMapUv:fn&&u(x.bumpMap.channel),normalMapUv:xe&&u(x.normalMap.channel),displacementMapUv:Yn&&u(x.displacementMap.channel),emissiveMapUv:Oe&&u(x.emissiveMap.channel),metalnessMapUv:En&&u(x.metalnessMap.channel),roughnessMapUv:Tn&&u(x.roughnessMap.channel),anisotropyMapUv:Ut&&u(x.anisotropyMap.channel),clearcoatMapUv:A&&u(x.clearcoatMap.channel),clearcoatNormalMapUv:M&&u(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&u(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:et&&u(x.diffuseRoughnessMap.channel),iridescenceMapUv:Q&&u(x.iridescenceMap.channel),iridescenceThicknessMapUv:at&&u(x.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&u(x.sheenColorMap.channel),sheenRoughnessMapUv:Z&&u(x.sheenRoughnessMap.channel),specularMapUv:J&&u(x.specularMap.channel),specularColorMapUv:lt&&u(x.specularColorMap.channel),specularIntensityMapUv:C&&u(x.specularIntensityMap.channel),transmissionMapUv:K&&u(x.transmissionMap.channel),thicknessMapUv:X&&u(x.thicknessMap.channel),alphaMapUv:rt&&u(x.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(xe||wn),vertexNormals:!!P.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!P.attributes.uv&&(Lt||rt),fog:!!W,useFog:x.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||P.attributes.normal===void 0&&xe===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:_t,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:bt,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:O.filter(pt=>pt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:it,decodeVideoTexture:Lt&&x.map.isVideoTexture===!0&&Jt.getTransfer(x.map.colorSpace)===te,decodeVideoTextureEmissive:Oe&&x.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(x.emissiveMap.colorSpace)===te,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Qe,flipSided:x.side===on,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ht&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&x.extensions.multiDraw===!0||we)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return kt.vertexUv1s=l.has(1),kt.vertexUv2s=l.has(2),kt.vertexUv3s=l.has(3),l.clear(),kt}function _(x){let E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(let N in x.defines)E.push(N),E.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(f(E,x),m(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function f(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapPMREM),x.push(E.envMapMaxLod),x.push(E.envMapSize),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.diffuseRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.numLightProbeGrids),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function m(x,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.diffuseRoughness&&a.enable(25),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function y(x){let E=p[x.type],N;if(E){let I=si[E];N=Td.clone(I.uniforms)}else N=x.uniforms;return N}function b(x,E){let N=h.get(E);return N!==void 0?++N.usedTimes:(N=new k_(i,E,x,s),c.push(N),h.set(E,N)),N}function v(x){if(--x.usedTimes===0){let E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){o.remove(x)}function T(){o.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:y,acquireProgram:b,releaseProgram:v,releaseShaderCache:w,programs:c,dispose:T}}function W_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function X_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Xd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function qd(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(p){let u=0;return p.isInstancedMesh&&(u+=2),p.isSkinnedMesh&&(u+=1),u}function o(p,u,g,_,f,m){let y=i[t];return y===void 0?(y={id:p.id,object:p,geometry:u,material:g,materialVariant:a(p),groupOrder:_,renderOrder:p.renderOrder,z:f,group:m},i[t]=y):(y.id=p.id,y.object=p,y.geometry=u,y.material=g,y.materialVariant=a(p),y.groupOrder=_,y.renderOrder=p.renderOrder,y.z=f,y.group=m),t++,y}function l(p,u,g,_,f,m,y){y.reversedDepth===!0&&(f=-f);let b=o(p,u,g,_,f,m);g.transmission>0?n.push(b):g.transparent===!0?s.push(b):e.push(b)}function c(p,u,g,_,f,m){let y=o(p,u,g,_,f,m);g.transmission>0?n.unshift(y):g.transparent===!0?s.unshift(y):e.unshift(y)}function h(p,u){e.length>1&&e.sort(p||X_),n.length>1&&n.sort(u||Xd),s.length>1&&s.sort(u||Xd)}function d(){for(let p=t,u=i.length;p<u;p++){let g=i[p];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function q_(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new qd,i.set(n,[a])):s>=r.length?(a=new qd,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Y_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new D,color:new Ft};break;case"SpotLight":e={position:new D,direction:new D,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function Z_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var J_=0;function $_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function K_(i){let t=new Y_,e=Z_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);let s=new D,r=new Qt,a=new Qt;function o(c){let h=0,d=0,p=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let u=0,g=0,_=0,f=0,m=0,y=0,b=0,v=0,w=0,T=0,x=0,E=0,N=0,I=0;c.sort($_);for(let O=0,W=c.length;O<W;O++){let P=c[O],V=P.color,Y=P.intensity,G=P.distance,nt=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Hi?nt=P.shadow.map.texture:nt=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=V.r*Y,d+=V.g*Y,p+=V.b*Y;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],Y);I++}else if(P.isSunLight){let q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let j=P.shadow,tt=e.get(P);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[g]=tt,n.sunShadowMap[g]=nt;let bt=j.getViewportCount();for(let Ot=0;Ot<bt;Ot++)n.sunShadowMatrix[_+Ot]=j.getMatrix(Ot),n.sunShadowCascade[_+Ot]=j._cascadeData[Ot];_+=bt,g++}n.sun[u]=q,u++}else if(P.isDirectionalLight){let q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let j=P.shadow,tt=e.get(P);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,n.directionalShadow[f]=tt,n.directionalShadowMap[f]=nt,n.directionalShadowMatrix[f]=P.shadow.matrix,w++}n.directional[f]=q,f++}else if(P.isSpotLight){let q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(V).multiplyScalar(Y),q.distance=G,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[y]=q;let j=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,j.updateMatrices(P),P.castShadow&&N++),n.spotLightMatrix[y]=j.matrix,P.castShadow){let tt=e.get(P);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,n.spotShadow[y]=tt,n.spotShadowMap[y]=nt,x++}y++}else if(P.isRectAreaLight){let q=t.get(P);q.color.copy(V).multiplyScalar(Y),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[b]=q,b++}else if(P.isPointLight){let q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){let j=P.shadow,tt=e.get(P);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,tt.shadowCameraNear=j.camera.near,tt.shadowCameraFar=j.camera.far,n.pointShadow[m]=tt,n.pointShadowMap[m]=nt,n.pointShadowMatrix[m]=P.shadow.matrix,T++}n.point[m]=q,m++}else if(P.isHemisphereLight){let q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(Y),q.groundColor.copy(P.groundColor).multiplyScalar(Y),n.hemi[v]=q,v++}}b>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=p;let F=n.hash;(F.sunLength!==u||F.directionalLength!==f||F.pointLength!==m||F.spotLength!==y||F.rectAreaLength!==b||F.hemiLength!==v||F.numSunShadows!==g||F.numDirectionalShadows!==w||F.numPointShadows!==T||F.numSpotShadows!==x||F.numSpotMaps!==E||F.numLightProbes!==I)&&(n.sun.length=u,n.directional.length=f,n.spot.length=y,n.rectArea.length=b,n.point.length=m,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+E-N,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=N,n.numLightProbes=I,F.sunLength=u,F.directionalLength=f,F.pointLength=m,F.spotLength=y,F.rectAreaLength=b,F.hemiLength=v,F.numSunShadows=g,F.numDirectionalShadows=w,F.numPointShadows=T,F.numSpotShadows=x,F.numSpotMaps=E,F.numLightProbes=I,n.version=J_++)}function l(c,h){let d=0,p=0,u=0,g=0,_=0,f=0,m=h.matrixWorldInverse;for(let y=0,b=c.length;y<b;y++){let v=c[y];if(v.isSunLight){let w=n.sun[d];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(m),d++}else if(v.isDirectionalLight){let w=n.directional[p];w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),p++}else if(v.isSpotLight){let w=n.spot[g];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),g++}else if(v.isRectAreaLight){let w=n.rectArea[_];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(m),a.identity(),r.copy(v.matrixWorld),r.premultiply(m),a.extractRotation(r),w.halfWidth.set(v.width*.5,0,0),w.halfHeight.set(0,v.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),_++}else if(v.isPointLight){let w=n.point[u];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(m),u++}else if(v.isHemisphereLight){let w=n.hemi[f];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(m),f++}}}return{setup:o,setupView:l,state:n}}function Yd(i){let t=new K_(i),e=[],n=[],s=[];function r(d){h.camera=d,e.length=0,n.length=0,s.length=0}function a(d){d.isLightProbeGrid?s.push(d):e.push(d)}function o(d){n.push(d)}function l(){t.setup(e),s.sort((d,p)=>d.priority-p.priority||d.id-p.id)}function c(d){t.setupView(e,d)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Q_(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Yd(i),t.set(s,[o])):r>=a.length?(o=new Yd(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var j_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ex=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],nx=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],Zd=new Qt,ua=new D,vh=new D;function ix(i,t,e){let n=new Di,s=new st,r=new st,a=new _e,o=new Lo,l=new Do,c={},h=e.maxTextureSize,d={[zi]:on,[on]:zi,[Qe]:Qe},p=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:j_,fragmentShader:tx}),u=p.clone();u.defines.HORIZONTAL_PASS=1;let g=new le;g.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new wt(g,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ts;let m=this.type;this.render=function(T,x,E){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||T.length===0)return;this.type===Fu&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ts);let N=i.getRenderTarget(),I=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),O=i.state;O.setBlending(es),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let W=m!==this.type;W&&x.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(V=>V.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,V=T.length;P<V;P++){let Y=T[P],G=Y.shadow;if(G===void 0){Rt("WebGLShadowMap:",Y,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let nt=G.getFrameExtents();s.multiply(nt),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/nt.x),s.x=r.x*nt.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/nt.y),s.y=r.y*nt.y,G.mapSize.y=r.y));let q=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=q,G.map===null||W===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Ys){if(Y.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new xn(s.x,s.y,{format:Hi,type:Vn,minFilter:sn,magFilter:sn,generateMipmaps:!1}),G.map.texture.name=Y.name+".shadowMap",G.map.depthTexture=new xi(s.x,s.y,Ln),G.map.depthTexture.name=Y.name+".shadowMapDepth",G.map.depthTexture.format=gi,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=He,G.map.depthTexture.magFilter=He}else Y.isPointLight?(G.map=new fa(s.x),G.map.depthTexture=new Fr(s.x,Gn)):(G.map=new xn(s.x,s.y),G.map.depthTexture=new xi(s.x,s.y,Gn)),G.map.depthTexture.name=Y.name+".shadowMap",G.map.depthTexture.format=gi,this.type===ts?(G.map.depthTexture.compareFunction=q?rh:sh,G.map.depthTexture.minFilter=sn,G.map.depthTexture.magFilter=sn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=He,G.map.depthTexture.magFilter=He);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==s.x||G.map.height!==s.y)&&G.map.setSize(s.x,s.y);let j=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();Y.isPointLight!==!0&&G.updateMatrices(Y,E);let tt=(G.camera.layers.mask&4294967294)!==0?G.camera.layers:E.layers;for(let bt=0;bt<j;bt++){let Ot=G.getCamera(bt);if(Y.isPointLight){let $=G.camera,gt=G.matrix,vt=Y.distance||$.far;vt!==$.far&&($.far=vt,$.updateProjectionMatrix()),ua.setFromMatrixPosition(Y.matrixWorld),$.position.copy(ua),vh.copy($.position),vh.add(ex[bt]),$.up.copy(nx[bt]),$.lookAt(vh),$.updateMatrixWorld(),gt.makeTranslation(-ua.x,-ua.y,-ua.z),Zd.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Zd,$.coordinateSystem,$.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,bt),i.clear();else{bt===0&&(i.setRenderTarget(G.map),i.clear());let $=G.getViewport(bt);a.set(r.x*$.x,r.y*$.y,r.x*$.z,r.y*$.w),O.viewport(a)}n=G.getFrustum(bt),v(x,E,Ot,Y,tt,this.type)}G.isPointLightShadow!==!0&&this.type===Ys&&y(G,E),G.needsUpdate=!1}m=this.type,f.needsUpdate=!1,i.setRenderTarget(N,I,F)};function y(T,x){let E=t.update(_);p.defines.VSM_SAMPLES!==T.blurSamples&&(p.defines.VSM_SAMPLES=T.blurSamples,u.defines.VSM_SAMPLES=T.blurSamples,p.needsUpdate=!0,u.needsUpdate=!0),T.mapPass===null?T.mapPass=new xn(s.x,s.y,{format:Hi,type:Vn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),p.uniforms.shadow_pass.value=T.map.depthTexture,p.uniforms.resolution.value.set(T.map.width,T.map.height),p.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(x,null,E,p,_,null),u.uniforms.shadow_pass.value=T.mapPass.texture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(x,null,E,u,_,null)}function b(T,x,E,N){let I=null,F=E.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(F!==void 0)I=F;else if(I=E.isPointLight===!0?l:o,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let O=I.uuid,W=x.uuid,P=c[O];P===void 0&&(P={},c[O]=P);let V=P[W];V===void 0&&(V=I.clone(),P[W]=V,x.addEventListener("dispose",w)),I=V}if(I.visible=x.visible,I.wireframe=x.wireframe,N===Ys?I.side=x.shadowSide!==null?x.shadowSide:x.side:I.side=x.shadowSide!==null?x.shadowSide:d[x.side],I.alphaMap=x.alphaMap,I.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,I.map=x.map,I.clipShadows=x.clipShadows,I.clippingPlanes=x.clippingPlanes,I.clipIntersection=x.clipIntersection,I.displacementMap=x.displacementMap,I.displacementScale=x.displacementScale,I.displacementBias=x.displacementBias,I.wireframeLinewidth=x.wireframeLinewidth,I.linewidth=x.linewidth,E.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let O=i.properties.get(I);O.light=E}return I}function v(T,x,E,N,I,F){if(T.visible===!1)return;if(T.layers.test(I)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&F===Ys)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,T.matrixWorld);let P=t.update(T),V=T.material;if(Array.isArray(V)){let Y=P.groups;for(let G=0,nt=Y.length;G<nt;G++){let q=Y[G],j=V[q.materialIndex];if(j&&j.visible){let tt=b(T,j,N,F);T.onBeforeShadow(i,T,x,E,P,tt,q),i.renderBufferDirect(E,null,P,tt,T,q),T.onAfterShadow(i,T,x,E,P,tt,q)}}}else if(V.visible){let Y=b(T,V,N,F);T.onBeforeShadow(i,T,x,E,P,Y,null),i.renderBufferDirect(E,null,P,Y,T,null),T.onAfterShadow(i,T,x,E,P,Y,null)}}let W=T.children;for(let P=0,V=W.length;P<V;P++)v(W[P],x,E,N,I,F)}function w(T){T.target.removeEventListener("dispose",w);for(let E in c){let N=c[E],I=T.target.uuid;I in N&&(N[I].dispose(),delete N[I])}}}function sx(i,t){function e(){let C=!1,K=new _e,X=null,ct=new _e(0,0,0,0);return{setMask:function(rt){X!==rt&&!C&&(i.colorMask(rt,rt,rt,rt),X=rt)},setLocked:function(rt){C=rt},setClear:function(rt,ot,Tt,Ht,it){it===!0&&(rt*=Ht,ot*=Ht,Tt*=Ht),K.set(rt,ot,Tt,Ht),ct.equals(K)===!1&&(i.clearColor(rt,ot,Tt,Ht),ct.copy(K))},reset:function(){C=!1,X=null,ct.set(-1,0,0,0)}}}function n(){let C=!1,K=!1,X=null,ct=null,rt=null;return{setReversed:function(ot){if(K!==ot){let Tt=t.get("EXT_clip_control");ot?Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.ZERO_TO_ONE_EXT):Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.NEGATIVE_ONE_TO_ONE_EXT),K=ot;let Ht=rt;rt=null,this.setClear(Ht)}},getReversed:function(){return K},setTest:function(ot){ot?_t(i.DEPTH_TEST):zt(i.DEPTH_TEST)},setMask:function(ot){X!==ot&&!C&&(i.depthMask(ot),X=ot)},setFunc:function(ot){if(K&&(ot=md[ot]),ct!==ot){switch(ot){case ao:i.depthFunc(i.NEVER);break;case oo:i.depthFunc(i.ALWAYS);break;case lo:i.depthFunc(i.LESS);break;case Ps:i.depthFunc(i.LEQUAL);break;case co:i.depthFunc(i.EQUAL);break;case ho:i.depthFunc(i.GEQUAL);break;case uo:i.depthFunc(i.GREATER);break;case fo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ct=ot}},setLocked:function(ot){C=ot},setClear:function(ot){rt!==ot&&(rt=ot,K&&(ot=1-ot),i.clearDepth(ot))},reset:function(){C=!1,X=null,ct=null,rt=null,K=!1}}}function s(){let C=!1,K=null,X=null,ct=null,rt=null,ot=null,Tt=null,Ht=null,it=null;return{setTest:function(At){C||(At?_t(i.STENCIL_TEST):zt(i.STENCIL_TEST))},setMask:function(At){K!==At&&!C&&(i.stencilMask(At),K=At)},setFunc:function(At,kt,pt){(X!==At||ct!==kt||rt!==pt)&&(i.stencilFunc(At,kt,pt),X=At,ct=kt,rt=pt)},setOp:function(At,kt,pt){(ot!==At||Tt!==kt||Ht!==pt)&&(i.stencilOp(At,kt,pt),ot=At,Tt=kt,Ht=pt)},setLocked:function(At){C=At},setClear:function(At){it!==At&&(i.clearStencil(At),it=At)},reset:function(){C=!1,K=null,X=null,ct=null,rt=null,ot=null,Tt=null,Ht=null,it=null}}}let r=new e,a=new n,o=new s,l={},c=new WeakMap,h={},d={},p={},u=new WeakMap,g=[],_=null,f=!1,m=null,y=null,b=null,v=null,w=null,T=null,x=null,E=new Ft(0,0,0),N=0,I=!1,F=null,O=null,W=null,P=null,V=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,nt=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(q)[1]),G=nt>=1):q.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),G=nt>=2);let j=null,tt={},bt=i.getParameter(i.SCISSOR_BOX),Ot=i.getParameter(i.VIEWPORT),$=new _e().fromArray(bt),gt=new _e().fromArray(Ot);function vt(C,K,X,ct){let rt=new Uint8Array(4),ot=i.createTexture();i.bindTexture(C,ot),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Tt=0;Tt<X;Tt++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(K,0,i.RGBA,1,1,ct,0,i.RGBA,i.UNSIGNED_BYTE,rt):i.texImage2D(K+Tt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,rt);return ot}let Ct={};Ct[i.TEXTURE_2D]=vt(i.TEXTURE_2D,i.TEXTURE_2D,1),Ct[i.TEXTURE_CUBE_MAP]=vt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ct[i.TEXTURE_2D_ARRAY]=vt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ct[i.TEXTURE_3D]=vt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),_t(i.DEPTH_TEST),a.setFunc(Ps),fn(!1),xe(zc),_t(i.CULL_FACE),Xe(es);function _t(C){h[C]!==!0&&(i.enable(C),h[C]=!0)}function zt(C){h[C]!==!1&&(i.disable(C),h[C]=!1)}function we(C,K){return p[C]!==K?(i.bindFramebuffer(C,K),p[C]=K,C===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=K),C===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=K),!0):!1}function Lt(C,K){let X=g,ct=!1;if(C){X=u.get(K),X===void 0&&(X=[],u.set(K,X));let rt=C.textures;if(X.length!==rt.length||X[0]!==i.COLOR_ATTACHMENT0){for(let ot=0,Tt=rt.length;ot<Tt;ot++)X[ot]=i.COLOR_ATTACHMENT0+ot;X.length=rt.length,ct=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,ct=!0);ct&&i.drawBuffers(X)}function ee(C){return _!==C?(i.useProgram(C),_=C,!0):!1}let se={[ns]:i.FUNC_ADD,[Bu]:i.FUNC_SUBTRACT,[zu]:i.FUNC_REVERSE_SUBTRACT};se[ku]=i.MIN,se[Hu]=i.MAX;let qt={[Gu]:i.ZERO,[Vu]:i.ONE,[Wu]:i.SRC_COLOR,[Gc]:i.SRC_ALPHA,[$u]:i.SRC_ALPHA_SATURATE,[Zu]:i.DST_COLOR,[qu]:i.DST_ALPHA,[Xu]:i.ONE_MINUS_SRC_COLOR,[Vc]:i.ONE_MINUS_SRC_ALPHA,[Ju]:i.ONE_MINUS_DST_COLOR,[Yu]:i.ONE_MINUS_DST_ALPHA,[Ku]:i.CONSTANT_COLOR,[Qu]:i.ONE_MINUS_CONSTANT_COLOR,[ju]:i.CONSTANT_ALPHA,[td]:i.ONE_MINUS_CONSTANT_ALPHA};function Xe(C,K,X,ct,rt,ot,Tt,Ht,it,At){if(C===es){f===!0&&(zt(i.BLEND),f=!1);return}if(f===!1&&(_t(i.BLEND),f=!0),C!==Ou){if(C!==m||At!==I){if((y!==ns||w!==ns)&&(i.blendEquation(i.FUNC_ADD),y=ns,w=ns),At)switch(C){case ki:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ln:i.blendFunc(i.ONE,i.ONE);break;case kc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Hc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Dt("WebGLState: Invalid blending: ",C);break}else switch(C){case ki:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ln:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case kc:Dt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hc:Dt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Dt("WebGLState: Invalid blending: ",C);break}b=null,v=null,T=null,x=null,E.set(0,0,0),N=0,m=C,I=At}return}rt=rt||K,ot=ot||X,Tt=Tt||ct,(K!==y||rt!==w)&&(i.blendEquationSeparate(se[K],se[rt]),y=K,w=rt),(X!==b||ct!==v||ot!==T||Tt!==x)&&(i.blendFuncSeparate(qt[X],qt[ct],qt[ot],qt[Tt]),b=X,v=ct,T=ot,x=Tt),(Ht.equals(E)===!1||it!==N)&&(i.blendColor(Ht.r,Ht.g,Ht.b,it),E.copy(Ht),N=it),m=C,I=!1}function Pe(C,K){C.side===Qe?zt(i.CULL_FACE):_t(i.CULL_FACE);let X=C.side===on;K&&(X=!X),fn(X),C.blending===ki&&C.transparent===!1?Xe(es):Xe(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);let ct=C.stencilWrite;o.setTest(ct),ct&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),Oe(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?_t(i.SAMPLE_ALPHA_TO_COVERAGE):zt(i.SAMPLE_ALPHA_TO_COVERAGE)}function fn(C){F!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),F=C)}function xe(C){C!==Nu?(_t(i.CULL_FACE),C!==O&&(C===zc?i.cullFace(i.BACK):C===Uu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):zt(i.CULL_FACE),O=C}function Yn(C){C!==W&&(G&&i.lineWidth(C),W=C)}function Oe(C,K,X){C?(_t(i.POLYGON_OFFSET_FILL),(P!==K||V!==X)&&(P=K,V=X,a.getReversed()&&(K=-K,X=-X),i.polygonOffset(K,X))):zt(i.POLYGON_OFFSET_FILL)}function En(C){C?_t(i.SCISSOR_TEST):zt(i.SCISSOR_TEST)}function Tn(C){C===void 0&&(C=i.TEXTURE0+Y-1),j!==C&&(i.activeTexture(C),j=C)}function wn(C,K,X){X===void 0&&(j===null?X=i.TEXTURE0+Y-1:X=j);let ct=tt[X];ct===void 0&&(ct={type:void 0,texture:void 0},tt[X]=ct),(ct.type!==C||ct.texture!==K)&&(j!==X&&(i.activeTexture(X),j=X),i.bindTexture(C,K||Ct[C]),ct.type=C,ct.texture=K)}function U(){let C=tt[j];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function An(){try{i.compressedTexImage2D(...arguments)}catch(C){Dt("WebGLState:",C)}}function me(){try{i.compressedTexImage3D(...arguments)}catch(C){Dt("WebGLState:",C)}}function ge(){try{i.texSubImage2D(...arguments)}catch(C){Dt("WebGLState:",C)}}function ft(){try{i.texSubImage3D(...arguments)}catch(C){Dt("WebGLState:",C)}}function Le(){try{i.compressedTexSubImage2D(...arguments)}catch(C){Dt("WebGLState:",C)}}function It(){try{i.compressedTexSubImage3D(...arguments)}catch(C){Dt("WebGLState:",C)}}function Ut(){try{i.texStorage2D(...arguments)}catch(C){Dt("WebGLState:",C)}}function A(){try{i.texStorage3D(...arguments)}catch(C){Dt("WebGLState:",C)}}function M(){try{i.texImage2D(...arguments)}catch(C){Dt("WebGLState:",C)}}function z(){try{i.texImage3D(...arguments)}catch(C){Dt("WebGLState:",C)}}function et(C){return d[C]!==void 0?d[C]:i.getParameter(C)}function Q(C,K){d[C]!==K&&(i.pixelStorei(C,K),d[C]=K)}function at(C){$.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),$.copy(C))}function ut(C){gt.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),gt.copy(C))}function Z(C,K){let X=c.get(K);X===void 0&&(X=new WeakMap,c.set(K,X));let ct=X.get(C);ct===void 0&&(ct=i.getUniformBlockIndex(K,C.name),i.uniformBlockBinding(K,ct,ct),X.set(C,ct))}function J(C,K,X){let rt=c.get(K).get(C);l[rt]!==X&&(i.bindBufferBase(i.UNIFORM_BUFFER,rt,X),l[rt]=X)}function lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},j=null,tt={},p={},l={},u=new WeakMap,g=[],_=null,f=!1,m=null,y=null,b=null,v=null,w=null,T=null,x=null,E=new Ft(0,0,0),N=0,I=!1,F=null,O=null,W=null,P=null,V=null,$.set(0,0,i.canvas.width,i.canvas.height),gt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:_t,disable:zt,bindFramebuffer:we,drawBuffers:Lt,useProgram:ee,setBlending:Xe,setMaterial:Pe,setFlipSided:fn,setCullFace:xe,setLineWidth:Yn,setPolygonOffset:Oe,setScissorTest:En,activeTexture:Tn,bindTexture:wn,unbindTexture:U,compressedTexImage2D:An,compressedTexImage3D:me,texImage2D:M,texImage3D:z,pixelStorei:Q,getParameter:et,updateUBOMapping:Z,uniformBlockBinding:J,texStorage2D:Ut,texStorage3D:A,texSubImage2D:ge,texSubImage3D:ft,compressedTexSubImage2D:Le,compressedTexSubImage3D:It,scissor:at,viewport:ut,reset:lt}}function rx(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new st,h=new WeakMap,d=new Set,p,u=new WeakMap,g=new Set,_=new FinalizationRegistry(A=>g.delete(A)),f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,M){return f?new OffscreenCanvas(A,M):Sr("canvas")}function y(A,M,z){let et=1,Q=Ut(A);if((Q.width>z||Q.height>z)&&(et=z/Math.max(Q.width,Q.height)),et<1)if(typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&A instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&A instanceof ImageBitmap||typeof VideoFrame!="undefined"&&A instanceof VideoFrame){let at=Math.floor(et*Q.width),ut=Math.floor(et*Q.height);p===void 0&&(p=m(at,ut));let Z=M?m(at,ut):p;return Z.width=at,Z.height=ut,Z.getContext("2d").drawImage(A,0,0,at,ut),Rt("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+at+"x"+ut+")."),Z}else return"data"in A&&Rt("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function b(A){return A.generateMipmaps}function v(A){i.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(A,M,z,et,Q,at=!1){if(A!==null){if(i[A]!==void 0)return i[A];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ut;et&&(ut=t.get("EXT_texture_norm16"),ut||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=M;if(M===i.RED&&(z===i.FLOAT&&(Z=i.R32F),z===i.HALF_FLOAT&&(Z=i.R16F),z===i.UNSIGNED_BYTE&&(Z=i.R8),z===i.UNSIGNED_SHORT&&ut&&(Z=ut.R16_EXT),z===i.SHORT&&ut&&(Z=ut.R16_SNORM_EXT)),M===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.R8UI),z===i.UNSIGNED_SHORT&&(Z=i.R16UI),z===i.UNSIGNED_INT&&(Z=i.R32UI),z===i.BYTE&&(Z=i.R8I),z===i.SHORT&&(Z=i.R16I),z===i.INT&&(Z=i.R32I)),M===i.RG&&(z===i.FLOAT&&(Z=i.RG32F),z===i.HALF_FLOAT&&(Z=i.RG16F),z===i.UNSIGNED_BYTE&&(Z=i.RG8),z===i.UNSIGNED_SHORT&&ut&&(Z=ut.RG16_EXT),z===i.SHORT&&ut&&(Z=ut.RG16_SNORM_EXT)),M===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RG8UI),z===i.UNSIGNED_SHORT&&(Z=i.RG16UI),z===i.UNSIGNED_INT&&(Z=i.RG32UI),z===i.BYTE&&(Z=i.RG8I),z===i.SHORT&&(Z=i.RG16I),z===i.INT&&(Z=i.RG32I)),M===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),z===i.UNSIGNED_INT&&(Z=i.RGB32UI),z===i.BYTE&&(Z=i.RGB8I),z===i.SHORT&&(Z=i.RGB16I),z===i.INT&&(Z=i.RGB32I)),M===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),z===i.UNSIGNED_INT&&(Z=i.RGBA32UI),z===i.BYTE&&(Z=i.RGBA8I),z===i.SHORT&&(Z=i.RGBA16I),z===i.INT&&(Z=i.RGBA32I)),M===i.RGB&&(z===i.UNSIGNED_SHORT&&ut&&(Z=ut.RGB16_EXT),z===i.SHORT&&ut&&(Z=ut.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),M===i.RGBA){let J=at?Mr:Jt.getTransfer(Q);z===i.FLOAT&&(Z=i.RGBA32F),z===i.HALF_FLOAT&&(Z=i.RGBA16F),z===i.UNSIGNED_BYTE&&(Z=J===te?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&ut&&(Z=ut.RGBA16_EXT),z===i.SHORT&&ut&&(Z=ut.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function x(A,M){let z;return A?M===null||M===Gn||M===ss?z=i.DEPTH24_STENCIL8:M===Ln?z=i.DEPTH32F_STENCIL8:M===Js&&(z=i.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Gn||M===ss?z=i.DEPTH_COMPONENT24:M===Ln?z=i.DEPTH_COMPONENT32F:M===Js&&(z=i.DEPTH_COMPONENT16),z}function E(A,M){return b(A)===!0||A.isFramebufferTexture&&A.minFilter!==He&&A.minFilter!==sn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function N(A){let M=new WeakRef(A);n.get(A).__ref=M,g.add(M),_.register(A,M,M)}function I(A){let M=n.get(A).__ref;M!==void 0&&(g.delete(M),_.unregister(M))}function F(A){W(A.target)}function O(A){P(A.target)}function W(A){A.removeEventListener("dispose",F),I(A),Y(A),A.isVideoTexture&&h.delete(A),A.isHTMLTexture&&d.delete(A)}function P(A){A.removeEventListener("dispose",O),I(A),nt(A)}function V(){for(let A of g){let M=A.deref();M!==void 0&&(M.isRenderTarget===!0?P(M):W(M))}g.clear(),d.clear()}function Y(A){let M=n.get(A);if(M.__webglInit===void 0)return;let z=A.source,et=u.get(z);if(et){let Q=et[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&G(A),Object.keys(et).length===0&&u.delete(z)}n.remove(A)}function G(A){let M=n.get(A);i.deleteTexture(M.__webglTexture);let z=A.source,et=u.get(z);delete et[M.__cacheKey],a.memory.textures--}function nt(A){let M=n.get(A);M.__depthDisposeCallback&&M.__depthDisposeCallback();let z=A.depthTexture;if(z&&z.renderTarget===A&&W(z),A.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(M.__webglFramebuffer[Q]))for(let at=0;at<M.__webglFramebuffer[Q].length;at++)i.deleteFramebuffer(M.__webglFramebuffer[Q][at]);else i.deleteFramebuffer(M.__webglFramebuffer[Q]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[Q])}else{if(Array.isArray(M.__webglFramebuffer))for(let Q=0;Q<M.__webglFramebuffer.length;Q++)i.deleteFramebuffer(M.__webglFramebuffer[Q]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Q=0;Q<M.__webglColorRenderbuffer.length;Q++)M.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[Q]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let et=A.textures;for(let Q=0,at=et.length;Q<at;Q++){let ut=n.get(et[Q]);ut.__webglTexture&&(i.deleteTexture(ut.__webglTexture),a.memory.textures--),n.remove(et[Q])}n.remove(A)}let q=0;function j(){q=0}function tt(){return q}function bt(A){q=A}function Ot(){let A=q;return A>=s.maxTextures&&Rt("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),q+=1,A}function $(A){let M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.mipmapsAutoUpdate),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function gt(A,M){let z=n.get(A);if(A.isVideoTexture&&Le(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&z.__version!==A.version){let et=A.image;if(et===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(z,A,M);return}}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+M)}function vt(A,M){let z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){Pe(z,A,M);return}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+M)}function Ct(A,M){let z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){Pe(z,A,M);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+M)}function _t(A,M){let z=n.get(A);if(A.version>0&&z.__version!==A.version){fn(z,A,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+M)}let zt={[Ls]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[po]:i.MIRRORED_REPEAT},we={[He]:i.NEAREST,[id]:i.NEAREST_MIPMAP_NEAREST,[ia]:i.NEAREST_MIPMAP_LINEAR,[sn]:i.LINEAR,[Zo]:i.LINEAR_MIPMAP_NEAREST,[yi]:i.LINEAR_MIPMAP_LINEAR},Lt={[od]:i.NEVER,[ah]:i.ALWAYS,[ld]:i.LESS,[sh]:i.LEQUAL,[cd]:i.EQUAL,[rh]:i.GEQUAL,[hd]:i.GREATER,[ud]:i.NOTEQUAL};function ee(A,M){if(M.type===Ln&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===sn||M.magFilter===Zo||M.magFilter===ia||M.magFilter===yi||M.minFilter===sn||M.minFilter===Zo||M.minFilter===ia||M.minFilter===yi)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,zt[M.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,zt[M.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,zt[M.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,we[M.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,we[M.minFilter]),M.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Lt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===He||M.minFilter!==ia&&M.minFilter!==yi||M.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function se(A,M){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",F),N(M));let et=M.source,Q=u.get(et);Q===void 0&&(Q={},u.set(et,Q));let at=$(M);if(at!==A.__cacheKey){Q[at]===void 0&&(Q[at]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Q[at].usedTimes++;let ut=Q[A.__cacheKey];ut!==void 0&&(Q[A.__cacheKey].usedTimes--,ut.usedTimes===0&&G(M)),A.__cacheKey=at,A.__webglTexture=Q[at].texture}return z}function qt(A,M,z){return Math.floor(Math.floor(A/z)/M)}function Xe(A,M,z,et){let at=A.updateRanges;if(at.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,z,et,M.data);else{at.sort((C,K)=>C.start-K.start);let ut=0;for(let C=1;C<at.length;C++){let K=at[ut],X=at[C],ct=K.start+K.count,rt=qt(X.start,M.width,4),ot=qt(K.start,M.width,4);X.start<=ct+1&&rt===ot&&qt(X.start+X.count-1,M.width,4)===rt?K.count=Math.max(K.count,X.start+X.count-K.start):(++ut,at[ut]=X)}at.length=ut+1;let Z=e.getParameter(i.UNPACK_ROW_LENGTH),J=e.getParameter(i.UNPACK_SKIP_PIXELS),lt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let C=0,K=at.length;C<K;C++){let X=at[C],ct=Math.floor(X.start/4),rt=Math.ceil(X.count/4),ot=ct%M.width,Tt=Math.floor(ct/M.width),Ht=rt,it=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ot),e.pixelStorei(i.UNPACK_SKIP_ROWS,Tt),e.texSubImage2D(i.TEXTURE_2D,0,ot,Tt,Ht,it,z,et,M.data)}A.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,J),e.pixelStorei(i.UNPACK_SKIP_ROWS,lt)}}function Pe(A,M,z){let et=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(et=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(et=i.TEXTURE_3D);let Q=se(A,M),at=M.source;e.bindTexture(et,A.__webglTexture,i.TEXTURE0+z);let ut=n.get(at);if(at.version!==ut.__version||Q===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap!="undefined"&&M.image instanceof ImageBitmap)===!1){let it=Jt.getPrimaries(Jt.workingColorSpace),At=M.colorSpace===Mi?null:Jt.getPrimaries(M.colorSpace),kt=M.colorSpace===Mi||it===At?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,kt)}e.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment);let J=y(M.image,!1,s.maxTextureSize);J=It(M,J);let lt=r.convert(M.format,M.colorSpace),C=r.convert(M.type),K=T(M.internalFormat,lt,C,M.normalized,M.colorSpace,M.isVideoTexture);ee(et,M);let X,ct=M.mipmaps,rt=M.isVideoTexture!==!0,ot=ut.__version===void 0||Q===!0,Tt=at.dataReady,Ht=E(M,J);if(M.isDepthTexture)K=x(M.format===vi,M.type),ot&&(rt?e.texStorage2D(i.TEXTURE_2D,1,K,J.width,J.height):e.texImage2D(i.TEXTURE_2D,0,K,J.width,J.height,0,lt,C,null));else if(M.isDataTexture)if(ct.length>0){rt&&ot&&e.texStorage2D(i.TEXTURE_2D,Ht,K,ct[0].width,ct[0].height);for(let it=0,At=ct.length;it<At;it++)X=ct[it],rt?Tt&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,X.width,X.height,lt,C,X.data):e.texImage2D(i.TEXTURE_2D,it,K,X.width,X.height,0,lt,C,X.data);M.generateMipmaps=!1}else rt?(ot&&e.texStorage2D(i.TEXTURE_2D,Ht,K,J.width,J.height),Tt&&Xe(M,J,lt,C)):e.texImage2D(i.TEXTURE_2D,0,K,J.width,J.height,0,lt,C,J.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){rt&&ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ht,K,ct[0].width,ct[0].height,J.depth);for(let it=0,At=ct.length;it<At;it++)if(X=ct[it],M.format!==Wn)if(lt!==null)if(rt){if(Tt)if(M.layerUpdates.size>0){let kt=fh(X.width,X.height,M.format,M.type);for(let pt of M.layerUpdates){let ne=X.data.subarray(pt*kt/X.data.BYTES_PER_ELEMENT,(pt+1)*kt/X.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,pt,X.width,X.height,1,lt,ne)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,X.width,X.height,J.depth,lt,X.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,it,K,X.width,X.height,J.depth,0,X.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?Tt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,X.width,X.height,J.depth,lt,C,X.data):e.texImage3D(i.TEXTURE_2D_ARRAY,it,K,X.width,X.height,J.depth,0,lt,C,X.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{rt&&ot&&e.texStorage2D(i.TEXTURE_2D,Ht,K,ct[0].width,ct[0].height);for(let it=0,At=ct.length;it<At;it++)X=ct[it],M.format!==Wn?lt!==null?rt?Tt&&e.compressedTexSubImage2D(i.TEXTURE_2D,it,0,0,X.width,X.height,lt,X.data):e.compressedTexImage2D(i.TEXTURE_2D,it,K,X.width,X.height,0,X.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?Tt&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,X.width,X.height,lt,C,X.data):e.texImage2D(i.TEXTURE_2D,it,K,X.width,X.height,0,lt,C,X.data)}else if(M.isDataArrayTexture)if(rt){if(ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ht,K,J.width,J.height,J.depth),Tt)if(M.layerUpdates.size>0){let it=fh(J.width,J.height,M.format,M.type);for(let At of M.layerUpdates){let kt=J.data.subarray(At*it/J.data.BYTES_PER_ELEMENT,(At+1)*it/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,At,J.width,J.height,1,lt,C,kt)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,lt,C,J.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,K,J.width,J.height,J.depth,0,lt,C,J.data);else if(M.isData3DTexture)rt?(ot&&e.texStorage3D(i.TEXTURE_3D,Ht,K,J.width,J.height,J.depth),Tt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,lt,C,J.data)):e.texImage3D(i.TEXTURE_3D,0,K,J.width,J.height,J.depth,0,lt,C,J.data);else if(M.isFramebufferTexture){if(ot)if(rt)e.texStorage2D(i.TEXTURE_2D,Ht,K,J.width,J.height);else{let it=J.width,At=J.height;for(let kt=0;kt<Ht;kt++)e.texImage2D(i.TEXTURE_2D,kt,K,it,At,0,lt,C,null),it>>=1,At>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in i){let it=i.canvas;if(it.hasAttribute("layoutsubtree")||it.setAttribute("layoutsubtree","true"),J.parentNode!==it){it.appendChild(J),d.add(M),it.onpaint=At=>{let kt=At.changedElements;for(let pt of d)kt.includes(pt.image)&&(pt.needsUpdate=!0)},it.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,J);else{let kt=i.RGBA,pt=i.RGBA,ne=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,kt,pt,ne,J)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ct.length>0){if(rt&&ot){let it=Ut(ct[0]);e.texStorage2D(i.TEXTURE_2D,Ht,K,it.width,it.height)}for(let it=0,At=ct.length;it<At;it++)X=ct[it],rt?Tt&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,lt,C,X):e.texImage2D(i.TEXTURE_2D,it,K,lt,C,X);M.generateMipmaps=!1}else if(rt){if(ot){let it=Ut(J);e.texStorage2D(i.TEXTURE_2D,Ht,K,it.width,it.height)}Tt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,C,J)}else e.texImage2D(i.TEXTURE_2D,0,K,lt,C,J);b(M)&&M.mipmapsAutoUpdate===!0&&v(et),ut.__version=at.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function fn(A,M,z){if(M.image.length!==6)return;let et=se(A,M),Q=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+z);let at=n.get(Q);if(Q.version!==at.__version||et===!0){e.activeTexture(i.TEXTURE0+z);let ut=Jt.getPrimaries(Jt.workingColorSpace),Z=M.colorSpace===Mi?null:Jt.getPrimaries(M.colorSpace),J=M.colorSpace===Mi||ut===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let lt=M.isCompressedTexture||M.image[0].isCompressedTexture,C=M.image[0]&&M.image[0].isDataTexture,K=[];for(let pt=0;pt<6;pt++)!lt&&!C?K[pt]=y(M.image[pt],!0,s.maxCubemapSize):K[pt]=C?M.image[pt].image:M.image[pt],K[pt]=It(M,K[pt]);let X=K[0],ct=r.convert(M.format,M.colorSpace),rt=r.convert(M.type),ot=T(M.internalFormat,ct,rt,M.normalized,M.colorSpace),Tt=M.isVideoTexture!==!0,Ht=at.__version===void 0||et===!0,it=Q.dataReady,At=E(M,X);ee(i.TEXTURE_CUBE_MAP,M);let kt;if(M.isDepthTexture){if(ot=x(M.format===vi,M.type),Ht)if(Tt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,ot,X.width,X.height);else for(let pt=0;pt<6;pt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,ot,X.width,X.height,0,ct,rt,null)}else if(lt){Tt&&Ht&&e.texStorage2D(i.TEXTURE_CUBE_MAP,At,ot,X.width,X.height);for(let pt=0;pt<6;pt++){kt=K[pt].mipmaps;for(let ne=0;ne<kt.length;ne++){let Be=kt[ne];M.format!==Wn?ct!==null?Tt?it&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ne,0,0,Be.width,Be.height,ct,Be.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ne,ot,Be.width,Be.height,0,Be.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Tt?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ne,0,0,Be.width,Be.height,ct,rt,Be.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ne,ot,Be.width,Be.height,0,ct,rt,Be.data)}}}else{if(kt=M.mipmaps,Tt&&Ht){kt.length>0&&At++;let pt=Ut(K[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,At,ot,pt.width,pt.height)}for(let pt=0;pt<6;pt++)if(C){Tt?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,K[pt].width,K[pt].height,ct,rt,K[pt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,ot,K[pt].width,K[pt].height,0,ct,rt,K[pt].data);for(let ne=0;ne<kt.length;ne++){let wi=kt[ne].image[pt].image;Tt?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ne+1,0,0,wi.width,wi.height,ct,rt,wi.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ne+1,ot,wi.width,wi.height,0,ct,rt,wi.data)}}else{Tt?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,ct,rt,K[pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,ot,ct,rt,K[pt]);for(let ne=0;ne<kt.length;ne++){let Be=kt[ne];Tt?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ne+1,0,0,ct,rt,Be.image[pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ne+1,ot,ct,rt,Be.image[pt])}}}b(M)&&M.mipmapsAutoUpdate===!0&&v(i.TEXTURE_CUBE_MAP),at.__version=Q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function xe(A,M,z,et,Q,at){let ut=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),J=T(z.internalFormat,ut,Z,z.normalized,z.colorSpace),lt=n.get(M),C=n.get(z);if(C.__renderTarget=M,!lt.__hasExternalTextures){let K=Math.max(1,M.width>>at),X=Math.max(1,M.height>>at);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,at,J,K,X,M.depth,0,ut,Z,null):e.texImage2D(Q,at,J,K,X,0,ut,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),ft(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,Q,C.__webglTexture,0,ge(M)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,et,Q,C.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Yn(A,M,z){if(i.bindRenderbuffer(i.RENDERBUFFER,A),M.depthBuffer){let et=M.depthTexture,Q=et&&et.isDepthTexture?et.type:null,at=x(M.stencilBuffer,Q),ut=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ft(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(M),at,M.width,M.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(M),at,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,at,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ut,i.RENDERBUFFER,A)}else{let et=M.textures;for(let Q=0;Q<et.length;Q++){let at=et[Q],ut=r.convert(at.format,at.colorSpace),Z=r.convert(at.type),J=T(at.internalFormat,ut,Z,at.normalized,at.colorSpace);ft(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(M),J,M.width,M.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(M),J,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,J,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Oe(A,M,z){let et=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(M.depthTexture);Q.__renderTarget=M;let at=et?M.depthTexture.image[0]:M.depthTexture.image;(!Q.__webglTexture||at.width!==M.width||at.height!==M.height)&&(at.width=M.width,at.height=M.height,M.depthTexture.needsUpdate=!0),et?_t(M.depthTexture,0):gt(M.depthTexture,0);let ut=Q.__webglTexture,Z=ge(M),J=et?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,lt=M.depthTexture.format===vi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(M.depthTexture.format===gi)ft(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,J,ut,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,lt,J,ut,0);else if(M.depthTexture.format===vi)ft(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,J,ut,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,lt,J,ut,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function En(A){let M=n.get(A),z=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){let et=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),et){let Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,et.removeEventListener("dispose",Q)};et.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=et}if(A.depthTexture&&!M.__autoAllocateDepthBuffer)if(z)for(let et=0;et<6;et++)Oe(M.__webglFramebuffer[et],A,et);else A.texture.mipmaps.length>0?Oe(M.__webglFramebuffer[0],A,0):Oe(M.__webglFramebuffer,A,0);else if(z){M.__webglDepthbuffer=[];for(let et=0;et<6;et++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[et]),M.__webglDepthbuffer[et]===void 0)M.__webglDepthbuffer[et]=i.createRenderbuffer(),Yn(M.__webglDepthbuffer[et],A,!1);else{let Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=M.__webglDepthbuffer[et];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,at)}}else if(A.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),Yn(M.__webglDepthbuffer,A,!1);else{let Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,at)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Tn(A,M,z){let et=n.get(A);M!==void 0&&xe(et.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&En(A)}function wn(A){let M=A.texture,z=n.get(A),et=n.get(M);A.addEventListener("dispose",O),N(A);let Q=A.textures,at=A.isWebGLCubeRenderTarget===!0,ut=Q.length>1;if(ut||(et.__webglTexture===void 0&&(et.__webglTexture=i.createTexture()),et.__version=M.version,a.memory.textures++),at){z.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(M.mipmaps.length>0){z.__webglFramebuffer[Z]=[];for(let J=0;J<M.mipmaps.length;J++)z.__webglFramebuffer[Z][J]=i.createFramebuffer()}else z.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(M.mipmaps.length>0){z.__webglFramebuffer=[];for(let Z=0;Z<M.mipmaps.length;Z++)z.__webglFramebuffer[Z]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(ut)for(let Z=0,J=Q.length;Z<J;Z++){let lt=n.get(Q[Z]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&ft(A)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Z=0;Z<Q.length;Z++){let J=Q[Z];z.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[Z]);let lt=r.convert(J.format,J.colorSpace),C=r.convert(J.type),K=T(J.internalFormat,lt,C,J.normalized,J.colorSpace,A.isXRRenderTarget===!0),X=ge(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,X,K,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,z.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Yn(z.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,et.__webglTexture),ee(i.TEXTURE_CUBE_MAP,M);for(let Z=0;Z<6;Z++)if(M.mipmaps.length>0)for(let J=0;J<M.mipmaps.length;J++)xe(z.__webglFramebuffer[Z][J],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,J);else xe(z.__webglFramebuffer[Z],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);b(M)?v(i.TEXTURE_CUBE_MAP):M.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}else if(ut){for(let Z=0,J=Q.length;Z<J;Z++){let lt=Q[Z],C=n.get(lt),K=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(K=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,C.__webglTexture),ee(K,lt),xe(z.__webglFramebuffer,A,lt,i.COLOR_ATTACHMENT0+Z,K,0),b(lt)&&v(K)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Z=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,et.__webglTexture),ee(Z,M),M.mipmaps.length>0)for(let J=0;J<M.mipmaps.length;J++)xe(z.__webglFramebuffer[J],A,M,i.COLOR_ATTACHMENT0,Z,J);else xe(z.__webglFramebuffer,A,M,i.COLOR_ATTACHMENT0,Z,0);b(M)?v(Z):M.mipmaps.length>0&&i.texParameteri(Z,i.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}A.depthBuffer&&En(A)}function U(A){let M=A.textures;for(let z=0,et=M.length;z<et;z++){let Q=M[z];if(b(Q)&&Q.mipmapsAutoUpdate===!0){let at=w(A),ut=n.get(Q).__webglTexture;e.bindTexture(at,ut),v(at),e.unbindTexture()}}}let An=[];function me(A){if(A.samples>0){if(ft(A)===!1){let M=A.textures,z=A.width,et=A.height,Q=i.COLOR_BUFFER_BIT,at=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=n.get(A),Z=M.length>1;if(Z)for(let lt=0;lt<M.length;lt++)e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let lt=0;lt<M.length;lt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ut.__webglColorRenderbuffer[lt]);let C=n.get(M[lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,C,0)}i.blitFramebuffer(0,0,z,et,0,0,z,et,Q,i.NEAREST),l===!0&&(An.length=0,An.push(i.COLOR_ATTACHMENT0+lt),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&An.push(at),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,An))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let lt=0;lt<M.length;lt++){e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,ut.__webglColorRenderbuffer[lt]);let C=n.get(M[lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,C,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){let M=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function ge(A){return Math.min(s.maxSamples,A.samples)}function ft(A){let M=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Le(A){let M=a.render.frame;h.get(A)!==M&&(h.set(A,M),A.update())}function It(A,M){let z=A.colorSpace,et=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==vr&&z!==Mi&&(Jt.getTransfer(z)===te?(et!==Wn||Q!==pn)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Dt("WebGLTextures: Unsupported texture color space:",z)),M}function Ut(A){return typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame!="undefined"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=Ot,this.resetTextureUnits=j,this.getTextureUnits=tt,this.setTextureUnits=bt,this.setTexture2D=gt,this.setTexture2DArray=vt,this.setTexture3D=Ct,this.setTextureCube=_t,this.rebindTextures=Tn,this.setupRenderTarget=wn,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=En,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ft,this.dispose=V}function ax(i,t){function e(n,s=Mi){let r,a=Jt.getTransfer(s);if(n===pn)return i.UNSIGNED_BYTE;if(n===$o)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ko)return i.UNSIGNED_SHORT_5_5_5_1;if(n===th)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===eh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Qc)return i.BYTE;if(n===jc)return i.SHORT;if(n===Js)return i.UNSIGNED_SHORT;if(n===Jo)return i.INT;if(n===Gn)return i.UNSIGNED_INT;if(n===Ln)return i.FLOAT;if(n===Vn)return i.HALF_FLOAT;if(n===nh)return i.ALPHA;if(n===ih)return i.RGB;if(n===Wn)return i.RGBA;if(n===gi)return i.DEPTH_COMPONENT;if(n===vi)return i.DEPTH_STENCIL;if(n===Qo)return i.RED;if(n===jo)return i.RED_INTEGER;if(n===Hi)return i.RG;if(n===tl)return i.RG_INTEGER;if(n===el)return i.RGBA_INTEGER;if(n===sa||n===ra||n===aa||n===oa)if(a===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ra)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===nl||n===il||n===sl||n===rl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===nl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===il)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===sl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===rl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===al||n===ol||n===ll||n===cl||n===hl||n===la||n===ul)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===al||n===ol)return a===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ll)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===cl)return r.COMPRESSED_R11_EAC;if(n===hl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===la)return r.COMPRESSED_RG11_EAC;if(n===ul)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===xl||n===yl||n===vl||n===Ml||n===Sl||n===bl||n===El||n===Tl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===dl)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fl)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===pl)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ml)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===gl)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_l)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xl)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===yl)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vl)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ml)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Sl)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bl)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===El)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Tl)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wl||n===Al||n===Rl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===wl)return a===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Al)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Rl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Cl||n===Il||n===ca||n===Pl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Cl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ca)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var ox=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ah=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Or(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Pn({vertexShader:ox,fragmentShader:lx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new wt(new ei(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Rh=class extends $n{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,p=null,u=null,g=null,_=typeof XRWebGLBinding!="undefined",f=new Ah,m={},y=e.getContextAttributes(),b=null,v=null,w=[],T=[],x=new st,E=null,N=null,I=new Ke;I.viewport=new _e;let F=new Ke;F.viewport=new _e;let O=[I,F],W=new Wo,P=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let gt=w[$];return gt===void 0&&(gt=new Fs,w[$]=gt),gt.getTargetRaySpace()},this.getControllerGrip=function($){let gt=w[$];return gt===void 0&&(gt=new Fs,w[$]=gt),gt.getGripSpace()},this.getHand=function($){let gt=w[$];return gt===void 0&&(gt=new Fs,w[$]=gt),gt.getHandSpace()};function Y($){let gt=T.indexOf($.inputSource);if(gt===-1)return;let vt=w[gt];vt!==void 0&&(vt.update($.inputSource,$.frame,c||a),vt.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",nt);for(let $=0;$<w.length;$++){let gt=T[$];gt!==null&&(T[$]=null,w[$].disconnect(gt))}P=null,V=null,f.reset();for(let $ in m)delete m[$];if(t.setRenderTarget(b),u=null,p=null,d=null,s=null,v=null,Ot.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(x.width,x.height,!1),N!==null){let $=N.camera;$.fov=N.fov,$.zoom=N.zoom,$.updateProjectionMatrix(),N=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return p!==null?p:u},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",G),s.addEventListener("inputsourceschange",nt),y.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let vt=null,Ct=null,_t=null;y.depth&&(_t=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,vt=y.stencil?vi:gi,Ct=y.stencil?ss:Gn);let zt={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:r};d=this.getBinding(),p=d.createProjectionLayer(zt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),v=new xn(p.textureWidth,p.textureHeight,{format:Wn,type:pn,depthTexture:new xi(p.textureWidth,p.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,vt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}else{let vt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,e,vt),s.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),v=new xn(u.framebufferWidth,u.framebufferHeight,{format:Wn,type:pn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ot.setContext(s),Ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function nt($){for(let gt=0;gt<$.removed.length;gt++){let vt=$.removed[gt],Ct=T.indexOf(vt);Ct>=0&&(T[Ct]=null,w[Ct].disconnect(vt))}for(let gt=0;gt<$.added.length;gt++){let vt=$.added[gt],Ct=T.indexOf(vt);if(Ct===-1){for(let zt=0;zt<w.length;zt++)if(zt>=T.length){T.push(vt),Ct=zt;break}else if(T[zt]===null){T[zt]=vt,Ct=zt;break}if(Ct===-1)break}let _t=w[Ct];_t&&_t.connect(vt)}}function q($,gt){gt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(gt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let gt=$.near,vt=$.far;f.texture!==null&&(f.depthNear>0&&(gt=f.depthNear),f.depthFar>0&&(vt=f.depthFar)),W.near=F.near=I.near=gt,W.far=F.far=I.far=vt,(P!==W.near||V!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),P=W.near,V=W.far),W.layers.mask=$.layers.mask|6,I.layers.mask=W.layers.mask&-5,F.layers.mask=W.layers.mask&-3;let Ct=$.parent,_t=W.cameras;q(W,Ct);for(let zt=0;zt<_t.length;zt++)q(_t[zt],Ct);W.projectionMatrix.copy(I.projectionMatrix),W.projectionMatrixInverse.copy(I.projectionMatrixInverse),N===null&&$.isPerspectiveCamera&&(N={camera:$,fov:$.fov,zoom:$.zoom}),j($,W,Ct)};function j($,gt,vt){vt===null?$.matrix.copy(gt.matrixWorld):($.matrix.copy(vt.matrixWorld),$.matrix.invert(),$.matrix.multiply(gt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(gt.projectionMatrix),$.projectionMatrixInverse.copy(gt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=go*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(p===null&&u===null))return l},this.setFoveation=function($){l=$,p!==null&&(p.fixedFoveation=$),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=$)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(W)},this.getCameraTexture=function($){return m[$]};let tt=null;function bt($,gt){if(h=gt.getViewerPose(c||a),g=gt,h!==null){let vt=h.views;u!==null&&(t.setRenderTargetFramebuffer(v,u.framebuffer),t.setRenderTarget(v));let Ct=!1;vt.length!==W.cameras.length&&(W.cameras.length=0,Ct=!0);for(let Lt=0;Lt<vt.length;Lt++){let ee=vt[Lt],se=null;if(u!==null)se=u.getViewport(ee);else{let Xe=d.getViewSubImage(p,ee);se=Xe.viewport,Lt===0&&(t.setRenderTargetTextures(v,Xe.colorTexture,Xe.depthStencilTexture),t.setRenderTarget(v))}let qt=O[Lt];qt===void 0&&(qt=new Ke,qt.layers.enable(Lt),qt.viewport=new _e,O[Lt]=qt),qt.matrix.fromArray(ee.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(ee.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(se.x,se.y,se.width,se.height),Lt===0&&(W.matrix.copy(qt.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Ct===!0&&W.cameras.push(qt)}let _t=s.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let Lt=d.getDepthInformation(vt[0]);Lt&&Lt.isValid&&Lt.texture&&f.init(Lt,s.renderState)}if(_t&&_t.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let Lt=0;Lt<vt.length;Lt++){let ee=vt[Lt].camera;if(ee){let se=m[ee];se||(se=new Or,m[ee]=se);let qt=d.getCameraImage(ee);se.sourceTexture=qt}}}}for(let vt=0;vt<w.length;vt++){let Ct=T[vt],_t=w[vt];Ct!==null&&_t!==void 0&&_t.update(Ct,gt,c||a)}tt&&tt($,gt),gt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:gt}),g=null}let Ot=new Jd;Ot.setAnimationLoop(bt),this.setAnimationLoop=function($){tt=$},this.dispose=function(){}}},cx=new Qt,af=new Nt;af.set(-1,0,0,0,1,0,0,0,1);function hx(i,t){function e(f,m){f.matrixAutoUpdate===!0&&f.updateMatrix(),m.value.copy(f.matrix)}function n(f,m){m.color.getRGB(f.fogColor.value,hh(i)),m.isFog?(f.fogNear.value=m.near,f.fogFar.value=m.far):m.isFogExp2&&(f.fogDensity.value=m.density)}function s(f,m,y,b,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(f,m):m.isMeshLambertMaterial?(r(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(f,m),d(f,m)):m.isMeshPhongMaterial?(r(f,m),h(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(f,m),p(f,m),m.isMeshPhysicalMaterial&&u(f,m,v)):m.isMeshMatcapMaterial?(r(f,m),g(f,m)):m.isMeshDepthMaterial?r(f,m):m.isMeshDistanceMaterial?(r(f,m),_(f,m)):m.isMeshNormalMaterial?r(f,m):m.isLineBasicMaterial?(a(f,m),m.isLineDashedMaterial&&o(f,m)):m.isPointsMaterial?l(f,m,y,b):m.isSpriteMaterial?c(f,m):m.isShadowMaterial?(f.color.value.copy(m.color),f.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(f,m){f.opacity.value=m.opacity,m.color&&f.diffuse.value.copy(m.color),m.emissive&&f.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(f.map.value=m.map,e(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.bumpMap&&(f.bumpMap.value=m.bumpMap,e(m.bumpMap,f.bumpMapTransform),f.bumpScale.value=m.bumpScale,m.side===on&&(f.bumpScale.value*=-1)),m.normalMap&&(f.normalMap.value=m.normalMap,e(m.normalMap,f.normalMapTransform),f.normalScale.value.copy(m.normalScale),m.side===on&&f.normalScale.value.negate()),m.displacementMap&&(f.displacementMap.value=m.displacementMap,e(m.displacementMap,f.displacementMapTransform),f.displacementScale.value=m.displacementScale,f.displacementBias.value=m.displacementBias),m.emissiveMap&&(f.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,f.emissiveMapTransform)),m.specularMap&&(f.specularMap.value=m.specularMap,e(m.specularMap,f.specularMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest);let y=t.get(m),b=y.envMap,v=y.envMapRotation;b&&(f.envMap.value=b,f.envMapRotation.value.setFromMatrix4(cx.makeRotationFromEuler(v)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(af),f.reflectivity.value=m.reflectivity,f.ior.value=m.ior,f.refractionRatio.value=m.refractionRatio),m.lightMap&&(f.lightMap.value=m.lightMap,f.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,f.lightMapTransform)),m.aoMap&&(f.aoMap.value=m.aoMap,f.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,f.aoMapTransform))}function a(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,m.map&&(f.map.value=m.map,e(m.map,f.mapTransform))}function o(f,m){f.dashSize.value=m.dashSize,f.totalSize.value=m.dashSize+m.gapSize,f.scale.value=m.scale}function l(f,m,y,b){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.size.value=m.size*y,f.scale.value=b*.5,m.map&&(f.map.value=m.map,e(m.map,f.uvTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function c(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.rotation.value=m.rotation,m.map&&(f.map.value=m.map,e(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function h(f,m){f.specular.value.copy(m.specular),f.shininess.value=Math.max(m.shininess,1e-4)}function d(f,m){m.gradientMap&&(f.gradientMap.value=m.gradientMap)}function p(f,m){f.metalness.value=m.metalness,m.metalnessMap&&(f.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,f.metalnessMapTransform)),f.roughness.value=m.roughness,m.roughnessMap&&(f.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,f.roughnessMapTransform)),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)}function u(f,m,y){f.ior.value=m.ior,m.diffuseRoughness>0&&(f.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=m.diffuseRoughnessMap,e(m.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),m.sheen>0&&(f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),f.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(f.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,f.sheenColorMapTransform)),m.sheenRoughnessMap&&(f.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,f.sheenRoughnessMapTransform))),m.clearcoat>0&&(f.clearcoat.value=m.clearcoat,f.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(f.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,f.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(f.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===on&&f.clearcoatNormalScale.value.negate())),m.dispersion>0&&(f.dispersion.value=m.dispersion),m.retroreflectivity>0&&(f.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(f.iridescence.value=m.iridescence,f.iridescenceIOR.value=m.iridescenceIOR,f.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,f.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(f.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,f.iridescenceMapTransform)),m.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),m.transmission>0&&(f.transmission.value=m.transmission,f.transmissionSamplerMap.value=y.texture,f.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(f.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,f.transmissionMapTransform)),f.thickness.value=m.thickness,m.thicknessMap&&(f.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=m.attenuationDistance,f.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(f.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(f.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=m.specularIntensity,f.specularColor.value.copy(m.specularColor),m.specularColorMap&&(f.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,f.specularColorMapTransform)),m.specularIntensityMap&&(f.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,m){m.matcap&&(f.matcap.value=m.matcap)}function _(f,m){let y=t.get(m).light;f.referencePosition.value.setFromMatrixPosition(y.matrixWorld),f.nearDistance.value=y.shadow.camera.near,f.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ux(i,t,e,n){let s={},r={};function a(y,b){let v=b.program;n.uniformBlockBinding(y,v,s[y.id])}function o(y,b){let v=s[y.id];v===void 0&&(g(y),v=l(y),s[y.id]=v,y.addEventListener("dispose",f));let w=b.program;n.updateUBOMapping(y,w);let T=t.render.frame;r[y.id]!==T&&(c(y),r[y.id]=T)}function l(y){let b=i.createBuffer(),v=y.__size,w=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,v,w),i.bindBuffer(i.UNIFORM_BUFFER,null),b}function c(y){let b=s[y.id],v=y.uniforms,w=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let T=0,x=v.length;T<x;T++){let E=v[T];if(Array.isArray(E))for(let N=0,I=E.length;N<I;N++)h(E[N],T,N,w);else h(E,T,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(y,b,v,w){if(p(y,b,v,w)===!0){let T=y.__offset,x=y.value;if(Array.isArray(x)){let E=0;for(let N=0;N<x.length;N++){let I=x[N],F=_(I,!0);d(I,y.__data,E),E+=F.storage/Float32Array.BYTES_PER_ELEMENT}}else d(x,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,T,y.__data)}}function d(y,b,v){typeof y=="number"||typeof y=="boolean"?b[v]=y:y.isMatrix3?(b[v]=y.elements[0],b[v+1]=y.elements[1],b[v+2]=y.elements[2],b[v+3]=0,b[v+4]=y.elements[3],b[v+5]=y.elements[4],b[v+6]=y.elements[5],b[v+7]=0,b[v+8]=y.elements[6],b[v+9]=y.elements[7],b[v+10]=y.elements[8],b[v+11]=0):ArrayBuffer.isView(y)?b.set(y.subarray(0,b.length-v),v):y.toArray(b,v)}function p(y,b,v,w){let T=y.value,x=b+"_"+v;if(Array.isArray(T)){w[x]===void 0&&(w[x]=[]);let E=w[x],N=!1;for(let I=0;I<T.length;I++)u(T[I],E,I)===!0&&(N=!0);return N}return u(T,w,x)}function u(y,b,v){if(b[v]===void 0)return typeof y=="number"||typeof y=="boolean"?b[v]=y:ArrayBuffer.isView(y)?b[v]=y.slice():b[v]=y.clone(),!0;{let w=b[v];if(typeof y=="number"||typeof y=="boolean"){if(w!==y)return b[v]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(w.equals(y)===!1)return w.copy(y),!0}}return!1}function g(y){let b=y.uniforms,v=0,w=16;for(let x=0,E=b.length;x<E;x++){let N=Array.isArray(b[x])?b[x]:[b[x]];for(let I=0,F=N.length;I<F;I++){let O=N[I],W=Array.isArray(O.value)?O.value:[O.value],P=Array.isArray(b[x])||Array.isArray(O.value),V=v;for(let G=0,nt=W.length;G<nt;G++){let q=W[G],j=_(q,P),tt=v%w,bt=tt%j.boundary,Ot=tt+bt;v+=bt,Ot!==0&&w-Ot<j.storage&&(v+=w-Ot),G===0&&(V=v),v+=j.storage}let Y=O.type==="int"?Int32Array:O.type==="uint"?Uint32Array:Float32Array;O.__data=new Y((v-V)/Float32Array.BYTES_PER_ELEMENT),O.__offset=V}}let T=v%w;return T>0&&(v+=w-T),y.__size=v,y.__cache={},this}function _(y,b){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=16,v.storage=48):y.isMatrix4?(v.boundary=16,v.storage=64):y.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(v.boundary=16,v.storage=y.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",y),b===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function f(y){let b=y.target;b.removeEventListener("dispose",f),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function m(){for(let y in s)i.deleteBuffer(s[y]);s={},r={}}return{bind:a,update:o,dispose:m}}var dx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ii=null;function fx(){return ii===null&&(ii=new Pr(dx,16,16,Hi,Vn),ii.name="DFG_LUT",ii.minFilter=sn,ii.magFilter=sn,ii.wrapS=Jn,ii.wrapT=Jn,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}var Ol=class{constructor(t={}){let{canvas:e=dd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:p=!1,outputBufferType:u=pn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let _=u,f=new Set([el,tl,jo]),m=new Set([pn,Gn,Js,ss,$o,Ko]),y=new Uint32Array(4),b=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},w=null,T=null,x=[],E=[],N=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,F=!1,O=null,W=null,P=null,V=null;this._outputColorSpace=nn;let Y=0,G=0,nt=null,q=-1,j=null,tt=new _e,bt=new _e,Ot=null,$=new Ft(0),gt=0,vt=e.width,Ct=e.height,_t=1,zt=null,we=null,Lt=new _e(0,0,vt,Ct),ee=new _e(0,0,vt,Ct),se=!1,qt=new Di,Xe=new Mo,Pe=!1,fn=!1,xe=new Qt,Yn=new D,Oe=new _e,En={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Tn=!1;function wn(){return nt===null?_t:1}let U=n;function An(S,L){return e.getContext(S,L)}let me,ge,ft,Le,It,Ut,A,M,z,et,Q,at,ut,Z,J,lt,C,K,X,ct,rt,ot,Tt;try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",At,!1),e.addEventListener("webglcontextrestored",kt,!1),e.addEventListener("webglcontextcreationerror",pt,!1),U===null){let L="webgl2";if(U=An(L,S),U===null)throw An(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ht()}catch(S){throw e.removeEventListener("webglcontextlost",At,!1),e.removeEventListener("webglcontextrestored",kt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),Dt("WebGLRenderer: "+S.message),S}function Ht(){me=new E0(U),me.init(),rt=new ax(U,me),ge=new f0(U,me,t,rt),ft=new sx(U,me),ge.reversedDepthBuffer&&p&&ft.buffers.depth.setReversed(!0),W=U.createFramebuffer(),P=U.createFramebuffer(),V=U.createFramebuffer(),Le=new A0(U),It=new W_,Ut=new rx(U,me,ft,It,ge,rt,Le),A=new b0(I),M=new Cp(U),ot=new u0(U,M),z=new T0(U,M,Le,ot),et=new C0(U,z,M,ot,Le),K=new R0(U,ge,Ut),J=new p0(It),Q=new V_(I,A,me,ge,ot,J),at=new hx(I,It),ut=new q_,Z=new Q_(me),C=new h0(I,A,ft,et,g,l),lt=new ix(I,et,ge),Tt=new ux(U,Le,ge,ft),X=new d0(U,me,Le),ct=new w0(U,me,Le),Le.programs=Q.programs,I.capabilities=ge,I.extensions=me,I.properties=It,I.renderLists=ut,I.shadowMap=lt,I.state=ft,I.info=Le}_!==pn&&(N=new P0(_,e.width,e.height,o,s,r));let it=new Rh(I,U);this.xr=it,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let S=me.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=me.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return _t},this.setPixelRatio=function(S){S!==void 0&&(_t=S,this.setSize(vt,Ct,!1))},this.getSize=function(S){return S.set(vt,Ct)},this.setSize=function(S,L,H=!0){if(it.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}vt=S,Ct=L,e.width=Math.floor(S*_t),e.height=Math.floor(L*_t),H===!0&&(e.style.width=S+"px",e.style.height=L+"px"),N!==null&&N.setSize(e.width,e.height),this.setViewport(0,0,S,L)},this.getDrawingBufferSize=function(S){return S.set(vt*_t,Ct*_t).floor()},this.setDrawingBufferSize=function(S,L,H){vt=S,Ct=L,_t=H,e.width=Math.floor(S*H),e.height=Math.floor(L*H),this.setViewport(0,0,S,L)},this.setEffects=function(S){if(_===pn){Dt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let L=0;L<S.length;L++)if(S[L].isOutputPass===!0){Rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(tt)},this.getViewport=function(S){return S.copy(Lt)},this.setViewport=function(S,L,H,B){S.isVector4?Lt.set(S.x,S.y,S.z,S.w):Lt.set(S,L,H,B),ft.viewport(tt.copy(Lt).multiplyScalar(wn()).round())},this.getScissor=function(S){return S.copy(ee)},this.setScissor=function(S,L,H,B){S.isVector4?ee.set(S.x,S.y,S.z,S.w):ee.set(S,L,H,B),ft.scissor(bt.copy(ee).multiplyScalar(wn()).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(S){ft.setScissorTest(se=S)},this.setOpaqueSort=function(S){zt=S},this.setTransparentSort=function(S){we=S},this.getClearColor=function(S){return S.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(S=!0,L=!0,H=!0){let B=0;if(S){let k=!1;if(nt!==null){let dt=nt.texture.format;k=f.has(dt)}if(k){let dt=nt.texture.type,yt=m.has(dt),ht=C.getClearColor(),xt=C.getClearAlpha(),Et=ht.r,Bt=ht.g,Yt=ht.b;yt?(y[0]=Et,y[1]=Bt,y[2]=Yt,y[3]=xt,U.clearBufferuiv(U.COLOR,0,y)):(b[0]=Et,b[1]=Bt,b[2]=Yt,b[3]=xt,U.clearBufferiv(U.COLOR,0,b))}else B|=U.COLOR_BUFFER_BIT}L&&(B|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(B|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),O=S},this.dispose=function(){e.removeEventListener("webglcontextlost",At,!1),e.removeEventListener("webglcontextrestored",kt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),C.dispose(),ut.dispose(),Z.dispose(),Ut.dispose(),It.dispose(),A.dispose(),et.dispose(),z.dispose(),ot.dispose(),Tt.dispose(),Q.dispose(),it.dispose(),it.removeEventListener("sessionstart",Oh),it.removeEventListener("sessionend",Bh),Vi.stop()};function At(S){S.preventDefault(),br("WebGLRenderer: Context Lost."),F=!0}function kt(){br("WebGLRenderer: Context Restored."),F=!1;let S=Le.autoReset,L=lt.enabled,H=lt.autoUpdate,B=lt.needsUpdate,k=lt.type;Ht(),Le.autoReset=S,lt.enabled=L,lt.autoUpdate=H,lt.needsUpdate=B,lt.type=k}function pt(S){Dt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ne(S){let L=S.target;L.removeEventListener("dispose",ne),Be(L)}function Be(S){wi(S),It.remove(S)}function wi(S){let L=It.get(S).programs;L!==void 0&&(L.forEach(function(H){Q.releaseProgram(H)}),S.isShaderMaterial&&Q.releaseShaderCache(S))}this.renderBufferDirect=function(S,L,H,B,k,dt){L===null&&(L=En);let yt=k.isMesh&&k.matrixWorld.determinantAffine()<0,ht=xf(S,L,H,B,k);ft.setMaterial(B,yt);let xt=H.index,Et=1;if(B.wireframe===!0){if(xt=z.getWireframeAttribute(H),xt===void 0)return;Et=2}let Bt=H.drawRange,Yt=H.attributes.position,Mt=Bt.start*Et,Zt=(Bt.start+Bt.count)*Et;dt!==null&&(Mt=Math.max(Mt,dt.start*Et),Zt=Math.min(Zt,(dt.start+dt.count)*Et)),xt!==null?(Mt=Math.max(Mt,0),Zt=Math.min(Zt,xt.count)):Yt!=null&&(Mt=Math.max(Mt,0),Zt=Math.min(Zt,Yt.count));let Ae=Zt-Mt;if(Ae<0||Ae===1/0)return;ot.setup(k,B,ht,H,xt);let oe,re=X;if(xt!==null&&(oe=M.get(xt),re=ct,re.setIndex(oe)),k.isMesh)B.wireframe===!0?(ft.setLineWidth(B.wireframeLinewidth*wn()),re.setMode(U.LINES)):re.setMode(U.TRIANGLES);else if(k.isLine){let Ye=B.linewidth;Ye===void 0&&(Ye=1),ft.setLineWidth(Ye*wn()),k.isLineSegments?re.setMode(U.LINES):k.isLineLoop?re.setMode(U.LINE_LOOP):re.setMode(U.LINE_STRIP)}else k.isPoints?re.setMode(U.POINTS):k.isSprite&&re.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(me.get("WEBGL_multi_draw"))re.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Ye=k._multiDrawStarts,St=k._multiDrawCounts,tn=k._multiDrawCount,jt=xt?M.get(xt).bytesPerElement:1,Wi=It.get(B).currentProgram.getUniforms();for(let Ze=0;Ze<tn;Ze++)Wi.setValue(U,"_gl_DrawID",Ze),re.render(Ye[Ze]/jt,St[Ze])}else if(k.isInstancedMesh)re.renderInstances(Mt,Ae,k.count);else if(H.isInstancedBufferGeometry){let Ye=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,St=Math.min(H.instanceCount,Ye);re.renderInstances(Mt,Ae,St)}else re.render(Mt,Ae)};function Fh(S,L,H,B){O!==null&&S.isNodeMaterial&&O.setObject(B,S),Pe===!0&&J.setState(S,H,!1),S.transparent===!0&&S.side===Qe&&S.forceSinglePass===!1?(S.side=on,S.needsUpdate=!0,sr(S,L,B),S.side=zi,S.needsUpdate=!0,sr(S,L,B),S.side=Qe):sr(S,L,B)}this.compile=function(S,L,H=null){H===null&&(H=S),O!==null&&O.renderStart(S,L,H),T=Z.get(H),T.init(L),E.push(T),H.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),S!==H&&S.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),T.setupLights(),O!==null&&O.updateLights(T.state.lightsArray),fn=this.localClippingEnabled,Pe=J.init(this.clippingPlanes,fn),Pe===!0&&J.setGlobalState(this.clippingPlanes,L),O!==null&&lt.render(T.state.shadowsArray,H,L);let B=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let dt=k.material;if(dt)if(Array.isArray(dt))for(let yt=0;yt<dt.length;yt++){let ht=dt[yt];Fh(ht,H,L,k),B.add(ht)}else Fh(dt,H,L,k),B.add(dt)}),T=E.pop(),O!==null&&O.renderEnd(),B},this.compileAsync=function(S,L,H=null){let B=this.compile(S,L,H);return new Promise(k=>{function dt(){if(B.forEach(function(yt){let xt=It.get(yt).currentProgram;(xt===void 0||xt.isReady())&&B.delete(yt)}),B.size===0){k(S);return}setTimeout(dt,10)}me.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let Ql=null;function gf(S){Ql&&Ql(S)}function Oh(){Vi.stop()}function Bh(){Vi.start()}let Vi=new Jd;Vi.setAnimationLoop(gf),typeof self!="undefined"&&Vi.setContext(self),this.setAnimationLoop=function(S){Ql=S,it.setAnimationLoop(S),S===null?Vi.stop():Vi.start()},it.addEventListener("sessionstart",Oh),it.addEventListener("sessionend",Bh),this.render=function(S,L){if(L!==void 0&&L.isCamera!==!0){Dt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;O!==null&&O.renderStart(S,L);let H=it.enabled===!0&&it.isPresenting===!0,B=N!==null&&(nt===null||H)&&N.begin(I,nt);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(it.cameraAutoUpdate===!0&&it.updateCamera(L),L=it.getCamera()),S.isScene===!0&&S.onBeforeRender(I,S,L,nt),T=Z.get(S,E.length),T.init(L),T.state.textureUnits=Ut.getTextureUnits(),E.push(T),xe.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),L.isArrayCamera?Xe.setFromArrayCamera(L):qt.setFromProjectionMatrix(xe,Cn,L.reversedDepth),fn=this.localClippingEnabled,Pe=J.init(this.clippingPlanes,fn),w=ut.get(S,x.length),w.init(),x.push(w),this.info.render.frame++,it.enabled===!0&&it.isPresenting===!0){let yt=I.xr.getDepthSensingMesh();yt!==null&&jl(yt,L,-1/0,I.sortObjects)}jl(S,L,0,I.sortObjects),w.finish(),O!==null&&O.updateLights(T.state.lightsArray),I.sortObjects===!0&&w.sort(zt,we),Tn=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Tn&&C.addToRenderList(w,S),this.info.autoReset===!0&&this.info.reset(),Pe===!0&&J.beginShadows();let k=T.state.shadowsArray;if(lt.render(k,S,L),Pe===!0&&J.endShadows(),(B&&N.hasRenderPass())===!1){let yt=w.opaque,ht=w.transmissive;if(T.setupLights(),L.isArrayCamera){let xt=L.cameras;if(ht.length>0)for(let Et=0,Bt=xt.length;Et<Bt;Et++){let Yt=xt[Et];kh(yt,ht,S,Yt)}Tn&&C.render(S);for(let Et=0,Bt=xt.length;Et<Bt;Et++){let Yt=xt[Et];zh(w,S,Yt,Yt.viewport)}}else ht.length>0&&kh(yt,ht,S,L),Tn&&C.render(S),zh(w,S,L)}nt!==null&&G===0&&(Ut.updateMultisampleRenderTarget(nt),Ut.updateRenderTargetMipmap(nt)),B&&N.end(I),S.isScene===!0&&S.onAfterRender(I,S,L),ot.resetDefaultState(),q=-1,j=null,E.pop(),E.length>0?(T=E[E.length-1],Ut.setTextureUnits(T.state.textureUnits),Pe===!0&&J.setGlobalState(I.clippingPlanes,T.state.camera)):T=null,x.pop(),x.length>0?w=x[x.length-1]:w=null,O!==null&&O.renderEnd()};function jl(S,L,H,B){if(S.visible===!1)return;if(S.layers.test(L.layers)){if(S.isGroup)H=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(L);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){let yt=L.isArrayCamera?Xe:qt;if(!S.frustumCulled||S.intersectsFrustum(yt)){B&&Oe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(xe);let ht=et.update(S),xt=S.material;xt.visible&&w.push(S,ht,xt,H,Oe.z,null,L)}}else if(S.isMesh||S.isLine||S.isPoints){let yt=L.isArrayCamera?Xe:qt;if(!S.frustumCulled||S.intersectsFrustum(yt)){let ht=et.update(S),xt=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Oe.copy(S.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Oe.copy(ht.boundingSphere.center)),Oe.applyMatrix4(S.matrixWorld).applyMatrix4(xe)),Array.isArray(xt)){let Et=ht.groups;for(let Bt=0,Yt=Et.length;Bt<Yt;Bt++){let Mt=Et[Bt],Zt=xt[Mt.materialIndex];Zt&&Zt.visible&&w.push(S,ht,Zt,H,Oe.z,Mt,L)}}else xt.visible&&w.push(S,ht,xt,H,Oe.z,null,L)}}}let dt=S.children;for(let yt=0,ht=dt.length;yt<ht;yt++)jl(dt[yt],L,H,B)}function zh(S,L,H,B){let{opaque:k,transmissive:dt,transparent:yt}=S;T.setupLightsView(H),Pe===!0&&J.setGlobalState(I.clippingPlanes,H),B&&ft.viewport(tt.copy(B)),k.length>0&&wa(k,L,H),dt.length>0&&wa(dt,L,H),yt.length>0&&wa(yt,L,H),ft.buffers.depth.setTest(!0),ft.buffers.depth.setMask(!0),ft.buffers.color.setMask(!0),ft.setPolygonOffset(!1)}function kh(S,L,H,B){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[B.id]===void 0){let Mt=me.has("EXT_color_buffer_half_float")||me.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[B.id]=new xn(1,1,{generateMipmaps:!0,type:Mt?Vn:pn,minFilter:yi,samples:Math.max(4,ge.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Jt.workingColorSpace})}let dt=T.state.transmissionRenderTarget[B.id],yt=B.viewport||tt;dt.setSize(yt.z*I.transmissionResolutionScale,yt.w*I.transmissionResolutionScale);let ht=I.getRenderTarget(),xt=I.getActiveCubeFace(),Et=I.getActiveMipmapLevel();I.setRenderTarget(dt),I.getClearColor($),gt=I.getClearAlpha(),gt<1&&I.setClearColor(16777215,.5),I.clear(),Tn&&C.render(H);let Bt=I.toneMapping;I.toneMapping=ni;let Yt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),T.setupLightsView(B),Pe===!0&&J.setGlobalState(I.clippingPlanes,B),wa(S,H,B),Ut.updateMultisampleRenderTarget(dt),Ut.updateRenderTargetMipmap(dt),me.has("WEBGL_multisampled_render_to_texture")===!1){let Mt=!1;for(let Zt=0,Ae=L.length;Zt<Ae;Zt++){let oe=L[Zt],{object:re,geometry:Ye,material:St,group:tn}=oe;if(St.side===Qe&&re.layers.test(B.layers)){let jt=St.side;St.side=on,St.needsUpdate=!0,Hh(re,H,B,Ye,St,tn),St.side=jt,St.needsUpdate=!0,Mt=!0}}Mt===!0&&(Ut.updateMultisampleRenderTarget(dt),Ut.updateRenderTargetMipmap(dt))}I.setRenderTarget(ht,xt,Et),I.setClearColor($,gt),Yt!==void 0&&(B.viewport=Yt),I.toneMapping=Bt}function wa(S,L,H){let B=L.isScene===!0?L.overrideMaterial:null;for(let k=0,dt=S.length;k<dt;k++){let yt=S[k],{object:ht,geometry:xt,group:Et}=yt,Bt=yt.material;Bt.allowOverride===!0&&B!==null&&(Bt=B),ht.layers.test(H.layers)&&Hh(ht,L,H,xt,Bt,Et)}}function Hh(S,L,H,B,k,dt){O!==null&&k.isNodeMaterial&&O.setObject(S,k),S.onBeforeRender(I,L,H,B,k,dt),S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(I,L,H,B,S,dt),k.transparent===!0&&k.side===Qe&&k.forceSinglePass===!1?(k.side=on,k.needsUpdate=!0,I.renderBufferDirect(H,L,B,k,S,dt),k.side=zi,k.needsUpdate=!0,I.renderBufferDirect(H,L,B,k,S,dt),k.side=Qe):I.renderBufferDirect(H,L,B,k,S,dt),S.onAfterRender(I,L,H,B,k,dt)}function Gh(S){let L=0;for(let H of S)H.texture!==null&&L++;return L}function sr(S,L,H){L.isScene!==!0&&(L=En);let B=It.get(S),k=T.state.lights,dt=T.state.shadowsArray,yt=k.state.version,ht=Q.getParameters(S,k.state,dt,L,H,T.state.lightProbeGridArray),xt=Q.getProgramCacheKey(ht),Et=B.programs;B.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?L.environment:null,B.fog=L.fog;let Bt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;B.envMap=A.get(S.envMap||B.environment,Bt),B.envMapRotation=B.environment!==null&&S.envMap===null?L.environmentRotation:S.envMapRotation,Et===void 0&&(S.addEventListener("dispose",ne),Et=new Map,B.programs=Et,B.programVariants=new Map);let Yt=Et.get(xt);if(Yt!==void 0){if(B.currentProgram===Yt&&B.lightsStateVersion===yt)return Wh(S,ht),Yt}else ht.uniforms=Q.getUniforms(S),O!==null&&S.isNodeMaterial&&O.build(S,H,ht),S.onBeforeCompile(ht,I),Yt=Q.acquireProgram(ht,xt),Et.set(xt,Yt),B.uniforms=ht.uniforms;let Mt=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Mt.clippingPlanes=J.uniform),Wh(S,ht),B.needsLights=vf(S),B.lightsStateVersion=yt,B.needsLights&&(Mt.ambientLightColor.value=k.state.ambient,Mt.lightProbe.value=k.state.probe,Mt.sunLights.value=k.state.sun,Mt.sunLightShadows.value=k.state.sunShadow,Mt.directionalLights.value=k.state.directional,Mt.directionalLightShadows.value=k.state.directionalShadow,Mt.spotLights.value=k.state.spot,Mt.spotLightShadows.value=k.state.spotShadow,Mt.rectAreaLights.value=k.state.rectArea,Mt.ltc_1.value=k.state.rectAreaLTC1,Mt.ltc_2.value=k.state.rectAreaLTC2,Mt.pointLights.value=k.state.point,Mt.pointLightShadows.value=k.state.pointShadow,Mt.hemisphereLights.value=k.state.hemi,Mt.sunShadowMatrix.value=k.state.sunShadowMatrix,Mt.sunShadowCascade.value=k.state.sunShadowCascade,Mt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Mt.spotLightMatrix.value=k.state.spotLightMatrix,Mt.spotLightMap.value=k.state.spotLightMap,Mt.pointShadowMatrix.value=k.state.pointShadowMatrix),B.numLightProbeGrids=Gh(T.state.lightProbeGridArray),B.currentProgram=Yt,B.uniformsList=null,Yt}function _f(S,L,H,B,k){let dt=It.get(S),yt=dt.currentProgram.id+","+B+","+k,ht=dt.programVariants.get(yt);return ht===void 0?(ht=sr(S,L,H),dt.programVariants.set(yt,ht)):(dt.currentProgram=ht,dt.uniformsList=null,dt.outputColorSpace=B,dt.toneMapping=k),ht}function Vh(S){if(S.uniformsList===null){let L=S.currentProgram.getUniforms();S.uniformsList=$s.seqWithValue(L.seq,S.uniforms)}return S.uniformsList}function Wh(S,L){let H=It.get(S);H.outputColorSpace=L.outputColorSpace,H.batching=L.batching,H.batchingColor=L.batchingColor,H.instancing=L.instancing,H.instancingColor=L.instancingColor,H.instancingMorph=L.instancingMorph,H.skinning=L.skinning,H.morphTargets=L.morphTargets,H.morphNormals=L.morphNormals,H.morphColors=L.morphColors,H.morphTargetsCount=L.morphTargetsCount,H.numClippingPlanes=L.numClippingPlanes,H.numIntersection=L.numClipIntersection,H.vertexAlphas=L.vertexAlphas,H.vertexTangents=L.vertexTangents,H.toneMapping=L.toneMapping}function xf(S,L,H,B,k){L.isScene!==!0&&(L=En),Ut.resetTextureUnits();let dt=L.fog,yt=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?L.environment:null,ht=nt===null?I.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Jt.workingColorSpace,xt=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Et=A.get(B.envMap||yt,xt),Bt=B.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Yt=!!H.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Mt=!!H.morphAttributes.position,Zt=!!H.morphAttributes.normal,Ae=!!H.morphAttributes.color,oe=ni;B.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(oe=I.toneMapping);let re=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ye=re!==void 0?re.length:0,St=It.get(B),tn=T.state.lights;if(Pe===!0&&(fn===!0||S!==j)){let ye=S===j&&B.id===q;J.setState(B,S,ye)}let jt=!1,Wi=!1;B.version===St.__version?St.needsLights&&St.lightsStateVersion!==tn.state.version||k.isBatchedMesh&&St.batching===!1||!k.isBatchedMesh&&St.batching===!0||k.isBatchedMesh&&St.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&St.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&St.instancing===!1||!k.isInstancedMesh&&St.instancing===!0||k.isSkinnedMesh&&St.skinning===!1||!k.isSkinnedMesh&&St.skinning===!0||k.isInstancedMesh&&St.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&St.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&St.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&St.instancingMorph===!1&&k.morphTexture!==null||St.envMap!==Et||B.fog===!0&&St.fog!==dt||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==J.numPlanes||St.numIntersection!==J.numIntersection)||St.vertexAlphas!==Bt||St.vertexTangents!==Yt||St.morphTargets!==Mt||St.morphNormals!==Zt||St.morphColors!==Ae||St.morphTargetsCount!==Ye||St.numLightProbeGrids!==Gh(T.state.lightProbeGridArray)?jt=!0:(St.outputColorSpace!==ht||St.toneMapping!==oe)&&(Wi=!0):(jt=!0,St.__version=B.version);let Ze=St.currentProgram;(jt===!0||Wi===!0)&&(Ze=Wi===!0?_f(B,L,k,ht,oe):sr(B,L,k),O&&B.isNodeMaterial&&O.onUpdateProgram(B,Ze,St));let Aa=!1,Ai=!1,Xi=!1,Kt=Ze.getUniforms(),qe=St.uniforms;if(ft.useProgram(Ze.program)&&(Aa=!0,Ai=!0,Xi=!0),B.id!==q&&(q=B.id,Ai=!0),Aa||j!==S){ft.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Kt.setValue(U,"projectionMatrix",S.projectionMatrix),Kt.setValue(U,"viewMatrix",S.matrixWorldInverse);let ze=Kt.map.cameraPosition;ze!==void 0&&ze.setValue(U,Yn.setFromMatrixPosition(S.matrixWorld)),ge.logarithmicDepthBuffer&&Kt.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Kt.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),j!==S&&(j=S,Ai=!0,Xi=!0)}if(St.needsLights&&(tn.state.sunShadowMap.length>0&&Kt.setValue(U,"sunShadowMap",tn.state.sunShadowMap,Ut),tn.state.directionalShadowMap.length>0&&Kt.setValue(U,"directionalShadowMap",tn.state.directionalShadowMap,Ut),tn.state.spotShadowMap.length>0&&Kt.setValue(U,"spotShadowMap",tn.state.spotShadowMap,Ut),tn.state.pointShadowMap.length>0&&Kt.setValue(U,"pointShadowMap",tn.state.pointShadowMap,Ut)),k.isSkinnedMesh){Kt.setOptional(U,k,"bindMatrix"),Kt.setOptional(U,k,"bindMatrixInverse");let ye=k.skeleton;ye&&(ye.boneTexture===null&&ye.computeBoneTexture(),Kt.setValue(U,"boneTexture",ye.boneTexture,Ut))}k.isBatchedMesh&&(Kt.setOptional(U,k,"batchingTexture"),Kt.setValue(U,"batchingTexture",k._matricesTexture,Ut),Kt.setOptional(U,k,"batchingIdTexture"),Kt.setValue(U,"batchingIdTexture",k._indirectTexture,Ut),Kt.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&Kt.setValue(U,"batchingColorTexture",k._colorsTexture,Ut));let Nn=H.morphAttributes;if((Nn.position!==void 0||Nn.normal!==void 0||Nn.color!==void 0)&&K.update(k,H,Ze),(Ai||St.receiveShadow!==k.receiveShadow)&&(St.receiveShadow=k.receiveShadow,Kt.setValue(U,"receiveShadow",k.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&L.environment!==null&&(qe.envMapIntensity.value=L.environmentIntensity),qe.dfgLUT!==void 0&&(qe.dfgLUT.value=fx()),Ai){if(Kt.setValue(U,"toneMappingExposure",I.toneMappingExposure),St.needsLights&&yf(qe,Xi),dt&&B.fog===!0&&at.refreshFogUniforms(qe,dt),at.refreshMaterialUniforms(qe,B,_t,Ct,T.state.transmissionRenderTarget[S.id]),St.needsLights&&St.numLightProbeGrids>0){let ye=v,ze=0;for(let li of T.state.lightProbeGridArray)li.texture!==null&&(ye.textures[ze]=li.texture,ye.min[ze]=li.boundingBox.min,ye.max[ze]=li.boundingBox.max,ye.resolution[ze]=li.resolution,ze++);for(let li in ye)ye[li].length=ze;qe.probesSH.value=ye.textures,qe.probesMin.value=ye.min,qe.probesMax.value=ye.max,qe.probesResolution.value=ye.resolution}$s.upload(U,Vh(St),qe,Ut)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&($s.upload(U,Vh(St),qe,Ut),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Kt.setValue(U,"center",k.center),Kt.setValue(U,"modelViewMatrix",k.modelViewMatrix),Kt.setValue(U,"normalMatrix",k.normalMatrix),Kt.setValue(U,"modelMatrix",k.matrixWorld),B.uniformsGroups!==void 0){let ye=B.uniformsGroups;for(let ze=0,li=ye.length;ze<li;ze++){let qh=ye[ze];Tt.update(qh,Ze),Tt.bind(qh,Ze)}}return Ze}function yf(S,L){S.ambientLightColor.needsUpdate=L,S.lightProbe.needsUpdate=L,S.sunLights.needsUpdate=L,S.sunLightShadows.needsUpdate=L,S.directionalLights.needsUpdate=L,S.directionalLightShadows.needsUpdate=L,S.pointLights.needsUpdate=L,S.pointLightShadows.needsUpdate=L,S.spotLights.needsUpdate=L,S.spotLightShadows.needsUpdate=L,S.rectAreaLights.needsUpdate=L,S.hemisphereLights.needsUpdate=L}function vf(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(S,L,H){let B=It.get(S);B.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),It.get(S.texture).__webglTexture=L,It.get(S.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:H,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,L){let H=It.get(S);H.__webglFramebuffer=L,H.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(S,L=0,H=0){nt=S,Y=L,G=H;let B=null,k=!1,dt=!1;if(S){let ht=It.get(S);if(ht.__useDefaultFramebuffer!==void 0){ft.bindFramebuffer(U.FRAMEBUFFER,ht.__webglFramebuffer),tt.copy(S.viewport),bt.copy(S.scissor),Ot=S.scissorTest,ft.viewport(tt),ft.scissor(bt),ft.setScissorTest(Ot),q=-1;return}else if(ht.__webglFramebuffer===void 0)Ut.setupRenderTarget(S);else if(ht.__hasExternalTextures)Ut.rebindTextures(S,It.get(S.texture).__webglTexture,It.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Bt=S.depthTexture;if(ht.__boundDepthTexture!==Bt){if(Bt!==null&&It.has(Bt)&&(S.width!==Bt.image.width||S.height!==Bt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ut.setupDepthRenderbuffer(S)}}let xt=S.texture;(xt.isData3DTexture||xt.isDataArrayTexture||xt.isCompressedArrayTexture)&&(dt=!0);let Et=It.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Et[L])?B=Et[L][H]:B=Et[L],k=!0):S.samples>0&&Ut.useMultisampledRTT(S)===!1?B=It.get(S).__webglMultisampledFramebuffer:Array.isArray(Et)?B=Et[H]:B=Et,tt.copy(S.viewport),bt.copy(S.scissor),Ot=S.scissorTest}else tt.copy(Lt).multiplyScalar(_t).floor(),bt.copy(ee).multiplyScalar(_t).floor(),Ot=se;if(H!==0&&(B=W),ft.bindFramebuffer(U.FRAMEBUFFER,B)&&ft.drawBuffers(S,B),ft.viewport(tt),ft.scissor(bt),ft.setScissorTest(Ot),k){let ht=It.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+L,ht.__webglTexture,H)}else if(dt){let ht=L;for(let xt=0;xt<S.textures.length;xt++){let Et=It.get(S.textures[xt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+xt,Et.__webglTexture,H,ht)}}else if(S!==null&&H!==0){let ht=It.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ht.__webglTexture,H)}q=-1};function Xh(S){let L=It.get(S);return(L.__readFormat!==S.format||L.__readType!==S.type)&&(L.__readFormat=S.format,L.__readType=S.type,L.__formatReadable=ge.textureFormatReadable(S.format),L.__typeReadable=ge.textureTypeReadable(S.type)),L}this.readRenderTargetPixels=function(S,L,H,B,k,dt,yt,ht=0){if(!(S&&S.isWebGLRenderTarget)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=It.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&yt!==void 0&&(xt=xt[yt],Array.isArray(xt)&&(xt=xt[0])),xt){ft.bindFramebuffer(U.FRAMEBUFFER,xt);try{let Et=S.textures[ht],Bt=Et.format,Yt=Et.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ht);let Mt=Xh(Et);if(Mt.__formatReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Mt.__typeReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=S.width-B&&H>=0&&H<=S.height-k&&U.readPixels(L,H,B,k,rt.convert(Bt),rt.convert(Yt),dt)}finally{let Et=nt!==null?It.get(nt).__webglFramebuffer:null;ft.bindFramebuffer(U.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(S,L,H,B,k,dt,yt,ht=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=It.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&yt!==void 0&&(xt=xt[yt],Array.isArray(xt)&&(xt=xt[0])),xt)if(L>=0&&L<=S.width-B&&H>=0&&H<=S.height-k){ft.bindFramebuffer(U.FRAMEBUFFER,xt);let Et=S.textures[ht],Bt=Et.format,Yt=Et.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ht);let Mt=Xh(Et);if(Mt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Mt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Zt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Zt),U.bufferData(U.PIXEL_PACK_BUFFER,dt.byteLength,U.STREAM_READ),U.readPixels(L,H,B,k,rt.convert(Bt),rt.convert(Yt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Ae=nt!==null?It.get(nt).__webglFramebuffer:null;ft.bindFramebuffer(U.FRAMEBUFFER,Ae);let oe=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await pd(U,oe,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Zt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,dt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(Zt),U.deleteSync(oe),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,L=null,H=0){let B=Math.pow(2,-H),k=Math.floor(S.image.width*B),dt=Math.floor(S.image.height*B),yt=L!==null?L.x:0,ht=L!==null?L.y:0;Ut.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,H,0,0,yt,ht,k,dt),ft.unbindTexture()},this.copyTextureToTexture=function(S,L,H=null,B=null,k=0,dt=0){let yt,ht,xt,Et,Bt,Yt,Mt,Zt,Ae,oe=S.isCompressedTexture?S.mipmaps[dt]:S.image;if(H!==null)yt=H.max.x-H.min.x,ht=H.max.y-H.min.y,xt=H.isBox3?H.max.z-H.min.z:1,Et=H.min.x,Bt=H.min.y,Yt=H.isBox3?H.min.z:0;else{let Kt=Math.pow(2,-k);yt=Math.floor(oe.width*Kt),ht=Math.floor(oe.height*Kt),S.isDataArrayTexture?xt=oe.depth:S.isData3DTexture?xt=Math.floor(oe.depth*Kt):xt=1,Et=0,Bt=0,Yt=0}B!==null?(Mt=B.x,Zt=B.y,Ae=B.z):(Mt=0,Zt=0,Ae=0);let re=rt.convert(L.format),Ye=rt.convert(L.type),St;L.isData3DTexture?(Ut.setTexture3D(L,0),St=U.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Ut.setTexture2DArray(L,0),St=U.TEXTURE_2D_ARRAY):(Ut.setTexture2D(L,0),St=U.TEXTURE_2D),ft.activeTexture(U.TEXTURE0),ft.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,L.flipY),ft.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),ft.pixelStorei(U.UNPACK_ALIGNMENT,L.unpackAlignment);let tn=ft.getParameter(U.UNPACK_ROW_LENGTH),jt=ft.getParameter(U.UNPACK_IMAGE_HEIGHT),Wi=ft.getParameter(U.UNPACK_SKIP_PIXELS),Ze=ft.getParameter(U.UNPACK_SKIP_ROWS),Aa=ft.getParameter(U.UNPACK_SKIP_IMAGES);ft.pixelStorei(U.UNPACK_ROW_LENGTH,oe.width),ft.pixelStorei(U.UNPACK_IMAGE_HEIGHT,oe.height),ft.pixelStorei(U.UNPACK_SKIP_PIXELS,Et),ft.pixelStorei(U.UNPACK_SKIP_ROWS,Bt),ft.pixelStorei(U.UNPACK_SKIP_IMAGES,Yt);let Ai=S.isDataArrayTexture||S.isData3DTexture,Xi=L.isDataArrayTexture||L.isData3DTexture;if(S.isDepthTexture){let Kt=It.get(S),qe=It.get(L),Nn=It.get(Kt.__renderTarget),ye=It.get(qe.__renderTarget);ft.bindFramebuffer(U.READ_FRAMEBUFFER,Nn.__webglFramebuffer),ft.bindFramebuffer(U.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let ze=0;ze<xt;ze++)Ai&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,It.get(S).__webglTexture,k,Yt+ze),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,It.get(L).__webglTexture,dt,Ae+ze)),U.blitFramebuffer(Et,Bt,Et+yt,Bt+ht,Mt,Zt,Mt+yt,Zt+ht,U.DEPTH_BUFFER_BIT,U.NEAREST);ft.bindFramebuffer(U.READ_FRAMEBUFFER,null),ft.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||It.has(S)){let Kt=It.get(S),qe=It.get(L);ft.bindFramebuffer(U.READ_FRAMEBUFFER,P),ft.bindFramebuffer(U.DRAW_FRAMEBUFFER,V);for(let Nn=0;Nn<xt;Nn++)Ai?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Kt.__webglTexture,k,Yt+Nn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Kt.__webglTexture,k),Xi?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,qe.__webglTexture,dt,Ae+Nn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,qe.__webglTexture,dt),k!==0?U.blitFramebuffer(Et,Bt,Et+yt,Bt+ht,Mt,Zt,Mt+yt,Zt+ht,U.COLOR_BUFFER_BIT,U.NEAREST):Xi?U.copyTexSubImage3D(St,dt,Mt,Zt,Ae+Nn,Et,Bt,yt,ht):U.copyTexSubImage2D(St,dt,Mt,Zt,Et,Bt,yt,ht);ft.bindFramebuffer(U.READ_FRAMEBUFFER,null),ft.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Xi?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(St,dt,Mt,Zt,Ae,yt,ht,xt,re,Ye,oe.data):L.isCompressedArrayTexture?U.compressedTexSubImage3D(St,dt,Mt,Zt,Ae,yt,ht,xt,re,oe.data):U.texSubImage3D(St,dt,Mt,Zt,Ae,yt,ht,xt,re,Ye,oe):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,dt,Mt,Zt,yt,ht,re,Ye,oe.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,dt,Mt,Zt,oe.width,oe.height,re,oe.data):U.texSubImage2D(U.TEXTURE_2D,dt,Mt,Zt,yt,ht,re,Ye,oe);ft.pixelStorei(U.UNPACK_ROW_LENGTH,tn),ft.pixelStorei(U.UNPACK_IMAGE_HEIGHT,jt),ft.pixelStorei(U.UNPACK_SKIP_PIXELS,Wi),ft.pixelStorei(U.UNPACK_SKIP_ROWS,Ze),ft.pixelStorei(U.UNPACK_SKIP_IMAGES,Aa),dt===0&&L.generateMipmaps===!0&&L.mipmapsAutoUpdate===!0&&U.generateMipmap(St),ft.unbindTexture()},this.initRenderTarget=function(S){It.get(S).__webglFramebuffer===void 0&&Ut.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ut.setTextureCube(S,0):S.isData3DTexture?Ut.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ut.setTexture2DArray(S,0):Ut.setTexture2D(S,0),ft.unbindTexture()},this.resetState=function(){Y=0,G=0,nt=null,ft.reset(),ot.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}};var We=300,Te=130,de=3,Qs=[[0,0],[8,0],[3,2],[5,2]],R=(i=1,t)=>t===void 0?Math.random()*i:i+Math.random()*(t-i),bn=(i,t,e)=>Math.max(t,Math.min(e,i)),he=i=>new Ft(i),dn=new D,qn=new In,ai=new D,Ve=new Qt,_a=new zn,Xn=new Ft,Ee=null,un,Fe,fe,Ei,be=null,Ie=null,ie=!1,Ta=!1;var cn=[],ba=[],Jl=[],xa=[],oi;var Sn,er,hn,Ti=null,cs=null,$l=[],Hl=new Map,nr=null,Gl=[],Vl=[],ma=new Map,Ea,ya=[];var hf=0,Ge=null,kl=0,mx=null;function Si(i,t,e,n,s=!0){let r=document.createElement("canvas");r.width=i,r.height=t,e(r.getContext("2d"),i,t);let a=new Ur(r);return s&&(a.colorSpace=nn),n&&(a.wrapS=a.wrapT=Ls),a.anisotropy=4,a}var ue={};function gx(){ue.stone||(ue.stone=Si(128,128,(i,t,e)=>{i.fillStyle="#6f6a64",i.fillRect(0,0,t,e);for(let n=0;n<2;n++)for(let s=-1;s<3;s++){let r=s*64+(n?32:0)+3,a=n*64+3,o=200+Math.random()*40|0;i.fillStyle=`rgb(${o},${o-4},${o-10})`,i.fillRect(r,a,58,58);for(let l=0;l<140;l++){let c=Math.random()*22-11|0;i.fillStyle=`rgba(${c>0?255:0},${c>0?250:0},${c>0?240:0},${Math.abs(c)/120})`,i.fillRect(r+Math.random()*58,a+Math.random()*58,2+Math.random()*3,2+Math.random()*3)}i.fillStyle="rgba(255,255,255,.18)",i.fillRect(r,a,58,4),i.fillStyle="rgba(0,0,0,.22)",i.fillRect(r,a+54,58,4)}}),ue.crack=Si(128,128,(i,t,e)=>{i.clearRect(0,0,t,e),i.strokeStyle="rgba(20,10,8,.9)",i.lineWidth=3;for(let n=0;n<3;n++){let s=64+R(-30,30),r=64+R(-30,30);i.beginPath(),i.moveTo(s,r);for(let a=0;a<6;a++)s+=R(-22,22),r+=R(-22,22),i.lineTo(s,r);i.stroke()}}),ue.noise=Si(128,128,(i,t,e)=>{let n=i.createImageData(t,e);for(let s=0;s<n.data.length;s+=4){let r=200+Math.random()*55;n.data[s]=n.data[s+1]=n.data[s+2]=r,n.data[s+3]=255}i.putImageData(n,0,0)},!0),ue.wood=Si(64,128,(i,t,e)=>{i.fillStyle="#6a4024",i.fillRect(0,0,t,e);for(let n=0;n<t;n+=16){i.fillStyle=`rgba(0,0,0,${.15+Math.random()*.2})`,i.fillRect(n,0,2,e);for(let s=0;s<20;s++)i.fillStyle="rgba(255,220,170,.08)",i.fillRect(n+R(14),R(e),1,R(10,30))}i.fillStyle="#2a1a10",i.fillRect(0,24,t,6),i.fillRect(0,98,t,6)}),ue.glow=Si(64,64,(i,t)=>{let e=i.createRadialGradient(32,32,0,32,32,32);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,.7)"),e.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=e,i.fillRect(0,0,t,t)},!1,!1),ue.smoke=Si(64,64,(i,t)=>{for(let e=0;e<10;e++){let n=32+R(-9,9),s=32+R(-9,9),r=R(10,20),a=i.createRadialGradient(n,s,0,n,s,r);a.addColorStop(0,"rgba(255,255,255,.35)"),a.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=a,i.fillRect(0,0,t,t)}},!1,!1),ue.balloon=Si(128,64,(i,t,e)=>{for(let n=0;n<8;n++)i.fillStyle=n%2?"#f4e2b8":"#d8452e",i.fillRect(n*16,0,16,e);i.fillStyle="#ffd36b",i.fillRect(0,26,t,10)}))}function _x(i,t){return Si(128,64,(e,n,s)=>{e.font="900 44px Tajawal, system-ui, sans-serif",e.textAlign="center",e.textBaseline="middle",e.lineWidth=8,e.strokeStyle="rgba(20,10,30,.85)",e.strokeText(i,n/2,s/2+2),e.fillStyle=t,e.fillText(i,n/2,s/2+2)})}function xx(i){return Si(4,256,(t,e,n)=>{let s=t.createLinearGradient(0,0,0,n);i.sky.forEach((r,a)=>s.addColorStop(a/(i.sky.length-1),r)),t.fillStyle=s,t.fillRect(0,0,e,n)})}var Wl=class{constructor(t,e,n){this.n=t,this.a=new Float32Array(t*16),this.free=[];for(let r=t-1;r>=0;r--)this.free.push(r);this.live=new Uint8Array(t);let s=new le;this.pos=new Float32Array(t*3),this.col=new Float32Array(t*4),this.size=new Float32Array(t),s.setAttribute("position",new Me(this.pos,3)),s.setAttribute("pc",new Me(this.col,4)),s.setAttribute("ps",new Me(this.size,1)),this.mat=new Pn({uniforms:{map:{value:n},scale:{value:1}},transparent:!0,depthWrite:!1,blending:e?ln:ki,vertexShader:"attribute vec4 pc; attribute float ps; uniform float scale; varying vec4 vC; void main(){ vC = pc; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = ps * scale / max(1.0, -mv.z); gl_Position = projectionMatrix * mv; }",fragmentShader:`uniform sampler2D map; varying vec4 vC; void main(){ vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(vC.rgb, vC.a * t.a); if (gl_FragColor.a < .01) discard;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`}),this.pts=new Ki(s,this.mat),this.pts.frustumCulled=!1,this.pts.renderOrder=e?3:2}emit(t,e,n,s,r,a,o,l,c,h,d,p=0,u=0){let g=this.free.pop();if(g===void 0)return;let _=this.a,f=g*16;_[f]=t,_[f+1]=e,_[f+2]=n,_[f+3]=s,_[f+4]=r,_[f+5]=a,_[f+6]=o,_[f+7]=o,_[f+8]=l,_[f+9]=c,_[f+10]=h.r,_[f+11]=h.g,_[f+12]=h.b,_[f+13]=d,_[f+14]=p,_[f+15]=u,this.live[g]=1}update(t){let e=this.a,n=0;for(let r=0;r<this.n;r++){if(!this.live[r])continue;let a=r*16;if(e[a+6]-=t,e[a+6]<=0){this.live[r]=0,this.free.push(r);continue}let o=Math.max(0,1-e[a+15]*t);e[a+3]*=o,e[a+4]=e[a+4]*o-e[a+14]*t,e[a+5]*=o,e[a]+=e[a+3]*t,e[a+1]+=e[a+4]*t,e[a+2]+=e[a+5]*t;let l=e[a+6]/e[a+7];this.pos[n*3]=e[a],this.pos[n*3+1]=e[a+1],this.pos[n*3+2]=e[a+2],this.size[n]=e[a+9]+(e[a+8]-e[a+9])*l,this.col[n*4]=e[a+10],this.col[n*4+1]=e[a+11],this.col[n*4+2]=e[a+12],this.col[n*4+3]=e[a+13]*Math.min(1,l*2.2),n++}let s=this.pts.geometry;s.setDrawRange(0,n),s.attributes.position.needsUpdate=s.attributes.pc.needsUpdate=s.attributes.ps.needsUpdate=!0}clear(){this.live.fill(0),this.free.length=0;for(let t=this.n-1;t>=0;t--)this.free.push(t)}},pe=null,ae=null,Pt={fire:he("#ff8a2a"),ember:he("#ffd38a"),spark:he("#fff1c4"),smoke:he("#5a5258"),dark:he("#2a2228"),dust:he("#b08060"),sand:he("#e6c48a"),gold:he("#ffd36b"),cyan:he("#8fe8ff"),white:he("#ffffff"),blood:he("#c03a30"),foe:he("#ffb48a")},Ih=class{constructor(t){this.n=t,this.m=new yn(new Se(1,1,1),new Vt({map:ue.stone,roughness:.95}),t),this.m.instanceMatrix.setUsage(ha),this.m.frustumCulled=!1,this.d=[],this.m.count=0;for(let e=0;e<t;e++)this.m.setColorAt(e,Pt.white)}add(t,e,n,s,r,a,o,l,c,h,d=4){this.d.length>=this.n&&this.d.shift(),this.d.push({x:t,y:e,z:n,sx:s,sy:r,sz:a,vx:o,vy:l,vz:c,rx:R(6),ry:R(6),wx:R(-8,8),wy:R(-8,8),c:h,l:d,m:d,rest:0})}update(t){let e=0;for(let n=this.d.length-1;n>=0;n--){let s=this.d[n];if(s.l-=t,s.l<=0){this.d.splice(n,1);continue}}for(let n of this.d){if(!n.rest){n.vy-=62*t,n.x+=n.vx*t,n.y+=n.vy*t,n.z+=n.vz*t,n.rx+=n.wx*t,n.ry+=n.wy*t;let r=Yl(n.x,n.z)+n.sy*.45;n.y<r&&(n.y=r,Math.abs(n.vy)<6&&(n.rest=1),n.vy=-n.vy*.32,n.vx*=.6,n.vz*=.6,n.wx*=.5,n.wy*=.5)}let s=Math.min(1,n.l/Math.min(1,n.m));_a.set(n.rx,n.ry,0),qn.setFromEuler(_a),Ve.compose(dn.set(n.x,n.y,n.z),qn,ai.set(n.sx*s,n.sy*s,n.sz*s)),this.m.setMatrixAt(e,Ve),this.m.setColorAt(e,n.c),e++}this.m.count=e,this.m.instanceMatrix.needsUpdate=!0,this.m.instanceColor&&(this.m.instanceColor.needsUpdate=!0)}},bi=[],va=[-150,-110,-80,-62,-48,-38,-30,-23,-17,-12,-8,-5,-3,-1.5,0,1.5,3,5,8,12,17,24,34,48,70,100,150,230,340],Dh=null,Ph=null;var Xl=(i,t)=>i[bn(Math.round(t),0,We)];function yx(i){return Te-Xl(Dh,i)}function vx(i,t){return i<0?Math.exp(-((i/30)**2))*(1+.25*Math.sin(t*.05+i*.13))+.55*Math.exp(-(((i+70)/30)**2))*(.6+.4*Math.sin(t*.021+1.3)):Math.exp(-((i/11)**2))}function Mx(i,t){return t>-20?0:Math.min(1,(-t-20)/40)*(14+12*Math.sin(i*.017+2)+8*Math.sin(i*.043+t*.05))}function ql(i,t){return-Te+yx(i)*vx(t,i)+Mx(i,t)+(Math.abs(t)>3?(Math.sin(i*.31+t*.7)+Math.sin(i*.13-t*.4))*.35:0)}function Yl(i,t){let e=be&&be.st.h;if(!e||i<0||i>We)return-Te;let n=Math.exp(-((t/6)**2));return ql(i,t)*(1-n)+-Xl(e,i)*n}function Sx(i){bi=[];for(let c of[-260,-170,-110,-70,-40,-20,-8])bi.push(c);for(let c=0;c<=We;c++)bi.push(c);for(let c of[308,320,340,370,410,470,560])bi.push(c);let t=bi.length,e=va.length,n=new Float32Array(t*e*3),s=new Float32Array(t*e*3),r=[];for(let c=0;c<e;c++)for(let h=0;h<t;h++){let d=(c*t+h)*3;n[d]=bi[h],n[d+2]=va[c]}for(let c=0;c<e-1;c++)for(let h=0;h<t-1;h++){let d=c*t+h,p=d+1,u=d+t,g=u+1;r.push(d,u,p,p,u,g)}let a=new le;a.setAttribute("position",new Me(n,3)),a.setAttribute("color",new Me(s,3)),a.setIndex(r);let o=new Float32Array(t*e*2);for(let c=0;c<e;c++)for(let h=0;h<t;h++)o[(c*t+h)*2]=bi[h]/14,o[(c*t+h)*2+1]=va[c]/14;a.setAttribute("uv",new Me(o,2));let l=new Vt({vertexColors:!0,map:ue.noise,roughness:1,metalness:0,flatShading:!0});return hn=new wt(a,l),hn.receiveShadow=!0,hn.userData.pal=i.rock.map(c=>he(c)),hn.userData.sandC=he("#e8c890"),hn.userData.scorch=new Float32Array(We+1),Ph=new Float32Array(We+1).fill(-999),Nh(0,We,!0),hn}function Nh(i,t,e){let n=hn.geometry,s=n.attributes.position.array,r=n.attributes.color.array,a=bi.length,o=be.st.h,l=hn.userData.pal,c=hn.userData.scorch;for(let h=0;h<a;h++){let d=bi[h];if(!e&&(d<i-1||d>t+1))continue;let p=d>=0&&d<=We,u=p?Dh[bn(Math.round(d),0,We)]-Xl(o,d):0;for(let g=0;g<va.length;g++){let _=va[g],f=(g*a+h)*3,m=Math.exp(-((_/6)**2)),y=ql(d,_);p&&(y=y*(1-m)+-Xl(o,d)*m+(Math.abs(_)>1?u*m*.25:0)),s[f+1]=y;let b=(y+Te)/80,v=bn(b,0,1);Xn.copy(l[0]).lerp(l[1],bn(v*1.6,0,1)).lerp(l[2],bn((v-.6)*1.5,0,1)),_>10&&Xn.lerp(l[0],.25),p&&u>.5&&Xn.lerp(hn.userData.sandC,bn(u/8,0,.8)*m),p&&c[Math.round(d)]>0&&Xn.multiplyScalar(1-bn(c[Math.round(d)],0,.55)*m);let w=.92+(Math.sin(d*12.9898+_*78.233)*43758.5453%1+1)%1*.12;r[f]=Xn.r*w,r[f+1]=Xn.g*w,r[f+2]=Xn.b*w}}n.attributes.position.needsUpdate=n.attributes.color.needsUpdate=!0,n.computeBoundingSphere()}function bx(){let i=be.st.h,t=999,e=-1;for(let n=0;n<=We;n++)Ph[n]!==i[n]&&(n<t&&(t=n),e=n,Ph[n]=i[n]);e>=0&&Nh(t,e)}function ga(i,t,e=.5){let n=hn.userData.scorch;for(let s=Math.max(0,Math.floor(i-t));s<=Math.min(We,Math.ceil(i+t));s++)n[s]=Math.min(.6,n[s]+e*(1-Math.abs(s-i)/(t+1)));Nh(i-t,i+t)}function of(i,t,e,n,s){let r=new Hs;r.moveTo(-900,-260);for(let o=-900;o<=1200;o+=12){let l=t+e*(.5+.3*Math.sin(o*.007+s)+.2*Math.sin(o*.021+s*3)+.1*Math.sin(o*.07+s));r.lineTo(o,l)}r.lineTo(1200,-260),r.closePath();let a=new wt(new Zr(r,1),new an({color:n,fog:!0}));return a.position.z=i,a}function Ex(i){let t=new Ce,e=i.fx==="motes"||i.fx==="haze",n=new yn(new Br(1,0),new Vt({color:i.rock[1],roughness:1,flatShading:!0}),70),s=0;for(let c=0;c<70;c++){let h=R(-60,360),d=R()<.5?R(5,40):R(-60,-6);if(Math.abs(h-32)<22&&Math.abs(d)<14||Math.abs(h-268)<22&&Math.abs(d)<14)continue;let p=R(.6,2.6);_a.set(R(3),R(3),R(3)),qn.setFromEuler(_a),Ve.compose(dn.set(h,ql(h,d)+p*.3,d),qn,ai.set(p,p*R(.5,1),p)),n.setMatrixAt(s++,Ve)}n.count=s,n.castShadow=!ie,n.receiveShadow=!0,t.add(n);let r=ie?18:40,a=new yn(new Hn(.25,.4,1,5).translate(0,.5,0),new Vt({color:"#5a3a22",roughness:1}),r),o=e?new ti(1,.55,7).rotateX(Math.PI):new ti(1,1,7),l=new yn(o,new Vt({color:e?"#3f7a3a":i.night?"#1d3a34":"#2f5a3a",roughness:.9,flatShading:!0}),r);s=0;for(let c=0;c<r*3&&s<r;c++){let h=R(-40,340),d=R()<.45?R(8,36):R(-50,-10);if(h>8&&h<58&&d>-18&&d<18||h>242&&h<292&&d>-18&&d<18)continue;let p=ql(h,d);if(p>-Te+45)continue;let u=e?R(7,11):R(6,12);Ve.compose(dn.set(h,p,d),qn.identity(),ai.set(1,u,1)),a.setMatrixAt(s,Ve),Ve.compose(dn.set(h,p+u+(e?0:u*.1),d),qn.setFromEuler(_a.set(0,R(3),0)),e?ai.set(3.2,2.2,3.2):ai.set(2.2,u*.9,2.2)),l.setMatrixAt(s,Ve),s++}return a.count=l.count=s,a.castShadow=l.castShadow=!ie,t.add(a,l),t}var Lh={sand:{a:"#e0a464",b:"#a7adba",roof:null},granite:{a:"#b8b4ae",b:"#7b8190",roof:"#4a5a7a"},royal:{a:"#f2ead8",b:"#c9d2e0",roof:"#2f5fb8"},obsidian:{a:"#5c5468",b:"#2e2a38",roof:"#8a1f2c"}},uf=(()=>{let i=new Se(de*.985,de*.985,1),t=i.attributes.uv;for(let e=0;e<6;e++)if(!(e===4||e===5))for(let n=0;n<4;n++){let s=e*4+n;e<2?t.setX(s,t.getX(s)*2.5):t.setY(s,t.getY(s)*2.5)}return i})();function ir(i,t){return i<=1||i>=7?9:t>=4?7:5.5}function Dn(i,t){let e=t%i.cols,n=t/i.cols|0;return[i.x0+(e+.5)*de,-(i.y0+(n+.5)*de)]}function df(i){let t=be.st.castles[i],e=i===Ie.home,n=Lh[e?Ie.fort||"sand":Ie.foeFort||"sand"]||Lh.sand,s=t.t.length,r=new Ce,a={s:i,C:t,g:r,shake:0,prevT:new Uint8Array(s).fill(255),prevB:new Uint8Array(s).fill(255),anim:new Float32Array(s),collapse:null,smokeT:0},o=new Vt({map:ue.stone,roughness:.92});a.bricks=new yn(uf,o,s),a.bricks.castShadow=a.bricks.receiveShadow=!0,a.bricks.instanceMatrix.setUsage(ha),a.base=[];for(let b=0;b<s;b++){let v=b%t.cols,w=b/t.cols|0,T=t.t[b],x=he(T===9?"#2a1a14":T===2?n.b:n.a);x.multiplyScalar(.86+(v*7+w*13)%5*.05),a.base.push(x),a.bricks.setColorAt(b,x)}a.cracks=new yn(new ei(de*.95,de*.95),new an({map:ue.crack,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}),s),a.cracks.count=0,a.merl=new yn(new Se(1.1,1.3,1.1),new Vt({map:ue.stone,roughness:.95,color:n.a}),s*4),a.merl.castShadow=!0,a.merl.count=0,a.win=new yn(new Se(.8,1.7,.3),new Vt({color:"#140c10",emissive:Ie.mood.night||Ie.mood.fx==="motes"?"#ffb45a":"#000000",emissiveIntensity:Ie.mood.night?1.6:.5,roughness:1}),16),a.win.count=0,r.add(a.bricks,a.cracks,a.merl,a.win);let l=he(e?"#3fe0c5":"#ff4d6d"),c=n.roof||(e?"#2a8a7e":"#a8323e");a.towers=[];for(let[b]of[[0],[7]]){let v=t.x0+(b+1)*de,w=-t.y0,T=new wt(new ti(3.3,7,8),new Vt({color:c,roughness:.7,flatShading:!0}));T.position.set(v,w+3.5,-2.2),T.castShadow=!0;let x=new wt(new Hn(.12,.12,6,5),new Vt({color:"#3b2615"}));x.position.set(0,6.5,0),T.add(x);let E=new ei(5,3,10,4).translate(2.5,0,0),N=new wt(E,new Vt({color:new Ft().setHSL(be.hues[i]/360,.75,.55),side:Qe,roughness:.8}));N.position.set(0,8,0),N.userData.x0=Float32Array.from(E.attributes.position.array),T.add(N),r.add(T),a.towers.push({c0:b,roof:T,flag:N,alive:1})}let h=t.gate[0],[d,p]=Dn(t,h),u=ir(h%t.cols,t.rows-1)/2+.2,g=new Se(1.45,5.6,.35),_=new Vt({map:ue.wood,roughness:.9});a.door={l:new Ce,r:new Ce,open:0,alive:1};for(let[b,v]of[[-1,a.door.l],[1,a.door.r]]){let w=new wt(g,_);w.position.x=-b*.72,w.castShadow=!0,v.add(w),v.position.set(d+b*1.45,p+1.3,u),r.add(v)}let f=new wt(new ei(3,5.8),new an({color:"#0c0606"}));f.position.set(d,p+1.4,u-.25),r.add(f),a.arch=f,a.torches=[[d-2.6,p+3.6,u+.3],[d+2.6,p+3.6,u+.3]];let m=t.x0+(t.cc+1)*de,y=-(t.y0+(t.cr+1)*de);return a.gem=new wt(new Yr(2.1,0),new Vt({color:"#ffcf5a",emissive:"#ff9a20",emissiveIntensity:1.4,roughness:.25,metalness:.4,flatShading:!0})),a.gem.position.set(m,y,2.2),r.add(a.gem),a.gemGlow=new _i(new jn({map:ue.glow,color:"#ffc14a",transparent:!0,depthWrite:!1,blending:ln})),a.gemGlow.scale.set(12,12,1),a.gemGlow.position.copy(a.gem.position),r.add(a.gemGlow),a.dome=new wt(new Ni(9,24,16),new an({color:"#7fd8ff",transparent:!0,opacity:.2,depthWrite:!1,blending:ln,side:Qe})),a.dome.position.copy(a.gem.position),a.dome.visible=!1,a.shieldWas=0,r.add(a.dome),fe.add(r),a}function Tx(i,t,e){let n=i.C,s=n.t.length,r=!1,a=!1;if(be.st.castles[i.s]!==n){fe.remove(i.g);let g=df(i.s);Object.assign(i,g);return}for(let g=0;g<s;g++){let _=i.collapse?i.collapse.gone[g]?0:n.orig[g]&&i.collapse.had[g]?n.orig[g]:0:n.t[g],f=(_===1?18:48)*n.hm,m=_&&_!==9?bn(Math.floor(n.hp[g]/f*4),0,4):4,y=_&&n.burn[g]?1:0,b=m+y*8;if(_&&!i.prevT[g]&&i.prevT[g]!==255&&(i.anim[g]=.001),i.anim[g]>0&&(i.anim[g]=Math.min(1,i.anim[g]+t*2.5),i.anim[g]>=1&&(i.anim[g]=0),a=!0),i.prevT[g]===_&&i.prevB[g]===b&&!i.anim[g])continue;r=!0,i.prevT[g]=_,i.prevB[g]=b;let v=g%n.cols,w=g/n.cols|0,[T,x]=Dn(n,g),E=_===9?3:ir(v,w),N=i.anim[g]?i.anim[g]:1;Ve.compose(dn.set(T,x,_===9?-2.6:0),qn.identity(),ai.set(_?N:0,_?N:0,_?E*N:0)),i.bricks.setMatrixAt(g,Ve),Xn.copy(i.base[g]).multiplyScalar(.55+.45*m/4),y&&Xn.lerp(Pt.dark,.35),i.bricks.setColorAt(g,Xn)}(r||a)&&(i.bricks.instanceMatrix.needsUpdate=!0,i.bricks.instanceColor.needsUpdate=!0,wx(i));let o=Math.max(0,n.coreHp/n.core0),l=n.coreHp>0&&!i.collapse;if(i.gem.visible=i.gemGlow.visible=l,l){i.gem.rotation.y+=t*(1+(1-o)*4);let g=1+Math.sin(e*(5+(1-o)*9))*.12;i.gem.scale.setScalar(g),i.gemGlow.material.opacity=.55+.3*Math.sin(e*(5+(1-o)*9)),i.gem.material.emissive.setHSL((40-(1-o)*34)/360,1,.5)}let c=!!(n.shield&&n.t[Qs[0][1]*n.cols+Qs[0][0]]&&n.t[Qs[1][1]*n.cols+Qs[1][0]])&&!i.collapse;if(i.dome.visible=c,c)i.dome.material.opacity=.14+.08*Math.sin(e*3),i.dome.rotation.y+=t*.5,i.dome.scale.setScalar(1+Math.sin(e*2)*.03),i.shieldWas=1;else if(i.shieldWas){i.shieldWas=0;let g=i.gem.position;for(let _=0;_<(ie?30:90);_++){let f=R(6.28),m=R(-1.5,1.5),y=R(8,22);pe.emit(g.x+Math.cos(f)*8,g.y+m*5,g.z+Math.sin(f)*4,Math.cos(f)*y,m*y*.5,Math.sin(f)*y*.4,R(.4,.9),2,.3,Pt.cyan,1,10)}Uh(g.x,g.y,4,"#8fe8ff",160)}i.shake=Math.max(0,i.shake-t*3),i.g.position.set((Math.random()-.5)*i.shake*.9,(Math.random()-.5)*i.shake*.4,0);let h=be.st.wind||0,d=h>=0?1:-1,p=.25+Math.min(1,Math.abs(h)/8)*.55;for(let g of i.towers){if(!g.alive)continue;let _=g.flag.geometry.attributes.position,f=g.flag.userData.x0;for(let m=0;m<_.count;m++){let y=f[m*3];_.setZ(m,Math.sin(y*1.3-e*(5+Math.abs(h)*.5)+i.s)*p*(y/5)),_.setY(m,f[m*3+1]-(1-p)*y*.18)}_.needsUpdate=!0,g.flag.scale.x=d}let u=(n.rep||i.crewOut>0)&&i.door.alive?1:0;if(i.door.open+=(u-i.door.open)*Math.min(1,t*4),i.door.l.rotation.y=i.door.open*1.4,i.door.r.rotation.y=-i.door.open*1.4,i.smokeT-=t,i.smokeT<=0){i.smokeT=ie?.2:.08;for(let g=0;g<s;g++)if(n.burn[g]&&n.t[g]&&Math.random()<.35){let[_,f]=Dn(n,g),m=ir(g%n.cols,g/n.cols|0)/2;pe.emit(_+R(-1,1),f+R(-1,1),m+.2,R(-.5,.5),R(6,10),0,R(.4,.7),R(4,6),1,Pt.fire,.9,-3,.4)}for(let g=0;g<3;g++){let _=Math.random()*s|0;if(!n.t[_]||n.t[_]===9)continue;let f=(n.t[_]===1?18:48)*n.hm,[m,y]=Dn(n,_),b=ir(_%n.cols,_/n.cols|0)/2;if(n.burn[_]){for(let v=0;v<(ie?3:6);v++)pe.emit(m+R(-1.4,1.4),y+R(-1.2,1),b+R(-.3,.6),R(-1,1),R(5,11),R(-.5,.5),R(.5,.9),R(4,6.5),.8,v%3?Pt.fire:Pt.ember,.95,-4,.5);ae.emit(m,y+1.5,b*.5,R(-1,1),R(5,8),0,R(1.6,2.6),2.5,7,Pt.dark,.45,-1,.3)}else n.hp[_]<f*.5&&Math.random()<.5&&ae.emit(m,y+1,b*.6,R(-.6,.6)+h*.3,R(3,6),0,R(1.5,2.5),2,6,Pt.smoke,.3,-.5,.2)}}if((Ie.mood.night||Ie.mood.fx==="motes")&&i.door.alive&&Math.random()<.5)for(let[g,_,f]of i.torches)pe.emit(g+R(-.2,.2),_,f,R(-.3,.3),R(2,4),0,R(.2,.4),R(1.4,2.2),.4,Pt.fire,.9,-2);i.collapse&&Ax(i,t)}function wx(i){let t=i.C,e=t.cols,n=l=>i.prevT[l]&&i.prevT[l]!==255&&i.prevT[l]!==9,s=0,r=0,a=0;for(let l=0;l<t.t.length;l++){if(!n(l))continue;let c=l%e,h=l/e|0,[d,p]=Dn(t,l),u=ir(c,h);if(h===0||!i.prevT[l-e]||i.prevT[l-e]===255){let _=h===0&&(c<=1||c>=7);for(let f of[-.8,.8])for(let m of _?[u/2-.55]:[u/2-.55,-u/2+.55])Ve.compose(dn.set(d+f,p+de/2+.65,m),qn.identity(),ai.set(1,1,1)),i.merl.setMatrixAt(s++,Ve)}(h===2||h===5)&&(c===1||c===7||c===4)&&r<16&&(Ve.compose(dn.set(d,p,u/2+.05),qn.identity(),ai.set(1,1,1)),i.win.setMatrixAt(r++,Ve));let g=(i.prevT[l]===1?18:48)*t.hm;t.hp[l]<g*.6&&(Ve.compose(dn.set(d,p,u/2+.02),qn.identity(),ai.set(1,1,1)),i.cracks.setMatrixAt(a++,Ve))}i.merl.count=s,i.win.count=r,i.cracks.count=a,i.merl.instanceMatrix.needsUpdate=i.win.instanceMatrix.needsUpdate=i.cracks.instanceMatrix.needsUpdate=!0;for(let l of i.towers)if(l.alive&&(!n(l.c0)||!n(l.c0+1))){l.alive=0,l.roof.visible=!1;let c=l.roof.position;oi.add(c.x,c.y,0,5,5,5,R(-8,8),R(6,14),R(2,6),he(Lh.sand.roof||"#a8323e"),3.5);for(let h=0;h<10;h++)ae.emit(c.x+R(-3,3),c.y,R(-2,2),R(-3,3),R(2,6),0,1.6,3,8,Pt.dust,.5,0,.5)}let o=n(t.gate[0])&&n(t.gate[1]);if(i.door.alive&&!o){i.door.alive=0,i.door.l.visible=i.door.r.visible=!1,i.arch.visible=!1;for(let l=0;l<8;l++)oi.add(i.door.l.position.x+1.4,i.door.l.position.y,i.door.l.position.z,.4,R(1,2.5),.3,R(-10,10),R(4,12),R(2,8),he("#6a4024"),3)}}function ff(i){let t=cn[i];if(!t||t.collapse)return;let e=t.C,n=Uint8Array.from(e.t),s=new Uint8Array(e.t.length),r=[];for(let a=0;a<e.t.length;a++)n[a]&&r.push([.35+(a/e.cols|0)*.16+R(.3),a]);r.sort((a,o)=>a[0]-o[0]),t.collapse={t:0,order:r,had:n,gone:s,k:0}}function Ax(i,t){let e=i.collapse;e.t+=t;let n=i.C;for(;e.k<e.order.length&&e.order[e.k][0]<e.t;){let s=e.order[e.k++][1];e.gone[s]=1,i.prevT[s]=254;let[r,a]=Dn(n,s),o=ir(s%n.cols,s/n.cols|0),l=n.x0+n.cols*de/2;oi.add(r,a,0,de*.9,de*.9,Math.min(o,4),(r-l)*R(.6,1.8)+R(-3,3),R(2,12),R(-4,9),i.base[s],R(3,5)),Math.random()<(ie?.3:.7)&&ae.emit(r,a,R(-2,3),R(-3,3),R(1,5),R(0,3),R(1.8,3),3,11,Pt.dust,.5,0,.4)}if(e.k>=e.order.length&&!e.done){e.done=1;for(let s=0;s<(ie?20:60);s++)ae.emit(n.x0+R(0,27),-Te+R(0,10),R(-6,8),R(-8,8),R(2,10),R(-2,4),R(2.5,4),4,16,Pt.dust,.45,0,.35);for(let s of i.towers)s.alive&&(s.alive=0,s.roof.visible=!1);i.door.alive=0,i.door.l.visible=i.door.r.visible=i.arch.visible=!1}}var lf={bronze:{barrel:"#c9953a",metal:.7,len:7.2,r0:.95,r1:.7,rings:"#7a5a20"},iron:{barrel:"#4a4e58",metal:.6,len:6.2,r0:1.2,r1:1.05,rings:"#22252c"},dragon:{barrel:"#3a7a52",metal:.4,len:7.6,r0:.9,r1:1.25,rings:"#c9a030",dragon:1},royal:{barrel:"#f2d27a",metal:.9,len:7.8,r0:.95,r1:.75,rings:"#fff4c8"}};function Rx(i){let t=i?{x:We-52,y:Te-6}:{x:52,y:Te-6},e=i===Ie.home,n=lf[e?Ie.cannon||"bronze":"iron"]||lf.bronze,s=new Ce;s.position.set(t.x,-Te,0),s.scale.x=i?-1:1;let r=new Vt({map:ue.wood,roughness:.9}),a=new wt(new Se(6,1.8,3.2),r);a.position.set(-.8,2,0),a.castShadow=!0,s.add(a);let o=new wt(new Se(4.2,2.6,.5),r);for(let m of[-1.4,1.4]){let y=o.clone();y.position.set(-.2,3.6,m),y.castShadow=!0,s.add(y)}let l=new Hn(1.7,1.7,.55,12).rotateX(Math.PI/2),c=new Vt({color:"#3a2414",roughness:.9}),h=[];for(let[m,y]of[[-2.6,2.1],[-2.6,-2.1],[1.8,2.1],[1.8,-2.1]]){let b=new wt(l,c);b.position.set(m,1.7,y),b.castShadow=!0,s.add(b),h.push(b)}let d=new Ce;d.position.set(0,6,0),s.add(d);let p=[new st(0,-1.6),new st(n.r0*1.15,-1.6),new st(n.r0*1.2,-1.1),new st(n.r0,-.9),new st(n.r1,n.len-1.2),new st(n.r1*1.25,n.len-.9),new st(n.r1*1.25,n.len-.5),new st(n.r1*.55,n.len-.5),new st(n.r1*.55,n.len-2)],u=new Vt({color:n.barrel,metalness:n.metal,roughness:.35}),g=new wt(new Vs(p,14).rotateZ(-Math.PI/2),u);g.castShadow=!0;let _=new Ce;_.add(g);for(let m of[.4,2.6,n.len-2.2]){let y=new wt(new Ui(n.r0*1.02-m*.02,.13,6,14).rotateY(Math.PI/2),new Vt({color:n.rings,metalness:.8,roughness:.3}));y.position.x=m,_.add(y)}if(n.dragon)for(let m of[0,1,2,3]){let y=new wt(new ti(.3,1.4,5),new Vt({color:"#c9a030",metalness:.8,roughness:.3}));y.position.set(n.len-.6,Math.cos(m*Math.PI/2)*n.r1*1.3,Math.sin(m*Math.PI/2)*n.r1*1.3),y.rotation.z=-Math.PI/2+Math.cos(m*Math.PI/2)*.5,_.add(y)}d.add(_);let f=new _i(new jn({map:ue.glow,color:"#ffcf80",transparent:!0,depthWrite:!1,blending:ln,opacity:0}));return f.position.set(n.len+.6,0,0),f.scale.set(7,7,1),_.add(f),fe.add(s),{s:i,g:s,piv:d,bar:_,flash:f,len:n.len,wheels:h,rec:0,fl:0}}function cf(i,t,e,n){i.piv.rotation.z=e,i.bar.position.x=-n*1.6,i.g.position.x=(i.s?We-52:52)+(i.s?1:-1)*n*.35;for(let s of i.wheels)s.rotation.z=n*.8*(i.s?-1:1);i.fl=Math.max(0,i.fl-t*6),i.flash.material.opacity=i.fl,i.flash.scale.setScalar(4+i.fl*6)}function Cx(i){let t=ba[i];if(!t)return;t.fl=1;let e=t.piv.rotation.z,n=i?-1:1,s=t.g.position.x+Math.cos(e)*t.len*n,r=-Te+6+Math.sin(e)*t.len;for(let a=0;a<(ie?6:16);a++){let o=R(4,16);ae.emit(s,r,R(-.5,.5),Math.cos(e)*o*n+R(-2,2),Math.sin(e)*o+R(-1,2),R(-2,2),R(.8,1.6),1.5,7,Pt.smoke,.55,-1,1.6)}for(let a=0;a<8;a++)pe.emit(s,r,0,Math.cos(e)*R(10,30)*n,Math.sin(e)*R(10,30),R(-3,3),R(.1,.25),2.5,.5,Pt.ember,1,0,2);Uh(s,r,3,"#ffc070",60)}var $t={};function Ix(){$t.leg||($t.leg=new Se(.36,1.05,.36).translate(0,-.52,0),$t.arm=new Se(.28,.95,.28).translate(0,-.45,0),$t.body=new Se(1,1.2,.62),$t.head=new Ni(.36,8,6),$t.helm=new ti(.44,.55,8),$t.bow=new Ui(.75,.05,4,12,Math.PI).rotateZ(-Math.PI/2),$t.spear=new Hn(.05,.05,3,5),$t.hammer=new Se(.5,.35,.35).translate(0,-1,0),$t.stone=new Se(1,.7,.7),$t.skin=new Vt({color:"#c08a5e",roughness:.8}),$t.steel=new Vt({color:"#9aa0ab",metalness:.7,roughness:.4}),$t.dark=new Vt({color:"#2e2620",roughness:.9}),$t.wood=new Vt({color:"#6a4024",roughness:.9}))}var js=class{constructor(t,e,n){Ix(),this.side=t,this.kind=e,this.g=new Ce;let s=new Vt({color:n,roughness:.8});this.legL=new wt($t.leg,$t.dark),this.legR=new wt($t.leg,$t.dark),this.legL.position.set(-.24,1.05,0),this.legR.position.set(.24,1.05,0),this.body=new wt($t.body,s),this.body.position.y=1.65,this.head=new wt($t.head,$t.skin),this.head.position.y=2.6,this.helm=new wt($t.helm,e==="mason"?$t.dark:$t.steel),this.helm.position.y=2.95,this.armL=new wt($t.arm,s),this.armR=new wt($t.arm,s),this.armL.position.set(-.66,2.15,0),this.armR.position.set(.66,2.15,0),this.g.add(this.legL,this.legR,this.body,this.head,this.helm,this.armL,this.armR),e==="archer"?(this.tool=new wt($t.bow,$t.wood),this.tool.position.set(0,-.8,.35),this.armL.add(this.tool)):e==="guard"?(this.tool=new wt($t.spear,$t.wood),this.tool.position.set(0,-.6,.2),this.armR.add(this.tool)):e==="mason"&&(this.tool=new wt($t.hammer,$t.steel),this.armR.add(this.tool),this.stone=new wt($t.stone,new Vt({map:ue.stone,color:"#d8a868"})),this.stone.position.set(0,3.5,0),this.g.add(this.stone)),this.g.scale.setScalar(1.55),this.x=0,this.y=-Te,this.z=0,this.face=t?-1:1,this.st="idle",this.t=0,this.ph=R(6),this.vx=0,this.vy=0,this.alive=1,this.wp=null,fe.add(this.g)}set(t,e=0){this.st=t,this.t=e}update(t,e){let n=this.g;this.t+=t;let s=0,r=0,a=0,o=0,l=0,c=0;if(this.st==="dead"){this.vy-=50*t,this.x+=this.vx*t,this.y+=this.vy*t;let p=Yl(this.x,this.z);this.y<p&&(this.y=p,this.vy=0,this.vx*=.5),n.rotation.z+=(Math.PI/2*Math.sign(this.vx||1)-n.rotation.z)*Math.min(1,t*6),this.t>4&&(n.visible=!1)}else if(this.st==="walk"||this.st==="run"||this.st==="flee"){let p=this.st==="walk"?4.5:11,u=this.wp;if(u){let g=u[0]-this.x,_=u[2]-this.z,f=Math.hypot(g,_);f<.4?(this.x=u[0],this.z=u[2],this.wp=null,this.onArrive&&this.onArrive()):(this.x+=g/f*p*t,this.z+=_/f*p*t,Math.abs(g)>.1&&(this.face=Math.sign(g))),this.y=u[1]!=null?u[1]:Yl(this.x,this.z)}s=p}else this.st==="shoot"?(l=this.t<.25?this.t/.25:this.t<.45?1:Math.max(0,1-(this.t-.45)*3),this.t>.8&&(this.st="idle")):this.st==="cower"?(o=1,a=.6,this.t>1.3&&(this.st=this.back||"idle")):this.st==="cheer"?(a=1,r=Math.abs(Math.sin(this.t*7+this.ph))*.9):this.st==="rally"?(a=.8+Math.sin(this.t*12)*.2,this.t>1.6&&(this.st=this.back||"idle")):this.st==="work"?c=Math.sin(this.t*10)*.5+.5:this.st==="load"&&(l=Math.min(1,this.t*3),this.t>.6&&(this.st="idle"));this.st!=="dead"&&(n.rotation.z=0);let h=this.ph+e*(s?s*1.4:2),d=s?Math.sin(h)*.8:0;this.legL.rotation.x=d,this.legR.rotation.x=-d,this.armL.rotation.x=-d*.7-a*2.6-l*1.5,this.armR.rotation.x=d*.7-a*2.6-l*1.1-c*1.8,this.armR.rotation.z=l?-l*.4:0,this.body.position.y=1.65-o*.5,this.head.position.y=2.6-o*.55,this.helm.position.y=2.95-o*.55,this.armL.position.y=this.armR.position.y=2.15-o*.5,this.legL.scale.y=this.legR.scale.y=1-o*.45,!s&&this.st!=="dead"&&(this.body.position.y+=Math.sin(e*2+this.ph)*.03),n.position.set(this.x,this.y+r,this.z),n.rotation.y=this.face>0?Math.PI/2:-Math.PI/2,(this.st==="work"||this.kind==="mason"&&this.st==="idle")&&(n.rotation.y=0),this.stone&&(this.stone.visible=!!this.carry)}die(t=R(-6,6),e=R(4,12)){this.st!=="dead"&&(this.alive=0,this.st="dead",this.t=0,this.vx=t,this.vy=e)}};function Px(i){let t=i.C,e=i.s,n=e===Ie.home?"#1f9e8c":"#b83246",s=[];if(Qs.forEach(([o,l],c)=>{let h=new js(e,"archer",n);h.post=l*t.cols+o,h.k=c,h.x=t.x0+(o+.5)*de,h.y=-(t.y0+l*de),h.z=o<=1||o>=7?2.6:1.2,h.face=e?-1:1,h.home="idle",s.push(h)}),!ie)for(let o=0;o<2;o++){let l=new js(e,"guard",n);l.x=t.x0+(2.5+o*3)*de,l.y=-(t.y0+4*de),l.z=-1.5,l.patrol=[t.x0+2.4*de,t.x0+6.6*de],l.dir=o?1:-1,l.st="walk",l.floor=c=>4,s.push(l)}let r=e?We-52:52,a=e?-1:1;for(let[o,l]of[[-5.5,2.6],[-3,-3.2]]){let c=new js(e,"crew",n);c.x=r+o*a,c.y=-Te,c.z=l,c.face=a,c.crew=1,s.push(c)}for(let o=0;o<2;o++){let l=new js(e,"mason",n);l.g.visible=!1,l.mason=1,l.st="hidden",s.push(l)}return i.crewOut=0,s}function Lx(i,t){for(let e of Jl){let n=cn[e.side];if(!n)continue;let s=n.C;if(e.st==="hidden"){e.g.visible=!1;continue}if(e.alive&&e.post!=null&&!s.t[e.post]&&!n.collapse&&e.die(R(-6,6)*(e.side?-1:1),R(2,8)),e.alive&&n.collapse&&e.post!=null&&n.collapse.gone[e.post]&&e.die(R(-8,8),R(4,10)),e.alive&&e.patrol){let a=bn(Math.floor((e.x-s.x0)/de),0,s.cols-1);!s.t[4*s.cols+a]||n.collapse?e.die(R(-5,5),R(2,6)):e.st==="walk"&&!e.wp&&(e.dir=-e.dir,e.wp=[e.dir>0?e.patrol[1]:e.patrol[0],-(s.y0+4*de),-1.5])}e.update(i,t)}}function hs(i,t){return Jl.filter(e=>e.side===i&&e.alive&&(!t||t(e)))}function Dx(i){if(!cn[i.side])return;let e=hs(i.side,l=>l.k===i.k)[0];e&&(e.set("shoot"),e.face=i.x>e.x?1:-1);let n=xa.find(l=>!l.on);if(!n){if(xa.length>30)return;let l=new Ce,c=new wt(new Hn(.06,.06,2.2,4).rotateZ(Math.PI/2),$t.wood),h=new wt(new ti(.16,.5,4).rotateZ(-Math.PI/2),$t.steel);h.position.x=1.25,l.add(c,h),fe.add(l),n={g:l},xa.push(n)}let s=i.ax,r=-i.ay+1.5,a=i.x,o=-i.y;Object.assign(n,{on:1,t:0,T:.28+Math.hypot(a-s,o-r)/160,sx:s,sy:r,tx:a,ty:o,hit:i.hit,vx:0,vy:0}),n.g.visible=!0,Kl("arrow",i.side)}function Nx(i){for(let t of xa){if(!t.on)continue;t.t+=i;let e=Math.min(1,t.t/t.T),n=t.sx+(t.tx-t.sx)*e,s=t.sy+(t.ty-t.sy)*e+Math.sin(e*Math.PI)*4,r=t.tx-t.sx,a=t.ty-t.sy+Math.cos(e*Math.PI)*4*Math.PI;if(t.g.position.set(n,s,.5),t.g.rotation.z=Math.atan2(a,r),e>=1&&(t.on=0,t.g.visible=!1,t.hit)){for(let o=0;o<10;o++)pe.emit(t.tx,t.ty,.5,R(-12,12),R(-12,12),R(-4,4),R(.15,.35),1.6,.3,Pt.spark,1,10);ae.emit(t.tx,t.ty,.5,0,2,0,.8,1.5,4,Pt.smoke,.45)}}}var mn=null,pf={ball:()=>new wt(new Ni(1,14,10),new Vt({color:"#2a2a30",metalness:.8,roughness:.35})),boulder:()=>{let i=new ji(2.1,1),t=i.attributes.position;for(let e=0;e<t.count;e++)dn.fromBufferAttribute(t,e).multiplyScalar(.82+Math.random()*.3),t.setXYZ(e,dn.x,dn.y,dn.z);return i.computeVertexNormals(),new wt(i,new Vt({color:"#7a6a62",roughness:1,flatShading:!0}))},star:()=>{let i=pf.boulder();i.scale.setScalar(1.7),i.material=new Vt({color:"#5a3a2a",emissive:"#ff7a2a",emissiveIntensity:1.6,roughness:1,flatShading:!0});let t=new _i(new jn({map:ue.glow,color:"#ffb060",transparent:!0,depthWrite:!1,blending:ln}));return t.scale.set(9,9,1),i.add(t),i},cluster:()=>{let i=new wt(new Hn(.8,.8,2.4,10).rotateZ(Math.PI/2),new Vt({color:"#3a3430",metalness:.5,roughness:.5})),t=new wt(new Ui(.82,.14,5,12).rotateY(Math.PI/2),new Vt({color:"#c0392b"}));return i.add(t),i},bolt:()=>{let i=new wt(new ji(.9,0),new an({color:"#dff8ff"})),t=new _i(new jn({map:ue.glow,color:"#6fd8ff",transparent:!0,depthWrite:!1,blending:ln}));return t.scale.set(6,6,1),i.add(t),i}},Zl={};function Ux(i){let t=Zl[i]||(Zl[i]=[]),e=t.find(n=>!n.userData.on);return e||(e=pf[i](),e.castShadow=i!=="bolt",t.push(e),fe.add(e)),e.userData.on=1,e.visible=!0,e}function Fx(i,t){let e=be.st,n=Ie.trail,s=new Set,r=0;for(let a of e.R){let o=a.big===2?"star":a.big?"boulder":a.wk==="ball"&&!a.neutral?"ball":a.wk==="cluster"&&!a.split?"cluster":a.wk==="bolt"?"bolt":null,l=a.x,c=-a.y;if(o){let h=ma.get(a);if(h||(h=Ux(o),ma.set(a,h)),s.add(a),h.position.set(l,c,0),o==="boulder"||o==="star"?a.roll?h.rotation.z-=a.vx*i/2.1:(h.rotation.x+=i*3,h.rotation.z+=i*4):o==="cluster"?h.rotation.z=Math.atan2(-a.vy,a.vx):o==="bolt"&&h.rotation.set(t*9,t*7,0),o==="star"){for(let d=0;d<(ie?3:8);d++)pe.emit(l+R(-2,2),c+R(-2,2),R(-1,1),-a.vx*.2+R(-3,3),- -a.vy*.2+R(-3,3),R(-2,2),R(.4,.9),R(5,8),1,Pt.fire,.9,0,1);ae.emit(l,c,0,R(-2,2),R(-2,2),0,2,4,12,Pt.dark,.5,-1,.4)}else o==="ball"&&Math.random()<.6?ae.emit(l,c,0,R(-1,1),R(-1,1),0,R(.8,1.4),1,3.5,Pt.smoke,.35,-.5,.4):o==="bolt"?Math.random()<.8&&pe.emit(l+R(-1,1),c+R(-1,1),R(-.5,.5),R(-6,6),R(-6,6),R(-2,2),.2,1.6,.2,Pt.cyan,1):o==="boulder"&&a.roll&&Math.random()<.6?ae.emit(l,c-1.5,R(-1,1),R(-2,2),R(1,3),0,1.2,2,5,Pt.dust,.45,0,.5):o==="cluster"&&Math.random()<.5&&ae.emit(l,c,0,0,1,0,1,1,3,Pt.smoke,.3);continue}if(r<380){let h=a.o<0||a.f?Pt.fire:a.wk==="cluster"?Pt.dark:a.o===Ie.me?n?n[0]:Xn.setHSL((t*120+a.x*3)%360/360,.9,.65):Pt.foe,d=.55+Math.min(1.4,Math.log2(1+a.w)*.35);Ve.compose(dn.set(l,c,0),qn.identity(),ai.set(d,d,d)),mn.setMatrixAt(r,Ve),mn.setColorAt(r,h),r++,Math.random()<(ie?.25:.55)&&pe.emit(l,c,R(-.3,.3),-a.vx*.05+R(-1,1),a.vy*.05+R(-1,1),0,a.f?.5:.35,a.f?3:2.2,.3,h,.85,-2,1),a.f&&Math.random()<.3&&ae.emit(l,c,0,0,2,0,1,1.5,4,Pt.dark,.3,-1)}}mn.count=r,mn.instanceMatrix.needsUpdate=!0,mn.instanceColor&&(mn.instanceColor.needsUpdate=!0);for(let[a,o]of ma)s.has(a)||(o.userData.on=0,o.visible=!1,ma.delete(a))}var Ma=0;function Uh(i,t,e,n,s){Ea.position.set(i,t,e+6),Ea.color.set(n),Ma=Math.max(Ma,s)}function os(i,t,e,n="#ffe0b0"){let s=Gl.find(r=>!r.userData.on);s||(s=new wt(new Ws(.8,1,40).rotateX(-Math.PI/2),new an({color:n,transparent:!0,depthWrite:!1,blending:ln,side:Qe})),Gl.push(s),fe.add(s)),s.userData={on:1,t:0,r:e},s.material.color.set(n),s.position.set(i,t+.3,0),s.visible=!0}function Ox(i){for(let t of Gl){if(!t.userData.on)continue;let e=t.userData;e.t+=i;let n=e.t/.6;t.scale.setScalar(1+n*e.r),t.material.opacity=Math.max(0,1-n),n>=1&&(e.on=0,t.visible=!1)}}function as(i,t,e,n,s=14,r=.8){for(let a=0;a<e;a++){let o=r*R(.5,1.3);oi.add(i+R(-1,1),t+R(0,1),R(-2,2),o,o,o,R(-s,s),R(s*.4,s*1.3),R(-s*.4,s*.7),n,R(2,3.5))}}function ls(i,t,e,n){let s=ie?.4:1,r=Math.ceil(e*10*s);for(let a=0;a<r;a++){let o=R(Math.PI*2),l=R(2,9)*e;pe.emit(i,t,R(-1,1)*e,Math.cos(o)*l,Math.abs(Math.sin(o))*l*.8+2,R(-l,l)*.5,R(.25,.55),R(3,6)*e,.6,n==="cyan"?Pt.cyan:a%3?Pt.fire:Pt.ember,.9,-2,2.5)}for(let a=0;a<Math.ceil(e*6*s);a++)ae.emit(i+R(-1,1)*e,t+R(0,1)*e,R(-1,1)*e,R(-3,3)*e,R(2,6)*e*.6,R(-2,2),R(1.2,2.4),2*e,7*e,n==="dirt"?Pt.dust:Pt.smoke,.55,-1,.8);for(let a=0;a<Math.ceil(e*8*s);a++)pe.emit(i,t,0,R(-25,25)*e*.6,R(5,30)*e*.6,R(-10,10),R(.3,.7),.9,.3,Pt.spark,1,30,.5);Uh(i,t,0,n==="cyan"?"#8fe8ff":"#ffb060",40+e*90)}function Bx(i){if(!Ta)return;let t=be.st;switch(i.e){case"launch":Cx(i.side);{let e=hs(i.side,n=>n.crew);e[0]&&e[0].set("load"),e[1]&&(e[1].set("cower",0),e[1].back="idle")}break;case"boom":{let e=i.r>3,n=hn.userData.pal;i.ball?(ls(i.x,-i.y,1.6,"dirt"),os(i.x,-i.y,7),as(i.x,-i.y,ie?4:10,n[1],16,.9),i.dirt&&ga(i.x,4,.35)):i.dirt?(ls(i.x,-i.y,e?1.3:.5,"dirt"),as(i.x,-i.y,e?8:2,n[1],12,.6),e&&os(i.x,-i.y,5),ga(i.x,Math.min(5,i.r*1.2),.25)):ls(i.x,-i.y,e?1.2:.45),Ch(i.x,i.y,e?1:.35);break}case"thud":ls(i.x,-i.y,i.land?.6:1.4,"dirt"),as(i.x,-i.y,i.land?4:12,hn.userData.pal[1],14,1),i.land||os(i.x,-i.y,8),Ch(i.x,i.y,1);break;case"jar":ls(i.x,-i.y+2,2.4),os(i.x,-i.y,12,"#ffb070");for(let e=0;e<(ie?10:30);e++)ae.emit(i.x+R(-2,2),-i.y+R(0,4),R(-2,2),R(-2,2),R(6,14),0,R(2.5,4),4,14,Pt.dark,.6,-1,.3);as(i.x,-i.y,10,he("#8a4a22"),18,.7),ga(i.x,10,.5);{let e=Hl.get(i.x);e&&(e.visible=!1)}break;case"star":ls(i.x,-i.y,3.2),os(i.x,-i.y,22,"#ffe2a0"),os(i.x,-i.y,14,"#ff9a4a"),as(i.x,-i.y,ie?12:30,hn.userData.pal[1],26,1.3),ga(i.x,18,.6),Ch(i.x,i.y,3);break;case"bolt":kx(i.x,-i.y);break;case"brk":{let e=cn[i.side];if(!e)break;let[n,s]=Dn(e.C,i.i);as(n,s,ie?3:6,e.base[i.i]||Pt.dust,10,.7),ae.emit(n,s,2,0,2,1,1.4,3,7,Pt.dust,.5),e.shake=Math.min(1.2,e.shake+.35);break}case"fall":{let e=cn[i.side];if(!e)break;let[n,s]=Dn(e.C,i.i);oi.add(n,s,0,de*.92,de*.92,3.5,R(-4,4),R(0,3),R(-1,4),e.base[i.i]||Pt.dust,4.5),e.shake=Math.min(1.5,e.shake+.5);break}case"core":{let e=cn[i.side];if(!e)break;let n=e.gem.position;for(let s=0;s<8;s++)pe.emit(n.x,n.y,n.z,R(-14,14),R(-6,14),R(0,8),.4,1.6,.3,Pt.gold,1,20);e.shake=Math.min(1.5,e.shake+.3);break}case"dune":for(let e=0;e<(ie?14:40);e++)ae.emit(i.x+R(-8,8),-Te+R(0,6),R(-6,6),R(-4,4),R(6,16),R(-3,3),R(1,2),3,8,Pt.sand,.55,10,.3);break;case"starcall":ya.push({x:i.x,side:i.side,t:0,T:70/60+.2});break;case"split":for(let e=0;e<10;e++)pe.emit(i.x,-i.y,0,R(-10,10),R(-10,10),R(-4,4),.25,2.5,.3,Pt.ember,1);ae.emit(i.x,-i.y,0,0,1,0,1,2,6,Pt.smoke,.5);break;case"arrow":Dx(i);break;case"gate":{let e=be.st.gates[i.g];if(!e)break;let n=i.k>=10?Pt.gold:Pt.cyan;for(let r=0;r<(ie?4:10);r++)pe.emit(e.x+R(-1,1),-e.y+R(-e.h/2,e.h/2),R(-1,1),R(6,16),R(-6,6),R(-4,4),R(.25,.5),2.4,.3,n,1,0,2);let s=$l[i.g];s&&(s.userData.kick=1);break}case"sortie":{let e=cn[i.side];if(!e)break;let[n]=Dn(e.C,i.i),[s]=Dn(e.C,e.C.gate[0]);e.crewOut=2,hs(i.side,r=>r.mason).forEach((r,a)=>{r.g.visible=!0,r.x=s,r.z=-1,r.y=-Te,r.carry=1,r.set("walk"),r.wp=[n+(a?1.6:-1.6),null,5.5+a],r.onArrive=()=>{r.set("work"),r.face=1},r.job=i.i}),Kl("steps",i.side);break}case"repair":{let e=cn[i.side];if(!e)break;let[n,s]=Dn(e.C,i.i);for(let r=0;r<12;r++)ae.emit(n+R(-1.5,1.5),s+R(-1.5,1.5),3,R(-2,2),R(0,3),1,1,2,5,Pt.dust,.5);zx(i.side);break}case"laststand":{let e=cn[i.side];if(!e)break;hs(i.side).forEach(n=>{n.back=n.st==="walk"?"walk":"idle",n.set("rally")});for(let n=0;n<40;n++)pe.emit(e.C.x0+R(0,27),-e.C.y0+R(-30,0),R(-4,4),0,R(4,10),0,R(.6,1.2),3,.5,Pt.blood,.8,-3);break}case"cratepop":if(nr){let e=nr.position;for(let n=0;n<(ie?20:60);n++)pe.emit(e.x,e.y,e.z,R(-14,14),R(-6,16),R(-8,8),R(.5,1),2,.4,n%2?Pt.gold:Pt.spark,1,12);oi.add(e.x,e.y-3,0,2,1.6,2,R(-3,3),2,0,he("#8a5a2a"),3)}break;case"slide":for(let e=0;e<(ie?8:24);e++)ae.emit(i.x+R(-4,4),-i.y+R(-1,2),R(-6,6),i.dir*R(2,8),R(1,4),0,R(1.4,2.4),3,9,Pt.dust,.5,0,.4);as(i.x,-i.y,8,hn.userData.pal[1],8,.6);break;case"win":ff(1-i.winner),hs(i.winner).forEach(e=>{e.back="cheer",e.set("cheer")});break}}function Ch(i,t,e){for(let n of cn){let s=n.C;if(i>s.x0-14&&i<s.x0+s.cols*de+14){n.shake=Math.min(1.5,n.shake+e*.4);for(let r of hs(n.s))(r.st==="walk"||r.st==="idle")&&Math.random()<.7&&(r.back=r.st,r.set("cower")),Math.hypot(r.x-i,r.y+t)<3+e*2&&r.die(Math.sign(r.x-i)*R(6,14),R(6,14))}}}function zx(i){let t=cn[i];if(!t)return;let[e]=Dn(t.C,t.C.gate[0]);hs(i,n=>n.mason).forEach(n=>{n.carry=0,n.set("walk"),n.wp=[e,null,-1],n.onArrive=()=>{n.set("hidden"),n.g.visible=!1,t.crewOut=Math.max(0,t.crewOut-1)}})}function kx(i,t){let e=Vl.find(a=>!a.userData.on);e||(e=new wt(new le,new an({color:"#e8fbff",transparent:!0,depthWrite:!1,blending:ln,side:Qe})),Vl.push(e),fe.add(e));let n=[],s=i+R(-10,10);for(let a=0;a<=14;a++){let o=60-(60-t)*a/14;n.push([a===14?i:s,o]),s+=R(-4,4)+(i-s)*.25}let r=[];for(let a=0;a<n.length-1;a++){let[o,l]=n[a],[c,h]=n[a+1],d=.7;r.push(o-d,l,1,o+d,l,1,c+d,h,1,o-d,l,1,c+d,h,1,c-d,h,1)}e.geometry.dispose(),e.geometry=new le,e.geometry.setAttribute("position",new Xt(r,3)),e.userData={on:1,t:0},e.visible=!0,ls(i,t,1.3,"cyan"),os(i,t,9,"#9ff0ff"),Sa=1.2,ga(i,3,.5)}var Sa=0;function Hx(i){for(let t of Vl)t.userData.on&&(t.userData.t+=i,t.material.opacity=Math.max(0,1-t.userData.t/.45)*(Math.random()<.3?.4:1),t.userData.t>.45&&(t.userData.on=0,t.visible=!1))}function Gx(){$l=be.st.gates.map(i=>{let t=i.v>=10,e=t?"#ffcf6b":"#3fe0c5",n=new Ce,s=new Vt({color:e,emissive:e,emissiveIntensity:1.2,metalness:.5,roughness:.3}),r=i.h,a=7;for(let[c,h,d,p]of[[-a/2,0,.5,r],[a/2,0,.5,r],[0,r/2,a+.5,.5],[0,-r/2,a+.5,.5]]){let u=new wt(new Se(d,p,.7),s);u.position.set(c,h,0),n.add(u)}let o=new wt(new ei(a,r),new an({color:e,transparent:!0,opacity:.16,depthWrite:!1,blending:ln,side:Qe}));n.add(o);let l=new _i(new jn({map:_x("\xD7"+i.v,"#ffffff"),transparent:!0,depthWrite:!1}));return l.scale.set(7,3.5,1),l.position.set(0,0,1),n.add(l),n.userData={pane:o,fm:s,g:i},fe.add(n),n})}function Vx(i){for(let t of $l){let e=t.userData.g;t.position.set(e.x,-e.y,0),t.userData.pane.material.opacity=.14+e.flash*.4+Math.sin(i*3+e.i)*.03,t.userData.fm.emissiveIntensity=1+e.flash*2,t.rotation.y=Math.sin(i*.8+e.i)*.25;let n=t.userData.kick||0;t.scale.setScalar(1+n*.25),t.userData.kick=Math.max(0,n-.06)}}function Wx(){Hl=new Map;let i=[];for(let s=0;s<=12;s++){let r=s/12;i.push(new st(.25+Math.sin(r*Math.PI)*1.25+(r>.85?(r-.85)*2:0),r*4.2))}let t=new Vs(i,12),e=new Vt({color:"#a85a2a",roughness:.8}),n=new Vt({color:"#e8c370",roughness:.6});for(let s of be.st.jars){let r=new wt(t,e),a=new wt(new Ui(1.42,.12,4,14).rotateX(Math.PI/2),n);a.position.y=2,r.add(a),r.castShadow=!0,r.userData.j=s,fe.add(r),Hl.set(s.x,r)}}function Xx(){for(let i of Hl.values()){let t=i.userData.j;i.visible=!!t.alive,t.alive&&(i.position.set(t.x,-t.y-.2,1),t.fuse&&Math.random()<.7&&pe.emit(t.x,-t.y+4.6,1,R(-2,2),R(3,8),R(-1,1),.3,1.6,.3,Pt.ember,1,5))}}function qx(){let i=new Ce,t=new wt(new Ni(3.2,16,12),new Vt({map:ue.balloon,roughness:.7}));t.scale.y=1.2;let e=new wt(new Se(2,1.6,2),new Vt({map:ue.wood}));e.position.y=-5.4;let n=new wt(new Se(1.4,1.1,1.4),new Vt({color:"#ffd36b",emissive:"#a87a10",emissiveIntensity:.6}));return n.position.y=-4.4,i.add(t,e,n),i.visible=!1,fe.add(i),i}function Yx(i){let t=be.st.crate;nr.visible=!!t,t&&(nr.position.set(t.x,-t.y+4.5,0),nr.rotation.y=i*.6)}var ri=null;function Zx(i){ri||(ri=new wt(new Ws(10,12,48).rotateX(-Math.PI/2),new an({color:"#ffd36b",transparent:!0,depthWrite:!1,blending:ln})),fe.add(ri)),ri.visible=!1;for(let t=ya.length-1;t>=0;t--){let e=ya[t];if(e.t+=i,e.t>e.T){ya.splice(t,1);continue}let n=e.t/e.T;ri.visible=!0,ri.position.set(e.x,-be.st.h[bn(Math.round(e.x),0,We)]+.4,0),ri.scale.setScalar(1.2-n*.5),ri.material.color.set(e.side===Ie.me?"#ffd36b":"#ff4d6d"),ri.material.opacity=.5+.5*Math.sin(e.t*18)}}function Jx(i){if(i.fx==="rain"){let t=ie?250:700,e=new Float32Array(t*6);for(let s=0;s<t;s++){let r=R(-200,500),a=R(-150,60),o=R(-40,60);e.set([r,a,o,r,a-3,o],s*6)}let n=new le;n.setAttribute("position",new Me(e,3)),Ti=new Dr(n,new Bs({color:"#b8c4e0",transparent:!0,opacity:.45})),Ti.frustumCulled=!1,un.add(Ti)}if(i.fx==="fireflies"||i.fx==="motes"||i.stars){let t=i.fx==="fireflies"?60:40,e=new Float32Array(t*3);for(let s=0;s<t;s++)e.set([R(-40,340),-Te+R(4,60),R(-30,30)],s*3);let n=new le;n.setAttribute("position",new Me(e,3)),cs=new Ki(n,new $i({color:i.fx==="fireflies"?"#c8ff96":"#ffe6be",size:1.1,map:ue.glow,transparent:!0,depthWrite:!1,blending:ln,opacity:.8})),fe.add(cs)}if(i.stars){let e=new Float32Array(1200);for(let r=0;r<400;r++){let a=R(-1.4,1.4),o=R(.05,1.2);e.set([150+Math.sin(a)*900,-40+Math.sin(o)*700,-900+Math.cos(a)*100],r*3)}let n=new le;n.setAttribute("position",new Me(e,3));let s=new Ki(n,new $i({color:"#ffffff",size:2.2,sizeAttenuation:!1,transparent:!0,opacity:Math.min(1,i.stars*.7),fog:!1}));un.add(s)}}function $x(i,t,e){let n=be.st.wind||0;if(Ti){let s=Ti.geometry.attributes.position.array;for(let r=0;r<s.length;r+=6)s[r+1]-=110*i,s[r]+=n*2*i,s[r+1]<-150&&(s[r+1]=60,s[r]=e+R(-250,250)),s[r+3]=s[r]-n*.5,s[r+4]=s[r+1]-3.5,s[r+5]=s[r+2];Ti.geometry.attributes.position.needsUpdate=!0,kl-=i,kl<=0&&(kl=R(6,13),Sa=1.4,Kl("thunder"))}if(cs){let s=cs.geometry.attributes.position.array;for(let r=0;r<s.length;r+=3)s[r]+=(n*.5+Math.sin(t*.7+r)*1.5)*i,s[r+1]+=Math.cos(t*.9+r)*i*1.2,s[r]>340&&(s[r]=-40),s[r]<-40&&(s[r]=340);cs.geometry.attributes.position.needsUpdate=!0,cs.material.opacity=.5+.3*Math.sin(t*2)}}var Kl=()=>{};function Kx(i){if(Ee)return!0;Ei=i;try{Ee=new Ol({canvas:Ei,antialias:(devicePixelRatio||1)<2.5,powerPreference:"high-performance",alpha:!1})}catch{return Ee=null,!1}return Ee.getContext()?(Ee.toneMapping=na,Ee.toneMappingExposure=1.05,Ee.shadowMap.enabled=!0,Ee.shadowMap.type=ts,gx(),un=new Ar,Fe=new Ke(40,1,.5,3e3),fe=new Ce,un.add(fe),er=new $r("#ffffff","#553322",1.2),un.add(er),Sn=new ea("#fff0d8",2.6),Sn.castShadow=!0,Sn.shadow.mapSize.set(1536,1536),Object.assign(Sn.shadow.camera,{left:-180,right:180,top:120,bottom:-120,near:10,far:800}),Sn.shadow.bias=-6e-4,Sn.shadow.normalBias=.4,un.add(Sn,Sn.target),Ea=new jr("#ffb060",0,120,1.6),un.add(Ea),!0):(Ee=null,!1)}function Qx(i,t){if(!Ee)return!1;mf(),be=i,Ie=t,ie=!!t.low,Kl=t.sfx||(()=>{}),Ie.home=t.home!=null?t.home:t.me,Ie.trail=t.trail?t.trail.map(s=>he("rgb("+s+")")):null,hf=0,Ge=null,kl=R(3,6),Ee.setPixelRatio(Math.min(devicePixelRatio||1,ie?1.25:2)),Ee.shadowMap.enabled=!ie,Sn.castShadow=!ie;let e=t.mood;un.background=xx(e),un.fog=new wr(he(e.sky[2]).lerp(he(e.far),.35),260,1500),er.color.set(e.sky[3]),er.groundColor.set(e.rock[2]),er.intensity=e.night?.95:e.fx==="rain"?.85:1.15,Sn.color.set(e.night?"#9fb4ff":e.sun===1?"#ffd2b0":e.sun===2?"#fff4e0":"#ffc890"),Sn.intensity=e.night?1.6:e.fx==="rain"?1.2:e.sun===2?3:2.5;let n=e.sun===1?-120:120;Sn.position.set(150+n,60,160),Sn.target.position.set(150,-Te,0),Dh=Float32Array.from(be.st.h),fe.add(Sx(e)),fe.add(of(-260,-150,150,e.far,1.3),of(-170,-150,95,he(e.near).lerp(he(e.far),.3),4.1)),fe.add(Ex(e)),pe=new Wl(ie?900:2200,!0,ue.glow),ae=new Wl(ie?500:1300,!1,ue.smoke),fe.add(pe.pts,ae.pts),oi=new Ih(ie?120:280),fe.add(oi.m),mn=new yn(new ji(.6,1),new an({color:"#ffffff"}),380),mn.instanceMatrix.setUsage(ha),mn.frustumCulled=!1,mn.count=0;for(let s=0;s<380;s++)mn.setColorAt(s,Pt.white);return fe.add(mn),cn=[0,1].map(df),ba=[0,1].map(Rx),Jl=cn.flatMap(Px),Gx(),Wx(),nr=qx(),Jx(e),Ta=!0,Ei.style.display="block",!0}function mf(){if(Ta=!1,!!un){for(let i of[...fe.children])fe.remove(i),i.traverse(t=>{t.geometry&&!Object.values($t).includes(t.geometry)&&t.geometry!==uf&&t.geometry.dispose()});Ti&&(un.remove(Ti),Ti=null),cs=null;for(let i of[...un.children])i.isPoints&&un.remove(i);cn=[],ba=[],Jl=[],xa=[],$l=[],Gl=[],Vl=[],ma=new Map;for(let i in Zl)delete Zl[i];ya=[],ri=null,mn=null,Ge=null,Ei&&(Ei.style.display="none")}}function jx(i,t){if(!Ta||!be)return;mx=i;let e=Math.min(.05,t),n=hf+=e,s=performance.now();fe.scale.x=i.side?-1:1,fe.position.x=i.side?We:0,Ie.me=i.side,bx();for(let _ of cn)Tx(_,e,n);cf(ba[i.side],e,i.aim.mine,i.aim.rec),cf(ba[1-i.side],e,i.aim.foe,i.aim.foeRec),Lx(e,n),Nx(e),Fx(e,n),Vx(n),Xx(),Yx(n),Zx(e),Ox(e),Hx(e),pe.update(e),ae.update(e),oi.update(e),Ma=Math.max(0,Ma-e*220),Ea.intensity=Ma*60,Sa=Math.max(0,Sa-e*3),er.intensity=(Ie.mood.night?.95:Ie.mood.fx==="rain"?.85:1.15)+Sa*2.5;let r=i.shake?i.shake*1.4:0,a=i.L+i.viewW/2,o=i.viewW*1.15,l=.5;if(i.endT>=.15&&!Ge){let _=be.st.castles[i.loser],f=_.x0+_.cols*de/2,m=i.side?We-f:f;Ge={x:m,y:-Te+12,t:0,dir:m<150?-1:1}}if(i.intro>0&&!Ge){let _=bn((1-i.intro/2.6-.35)/.65,0,1),f=_*_*(3-2*_),m=We-32,y=i.VH/i.K,b=i.OY/i.K-y/2+i.viewW*.16,v=m+(a-m)*f,w=-Te+58+(b-(-Te+58))*f,T=105+(o-105)*f,x=m+(a-m)*f,E=-Te+12+(b-i.viewW*.16-(-Te+12))*f;Fe.position.set(v+Math.sin(_*3)*6*(1-f),w,T),Fe.lookAt(dn.set(x,E,0)),Fe.fov=2*Math.atan(y/2/o)*180/Math.PI,Fe.aspect=i.VW/i.VH,Fe.updateProjectionMatrix()}else if(Ge){Ge.t+=e;let _=i.VW/i.VH,f=bn(38/(Math.tan(27.5*Math.PI/180)*_),62,170),m=.9-Ge.t*.12,y=f-Math.min(f*.2,Ge.t*4),b=dn.set(Ge.x,Ge.y+4,0);Fe.position.set(Ge.x+Math.sin(m)*y*Ge.dir,Math.max(Ge.y+26+Ge.t*1.5,Yl(bn(Ge.x+Math.sin(m)*y*Ge.dir,0,We),Math.cos(m)*y)+8),Math.cos(m)*y),Fe.lookAt(b),Fe.fov=55,Fe.aspect=i.VW/i.VH,Fe.updateProjectionMatrix()}else{let _=i.OY/i.K-i.VH/i.K/2+i.viewW*.16;Fe.position.set(a+(Math.random()-.5)*r,_+(Math.random()-.5)*r,o),Fe.rotation.set(0,0,0);let f=l/o,m=(i.L-a)*f,y=(i.L+i.VW/i.K-a)*f,b=i.OY/i.K,v=(b-_)*f,w=(b-i.VH/i.K-_)*f;Fe.projectionMatrix.makePerspective(m,y,v,w,l,3e3),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert()}let c=Ee.getPixelRatio(),h=Ge||i.intro>0?i.VH/(2*Math.tan(Fe.fov*Math.PI/360)):i.K*o;pe.mat.uniforms.scale.value=ae.mat.uniforms.scale.value=h*c,$x(e,n,a);let d=Ei.clientWidth|0,p=Ei.clientHeight|0;(Ei.width!==Math.floor(d*c)||Ei.height!==Math.floor(p*c))&&Ee.setSize(d,p,!1);let u=performance.now();Ee.render(un,Fe);let g=performance.now();tr.u=tr.u*.95+(u-s)*.05,tr.r=tr.r*.95+(g-u)*.05}var tr={u:0,r:0};function ty(i){let t=be&&be.st.castles[i];if(!t)return 0;let e=0;for(let[n,s]of Qs)t.t[s*t.cols+n]&&e++;return e}function ey(){return Ee?{calls:Ee.info.render.calls,tris:Ee.info.render.triangles,geos:Ee.info.memory.geometries,tex:Ee.info.memory.textures,fx:pe?pe.n-pe.free.length:0,updateMs:+tr.u.toFixed(2),renderCallMs:+tr.r.toFixed(2),smoke:ae?ae.n-ae.free.length:0}:null}window.SH3D={_dbg:()=>({lightInst:mn,FX:pe,SM:ae,debris:oi,scene:un,cam:Fe,ren:Ee}),init:Kx,begin:Qx,end:mf,frame:jx,ev:Bx,collapse:ff,defenders:ty,stats:ey,get ready(){return Ta}};})();
