# Contributing to AI Token Calculator

Vielen Dank für dein Interesse, zu diesem Projekt beizutragen! 🎉

## 📋 Inhaltsverzeichnis

- [Code of Conduct](#code-of-conduct)
- [Wie kann ich beitragen?](#wie-kann-ich-beitragen)
- [Entwicklungsumgebung einrichten](#entwicklungsumgebung-einrichten)
- [Pull Request Prozess](#pull-request-prozess)
- [Coding Standards](#coding-standards)
- [Commit-Konventionen](#commit-konventionen)

## Code of Conduct

Dieses Projekt und alle Teilnehmer folgen einem Code of Conduct. Durch deine Teilnahme erwartest du, diesem Code zu folgen. Bitte melde inakzeptables Verhalten an die Projekt-Maintainer.

## Wie kann ich beitragen?

### 🐛 Bugs melden

Bugs werden über [GitHub Issues](https://github.com/nicremo/aitokencalculator/issues) verfolgt.

Bevor du einen Bug meldest:
- Überprüfe die [bestehenden Issues](https://github.com/nicremo/aitokencalculator/issues)
- Stelle sicher, dass der Bug reproduzierbar ist

Erstelle ein Issue und füge folgende Informationen hinzu:
- Eine klare Beschreibung des Problems
- Schritte zur Reproduktion
- Erwartetes Verhalten
- Tatsächliches Verhalten
- Screenshots (falls zutreffend)
- Browser und Betriebssystem

### 💡 Features vorschlagen

Feature-Anfragen sind willkommen! Erstelle ein Issue mit:
- Eine klare Beschreibung des Features
- Warum es nützlich wäre
- Mögliche Implementierungsansätze

### 🔧 Code beitragen

1. Forke das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'feat: Add some AmazingFeature'`)
4. Pushe zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## Entwicklungsumgebung einrichten

```bash
# Repository klonen
git clone https://github.com/nicremo/aitokencalculator.git
cd aitokencalculator

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

### Nützliche Befehle

```bash
# Linting ausführen
npm run lint

# Type-Checking
npm run type-check

# Tests ausführen
npm test

# Production Build erstellen
npm run build
```

## Pull Request Prozess

1. **Aktualisiere die Dokumentation** bei Interface-Änderungen
2. **Füge Tests hinzu** für neue Features
3. **Stelle sicher, dass alle Tests bestehen**
4. **Befolge die Coding Standards**
5. **Aktualisiere die README.md** falls nötig

### PR Checkliste

- [ ] Code folgt den Projekt-Standards
- [ ] Selbst-Review durchgeführt
- [ ] Kommentare bei komplexem Code hinzugefügt
- [ ] Dokumentation aktualisiert
- [ ] Keine Warnungen generiert
- [ ] Tests hinzugefügt/aktualisiert
- [ ] Alle Tests bestehen

## Coding Standards

### TypeScript/JavaScript

```typescript
// Verwende aussagekräftige Variablennamen
const tokenCount = calculateTokens(text);

// Komponenten in PascalCase
export function ModelCard() { }

// Funktionen in camelCase
function calculateTokens() { }

// Konstanten in UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 10_000_000;

// Interfaces/Types in PascalCase
interface TokenCount { }
```

### React Best Practices

- Verwende funktionale Komponenten mit Hooks
- Halte Komponenten klein und fokussiert
- Extrahiere wiederverwendbare Logik in Custom Hooks
- Verwende TypeScript für Type Safety

### CSS/Styling

- Verwende Tailwind CSS Utility Classes
- Vermeide inline Styles
- Nutze die `cn()` Utility für conditional classes
- Mobile-first Ansatz

## Commit-Konventionen

Wir folgen den [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Neues Feature
- `fix`: Bugfix
- `docs`: Dokumentationsänderungen
- `style`: Code-Formatierung (keine Funktionsänderung)
- `refactor`: Code-Umstrukturierung
- `perf`: Performance-Verbesserungen
- `test`: Tests hinzufügen/ändern
- `chore`: Wartungsarbeiten
- `i18n`: Übersetzungen

### Beispiele

```bash
feat: Add PDF file support
fix: Correct token calculation for German text
docs: Update installation instructions
style: Format code with prettier
refactor: Extract token calculation logic
perf: Optimize model selection performance
test: Add tests for file upload
chore: Update dependencies
i18n: Add French translations
```

## 🌍 Übersetzungen

Neue Übersetzungen sind sehr willkommen! So fügst du eine neue Sprache hinzu:

1. Erstelle eine neue Datei in `/messages/[locale].json`
2. Kopiere die Struktur von `messages/en.json`
3. Übersetze alle Strings
4. Füge das Locale zu `i18n.ts` hinzu
5. Teste die neue Sprache gründlich

## 📦 Dependencies hinzufügen

Bevor du eine neue Dependency hinzufügst:
- Überprüfe, ob sie wirklich notwendig ist
- Prüfe die Lizenz-Kompatibilität
- Berücksichtige die Bundle-Größe
- Dokumentiere, warum sie hinzugefügt wurde

## 🤔 Fragen?

Hast du Fragen? Eröffne eine [Discussion](https://github.com/nicremo/aitokencalculator/discussions) oder kontaktiere Fabian Bitzer unter kontakt@bitzer-fabian.de.

---

Vielen Dank für deine Beiträge! 🙏