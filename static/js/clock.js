function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}
function make_gear(sel, unit_sel, label, time){

    // Conversation Factor
    let cf = 0
    let timeInterval = 1;
    if(unit_sel === "hour"){
        cf = 15;
        timeInterval = (1000 * 60 * 60 * 24) / 360
    }else if(unit_sel === "min"){
        cf = 6;
        timeInterval = (1000 * 60 * 60) / 360
    }else if(unit_sel === "sec"){
        cf = 6
        timeInterval = (1000 * 60) / 360
    }else if(unit_sel === "ms"){
        cf = 0.360
        timeInterval = 1000 / 360
    }

    // Initial Position (Degrees)
    let init_dg = cf * time

    var margin = {top: 0, right: 0, bottom: 0, left: 0};

    var width = 300 - margin.left - margin.right;
    var height = 200 - margin.top - margin.bottom;

    var innerR = width/6;
    var innerCY = height/2;
    var innerCX = width/2;
    var bufferR = width/4
    var orbitR = width/50;

    var svg = d3.select("#" + sel)
                    .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)

    // Center Circle
    svg.append("circle")
            .attr("r", innerR)
            .attr("cy", innerCY)
            .attr("cx", innerCX)
            .attr("class","innerCircle")
            .attr("stroke-width", 5)
            .attr("stroke-style","solid")
            .attr("fill", "#bdc3c7");


    // Center Text
    svg.append("text")
            .attr("dy", ".35em")
            .attr("x", innerCX)
            .attr("y", innerCY)
            .attr("text-anchor", "middle")
            .text(label);


    // Path Circle
    svg.append('circle')
            .attr('r', bufferR)
            .attr('cy', innerCY)
            .attr('cx', innerCX)
            .attr('class', 'bufferCircle')
            .attr('stroke', '#9b59b6')
            .attr('stroke-dasharray', '5, 10')
            .attr('fill', 'none');

    // Initial Position

    svg.append('circle')
            .attr('r', orbitR)
            .attr('cx', orbitalXY(init_dg)[0])
            .attr('cy', orbitalXY(init_dg)[1])
            .attr('fill', '#8e44ad')
            .attr('class', unit_sel);


    function orbitalXY(input) {
      var orbitalX = innerCX - (Math.sin( (input * Math.PI/180) ) * (bufferR));
      var orbitalY = innerCY - (Math.cos( (input * Math.PI/180) ) * (bufferR));
      return [orbitalX, orbitalY];
    };

    function update(unit_sel,nDegrees) {

        svg.select('.'+unit_sel)
            .attr('cx', orbitalXY(nDegrees)[0])
            .attr('cy', orbitalXY(nDegrees)[1]);
    }

    let t = init_dg;
    setInterval(function(){
      t += 1;
      update(unit_sel, t % 360)
    },timeInterval);
}
function make_stamp(sel, time){

    var margin = {top: 10, right: 10, bottom: 10, left: 10};

    var width = 300 - margin.left - margin.right;
    var height = 75 - margin.top - margin.bottom;

    var svg = d3.select("#" + sel)
                    .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)

    // Center Text
    svg.append("text")
        .attr("class", "mytime")
            .attr("dy", ".35em")
            .attr("x", 100)
            .attr("y", 50)
            .attr("text-anchor", "start")
            .text(time);

    function update() {
        let d = new Date()
        let h = addZero(d.getHours())
        let m = addZero(d.getMinutes())
        let s = addZero(d.getSeconds())
        let ms = addZero(d.getMilliseconds())
        let _time = h + ":" + m + ":" + s + ":" + ms ;
        d3.select(".mytime").text(_time);
    }

    let timeInterval = 1;
    setInterval(function(){
        update();
    },timeInterval);

}

const d = new Date();
make_gear("hr-box", "hour", "Hours", d.getHours())
make_gear("min-box", "min", "Minutes", d.getMinutes())
make_gear("sec-box", "sec", "Seconds", d.getSeconds())
make_gear("ms-box", "ms", "Milliseconds", d.getMilliseconds())

let h = addZero(d.getHours());
let m = addZero(d.getMinutes());
let s = addZero(d.getSeconds());
let ms = addZero(d.getMilliseconds());
let time = h + ":" + m + ":" + s + ":" + ms ;

make_stamp("digi", time)




