import React from "react";
import { FaCaretDown } from "react-icons/fa";

import css from "./HeaderSelect.module.css";
import ctx from "classnames";

//! filter term
interface Props {
  label: string;
  data: {
    key: any;
    value: any;
    label: any;
    children?: { key: any; value: any; label: any }[];
  }[];
  setState: (value: any) => void;
  setSubState?: (value: any) => void;
  defaultValue?: any;
  defaultSubStateValue?: any;
  classNames?: string;
}

export const HeaderSelect: React.FC<Props> = ({
  label,
  data,
  setState,
  defaultValue,
  setSubState,
  classNames,
  defaultSubStateValue
}) => {
  const [selected, setSelected] = React.useState(data[0]);
  const [subSelected, setSubSelected] = React.useState<{
    key: any;
    value: any;
    label: any;
  } | null>(null);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (defaultValue)
      setSelected(data.filter((d) => d.value === defaultValue)[0]);
    // ! defaultSubStateValue
  }, [defaultValue]);

  return (
    <div className={ctx(css.wrapper, classNames)}>
      <div onClick={() => setActive(!active)} className={css.select}>
        <div className={css.title}>{label}</div>
        <div className={css.meta}>
          <div className={css.subtitle}>{`${
            subSelected
              ? `${selected.label} | ${subSelected.label}`
              : selected.label
          }`}</div>
          <FaCaretDown />
        </div>
      </div>
      {active && (
        <div className={css.dropdown}>
          {data.map((d) => (
            <React.Fragment>
              <div
                onClick={() => {
                  setSelected(d);
                  setSubSelected(null);
                  if (setSubState) setSubState(undefined);
                  // setstate
                  setState(d.value);
                  setActive(!active);
                }}
              >
                {d.key}
              </div>
              {d.children &&
                d.children.map((c) => (
                  <div
                    onClick={() => {
                      setSelected(d);
                      setSubSelected(c);
                      setState(d.value);
                      if (setSubState) setSubState(c.value);
                      setActive(!active);
                    }}
                    className={css.children}
                  >
                    {c.key}
                  </div>
                ))}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
