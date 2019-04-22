# read data
raw_data=read.csv("412_UPDATED_cattle_corn_soybean_weather.csv")
data = raw_data[c(2,3,4)]
# convert cattle production data from string to number
x1 = sub(",","",data$Cattle.production.in.lb)
x2 = sub(",","",x1)
x3 = sub(",","",x2)
data$Cattle.production.in.lb = as.numeric(x3)
# store all state names 
statename_raw = unique(data[,2])
statename = as.character(statename_raw)
# run arima for each state's cattle production data from 1988 to 2017 and make production for the following four years
j = 1
orderlist = list()
models <- vector(mode="list", length=50)
names(models) <- statename
uboundlist = NULL
lboundlist = NULL
predvallist = NULL
for(i in 1:(nrow(data))){
  # every 30 rows represent one state data from 1988 to 2017
  if (i%%30 == 0){
    
    state = statename[j]
    start = i-29
    dat0 = data[start:i,] #each state data
    #print(3)
    catl = ts(dat0[3],start = 1988, fre = 1) # make data to time series
    #plot(catl, main = state)
    #plot(diff(catl), main = state)
    # run arima model and find best order
    aic = Inf
    order = c(0,0,0)
    for (p in 1:6) for(d in 0:1) for (q in 1:6) {
      current.aic = AIC(arima(catl/100000, order=c(p, d, q), method="ML"))
      if (current.aic < aic) {
        aic = current.aic
        order = c(p, d, q)
      }
    }
    orderlist = append(orderlist,list(order))
    # use the best arima data to fit data and make prediction
    # note: the data range is large and sometimes crash arima function, 
    # so I transform data by dividing 10,000
    # and then transform back.
    model = arima(catl/100000,order = order, method = 'ML')
    pred = as.vector(predict(model,n.ahead=4))
    pred_value = pred$pred*100000
    # 95% upper and lower bound for prediction
    ubound = (pred_value+1.96*pred$se*100000)
    lbound = (pred_value-1.96*pred$se*100000)
    ymin_dl = min(lbound, catl)
    ymax_dl = max(ubound, catl)
    uboundlist = c(uboundlist,ubound)
    lboundlist = c(lboundlist,lbound)
    predvallist = c(predvallist, pred_value)
    # combine origin production data with predicted data in order to make a plot of them together
    y_values = as.vector(c(as.vector(catl),as.vector((pred_value))))
    #store the result plot as a pdf file
    pdf(paste("Forcast of cattle production of ",state,".pdf",sep=""))
    plot(x = c(1988:2021), y = y_values ,type="l", ylim=c(ymin_dl,ymax_dl),xlab="Date", ylab="Cattle production", main = state)
    points(pred_value,col="blue")
    lines(ubound,col="red")
    lines(lbound,col="green")
    dev.off()
    
    j = j + 1
  }
}
# store all the predicted data in a dataframe:df
statelist <- NULL
for (i in 1:50){
  statelist <- c(statelist,statename[i])
  statelist <- c(statelist,statename[i])
  statelist <- c(statelist,statename[i])
  statelist <- c(statelist,statename[i])
}
df <- data.frame(statelist,lboundlist, uboundlist, predvallist)
write.csv(df, file = "Time_Series_Forecast.csv")


