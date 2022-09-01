// Initialize many variables

var origin = [400, 325],
_alpha = Math.PI/4,
_beta = 0.615472907,
_data = [],
max = 11,
min = -10,
rad = Math.PI/180,
cnt = 0,
j = 10,
scale = 25,
scatter = [],
xLine = [],
yLine = [],
zLine = [],
vectors = [],
xGrid = [],
alpha = 0,
beta = 0,
gamma = 0,
startAngle = 0, // Math.PI/3;
startAngleX = 0, // Math.PI/3;
startAngleY = 0, // Math.PI/3;
startAngleZ = 0, // Math.PI/3;
orientations = {
    "xy": [Math.PI, 0],
    "-xy": [Math.PI, Math.PI],
    "x-y": [0, 0],
    "-x-y": [0, Math.PI],
},
color = d3.scaleOrdinal(d3.schemeCategory20),
domains = ["A","B","C","D","E","F","G","H","I","J"],
mx,
my,
mz,
mouseX,
mouseY,
mouseZ,
key = function(d){ return d.id; },
point_tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0),
vector_tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

var svg = d3.select('#dynamic').append("svg").attr("width", 1050).attr("height", 600).call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd)).append('g');
var grid3d = d3._3d().shape('GRID', 20).origin(origin).rotateX(startAngle).rotateY(startAngle).rotateZ(startAngle).scale(scale);
var xScale3d = d3._3d().shape('LINE_STRIP').origin(origin).rotateX(startAngleX).rotateY(startAngleY).rotateZ(startAngleZ).scale(scale);
var yScale3d = d3._3d().shape('LINE_STRIP').origin(origin).rotateX(startAngleX).rotateY(startAngleY).rotateZ(startAngleZ).scale(scale);
var zScale3d = d3._3d().shape('LINE_STRIP').origin(origin).rotateX(startAngleX).rotateY(startAngleY).rotateZ(startAngleZ).scale(scale);

var point3d = d3._3d()
                    .x(function(d){ return d.x;}).y(function(d){ return d.y;}).z(function(d){ return d.z;})
                    .origin(origin).scale(scale)
                    .rotateX(startAngle).rotateY(startAngle).rotateZ(startAngle);

var label3d = d3._3d()
                    .x(function(d){ return d.x;}).y(function(d){ return d.y;}).z(function(d){ return d.z;})
                    .origin(origin).scale(scale)
                    .rotateX(startAngle).rotateY(startAngle).rotateZ(startAngle);

var vector3d = d3._3d()
                    .x(function(d){ return d.x1; }).y(function(d){ return d.y1; }).z(function(d){ return d.z1; })
                    .origin(origin).scale(scale)
                    .rotateX(startAngle).rotateY(startAngle).rotateZ(startAngle);

// Make random numbers for the domain vectors
var rn = function(min, max){ return Math.round(d3.randomUniform(min, max + 1)()); };

function processData(data, tt){
    point_tooltip,vector_tooltip
    // Coloring Mechanism to make scatter data look like a sphere not a circle
    //Append a defs (for definition) element to your SVG
    var defs = svg.append("defs");

    //Append a radialGradient element to the defs and give it a unique id
    var radialGradient = defs.append("radialGradient").attr("id", "radial-gradient").attr("cx", "50%").attr("cy", "50%").attr("r", "50%");

    //Add colors to make the gradient appear like a Sun
    radialGradient.append("stop").attr("offset", "25%").attr("stop-color", "#ff004f");
    radialGradient.append("stop").attr("offset", "50%").attr("stop-color", "#ff004f");
    radialGradient.append("stop").attr("offset", "90%").attr("stop-color", "#9c8c07");
    radialGradient.append("stop").attr("offset", "100%").attr("stop-color", "#844800");

    // Added scatter data to the SVG
    var points = svg.selectAll('circle').data(data[1], key);

    points
        .enter()
        .append('circle')
            .attr('class', '_3d point_un')
            .attr("id", function(d){ return d.id})
            .attr('opacity', 0)
            .attr('cx', posPointX)
            .attr('cy', posPointY)
            .merge(points)
            .on('mouseover', function (d, i) {
                d3.select(this).transition().duration('100').attr("r", 12);
                point_tooltip.transition().duration(100).style("opacity", 1);
                point_tooltip.html("Position: [ "+d.x+", "+d.y+", "+d.z+" ]")
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 15) + "px");
                d3.selectAll(".point_un").attr('opacity', 0.1)
                d3.select(this).attr('opacity', 1)

            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition().duration('200').attr("r", 6);
                point_tooltip.transition().duration('200').style("opacity", 0);
                d3.selectAll(".point_un").attr('opacity', 1)
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

    var vectors = svg.selectAll('line').data(data[5], key);

    vectors
        .enter()
        .append('line')
            .attr('class', '_3d line')
            .merge(vectors)
            .each(function(d){
                d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z}
            })
            .attr("x1", origin[0])
            .attr("y1", origin[1])
            .attr("z1", 0)
            .attr("x2", posPointX)
            .attr("y2", posPointY)
            .attr("z2", posPointZ)
            .style("stroke", "black")
            .style("stroke-width", "5")
            .style("stroke-dasharray", "4,2")
            .style("shape-rendering", "crispEdges")
            .on('mouseover', function (d, i) {
                d3.select(this).transition().duration('10')
                        .style("stroke", "red")
                        .style("stroke-width", "5")
                        .style("stroke-dasharray", "5000,2")

                vector_tooltip.transition().duration(100).style("opacity", 1);
                vector_tooltip
                        .html("Position: [ 0, 0, 0 ] => [ "+d.x1+", "+d.y1+", "+d.z1+" ]")
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 15) + "px");

                d3.selectAll("line").attr('opacity', 0.1)
                d3.select(this).attr('opacity', 1)

            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition().duration('1000')
                        .style("stroke", "black")
                        .style("stroke-width", "5")
                        .style("stroke-dasharray", "4,2")

                vector_tooltip.transition().duration('200').style("opacity", 0);

                d3.selectAll("line").attr('opacity', 1)
            })


    // Added scatter data to the SVG
    var labels = svg.selectAll('text').data(data[1], key);

    labels
        .enter()
        .append('text')
            .attr('class', '_3d text noselect point_un')
            .merge(labels)
            .attr("x", posPointX)
            .attr("y", posPointY)
            .attr("z", posPointZ)
            .attr("dy", ".3em")
            .attr("transform", "translate(10,0)")
            .text(function(d) { return d.org; });

    // all of these are just lines in the 3d space
    var xScale = svg.selectAll('path.xScale').data(data[2]);
    var yScale = svg.selectAll('path.yScale').data(data[3]);
    var zScale = svg.selectAll('path.zScale').data(data[4]);

    xScale.enter().append('path').attr('class', '_3d xScale').merge(xScale).attr('stroke', "#280808").attr('stroke-width', 1).attr('d', xScale3d.draw);
    yScale.enter().append('path').attr('class', '_3d yScale').merge(yScale).attr('stroke', "#280808").attr('stroke-width', 1).attr('d', yScale3d.draw);
    zScale.enter().append('path').attr('class', '_3d zScale').merge(zScale).attr('stroke', "#280808").attr('stroke-width', 1).attr('d', zScale3d.draw);

    xScale.exit().remove();
    yScale.exit().remove();
    zScale.exit().remove();

    // Adding text to the axis lines, will need text in more places
    var xText = svg.selectAll('text.xText').data(data[2][0]);
    var yText = svg.selectAll('text.yText').data(data[3][0]);
    var zText = svg.selectAll('text.zText').data(data[4][0]);

    xText.enter().append('text').attr('class', '_3d xText noselect').attr('dx', '.3em').merge(xText).each(function(d){ d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z}}).attr('x', function(d){ return d.projected.x; }).attr('y', function(d){ return d.projected.y; }).attr('z', function(d){ return d.projected.z; }).text(function(d){ return d[0]});
    yText.enter().append('text').attr('class', '_3d yText noselect').attr('dx', '.3em').merge(yText).each(function(d){ d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z}}).attr('x', function(d){ return d.projected.x; }).attr('y', function(d){ return d.projected.y; }).attr('z', function(d){ return d.projected.z; }).text(function(d){ return d[1]});
    zText.enter().append('text').attr('class', '_3d zText noselect').attr('dx', '.3em').merge(zText).each(function(d){ d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z}}).attr('x', function(d){ return d.projected.x; }).attr('y', function(d){ return d.projected.y; }).attr('z', function(d){ return d.projected.z; }).text(function(d){ return d[2]});

    xText.exit().remove();
    yText.exit().remove();
    zText.exit().remove();

    d3.selectAll('._3d').sort(d3._3d().sort);

};
function posPointX(d){
    return d.projected.x;
};
function posPointY(d){
    return d.projected.y;
};
function posPointZ(d){
    return d.projected.z;
};
function dragStart(){
    mx = d3.event.x;
    my = d3.event.y;
    mz = d3.event.z;
};
function dragged(){
    point_tooltip, vector_tooltip

    mouseX = mouseX || 0;
    mouseY = mouseY || 0;

    beta   = (d3.event.x - mx + mouseX) * Math.PI / 230 ;
    alpha  = (d3.event.y - my + mouseY) * Math.PI / 230 ;

    var data = [
        grid3d.rotateX(alpha - startAngleX).rotateY(beta + startAngleY)(xGrid),
        point3d.rotateX(alpha - startAngleX).rotateY(beta + startAngleY)(scatter),
        xScale3d.rotateX(alpha - startAngleX).rotateY(beta + startAngleY)([xLine]),
        yScale3d.rotateX(alpha - startAngleX).rotateY(beta + startAngleY)([yLine]),
        zScale3d.rotateX(alpha - startAngleX).rotateY(beta + startAngleY)([zLine]),
        vector3d.rotateX(alpha - startAngleX).rotateY(beta - startAngleY)(vectors),
    ];

    vector_tooltip.style("opacity", 0);
    point_tooltip.style("opacity", 0);
    processData(data, 10);

};
function dragEnd(){
    mouseX = d3.event.x - mx + mouseX;
    mouseY = d3.event.y - my + mouseY;
    mouseZ = d3.event.z - mz + mouseZ;
};
function orientation(type){

    alpha = orientations[type][0]
    beta = orientations[type][1]

    var data = [
        grid3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)(xGrid),
        point3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)(scatter),
        xScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([xLine]),
        yScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([yLine]),
        zScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([zLine]),
        vector3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)(vectors),
    ];

    processData(data, 10);

};
/*
function filter_points(_id){

    _scatter = []

    scatter.forEach((d) => {
        console.log(d.id)
        if (d.id == _id){
            _scatter.push(d)
        }else{
            d3.select("#"+d.id).remove()
        }
    })

    var data = [
        grid3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)(xGrid),
        point3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)(_scatter),
        xScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([xLine]),
        yScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([yLine]),
        zScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([zLine]),
        vector3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)(vectors),
    ];

    processData(data, 10);

}
function filter_vectors(_id){

    _vectors = []

    vectors.forEach((d) => {
        if (d.id == _id){
            _vectors.push(d)
        }else{

        }
    })

    d3.selectAll("line").remove()

    //scatter =
    var data = [
        grid3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)(xGrid),
        point3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)(scatter),
        xScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([xLine]),
        yScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([yLine]),
        zScale3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)([zLine]),
        vector3d.rotateX(alpha - startAngle).rotateY(beta + startAngle)(_vectors),
    ];

    processData(data, 10);

}
*/
function init(){

    //init vars
    cnt,xGrid,scatter,xLine,yLine,zLine,vectors,domains

    // sample scatter data
    scatter = [
    {'x': -9, 'y': -4, 'z': -10, 'id': 'point_0', 'index': '0', 'break': '50%', 'org': 'Sinopharm'},
    {'x': 1, 'y': 2, 'z': 8, 'id': 'point_1', 'index': '1', 'break': '100%', 'org': 'Roche Pharmaceuticals'},
    {'x': 4, 'y': -6, 'z': 1, 'id': 'point_2', 'index': '2', 'break': '50%', 'org': 'Novartis'},
    {'x': 8, 'y': -5, 'z': -10, 'id': 'point_3', 'index': '3', 'break': '75%', 'org': 'Merck'},
    {'x': 7, 'y': -1, 'z': 5, 'id': 'point_4', 'index': '4', 'break': '75%', 'org': 'AbbVie'},
    {'x': -9, 'y': -8, 'z': 4, 'id': 'point_5', 'index': '5', 'break': '50%', 'org': 'Janssen'},
    {'x': -9, 'y': -3, 'z': -7, 'id': 'point_6', 'index': '6', 'break': '75%', 'org': 'GlaxoSmithKline (GSK)'},
    {'x': 5, 'y': 5, 'z': -8, 'id': 'point_7', 'index': '7', 'break': '50%', 'org': 'Bristol Myers Squibb'},
    {'x': -5, 'y': -10, 'z': 4, 'id': 'point_8', 'index': '8', 'break': '100%', 'org': 'Pfizer'},
    {'x': 4, 'y': -10, 'z': 6, 'id': 'point_9', 'index': '9', 'break': '75%', 'org': 'Sanofi'},
    {'x': -2, 'y': -5, 'z': 1, 'id': 'point_10', 'index': '10', 'break': '50%', 'org': 'Takeda Pharmaceutical'},
    {'x': 0, 'y': -3, 'z': -9, 'id': 'point_11', 'index': '11', 'break': '50%', 'org': 'AstraZeneca'},
    {'x': -7, 'y': -1, 'z': 4, 'id': 'point_12', 'index': '12', 'break': '0%', 'org': 'Gilead Sciences'},
    {'x': -10, 'y': -10, 'z': 1, 'id': 'point_13', 'index': '13', 'break': '75%', 'org': 'Eli Lilly'},
    {'x': -8, 'y': 1, 'z': -3, 'id': 'point_14', 'index': '14', 'break': '75%', 'org': 'Amgen'},
    {'x': -3, 'y': -2, 'z': 0, 'id': 'point_15', 'index': '15', 'break': '0%', 'org': 'Bayer'},
    {'x': 9, 'y': 4, 'z': -2, 'id': 'point_16', 'index': '16', 'break': '50%', 'org': 'Novo Nordisk'},
    {'x': 9, 'y': 2, 'z': -5, 'id': 'point_17', 'index': '17', 'break': '75%', 'org': 'Boehringer Ingelheim'},
    {'x': 5, 'y': -3, 'z': 3, 'id': 'point_18', 'index': '18', 'break': '50%', 'org': 'Teva Pharmaceutical'},
    {'x': 7, 'y': 1, 'z': -5, 'id': 'point_19', 'index': '19', 'break': '100%', 'org': 'Merck KGaA'},
    {'x': -9, 'y': 3, 'z': 5, 'id': 'point_20', 'index': '20', 'break': '75%', 'org': 'Biogen'},
    {'x': -3, 'y': -7, 'z': -4, 'id': 'point_21', 'index': '21', 'break': '100%', 'org': 'Viatris'},
    {'x': -1, 'y': -2, 'z': 4, 'id': 'point_22', 'index': '22', 'break': '0%', 'org': 'Astellas Pharma'},
    {'x': 2, 'y': 1, 'z': -8, 'id': 'point_23', 'index': '23', 'break': '0%', 'org': 'Daiichi Sankyo'},
    {'x': 7, 'y': 6, 'z': -3, 'id': 'point_24', 'index': '24', 'break': '100%', 'org': 'Otsuka Holdings'},
    {'x': -7, 'y': 3, 'z': -9, 'id': 'point_25', 'index': '25', 'break': '50%', 'org': 'CSL'},
    {'x': 5, 'y': -5, 'z': -10, 'id': 'point_26', 'index': '26', 'break': '100%', 'org': 'Regeneron Pharmaceuticals'},
    ];

    // x, y, z axis data
    d3.range(min, max, 1).forEach(function(d){ xLine.push([d, 0, 0]); });
    d3.range(min, max, 1).forEach(function(d){ yLine.push([0, d, 0]); });
    d3.range(min, max, 1).forEach(function(d){ zLine.push([0, 0, d]); });

    vectors = [
        {'x': 0, 'y': 0, 'z': 0, 'x1': 8, 'y1': -9, 'z1': -2, 'id': 'point_0', 'index': '0'},
        {'x': 0, 'y': 0, 'z': 0, 'x1': -3, 'y1': 2, 'z1': -5, 'id': 'point_1', 'index': '1'},
        {'x': 0, 'y': 0, 'z': 0, 'x1': 4, 'y1': -4, 'z1': 8, 'id': 'point_2', 'index': '2'},
        {'x': 0, 'y': 0, 'z': 0, 'x1': -6, 'y1': 9, 'z1': 5, 'id': 'point_3', 'index': '3'},
        {'x': 0, 'y': 0, 'z': 0, 'x1': 3, 'y1': -0, 'z1': -9, 'id': 'point_4', 'index': '4'},
        {'x': 0, 'y': 0, 'z': 0, 'x1': -8, 'y1': 8, 'z1': 2, 'id': 'point_5', 'index': '5'},
        {'x': 0, 'y': 0, 'z': 0, 'x1': 3, 'y1': -9, 'z1': 5, 'id': 'point_6', 'index': '6'},
    ];

    var data = [
        grid3d(xGrid),
        point3d(scatter),
        xScale3d([xLine]),
        yScale3d([yLine]),
        zScale3d([zLine]),
        vector3d(vectors),
        label3d(scatter)
    ];

    processData(data, 1500);

};

d3.select('#orientation_xy').on('click', function(d){orientation("xy");});
d3.select('#orientation_-xy').on('click', function(d){orientation("-xy");});
d3.select('#orientation_x-y').on('click', function(d){orientation("x-y");});
d3.select('#orientation_-x-y').on('click', function(d){orientation("-x-y");});
//d3.select('#filter_point').on('click', function(d){filter_points(10);});
//d3.select('#filter_vector').on('click', function(d){filter_vectors(10);});

init();