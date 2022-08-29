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

    let eases = [
                "elastic",
                "bounce",
                "linear",
                "sine",
                "quadratic",
                "cubic",
                "polynomial",
                "circle",
                "exponential",
                "back"
                ]

    var svg = d3.select("#"+selector)
                                .append("svg")
                                .attr("width", width)
                                .attr("height", height);


    function circleTransition(easement, yPos){
        let ball = 20
        let cy = (yPos*45)+25

        var timeCircle = svg
                            .append("circle")
                            .attr("fill", "steelblue")
                            .attr("r", ball)
                            .attr('cx', ball)
                            .attr('cy', ball)
        timeCircle
            .transition()
            .duration(1500)
            .ease(easement)
            .attr("transform",
                "translate(" + String(10) + ")"
            );

//            .attr('cx', 300)
//            .attr('cy', 100)


    };

    circleTransition("sine",1);

    //circleTransition("bounce",1);
    //circleTransition("linear",2);
    //circleTransition("sine",3);
    //circleTransition("quadratic",4);
    //circleTransition("cubic",5);
    //circleTransition("polynomial",6);
    //circleTransition("circle",7);
    //circleTransition("exponential",8);
    //circleTransition("back",9);

}

easeExamples("ease");