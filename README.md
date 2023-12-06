# eChook Logfile Viewer

This could be useful for anyone who uses an [eChook](https://github.com/echook) to log data. I volunteer with the Green Arrows Formula 24 team and we use an eChook to log data from the car.

I spent a lot of time trying to get the eChook data into a format that was clear to understand on Excel. 

I wanted to be able to see the data in a more visual way, and to be able to see the data from multiple laps at once and compare them. 

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/alanjsfleming)
## Usage 

You can ```git clone``` this repo and run it locally, or you can use the hosted version at [https://vis.dashowl.co.uk](https://vis.dashowl.co.uk).

### Local Usage

1. Clone this repo
2. ```cd lapviewer```
2. ```npm install```
3. ```npm start```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Use the hosted version

Go to the hosted site at [https://vis.dashowl.co.uk](https://vis.dashowl.co.uk).

### Upload a logfile

Upload an [eChook](https://github.com/echook) logfile and view the telemetry data in a browser. There is an example logfile you can use to try this out in the ```example logfiles``` folder.

### Input Parameters
Battery Capacity (Ah) : The capacity of your battery in Amp Hours. This is used to calculate the % Battery remaining. 

## Data headings
The program is expecting these following data headings. If you have a different heading, I recommend you make a copy of your file and manually change the headings to match these for now. I plan to make this more flexible in the future.

| Data headings:      | type           | range        | graphable? | notes |
| --------------------| -------------- | -----------  | ---------- |  ---- |
| timestamp           | unix timestamp |              |            |       |
| Input throttle (%)  | integer        | 0 < x < 100  |  yes       |        |
| Actual throttle (%) | integer        | ?            |            |        |
| Volts (V)           | real (2 dp)    | 0 < x < ~30  |  yes       |       |
| Aux volts (V)       | real (2 dp)    | 0 < x < ~20  |  yes       |        |
| Amps (A)            | real (2 dp)    | 0 < x < ~130 |  yes       |        |
| Amp hours (Ah)      | real (2 dp)    | 0 < x < ~30  |  yes       |         |
| Motor speed (RPM)   | integer        | 0 < x < ~2500 | yes       | ( sticks around 2000) |
| Speed (m/s)         | real (1 dp)    | 0 < x ~15    |  yes         |  |
| Distance (m)        | real (2 dp)    | 0 < x < ~100000|yes          |  (big number) |
| Temp1 (C)           | real (1 dp)    | 0 < x < 40   |  yes             |            |
| Temp2 (C)           | real (1 dp)    | 0 < x < 40   |  yes            |            |
| Gear ratio          | real (2 dp)    | 0 to 10 ?    |  yes             |           |
| Gear                |                |              |  yes              |          |
| Ideal gear          |                |              |                 |        |
| Efficiency (Wh/km)  |                |              |  no            |            |
| Steering angle (deg)|                |              |                 |          |
| Brake               |
| Fan status          |
| Fan duty (%)        |
| Latitude (deg)      |
| Longitude (deg)     |
| Altitude (m)        |
| Bearing (deg)       | real (1 dp) | 0 < x < 359.9
| SpeedGPS (m/s)      |
| GPSTime             |
| GPSAccuracy (m)     |
| Lap                 |
| Vehicle name        |
| Mode                | TEST or RACE
| Bluetooth           | CONNECTED or DISCONNECTED
| SFLBearing (deg)    | 
| ObserverBearing (deg)|
| Slope (deg)         | 
| PerformanceMetric   |
| Mangled data        |
| Custom 0            |
| Custom 1            |
| Custom 2            |
| Custom 3            |
| Custom 4            |
| Custom 5            |
| Custom 6            |
| Custom 7            |
| Custom 8            |
| Custom 9            |




    
## Planned Features
- Select which gauges and order.
- Add menu to select which columns are visualised and the paramters for gauges.
- Ability to 'play' the data, as though it were live.
- Mobile responsive
- Easier way to clean extra data by selecting start day and time, and end day and time.
- More flexible graphing options
- Set up online account for saving logfile and presets to stop having to upload the same logfile each time.