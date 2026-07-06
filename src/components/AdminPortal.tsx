/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Logo } from './Logo';
import { Project, Member, GalleryPhoto, ContactDetails, SiteContent, AcademicPitch } from '../types';
import {
  ShieldAlert,
  Save,
  Plus,
  Trash,
  Edit3,
  LogOut,
  Sliders,
  FolderKanban,
  Users,
  Image as ImageIcon,
  PhoneCall,
  CheckCircle2,
  FileDown,
  FileUp,
  X,
  Sparkles,
  RefreshCw,
  FileText
} from 'lucide-react';

interface AdminPortalProps {
  onClose: () => void;
}

type AdminTab = 'site' | 'projects' | 'members' | 'gallery' | 'contact' | 'pitches' | 'backup';

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const {
    siteContent,
    projects,
    members,
    photos,
    contact,
    pitches,
    updateSiteContent,
    addProject,
    updateProject,
    deleteProject,
    addMember,
    updateMember,
    deleteMember,
    addPhoto,
    updatePhoto,
    deletePhoto,
    updateContact,
    updatePitchStatus,
    deletePitch,
    exportData,
    importData,
  } = useData();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('niic2026');
  const [authError, setAuthError] = useState<string>('');

  // Tab State
  const [activeTab, setActiveTab] = useState<AdminTab>('site');
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  // Editing Modals / Forms States
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    category: 'Agri-Tech',
    techStack: [],
    image: '',
    status: 'Incubating',
    leadName: '',
  });
  const [tempTechInput, setTempTechInput] = useState<string>('');

  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState<Omit<Member, 'id'>>({
    name: '',
    role: 'Professor',
    department: 'Computer Science',
    email: '',
    avatar: '',
    specializationOrYear: '',
  });

  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [photoForm, setPhotoForm] = useState<Omit<GalleryPhoto, 'id'>>({
    title: '',
    description: '',
    imageUrl: '',
    date: '',
  });

  const [backupJson, setBackupJson] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'niic2026') {
      setIsAuthenticated(true);
      setAuthError('');
      showFeedback('Access Authorized. Decrypting admin state...');
    } else {
      setAuthError('Access Denied. Incorrect Administrative Passphrase.');
    }
  };

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  // Site Content handlers
  const handleSiteContentSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated: Partial<SiteContent> = {
      heroTitle: formData.get('heroTitle') as string,
      heroSubtitle: formData.get('heroSubtitle') as string,
      aboutText: formData.get('aboutText') as string,
      statsProjects: parseInt(formData.get('statsProjects') as string) || 0,
      statsStudents: parseInt(formData.get('statsStudents') as string) || 0,
      statsProfessors: parseInt(formData.get('statsProfessors') as string) || 0,
      statsFunding: formData.get('statsFunding') as string,
    };
    updateSiteContent(updated);
    showFeedback('Global parameters synchronized with local core.');
  };

  // Contact Details Handlers
  const handleContactSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated: Partial<ContactDetails> = {
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      hours: formData.get('hours') as string,
    };
    updateContact(updated);
    showFeedback('Primary communications routes re-mapped successfully.');
  };

  // Project CRUD
  const handleAddProject = () => {
    setEditingProjectId('new');
    setProjectForm({
      title: '',
      description: '',
      category: 'Agri-Tech',
      techStack: ['IoT', 'Microcontrollers'],
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop',
      status: 'Incubating',
      leadName: '',
    });
    setTempTechInput('');
  };

  const handleEditProject = (p: Project) => {
    setEditingProjectId(p.id);
    setProjectForm({
      title: p.title,
      description: p.description,
      category: p.category,
      techStack: p.techStack,
      image: p.image,
      status: p.status,
      leadName: p.leadName,
    });
    setTempTechInput(p.techStack.join(', '));
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const stack = tempTechInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const finalForm = { ...projectForm, techStack: stack };

    if (editingProjectId === 'new') {
      addProject(finalForm);
      showFeedback('New research file added to NIIC database.');
    } else if (editingProjectId) {
      updateProject(editingProjectId, finalForm);
      showFeedback('Research file indexes compiled and stored.');
    }
    setEditingProjectId(null);
  };

  // Member CRUD
  const handleAddMember = () => {
    setEditingMemberId('new');
    setMemberForm({
      name: '',
      role: 'Student',
      department: 'Computer Science',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
      specializationOrYear: '',
    });
  };

  const handleEditMember = (m: Member) => {
    setEditingMemberId(m.id);
    setMemberForm({
      name: m.name,
      role: m.role,
      department: m.department,
      email: m.email,
      avatar: m.avatar,
      specializationOrYear: m.specializationOrYear,
    });
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMemberId === 'new') {
      addMember(memberForm);
      showFeedback('Registrar logs updated with new profile.');
    } else if (editingMemberId) {
      updateMember(editingMemberId, memberForm);
      showFeedback('Profile metadata saved securely.');
    }
    setEditingMemberId(null);
  };

  // Photo CRUD
  const handleAddPhoto = () => {
    setEditingPhotoId('new');
    setPhotoForm({
      title: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleEditPhoto = (p: GalleryPhoto) => {
    setEditingPhotoId(p.id);
    setPhotoForm({
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
      date: p.date,
    });
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPhotoId === 'new') {
      addPhoto(photoForm);
      showFeedback('Session photograph registered inside repository.');
    } else if (editingPhotoId) {
      updatePhoto(editingPhotoId, photoForm);
      showFeedback('Photograph description modified.');
    }
    setEditingPhotoId(null);
  };

  // Backup handlers
  const handleExport = () => {
    const raw = exportData();
    setBackupJson(raw);
    showFeedback('Data bundle serialized into exportable string.');
  };

  const handleImport = () => {
    const success = importData(backupJson);
    if (success) {
      showFeedback('Dynamic database states overwrote successfully!');
    } else {
      showFeedback('Import Failure: Malformed JSON syntax structure.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(backupJson);
    showFeedback('JSON payload copied to system clipboard.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md overflow-y-auto font-sans flex items-center justify-center p-4" id="admin-portal-wrapper">
      <div className="bg-slate-900 border border-blue-900/40 w-full max-w-6xl rounded-3xl overflow-hidden flex flex-col h-[90vh] shadow-2xl shadow-blue-950/80">
        
        {/* Banner header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-b border-blue-900/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-900/20 p-2 rounded-xl border border-blue-700/30">
              <ShieldAlert className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-white text-lg font-bold font-sans flex items-center gap-2">
                NIIC Admin Portal
                <span className="text-[10px] font-mono uppercase bg-blue-950 text-blue-400 px-2 py-0.5 rounded border border-blue-800/30">
                  SECURE CONTROL MATRIX
                </span>
              </h2>
              <p className="text-slate-400 text-xs font-mono">AUTHORIZED PERSONNEL ONLY // INBOUND PORT: 3000</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
            id="admin-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FEEDBACK STATUS OVERLAY TRAY */}
        {feedbackMsg && (
          <div className="bg-teal-500 text-slate-950 px-6 py-2 text-xs font-bold font-mono tracking-wide flex items-center gap-2 animate-bounce justify-center">
            <CheckCircle2 className="w-4 h-4" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* AUTHENTICATION GATE (LOGIN) */}
        {!isAuthenticated ? (
          <div className="flex-grow flex items-center justify-center p-6 bg-slate-950" id="admin-login-screen">
            <div className="max-w-md w-full bg-slate-900 border border-blue-900/30 p-8 rounded-2xl space-y-6 text-center shadow-xl">
              <Logo size="sm" showText={true} />

              <div className="space-y-1">
                <h3 className="text-white font-bold text-xl">Sign In to Dashboard</h3>
                <p className="text-slate-400 text-xs font-sans">Provide system credentials to initialize local write variables.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                {authError && (
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-xs font-semibold text-red-400 font-mono text-center">
                    {authError}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Admin Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-white rounded-lg px-4 py-2.5 text-sm font-sans focus:outline-none"
                    placeholder="Enter admin name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Security Passphrase</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-white rounded-lg px-4 py-2.5 text-sm font-sans focus:outline-none"
                    placeholder="Enter database passphrase"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-3 px-4 rounded-lg transition-all shadow-md shadow-blue-900/20 mt-2 cursor-pointer"
                  id="admin-login-submit"
                >
                  Verify Cryptographic Key & Enter
                </button>
              </form>

              <div className="pt-2 border-t border-slate-800">
                <p className="text-[10px] font-mono text-slate-500">
                  💡 Hint: Standard sandbox key is pre-filled. Click submit!
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* MAIN ADMIN CONTROL CONSOLE (POST-AUTH) */
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden bg-slate-950" id="admin-main-console">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-slate-900/50 border-r border-blue-900/10 p-4 space-y-2 flex flex-col justify-between">
              
              <div className="space-y-2.5">
                <div className="pb-4 mb-4 border-b border-slate-800/80">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">SECURE DIRECTORY</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-white font-semibold font-mono">Matrix Write Mode</span>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={() => setActiveTab('site')}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === 'site' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span>Site Configuration</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <FolderKanban className="w-4 h-4" />
                  <span>Manage Projects ({projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('members')}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === 'members' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Faculty & Scholars ({members.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === 'gallery' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Lab Gallery Photos ({photos.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === 'contact' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Route Contact Details</span>
                </button>

                <button
                  onClick={() => setActiveTab('pitches')}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === 'pitches' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Startup Proposals ({pitches.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('backup')}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === 'backup' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <FileDown className="w-4 h-4" />
                  <span>JSON Payload Sync</span>
                </button>
              </div>

              {/* Log out option */}
              <button
                onClick={() => { setIsAuthenticated(false); showFeedback('Deauthorized terminal safely.'); }}
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 font-bold transition-all mt-4 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Exit Terminal</span>
              </button>
            </div>

            {/* Editing Pane (Flex Area) */}
            <div className="flex-grow p-6 overflow-y-auto">
              
              {/* TAB 1: SITE CONFIG */}
              {activeTab === 'site' && (
                <div className="space-y-6" id="admin-tab-site">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-white font-bold text-lg">Site Global Settings</h3>
                    <p className="text-slate-400 text-xs">Configure headers, statistics counters, and text blocks displayed on the main welcome screen.</p>
                  </div>

                  <form onSubmit={handleSiteContentSave} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300">Hero Main Title</label>
                        <input
                          type="text"
                          name="heroTitle"
                          defaultValue={siteContent.heroTitle}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300">Hero Secondary Subtitle</label>
                        <input
                          type="text"
                          name="heroSubtitle"
                          defaultValue={siteContent.heroSubtitle}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">About US Narrative Description</label>
                      <textarea
                        name="aboutText"
                        rows={5}
                        defaultValue={siteContent.aboutText}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900/30 p-4 rounded-xl border border-slate-800">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Projects Incubating</label>
                        <input
                          type="number"
                          name="statsProjects"
                          defaultValue={siteContent.statsProjects}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Scholars Logged</label>
                        <input
                          type="number"
                          name="statsStudents"
                          defaultValue={siteContent.statsStudents}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Faculty Advisors</label>
                        <input
                          type="number"
                          name="statsProfessors"
                          defaultValue={siteContent.statsProfessors}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">Secured Grant Funding</label>
                        <input
                          type="text"
                          name="statsFunding"
                          defaultValue={siteContent.statsFunding}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-3">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-2.5 px-6 rounded-lg shadow-md transition-all cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Apply and Save Parameters</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: PROJECTS MATRIX */}
              {activeTab === 'projects' && (
                <div className="space-y-6" id="admin-tab-projects">
                  
                  {editingProjectId === null ? (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div>
                          <h3 className="text-white font-bold text-lg">Manage Incubating Ventures</h3>
                          <p className="text-slate-400 text-xs">Maintain registry profiles for advanced regional prototypes and innovative solutions.</p>
                        </div>
                        <button
                          onClick={handleAddProject}
                          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-2 px-4 rounded-lg shadow-md transition-all cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Venture File</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map(p => (
                          <div key={p.id} className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex items-start gap-4">
                            <img src={p.image} className="w-16 h-16 object-cover rounded-lg border border-slate-800" alt="" />
                            <div className="flex-grow space-y-1">
                              <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                                p.category === 'Rural Utilities' ? 'border-sky-500/20 text-sky-400 bg-sky-950/20' :
                                p.category === 'Agri-Tech' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-950/20' :
                                'border-yellow-500/20 text-yellow-400 bg-yellow-950/20'
                              }`}>
                                {p.category}
                              </span>
                              <h4 className="text-white text-sm font-bold font-sans line-clamp-1">{p.title}</h4>
                              <p className="text-slate-400 text-xs line-clamp-1">Lead: {p.leadName || 'No lead assigned'}</p>
                              
                              <div className="flex items-center gap-2 pt-2.5">
                                <button
                                  onClick={() => handleEditProject(p)}
                                  className="text-[10px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-950/30 px-2 py-1 rounded border border-blue-900/30"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Edit details</span>
                                </button>
                                <button
                                  onClick={() => { if (confirm('Are you sure you want to purge this record?')) deleteProject(p.id); }}
                                  className="text-[10px] font-mono text-red-400 hover:text-red-300 flex items-center gap-1 bg-red-950/30 px-2 py-1 rounded border border-red-900/30"
                                >
                                  <Trash className="w-3 h-3" />
                                  <span>Delete File</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* Project Edit Form */
                    <form onSubmit={handleSaveProject} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h4 className="text-white font-bold text-sm">
                          {editingProjectId === 'new' ? 'Create New Incubating Venture Profile' : 'Modify Existing Venture Metadata'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingProjectId(null)}
                          className="text-slate-400 text-xs hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400">Venture Title</label>
                          <input
                            type="text"
                            required
                            value={projectForm.title}
                            onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400">Lead Investigator / Scholar</label>
                          <input
                            type="text"
                            required
                            value={projectForm.leadName}
                            onChange={e => setProjectForm({ ...projectForm, leadName: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400">Main Venture Domain</label>
                          <select
                            value={projectForm.category}
                            onChange={e => setProjectForm({ ...projectForm, category: e.target.value as any })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                          >
                            <option value="Agri-Tech">Agri-Tech</option>
                            <option value="Health-Tech">Health-Tech</option>
                            <option value="Rural Utilities">Rural Utilities</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400">Venture Status</label>
                          <select
                            value={projectForm.status}
                            onChange={e => setProjectForm({ ...projectForm, status: e.target.value as any })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                          >
                            <option value="Incubating">Incubating (Initial Beta)</option>
                            <option value="Prototype">Prototype Sandbox</option>
                            <option value="Launched">Launched (Production)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400 font-sans">Technology tags (Comma list)</label>
                          <input
                            type="text"
                            value={tempTechInput}
                            onChange={e => setTempTechInput(e.target.value)}
                            placeholder="React, Flask, Express, Docker"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400 font-sans">Visual Image URL</label>
                        <input
                          type="text"
                          value={projectForm.image}
                          onChange={e => setProjectForm({ ...projectForm, image: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400">Venture Elevator Abstract</label>
                        <textarea
                          required
                          value={projectForm.description}
                          onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                          rows={4}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-2.5 px-6 rounded-lg shadow-md transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Venture Record</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 3: FACULTY & SCHOLARS REGISTRY */}
              {activeTab === 'members' && (
                <div className="space-y-6" id="admin-tab-members">
                  
                  {editingMemberId === null ? (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div>
                          <h3 className="text-white font-bold text-lg">Incubator Team Registry</h3>
                          <p className="text-slate-400 text-xs">Maintain registry logs of active Professors (Faculty Mentors) and Students (Student Innovators).</p>
                        </div>
                        <button
                          onClick={handleAddMember}
                          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-2 px-4 rounded-lg shadow-md transition-all cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Register New Profile</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {members.map(m => (
                          <div key={m.id} className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex items-center gap-4 relative">
                            <img src={m.avatar} className="w-12 h-12 object-cover rounded-full border border-slate-800" alt="" />
                            <div className="flex-grow space-y-0.5">
                              <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                                m.role === 'Professor' ? 'bg-amber-500/10 text-amber-400' : 'bg-teal-500/10 text-teal-400'
                              }`}>
                                {m.role}
                              </span>
                              <h4 className="text-white text-xs font-bold font-sans line-clamp-1">{m.name}</h4>
                              <p className="text-slate-400 text-[10px] line-clamp-1">{m.department}</p>
                              <p className="text-[9px] text-blue-400 font-mono line-clamp-1">{m.email}</p>
                            </div>

                            <div className="absolute right-3 top-3 flex items-center gap-1.5">
                              <button
                                onClick={() => handleEditMember(m)}
                                className="text-slate-400 hover:text-white p-1"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => { if (confirm('Purge profile?')) deleteMember(m.id); }}
                                className="text-slate-400 hover:text-red-400 p-1"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* Member Edit form */
                    <form onSubmit={handleSaveMember} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h4 className="text-white font-bold text-sm">
                          {editingMemberId === 'new' ? 'Register New Personnel Profile' : 'Modify Existing Registry Metadata'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingMemberId(null)}
                          className="text-slate-400 text-xs hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400">FullName</label>
                          <input
                            type="text"
                            required
                            value={memberForm.name}
                            onChange={e => setMemberForm({ ...memberForm, name: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400 font-sans">Primary Email Route</label>
                          <input
                            type="email"
                            required
                            value={memberForm.email}
                            onChange={e => setMemberForm({ ...memberForm, email: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400">Role Classification</label>
                          <select
                            value={memberForm.role}
                            onChange={e => setMemberForm({ ...memberForm, role: e.target.value as any })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                          >
                            <option value="Professor">Professor (Advisory Faculty)</option>
                            <option value="Student">Student (Core Innovator)</option>
                            <option value="Mentor">Venture Mentor (Alumni / VC)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400 font-sans">Department Division</label>
                          <input
                            type="text"
                            required
                            value={memberForm.department}
                            onChange={e => setMemberForm({ ...memberForm, department: e.target.value })}
                            placeholder="Computer Science, IT, ECE"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400">Specialization or Year</label>
                          <input
                            type="text"
                            required
                            value={memberForm.specializationOrYear}
                            onChange={e => setMemberForm({ ...memberForm, specializationOrYear: e.target.value })}
                            placeholder="e.g. AI & ML / Third Year Student"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400">Avatar Photograph URL</label>
                        <input
                          type="text"
                          value={memberForm.avatar}
                          onChange={e => setMemberForm({ ...memberForm, avatar: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-2.5 px-6 rounded-lg shadow-md transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Personnel Record</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 4: PHOTO GALLERY CONFIG */}
              {activeTab === 'gallery' && (
                <div className="space-y-6" id="admin-tab-gallery">
                  
                  {editingPhotoId === null ? (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div>
                          <h3 className="text-white font-bold text-lg">Incubation Session Photographs</h3>
                          <p className="text-slate-400 text-xs">Manage photographs and media captions describing live laboratory activities.</p>
                        </div>
                        <button
                          onClick={handleAddPhoto}
                          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-2 px-4 rounded-lg shadow-md transition-all cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Lab Photograph</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {photos.map(p => (
                          <div key={p.id} className="bg-slate-900 border border-slate-850 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                            <img src={p.imageUrl} className="h-32 w-full object-cover border-b border-slate-800" alt="" />
                            <div className="p-3.5 space-y-1">
                              <span className="text-[9px] font-mono text-teal-400">{p.date}</span>
                              <h4 className="text-white text-xs font-bold line-clamp-1">{p.title}</h4>
                              <p className="text-slate-400 text-[10px] line-clamp-1">{p.description}</p>
                              
                              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 mt-2.5">
                                <button
                                  onClick={() => handleEditPhoto(p)}
                                  className="text-[9px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Edit text</span>
                                </button>
                                <button
                                  onClick={() => { if (confirm('Purge photograph?')) deletePhoto(p.id); }}
                                  className="text-[9px] font-mono text-red-400 hover:text-red-300 flex items-center gap-1 ml-auto"
                                >
                                  <Trash className="w-3 h-3" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* Photo Edit form */
                    <form onSubmit={handleSavePhoto} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h4 className="text-white font-bold text-sm">
                          {editingPhotoId === 'new' ? 'Register New Lab Photograph' : 'Modify Photo Metadata'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingPhotoId(null)}
                          className="text-slate-400 text-xs hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400 font-sans">Photograph Subject / Title</label>
                          <input
                            type="text"
                            required
                            value={photoForm.title}
                            onChange={e => setPhotoForm({ ...photoForm, title: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400">Captured Date</label>
                          <input
                            type="date"
                            required
                            value={photoForm.date}
                            onChange={e => setPhotoForm({ ...photoForm, date: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400">External Image URL</label>
                        <input
                          type="text"
                          required
                          value={photoForm.imageUrl}
                          onChange={e => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400 font-sans">Elevator caption description</label>
                        <textarea
                          required
                          value={photoForm.description}
                          onChange={e => setPhotoForm({ ...photoForm, description: e.target.value })}
                          rows={3}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-2.5 px-6 rounded-lg shadow-md transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Apply Photo Settings</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 5: CONTACT CONFIG */}
              {activeTab === 'contact' && (
                <div className="space-y-6" id="admin-tab-contact">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-white font-bold text-lg">Route Office Coordinates</h3>
                    <p className="text-slate-400 text-xs font-sans">Manage support channels, telephone lines, and physical coordinates displayed to public visitors.</p>
                  </div>

                  <form onSubmit={handleContactSave} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300">Helpline Email Route</label>
                        <input
                          type="email"
                          name="email"
                          defaultValue={contact.email}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300">Telephone Hotlines</label>
                        <input
                          type="text"
                          name="phone"
                          defaultValue={contact.phone}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Physical Coordinates / Lab Address</label>
                      <input
                        type="text"
                        name="address"
                        defaultValue={contact.address}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Office and Laboratory Timings</label>
                      <input
                        type="text"
                        name="hours"
                        defaultValue={contact.hours}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div className="flex justify-end pt-3">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-2.5 px-6 rounded-lg shadow-md transition-all cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Update Contact Details</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB: STARTUP PROPOSALS */}
              {activeTab === 'pitches' && (
                <div className="space-y-6" id="admin-tab-pitches">
                  <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">Inbound Startup Proposals</h3>
                      <p className="text-slate-400 text-xs">Review, filter, audit, and coordinate incoming student and faculty venture submissions from Raichur netroots.</p>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                      SECURE BUFFER // WRITE PERMISSION ENHANCED
                    </div>
                  </div>

                  {pitches.length === 0 ? (
                    <div className="bg-slate-900/30 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
                      <FileText className="w-12 h-12 text-slate-700 mx-auto" />
                      <h4 className="text-white font-bold text-base">No proposals logged</h4>
                      <p className="text-slate-400 text-xs max-w-sm mx-auto font-sans">
                        Any startup idea submitted through the website landing page form will immediately register here in real-time.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pitches.map((p) => (
                        <div key={p.id} className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl hover:border-blue-900/40 transition-all flex flex-col justify-between gap-5 relative">
                          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            
                            {/* Proposer details */}
                            <div className="space-y-2.5 flex-grow">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-white font-bold text-sm">{p.name}</span>
                                <span className="text-slate-500 text-xs font-mono">•</span>
                                <a href={`mailto:${p.email}`} className="text-blue-400 text-xs hover:underline font-mono">{p.email}</a>
                                <span className="text-slate-500 text-xs font-mono">•</span>
                                <span className="text-slate-400 text-xs font-mono">{p.date}</span>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[9px] font-sans font-extrabold text-blue-400 uppercase tracking-wider bg-blue-950/40 border border-blue-900/30 px-2 py-0.5 rounded">
                                  {p.domain === 'agri-tech' ? 'Agri-Tech (Precision Agriculture)' : 
                                   p.domain === 'health-tech' ? 'Health-Tech (Clinical Systems)' : 
                                   p.domain === 'rural-utilities' ? 'Rural Utilities' : 'General Regional Innovation'}
                                </span>
                                <p className="text-slate-300 text-xs font-sans mt-2 whitespace-pre-wrap leading-relaxed bg-slate-950/40 border border-slate-800/40 p-3.5 rounded-xl">
                                  {p.idea}
                                </p>
                              </div>
                            </div>

                            {/* Status badge */}
                            <div className="flex flex-col items-end gap-2">
                              <span className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border ${
                                p.status === 'Approved' ? 'bg-teal-500/15 border-teal-500/30 text-teal-400' :
                                p.status === 'Declined' ? 'bg-red-500/15 border-red-500/30 text-red-400' :
                                p.status === 'Under Review' ? 'bg-blue-500/15 border-blue-500/30 text-blue-400' :
                                'bg-yellow-500/15 border-yellow-500/30 text-yellow-400'
                              }`}>
                                {p.status}
                              </span>
                            </div>

                          </div>

                          {/* Control actions bar */}
                          <div className="pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wider mr-2">Audit Action:</span>
                              
                              <button
                                onClick={() => { updatePitchStatus(p.id, 'Under Review'); showFeedback('Proposal status shifted to [Under Review].'); }}
                                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold border transition-colors ${
                                  p.status === 'Under Review' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                                }`}
                              >
                                Review
                              </button>

                              <button
                                onClick={() => { updatePitchStatus(p.id, 'Approved'); showFeedback('Proposal APPROVED. Eligible for project promotion.'); }}
                                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold border transition-colors ${
                                  p.status === 'Approved' ? 'bg-teal-600 text-white border-teal-500' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                                }`}
                              >
                                Approve
                              </button>

                              <button
                                onClick={() => { updatePitchStatus(p.id, 'Declined'); showFeedback('Proposal marked as declined.'); }}
                                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold border transition-colors ${
                                  p.status === 'Declined' ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-red-400 hover:border-red-950'
                                }`}
                              >
                                Decline
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              {p.status === 'Approved' && (
                                <button
                                  onClick={() => {
                                    // Open project modal prefilled
                                    setEditingProjectId('new');
                                    setProjectForm({
                                      title: `Venture: ${p.name}'s Proposal`,
                                      description: p.idea,
                                      category: p.domain === 'agri-tech' ? 'Agri-Tech' : p.domain === 'health-tech' ? 'Health-Tech' : p.domain === 'rural-utilities' ? 'Rural Utilities' : 'Other',
                                      techStack: ['IoT', 'Microcontrollers', 'Regional Prototype'],
                                      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
                                      status: 'Prototype',
                                      leadName: p.name
                                    });
                                    setTempTechInput('IoT, Microcontrollers, Regional Prototype');
                                    setActiveTab('projects');
                                    showFeedback('Proposal details promoted to the Project Creation template!');
                                  }}
                                  className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-sans text-[10.5px] font-bold py-1.5 px-3 rounded-lg shadow-sm"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                                  <span>Promote to Project</span>
                                </button>
                              )}

                              <button
                                onClick={() => { deletePitch(p.id); showFeedback('Proposal removed from database buffer.'); }}
                                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/20 rounded border border-transparent hover:border-red-900/30 transition-all cursor-pointer"
                                title="Delete Proposal Log"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: BACKUP & EXPORT JSON */}
              {activeTab === 'backup' && (
                <div className="space-y-6" id="admin-tab-backup">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-white font-bold text-lg">JSON Data Synchronization</h3>
                    <p className="text-slate-400 text-xs">A professional-grade developer tool. Export or import the entire website state as a single JSON file. This guarantees zero data loss and allows instantaneous migration.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleExport}
                        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-2 px-4 rounded-lg shadow-md transition-all cursor-pointer"
                      >
                        <FileDown className="w-4 h-4" />
                        <span>Serialize Current State (Export)</span>
                      </button>

                      {backupJson && (
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans text-xs font-bold py-2 px-4 rounded-lg border border-slate-700 transition-all cursor-pointer"
                        >
                          <FileUp className="w-4 h-4" />
                          <span>Copy Payload</span>
                        </button>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Database Payload Block</label>
                      <textarea
                        value={backupJson}
                        onChange={e => setBackupJson(e.target.value)}
                        placeholder='{"siteContent": {...}, "projects": [...]}'
                        rows={10}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-[10.5px] font-mono leading-relaxed text-emerald-400 focus:outline-none focus:border-blue-500"
                        id="admin-json-sync-textarea"
                      />
                    </div>

                    <div className="bg-blue-950/20 border border-blue-900/30 p-4 rounded-xl flex items-start gap-3">
                      <ShieldAlert className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-white block">WARNING: Data Overwrite Route</span>
                        <span className="text-slate-400 text-[11px] font-sans leading-relaxed">
                          Pasting a compiled state and clicking "Import" below will instantaneously replace your local storage values for Projects, Personnel, and Contacts. Make sure the JSON follows a valid schema!
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleImport}
                        disabled={!backupJson}
                        className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-xs font-sans font-bold shadow-md transition-all cursor-pointer ${
                          backupJson ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-slate-850 text-slate-500 cursor-not-allowed'
                        }`}
                        id="admin-import-action-btn"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Force State Overwrite (Import)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
