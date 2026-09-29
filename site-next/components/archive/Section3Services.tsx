'use client';

import { CometCard } from '@/components/ui/comet-card';
import BlobCursor from '@/components/BlobCursor';

const B = '/services/';

const imgBranding        = B + 'bcd9f5709dd3b3062e8ae9799a713a2bd0424012.png';
const imgCreative        = B + '4c08a7bb2f65c79482eefb753f6713def2ea220a.png';
const imgDigitalMkt      = B + 'e951f0729630674f2eb35e03dc14ceda1e637900.png';
const imgIPhone          = B + '19a5b7319501c627f84207b017c8ac536ab5c896.png';
const imgSocialMedia     = B + 'ae26a35dbc48dd320731cadcd95d5f81ede8f115.png';
const imgDesignConsult   = B + '55c135e0cbfe754e3a9cdc9f6bfb28a4906f42e7.png';
const imgIPadMini        = B + '2a831f94d99c2eb43e5193a1423ea2bcbe70a202.png';
const imgCityscape       = B + '407b6440b6f9234a8aefbb869528e5e45edcaee4.png';
const imgInfluencer      = B + '4d7309433db9b56fbff3c63d6a6ac86fdfd24090.png';

// Website Dev card — laptop mockup SVG layers
const imgShadow          = B + '4c7f8602b9c4bf23e74ed01c43d1e5b9953e43a3.svg';
const imgOutsideCasing   = B + 'ed3ab2cb4c0e71e28611a71a2c6e4afaa4b35e20.svg';
const imgRubberEdging    = B + 'a1af617eadf4ccea089a588be24663fc33b38616.svg';
const imgScreenBorder    = B + '52fe77286ab1980b8b2a917ff94d220e6a11c021.svg';
const imgBottomCasing    = B + '149ed93b1c927941c52f2ae1619551a8200bdc17.svg';
const imgCamera          = B + '1ca4756fb2ecacac15654b868867fa7f91aaf130.svg';
const imgOval            = B + '39fe25f4064904dbc83651cd002f196a7e806671.svg';
const imgOval1           = B + '302bbfd51f7418d43ead62cff916a1644bad9295.svg';
const imgEllipse1        = B + '1ccfff82d49c96a968b274371e2bdd8a06b9f26b.png';
const imgNotifications   = B + '9e32bac047fb7501743accdc83eefbf78c72e3ca.svg';
const imgAvailable       = B + '910572f10dba91d4076208696850b9637d9ae3a4.svg';
const imgAvailable1      = B + '043c9331d7b3bf85c14ab5e08a3104491a46470f.svg';
const imgAvailable2      = B + 'a578c720ec8a1ebd0c440d26f54059e9e6f69d6d.svg';
const imgAvailable3      = B + '95e1b6025946da91428c6d256383a521abdae60d.svg';
const imgAvailable4      = B + '50ec4394f9db6eaa7256863d646bd716b3dde86e.svg';
const imgContainer       = B + '8474dd938897ddebf8e9f1657a44b6a4ec812394.svg';
const imgLegend          = B + 'cd3fe3360d9a924083f11e4ac83011a50390e71f.svg';
const imgLegend1         = B + 'cde72eabb322419acd955cc1f68ac61990ece29e.svg';
const imgLegend2         = B + 'e42597c773c5d2d6a5a093cd9a1d74aea809b421.svg';
const imgHeader          = B + '976f861f5ccc7b268f18c839b0156757655c0de1.svg';
const imgHub             = B + '2612b26d8164d24882df8894f1064cdae09ab983.svg';
const imgLine17          = B + '7b4334d338a98da6d3dbbb78312df084797223b5.svg';
const imgDns             = B + '56db77a08500c27bf93d0bd5d62927f5a1b0521b.svg';
const imgSimCard         = B + 'e6efcfbc6a6cffe25188dd612938f1b2cd9c5fc8.svg';
const imgRssFeed         = B + 'cc4ebf7ebd1738a44939eeccfad7f80218afd8ca.svg';
const imgShift           = B + '0affc7c8ddb2583f35ba5eeb86daf264b584bced.svg';
const imgShift1          = B + '00faf9cf1b7b552767809fef86fd88adc307f5d5.svg';
const imgShift2          = B + 'f810285d600e5963e94e32e0c2d06e9a022cfca2.svg';
const imgShift3          = B + '272353451ad06d3c5e78a48534002aa34f094055.svg';
const imgShift4          = B + '2da147b149fd36c75653d5c86c4561dc8bacba70.svg';
const imgShift5          = B + 'acbd0c1552ca6aa8fefeaf99a990a18936da2ee1.svg';
const imgGroup483848     = B + '206d45d24e879141a658f4bc3e70fe12edab9559.svg';
const imgGroup483849     = B + '56b0fae532130e140ca8b40e19391b1f2289c62e.svg';
const imgEllipse23       = B + 'd53a141c896a07ec2e6d843013a27393c4c88a82.svg';
const imgExpandMore      = B + '475f0081a9fa110c34706c7dd080bd7289c94744.svg';
const imgExpandMore1     = B + '58a40c155b44c5e41f838288b99a82736f5c445d.svg';
const imgExpandMore2     = B + '912039b6db0aa60b02b379dde0007545d7ff5185.svg';
const imgExpandMore3     = B + '80ec018e392c4c7c2df6704d614109c3f89002db.svg';
const imgTeamDashboard   = B + '35c0d541b56d317fc87d57da760997e8e47fc438.svg';
const imgArrowRight      = B + 'e07d03667fbae7b3b29eab67a3bad3024804f4e0.svg';
const imgInventory2      = B + '4b3203f4d49dc1c48f355041d7ed837dcf48ba74.svg';
const imgGppMaybe        = B + '0a516c287e29a118a75bd41b8fe23f034d25668c.svg';
const imgMonitorHeart    = B + '10ba37060f41f8935a3ca253bfd75afff04b2b3a.svg';
const imgLanguage        = B + 'bc87185b265bf86f1aa3bfa626d75088f47835b0.svg';
const imgShoppingCart    = B + '03a5298ceb62ac9721726bf78f1722c5d095f72d.svg';
const imgPerson1         = B + '119cc57dc53ac34660a6ead20f05714b4fffd9ca.svg';
const imgTune            = B + 'af9a5636ce628df88460e6532ab2e021283104c3.svg';
const imgFolderManaged   = B + '6d92afecc418c156b03ac70f9be5d5ec92579439.svg';
const imgHandyman        = B + '3d96fa9e8e356529012efd1d771e152564cdd71d.svg';
const imgConfirmNumber   = B + 'b2a8df2e56856d64bdda6e8611409d249ec1df2c.svg';

const SIDEBAR_ICONS = [
  { top: '32.98px', src: imgInventory2 },
  { top: '46.86px', src: imgGppMaybe },
  { top: '60.75px', src: imgMonitorHeart },
  { top: '74.64px', src: imgLanguage },
  { top: '88.52px', src: imgShoppingCart },
  { top: '116.29px', src: imgConfirmNumber },
  { top: '130.18px', src: imgTune },
  { top: '144.06px', src: imgFolderManaged },
  { top: '157.95px', src: imgHandyman },
];

const KPI_DOTS = [
  { left: '24.51px', top: '29.49px' }, { left: '33.84px', top: '36.21px' },
  { left: '44.04px', top: '31.43px' }, { left: '54.45px', top: '42.07px' },
  { left: '63.14px', top: '38.16px' }, { left: '71.59px', top: '36.43px' },
  { left: '82px',    top: '32.07px' }, { left: '90.9px',  top: '30.35px' },
  { left: '100.88px',top: '35.35px' }, { left: '113.04px',top: '37.52px' },
  { left: '124.1px', top: '34.47px' }, { left: '14.57px', top: '46.4px'  },
];

function CardName({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <div
      className="s3-card-name"
      style={{ width: wide ? '359px' : '325.233px' }}
    >
      {label}
    </div>
  );
}

function CardBadge() {
  return <div className="s3-badge" />;
}

/* ── Website Development laptop mockup ─────────────────────────────── */
function LaptopMockup() {
  return (
    <div
      style={{
        position: 'absolute',
        left: 'calc(50% - 6.16px)', top: 'calc(50% - 10.33px)',
        transform: 'translate(-50%, -50%)',
        width: '405px', height: '223.344px',
        overflow: 'clip',
      }}
    >
      {/* Shadow */}
      <div style={{ position: 'absolute', inset: '96.21% 4.23% 1.99% 4.28%' }}>
        <div style={{ position: 'absolute', inset: '-75% -0.82%' }}>
          <img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgShadow} />
        </div>
      </div>

      {/* Outer casing */}
      <div style={{ position: 'absolute', inset: '0 9.5% 5.32% 9.5%' }}>
        <div style={{ position: 'absolute', inset: '-0.19% -0.25% -0.57% -0.25%' }}>
          <img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgOutsideCasing} />
        </div>
      </div>
      <div style={{ position: 'absolute', inset: '0.36% 9.69% 5.68% 9.7%' }}>
        <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgRubberEdging} />
      </div>
      <div style={{ position: 'absolute', inset: '0.72% 9.9% 6.04% 9.89%' }}>
        <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgScreenBorder} />
      </div>
      <div style={{ position: 'absolute', inset: '89.18% 9.9% 8.11% 9.89%', background: '#262c2d' }} />

      {/* Dashboard screen content */}
      <div style={{ position: 'absolute', background: '#fff', height: '183.116px', left: '46.34px', overflow: 'clip', top: '9.46px', width: '312.426px' }}>

        {/* Global header bar */}
        <div style={{ position: 'absolute', background: '#fff', height: '13.018px', left: 0, right: 0, top: 0, overflow: 'clip', boxShadow: '0px 0.434px 3.254px 0px rgba(0,0,0,0.1)' }}>
          <div style={{ position: 'absolute', left: '301.14px', width: '6.075px', height: '6.075px', top: '3.47px' }}>
            <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgEllipse1} />
          </div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '2.6px', color: '#777', top: '4.77px', right: '7px', whiteSpace: 'nowrap' }}>20 Feb 2023 | 5:21 PM IST</p>
        </div>
        <div style={{ position: 'absolute', right: '0', width: '5.207px', height: '5.207px', top: '3.9px' }}>
          <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgNotifications} />
        </div>

        {/* Camera notch */}
        <div style={{ position: 'absolute', inset: '2.35% 49.73% 96.66% 49.73%' }}>
          <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgCamera} />
          <div style={{ position: 'absolute', inset: '18.75%' }}>
            <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgOval} />
          </div>
          <div style={{ position: 'absolute', inset: '31.25% 43.75% 56.25% 43.75%' }}>
            <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgOval1} />
          </div>
        </div>

        {/* Left sidebar */}
        <div style={{ position: 'absolute', background: '#384099', height: '170.099px', left: 0, overflow: 'clip', top: '13px', width: '24.3px', borderBottomRightRadius: '5.207px', boxShadow: '0.868px 0px 4.339px 0px rgba(0,0,0,0.15)' }}>
          {/* Arrow right (back) */}
          <div style={{ position: 'absolute', height: '13.018px', left: '3.47px', top: '5.21px', width: '17.357px' }}>
            <div style={{ position: 'absolute', height: '13.018px', left: 0, top: 0, width: '17.357px', borderRadius: '8px' }} />
            <div style={{ position: 'absolute', left: '6.07px', width: '5.207px', height: '5.207px', top: '3.91px' }}>
              <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgArrowRight} />
            </div>
          </div>
          {/* Active item (dashboard) */}
          <div style={{ position: 'absolute', height: '13.018px', left: '3.47px', top: '19.09px', width: '17.357px' }}>
            <div style={{ position: 'absolute', background: 'rgba(255,255,255,0.1)', height: '13.018px', left: 0, top: 0, width: '17.357px', borderRadius: '8px' }} />
            <div style={{ position: 'absolute', left: '6.07px', width: '5.207px', height: '5.207px', top: '3.91px' }}>
              <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgTeamDashboard} />
            </div>
          </div>
          {SIDEBAR_ICONS.map((item, i) => (
            <div key={i} style={{ position: 'absolute', height: '13.018px', left: '3.47px', top: item.top, width: '17.357px' }}>
              <div style={{ position: 'absolute', height: '13.018px', left: 0, top: 0, width: '17.357px', borderRadius: '8px' }} />
              <div style={{ position: 'absolute', left: '6.07px', width: '5.207px', height: '5.207px', top: '3.91px' }}>
                <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={item.src} />
              </div>
            </div>
          ))}
          {/* Person (masked) */}
          <div style={{ position: 'absolute', height: '13.018px', left: '3.47px', top: '102.41px', width: '17.357px' }}>
            <div style={{ position: 'absolute', height: '13.018px', left: 0, top: 0, width: '17.357px', borderRadius: '8px' }} />
            <div style={{ position: 'absolute', left: '6.07px', width: '5.207px', height: '5.207px', top: '3.91px' }}>
              <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgPerson1} />
            </div>
          </div>
        </div>

        {/* Dashboard title */}
        <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '7.811px', color: '#333', top: '21.68px', left: 'calc(8.33% + 5.21px)', whiteSpace: 'nowrap', lineHeight: '4.773px' }}>Dashboard</p>

        {/* Devices card */}
        <div style={{ position: 'absolute', height: '104.793px', left: 'calc(8.33% + 5.21px)', top: '33.41px', width: '131.913px' }}>
          <div style={{ position: 'absolute', background: '#fff', border: '0.108px solid #e8e9f5', height: '104.793px', left: 0, borderRadius: '1.736px', boxShadow: '0px 0.217px 1.736px 0px rgba(0,0,0,0.04)', top: 0, width: '131.913px' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, position: 'absolute', fontSize: '5.207px', color: '#292c48', left: '6.93px', top: '5.21px', whiteSpace: 'nowrap' }}>Devices</p>
          {/* Clusters */}
          <div style={{ position: 'absolute', background: '#fcfcff', border: '0.108px solid #e8e9f5', height: '36.45px', left: '5.21px', borderRadius: '1.736px', top: '16.7px', width: '58.146px' }} />
          <div style={{ position: 'absolute', background: 'rgba(56,64,153,0.1)', left: '10.41px', borderRadius: '1.736px', width: '13.886px', height: '13.886px', top: '21.9px' }} />
          <div style={{ position: 'absolute', left: '13.01px', width: '8.679px', height: '8.679px', top: '24.51px' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgHub} /></div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.905px', color: '#666', left: '29.51px', top: '32.32px', whiteSpace: 'nowrap', lineHeight: '3.471px' }}>Clusters</p>
          <div style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '8.679px', color: '#333', left: '30.37px', top: 'calc(26.24px - 4.34px)', height: '8.679px', display: 'flex', alignItems: 'center' }}><p>34</p></div>
          <div style={{ position: 'absolute', height: 0, left: '10.41px', top: '41px', width: '47.732px' }}><div style={{ position: 'absolute', inset: '-0.22px 0 0 0' }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgLine17} /></div></div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '3.471px', color: '#009d19', left: '15.62px', top: 'calc(46.49px - 1.74px)', whiteSpace: 'nowrap' }}>24</p>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '3.471px', color: '#545454', left: '21.26px', top: 'calc(46.49px - 1.74px)', whiteSpace: 'nowrap' }}>Up</p>
          <div style={{ position: 'absolute', left: '10.41px', width: '3.471px', height: '3.471px', top: '44.49px' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgShift1} /></div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '3.471px', color: '#d40000', left: '43.6px', top: 'calc(46.49px - 1.74px)', whiteSpace: 'nowrap' }}>10</p>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '3.471px', color: '#545454', left: '48.59px', top: 'calc(46.49px - 1.74px)', whiteSpace: 'nowrap' }}>Down</p>
          <div style={{ position: 'absolute', left: '39.7px', width: '3.471px', height: '3.471px', top: '44.46px', transform: 'scaleY(-1)' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgShift} /></div>
          {/* Servers */}
          <div style={{ position: 'absolute', background: '#fcfcff', border: '0.108px solid #e8e9f5', height: '36.45px', left: '68.56px', borderRadius: '1.736px', top: '16.7px', width: '58.146px' }} />
          <div style={{ position: 'absolute', background: 'rgba(56,64,153,0.1)', left: '73.77px', borderRadius: '1.736px', width: '13.886px', height: '13.886px', top: '21.9px' }} />
          <div style={{ position: 'absolute', inset: '23.39% 35.52% 68.33% 57.9%' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgDns} /></div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.905px', color: '#666', left: '92.85px', top: '32.32px', whiteSpace: 'nowrap' }}>Servers</p>
          <div style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '8.679px', color: '#333', left: '92.85px', top: 'calc(26.24px - 4.34px)', height: '8.679px', display: 'flex', alignItems: 'center' }}><p>188</p></div>
          <div style={{ position: 'absolute', height: 0, left: '73.77px', top: '41px', width: '47.732px' }}><div style={{ position: 'absolute', inset: '-0.22px 0 0 0' }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgLine17} /></div></div>
          {/* SIM Cards */}
          <div style={{ position: 'absolute', background: '#fcfcff', border: '0.108px solid #e8e9f5', height: '36.45px', left: '5.21px', borderRadius: '1.736px', boxShadow: '0px 0.217px 1.736px 0px rgba(0,0,0,0.04)', top: '58.36px', width: '58.146px' }} />
          <div style={{ position: 'absolute', background: 'rgba(56,64,153,0.1)', left: '10.41px', borderRadius: '1.736px', width: '13.886px', height: '13.886px', top: '63.57px' }} />
          <div style={{ position: 'absolute', left: '13.01px', width: '8.679px', height: '8.679px', top: '66.18px' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgSimCard} /></div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.905px', color: '#666', left: '29.51px', top: '73.98px', whiteSpace: 'nowrap' }}>SIM Cards</p>
          <div style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '8.679px', color: '#333', left: '29.51px', top: 'calc(67.91px - 4.34px)', height: '8.679px', display: 'flex', alignItems: 'center' }}><p>44</p></div>
          <div style={{ position: 'absolute', height: 0, left: '10.41px', top: '82.68px', width: '47.732px' }}><div style={{ position: 'absolute', inset: '-0.22px 0 0 0' }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgLine17} /></div></div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontSize: '3.471px', color: '#009d19', left: '15.62px', top: 'calc(88.13px - 1.74px)', whiteSpace: 'nowrap' }}>34</p>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontSize: '3.471px', color: '#545454', left: '21.26px', top: 'calc(88.13px - 1.74px)', whiteSpace: 'nowrap' }}>Up</p>
          <div style={{ position: 'absolute', left: '10.41px', width: '3.471px', height: '3.471px', top: '86.13px' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgShift3} /></div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontSize: '3.471px', color: '#d40000', left: '43.6px', top: 'calc(88.13px - 1.74px)', whiteSpace: 'nowrap' }}>10</p>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontSize: '3.471px', color: '#545454', left: '48.59px', top: 'calc(88.13px - 1.74px)', whiteSpace: 'nowrap' }}>Down</p>
          <div style={{ position: 'absolute', left: '38.4px', width: '3.471px', height: '3.471px', top: '86.13px', transform: 'scaleY(-1)' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgShift2} /></div>
          {/* Sites */}
          <div style={{ position: 'absolute', background: '#fcfcff', border: '0.108px solid #e8e9f5', height: '36.45px', left: '68.56px', borderRadius: '1.736px', boxShadow: '0px 0.217px 1.736px 0px rgba(0,0,0,0.04)', top: '58.36px', width: '58.146px' }} />
          <div style={{ position: 'absolute', background: 'rgba(56,64,153,0.1)', left: '73.77px', borderRadius: '1.736px', width: '13.886px', height: '13.886px', top: '63.57px' }} />
          <div style={{ position: 'absolute', left: '76.37px', width: '8.679px', height: '8.679px', top: '66.18px' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgRssFeed} /></div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.905px', color: '#666', left: '92.85px', top: '73.98px', whiteSpace: 'nowrap' }}>Sites</p>
          <div style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '8.679px', color: '#333', left: '92.85px', top: 'calc(67.91px - 4.34px)', height: '8.679px', display: 'flex', alignItems: 'center' }}><p>20</p></div>
          <div style={{ position: 'absolute', height: 0, left: '73.77px', top: '82.68px', width: '47.732px' }}><div style={{ position: 'absolute', inset: '-0.22px 0 0 0' }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgLine17} /></div></div>
          <div style={{ position: 'absolute', left: '73.77px', width: '3.471px', height: '3.471px', top: '86.13px' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgShift5} /></div>
          <div style={{ position: 'absolute', left: '101.97px', width: '3.471px', height: '3.471px', top: '86.13px', transform: 'scaleY(-1)' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgShift4} /></div>
          {/* Pagination */}
          <div style={{ position: 'absolute', background: '#676767', height: '1.302px', left: '50.54px', borderRadius: '2.17px', top: '100.02px', width: '12.15px' }} />
          <div style={{ position: 'absolute', background: '#e8e9f5', height: '1.302px', left: '64.44px', borderRadius: '2.17px', top: '100.02px', width: '3.471px' }} />
          <div style={{ position: 'absolute', background: '#e8e9f5', height: '1.302px', left: '69.64px', borderRadius: '2.17px', top: '100.02px', width: '3.471px' }} />
        </div>

        {/* Capacity card */}
        <div style={{ position: 'absolute', height: '49.684px', left: 'calc(58.33% - 12.16px)', top: '90.24px', width: '135.385px' }}>
          <div style={{ position: 'absolute', background: '#fff', border: '0.108px solid #e8e9f5', height: '49.901px', left: 0, borderRadius: '1.736px', boxShadow: '0px 0.217px 1.736px 0px rgba(0,0,0,0.04)', top: 0, width: '135.385px' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, position: 'absolute', fontSize: '5.207px', color: '#292c48', left: '5.21px', top: '5.2px', whiteSpace: 'nowrap' }}>Capacity</p>
          {/* CPU */}
          <div style={{ position: 'absolute', left: '6.94px', width: '35.799px', height: '35.799px', top: '18.44px' }}><div style={{ position: 'absolute', bottom: '50%', left: 0, right: 0, top: 0 }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgAvailable} /></div></div>
          <div style={{ position: 'absolute', left: '6.94px', width: '35.799px', height: '35.799px', top: '18.44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'scaleY(-1) rotate(180deg)', flexShrink: 0 }}><div style={{ position: 'relative', width: '35.799px', height: '35.799px' }}><div style={{ position: 'absolute', bottom: '50%', left: '4.25%', right: 0, top: 0 }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgAvailable1} /></div></div></div></div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '7.811px', color: '#333', textAlign: 'center', left: '24.99px', top: '27.99px', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>92%</p>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#999', textAlign: 'center', left: '25.2px', top: '37.74px', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>CPU</p>
          {/* Memory */}
          <div style={{ position: 'absolute', left: '49.68px', width: '35.799px', height: '35.799px', top: '18.44px' }}><div style={{ position: 'absolute', bottom: '50%', left: 0, right: 0, top: 0 }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgAvailable2} /></div></div>
          <div style={{ position: 'absolute', left: '49.69px', width: '35.799px', height: '35.799px', top: '18.44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'scaleY(-1) rotate(180deg)', flexShrink: 0 }}><div style={{ position: 'relative', width: '35.799px', height: '35.799px' }}><div style={{ position: 'absolute', bottom: '50%', left: '22.55%', right: 0, top: 0 }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgAvailable3} /></div></div></div></div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '7.811px', color: '#333', textAlign: 'center', left: '67.95px', top: '27.99px', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>75%</p>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#999', textAlign: 'center', left: '67.75px', top: '37.74px', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>MEMORY</p>
          {/* Storage */}
          <div style={{ position: 'absolute', left: '92.42px', width: '35.799px', height: '35.799px', top: '18.44px' }}><div style={{ position: 'absolute', bottom: '50%', left: 0, right: 0, top: 0 }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgAvailable2} /></div></div>
          <div style={{ position: 'absolute', left: '92.43px', width: '35.799px', height: '35.799px', top: '18.44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'scaleY(-1) rotate(180deg)', flexShrink: 0 }}><div style={{ position: 'relative', width: '35.799px', height: '35.799px' }}><div style={{ position: 'absolute', bottom: '50%', left: '60.21%', right: 0, top: '1.67%' }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgAvailable4} /></div></div></div></div>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '7.811px', color: '#333', textAlign: 'center', left: '110.76px', top: '27.99px', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>40%</p>
          <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#999', textAlign: 'center', left: '110.77px', top: '37.74px', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>STORAGE</p>
        </div>

        {/* Fault data card */}
        <div style={{ position: 'absolute', height: '49.901px', left: 'calc(58.33% - 12.16px)', top: '33.41px', width: '135.385px' }}>
          <div style={{ position: 'absolute', background: '#fff', border: '0.108px solid #e8e9f5', height: '49.901px', left: 0, borderRadius: '1.736px', boxShadow: '0px 0.217px 1.736px 0px rgba(0,0,0,0.04)', top: 0, width: '135.385px' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, position: 'absolute', fontSize: '5.207px', color: '#292c48', left: '5.21px', top: '5.21px', whiteSpace: 'nowrap' }}>Fault data</p>
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', left: '5.21px', top: '16.05px', width: '28.422px' }}>
            <div style={{ display: 'flex', flex: '1 0 0', alignItems: 'center', minWidth: '1px', position: 'relative' }}>
              <div style={{ flex: '1 0 0', height: '100%', minWidth: '1px', marginRight: '-302.06px', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: '-1.06%' }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgContainer} /></div>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', height: '21.696px', alignItems: 'flex-start', left: '40.57px', paddingBottom: '5.207px', paddingRight: '5.207px', top: '16.7px', width: '89.606px' }}>
            <div style={{ borderBottom: '0.217px solid #eaeaea', display: 'flex', gap: '5.207px', alignItems: 'center', padding: '1.302px 1.736px', width: '89.606px', flexShrink: 0 }}>
              <div style={{ flexShrink: 0, width: '3.657px', height: '3.657px', position: 'relative' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgLegend} /></div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#999', width: '31.243px' }}>Label</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#999', width: '9.98px' }}>Value</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#999', textAlign: 'right', width: '22.13px' }}>%</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ transform: 'scaleY(-1)', flexShrink: 0 }}><div style={{ height: '0.868px', width: '56.41px', position: 'relative' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgHeader} /></div></div>
            </div>
            <div style={{ display: 'flex', gap: '5.207px', alignItems: 'center', padding: '1.302px 1.736px', width: '89.606px', flexShrink: 0 }}>
              <div style={{ flexShrink: 0, width: '2.604px', height: '2.604px', position: 'relative' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgLegend1} /></div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '3.037px', color: '#404040', width: '31.243px' }}>Major Alarms</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#333', width: '22.13px' }}>02</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#333', textAlign: 'right', width: '9.98px' }}>11.8%</p>
            </div>
            <div style={{ display: 'flex', gap: '5.207px', alignItems: 'center', padding: '1.302px 1.736px', width: '89.606px', flexShrink: 0 }}>
              <div style={{ flexShrink: 0, width: '2.604px', height: '2.604px', position: 'relative' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgLegend2} /></div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '3.037px', color: '#404040', width: '31.243px' }}>Critical Alarms</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#333', width: '22.13px' }}>15</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#333', textAlign: 'right', width: '9.98px' }}>88.2%</p>
            </div>
          </div>
        </div>

        {/* Tickets bar chart */}
        <div style={{ position: 'absolute', height: '63.136px', left: 'calc(58.33% - 12.16px)', top: '146.87px', width: '135.385px' }}>
          <div style={{ position: 'absolute', background: '#fff', border: '0.108px solid #e8e9f5', height: '63.136px', left: 0, borderRadius: '1.736px', boxShadow: '0px 0.217px 1.736px 0px rgba(0,0,0,0.04)', top: 0, width: '135.385px' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, position: 'absolute', fontSize: '5.207px', color: '#292c48', left: '5.21px', top: '6.52px', whiteSpace: 'nowrap' }}>Tickets</p>
          <div style={{ position: 'absolute', height: '36.884px', left: '12.37px', overflow: 'clip', top: '16.93px', width: '107.83px' }}>
            <div style={{ position: 'absolute', height: '36.885px', left: 0, top: 0, width: '117.811px' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgGroup483848} /></div>
            {[16.04, 40.35, 64.64, 88.95].map(l => <div key={l} style={{ position: 'absolute', background: '#edf1f6', height: '34.28px', left: `${l}px`, borderRadius: '0.434px', top: '2.61px', width: '3.037px' }} />)}
            <div style={{ position: 'absolute', background: '#d40000', height: '8.462px', left: '16.04px', borderRadius: '0.434px', boxShadow: '0px -0.434px 1.085px 0px rgba(0,0,0,0.12)', top: '28.42px', width: '3.037px' }} />
            <div style={{ position: 'absolute', background: '#eb6e00', height: '11.933px', left: '40.35px', borderRadius: '0.434px', boxShadow: '0px -0.434px 1.085px 0px rgba(0,0,0,0.12)', top: '24.95px', width: '3.037px' }} />
            <div style={{ position: 'absolute', background: '#f9a400', height: '18.225px', left: '64.64px', borderRadius: '0.434px', boxShadow: '0px -0.434px 1.085px 0px rgba(0,0,0,0.12)', top: '18.66px', width: '3.037px' }} />
            <div style={{ position: 'absolute', background: '#3fb5c1', height: '19.527px', left: '88.95px', borderRadius: '0.434px', boxShadow: '0px -0.434px 1.085px 0px rgba(0,0,0,0.12)', top: '17.35px', width: '3.037px' }} />
          </div>
          <div style={{ position: 'absolute', background: '#fff', border: '0.217px solid #eaeaea', display: 'flex', gap: '1.736px', height: '8.679px', alignItems: 'center', justifyContent: 'center', left: 'calc(50% + 46.75px)', padding: '0.868px 1.736px 0.868px 3.471px', borderRadius: '0.868px', top: 'calc(50% - 22.02px)', transform: 'translate(-50%, -50%)' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#333', width: '19.31px' }}>Open Tickets</p>
            <div style={{ flexShrink: 0, width: '5.207px', height: '5.207px', position: 'relative' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgExpandMore} /></div>
          </div>
        </div>

        {/* KPIs line chart */}
        <div style={{ position: 'absolute', height: '64.872px', left: 'calc(8.33% + 5.21px)', top: '145.15px', width: '131.913px' }}>
          <div style={{ position: 'absolute', background: '#fff', border: '0.108px solid #e8e9f5', height: '64.872px', left: 0, borderRadius: '1.736px', boxShadow: '0px 0.217px 1.736px 0px rgba(0,0,0,0.04)', top: 0, width: '131.913px' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, position: 'absolute', fontSize: '5.207px', color: '#292c48', left: '5.21px', top: '6.48px', whiteSpace: 'nowrap' }}>KPIs</p>
          <div style={{ position: 'absolute', height: '30.191px', left: '10.99px', overflow: 'clip', top: '23.64px', width: '115.249px' }}>
            <div style={{ position: 'absolute', height: '30.158px', left: '-0.38px', top: 0, width: '116.075px' }}>
              <div style={{ position: 'absolute', inset: '0 0 0 -0.11%' }}><img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgGroup483849} /></div>
            </div>
          </div>
          {KPI_DOTS.map((pt, i) => (
            <div key={i} style={{ position: 'absolute', left: pt.left, width: '1.736px', height: '1.736px', top: pt.top }}>
              <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgEllipse23} />
            </div>
          ))}
          <div style={{ position: 'absolute', background: '#1b59f8', height: '0.651px', right: '15.63px', borderRadius: '0.217px', top: '19.5px', width: '6.943px' }} />
          {/* Dropdowns */}
          <div style={{ position: 'absolute', background: '#fff', border: '0.217px solid #eaeaea', display: 'flex', gap: '1.736px', height: '8.679px', alignItems: 'center', justifyContent: 'center', left: 'calc(50% + 48.7px)', padding: '0.868px 1.736px 0.868px 3.471px', borderRadius: '0.868px', top: 'calc(50% - 22.92px)', transform: 'translate(-50%, -50%)' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#333', width: '11.933px' }}>Monthly</p>
            <div style={{ flexShrink: 0, width: '5.207px', height: '5.207px', position: 'relative' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgExpandMore1} /></div>
          </div>
          <div style={{ position: 'absolute', background: '#fff', border: '0.217px solid #eaeaea', display: 'flex', gap: '1.736px', height: '8.679px', alignItems: 'center', justifyContent: 'center', left: 'calc(50% + 19.95px)', padding: '0.868px 1.736px 0.868px 3.471px', borderRadius: '0.868px', top: 'calc(50% - 22.92px)', transform: 'translate(-50%, -50%)', width: '29.941px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#333', whiteSpace: 'nowrap' }}>Request pe...</p>
            <div style={{ flexShrink: 0, width: '5.207px', height: '5.207px', position: 'relative' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgExpandMore2} /></div>
          </div>
          <div style={{ position: 'absolute', background: '#fff', border: '0.217px solid #eaeaea', display: 'flex', gap: '1.736px', height: '8.679px', alignItems: 'center', justifyContent: 'center', left: 'calc(50% - 7.27px)', padding: '0.868px 1.736px 0.868px 3.471px', borderRadius: '0.868px', top: 'calc(50% - 22.92px)', transform: 'translate(-50%, -50%)', width: '21.045px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '3.037px', color: '#333', width: '9.763px' }}>Server</p>
            <div style={{ flexShrink: 0, width: '5.207px', height: '5.207px', position: 'relative' }}><img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgExpandMore3} /></div>
          </div>
        </div>
      </div>

      {/* Bottom casing */}
      <div style={{ position: 'absolute', inset: '91.97% 0 2.71% 0' }}>
        <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBottomCasing} />
      </div>
    </div>
  );
}

/* ── iPad landscape mockup (AI Video Production) ────────────────────── */
function IpadLandscapeMockup() {
  // iPad portrait frame: 241.06 × 350px, rotated 90° CW → appears 350 × 241px landscape.
  // Screen area in portrait: left=9.14, top=9.49, w=221.39, h=332.42.
  // After 90° CW rotation the screen in landscape coords:
  //   left=9.49, top=10.53, width=332.42, height=221.39
  return (
    <div
      style={{
        position: 'absolute',
        left: 'calc(50% - 3.65px)',
        top: 'calc(50% - 34.64px)',
        transform: 'translate(-50%, -50%)',
        width: '350px',
        height: '241.06px',
      }}
    >
      {/* iPad Mini frame — portrait, rotated 90° clockwise to appear landscape */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '241.06px',
          height: '350px',
          transform: 'translate(-50%, -50%) rotate(90deg)',
        }}
      >
        <img
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            maxWidth: 'none',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
          src={imgIPadMini}
        />
      </div>

      {/* Cityscape content — on top of frame, clipped to the landscape screen area */}
      <div
        style={{
          position: 'absolute',
          left: '9.49px',
          top: '10.53px',
          width: '332.42px',
          height: '221.39px',
          overflow: 'hidden',
          borderRadius: '14.056px',
          zIndex: 1,
        }}
      >
        <img
          alt=""
          style={{
            position: 'absolute',
            height: '117.83%',
            left: '-39.37%',
            maxWidth: 'none',
            top: '-15.3%',
            width: '142.31%',
          }}
          src={imgCityscape}
        />
      </div>
    </div>
  );
}

export default function Section3Services() {
  return (
    <section id="section-3" className="s3-section">
      <BlobCursor />
      {/* Eyebrow */}
      <p className="s3-eyebrow">OUR WORK</p>

      {/* Headline */}
      <div className="s3-headline">
        We are a human-centric design studio obsessed with creating thoughtful brands,
        intuitive products, and meaningful digital experiences.
      </div>

      {/* 3×3 grid */}
      <div className="s3-grid">

        {/* ── ROW 1 ── */}
        <div className="s3-row">

          {/* Card 1 – Branding */}
          <div className="s3-slot">
            <CometCard className="s3-comet">
            <div className="s3-card">
              <CardBadge />
              <div style={{ position: 'absolute', left: '50%', top: 'calc(50% - 34.5px)', transform: 'translate(-50%, -50%)', width: '220px' }}>
                <div style={{ height: '268.712px', position: 'relative', width: '100%' }}>
                  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                    <img alt="" style={{ position: 'absolute', height: '129.63%', left: '-5.74%', maxWidth: 'none', top: '-9.63%', width: '105.74%' }} src={imgBranding} />
                  </div>
                </div>
              </div>
              <CardName label="Branding" />
            </div>
            </CometCard>
          </div>

          {/* Card 2 – Creative Strategy and Growth */}
          <div className="s3-slot">
            <CometCard className="s3-comet">
            <div className="s3-card">
              <CardBadge />
              <div style={{ position: 'absolute', left: 'calc(50% + 0.83px)', top: 'calc(50% - 28px)', transform: 'translate(-50%, -50%)', height: '236px', width: '297px' }}>
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                  <img alt="" style={{ position: 'absolute', height: '167.64%', left: 0, maxWidth: 'none', top: '-30.66%', width: '100%' }} src={imgCreative} />
                </div>
              </div>
              <CardName label="Creative Strategy And Growth" wide />
            </div>
            </CometCard>
          </div>

          {/* Card 3 – Digital Marketing */}
          <div className="s3-slot">
            <CometCard className="s3-comet">
            <div className="s3-card">
              <CardBadge />
              <div style={{ position: 'absolute', left: 'calc(50% + 0.17px)', top: 'calc(50% - 31px)', transform: 'translate(-50%, -50%)', display: 'flex', height: '293.199px', alignItems: 'center', justifyContent: 'center', width: '206.869px' }}>
                <div style={{ transform: 'rotate(-6deg)', flexShrink: 0 }}>
                  <div style={{ height: '276px', position: 'relative', width: '179px' }}>
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                      <img alt="" style={{ position: 'absolute', height: '123.96%', left: '-20.06%', maxWidth: 'none', top: '-11.83%', width: '142.84%' }} src={imgDigitalMkt} />
                    </div>
                  </div>
                </div>
              </div>
              <CardName label="Digital Marketing" />
            </div>
            </CometCard>
          </div>
        </div>

        {/* ── ROW 2 ── */}
        <div className="s3-row">

          {/* Card 4 – App Development */}
          <div className="s3-slot">
            <CometCard className="s3-comet">
            <div className="s3-card">
              <div style={{ position: 'absolute', left: 'calc(50% + 0.5px)', top: 'calc(50% - 48.5px)', transform: 'translate(-50%, -50%)', display: 'flex', height: '324.424px', alignItems: 'center', justifyContent: 'center', width: '171.104px' }}>
                <div style={{ transform: 'rotate(-2.01deg) skewX(-0.02deg)', flexShrink: 0 }}>
                  <div style={{ height: '318.998px', position: 'relative', width: '160.13px' }}>
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                      <img alt="" style={{ position: 'absolute', height: '129.46%', left: '-67.43%', maxWidth: 'none', top: '-13.58%', width: '344.04%' }} src={imgIPhone} />
                    </div>
                  </div>
                </div>
              </div>
              <CardName label="App Development" />
            </div>
            </CometCard>
          </div>

          {/* Card 5 – Website Development */}
          <div className="s3-slot">
            <CometCard className="s3-comet">
            <div className="s3-card">
              <CardBadge />
              <LaptopMockup />
              <CardName label="Website Development" />
            </div>
            </CometCard>
          </div>

          {/* Card 6 – Social Media Management */}
          <div className="s3-slot">
            <CometCard className="s3-comet">
            <div className="s3-card">
              <CardBadge />
              <div style={{ position: 'absolute', left: 'calc(50% - 15.82px)', top: 'calc(50% - 43px)', transform: 'translate(-50%, -50%)', display: 'flex', height: '300.58px', alignItems: 'center', justifyContent: 'center', width: '238.417px' }}>
                <div style={{ transform: 'rotate(-4deg)', flexShrink: 0 }}>
                  <div style={{ height: '286px', position: 'relative', width: '219px' }}>
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                      <img alt="" style={{ position: 'absolute', height: '118.53%', left: '-11.94%', maxWidth: 'none', top: '-10.14%', width: '123.88%' }} src={imgSocialMedia} />
                    </div>
                  </div>
                </div>
              </div>
              <CardName label="Social Media Management" />
            </div>
            </CometCard>
          </div>
        </div>

        {/* ── ROW 3 ── */}
        <div className="s3-row">

          {/* Card 7 – Design Consultation */}
          <div className="s3-slot">
            <CometCard className="s3-comet">
            <div className="s3-card">
              <CardBadge />
              <div style={{ position: 'absolute', left: 'calc(50% - 5.49px)', top: 'calc(50% - 24px)', transform: 'translate(-50%, -50%)', display: 'flex', height: '305.268px', alignItems: 'center', justifyContent: 'center', width: '248.672px' }}>
                <div style={{ transform: 'rotate(-4deg)', flexShrink: 0 }}>
                  <div style={{ height: '290px', position: 'relative', width: '229px' }}>
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                      <img alt="" style={{ position: 'absolute', height: '145.1%', left: '-18.59%', maxWidth: 'none', top: '-20.93%', width: '137.55%' }} src={imgDesignConsult} />
                    </div>
                  </div>
                </div>
              </div>
              <CardName label="Design Consultation" />
            </div>
            </CometCard>
          </div>

          {/* Card 8 – AI Video Production */}
          <div className="s3-slot">
            <CometCard className="s3-comet">
            <div className="s3-card">
              <IpadLandscapeMockup />
              <CardName label="AI Video Production" />
            </div>
            </CometCard>
          </div>

          {/* Card 9 – Influencer Marketing */}
          <div className="s3-slot">
            <CometCard className="s3-comet">
            <div className="s3-card">
              <CardBadge />
              <div style={{ position: 'absolute', left: 'calc(50% - 5.5px)', top: 'calc(50% - 34.64px)', transform: 'translate(-50%, -50%)', display: 'flex', height: '319.534px', alignItems: 'center', justifyContent: 'center', width: '239.742px' }}>
                <div style={{ transform: 'rotate(-4deg)', flexShrink: 0 }}>
                  <div style={{ position: 'relative', width: '219px' }}>
                    <div style={{ height: '305px', position: 'relative', width: '220px' }}>
                      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                        <img alt="" style={{ position: 'absolute', height: '134.4%', left: '-19.94%', maxWidth: 'none', top: '-17.2%', width: '139.89%' }} src={imgInfluencer} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CardName label="Influencer Marketing" />
            </div>
            </CometCard>
          </div>
        </div>
      </div>
    </section>
  );
}
