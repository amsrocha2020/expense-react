var React = require("react");
// var Component = React.Component;
import CanvasJSReact from "../../assets/js/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Crosshair = (props) => {
  const options = {
    animationEnabled: true,
    theme: "light2",
    backgroundColor: "transparent",
    axisX: {
      valueFormatString: "DD MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      includeZero: false,
      valueFormatString: "€##0.00",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function (e) {
          return "€" + CanvasJS.formatNumber(e.value, "##0.00");
        },
      },
    },
    data: [
      {
        type: "area",
        xValueFormatString: "DD MMM",
        yValueFormatString: "€##0.00",
        // dataPoints: [ { x: new Date("2018-03-01"), y: 85.3},]
        dataPoints: props.expensesMonth,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export default Crosshair;
