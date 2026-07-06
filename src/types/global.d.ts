// Global type declarations for third-party browser globals

interface Window {
  // Meta Pixel / Facebook Pixel
  fbq: (...args: any[]) => void;
  _fbq: (...args: any[]) => void;
}
