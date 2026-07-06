/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Activity, FlaskConical, Terminal, Network, Sparkles, RefreshCw, Layers, ShieldCheck, HelpCircle } from 'lucide-react';

type InstitutionType = 'nit' | 'nmc' | 'ncp';

interface InstitutionItem {
  id: InstitutionType;
  name: string;
  color: string;
  accentColor: string;
  glowColor: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  roleInNiic: string;
  collaborators: string[];
  features: { title: string; desc: string }[];
}

export const TechAnimation: React.FC = () => {
  const [activeInst, setActiveInst] = useState<InstitutionType>('nit');
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [packetQueue, setPacketQueue] = useState<{ id: number; color: string }[]>([]);

  const institutions: InstitutionItem[] = [
    {
      id: 'nit',
      name: 'Navodaya Institute of Technology',
      color: 'from-blue-400 to-indigo-600',
      accentColor: 'text-blue-400',
      glowColor: 'shadow-blue-500/20',
      icon: <Cpu className="w-10 h-10 text-blue-400" />,
      tagline: 'Engineering & Advanced Prototyping Core',
      description: 'The technological brain of the incubation ecosystem. At NIT Raichur, student engineers design hardware schemas, custom PCB layouts, embedded firmware, and solar telemetry systems for rural challenges.',
      roleInNiic: 'Develops IoT circuits, software architectures, edge-computing devices, and renewable-power interfaces.',
      collaborators: ['Navodaya Medical College', 'Navodaya Dental College', 'Local Farmers'],
      features: [
        { title: 'Embedded Electronics Lab', desc: 'State-of-the-art testing workspace for microcontrollers, sensors, and RF transceivers.' },
        { title: 'Software Engineering Core', desc: 'Fostering localized agricultural diagnostic applications and rural web utilities.' },
        { title: 'K-Tech NAIN Lab Infrastructure', desc: 'Equipped with heavy prototyping tools funded under Government of Karnataka scheme.' }
      ]
    },
    {
      id: 'nmc',
      name: 'Navodaya Medical College & Hospital',
      color: 'from-teal-400 to-emerald-600',
      accentColor: 'text-teal-400',
      glowColor: 'shadow-teal-500/20',
      icon: <Activity className="w-10 h-10 text-teal-400" />,
      tagline: 'Clinical Mentorship & Real-World Testbed',
      description: 'Synergizing high-tech engineering with clinical expertise. Navodaya Medical College & Hospital offers real hospital validation environments, clinical feedback, and direct mentoring from senior physicians.',
      roleInNiic: 'Validates biomedical device safety, advises on healthcare compliance, and assists in local trial designs.',
      collaborators: ['Navodaya Institute of Technology', 'Navodaya College of Physiotherapy'],
      features: [
        { title: 'NMC Diagnostic Synergy', desc: 'Direct access to diagnostic medical laboratories for sensor validation and accuracy checks.' },
        { title: 'Clinical Trials & Validation', desc: 'Testing prototype medical devices safely under guided supervision of specialized staff.' },
        { title: 'Socio-Medical Focus Group', desc: 'Formulating innovative solutions for Raichur district rural health and telemedicine.' }
      ]
    },
    {
      id: 'ncp',
      name: 'Navodaya Allied Colleges (Pharmacy & Dental)',
      color: 'from-amber-400 to-orange-500',
      accentColor: 'text-yellow-400',
      glowColor: 'shadow-yellow-500/20',
      icon: <FlaskConical className="w-10 h-10 text-yellow-400" />,
      tagline: 'Biotech Formulation & Allied Health Collaborations',
      description: 'Expanding the horizons of healthcare innovation. Sister campuses in Dental sciences, Pharmacy, and Physiotherapy collaborate on specialized oral health systems, modern drug-delivery diagnostics, and rehabilitative technology.',
      roleInNiic: 'Bridges pharmacology formulations, biomaterial testing, and mechanical orthotic design with technical solutions.',
      collaborators: ['Navodaya Institute of Technology', 'Rural Public Health Centers'],
      features: [
        { title: 'Biomaterial Co-Development', desc: 'Testing materials for wearable dental/orthopedic sensors and custom splint prototypes.' },
        { title: 'Smart Drug-Delivery Interfaces', desc: 'Formulating automated medication reminders and smart micro-dosage dispensing controls.' },
        { title: 'Rehabilitative IoT Engineering', desc: 'Designing movement-tracking sensors in collaboration with physiotherapy scholars.' }
      ]
    }
  ];

  const currentInst = institutions.find(t => t.id === activeInst)!;

  // Handles starting the specific simulation
  const startSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimLogs([]);
    setPacketQueue([]);

    let step = 0;
    const intervalTime = 800;

    const runNitSim = () => {
      const logs = [
        "🌱 [Sensing Engine] Regional crop sensor records low water table levels",
        "📡 [RF Transmitter] Packet formulated and dispatched via LoraWAN mesh",
        "🖥️ [NIT Gateway] Navodaya Institute of Technology edge gateway decodes raw payload",
        "⚙️ [Central Server] Database records historical drop in Kalyan-Karnataka regional aquifers",
        "💡 [NAIN Incubation Hub] Soil automated pump triggers local solar irrigation relay",
        "✅ [Simulation Success] Smart agricultural feedback loop successfully closed!"
      ];

      const interval = setInterval(() => {
        if (step < logs.length) {
          setSimLogs(prev => [...prev, logs[step]]);
          setPacketQueue(prev => [...prev, { id: Date.now() + step, color: 'bg-blue-400' }]);
          step++;
        } else {
          clearInterval(interval);
          setSimulating(false);
        }
      }, intervalTime);
    };

    const runNmcSim = () => {
      const logs = [
        "🏥 [NMC Hospital] Clinical physician identifies remote cardiology check-up bottleneck",
        "🔧 [NIT Incubation Lab] Engineering team builds low-cost wearable ECG prototype",
        "🔬 [Biomedical Calibration] ECG sensor compared against professional NMC hospital diagnostics",
        "🔒 [Validation] Sensor reads with 98.4% correlation to clinical machinery",
        "📡 [Tele-Link] Patient diagnostic data securely transmitted via NIIC cloud portal",
        "✅ [Simulation Success] Biomedical device validated and ready for rural trial deployment!"
      ];

      const interval = setInterval(() => {
        if (step < logs.length) {
          setSimLogs(prev => [...prev, logs[step]]);
          setPacketQueue(prev => [...prev, { id: Date.now() + step, color: 'bg-teal-400' }]);
          step++;
        } else {
          clearInterval(interval);
          setSimulating(false);
        }
      }, intervalTime);
    };

    const runNcpSim = () => {
      const logs = [
        "🦷 [Dental Clinic] Oral health research reveals lack of dental monitoring in rural Raichur",
        "🧪 [Pharmacy Collaboration] Biocompatible resin composite developed for dental sensors",
        "⚙️ [NIT Prototyping] Custom intraoral pH-sensor design drafted inside the K-Tech NAIN lab",
        "📦 [Incubated Prototype] Complete safe dental sensor array encapsulated and validated",
        "🥇 [IP Filing] Seed startup submits patent paperwork under NIIC legal IP support",
        "✅ [Simulation Success] Allied health dental sensor prototype ready for licensing!"
      ];

      const interval = setInterval(() => {
        if (step < logs.length) {
          setSimLogs(prev => [...prev, logs[step]]);
          setPacketQueue(prev => [...prev, { id: Date.now() + step, color: 'bg-yellow-400' }]);
          step++;
        } else {
          clearInterval(interval);
          setSimulating(false);
        }
      }, intervalTime);
    };

    if (activeInst === 'nit') runNitSim();
    else if (activeInst === 'nmc') runNmcSim();
    else runNcpSim();
  };

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden" id="multidisciplinary-ecosystem">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/80 border border-blue-900/40 rounded-full text-xs font-sans font-extrabold tracking-[0.1em] text-blue-400">
            <Network className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>MULTIDISCIPLINARY COLLABORATION</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-teal-400">Collaborative Network</span>
          </h2>
          <p className="text-slate-400 font-sans max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            NIIC acts as the grand synthesizer. We bridge Engineering, Medicine, and Allied Sciences in Raichur to build solutions that carry absolute real-world impact.
          </p>
        </div>

        {/* Dynamic Interactive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Navigation Column */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-sans font-extrabold text-slate-400 uppercase tracking-[0.15em] block">Select An Institution Hub</span>
              <div className="space-y-3.5">
                {institutions.map(inst => (
                  <button
                    key={inst.id}
                    onClick={() => {
                      if (!simulating) {
                        setActiveInst(inst.id);
                        setSimLogs([]);
                      }
                    }}
                    disabled={simulating}
                    className={`w-full text-left p-3.5 sm:p-4.5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-center gap-4 cursor-pointer ${
                      activeInst === inst.id
                        ? 'bg-slate-900 border-blue-800 shadow-lg'
                        : 'bg-slate-900/30 border-blue-950/20 hover:bg-slate-900/60 hover:border-blue-950/60'
                    }`}
                  >
                    {/* Active side-border marker */}
                    {activeInst === inst.id && (
                      <motion.div
                        layoutId="active-inst-indicator"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-teal-400"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <div className={`p-3 rounded-xl bg-slate-950/80 border ${activeInst === inst.id ? 'border-blue-900/40' : 'border-slate-800/40'}`}>
                      {inst.icon}
                    </div>

                    <div>
                      <h4 className="text-white font-sans font-bold text-sm tracking-tight">{inst.name}</h4>
                      <p className="text-slate-400 font-sans text-xs line-clamp-1">{inst.tagline}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Action Controls */}
            <div className="bg-slate-900/40 border border-blue-950/50 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-extrabold tracking-[0.12em] text-slate-400">COLLABORATIVE SIMULATOR</span>
                <span className={`h-2 w-2 rounded-full ${simulating ? 'bg-amber-400 animate-ping' : 'bg-green-500'}`} />
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Execute a simulated data-transmission and cross-disciplinary verification flow to see how NIIC brings student products to life.
              </p>
              <button
                onClick={startSimulation}
                disabled={simulating}
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-sans text-xs font-bold py-3 px-4 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${simulating ? 'animate-spin' : ''}`} />
                <span>{simulating ? 'Simulating Dynamic Flow...' : 'Launch Live Collaboration Sim'}</span>
              </button>
            </div>
          </div>

          {/* Visualization Stage Area */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            <div className="bg-slate-900/40 border border-blue-950/60 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl flex-grow flex flex-col justify-between space-y-8 relative overflow-hidden">
              
              {/* Dynamic Packet Floating Animation */}
              <div className="absolute top-0 left-0 right-0 h-1 z-20 pointer-events-none flex justify-center gap-2">
                {packetQueue.map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ y: -10, opacity: 1, scale: 0.5 }}
                    animate={{ y: 350, opacity: 0, scale: 1.2 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`w-3 h-3 rounded-full ${p.color} blur-[2px]`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentInst.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 flex-grow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-950/40 pb-4">
                    <div>
                      <span className={`text-[10px] font-sans font-extrabold tracking-[0.18em] uppercase bg-gradient-to-r ${currentInst.color} bg-clip-text text-transparent`}>
                        ECOSYSTEM BLOCK PROFILE
                      </span>
                      <h3 className="text-white font-sans font-extrabold text-xl md:text-2xl mt-0.5 tracking-tight">{currentInst.name}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 bg-blue-950/40 border border-blue-900/30 rounded-full px-3 py-1 text-[10px] font-mono text-slate-300">
                      <Layers className="w-3.5 h-3.5 text-blue-400" />
                      <span>{currentInst.tagline}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 font-sans text-sm md:text-base leading-relaxed">
                    {currentInst.description}
                  </p>

                  {/* Collaborative Alliance Tags */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-sans font-extrabold text-slate-400 uppercase tracking-[0.15em] block">Collaborative Partners in NIIC</span>
                    <div className="flex flex-wrap gap-2">
                      {currentInst.collaborators.map(partner => (
                        <span key={partner} className="bg-slate-950/80 border border-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full font-sans">
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Features list */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    {currentInst.features.map((feat, idx) => (
                      <div key={idx} className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl space-y-1.5">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className={`w-4 h-4 ${currentInst.accentColor}`} />
                          <h5 className="text-white font-sans font-bold text-xs">{feat.title}</h5>
                        </div>
                        <p className="text-slate-400 font-sans text-[11px] leading-normal">{feat.desc}</p>
                      </div>
                    ))}
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Simulated Live Feed Log (Terminal) */}
              <div className="bg-slate-950 border border-blue-950/80 rounded-2xl p-4 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-blue-950/50 pb-2 mb-2 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-indigo-400" />
                    <span>SIMULATOR CONSOLE FEED</span>
                  </div>
                  <span className="text-[10px] bg-blue-950/50 text-blue-400 px-2 py-0.5 rounded border border-blue-900/30">REALTIME</span>
                </div>
                
                <div className="space-y-1.5 max-h-[120px] overflow-y-auto" id="simulator-console-feed">
                  {simLogs.length === 0 ? (
                    <div className="text-slate-500 italic py-2 text-center flex items-center justify-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      <span>Console idle. Click the 'Launch Live Collaboration Sim' button above to trigger.</span>
                    </div>
                  ) : (
                    simLogs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-slate-300 font-mono text-xs leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-indigo-400 select-none">&gt;&gt;</span>
                        <span>{log}</span>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
