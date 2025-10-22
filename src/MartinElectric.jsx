import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProjectCarousel from "./ProjectCarousel"; 
import ContactForm from "./ContactForm";
import { Hammer, PanelsTopLeft, PlugZap, Building2, ShieldCheck, Zap, Wrench } from "lucide-react";



export default function MartinElectricOnePage() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("me-dark");
    if (saved !== null) return saved === "true";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("me-dark", String(dark));
  }, [dark]);

  const sections = useMemo(() => ["home","about","services","projects","testimonials","contact"], []);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => e.isIntersecting && setActive(e.target.id));
    }, { threshold: 0.5 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <div className="scroll-smooth bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Sticky header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">Martin Electric Inc</a>
          <nav className="hidden md:flex gap-6 text-sm">
            {sections.map(id => (
              <a key={id} href={`#${id}`}
                 className={`pb-1 transition-colors hover:text-emerald-600 ${
                   active===id ? "text-emerald-600 border-b-2 border-emerald-600"
                               : "text-neutral-700 dark:text-neutral-300"}`}>
                {id[0].toUpperCase()+id.slice(1)}
              </a>
            ))}
          </nav>
          <button onClick={() => setDark(d => !d)}
                  className="rounded-xl p-2 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs">
            {dark ? "☀" : "🌙"}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="pt-24 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Trusted Electrical Solutions for Homes & Businesses
            </h1>
            <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
              Licensed · Insured · Code-Compliant • Serving Southern California
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-xl px-5 py-3 bg-emerald-600 text-white font-medium hover:bg-emerald-700">
                Request a Free Estimate
              </a>
             <motion.a
  href="tel:+13236201958"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="rounded-xl px-5 py-3 border-2 border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50 dark:hover:bg-neutral-900 transition-all duration-200"
>
  📞 Call Now
</motion.a>

            </div>
          </motion.div>
          <motion.div initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.6, delay:0.15}}
            className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
            <div className="aspect-[16/10] bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
  <img
    src="/assets/martin-electrician.jpg"
    alt="Martin the Electrician at work"
    className="w-full h-[700px] object-cover object-center"
  />
            </div>
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

  {/* Service cards */}
  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
    {/* Residential Wiring & Remodels */}
    <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-lg transition-all">
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
        <a href="#contact" className="inline-block mt-4 text-emerald-700 hover:text-emerald-800 text-sm font-medium">Request estimate →</a>
      </div>
    </article>

    {/* Panel & Service Upgrades */}
    <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-lg transition-all">
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
        <a href="#contact" className="inline-block mt-4 text-emerald-700 hover:text-emerald-800 text-sm font-medium">Upgrade my panel →</a>
      </div>
    </article>

    {/* Solar, EV & Energy Systems */}
    <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-lg transition-all">
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
        <a href="#contact" className="inline-block mt-4 text-emerald-700 hover:text-emerald-800 text-sm font-medium">Ask about EV / Solar →</a>
      </div>
    </article>

    {/* Commercial & Multi-Unit */}
    <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-lg transition-all">
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
        <a href="#contact" className="inline-block mt-4 text-emerald-700 hover:text-emerald-800 text-sm font-medium">Schedule a walk-through →</a>
      </div>
    </article>
  </div>

  {/* Process strip */}
  <div className="mt-10 grid md:grid-cols-3 gap-6">
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">1) Free Estimate</p>
      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">Clear pricing and scope—no surprises.</p>
    </div>
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
      <p className="text-sm font-semibold">2) Permit & Scheduling</p>
      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">We handle permits and utility coordination.</p>
    </div>
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
      <p className="text-sm font-semibold">3) Professional Install</p>
      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">Clean, code-compliant work—guaranteed.</p>
    </div>
  </div>

  {/* CTA row */}

</Section>



<Section id="projects" title="Featured Projects" kicker="Our Work">
  <div className="max-w-6xl mx-auto">
    <ProjectCarousel />
  </div>
</Section>


      <Section id="testimonials" title="What Clients Say" kicker="Testimonials">
        <div className="grid lg:grid-cols-3 gap-5">
          {["Professional and on time.","Panel upgrade done perfectly.","Handled our multi-unit service changeout flawlessly."].map((q,i)=>(
            <blockquote key={i} className="rounded-2xl p-6 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              “{q}”
            </blockquote>
          ))}
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
