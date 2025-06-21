import React, { useState } from 'react';
import { Brain, Info, TrendingUp, TrendingDown, Eye, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const shapValues = [
  { feature: 'Credit Score', importance: 0.45, direction: 'positive' },
  { feature: 'Annual Income', importance: 0.32, direction: 'positive' },
  { feature: 'Debt-to-Income', importance: -0.28, direction: 'negative' },
  { feature: 'Employment Years', importance: 0.15, direction: 'positive' },
  { feature: 'Age', importance: -0.12, direction: 'negative' },
  { feature: 'Education Level', importance: 0.08, direction: 'positive' },
];

const featureInteractions = [
  { features: 'Credit Score × Income', impact: 0.18, description: 'Strong positive interaction' },
  { features: 'Age × Employment Years', impact: -0.09, description: 'Moderate negative interaction' },
  { features: 'Debt Ratio × Income', impact: -0.14, description: 'Strong negative interaction' },
];

const samplePredictions = [
  {
    id: 1,
    prediction: 'Approved',
    confidence: 0.87,
    topFeatures: [
      { name: 'Credit Score: 780', impact: 0.34 },
      { name: 'Income: $85K', impact: 0.21 },
      { name: 'Debt Ratio: 15%', impact: 0.18 }
    ]
  },
  {
    id: 2,
    prediction: 'Rejected',
    confidence: 0.92,
    topFeatures: [
      { name: 'Credit Score: 580', impact: -0.42 },
      { name: 'Debt Ratio: 65%', impact: -0.31 },
      { name: 'Income: $32K', impact: -0.19 }
    ]
  }
];

export const ExplainabilityReport: React.FC = () => {
  const [selectedView, setSelectedView] = useState('global');
  const [selectedSample, setSelectedSample] = useState(0);

  const getFeatureColor = (importance: number) => {
    return importance > 0 ? '#10B981' : '#EF4444';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Model Explainability</h1>
        <p className="text-gray-600 mt-2">SHAP-based analysis of model behavior and feature importance</p>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Analysis Type:</span>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setSelectedView('global')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedView === 'global'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Global Explanation
            </button>
            <button
              onClick={() => setSelectedView('local')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedView === 'local'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Local Explanations
            </button>
          </div>
        </div>
      </div>

      {selectedView === 'global' ? (
        <>
          {/* Global Feature Importance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Global Feature Importance (SHAP)</h3>
              <button className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Download className="w-4 h-4 mr-1" />
                Export Chart
              </button>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={shapValues} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[-0.5, 0.5]} />
                <YAxis dataKey="feature" type="category" width={120} />
                <Tooltip 
                  formatter={(value) => [
                    `${value > 0 ? '+' : ''}${(value as number).toFixed(3)}`, 
                    'SHAP Value'
                  ]} 
                />
                <Bar 
                  dataKey="importance" 
                  fill={(entry) => getFeatureColor(entry.importance)}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-800">Positive Contributors</span>
                </div>
                <div className="space-y-1">
                  {shapValues.filter(f => f.importance > 0).map((feature, index) => (
                    <div key={index} className="text-sm text-green-700">
                      {feature.feature}: +{feature.importance.toFixed(3)}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
                  <span className="font-medium text-red-800">Negative Contributors</span>
                </div>
                <div className="space-y-1">
                  {shapValues.filter(f => f.importance < 0).map((feature, index) => (
                    <div key={index} className="text-sm text-red-700">
                      {feature.feature}: {feature.importance.toFixed(3)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Interactions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Interactions</h3>
            <div className="space-y-4">
              {featureInteractions.map((interaction, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{interaction.features}</h4>
                      <p className="text-sm text-gray-600">{interaction.description}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${
                        interaction.impact > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {interaction.impact > 0 ? '+' : ''}{interaction.impact.toFixed(3)}
                      </div>
                      <div className="text-xs text-gray-500">Interaction Effect</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Local Explanations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Individual Prediction Explanations</h3>
              <select
                value={selectedSample}
                onChange={(e) => setSelectedSample(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {samplePredictions.map((sample, index) => (
                  <option key={index} value={index}>
                    Sample {sample.id} - {sample.prediction}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Prediction Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prediction:</span>
                      <span className={`font-semibold ${
                        samplePredictions[selectedSample].prediction === 'Approved' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {samplePredictions[selectedSample].prediction}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Confidence:</span>
                      <span className="font-semibold text-gray-900">
                        {(samplePredictions[selectedSample].confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Contributing Features</h4>
                  <div className="space-y-3">
                    {samplePredictions[selectedSample].topFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{feature.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                feature.impact > 0 ? 'bg-green-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.abs(feature.impact) * 100}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${
                            feature.impact > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {feature.impact > 0 ? '+' : ''}{feature.impact.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Brain className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Model Reasoning</h4>
                    <p className="text-blue-800 text-sm">
                      {samplePredictions[selectedSample].prediction === 'Approved' ? (
                        "The model approved this application primarily due to the high credit score (780) and substantial annual income ($85K). The low debt-to-income ratio (15%) further strengthened the positive prediction. These factors collectively indicate low default risk."
                      ) : (
                        "The model rejected this application mainly because of the low credit score (580) and high debt-to-income ratio (65%). The relatively low annual income ($32K) also contributed to the negative decision. These factors suggest high default risk."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Model Interpretation Summary */}
      <div className="bg-yellow-50 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-6 h-6 text-yellow-600 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">Key Insights</h3>
            <div className="space-y-2 text-yellow-800 text-sm">
              <p>• <strong>Credit Score</strong> is the most influential feature, accounting for 45% of prediction variance.</p>
              <p>• <strong>Feature interactions</strong> between Credit Score and Income show strong positive correlation (+0.18).</p>
              <p>• <strong>Age bias</strong> detected: Older applicants face slight disadvantage (-0.12 SHAP value).</p>
              <p>• <strong>Model behavior</strong> is generally interpretable with clear risk-based decision patterns.</p>
              <p>• <strong>Recommendation:</strong> Monitor age-related predictions for potential bias mitigation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};