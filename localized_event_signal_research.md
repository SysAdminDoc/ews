# Localized Event Signal Research

This is a targeted validation pass for the endpoint-first detector. The event date/location is used only to choose the test window and report distance-to-event; cluster ranking itself is location-agnostic.

Takeoff and landing anchors are clustered directly from inferred endpoint coordinates with a 12-mile radius. The old ~100-mile cell summaries are retained as diagnostics.

| Event | Phase | Window | Label | Primary Cluster | Method | Distance | Global Peak Residual |
|---|---|---|---|---|---|---:|---:|
| Masters Tournament 2026 | departure | 2026-04-12T18:00 to 02:00 America/New_York | strong match near event | 33.39, -81.98 (+131) | endpoint cluster | 6 mi | 198 |
| Super Bowl LX | departure | 2026-02-09T08:00 to 18:00 America/Los_Angeles | regional match near event | 37.67, -122.26 (+156) | endpoint cluster | 24 mi | 100 |
| Art Basel Miami Beach 2025 | departure | 2025-12-07T15:00 to 01:00 America/New_York | regional match near event | 26.20, -80.19 (+119) | endpoint cluster | 29 mi | 54 |
| Kentucky Derby 2026 | departure | 2026-05-03T08:00 to 18:00 America/New_York | strong match near event | 38.25, -85.73 (+308) | endpoint cluster | 4 mi | 126 |
| Formula One Miami Grand Prix 2026 | departure | 2026-05-03T16:00 to 02:00 America/New_York | regional match near event | 26.08, -80.19 (+116) | endpoint cluster | 9 mi | 98 |
| Burning Man 2025 | departure | 2025-09-01T08:00 to 20:00 America/Los_Angeles | weak or diffuse | 39.23, -106.87 (+93) | endpoint cluster | 661 mi | 179 |
| Daytona 500 2026 | departure | 2026-02-16T08:00 to 18:00 America/New_York | weak or diffuse | 26.09, -80.19 (+150) | endpoint cluster | 220 mi | 324 |
| CES 2026 | departure | 2026-01-09T14:00 to 02:00 America/Los_Angeles | localized mismatch | 33.79, -84.42 (+52) | endpoint cluster | 1740 mi | 16 |
| Sun Valley Conference 2025 | departure | 2025-07-13T08:00 to 18:00 America/Boise | weak or diffuse | 39.60, -106.98 (+46) | endpoint cluster | 474 mi | 21 |
| Cannes / Monaco 2025 | US departure | 2025-05-23T08:00 to 18:00 America/New_York | diffuse / no localized gateway | 26.06, -80.21 (+74) | endpoint cluster | n/a | 125 |

## Details

### Masters Tournament 2026 - departure

Masters final round Apr 12, 2026.
Current window observed 2366 aircraft, inferred 1850 takeoffs and 2895 landings.
Baselines: 2026-03-01, 2026-03-15.
- Takeoff endpoint: 33.39, -81.98 (+131), share 0.21, 6 mi from event; current 131 vs baseline median 0.0.
- Landing endpoint: 33.37, -81.97 (+53), share 0.07, 7 mi from event; current 55 vs baseline median 2.0.
- Presence cell: 34.30, -82.45 (+850), share 0.20, 62 mi from event.
- Takeoff cell: 33.70, -81.93 (+282), share 0.44, 16 mi from event.
- Landing cell: 33.33, -82.45 (+138), share 0.20, 27 mi from event.

### Super Bowl LX - departure

Game Feb 8, 2026; checks the day-after departure window.
Current window observed 3918 aircraft, inferred 4777 takeoffs and 5728 landings.
Baselines: 2025-12-15, 2026-03-09.
- Takeoff endpoint: 37.67, -122.26 (+156), share 0.16, 24 mi from event; current 208 vs baseline median 51.5.
- Landing endpoint: 26.06, -80.21 (+76), share 0.08, 2553 mi from event; current 260 vs baseline median 184.5.
- Presence cell: 37.76, -119.94 (+1080), share 0.16, 114 mi from event.
- Takeoff cell: 37.73, -121.77 (+280), share 0.35, 25 mi from event.
- Landing cell: 26.21, -80.50 (+103), share 0.13, 2532 mi from event.

### Art Basel Miami Beach 2025 - departure

Public fair Dec 5-7, 2025; previews started Dec 3.
Current window observed 3192 aircraft, inferred 3174 takeoffs and 4432 landings.
Baselines: 2025-10-12, 2025-09-28.
- Takeoff endpoint: 26.20, -80.19 (+119), share 0.17, 29 mi from event; current 230 vs baseline median 111.0.
- Landing endpoint: 33.87, -84.30 (+45), share 0.06, 612 mi from event; current 50 vs baseline median 5.0.
- Presence cell: 27.29, -79.55 (+771), share 0.19, 109 mi from event.
- Takeoff cell: 25.87, -79.46 (+177), share 0.30, 42 mi from event.
- Landing cell: 26.35, -80.55 (+122), share 0.21, 46 mi from event.

### Kentucky Derby 2026 - departure

Derby day May 2, 2026.
Current window observed 3958 aircraft, inferred 6033 takeoffs and 5788 landings.
Baselines: 2026-03-08, 2026-02-22.
- Takeoff endpoint: 38.25, -85.73 (+308), share 0.20, 4 mi from event; current 326 vs baseline median 18.0.
- Landing endpoint: 38.23, -85.73 (+112), share 0.08, 3 mi from event; current 130 vs baseline median 17.5.
- Presence cell: 37.84, -85.12 (+1460), share 0.25, 44 mi from event.
- Takeoff cell: 37.80, -85.90 (+428), share 0.30, 29 mi from event.
- Landing cell: 37.33, -85.82 (+176), share 0.14, 60 mi from event.

### Formula One Miami Grand Prix 2026 - departure

Race weekend May 1-3, 2026.
Current window observed 2993 aircraft, inferred 2707 takeoffs and 4057 landings.
Baselines: 2026-04-05, 2026-02-22.
- Takeoff endpoint: 26.08, -80.19 (+116), share 0.15, 9 mi from event; current 218 vs baseline median 102.0.
- Landing endpoint: 40.83, -74.06 (+78), share 0.08, 1087 mi from event; current 166 vs baseline median 87.5.
- Presence cell: 39.68, -75.90 (+486), share 0.09, 981 mi from event.
- Takeoff cell: 26.17, -79.98 (+82), share 0.11, 22 mi from event.
- Landing cell: 40.37, -74.30 (+144), share 0.17, 1053 mi from event.

### Burning Man 2025 - departure

Event gates open Aug 24-Sep 1, 2025.
Current window observed 3801 aircraft, inferred 5782 takeoffs and 6661 landings.
Baselines: 2025-10-27, 2025-07-07.
- Takeoff endpoint: 39.23, -106.87 (+93), share 0.05, 661 mi from event; current 118 vs baseline median 25.0.
- Landing endpoint: 40.82, -74.08 (+56), share 0.03, 2333 mi from event; current 248 vs baseline median 191.5.
- Presence cell: 40.78, -73.45 (+964), share 0.10, 2366 mi from event.
- Takeoff cell: 41.08, -72.05 (+366), share 0.22, 2431 mi from event.
- Landing cell: 40.91, -72.31 (+268), share 0.18, 2421 mi from event.

### Daytona 500 2026 - departure

Race Feb 15, 2026.
Current window observed 4547 aircraft, inferred 6401 takeoffs and 6105 landings.
Baselines: 2026-03-30, 2025-12-22.
- Takeoff endpoint: 26.09, -80.19 (+150), share 0.08, 220 mi from event; current 414 vs baseline median 264.5.
- Landing endpoint: 26.05, -80.21 (+106), share 0.07, 223 mi from event; current 362 vs baseline median 256.5.
- Presence cell: 27.54, -81.27 (+1503), share 0.10, 114 mi from event.
- Takeoff cell: 27.08, -80.87 (+405), share 0.24, 146 mi from event.
- Landing cell: 27.38, -81.01 (+266), share 0.20, 125 mi from event.

### CES 2026 - departure

CES Jan 6-9, 2026.
Current window observed 2010 aircraft, inferred 1486 takeoffs and 2372 landings.
Baselines: 2026-03-06, 2025-12-12.
- Takeoff endpoint: 33.79, -84.42 (+52), share 0.24, 1740 mi from event; current 70 vs baseline median 17.5.
- Landing endpoint: 33.73, -84.48 (+14), share 0.05, 1738 mi from event; current 25 vs baseline median 11.0.
- Presence cell: 34.14, -84.49 (+133), share 0.33, 1731 mi from event.
- Takeoff cell: 33.42, -84.63 (+50), share 0.26, 1735 mi from event.
- Landing cell: 39.65, -86.09 (+26), share 0.13, 1596 mi from event.

### Sun Valley Conference 2025 - departure

Allen & Company Sun Valley conference week in July 2025.
Current window observed 3665 aircraft, inferred 5358 takeoffs and 5651 landings.
Baselines: 2025-05-18, 2025-09-21.
- Takeoff endpoint: 39.60, -106.98 (+46), share 0.04, 474 mi from event; current 63 vs baseline median 17.5.
- Landing endpoint: 39.22, -106.87 (+40), share 0.04, 495 mi from event; current 55 vs baseline median 14.5.
- Presence cell: 42.23, -109.41 (+448), share 0.11, 269 mi from event.
- Takeoff cell: 39.19, -106.79 (+141), share 0.17, 500 mi from event.
- Landing cell: 39.15, -106.78 (+106), share 0.16, 502 mi from event.

### Cannes / Monaco 2025 - US departure

Cannes May 13-24 and Monaco GP May 23-25, 2025; CONUS heatmaps can only see U.S. departure regions.
Current window observed 4054 aircraft, inferred 6025 takeoffs and 5834 landings.
Baselines: 2025-08-01, 2025-06-20.
- Takeoff endpoint: 26.06, -80.21 (+74), share 0.06; current 220 vs baseline median 146.0.
- Landing endpoint: 39.72, -86.25 (+45), share 0.04; current 60 vs baseline median 15.0.
- Presence cell: 27.66, -80.70 (+1002), share 0.14.
- Takeoff cell: 26.65, -80.78 (+228), share 0.21.
- Landing cell: 26.58, -80.76 (+222), share 0.22.
