import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: {
    '#nprogress .bar': {
      background: '#F47A15 !important',
    },
    '#nprogress .peg': {
      boxShadow: 'none !important',
    },
    html: {
      minHeight: '100vh',
    },
    body: {
      minHeight: '100vh',
      bg: 'gray.50',
      '#__next': {
        minHeight: '100vh',
        display: 'flex',
        flexDir: 'column',
      },
      fontSize: 'md',
      color: 'black',
    },
    '.slick-dots': {
      top: '350px',
      right: '10px',
      fontSize: '18px',
      height: '10px',
    },
    '.slick-dots li button:before': {
      fontSize: '20px',
      lineheight: '20px',
      color: '#FFB376',
    },
    '.slick-dots li.slick-active button:before': {
      color: '#FFFFFF !important',
    },
    '.slick-prev:before,.slick-next:before': {
      display: 'none',
    },
  },
};

export default styles;
