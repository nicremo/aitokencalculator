# 🤖 AI Token Calculator

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Calculate token counts and costs for 50+ AI models in real-time**

[Demo](https://aitokencalculator.com) • [Documentation](./CLAUDE.md) • [Issues](https://github.com/nicremo/aitokencalculator/issues)

</div>

## 🌟 Features

- ✨ **50+ AI Models** from OpenAI, Anthropic, Google, Meta and more
- 🌍 **13 Languages** - Fully internationalized
- 💰 **Cost Calculation** - See API costs before you send
- 📊 **Live Updates** - Token calculation while typing
- 📁 **File Support** - Drag & drop text files
- 🎨 **Modern UI** - Responsive design with smooth animations
- 💾 **Export** - Save your analysis as CSV
- 🔒 **Privacy** - Everything runs locally in your browser

## 📸 Screenshots

<div align="center">
  <img src="./main-interface.png" alt="Main Interface" width="600">
  <p><em>Analyze your text for multiple AI models simultaneously</em></p>
</div>

<div align="center">
  <img src="./model-selection.png" alt="Model Selection" width="600">
  <p><em>Choose from 50+ AI models from 14 different providers</em></p>
</div>

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/nicremo/aitokencalculator.git
cd aitokencalculator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Create build
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)
- **File Upload:** [react-dropzone](https://react-dropzone.js.org/)

## 📖 Usage

### Analyze Text

1. Enter your text in the input field or upload a file
2. Token count is automatically calculated for all active models
3. View costs and status (fits/tight/exceeds)
4. Export results as CSV for further analysis

### Customize Models

1. Click "Customize Models" in the upper right corner
2. Search for models or filter by provider
3. Enable or disable models as needed
4. Your selection is automatically saved

## 🌍 Supported Languages

- 🇩🇪 German
- 🇬🇧 English
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇮🇹 Italian
- 🇵🇱 Polish
- 🇳🇱 Dutch
- 🇵🇹 Portuguese
- 🇨🇿 Czech
- 🇸🇪 Swedish
- 🇩🇰 Danish
- 🇳🇴 Norwegian
- 🇫🇮 Finnish

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Development

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Run tests
npm test
```

## 📊 Supported AI Models

<details>
<summary>View all 50+ models</summary>

### OpenAI
- GPT-4o, GPT-4.1 (and mini/nano variants)
- GPT-4 Turbo
- GPT-3.5 Turbo

### Anthropic
- Claude 4 Opus & Sonnet
- Claude 3.5 Haiku
- Claude 3 Series

### Google
- Gemini 2.5 Pro
- Gemini 2.5 Flash & Flash-Lite

### Meta
- Llama 3.1 (405B, 70B, 8B)

### And many more...
Mistral AI, Cohere, AI21, DeepSeek, Alibaba Cloud, and others!

</details>

## 📝 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) for details.

## 👨‍💻 Author

**Fabian Bitzer**
- Website: [fabian-bitzer.de](https://fabian-bitzer.de/)
- GitHub: [@nicremo](https://github.com/nicremo)
- Email: kontakt@bitzer-fabian.de

## 🙏 Acknowledgments

- The open-source community for amazing tools and libraries
- AI providers for their documentation and APIs
- All contributors who made this project possible

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/nicremo/aitokencalculator/issues)
- **Discussions:** [GitHub Discussions](https://github.com/nicremo/aitokencalculator/discussions)
- **Email:** kontakt@bitzer-fabian.de

---

<div align="center">
  <p>Made with ❤️ by <a href="https://fabian-bitzer.de/">Fabian Bitzer</a> for the AI community</p>
  <p>
    <a href="#top">Back to top ↑</a>
  </p>
</div>