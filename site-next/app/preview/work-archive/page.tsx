// Standalone preview of the nudot-style work archive section.
// Spacer sections above and below make the scroll-in/out behavior visible.
import SectionWorkArchive from '@/components/SectionWorkArchive';
import CustomCursor from '@/components/CustomCursor';

export const metadata = { title: 'Preview — Work Archive' };

const spacerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#0a0a0a',
  color: 'rgba(255,255,255,0.3)',
  fontFamily: "'Syne', sans-serif",
  fontSize: '13px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
};

export default function WorkArchivePreview() {
  return (
    <main style={{ background: '#0a0a0a' }}>
      <CustomCursor />
      <section style={spacerStyle}>scroll down — preview spacer</section>
      <SectionWorkArchive />
      <section style={spacerStyle}>end of preview</section>
    </main>
  );
}
