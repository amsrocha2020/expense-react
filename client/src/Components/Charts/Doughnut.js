import React from "react";
import CanvasJSReact from "../../assets/js/canvasjs.react";

//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const charts = (props) => {

    const options = {
        animationEnabled: true,
        backgroundColor: "transparent",
        subtitles: [{
            text: "71% Positive",
            verticalAlign: "center",
            fontSize: 18,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: props.balAnual
            // dataPoints: [
            //     { name: "Ganhos", y: percGanhos },
            //     { name: "Despesas", y: percDespesas }
            // ]
            
        }]
    }

  return(
    <div>
			<CanvasJSChart options={options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
  );
 
}
  
export default charts;