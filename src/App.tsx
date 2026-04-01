import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mail, ExternalLink, MapPin, Smartphone, Server, Code2, Layers, HeartIcon } from 'lucide-react';
import {
  SiAndroid, SiKotlin, SiGo, SiRuby, SiAngular, SiTypescript, SiCplusplus, SiQt,
  SiJavascript, SiPython, SiMongodb, SiPostgresql,
  SiFirebase, SiGraphql, SiNodedotjs
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.1-3.4 0 0-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-7 0C6.2 1.6 5 2 5 2c-.7 1.8-.2 3.1-.1 3.4-1 .9-1.5 2-1.5 3.4 0 5 3 6.2 6 6.5-1 .5-1.4 1.5-1.5 2.8-.8.4-2.8 1-3.8-1-1-1.7-2.6-2-2.6-2-1.5-.1-.1.1-.1.1 1 .2 1.8 1.4 1.8 1.4 1.1 2 3.2 2 3.9 1.5v3" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import { AndroidPretextBlock } from './components/AndroidPretextBlock';
import './index.css';

const getTechIcon = (tech: string) => {
  switch (tech.toLowerCase()) {
    case 'android': return <SiAndroid color="#3DDC84" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'kotlin': return <SiKotlin color="#7F52FF" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'go': return <SiGo color="#00ADD8" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'ruby': return <SiRuby color="#CC342D" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'angular': return <SiAngular color="#DD0031" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'typescript': return <SiTypescript color="#3178C6" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'javascript': return <SiJavascript color="#F7DF1E" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'java': return <FaJava color="#007396" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'python': return <SiPython color="#3776AB" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'node': return <SiNodedotjs color="#339933" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'c++': return <SiCplusplus color="#00599C" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'qt': return <SiQt color="#41CD52" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'mongodb': return <SiMongodb color="#47A248" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'postgres': return <SiPostgresql color="#4169E1" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'aws': return <FaAws color="#232F3E" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'firebase': return <SiFirebase color="#FFCA28" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'graphql': return <SiGraphql color="#E10098" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'jetpack compose': return <Layers color="#4285F4" className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px' }} />;
    case 'heart': return <HeartIcon color="#CC342D" fill="#CC342D" className="w-3.5 h-3.5 mx-1" style={{ marginRight: '6px', marginLeft: '6px' }} />;
    default: return <Code2 className="w-3.5 h-3.5 mr-1" style={{ marginRight: '6px', marginLeft: '6px' }} />;
  }
};

const experience = [
  {
    company: "Doordash",
    role: "Software Engineer",
    date: "Nov'24 – Feb'26",
    location: "Bengaluru",
    tech: ["Android", "Kotlin", "Jetpack Compose", "Go", "Ruby"],
    points: [
      "Boosted critical message read rates by 40% and achieved 100% regional legal compliance by architecting the Rider Communications",
      "Performance optimization by analyzing perfetto traces and benchmarking leading to 10% faster screen load times and 15% lower CPU usage during high-load sessions.",
      "Introduced macrobenchmarking for highly critical flows and automated it on CI pipelines to improve performance regressions",
      "Led cross platform feature delivery by engineering core horizontal components, viz. Remote rendering, & Pagination for Rooblocks, an in-house Server-Driven UI framework built with Go, Litho, & Yoga",
      "Architectural migration from RxJava to Kotlin Coroutines and Flows, reducing code complexity by ~40% and improving crash-free sessions",
      "Decreased manual maintenance by 15% by setting up Renovate for dependency management & lint checks with ktlint as pre push git hooks.",
      "Increased visibility for app size, by engineering automated nightly app-size monitors on CI via Terraform and publishing to Datadog"
    ]
  },
  {
    company: "Bajaj Finance",
    role: "Senior Software Engineer",
    date: "Oct'20 – Nov'24",
    location: "Bengaluru",
    tech: ["Android", "Kotlin", "Jetpack Compose", "Angular", "Typescript"],
    points: [
      "Foundational engineer for 3in1 application with 50Mn+ downloads on Google play store.",
      "Developed and implemented a 2-way communication bridge between PWA and Android native code, enabling seamless interaction.",
      "Led refactoring of 30% of the multi module codebase from legacy View based architecture to modern declarative design patterns using Compose with MVI architecture for scalable app development.",
      "Implemented standardized coding practices and testing protocols, reaching 80% unit test coverage and introducing Espresso UI testing.",
      "Experienced in implementing Dependency Injection using Dagger and Hilt to enhance modularity and testability.",
      "Engineered a CI/CD pipeline that automates builds, enforces quality checks, and seamlessly distributes builds to relevant teams.",
      "Awarded Heroes for successful delivery and exceptional dedication, reflecting a strong commitment to project goals and team collaboration."
    ]
  },
  {
    company: "Airbus India",
    role: "Intern, Avionics System & Software Testing",
    date: "May'19 – Jul'19",
    location: "Bengaluru",
    tech: ["C++", "Qt", "Avionics"],
    points: [
      "Worked in Flight Warning System division of Airbus A340 aircraft.",
      "Development of inhouse Generic Test Automation in C++ & Qt, incorporating various features like modular theme and indentation.",
      "Functional validation of FWS of Airbus aircraft by injecting various failure mode operations and observing output."
    ]
  }
];

const projects = [
  {
    name: "Vox",
    desc: "Agentic AI driven audiobooks",
    link: "https://github.com/psuedoForce/vox",
    points: [
      "End to end AI audiobook backend that converts raw book text into multi-voice, cinematic audio using an LLM multi-agent pipeline with Director, Sound Designer, Critic, Mixer, and a QC",
      "Deterministic voice governance and multi-layer caching for casting, speech & SFX to improve consistency while reducing repeated API cost and latency.",
      "Compose Multiplatform app built with Material 3 and MVI architecture."
    ]
  },
  {
    name: "POLICY GPT",
    desc: "Policy Bot - Hackathon, BFL",
    link: null,
    points: [
      "Developed a strict RAG pipeline, utilizing chroma vector DB to index and search policies.",
      "Policy-focused agentic bot leveraging Langchain and Gemini LLM to synthesize retrieved vector data into precise, context-aware answers."
    ]
  },
  {
    name: "Gator",
    desc: "RSS Feed Explorer CLI built in Go",
    link: "https://github.com/psuedoForce/gator",
    points: [
      "Robust Command Line Interface built in Go to aggregate, manage, and follow RSS feeds.",
      "Engineered backend features to register accounts, subscribe to distinct content sources, and query robust XML updates.",
      "Integrated PostgreSQL for persistent user and feed storage under concurrent loads."
    ]
  },
  {
    name: "Pokedex CLI",
    desc: "Interactive Pokémon Explorer in Go",
    link: "https://github.com/psuedoForce/Pokedex",
    points: [
      "Lightweight, interactive Command Line Interface to explore map areas and simulate catching mechanics.",
      "Integrated external PokeAPI to dynamically discover map areas, investigate encounter rates, and pull companion traits.",
      "Deployed an internal in-memory caching system to drastically optimize repeated remote API payloads."
    ]
  }
];

const skills = [
  { category: "Languages", items: ["Java", "Kotlin", "Go", "Javascript", "SQL"], icon: <Code2 className="w-5 h-5" /> },
  { category: "Frameworks", items: ["Android", "KMM", "Angular", "Node"], icon: <Smartphone className="w-5 h-5" /> },
  { category: "Backend", items: ["Python", "MongoDB", "DynamoDB", "AWS", "Postgres", "Firebase", "GraphQL"], icon: <Server className="w-5 h-5" /> },
  { category: "Android ecosystem", items: ["Activity", "Fragments", "Lifecycle", "Hilt", "Dagger", "Room", "Retrofit", "Coil", "Glide", "MVVM", "MVI", "MVP", "Jetpack Compose", "ViewModels", "Navigation", "Mapbox", "Gson", "Moshi", "Coroutines", "Flows"], icon: <Smartphone className="w-5 h-5" /> },
];

function App() {
  const introText = "I am a Software Engineer passionate about building scalable, fast, and beautiful applications. I specialize in Android ecosystem, modern backends, and AI integrations. Whether it's writing Kotlin Coroutines for seamless mobile UX or architecting Go microservices, I strive to deliver world-class engineering solutions.";

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const glowScale = useTransform(scrollY, [0, 600], [1, 1.8]);

  const listContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const listItem: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <>
      <motion.div className="glow" style={{ scale: glowScale, opacity: 0.2 }} />

      {/* Navbar Container for fixed positioning / aesthetics */}
      <nav className="navbar-pill">
        <a href="#about" className="nav-link">About</a>
        <a href="#experience" className="nav-link">Experience</a>
        <a href="#projects" className="nav-link">Projects</a>
        <div style={{ width: 1, height: 16, background: 'var(--surface-variant)' }} />
        <a href="https://github.com/psuedoForce" target="_blank" rel="noreferrer" className="nav-link"><GithubIcon className="w-5 h-5" /></a>
        <a href="https://www.linkedin.com/in/sharmaabhinavk/" target="_blank" rel="noreferrer" className="nav-link"><LinkedinIcon className="w-5 h-5" /></a>
      </nav>

      {/* Hero Section */}
      <motion.header className="hero-section" id="about" style={{ y: heroY, opacity: heroOpacity }}>
        <div className="container" style={{ maxWidth: '800px', marginTop: '100px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }} style={{ width: '100%' }}>
            <h3 style={{ color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 600 }}>
              Portfolio
            </h3>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '8px', letterSpacing: '-0.03em' }}>
              Abhinav <span className="gradient-text">Kumar</span>
            </h1>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-secondary)', marginBottom: '32px', fontWeight: 400, fontStyle: 'italic' }}>
              &quot;<span className="gradient-text">Do</span> or <span className="gradient-text">do not</span>, there is no <a href="https://starwarsreport.com/2013/03/18/lessons-from-star-wars-do-or-do-not-there-is-no-try/" target="_blank" rel="noreferrer" className="gradient-accent" style={{ textDecoration: 'none' }}>try</a>&quot;
            </h2>

            <div style={{ padding: '0 0 40px 0', opacity: 0.9 }}>
              <AndroidPretextBlock
                key={isMobile ? 'mobile' : 'desktop'}
                text={introText}
                font={isMobile ? "400 16px Roboto, sans-serif" : "400 20px Roboto, sans-serif"}
                lineHeight={isMobile ? 26 : 36}
                align="center"
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:sharma.abhinavkr@gmail.com" className="btn btn-primary">
              <Mail className="w-4 h-4" /> Email Me
            </a>
            <a href="https://github.com/psuedoForce" target="_blank" rel="noreferrer" className="btn">
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/sharmaabhinavk/" target="_blank" rel="noreferrer" className="btn">
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </a>
          </motion.div>
        </div>
      </motion.header>

      {/* Experience Section */}
      <section className="section" id="experience">
        <div className="container" style={{ maxWidth: '900px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontSize: '2.5rem', marginBottom: '48px' }}>
            Work Experience
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{ padding: '40px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: 700 }}>{exp.company}</h3>
                    <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 500, fontFamily: 'var(--font-display)' }}>{exp.role}</div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '4px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--primary-container)', color: 'var(--on-primary-container)', borderRadius: '16px', fontSize: '0.85rem', marginBottom: '8px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{exp.date}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontSize: '0.85rem', justifyContent: 'center', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <MapPin className="w-4 h-4" style={{ color: 'var(--secondary)' }} /> {exp.location}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap' }}>
                  {exp.tech.map((t, i) => (
                    <motion.span whileHover={{ scale: 1.1, backgroundColor: 'var(--primary)', color: '#000' }} key={i} className="tag" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {getTechIcon(t)}
                      {t}
                    </motion.span>
                  ))}
                </div>

                <motion.ul
                  variants={listContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)' }}
                >
                  {exp.points.map((pt, i) => (
                    <motion.li variants={listItem} key={i} style={{ lineHeight: '1.6' }}>{pt}</motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <div className="container" style={{ maxWidth: '900px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontSize: '2.5rem', marginBottom: '48px' }}>
            Projects
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {projects.map((proj, idx) => (
              <motion.div
                key={idx}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700 }}>{proj.name}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-mono)' }}>
                  {proj.desc}
                </div>
                <motion.ul
                  variants={listContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)', flexGrow: 1 }}
                >
                  {proj.points.map((pt, i) => (
                    <motion.li variants={listItem} key={i} style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>{pt}</motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section" id="skills">
        <div className="container" style={{ maxWidth: '900px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontSize: '2.5rem', marginBottom: '48px', textAlign: 'center' }}>
            Technical Expertise
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                className="glass-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ padding: '32px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: 'var(--primary)' }}>
                    {skill.icon}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 700 }}>{skill.category}</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skill.items.map((item, i) => (
                    <motion.span
                      whileHover={{ scale: 1.1, backgroundColor: 'var(--primary)', color: '#000' }}
                      key={i}
                      className="tag"
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                    >
                      {getTechIcon(item)}
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 5%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px' }}>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Made with {getTechIcon("heart")} by AK
        </p>
      </footer>
    </>
  );
}

export default App;
