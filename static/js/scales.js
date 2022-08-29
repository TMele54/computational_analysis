function makeSVG(){

    /**********************************************************************************
    /*****************************  Learning SVG  *************************************
    /*********************************************************************************/

    //Let's start with a plain SVG
    //Width and height
    var Width = 1200; // these are pixel values
    var Height = 600;
    var borderThickness = 10;
    var borderColor = 'black';

    // The SVG is the area on the screen where we draw the chart
    var svg0 = d3.select("#one")
                        .append("svg")
                        .attr("height", Height)
                        .attr("width", Width);

    /**********************************************************************************/
    // We will draw circles and a border so we can see the dimensions and coordinates
    //

    // Some test data, as a list
    var data = [
            [0,0], [50, 100], [100, 200], [150, 300], [200, 400], [250,500], [300, 600],
            [350, 700], [400, 800], [450, 900],  [500, 1000],  [550, 1100], [600, 1200],
          ];

    // Some test data, JSON, use JSON. Opening a csv will become JSON or dict anyway
    var data = [
        {"x":0,    "y":0},
        {"x":100,  "y":50},
        {"x":200,  "y":100},
        {"x":300,  "y":150},
        {"x":400,  "y":200},
        {"x":500,  "y":250},
        {"x":600,  "y":300},
        {"x":700,  "y":350},
        {"x":800,  "y":400},
        {"x":900,  "y":450},
        {"x":1000, "y":500},
        {"x":1100, "y":550},
        {"x":1200, "y":600}
    ];


    /**********************************************************************************/
    // Create x Scale Functions
    var xMinimumValue = d3.min(data, function(d) { return d.x;});
    var xMaximumValue = d3.max(data, function(d) { return d.x;});
    var xDomain = [xMinimumValue, xMaximumValue];
    var xRange = [0, Width];

    // Create X Scale
    var xScale = d3.scale.linear().domain(xDomain).range(xRange);


    /**********************************************************************************/
    // Create Y Scale Functions
    var yMinimumValue = d3.min(data, function(d) { return d.y;});
    var yMaximumValue = d3.max(data, function(d) { return d.y;});
    var yDomain = [yMinimumValue, yMaximumValue];
    var yRange = [0, Height];

    // Create Y Scale
    var yScale = d3.scale.linear().domain(yDomain).range(yRange);


    /**********************************************************************************/
    // We will plot circles with random Radius's, let's use a function
    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
    }

    // let's update/modify our object, this is just a loop
    // d represents one of these objects {"x":0, "y":0}
    var rRangeMin = 5;
    var rRangeMax = 25;

    data.forEach(function(d){
        d.r = getRndInteger(rRangeMin, rRangeMax)// assign r by saying d.r, {"x":0, "y":0} -> {"x":0, "y":0 "r": int}
    });

    // Instead of min and max, lets use extent, returns [min, max]
    var rDomain = d3.extent(data, function(d) { return d.r;});
    var rRange = [rRangeMin, rRangeMax];
    var rScale = d3.scale.linear().domain(rDomain).range(rRange);

    /**********************************************************************************/

    // Accessor Functions, these can be placed in the d3 statements but making them separate
    // gives us more flexibility and it is cleaner
    var cx = function(d) {return xScale(d.x);};
    var cy = function(d) {return yScale(d.y);};
    var r  = function(d) {return rScale(d.r);};

    /**********************************************************************************/

    // We arent Adding a CSS border, we are drawing a rectangle the same size - you could use CSS
    svg0.append("rect")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("height", Height)
                    .attr("width", Width)
                    .style("stroke", borderColor)
                    .style("fill", "none")
                    .style("stroke-width", borderThickness);

    // Let's draw the circles using our Accessor Functions
    svg0.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", cx)
                    .attr("cy", cy)
                    .attr("r",   r)
                    .style('fill', "#95B9C7"); // using hex code, not the color name (Baby Blue)

    // We will write the coordinates with text so we can see the coordinate system placements
    svg0.selectAll("text")
                    .data(data)
                    .enter()
                    .append("text")
                    .text(function(d) { return "x = " + d.x + ", " + "y = " +  d.y; })
                    .attr("x", cx) //see, we can reference the Accessor Functions
                    .attr("y", cy) //we place the text in the same place
                    .style("font-family", "sans-serif")
                    .style("font-size", "18px")
                    .style("fill", "black");

}
function makeScales(){
 /*********************************************************************************
     ***************************  Learning Scales  ************************************
     *********************************************************************************/
    // these example use lists and other types of array to make JSON or directly
    // populate a chart, this is fine, above you can see how to convert
    // you can consider each set of values here a column in a cvs table

    /**********************************************************************************/
    // Dimensions of SVG
    var scaleWidth = 1200;
    var scaleHeight = 100;
    var margin = {"top": 20, "bottom": 20, "left": 20, "right": 20};
    var RANGE = [0, scaleWidth];


    /**********************************************************************************/
    // Domains
    var OrdinalStrRP    = ['Apples','Oranges','Pears','Plums'];
    var OrdinalIntRP    = [1, 2, 3, 4];
    var OrdinalIntRPPad = [1, 2, 3, 4];
    var OrdinalIntRB    = [1, 2, 3, 4];
    var OrdinalIntB     = [1, 2, 3, 4];
    var TimeStr         = ['1/1/2003', '2/1/2003', '3/1/2003', '4/1/2003', '5/1/2003', '6/1/2003'];
    var CommonDomain    = [0,1000];

    /**********************************************************************************/
    // Colors
    //var brewer = d3.entries(colorbrewer);

    // Ordinal Scales
    var a = d3.scale.ordinal().domain(OrdinalStrRP).rangePoints(RANGE);
    var b = d3.scale.ordinal().domain(OrdinalIntRP).rangePoints(RANGE);
    var c = d3.scale.ordinal().domain(OrdinalIntRPPad).rangePoints(RANGE, 1);
    var d = d3.scale.ordinal().domain(OrdinalIntRB).rangeRoundBands(RANGE);
    var e = d3.scale.ordinal().domain(OrdinalIntB).rangeBands(RANGE);

    // Color Scales
    var f = d3.scale.category10();
    var g = d3.scale.category20();
    var h = d3.scale.category20b();
    var i = d3.scale.category20c();

    // Time Scale
    var parseDate = d3.time.format("%m/%d/%Y").parse; // we need to parse dates, they are strings
    var j = d3.time.scale().domain(d3.extent(TimeStr, function(d){ return parseDate(d); })).range(RANGE);
    var j1 = d3.svg.axis().scale(j).orient("bottom");
    var j2 = d3.svg.axis().scale(j).orient("bottom").ticks(2);
    var j3 = d3.svg.axis().scale(j).orient("bottom").ticks(10);
    var j4 = d3.svg.axis().scale(j).orient("bottom").ticks(12);
    var j5 = d3.svg.axis().scale(j).orient("bottom").tickFormat(d3.time.format("%B"));
    var j6 = d3.svg.axis().scale(j).orient("bottom").tickFormat(d3.time.format("%b"));
    var j7 = d3.svg.axis().scale(j).orient("bottom").tickFormat(d3.time.format("%Y"));
    var j8 = d3.svg.axis().scale(j).orient("bottom").tickFormat(d3.time.format("%y"));
    var j9 = d3.svg.axis().scale(j).orient("bottom").tickFormat(d3.time.format("%b %d"));
    var j10 = d3.svg.axis().scale(j).orient("bottom").tickFormat(d3.time.format("%a %d"));
    var j11 = d3.svg.axis().scale(j).orient("bottom").tickFormat(customTimeFormat);
    var j12 = d3.svg.axis().scale(j).orient("bottom").tickSize(-6);
    var j13 = d3.svg.axis().scale(j).orient("bottom").tickSize(-20);
    var j14 = d3.svg.axis().scale(j).orient("bottom").innerTickSize(10).outerTickSize(-10);
    var j15 = d3.svg.axis().scale(j).orient("bottom").innerTickSize(-10).outerTickSize(10);
    var j16 = d3.svg.axis().scale(j).orient("top");
    var j17 = d3.svg.axis().scale(j).tickPadding(10);
    var j18 = d3.svg.axis().scale(j).tickPadding(-10);

    // Linear Scale
    var k = d3.scale.linear().domain(CommonDomain).range(RANGE);

    // Quantile Scales
    var l = d3.scale.quantile().domain(CommonDomain).range(RANGE);
    var m = d3.scale.quantize().domain(CommonDomain).range(RANGE);

    // Threshold Scale
    var n = d3.scale.threshold().domain(CommonDomain).range(RANGE);

    // Logarithmic Scale
    var o = d3.scale.log().domain(CommonDomain).range(RANGE);

    // Power Scale
    var p = d3.scale.pow().domain(CommonDomain).range(RANGE);

    // Square Root Scale
    var q = d3.scale.sqrt().domain(CommonDomain).range(RANGE);

    // Identity Scale
    var r = d3.scale.identity().domain(CommonDomain).range(RANGE);

    var SCALES = [
        {"key": "a", "scale": a, "text": "Ordinal Scale - Range Points", "d3": "d3.scale.ordinal().domain(['Apples','Oranges','Pears','Plums']).rangePoints(RANGE);"},
        {"key": "b", "scale": b, "text": "Ordinal Scale - Range Points", "d3": "d3.scale.ordinal().domain([1, 2, 3, 4]).rangePoints(RANGE);"},
        {"key": "c", "scale": c, "text": "Ordinal Scale - Range Points Padding", "d3": "d3.scale.ordinal().domain([1, 2, 3, 4]).rangePoints(RANGE, 1);"},
        {"key": "d", "scale": d, "text": "Ordinal Scale - Range Round Bands", "d3": "d3.scale.ordinal().domain([1, 2, 3, 4]).rangeRoundBands(RANGE);"},
        {"key": "e", "scale": e, "text": "Ordinal Scale - Range Bands", "d3": "d3.scale.ordinal().domain([1, 2, 3, 4]).rangeBands(RANGE);"},
        {"key": "f", "scale": f, "text": "Colour Scale - Category 10", "d3": "d3.scale.category10();"},
        {"key": "g", "scale": g, "text": "Colour Scale - Category 20", "d3": "d3.scale.category20()"},
        {"key": "h", "scale": h, "text": "Colour Scale - Category 20b", "d3": "d3.scale.category20b()"},
        {"key": "i", "scale": i, "text": "Colour Scale - Category 20c", "d3": "d3.scale.category20c()"},
        {"key": "j1", "scale": j1, "text": "Time Scale - Default", "d3": "d3.svg.axis().scale(j).orient(\"bottom\");"},
        {"key": "j2", "scale": j2, "text": "Time Scale - Ticks = 2", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").ticks(2);"},
        {"key": "j3", "scale": j3, "text": "Time Scale - Ticks = 10", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").ticks(10);"},
        {"key": "j4", "scale": j4, "text": "Time Scale - Ticks = 12", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").ticks(12);"},
        {"key": "j5", "scale": j5, "text": "Time Scale - Tick Format %B", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").tickFormat(d3.time.format(\"%B\"));"},
        {"key": "j6", "scale": j6, "text": "Time Scale - Tick Format %b", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").tickFormat(d3.time.format(\"%b\"));"},
        {"key": "j7", "scale": j7, "text": "Time Scale - Tick Format %Y", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").tickFormat(d3.time.format(\"%Y\"));"},
        {"key": "j8", "scale": j8, "text": "Time Scale - Tick Format %y", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").tickFormat(d3.time.format(\"%y\"));"},
        {"key": "j9", "scale": j9, "text": "Time Scale - Tick Format %b %d", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").tickFormat(d3.time.format(\"%b %d\"));"},
        {"key": "j10", "scale": j10, "text": "Time Scale - Tick Format %a %d", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").tickFormat(d3.time.format(\"%a %d\"));"},
        {"key": "j11", "scale": j11, "text": "Time Scale - Multi", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").tickFormat(customTimeFormat);"},
        {"key": "j12", "scale": j12, "text": "Time Scale - Tick Size -6", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").tickSize(-6);"},
        {"key": "j13", "scale": j13, "text": "Time Scale - Tick Size -20", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").tickSize(-20);"},
        {"key": "j14", "scale": j14, "text": "Time Scale - Inner/Outer Tick 10/-10", "d3": "d3.svg.axis().scale(j).orient(\"bottom\").innerTickSize(10).outerTickSize(-10);"},
        {"key": "j15", "scale": j15, "text": "Time Scale - Inner/Outer Tick -10/10", "d3": "3.svg.axis().scale(j).orient(\"bottom\").innerTickSize(-10).outerTickSize(10);"},
        {"key": "j16", "scale": j16, "text": "Time Scale - Orient Top", "d3": "d3.svg.axis().scale(j).orient(\"top\");"},
        {"key": "j17", "scale": j17, "text": "Time Scale - Padding 10", "d3": "d3.svg.axis().scale(j).tickPadding(10);"},
        {"key": "j18", "scale": j18, "text": "Time Scale - Padding -10", "d3": "d3.svg.axis().scale(j).tickPadding(-10);"},

        {"key": "k", "scale": k, "text": "Linear Scale", "d3": "d3.scale.linear().domain([0,1000]).range(RANGE)"},
        {"key": "l", "scale": l, "text": "Quantile Scale", "d3": "d3.scale.quantile().domain([0,1000]).range(RANGE);"},
        {"key": "m", "scale": m, "text": "Quantile Scale", "d3": "d3.scale.quantize().domain([0,1000]).range(RANGE);"},
        {"key": "n", "scale": n, "text": "Threshold Scale", "d3": "d3.scale.threshold().domain([0,1000]).range(RANGE);"},
        {"key": "o", "scale": o, "text": "Logarithmic Scale", "d3": "d3.scale.log().domain([0,1000]).range(RANGE);"},
        {"key": "p", "scale": p, "text": "Power Scale", "d3": "d3.scale.pow().domain([0,1000]).range(RANGE);"},
        {"key": "q", "scale": q, "text": "Square Root Scale", "d3": "d3.scale.sqrt().domain([0,1000]).range(RANGE);"},
        {"key": "r", "scale": r, "text": "Identity Scale", "d3": "d3.scale.identity().domain([0,1000]).range(RANGE);"},

    ];


    var customTimeFormat = d3.time.format.multi([
      [".%L", function(d) { return d.getMilliseconds(); }],
      [":%S", function(d) { return d.getSeconds(); }],
      ["%I:%M", function(d) { return d.getMinutes(); }],
      ["%I %p", function(d) { return d.getHours(); }],
      ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
      ["%b %d", function(d) { return d.getDate() != 1; }],
      ["%B", function(d) { return d.getMonth(); }],
      ["%Y", function() { return true; }]
    ]);


    // Add a new svg, apply style margins and then append a g for group. g is basically an SVG
    // inside an SVG, it's for organizing groups..
    // transform allow for relative positioning. an x or y is a direct positioning
    // a transform is relative to the x,y, here x y is 0 0


    for (var i = 0; i <= SCALES.length-1; i++){

        d3.select("#scales")
                .append("div").attr("class", "row")
                .append("div").attr("class","col-md-12")
                .append("h3").text(SCALES[i].text)
                .append("h5").text(SCALES[i].d3)
                .append("div").attr("id", SCALES[i].key)
                .append("hr");


        if(SCALES[i].key.length > 1){

            d3.select("#"+SCALES[i].key).append("svg")
                    .attr("width", scaleWidth + margin.left + margin.right)
                    .attr("height", scaleHeight + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .attr("class","axis")
                    .call(SCALES[i].scale);

        }else if(SCALES[i].key === "f" | SCALES[i].key === "g" | SCALES[i].key === "h" | SCALES[i].key === "i") {

            var svg = d3.select("#" + SCALES[i].key).append("svg")
                    .attr("width", scaleWidth + margin.left + margin.right)
                    .attr("height", scaleHeight + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .attr("class", "axis")
                    .call(d3.svg.axis().scale(SCALES[i].scale).orient("bottom"));

            var exd = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

            svg.selectAll(".rects")
                .data(exd)
                .enter()
                .append("rect")
                .attr("y", 10)
                .attr("height", 50)
                .attr("x", (d,i) => 10 + i* scaleWidth / exd.length )
                .attr("width", scaleWidth / exd.length)
                .attr("fill", d => SCALES[i].scale(d))
                .attr("stroke", "gray");
        }
        else{

            d3.select("#"+SCALES[i].key).append("svg")
                    .attr("width", scaleWidth + margin.left + margin.right)
                    .attr("height", scaleHeight + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .attr("class","axis")
                    .call(d3.svg.axis().scale(SCALES[i].scale).orient("bottom"));

        }
    };



}

makeSVG();
makeScales();