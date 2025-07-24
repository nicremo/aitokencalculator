# AI Token Calculator Pro

Ein einfacher und intuitiver Token-Rechner für die beliebtesten KI-Modelle (Gemini 2.5 Pro, GPT-4o, Claude Sonnet 4).

## Features

- 📝 **Text-Eingabe**: Direkte Texteingabe mit Live-Token-Berechnung
- 📁 **Datei-Upload**: Unterstützung für PDF, DOCX, TXT und Bilder
- 📊 **Multi-Modell-Vergleich**: Zeigt Token-Anzahl für alle drei großen Modelle
- 💹 **Visuelle Darstellung**: Fortschrittsbalken zeigen Kontextfenster-Auslastung
- 💰 **Kosten-Schätzung**: Berechnet geschätzte API-Kosten
- 📥 **Export-Funktion**: Ergebnisse als CSV exportieren
- 📱 **Responsive Design**: Funktioniert auf Desktop, Tablet und Mobile

## Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

## Verwendung

1. **Text eingeben**: Füge deinen Text in das Textfeld ein oder
2. **Datei hochladen**: Ziehe eine Datei in den Upload-Bereich
3. **Ergebnisse ansehen**: Die Token-Anzahl wird automatisch für alle Modelle berechnet
4. **Exportieren**: Lade die Ergebnisse als CSV herunter

## Token-Berechnung

Die Berechnung basiert auf folgenden Faustregeln:

- **Gemini 2.5 Pro**: ~4 Zeichen pro Token, 1M Token Kontextfenster
- **GPT-4o**: ~4 Zeichen pro Token, 128K Token Kontextfenster
- **Claude Sonnet 4**: ~3.5 Zeichen pro Token, 200K Token Kontextfenster

Deutscher Text benötigt typischerweise ~15% mehr Tokens als englischer Text.

## Technologie-Stack

- **Next.js 15** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Dropzone** - File Upload

## Geplante Features

- [ ] PDF und DOCX Parsing Backend
- [ ] Präzise Bild-Token-Berechnung
- [ ] Audio/Video Support
- [ ] Mehrsprachige Token-Optimierung
- [ ] Chunk-Splitting für zu große Texte
- [ ] API-Integration für exakte Token-Zählung

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/token-calculator)

## Lizenz

MIT
