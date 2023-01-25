# GA-lapviewer
Visualise echook logfile data, playback

## todo 
- add visual gauges to telemetry
- add menu to control which telemetry shows and the paramters for gauges.
- add control for seeking through file and changing playback speed
- separate vis and telem into 2 columns, responsive for mobile.
- add 'start time' selector for graphs to function
- add graph of average lap amp hours, amps

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
| Speed (m/s)         | real (1 dp)    | 0 < x ~15    |  yes         | ( i think this needs converted) |
| Distance (m)        | real (2 dp)    | 0 < x < ~100000|yes          |  (this could be a big number) |
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