
import { useState } from 'react'


// export default const HabitRingPath = props => {

// }


class Path extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isHovered: false
      };
    }
  
    onMouseOver = () => {
      this.setState({
        isHovered: true
      });
    };
  
    onMouseOut = () => {
      this.setState({
        isHovered: false
      });
    };
  
    interpolateOutter = d3.interpolateRgb("#36384b", "#4992ab");
    dataOutter = [1, 2, 4];
  
    render() {
      let { radius, slice, sliceColor, interpolate } = this.props;
  
      const outerRadius = this.state.isHovered ? radius * 1.1 : radius;
      const innerRadius = radius * 0.7;
  
      const arc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .padAngle(0.01)
        .cornerRadius(2);
  
      let outterPie = d3
        .pie()
        .startAngle(slice.startAngle)
        .endAngle(slice.endAngle);
  
      const arc2 = d3
        .arc()
        .innerRadius(outerRadius * 1.01)
        .outerRadius(outerRadius * 1.3)
        .padAngle(0.005)
        .cornerRadius(0);
  
      return (
        <g>
          <path
            d={arc(slice)}
            fill={sliceColor}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
          />
          {outterPie(this.dataOutter).map((outterSlice, index) => {
            let sliceColorOutter = this.interpolateOutter(
              index / (outterPie(this.dataOutter).length - 1)
            );
  
            return <path d={arc2(outterSlice)} fill={sliceColorOutter} />;
          })}
          {this.state.isHovered && (
            <circle r={innerRadius * 0.95} fill={sliceColor} />
          )}
        </g>
      );
    }
  }

  export default Path