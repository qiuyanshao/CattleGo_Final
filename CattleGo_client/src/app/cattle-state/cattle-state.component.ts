import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { US } from './../data/us.model';
import { DATA } from '../data/data.model';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import { color } from 'd3';
import * as d3Array from 'd3-array';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-cattle-state',
  templateUrl: './cattle-state.component.html',
  styleUrls: ['./cattle-state.component.css']
})
export class CattleStateComponent implements OnInit {

  data:any[];
  data2:any[];
  data3:Object[][];
  us:any;
  us_0:any;
  states:string[];

  private line: d3Shape.Line<[number, number]>;

  years = ['1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998',
  '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
  '2011', '2012', '2013', '2014', '2015', '2016', '2017'];

  options =  {"Cattle Production Data": "Cattle", 
  "Corn Production Data": "Corn", 
  "Soybeans Production Data": "Soybeans",
  "Yearly Mean Max Temperature": "TMAX",
  "Average Yearly Temperature": "TAVG",
  "Yearly Extreme Max Temperature": "EMXT",
  "Yearly Extreme Min Temperature": "EMNT",
  "Total Annual Precipitation": "PRCP",
  "Total Annual Snowfall": "SNOW",
  "Annual Average Wind Speed": "AWND"
};

units =  {"Cattle Production Data": "million.lb", 
"Corn Production Data": "thousand.ton", 
"Soybeans Production Data": "million.bu",
"Yearly Mean Max Temperature": "celsius",
"Average Yearly Temperature": "celsius",
"Yearly Extreme Max Temperature": "celsius",
"Yearly Extreme Min Temperature": "celsius",
"Total Annual Precipitation": "mm",
"Total Annual Snowfall": "mm",
"Annual Average Wind Speed": "mph"         
};

  margin = {top: 50, right: 50, bottom: 50, left: 50};
  margin2 = {top: 80, right: 20, bottom: 120, left: 150};

  constructor() {
    this.us_0 = US;
    this.us = US;
   }

  ngOnInit() {
    this.createMap('', '');
  }


  chartDraw(f) {
    this.states = this.getStates();
    this.data2 = [];

    let chooseData = f.chooseData;
    let chooseType = f.chooseType;

    if (chooseType == 'Line Chart') {
      this.prepareData3(chooseData);
      this.createChart3(this.states, chooseData, this.units[chooseData]);
    } 

    if (chooseType == 'Bar Chart') {
      this.prepareData2(chooseData);
      this.createChart2(this.states, this.options[chooseData], this.units[chooseData]);
    }
  }


  private createMap(chooseYear:string, chooseData:string): void {
    d3.select('#map-svg').remove();

    const us = this.us;
    const options = this.options;
    const width = 1000;
    const height = 500;

    let projection = d3.geoAlbersUsa()
                      .translate([width/2, height/2])
                      .scale(1000);

    let path = d3.geoPath()
                .projection(projection);

    const svg = d3.select("#us-map")
                  .append('svg')
                  .attr('id', 'map-svg')
                  .attr('width', width)
                  .attr('height', height)
                  .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');;
    
    const tip = d3Tip();
    if (chooseYear != '' && chooseData != ''){
      const feature = this.options[chooseData];
      const unit = this.units[chooseData];

      tip.attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
      return "<span>" + "State: " + d.properties.name + "</span>" + "<br>" + 
      "<span>" + "Year: " + chooseYear + "</span>" + "<br>" +
      "<span>" + chooseData + ": " + d.properties[feature].toFixed(2) + ' ' + unit + "</span>" + "<br>" 
      ;
      });
    } else {
      tip.attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
      return "<span>" + "State: " + d.properties.name + "</span>"
      ;
      });
    }
    svg.call(tip);
    
    if (chooseYear != '' && chooseData != ''){

      const feature = this.options[chooseData];
      const color = d3.scaleQuantize<string>()
                      .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"])
                      .domain([d3.min(this.data, function(d) { return d[feature]; }), 
                                d3.max(this.data, function(d) { return d[feature]; })
                              ]);

      svg.append("g")
      .attr('class', 'states')
      .selectAll("path")
      .data(us.features)
      .enter()
      .append("path")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on("click", sclick)
      .attr("d", path)
      .attr("fill", function(d) {

        //Get data value
        const feature = options[chooseData];
        const value = d["properties"][feature];
        
        if (value) {
          //If value exists…
          return color(value);
        } else {
          //If value is undefined…
          return "#ccc";
        }
      })
      .attr("text", function(d) {

        //Get data value
        const feature = options[chooseData];
        const value = d["properties"][feature];
        
        if (value) {
          //If value exists…
          return color(value);
        } else {
          //If value is undefined…
          return "#ccc";
        }
      });

    }else {
      svg.append("g")
      .attr('class', 'states')
      .selectAll("path")
      .data(us.features)
      .enter()
      .append("path")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on("click", sclick)
      .attr("d", path);
    }

    function sclick(d){
      if (!('selected' in d.properties)){
        d.properties['selected'] = false;
      }
    
      d.properties.selected = !d.properties.selected;

      if (chooseYear != '' && chooseData != ''){
        const color =  d3.select(this)
                          .attr("text");

        d3.select(this)
        .attr("fill", (d) => d['properties']['selected'] ? "rgba(224, 210, 12, 0.9)" : color
        );
      }else {
        d3.select(this)
        .attr("fill", (d) => d['properties']['selected'] ? "rgba(224, 210, 12, 0.9)" : "rgba(40, 33, 131, 0.89)"
        );
      }
      
    };
  }

  private getStates(): string[] {
    let states0: string[] = [];
    let states_map = d3.select('#map-svg').selectAll("path");
    let nodes = states_map['_groups']['0'];
    let len = nodes.length;
    let i = 0;


    for (; i < len; i++) {
      let node = nodes[i];
 
      if ('selected' in node['__data__']['properties']) {
        let tmp = node['__data__']['properties']['selected'];

        if (tmp) {
          states0.push(node['__data__']['properties']['name']);
        }
      } 
    } 

    return states0
  }

  private prepareData2(chooseData:string): void {
    let i:number;
    let j:number;
    let state_tmp:string;
    let tmp:Object;
    
    for (i = 0; i < this.years.length; i++) { 
      for (j = 0; j < this.states.length; j++) { 
        tmp = {};
        tmp[this.states[j]] = 0;
      }
      this.data2.push(tmp);
    }

    for (i = 0; i < this.states.length; i++) { 
      state_tmp = this.states[i];
      let data_tmp = DATA.filter(function(d) {
        return d['STATE'] == state_tmp;
      });

      for (j = 0; j < data_tmp.length; j++){
        let state_year_tmp = data_tmp[j];
  
        this.data2[state_year_tmp.Year-1988][state_tmp] = state_year_tmp[this.options[chooseData]];
      }
    }

    console.log(this.data2);
  }

  private createChart2(states:string[], product:string, unit:string): void {
    d3.select('#prod-svg2').remove();

    const years = this.years;
    const width = 1000;
    const height = 600;

    const svg = d3.select("#data-chart")
                  .append('svg')
                  .attr('id', 'prod-svg2')
                  .attr('width', width)
                  .attr('height', height);

    const contentWidth = width - this.margin2.left - this.margin2.right;
    const contentHeight = height - this.margin2.top - this.margin2.bottom;

    let stack = d3.stack()
                  .keys(states);

    let series = stack(this.data2);

    // console.log(series);

    const x = d3.scaleBand()
                .rangeRound([0, contentWidth])
                .padding(0.1)
                .domain(this.years);

    const y = d3.scaleLinear()
                .rangeRound([contentHeight, 0])
                .domain([0, d3.max(this.data2, function(d) {
                  // console.log('d is', d);
                  let tmp = Object.values(d);
                  let keys = Object.keys(d);
                  let total = 0;
                  let i;
                  for(i=0; i<tmp.length; i++){
                    // console.log(i, keys[i]);
                    total = total + d[keys[i]];
                  }
                  // console.log('total:', total);
                  return total
                })
              ]);

    const colors = d3.scaleOrdinal(d3.schemeCategory10);

    const colors2 = d3.schemeCategory10.map(d3.color);
    let colors3 = [];
    colors2.forEach(function(c) {
      colors3.push(c.toString());
    })

    const tip = d3Tip();
    tip.attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d, i) {
        let tmp = (d[1] - d[0]).toFixed(2);
        
        return "<span>" + "State: " + states[colors3.indexOf(d3.select(this).style("fill"))] + "</span>" + "<br>" + 
        "<span>" + product + ': ' + tmp + ' ' + unit + "</span>" + "<br>" + 
        "<span>" + "Year: " + years[i] + "</span>" + "<br>"
        ;
        });
    svg.call(tip);

    const g = svg.append('g')
                  .attr('transform', 'translate(' + this.margin2.left + ',' + this.margin2.top + ')');

    // console.log('series data:', series);

    const groups = g.selectAll("g")
                      .data(series)
                      .enter()
                      .append("g")
                      .style("fill", function(d, i) {
                        // console.log('group:',i);
                        return colors(i.toString());
                      });

    // Add a rect for each data value
    let rects = groups.selectAll("rect")
                      .data(function(d) { return d; })
                      .enter()
                      .append("rect")
                      .attr("x", function(d, i) {
                        return x(years[i]);
                      })
                      .attr("y", function(d) {
                        // console.log('rec y:', d3.select(this).style("fill"));
                        return y(d[1]);  // <-- Changed y value
                      })
                      .attr("height", function(d) {
                        // console.log('rec height:', y(d[0]) - y(d[1]));
                        return y(d[0]) - y(d[1]);  // <-- Changed height value
                      })
                      .attr("width", x.bandwidth())
                      .on('mouseover', tip.show)
                      .on('mouseout', tip.hide);;

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end');

  }

  private prepareData3(chooseData:string): void {
    let i:number;
    let j:number;
    let state_tmp:string;
    let tmp:Object;
    let year_tmp:number;
    let data_tmp:any[];
    this.data3 = [];

    console.log(this.states);

    for (i = 0; i < this.states.length; i++) {
      
      data_tmp = [];
      state_tmp = this.states[i];
      let state_data_tmp = DATA.filter(function(d) {
        return d['STATE'] == state_tmp;
      });

      for (j = 0; j < this.years.length; j++) {
        year_tmp = parseInt(this.years[j], 10)

        let state_year_data_tmp = state_data_tmp.filter(function(d) {
          return d['Year'] == year_tmp;
        })

        tmp = {year: year_tmp, data: state_year_data_tmp[0][this.options[chooseData]]};
        data_tmp.push(tmp);
      }
      this.data3.push(data_tmp);
    }

    // console.log(this.data3);

  }

  private createChart3(states:string[], product:string, unit:string): void {
    d3.select('#prod-svg2').remove();
    
    const data = this.data3;

    const width = 1000;
    const height = 600;

    const svg = d3.select("#data-chart")
                  .append('svg')
                  .attr('id', 'prod-svg2')
                  .attr('width', width)
                  .attr('height', height);
  
    const contentWidth = width - this.margin2.left - this.margin2.right;
    const contentHeight = height - this.margin2.top - this.margin2.bottom;

    const data_min = d3Array.min(d3Array.extent(data, function(state_data)  {
      let state_year_extent = d3Array.extent(state_data, (d) => d['data']);
      return state_year_extent[0]
    }));

    const data_max = d3Array.max(d3Array.extent(data, function(state_data)  {
      let state_year_extent = d3Array.extent(state_data, (d) => d['data']);
      return state_year_extent[1]
    }));
  
    const x = d3.scaleLinear()
                .range([0, contentWidth])
                .domain([1988, 2017]);
  
    const y = d3.scaleLinear()
                .range([contentHeight, 0])
                .domain([data_min, data_max]);


    this.line = d3Shape.line()
                       .x( (d: any) => x(d['year']) )
                       .y( (d: any) => y(d['data']) );

    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const colors2 = d3.schemeCategory10.map(d3.color);
    let colors3 = [];
    colors2.forEach(function(c) {
      colors3.push(c.toString());
    })

    const tip = d3Tip();
    tip.attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d, i) {
        let tmp = (d[1] - d[0]).toFixed(2);
        
        return "<span>" + "State: " + states[colors3.indexOf(d3.select(this).style("stroke"))] + "</span>"
        ;
        });
    svg.call(tip);
  

    const g = svg.append('g')
                  .attr('transform', 'translate(' + this.margin2.left + ',' + this.margin2.top + ')');
  
    const groups = g.selectAll("g")
                    .data(data)
                    .enter()
                    .append("g");

    groups.append("path")
          .datum(function(d) { return d; })
          .attr('class', 'line-data')
          .attr('d', this.line)
          .style('fill', 'none')
          .style('stroke', function(d, i) {
            console.log(colors3[i]);
            return colors3[i]
          } )
          .style('stroke-width', '8px')
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);
  
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));
  
    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end');

    g.append("text")             
       .attr("transform", "translate(" + (width/2) + " ," + (height - 145) + ")")
       .style("text-anchor", "middle")
       .style("font-size", "20px")
       .text("Year");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -60)
      .attr("x", -(height / 3))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text(product + ' (' + unit + ')'); 

  }

  reset() {
    this.data3 = [];
    this.states = [];
  }

}
