import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../service/data.service';
import { US } from './../data/us.model';
import { DATA } from '../data/data.model';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import { color } from 'd3';
import * as d3Array from 'd3-array';
import * as d3Shape from 'd3-shape';


@Component({
  selector: 'app-predictive-model',
  templateUrl: './predictive-model.component.html',
  styleUrls: ['./predictive-model.css']
})
export class PredictiveModelComponent implements OnInit {
 
  temp: any;
  data:any[];
  data2:any[];
  data3:Object[][];
  us:any;
  us_0:any;
  states:string[];
  ngOnInit() {
    // this.createMap('', '');
  }


  examples = [
    {
        title: 'Linear Regression Prediction',
        route: '/predictive-model/linear-regression',
    },
    {
        title: 'Prediction of Cattle Production',
        route: '/predictive-model/multi-series'
    },

  ];

  margin = {top: 150, right: 50, bottom: 50, left: 50};

  constructor() {
    this.us_0 = US;
    this.us = US;
   }

  // private createMap(chooseYear:string, chooseData:string): void {
  //   d3.select('#map-svg').remove();

  //   const us = this.us;
  //   const width = 1000;
  //   const height = 500;

  //   let projection = d3.geoAlbersUsa()
  //                     .translate([width/2, height/2])
  //                     .scale(800);

  //   let path = d3.geoPath()
  //               .projection(projection);

  //   const svg = d3.select("#us-map")
  //                 .append('svg')
  //                 .attr('id', 'map-svg')
  //                 .attr('width', width)
  //                 .attr('height', height)
  //                 .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');;
    
  //   const tip = d3Tip();
  //   tip.attr('class', 'd3-tip')
  //     .offset([-10, 0])
  //     .html(function(d) {
  //     return "<span>" + "State: " + d.properties.name + "</span>"
  //     ;
  //     });
  //   svg.call(tip);
    

  //     svg.append("g")
  //     .attr('class', 'states')
  //     .selectAll("path")
  //     .data(us.features)
  //     .enter()
  //     .append("path")
  //     .on('mouseover', tip.show)
  //     .on('mouseout', tip.hide)
  //     .on("click", sclick)
  //     .attr("d", path);


  //   function sclick(d){
  //     if (!('selected' in d.properties)){
  //       d.properties['selected'] = false;
  //     }
    
  //     d.properties.selected = !d.properties.selected;
  //     d3.select(this)
  //       .attr("fill", (d) => d['properties']['selected'] ? "rgba(224, 210, 12, 0.9)" : "rgba(40, 33, 131, 0.89)");
  //   };
  // }

  // private getStates(): string[] {
  //   let states0: string[] = [];
  //   let states_map = d3.select('#map-svg').selectAll("path");
  //   let nodes = states_map['_groups']['0'];
  //   let len = nodes.length;
  //   let i = 0;


  //   for (; i < len; i++) {
  //     let node = nodes[i];
 
  //     if ('selected' in node['__data__']['properties']) {
  //       let tmp = node['__data__']['properties']['selected'];

  //       if (tmp) {
  //         states0.push(node['__data__']['properties']['name']);
  //       }
  //     } 
  //   } 

  //   return states0
  // }


}


