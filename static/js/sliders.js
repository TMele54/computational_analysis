function makeSliders(){

  // Simple
  var data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  var sliderSimple = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat(d3.format('.2%'))
    .ticks(5)
    .default(0.015)
    .on('onchange', val => {
      d3.select('p#value-simple').text(d3.format('.2%')(val));
    });

  var gSimple = d3
    .select('div#slider-simple')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gSimple.call(sliderSimple);

  d3.select('p#value-simple').text(d3.format('.2%')(sliderSimple.value()));

  // Step
  var sliderStep = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat(d3.format('.2%'))
    .ticks(5)
    .step(0.005)
    .default(0.015)
    .on('onchange', val => {
      d3.select('p#value-step').text(d3.format('.2%')(val));
    });

  var gStep = d3
    .select('div#slider-step')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gStep.call(sliderStep);

  d3.select('p#value-step').text(d3.format('.2%')(sliderStep.value()));

  // Time
  var dataTime = d3.range(0, 10).map(function(d) {
    return new Date(1995 + d, 10, 3);
  });

  var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(300)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTime)
    .default(new Date(1998, 10, 3))
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
    });

  var gTime = d3
    .select('div#slider-time')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gTime.call(sliderTime);

  d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));

  // Fill
  var sliderFill = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat(d3.format('.2%'))
    .ticks(5)
    .default(0.015)
    .fill('#2196f3')
    .on('onchange', val => {
      d3.select('p#value-fill').text(d3.format('.2%')(val));
    });

  var gFill = d3
    .select('div#slider-fill')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gFill.call(sliderFill);

  d3.select('p#value-fill').text(d3.format('.2%')(sliderFill.value()));

  // Range
  var sliderRange = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat(d3.format('.2%'))
    .ticks(5)
    .default([0.015, 0.02])
    .fill('#2196f3')
    .on('onchange', val => {
      d3.select('p#value-range').text(val.map(d3.format('.2%')).join('-'));
    });

  var gRange = d3
    .select('div#slider-range')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gRange.call(sliderRange);

  d3.select('p#value-range').text(
    sliderRange
      .value()
      .map(d3.format('.2%'))
      .join('-')
  );

  // Vertical
  var sliderVertical = d3
    .sliderLeft()
    .min(d3.min(data))
    .max(d3.max(data))
    .height(300)
    .tickFormat(d3.format('.2%'))
    .ticks(5)
    .default(0.015)
    .on('onchange', val => {
      d3.select('p#value-vertical').text(d3.format('.2%')(val));
    });

  var gVertical = d3
    .select('div#slider-vertical')
    .append('svg')
    .attr('width', 100)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(60,30)');

  gVertical.call(sliderVertical);

  d3.select('p#value-vertical').text(d3.format('.2%')(sliderVertical.value()));

  // Alternative handle
  var sliderAlternativeHandle = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat(d3.format('.2%'))
    .ticks(5)
    .default(0.015)
    .handle(
      d3
        .symbol()
        .type(d3.symbolCircle)
        .size(200)()
    )
    .on('onchange', val => {
      d3.select('p#value-alternative-handle').text(d3.format('.2%')(val));
    });

  var g2 = d3
    .select('div#slider-alternative-handle')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  g2.call(sliderAlternativeHandle);

  d3.select('p#value-alternative-handle').text(sliderAlternativeHandle.value());

  // Transition
  var sliderTransition = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat(d3.format('.2%'))
    .ticks(5)
    .default(0.015)
    .on('onchange', val => {
      d3.select('p#value-transition').text(d3.format('.2%')(val));
    });

  var gTransition = d3
    .select('div#slider-transition')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gTransition.call(sliderTransition);

  setInterval(() => {
    sliderTransition.width(Math.random() * 100 + 200);

    gTransition
      .transition()
      .duration(200)
      .call(sliderTransition);
  }, 1000);

  d3.select('p#value-transition').text(
    d3.format('.2%')(sliderTransition.value())
  );

  // New York Times
  var width = 565;
  var height = 120;
  var margin = { top: 20, right: 50, bottom: 50, left: 40 };

  var dataNewYorkTimes = d3.range(1, 41).map(d => ({
    year: d,
    value: 10000 * Math.exp(-(d - 1) / 40),
  }));

  var svg = d3
    .select('div#slider-new-york-times')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var padding = 0.1;

  var xBand = d3
    .scaleBand()
    .domain(dataNewYorkTimes.map(d => d.year))
    .range([margin.left, width - margin.right])
    .padding(padding);

  var xLinear = d3
    .scaleLinear()
    .domain([
      d3.min(dataNewYorkTimes, d => d.year),
      d3.max(dataNewYorkTimes, d => d.year),
    ])
    .range([
      margin.left + xBand.bandwidth() / 2 + xBand.step() * padding - 0.5,
      width -
        margin.right -
        xBand.bandwidth() / 2 -
        xBand.step() * padding -
        0.5,
    ]);

  var y = d3
    .scaleLinear()
    .domain([0, d3.max(dataNewYorkTimes, d => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  var yAxis = g =>
    g
      .attr('transform', `translate(${width - margin.right},0)`)
      .call(
        d3
          .axisRight(y)
          .tickValues([1e4])
          .tickFormat(d3.format('($.2s'))
      )
      .call(g => g.select('.domain').remove());

  var slider = g =>
    g.attr('transform', `translate(0,${height - margin.bottom})`).call(
      d3
        .sliderBottom(xLinear)
        .step(1)
        .ticks(4)
        .default(9)
        .on('onchange', value => draw(value))
    );

  var bars = svg
    .append('g')
    .selectAll('rect')
    .data(dataNewYorkTimes);

  var barsEnter = bars
    .enter()
    .append('rect')
    .attr('x', d => xBand(d.year))
    .attr('y', d => y(d.value))
    .attr('height', d => y(0) - y(d.value))
    .attr('width', xBand.bandwidth());

  svg.append('g').call(yAxis);
  svg.append('g').call(slider);

  var draw = selected => {
    barsEnter
      .merge(bars)
      .attr('fill', d => (d.year === selected ? '#bad80a' : '#e0e0e0'));

    d3.select('p#value-new-york-times').text(
      d3.format('$,.2r')(dataNewYorkTimes[selected - 1].value)
    );
  };

  draw(9);

  // Color picker
  var num2hex = rgb => {
    return rgb
      .map(color => {
        let str = color.toString(16);

        if (str.length === 1) {
          str = '0' + str;
        }

        return str;
      })
      .join('');
  };

  var rgb = [100, 0, 0];
  var colors = ['red', 'green', 'blue'];

  var gColorPicker = d3
    .select('div#slider-color-picker')
    .append('svg')
    .attr('width', 600)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(30,30)');

  var box = gColorPicker
    .append('rect')
    .attr('width', 100)
    .attr('height', 100)
    .attr('transform', 'translate(400,0)')
    .attr('fill', `#${num2hex(rgb)}`);

  rgb.forEach((color, i) => {
    var slider = d3
      .sliderBottom()
      .min(0)
      .max(255)
      .step(1)
      .width(300)
      .default(rgb[i])
      .displayValue(false)
      .fill(colors[i])
      .on('onchange', num => {
        rgb[i] = num;
        box.attr('fill', `#${num2hex(rgb)}`);
        d3.select('p#value-color-picker').text(`#${num2hex(rgb)}`);
      });

    gColorPicker
      .append('g')
      .attr('transform', `translate(30,${60 * i})`)
      .call(slider);
  });

  d3.select('p#value-color-picker').text(`#${num2hex(rgb)}`);

}

makeSliders()