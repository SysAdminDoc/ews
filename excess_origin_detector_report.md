# Excess Activity Origin Detector

This report uses only tracked-aircraft heatmap observations and the historical concurrent-count baseline in the local database. It does not use event calendars, airport lists, or web lookups.

## Method

- Rank local days by same-weekday, same-half-hour residual bursts over the last year.
- For each top burst, compare the burst window to 3 quiet same-weekday baseline windows from the surrounding year.
- Bin unique presence, inferred takeoffs, and inferred landings into roughly 100-mile cells.
- Cluster takeoff and landing endpoints directly with a 12-mile radius, so airports near cell edges are not split by the grid.
- Identify positive endpoint clusters and fallback cell components, then classify each burst by concentration: single-origin, single-destination, regional cluster, or diffuse redistribution.

## Top 10

| Rank | Date | Window PDT | Peak Excess | Pattern | Strongest Compact Cluster | Theory |
|---:|---|---|---:|---|---|---|
| 1 | 2025-12-27 | 05:00-18:00 | 706 | regional arrival concentration | 26.11, -80.18 | The excess has a strongest arrival region, but it is too spatially broad to call a single destination from the endpoint clusters alone. |
| 2 | 2026-01-03 | 05:30-18:30 | 570 | specific departure anchor | 26.12, -80.18 | A continuous endpoint cluster generated a large share of excess departures; this is the data shape expected from a specific airport or airport group emptying out. |
| 3 | 2025-11-30 | 07:00-19:00 | 486 | regional departure concentration | 26.08, -80.20 | The excess has a strongest departure region, but it is too spatially broad to call a single origin from the endpoint clusters alone. |
| 4 | 2025-12-26 | 05:30-18:00 | 332 | specific arrival anchor | 26.11, -80.19 | A continuous endpoint cluster absorbed a large share of excess arrivals; this is the data shape expected from a specific airport or airport group drawing traffic in. |
| 5 | 2026-01-04 | 04:00-18:30 | 255 | regional departure concentration | 26.13, -80.19 | The excess has a strongest departure region, but it is too spatially broad to call a single origin from the endpoint clusters alone. |
| 6 | 2025-12-20 | 05:00-17:30 | 328 | diffuse national redistribution | 26.06, -80.22 | The excess is spread across many endpoint clusters; this looks more like broad return-to-work or holiday travel than one origin. |
| 7 | 2026-04-06 | 06:00-17:30 | 457 | regional departure concentration | 26.23, -80.19 | The excess has a strongest departure region, but it is too spatially broad to call a single origin from the endpoint clusters alone. |
| 8 | 2026-02-16 | 08:30-19:00 | 324 | specific departure anchor | 26.05, -80.21 | A continuous endpoint cluster generated a large share of excess departures; this is the data shape expected from a specific airport or airport group emptying out. |
| 9 | 2025-11-29 | 08:00-18:00 | 321 | regional arrival concentration | 26.10, -80.20 | The excess has a strongest arrival region, but it is too spatially broad to call a single destination from the endpoint clusters alone. |
| 10 | 2026-02-12 | 08:00-20:30 | 305 | regional arrival concentration | 26.23, -80.18 | The excess has a strongest arrival region, but it is too spatially broad to call a single destination from the endpoint clusters alone. |

## Case Notes

### 1. 2025-12-27 (Saturday)

Window: 05:00-18:00 PDT, 13.0 hours. Peak excess: 706 aircraft at 11:59.
Observed aircraft in current window: 4571; inferred takeoffs: 7756; inferred landings: 7898.
Baseline dates: 2025-08-16, 2026-04-04, 2025-10-11.
Classification: **regional arrival concentration** (compact anchor score 0.30; takeoff endpoint 0.09, landing endpoint 0.12).
- Takeoff endpoint cluster: +340 events near 26.11, -80.18; share 0.09; current 455 vs baseline median 115.0; component spread 24.6 mi.
- Landing endpoint cluster: +460 events near 26.10, -80.19; share 0.12; current 603 vs baseline median 143.0; component spread 22.8 mi.
- Presence compact cluster: +4770 across 9 cells, center 27.57, -81.17; share 0.11; top cell +771 at 29.07, -82.06.
- Presence broad positive area: +42823 across 481 cells, center 34.16, -91.14; top cell +771 at 29.07, -82.06.
- Takeoff compact cluster: +795 across 6 cells, center 26.50, -80.91; share 0.21; top cell +330 at 26.17, -79.98.
- Takeoff broad positive area: +3482 across 190 cells, center 34.75, -89.25; top cell +330 at 26.17, -79.98.
- Landing compact cluster: +1101 across 7 cells, center 26.70, -80.93; share 0.30; top cell +445 at 26.17, -79.98.
- Landing broad positive area: +3618 across 195 cells, center 33.24, -91.25; top cell +445 at 26.17, -79.98.
Theory: The excess has a strongest arrival region, but it is too spatially broad to call a single destination from the endpoint clusters alone.

### 2. 2026-01-03 (Saturday)

Window: 05:30-18:30 PDT, 13.0 hours. Peak excess: 570 aircraft at 13:59.
Observed aircraft in current window: 4191; inferred takeoffs: 6630; inferred landings: 7281.
Baseline dates: 2025-08-16, 2026-04-04, 2025-09-27.
Classification: **specific departure anchor** (compact anchor score 0.31; takeoff endpoint 0.11, landing endpoint 0.09).
- Takeoff endpoint cluster: +344 events near 26.12, -80.18; share 0.11; current 497 vs baseline median 153.0; component spread 39.8 mi.
- Landing endpoint cluster: +306 events near 26.14, -80.19; share 0.09; current 483 vs baseline median 177.0; component spread 49.9 mi.
- Presence compact cluster: +4374 across 9 cells, center 27.53, -81.18; share 0.12; top cell +700 at 26.17, -81.59.
- Presence broad positive area: +36458 across 433 cells, center 33.95, -92.77; top cell +700 at 26.17, -81.59.
- Takeoff compact cluster: +902 across 6 cells, center 26.70, -80.92; share 0.31; top cell +379 at 26.17, -79.98.
- Takeoff broad positive area: +2621 across 140 cells, center 33.12, -90.04; top cell +379 at 26.17, -79.98.
- Landing compact cluster: +805 across 7 cells, center 26.70, -80.92; share 0.25; top cell +343 at 26.17, -79.98.
- Landing broad positive area: +2285 across 123 cells, center 31.97, -84.31; top cell +343 at 26.17, -79.98.
Theory: A continuous endpoint cluster generated a large share of excess departures; this is the data shape expected from a specific airport or airport group emptying out.

### 3. 2025-11-30 (Sunday)

Window: 07:00-19:00 PDT, 12.0 hours. Peak excess: 486 aircraft at 13:59.
Observed aircraft in current window: 5124; inferred takeoffs: 8182; inferred landings: 9392.
Baseline dates: 2025-07-20, 2025-11-02, 2025-10-12.
Classification: **regional departure concentration** (compact anchor score 0.29; takeoff endpoint 0.10, landing endpoint 0.09).
- Takeoff endpoint cluster: +324 events near 26.08, -80.20; share 0.10; current 478 vs baseline median 154.0; component spread 21.5 mi.
- Landing endpoint cluster: +320 events near 26.03, -80.23; share 0.09; current 523 vs baseline median 203.0; component spread 29.7 mi.
- Presence compact cluster: +3354 across 9 cells, center 27.58, -81.06; share 0.12; top cell +536 at 27.62, -81.02.
- Presence broad positive area: +27753 across 440 cells, center 34.00, -88.22; top cell +536 at 27.62, -81.02.
- Takeoff compact cluster: +811 across 6 cells, center 26.75, -80.86; share 0.29; top cell +374 at 26.17, -79.98.
- Takeoff broad positive area: +2278 across 139 cells, center 32.60, -83.77; top cell +374 at 26.17, -79.98.
- Landing compact cluster: +705 across 7 cells, center 26.80, -80.87; share 0.23; top cell +340 at 26.17, -79.98.
- Landing broad positive area: +2570 across 149 cells, center 34.50, -83.57; top cell +340 at 26.17, -79.98.
Theory: The excess has a strongest departure region, but it is too spatially broad to call a single origin from the endpoint clusters alone.

### 4. 2025-12-26 (Friday)

Window: 05:30-18:00 PDT, 12.5 hours. Peak excess: 332 aircraft at 11:59.
Observed aircraft in current window: 4444; inferred takeoffs: 7276; inferred landings: 7573.
Baseline dates: 2025-08-01, 2026-03-06, 2026-04-17.
Classification: **specific arrival anchor** (compact anchor score 0.39; takeoff endpoint 0.11, landing endpoint 0.17).
- Takeoff endpoint cluster: +206 events near 26.11, -80.19; share 0.11; current 421 vs baseline median 215.0; component spread 22.4 mi.
- Landing endpoint cluster: +359 events near 26.06, -80.21; share 0.17; current 602 vs baseline median 243.0; component spread 42.2 mi.
- Presence compact cluster: +2761 across 9 cells, center 27.63, -81.23; share 0.13; top cell +466 at 29.07, -82.06.
- Presence broad positive area: +20781 across 383 cells, center 33.80, -89.93; top cell +466 at 29.07, -82.06.
- Takeoff compact cluster: +397 across 6 cells, center 26.68, -80.99; share 0.26; top cell +144 at 26.17, -79.98.
- Takeoff broad positive area: +573 across 27 cells, center 30.24, -79.53; top cell +144 at 26.17, -79.98.
- Landing compact cluster: +685 across 6 cells, center 26.70, -81.00; share 0.39; top cell +247 at 26.17, -79.98.
- Landing broad positive area: +853 across 17 cells, center 26.65, -80.52; top cell +247 at 26.17, -79.98.
Theory: A continuous endpoint cluster absorbed a large share of excess arrivals; this is the data shape expected from a specific airport or airport group drawing traffic in.

### 5. 2026-01-04 (Sunday)

Window: 04:00-18:30 PDT, 14.5 hours. Peak excess: 255 aircraft at 09:59.
Observed aircraft in current window: 4596; inferred takeoffs: 7216; inferred landings: 7712.
Baseline dates: 2026-03-08, 2026-03-15, 2025-11-02.
Classification: **regional departure concentration** (compact anchor score 0.24; takeoff endpoint 0.10, landing endpoint 0.08).
- Takeoff endpoint cluster: +154 events near 26.13, -80.19; share 0.10; current 631 vs baseline median 477.0; component spread 38.8 mi.
- Landing endpoint cluster: +126 events near 25.88, -80.28; share 0.08; current 224 vs baseline median 98.0; component spread 5.4 mi.
- Presence compact cluster: +1960 across 9 cells, center 27.31, -79.54; share 0.12; top cell +323 at 26.17, -78.36.
- Presence broad positive area: +16481 across 409 cells, center 34.34, -88.21; top cell +323 at 26.17, -78.36.
- Takeoff compact cluster: +308 across 6 cells, center 26.35, -80.67; share 0.24; top cell +148 at 26.17, -79.98.
- Takeoff broad positive area: +429 across 10 cells, center 26.11, -79.76; top cell +148 at 26.17, -79.98.
- Landing compact cluster: +253 across 5 cells, center 26.38, -80.56; share 0.18; top cell +147 at 26.17, -79.98.
- Landing broad positive area: +535 across 60 cells, center 39.53, -82.59; top cell +148 at 40.67, -73.46.
Theory: The excess has a strongest departure region, but it is too spatially broad to call a single origin from the endpoint clusters alone.

### 6. 2025-12-20 (Saturday)

Window: 05:00-17:30 PDT, 12.5 hours. Peak excess: 328 aircraft at 09:45.
Observed aircraft in current window: 3722; inferred takeoffs: 5880; inferred landings: 6066.
Baseline dates: 2025-08-16, 2026-04-04, 2025-10-11.
Classification: **diffuse national redistribution** (compact anchor score 0.14; takeoff endpoint 0.08, landing endpoint 0.09).
- Takeoff endpoint cluster: +180 events near 26.06, -80.22; share 0.08; current 295 vs baseline median 115.0; component spread 24.6 mi.
- Landing endpoint cluster: +211 events near 26.09, -80.20; share 0.09; current 352 vs baseline median 141.0; component spread 26.7 mi.
- Presence compact cluster: +1527 across 9 cells, center 27.33, -81.23; share 0.08; top cell +284 at 26.17, -79.98.
- Presence broad positive area: +19667 across 449 cells, center 35.08, -93.41; top cell +285 at 40.67, -73.46.
- Takeoff compact cluster: +300 across 7 cells, center 26.46, -80.67; share 0.14; top cell +173 at 26.17, -79.98.
- Takeoff broad positive area: +1555 across 135 cells, center 37.28, -93.53; top cell +221 at 40.67, -73.46.
- Landing compact cluster: +299 across 7 cells, center 26.42, -80.56; share 0.14; top cell +161 at 26.17, -79.98.
- Landing broad positive area: +1440 across 111 cells, center 33.16, -86.45; top cell +161 at 26.17, -79.98.
Theory: The excess is spread across many endpoint clusters; this looks more like broad return-to-work or holiday travel than one origin.

### 7. 2026-04-06 (Monday)

Window: 06:00-17:30 PDT, 11.5 hours. Peak excess: 457 aircraft at 09:29.
Observed aircraft in current window: 4683; inferred takeoffs: 7252; inferred landings: 7939.
Baseline dates: 2025-10-27, 2025-05-12, 2025-09-15.
Classification: **regional departure concentration** (compact anchor score 0.29; takeoff endpoint 0.12, landing endpoint 0.08).
- Takeoff endpoint cluster: +311 events near 26.23, -80.19; share 0.12; current 532 vs baseline median 221.0; component spread 42.9 mi.
- Landing endpoint cluster: +194 events near 26.05, -80.22; share 0.08; current 350 vs baseline median 156.0; component spread 26.9 mi.
- Presence compact cluster: +2792 across 9 cells, center 27.51, -81.04; share 0.16; top cell +456 at 26.17, -79.98.
- Presence broad positive area: +17434 across 310 cells, center 32.18, -87.07; top cell +456 at 26.17, -79.98.
- Takeoff compact cluster: +677 across 7 cells, center 26.37, -80.70; share 0.29; top cell +355 at 26.17, -79.98.
- Takeoff broad positive area: +2225 across 139 cells, center 31.56, -86.63; top cell +355 at 26.17, -79.98.
- Landing compact cluster: +582 across 7 cells, center 26.67, -80.75; share 0.24; top cell +290 at 26.17, -79.98.
- Landing broad positive area: +2099 across 123 cells, center 32.20, -84.34; top cell +290 at 26.17, -79.98.
Theory: The excess has a strongest departure region, but it is too spatially broad to call a single origin from the endpoint clusters alone.

### 8. 2026-02-16 (Monday)

Window: 08:30-19:00 PDT, 10.5 hours. Peak excess: 324 aircraft at 13:29.
Observed aircraft in current window: 4549; inferred takeoffs: 5823; inferred landings: 7080.
Baseline dates: 2025-10-06, 2025-10-27, 2025-09-08.
Classification: **specific departure anchor** (compact anchor score 0.35; takeoff endpoint 0.13, landing endpoint 0.10).
- Takeoff endpoint cluster: +294 events near 26.05, -80.21; share 0.13; current 409 vs baseline median 115.0; component spread 31.8 mi.
- Landing endpoint cluster: +248 events near 26.06, -80.20; share 0.10; current 373 vs baseline median 125.0; component spread 24.1 mi.
- Presence compact cluster: +3023 across 9 cells, center 27.56, -81.13; share 0.14; top cell +568 at 27.62, -81.02.
- Presence broad positive area: +20958 across 375 cells, center 33.34, -91.92; top cell +568 at 27.62, -81.02.
- Takeoff compact cluster: +716 across 6 cells, center 26.80, -80.85; share 0.35; top cell +326 at 26.17, -79.98.
- Takeoff broad positive area: +1767 across 109 cells, center 31.25, -90.67; top cell +326 at 26.17, -79.98.
- Landing compact cluster: +613 across 6 cells, center 26.87, -80.81; share 0.27; top cell +299 at 26.17, -79.98.
- Landing broad positive area: +1757 across 118 cells, center 32.60, -85.55; top cell +299 at 26.17, -79.98.
Theory: A continuous endpoint cluster generated a large share of excess departures; this is the data shape expected from a specific airport or airport group emptying out.

### 9. 2025-11-29 (Saturday)

Window: 08:00-18:00 PDT, 10.0 hours. Peak excess: 321 aircraft at 11:29.
Observed aircraft in current window: 3561; inferred takeoffs: 5003; inferred landings: 5893.
Baseline dates: 2025-08-16, 2025-07-19, 2026-01-10.
Classification: **regional arrival concentration** (compact anchor score 0.23; takeoff endpoint 0.08, landing endpoint 0.06).
- Takeoff endpoint cluster: +187 events near 26.10, -80.20; share 0.08; current 269 vs baseline median 82.0; component spread 22.7 mi.
- Landing endpoint cluster: +174 events near 26.13, -80.19; share 0.06; current 335 vs baseline median 161.0; component spread 38.8 mi.
- Presence compact cluster: +2503 across 9 cells, center 27.56, -81.18; share 0.13; top cell +432 at 27.62, -81.02.
- Presence broad positive area: +19490 across 362 cells, center 33.11, -90.06; top cell +432 at 27.62, -81.02.
- Takeoff compact cluster: +522 across 5 cells, center 26.94, -81.04; share 0.22; top cell +201 at 26.17, -79.98.
- Takeoff broad positive area: +2012 across 141 cells, center 33.15, -86.00; top cell +201 at 26.17, -79.98.
- Landing compact cluster: +609 across 6 cells, center 27.02, -81.10; share 0.23; top cell +204 at 26.17, -79.98.
- Landing broad positive area: +2653 across 171 cells, center 33.79, -90.48; top cell +204 at 26.17, -79.98.
Theory: The excess has a strongest arrival region, but it is too spatially broad to call a single destination from the endpoint clusters alone.

### 10. 2026-02-12 (Thursday)

Window: 08:00-20:30 PDT, 12.5 hours. Peak excess: 305 aircraft at 16:29.
Observed aircraft in current window: 5064; inferred takeoffs: 7170; inferred landings: 8211.
Baseline dates: 2025-06-12, 2026-01-15, 2026-04-16.
Classification: **regional arrival concentration** (compact anchor score 0.27; takeoff endpoint 0.12, landing endpoint 0.05).
- Takeoff endpoint cluster: +218 events near 26.23, -80.18; share 0.12; current 509 vs baseline median 291.0; component spread 55.8 mi.
- Landing endpoint cluster: +105 events near 26.23, -80.14; share 0.05; current 226 vs baseline median 121.0; component spread 15.8 mi.
- Presence compact cluster: +2040 across 9 cells, center 27.49, -81.14; share 0.13; top cell +351 at 26.17, -79.98.
- Presence broad positive area: +15707 across 421 cells, center 34.69, -94.32; top cell +351 at 26.17, -79.98.
- Takeoff compact cluster: +354 across 6 cells, center 26.67, -80.60; share 0.23; top cell +217 at 26.17, -79.98.
- Takeoff broad positive area: +1291 across 138 cells, center 33.16, -95.14; top cell +217 at 26.17, -79.98.
- Landing compact cluster: +482 across 6 cells, center 26.75, -80.74; share 0.27; top cell +247 at 26.17, -79.98.
- Landing broad positive area: +1017 across 99 cells, center 30.65, -85.24; top cell +247 at 26.17, -79.98.
Theory: The excess has a strongest arrival region, but it is too spatially broad to call a single destination from the endpoint clusters alone.
