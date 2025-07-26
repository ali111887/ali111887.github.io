# Modern Resume - Nuxt.js

A beautiful, responsive resume built with Nuxt.js, Vue 3, and Tailwind CSS.

## Features

- 🎨 Modern, clean design with professional styling
- 📱 Fully responsive layout
- 🖨️ Print-friendly design
- 🌙 Dark/light theme toggle (ready for implementation)
- ⚡ Fast and optimized with Nuxt.js
- 🎯 SEO optimized
- 📦 Easy to customize and extend

## Tech Stack

- **Framework**: Nuxt.js 3
- **Frontend**: Vue.js 3 with Composition API
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **UI Components**: Headless UI
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-nuxt
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview

# Generate static site
npm run generate
```

## Customization

### Personal Information

Edit the content in `pages/index.vue` to update:

- Name and title
- Contact information
- Skills and technologies
- Work experience
- Education
- Projects
- Certifications

### Styling

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Typography**: Update fonts in `assets/css/main.css`
- **Layout**: Adjust the grid system and spacing in the Vue components

### Adding New Sections

1. Create a new card component in the appropriate column
2. Use the existing CSS classes for consistency
3. Follow the established pattern for section titles and content

## Project Structure

```
resume-nuxt/
├── assets/
│   └── css/
│       └── main.css          # Global styles and Tailwind imports
├── components/               # Reusable Vue components
├── layouts/                  # Layout components
├── pages/
│   └── index.vue            # Main resume page
├── public/                  # Static assets
├── app.vue                  # Root component
├── nuxt.config.ts           # Nuxt configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json
```

## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Optimized layout for all screen sizes

### Print Optimization
- Clean print layout
- Hidden navigation elements
- Optimized typography for printing

### Performance
- Lazy loading of components
- Optimized images and assets
- Minimal bundle size

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run generate`
2. Deploy the `dist` folder to Netlify

### Static Hosting
1. Generate static files: `npm run generate`
2. Upload the `dist` folder to your hosting provider

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help customizing your resume, please open an issue on GitHub. 