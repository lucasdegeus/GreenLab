rm(list=ls())
library(plyr)
library(pastecs)
library(ggplot2)
library(tidyverse)

# loading data
data = read.table("final_data.txt", header = TRUE, sep = ",", dec = ".")

data$site = as.factor(data$site)
data$crit = as.factor(data$crit)
data$browser = as.factor(data$browser)

# Data exploration

# Descriptive statistics
by(data[data$browser=="chrome", ], data[data$browser=="chrome", ]$crit, summary)

by(data[data$browser=="firefox", ], data[data$browser=="firefox", ]$crit, summary)

get_std <- function(data, browser, crit) {
  print(sd(data[which(data$browser == browser & data$crit==crit), ]$lt))
  print(sd(data[which(data$browser == browser & data$crit==crit), ]$fp))
  print(sd(data[which(data$browser == browser & data$crit==crit), ]$fcp))
  print(sd(data[which(data$browser == browser & data$crit==crit), ]$e))
}

get_std(data, "chrome", 0)
get_std(data, "firefox", 0)
get_std(data, "chrome", 1)
get_std(data, "firefox", 1)

# hist(data[which(data$browser == "chrome" & data$crit==0), ]$fcp, xlab="First contentful paint (ms)", ylab="Frequency", col=rgb(0,0,1,0.2))
# hist(data[which(data$browser == "chrome" & data$crit==1), ]$fcp, xlab="First contentful paint (ms)", ylab="Frequency", add=TRUE, col=rgb(1,0,0,0.2))
# boxplot(data[which(data$browser == "chrome" & data$crit==0), ]$fcp, data[which(data$browser == "chrome" & data$crit==1), ]$fcp, xlab="Critical CSS applied", ylab="First contentful paint (ms)", names=c("0", "1"))
# boxplot(data[which(data$browser == "chrome" & data$crit==0), ]$e, data[which(data$browser == "chrome" & data$crit==1), ]$e, xlab="Critical CSS applied", ylab="Energy consumption(J)", names=c("0", "1"))
# 
# boxplot(data[which(data$browser == "firefox" & data$crit==0), ]$fcp, data[which(data$browser == "firefox" & data$crit==1), ]$fcp, xlab="Critical CSS applied", ylab="First contentful paint (ms)", names=c("0", "1"))
# boxplot(data[which(data$browser == "firefox" & data$crit==0), ]$e, data[which(data$browser == "firefox" & data$crit==1), ]$e, xlab="Critical CSS applied", ylab="Energy consumption(J)", names=c("0", "1"))

p <- ggplot(data[data$browser=="chrome", ], aes(x = crit, y=e, group=crit)) + 
  geom_boxplot() + xlab("Critical CSS") + ylab("Energy (J)")
p + stat_summary(fun=mean, geom="point", shape=23, size=4) + theme(text = element_text(size = 20)) + scale_x_discrete(labels=c("Not applied", "Applied"))

p <- ggplot(data[data$browser=="chrome", ], aes(x = crit, y=fcp, group=crit)) + 
  geom_boxplot() + xlab("Critical CSS") + ylab("First contentful paint (ms)")
p + stat_summary(fun=mean, geom="point", shape=23, size=4) + theme(text = element_text(size = 20)) + scale_x_discrete(labels=c("Not applied", "Applied"))

# check normality

check_normality <- function(dataset_to_eval, x, title) {
  plot(density(dataset_to_eval), xlab=x, main=paste("Density plot for", title, sep=" "))
  qqnorm(dataset_to_eval, main=paste("Normal Q-Q Plot for", title, sep=" ")) # or use car
  print(shapiro.test(dataset_to_eval)) # need to print explicitly in a loop
}

# Chrome, critical = 0
check_normality(data[which(data$browser == "chrome" & data$crit==0), ]$lt, "Loading time (ms)", "chrome, crit = 0, loading time")
check_normality(data[which(data$browser == "chrome" & data$crit==0), ]$fp, "First paint (ms)", "chrome, crit = 0, first paint")
check_normality(data[which(data$browser == "chrome" & data$crit==0), ]$fcp, "First contentful paint (ms)", "chrome, crit = 0, first contentful paint")
check_normality(data[which(data$browser == "chrome" & data$crit==0), ]$e, "Energy usage (J)", "chrome, crit = 0, energy usage")

# Chrome, critical = 1
check_normality(data[which(data$browser == "chrome" & data$crit==1), ]$lt, "Loading time (ms)", "chrome, crit = 1, loading time")
check_normality(data[which(data$browser == "chrome" & data$crit==1), ]$fp, "First paint (ms)", "chrome, crit = 1, first paint")
check_normality(data[which(data$browser == "chrome" & data$crit==1), ]$fcp, "First contentful paint (ms)", "chrome, crit = 1, first contentful paint")
check_normality(data[which(data$browser == "chrome" & data$crit==1), ]$e, "Energy usage (J)", "chrome, crit = 1, energy usage")

# Firefox, critical = 0
check_normality(data[which(data$browser == "firefox" & data$crit==0), ]$lt, "Loading time (ms)", "firefox, crit = 0, loading time")
check_normality(data[which(data$browser == "firefox" & data$crit==0), ]$fp, "First paint (ms)", "firefox, crit = 0, first paint")
check_normality(data[which(data$browser == "firefox" & data$crit==0), ]$fcp, "First contentful paint (ms)", "firefox, crit = 0, first contentful paint")
check_normality(data[which(data$browser == "firefox" & data$crit==0), ]$e, "Energy usage (J)", "firefox, crit = 0, energy usage")

# Firefox, critical = 1
check_normality(data[which(data$browser == "firefox" & data$crit==1), ]$lt, "Loading time (ms)", "firefox, crit = 1, loading time")
check_normality(data[which(data$browser == "firefox" & data$crit==1), ]$fp, "First paint (ms)", "firefox, crit = 1, first paint")
check_normality(data[which(data$browser == "firefox" & data$crit==1), ]$fcp, "First contentful paint (ms)", "firefox, crit = 1, first contentful paint")
check_normality(data[which(data$browser == "firefox" & data$crit==1), ]$e, "Energy usage (J)", "firefox, crit = 1, energy usage")


# FIGURES FOR REPORT
# Figure density plots
par(mfrow=c(2,2))
plot(density(data[which(data$browser == "chrome" & data$crit==0), ]$fcp), xlab="First contentful paint (ms)", main="Density plot for chrome, crit = 0, first contentful paint")
plot(density(data[which(data$browser == "chrome" & data$crit==1), ]$fcp), xlab="First contentful paint (ms)", main="Density plot for chrome, crit = 1, first contentful paint")
plot(density(data[which(data$browser == "chrome" & data$crit==0), ]$e), xlab="Energy usage (J)", main="Density plot for chrome, crit = 0, energy usage")
plot(density(data[which(data$browser == "chrome" & data$crit==1), ]$e), xlab="Energy usage (J)", main="Density plot for chrome, crit = 1, energy usage")


# Figure Q-Q plots 
par(mfrow=c(2,2))
qqnorm(data[which(data$browser == "chrome" & data$crit==0), ]$fcp, main="Density plot for chrome, crit = 0, first contentful paint")
qqnorm(data[which(data$browser == "chrome" & data$crit==1), ]$fcp, main="Density plot for chrome, crit = 1, first contentful paint")
qqnorm(data[which(data$browser == "chrome" & data$crit==0), ]$e, main="Density plot for chrome, crit = 0, energy usage")
qqnorm(data[which(data$browser == "chrome" & data$crit==1), ]$e, main="Density plot for chrome, crit = 1, energy usage")

par(mfrow=c(1,1))
plot(density(data[which(data$browser == "chrome" & data$crit==0), ]$fcp), 
     xlab="First contentful paint (ms)", ylim=c(0,0.0012), col="blue", 
     main="With and without Critical CSS of first contentful paint in Chrome",
     cex.main=2, cex.lab=1.5)
lines(density(data[which(data$browser == "chrome" & data$crit==1), ]$fcp), col="red")
legend("topright",
       c("Critical CSS applied", "Critical CSS not applied"),
       fill=c("red","blue"),
       cex=1.5
)

#Chrome
par(mfrow=c(2,2))
plot(density(data[which(data$browser == "chrome" & data$crit==0), ]$lt), 
     xlab="Load time (ms)", ylim=c(0,0.0006), col="blue", 
     main="Density plot for load time in Chrome",
     cex.main=1, cex.lab=1.5)
lines(density(data[which(data$browser == "chrome" & data$crit==1), ]$lt), col="red")
legend("topright",
       c("Critical CSS applied", "Critical CSS not applied"),
       fill=c("red","blue"),
       cex=1.5
)

plot(density(data[which(data$browser == "chrome" & data$crit==0), ]$fp), 
     xlab="First paint (ms)", ylim=c(0,0.0012), col="blue", 
     main="Density plot for first paint in Chrome",
     cex.main=1, cex.lab=1.5)
lines(density(data[which(data$browser == "chrome" & data$crit==1), ]$fp), col="red")
legend("topright",
       c("Critical CSS applied", "Critical CSS not applied"),
       fill=c("red","blue"),
       cex=1.5
)

plot(density(data[which(data$browser == "chrome" & data$crit==0), ]$fcp), 
     xlab="First contentful paint (ms)", ylim=c(0,0.0012), col="blue", 
     main="Density plot for first contentful paint in Chrome",
     cex.main=1, cex.lab=1.5)
lines(density(data[which(data$browser == "chrome" & data$crit==1), ]$fcp), col="red")
legend("topright",
       c("Critical CSS applied", "Critical CSS not applied"),
       fill=c("red","blue"),
       cex=1.5
)

plot(density(data[which(data$browser == "chrome" & data$crit==0), ]$e), 
     xlab="Energy (J)", ylim=c(0,0.11), col="blue", 
     main="Density plot for energy in Chrome",
     cex.main=1, cex.lab=1.5)
lines(density(data[which(data$browser == "chrome" & data$crit==1), ]$e), col="red")
legend("topright",
       c("Critical CSS applied", "Critical CSS not applied"),
       fill=c("red","blue"),
       cex=1.5
)

# Firefox
par(mfrow=c(2,2))
plot(density(data[which(data$browser == "firefox" & data$crit==0), ]$lt), 
     xlab="Load time (ms)", ylim=c(0,0.0005), col="blue", 
     main="Density plot for load time in Firefox",
     cex.main=1, cex.lab=1.5)
lines(density(data[which(data$browser == "firefox" & data$crit==1), ]$lt), col="red")
legend("topright",
       c("Critical CSS applied", "Critical CSS not applied"),
       fill=c("red","blue"),
       cex=1.5
)

plot(density(data[which(data$browser == "firefox" & data$crit==0), ]$fp), 
     xlab="First paint (ms)", ylim=c(0,0.001), col="blue", 
     main="Density plot for first paint in Firefox",
     cex.main=1, cex.lab=1.5)
lines(density(data[which(data$browser == "firefox" & data$crit==1), ]$fp), col="red")
legend("topright",
       c("Critical CSS applied", "Critical CSS not applied"),
       fill=c("red","blue"),
       cex=1.5
)

plot(density(data[which(data$browser == "firefox" & data$crit==0), ]$fcp), 
     xlab="First contentful paint (ms)", ylim=c(0,0.0010), col="blue", 
     main="Density plot for first contentful paint in Firefox",
     cex.main=1, cex.lab=1.5)
lines(density(data[which(data$browser == "firefox" & data$crit==1), ]$fcp), col="red")
legend("topright",
       c("Critical CSS applied", "Critical CSS not applied"),
       fill=c("red","blue"),
       cex=1.5
)

plot(density(data[which(data$browser == "firefox" & data$crit==0), ]$e), 
     xlab="Energy (J)", ylim=c(0,0.08), col="blue", 
     main="Density plot for energy in Firefox",
     cex.main=1, cex.lab=1.5)
lines(density(data[which(data$browser == "firefox" & data$crit==1), ]$e), col="red")
legend("topright",
       c("Critical CSS applied", "Critical CSS not applied"),
       fill=c("red","blue"),
       cex=1.5
)
