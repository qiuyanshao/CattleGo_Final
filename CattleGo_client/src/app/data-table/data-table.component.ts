import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  pageTitle = 'Table for Data Srouce';
  dataSource: any[];
  public characters;
  newSetting = {
    
    action:false,
      columns:{}
    };
    settings={
      action:false,
      columns:{}
    };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDataSource().subscribe(
      dataSource => {
        console.log('dataSource = ', dataSource[0]);
        this.dataSource = dataSource;
        this.characters = dataSource;
        var keys = Object.keys(this.characters[0]);
        console.log('keys = ', keys);
        var columnSetting = this.dataService.getSchema(keys);
        this.newSetting.columns = columnSetting;
        this.settings = Object.assign({}, this.newSetting);
        console.log("this is my final settings");
        console.log(this.settings);
        console.log(JSON.stringify(this.settings));
        console.log(this.dataSource);
        

      },
      error => console.log(error)
    ); 
  }

}
