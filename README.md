# Aurora Dawn SMP Website

A stunning, modern website for the Aurora Dawn Minecraft SMP server featuring premium animations, liquid ether effects, and a beautiful aurora-themed design.

## 🎨 Features

- **Liquid Ether Background**: Dynamic WebGL shader-based background using Three.js
- **Pill Navigation**: Smooth, animated navigation bar with scroll-hide functionality
- **Spotlight Cards**: Interactive feature cards with cursor-following spotlight effects
- **Parallax Scrolling**: Engaging image parallax effects on scroll
- **Count-Up Statistics**: Animated numerical statistics
- **Marquee Loop**: Infinite scrolling feature highlights
- **Glass Morphism**: Modern frosted glass UI elements
- **Gradient Text**: Eye-catching gradient text animations
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS

## 🚀 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles and animations
- **Tailwind CSS**: Utility-first CSS framework
- **React 18**: UI component library
- **Framer Motion**: Animation library for React
- **Three.js**: WebGL library for 3D graphics
- **Babel Standalone**: In-browser JSX transformation
- **Google Fonts**: Outfit & Russo One typefaces

## 📁 Project Structure

```
aurora_smp_web/
│
├── index.html              # Main HTML file
├── styles.css              # Custom CSS styles and animations
├── app.js                  # React components and application logic
├── README.md               # Project documentation
├── aurora_stock photos/    # Image assets directory
│   ├── Peaceful-Vanilla-Club-3.jpg
│   └── Peaceful-Vanilla-Club-4.jpg
└── .gitignore             # Git ignore file
```

## 🎯 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Installation

1. **Clone or Download** this repository
2. **Open** the project folder
3. **Run** a local web server (recommended)

### Running the Website

#### Option 1: Using Python's HTTP Server (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

#### Option 2: Using Node.js http-server
```bash
# Install http-server globally (first time only)
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

#### Option 3: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option 4: Direct File Access
Simply double-click `index.html` to open it in your default browser.
> **Note**: Some features may not work correctly without a web server.

## 🎨 Color Palette

The website uses a custom Aurora-themed color palette:

- **Aurora Dark**: `#0B1026` - Deep night sky background
- **Aurora Green**: `#00D2A0` - Primary accent color
- **Aurora Purple**: `#A364FF` - Secondary accent color
- **Aurora Blue**: `#4B9EFF` - Tertiary accent color
- **Aurora Text**: `#E0E7FF` - Soft white text

## ✨ Customization

### Changing Server IP
Update the server IP in the following locations:
- Line ~196 in `app.js`: Navbar Copy IP button
- Line ~610 in `app.js`: Hero Copy IP button
- Line ~841 in `app.js`: Footer server IP display

### Updating Statistics
Modify the stats in `app.js` around line 683-686:
```javascript
<GradientCountUp end={120} label="Online Now" />
<GradientCountUp end={365} label="Days Uptime" />
<GradientCountUp end={15420} label="Registered" />
<GradientCountUp end={100} label="Uptime %" />
```

### Changing Feature Loop
Edit the features array in `app.js` around line 511:
```javascript
const features = ["No P2W", "Land Claims", "Player Economy", "Events", "Brewery", "Jobs", "Quests", "Dungeons", "Creative PlotWorld"];
```

### Modifying Colors
Update the Tailwind config in `index.html` (lines 18-81) or modify the shader colors in `app.js` (lines 320-323).

## 🔧 Performance Optimization Tips

1. **Image Optimization**: Compress images in the `aurora_stock photos` folder using tools like TinyPNG or ImageOptim
2. **CDN Loading**: All libraries are loaded from CDNs for faster initial load
3. **Lazy Loading**: Consider adding lazy loading for images below the fold
4. **Production Build**: For production, consider building with a bundler like Webpack or Vite

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Internet Explorer: Not supported

## 🐛 Known Issues

- Some animations may be choppy on low-end devices
- WebGL background may not work on very old browsers
- Mobile performance varies based on device capabilities

## 📄 License

This project is free to use for your Minecraft server. Please credit if you use major portions of the code.

## 🤝 Contributing

Feel free to fork this project and customize it for your own server!

## 📞 Support

For issues or questions about Aurora Dawn SMP:
- Join our Discord: [Link here]
- Visit our server: `play.auroradawn.net`

## 🙏 Credits

- Design inspiration from [reactbits.dev](https://reactbits.dev)
- Liquid Ether effect inspired by domain warping FBM shaders
- Built with ❤️ for the Minecraft community

---

**Made with passion for Aurora Dawn SMP** ✨
