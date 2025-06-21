import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Info, ExternalLink, FileText } from 'lucide-react';

interface RiskItem {
  id: string;
  category: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  regulation: string;
  mitigation: string;
  status: 'compliant' | 'non-compliant' | 'review-needed';
}

const riskAssessments: RiskItem[] = [
  {
    id: '1',
    category: 'Algorithmic Transparency',
    description: 'Model lacks sufficient explainability for high-risk AI system classification',
    riskLevel: 'high',
    regulation: 'EU AI Act Article 13',
    mitigation: 'Implement SHAP-based explanations and document decision logic',
    status: 'review-needed'
  },
  {
    id: '2',
    category: 'Bias and Discrimination',
    description: 'Detected bias against protected demographic groups',
    riskLevel: 'critical',
    regulation: 'EU AI Act Article 10, GDPR Article 22',
    mitigation: 'Apply fairness constraints and bias mitigation techniques',
    status: 'non-compliant'
  },
  {
    id: '3',
    category: 'Data Quality',
    description: 'Training data representativeness and quality assessment',
    riskLevel: 'medium',
    regulation: 'EU AI Act Article 10',
    mitigation: 'Conduct data quality audit and improve sampling methodology',
    status: 'compliant'
  },
  {
    id: '4',
    category: 'Human Oversight',
    description: 'Insufficient human oversight mechanisms for automated decisions',
    riskLevel: 'high',
    regulation: 'EU AI Act Article 14',
    mitigation: 'Implement human-in-the-loop review process for edge cases',
    status: 'review-needed'
  },
  {
    id: '5',
    category: 'Accuracy and Robustness',
    description: 'Model performance monitoring and validation procedures',
    riskLevel: 'low',
    regulation: 'EU AI Act Article 15',
    mitigation: 'Establish continuous monitoring and performance tracking',
    status: 'compliant'
  }
];

const regulatoryFrameworks = [
  {
    name: 'EU AI Act',
    status: 'active',
    compliance: 72,
    description: 'Comprehensive AI regulation framework',
    requirements: ['Risk assessment', 'Transparency', 'Human oversight', 'Data governance']
  },
  {
    name: 'GDPR Article 22',
    status: 'active',
    compliance: 85,
    description: 'Right not to be subject to automated decision-making',
    requirements: ['Explicit consent', 'Right to explanation', 'Human intervention']
  },
  {
    name: 'US NIST AI RMF',
    status: 'guideline',
    compliance: 68,
    description: 'AI Risk Management Framework',
    requirements: ['Governance', 'Map risks', 'Measure impact', 'Manage risks']
  }
];

export const RiskAssessment: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegulation, setSelectedRegulation] = useState('all');

  const filteredRisks = riskAssessments.filter(risk => {
    const categoryMatch = selectedCategory === 'all' || risk.category === selectedCategory;
    const regulationMatch = selectedRegulation === 'all' || risk.regulation.includes(selectedRegulation);
    return categoryMatch && regulationMatch;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'non-compliant':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'review-needed':
        return <Info className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Risk Assessment</h1>
        <p className="text-gray-600 mt-2">Comprehensive regulatory compliance and risk analysis</p>
      </div>

      {/* Regulatory Frameworks Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {regulatoryFrameworks.map((framework, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{framework.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                framework.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {framework.status.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{framework.description}</p>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Compliance</span>
                <span className={`text-sm font-semibold ${getComplianceColor(framework.compliance)}`}>
                  {framework.compliance}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    framework.compliance >= 90 ? 'bg-green-500' :
                    framework.compliance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${framework.compliance}%` }}
                ></div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Key Requirements:</h4>
              <div className="space-y-1">
                {framework.requirements.map((req, idx) => (
                  <div key={idx} className="text-xs text-gray-600">• {req}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Risk Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Algorithmic Transparency">Algorithmic Transparency</option>
              <option value="Bias and Discrimination">Bias and Discrimination</option>
              <option value="Data Quality">Data Quality</option>
              <option value="Human Oversight">Human Oversight</option>
              <option value="Accuracy and Robustness">Accuracy and Robustness</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Regulation</label>
            <select
              value={selectedRegulation}
              onChange={(e) => setSelectedRegulation(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Regulations</option>
              <option value="EU AI Act">EU AI Act</option>
              <option value="GDPR">GDPR</option>
              <option value="NIST">NIST AI RMF</option>
            </select>
          </div>
        </div>
      </div>

      {/* Risk Items */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => (
          <div key={risk.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusIcon(risk.status)}
                  <h3 className="text-lg font-semibold text-gray-900">{risk.category}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.riskLevel)}`}>
                    {risk.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{risk.description}</p>
                <div className="flex items-center text-sm text-blue-600 mb-2">
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="font-medium">{risk.regulation}</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Recommended Mitigation</h4>
              <p className="text-gray-700 text-sm">{risk.mitigation}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredRisks.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No risks found</h3>
          <p className="text-gray-600">Try adjusting your filter criteria.</p>
        </div>
      )}

      {/* Compliance Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <FileText className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Compliance Action Plan</h3>
            <div className="space-y-2 text-blue-800 text-sm">
              <p>• <strong>Priority 1:</strong> Address critical bias issues to meet EU AI Act requirements</p>
              <p>• <strong>Priority 2:</strong> Enhance algorithmic transparency and explainability documentation</p>
              <p>• <strong>Priority 3:</strong> Implement human oversight mechanisms for high-risk decisions</p>
              <p>• <strong>Timeline:</strong> Complete critical items within 30 days, medium risk items within 60 days</p>
              <p>• <strong>Next Review:</strong> Schedule follow-up assessment in 90 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};