import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Filter,
  Search
} from 'lucide-react';
import { format } from 'date-fns';

interface AuditResult {
  id: string;
  modelName: string;
  status: 'completed' | 'running' | 'failed';
  riskLevel: 'low' | 'medium' | 'high';
  complianceScore: number;
  biasScore: number;
  fairnessScore: number;
  createdAt: Date;
  completedAt?: Date;
  issues: number;
}

const mockResults: AuditResult[] = [
  {
    id: '1',
    modelName: 'Credit Scoring Model v2.1',
    status: 'completed',
    riskLevel: 'low',
    complianceScore: 94,
    biasScore: 92,
    fairnessScore: 96,
    createdAt: new Date('2024-01-15T10:30:00'),
    completedAt: new Date('2024-01-15T11:45:00'),
    issues: 2
  },
  {
    id: '2',
    modelName: 'Hiring Algorithm v1.3',
    status: 'running',
    riskLevel: 'medium',
    complianceScore: 0,
    biasScore: 0,
    fairnessScore: 0,
    createdAt: new Date('2024-01-15T14:20:00'),
    issues: 0
  },
  {
    id: '3',
    modelName: 'Loan Approval System',
    status: 'completed',
    riskLevel: 'high',
    complianceScore: 72,
    biasScore: 68,
    fairnessScore: 75,
    createdAt: new Date('2024-01-14T09:15:00'),
    completedAt: new Date('2024-01-14T10:30:00'),
    issues: 8
  },
  {
    id: '4',
    modelName: 'Content Moderation AI',
    status: 'completed',
    riskLevel: 'low',
    complianceScore: 88,
    biasScore: 85,
    fairnessScore: 91,
    createdAt: new Date('2024-01-13T16:45:00'),
    completedAt: new Date('2024-01-13T17:30:00'),
    issues: 3
  },
];

export const AuditResults: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = mockResults.filter(result => {
    const matchesFilter = selectedFilter === 'all' || result.status === selectedFilter;
    const matchesSearch = result.modelName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audit Results</h1>
        <p className="text-gray-600 mt-2">View and manage your model compliance audit results</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search audits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="running">Running</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Model</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Risk Level</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Compliance</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Bias Score</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Fairness</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Issues</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{result.modelName}</div>
                        <div className="text-sm text-gray-500">ID: {result.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(result.status)}
                      <span className="capitalize font-medium">{result.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(result.riskLevel)}`}>
                      {result.riskLevel.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {result.status === 'completed' ? (
                      <span className={`font-semibold ${getScoreColor(result.complianceScore)}`}>
                        {result.complianceScore}%
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {result.status === 'completed' ? (
                      <span className={`font-semibold ${getScoreColor(result.biasScore)}`}>
                        {result.biasScore}%
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {result.status === 'completed' ? (
                      <span className={`font-semibold ${getScoreColor(result.fairnessScore)}`}>
                        {result.fairnessScore}%
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {result.issues > 0 ? (
                      <span className="flex items-center text-red-600">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {result.issues}
                      </span>
                    ) : (
                      <span className="text-green-600">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>{format(result.createdAt, 'MMM dd, yyyy')}</div>
                    <div>{format(result.createdAt, 'HH:mm')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No audit results found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Start by uploading and auditing your first model.'}
          </p>
        </div>
      )}
    </div>
  );
};