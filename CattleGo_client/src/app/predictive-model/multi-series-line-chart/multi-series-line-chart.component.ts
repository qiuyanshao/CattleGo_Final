import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { ProductionData } from '../../data/production';

@Component({
    selector: 'app-multi-series-line-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './multi-series-line-chart.component.html',
    styleUrls: ['./multi-series-line-chart.component.css']
})
export class MultiSeriesComponent implements OnInit {

    title = 'Prediction of Cattle Production';

    data: any;
    production: any;
    prediction: any;
    states: any[];
    production_data: any[];
    production_data2: any;

    svg: any;
    margin = {top: 80, right:250, bottom: 30, left: 80};
    g: any;
    width: number;
    height: number;
    x;
    y;
    z;
    line;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    }
    reset(){
        this.states = [];
        this.data = 0;
        this.initChart();
        this.drawAxis();


    }

    apply(f){
        this.states = f.state;
        // console.log(this.states);
        this.ngOnInit();
      }
    states_list = [
        'Alabama','Arkansas','Delaware','Florida','Georgia','Iowa','Illinois','Indiana','Kansas','Kentucky','Louisiana','Maryland','Michigan','Minnesota','Missouri','Mississippi','North_Carolina','North_Dakota','Nebraska','New_Jersey','New_York','Ohio','Oklahoma','Pennsylvania','South_Carolina','South_Dakota','Tennessee','Texas','Virginia','Wisconsin','West_Virginia'
    ] 
    ngOnInit() {
        this.data = ProductionData.map((v) => v.values.map((v) => v.date ))[0];
        this.production_data = ProductionData.slice(0,0);
        ProductionData.forEach(element => {
            if (this.states !== undefined && this.states.length != 0) {
                for (let state_name of this.states) {
                    if (element.id.includes(state_name)){
                        let location = ProductionData.indexOf(element);
                        this.production_data.push(ProductionData.slice(location, location+1)[0]);
                    }
                }
            }
        });
        this.initChart();
        this.drawAxis();
        this.drawPath();
    }
    private initChart(): void {
        this.width = 750 - this.margin.left - this.margin.right;
        this.height = 350 - this.margin.top - this.margin.bottom;
        this.svg = d3.select('#multi_svg');
        this.svg.selectAll("*").remove();
        this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

        this.line = d3Shape.line()
            .curve(d3Shape.curveBasis)
            .x( (d: any) => this.x(d.date) )
            .y( (d: any) => this.y(d.Production) );

        this.x.domain(d3Array.extent(this.data, (d: Date) => d ));

        this.y.domain([
            d3Array.min(ProductionData, function(c) { return d3Array.min(c.values, function(d) { return d.Production; }); }),
            d3Array.max(ProductionData, function(c) { return d3Array.max(c.values, function(d) { return d.Production; }); }),
            // d3Array.max(this.production_data, function(c) {
            //     return d3Array.max(c.values, function(d) { 
            //             return d.Production;
            //     }); 
            // })
        ]);

        this.z.domain(this.production_data.map(function(c) { return c.id; }));
    }

    private drawAxis(): void {
        this.g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));

        this.g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('fill', '#000')
            .text('Cattle Production, Million Pounds');
    }

    private drawPath(): void {
        let city = this.g.selectAll('.city')
            .data(this.production_data)
            .enter().append('g')
            .attr('class', 'city');

        city.append('path')
            .attr('class', 'line')
            .attr('d', (d) => this.line(d.values) )
            .style('stroke', (d) => this.z(d.id) );

        city.append('text')
            .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
            .attr('transform', (d) => 'translate(' + this.x(d.value.date) + ',' + this.y(d.value.Production) + ')' )
            .attr('x', 3)
            .attr('dy', '0.35em')
            .style('font', '12px sans-serif')
            .text(function(d) { return d.id; });
    }

}
