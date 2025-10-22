import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import ProjectCarousel from "./ProjectCarousel";
import ContactForm from "./ContactForm";
import { Hammer, PanelsTopLeft, PlugZap, Building2, ShieldCheck, Zap, Wrench } from "lucide-react";
import { Reveal, stagger, item } from "./Reveal";
import EnergyBlobs from "./EnergyBlobs";
import CounterUp from "./CounterUp";
import { Menu, X } from "lucide-react";




export default function MartinElectricOnePage() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("me-dark");
    if (saved !== null) return saved === "true";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);

// optional: lock body scroll when menu is open
useEffect(() => {
  document.body.style.overflow = mobileOpen ? "hidden" : "";
  return () => { document.body.style.overflow = ""; };
}, [mobileOpen]);

// Testimonials data (inside MartinElectricOnePage, above return)
const testimonials = [
  {
    quote:
      "Professional, on time, and the quality shows. Our kitchen remodel lighting looks incredible.",
    name: "Kara M.",
    meta: "Homeowner • Pasadena",
    stars: 5,
  },
  {
    quote:
      "Panel upgrade and EV charger done perfectly. Clear estimate, clean work, zero surprises.",
    name: "Anthony R.",
    meta: "Townhome Owner • Glendale",
    stars: 5,
  },
  {
    quote:
      "Handled a multi-unit service changeout flawlessly. Coordinated permits and utility like pros.",
    name: "Linh T.",
    meta: "Property Manager • Burbank",
    stars: 5,
  },
];

  // Dark mode toggle
  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("me-dark", String(dark));
  }, [dark]);

  // === HERO PARALLAX ===
  const heroRef = useRef(null);
  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(heroProg, [0, 1], ["-2vh", "4vh"]);
  const scale = useTransform(heroProg, [0, 1], [1.02, 1]);

  // === PROGRESS BAR (top scroll) ===
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  // === SECTION TRACKING ===
  const sections = useMemo(() => ["home", "about", "services", "projects", "testimonials", "contact"], []);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { threshold: 0.5 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);
  

  return (
    <div className="scroll-smooth bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Sticky header */}
<header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/80 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    {/* Brand */}
    <a href="#home" className="font-semibold tracking-tight">Martin Electric</a>

    {/* Desktop nav */}
    <nav className="hidden md:flex gap-6 text-sm">
      {sections.map(id => (
        <a
          key={id}
          href={`#${id}`}
          className={`pb-1 transition-colors hover:text-emerald-600 ${
            active===id
              ? "text-emerald-600 border-b-2 border-emerald-600"
              : "text-neutral-700 dark:text-neutral-300"
          }`}
        >
          {id[0].toUpperCase()+id.slice(1)}
        </a>
      ))}
    </nav>

    {/* Dark mode toggle + Mobile button */}
    <div className="flex items-center gap-2">
      <button
        onClick={() => setDark(d => !d)}
        className="rounded-xl p-2 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs"
        aria-label="Toggle dark mode"
      >
        {dark ? "☀" : "🌙"}
      </button>

      {/* Hamburger (mobile only) */}
      <button
        className="md:hidden rounded-lg p-2 border border-neutral-200 dark:border-neutral-800"
        onClick={() => setMobileOpen(o => !o)}
        aria-label="Open menu"
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  </div>

  {/* Mobile menu panel */}
  {mobileOpen && (
    <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 grid gap-2">
        {sections.map(id => (
          <a
            key={id}
            href={`#${id}`}
            className={`py-2 text-sm ${
              active===id ? "text-emerald-600 font-medium" : "text-neutral-800 dark:text-neutral-200"
            }`}
            onClick={() => setMobileOpen(false)} // close after tap
          >
            {id[0].toUpperCase()+id.slice(1)}
          </a>
        ))}
      </nav>
    </div>
  )}
</header>

<motion.div
  style={{ scaleX: progress }}
  className="fixed left-0 top-16 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
/>
{/* HERO */}
<section id="home" className="relative pt-24 sm:pt-28 overflow-hidden">
  {/* Energy Background */}
  <EnergyBlobs className="opacity-60 dark:opacity-40" />

  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center relative z-10">
    {/* Left: headline + CTAs */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
        Trusted Electrical Solutions for Homes & Businesses
      </h1>
      <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
        Licensed · Insured · Code-Compliant • Serving Southern California
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="#contact"
          className="rounded-xl px-5 py-3 bg-emerald-600 text-white font-medium hover:bg-emerald-700"
        >
          Request a Free Estimate
        </a>

        <motion.a
          href="tel:+13236201958"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22, mass: 0.2 }}
          className="rounded-xl px-5 py-3 border-2 border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50 dark:hover:bg-neutral-900 transition-all duration-200"
        >
          📞 Call Now
        </motion.a>
      </div>
    </motion.div>

    {/* Right: Parallax Image */}
    <motion.div
      ref={heroRef}
      style={{ y, scale }}
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5"
      aria-label="Photo of Martin the Electrician at work"
    >
      <img
        src="/assets/martin-electrician.jpg"
        alt="Martin the Electrician at work"
        className="w-full h-[400px] sm:h-[550px] lg:h-[700px] object-cover object-center"
        loading="eager"
        fetchpriority="high"
      />
    </motion.div>
  </div>
</section>

     <Section id="about" title="About Martin Electric" kicker="Who We Are">
  <div className="space-y-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
    <p>
      At <strong>Martin Electric Inc</strong>, we believe that reliable power is the foundation of every safe and comfortable home or business. 
      With over a decade of hands-on experience in residential, commercial, and industrial electrical work, 
      our team has built a reputation for delivering high-quality, code-compliant installations and responsive service across Southern California.
    </p>

    <p>
      As a fully licensed and insured <strong>C-10 electrical contractor</strong>, we specialize in everything from new construction wiring and 
      electrical remodels to advanced panel upgrades, EV charger installations, and solar energy integration. 
      Whether you’re a homeowner upgrading your electrical system or a business owner looking to expand safely and efficiently, 
      Martin Electric provides end-to-end solutions tailored to your specific needs.
    </p>

    <p>
      What sets us apart is our commitment to transparency and precision. 
      Every project begins with a clear estimate and honest communication—no hidden fees, no rushed work. 
      We use only trusted materials and industry-best practices to ensure every job meets both local code and the highest standards of craftsmanship.
    </p>

    <p>
      Beyond technical excellence, Martin Electric is dedicated to building long-term relationships with our clients. 
      Our goal isn’t just to complete a project—it’s to become your go-to partner for all electrical needs, 
      from troubleshooting and safety inspections to energy-efficient upgrades that save you money for years to come.
    </p>

    <p className="italic text-neutral-600 dark:text-neutral-400">
      Trusted by homeowners, contractors, and business owners alike—Martin Electric continues to power Southern California 
      with integrity, quality, and genuine care for every customer we serve.
    </p>
  </div>
</Section>

<Section id="services" title="Services" kicker="What We Do">
  {/* Top badges */}
  <Reveal>
    <div className="flex flex-wrap gap-3 mb-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">
        <ShieldCheck className="h-4 w-4" /> Licensed · Insured · Code-Compliant
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-900 px-3 py-1 text-xs">
        <Wrench className="h-4 w-4" /> Warranty on workmanship
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-900 px-3 py-1 text-xs">
        <Zap className="h-4 w-4" /> Rapid scheduling available
      </span>
    </div>
  </Reveal>

  {/* Service cards */}
  <motion.div
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
  >
    {/* Residential Wiring & Remodels */}
    <motion.article
      variants={item}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Hammer className="h-6 w-6 text-emerald-600" />
          <h3 className="font-semibold">Residential Wiring & Remodels</h3>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          <li>• New circuits, dedicated appliance lines</li>
          <li>• Kitchen/bath rewires & lighting plans</li>
          <li>• Recessed/LED upgrades, dimmers, smart controls</li>
          <li>• Troubleshooting & code corrections</li>
        </ul>
      </div>
      <div className="px-5 pb-5">
        <a href="#contact" className="inline-block mt-4 text-emerald-700 hover:text-emerald-800 text-sm font-medium">
          Request estimate →
        </a>
      </div>
    </motion.article>

    {/* Panel & Service Upgrades */}
    <motion.article
      variants={item}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="p-5">
        <div className="flex items-center gap-3">
          <PanelsTopLeft className="h-6 w-6 text-emerald-600" />
          <h3 className="font-semibold">Panel & Service Upgrades</h3>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          <li>• 100A → 200A/400A service changes</li>
          <li>• Meter/main combos, sub-panels, labeling</li>
          <li>• AFCI/GFCI protection & surge protection</li>
          <li>• Utility coordination & permits handled</li>
        </ul>
      </div>
      <div className="px-5 pb-5">
        <a href="#contact" className="inline-block mt-4 text-emerald-700 hover:text-emerald-800 text-sm font-medium">
          Upgrade my panel →
        </a>
      </div>
    </motion.article>

    {/* Solar, EV & Energy Systems */}
    <motion.article
      variants={item}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="p-5">
        <div className="flex items-center gap-3">
          <PlugZap className="h-6 w-6 text-emerald-600" />
          <h3 className="font-semibold">Solar, EV & Energy Systems</h3>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          <li>• EV chargers (Level 2), dedicated runs</li>
          <li>• PV tie-ins, inverters, rapid shutdown</li>
          <li>• Battery backup & generator interlocks</li>
          <li>• Load calculations & energy optimization</li>
        </ul>
      </div>
      <div className="px-5 pb-5">
        <a href="#contact" className="inline-block mt-4 text-emerald-700 hover:text-emerald-800 text-sm font-medium">
          Ask about EV / Solar →
        </a>
      </div>
    </motion.article>

    {/* Commercial & Multi-Unit */}
    <motion.article
      variants={item}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-emerald-600" />
          <h3 className="font-semibold">Commercial & Multi-Unit</h3>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          <li>• Tenant improvements & lighting retrofits</li>
          <li>• Multi-meter service gear & disconnects</li>
          <li>• Roof-top units & equipment feeds</li>
          <li>• Maintenance, safety, compliance reports</li>
        </ul>
      </div>
      <div className="px-5 pb-5">
        <a href="#contact" className="inline-block mt-4 text-emerald-700 hover:text-emerald-800 text-sm font-medium">
          Schedule a walk-through →
        </a>
      </div>
    </motion.article>
  </motion.div>
</Section>

{/* STATS SECTION */}

<section id="stats" className="mt-20 scroll-mt-24">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl sm:text-4xl font-bold mb-10 tracking-tight">
      Powering Southern California with Experience
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
      <CounterUp to={500} suffix="+" label="Projects Completed" />
      <CounterUp to={300} suffix="+" label="Residential Clients" />
      <CounterUp to={120} suffix="+" label="Panel Upgrades" />
      <CounterUp to={20}  suffix=" yrs" label="Years of Experience" />
    </div>
  </div>
</section>



<Section id="projects" title="Featured Projects" kicker="Our Work">
  <div className="max-w-6xl mx-auto">
    <ProjectCarousel />
  </div>
</Section>


<Section id="testimonials" title="What Clients Say" kicker="Testimonials">
  {/* Desktop: staggered 3-column grid */}
  <motion.div
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.08 },
      },
    }}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    className="hidden md:grid md:grid-cols-3 gap-5"
  >
    {testimonials.map((t, i) => (
      <motion.blockquote
        key={i}
        variants={{
          hidden: { opacity: 0, y: 18, scale: 0.98 },
          show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        whileHover={{ y: -4, rotate: [-0.1, 0.1, 0] }}
        transition={{ duration: 0.3 }}
        className="relative rounded-2xl p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-shadow"
      >
        {/* Soft ambient glow */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.6 }}
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "radial-gradient(100% 60% at 10% 0%, rgba(16,185,129,0.08), transparent 60%), radial-gradient(100% 60% at 100% 100%, rgba(34,211,238,0.08), transparent 60%)",
            filter: "blur(0.5px)",
          }}
        />

        {/* Stars using simple characters to avoid extra imports */}
        <div className="text-amber-500 text-sm">{"★".repeat(t.stars)}</div>

        {/* Quote text */}
        <p className="mt-3 text-neutral-800 dark:text-neutral-200 leading-relaxed">
          “{t.quote}”
        </p>

        {/* Name + meta */}
        <footer className="mt-4">
          <div className="font-semibold">{t.name}</div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {t.meta}
          </div>
        </footer>
      </motion.blockquote>
    ))}
  </motion.div>

  {/* Mobile: horizontal snap scroller */}
  <div className="md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory">
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.08 },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex gap-4"
    >
      {testimonials.map((t, i) => (
        <motion.blockquote
          key={i}
          variants={{
            hidden: { opacity: 0, y: 18, scale: 0.98 },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          whileHover={{ y: -2 }}
          className="min-w-[85%] snap-center relative rounded-2xl p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm"
        >
          <div className="text-amber-500 text-sm">{"★".repeat(t.stars)}</div>
          <p className="mt-3 text-neutral-800 dark:text-neutral-200 leading-relaxed">
            “{t.quote}”
          </p>
          <footer className="mt-4">
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {t.meta}
            </div>
          </footer>
        </motion.blockquote>
      ))}
    </motion.div>
  </div>
</Section>


<Section id="contact" title="Get in Touch" kicker="Request a Quote">
  <ContactForm endpoint="https://formspree.io/f/mpwygzpk" />
</Section>


      <footer className="mt-20 py-10 border-t border-neutral-200 dark:border-neutral-800 text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Martin Electric. All rights reserved.</p>
          <p className="opacity-70">Website by Inkwell Hue Design</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, title, kicker, children }) {
  return (
    <section id={id} className="scroll-mt-24 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="mb-8">
          {kicker && <p className="text-emerald-600 font-semibold tracking-wide">{kicker}</p>}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">{title}</h2>
        </motion.header>
        {children}
      </div>
    </section>
  );
}

function Field({ label, type = "text", className = "", ...props }) {
  if (type === "textarea") {
    return (
      <label className={`block ${className}`}>
        <span className="text-sm mb-1 block">{label}</span>
        <textarea rows={5} className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...props} />
      </label>
    );
  }
  return (
    <label className={`block ${className}`}>
      <span className="text-sm mb-1 block">{label}</span>
      <input type={type} className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...props} />
    </label>
  );
}
