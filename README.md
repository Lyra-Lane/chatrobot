# ManYao Li - Personal Website

A professional personal website showcasing ManYao Li's academic background, research projects, and skills in Data Science and Natural Language Processing.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Morandi Color Palette**: Professional and elegant color scheme
- **Interactive Sections**: Hero, About, Projects, Resume, and Contact sections
- **Project Showcases**: Detailed presentations of research projects with metrics
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Proper meta tags and semantic HTML

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## GitHub Pages Deployment

### Option 1: Automatic Deployment (Recommended)

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select "GitHub Actions" as the source
4. The website will automatically build and deploy on every push to main/master branch

### Option 2: Manual Deployment

1. Run the build command:
   ```bash
   npm run build
   ```

2. Copy the built files to root:
   ```bash
   cp -r dist/public/* .
   ```

3. Commit and push the built files to your GitHub repository

4. Enable GitHub Pages in repository settings

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5000](http://localhost:5000) in your browser

## Project Structure

```
├── client/          # Frontend React application
├── server/          # Backend Express server (for development)
├── shared/          # Shared types and schemas
├── assets/          # Built static assets
├── index.html       # Main HTML file (GitHub Pages entry point)
└── .github/         # GitHub Actions workflow
```

## Contact

- **Email**: manyaoli@berkeley.edu
- **LinkedIn**: [linkedin.com/in/manyao-li-9a4436375](https://www.linkedin.com/in/manyao-li-9a4436375)
- **GitHub**: [github.com/Lyra-lane](https://github.com/Lyra-lane)

---

© 2025 ManYao Li. Built with modern web technologies and Morandi design principles.