import React, { useState, useCallback } from 'react';
import { Upload, FileText, Database, Brain, Play, AlertCircle, CheckCircle } from 'lucide-react';

interface UploadedFile {
  name: string;
  size: string;
  type: 'model' | 'dataset';
}

export const UploadSection: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('tensorflow');
  const [auditConfig, setAuditConfig] = useState({
    biasDetection: true,
    explainability: true,
    fairness: true,
    riskAssessment: true,
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, []);

  const handleFileUpload = (files: File[]) => {
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const newFiles = files.map(file => ({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.name.includes('.pkl') || file.name.includes('.h5') || file.name.includes('.joblib') ? 'model' as const : 'dataset' as const
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
    }, 2000);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(Array.from(e.target.files));
    }
  };

  const startAudit = () => {
    // Here you would trigger the actual audit process
    console.log('Starting audit with config:', auditConfig);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload & Audit</h1>
        <p className="text-gray-600 mt-2">Upload your ML models and datasets to begin compliance auditing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">File Upload</h3>
          
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop your files here, or <span className="text-blue-600">browse</span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Supports: .pkl, .joblib, .h5, .onnx (models), .csv, .json, .parquet (datasets)
            </p>
            <input
              type="file"
              multiple
              accept=".pkl,.joblib,.h5,.onnx,.csv,.json,.parquet"
              onChange={handleFileInputChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              Browse Files
            </label>
          </div>

          {isUploading && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-3"></div>
                <p className="text-blue-800">Uploading files...</p>
              </div>
            </div>
          )}

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Uploaded Files</h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {file.type === 'model' ? (
                        <Brain className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Database className="w-5 h-5 text-green-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-600">{file.size} • {file.type}</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Framework Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Framework</h3>
            <div className="grid grid-cols-2 gap-3">
              {['tensorflow', 'pytorch', 'sklearn', 'xgboost'].map((framework) => (
                <button
                  key={framework}
                  onClick={() => setSelectedFramework(framework)}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedFramework === framework
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium capitalize">{framework}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Audit Configuration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Configuration</h3>
            <div className="space-y-4">
              {Object.entries(auditConfig).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <p className="text-sm text-gray-600">
                      {key === 'biasDetection' && 'Detect bias across protected attributes'}
                      {key === 'explainability' && 'Generate SHAP explanations'}
                      {key === 'fairness' && 'Assess fairness metrics using Fairlearn'}
                      {key === 'riskAssessment' && 'Evaluate compliance risks'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setAuditConfig(prev => ({
                        ...prev,
                        [key]: e.target.checked
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Start Audit Button */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <button
              onClick={startAudit}
              disabled={uploadedFiles.length === 0}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Compliance Audit
            </button>
            {uploadedFiles.length === 0 && (
              <p className="text-sm text-gray-500 mt-2 text-center flex items-center justify-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Please upload at least one file to start auditing
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Supported File Formats */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Supported File Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Models</h4>
            <ul className="text-blue-700 space-y-1">
              <li>• Scikit-learn (.pkl, .joblib)</li>
              <li>• TensorFlow (.h5, .pb)</li>
              <li>• PyTorch (.pt, .pth)</li>
              <li>• ONNX (.onnx)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Datasets</h4>
            <ul className="text-blue-700 space-y-1">
              <li>• CSV files (.csv)</li>
              <li>• JSON files (.json)</li>
              <li>• Parquet files (.parquet)</li>
              <li>• Excel files (.xlsx)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};