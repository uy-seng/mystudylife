import React from "react";
import { FaCaretDown } from "react-icons/fa";

import css from "./HeaderSelect.module.css";

interface Props {
  label: string;
  data: { key: any; value: any; label: any }[];
  setState: (value: any) => void;
  defaultValue?: any;
}

export const HeaderSelect: React.FC<Props> = ({
  label,
  data,
  setState,
  defaultValue,
}) => {
  const [selected, setSelected] = React.useState(data[0]);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (defaultValue)
      setSelected(data.filter((d) => d.value === defaultValue)[0]);
  }, [defaultValue]);

  return (
    <div className={css.wrapper}>
      <div onClick={() => setActive(!active)} className={css.select}>
        <div className={css.title}>{label}</div>
        <div className={css.meta}>
          <div className={css.subtitle}>{selected.label}</div>
          <FaCaretDown />
        </div>
      </div>
      {active && (
        <div className={css.dropdown}>
          {data.map((d) => (
            <div
              onClick={() => {
                setSelected(d);
                // setstate
                setState(d.value);
                setActive(!active);
              }}
            >
              {d.key}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
