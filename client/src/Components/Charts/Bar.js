/* App.js */
var React = require('react');
var Component = React.Component;
import CanvasJSReact from "../../assets/js/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
const barChart = (props) => {	
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1", //"light1", "dark1", "dark2",
			data: [{
				type: "column", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: props.chart[0]
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
}
 
export default barChart;   