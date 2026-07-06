/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, Project, Member, GalleryPhoto, ContactDetails, AcademicPitch } from '../types';

interface DataContextType {
  siteContent: SiteContent;
  projects: Project[];
  members: Member[];
  photos: GalleryPhoto[];
  contact: ContactDetails;
  pitches: AcademicPitch[];
  updateSiteContent: (content: Partial<SiteContent>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  addPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  updatePhoto: (id: string, photo: Partial<GalleryPhoto>) => void;
  deletePhoto: (id: string) => void;
  updateContact: (contact: Partial<ContactDetails>) => void;
  addPitch: (pitch: Omit<AcademicPitch, 'id' | 'date' | 'status'>) => void;
  updatePitchStatus: (id: string, status: AcademicPitch['status']) => void;
  deletePitch: (id: string) => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialSiteContent: SiteContent = {
  heroTitle: "Navodaya Innovation & Incubation Centre",
  heroSubtitle: "Fostering Student Entrepreneurship, Sponsoring Regional Solutions, and Powering Kalyan-Karnataka's Future.",
  aboutText: "Navodaya Innovation and Incubation Centre (NIIC) is a state-of-the-art incubation centre situated within the Navodaya Campus in Raichur, Karnataka. Sponsored under the prestigious K-Tech NAIN (New Age Innovation Network) scheme by the Department of Electronics, IT, BT and S&T, Government of Karnataka, NIIC provides a dedicated hub for regional startups, young engineers, and local innovators. We offer comprehensive mentorship, hardware prototyping labs, seed funding grants, and legal intellectual property support, facilitating the transition of student research into scalable market solutions.",
  statsProjects: 18,
  statsStudents: 120,
  statsProfessors: 12,
  statsFunding: "₹3M+"
};

const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "IoT-Based Regional Water Quality Management Network",
    description: "An automated solar-powered sensing network designed to continuously monitor pH, turbidity, and chemical runoffs in rural community water sources in the Raichur district, relaying alerts to authorities.",
    category: "Rural Utilities",
    techStack: ["Sensors", "Solar Power", "IoT", "RF Modules"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    status: "Launched",
    leadName: "Dr. Ramesh Sharma"
  },
  {
    id: "proj-2",
    title: "AI-Assisted Rural Crop Disease Diagnostics",
    description: "A hardware-software hybrid agricultural companion tool designed to analyze leaf and soil parameters locally, enabling marginal farmers to recognize crop infections early and reduce chemical overuse.",
    category: "Agri-Tech",
    techStack: ["Image Recognition", "Embedded Systems", "Agri Sensors"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    status: "Incubating",
    leadName: "Aryan Goel"
  },
  {
    id: "proj-3",
    title: "Multidisciplinary Tele-Consultation Hub",
    description: "A collaborative clinical portal designed in synergy with Navodaya Medical College & Hospital, enabling remote communities in Raichur district to access video diagnostics and primary advice instantly.",
    category: "Health-Tech",
    techStack: ["WebRTC", "Cloud Registry", "Interactive UI"],
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop",
    status: "Prototype",
    leadName: "Simran Kaur"
  }
];

const initialMembers: Member[] = [
  {
    id: "mem-1",
    name: "Dr. Ramesh Sharma",
    role: "Professor",
    department: "Computer Science & Engineering",
    email: "ramesh.sharma@navodaya.edu",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    specializationOrYear: "Embedded Systems & K-Tech NAIN Lead"
  },
  {
    id: "mem-2",
    name: "Prof. Swati Sen",
    role: "Professor",
    department: "Information Technology",
    email: "swati.sen@navodaya.edu",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    specializationOrYear: "Rural Health-Tech Coordinator"
  },
  {
    id: "mem-3",
    name: "Aryan Goel",
    role: "Student",
    department: "Electronics & Communication",
    email: "aryan.goel2026@navodaya.edu",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    specializationOrYear: "Final Year Innovator (Agri-Tech)"
  },
  {
    id: "mem-4",
    name: "Simran Kaur",
    role: "Student",
    department: "Computer Science",
    email: "simran.k@navodaya.edu",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    specializationOrYear: "Third Year Scholar (Tele-Healthcare)"
  }
];

const initialPhotos: GalleryPhoto[] = [
  {
    id: "ph-1",
    title: "NIIC K-Tech NAIN Orientation",
    description: "Young student innovators outlining regional startup proposals during the annual NIIC orientation summit.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",
    date: "2026-03-15"
  },
  {
    id: "ph-2",
    title: "Hardware Prototyping Workshop",
    description: "Incubators calibrating environmental sensors and microcontroller boards inside the college NAIN lab.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop",
    date: "2026-04-20"
  },
  {
    id: "ph-3",
    title: "Regional Mentorship Forum",
    description: "Experienced industry mentors reviewing project prototypes and advising on patent filing steps.",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop",
    date: "2026-05-10"
  }
];

const initialContact: ContactDetails = {
  email: "niic@navodaya.edu.in",
  phone: "+91 8532 220234",
  address: "NIIC Block, Navodaya Campus, Raichur - 584103, Karnataka, India",
  hours: "Monday - Saturday: 9:00 AM - 5:30 PM (Sunday Holiday)"
};

const initialPitches: AcademicPitch[] = [
  {
    id: "pitch-1",
    name: "Karan Johar",
    email: "karan.j@navodaya.edu",
    domain: "agri-tech",
    idea: "Developing a drone-guided hyper-local pesticide dispenser that identifies target crops based on convolutional neural networks and sprays precisely, minimizing fertilizer runoff.",
    date: "2026-06-28",
    status: "Under Review"
  },
  {
    id: "pitch-2",
    name: "Dr. Ananya Rao",
    email: "ananya.rao@navodaya.edu",
    domain: "health-tech",
    idea: "A non-invasive wearable blood glucose tracker utilizing near-infrared spectroscopy and smart Bluetooth syncing to provide continuous tracking without painful pinpricks.",
    date: "2026-07-02",
    status: "Pending"
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const local = localStorage.getItem('niic_site_content');
    return local ? JSON.parse(local) : initialSiteContent;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const local = localStorage.getItem('niic_projects');
    return local ? JSON.parse(local) : initialProjects;
  });

  const [members, setMembers] = useState<Member[]>(() => {
    const local = localStorage.getItem('niic_members');
    return local ? JSON.parse(local) : initialMembers;
  });

  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    const local = localStorage.getItem('niic_photos');
    return local ? JSON.parse(local) : initialPhotos;
  });

  const [contact, setContact] = useState<ContactDetails>(() => {
    const local = localStorage.getItem('niic_contact');
    return local ? JSON.parse(local) : initialContact;
  });

  const [pitches, setPitches] = useState<AcademicPitch[]>(() => {
    const local = localStorage.getItem('niic_pitches');
    return local ? JSON.parse(local) : initialPitches;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('niic_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('niic_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('niic_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('niic_photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('niic_contact', JSON.stringify(contact));
  }, [contact]);

  useEffect(() => {
    localStorage.setItem('niic_pitches', JSON.stringify(pitches));
  }, [pitches]);

  // Operations
  const updateSiteContent = (content: Partial<SiteContent>) => {
    setSiteContent(prev => ({ ...prev, ...content }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [...prev, newProj]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addMember = (member: Omit<Member, 'id'>) => {
    const newMem: Member = {
      ...member,
      id: `mem-${Date.now()}`
    };
    setMembers(prev => [...prev, newMem]);
  };

  const updateMember = (id: string, updated: Partial<Member>) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const addPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `ph-${Date.now()}`
    };
    setPhotos(prev => [...prev, newPhoto]);
  };

  const updatePhoto = (id: string, updated: Partial<GalleryPhoto>) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const updateContact = (updated: Partial<ContactDetails>) => {
    setContact(prev => ({ ...prev, ...updated }));
  };

  const addPitch = (pitch: Omit<AcademicPitch, 'id' | 'date' | 'status'>) => {
    const newPitch: AcademicPitch = {
      ...pitch,
      id: `pitch-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setPitches(prev => [newPitch, ...prev]);
  };

  const updatePitchStatus = (id: string, status: AcademicPitch['status']) => {
    setPitches(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const deletePitch = (id: string) => {
    setPitches(prev => prev.filter(p => p.id !== id));
  };

  // Export and Import utilities
  const exportData = () => {
    return JSON.stringify({
      siteContent,
      projects,
      members,
      photos,
      contact,
      pitches
    }, null, 2);
  };

  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.siteContent) setSiteContent(parsed.siteContent);
      if (parsed.projects) setProjects(parsed.projects);
      if (parsed.members) setMembers(parsed.members);
      if (parsed.photos) setPhotos(parsed.photos);
      if (parsed.contact) setContact(parsed.contact);
      if (parsed.pitches) setPitches(parsed.pitches);
      return true;
    } catch (e) {
      console.error("Failed to import JSON data", e);
      return false;
    }
  };

  return (
    <DataContext.Provider value={{
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
      addPitch,
      updatePitchStatus,
      deletePitch,
      exportData,
      importData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
