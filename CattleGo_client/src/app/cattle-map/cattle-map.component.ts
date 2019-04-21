import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { US } from './../data/us.model';
import { DATA } from '../data/data.model';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import { color } from 'd3';
import * as d3Array from 'd3-array';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-cattle-map',
  templateUrl: './cattle-map.component.html',
  styleUrls: ['./cattle-map.component.css']
})
export class CattleMapComponent implements OnInit {

  data:any[];

  us:any;
  us_0:any;
  states:string[];

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
  
  constructor() {
    this.us_0 = US;
    this.us = US;
   }

  ngOnInit() {
    this.createMap('', '');
  }

  mapDraw(f) {
    this.states = this.getStates();
    this.data = [];

    let chooseData = f.chooseData;
    let chooseYear = f.chooseYear;

    if (chooseYear.length > 0 && chooseData.length > 0){
      this.prepareDate(chooseYear);
      this.createMap(chooseYear, chooseData);
    }
  }

  resetMap() {
    this.createMap('', '');
  }

  private prepareDate(chooseYear:string): void {
    this.data = DATA.filter(function(d) {
      return d['Year'] == parseInt(chooseYear);
    });

    this.us = this.us_0;

    let features = ['Cattle', 'Corn', 'Soybeans', "TMAX", "TAVG", "EMXT", "EMNT", "PRCP", "SNOW", "AWND"];
    let i:number;
    let j:number;
    let k:number;

    for (i = 0; i < this.data.length; i++) {
      //Grab state name
      let dataState = this.data[i].STATE;
      //Grab data value, and convert from string to float
      let stateValue = this.data.filter(function(d) {
        return d['STATE'] == dataState;
      });
      let stateData = stateValue[0];
      //Find the corresponding state inside the GeoJSON
      for (j = 0; j < this.us.features.length; j++) {
        let jsonState = this.us.features[j].properties.name;
        if (dataState == jsonState) {
          //Copy the data value into the JSON
          for (k = 0; k < features.length; k++){
            this.us.features[j].properties[features[k]] = stateData[features[k]];
          }
          //Stop looking through the JSON
          break;       
        }
      }    
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
      .attr("d", path);
    }

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

}



