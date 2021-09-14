import { Chart, ChartItem, registerables } from "chart.js";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import css from "./Counter.module.css";

interface Props {
  title: string;
  subtitle: string;
  data: number[];
}
export const Counter: React.FC<Props> = ({ title, subtitle, data }) => {
  const id = uuidv4();
  useEffect(() => {
    const ctx = document.getElementById(id) as ChartItem;
    Chart.register(...registerables);
    var counterChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: data,
            backgroundColor:
              data.length === 1 ? ["#c3c5c9"] : ["#c90019", "#eb9e0c"],
          },
        ],
      },
      options: {
        responsive: false,
        cutout: 45,
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
      },
    });
    return () => counterChart.destroy();
  }, [data, id]);

  return (
    <div className={css.wrapper}>
      <div className={css.info}>
        <div>{title}</div>
        <div>{subtitle}</div>
      </div>
      <canvas id={id} width="120" height="120" />
    </div>
  );
};
