import React from 'react';
import { 
  BarChart3, 
  Upload, 
  FileText, 
  AlertTriangle, 
  Brain, 
  Shield, 
  Settings as SettingsIcon,
  ChevronLeft,
  Eye
} from 'lucide-react';
import { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: 'dashboard' as ViewType, label: 'Dashboard', icon: BarChart3 },
  { id: 'upload' as ViewType, label: 'Upload & Audit', icon: Upload },
  { id: 'results' as ViewType, label: 'Audit Results', icon: FileText },
  { id: 'bias' as ViewType, label: 'Bias Analysis', icon: AlertTriangle },
  { id: 'explainability' as ViewType, label: 'Explainability', icon: Brain },
  { id: 'risk' as ViewType, label: 'Risk Assessment', icon: Shield },
  { id: 'settings' as ViewType, label: 'Settings', icon: SettingsIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  collapsed, 
  onToggleCollapse 
}) => {
  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FairSight</h1>
                <p className="text-xs text-gray-500">AI Compliance Platform</p>
              </div>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
              collapsed ? 'mx-auto' : ''
            }`}
          >
            <ChevronLeft className={`w-4 h-4 text-gray-600 transition-transform ${
              collapsed ? 'rotate-180' : ''
            }`} />
          </button>
        </div>
      </div>

      <nav className="px-4 pb-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};