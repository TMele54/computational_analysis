function barChart(selector, data){

    data.forEach(function (d) {
        d.sqmiles = +d.sqmiles;
    });
    data.sort(function(a,b) { return +b.sqmiles - +a.sqmiles});

    // console.log(data)
    var margin = {top: 65, bottom: 50, left: 70, right: 70};
    var axisPadding = 15;
    var Width = 1000, Height = 600;
    var svgWidth = Width + margin.left + margin.right;
    var svgHeight = Height + margin.top + margin.bottom;
    var maxIncome = d3.max(data, function(d){ return d.sqmiles; });

    // define scales and axises
    var xScale = d3.scale.ordinal().domain(data.map(function(d){ return d.state; })).rangeBands([0, Width], 0.1);
    var yScale = d3.scale.linear().domain([0, maxIncome]).range([0, Height]);
    var color = d3.scale.category10();
    var xAxis = d3.svg.axis().scale(xScale).tickSize(0,0).orient('bottom');
    var yAxisL = d3.svg.axis().scale(yScale.copy().domain([maxIncome, 0])).tickSize(6,0).ticks(7).orient('left');
    var yAxisR = d3.svg.axis().scale(yScale.copy().domain([maxIncome, 0])).tickSize(6,0).ticks(7).orient('right');

    // create a svg canvas
    var svg = d3.select('#'+selector).append('svg').attr({width: svgWidth, height: svgHeight});

    // Drawing for axises
    var xGroup = svg.append('g').attr('class', 'xGroup')
        .attr('transform', 'translate(' + [margin.left, margin.top + Height + axisPadding] + ')');

    xGroup.call(xAxis);
    styleAxis(xGroup);

    var yGroupL = svg.append('g').attr('class', 'yGroupL')
                                .attr('transform', 'translate(' + [margin.left - axisPadding, margin.top] + ')');

    var yGroupR = svg.append('g').attr('class', 'yGroupR')
                                .attr('transform', 'translate(' + [ Width + margin.left + axisPadding, margin.top] + ')');


    yGroupL.call(yAxisL);
    yGroupR.call(yAxisR);

    styleAxis(yGroupL);
    styleAxis(yGroupR);

    // Label layer
    var label = svg.append('g').attr('transform', 'translate(' + [margin.left - axisPadding, margin.top] + ')');

    label.append('text')
        .text('sqmiles [%]')
        .attr('transform', 'rotate(-90)')
        .attr({'text-anchor': 'start',x: -75,y: 20,});

    label.append('text')
        .text('Bar Chart with Tooltip')
        .attr('transform', 'translate(' + [Width / 2, - margin.top / 2] + ')')
        .attr({
            'text-anchor': 'middle',
            'font-size': '1.5em',
            fill: 'steelblue',
        });

    // Drawing for graph body
    var graph = svg.append('g').attr('class', 'graph')
                               .attr('transform', 'translate(' + [margin.left, margin.top + Height] + ')');

    var bars = graph.selectAll('g')
        .data(data).enter().append('g')
        .attr('transform', function(d,i){ return 'translate(' + [xScale(d.state), -1 * yScale(d.sqmiles)] + ')'; });

    bars.append('rect')
        .each(function(d,i){
            d3.select(this).attr({
                fill: color.range()[i],
                width: xScale.rangeBand(),
                height: yScale(d.sqmiles),
            })
        })
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

    bars.append('text').text(function(d){ return d.sqmiles; }).each(function(d,i){
                        d3.select(this).attr({
                            fill: color.range()[i],
                            stroke: 'none',
                            x: xScale.rangeBand() / 2,
                            y: -5,
                            'text-anchor': 'middle',
                        });
                    });

    // tooltips
    var div = d3.select('#'+selector).append('div').attr('class', 'tooltip').style('display', 'none');

    function mouseover(){
        div.style('display', 'inline');
    }
    function mousemove(){
        var d = d3.select(this).data()[0];
        div
            .html(d.state + '<hr/>' + d.sqmiles)
            .style('left', (d3.event.pageX - 34) + 'px')
            .style('top', (d3.event.pageY - 12) + 'px');
    }
    function mouseout(){
        div.style('display', 'none');
    }
    function styleAxis(axis){

        // style path
        axis.select('.domain').attr({fill: 'none',stroke: '#888','stroke-width': 1});

        // style tick
        axis.selectAll('.tick line').attr({stroke: '#000','stroke-width': 1,})

    }


}

var data = [
  {
    "state": "New York",
    "sqmiles": 54556,
    "dunkin-donuts": 1326,
    "starbucks": 384,
    "2012-presidential-result": "Obama"
  },
  {
    "state": "Texas",
    "sqmiles": 268580,
    "dunkin-donuts": 56,
    "starbucks": 604,
    "2012-presidential-result": "Romney"
  },
  {
    "state": "Florida",
    "sqmiles": 65755,
    "dunkin-donuts": 705,
    "starbucks": 375,
    "2012-presidential-result": "Obama"
  },
  {
    "state": "Illinois",
    "sqmiles": 57914,
    "dunkin-donuts": 528,
    "starbucks": 412,
    "2012-presidential-result": "Obama"
  },
  {
    "state": "Michigan",
    "sqmiles": 96716,
    "dunkin-donuts": 51,
    "starbucks": 158,
    "2012-presidential-result": "Obama"
  },
  {
    "state": "California",
    "sqmiles": 163695,
    "dunkin-donuts": 2,
    "starbucks": 2010,
    "2012-presidential-result": "Obama"
  },
  {
    "state": "Massachusetts",
    "sqmiles": 10555,
    "dunkin-donuts": 1151,
    "starbucks": 155,
    "2012-presidential-result": "Obama"
  },
  {
    "state": "Arizona",
    "sqmiles": 113998,
    "dunkin-donuts": 59,
    "starbucks": 248,
    "2012-presidential-result": "Romney"
  },
  {
    "state": "North Carolina",
    "sqmiles": 53818,
    "dunkin-donuts": 300,
    "starbucks": 132,
    "2012-presidential-result": "Romney"
  },
  {
    "state": "Virginia",
    "sqmiles": 42774,
    "dunkin-donuts": 168,
    "starbucks": 241,
    "2012-presidential-result": "Obama"
  }
];

barChart("barChart", data);