/* Basic types */

export type LoaderProps = {
  /* Loader size */
  size?: number | 20;
  /* Loader title */
  title: {
    text: string;
    size: 's' | 'm' | 'l';
  };
  /* Need subtitle */
  sub?: boolean;
  /* Loader center */
  ceneter: boolean;
};

export type SwitchProps = {
  /* On/Off */
  isOn: boolean;
  /* Toggle */
  toggleTheme: () => void;
  /* Range items */
  items: {start: string; end: string};
  /* Select style */
  style?: 'toggle' | 'radio';
};
