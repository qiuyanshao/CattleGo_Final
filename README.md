# An Interactive Platform for US Cattle Production Visualization and Prediction
Team Members: tgao68, xcao67, qshao9, czhang487, yliu3093, yzhao464

The project aims to build an interactive platform to provide geographical and statistical representations of historical cattle production, to pinpoint the key factors influencing the cattle production industry. This will help predict future production to help those within the cattle industry make better plans and decisions.
## Clone Project Code
```bash
git clone https://github.com/XiaohuaCao/CattleGo_Final.git
```
There are three parts of the code for the project:
* `CattleGo_client`: UI for the project by using Angular 7, Node.js, npm
* `CattleGo_server`: API for the project by using Spring boot
* `CattleGo_DataAnalysis`: Contains all the data process code (see README in the CattleGo_server folder for more details)
## Run Project
### First Step - Start Server
#####  Environment Setup
* Download spring boot: https://spring.io/tools3/sts/all
* Download nodejs boot: https://nodejs.org/en/download/
* Download Java JDK: https://www.oracle.com/technetwork/java/javase/downloads/index.html
* Open Spring Boot IDE: go to the downded folder above, doucle click the file: ..\sts-4.1.2.RELEASE\SpringToolSuite4


* notes: Amazon RDS for MySQL was used in this project, no need to set localhost database

#####  Run Server
* unzip the file "CattleGo_server.zip"
* Import `CattleGo_server`: File import -> Maven -> Existing Maven Projects...
* right cilck the project name ->run as -> `Maven clean`
* right cilck the project name ->run as -> `Maven install`
* Run server: right cilck the project name -> run as `spring boot app`
* if you have an error message during the process "No compiler is provided in this environment. Perhaps you are running on a JRE rather than a JDK?", you will need to change the IDE perferences of STS following the instructions below:
* goto Windows-->preferences-->installed jres
* remove the exising JRE
* add the JDK path (for Windows user, you may find it here: C:\Program Files\Java\jdk1.8.0_181)
### Second Step - Start Client
##### Environment Setup
* Install the Angular CLI: 
```bash
npm install -g @angular/cli
```

#####   Run Client
* Download Node: https://nodejs.org/en/
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
### Excution
Once CattleGo starts, the user will be able to navigate to the following modules:
* CattleGo Data:
Users can choose the data category and year. After selection, an US-map based heatmap will be generated. Users can hover the mouse to see the details of a specific state. 
* CattleGO Comparison:
Users can choose between stack bars and line chart for data presentation. Data from different states can be viewed at the same time for a better comparison. Users can hover the mouse to see the details of a specific state. 
* Predictive Model:
Both time series and regression models have been implemented to predict the production of cattle. Users can enter inputs for specific selected state to customize the prediction by using the linear regression model, the predicted cattle production result will be given. 
* Survey:
Users can give reviews and feedback about CattleGo Platform, the survey summaries can be viewed by users
* Data Source Table:
Users can also navigate to the Data Source Table to review the raw data which was used for visusalization and machine learning.

















