module.exports = {
  // ...existing code...
  content: [
    // ...existing content...
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0a1128", // deepest (heading, dark accents)
          800: "#001f54",
          700: "#034078",
          500: "#1282a2", // primary accent
          50:  "#fefcfb"  // page background / light
        }
      },
      // optional: subtle defaults for components
      backgroundColor: theme => ({
        page: theme('colors.brand.50'),
        surface: '#ffffff'
      }),
      textColor: theme => ({
        primary: theme('colors.brand.900'),
        accent: theme('colors.brand.500')
      })
    }
  },
  plugins: [
    // ...existing plugins...
  ]
}