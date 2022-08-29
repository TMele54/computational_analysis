var origin = [350, 325];
var _alpha = Math.PI/4
var _beta = 0.615472907
var _data = []
var max = 11
var min = -10
var rad = Math.PI/180;
var cnt = 0;
var j = 10;
var scale = 30;
var scatter = [];
var xLine = [];
var yLine = [];
var zLine = [];
var vectors = [];
var xGrid = [];
var alpha = 0;
var beta = 0;
var gamma = 0;
var key = function(d){ return d.id; };
var startAngle = 90; // Math.PI/3;
var svg = d3.select('#smart').append("svg").attr("width", 1050).attr("height", 600).call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd)).append('g');
var color = d3.scaleOrdinal(d3.schemeCategory20);

var mx;
var my;
var mz;

var mouseX;
var mouseY;
var mouseZ;

var grid3d = d3._3d().shape('GRID', 20).origin(origin).rotateX(startAngle).rotateY(startAngle).rotateZ(startAngle).scale(scale);
var point3d = d3._3d().x(function(d){ return d.x;}).y(function(d){ return d.y;}).z(function(d){ return d.z;}).origin(origin).rotateX(startAngle).rotateY(startAngle).rotateZ(startAngle).scale(scale);
var xScale3d = d3._3d().shape('LINE_STRIP').origin(origin).rotateX(startAngle).rotateY(startAngle).rotateZ(startAngle).scale(scale);
var yScale3d = d3._3d().shape('LINE_STRIP').origin(origin).rotateX(startAngle).rotateY(startAngle).rotateZ(startAngle).scale(scale);
var zScale3d = d3._3d().shape('LINE_STRIP').origin(origin).rotateX(startAngle).rotateY(startAngle).rotateZ(startAngle).scale(scale);
var vector3d = d3._3d().shape('LINE_STRIP').origin(origin).rotateX(startAngle).rotateY(startAngle).rotateZ(startAngle).scale(scale);
var rn = function(min, max){ return Math.round(d3.randomUniform(min, max + 1)()); };

function processData(data, tt){
    var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    var xGrid = svg.selectAll('path.grid').data(data[0], key);
    xGrid.enter().append('path').attr('class', '_3d grid').merge(xGrid).attr('stroke', 'black').attr('stroke-width', 0.3).attr('fill', function(d){ return d.ccw ? 'lightgrey' : '#717171'; }).attr('fill-opacity', 0.9).attr('d', grid3d.draw);
    xGrid.exit().remove();

    //Append a defs (for definition) element to your SVG
    var defs = svg.append("defs");

    //Append a radialGradient element to the defs and give it a unique id
    var radialGradient = defs.append("radialGradient")
                                .attr("id", "radial-gradient")
                                .attr("cx", "50%")
                                .attr("cy", "50%")
                                .attr("r", "50%");

    //Add colors to make the gradient appear like a Sun
    radialGradient.append("stop")
        .attr("offset", "25%")
        .attr("stop-color", "#FFF76B");

    radialGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#FFF845");

    radialGradient.append("stop")
        .attr("offset", "90%")
        .attr("stop-color", "#FFDA4E");

    radialGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#FB8933");

    var points = svg.selectAll('circle').data(data[1], key);
    points
        .enter()
        .append('circle')
            .attr('class', '_3d')
            .attr('opacity', 0)
            .attr('cx', posPointX)
            .attr('cy', posPointY)
            .merge(points)
            .on('mouseover', function (d, i) {
                d3.select(this).transition().duration('100').attr("r", 12);  //Makes div appear
                div.transition().duration(100).style("opacity", 1);
                //div.html("["+"x="+d.x+", y="+d.y+", z="+d.z+"]")
                div.html("Position: [ "+d.x+", "+d.y+", "+d.z+" ]")
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 15) + "px");

            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition().duration('200').attr("r", 6);
                div.transition().duration('200').style("opacity", 0);
            })
            .transition()
            .duration(tt)
                .attr('r', 6)
                .attr('stroke', function(d){
                    return d3.color(color(d.id)).darker(3);
                })
                .attr('fill', function(d){
                    return color(d.id);
                })
                .attr('opacity', 1)
                .style("fill", "url(#radial-gradient)")
                .attr('cx', posPointX)
                .attr('cy', posPointY)










    points.exit().remove();

    var xScale = svg.selectAll('path.xScale').data(data[2]);
    var yScale = svg.selectAll('path.yScale').data(data[3]);
    var zScale = svg.selectAll('path.zScale').data(data[4]);
    var vect = svg.selectAll('path.vectors').data(data[5]);

    xScale.enter().append('path').attr('class', '_3d xScale').merge(xScale).attr('stroke', 'red').attr('stroke-width', 1).attr('d', xScale3d.draw);
    yScale.enter().append('path').attr('class', '_3d yScale').merge(yScale).attr('stroke', 'green').attr('stroke-width', 1).attr('d', yScale3d.draw);
    zScale.enter().append('path').attr('class', '_3d zScale').merge(zScale).attr('stroke', 'blue').attr('stroke-width', 1).attr('d', zScale3d.draw);
    vect.enter().append('path').attr('class', '_3d vectors').merge(vect).attr('stroke', 'orange').attr('stroke-width', 2).attr('d', vector3d.draw);

    xScale.exit().remove();
    yScale.exit().remove();
    zScale.exit().remove();
    vect.exit().remove();

    var xText = svg.selectAll('text.xText').data(data[2][0]);
    var yText = svg.selectAll('text.yText').data(data[3][0]);
    var zText = svg.selectAll('text.zText').data(data[4][0]);

    xText.enter().append('text').attr('class', '_3d xText').attr('dx', '.3em').merge(xText).each(function(d){ d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z}}).attr('x', function(d){ return d.projected.x; }).attr('y', function(d){ return d.projected.y; }).attr('z', function(d){ return d.projected.z; }).text(function(d){ return d[0]});
    yText.enter().append('text').attr('class', '_3d yText').attr('dx', '.3em').merge(yText).each(function(d){ d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z}}).attr('x', function(d){ return d.projected.x; }).attr('y', function(d){ return d.projected.y; }).attr('z', function(d){ return d.projected.z; }).text(function(d){ return d[1]});
    zText.enter().append('text').attr('class', '_3d zText').attr('dx', '.3em').merge(zText).each(function(d){ d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z}}).attr('x', function(d){ return d.projected.x; }).attr('y', function(d){ return d.projected.y; }).attr('z', function(d){ return d.projected.z; }).text(function(d){ return d[2]});

    xText.exit().remove();
    yText.exit().remove();
    zText.exit().remove();

    d3.selectAll('._3d').sort(d3._3d().sort);

}
function posPointX(d){
    return d.projected.x;
}
function posPointY(d){
    return d.projected.y;
}
function posPointZ(d){
    return d.projected.z;
}
function dragStart(){
    mx = d3.event.x;
    my = d3.event.y;
    mz = d3.event.z;
}
function dragged(){
    mouseX = mouseX || 0;
    mouseY = mouseY || 0;
    mouseZ = mouseZ || 0;
    beta   = (d3.event.x - mx + mouseX) * Math.PI / 230 ;
    alpha  = (d3.event.y - my + mouseY) * Math.PI / 230 ;
    gamma  = (d3.event.z - mz + mouseZ) * Math.PI / 230 * (-1);

    //          .rotateZ(gamma - startingAngle)

    var data = [
        grid3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)(xGrid),
        point3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)(scatter),
        xScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([xLine]),
        yScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([yLine]),
        zScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([zLine]),
        vector3d.rotateX(alpha - startAngle).rotateY(beta - startAngle)([vectors]),
    ];

    processData(data, 10);

}
function dragEnd(){
    mouseX = d3.event.x - mx + mouseX;
    mouseY = d3.event.y - my + mouseY;
    mouseZ = d3.event.z - mz + mouseZ;
}

function init(){

    //init vars
    cnt,xGrid,scatter,xLine,yLine,zLine,vectors

    // sample scatter data
    scatter = [
                {'x': 6, 'y': 6, 'z': 4, 'id': 'point_0', 'index': '0', 'break': '75%'},
                {'x': 1, 'y': 4, 'z': 3, 'id': 'point_1', 'index': '1', 'break': '75%'},
                {'x': 4, 'y': 5, 'z': 2, 'id': 'point_2', 'index': '2', 'break': '50%'},
                {'x': 3, 'y': 4, 'z': 8, 'id': 'point_3', 'index': '3', 'break': '75%'},
                {'x': 1, 'y': 1, 'z': 4, 'id': 'point_4', 'index': '4', 'break': '50%'},
                {'x': 8, 'y': 2, 'z': 2, 'id': 'point_5', 'index': '5', 'break': '50%'},
                {'x': 4, 'y': 0, 'z': 7, 'id': 'point_6', 'index': '6', 'break': '75%'},
                {'x': 1, 'y': 9, 'z': 2, 'id': 'point_7', 'index': '7', 'break': '75%'},
                {'x': 9, 'y': 9, 'z': 9, 'id': 'point_8', 'index': '8', 'break': '100%'},
                {'x': 7, 'y': 1, 'z': 3, 'id': 'point_9', 'index': '9', 'break': '75%'},
                {'x': 4, 'y': 2, 'z': 6, 'id': 'point_10', 'index': '10', 'break': '0%'},
                {'x': 1, 'y': 3, 'z': 7, 'id': 'point_11', 'index': '11', 'break': '75%'},
                {'x': 2, 'y': 8, 'z': 2, 'id': 'point_12', 'index': '12', 'break': '0%'},
                {'x': 7, 'y': 1, 'z': 1, 'id': 'point_13', 'index': '13', 'break': '0%'},
                {'x': 7, 'y': 9, 'z': 1, 'id': 'point_14', 'index': '14', 'break': '100%'},
                {'x': 3, 'y': 4, 'z': 5, 'id': 'point_15', 'index': '15', 'break': '50%'},
                {'x': 2, 'y': 1, 'z': 9, 'id': 'point_16', 'index': '16', 'break': '0%'},
                {'x': 9, 'y': 1, 'z': 6, 'id': 'point_17', 'index': '17', 'break': '0%'},
                {'x': 4, 'y': 1, 'z': 3, 'id': 'point_18', 'index': '18', 'break': '100%'},
                {'x': 7, 'y': 4, 'z': 0, 'id': 'point_19', 'index': '19', 'break': '0%'},
                {'x': 1, 'y': 5, 'z': 3, 'id': 'point_20', 'index': '20', 'break': '0%'},
                {'x': 6, 'y': 1, 'z': 2, 'id': 'point_21', 'index': '21', 'break': '50%'},
                {'x': 8, 'y': 3, 'z': 1, 'id': 'point_22', 'index': '22', 'break': '0%'},
                {'x': 4, 'y': 3, 'z': 9, 'id': 'point_23', 'index': '23', 'break': '50%'},
                {'x': 6, 'y': 4, 'z': 4, 'id': 'point_24', 'index': '24', 'break': '50%'},
                {'x': 6, 'y': 1, 'z': 7, 'id': 'point_25', 'index': '25', 'break': '50%'},
                {'x': 9, 'y': 9, 'z': 5, 'id': 'point_26', 'index': '26', 'break': '0%'},
                {'x': 9, 'y': 5, 'z': 6, 'id': 'point_27', 'index': '27', 'break': '75%'},
                {'x': 8, 'y': 6, 'z': 6, 'id': 'point_28', 'index': '28', 'break': '50%'},
                {'x': 6, 'y': 5, 'z': 5, 'id': 'point_29', 'index': '29', 'break': '0%'},
                {'x': 2, 'y': 3, 'z': 7, 'id': 'point_30', 'index': '30', 'break': '100%'},
                {'x': 3, 'y': 6, 'z': 3, 'id': 'point_31', 'index': '31', 'break': '100%'},
                {'x': 6, 'y': 2, 'z': 1, 'id': 'point_32', 'index': '32', 'break': '50%'},
                {'x': 7, 'y': 5, 'z': 5, 'id': 'point_33', 'index': '33', 'break': '75%'},
                {'x': 9, 'y': 2, 'z': 9, 'id': 'point_34', 'index': '34', 'break': '50%'},
                {'x': 0, 'y': 9, 'z': 4, 'id': 'point_35', 'index': '35', 'break': '50%'},
                {'x': 5, 'y': 6, 'z': 1, 'id': 'point_36', 'index': '36', 'break': '0%'},

    ]

    // x, y, z axis data
    d3.range(min, max, 1).forEach(function(d){ xLine.push([d, 0, 0]); });
    d3.range(min, max, 1).forEach(function(d){ yLine.push([0, d, 0]); });
    d3.range(min, max, 1).forEach(function(d){ zLine.push([0, 0, d]); });
    //d3.range(min, max, 1).forEach(function(d){ vectors.push([0, 0, d]); });

    // domain vector data
    [0,0,0,0,0,0,0,0,0,0].forEach(function(d){
        vectors.push([
                [0, 0, 0],
                [
                    rn(min, max),
                    rn(min, max),
                    rn(min, max)
                ]]
        )
    })

    var data = [
        grid3d(xGrid),
        point3d(scatter),
        xScale3d([xLine]),
        yScale3d([yLine]),
        zScale3d([zLine]),
        vector3d(vectors)
    ];

    processData(data, 1500);

}

d3.selectAll('button').on('click', init);

init();