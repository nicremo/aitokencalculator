# AI Token Calculator - Vollständige Projektdokumentation

## Inhaltsverzeichnis

1. [Projektübersicht](#projektübersicht)
2. [Problemstellung & Lösung](#problemstellung--lösung)
3. [Token-Grundlagen](#token-grundlagen)
4. [Unterstützte KI-Modelle](#unterstützte-ki-modelle)
5. [Berechnungslogik](#berechnungslogik)
6. [Technische Architektur](#technische-architektur)
7. [Komponenten-Dokumentation](#komponenten-dokumentation)
8. [API & Kostenberechnung](#api--kostenberechnung)
9. [Bekannte Einschränkungen](#bekannte-einschränkungen)
10. [Zukünftige Entwicklung](#zukünftige-entwicklung)

---

## Projektübersicht

**AI Token Calculator** ist eine Web-Anwendung, die Nutzern hilft zu verstehen, ob ihre Texte, Dokumente oder multimediale Inhalte in das Kontextfenster verschiedener KI-Modelle passen.

### Kernfunktionen

- **Token-Berechnung**: Schätzt die Anzahl der Tokens für Text in verschiedenen KI-Modellen
- **Multi-Modell-Vergleich**: Zeigt gleichzeitig Ergebnisse für Gemini 2.5 Pro, GPT-4o und Claude Sonnet 4
- **Datei-Support**: Verarbeitet TXT, MD, PDF, DOCX und Bilddateien
- **Visuelle Darstellung**: Fortschrittsbalken zeigen die Auslastung des Kontextfensters
- **Kostenprognose**: Schätzt API-Kosten basierend auf aktuellen Preisen
- **Export-Funktion**: CSV-Export für weitere Analysen

### Zielgruppe

- Entwickler, die mit KI-APIs arbeiten
- Content-Ersteller, die lange Texte an KI-Modelle senden
- Unternehmen, die API-Kosten kalkulieren müssen
- Forscher, die mit großen Dokumenten arbeiten

---

## Problemstellung & Lösung

### Das Problem

Jedes KI-Modell hat ein begrenztes "Kontextfenster" - die maximale Anzahl von Tokens, die es gleichzeitig verarbeiten kann. Die Herausforderungen:

1. **Unklarheit über Token-Größe**: Ein Token ist nicht gleich einem Wort
2. **Modell-Unterschiede**: Jedes Modell tokenisiert Text anders
3. **Kostenüberraschungen**: API-Kosten basieren auf Token-Anzahl
4. **Überschreitungen**: Zu lange Texte werden abgeschnitten oder abgelehnt

### Die Lösung

Der AI Token Calculator löst diese Probleme durch:

- **Sofortige Schätzung**: Live-Berechnung während der Eingabe
- **Paralleler Vergleich**: Alle großen Modelle auf einen Blick
- **Visuelle Warnung**: Farbcodierte Statusanzeige (Grün/Gelb/Rot)
- **Präventive Kostenanalyse**: Zeigt geschätzte Kosten vor dem API-Aufruf

---

## Token-Grundlagen

### Was ist ein Token?

Ein Token ist die kleinste Verarbeitungseinheit eines Sprachmodells. Es kann sein:
- Ein ganzes Wort ("Hallo")
- Ein Wortteil ("un" in "unmöglich")
- Ein Satzzeichen (".", "!", "?")
- Ein Leerzeichen oder Sonderzeichen

### Token-Charakteristiken

```
Beispiel-Tokenisierung:
"Künstliche Intelligenz" → ["Kün", "st", "liche", " ", "Int", "elli", "gen", "z"]
(1 Begriff = 8 Tokens)
```

### Sprachunterschiede

- **Englisch**: Effizienteste Tokenisierung (1 Token ≈ 0.75 Wörter)
- **Deutsch**: ~15% mehr Tokens durch längere Komposita
- **Chinesisch/Japanisch**: Oft 1 Token pro Zeichen
- **Code**: Variable Effizienz je nach Programmiersprache

---

## Unterstützte KI-Modelle

### 1. Google Gemini 2.5 Pro

```typescript
{
  name: 'Gemini 2.5 Pro',
  provider: 'Google',
  contextWindow: 1_000_000,  // 1 Million Tokens
  maxOutput: 64_000,         // 64K Tokens Output
  tokenCalculation: '~4 Zeichen pro Token',
  specialFeatures: [
    '2 Millionen Token Kontext coming soon',
    'Multimodal (Text, Bild, Audio, Video)',
    'Audio: 32 Tokens/Sekunde',
    'Video: 263 Tokens/Sekunde',
    '100% Token-Recall bis 530K Tokens'
  ],
  pricing: {
    input: 3.50,   // $ pro 1M Tokens
    output: 10.50  // $ pro 1M Tokens
  }
}
```

### 2. OpenAI GPT-4o

```typescript
{
  name: 'GPT-4o',
  provider: 'OpenAI',
  contextWindow: 128_000,    // 128K Tokens gesamt
  maxOutput: 4_096,          // Standard, bis zu 64K in Spezialversionen
  tokenCalculation: '~4 Zeichen pro Token',
  variants: {
    'gpt-4o': { maxOutput: 4_096 },
    'gpt-4o-mini': { maxOutput: 16_000 },
    'gpt-4o-long-output': { maxOutput: 64_000 }
  },
  specialFeatures: [
    'Verbesserter Tokenizer für Nicht-Englisch',
    'Multimodal (Text, Bild)',
    'Konsistente Performance'
  ],
  pricing: {
    input: 10.00,  // $ pro 1M Tokens
    output: 30.00  // $ pro 1M Tokens
  }
}
```

### 3. Anthropic Claude Sonnet 4

```typescript
{
  name: 'Claude Sonnet 4',
  provider: 'Anthropic',
  contextWindow: 200_000,    // 200K Standard, 500K Enterprise
  maxOutput: 64_000,         // 64K Tokens Output
  tokenCalculation: '~3.5 Zeichen pro Token',
  specialFeatures: [
    'Hybrid-Modell mit Extended Thinking',
    'Tool Use während des Denkens',
    'Interleaved Thinking zwischen Tool-Calls',
    '500 Seiten Text ≈ 200K Tokens'
  ],
  pricing: {
    input: 3.00,   // $ pro 1M Tokens
    output: 15.00  // $ pro 1M Tokens
  }
}
```

---

## Berechnungslogik

### Basis-Token-Berechnung

```typescript
// Grundformel für Text-Token-Schätzung
function calculateTokens(text: string, modelId: string): number {
  const charCount = text.length;
  
  switch (modelId) {
    case 'gemini25pro':
      // Gemini: ~4 Zeichen pro Token
      return Math.ceil(charCount / 4);
    
    case 'gpt4o':
      // GPT-4o: ~4 Zeichen pro Token
      return Math.ceil(charCount / 4);
    
    case 'claudesonnet4':
      // Claude: etwas mehr Tokens, ~3.5 Zeichen pro Token
      return Math.ceil(charCount / 3.5);
  }
}
```

### Erweiterte Berechnungen

#### 1. Sprachspezifische Anpassungen

```typescript
function adjustForLanguage(baseTokens: number, language: string): number {
  const multipliers = {
    'de': 1.15,  // Deutsch: +15%
    'fr': 1.10,  // Französisch: +10%
    'es': 1.08,  // Spanisch: +8%
    'zh': 1.50,  // Chinesisch: +50%
    'ja': 1.40,  // Japanisch: +40%
    'en': 1.00   // Englisch: Basis
  };
  
  return Math.ceil(baseTokens * (multipliers[language] || 1.0));
}
```

#### 2. Dateiformat-Overhead

```typescript
function calculateFileTokens(content: string, fileType: string, modelId: string): number {
  let baseTokens = calculateTokens(content, modelId);
  
  // Formatierungs-Overhead berücksichtigen
  switch (fileType) {
    case 'pdf':
      return Math.ceil(baseTokens * 1.1);  // +10% für PDF-Struktur
    case 'docx':
      return Math.ceil(baseTokens * 1.05); // +5% für Word-Formatierung
    default:
      return baseTokens;
  }
}
```

#### 3. Multimediale Inhalte

```typescript
// Bild-Token-Berechnung (Schätzung)
function calculateImageTokens(width: number, height: number): number {
  const pixels = width * height;
  
  if (pixels < 250_000) return 200;   // Klein: <500x500
  if (pixels < 1_000_000) return 500; // Mittel: <1000x1000
  return 800;                          // Groß: >1000x1000
}

// Audio-Token-Berechnung (Gemini-spezifisch)
function calculateAudioTokens(durationSeconds: number): number {
  return Math.ceil(durationSeconds * 32); // 32 Tokens pro Sekunde
}

// Video-Token-Berechnung (Gemini-spezifisch)
function calculateVideoTokens(durationSeconds: number): number {
  return Math.ceil(durationSeconds * 263); // 263 Tokens pro Sekunde
}
```

### Status-Bewertung

```typescript
function getTokenStatus(tokenCount: number, contextWindow: number) {
  const percentage = (tokenCount / contextWindow) * 100;
  
  if (percentage <= 60) {
    return {
      status: 'fits',
      color: 'green',
      message: '✅ Problemlos! Viel Platz verfügbar.'
    };
  } else if (percentage <= 85) {
    return {
      status: 'tight',
      color: 'yellow',
      message: '⚠️ Passt noch, aber wird knapp.'
    };
  } else if (percentage <= 100) {
    return {
      status: 'tight',
      color: 'orange',
      message: '⚠️ Sehr knapp! Fast am Limit.'
    };
  } else {
    return {
      status: 'exceeds',
      color: 'red',
      message: `❌ Zu groß! Überschreitet um ${tokenCount - contextWindow} Tokens.`
    };
  }
}
```

---

## Technische Architektur

### Tech Stack

```yaml
Frontend Framework: Next.js 15 (App Router)
Sprache: TypeScript 5.x
Styling: Tailwind CSS 3.x
UI Components: 
  - Lucide React (Icons)
  - React Dropzone (File Upload)
State Management: React Hooks (useState, useEffect)
Build Tool: Turbopack/Webpack
Package Manager: npm
```

### Projekt-Struktur

```
token-calculator/
├── app/
│   ├── page.tsx          # Hauptseite mit Application Logic
│   ├── layout.tsx        # Root Layout
│   └── globals.css       # Globale Styles
├── components/
│   ├── TextInput.tsx     # Texteingabe mit Live-Statistik
│   ├── FileUpload.tsx    # Drag & Drop Datei-Upload
│   └── ModelCard.tsx     # Modell-Ergebniskarte
├── lib/
│   ├── tokenCalculator.ts # Token-Berechnungslogik
│   └── utils.ts          # Utility Functions
└── public/               # Statische Assets
```

### Architektur-Prinzipien

1. **Client-Side Rendering**: Alle Berechnungen laufen im Browser
2. **Reaktive Updates**: Sofortige Neuberechnung bei Eingabeänderung
3. **Komponentenbasiert**: Modulare, wiederverwendbare UI-Komponenten
4. **Type Safety**: Vollständige TypeScript-Typisierung
5. **Responsive Design**: Mobile-first Ansatz

---

## Komponenten-Dokumentation

### 1. TextInput Component

**Zweck**: Haupteingabefeld mit Live-Statistiken

```typescript
interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Features:
- Auto-resize Textarea
- Live Character/Word/Token Count
- Floating Statistics Badge
- Optimierte Performance durch debouncing
```

### 2. FileUpload Component

**Zweck**: Drag & Drop Datei-Upload mit Vorschau

```typescript
interface FileUploadProps {
  onFilesProcessed: (content: string, fileType: string) => void;
  onError: (error: string) => void;
}

// Features:
- Multi-File Support
- Drag & Drop Zone
- Dateiformat-Validierung
- Visuelle Upload-States
- Error Handling
```

### 3. ModelCard Component

**Zweck**: Anzeige der Analyse-Ergebnisse pro Modell

```typescript
interface ModelCardProps {
  model: ModelInfo;
  modelId: string;
  tokenCount: TokenCount;
}

// Features:
- Farbcodierter Status
- Animierter Fortschrittsbalken
- Expandierbare Details
- Kosten-Anzeige
- Responsive Layouts
```

### 4. Haupt-App (page.tsx)

**State Management**:

```typescript
const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
const [inputText, setInputText] = useState('');
const [tokenCounts, setTokenCounts] = useState<Record<string, TokenCount>>({});
const [error, setError] = useState('');
const [language, setLanguage] = useState<'de' | 'en'>('de');
```

**Effect Hook für Live-Updates**:

```typescript
useEffect(() => {
  if (inputText) {
    const results = analyzeText(inputText);
    setTokenCounts(results);
  } else {
    setTokenCounts({});
  }
}, [inputText]);
```

---

## API & Kostenberechnung

### Kostenformel

```typescript
function estimateApiCost(tokens: number, modelId: string): number {
  const costs = {
    gemini25pro: { input: 3.5, output: 10.5 },
    gpt4o: { input: 10, output: 30 },
    claudesonnet4: { input: 3, output: 15 }
  };
  
  const modelCost = costs[modelId];
  const inputCost = (tokens / 1_000_000) * modelCost.input;
  
  return inputCost; // Nur Input-Kosten, da Output unbekannt
}
```

### Preisvergleich (Stand: Juli 2025)

| Modell | Input $/1M | Output $/1M | 100K Token Input |
|--------|------------|-------------|------------------|
| Gemini 2.5 Pro | $3.50 | $10.50 | $0.35 |
| GPT-4o | $10.00 | $30.00 | $1.00 |
| Claude Sonnet 4 | $3.00 | $15.00 | $0.30 |

---

## Bekannte Einschränkungen

### 1. Token-Schätzung

- **Ungenauigkeit**: Verwendet Heuristiken statt echter Tokenizer
- **Sprachvarianz**: Nicht-lateinische Schriften weniger genau
- **Code-Tokenisierung**: Programmiersprachen-spezifische Unterschiede nicht berücksichtigt

### 2. Dateiverarbeitung

- **PDF/DOCX**: Aktuell nicht implementiert (nur Platzhalter)
- **Bilder**: Pauschale Schätzung statt echter Analyse
- **Große Dateien**: Keine Streaming-Verarbeitung

### 3. Modell-Spezifika

- **Tokenizer-Unterschiede**: Jedes Modell hat eigene Tokenisierung
- **Dynamische Limits**: Kontextfenster können sich ändern
- **Regionale Verfügbarkeit**: Nicht alle Modelle überall verfügbar

### 4. Performance

- **Browser-Limits**: Sehr große Texte können Browser überlasten
- **Keine Caching**: Jede Änderung triggert Neuberechnung
- **Synchrone Verarbeitung**: Kein Web Worker für Berechnungen

---

## Neue Features (Juli 2025 Update)

### Modell-Bibliothek

Die App verfügt jetzt über eine umfangreiche **Modell-Bibliothek** mit über 20 KI-Modellen:

**Features:**
- **Interaktive Sidebar**: Von rechts einfahrende Modellauswahl
- **Such- und Filterfunktion**: Nach Anbieter, Typ (Open Source/Proprietär)
- **Live-Updates**: Änderungen werden sofort in der Hauptansicht reflektiert
- **LocalStorage-Persistenz**: Ausgewählte Modelle werden gespeichert
- **Flexible Grid-Layouts**: Automatische Anpassung für 3-8+ Modelle

**Unterstützte Anbieter:**
- Google (Gemini Familie)
- OpenAI (GPT-4 Familie)
- Anthropic (Claude Familie)
- Meta (Llama Familie)
- Mistral AI (Mistral/Mixtral)
- Cohere (Command R)
- AI21 (Jamba)
- Amazon (Titan)

---

## Zukünftige Entwicklung

### Phase 1: Basis-Verbesserungen (Q3 2025)

- [ ] **Echte Tokenizer Integration**
  - tiktoken für OpenAI
  - Gemini Tokenizer API
  - Claude Tokenizer (wenn verfügbar)

- [ ] **Erweiterte Dateiunterstützung**
  - PDF-Parsing mit pdf.js
  - DOCX-Verarbeitung mit mammoth
  - Excel/CSV Support

- [ ] **Performance-Optimierung**
  - Web Worker für Tokenisierung
  - Virtualisierung für lange Texte
  - Debouncing optimieren

### Phase 2: Erweiterte Features (Q4 2025)

- [ ] **Chunk-Splitting**
  - Intelligente Text-Aufteilung
  - Kontext-Erhaltung
  - Overlap-Konfiguration

- [ ] **Batch-Verarbeitung**
  - Mehrere Dateien gleichzeitig
  - Ordner-Upload
  - Fortschrittsanzeige

- [ ] **Historien-Feature**
  - LocalStorage für vergangene Analysen
  - Vergleich über Zeit
  - Export-Historie

### Phase 3: Pro-Features (2026)

- [ ] **API-Integration**
  - Direkte Modell-Abfrage
  - Echtzeit-Tokenisierung
  - Tatsächliche Kosten

- [ ] **Team-Features**
  - Shared Analysen
  - Kosten-Budgets
  - Usage Analytics

- [ ] **Erweiterte Modelle**
  - Llama 3
  - Mistral
  - Custom Models

### Phase 4: Enterprise (2026+)

- [ ] **Self-Hosting Option**
- [ ] **API für Integration**
- [ ] **Compliance Features**
- [ ] **Advanced Analytics**

---

## Entwicklungs-Guidelines

### Code-Standards

```typescript
// Komponenten: PascalCase
export function ModelCard() { }

// Funktionen: camelCase
function calculateTokens() { }

// Konstanten: UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 10_000_000;

// Types/Interfaces: PascalCase
interface TokenCount { }
```

### Git Commit Konventionen

```
feat: Neue Feature-Implementierung
fix: Bugfix
docs: Dokumentations-Updates
style: Code-Formatierung
refactor: Code-Umstrukturierung
perf: Performance-Verbesserungen
test: Test-Hinzufügungen
chore: Wartungsarbeiten
```

### Testing-Strategie

```typescript
// Unit Tests für Berechnungslogik
describe('tokenCalculator', () => {
  test('calculates tokens correctly for English text', () => {
    expect(calculateTokens('Hello World', 'gpt4o')).toBe(3);
  });
});

// Integration Tests für Komponenten
describe('ModelCard', () => {
  test('shows correct status colors', () => {
    // Test implementation
  });
});
```

---

## Kontakt & Support

**Projekt erstellt von**: AI Token Calculator Team  
**Kontakt**: [GitHub Issues](https://github.com/yourusername/token-calculator)  
**Lizenz**: MIT

---

*Letzte Aktualisierung: Juli 2025*