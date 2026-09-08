import { useEffect, useMemo, useState, type ComponentType, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, BookOpen, Building2, Check,
  ChevronDown, ChevronRight, CircleUserRound, FileCheck2, Landmark, Mail, Menu,
  Pause, Play, Search, ShieldCheck, Sparkles, X,
} from 'lucide-react';
import { useLocation } from 'wouter';

const queryClient = new QueryClient();
const BASE = import.meta.env.BASE_URL;
const image = (name: string) => `${BASE}images/${name}`;

type View = 'Home' | 'About' | 'Services' | 'Audit & Assurance' | 'Tax' | 'Accounting' | 'Bank Advisory' | 'Training' | 'Projects' | 'Our Team' | 'Insights / Blog' | 'Contact' | 'Book a Consultation';
type Icon = ComponentType<{ size?: number }>;
const routeFor: Record<View, string> = {
  Home: '/', About: '/about', Services: '/services', 'Audit & Assurance': '/services/audit',
  Tax: '/services/tax', Accounting: '/services/accounting', 'Bank Advisory': '/services/bank-advisory',
  Training: '/services/training', Projects: '/projects', 'Our Team': '/team',
  'Insights / Blog': '/insights', Contact: '/contact', 'Book a Consultation': '/consultation',
};
const viewFor: Record<string, View> = Object.fromEntries(Object.entries(routeFor).map(([key, value]) => [value, key])) as Record<string, View>;

const slides = [
  { label: 'AUDIT & ASSURANCE', title: 'Independent Audits. Reliable Financial Insights.', body: 'Helping organizations strengthen financial accountability, improve transparency and make better-informed decisions through professional audit and assurance services.', image: 'rasaki-audit.jpg', cta: 'Audit & Assurance' },
  { label: 'BUSINESS & FINANCE', title: 'Clarity Behind Every Financial Decision.', body: 'Professional accounting, financial advisory and business solutions designed for the realities of the Nigerian business environment.', image: 'rasaki-advisory.jpg', cta: 'Services' },
  { label: 'TAX ADVISORY', title: 'Navigate Tax With Confidence.', body: 'Practical tax advisory and compliance support that helps businesses understand their obligations and plan with confidence.', image: 'rasaki-tax.jpg', cta: 'Tax' },
  { label: 'STRATEGIC ADVISORY', title: 'Financial Expertise. Strategic Direction.', body: 'From bank advisory to business consulting, we help organizations understand their numbers and act on opportunities.', image: 'rasaki-advisory.jpg', cta: 'Bank Advisory' },
  { label: 'RASAKI MURITALA & CO.', title: 'Trusted Financial Professionals for Growing Organizations.', body: 'Experience, professionalism and integrity applied to every engagement. [CONTENT TO BE CONFIRMED]', image: 'rasaki-audit.jpg', cta: 'Our Team' },
];
const services: Array<[string, string, Icon]> = [
  ['Audit & Assurance', 'Independent, objective assurance for accountable organizations.', ShieldCheck],
  ['Accounting', 'Clear financial reporting and dependable books.', FileCheck2],
  ['Tax Advisory', 'Practical support for compliance and planning.', BarChart3],
  ['Bank Advisory', 'Insight for financial institutions and business finance.', Landmark],
  ['Financial Advisory', 'Evidence-led guidance for important decisions.', Sparkles],
  ['Management Consulting', 'Structured thinking for complex operating realities.', Building2],
  ['Training', 'Professional learning for stronger finance teams.', BookOpen],
  ['Computer / Technology Services', 'Technology support for better business administration.', CircleUserRound],
  ['Other Professional Services', 'Focused support shaped around your need.', ArrowUpRight],
];
const projects = [
  '3i Infotech', 'Oceanic Health Management Limited', 'Prime Metro Property', 'Service Master Limited',
  'Xpress Payments Solution Limited', 'OAK Pensions Limited', 'UNDP/FIRS', 'LSBIR',
  'Ogun State Board of Internal Revenue', 'Lafarge Elephant Cement', 'GTI Micro Finance Bank',
  'ITF', 'RMAFC', 'Turning Point Stock Broker',
];
const posts: Array<[string, string]> = [
  ['Tax', 'No Nigerian can evade tax payment with VAIDS– FIRS boss'],
  ['Finance', 'FG to issue N150bn sovereign green bond Monday'],
  ['Regulatory Updates', 'Bankers aid money laundering in Nigeria- Nuhu Ribadu'],
  ['Audit', 'Why independent assurance matters to growing organizations'],
  ['Accounting', 'Preparing financial records for better decisions'],
];

function Button({ children, onClick, gold = false, outline = false, testId = 'button-action' }: { children: ReactNode; onClick?: () => void; gold?: boolean; outline?: boolean; testId?: string }) {
  return <button type="button" data-testid={testId} onClick={onClick} className={`btn ${gold ? 'gold' : ''} ${outline ? 'outline' : ''}`}>{children}<ArrowRight size={15} /></button>;
}
function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="section-title"><span>{eyebrow}</span><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function AppShell() {
  const [location, setLocation] = useLocation();
  const view = viewFor[location] || (location === '/' ? 'Home' : undefined);
  const navigate = (next: View) => { setLocation(routeFor[next]); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [blogCat, setBlogCat] = useState('All');
  const [blogSearch, setBlogSearch] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const [consultSent, setConsultSent] = useState(false);
  const [consultStep, setConsultStep] = useState(1);
  const [contact, setContact] = useState({ name: '', email: '', message: '', department: '' });
  const [consult, setConsult] = useState({ service: '', name: '', email: '', company: '', phone: '', need: '', date: '' });

  useEffect(() => { document.title = 'Rasaki Muritala & Co. | Tax / Audit Company'; const meta = document.querySelector('meta[name="description"]') || document.createElement('meta'); meta.setAttribute('name', 'description'); meta.setAttribute('content', 'Rasaki Muritala & Co. — professional audit, accounting, taxation and advisory services for the Nigerian business ecosystem.'); document.head.appendChild(meta); }, []);
  useEffect(() => { if (paused || view !== 'Home') return; const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 6000); return () => window.clearInterval(timer); }, [paused, view]);

  return <div className="rasaki">
    <div className="topbar">Rasaki Muritala & Co. <strong>Tax / Audit Company</strong><span className="top-right">Independent assurance for the Nigerian business ecosystem</span></div>
    <header className="site-header">
      <button className="logo" data-testid="button-logo-home" onClick={() => navigate('Home')}><i className="logo-mark">RM</i><span className="logo-text">RASAKI MURITALA <b>& CO.</b><small>CHARTERED ACCOUNTANTS</small></span></button>
      <nav className="site-nav" aria-label="Primary navigation">
        {(['Home', 'About', 'Services', 'Our Team', 'Projects', 'Insights / Blog', 'Contact'] as View[]).map((item) => <button data-testid={`link-${item.toLowerCase().replaceAll(' ', '-')}`} className={view === item ? 'active' : ''} key={item} onClick={() => item === 'Services' ? setMega((open) => !open) : navigate(item)}>{item}{item === 'Services' && <ChevronDown size={14} />}</button>)}
      </nav>
      <Button gold onClick={() => navigate('Book a Consultation')} testId="button-book-consultation">Book a consultation</Button>
      <button className="menu-toggle" data-testid="button-open-mobile-menu" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu /></button>
    </header>
    {mega && <MegaMenu navigate={navigate} />}
    {mobile && <MobileMenu close={() => setMobile(false)} navigate={navigate} />}
    {view === 'Home' && <Home navigate={navigate} current={slides[slide]} slide={slide} setSlide={setSlide} paused={paused} setPaused={setPaused} />}
    {view && view !== 'Home' && <Inner view={view} navigate={navigate} projectFilter={projectFilter} setProjectFilter={setProjectFilter} blogCat={blogCat} setBlogCat={setBlogCat} blogSearch={blogSearch} setBlogSearch={setBlogSearch} contact={contact} setContact={setContact} contactSent={contactSent} setContactSent={setContactSent} consult={consult} setConsult={setConsult} consultStep={consultStep} setConsultStep={setConsultStep} consultSent={consultSent} setConsultSent={setConsultSent} />}
    {!view && <NotFound navigate={navigate} />}
    <Footer navigate={navigate} />
    <button className="sticky-cta" data-testid="button-sticky-consultation" onClick={() => navigate('Book a Consultation')}>Book a consultation <ArrowUpRight size={16} /></button>
  </div>;
}

function MegaMenu({ navigate }: { navigate: (view: View) => void }) {
  const groups: Array<[string, Array<[string, View]>]> = [
    ['Audit & Assurance', [['Audit Services', 'Audit & Assurance'], ['Internal Audit', 'Audit & Assurance'], ['External Audit', 'Audit & Assurance'], ['Audit & Assurance Advisory', 'Audit & Assurance']]],
    ['Accounting & Financial', [['Accounting Services', 'Accounting'], ['Financial Reporting', 'Accounting'], ['Financial Advisory', 'Services']]],
    ['Taxation', [['Tax Advisory', 'Tax'], ['Tax Compliance', 'Tax'], ['Tax Planning', 'Tax']]],
    ['Advisory', [['Bank Advisory', 'Bank Advisory'], ['Business Advisory', 'Services'], ['Management Consulting', 'Services']]],
  ];
  return <div className="mega" data-testid="menu-services-mega">{groups.map(([name, links]) => <div key={name}><h4>{name}</h4>{links.map(([label, target]) => <button data-testid={`link-mega-${label.toLowerCase().replaceAll(' ', '-')}`} key={label} onClick={() => navigate(target)}>{label}<ChevronRight size={13} /></button>)}</div>)}</div>;
}
function MobileMenu({ close, navigate }: { close: () => void; navigate: (view: View) => void }) {
  const links: View[] = ['Home', 'About', 'Services', 'Audit & Assurance', 'Tax', 'Accounting', 'Bank Advisory', 'Training', 'Projects', 'Our Team', 'Insights / Blog', 'Contact', 'Book a Consultation'];
  return <div className="mobile-nav" data-testid="menu-mobile-navigation"><button className="close" data-testid="button-close-mobile-menu" onClick={close}><X /></button><div className="mobile-brand">RM<span>RASAKI MURITALA & CO.</span></div>{links.map((item) => <button data-testid={`mobile-link-${item.toLowerCase().replaceAll(' ', '-')}`} key={item} onClick={() => { navigate(item); close(); }}>{item}<ArrowRight size={16} /></button>)}</div>;
}

function Home({ navigate, current, slide, setSlide, paused, setPaused }: { navigate: (view: View) => void; current: typeof slides[number]; slide: number; setSlide: (n: number) => void; paused: boolean; setPaused: (b: boolean) => void }) {
  return <main>
    <section className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ backgroundImage: `url(${image(current.image)})` }}>
      <div className="hero-inner"><span className="eyebrow">{current.label}</span><h1>{current.title}</h1><p>{current.body}</p><div className="hero-actions"><Button gold onClick={() => navigate(current.cta as View)}>{current.cta === 'Audit & Assurance' ? 'Explore Audit Services' : current.cta === 'Tax' ? 'Tax Advisory' : 'Explore Our Services'}</Button><Button outline onClick={() => navigate('Book a Consultation')}>Book a consultation</Button></div></div>
      <div className="carousel-controls"><button data-testid="button-slide-previous" onClick={() => setSlide((slide + slides.length - 1) % slides.length)} aria-label="Previous slide"><ArrowLeft /></button><span className="slide-count"><b>0{slide + 1}</b> / 0{slides.length}</span><button data-testid="button-slide-next" onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next slide"><ArrowRight /></button><button data-testid="button-slide-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play carousel' : 'Pause carousel'}>{paused ? <Play size={16} /> : <Pause size={16} />}</button><div className="progress"><i style={{ width: `${((slide + 1) / slides.length) * 100}%` }} /></div></div>
    </section>
    <div className="trust-strip">{['Audit & Assurance', 'Accounting', 'Tax Advisory', 'Financial Advisory', 'Business Consulting', 'Training'].map((item, index) => <span key={item}><em>0{index + 1}</em>{item}</span>)}</div>
    <section className="section wrap about-grid"><div className="image-tile" style={{ backgroundImage: `url(${image('rasaki-advisory.jpg')})` }}><span>Professional expertise, applied locally.</span></div><div><SectionTitle eyebrow="WHO WE ARE" title="Professional financial expertise built on trust." body="Rasaki Muritala & Co. is a Nigerian professional services firm focused on audit, accounting, tax and financial advisory. We help organizations make sense of their numbers, meet their responsibilities and move forward with confidence." /><div className="mini-grid"><div><b>Our mission</b><p>Mission statement [CONTENT TO BE CONFIRMED]</p></div><div><b>Our vision</b><p>Vision statement [CONTENT TO BE CONFIRMED]</p></div></div><Button onClick={() => navigate('About')}>Discover our story</Button></div></section>
    <section className="audit-section"><div className="wrap"><div className="audit-head"><SectionTitle eyebrow="THE CORE OF OUR PRACTICE" title="Confidence in the numbers. Clarity for the future." body="Independent, objective and professional assurance for organizations that value accountability." /><Button gold onClick={() => navigate('Audit & Assurance')}>Explore audit & assurance</Button></div><div className="audit-grid">{services.slice(0, 4).map(([title, body, IconComponent]) => <button className="audit-card" data-testid={`card-audit-${title.toLowerCase().replaceAll(' ', '-')}`} key={title} onClick={() => navigate(title as View)}><IconComponent /><b>{title}</b><p>{body}</p><ArrowUpRight /></button>)}</div></div></section>
    <section className="section wrap"><SectionTitle eyebrow="OUR PROFESSIONAL SERVICES" title="Practical expertise for today’s Nigerian business environment." /><div className="services-grid">{services.map(([title, body, IconComponent], index) => <button className={`service-card ${index === 0 ? 'featured' : ''}`} data-testid={`card-service-${index}`} key={title} onClick={() => navigate((routeFor[title as View] ? title : 'Services') as View)}><span className="service-number">0{index + 1}</span><IconComponent /><b>{title}</b><p>{body}</p><ArrowUpRight /></button>)}</div></section>
    <section className="process"><div className="wrap"><SectionTitle eyebrow="A CLEAR WAY OF WORKING" title="How we work" body="A considered process keeps every engagement focused, transparent and useful." /><div className="timeline">{['Understand', 'Assess', 'Plan', 'Execute', 'Report', 'Advise'].map((item, index) => <div className="timeline-item" key={item}><span>0{index + 1}</span><b>{item}</b><p>{['Listen to your context.', 'Identify key risks.', 'Agree the route.', 'Do the detailed work.', 'Share what the evidence says.', 'Help you act on it.'][index]}</p></div>)}</div></div></section>
    <section className="section wrap"><SectionTitle eyebrow="SELECTED REFERENCES" title="Work grounded in real organizations." body="Existing project references are shown for portfolio continuity; detailed case studies are [CONTENT TO BE CONFIRMED]." /><div className="project-list">{projects.slice(0, 6).map((project, index) => <button className="project-row" data-testid={`row-project-${index}`} key={project} onClick={() => navigate('Projects')}><span>0{index + 1}</span><b>{project}</b><small>Professional engagement · [CONTENT TO BE CONFIRMED]</small><ArrowUpRight /></button>)}</div></section>
    <section className="final-cta"><div><span className="eyebrow">START A CONVERSATION</span><h2>Let’s talk about your business.</h2><p>Whether you need an independent audit, tax advice, financial guidance or business consulting, our team is ready to help.</p></div><Button gold onClick={() => navigate('Book a Consultation')}>Book a consultation</Button></section>
  </main>;
}

type InnerProps = { view: View; navigate: (view: View) => void; projectFilter: string; setProjectFilter: (value: string) => void; blogCat: string; setBlogCat: (value: string) => void; blogSearch: string; setBlogSearch: (value: string) => void; contact: typeof defaultContact; setContact: (value: typeof defaultContact) => void; contactSent: boolean; setContactSent: (value: boolean) => void; consult: typeof defaultConsult; setConsult: (value: typeof defaultConsult) => void; consultStep: number; setConsultStep: (value: number) => void; consultSent: boolean; setConsultSent: (value: boolean) => void };
const defaultContact = { name: '', email: '', message: '', department: '' };
const defaultConsult = { service: '', name: '', email: '', company: '', phone: '', need: '', date: '' };
function Inner(props: InnerProps) {
  const { view, navigate } = props;
  if (view === 'Contact') return <Contact {...props} />;
  if (view === 'Book a Consultation') return <Consultation {...props} />;
  const title = view === 'Insights / Blog' ? 'Insights for better decisions.' : view === 'Projects' ? 'Work grounded in real organizations.' : view === 'Our Team' ? 'The people behind the practice.' : view;
  const intro = view === 'About' ? 'A professional practice shaped around accuracy, independence and practical value.' : view === 'Audit & Assurance' ? 'Independent, objective and professional assurance for organizations that value accountability.' : view === 'Services' ? 'A connected suite of services for the financial realities of Nigerian organizations.' : 'Explore our work, people and perspectives.';
  return <main><section className="inner-hero"><div className="wrap"><span className="eyebrow">{view === 'Audit & Assurance' ? 'AUDIT & ASSURANCE' : 'RASAKI MURITALA & CO.'}</span><h1>{title}</h1><p>{intro}</p></div></section><section className="inner wrap">
    {view === 'About' && <AboutBody />}
    {view === 'Services' && <ServicesBody navigate={navigate} />}
    {view === 'Audit & Assurance' && <AuditBody navigate={navigate} />}
    {(['Tax', 'Accounting', 'Bank Advisory', 'Training'] as View[]).includes(view) && <ServiceDetail view={view} navigate={navigate} />}
    {view === 'Projects' && <Projects {...props} />}
    {view === 'Insights / Blog' && <Blog {...props} />}
    {view === 'Our Team' && <Team />}
  </section></main>;
}
function AboutBody() {
  return <div className="copy-grid"><div><h2>Who we are</h2><p>Rasaki Muritala & Co. is a professional firm of Chartered Accountants and Tax Practitioners licensed by ICAN since 26 March 1998 and registered with CAC on 26 November 1998.</p><p>Our mandate covers Accountancy, Taxation, Management and General Consultancy Services. We take an integrated approach to the work, bringing relevant financial perspectives together for organizations operating in Nigeria.</p><p>Further company history, professional standards and leadership information are <b>[CONTENT TO BE CONFIRMED]</b>.</p></div><div className="values"><b>Our foundations</b>{['Integrity & independence', 'Professional care', 'Confidentiality', 'Practical advice', 'Timely communication'].map((value) => <span key={value}><Check size={15} />{value}</span>)}</div></div>;
}
function ServicesBody({ navigate }: { navigate: (view: View) => void }) {
  return <div><div className="feature-service"><span className="eyebrow">01 / PRIMARY PRACTICE</span><h2>Audit & Assurance</h2><p>Independent assurance that helps organizations improve accountability, transparency, compliance and decision-making.</p><Button gold onClick={() => navigate('Audit & Assurance')}>Explore audit & assurance</Button></div><div className="simple-services">{services.slice(1).map(([title, body, IconComponent]) => <button data-testid={`link-service-${title.toLowerCase().replaceAll(' ', '-')}`} key={title} onClick={() => navigate((routeFor[title as View] ? title : 'Services') as View)}><IconComponent /><div><b>{title}</b><p>{body}</p></div><ArrowUpRight /></button>)}</div></div>;
}
function AuditBody({ navigate }: { navigate: (view: View) => void }) {
  return <div className="audit-layout"><div><h2>Why audit matters</h2><p>An independent audit brings discipline to the financial reporting process and gives stakeholders a clearer basis for decisions. Our approach is objective, structured and grounded in the evidence available.</p><h2>Our audit approach</h2><p>We understand the organization, assess risk, plan with care, execute the work and report clearly. Detailed methodology and sector coverage are <b>[CONTENT TO BE CONFIRMED]</b>.</p><Button onClick={() => navigate('Book a Consultation')}>Discuss an audit</Button></div><div className="audit-image" style={{ backgroundImage: `url(${image('rasaki-audit.jpg')})` }}><span className="eyebrow">AUDIT & ASSURANCE</span><b>Accountability is built one clear finding at a time.</b><Button gold onClick={() => navigate('Book a Consultation')}>Start a conversation</Button></div></div>;
}
function ServiceDetail({ view, navigate }: { view: View; navigate: (view: View) => void }) {
  const items = view === 'Tax' ? ['Tax Advisory', 'Tax Compliance', 'Tax Planning', 'Business Tax Support'] : view === 'Accounting' ? ['Financial Reporting', 'Bookkeeping', 'Management Accounts', 'Financial Analysis', 'Accounting Advisory'] : view === 'Bank Advisory' ? ['Financial Assessment', 'Banking Advisory', 'Financial Structuring', 'Business Finance Support'] : ['Financial training', 'Audit training', 'Accounting training', 'Tax training', 'Corporate workshops'];
  return <div className="detail-layout"><div><span className="eyebrow">PRACTICAL EXPERTISE</span><h2>{view} for organizations that need clarity.</h2><p>Focused support for the realities of the Nigerian business environment. Service scope and programme detail are <b>[CONTENT TO BE CONFIRMED]</b>.</p><Button onClick={() => navigate('Book a Consultation')}>Talk to our team</Button></div><div className="detail-list">{items.map((item, index) => <div key={item}><span>0{index + 1}</span><b>{item}</b><ArrowUpRight /></div>)}</div></div>;
}
function Projects({ projectFilter, setProjectFilter, navigate }: InnerProps) {
  const filterOptions = ['All', 'Audit', 'Tax', 'Accounting', 'Advisory'];
  const visible = projects.filter((item) => projectFilter === 'All' || item.toLowerCase().includes(projectFilter.toLowerCase()));
  return <div><div className="filters">{filterOptions.map((filter) => <button data-testid={`filter-projects-${filter.toLowerCase()}`} className={projectFilter === filter ? 'selected' : ''} onClick={() => setProjectFilter(filter)} key={filter}>{filter}</button>)}</div>{visible.length ? <div className="case-grid">{visible.map((project, index) => <article className="case-card" key={project}><div className="card-art" style={{ backgroundImage: `url(${image(index % 2 ? 'rasaki-advisory.jpg' : 'rasaki-audit.jpg')})` }} /><span className="card-label">REFERENCE {String(index + 1).padStart(2, '0')}</span><h3>{project}</h3><p>Engagement details and outcomes are [CONTENT TO BE CONFIRMED].</p><button className="text-link" data-testid={`button-project-contact-${index}`} onClick={() => navigate('Contact')}>View case study <ArrowUpRight /></button></article>)}</div> : <div className="empty-state">No references match this filter. Try another view.</div>}</div>;
}
function Blog({ blogCat, setBlogCat, blogSearch, setBlogSearch }: InnerProps) {
  const categories = ['All', 'Tax', 'Finance', 'Regulatory Updates', 'Audit'];
  const visible = useMemo(() => posts.filter(([category, title]) => (blogCat === 'All' || category === blogCat) && title.toLowerCase().includes(blogSearch.toLowerCase())), [blogCat, blogSearch]);
  return <div><div className="blog-tools"><div className="filters">{categories.map((category) => <button data-testid={`filter-blog-${category.toLowerCase().replaceAll(' ', '-')}`} className={blogCat === category ? 'selected' : ''} onClick={() => setBlogCat(category)} key={category}>{category}</button>)}</div><label className="search-box"><Search size={16} /><input data-testid="input-blog-search" type="search" placeholder="Search insights" value={blogSearch} onChange={(event) => setBlogSearch(event.target.value)} /></label></div>{visible.length ? <div className="blog-grid">{visible.map(([category, title], index) => <article className="blog-card" key={title}><div className="card-art" style={{ backgroundImage: `url(${image(index % 2 ? 'rasaki-tax.jpg' : 'rasaki-advisory.jpg')})` }} /><span className="card-label">{category} · [CONTENT TO BE CONFIRMED]</span><h3>{title}</h3><p>Read the latest perspective from Rasaki Muritala & Co.</p><button className="text-link" data-testid={`button-read-article-${index}`}>Read article <ArrowUpRight /></button></article>)}</div> : <div className="empty-state">No insights match your search.</div>}</div>;
}
function Team() {
  return <div><SectionTitle eyebrow="OUR PEOPLE" title="A team directory ready for the people behind the practice." body="Exact names, titles, biographies and portraits are [CONTENT TO BE CONFIRMED]." /><div className="team-grid">{['Leadership', 'Audit & Assurance', 'Tax & Accounting', 'Advisory'].map((group, index) => <article className="team-card" key={group}><div className="avatar">{['RM', 'AA', 'TA', 'FA'][index]}</div><span className="card-label">{group}</span><h3>Team profile [CONTENT TO BE CONFIRMED]</h3><p>Professional biography [CONTENT TO BE CONFIRMED]</p><button className="text-link" data-testid={`button-team-profile-${index}`}>View profile <ArrowUpRight /></button></article>)}</div></div>;
}

function Contact({ contact, setContact, contactSent, setContactSent }: InnerProps) {
  const submit = (event: FormEvent) => { event.preventDefault(); if (contact.name.trim() && contact.email.trim() && contact.message.trim()) setContactSent(true); };
  return <main className="form-page wrap"><div><span className="eyebrow">CONTACT OUR TEAM</span><h1>Let’s make the next decision clearer.</h1><p>Office address, phone, email and business hours are [CONTENT TO BE CONFIRMED].</p><div className="contact-card"><b>Office address</b><span>[CONTENT TO BE CONFIRMED]</span><b>Business hours</b><span>[CONTENT TO BE CONFIRMED]</span><b>Google Maps</b><span className="map-placeholder">Map preview placeholder</span></div></div><form className="form-card" onSubmit={submit}><h2>Send an enquiry</h2>{contactSent ? <div className="confirmation" data-testid="status-contact-confirmation"><Check size={28} /><h3>Thank you.</h3><p>Your enquiry has been recorded for this frontend mockup. A response route is [CONTENT TO BE CONFIRMED].</p><Button onClick={() => setContactSent(false)}>Send another enquiry</Button></div> : <><input data-testid="input-contact-name" required placeholder="Your name" value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} /><input data-testid="input-contact-email" required type="email" placeholder="Work email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} /><select data-testid="select-contact-department" value={contact.department} onChange={(event) => setContact({ ...contact, department: event.target.value })}><option value="">Department</option><option>Audit & Assurance</option><option>Tax</option><option>Accounting</option></select><textarea data-testid="textarea-contact-message" required placeholder="How can we help?" value={contact.message} onChange={(event) => setContact({ ...contact, message: event.target.value })} /><Button testId="button-submit-contact">Submit enquiry</Button></>}</form></main>;
}
function Consultation({ consult, setConsult, consultStep, setConsultStep, consultSent, setConsultSent }: InnerProps) {
  const update = (key: keyof typeof consult, value: string) => setConsult({ ...consult, [key]: value });
  const canContinue = consultStep === 1 ? !!consult.service : consultStep === 2 ? !!consult.name && !!consult.company && !!consult.email : consultStep === 3 ? !!consult.need : !!consult.date;
  return <main className="consultation wrap"><div className="consult-head"><span className="eyebrow">BOOK A CONSULTATION</span><h1>A considered conversation starts here.</h1><div className="steps">{[1, 2, 3, 4].map((step) => <span className={consultStep >= step || consultSent ? 'on' : ''} key={step}>{step}</span>)}</div></div>{consultSent ? <div className="confirmation consult-card" data-testid="status-consultation-confirmation"><Check size={35} /><h2>Request received.</h2><p>Your consultation request is ready for review. Scheduling details are [CONTENT TO BE CONFIRMED].</p><Button onClick={() => { setConsultSent(false); setConsultStep(1); }}>Start another request</Button></div> : <div className="consult-card">{consultStep === 1 && <><h2>What can we help with?</h2><div className="choice-grid">{['Audit', 'Tax', 'Accounting', 'Advisory', 'Training', 'Other'].map((item) => <button data-testid={`choice-consult-${item.toLowerCase()}`} className={consult.service === item ? 'chosen' : ''} onClick={() => update('service', item)} key={item}>{item}<ArrowRight size={16} /></button>)}</div></>}{consultStep === 2 && <><h2>Your information</h2><div className="field-grid"><input data-testid="input-consult-name" required placeholder="Full name" value={consult.name} onChange={(event) => update('name', event.target.value)} /><input data-testid="input-consult-company" required placeholder="Company" value={consult.company} onChange={(event) => update('company', event.target.value)} /><input data-testid="input-consult-email" required type="email" placeholder="Email" value={consult.email} onChange={(event) => update('email', event.target.value)} /><input data-testid="input-consult-phone" placeholder="Phone" value={consult.phone} onChange={(event) => update('phone', event.target.value)} /></div></>}{consultStep === 3 && <><h2>Tell us about your need</h2><textarea data-testid="textarea-consult-need" required placeholder="A short description of the situation or question" value={consult.need} onChange={(event) => update('need', event.target.value)} /></>}{consultStep === 4 && <><h2>Preferred meeting date</h2><input data-testid="input-consult-date" required type="date" value={consult.date} onChange={(event) => update('date', event.target.value)} /></>}<div className="form-actions">{consultStep > 1 && <button data-testid="button-consult-back" onClick={() => setConsultStep(consultStep - 1)}>Back</button>}<Button testId="button-consult-continue" onClick={() => canContinue && (consultStep === 4 ? setConsultSent(true) : setConsultStep(consultStep + 1))}>{consultStep === 4 ? 'Confirm request' : 'Continue'}</Button></div></div>}</main>;
}
function Footer({ navigate }: { navigate: (view: View) => void }) {
  return <footer><div><button className="logo" data-testid="button-footer-logo" onClick={() => navigate('Home')}><i className="logo-mark">RM</i><span className="logo-text">RASAKI MURITALA <b>& CO.</b><small>CHARTERED ACCOUNTANTS</small></span></button><p>Independent assurance, accounting and financial advisory for organizations building trust in Nigeria.</p></div><div><h4>Explore</h4><button onClick={() => navigate('About')}>About us</button><button onClick={() => navigate('Services')}>Services</button><button onClick={() => navigate('Insights / Blog')}>Insights</button></div><div><h4>Connect</h4><p>[CONTENT TO BE CONFIRMED]<br />Office address [CONTENT TO BE CONFIRMED]</p><button onClick={() => navigate('Contact')}>Contact our team <ArrowUpRight size={14} /></button></div></footer>;
}
function NotFound({ navigate }: { navigate: (view: View) => void }) {
  return <main className="inner wrap empty-state"><Mail size={28} /><h1>Page not found</h1><p>The page you requested is not available.</p><Button onClick={() => navigate('Home')}>Return home</Button></main>;
}
function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><ErrorBoundary><AppShell /></ErrorBoundary><Toaster /></TooltipProvider></QueryClientProvider>;
}
export default App;