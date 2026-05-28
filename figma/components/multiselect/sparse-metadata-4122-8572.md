# Figma — Multiselect (`4122:8572`) — sparse metadata

Frame 1744x2865. Componentes:
1. Multiselect input matrix (4122:8576, 4122:8603) — 32 variants: size {m,l,s,xs} × state {default,focus,error,disabled} × withChips {no,yes}
2. Chips matrix (4125:8991, 4125:9013) — 24 variants: state {default,hover&active,disabled,focus,error,error focus} × size {l,m,x,xs}
3. Examples (4138:14338) com Select+combobox
4. Tooltip support (8735:13817)

**Multiselect node-ids (sizes m=63h, l=67h, s=59h, xs=51h):**
- m/default/no-chips: 4122:8604, m/default/with-chips: 4125:9151
- m/focus/no-chips: 4122:8636, m/focus/with-chips: 4125:9183
- m/error/no-chips: 4122:8668, m/error/with-chips: 4125:9215
- m/disabled/no-chips: 4122:8700, m/disabled/with-chips: 4125:9247
- l: 4122:8612 / 4125:9159 / 4122:8644 / 4125:9191 / 4122:8676 / 4125:9223 / 4122:8708 / 4125:9255
- s: 4122:8620 / 4125:9167 / 4122:8652 / 4125:9199 / 4122:8684 / 4125:9231 / 4122:8716 / 4125:9263
- xs: 4122:8628 / 4125:9175 / 4122:8660 / 4125:9207 / 4122:8692 / 4125:9239 / 4122:8724 / 4125:9271

**Chips node-ids (per state × size):**
- default: l=8293:11176, m=5023:12499, x=4125:9022, xs=4125:9538
- hover&active: l=8293:11180, m=5023:12503, x=4125:9124, xs=4125:9546
- disabled: l=8293:11184, m=5023:12507, x=4125:9134, xs=4125:9542
- focus: l=8293:11196, m=5023:12511, x=4125:9042, xs=4125:9550
- error: l=8293:11188, m=5037:12523, x=5037:12519, xs=5037:12527
- error focus: l=8293:11192, m=5046:12517, x=5046:12521, xs=5046:12525
