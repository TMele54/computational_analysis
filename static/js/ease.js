function easeExamples(selector){

    let width = 1000
    let height = 1000

    var easing = [
        "easeElastic - Elastic",
        "easeBounce - Bouncing",
        "easeLinear - Linear",
        "easeSin - Sinusoidal",
        "easeQuad - Quadratic",
        "easeCubic - Cubic",
        "easePoly - Polynomial",
        "easeCircle - Circle",
        "easeExp - Exponential",
        "easeBack - Overshoot"
        ];

    var svg = d3.select("#"+selector)
                                .append("svg")
                                .attr("width", width)
                                .attr("height", height);

    function circleTransition(easement, yPos){
        let ball = 20
        var timeCircle = svg.append("circle").attr("fill", "steelblue")
                .attr("r", ball);

        function repeat() {
          timeCircle
            .attr('cx', 210)          // position the circle at 40 on the x axis
            .attr('cy', (yPos*45)+25) // position the circle at 250 on the y axis
            .transition()             // apply a transition
            .ease(easement)           // control the speed of the transition
            .duration(2000)           // apply it over 2000 milliseconds
            .attr('cx', 720)          // move the circle to 920 on the x axis
            .transition()             // apply a transition
            .ease(easement)           // control the speed of the transition
            .duration(2000)           // apply it over 2000 milliseconds
            .attr('cx', 210)          // return the circle to 40 on the x axis
            //.on("end", repeat);       // when the transition finishes start again
        };
        repeat();

        var easeType = svg.append("text")
                            .attr("dy", ".35em") // set offset y position
                            .attr("x", 475)
                          .attr("text-anchor", "middle") // set anchor x justification
                            .attr("y", (yPos*45)+25)
                            .text(easing[yPos]);
    };

    circleTransition("elastic",1);
    circleTransition("bounce",1);
    circleTransition("linear",2);
    circleTransition("sine",3);
    circleTransition("quadratic",4);
    circleTransition("cubic",5);
    circleTransition("polynomial",6);
    circleTransition("circle",7);
    circleTransition("exponential",8);
    circleTransition("back",9);

}

easeExamples("ease");