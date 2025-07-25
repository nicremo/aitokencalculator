# AI Token Calculator - Vollständige Projektdokumentation

## Inhaltsverzeichnis

1. [Projektübersicht](#projektübersicht)
2. [Problemstellung & Lösung](#problemstellung--lösung)
3. [Features im Detail](#features-im-detail)
4. [Unterstützte KI-Modelle](#unterstützte-ki-modelle)
5. [Token-Berechnungslogik](#token-berechnungslogik)
6. [Chat-Limit Testing](#chat-limit-testing)
7. [Technische Architektur](#technische-architektur)
8. [Komponenten-Dokumentation](#komponenten-dokumentation)
9. [Internationalisierung (i18n)](#internationalisierung-i18n)
10. [API & Kostenberechnung](#api--kostenberechnung)
11. [Installation & Setup](#installation--setup)
12. [Testing & Entwicklung](#testing--entwicklung)
13. [Bekannte Einschränkungen](#bekannte-einschränkungen)
14. [Zukünftige Entwicklung](#zukünftige-entwicklung)

---

## Projektübersicht

**AI Token Calculator** ist eine moderne Web-Anwendung, die Nutzern hilft zu verstehen, ob ihre Texte, Dokumente oder multimediale Inhalte in das Kontextfenster verschiedener KI-Modelle passen. Die App wurde mit Next.js 15, TypeScript und Tailwind CSS entwickelt.

### Kernfunktionen

- **Multi-Modell Token-Berechnung**: Parallele Analyse für 50+ KI-Modelle
- **Umfangreiche Modell-Bibliothek**: Von 14 verschiedenen Anbietern
- **Internationalisierung**: Verfügbar in 13 Sprachen
- **Live-Berechnungen**: Sofortige Updates während der Eingabe
- **Datei-Support**: TXT, MD (PDF und DOCX in Entwicklung)
- **Visuelle Darstellung**: Farbcodierte Fortschrittsbalken
- **Kostenprognose**: API-Kosten-Schätzung in Echtzeit
- **Export-Funktion**: CSV-Export für weitere Analysen
- **LocalStorage-Persistenz**: Ausgewählte Modelle werden gespeichert
- **Responsive Design**: Optimiert für alle Bildschirmgrößen

### Zielgruppe

- **Entwickler**: Die mit KI-APIs arbeiten
- **Content-Ersteller**: Die lange Texte an KI-Modelle senden
- **Unternehmen**: Die API-Kosten kalkulieren müssen
- **Forscher**: Die mit großen Dokumenten arbeiten
- **AI-Enthusiasten**: Die verschiedene Modelle vergleichen möchten

---

## Problemstellung & Lösung

### Das Problem

1. **Token-Verwirrung**: Nutzer verstehen nicht, was Tokens sind
2. **Modell-Unterschiede**: Jedes Modell hat andere Limits und Tokenisierung
3. **Kostenüberraschungen**: Unerwartete API-Kosten durch falsche Schätzungen
4. **Content-Abschneidung**: Texte werden unerwartet gekürzt
5. **Reale vs. API-Limits**: Chat-Interfaces haben oft andere Limits als APIs

### Die Lösung

Der AI Token Calculator löst diese Probleme durch:

- **Echtzeitberechnung**: Sofortige Token-Schätzung während der Eingabe
- **50+ Modelle**: Umfassende Abdeckung aller wichtigen KI-Modelle
- **Reale Chat-Limits**: Getestete tatsächliche Limits der Chat-Interfaces
- **Visuelle Warnungen**: Farbcodierte Status-Anzeige (Grün/Gelb/Orange/Rot)
- **Kostenvorschau**: Zeigt geschätzte Kosten vor dem API-Aufruf

---

## Features im Detail

### 1. Modell-Bibliothek

Die App bietet eine umfangreiche Modell-Bibliothek mit:

- **50+ KI-Modelle** von 14 verschiedenen Anbietern
- **Interaktive Sidebar**: Mit Suche, Filterung und Gruppierung
- **Flexible Modellauswahl**: 1 bis unbegrenzt viele Modelle gleichzeitig
- **LocalStorage-Persistenz**: Einstellungen werden gespeichert
- **Auto-Layout**: Grid passt sich automatisch an (1-4+ Spalten)

### 2. Token-Berechnung

- **Modell-spezifische Berechnungen**: Jedes Modell hat eigene Tokenizer-Logik
- **Sprachoptimierung**: Berücksichtigt Nicht-Englische Texte
- **Live-Updates**: Berechnung während der Eingabe
- **Batch-Berechnung**: Alle Modelle werden parallel berechnet

### 3. Dateiverarbeitung

- **Unterstützte Formate**: TXT, MD (vollständig implementiert)
- **In Entwicklung**: PDF, DOCX (Dependencies vorhanden)
- **Drag & Drop**: Intuitive Datei-Upload-Zone
- **Multi-File Support**: Mehrere Dateien gleichzeitig

### 4. Internationalisierung

Vollständige Übersetzung in 13 Sprachen:
- Deutsch (Standard)
- Englisch
- Spanisch
- Französisch
- Italienisch
- Polnisch
- Niederländisch
- Portugiesisch
- Tschechisch
- Schwedisch
- Dänisch
- Norwegisch
- Finnisch

### 5. Export & Analyse

- **CSV-Export**: Vollständige Analyse-Ergebnisse
- **Formatierte Ausgabe**: Mit Anführungszeichen und Escape-Sequenzen
- **Kosteninformationen**: Geschätzte API-Kosten inklusive

---

## Unterstützte KI-Modelle

Die App unterstützt 50+ Modelle von folgenden Anbietern:

### Google (Gemini Familie)
- **Gemini 2.5 Pro**: 2M Token Kontext, gestaffelte Preise
- **Gemini 2.5 Flash**: 1M Token, schnell, Audio-Support
- **Gemini 2.5 Flash-Lite**: 1M Token, sehr günstig

### OpenAI (GPT Familie)
- **GPT-4o**: 128K Token, Multimodal
- **GPT-4.1** (Neu): Verbesserte Performance
- **GPT-4.1 mini/nano**: Kompakte Varianten
- **GPT-4o mini**: Schnell und günstig
- **GPT-3.5 Turbo**: Legacy (veraltet)

### Anthropic (Claude Familie)
- **Claude 4 Opus**: 200K Token, 128K Output
- **Claude 4 Sonnet**: Ausgewogene Leistung
- **Claude 3.5 Haiku**: Schnell und effizient
- **Claude 3 Modelle**: Vorherige Generation

### Meta (Llama Familie)
- **Llama 3.1 405B/70B/8B**: Open Source

### Mistral AI
- **Mistral Large**: Flaggschiff, 80% Preissenkung
- **Mistral Medium 3**: Neue Mittelklasse
- **Mistral Small 3.2**: Open Source
- **Codestral**: Code-spezialisiert
- **Mixtral 8x22B/8x7B**: MoE Architektur

### Weitere Anbieter
- **Cohere**: Command R+, Command R, Command R7B
- **AI21**: Jamba 1.5 Large/Mini (256K Kontext)
- **DeepSeek**: V3, R1 (Reasoning), V2, Coder-V2
- **Alibaba Cloud**: Qwen2.5 Serie (72B/14B/7B)
- **Zhipu AI**: GLM-4-Plus, GLM-4-Long (1M Kontext)
- **Aleph Alpha**: Luminous Serie (EU-fokussiert)
- **Amazon**: Titan Express

### Besondere Features einzelner Modelle

**Reale Chat-Limits** (getestet):
- Gemini: 187.500 Tokens (750K Zeichen)
- GPT-4o: 30.000 Tokens (120K Zeichen)
- Claude: 159.000 Tokens (605K Zeichen)

---

## Token-Berechnungslogik

### Basis-Berechnungen

```typescript
// Standard-Berechnung (GPT, Gemini)
const defaultTokenCalc = (text: string) => Math.ceil(text.length / 4);

// Claude-spezifisch
const claudeTokenCalc = (text: string) => Math.ceil(text.length / 3.8);

// Llama-spezifisch
const llamaTokenCalc = (text: string) => Math.ceil(text.length / 3.8);

// Cohere-spezifisch (word-basiert)
const cohereTokenCalc = (text: string) => {
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.ceil(wordCount * 2.5);
};

// Qwen (sehr effizient)
const qwenTokenCalc = (text: string) => Math.ceil(text.length / 5);

// DeepSeek
const deepseekTokenCalc = (text: string) => Math.ceil(text.length / 4);

// GLM
const glmTokenCalc = (text: string) => Math.ceil(text.length / 4);
```

### Dateiformat-Overhead

```typescript
switch (fileType) {
  case 'pdf':
    return Math.ceil(baseTokens * 1.1);  // +10% für PDF-Struktur
  case 'docx':
    return Math.ceil(baseTokens * 1.05); // +5% für Word-Formatierung
  default:
    return baseTokens;
}
```

### Status-Bewertung

- **Grün** (fits): ≤ 60% des Kontextfensters
- **Gelb** (tight): 60-85% des Kontextfensters
- **Orange** (tight): 85-100% des Kontextfensters
- **Rot** (exceeds): > 100% des Kontextfensters

---

## Chat-Limit Testing

Das Projekt enthält umfangreiche Test-Dateien zur Ermittlung der tatsächlichen Chat-Limits:

### Test-Dateien-Struktur

```
chat_limit_tests/        # Allgemeine Tests (5K-320K)
chatgpt_exact_limit/     # GPT Präzisionstests (80K-160K)
claude_exact_limit/      # Claude Tests (160K-600K)
claude_mega_limit/       # Claude Mega-Tests (600K-3M)
claude_precise_600k/     # Claude 600K Feinabstimmung
gemini_chat_tests/       # Gemini Tests (200K-8M)
gemini_limit_tests/      # Gemini Zusatztests
```

### Test-Skripte

- `find_chat_limits.py`: Generelle Limit-Suche
- `find_exact_chatgpt_limit.py`: GPT-spezifisch
- `find_exact_claude_limit.py`: Claude-spezifisch
- `find_claude_gemini_limits.py`: Kombiniert
- `find_claude_mega_limit.py`: Große Claude-Tests
- `find_gemini_limit.py`: Gemini-spezifisch
- `generate_test_files.py`: Test-Datei-Generator

### Ermittelte Limits

- **Gemini Chat**: 750.000 Wörter ≈ 187.500 Tokens
- **ChatGPT**: 120.000 Zeichen ≈ 30.000 Tokens
- **Claude.ai**: 605.000 Zeichen ≈ 159.000 Tokens

---

## Technische Architektur

### Tech Stack

```yaml
Framework: Next.js 15.4.3 (App Router)
Sprache: TypeScript 5.x
Styling: Tailwind CSS 4.x
UI Components: 
  - Lucide React (Icons)
  - React Dropzone (File Upload)
  - Tailwind Merge (Class Utils)
State Management: React Hooks
Internationalisierung: next-intl 4.3.4
Build Tool: Turbopack
Package Manager: npm
Runtime: React 19.1.0
```

### Dependencies

```json
{
  "dependencies": {
    "clsx": "^2.1.1",
    "file-saver": "^2.0.5",
    "lucide-react": "^0.525.0",
    "mammoth": "^1.9.1",         // DOCX-Verarbeitung (noch nicht implementiert)
    "next": "15.4.3",
    "next-intl": "^4.3.4",
    "pdf-parse": "^1.1.1",       // PDF-Verarbeitung (noch nicht implementiert)
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-dropzone": "^14.3.8",
    "tailwind-merge": "^3.3.1"
  }
}
```

### Projekt-Struktur

```
token-calculator/
├── app/
│   ├── [locale]/               # Internationalisierung
│   │   ├── page.tsx           # Hauptseite
│   │   └── layout.tsx         # Locale-spezifisches Layout
│   ├── layout.tsx             # Root Layout
│   ├── globals.css            # Globale Styles
│   ├── robots.ts              # SEO
│   └── sitemap.ts             # Sitemap
├── components/
│   ├── TextInput.tsx          # Text-Eingabe mit Live-Stats
│   ├── FileUpload.tsx         # Drag & Drop Upload
│   ├── ModelCard.tsx          # Modell-Ergebniskarte
│   └── ModelSidebar.tsx       # Modell-Auswahl Sidebar
├── lib/
│   ├── models.ts              # 50+ Modell-Definitionen
│   ├── tokenCalculator.ts     # Token-Berechnungslogik
│   └── utils.ts               # Utility Functions
├── messages/                   # Übersetzungen (13 Sprachen)
│   ├── de.json                # Deutsch (Standard)
│   ├── en.json                # Englisch
│   └── ...                    # 11 weitere Sprachen
├── middleware.ts              # Next-intl Middleware
├── i18n.ts                    # i18n Konfiguration
└── next.config.ts             # Next.js Konfiguration
```

---

## Komponenten-Dokumentation

### 1. Hauptseite (app/[locale]/page.tsx)

**Zweck**: Zentrale Anwendungslogik und State Management

**Features**:
- Tab-Navigation (Text/Dateien)
- LocalStorage für Modell-Einstellungen
- CSV-Export Funktionalität
- Responsive Grid-Layouts
- Error Handling

**State Management**:
```typescript
const [activeTab, setActiveTab] = useState<'text' | 'files'>('text');
const [inputText, setInputText] = useState('');
const [tokenCounts, setTokenCounts] = useState<Record<string, TokenCount>>({});
const [error, setError] = useState('');
const [activeModelIds, setActiveModelIds] = useState<string[]>(DEFAULT_ACTIVE_MODEL_IDS);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
```

### 2. TextInput Component

**Zweck**: Haupteingabefeld mit Live-Statistiken

**Features**:
- Auto-resize Textarea
- Live Character/Word Count
- Floating Statistics Badge
- Optimierte Performance

### 3. FileUpload Component

**Zweck**: Drag & Drop Datei-Upload

**Features**:
- Multi-File Support
- Drag & Drop Zone
- Dateiformat-Validierung
- Visuelle Upload-States
- Error Handling

**Aktueller Status**:
- ✅ TXT, MD: Vollständig implementiert
- ⚠️ PDF, DOCX: Dependencies vorhanden, Implementation ausstehend
- ⚠️ Bilder: Platzhalter vorhanden

### 4. ModelCard Component

**Zweck**: Anzeige der Analyse-Ergebnisse pro Modell

**Features**:
- Farbcodierter Status (Grün/Gelb/Orange/Rot)
- Animierter Fortschrittsbalken
- Expandierbare Details
- Kosten-Anzeige
- Token-Overflow-Anzeige

### 5. ModelSidebar Component

**Zweck**: Interaktive Modell-Auswahl

**Features**:
- **Suche**: Echtzeit-Filterung
- **Filter**: Nach Anbieter und Typ (Proprietär/Open Source)
- **Gruppierung**: Nach Anbieter mit Expand/Collapse
- **Auto-Expand**: Für aktive Modelle
- **Animations**: Smooth Transitions
- **Body-Scroll-Lock**: Verhindert Hintergrund-Scrolling

**UI-Details**:
- 420px breite Sidebar von rechts
- Backdrop mit Blur-Effekt
- Animierte Ein-/Ausfahrt
- Responsive Touch-Gesten

---

## Internationalisierung (i18n)

### Konfiguration

```typescript
// i18n.ts
export const locales = ['en', 'de', 'es', 'fr', 'it', 'pl', 
                       'nl', 'pt', 'cs', 'sv', 'da', 'no', 'fi'];
export const defaultLocale = 'de';
```

### Middleware

```typescript
// middleware.ts
export default createMiddleware({
  locales,
  defaultLocale
});
```

### Übersetzungsstruktur

Jede Sprache hat eine JSON-Datei in `/messages/` mit folgender Struktur:
- Navigation
- Eingabe-Labels
- Modell-Informationen
- Status-Meldungen
- UI-Elemente

---

## API & Kostenberechnung

### Preismodelle (Stand: Juli 2025)

| Anbieter | Modell | Input $/1M | Output $/1M |
|----------|--------|------------|-------------|
| Google | Gemini 2.5 Pro | $1.25-$2.50 | $10.00-$15.00 |
| Google | Gemini 2.5 Flash | $0.30 | $2.50 |
| OpenAI | GPT-4o | $2.50 | $10.00 |
| OpenAI | GPT-4.1 | $2.00 | $8.00 |
| Anthropic | Claude 4 Opus | $15.00 | $75.00 |
| Anthropic | Claude 4 Sonnet | $3.00 | $15.00 |
| Meta | Llama 3.1 405B | $2.70 | $2.70 |
| Mistral | Mistral Large | $2.00 | $6.00 |
| DeepSeek | DeepSeek-V3 | $0.27 | $1.10 |

### Kostenberechnung

```typescript
export function estimateApiCost(tokens: number, model: LLMModel): number {
  const costPer1M = model.pricing.input;
  return (tokens / 1000000) * costPer1M;
}
```

---

## Installation & Setup

### Voraussetzungen

- Node.js 18+ 
- npm oder yarn
- Git

### Installation

```bash
# Repository klonen
git clone https://github.com/yourusername/token-calculator.git
cd token-calculator

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Production Build
npm run build

# Production Server
npm start
```

### Umgebungsvariablen

Keine Umgebungsvariablen erforderlich - die App läuft vollständig client-seitig.

---

## Testing & Entwicklung

### Entwicklungs-Features

- **Turbopack**: Schneller Build mit `--turbopack` Flag
- **Hot Reload**: Automatisches Neuladen bei Änderungen
- **TypeScript**: Vollständige Typsicherheit
- **ESLint**: Code-Qualitätsprüfung

### Test-Strategie

1. **Unit Tests**: Für Token-Berechnungslogik
2. **Integration Tests**: Für Komponenten
3. **E2E Tests**: Für Benutzerflows
4. **Chat-Limit Tests**: Manuelle Tests mit generierten Dateien

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

---

## Bekannte Einschränkungen

### 1. Token-Berechnung
- Verwendet Heuristiken statt echter Tokenizer
- Genauigkeit variiert je nach Sprache und Modell
- Code-Tokenisierung ist vereinfacht

### 2. Dateiverarbeitung
- PDF/DOCX noch nicht implementiert (Dependencies vorhanden)
- Keine Streaming-Verarbeitung für große Dateien
- Bilder werden pauschal geschätzt

### 3. Performance
- Sehr große Texte können Browser überlasten
- Keine Web Worker Implementation
- Synchrone Verarbeitung

### 4. Features
- Kein Dark Mode
- Keine Benutzerkonten
- Keine Cloud-Speicherung
- Keine API-Integration

---

## Zukünftige Entwicklung

### Phase 1: Basis-Verbesserungen (Q3 2025)

- [ ] **PDF/DOCX Implementation**
  - pdf-parse Integration
  - mammoth Integration
  
- [ ] **Echte Tokenizer**
  - tiktoken für OpenAI
  - Gemini Tokenizer API
  - Claude Tokenizer

- [ ] **Performance**
  - Web Worker für Berechnungen
  - Virtualisierung für lange Listen
  - Streaming für große Dateien

### Phase 2: Erweiterte Features (Q4 2025)

- [ ] **Dark Mode**
  - System-Präferenz
  - Manueller Toggle
  
- [ ] **Erweiterte Dateiunterstützung**
  - Excel/CSV
  - Code-Dateien mit Syntax-Highlighting
  - Markdown-Preview

- [ ] **Batch-Verarbeitung**
  - Mehrere Dateien gleichzeitig
  - Ordner-Upload
  - Fortschrittsanzeige

### Phase 3: Pro-Features (2026)

- [ ] **API-Integration**
  - Direkte Modell-Abfrage
  - Echtzeit-Tokenisierung
  - Tatsächliche Kosten

- [ ] **Benutzerkonten**
  - Historien-Speicherung
  - Einstellungs-Sync
  - Team-Sharing

- [ ] **Analytics**
  - Usage-Statistiken
  - Kosten-Tracking
  - Export-Reports

### Phase 4: Enterprise (2026+)

- [ ] **Self-Hosting**
  - Docker-Container
  - Kubernetes-Support
  
- [ ] **API**
  - REST API
  - GraphQL
  - Webhooks

- [ ] **Compliance**
  - GDPR-Konformität
  - SOC2
  - ISO 27001

---

## Entwickler-Hinweise

### Git Workflow

```bash
# Feature Branch erstellen
git checkout -b feature/neue-funktion

# Änderungen committen
git add .
git commit -m "feat: Neue Funktion hinzugefügt"

# Push und PR erstellen
git push origin feature/neue-funktion
```

### Commit-Konventionen

```
feat: Neue Features
fix: Bugfixes
docs: Dokumentation
style: Code-Formatierung
refactor: Code-Umstrukturierung
perf: Performance
test: Tests
chore: Wartung
i18n: Übersetzungen
```

### Debugging

```typescript
// Entwicklungs-Logs
console.log('Token calculation:', {
  model: model.name,
  tokens: tokenCount,
  percentage: (tokenCount / model.contextWindow) * 100
});
```

---

## Kontakt & Support

**Repository**: [GitHub](https://github.com/yourusername/token-calculator)  
**Issues**: [GitHub Issues](https://github.com/yourusername/token-calculator/issues)  
**Lizenz**: MIT

---

## Anhang: Modell-Details

### Vollständige Modell-Liste (50+ Modelle)

Die App unterstützt folgende Modelle (Stand: Juli 2025):

**Google**: Gemini 2.5 Pro/Flash/Flash-Lite  
**OpenAI**: GPT-4o, GPT-4.1/mini/nano, GPT-4 Turbo, GPT-3.5 Turbo  
**Anthropic**: Claude 4 Opus/Sonnet, Claude 3.5 Haiku, Claude 3 Serie  
**Meta**: Llama 3.1 405B/70B/8B  
**Mistral AI**: Large, Medium 3, Small 3.2/New, Nemo, Codestral, 7B, Mixtral  
**Cohere**: Command R+/R/R7B  
**AI21**: Jamba 1.5 Large/Mini  
**DeepSeek**: V3, R1, V2, Coder-V2  
**Alibaba**: Qwen2.5 72B/14B/7B  
**Zhipu AI**: GLM-4-Plus/Long  
**Aleph Alpha**: Luminous Supreme/Extended/Base  
**Amazon**: Titan Express  

---

*Letzte Aktualisierung: Juli 2025*
*Version: 2.0.0*