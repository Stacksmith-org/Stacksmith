# stacksmith 🔨

> Your AI-powered Stacks Dev Companion

stacksmith helps developers build on Stacks with clarity and confidence by providing AI-assisted explanations of Clarity code, errors, tooling, and patterns.

![stacksmith](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan?style=flat&logo=tailwind-css)

## ✨ Features

- **🔍 Clarity Code Explainer**: Paste or upload Clarity code and get structured explanations
- **⚠️ Error Translator**: Turn confusing error messages into plain English with actionable fixes
- **🔧 Tool Guidance**: Learn when and how to use Clarinet, Stacks.js, and other tools
- **📚 Pattern Library**: Access curated examples of common Clarity patterns
- **🖼️ Image Support**: Upload screenshots of code or errors for analysis
- **⚡ Advanced Responses**: Pay-per-use advanced analysis via x402 (USDCx)

## 🎯 Who is it for?

- New Stacks developers
- Developers migrating from Ethereum/Rust
- Hackathon builders
- Students and solo engineers

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd stacksmith
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

\`\`\`
stacksmith/
├── app/                    # Next.js app directory
│   ├── app/               # Main app interface
│   ├── patterns/          # Pattern library page
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/                   # Utility functions
├── public/                # Static assets
└── package.json
\`\`\`

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🔑 Key Components

### Landing Page
Beautiful, animated landing page with:
- Animated background elements
- Feature showcase
- Call-to-action sections

### Main App Interface
Two-panel layout with:
- Left: Input area for code, errors, or questions
- Right: AI-generated analysis results
- Query type selector (Code, Error, Tool, Pattern)
- Image upload support

### Pattern Library
Curated collection of common Clarity patterns:
- Simple Payment
- Access Control
- Token Interaction
- Event Emission
- Basic Escrow

### About Page
Information about:
- What stacksmith is
- Who it's for
- What it does (and doesn't do)
- How it works

## 💎 Design Philosophy

stacksmith features a **tech-forward minimal** aesthetic with:
- Dark theme with subtle gradients
- Glass morphism effects
- Smooth, organic animations
- Electric blue/cyan accents
- Depth through shadows and transparency
- Beautiful typography (Inter + JetBrains Mono)

## 🔮 Advanced Features

### Payment Integration (x402)
For advanced requests:
- Large codebase explanations
- Deep debugging
- Architecture comparisons
- Security-style reasoning
- Complex USDCx / x402 flows

Payment is handled via:
- Token: USDCx on Stacks
- Mechanism: x402
- Model: Pay-per-advanced-response (no subscriptions)

## 🛠️ Development

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

### Linting

\`\`\`bash
npm run lint
\`\`\`

## 📝 Scope

### ✅ Included
- AI explanations (text + image input)
- Read-only guidance
- Documentation understanding
- Toolchain explanation
- USDCx + x402 conceptual guidance
- Pay-per-use advanced responses

### ❌ Not Included
- Autonomous code generation
- IDE functionality
- Blockchain protocol features
- Security auditing (guidance only, not guarantees)
- Code execution or deployment

## 🎓 Knowledge Sources

stacksmith is grounded in:
- Official Stacks documentation
- Stacks Cookbook
- Clarity language docs
- Clarinet docs
- Stacks.js docs
- USDCx documentation
- x402 documentation

## 🤝 Contributing

This project is built for the Stacks developer community. Contributions are welcome!

## 📄 License

See LICENSE file for details.

## 🔗 Links

- [Stacks Documentation](https://docs.stacks.co)
- [Clarity Language](https://docs.stacks.co/clarity)
- [Clarinet](https://github.com/hirosystems/clarinet)
- [Stacks.js](https://stacks.js.org)

---

Built with ❤️ for the Stacks developer community
