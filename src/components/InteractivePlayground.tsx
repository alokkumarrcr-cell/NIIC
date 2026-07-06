/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Play, RotateCcw, AlertCircle, CheckCircle, Cpu, ShieldAlert, Sparkles, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

interface SectorPreset {
  id: string;
  name: string;
  sector: 'Agri-Tech' | 'Health-Tech' | 'Rural Utilities';
  defaultTitle: string;
  defaultDescription: string;
  expectedOutput: string[];
  stats: { feasibility: string; budget: string; duration: string };
}

export const InteractivePlayground: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<'Agri-Tech' | 'Health-Tech' | 'Rural Utilities'>('Agri-Tech');
  
  const presets: SectorPreset[] = [
    {
      id: 'agri-1',
      name: 'Precision Crop Soil Diagnostics',
      sector: 'Agri-Tech',
      defaultTitle: 'Automated Soil-Nutrient & Moisture Telemetry',
      defaultDescription: 'Deploying low-cost IoT soil moisture probes coupled with automated water valves across Raichur rice plantations to optimize irrigation and prevent dry-season crop fatigue.',
      expectedOutput: [
        "🚀 Initializing NIIC K-Tech NAIN Proposal Assessment Engine...",
        "📂 Checking criteria against Raichur dry-zone agricultural profile...",
        "🌾 Validating crop compatibility: Rice (Oryza sativa) & Cotton guidelines...",
        "🔍 Mentorship validation: Mapping proposal to NIT Agricultural IoT department...",
        "🧪 Synergistic search: Mapping bio-fertilizer criteria to Allied Science Labs...",
        "📊 Simulating local environmental testbed trial (Kalyan-Karnataka sector)...",
        "💰 Sponsoring Estimate: APPROVED for ₹3 Lakhs seed funding under NAIN Scheme!",
        "✨ Proposal score: 96/100 (Highly Relevant for Regional Socio-Economic Growth)"
      ],
      stats: { feasibility: '96%', budget: '₹3,00,000', duration: '12 Months' }
    },
    {
      id: 'health-1',
      name: 'Rural Wearable Tele-Cardiology System',
      sector: 'Health-Tech',
      defaultTitle: 'Low-Cost Portable ECG for Rural Health Sub-Centers',
      defaultDescription: 'A wearable 3-lead clinical ECG monitor with cellular transmission capability, allowing rural community health workers to transfer instant cardiograms to Navodaya Medical College Hospital.',
      expectedOutput: [
        "🚀 Initializing NIIC K-Tech NAIN Proposal Assessment Engine...",
        "📂 Auditing biomedical equipment safety compliance thresholds...",
        "🏥 Mapping clinical validator: Navodaya Medical College & Hospital (NMC)...",
        "⚙️ Hardware feasibility: Microcontrollers & Bluetooth Low Energy validation...",
        "🔒 Patient data encryption and local transit security checks...",
        "🔬 Trial layout: Planning safe patient tests under guided clinical supervision...",
        "💰 Sponsoring Estimate: APPROVED for ₹3 Lakhs seed funding under NAIN Scheme!",
        "✨ Proposal score: 94/100 (Exceptional Clinical and Technical Synergy)"
      ],
      stats: { feasibility: '94%', budget: '₹3,00,000', duration: '12 Months' }
    },
    {
      id: 'rural-1',
      name: 'Smart Community Aquifer Monitoring',
      sector: 'Rural Utilities',
      defaultTitle: 'Solar-Powered Automated Ground-Water Quality Sensor Mesh',
      defaultDescription: 'Installing a decentralized mesh of solar-powered sensors in Raichur village community wells to transmit real-time pH, nitrate, and turbidity metrics to prevent waterborne contamination outbreaks.',
      expectedOutput: [
        "🚀 Initializing NIIC K-Tech NAIN Proposal Assessment Engine...",
        "📂 Evaluating Kalyan-Karnataka Regional Water Infrastructure guidelines...",
        "☀️ Sizing photovoltaic parameters: 12V Solar panel and rechargeable battery loop...",
        "📡 Telemetry check: LoraWAN gateway testing for long-distance sub-center relay...",
        "🔬 Prototype construction: Assembling waterproof food-grade sensor encasing...",
        "🎓 Mentor assignment: Connecting to NIT Civil and Environmental Science dept...",
        "💰 Sponsoring Estimate: APPROVED for ₹3 Lakhs seed funding under NAIN Scheme!",
        "✨ Proposal score: 98/100 (Outstanding Public Utility and Technological Solvability)"
      ],
      stats: { feasibility: '98%', budget: '₹3,00,000', duration: '12 Months' }
    }
  ];

  const currentPreset = presets.find(p => p.sector === selectedSector)!;
  
  // Custom user inputs within simulation
  const [customTitle, setCustomTitle] = useState<string>(currentPreset.defaultTitle);
  const [customDesc, setCustomDesc] = useState<string>(currentPreset.defaultDescription);
  const [teamSize, setTeamSize] = useState<number>(4);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [liveFeasibility, setLiveFeasibility] = useState<string>('0%');
  const [liveBudget, setLiveBudget] = useState<string>('₹0');

  const handleSectorChange = (sector: 'Agri-Tech' | 'Health-Tech' | 'Rural Utilities') => {
    setSelectedSector(sector);
    const found = presets.find(p => p.sector === sector)!;
    setCustomTitle(found.defaultTitle);
    setCustomDesc(found.defaultDescription);
    setTerminalLogs([]);
    setSuccess(null);
    setLiveFeasibility('0%');
    setLiveBudget('₹0');
  };

  const handleRunEvaluation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalLogs([]);
    setSuccess(null);
    setLiveFeasibility('12%');
    setLiveBudget('₹20,000');

    const textToAnalyze = (customTitle + " " + customDesc).toLowerCase();
    const isValid = customTitle.trim().length >= 8 && customDesc.trim().length >= 20;

    // Calculate metrics
    let score = 75;
    if (textToAnalyze.includes("iot") || textToAnalyze.includes("sensor")) score += 8;
    if (textToAnalyze.includes("solar") || textToAnalyze.includes("power") || textToAnalyze.includes("battery")) score += 5;
    if (textToAnalyze.includes("ai") || textToAnalyze.includes("learning") || textToAnalyze.includes("detection") || textToAnalyze.includes("vision")) score += 7;
    if (textToAnalyze.includes("rural") || textToAnalyze.includes("raichur") || textToAnalyze.includes("karnataka") || textToAnalyze.includes("village")) score += 6;
    if (teamSize >= 3 && teamSize <= 5) score += 4;
    score = Math.min(score, 99);

    let budgetNum = 200000;
    if (teamSize > 2) budgetNum += (teamSize - 2) * 25000;
    if (score > 90) budgetNum += 25000;
    budgetNum = Math.min(budgetNum, 300000);

    const outputs: string[] = [];
    if (!isValid) {
      outputs.push("🚀 Initializing NIIC K-Tech NAIN Proposal Assessment Engine...");
      outputs.push("❌ CRITICAL QUALITY INCOMPATIBILITY DETECTED.");
      outputs.push("⚠️ Error: Title must be at least 8 chars and abstract must be at least 20 chars.");
      outputs.push("🔍 Evaluation Terminated. Abstract length is insufficient for NAIN criteria check.");
    } else {
      outputs.push("🚀 Initializing NIIC K-Tech NAIN Proposal Assessment Engine...");
      outputs.push(`📂 Auditing academic abstract: "${customTitle.slice(0, 42)}${customTitle.length > 42 ? '...' : ''}"`);
      outputs.push(`👥 Registering student innovation team with ${teamSize} Kalyan-Karnataka developers...`);
      
      if (textToAnalyze.includes("iot") || textToAnalyze.includes("sensor")) {
        outputs.push("📡 Hardware telemetry: Calibrating LoRaWAN node and low-power sensor bounds...");
      } else {
        outputs.push("💻 Software framework: Simulating relational local transit boundary layers...");
      }
      
      if (textToAnalyze.includes("ai") || textToAnalyze.includes("learning") || textToAnalyze.includes("detection") || textToAnalyze.includes("vision")) {
        outputs.push("🤖 Neural framework detected: Checking edge device inference latency and storage limits...");
      }
      
      if (textToAnalyze.includes("solar") || textToAnalyze.includes("power") || textToAnalyze.includes("battery")) {
        outputs.push("☀️ Photovoltaic parameters: Testing 12V solar charge controller with overcharge fuse...");
      }
      
      if (textToAnalyze.includes("rural") || textToAnalyze.includes("raichur") || textToAnalyze.includes("karnataka") || textToAnalyze.includes("village")) {
        outputs.push("🌾 Geographic alignment: Matches Kalyan-Karnataka regional socioeconomic growth priorities.");
      } else {
        outputs.push("🌐 General sector alignment: Meets department academic incubation guidelines.");
      }
      
      outputs.push(`🔬 Mentor selection: Mapping peer advisor roles to Navodaya Engineering faculties...`);
      outputs.push(`💰 Sponsoring Estimate: APPROVED for ₹${(budgetNum / 100000).toFixed(1)} Lakhs seed funding under NAIN!`);
      outputs.push(`✨ Proposal score: ${score}/100 (Exceptional NAIN Rubric Alignment)`);
    }

    let progress = 0;

    // Simulate real-time metric updates during evaluation
    const metricInterval = setInterval(() => {
      const percentage = Math.floor(Math.random() * 30) + 40;
      setLiveFeasibility(`${percentage}%`);
      const randomBudget = Math.floor(Math.random() * 80000) + 150000;
      setLiveBudget(`₹${randomBudget.toLocaleString()}`);
    }, 200);

    const logInterval = setInterval(() => {
      if (progress < outputs.length) {
        setTerminalLogs(prev => [...prev, outputs[progress]]);
        progress++;
      } else {
        clearInterval(logInterval);
        clearInterval(metricInterval);
        setIsRunning(false);
        setSuccess(isValid);
        setLiveFeasibility(isValid ? `${score}%` : '0%');
        setLiveBudget(isValid ? `₹${budgetNum.toLocaleString()}` : '₹0');
      }
    }, 450);
  };

  const handleReset = () => {
    setTerminalLogs([]);
    setSuccess(null);
    setLiveFeasibility('0%');
    setLiveBudget('₹0');
    setCustomTitle(currentPreset.defaultTitle);
    setCustomDesc(currentPreset.defaultDescription);
    setTeamSize(4);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-950 border-t border-blue-950/40 relative overflow-hidden" id="nain-simulator">
      {/* Background soft glowing lights */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-950/80 border border-indigo-900/30 rounded-full text-xs font-sans font-extrabold tracking-[0.1em] text-indigo-400">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>K-TECH NAIN SEED ENGINE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight">
            Incubation <span className="text-indigo-400">Feasibility Simulator</span>
          </h2>
          <p className="text-slate-400 font-sans max-w-2xl text-sm md:text-base leading-relaxed">
            Simulate submitting an interdisciplinary proposal to the Government of Karnataka K-Tech NAIN selection scheme at NIIC. Customize your concept parameters and watch the analyzer assess your regional socio-economic impact rating.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Inputs Left Panel */}
          <div className="lg:col-span-5 bg-slate-900/40 border border-blue-950/60 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              <span className="text-[11px] font-sans font-extrabold text-slate-400 uppercase tracking-[0.15em] block">Proposal Preparation</span>
              
              {/* Sector Selection Row */}
              <div className="space-y-2">
                <label className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">1. Focal Incubation Sector</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Agri-Tech', 'Health-Tech', 'Rural Utilities'] as const).map(sec => (
                    <button
                      key={sec}
                      onClick={() => handleSectorChange(sec)}
                      disabled={isRunning}
                      className={`px-2 py-2.5 rounded-xl border text-[11px] font-sans font-bold transition-all cursor-pointer ${
                        selectedSector === sec
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">2. Project Innovation Title</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={e => setCustomTitle(e.target.value)}
                  disabled={isRunning}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              {/* Description Abstract Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">3. Solution Abstract & Social Value</label>
                <textarea
                  value={customDesc}
                  onChange={e => setCustomDesc(e.target.value)}
                  disabled={isRunning}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Team Size Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">4. Student Innovator Team Size</label>
                  <span className="text-xs font-sans font-extrabold text-indigo-400">{teamSize} Members</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={teamSize}
                  onChange={e => setTeamSize(parseInt(e.target.value))}
                  disabled={isRunning}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            {/* Run and reset Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-blue-950/30">
              <button
                onClick={handleReset}
                disabled={isRunning}
                className="flex items-center justify-center p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer disabled:opacity-40"
                title="Reset Proposal Configuration"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleRunEvaluation}
                disabled={isRunning}
                className="flex-grow flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-sans text-xs font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-950/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isRunning ? 'Analyzing Parameters...' : 'Analyze Proposal Feasibility'}</span>
              </button>
            </div>

          </div>

          {/* Interactive Console Terminal Output */}
          <div className="lg:col-span-7 bg-slate-950 border border-blue-950/60 rounded-3xl overflow-hidden flex flex-col justify-between">
            
            {/* Terminal Header */}
            <div className="bg-slate-900 px-5 py-3.5 flex items-center justify-between border-b border-blue-950/60">
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span className="font-mono text-[11px] font-bold text-slate-300">K-TECH NAIN ASSESSMENT TERMINAL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Terminal Output Stream */}
            <div className="p-6 flex-grow font-mono text-xs text-slate-300 space-y-3 min-h-[250px] max-h-[350px] overflow-y-auto bg-slate-950/90 leading-relaxed">
              {terminalLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                  <BookOpen className="w-10 h-10 text-slate-700" />
                  <div className="space-y-1">
                    <p className="text-slate-500 text-xs font-bold">FEASIBILITY COMPILER READY</p>
                    <p className="text-slate-600 text-[11px] max-w-xs mx-auto">Click 'Analyze Proposal Feasibility' on the left to invoke the real-time NAIN criteria matching engine.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {terminalLogs.map((log, index) => {
                    const isLast = index === terminalLogs.length - 1;
                    const isApproved = log.includes("APPROVED");
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start gap-2.5 ${isApproved ? 'text-green-400 bg-green-950/15 p-2 rounded-lg border border-green-900/20 font-bold' : isLast && success ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}
                      >
                        <span className="text-indigo-500 select-none">&gt;</span>
                        <span>{log}</span>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Realtime Resource Performance Stats */}
            <div className="bg-slate-900/60 border-t border-blue-950/50 p-5 grid grid-cols-3 gap-4">
              
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 text-[9px] font-mono uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Feasibility Index</span>
                </div>
                <div className="text-white font-mono font-bold text-base md:text-lg tracking-tight">
                  {liveFeasibility}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 text-[9px] font-mono uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Recommended Seed</span>
                </div>
                <div className="text-green-400 font-mono font-bold text-base md:text-lg tracking-tight">
                  {liveBudget}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 text-[9px] font-mono uppercase tracking-wider">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Target Duration</span>
                </div>
                <div className="text-indigo-400 font-mono font-bold text-base md:text-lg tracking-tight">
                  {isRunning ? 'Estimating...' : success ? currentPreset.stats.duration : '0 Months'}
                </div>
              </div>

            </div>

            {/* Verification Status Bar */}
            <AnimatePresence>
              {success !== null && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`px-5 py-3 text-xs font-sans font-bold flex items-center gap-2 border-t ${
                    success 
                      ? 'bg-green-950/20 border-green-900/40 text-green-400' 
                      : 'bg-red-950/20 border-red-900/40 text-red-400'
                  }`}
                >
                  {success ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Ecosystem validation success! The abstract meets GoK K-Tech NAIN criteria.</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <span>Validation failure: Missing essential parameters in abstract fields.</span>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
