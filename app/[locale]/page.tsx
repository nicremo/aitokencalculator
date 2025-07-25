'use client';

import React, { useState, useEffect } from 'react';
import { Settings, FileText, Type, Download, BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { TextInput } from '@/components/TextInput';
import { FileUpload } from '@/components/FileUpload';
import { ModelCard } from '@/components/ModelCard';
import { ModelSidebar } from '@/components/ModelSidebar';
import { analyzeText, TokenCount } from '@/lib/tokenCalculator';
import { getActiveModels, DEFAULT_ACTIVE_MODEL_IDS } from '@/lib/models';

interface Props {
  params: Promise<{ locale: string }>;
}

type TabType = 'text' | 'files';

export default function TokenCalculatorPage({}: Props) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<TabType>('text');
  const [inputText, setInputText] = useState('');
  const [tokenCounts, setTokenCounts] = useState<Record<string, TokenCount>>({});
  const [error, setError] = useState('');
  const [activeModelIds, setActiveModelIds] = useState<string[]>(DEFAULT_ACTIVE_MODEL_IDS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load active models from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('ai-token-calculator-active-models');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setActiveModelIds(parsed);
        }
      } catch {
        // Ignore parsing errors, use defaults
      }
    }
  }, []);

  // Save active models to localStorage
  useEffect(() => {
    localStorage.setItem('ai-token-calculator-active-models', JSON.stringify(activeModelIds));
  }, [activeModelIds]);

  // Calculate tokens when text or models change
  useEffect(() => {
    if (inputText.trim()) {
      const activeModels = getActiveModels(activeModelIds);
      const results = analyzeText(inputText, activeModels);
      setTokenCounts(results);
    } else {
      setTokenCounts({});
    }
  }, [inputText, activeModelIds]);

  const handleFileProcessed = (content: string) => {
    setInputText(content);
    setActiveTab('text'); // Switch to text tab to show results
    setError('');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleModelToggle = (modelId: string) => {
    setActiveModelIds(prev => {
      if (prev.includes(modelId)) {
        // Don't allow removing all models
        if (prev.length === 1) return prev;
        return prev.filter(id => id !== modelId);
      } else {
        return [...prev, modelId];
      }
    });
  };

  const handleResetToDefaults = () => {
    setActiveModelIds(DEFAULT_ACTIVE_MODEL_IDS);
  };

  const exportToCsv = () => {
    if (Object.keys(tokenCounts).length === 0) return;
    
    const activeModels = getActiveModels(activeModelIds);
    const csvRows = [
      ['Model', 'Provider', 'Tokens', 'Context Window', 'Percentage', 'Status', 'Estimated Cost ($)']
    ];
    
    activeModels.forEach(model => {
      const tokenCount = tokenCounts[model.id];
      if (tokenCount) {
        const cost = (tokenCount.tokens / 1000000) * model.pricing.input;
        csvRows.push([
          model.name,
          model.provider,
          tokenCount.tokens.toString(),
          model.contextWindow.toString(),
          tokenCount.percentage.toFixed(1) + '%',
          tokenCount.status,
          cost.toFixed(4)
        ]);
      }
    });
    
    const csvContent = csvRows.map(row => 
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'token-analysis.csv';
    link.click();
  };

  const activeModels = getActiveModels(activeModelIds);
  const hasResults = Object.keys(tokenCounts).length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('header.title')}</h1>
              <p className="text-lg text-gray-600 mt-1">{t('header.subtitle')}</p>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              <Settings className="h-4 w-4 transition-transform duration-300 hover:rotate-90" />
              <span>{t('results.customize')}</span>
              <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full transition-all duration-200">
                {t('modelLibrary.activeCount', { count: activeModelIds.length })}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('text')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 transform",
              activeTab === 'text' 
                ? "bg-white text-gray-900 shadow-sm scale-[1.02]" 
                : "text-gray-600 hover:text-gray-900 hover:scale-[1.01]"
            )}
          >
            <Type className="h-4 w-4 transition-transform duration-200" />
            {t('tabs.text')}
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 transform",
              activeTab === 'files' 
                ? "bg-white text-gray-900 shadow-sm scale-[1.02]" 
                : "text-gray-600 hover:text-gray-900 hover:scale-[1.01]"
            )}
          >
            <FileText className="h-4 w-4 transition-transform duration-200" />
            {t('tabs.files')}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Input Section */}
        <div className="mb-8 tab-transition">
          {activeTab === 'text' ? (
            <div className="animate-fadeIn">
              <TextInput 
                value={inputText}
                onChange={setInputText}
              />
            </div>
          ) : (
            <div className="animate-fadeIn">
              <FileUpload 
                onFilesProcessed={handleFileProcessed}
                onError={handleError}
              />
            </div>
          )}
        </div>

        {/* Results Section */}
        {hasResults && (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-gray-700" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  {t('results.title')}
                </h2>
              </div>
              <button
                onClick={exportToCsv}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm"
              >
                <Download className="h-4 w-4 transition-transform duration-200 hover:translate-y-0.5" />
                {t('results.export')}
              </button>
            </div>

            {/* Model Cards Grid */}
            <div className={cn(
              "grid gap-6 mb-12",
              activeModels.length === 1 && "grid-cols-1 max-w-md mx-auto",
              activeModels.length === 2 && "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto",
              activeModels.length === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
              activeModels.length >= 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            )}>
              {activeModels.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  tokenCount={tokenCounts[model.id]}
                />
              ))}
            </div>
          </>
        )}

        {/* Info Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('info.title')}</h3>
          <p className="text-gray-700 mb-6">{t('info.description')}</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">{t('info.rules.title')}</h4>
              <p className="text-sm text-gray-700">{t('info.rules.token')}</p>
              <p className="text-sm text-gray-700">{t('info.rules.words')}</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">{t('info.languages.title')}</h4>
              <p className="text-sm text-gray-700">{t('info.languages.description')}</p>
              <p className="text-sm text-gray-600 mt-1">{t('info.languages.note')}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">{t('info.multimodal.title')}</h4>
              <p className="text-sm text-gray-700">{t('info.multimodal.images')}</p>
              <p className="text-sm text-gray-700">{t('info.multimodal.audio')}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p className="flex items-center justify-center gap-1">
              Made with 
              <span className="text-red-500 animate-pulse">❤️</span>
              by 
              <a 
                href="https://fabian-bitzer.de/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Fabian Bitzer
              </a>
            </p>
          </div>
        </footer>
      </div>

      {/* Model Sidebar */}
      <ModelSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeModelIds={activeModelIds}
        onModelToggle={handleModelToggle}
        onResetToDefaults={handleResetToDefaults}
      />
    </div>
  );
}