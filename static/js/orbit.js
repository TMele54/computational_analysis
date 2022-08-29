var margin = {top: 20, right: 10, bottom: 20, left: 10};

var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var innerR = width/6;
var innerCY = height/2;
var innerCX = width/2;

var bufferR = width/4

var orbitR = width/50;

var svg = d3.select("#circle-box")
                .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)

svg.append("circle")
        .attr("r", innerR)
        .attr("cy", innerCY)
        .attr("cx", innerCX)
        .attr("class","innerCircle")
        .attr("stroke-width", 5)
        .attr("stroke-style","solid")
        .attr("fill", "#bdc3c7");

svg.append('circle')
        .attr('r', bufferR)
        .attr('cy', innerCY)
        .attr('cx', innerCX)
        .attr('class', 'bufferCircle')
        .attr('stroke', '#9b59b6')
        .attr('stroke-dasharray', '5, 10')
        .attr('fill', 'none');

function orbitalXY(input) {
  var orbitalX = innerCX - (Math.sin( (input * Math.PI/180) ) * (bufferR));
  var orbitalY = innerCY - (Math.cos( (input * Math.PI/180) ) * (bufferR));
  return [orbitalX, orbitalY];
};

svg.append('circle')
        .attr('r', orbitR)
        .attr('cx', orbitalXY(180)[0])
        .attr('cy', orbitalXY(180)[1])
        .attr('fill', '#8e44ad')
        .attr('class', 'orbitalObject');

d3.select("#nDegrees").on("input", function() {
    update(+this.value);
});

// Our update function that updates the elements
function update(nDegrees) {

    // This adjust the text of the range slider
    d3.select("#nDegrees-value").text(nDegrees);
    d3.select("#nDegrees").property("value", nDegrees);

    // Now we can update the orbital object's location in degrees!
    svg.select('.orbitalObject')
        .attr('cx', orbitalXY(nDegrees)[0])
        .attr('cy', orbitalXY(nDegrees)[1]);
}


let t = 0;
var timeInterval = 1000;
setInterval(function(){
  t += 1;
  update(t % 360)
},timeInterval);

