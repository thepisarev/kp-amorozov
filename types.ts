export interface ProposalStage {
  title: string;
  description: string;
  duration: string;
}

export interface ProposalCostItem {
  description: string;
  amount: string;
  isOptional?: boolean;
}

export interface ProposalData {
  meta: {
    clientName: string;
    projectTitle: string;
    date: string;
    providerName: string;
  };
  understanding: {
    currentSituation: string;
    problemToSolve: string;
  };
  stages: ProposalStage[];
  timeline: {
    totalDuration: string;
    milestones: string[];
  };
  pricing: {
    mainCost: string;
    additionalCosts: ProposalCostItem[];
  };
  nextSteps: {
    callToAction: string;
    contactEmail: string;
    contactPhone: string;
  };
}