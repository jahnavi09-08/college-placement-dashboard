
export interface BranchPlacement {
  branch: string;
  totalStudents: number;
  placedStudents: number;
  avgPackage: number; // In LPA
  highestPackage: number; // In LPA
  placementPercentage: number;
}

export interface YearStats {
  year: string;
  totalOffers: number;
  avgPackage: number;
  highestPackage: number;
  branches: BranchPlacement[];
}

export interface Recruiter {
  name: string;
  offers: number;
  industry: string;
  logo: string;
}

export interface InsightRequest {
  year: string;
  branch?: string;
}
