/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Logo } from './Logo';
import { TechAnimation } from './TechAnimation';
import { InteractivePlayground } from './InteractivePlayground';
import { AdminPortal } from './AdminPortal';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Briefcase,
  Users2,
  Calendar,
  Building,
  Mail,
  Phone,
  Clock,
  MapPin,
  ChevronRight,
  Shield,
  Send,
  Sparkles,
  ArrowRight,
  BookmarkCheck,
  CheckCircle2,
  Plus
} from 'lucide-react';

export const MainSite: React.FC = () => {
  const { siteContent, projects, members, photos, contact, addPitch } = useData();

  // Navigation states
  const [activeCategory, setActiveCategory] = useState<'All' | 'Agri-Tech' | 'Health-Tech' | 'Rural Utilities'>('All');
  const [activeRole, setActiveRole] = useState<'All' | 'Professor' | 'Student'>('All');

  // Contact / Idea pitch form states
  const [pitchForm, setPitchForm] = useState({ name: '', email: '', idea: '', domain: 'agri-tech' as const });
  const [pitchSubmitted, setPitchSubmitted] = useState<boolean>(false);

  // Admin portal open state
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Filtering lists
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const filteredMembers = activeRole === 'All'
    ? members
    : members.filter(m => m.role === activeRole);

  const handlePitchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPitch({
      name: pitchForm.name,
      email: pitchForm.email,
      domain: pitchForm.domain as any,
      idea: pitchForm.idea
    });
    setPitchSubmitted(true);
    setTimeout(() => {
      setPitchSubmitted(false);
      setPitchForm({ name: '', email: '', idea: '', domain: 'agri-tech' });
    }, 5000);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-blue-600 selection:text-white" id="main-site-container">
      
      {/* 1. GLASS NAV BAR */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-blue-900/10 px-4 md:px-8 py-3.5" id="site-navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo with wide layout on navbar */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo size="sm" showText={false} />
            <div className="hidden sm:block">
              <span className="font-sans font-black tracking-widest text-white text-base uppercase block leading-none">niic</span>
              <span className="font-sans tracking-widest text-[8px] text-blue-300 uppercase block mt-1 font-bold">Navodaya Innovation Hub</span>
            </div>
          </div>

          {/* Desktop Navigation Anchors */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-sans font-extrabold text-slate-400 tracking-wider">
            <button onClick={() => handleScrollTo('hero-section')} className="hover:text-white transition-colors cursor-pointer">HOME</button>
            <button onClick={() => handleScrollTo('tech-animation-section')} className="hover:text-white transition-colors cursor-pointer">TECH ORBIT</button>
            <button onClick={() => handleScrollTo('interactive-playground-section')} className="hover:text-white transition-colors cursor-pointer">V8 SANDBOX</button>
            <button onClick={() => handleScrollTo('ventures-section')} className="hover:text-white transition-colors cursor-pointer">VENTURES</button>
            <button onClick={() => handleScrollTo('personnel-section')} className="hover:text-white transition-colors cursor-pointer">PERSONNEL</button>
            <button onClick={() => handleScrollTo('gallery-section')} className="hover:text-white transition-colors cursor-pointer">GALLERY</button>
            <button onClick={() => handleScrollTo('contact-section')} className="hover:text-white transition-colors cursor-pointer">CONTACT</button>
          </div>

          {/* Control Triggers */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAdminOpen(true)}
              className="flex items-center gap-2 bg-blue-950 border border-blue-800/40 text-blue-400 hover:text-white hover:bg-blue-900/30 px-3.5 py-2 rounded-xl text-xs font-sans font-bold tracking-wider transition-all cursor-pointer"
              id="navbar-admin-login-btn"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Terminal</span>
            </button>
          </div>

        </div>
      </nav>

      {/* 2. DYNAMIC HERO BOARD */}
      <section className="relative py-20 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-b from-blue-950/20 via-slate-950 to-slate-950" id="hero-section">
        {/* Glow ambient meshes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-8 z-10 relative">
          
          {/* Animated Central Logo Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Logo size="lg" showText={false} />
          </motion.div>

          {/* Glowing Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-800/30 px-4.5 py-2 rounded-full text-blue-300 text-[10.5px] font-sans font-extrabold tracking-[0.1em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>INCUBATION PORTAL ACTIVE // SECURE SYSTEM</span>
          </motion.div>

          {/* Heading with smooth transition */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-white leading-tight"
          >
            {siteContent.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl font-sans font-light leading-relaxed"
          >
            {siteContent.heroSubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => handleScrollTo('ventures-section')}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-3.5 px-7 rounded-xl shadow-lg shadow-blue-900/30 transition-all hover:scale-103 cursor-pointer"
            >
              <span>Explore Active Ventures</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScrollTo('contact-section')}
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-sans text-xs font-bold py-3.5 px-7 rounded-xl border border-slate-800 transition-all cursor-pointer"
            >
              <span>Pitch Your Startup Idea</span>
            </button>
          </motion.div>

          {/* Metrics Panel Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/40 p-4 sm:p-6 rounded-2xl border border-blue-900/10 mt-16 max-w-3xl mx-auto"
            id="hero-stats-panel"
          >
            <div className="space-y-1 text-center md:border-r border-slate-800/60 last:border-none">
              <span className="text-2xl md:text-3xl font-sans font-extrabold text-white block">{siteContent.statsProjects}</span>
              <span className="text-[9px] sm:text-[10px] font-sans text-blue-300 uppercase tracking-widest block font-extrabold">VENTURES</span>
            </div>
            <div className="space-y-1 text-center md:border-r border-slate-800/60 last:border-none">
              <span className="text-2xl md:text-3xl font-sans font-extrabold text-white block">{siteContent.statsStudents}</span>
              <span className="text-[9px] sm:text-[10px] font-sans text-blue-300 uppercase tracking-widest block font-extrabold">SCHOLARS</span>
            </div>
            <div className="space-y-1 text-center md:border-r border-slate-800/60 last:border-none">
              <span className="text-2xl md:text-3xl font-sans font-extrabold text-white block">{siteContent.statsProfessors}</span>
              <span className="text-[9px] sm:text-[10px] font-sans text-blue-300 uppercase tracking-widest block font-extrabold">ADVISORS</span>
            </div>
            <div className="space-y-1 text-center last:border-none">
              <span className="text-2xl md:text-3xl font-sans font-extrabold text-teal-400 block">{siteContent.statsFunding}</span>
              <span className="text-[9px] sm:text-[10px] font-sans text-blue-300 uppercase tracking-widest block font-extrabold">GRANTS SECURED</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. ABOUT US SECTION */}
      <section className="py-20 px-4 md:px-8 border-t border-blue-900/10 bg-slate-950 relative" id="about-section">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Visual geometric abstract layout */}
          <div className="md:col-span-5 relative flex items-center justify-center min-h-[280px]">
            <div className="absolute w-48 h-48 bg-blue-600/10 rounded-full blur-2xl animate-pulse" />
            
            {/* Visual stacked blueprint tiles */}
            <div className="absolute border border-blue-900/30 w-52 h-52 rotate-6 rounded-2xl bg-slate-900/30" />
            <div className="absolute border border-teal-500/25 w-48 h-48 -rotate-6 rounded-2xl bg-slate-950/80" />
            <div className="absolute p-4 sm:p-6 border border-blue-800/40 w-44 h-44 rounded-2xl bg-gradient-to-br from-blue-950 to-slate-950 flex flex-col justify-between shadow-xl">
              <Logo size="sm" showText={false} />
              <div>
                <span className="text-[9px] font-sans font-extrabold text-blue-400 uppercase tracking-widest block">NIIC CENTRE</span>
                <span className="text-xs text-white font-bold block font-sans">Raichur, Karnataka</span>
              </div>
            </div>
          </div>

          {/* Right Block: Content narrative */}
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-sans font-extrabold tracking-[0.1em]">
              <Building className="w-4 h-4 text-teal-400" />
              <span>ACADEMIC FOUNDATIONS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
              A Platform for High-Impact Engineering
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
              {siteContent.aboutText}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <BookmarkCheck className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm text-white font-bold font-sans">State-of-the-Art Labs</h4>
                  <p className="text-slate-400 text-xs">Dedicated workspace configured with localized compiler platforms and hardware components.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <BookmarkCheck className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm text-white font-bold font-sans">Industry Mentorship</h4>
                  <p className="text-slate-400 text-xs">A robust network of external software engineers conducting regular audits on project drafts.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. TECH ORBIT EMBED */}
      <TechAnimation />

      {/* 5. PLAYGROUND EMED */}
      <InteractivePlayground />

      {/* 6. VENTURES (PROJECTS) SECTION */}
      <section className="py-20 px-4 md:px-8 bg-slate-950 border-t border-blue-900/10" id="ventures-section">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-sans font-extrabold tracking-[0.1em]">
                <Briefcase className="w-4 h-4 text-teal-400" />
                <span>INCUBATION PORTFOLIO</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-sans font-bold text-white tracking-tight">Active Research Ventures</h3>
              <p className="text-slate-400 text-sm font-sans max-w-xl">Browse student and faculty inventions undergoing commercial development inside NIIC labs.</p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap bg-slate-900 p-1 rounded-xl border border-blue-950/60 self-start" id="project-filters">
              {(['All', 'Agri-Tech', 'Health-Tech', 'Rural Utilities'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-sans font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid with Framer animation layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="ventures-grid">
            {filteredProjects.map(proj => (
              <div
                key={proj.id}
                className="bg-slate-900/40 border border-blue-950/60 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-blue-900/50 hover:bg-slate-900/60 transition-all duration-300"
              >
                
                {/* Venture Thumbnail */}
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={proj.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt=""
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-950/90 text-blue-300 px-2.5 py-1 rounded-md border border-slate-800/80">
                      {proj.category}
                    </span>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                      proj.status === 'Launched' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      proj.status === 'Prototype' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {proj.status}
                    </span>
                  </div>
                </div>

                {/* Venture details */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-base md:text-lg font-sans group-hover:text-blue-400 transition-colors">
                      {proj.title}
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm font-sans leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech, idx) => (
                      <span key={idx} className="text-[9px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Lead Info */}
                  <div className="border-t border-slate-800/50 pt-3 flex items-center justify-between text-[11px] font-sans">
                    <span className="text-slate-500">Lead Advisor:</span>
                    <span className="text-white font-semibold font-sans">{proj.leadName || 'Assigned Scholars'}</span>
                  </div>
                </div>

              </div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="col-span-full bg-slate-900/20 border border-slate-900 py-16 text-center text-slate-500 rounded-2xl">
                <span>[No active projects found under this classification]</span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 7. PERSONNEL (FACULTY & SCHOLARS) SECTION */}
      <section className="py-20 px-4 md:px-8 bg-slate-950 border-t border-blue-900/10" id="personnel-section">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-sans font-extrabold tracking-[0.1em]">
                <Users2 className="w-4 h-4 text-teal-400" />
                <span>NIIC PERSONNEL LOG</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-sans font-bold text-white tracking-tight">Active Faculty & Scholar Innovators</h3>
              <p className="text-slate-400 text-sm font-sans max-w-xl">Meet the researchers, advisors, and startup scholars driving projects inside our laboratories.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-blue-950/60 self-start" id="member-filters">
              <button
                onClick={() => setActiveRole('All')}
                className={`px-4 py-2 rounded-lg text-xs font-sans font-bold transition-all ${
                  activeRole === 'All' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Personnel
              </button>
              <button
                onClick={() => setActiveRole('Professor')}
                className={`px-4 py-2 rounded-lg text-xs font-sans font-bold transition-all ${
                  activeRole === 'Professor' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Professors
              </button>
              <button
                onClick={() => setActiveRole('Student')}
                className={`px-4 py-2 rounded-lg text-xs font-sans font-bold transition-all ${
                  activeRole === 'Student' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Student Scholars
              </button>
            </div>
          </div>

          {/* Members Registry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="members-grid">
            {filteredMembers.map(member => (
              <div
                key={member.id}
                className="bg-slate-900/30 border border-blue-950/40 rounded-2xl p-5 flex flex-col items-center text-center space-y-4 hover:border-blue-900/30 transition-all group"
              >
                {/* Circular Portrait */}
                <div className="relative">
                  <img
                    src={member.avatar}
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-900/30 group-hover:border-blue-600 transition-colors"
                    alt=""
                  />
                  <span className={`absolute -bottom-1 -right-1 text-[8px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border ${
                    member.role === 'Professor' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                  }`}>
                    {member.role}
                  </span>
                </div>

                {/* Info Text */}
                <div className="space-y-1">
                  <h4 className="text-white font-bold text-sm md:text-base font-sans leading-snug">{member.name}</h4>
                  <p className="text-slate-400 text-xs font-sans font-medium">{member.department}</p>
                  <p className="text-[10px] text-blue-300 font-mono tracking-wide">{member.specializationOrYear}</p>
                </div>

                {/* Email Anchor */}
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-1 text-[10.5px] font-mono text-slate-500 hover:text-white transition-colors pt-2.5 border-t border-slate-800/60 w-full justify-center"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>{member.email}</span>
                </a>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. PHOTO GALLERY SECTION */}
      <section className="py-20 px-4 md:px-8 bg-slate-950 border-t border-blue-900/10" id="gallery-section">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-sans font-extrabold tracking-[0.1em]">
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>LABORATORY SNAPSHOTS</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-sans font-bold text-white tracking-tight">Incubation Session Gallery</h3>
            <p className="text-slate-400 text-sm font-sans">A glimpse inside the active workshops, pitches, and dynamic hackathons running at NIIC.</p>
          </div>

          {/* Photo Flex grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid">
            {photos.map(ph => (
              <div
                key={ph.id}
                className="bg-slate-900/30 border border-blue-950/40 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between group hover:border-blue-900/30 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={ph.imageUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt=""
                  />
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 border border-slate-800 text-[9px] font-mono text-blue-300 px-2 py-0.5 rounded-md">
                    {ph.date}
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <h4 className="text-white text-xs md:text-sm font-bold font-sans">{ph.title}</h4>
                  <p className="text-slate-400 text-[11px] font-sans leading-relaxed line-clamp-2">{ph.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. CONTACT & IDEA PITCH SECTION */}
      <section className="py-20 px-4 md:px-8 bg-slate-950 border-t border-blue-900/10" id="contact-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Communication Coordinates (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/20 border border-blue-950/60 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl" />

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs text-blue-400 font-sans font-extrabold tracking-[0.1em] block">OFFICE COORDINATES</span>
                <h3 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">Reach Out to NIIC</h3>
                <p className="text-slate-400 text-xs md:text-sm font-sans leading-relaxed">
                  Have inquiries, startup questions, or wish to schedule a physical tour of the incubator hardware labs? Use our direct coordinates.
                </p>
              </div>

              {/* Coordinates List */}
              <div className="space-y-5 pt-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-950 border border-blue-900/30">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold text-slate-400 tracking-wider block">HELPLINE EMAIL</span>
                    <a href={`mailto:${contact.email}`} className="text-white text-xs md:text-sm hover:text-blue-400 transition-colors font-mono">{contact.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-950 border border-blue-900/30">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold text-slate-400 tracking-wider block">TELEPHONE CHANNELS</span>
                    <a href={`tel:${contact.phone}`} className="text-white text-xs md:text-sm hover:text-blue-400 transition-colors font-mono">{contact.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-950 border border-blue-900/30">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold text-slate-400 tracking-wider block">PHYSICAL LAB ADDRESS</span>
                    <span className="text-slate-300 text-xs font-sans block leading-relaxed">{contact.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-950 border border-blue-900/30">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold text-slate-400 tracking-wider block">OFFICE TIMINGS</span>
                    <span className="text-slate-300 text-xs font-mono block">{contact.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Tag */}
            <div className="pt-6 mt-6 border-t border-slate-800/80">
              <span className="text-[9px] font-sans font-extrabold text-slate-500 tracking-[0.1em]">SECURED COMMUNICATIONS PORT // SHIELDED ADDRESSES</span>
            </div>
          </div>

          {/* Right Block: Active Startup Pitching Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-blue-950/60 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl relative">
            
            <form onSubmit={handlePitchSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-sans font-bold text-white">Venture Incubation Pitching Form</h3>
                <p className="text-slate-400 text-xs">Are you a student or researcher with a brilliant software idea? Pitch to us and let us supply hardware facilities.</p>
              </div>

              {pitchSubmitted ? (
                <div className="bg-teal-500/10 border border-teal-500/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 min-h-[250px]">
                  <CheckCircle2 className="w-12 h-12 text-teal-400 animate-bounce" />
                  <h4 className="text-white font-bold text-base">Venture Pitch Logged!</h4>
                  <p className="text-slate-400 text-xs max-w-md font-sans">
                    Thank you! Your academic proposal has been registered in our staging database. Our Advisory Faculty members will audit your details and reach out via email.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Your Name</label>
                      <input
                        type="text"
                        required
                        value={pitchForm.name}
                        onChange={e => setPitchForm({ ...pitchForm, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4.5 py-2.5 text-sm text-white focus:outline-none"
                        placeholder="Simran Kaur"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        required
                        value={pitchForm.email}
                        onChange={e => setPitchForm({ ...pitchForm, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4.5 py-2.5 text-sm text-white focus:outline-none"
                        placeholder="simran.k@navodaya.edu"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Domain Ecosystem</label>
                    <select
                      value={pitchForm.domain}
                      onChange={e => setPitchForm({ ...pitchForm, domain: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option value="agri-tech">Agri-Tech (Precision Agriculture, Soil Health & Automation)</option>
                      <option value="health-tech">Health-Tech (Tele-Consultation, Local Diagnostics & Clinical Systems)</option>
                      <option value="rural-utilities">Rural Utilities (Solar-Powered Fences, Community Water Nets)</option>
                      <option value="other">Other Multidisciplinary Regional Innovation</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Elevator Pitch & Solution Abstract</label>
                    <textarea
                      required
                      value={pitchForm.idea}
                      onChange={e => setPitchForm({ ...pitchForm, idea: e.target.value })}
                      rows={4}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4.5 py-2.5 text-sm text-white focus:outline-none"
                      placeholder="Briefly explain what problem your innovation solves, how you plan to construct the code architecture, and what you expect from NIIC..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-101"
                    id="contact-submit-btn"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Academic Proposal to Committee</span>
                  </button>
                </>
              )}

            </form>
          </div>

        </div>
      </section>

      {/* 10. SITE FOOTER */}
      <footer className="bg-slate-950 border-t border-blue-900/15 py-12 px-4 md:px-8 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2">
            <Logo size="sm" showText={false} />
            <div className="text-left">
              <span className="font-sans font-bold text-slate-400 tracking-wider block">NAVODAYA INNOVATION & INCUBATION CENTRE</span>
              <span className="text-[10px] font-mono text-slate-600 uppercase block">The Campus of Possibilities</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10.5px] font-mono">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-slate-300">TOP OF PORTAL</button>
            <span className="text-slate-800">|</span>
            <button onClick={() => setAdminOpen(true)} className="hover:text-slate-300">DATABASE CONSOLE</button>
          </div>

          <div>
            <p className="font-mono text-[10px] text-slate-600">
              © 2026 Navodaya Education Trust. Raichur, Karnataka, India. All Rights Reserved.
            </p>
          </div>

        </div>
      </footer>

      {/* 11. ADMIN PORTAL MODAL OVERLAY */}
      {adminOpen && <AdminPortal onClose={() => setAdminOpen(false)} />}

    </div>
  );
};
