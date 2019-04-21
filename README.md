# An Interactive Platform for US Cattle Production Visualization and Prediction
Team Members: tgao68, xcao67, qshao9, czhang487, yliu3093, yzhao464

The project aims to build an interactive platform to provide geographical and statistical representations of historical cattle production, to pinpoint the key factors influencing the cattle production industry. This will help predict future production to help those within the cattle industry make better plans and decisions.
## Clone Project Code
```bash
git clone https://github.com/XiaohuaCao/CattleGo_Final.git
```
There are two parts of the code for the project:
* `CattleGo_client`: UI for the project by using Angular 7
* `CattleGo_server`: API for the project by using Spring boot
## Run Project
### First Step - Start Server
#####  Environment Setup
* Download spring boot: https://spring.io/tools3/sts/all
* Open Spring Boot IDE: go to the downded folder above, doucle click the file: ..\sts-4.1.2.RELEASE\SpringToolSuite4
* notes: Amazon RDS for MySQL was used in this project, no need to set localhost database

#####  Run Server
* Import `CattleGo_server`: File import -> Maven -> Existing Maven Projects...
* Run server: right cilck the project name -> run as `spring boot app`
### Second Step - Start Client
##### Environment Setup
* Install the Angular CLI: 
```bash
npm install -g @angular/cli
```

#####   Run Client
* Go to project `CattleGo_client` root
* Install packages
 ```bash
npm install
```
* Serve the application
 ```bash
ng serve --open
```
* Go to `http://localhost:4200/`
* 
### Excution
Once CattleGo starts, the user will be able to navigate to the following modules:
* CattleGo Data
Users can choose the data category and year. After selection, an US-map based heatmap will be generated. Users can hover the mouse to see the details of a specific state. 
* CattleGO Comparison
Users can choose between stack bars and line chart for data presentation. Data from different states can be viewed at the same time for a better comparison. Users can hover the mouse to see the details of a specific state. 
* Predictive Model
Both time series and regression models have been implemented to predict the production of cattle. Users can enter inputs for specific selected state to customize the prediction by using the linear regression model, the predicted cattle production result will be given. 
* Survey
Users can give reviews and feedback about CattleGo Platform, the survey summaries can be viewed by users
* Data Source Table
Users can also navigate to the Data Source Table to review the raw data which was used for visusalization and machine learning.

















