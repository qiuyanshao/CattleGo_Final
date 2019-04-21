import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';

@Component({
  selector: 'app-linear-regression-predict',
  templateUrl: './linear-regression-predict.component.html',
  styleUrls: ['./linear-regression-predict.component.css']
})
export class LinearRegressionPredictComponent implements OnInit {
state: any;
tavg:any;
emxt: any;
emnt: any;
dx90: any;
dt32: any;
prcp: any;
snow: any;
awnd: any;
corn: any;
soybean: any;
result: any;
ngForm: any;

  constructor() { }

  ngOnInit() {

  }

  apply(f){
    console.log('f state ===', typeof(f.state));
    console.log('f tavg===', typeof(f.tavg));
    console.log('f tavg===0', typeof(+f.tavg));
    const STATE_Cof = 36215628.70555537;
    const TAVG_Cof = 464815552.83983296;
    const EMXT_Cof = 21892244.0624991;
    const EMNT_Cof = -27223615.57433582;
    const DX90_Cof = 9994847.599030681;
    const DT32_Cof = 24854911.596013106;
    const PRCP_Cof = -886074.2619075698;
    const SNOW_Cof = 9845.559570878615;
    const AWND_Cof = 822513902.2607877;
    const Corn_Cof = 122.73927538841963;
    const Soybean_Cof = 1.3441575765609741;
    this.result = STATE_Cof * f.state + TAVG_Cof * (+f.tavg) + EMXT_Cof*(+f.emxt) +
    EMNT_Cof * (+f.emnt) +  DX90_Cof * (+f.dx90) +   DT32_Cof * (+f.dt32) + 
    PRCP_Cof * (+f.prcp) + SNOW_Cof * (+f.snow) + AWND_Cof * (+f.awnd)+ Corn_Cof * (+f.corn) + 
    Soybean_Cof * (+f.soybean);
    console.log('result ===', this.result);
    //  f.reset();


  }
  clear() {
    this.result = "";
  }

    




}
