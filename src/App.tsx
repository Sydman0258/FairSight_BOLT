import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { UploadSection } from './components/UploadSection';
import { AuditResults } from './components/AuditResults';
import { BiasAnalysis } from './components/BiasAnalysis';
import { ExplainabilityReport } from './components/ExplainabilityReport';
import { RiskAssessment } from './components/RiskAssessment';
import { Settings } from './components/Settings';

export type ViewType = 'dashboard' | 'upload' | 'results' | 'bias' | 'explainability' | 'risk' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <UploadSection />;
      case 'results':
        return <AuditResults />;
      case 'bias':
        return <BiasAnalysis />;
      case 'explainability':
        return <ExplainabilityReport />;
      case 'risk':
        return <RiskAssessment />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default App;