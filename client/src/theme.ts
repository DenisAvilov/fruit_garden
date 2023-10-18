// import themeDefault from '@/theme'
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
// import color from '@mui/material/colors'
import { colors } from '@mui/material';
import test from 'node:test';

const theme = createTheme({
// $cadet-gray: #749299ff;
// $misty-rose: #f4e1e1ff;
// $ash-gray: #c4c5baff;
// $cadet-gray-2: #83a6b1ff;
// $dim-gray: #747478ff;
  typography: {
    fontFamily:`Caveat, cursive`,
  },
  
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: `
  //      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap');
  //     `,
  //   },
  // },

  palette: {
    primary: {
    main: '#8ea8ae52',//вершний и нижний колонтикул
    light:'#c4c5baff',
    dark: 'rgb(99 117 121);'    
    },
    secondary: {
     
      main: `#3c3e2d`, // Иконки      
      light: `#83a6b1ff`   //кнопки и призіві к действию // ховер на кнопке
   
      // dark
     
    },
    text:{
      primary: '#3c3e2d' // Звичайний текст
      
    }
   

  },
});

export default theme;


// Значения, заданные через /, определяют горизонтальные и вертикальные радиусы. Свойство не наследуется.
// r8 {border-top: none; border-bottom: none; border-radius: 30px/90px;}