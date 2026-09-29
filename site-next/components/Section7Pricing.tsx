'use client';

import { useEffect, useRef } from 'react';
import AIGradientBorder from '@/components/ui/AIGradientBorder';

const PLANS = [
  {
    name: 'Starter',
    sub: 'Ideal for Startups & Small Businesses',
    popular: false,
    features: [
      '10 creatives / print media per month',
      '10 motion graphics / Reels per month',
      'Shared account manager',
      'Upto 2 revision rounds',
      'Monthly analysis report',
    ],
  },
  {
    name: 'Growth',
    sub: 'Best for Growing Business',
    popular: true,
    features: [
      '15 creative / print media per month',
      '15 motion graphics / Reels per month',
      'Dedicated account manager',
      'Upto 3 revision rounds',
      '48-72 hr turnaround',
      'Monthly analysis report',
    ],
  },
  {
    name: 'Scale',
    sub: 'Ideal for Mid-Sized Entities',
    popular: false,
    features: [
      '20 creatives / print media per month',
      '20 motion graphics / Reels per month',
      'Dedicated account manager',
      'Upto 3 revision rounds',
      '48-72 hr turnaround',
      'Monthly analysis report',
    ],
  },
  {
    name: 'Enterprise',
    sub: 'Big Transformational Work',
    popular: false,
    features: [
      'Complete Brand Strategy & Identity',
      'Creative Strategy',
      'Marketing Campaigns',
      'App Design and Development',
      'Website Design and Development',
      'AI and Motion Videos',
    ],
  },
];

export default function Section7Pricing() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLDivElement>('.pricing-card');
    if (!cards) return;

    const handlers: Array<{ el: HTMLDivElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cards.forEach((card) => {
      const move = (e: MouseEvent) => {
        const r  = card.getBoundingClientRect();
        const x  = e.clientX - r.left;
        const y  = e.clientY - r.top;
        const cx = r.width / 2, cy = r.height / 2;
        const rotY =  ((x - cx) / cx) * 14;
        const rotX = -((y - cy) / cy) * 14;
        card.style.transform  = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
        card.style.boxShadow  = `${-rotY * 1.5}px ${rotX * 1.5}px 40px rgba(0,0,0,.45)`;
        card.style.setProperty('--mx', (x / r.width  * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y / r.height * 100).toFixed(1) + '%');
      };
      const leave = () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      handlers.push({ el: card, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <section id="section-7">
      <div className="pricing-glow-l" />
      <div className="pricing-glow-r" />

      <div style={{ alignSelf:'flex-start', width:'100%', maxWidth:1360, margin:'0 auto', position:'relative', zIndex:1 }}>
        <span className="pricing-eyebrow">( Pricing )</span>
        <h2 className="pricing-title">Our Subscription<br />Models</h2>
      </div>

      <div className="pricing-grid" ref={gridRef}>
        {PLANS.map((plan) => (
          <div key={plan.name} className={`pricing-card${plan.popular ? ' popular' : ''}`}>
            <div className="pricing-card-inner">
              <div className="pricing-plan-header">
                <span className="pricing-plan-name">{plan.name}</span>
                {plan.popular && <span className="pricing-plan-badge">Popular</span>}
              </div>
              <p className="pricing-plan-sub">{plan.sub}</p>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {plan.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <AIGradientBorder className="pricing-cta">
        <a className="pricing-cta-inner" href="#section-contact-form" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('section-contact-form')?.scrollIntoView({ behavior: 'smooth' }); }}>Get in Touch</a>
      </AIGradientBorder>
    </section>
  );
}
