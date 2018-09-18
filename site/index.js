const emojiMap = {
  Windy: '🌪',
  'Partly Cloudy': '⛅️',
  Sunny: '☀️',
  Clear: '🌙',
  Cloudy: '☁️',
  Fog: '🌫',
  Rain: '☔️',
  Snow: '⛄️',
};
const timeMap = {};
for (let i = 0; i < 24; i++) {
  timeMap['' + i] = (i % 12) + (i >= 12 ? 'PM' : 'AM');
}
timeMap['0'] = '12AM';
timeMap['12'] = '12PM';
const spec = {
  $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
  config: {
    view: { stroke: '' },
  },
  width: 1500,
  height: 500,
  data: { url: '../translated_weather/weather.json' },
  transform: [
    { calculate: 'datum.weather !== null', as: 'valid' },
    { filter: { field: 'valid', equal: true } },
    { calculate: JSON.stringify(emojiMap) + '[datum.weather]', as: 'emoji' },
    { calculate: JSON.stringify(timeMap) + '[datum.time]', as: 'time' },
  ],
  encoding: {
    x: {
      field: 'time',
      type: 'nominal',
      axis: {
        // title: 'Time',
        // titleFontSize: 50,
        // titlePadding: 25,
        title: '',
        labelAngle: 0,
        labelFontSize: 30,
        labelPadding: 15,
        labelBaseline: 'bottom',
        ticks: false,
        domain: false,
        orient: 'top',
      },
      sort: { field: 'order', op: 'min', order: 'ascending' },
    },
    y: {
      field: 'city',
      type: 'nominal',
      axis: {
        // title: 'City',
        // titleFontSize: 50,
        // titlePadding: 25,
        title: '',
        labelFontSize: 20,
        labelPadding: 15,
        ticks: false,
        domain: false,
      },
    },
  },
  layer: [
    {
      mark: { type: 'text', baseline: 'middle' },
      encoding: {
        text: { field: 'emoji', type: 'nominal' },
        size: { value: 50 },
      },
    },
    {
      mark: { type: 'text', baseline: 'middle', dy: 25 },
      encoding: {
        text: { field: 'types', type: 'nominal' },
        size: { value: 8 },
      },
    },
  ],
};
const parseSpec = vega.parse(vl.compile(spec).spec);
const render = () => {
  new vega.View(parseSpec)
    .renderer('svg')
    .initialize('#vis')
    .run();
};
render();
setInterval(render, 120000);
const d = new Date();
const date = document.getElementById('date');
date.innerHTML = d.toString();
