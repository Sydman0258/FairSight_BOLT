import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  CheckCircle,
  Clock,
  FileText,
  Users,
  Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const biasScoreData = [
  { month: 'Jan', score: 0.85 },
  { month: 'Feb', score: 0.88 },
  { month: 'Mar', score: 0.82 },
  { month: 'Apr', score: 0.90 },
  { month: 'May', score: 0.87 },
  { month: 'Jun', score: 0.92 },
];

const riskDistribution = [
  { name: 'Low Risk', value: 60, color: '#10B981' },
  { name: 'Medium Risk', value: 30, color: '#F59E0B' },
  { name: 'High Risk', value: 10, color: '#EF4444' },
];

const recentAudits = [
  { name: 'Credit Scoring Model v2.1', status: 'completed', riskLevel: 'low', date: '2 hours ago' },
  { name: 'Hiring Algorithm v1.3', status: 'running', riskLevel: 'medium', date: '5 hours ago' },
  { name: 'Loan Approval System', status: 'completed', riskLevel: 'high', date: '1 day ago' },
  { name: 'Content Moderation AI', status: 'completed', riskLevel: 'low', date: '2 days ago' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Compliance Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your AI models' fairness, bias, and regulatory compliance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">92%</p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Above threshold
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk Models</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
              <p className="text-sm text-red-600 mt-1 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Requires attention
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bias Score Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bias Score Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={biasScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0.7, 1]} />
              <Tooltip formatter={(value) => [`${(value as number * 100).toFixed(1)}%`, 'Fairness Score']} />
              <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Level Distribution</h3>
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
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
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    audit.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{audit.name}</h4>
                    <p className="text-sm text-gray-600">{audit.date}</p>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};