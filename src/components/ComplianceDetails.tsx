import React, { useState } from 'react';
import { Scale, AlertTriangle, CheckCircle, ExternalLink, FileText, Info, Target } from 'lucide-react';

interface LawViolation {
  id: string;
  law: string;
  article: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  modelId: string;
  modelName: string;
  violationType: string;
  details: string;
  recommendations: string[];
  deadline: string;
  status: 'violation' | 'warning' | 'compliant';
}

const lawViolations: LawViolation[] = [
  {
    id: '1',
    law: 'EU AI Act',
    article: 'Article 10 - Data and Data Governance',
    description: 'Training data lacks sufficient representativeness across demographic groups',
    severity: 'critical',
    modelId: 'model_001',
    modelName: 'Credit Scoring Model v2.1',
    violationType: 'Data Bias',
    details: 'Analysis reveals significant underrepresentation of minority groups (< 5% representation) in training data, violating requirements for representative datasets in high-risk AI systems.',
    recommendations: [
      'Implement data collection strategy to increase minority group representation to minimum 15%',
      'Apply synthetic data generation techniques using privacy-preserving methods',
      'Establish ongoing data quality monitoring with quarterly reviews',
      'Document data governance procedures as required by Article 10(3)'
    ],
    deadline: '2024-02-15',
    status: 'violation'
  },
  {
    id: '2',
    law: 'EU AI Act',
    article: 'Article 13 - Transparency and Information',
    description: 'Insufficient explainability for high-risk AI system classification',
    severity: 'high',
    modelId: 'model_002',
    modelName: 'Hiring Algorithm v1.3',
    details: 'Model lacks required transparency measures for automated decision-making affecting employment. Current SHAP explanations do not meet Article 13 requirements for clear, meaningful information.',
    violationType: 'Transparency Deficit',
    recommendations: [
      'Implement comprehensive LIME and SHAP explanations with plain-language summaries',
      'Create user-facing explanation interface showing decision factors',
      'Establish human review process for contested decisions',
      'Provide clear information about automated decision-making to affected individuals'
    ],
    deadline: '2024-01-30',
    status: 'violation'
  },
  {
    id: '3',
    law: 'GDPR',
    article: 'Article 22 - Automated Decision-Making',
    description: 'Lack of meaningful human intervention in automated decisions',
    severity: 'high',
    modelId: 'model_003',
    modelName: 'Loan Approval System',
    violationType: 'Human Oversight',
    details: 'System makes fully automated decisions affecting individuals without adequate human oversight mechanisms. No clear process for individuals to request human review.',
    recommendations: [
      'Implement human-in-the-loop review for all high-impact decisions',
      'Create clear escalation process for contested decisions',
      'Train staff on manual review procedures and bias recognition',
      'Establish audit trail for all human interventions'
    ],
    deadline: '2024-02-01',
    status: 'violation'
  },
  {
    id: '4',
    law: 'EU AI Act',
    article: 'Article 14 - Human Oversight',
    description: 'Inadequate human oversight measures for high-risk AI system',
    severity: 'medium',
    modelId: 'model_004',
    modelName: 'Content Moderation AI',
    violationType: 'Oversight Gap',
    details: 'Current oversight measures do not ensure effective human supervision. Lack of real-time monitoring and intervention capabilities.',
    recommendations: [
      'Implement real-time monitoring dashboard for human supervisors',
      'Establish clear escalation procedures for edge cases',
      'Provide comprehensive training for oversight personnel',
      'Create feedback mechanisms for continuous improvement'
    ],
    deadline: '2024-02-28',
    status: 'warning'
  }
];

const complianceFrameworks = [
  {
    name: 'EU AI Act',
    status: 'active',
    compliance: 68,
    violations: 3,
    warnings: 1,
    description: 'Comprehensive AI regulation framework for high-risk AI systems',
    keyRequirements: [
      'Risk assessment and management',
      'Data governance and quality',
      'Transparency and explainability',
      'Human oversight and intervention',
      'Accuracy and robustness testing'
    ]
  },
  {
    name: 'GDPR',
    status: 'active',
    compliance: 75,
    violations: 1,
    warnings: 0,
    description: 'Data protection regulation with automated decision-making provisions',
    keyRequirements: [
      'Lawful basis for processing',
      'Right to explanation',
      'Human intervention rights',
      'Data subject consent'
    ]
  },
  {
    name: 'US NIST AI RMF',
    status: 'guideline',
    compliance: 82,
    violations: 0,
    warnings: 2,
    description: 'AI Risk Management Framework for trustworthy AI',
    keyRequirements: [
      'Governance structures',
      'Risk mapping and measurement',
      'Impact assessment',
      'Continuous monitoring'
    ]
  }
];

export const ComplianceDetails: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const filteredViolations = lawViolations.filter(violation => {
    const frameworkMatch = selectedFramework === 'all' || violation.law === selectedFramework;
    const severityMatch = selectedSeverity === 'all' || violation.severity === selectedSeverity;
    return frameworkMatch && severityMatch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'violation':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <Info className="w-5 h-5 text-yellow-600" />;
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
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
        <h1 className="text-3xl font-bold text-gray-900">Legal Compliance Analysis</h1>
        <p className="text-gray-600 mt-2">Detailed analysis of law violations and compliance requirements</p>
      </div>

      {/* Compliance Framework Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {complianceFrameworks.map((framework, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{framework.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                framework.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {framework.status.toUpperCase()}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Compliance Score</span>
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

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{framework.violations}</div>
                <div className="text-xs text-gray-500">Violations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{framework.warnings}</div>
                <div className="text-xs text-gray-500">Warnings</div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{framework.description}</p>
            
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Key Requirements:</h4>
              <div className="space-y-1">
                {framework.keyRequirements.slice(0, 3).map((req, idx) => (
                  <div key={idx} className="text-xs text-gray-600">• {req}</div>
                ))}
                {framework.keyRequirements.length > 3 && (
                  <div className="text-xs text-blue-600">+ {framework.keyRequirements.length - 3} more</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Legal Framework</label>
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Frameworks</option>
              <option value="EU AI Act">EU AI Act</option>
              <option value="GDPR">GDPR</option>
              <option value="US NIST AI RMF">US NIST AI RMF</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level</label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Law Violations */}
      <div className="space-y-4">
        {filteredViolations.map((violation) => (
          <div key={violation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusIcon(violation.status)}
                  <h3 className="text-lg font-semibold text-gray-900">{violation.law}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(violation.severity)}`}>
                    {violation.severity.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center text-sm text-blue-600 mb-2">
                  <Scale className="w-4 h-4 mr-1" />
                  <span className="font-medium">{violation.article}</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </div>
                <p className="text-gray-600 mb-3">{violation.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Affected Model</h4>
                    <p className="text-sm text-gray-600">{violation.modelName}</p>
                    <p className="text-xs text-gray-500">ID: {violation.modelId}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Violation Type</h4>
                    <p className="text-sm text-gray-600">{violation.violationType}</p>
                    <p className="text-xs text-gray-500">Deadline: {violation.deadline}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-red-900 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Violation Details
              </h4>
              <p className="text-red-800 text-sm">{violation.details}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Recommended Actions
              </h4>
              <div className="space-y-2">
                {violation.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start text-sm text-blue-800">
                    <span className="font-medium mr-2">{index + 1}.</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredViolations.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No violations found</h3>
          <p className="text-gray-600">
            {selectedFramework !== 'all' || selectedSeverity !== 'all' 
              ? 'Try adjusting your filter criteria.' 
              : 'All models are compliant with current regulations.'}
          </p>
        </div>
      )}

      {/* Action Plan Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <FileText className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Compliance Action Plan</h3>
            <div className="space-y-2 text-blue-800 text-sm">
              <p>• <strong>Critical Priority:</strong> Address EU AI Act Article 10 data governance violations within 15 days</p>
              <p>• <strong>High Priority:</strong> Implement transparency measures for Article 13 compliance within 30 days</p>
              <p>• <strong>Medium Priority:</strong> Enhance human oversight mechanisms within 60 days</p>
              <p>• <strong>Legal Review:</strong> Schedule quarterly compliance assessments with legal team</p>
              <p>• <strong>Documentation:</strong> Maintain audit trail of all remediation efforts for regulatory inspection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};