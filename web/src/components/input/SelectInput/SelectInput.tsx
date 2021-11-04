import React from "react";

import BaseInput from "../BaseInput";
import { SelectInputProps } from "../../types/input";

import css from "./SelectInput.module.css";
import { Button } from "../../button";

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  className,
  style,
  options,
  value,
  defaultValue,
  setState,
  ...props
}) => {
  const [searchTarget, setSearchTarget] = React.useState<string>("");
  const [filteredOptions, setFilteredOptions] = React.useState(options);

  if (className) className += ` ${css.input}`;
  else className = css.input;

  React.useEffect(() => {
    setFilteredOptions(() => {
      return options.filter(
        (option) =>
          option.key.includes(searchTarget) && !"None".includes(searchTarget)
      );
    });
  }, [searchTarget]);

  React.useEffect(() => {
    if (defaultValue) {
      const defaultKey = filteredOptions.filter(
        (option) => option.value === defaultValue
      )[0].key;
      setSearchTarget(defaultKey);
    }
  }, []);

  return (
    <BaseInput className={css.wrapper}>
      <BaseInput.Label className={css.label} text={label} />
      <div style={style} className={className}>
        <BaseInput.Field
          onFocus={onFocusHandler}
          value={searchTarget}
          onBlur={onBlurHandler}
          onChange={(e) => {
            setSearchTarget(e.target.value);
          }}
          style={{ width: "100%" }}
          {...props}
        />
        <div className={css.dropdown}>
          {searchTarget.length > 0 ? (
            filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.key}
                  onMouseDown={() => {
                    setState(option.value);
                    if (option.key === "None") setSearchTarget("");
                    else setSearchTarget(option.key);
                  }}
                  className={css.dropdownOption}
                >
                  {option.key}
                </div>
              ))
            ) : (
              <div
                className="txt-sm"
                style={{
                  textAlign: "center",
                  padding: "0.5rem",
                }}
              >
                Search result not found
              </div>
            )
          ) : (
            options.map((option) => (
              <div
                key={option.key}
                onMouseDown={() => {
                  setState(option.value);
                  if (option.key === "None") setSearchTarget("");
                  else setSearchTarget(option.key);
                }}
                className={css.dropdownOption}
              >
                {option.key}
              </div>
            ))
          )}
        </div>
        {searchTarget.length > 0 && (
          <Button
            onClick={() => setSearchTarget("")}
            style={{
              margin: "4px",
              padding: "0.5rem",
              fontSize: "10px",
              fontWeight: 600,
            }}
            as="primary"
            text="RESET"
          />
        )}
      </div>
    </BaseInput>
  );
};

const onFocusHandler = () => {
  document.querySelector(`.${css.dropdown}`)?.classList.add(css.active);
  document.querySelector(`.${css.input}`)?.classList.add(css.active);
};

const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
  if (e.target === e.currentTarget) {
    // console.log(e.target);
    // console.log(e.currentTarget);
    document.querySelector(`.${css.dropdown}`)?.classList.remove(css.active);
    document.querySelector(`.${css.input}`)?.classList.remove(css.active);
  }
};
