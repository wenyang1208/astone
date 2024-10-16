{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 600,
    "height": 400,
    "data": {
      "url": "paste.txt",
      "format": {"type": "csv"}
    },
    "mark": "area",
    "encoding": {
      "x": {
        "timeUnit": "yearquarter",
        "field": "date",
        "type": "temporal",
        "axis": {"domain": false, "format": "%Y-%Q", "tickSize": 0, "title": "Year-Quarter"}
      },
      "y": {
        "aggregate": "sum",
        "field": "value",
        "type": "quantitative",
        "axis": null,
        "stack": "center"
      },
      "color": {
        "field": "sector",
        "type": "nominal",
        "scale": {"scheme": "category20b"},
        "legend": {"title": "Sector"}
      }
    },
    "config": {
      "axisX": {
        "labelAngle": -45
      }
    }
  }