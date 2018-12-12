import React from 'react'
import { View } from 'react-native'
import {
  Svg,
  Rect
} from 'react-native-svg'
import AbstractChart from './abstract-chart'

class BarChart extends AbstractChart {
  renderBars = config => {
    const { data, width, height, paddingRight, paddingTop } = config
    return data.map((x, i) => {
      const barHeight = height / 4 * 3 * ((x - Math.min(...data)) / this.calcScaler(data))
      const barWidth = (width - paddingRight) / data.length
      return (
        <Rect
          key={Math.random()}
          x={(paddingRight + (i * (width - paddingRight) / data.length))}
          y={(((height / 4 * 3) - barHeight) + paddingTop)}
          width={barWidth - 1}
          height={barHeight}
          fill="rgba(0, 86, 256, 0.75)"
        />)
    })
  }

  renderBarTops = config => {
    const { data, width, height, paddingRight, paddingTop } = config
    return data.map((x, i) => {
      const barHeight = height / 4 * 3 * ((x - Math.min(...data)) / this.calcScaler(data))
      const barWidth = (width - paddingRight) / data.length
      return (
        <Rect
          key={Math.random()}
          x={(paddingRight + (i * (width - paddingRight) / data.length)) + (barWidth / 2)}
          y={(((height / 4 * 3) - barHeight) + paddingTop)}
          width={barWidth}
          height={2}
          fill={this.props.chartConfig.color(0.6)}
        />)
    })
  }

  render() {
    const paddingTop = 16
    const { width, height, data, style = {}, chartConfig } = this.props
    const { borderRadius = 0 } = style
    const config = {
      width,
      height
    }
    const { paddingRight, pre='' } = chartConfig;
    const barWidth = (width - paddingRight) / data.length
    return (
      <View style={style}>
        <Svg
          height={height}
          width={width}
        >
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"/>
          {this.renderHorizontalLines({
            ...config,
            count: 4,
            paddingTop
          })}
          {this.renderHorizontalLabels({
            ...config,
            count: 4,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight,
            type: 'bar',
            pre
          })}
          {this.renderVerticalLabels({
            ...config,
            labels: data.labels,
            paddingRight,
            paddingTop,
            horizontalOffset: barWidth
          })}
          {this.renderBars({
            ...config,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight
          })}
          {/* {this.renderBarTops({
            ...config,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight
          })} */}
        </Svg>
      </View>
    )
  }
}

export default BarChart
