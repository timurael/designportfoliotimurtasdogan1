# Modern Glassmorphism Portfolio

A stunning single-page portfolio website featuring glassmorphism design, smooth animations, and modern web technologies.

## ✨ Features

### Design
- **Glassmorphism UI**: Beautiful glass morphism effects with backdrop-filter blur
- **Apple-inspired Design**: Clean, minimal, premium aesthetic
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Smooth Animations**: Intersection Observer-based scroll animations
- **Parallax Effects**: Mouse-based parallax on hero elements

### Technical
- **Performance Optimized**: Lazy loading, throttled events, optimized animations
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support
- **SEO Ready**: Meta tags, structured data, Open Graph tags
- **Cross-browser Compatible**: Fallbacks for unsupported features
- **Mobile Optimized**: Touch-friendly interactions, simplified animations

### Sections
1. **Hero Section**: Full-screen glass card with animated background
2. **Featured Work**: Interactive project gallery with hover effects
3. **Project Modals**: Detailed project views with image galleries
4. **About Section**: Skills showcase with animated glass shapes
5. **Contact Form**: Functional contact form with glass styling
6. **Social Links**: Glass-styled social media buttons

## 🚀 Quick Start

1. **Clone or Download** the portfolio files
2. **Open** `index.html` in your browser
3. **Customize** content, colors, and projects
4. **Generate Images** using `placeholder-generator.html`
5. **Deploy** to your preferred hosting platform

## 📁 File Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles and animations
├── script.js               # JavaScript functionality
├── placeholder-generator.html  # Tool for generating project images
├── README.md               # This file
└── assets/                 # Your project images (to be added)
    ├── hadi-preview.jpg
    ├── tom-preview.jpg
    ├── coherent-preview.jpg
    ├── video-preview.jpg
    └── ...
```

## 🎨 Customization Guide

### Colors
Update CSS custom properties in `:root`:
```css
:root {
    --accent-primary: #0066CC;    /* Your primary color */
    --accent-secondary: #5E5CE6;  /* Your secondary color */
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.18);
}
```

### Content
1. **Personal Info**: Update name, title, and description in HTML
2. **Projects**: Modify project data in `script.js` around line 190
3. **Skills**: Update skills list in the About section
4. **Social Links**: Replace href attributes with your profiles

### Images
1. Use `placeholder-generator.html` to create initial images
2. Replace with your actual project screenshots
3. Optimize images for web (WebP format recommended)
4. Update image paths in HTML and JavaScript

## 🖼️ Image Requirements

### Project Previews (600x400px)
- `hadi-preview.jpg` - Fintech app preview
- `tom-preview.jpg` - Social media campaign preview  
- `coherent-preview.jpg` - Analysis project preview
- `video-preview.jpg` - Video production preview

### Project Detail Images (400x300px)
- `hadi-1.jpg`, `hadi-2.jpg`, `hadi-3.jpg`
- `tom-1.jpg`, `tom-2.jpg`, `tom-3.jpg`
- `coherent-1.jpg`, `coherent-2.jpg`, `coherent-3.jpg`
- `video-1.jpg`, `video-2.jpg`, `video-3.jpg`

## ⚡ Performance Tips

1. **Optimize Images**: Use WebP format with JPEG fallbacks
2. **Lazy Loading**: Already implemented for images
3. **Reduce Motion**: Animations respect `prefers-reduced-motion`
4. **Mobile Performance**: Simplified animations on smaller screens
5. **Browser Support**: Fallbacks for backdrop-filter

## 🌐 Browser Support

- **Modern Browsers**: Full glassmorphism effects
- **Safari 14+**: Full support
- **Chrome 76+**: Full support  
- **Firefox 103+**: Full support
- **Older Browsers**: Graceful fallbacks without backdrop-filter

## 📱 Mobile Considerations

- Touch-friendly tap targets (min 44px)
- Reduced blur intensity for performance
- Simplified animations
- Responsive typography and spacing
- Stack layout on small screens

## 🔧 Deployment

### Static Hosting (Recommended)
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Push to `gh-pages` branch
- **Surge.sh**: Use `surge` command

### Custom Domain
1. Update meta tags with your domain
2. Update Open Graph URLs
3. Add proper canonical URLs
4. Update structured data

## 📈 SEO Optimization

- ✅ Meta descriptions and keywords
- ✅ Open Graph tags for social sharing
- ✅ Structured data (JSON-LD)
- ✅ Semantic HTML structure
- ✅ Alt text for images
- ✅ Proper heading hierarchy

## 🎯 Analytics Setup

Add your analytics code before closing `</body>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Known Issues & Solutions

### Backdrop-filter Not Working
- Ensure HTTPS (required for some browsers)
- Check browser support
- Fallback styles are automatically applied

### Performance on Mobile
- Animations are automatically simplified
- Blur effects are reduced
- Large images are lazy-loaded

### Form Submission
- Currently simulated - integrate with your backend
- Consider services like Formspree or Netlify Forms

## 📞 Support

For questions or customization help:
1. Check browser console for errors
2. Validate HTML/CSS
3. Test on different devices
4. Use browser dev tools for debugging

## 📄 License

Free to use for personal and commercial projects. Attribution appreciated but not required.

---

**Made with ❤️ using vanilla HTML, CSS, and JavaScript**