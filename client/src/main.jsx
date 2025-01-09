import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/rootReducer.js';

// Import Material-UI components
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme.js'; // Adjust path based on where you placed the file

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* Wrap the app with ThemeProvider and CssBaseline */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
