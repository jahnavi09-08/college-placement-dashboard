
import { YearStats, Recruiter } from './types';

export const PLACEMENT_DATA: YearStats[] = [
  {
    year: '2024',
    totalOffers: 1245,
    avgPackage: 5.8,
    highestPackage: 44.0,
    branches: [
      { branch: 'CSE', totalStudents: 240, placedStudents: 228, avgPackage: 7.2, highestPackage: 44.0, placementPercentage: 95 },
      { branch: 'ECE', totalStudents: 180, placedStudents: 165, avgPackage: 5.4, highestPackage: 18.0, placementPercentage: 91.6 },
      { branch: 'IT', totalStudents: 120, placedStudents: 114, avgPackage: 6.5, highestPackage: 32.0, placementPercentage: 95 },
      { branch: 'EEE', totalStudents: 120, placedStudents: 98, avgPackage: 4.8, highestPackage: 12.0, placementPercentage: 81.6 },
      { branch: 'ME', totalStudents: 120, placedStudents: 85, avgPackage: 4.2, highestPackage: 10.0, placementPercentage: 70.8 },
      { branch: 'CE', totalStudents: 60, placedStudents: 42, avgPackage: 4.0, highestPackage: 8.5, placementPercentage: 70 },
    ]
  },
  {
    year: '2023',
    totalOffers: 1180,
    avgPackage: 5.2,
    highestPackage: 38.0,
    branches: [
      { branch: 'CSE', totalStudents: 240, placedStudents: 220, avgPackage: 6.8, highestPackage: 38.0, placementPercentage: 91.6 },
      { branch: 'ECE', totalStudents: 180, placedStudents: 160, avgPackage: 5.0, highestPackage: 15.0, placementPercentage: 88.8 },
      { branch: 'IT', totalStudents: 120, placedStudents: 110, avgPackage: 6.0, highestPackage: 28.0, placementPercentage: 91.6 },
      { branch: 'EEE', totalStudents: 120, placedStudents: 90, avgPackage: 4.5, highestPackage: 11.0, placementPercentage: 75 },
      { branch: 'ME', totalStudents: 120, placedStudents: 80, avgPackage: 4.0, highestPackage: 9.0, placementPercentage: 66.6 },
      { branch: 'CE', totalStudents: 60, placedStudents: 38, avgPackage: 3.8, highestPackage: 7.0, placementPercentage: 63.3 },
    ]
  }
];

export const TOP_RECRUITERS: Recruiter[] = [
  { name: 'Amazon', offers: 45, industry: 'E-commerce', logo: 'https://picsum.photos/seed/amazon/60/60' },
  { name: 'Google', offers: 5, industry: 'Tech', logo: 'https://picsum.photos/seed/google/60/60' },
  { name: 'TCS', offers: 210, industry: 'IT Services', logo: 'https://picsum.photos/seed/tcs/60/60' },
  { name: 'Infosys', offers: 185, industry: 'IT Services', logo: 'https://picsum.photos/seed/infosys/60/60' },
  { name: 'Wipro', offers: 150, industry: 'IT Services', logo: 'https://picsum.photos/seed/wipro/60/60' },
  { name: 'Accenture', offers: 120, industry: 'Consulting', logo: 'https://picsum.photos/seed/accenture/60/60' },
  { name: 'Cognizant', offers: 95, industry: 'IT Services', logo: 'https://picsum.photos/seed/cts/60/60' },
  { name: 'DXC Technology', offers: 80, industry: 'IT Services', logo: 'https://picsum.photos/seed/dxc/60/60' },
];
