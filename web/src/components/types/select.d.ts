interface Options {
  key: any;
  value: any;
}

export interface BaseSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Options[];
  defaultValue?: any;
}

export interface BasicSelectProps extends BaseSelectProps {}
