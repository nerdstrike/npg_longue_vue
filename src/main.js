import App from './App.svelte';
import LangQc from './langQc.js';

const app = new App({
    target: document.body
});

export default app;
export {LangQc}; // exported for debug purposes in browser
