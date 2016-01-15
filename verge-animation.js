http://jsfiddle.net/ngkc9h2j/6/

var paper = new Raphael('canvas', 600, 600),
    pathString = 'M300,200l154,86v172l-154,86l-154,-86v-172l154,-86z',
    testLineDrawNative = function () {
        var shape = paper.path(pathString).attr({
            stroke: '#ffffff',
            'stroke-width': 5,
            'stroke-linecap': 'square',
            'stroke-linejoin': 'bevel'
        }),
        length = shape.getTotalLength();
        
        $('path[fill*="none"]').animate({
            to: 1
        }, {
            duration: 2000,
            step: function (pos, fx) {
                console.log(fx.pos);
                var offset, subpath;
                offset = length * fx.pos;
                subpath = shape.getSubpath(0, offset);
                paper.clear();
                paper.path(subpath).attr({
                    stroke: "#fff",
                    'stroke-width': 5,
                    'stroke-linecap': 'square',
                    'stroke-linejoin': 'bevel'
                    
                });
            }
        })
  
        
    },
    
    
    
    testLineDrawGSAP = function () {
        var shape = paper.path(pathString).attr({
            stroke: '#ffffff'
        }),
            pathLength = shape.getTotalLength(),
            drawLine = function () {
                console.log('shape.length', shape.length);
                var offset, subpath;
                offset = pathLength * (shape.length / pathLength)
                subpath = shape.getSubpath(0, offset);
                paper.clear();
                paper.path(subpath).attr({
                    stroke: "#ffffff",
                    'stroke-width': 5,
                    'stroke-linecap': 'square',
                    'stroke-linejoin': 'bevel'
                });
            },
            tween = TweenMax.to(shape, 1, {
                length: pathLength,
                onUpdate: drawLine,
                ease: Linear.none,
                onUpdateScope: this
            });
        shape.length = 0;
    };
$(function () {
    $('button').click(function () {
        paper.clear();
        if ($(this).prop('id') === 'native') {
            testLineDrawNative();
        } else {
            testLineDrawGSAP();
        }
    });
});
