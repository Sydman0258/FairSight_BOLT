import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  CheckCircle,
  Clock,
  FileText,
  Users,
  Target,
  Eye,
  Scale
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const biasScoreData = [
  { month: 'Jan', score: 0.85, details: { models: 45, violations: 3, warnings: 7 } },
  { month: 'Feb', score: 0.88, details: { models: 52, violations: 2, warnings: 5 } },
  { month: 'Mar', score: 0.82, details: { models: 48, violations: 4, warnings: 8 } },
  { month: 'Apr', score: 0.90, details: { models: 58, violations: 1, warnings: 4 } },
  { month: 'May', score: 0.87, details: { models: 61, violations: 2, warnings: 6 } },
  { month: 'Jun', score: 0.92, details: { models: 67, violations: 1, warnings: 3 } },
];

const riskDistribution = [
  { name: 'Low Risk', value: 60, color: '#10B981', models: ['Content Filter v2', 'Recommendation Engine', 'Chatbot Assistant'] },
  { name: 'Medium Risk', value: 30, color: '#F59E0B', models: ['Credit Scoring v1.2', 'Fraud Detection', 'Price Optimizer'] },
  { name: 'High Risk', value: 10, color: '#EF4444', models: ['Hiring Algorithm', 'Loan Approval', 'Medical Diagnosis'] },
];

const complianceMetrics = [
  { regulation: 'EU AI Act', score: 68, violations: 3, trend: -5 },
  { regulation: 'GDPR Art. 22', score: 75, violations: 1, trend: +8 },
  { regulation: 'NIST AI RMF', score: 82, violations: 0, trend: +12 },
];

const recentAudits = [
  { 
    name: 'Credit Scoring Model v2.1', 
    status: 'completed', 
    riskLevel: 'low', 
    date: '2 hours ago',
    complianceScore: 94,
    violations: ['None'],
    recommendations: 2
  },
  { 
    name: 'Hiring Algorithm v1.3', 
    status: 'running', 
    riskLevel: 'medium', 
    date: '5 hours ago',
    complianceScore: 0,
    violations: ['Pending'],
    recommendations: 0
  },
  { 
    name: 'Loan Approval System', 
    status: 'completed', 
    riskLevel: 'high', 
    date: '1 day ago',
    complianceScore: 72,
    violations: ['EU AI Act Art. 10', 'GDPR Art. 22'],
    recommendations: 8
  },
  { 
    name: 'Content Moderation AI', 
    status: 'completed', 
    riskLevel: 'low', 
    date: '2 days ago',
    complianceScore: 88,
    violations: ['None'],
    recommendations: 3
  },
];

export const Dashboard: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [hoveredData, setHoveredData] = useState<any>(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}: ${(payload[0].value * 100).toFixed(1)}%`}</p>
          <div className="mt-2 space-y-1 text-sm">
            <p className="text-gray-600">Models Audited: {data.details?.models}</p>
            <p className="text-red-600">Violations: {data.details?.violations}</p>
            <p className="text-yellow-600">Warnings: {data.details?.warnings}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg max-w-xs">
          <p className="font-medium text-gray-900">{`${data.name}: ${data.value}%`}</p>
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">Example Models:</p>
            {data.models.slice(0, 3).map((model: string, index: number) => (
              <p key={index} className="text-xs text-gray-500">• {model}</p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Compliance Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your AI models' fairness, bias, and regulatory compliance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
             onClick={() => setSelectedChart('models')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Models Audited</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">247</p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
             onClick={() => setSelectedChart('compliance')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Compliance Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">75%</p>
              <p className="text-sm text-yellow-600 mt-1 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Needs improvement
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
             onClick={() => setSelectedChart('violations')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Law Violations</p>
              <p className="text-3xl font-bold text-red-600 mt-1">4</p>
              <p className="text-sm text-red-600 mt-1 flex items-center">
                <Scale className="w-4 h-4 mr-1" />
                Immediate action required
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
             onClick={() => setSelectedChart('active')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Audits</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
              <p className="text-sm text-blue-600 mt-1 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Currently running
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Compliance by Regulation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance by Regulation</h3>
        <div className="space-y-4">
          {complianceMetrics.map((metric, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{metric.regulation}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    metric.trend > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend > 0 ? '+' : ''}{metric.trend}%
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    metric.violations === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {metric.violations} violations
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        metric.score >= 90 ? 'bg-green-500' :
                        metric.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${metric.score}%` }}
                    ></div>
                  </div>
                </div>
                <span className={`font-semibold ${
                  metric.score >= 90 ? 'text-green-600' :
                  metric.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {metric.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bias Score Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Fairness Score Trend</h3>
            <button 
              onClick={() => setSelectedChart(selectedChart === 'trend' ? null : 'trend')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {selectedChart === 'trend' ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={biasScoreData} onMouseMove={(e) => setHoveredData(e?.activePayload?.[0]?.payload)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0.7, 1]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} />
            </LineChart>
          </ResponsiveContainer>
          
          {selectedChart === 'trend' && hoveredData && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Detailed Analysis - {hoveredData.month}</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Models: </span>
                  <span className="font-medium">{hoveredData.details?.models}</span>
                </div>
                <div>
                  <span className="text-red-700">Violations: </span>
                  <span className="font-medium">{hoveredData.details?.violations}</span>
                </div>
                <div>
                  <span className="text-yellow-700">Warnings: </span>
                  <span className="font-medium">{hoveredData.details?.warnings}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Risk Level Distribution</h3>
            <button 
              onClick={() => setSelectedChart(selectedChart === 'risk' ? null : 'risk')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {selectedChart === 'risk' ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {selectedChart === 'risk' && (
            <div className="mt-4 space-y-2">
              {riskDistribution.map((risk, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium" style={{ color: risk.color }}>{risk.name}</span>
                    <span className="text-sm text-gray-600">{risk.value}% of models</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Examples: {risk.models.slice(0, 2).join(', ')}
                    {risk.models.length > 2 && ` +${risk.models.length - 2} more`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Audits */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Audits</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentAudits.map((audit, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    audit.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{audit.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{audit.date}</span>
                      {audit.status === 'completed' && (
                        <>
                          <span>•</span>
                          <span>Score: {audit.complianceScore}%</span>
                          <span>•</span>
                          <span>{audit.recommendations} recommendations</span>
                        </>
                      )}
                    </div>
                    {audit.violations.length > 0 && audit.violations[0] !== 'None' && audit.violations[0] !== 'Pending' && (
                      <div className="mt-1">
                        <span className="text-xs text-red-600 font-medium">
                          Violations: {audit.violations.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    audit.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                    audit.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {audit.riskLevel.toUpperCase()} RISK
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    audit.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {audit.status.toUpperCase()}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};