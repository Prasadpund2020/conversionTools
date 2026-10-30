export {};

declare global {
  interface Window {
    __DEV_ANALYTICS_DISABLED__?: boolean;
    devAnalytics?: {
      enable: () => void;
      disable: () => void;
      toggle: () => void;
      status: () => { developerMode: boolean; analyticsBlocked: boolean };
    };
    toggleDevAnalytics?: () => void;
    enableDevAnalytics?: () => void;
    disableDevAnalytics?: () => void;
  }
}
