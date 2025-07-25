#!/bin/bash

# Git-Repository initialisieren
git init

# Alle Dateien zum Staging hinzufügen
git add .

# Initial Commit erstellen
git commit -m "Initial commit: AI Token Calculator - Calculate tokens for 50+ AI models"

# Main Branch umbenennen (falls nötig)
git branch -M main

# Remote Repository hinzufügen
git remote add origin https://github.com/nicremo/aitokencalculator.git

# Zum GitHub pushen
git push -u origin main

echo "✅ Projekt erfolgreich auf GitHub hochgeladen!"
echo "🔗 URL: https://github.com/nicremo/aitokencalculator"