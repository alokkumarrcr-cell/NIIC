/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  statsProjects: number;
  statsStudents: number;
  statsProfessors: number;
  statsFunding: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Agri-Tech' | 'Health-Tech' | 'Rural Utilities' | 'Other';
  techStack: string[];
  image: string;
  status: 'Incubating' | 'Prototype' | 'Launched';
  leadName: string;
}

export interface Member {
  id: string;
  name: string;
  role: 'Professor' | 'Student' | 'Mentor';
  department: string;
  email: string;
  avatar: string;
  specializationOrYear: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  hours: string;
}

export interface AcademicPitch {
  id: string;
  name: string;
  email: string;
  domain: 'agri-tech' | 'health-tech' | 'rural-utilities' | 'other';
  idea: string;
  date: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Declined';
}

