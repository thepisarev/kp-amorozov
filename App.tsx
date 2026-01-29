import React from 'react';
import { ProposalView } from './components/ProposalView';
import { PLACEHOLDER_PROPOSAL } from './constants';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased bg-gray-50">
      <ProposalView data={PLACEHOLDER_PROPOSAL} />
    </div>
  );
};

export default App;
