'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { X, Search, Settings, RotateCcw, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { 
  ALL_MODELS, 
  ModelProvider, 
  ModelType, 
  LLMModel, 
  searchModels
} from '@/lib/models';

interface ModelSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeModelIds: string[];
  onModelToggle: (modelId: string) => void;
  onResetToDefaults: () => void;
}

const PROVIDERS: ModelProvider[] = [
  'Google', 'OpenAI', 'Anthropic', 'Meta', 'Mistral AI', 
  'Cohere', 'AI21', 'Amazon', 'Hugging Face', 'Aleph Alpha'
];

export function ModelSidebar({ 
  isOpen, 
  onClose, 
  activeModelIds, 
  onModelToggle,
  onResetToDefaults 
}: ModelSidebarProps) {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<ModelProvider | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ModelType | 'all'>('all');
  const [showDeprecated] = useState(false);
  const [expandedProviders, setExpandedProviders] = useState<Set<ModelProvider>>(new Set());

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Filter models based on search and filters
  const filteredModels = useMemo(() => {
    let models = searchQuery ? searchModels(searchQuery) : ALL_MODELS;
    
    if (selectedProvider !== 'all') {
      models = models.filter(m => m.provider === selectedProvider);
    }
    
    if (selectedType !== 'all') {
      models = models.filter(m => m.type === selectedType);
    }
    
    if (!showDeprecated) {
      models = models.filter(m => !m.deprecated);
    }
    
    return models;
  }, [searchQuery, selectedProvider, selectedType, showDeprecated]);

  // Group models by provider
  const groupedModels = useMemo(() => {
    const groups: Record<ModelProvider, LLMModel[]> = {} as Record<ModelProvider, LLMModel[]>;
    
    filteredModels.forEach(model => {
      if (!groups[model.provider]) {
        groups[model.provider] = [];
      }
      groups[model.provider].push(model);
    });
    
    return groups;
  }, [filteredModels]);

  // Check if provider has any active models
  const providerHasActiveModels = (provider: ModelProvider) => {
    const models = groupedModels[provider] || [];
    return models.some(model => activeModelIds.includes(model.id));
  };

  // Toggle provider expansion
  const toggleProvider = (provider: ModelProvider) => {
    setExpandedProviders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(provider)) {
        newSet.delete(provider);
      } else {
        newSet.add(provider);
      }
      return newSet;
    });
  };

  // Auto-expand providers with active models on first load
  useEffect(() => {
    const providersWithActiveModels = new Set<ModelProvider>();
    activeModelIds.forEach(modelId => {
      const model = ALL_MODELS.find(m => m.id === modelId);
      if (model) {
        providersWithActiveModels.add(model.provider);
      }
    });
    setExpandedProviders(providersWithActiveModels);
  }, [activeModelIds]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 overscroll-contain transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        onWheel={(e) => e.preventDefault()}
      />
      
      {/* Sidebar */}
      <div className={cn(
        "fixed right-0 top-0 h-full w-[420px] bg-white shadow-xl border-l border-gray-100 z-50",
        "transform transition-all duration-300 ease-out",
        "flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gray-50 rounded-md">
              <Settings className="h-4 w-4 text-gray-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900">{t('modelLibrary.title')}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-50 rounded-md transition-all duration-150 group hover:scale-110"
          >
            <X className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-all duration-150 group-hover:rotate-90" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 space-y-3 border-b border-gray-50">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('modelLibrary.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value as ModelProvider | 'all')}
              className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
            >
              <option value="all">{t('modelLibrary.filters.allProviders')}</option>
              {PROVIDERS.map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ModelType | 'all')}
              className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
            >
              <option value="all">{t('modelLibrary.filters.allTypes')}</option>
              <option value="Proprietär">{t('modelLibrary.filters.proprietary')}</option>
              <option value="Open Source">{t('modelLibrary.filters.openSource')}</option>
            </select>
          </div>
        </div>

        {/* Model List */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-6" onWheel={(e) => e.stopPropagation()}>
          {Object.entries(groupedModels).length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium">{t('modelLibrary.noResults')}</p>
              <p className="text-sm mt-2">{t('modelLibrary.noResultsHint')}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedModels).map(([provider, models]) => (
                <div key={provider} className="space-y-3">
                  {/* Provider Header */}
                  <button
                    onClick={() => toggleProvider(provider as ModelProvider)}
                    className="w-full flex items-center gap-2 py-2 px-1 hover:bg-gray-25 rounded-md transition-all duration-150 group"
                  >
                    <div className="p-0.5 transition-transform duration-200 group-hover:scale-110">
                      {expandedProviders.has(provider as ModelProvider) ? (
                        <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200" />
                      )}
                    </div>
                    <div className={cn(
                      "h-4 w-4 rounded-sm flex items-center justify-center transition-all duration-200",
                      providerHasActiveModels(provider as ModelProvider) 
                        ? "bg-gray-800 text-white" 
                        : "bg-gray-100 text-gray-400"
                    )}>
                      {providerHasActiveModels(provider as ModelProvider) && (
                        <Check className="h-2.5 w-2.5" />
                      )}
                    </div>
                    <h3 className="font-medium text-sm text-gray-800 text-left">{provider}</h3>
                    <span className="text-xs text-gray-400 ml-auto">({models.length})</span>
                  </button>

                  {/* Models - Animated expand/collapse */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-out ml-6",
                    expandedProviders.has(provider as ModelProvider) 
                      ? "max-h-[2000px] opacity-100" 
                      : "max-h-0 opacity-0"
                  )}>
                    <div className="space-y-1 pt-1 pb-2">
                      {models.map(model => (
                        <label
                          key={model.id}
                          className={cn(
                            "flex items-start gap-2.5 p-2 rounded-md cursor-pointer transition-all duration-150 group",
                            activeModelIds.includes(model.id) 
                              ? "bg-gray-50 hover:bg-gray-75" 
                              : "hover:bg-gray-25",
                            model.deprecated && "opacity-50"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={activeModelIds.includes(model.id)}
                            onChange={() => onModelToggle(model.id)}
                            className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-gray-800 focus:ring-gray-800 focus:ring-1"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={cn(
                                "text-sm font-medium truncate",
                                activeModelIds.includes(model.id) ? "text-gray-900" : "text-gray-700"
                              )}>
                                {model.name}
                              </span>
                              {activeModelIds.includes(model.id) && (
                                <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{t('modelLibrary.active')}</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{model.description}</p>
                            <div className="flex items-center gap-2.5 mt-1 text-[10px] text-gray-400">
                              <span>{(model.contextWindow / 1000).toFixed(0)}K</span>
                              <span className={cn(
                                "px-1.5 py-0.5 rounded text-[9px] font-medium",
                                model.type === 'Open Source' 
                                  ? "bg-green-50 text-green-600" 
                                  : "bg-gray-100 text-gray-600"
                              )}>
                                {model.type === 'Open Source' ? 'OS' : 'Pro'}
                              </span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-25">
          <button
            onClick={onResetToDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 hover:bg-white rounded-md transition-all duration-150"
          >
            <RotateCcw className="h-3 w-3" />
            <span>{t('modelLibrary.resetDefaults')}</span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">
              {t('modelLibrary.selectedCount', { count: activeModelIds.length })}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-800 transition-colors duration-150"
            >
              {t('modelLibrary.done')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}