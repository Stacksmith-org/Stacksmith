# Quick Start Guide

Get stacksmith running on your local machine in minutes!

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- A code editor (VS Code recommended)

## Installation Steps

### 1. Install Dependencies

\`\`\`bash
cd stacksmith
npm install
\`\`\`

This will install all required packages including:
- Next.js 14
- React 18
- Framer Motion (for animations)
- Tailwind CSS (for styling)
- Lucide React (for icons)

### 2. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will start at \`http://localhost:3000\`

### 3. Explore the App

Visit these pages to explore stacksmith:

- **Landing Page**: \`http://localhost:3000\`
  - Beautiful animated homepage
  - Feature overview
  - Call-to-action buttons

- **Main App**: \`http://localhost:3000/app\`
  - AI-powered code analysis
  - Error translation
  - Tool guidance
  - Image upload support

- **Pattern Library**: \`http://localhost:3000/patterns\`
  - Curated Clarity code examples
  - Best practices
  - Common patterns

- **About Page**: \`http://localhost:3000/about\`
  - Learn about stacksmith
  - Feature details
  - Scope and limitations

## Next Steps

### Add AI Integration (Optional)

To enable actual AI analysis (instead of mock data):

1. Get an API key from OpenAI or your preferred AI provider

2. Create a \`.env.local\` file:
   \`\`\`env
   OPENAI_API_KEY=your_api_key_here
   \`\`\`

3. Update the API route at \`app/api/analyze/route.ts\` to integrate with your AI provider

### Customize the Design

All styling is in:
- \`app/globals.css\` - Global styles and custom utilities
- \`tailwind.config.ts\` - Tailwind configuration
- Individual page files - Component-specific styles

### Add More Patterns

Edit \`app/patterns/page.tsx\` to add more Clarity code examples to the pattern library.

## Development Tips

### Hot Reload
Changes to your code will automatically refresh the browser.

### TypeScript
All files use TypeScript for type safety. The project is configured in \`tsconfig.json\`.

### Styling
- Use Tailwind utility classes for styling
- Custom animations are in \`globals.css\`
- Use \`glass\` and \`glass-strong\` classes for glassmorphism effects

### Components
Create reusable components in the \`components/\` directory.

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

This creates an optimized production build.

## Troubleshooting

### Port Already in Use
If port 3000 is busy, change it:
\`\`\`bash
PORT=3001 npm run dev
\`\`\`

### Dependencies Not Installing
Clear cache and reinstall:
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Build Errors
Make sure you're using Node.js 18+:
\`\`\`bash
node --version
\`\`\`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## Get Help

- Check the README.md for detailed documentation
- Review the DEPLOYMENT.md for deployment options
- Refer to the spec file for feature details

---

Happy coding! 🚀
