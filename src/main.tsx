import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {MotionGlobalConfig} from 'motion/react';
import '@fontsource/anton/latin-400.css';
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-500.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';
import App from './App.tsx';
import './index.css';
import {captureAttribution} from './lib/tracking';

captureAttribution();

// Dev only: ?skip_motion jumps every animation to its end state (for layout screenshots).
if (import.meta.env.DEV && window.location.search.includes('skip_motion')) MotionGlobalConfig.skipAnimations = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
