import { LLMModel } from './models';

export interface TokenCount {
  modelId: string;
  tokens: number;
  percentage: number;
  status: 'fits' | 'tight' | 'exceeds';
  message: string;
  overflow?: number;
}

// Token calculation using model's specific function
export function calculateTokens(text: string, model: LLMModel): number {
  return model.calculateTokens(text);
}

// Calculate tokens for different file types
export function calculateFileTokens(content: string, fileType: string, model: LLMModel): number {
  const baseTokens = calculateTokens(content, model);
  
  // Add overhead for formatting in certain file types
  switch (fileType) {
    case 'pdf':
      // PDFs might have formatting overhead
      return Math.ceil(baseTokens * 1.1);
    case 'docx':
      // Word docs might have formatting overhead
      return Math.ceil(baseTokens * 1.05);
    default:
      return baseTokens;
  }
}

// Calculate tokens for images (rough estimation)
export function calculateImageTokens(width: number, height: number): number {
  // Rough estimation: small images ~200 tokens, medium ~500, large ~800
  const pixels = width * height;
  if (pixels < 250000) return 200;  // < 500x500
  if (pixels < 1000000) return 500; // < 1000x1000
  return 800; // larger images
}

// Calculate tokens for audio
export function calculateAudioTokens(durationSeconds: number): number {
  // Gemini processes audio at ~32 tokens per second
  return Math.ceil(durationSeconds * 32);
}

// Get status and message for token count
export function getTokenStatus(tokenCount: number, model: LLMModel): {
  status: 'fits' | 'tight' | 'exceeds';
  percentage: number;
  overflow?: number;
} {
  const percentage = (tokenCount / model.contextWindow) * 100;
  
  if (percentage <= 60) {
    return {
      status: 'fits',
      percentage
    };
  } else if (percentage <= 85) {
    return {
      status: 'tight',
      percentage
    };
  } else if (percentage <= 100) {
    return {
      status: 'tight',
      percentage
    };
  } else {
    const overflow = tokenCount - model.contextWindow;
    return {
      status: 'exceeds',
      percentage,
      overflow
    };
  }
}

// Analyze text for given models
export function analyzeText(text: string, models: LLMModel[]): Record<string, TokenCount> {
  const results: Record<string, TokenCount> = {};
  
  models.forEach((model) => {
    const tokens = calculateTokens(text, model);
    const { status, percentage, overflow } = getTokenStatus(tokens, model);
    
    results[model.id] = {
      modelId: model.id,
      tokens,
      percentage,
      status,
      message: '',
      overflow
    };
  });
  
  return results;
}

// Format number with locale
export function formatNumber(num: number): string {
  return num.toLocaleString('de-DE');
}

// Estimate API costs (rough estimation)
export function estimateApiCost(tokens: number, model: LLMModel): number {
  const costPer1M = model.pricing.input;
  return (tokens / 1000000) * costPer1M;
}