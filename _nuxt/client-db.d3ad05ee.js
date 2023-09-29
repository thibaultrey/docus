import{a5 as _,aB as B,aC as j,aD as E,aE as T,aF as W,aG as $,aH as P,aI as D,ab as b,a3 as J,l as M,aJ as H,a6 as U,al as k,j as G}from"./entry.83ba3cea.js";const q="memory",F=()=>{const r=new Map;return{name:q,options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function Z(r){return!r||typeof r.then!="function"?Promise.resolve(r):r}function p(r,...t){try{return Z(r(...t))}catch(n){return Promise.reject(n)}}function V(r){const t=typeof r;return r===null||t!=="object"&&t!=="function"}function Q(r){const t=Object.getPrototypeOf(r);return!t||t.isPrototypeOf(Object)}function K(r){if(V(r))return String(r);if(Q(r)||Array.isArray(r))return JSON.stringify(r);if(typeof r.toJSON=="function")return K(r.toJSON());throw new Error("[unstorage] Cannot stringify value!")}function z(){if(typeof Buffer===void 0)throw new TypeError("[unstorage] Buffer is not supported!")}const R="base64:";function X(r){if(typeof r=="string")return r;z();const t=Buffer.from(r).toString("base64");return R+t}function ee(r){return typeof r!="string"||!r.startsWith(R)?r:(z(),Buffer.from(r.slice(R.length),"base64"))}const te=["hasItem","getItem","getItemRaw","setItem","setItemRaw","removeItem","getMeta","setMeta","removeMeta","getKeys","clear","mount","unmount"];function re(r,t){if(t=A(t),!t)return r;const n={...r};for(const a of te)n[a]=(l="",...u)=>r[a](t+l,...u);return n.getKeys=(a="",...l)=>r.getKeys(t+a,...l).then(u=>u.map(o=>o.slice(t.length))),n}function d(r){return r?r.split("?")[0].replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""):""}function ne(...r){return d(r.join(":"))}function A(r){return r=d(r),r?r+":":""}const ie="memory",ae=()=>{const r=new Map;return{name:ie,options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function se(r={}){const t={mounts:{"":r.driver||ae()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},n=e=>{for(const i of t.mountpoints)if(e.startsWith(i))return{base:i,relativeKey:e.slice(i.length),driver:t.mounts[i]};return{base:"",relativeKey:e,driver:t.mounts[""]}},a=(e,i)=>t.mountpoints.filter(s=>s.startsWith(e)||i&&e.startsWith(s)).map(s=>({relativeBase:e.length>s.length?e.slice(s.length):void 0,mountpoint:s,driver:t.mounts[s]})),l=(e,i)=>{if(t.watching){i=d(i);for(const s of t.watchListeners)s(e,i)}},u=async()=>{if(!t.watching){t.watching=!0;for(const e in t.mounts)t.unwatch[e]=await x(t.mounts[e],l,e)}},o=async()=>{if(t.watching){for(const e in t.unwatch)await t.unwatch[e]();t.unwatch={},t.watching=!1}},h=(e,i,s)=>{const c=new Map,f=m=>{let y=c.get(m.base);return y||(y={driver:m.driver,base:m.base,items:[]},c.set(m.base,y)),y};for(const m of e){const y=typeof m=="string",v=d(y?m:m.key),w=y?void 0:m.value,I=y||!m.options?i:{...i,...m.options},O=n(v);f(O).items.push({key:v,value:w,relativeKey:O.relativeKey,options:I})}return Promise.all([...c.values()].map(m=>s(m))).then(m=>m.flat())},g={hasItem(e,i={}){e=d(e);const{relativeKey:s,driver:c}=n(e);return p(c.hasItem,s,i)},getItem(e,i={}){e=d(e);const{relativeKey:s,driver:c}=n(e);return p(c.getItem,s,i).then(f=>_(f))},getItems(e,i){return h(e,i,s=>s.driver.getItems?p(s.driver.getItems,s.items.map(c=>({key:c.relativeKey,options:c.options})),i).then(c=>c.map(f=>({key:ne(s.base,f.key),value:_(f.value)}))):Promise.all(s.items.map(c=>p(s.driver.getItem,c.relativeKey,c.options).then(f=>({key:c.key,value:_(f)})))))},getItemRaw(e,i={}){e=d(e);const{relativeKey:s,driver:c}=n(e);return c.getItemRaw?p(c.getItemRaw,s,i):p(c.getItem,s,i).then(f=>ee(f))},async setItem(e,i,s={}){if(i===void 0)return g.removeItem(e);e=d(e);const{relativeKey:c,driver:f}=n(e);f.setItem&&(await p(f.setItem,c,K(i),s),f.watch||l("update",e))},async setItems(e,i){await h(e,i,async s=>{s.driver.setItems&&await p(s.driver.setItems,s.items.map(c=>({key:c.relativeKey,value:K(c.value),options:c.options})),i),s.driver.setItem&&await Promise.all(s.items.map(c=>p(s.driver.setItem,c.relativeKey,K(c.value),c.options)))})},async setItemRaw(e,i,s={}){if(i===void 0)return g.removeItem(e,s);e=d(e);const{relativeKey:c,driver:f}=n(e);if(f.setItemRaw)await p(f.setItemRaw,c,i,s);else if(f.setItem)await p(f.setItem,c,X(i),s);else return;f.watch||l("update",e)},async removeItem(e,i={}){typeof i=="boolean"&&(i={removeMeta:i}),e=d(e);const{relativeKey:s,driver:c}=n(e);c.removeItem&&(await p(c.removeItem,s,i),(i.removeMeta||i.removeMata)&&await p(c.removeItem,s+"$",i),c.watch||l("remove",e))},async getMeta(e,i={}){typeof i=="boolean"&&(i={nativeOnly:i}),e=d(e);const{relativeKey:s,driver:c}=n(e),f=Object.create(null);if(c.getMeta&&Object.assign(f,await p(c.getMeta,s,i)),!i.nativeOnly){const m=await p(c.getItem,s+"$",i).then(y=>_(y));m&&typeof m=="object"&&(typeof m.atime=="string"&&(m.atime=new Date(m.atime)),typeof m.mtime=="string"&&(m.mtime=new Date(m.mtime)),Object.assign(f,m))}return f},setMeta(e,i,s={}){return this.setItem(e+"$",i,s)},removeMeta(e,i={}){return this.removeItem(e+"$",i)},async getKeys(e,i={}){e=A(e);const s=a(e,!0);let c=[];const f=[];for(const m of s){const v=(await p(m.driver.getKeys,m.relativeBase,i)).map(w=>m.mountpoint+d(w)).filter(w=>!c.some(I=>w.startsWith(I)));f.push(...v),c=[m.mountpoint,...c.filter(w=>!w.startsWith(m.mountpoint))]}return e?f.filter(m=>m.startsWith(e)&&!m.endsWith("$")):f.filter(m=>!m.endsWith("$"))},async clear(e,i={}){e=A(e),await Promise.all(a(e,!1).map(async s=>{if(s.driver.clear)return p(s.driver.clear,s.relativeBase,i);if(s.driver.removeItem){const c=await s.driver.getKeys(s.relativeBase||"",i);return Promise.all(c.map(f=>s.driver.removeItem(f,i)))}}))},async dispose(){await Promise.all(Object.values(t.mounts).map(e=>L(e)))},async watch(e){return await u(),t.watchListeners.push(e),async()=>{t.watchListeners=t.watchListeners.filter(i=>i!==e),t.watchListeners.length===0&&await o()}},async unwatch(){t.watchListeners=[],await o()},mount(e,i){if(e=A(e),e&&t.mounts[e])throw new Error(`already mounted at ${e}`);return e&&(t.mountpoints.push(e),t.mountpoints.sort((s,c)=>c.length-s.length)),t.mounts[e]=i,t.watching&&Promise.resolve(x(i,l,e)).then(s=>{t.unwatch[e]=s}).catch(console.error),g},async unmount(e,i=!0){e=A(e),!(!e||!t.mounts[e])&&(t.watching&&e in t.unwatch&&(t.unwatch[e](),delete t.unwatch[e]),i&&await L(t.mounts[e]),t.mountpoints=t.mountpoints.filter(s=>s!==e),delete t.mounts[e])},getMount(e=""){e=d(e)+":";const i=n(e);return{driver:i.driver,base:i.base}},getMounts(e="",i={}){return e=d(e),a(e,i.parents).map(c=>({driver:c.driver,base:c.mountpoint}))}};return g}function x(r,t,n){return r.watch?r.watch((a,l)=>t(a,n+l)):()=>{}}async function L(r){typeof r.dispose=="function"&&await p(r.dispose)}function oe(r={}){const t=ue(n,r.operators);function n(a,l){return typeof l!="object"||l instanceof RegExp?t.$eq(a,l):Object.keys(l||{}).every(u=>{const o=l[u];if(u.startsWith("$")&&t[u]){const h=t[u];return typeof h=="function"?h(a,o):!1}return n(B(a,u),o)})}return n}function ue(r,t={}){return{$match:(n,a)=>r(n,a),$eq:(n,a)=>a instanceof RegExp?a.test(n):n===a,$ne:(n,a)=>a instanceof RegExp?!a.test(n):n!==a,$not:(n,a)=>!r(n,a),$and:(n,a)=>(j(a,"$and requires an array as condition"),a.every(l=>r(n,l))),$or:(n,a)=>(j(a,"$or requires an array as condition"),a.some(l=>r(n,l))),$in:(n,a)=>E(a).some(l=>Array.isArray(n)?r(n,{$contains:l}):r(n,l)),$contains:(n,a)=>(n=Array.isArray(n)?n:String(n),E(a).every(l=>n.includes(l))),$icontains:(n,a)=>{if(typeof a!="string")throw new TypeError("$icontains requires a string, use $contains instead");return n=String(n).toLocaleLowerCase(),E(a).every(l=>n.includes(l.toLocaleLowerCase()))},$containsAny:(n,a)=>(j(a,"$containsAny requires an array as condition"),n=Array.isArray(n)?n:String(n),a.some(l=>n.includes(l))),$exists:(n,a)=>a?typeof n<"u":typeof n>"u",$type:(n,a)=>typeof n===String(a),$regex:(n,a)=>{if(!(a instanceof RegExp)){const l=String(a).match(/\/(.*)\/([dgimsuy]*)$/);a=l?new RegExp(l[1],l[2]||""):new RegExp(a)}return a.test(String(n||""))},$lt:(n,a)=>n<a,$lte:(n,a)=>n<=a,$gt:(n,a)=>n>a,$gte:(n,a)=>n>=a,...t||{}}}function ce(r){const t=oe(),n=(u,{query:o,before:h,after:g})=>{const e=typeof o=="string"?{_path:o}:o,i=u.findIndex(c=>t(c,e));h=h??1,g=g??1;const s=new Array(h+g).fill(null,0);return i===-1?s:s.map((c,f)=>u[i-h+f+ +(f>=h)]||null)},a=[(u,o)=>{const h=u.result.filter(g=>E(o.where).every(e=>t(g,e)));return{...u,result:h,total:h.length}},(u,o)=>E(o.sort).forEach(h=>W(u.result,h)),function(o,h,g){var e;if(h.surround){let i=n(((e=o.result)==null?void 0:e.length)===1?g:o.result,h.surround);i=$(P(h.without))(i),i=$(D(h.only))(i),o.surround=i}return o}],l=[(u,o)=>{if(o.skip)return{...u,result:u.result.slice(o.skip),skip:o.skip}},(u,o)=>{if(o.limit)return{...u,result:u.result.slice(0,o.limit),limit:o.limit}},function(o,h,g){var e,i,s;if(h.dirConfig){const c=((e=o.result[0])==null?void 0:e._path)||((s=(i=h.where)==null?void 0:i.find(m=>m._path))==null?void 0:s._path),f=g.find(m=>m._path===b(c,"_dir"));f&&(o.dirConfig={_path:f._path,...P(["_"])(f)})}return o},(u,o)=>({...u,result:$(P(o.without))(u.result)}),(u,o)=>({...u,result:$(D(o.only))(u.result)})];return async u=>{const o=await r(),h=u.params(),g={result:o,limit:0,skip:0,total:o.length},e=a.reduce((s,c)=>c(s,h,o)||s,g);if(h.count)return{result:e.result.length};const i=l.reduce((s,c)=>c(s,h,o)||s,e);return h.first?{...T(["skip","limit","total"])(i),result:i.result[0]}:i}}function N(r){const t=ce(r);return async n=>{var u;const a=n.params(),l=await t(n);return a.surround?l==null?void 0:l.surround:(l!=null&&l.dirConfig&&(l.result={_path:(u=l.dirConfig)==null?void 0:u._path,...l.result,_dir:l.dirConfig}),l==null?void 0:l.result)}}var le=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},fe={exports:{}};(function(r,t){(function(n,a,l){r.exports=l(),r.exports.default=l()})("slugify",le,function(){var n=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`),a=JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');function l(u,o){if(typeof u!="string")throw new Error("slugify: string argument expected");o=typeof o=="string"?{replacement:o}:o||{};var h=a[o.locale]||{},g=o.replacement===void 0?"-":o.replacement,e=o.trim===void 0?!0:o.trim,i=u.normalize().split("").reduce(function(s,c){var f=h[c];return f===void 0&&(f=n[c]),f===void 0&&(f=c),f===g&&(f=" "),s+f.replace(o.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")},"");return o.strict&&(i=i.replace(/[^A-Za-z0-9\s]/g,"")),e&&(i=i.trim()),i=i.replace(/\s+/g,g),o.lower&&(i=i.toLowerCase()),i}return l.extend=function(u){Object.assign(n,u)},l})})(fe);const me=r=>r.split(/[\s-]/g).map(J).join(" ");function he(r,t){const{navigation:n}=M().public.content,a=u=>({...pe(["title",...n.fields])(u),...de(u==null?void 0:u.navigation)?u.navigation:{}}),l=r.sort((u,o)=>u._path.localeCompare(o._path)).reduce((u,o)=>{const h=o._path.substring(1).split("/"),g=o._id.split(":").slice(1),e=!!g[g.length-1].match(/([1-9][0-9]*\.)?index.md/g),i=f=>({title:f.title,_path:f._path,_file:f._file,children:[],...a(f),...f._draft?{_draft:!0}:{}}),s=i(o);if(e){const f=t[s._path];if(typeof(f==null?void 0:f.navigation)<"u"&&!(f!=null&&f.navigation))return u;if(o._path!=="/"){const m=i(o);s.children.push(m)}Object.assign(s,a(f))}return h.length===1?(u.push(s),u):(h.slice(0,-1).reduce((f,m,y)=>{const v="/"+h.slice(0,y+1).join("/"),w=t[v];if(typeof(w==null?void 0:w.navigation)<"u"&&!w.navigation)return[];let I=f.find(O=>O._path===v);return I||(I={title:me(m),_path:v,_file:o._file,children:[],...a(w)},f.push(I)),I.children},u).push(s),u)},[]);return Y(l)}const ge=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function Y(r){var n;const t=r.sort((a,l)=>ge.compare(a._file,l._file));for(const a of t)(n=a.children)!=null&&n.length?Y(a.children):delete a.children,delete a._file;return r}function pe(r){return t=>(t=t||{},r&&r.length?r.filter(n=>typeof t[n]<"u").reduce((n,a)=>Object.assign(n,{[a]:t[a]}),{}):t)}function de(r){return Object.prototype.toString.call(r)==="[object Object]"}const ye=r=>k(r,M().public.content.api.baseURL),we=re(se({driver:F()}),"@content");function ve(r){async function t(){const n=new Set(await r.getKeys("cache:")),a=U().getPreviewToken();if(a){const u=await r.getItem(`${a}$`).then(g=>g||{});if(Array.isArray(u.ignoreSources)){const g=u.ignoreSources.map(e=>`cache:${e.trim()}:`);for(const e of n)g.some(i=>e.startsWith(i))&&n.delete(e)}const o=await r.getKeys(`${a}:`),h=await Promise.all(o.map(g=>r.getItem(g)));for(const g of h)n.delete(`cache:${g._id}`),g.__deleted||n.add(`${a}:${g._id}`)}return await Promise.all(Array.from(n).map(u=>r.getItem(u)))}return{storage:r,fetch:N(t),query:n=>H(N(t),{initialParams:n,legacy:!0})}}let C=null,S=null;async function Ie(){return S?await S:C||(S=Ae(),C=await S),C}async function Ae(){const r=G(),{content:t}=M().public,n=ve(we),a=await n.storage.getItem("integrity");if(t.integrity!==+(a||0)){const{contents:l,navigation:u}=await $fetch(ye(t.integrity?`cache.${t.integrity}.json`:"cache.json"));await Promise.all(l.map(o=>n.storage.setItem(`cache:${o._id}`,o))),await n.storage.setItem("navigation",u),await n.storage.setItem("integrity",t.integrity)}return await r.callHook("content:storage",n.storage),n}async function Oe(r){const t=await Ie();if(!U().getPreviewToken()&&Object.keys(r||{}).length===0)return t.storage.getItem("navigation");const n=await t.query(r).where({_partial:!1,navigation:{$ne:!1}}).find(),l=(await t.query().where({_path:/\/_dir$/i,_partial:!0}).find()).reduce((u,o)=>{var g;((g=o.title)==null?void 0:g.toLowerCase())==="dir"&&(o.title=void 0);const h=o._path.split("/").slice(0,-1).join("/")||"/";return u[h]={...o,...o.body},u},{});return he(n,l)}export{we as contentStorage,ve as createDB,Oe as generateNavigation,Ie as useContentDatabase};
