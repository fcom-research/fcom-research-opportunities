export interface ResearchOpportunity {
  id: string;
  piLastName: string;
  piFirstName: string;
  email: string;
  title: string;
  degree: string;
  department: string;
  researchFocus: string;
  keywords: string;
  programDescription: string;
  projectOverview: string;
  studentCount: string;
  timeframe: string[]; // Parsed from the CSV string
  startTerm: string;
  applicationDate?: string; // Add this line
  institution?: string;
}