import React, { useState } from 'react';
import { AlertTriangle, Info, TrendingDown, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

const biasMetrics = [
  { attribute: 'Gender', bias_score: 0.15, status: 'moderate', impact: 'medium' },
  { attribute: 'Age', bias_score: 0.08, status: 'low', impact: 'low' },
  { attribute: 'Race', bias_score: 0.23, status: 'high', impact: 'high' },
  { attribute: 'Income', bias_score: 0.12, status: 'moderate', impact: 'medium' },
];

const fairnessMetrics = [
  { metric: 'Demographic Parity', value: 0.85, threshold: 0.8, status: 'pass' },
  { metric: 'Equal Opportunity', value: 0.78, threshold: 0.8, status: 'fail' },
  { metric: 'Equalized Odds', value: 0.82, threshold: 0.8, status: 'pass' },
  { metric: 'Calibration', value: 0.76, threshold: 0.8, status: 'fail' },
];

const groupPerformance = [
  { group: 'Male', accuracy: 0.92, precision: 0.89, recall: 0.94 },
  { group: 'Female', accuracy: 0.88, precision: 0.85, recall: 0.91 },
  { group: 'Age 18-30', accuracy: 0.91, precision: 0.88, recall: 0.93 },
  { group: 'Age 31-50', accuracy: 0.90, precision: 0.87, recall: 0.92 },
  { group: 'Age 50+', accuracy: 0.87, precision: 0.84, recall: 0.89 },
];

export const BiasAnalysis: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('accuracy');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'pass':
        return 'text-green-600 bg-green-100';
      case 'fail':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getBiasScoreColor = (score: number) => {
    if (score < 0.1) return 'text-green-600';
    if (score < 0.2) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bias Analysis</h1>
        <p className="text-gray-600 mt-2">Detailed analysis of model bias across protected attributes</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Bias Score</p>
              <p className="text-3xl font-bold text-red-600 mt-1">0.145</p>
              <p className="text-sm text-gray-500 mt-1">Above recommended threshold</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-100 bg-red-50 rounded-lg p-2" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Protected Attributes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">4</p>
              <p className="text-sm text-gray-500 mt-1">Gender, Age, Race, Income</p>
            </div>
            <Users className="w-12 h-12 text-blue-100 bg-blue-50 rounded-lg p-2" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Issues</p>
              <p className="text-3xl font-bold text-red-600 mt-1">2</p>
              <p className="text-sm text-gray-500 mt-1">Require immediate attention</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-100 bg-red-50 rounded-lg p-2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bias by Protected Attributes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bias by Protected Attributes</h3>
          <div className="space-y-4">
            {biasMetrics.map((metric, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{metric.attribute}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          metric.bias_score < 0.1 ? 'bg-green-500' :
                          metric.bias_score < 0.2 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric.bias_score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className={`ml-3 font-semibold ${getBiasScoreColor(metric.bias_score)}`}>
                    {metric.bias_score.toFixed(3)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Impact: {metric.impact} • Threshold: 0.100
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Fairness Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fairness Metrics</h3>
          <div className="space-y-4">
            {fairnessMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{metric.metric}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {metric.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.value >= metric.threshold ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${metric.value * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      metric.value >= metric.threshold ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {(metric.value * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Threshold: {(metric.threshold * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Group Performance Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance by Demographic Groups</h3>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="accuracy">Accuracy</option>
            <option value="precision">Precision</option>
            <option value="recall">Recall</option>
          </select>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={groupPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis domain={[0.7, 1]} />
            <Tooltip formatter={(value) => [`${(value as number * 100).toFixed(1)}%`, selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)]} />
            <Bar dataKey={selectedMetric} fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Bias Mitigation Recommendations</h3>
            <div className="space-y-2 text-blue-800">
              <p>• <strong>Race attribute:</strong> High bias detected (0.23). Consider data rebalancing or fairness constraints during training.</p>
              <p>• <strong>Equal Opportunity:</strong> Below threshold (78%). Implement post-processing calibration to improve fairness.</p>
              <p>• <strong>Gender disparities:</strong> 4% accuracy gap detected. Review feature selection and consider demographic parity constraints.</p>
              <p>• <strong>Overall:</strong> Consider implementing adversarial debiasing techniques or fairness-aware machine learning algorithms.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};