'use client';

import { useState, useRef, useEffect } from 'react';

const COUNTRIES = [
  { code:'+93',flag:'🇦🇫',label:'AF'},{ code:'+355',flag:'🇦🇱',label:'AL'},{ code:'+213',flag:'🇩🇿',label:'DZ'},
  { code:'+376',flag:'🇦🇩',label:'AD'},{ code:'+244',flag:'🇦🇴',label:'AO'},{ code:'+54',flag:'🇦🇷',label:'AR'},
  { code:'+374',flag:'🇦🇲',label:'AM'},{ code:'+61',flag:'🇦🇺',label:'AU'},{ code:'+43',flag:'🇦🇹',label:'AT'},
  { code:'+994',flag:'🇦🇿',label:'AZ'},{ code:'+973',flag:'🇧🇭',label:'BH'},{ code:'+880',flag:'🇧🇩',label:'BD'},
  { code:'+32',flag:'🇧🇪',label:'BE'},{ code:'+55',flag:'🇧🇷',label:'BR'},{ code:'+1',flag:'🇨🇦',label:'CA'},
  { code:'+86',flag:'🇨🇳',label:'CN'},{ code:'+57',flag:'🇨🇴',label:'CO'},{ code:'+420',flag:'🇨🇿',label:'CZ'},
  { code:'+45',flag:'🇩🇰',label:'DK'},{ code:'+20',flag:'🇪🇬',label:'EG'},{ code:'+251',flag:'🇪🇹',label:'ET'},
  { code:'+358',flag:'🇫🇮',label:'FI'},{ code:'+33',flag:'🇫🇷',label:'FR'},{ code:'+49',flag:'🇩🇪',label:'DE'},
  { code:'+233',flag:'🇬🇭',label:'GH'},{ code:'+30',flag:'🇬🇷',label:'GR'},{ code:'+852',flag:'🇭🇰',label:'HK'},
  { code:'+36',flag:'🇭🇺',label:'HU'},{ code:'+91',flag:'🇮🇳',label:'IN'},{ code:'+62',flag:'🇮🇩',label:'ID'},
  { code:'+98',flag:'🇮🇷',label:'IR'},{ code:'+353',flag:'🇮🇪',label:'IE'},{ code:'+972',flag:'🇮🇱',label:'IL'},
  { code:'+39',flag:'🇮🇹',label:'IT'},{ code:'+81',flag:'🇯🇵',label:'JP'},{ code:'+962',flag:'🇯🇴',label:'JO'},
  { code:'+254',flag:'🇰🇪',label:'KE'},{ code:'+82',flag:'🇰🇷',label:'KR'},{ code:'+965',flag:'🇰🇼',label:'KW'},
  { code:'+60',flag:'🇲🇾',label:'MY'},{ code:'+52',flag:'🇲🇽',label:'MX'},{ code:'+31',flag:'🇳🇱',label:'NL'},
  { code:'+64',flag:'🇳🇿',label:'NZ'},{ code:'+234',flag:'🇳🇬',label:'NG'},{ code:'+47',flag:'🇳🇴',label:'NO'},
  { code:'+92',flag:'🇵🇰',label:'PK'},{ code:'+63',flag:'🇵🇭',label:'PH'},{ code:'+48',flag:'🇵🇱',label:'PL'},
  { code:'+351',flag:'🇵🇹',label:'PT'},{ code:'+974',flag:'🇶🇦',label:'QA'},{ code:'+7',flag:'🇷🇺',label:'RU'},
  { code:'+966',flag:'🇸🇦',label:'SA'},{ code:'+65',flag:'🇸🇬',label:'SG'},{ code:'+27',flag:'🇿🇦',label:'ZA'},
  { code:'+34',flag:'🇪🇸',label:'ES'},{ code:'+94',flag:'🇱🇰',label:'LK'},{ code:'+46',flag:'🇸🇪',label:'SE'},
  { code:'+41',flag:'🇨🇭',label:'CH'},{ code:'+886',flag:'🇹🇼',label:'TW'},{ code:'+66',flag:'🇹🇭',label:'TH'},
  { code:'+90',flag:'🇹🇷',label:'TR'},{ code:'+971',flag:'🇦🇪',label:'AE'},{ code:'+44',flag:'🇬🇧',label:'UK'},
  { code:'+1',flag:'🇺🇸',label:'US'},{ code:'+998',flag:'🇺🇿',label:'UZ'},{ code:'+58',flag:'🇻🇪',label:'VE'},
  { code:'+84',flag:'🇻🇳',label:'VN'},{ code:'+967',flag:'🇾🇪',label:'YE'},{ code:'+263',flag:'🇿🇼',label:'ZW'},
];

const SERVICES = [
  'Branding','Creative Strategy & Growth','Digital Marketing',
  'App Development','Website Development','Social Media Management',
  'Design Consultation','AI Video Production','Influencer Marketing',
  'Enterprise / Full Package','Other (describe below)',
];

type F = { name:string;email:string;phone:string;code:string;company:string;service:string;customService:string;message:string; };
type E = Partial<Record<keyof F,string>>;
const EMPTY:F = { name:'',email:'',phone:'',code:'+91',company:'',service:'',customService:'',message:'' };

function validate(v:F):E {
  const e:E={};
  if(!v.name.trim()) e.name='Required';
  if(!v.email.trim()||!/\S+@\S+\.\S+/.test(v.email)) e.email='Valid email required';
  if(!v.phone.trim()) e.phone='Required';
  if(!v.company.trim()) e.company='Required';
  if(!v.service) e.service='Please select';
  if(v.service==='Other (describe below)'&&!v.customService.trim()) e.customService='Required';
  if(!v.message.trim()) e.message='Required';
  return e;
}

// Custom searchable country dropdown
function CountryDropdown({ value, onChange }: { value:string; onChange:(code:string)=>void }) {
  const [open, setOpen]   = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const sel = COUNTRIES.find(c=>c.code===value) ?? COUNTRIES[0];
  const filtered = COUNTRIES.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search)
  );

  useEffect(()=>{
    function close(e:MouseEvent){ if(ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener('mousedown',close);
    return ()=>document.removeEventListener('mousedown',close);
  },[]);

  return (
    <div ref={ref} style={{ position:'relative', flexShrink:0 }}>
      <button type="button" onClick={()=>{ setOpen(o=>!o); setSearch(''); }}
        style={{ display:'flex', alignItems:'center', gap:6, padding:'0 12px 0 14px', height:52,
          background:'transparent', border:'none', cursor:'pointer', color:'#fff',
          borderRight:'1px solid rgba(255,255,255,0.12)', whiteSpace:'nowrap' }}>
        <span style={{fontSize:18}}>{sel.flag}</span>
        <span style={{fontSize:14,fontWeight:600}}>{sel.label} {sel.code}</span>
        <span style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>{open?'▲':'▾'}</span>
      </button>

      {open && (
        <div style={{
          position:'absolute', left:0, top:'calc(100% + 8px)', zIndex:100,
          width:220, maxHeight:280, overflow:'hidden',
          background:'#1a1a1a', border:'1px solid rgba(255,255,255,0.15)',
          borderRadius:12, boxShadow:'0 8px 32px rgba(0,0,0,0.6)',
          display:'flex', flexDirection:'column',
        }}>
          {/* Search */}
          <div style={{ padding:'10px 12px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
            <input autoFocus type="text" placeholder="🔍  Search country..."
              value={search} onChange={e=>setSearch(e.target.value)}
              style={{ width:'100%', boxSizing:'border-box', padding:'8px 12px', borderRadius:8,
                background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)',
                color:'#fff', fontSize:13, fontFamily:"'Syne',sans-serif", outline:'none' }} />
          </div>
          {/* List */}
          <div style={{ overflowY:'auto', maxHeight:210 }}>
            {filtered.length === 0 ? (
              <div style={{ padding:'12px 16px', fontSize:13, color:'rgba(255,255,255,0.4)' }}>No results</div>
            ) : filtered.map(c => (
              <button key={c.label+c.code} type="button"
                onClick={()=>{ onChange(c.code); setOpen(false); }}
                style={{ width:'100%', display:'flex', alignItems:'center', gap:10,
                  padding:'10px 16px', background: c.code===value?'rgba(255,255,255,0.08)':'transparent',
                  border:'none', cursor:'pointer', color:'#fff', fontSize:14,
                  fontFamily:"'Syne',sans-serif", textAlign:'left',
                  transition:'background .15s' }}
                onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.06)')}
                onMouseLeave={e=>(e.currentTarget.style.background=c.code===value?'rgba(255,255,255,0.08)':'transparent')}>
                <span style={{fontSize:18}}>{c.flag}</span>
                <span style={{fontWeight:600}}>{c.label}</span>
                <span style={{color:'rgba(255,255,255,0.5)',marginLeft:'auto',fontSize:13}}>{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SectionContactForm() {
  const [values,  setValues]  = useState<F>(EMPTY);
  const [errors,  setErrors]  = useState<E>({});
  const [focused, setFocused] = useState<keyof F|null>(null);
  const [sent,    setSent]    = useState(false);

  const set = (k:keyof F) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setValues(v=>({...v,[k]:e.target.value}));

  function submit(e:React.FormEvent){
    e.preventDefault();
    const errs=validate(values);
    if(Object.keys(errs).length){ setErrors(errs); return; }

    const body = `
Hi,

I'm interested in your services. Here are my details:

NAME: ${values.name}
EMAIL: ${values.email}
PHONE: ${values.code} ${values.phone}
COMPANY: ${values.company}
SERVICE: ${values.service}${values.service === 'Other (describe below)' ? `\nDESCRIPTION: ${values.customService}` : ''}

MESSAGE:
${values.message}

---
Sent via Create Studio Contact Form
`.trim();

    const subject = `New Inquiry from ${values.name} - ${values.company}`;
    const mailtoUrl = `mailto:sales@thecreate.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSent(true);
    setTimeout(() => window.location.href = mailtoUrl, 400);
  }

  const border = (k:keyof F) => errors[k]?'rgba(255,107,107,0.7)':focused===k?'rgba(255,255,255,0.35)':'rgba(255,255,255,0.1)';
  const shadow = (k:keyof F) => focused===k?'0 0 0 3px rgba(139,68,255,0.18)':'none';
  const inputSx = (k:keyof F):React.CSSProperties => ({
    height:52,boxSizing:'border-box',padding:'0 18px',borderRadius:12,
    background:'rgba(255,255,255,0.04)',fontFamily:"'Syne',sans-serif",
    fontSize:15,color:'#fff',outline:'none',width:'100%',
    border:`1px solid ${border(k)}`,boxShadow:shadow(k),
    transition:'border-color 0.2s,box-shadow 0.2s',
  });

  const firstName = values.name.split(' ')[0]||'there';
  const LBL:React.CSSProperties = { fontSize:14,fontWeight:500,letterSpacing:'0.01em',color:'rgba(255,255,255,0.75)',marginBottom:10 };
  const ERR = (k:keyof F) => errors[k] ? <span style={{fontSize:12,color:'#FF6B6B',marginTop:4}}>{errors[k]}</span> : null;

  return (
    <section id="section-contact-form" style={{
      width:'100vw',
      minHeight: values.service === 'Other (describe below)' ? '120vh' : '100vh',
      position:'relative', overflow:'hidden',
      background:'#050505', color:'#fff', fontFamily:"'Syne',sans-serif",
      display:'flex', scrollSnapAlign:'start' as const, scrollSnapStop:'always' as const,
      paddingBottom: 80,
    }}>
      {/* Animated left blob */}
      <div aria-hidden="true" style={{ position:'absolute',left:0,top:0,bottom:0,width:640,overflow:'hidden',pointerEvents:'none' }}>
        <div style={{ position:'absolute',left:-60,bottom:-80,width:440,height:440,borderRadius:'50%',
          background:'linear-gradient(135deg,#44FF9A 0%,#44B0FF 28%,#8B44FF 55%,#FF6644 80%,#EBFF70 100%)',
          animation:'cf-float 10s ease-in-out infinite,cf-hue 30s linear infinite' }} />
        <div style={{ position:'absolute',left:120,bottom:-50,width:220,height:120,borderRadius:'50%',
          background:'#fff',opacity:0.85,animation:'cf-float 12s ease-in-out infinite reverse' }} />
        <div style={{ position:'absolute',inset:0,display:'flex',backdropFilter:'blur(30px)',WebkitBackdropFilter:'blur(30px)' }}>
          {Array.from({length:9}).map((_,i)=>(
            <div key={i} style={{ height:'100%',width:64,flexShrink:0,opacity:0.3,
              background:'linear-gradient(90deg,rgba(255,255,255,0) 0%,#000 69%,rgba(255,255,255,0.19) 100%)' }} />
          ))}
        </div>
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(5,5,5,0) 0%,#050505 58%)' }} />
        <div style={{ position:'absolute',top:0,right:0,bottom:0,width:200,background:'linear-gradient(90deg,rgba(5,5,5,0) 0%,#050505 100%)' }} />
      </div>

      {/* Left text */}
      <div style={{ position:'relative',zIndex:2,flexShrink:0,width:568,padding:'132px 56px 80px 72px',display:'flex',flexDirection:'column',gap:24 }}>
        <span style={{ fontSize:13,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)' }}>( Contact )</span>
        <h2 style={{ margin:0,fontSize:44,fontWeight:500,lineHeight:1.12,letterSpacing:'-0.02em',textTransform:'uppercase' }}>Design and growth partner for bold brands.</h2>
        <p style={{ margin:0,maxWidth:400,fontSize:16,lineHeight:1.65,color:'rgba(255,255,255,0.65)' }}>Tell us what you're building. We'll reply within one business day with next steps.</p>
        <a href="mailto:sales@thecreate.studio" style={{ alignSelf:'flex-start',fontSize:16,color:'#fff',textDecoration:'none',borderBottom:'1px solid rgba(255,255,255,0.35)',paddingBottom:3 }}>sales@thecreate.studio</a>
      </div>

      {/* Right form */}
      <div style={{ flex:1,position:'relative',zIndex:2,padding:'124px 72px 72px 28px',display:'flex',alignItems:'flex-start',overflow:'visible' }}>
        {sent ? (
          <div style={{ display:'flex',flexDirection:'column',alignItems:'flex-start',gap:20,width:'100%' }}>
            <span style={{ fontSize:13,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)' }}>( Brief received )</span>
            <h3 style={{ margin:0,fontSize:44,fontWeight:500,letterSpacing:'-0.02em',textTransform:'uppercase',background:'linear-gradient(102deg,#44FF9A 0%,#44B0FF 25%,#8B44FF 50%,#FF6644 75%,#EBFF70 100%)',WebkitBackgroundClip:'text',backgroundClip:'text',WebkitTextFillColor:'transparent' }}>Thanks, {firstName}!</h3>
            <p style={{ margin:0,maxWidth:480,fontSize:16,lineHeight:1.65,color:'rgba(255,255,255,0.7)' }}>We'll get back to you at {values.email} within one business day.</p>
            <div className="cf-submit-wrap" style={{marginTop:12}}>
              <button className="cf-submit-btn" onClick={()=>{ setSent(false); setValues(EMPTY); setErrors({}); }}>Send another enquiry</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate style={{ width:'100%',display:'flex',flexDirection:'column' }}>

            <h4 style={{ margin:'0 0 20px',fontSize:13,fontWeight:500,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)' }}>Your details</h4>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',columnGap:28,rowGap:16 }}>
              <div style={{display:'flex',flexDirection:'column'}}>
                <label style={LBL}>Name <span style={{color:'#FF6B6B'}}>*</span></label>
                <input type="text" placeholder="Let us know your name" value={values.name} onChange={set('name')}
                  onFocus={()=>setFocused('name')} onBlur={()=>setFocused(null)} style={inputSx('name')} />
                {ERR('name')}
              </div>
              <div style={{display:'flex',flexDirection:'column'}}>
                <label style={LBL}>Email <span style={{color:'#FF6B6B'}}>*</span></label>
                <input type="email" placeholder="We'll reply to this address" value={values.email} onChange={set('email')}
                  onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)} style={inputSx('email')} />
                {ERR('email')}
              </div>
              <div style={{display:'flex',flexDirection:'column'}}>
                <label style={LBL}>Phone No. <span style={{color:'#FF6B6B'}}>*</span></label>
                <div style={{ height:52,display:'flex',alignItems:'center',borderRadius:12,
                  background:'rgba(255,255,255,0.04)',border:`1px solid ${border('phone')}`,
                  boxShadow:shadow('phone'),overflow:'visible',transition:'border-color 0.2s,box-shadow 0.2s' }}>
                  <CountryDropdown value={values.code} onChange={code=>setValues(v=>({...v,code}))} />
                  <input type="tel" placeholder="Where can we reach you" value={values.phone} onChange={set('phone')}
                    onFocus={()=>setFocused('phone')} onBlur={()=>setFocused(null)}
                    style={{ flex:1,minWidth:0,height:'100%',padding:'0 16px',border:'none',background:'transparent',
                      fontFamily:"'Syne',sans-serif",fontSize:15,color:'#fff',outline:'none' }} />
                </div>
                {ERR('phone')}
              </div>
              <div style={{display:'flex',flexDirection:'column'}}>
                <label style={LBL}>Company <span style={{color:'#FF6B6B'}}>*</span></label>
                <input type="text" placeholder="Organisation you represent" value={values.company} onChange={set('company')}
                  onFocus={()=>setFocused('company')} onBlur={()=>setFocused(null)} style={inputSx('company')} />
                {ERR('company')}
              </div>
            </div>

            <h4 style={{ margin:'28px 0 20px',fontSize:13,fontWeight:500,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)' }}>Project details</h4>
            <div style={{display:'flex',flexDirection:'column',marginBottom:16}}>
              <label style={LBL}>I am looking for <span style={{color:'#FF6B6B'}}>*</span></label>
              <div style={{position:'relative'}}>
                <select value={values.service} onChange={set('service')}
                  onFocus={()=>setFocused('service')} onBlur={()=>setFocused(null)}
                  style={{...inputSx('service'),paddingRight:48,appearance:'none',WebkitAppearance:'none',
                    color:values.service?'#fff':'rgba(255,255,255,0.35)'} as React.CSSProperties}>
                  <option value="" style={{color:'#111'}}>Select one...</option>
                  {SERVICES.map(s=><option key={s} value={s} style={{color:'#111'}}>{s}</option>)}
                </select>
                <span style={{position:'absolute',right:16,top:'50%',transform:'translateY(-50%)',color:'rgba(255,255,255,0.4)',pointerEvents:'none',fontSize:14}}>▾</span>
              </div>
              {ERR('service')}
            </div>

            {values.service==='Other (describe below)' && (
              <div style={{display:'flex',flexDirection:'column',marginBottom:16}}>
                <label style={LBL}>Describe what you need <span style={{color:'#FF6B6B'}}>*</span></label>
                <input type="text" placeholder="Tell us about your project" value={values.customService} onChange={set('customService')}
                  onFocus={()=>setFocused('customService')} onBlur={()=>setFocused(null)} style={inputSx('customService')} />
                {ERR('customService')}
              </div>
            )}

            <div style={{display:'flex',flexDirection:'column',marginBottom:16}}>
              <label style={LBL}>Message <span style={{color:'#FF6B6B'}}>*</span></label>
              <textarea placeholder="Goals, timeline, budget — anything that helps" value={values.message} onChange={set('message')}
                onFocus={()=>setFocused('message')} onBlur={()=>setFocused(null)}
                style={{...inputSx('message'),height:110,padding:'14px 18px',resize:'vertical'} as React.CSSProperties} />
              {ERR('message')}
            </div>

            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:8}}>
              <span style={{fontSize:12,color:'rgba(255,255,255,0.35)'}}>* Required fields</span>
              <div className="cf-submit-wrap">
                <button type="submit" className="cf-submit-btn">Submit</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
