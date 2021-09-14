interface Options {
  key: any;
  value: any;
}

export interface BaseSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Options[];
}

export interface BasicSelectProps extends BaseSelectProps {}
