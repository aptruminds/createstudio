'use client';

import Image from 'next/image';
import AIGradientBorder from '@/components/ui/AIGradientBorder';

function scrollToForm(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById('section-contact-form')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Section8Contact() {

  return (
    <>
      <section id="section-8">
        <div className="contact-circles-l">
          <Image src="/contact-circles.png" alt="" width={600} height={600} style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="contact-circles-r">
          <Image src="/contact-circles.png" alt="" width={600} height={600} style={{ width: '100%', height: 'auto' }} />
        </div>

        {/* Mobile-only: animated dot-grid + expanding rings background */}
        <div className="s8-mobile-bg" aria-hidden>
          <div className="s8-ring" />
          <div className="s8-ring" />
          <div className="s8-ring" />
          <div className="s8-ring" />
        </div>

        <div className="contact-main-area">
          <div className="contact-center">
            <Image className="contact-logo" src="/contact-logo.svg" alt="Create Studio" width={120} height={19} style={{ height: 19, width: 'auto' }} />

            <div className="contact-heading">
              <div className="ch-row">
                <span className="ch-geist">GREAT BRANDS&nbsp;</span>
                <span className="ch-serif">start</span>
              </div>
              <div className="ch-row">
                <span className="ch-serif">here</span>
                <span className="ch-geist">. YOURS SHOULD</span>
              </div>
              <div className="ch-row">
                <span className="ch-geist">TOO.</span>
              </div>
            </div>

            <p className="contact-sub">
              <b>YOUR </b>brand deserves more than just attention<br />
              it deserves leadership. <b>LET&apos;S BUILD IT BOLDLY</b>
            </p>

            <AIGradientBorder className="contact-cta-wrap">
              <a href="#section-contact-form" className="contact-cta" onClick={scrollToForm}>Book a Consultation</a>
            </AIGradientBorder>
          </div>
        </div>
      </section>

    </>
  );
}
