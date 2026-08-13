import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { businessPerformanceData } from '../data/companyContent';

export default function BusinessPerformanceChart() {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const data = businessPerformanceData.dataPoints;

  // Chart SVG dimensions
  const svgWidth = 900;
  const svgHeight = 440;
  const paddingLeft = 90;
  const paddingRight = 60;
  const paddingTop = 40;
  const paddingBottom = 60;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  // Value bounds
  const minYear = 1996;
  const maxYear = 2025;
  const maxArea = 3500000; // Y axis maximum

  // Scale functions
  const getX = (year) => {
    return paddingLeft + ((year - minYear) / (maxYear - minYear)) * chartWidth;
  };

  const getY = (area) => {
    return paddingTop + chartHeight - (area / maxArea) * chartHeight;
  };

  // Build SVG Path for smooth curve
  const pointsCoords = data.map((d) => ({
    x: getX(d.year),
    y: getY(d.area),
    data: d
  }));

  // Create smooth bezier curve path
  const createSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? i : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  };

  const curvePathD = createSmoothPath(pointsCoords);
  const areaPathD = `${curvePathD} L ${pointsCoords[pointsCoords.length - 1].x},${paddingTop + chartHeight} L ${pointsCoords[0].x},${paddingTop + chartHeight} Z`;

  // Y-axis grid ticks
  const yTicks = [3000000, 2500000, 2000000, 1500000, 1000000, 500000, 0];

  // Specific milestone vertical line years (2006, 2016, 2025)
  const milestoneYears = [2006, 2016, 2025];

  return (
    <div className="business-performance-chart-card">
      {/* Chart Section Header matching input_file_0.png */}
      <div className="chart-card-topbar">
        <div className="chart-headline-left">
          <h3 className="chart-main-headline">{businessPerformanceData.chartHeadline}</h3>
          <p className="chart-sub-label">{businessPerformanceData.chartSubhead}</p>
        </div>
        <div className="chart-total-callout-box">
          <span className="total-callout-text">{businessPerformanceData.totalCallout}</span>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="chart-svg-wrapper">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="business-svg-chart">
          <defs>
            {/* Area Fill Gradient matching silver/grey shaded area */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8c979e" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#b5bdc2" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#e9ecef" stopOpacity="0.15" />
            </linearGradient>

            {/* Line Drop Shadow */}
            <filter id="greenGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#15803d" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Background Grid Lines & Y Axis Labels */}
          {yTicks.map((val) => {
            const y = getY(val);
            return (
              <g key={val} className="y-tick-group">
                <line
                  x1={paddingLeft - 10}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 18}
                  y={y + 4}
                  textAnchor="end"
                  className="y-axis-text"
                >
                  {val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Dotted Ceiling Target Guideline across top */}
          <line
            x1={paddingLeft}
            y1={getY(3200000)}
            x2={svgWidth - paddingRight}
            y2={getY(3200000)}
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Vertical Dashed Milestone Guidelines for 2006, 2016, 2025 */}
          {milestoneYears.map((year) => {
            const x = getX(year);
            const dataPt = data.find((d) => d.year === year);
            const y = dataPt ? getY(dataPt.area) : getY(0);
            return (
              <g key={`dashed-${year}`} className="dashed-milestone-group">
                <line
                  x1={x}
                  y1={y}
                  x2={x}
                  y2={paddingTop + chartHeight}
                  stroke="#64748b"
                  strokeWidth="1.8"
                  strokeDasharray="5 5"
                />
              </g>
            );
          })}

          {/* Area Shaded Shape */}
          <motion.path
            d={areaPathD}
            fill="url(#areaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Main Green Line Path */}
          <motion.path
            d={curvePathD}
            fill="none"
            stroke="#16a34a"
            strokeWidth="3.5"
            filter="url(#greenGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Data Nodes (Green Dots) */}
          {pointsCoords.map((pt, idx) => {
            const isHovered = hoveredPoint && hoveredPoint.year === pt.data.year;
            const isMilestone = pt.data.milestone;

            return (
              <g
                key={pt.data.year}
                className="chart-data-node"
                onMouseEnter={() => setHoveredPoint(pt.data)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer hover ring */}
                {isHovered && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="9"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    opacity="0.8"
                  />
                )}
                {/* Inner solid node */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isMilestone ? "5.5" : "4"}
                  fill={isHovered ? "#ffffff" : "#16a34a"}
                  stroke="#16a34a"
                  strokeWidth={isHovered ? "3" : "1.5"}
                />
              </g>
            );
          })}

          {/* X Axis Baseline */}
          <line
            x1={paddingLeft}
            y1={paddingTop + chartHeight}
            x2={svgWidth - paddingRight}
            y2={paddingTop + chartHeight}
            stroke="#334155"
            strokeWidth="2"
          />

          {/* X Axis Milestone Year Labels (1996, 2006, 2016, 2025) */}
          {milestoneYears.concat([1996]).filter((v, i, a) => a.indexOf(v) === i).sort((a,b)=>a-b).map((year) => {
            const x = getX(year);
            return (
              <text
                key={`xlabel-${year}`}
                x={x}
                y={paddingTop + chartHeight + 24}
                textAnchor="center"
                className="x-axis-year-text"
              >
                {year}
              </text>
            );
          })}

          {/* "Year" label at far right bottom corner matching screenshot */}
          <text
            x={svgWidth - paddingRight + 5}
            y={paddingTop + chartHeight + 18}
            textAnchor="start"
            className="x-axis-title-text"
          >
            Year
          </text>
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="chart-tooltip-popup"
            style={{
              left: `${getX(hoveredPoint.year)}px`,
              top: `${getY(hoveredPoint.area) - 15}px`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="tooltip-year-badge">Year {hoveredPoint.year}</div>
            <div className="tooltip-area-num">{hoveredPoint.area.toLocaleString()} m²</div>
            {hoveredPoint.note && <div className="tooltip-note-text">{hoveredPoint.note}</div>}
          </div>
        )}
      </div>

      {/* Legend & Milestone Footer */}
      <div className="chart-card-footer">
        <div className="chart-legend-row">
          <div className="legend-item">
            <span className="legend-color-dot green" />
            <span>Green Line: Accumulative Construction Floor Area (m²)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-dot grey" />
            <span>Grey Shading: Growth Curve Volume</span>
          </div>
          <div className="legend-item">
            <span className="legend-dashed-line" />
            <span>Dashed Line: Key Milestone Years (2006, 2016, 2025)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
