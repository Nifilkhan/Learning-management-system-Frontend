import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-course-enrollment-chart',
  templateUrl: './course-enrollment-chart.component.html',
  styleUrls: ['./course-enrollment-chart.component.scss']
})
export class CourseEnrollmentChartComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId:object) {}

  ngAfterViewInit() {
  if(isPlatformBrowser(this.platformId)) {
      this.initChart();
      console.log('Running in browser')
    }
  }

  private initChart() {
        // Initialize the chart only on the client-side
        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);

        const option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
        };

        myChart.setOption(option);
}
}
