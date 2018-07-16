import Typography from 'typography'
import theme from 'typography-theme-moraga'

const typography = new Typography({
  googleFonts: [
    {
      name: 'Lato',
      styles: ['300', '400', '400i']
    },
    {
      name: 'Lora',
      styles: ['400', '700']
    }
  ],
  headerFontFamily: ['Lora', 'serif'],
  bodyFontFamily: ['Lato', 'sans-serif'],
  headerColor: '#4777bb',
  headerWeight: 'normal'
})

export default typography
