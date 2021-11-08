import React from "react";
import { generateClassByDate } from "../../utils";
import { ViewClass } from "../modal";
import css from "./MonthCalendar.module.css";
import { v4 as uuidv4 } from "uuid";

interface Props {
  currentDate: Date;
  text: string;
  data: ReturnType<typeof generateClassByDate>;
}

export const ShowMoreClass: React.FC<Props> = ({ currentDate, text, data }) => {
  const [expand, setExpand] = React.useState(false);
  const id = uuidv4();
  const controllerId = uuidv4();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (document.getElementById(id)) {
        const targ = e.target as HTMLElement;
        if (
          targ !== document.getElementById(id) &&
          !document.getElementById(id)?.contains(targ as Node) &&
          targ.id !== controllerId &&
          document.querySelector(".App")?.childElementCount === 1
        ) {
          setExpand(false);
        }
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [ref.current, id]);

  return (
    <React.Fragment>
      <div
        id={controllerId}
        onClick={() => setExpand(true)}
        className={css.more}
      >
        {text}
      </div>
      {expand && (
        <div ref={ref} id={id} className={css.moreContent}>
          <div className={css.title}>
            <div className="txt-thin txt-md">
              {currentDate.toLocaleString("en-US", {
                weekday: "short",
              })}
            </div>
            <div className="txt-lg">
              {currentDate.toLocaleString("en-US", {
                day: "2-digit",
              })}
            </div>
          </div>
          {data?.map((c) => (
            <ViewClass
              data={c}
              childController={
                <div className={css.classItem}>
                  {c.subject.name} - {c.module}
                </div>
              }
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
