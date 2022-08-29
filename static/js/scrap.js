
function processData(data, tt){
    var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    var xGrid = svg.selectAll('path.grid').data(data[0], key);
    xGrid.enter().append('path').attr('class', '_3d grid').merge(xGrid).attr('stroke', 'black').attr('stroke-width', 0.3).attr('fill', function(d){ return d.ccw ? 'lightgrey' : '#717171'; }).attr('fill-opacity', 0.9).attr('d', grid3d.draw);
    xGrid.exit().remove();

    var grads = svg.append("defs").selectAll("radialGradient")
        .data(nodes)
        .enter()
        .append("radialGradient")
        .attr("gradientUnits", "objectBoundingBox")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", "100%")
        .attr("id", function(d, i) { return "grad" + i; });

    grads.append("stop").attr("offset", "0%").style("stop-color", "white");
    grads.append("stop").attr("offset", "100%").style("stop-color",  function(d) { return color(d.cluster); });


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
                .attr("id", function(d, i) { return "grad" + i; })
                .attr('stroke', function(d){ return d3.color(color(d.id)).darker(3); })
                //.attr('fill', function(d){ return color(d.id); })
                .attr('opacity', 1)
                .style("fill", function(d, i) {return "url(#grad" + i + ")";})
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