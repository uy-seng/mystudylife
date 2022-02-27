import React from "react";
import css from "./Slider.module.css";
import { v4 as uuidv4 } from "uuid";
import { debounce, throttle } from "lodash";

type Props = {
  min: number;
  max: number;
  defaultValue?: number;
  onChange: (newValue: number) => Promise<void>;
};

const Slider = (props: Props) => {
  const [value, setValue] = React.useState(props.defaultValue || 0);
  const debouncedOnChange = React.useCallback(
    debounce(props.onChange, 400),
    []
  );
  const id = uuidv4();

  return (
    <div id={`slider_${id}`} className={css.slider}>
      <div className={css.info}>{value}% complete</div>
      <div className={css.controls}>
        <div style={{ left: `${props.defaultValue}%` }} className={css.value}>
          <div>{value}%</div>
        </div>
        <div
          style={{ width: `${value}%` }}
          className={css.controller_highlight}
        />
        <input
          data-progress={`${value}%`}
          type="range"
          className={css.controller}
          value={value}
          onChange={(e) => {
            setValue(parseInt(e.target.value));

            const slider = document.querySelector(`#slider_${id}`);
            const sliderValue = slider?.querySelector(`.${css.value}`);

            if (sliderValue)
              (sliderValue as HTMLElement).style.left = `${e.target.value}%`;

            // onchange handler called here
            debouncedOnChange(parseInt(e.target.value));
          }}
          onMouseDown={(e) => {
            const slider = document.querySelector(`#slider_${id}`);
            const sliderValue = slider?.querySelector(`.${css.value}`);
            if (sliderValue) sliderValue?.classList.toggle(css.show);
          }}
          onMouseUp={(_e) => {
            const slider = document.querySelector(`#slider_${id}`);
            const sliderValue = slider?.querySelector(`.${css.value}`);
            if (sliderValue) sliderValue.classList.toggle(css.show);
            // send api request here
          }}
          min={props.min}
          step={5}
          max={props.max}
        />
      </div>
    </div>
  );
};

export default Slider;
