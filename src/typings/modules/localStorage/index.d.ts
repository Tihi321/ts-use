declare const localStorage: {
  getItem: (key: string) => string | number | boolean | null;
  setItem: (key: string, value: string | number | boolean) => void;
};
