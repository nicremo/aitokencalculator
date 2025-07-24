export type ModelProvider = 'Google' | 'OpenAI' | 'Anthropic' | 'Meta' | 'Mistral AI' | 'Cohere' | 'AI21' | 'Hugging Face' | 'Amazon' | 'Aleph Alpha';
export type ModelType = 'Proprietär' | 'Open Source';
export type ModelCategory = 'flagship' | 'standard' | 'lite' | 'specialized';

export interface LLMModel {
  id: string;
  name: string;
  provider: ModelProvider;
  type: ModelType;
  category: ModelCategory;
  contextWindow: number;
  maxOutput: number;
  description: string;
  releaseDate?: string;
  deprecated?: boolean;
  pricing: {
    input: number;  // $ per 1M tokens
    output: number; // $ per 1M tokens
  };
  calculateTokens: (text: string) => number;
  features?: string[];
  color?: string; // For UI theming
}

// Token calculation functions
const defaultTokenCalc = (text: string) => Math.ceil(text.length / 4);
const claudeTokenCalc = (text: string) => Math.ceil(text.length / 3.8);
const llamaTokenCalc = (text: string) => Math.ceil(text.length / 3.8);
const cohereTokenCalc = (text: string) => {
  // Cohere: 1 word ≈ 2-3 tokens
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.ceil(wordCount * 2.5);
};

export const ALL_MODELS: LLMModel[] = [
  // Google Models
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    type: 'Proprietär',
    category: 'flagship',
    contextWindow: 2000000,
    maxOutput: 65000,
    description: '2M Token Kontext, gestaffelte Preise',
    releaseDate: '2025-03',
    pricing: { input: 1.25, output: 10.0 }, // Preis für ≤200k Token
    calculateTokens: defaultTokenCalc,
    features: ['Multimodal', '2M Kontext', 'Preis >200k: $2.50/$15.00'],
    color: 'emerald'
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    type: 'Proprietär',
    category: 'lite',
    contextWindow: 1000000,
    maxOutput: 8192,
    description: 'Schnelles Modell, Audio 3x teurer',
    releaseDate: '2025-01',
    pricing: { input: 0.30, output: 2.50 },
    calculateTokens: defaultTokenCalc,
    features: ['Schnell', 'Audio: $1.00/MTok Input'],
    color: 'emerald'
  },
  {
    id: 'gemini-2.5-flash-lite',
    name: 'Gemini 2.5 Flash-Lite',
    provider: 'Google',
    type: 'Proprietär',
    category: 'lite',
    contextWindow: 1000000,
    maxOutput: 8192,
    description: 'Kostengünstigste Gemini Option',
    releaseDate: '2025-01',
    pricing: { input: 0.10, output: 0.40 },
    calculateTokens: defaultTokenCalc,
    features: ['Sehr günstig', 'Audio: $0.30/MTok'],
    color: 'emerald'
  },

  // OpenAI Models
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    type: 'Proprietär',
    category: 'flagship',
    contextWindow: 128000,
    maxOutput: 16384,
    description: '128K Token Kontext, Multimodal',
    releaseDate: '2024-05',
    pricing: { input: 2.5, output: 10.0 },
    calculateTokens: defaultTokenCalc,
    features: ['Multimodal', 'Cached Input: $1.25/MTok'],
    color: 'blue'
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    type: 'Proprietär',
    category: 'standard',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'Vorgänger von GPT-4o',
    releaseDate: '2023-11',
    pricing: { input: 10.0, output: 30.0 },
    calculateTokens: defaultTokenCalc,
    features: ['Vision', 'JSON Mode'],
    color: 'blue'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    type: 'Proprietär',
    category: 'lite',
    contextWindow: 128000,
    maxOutput: 16384,
    description: 'Kleines, schnelles Modell',
    releaseDate: '2024-07',
    pricing: { input: 0.15, output: 0.60 },
    calculateTokens: defaultTokenCalc,
    features: ['Kostengünstig', 'Schnell', 'Cached: $0.075/MTok'],
    color: 'blue'
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    provider: 'OpenAI',
    type: 'Proprietär',
    category: 'flagship',
    contextWindow: 128000,
    maxOutput: 16384,
    description: 'Neueste Generation, optimiert',
    releaseDate: '2025-01',
    pricing: { input: 2.0, output: 8.0 },
    calculateTokens: defaultTokenCalc,
    features: ['Verbesserte Leistung', 'Cached: $0.50/MTok'],
    color: 'blue'
  },
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 mini',
    provider: 'OpenAI',
    type: 'Proprietär',
    category: 'standard',
    contextWindow: 128000,
    maxOutput: 16384,
    description: 'Kompakte Version von GPT-4.1',
    releaseDate: '2025-01',
    pricing: { input: 0.40, output: 1.60 },
    calculateTokens: defaultTokenCalc,
    features: ['Ausgewogen', 'Cached: $0.10/MTok'],
    color: 'blue'
  },
  {
    id: 'gpt-4.1-nano',
    name: 'GPT-4.1 nano',
    provider: 'OpenAI',
    type: 'Proprietär',
    category: 'lite',
    contextWindow: 128000,
    maxOutput: 16384,
    description: 'Ultra-effiziente Variante',
    releaseDate: '2025-01',
    pricing: { input: 0.10, output: 0.40 },
    calculateTokens: defaultTokenCalc,
    features: ['Sehr günstig', 'Cached: $0.025/MTok'],
    color: 'blue'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    type: 'Proprietär',
    category: 'lite',
    contextWindow: 16385,
    maxOutput: 4096,
    description: 'Legacy Modell, sehr schnell',
    releaseDate: '2022-11',
    pricing: { input: 0.50, output: 1.50 },
    calculateTokens: defaultTokenCalc,
    features: ['Schnell', 'Günstig'],
    color: 'blue',
    deprecated: true
  },

  // Anthropic Models
  {
    id: 'claude-4-opus',
    name: 'Claude 4 Opus',
    provider: 'Anthropic',
    type: 'Proprietär',
    category: 'flagship',
    contextWindow: 200000,
    maxOutput: 128000,
    description: 'Neuestes und stärkstes Modell',
    releaseDate: '2025-05',
    pricing: { input: 15.0, output: 75.0 },
    calculateTokens: claudeTokenCalc,
    features: ['Batch: 50% Rabatt', 'Cache Write: $18.75', 'Cache Read: $1.50'],
    color: 'purple'
  },
  {
    id: 'claude-4-sonnet',
    name: 'Claude 4 Sonnet',
    provider: 'Anthropic',
    type: 'Proprietär',
    category: 'standard',
    contextWindow: 200000,
    maxOutput: 128000,
    description: 'Ausgewogene Leistung',
    releaseDate: '2025-05',
    pricing: { input: 3.0, output: 15.0 },
    calculateTokens: claudeTokenCalc,
    features: ['Batch: 50% Rabatt', 'Cache Write: $3.75', 'Cache Read: $0.30'],
    color: 'purple'
  },
  {
    id: 'claude-3.5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    type: 'Proprietär',
    category: 'lite',
    contextWindow: 200000,
    maxOutput: 8192,
    description: 'Schnell und effizient',
    releaseDate: '2024-11',
    pricing: { input: 0.80, output: 4.0 },
    calculateTokens: claudeTokenCalc,
    features: ['Höchste Geschwindigkeit', 'Cache Read: $0.08'],
    color: 'purple'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    type: 'Proprietär',
    category: 'flagship',
    contextWindow: 200000,
    maxOutput: 4096,
    description: 'Vorherige Generation Flagship',
    releaseDate: '2024-03',
    pricing: { input: 15.0, output: 75.0 },
    calculateTokens: claudeTokenCalc,
    features: ['Batch verfügbar', 'Cache: $18.75/$1.50'],
    color: 'purple'
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    type: 'Proprietär',
    category: 'lite',
    contextWindow: 200000,
    maxOutput: 4096,
    description: 'Legacy schnelles Modell',
    releaseDate: '2024-03',
    pricing: { input: 0.25, output: 1.25 },
    calculateTokens: claudeTokenCalc,
    features: ['Batch: $0.125/$0.625', 'Cache: $0.30/$0.03'],
    color: 'purple'
  },

  // Meta Models
  {
    id: 'llama-3.1-405b',
    name: 'Llama 3.1 405B',
    provider: 'Meta',
    type: 'Open Source',
    category: 'flagship',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'Größtes Open-Source Modell',
    releaseDate: '2024-07',
    pricing: { input: 2.70, output: 2.70 }, // Via Provider
    calculateTokens: llamaTokenCalc,
    features: ['AWS Bedrock verfügbar', 'Self-hosting möglich'],
    color: 'sky'
  },
  {
    id: 'llama-3.1-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    type: 'Open Source',
    category: 'standard',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'AWS: $1.40/$1.80 per 1k Token',
    releaseDate: '2024-07',
    pricing: { input: 1.40, output: 1.80 }, // AWS Bedrock Preis
    calculateTokens: llamaTokenCalc,
    features: ['Provisioned: $20/h (6mo)', 'Azure MaaS verfügbar'],
    color: 'sky'
  },
  {
    id: 'llama-3.1-8b',
    name: 'Llama 3.1 8B',
    provider: 'Meta',
    type: 'Open Source',
    category: 'lite',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'Edge-Deployment möglich',
    releaseDate: '2024-07',
    pricing: { input: 0.22, output: 0.22 }, // Durchschnitt verschiedener Provider
    calculateTokens: llamaTokenCalc,
    features: ['Self-hosting optimal', 'Niedrige Hardware-Anforderungen'],
    color: 'sky'
  },

  // Mistral AI Models
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    type: 'Proprietär',
    category: 'flagship',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'Flaggschiff, 80% Preissenkung!',
    releaseDate: '2024-02',
    pricing: { input: 2.0, output: 6.0 },
    calculateTokens: defaultTokenCalc,
    features: ['Mehrsprachig', 'Starke Preissenkung Sept 2024'],
    color: 'orange'
  },
  {
    id: 'mistral-medium-3',
    name: 'Mistral Medium 3',
    provider: 'Mistral AI',
    type: 'Proprietär',
    category: 'standard',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'Neue Mittelklasse',
    releaseDate: '2024-09',
    pricing: { input: 0.40, output: 2.0 },
    calculateTokens: defaultTokenCalc,
    features: ['Ausgewogen', 'Preis-Leistung'],
    color: 'orange'
  },
  {
    id: 'mistral-small-3.2',
    name: 'Mistral Small 3.2',
    provider: 'Mistral AI',
    type: 'Open Source',
    category: 'lite',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'Open Source, Apache 2.0',
    releaseDate: '2024-10',
    pricing: { input: 0.10, output: 0.30 },
    calculateTokens: defaultTokenCalc,
    features: ['Open Source', 'Sehr günstig'],
    color: 'orange'
  },
  {
    id: 'mistral-small-new',
    name: 'Mistral Small (New)',
    provider: 'Mistral AI',
    type: 'Proprietär',
    category: 'lite',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'Neue kleine Version',
    releaseDate: '2024-09',
    pricing: { input: 0.20, output: 0.60 },
    calculateTokens: defaultTokenCalc,
    features: ['Effizient', 'Schnell'],
    color: 'orange'
  },
  {
    id: 'mistral-nemo',
    name: 'Mistral Nemo',
    provider: 'Mistral AI',
    type: 'Proprietär',
    category: 'standard',
    contextWindow: 128000,
    maxOutput: 4096,
    description: '12B Parameter, Fine-tuning möglich',
    releaseDate: '2024-07',
    pricing: { input: 0.15, output: 0.15 },
    calculateTokens: defaultTokenCalc,
    features: ['Fine-tuning: $1/MTok', 'Gleicher Input/Output Preis'],
    color: 'orange'
  },
  {
    id: 'codestral',
    name: 'Codestral',
    provider: 'Mistral AI',
    type: 'Proprietär',
    category: 'specialized',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'Spezialisiert auf Code',
    releaseDate: '2024-05',
    pricing: { input: 0.20, output: 0.60 },
    calculateTokens: defaultTokenCalc,
    features: ['Code-Spezialist', 'Mehrere Programmiersprachen'],
    color: 'orange'
  },
  {
    id: 'mixtral-8x22b',
    name: 'Mixtral 8x22B',
    provider: 'Mistral AI',
    type: 'Open Source',
    category: 'flagship',
    contextWindow: 65536,
    maxOutput: 4096,
    description: 'MoE Modell mit 176B Parametern',
    releaseDate: '2024-04',
    pricing: { input: 1.2, output: 1.2 },
    calculateTokens: defaultTokenCalc,
    features: ['MoE Architektur', 'Open Source'],
    color: 'orange'
  },
  {
    id: 'mixtral-8x7b',
    name: 'Mixtral 8x7B',
    provider: 'Mistral AI',
    type: 'Open Source',
    category: 'standard',
    contextWindow: 32768,
    maxOutput: 4096,
    description: 'MoE Modell mit 46.7B Parametern',
    releaseDate: '2023-12',
    pricing: { input: 0.24, output: 0.24 },
    calculateTokens: defaultTokenCalc,
    features: ['MoE Architektur', 'Schnell'],
    color: 'orange'
  },

  // Cohere Models
  {
    id: 'command-r-plus',
    name: 'Command R+',
    provider: 'Cohere',
    type: 'Proprietär',
    category: 'flagship',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'Für komplexe RAG-Workflows',
    releaseDate: '2024-04',
    pricing: { input: 2.5, output: 10.0 },
    calculateTokens: cohereTokenCalc,
    features: ['RAG-optimiert', 'Tool Use', 'Mehrsprachig'],
    color: 'teal'
  },
  {
    id: 'command-r',
    name: 'Command R',
    provider: 'Cohere',
    type: 'Proprietär',
    category: 'standard',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'Effizientes RAG-Modell',
    releaseDate: '2024-03',
    pricing: { input: 0.15, output: 0.60 },
    calculateTokens: cohereTokenCalc,
    features: ['RAG-optimiert', 'Embed/Rerank Integration'],
    color: 'teal'
  },
  {
    id: 'command-r7b',
    name: 'Command R7B',
    provider: 'Cohere',
    type: 'Proprietär',
    category: 'lite',
    contextWindow: 128000,
    maxOutput: 4096,
    description: 'Kostengünstigste Option',
    releaseDate: '2024-06',
    pricing: { input: 0.0375, output: 0.15 },
    calculateTokens: cohereTokenCalc,
    features: ['Sehr günstig', 'Schnell'],
    color: 'teal'
  },

  // Amazon Models
  {
    id: 'amazon-titan-express',
    name: 'Titan Express',
    provider: 'Amazon',
    type: 'Proprietär',
    category: 'lite',
    contextWindow: 8192,
    maxOutput: 4096,
    description: 'AWS Bedrock Modell',
    releaseDate: '2023-09',
    pricing: { input: 0.2, output: 0.6 },
    calculateTokens: defaultTokenCalc,
    features: ['AWS Integration', 'Günstig'],
    color: 'amber'
  },

  // AI21 Models
  {
    id: 'jamba-1.5-large',
    name: 'Jamba 1.5 Large',
    provider: 'AI21',
    type: 'Proprietär',
    category: 'flagship',
    contextWindow: 256000,
    maxOutput: 4096,
    description: 'Hybrid SSM-Transformer',
    releaseDate: '2024-08',
    pricing: { input: 2.0, output: 8.0 },
    calculateTokens: defaultTokenCalc,
    features: ['256K Kontext', 'Mamba Architektur'],
    color: 'indigo'
  },
  {
    id: 'jamba-1.5-mini',
    name: 'Jamba 1.5 Mini',
    provider: 'AI21',
    type: 'Proprietär',
    category: 'lite',
    contextWindow: 256000,
    maxOutput: 4096,
    description: 'Kleines Mamba Modell',
    releaseDate: '2024-08',
    pricing: { input: 0.2, output: 0.4 },
    calculateTokens: defaultTokenCalc,
    features: ['256K Kontext', 'Effizient'],
    color: 'indigo'
  }
];

// Default active models (updated to new models)
export const DEFAULT_ACTIVE_MODEL_IDS = [
  'gemini-2.5-pro',
  'gpt-4o',
  'claude-4-sonnet'
];

// Helper functions
export function getModelsByProvider(provider: ModelProvider): LLMModel[] {
  return ALL_MODELS.filter(model => model.provider === provider);
}

export function getActiveModels(activeIds: string[]): LLMModel[] {
  return ALL_MODELS.filter(model => activeIds.includes(model.id));
}

export function searchModels(query: string): LLMModel[] {
  const searchTerm = query.toLowerCase();
  return ALL_MODELS.filter(model => 
    model.name.toLowerCase().includes(searchTerm) ||
    model.provider.toLowerCase().includes(searchTerm) ||
    model.description.toLowerCase().includes(searchTerm)
  );
}