'use client';

import { useState, useEffect, useRef } from 'react';
import scrollToId from '@/lib/scrollToId';

const LINKS = [
  ['#section-2',             'Gallery'],
  ['#section-about',         'About'],
  ['#section-services-grid', 'Services'],
  ['#section-4',             'Showreel'],
  ['#section-3',             'Work'],
  ['#section-7',             'Subscription'],
];

const CYCLE_SEC = 22;

export default function SectionFooter() {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [headHovered, setHeadHovered] = useState(false);

  const svgRef    = useRef<SVGSVGElement>(null);
  const blobRef   = useRef<HTMLDivElement>(null);
  const fillRef   = useRef<HTMLDivElement>(null);
  const spotRef   = useRef<HTMLDivElement>(null);
  const stageRef  = useRef<HTMLElement>(null);
  const cmRef     = useRef<SVGFEColorMatrixElement | null>(null);
  const dm1Ref    = useRef<SVGElement | null>(null);
  const dm2Ref    = useRef<SVGElement | null>(null);
  const rafRef    = useRef<number>(0);
  const phaseRef  = useRef(0);
  const boostRef  = useRef(0);
  const curRef    = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const svg  = svgRef.current;
    const blob = blobRef.current;
    const fill = fillRef.current;
    if (!svg || !blob || !fill) return;

    // Apply mask image to fill div
    fill.style.maskImage         = "url('/footer/ethereal-mask.png')";
    fill.style.webkitMaskImage   = "url('/footer/ethereal-mask.png')";
    fill.style.maskSize          = 'cover';
    (fill.style as any).webkitMaskSize     = 'cover';
    fill.style.maskRepeat        = 'no-repeat';
    (fill.style as any).webkitMaskRepeat   = 'no-repeat';
    fill.style.maskPosition      = 'center';
    (fill.style as any).webkitMaskPosition = 'center';

    // Build SVG displacement filter
    const NS = 'http://www.w3.org/2000/svg';
    const mk = (tag: string, attrs: Record<string, string>) => {
      const el = document.createElementNS(NS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      return el;
    };
    const defs = mk('defs', {});
    const f    = mk('filter', { id: 'ft-disp', x: '-20%', y: '-20%', width: '140%', height: '140%' });
    f.appendChild(mk('feTurbulence', { result: 'undulation', numOctaves: '2', baseFrequency: '0.0005,0.002', seed: '0', type: 'turbulence' }));
    const cm = mk('feColorMatrix', { in: 'undulation', type: 'hueRotate', values: '180' }) as SVGFEColorMatrixElement;
    f.appendChild(cm);
    f.appendChild(mk('feColorMatrix', { result: 'circulation', type: 'matrix', values: '4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0' }));
    const dm1 = mk('feDisplacementMap', { in: 'SourceGraphic', in2: 'circulation', scale: '100', result: 'dist' });
    const dm2 = mk('feDisplacementMap', { in: 'dist', in2: 'undulation', scale: '100', result: 'output' });
    f.appendChild(dm1); f.appendChild(dm2);
    defs.appendChild(f); svg.appendChild(defs);
    cmRef.current = cm as SVGFEColorMatrixElement;
    dm1Ref.current = dm1; dm2Ref.current = dm2;
    blob.style.filter = 'url(#ft-disp) blur(4px)';

    let last = performance.now();
    const tick = (ts: number) => {
      const dt = Math.min(0.05, (ts - last) / 1000); last = ts;
      boostRef.current *= 0.94;
      phaseRef.current += (dt / CYCLE_SEC) * 360 * (1 + boostRef.current * 6);
      if (cmRef.current)  cmRef.current.setAttribute('values', String(phaseRef.current % 360));
      const warp = String(100 + Math.min(1, boostRef.current) * 90);
      if (dm1Ref.current) dm1Ref.current.setAttribute('scale', warp);
      if (dm2Ref.current) dm2Ref.current.setAttribute('scale', warp);
      const tx = targetRef.current;
      curRef.current.x += (tx.x - curRef.current.x) * 0.05;
      curRef.current.y += (tx.y - curRef.current.y) * 0.05;
      if (blobRef.current) blobRef.current.style.transform = `translate(${(curRef.current.x - 0.5) * 80}px,${(curRef.current.y - 0.5) * 60}px)`;
      if (spotRef.current) {
        const s = stageRef.current;
        spotRef.current.style.transform = `translate(${curRef.current.x * (s?.offsetWidth ?? 1440)}px,${curRef.current.y * (s?.offsetHeight ?? 900)}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function onMove(e: React.MouseEvent) {
    const s = stageRef.current; if (!s) return;
    const r = s.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    boostRef.current = Math.min(1.5, boostRef.current + Math.hypot(x - targetRef.current.x, y - targetRef.current.y) * 4);
    targetRef.current = { x, y };
    if (spotRef.current) spotRef.current.style.opacity = '1';
  }
  function onLeave() {
    targetRef.current = { x: 0.5, y: 0.5 };
    if (spotRef.current) spotRef.current.style.opacity = '0';
  }

  return (
    <section id="section-footer" ref={stageRef} className="ft-section" onMouseMove={onMove} onMouseLeave={onLeave}>
      {/* Animated bg */}
      <div style={{ position:'absolute', inset:0, zIndex:0, overflow:'hidden' }}>
        <svg ref={svgRef} aria-hidden="true" style={{ position:'absolute', width:0, height:0 }} />
        <div ref={blobRef} style={{ position:'absolute', inset:-100 }}>
          {/* fill div — mask applied via JS */}
          <div ref={fillRef} className="ft-es-fill" style={{ width:'100%', height:'100%', opacity:0.55 }} />
        </div>
        <div ref={spotRef} style={{ position:'absolute', left:0, top:0, width:760, height:760, margin:'-380px 0 0 -380px', borderRadius:'50%', pointerEvents:'none', opacity:0, background:'radial-gradient(closest-side,rgba(139,68,255,0.28),rgba(68,176,255,0.12) 45%,rgba(0,0,0,0) 100%)', mixBlendMode:'screen', transition:'opacity 0.6s ease', willChange:'transform' }} />
        <div className="ft-noise" style={{ position:'absolute', inset:0, opacity:0.35, pointerEvents:'none' }} />
      </div>

      <div className="ft-inner">
        <div className="ft-col-left">
          <nav className="ft-nav" onMouseLeave={() => setHoveredLink(null)}>
            {LINKS.map(([href, label], i) => (
              <a key={href} href={href} onClick={scrollToId(href.replace('#',''))} onMouseEnter={() => setHoveredLink(i)}
                style={{ display:'flex', alignItems:'center', gap:12, fontSize:30, fontWeight:500, lineHeight:1.2, letterSpacing:'-0.02em', textDecoration:'none', color: hoveredLink===i ? '#fff' : hoveredLink===null ? '#d0d0c8' : 'rgba(208,208,200,0.45)', transition:'color 0.3s ease' }}>
                <span style={{ display:'block', width: hoveredLink===i ? 28 : 0, height:2, borderRadius:1, background:'linear-gradient(90deg,#44FF9A,#44B0FF,#8B44FF,#FF6644,#EBFF70)', transition:'width 0.35s cubic-bezier(0.16,1,0.3,1)', flexShrink:0, overflow:'hidden' }} />
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <p style={{ margin:'auto 0 0', paddingTop:56, fontSize:12, color:'rgba(208,208,200,0.6)' }}>© 2026 — Copyright</p>
        </div>

        <div className="ft-col-right">
          <div onMouseEnter={() => setHeadHovered(true)} onMouseLeave={() => setHeadHovered(false)}
            style={{ fontFamily:"'Rubik Dirt',system-ui", fontWeight:400, fontSize:69, lineHeight:0.92, letterSpacing:'-0.02em', textTransform:'uppercase', color:'#fff', cursor:'default' }}>
            <div>LEAVE THE</div>
            <div>HARD PART TO{' '}
              <span style={{ display:'inline-block', color: headHovered?'transparent':'#F14A73', background: headHovered?'linear-gradient(102deg,#44FF9A 0%,#44B0FF 25%,#8B44FF 50%,#FF6644 75%,#EBFF70 100%)':'none', WebkitBackgroundClip: headHovered?'text':undefined, backgroundClip: headHovered?'text':undefined, WebkitTextFillColor: headHovered?'transparent':'#F14A73', transform: headHovered?'scale(1.08) rotate(-3deg)':'none', transformOrigin:'left bottom', transition:'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}>US</span>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'rgba(208,208,200,0.3)', flexShrink:0 }} />
                <span style={{ fontSize:10, fontWeight:500, letterSpacing:'0.04em', textTransform:'uppercase', color:'rgba(208,208,200,0.6)' }}>Contact us</span>
              </div>
              <a href="mailto:sales@thecreate.studio" style={{ fontSize:15, color:'#d0d0c8', textDecoration:'none' }}
                onMouseEnter={e=>(e.currentTarget.style.opacity='0.6')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
                sales@thecreate.studio
              </a>
            </div>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
              <a href="https://in.linkedin.com/showcase/truminds-createstudio/" target="_blank" rel="noopener noreferrer" className="ft-social-lift"
                style={{ display:'flex', alignItems:'center', justifyContent:'center', width:40, height:40, borderRadius:'50%', background:'#d0d0c8' }}>
                <img src="/footer/linkedin.svg" alt="LinkedIn" style={{ display:'block', width:14, height:14 }} />
              </a>
              <a href="https://www.instagram.com/thecreate.studio/" target="_blank" rel="noopener noreferrer" className="ft-social-lift"
                style={{ display:'block', width:40, height:40 }}>
                <img src="/footer/instagram.svg" alt="Instagram" style={{ display:'block', width:40, height:40 }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
