# Data Analysis

### This folder contains 1)scripts for Data cleaning, data exploration and data analysis; 2) original and processed data files.



**WeatherData.ipynb** runs on Jupyter notebook. It reads all csv files stored in a local folder, and combines the weather data of US states ranging from year 1984 to 2018. Only selected features are kept from the original file, and for each US state, the data from multiple weather stations are aggregated to produce the mean data and stored in a file call processed_weather.csv.
**Data cleaning.ipynb** runs on Jupyter Notebook, it contains data cleaning procedures of all raw data. 
(*beans_production.csv, cattle_production.csv, corn planted by acres by state from 1866-2018.csv,corn_production.csv, processed_weather.csv, soybean_production.csv,States.csv, suybean planted by acres by state from 1924-2018.csv*) and generates the final version of data(*412_UPDATED_cattle_corn_soybean_weather.csv*), which will be used for further visulazation.
**data_exploration.ipynb** runs on Jupyter Notebook. It reads the above csv file containing all features and labels, and explore the basic statistics of each feature, the correlation between each feature, and the correlation of each feature with Cattle production. At the end of the script, a linear regression model was built to predict cattle production from 11 selected features. The results can be directly observed from *data_exploration.html*.
**time_series_model.R** runs through R. It contains the time series model (ARIMA) and prediction results for each state. Prediction results stores in *Time_Series_Forecast.csv*.
**TensorFlow.ipynb** runs on Jupyter notebook. It contains the linear regression model built using TensorFlow. The model is saved in *model.hdf5*.
