(function() {



	/**
	 * IsMobile
	 * @return {Boolean}
	 */
	var isMobile = (function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

	/**
	 * requestAnimFrame
	 * Request Animation Frame polyfill
	 *
	 * @param  {Function} callback
	 */
	window.requestAnimFrame = (function(callback) {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	    function(callback) {
	    window.setTimeout(callback, 1000 / 60);
	  };
	})();


/**
 * Parallax Card
 */
parallaxCardDefault = {

	debug: false,

	$el: {
		container: document.getElementById('parallax-card-container'),
		canvas: document.getElementById('parallax-card-canvas'),
	},

	options: {
		angle: 0.45
	},


	// Init
	init: function(options) {
		var _this = this;

		if ( !_this.$el.canvas || isMobile) {
			return false;
		}

		// set context
		_this.$el.context = _this.$el.canvas.getContext('2d')

		// set canvas size to container size
		_this.setCanvasSize()

		_this.update({
			$el: $( _this.$el.container ),
		})

		_this.events()
	},

	setCanvasSize: function() {
		var _this = this;

		$(_this.$el.canvas).attr('width', $(_this.$el.container).width() )
		$(_this.$el.canvas).attr('height', $(_this.$el.container).height() )
	},

	// Events
	events: function() {
		var _this = this;

		$(document).on('scroll', function() {
			_this.update()
		})

		$(window).resize(function() {
			_this.setCanvasSize()
			_this.update()
		});


		// addViewportScrollHandler({
		// 	$el: $( _this.$el.container ),
		// 	context: _this.$el.context,
		// 	state: {active: false},
		// 	offsetTop: 0.0,
		// 	offsetBot: 0.0,
		// 	intro: function(opts) {
		// 		console.log('intro', opts)
		// 	},
		// 	outro: function() {
		// 		console.log('outro', opts)
		// 	}
		// })

	},



	// Draw Overlay
	drawOverlay: function( options ) {

		var _this = this,
				c     = _this.$el.canvas,
				ctx   = _this.$el.context;

		ctx.save();
		ctx.beginPath();
		ctx.moveTo( 0, 0 )
		ctx.lineTo( __X(c, 0.60), 0 )
		ctx.lineTo( __X(c, 0.45), __Y(c, 1.0) )
		ctx.lineTo(0, __Y(c, 1.0) )
		ctx.lineTo(0, 0)
		ctx.closePath();

		ctx.fillStyle = _this.debug ? "rgba(0,0,240,0.70)" : "rgba(59,58,54,0.70)";
		ctx.fill();
		ctx.restore();

	},

	// Draw Bottom Bounding Box
	drawBottomBoundingBox: function( options ) {

		var _this = this,
				c     = _this.$el.canvas,
				ctx   = _this.$el.context;

		options = options || {};
		var distance = options.distance ? options.distance : 60;

		var angleBottom = getAngle( { x: __X(c, 0.45), y: __Y(c, 1.0) }, { x: __X(c, 0.60), y: 0 } )

		var coord = findCoordFromAngle({
			startX: __X(c, 0.45),
			startY: __Y(c, 1.0),
			angle: angleBottom,
			distance: distance
		})


		ctx.save()
		ctx.beginPath()
		ctx.moveTo( __X(c, 1.0), __Y(c, 1.0) )
		ctx.lineTo( __X(c, 0.45), __Y(c, 1.0) )
		ctx.lineTo( coord.x, coord.y )
		ctx.lineTo( __X(c, 1.0), coord.y )

		ctx.closePath()
		ctx.fillStyle = _this.debug ? "red" : "white"
		ctx.fill();
		ctx.restore()

	},

	// Draw Top Bounding Box
	drawTopBoundingBox: function ( options ) {

		var _this = this,
				c     = _this.$el.canvas,
				ctx   = _this.$el.context;

		options  = options || {};
		var distance = options.distance ? options.distance : 60;

		var angleTop = getAngle( { x: __X(c, 0.60), y: 0 }, { x: __X(c, 0.45), y: __Y(c, 1.0) } )

		var coord = findCoordFromAngle({
			startX: __X(c, 0.60),
			startY: __Y(c, 0),
			angle: angleTop,
			distance: distance
		})


		ctx.save()
		ctx.beginPath()
		ctx.moveTo( __X(c, 0.60), __Y(c, 0) )
		ctx.lineTo( coord.x, coord.y )
		ctx.lineTo( __X(c, 1.0), coord.y )
		ctx.lineTo( __X(c, 1.0), 0 )
		ctx.closePath()
		ctx.fillStyle = _this.debug ? "red" : "white"
		ctx.fill();
		ctx.restore()

	},


	update: function( options ) {

		var _this = this;

		options       = options || {};
		var $el           = options.$el ? options.$el : $( _this.$el.container );
		var offsetPercent = options.offsetPercent ? options.offsetPercent : 0;


		if ( $el.is(':in-viewport') ) {
			requestAnimFrame(function() {

				var data = getElementScrollData({ $el: $el, offsetPercent: offsetPercent, debug: _this.debug })

				// console.log(data)

				_this.clear()

				var topBoxH = Math.round(Math.max( (1-(data.scrollRatio*1.25))*60*3, 60 ));
				var botBoxH = Math.round(Math.max( ((data.scrollRatio*1.25))*60*2, 60 ));
				//
				// var topBoxH = Math.min(Math.max( ((1-data.elScrollYPercent*30)*100), 60), 200)
				// var botBoxH = Math.min(Math.max( (data.elScrollYPercent*30*100), 0), 60)

				_this.drawOverlay()
				_this.drawTopBoundingBox({ distance: topBoxH })
				_this.drawBottomBoundingBox({ distance: botBoxH })

				if ( data.elScrollYPercent > 0.50 ) {}

				// $('#canvas-bg').css('background-position', 50 +'% '+ (elScrollYPercent/3)*100 +'%')

			});
		}
	},


	clear: function() {
		var _this = this;
		_this.$el.context.clearRect(0, 0, _this.$el.context.canvas.width, _this.$el.context.canvas.height);
	}

}

parallaxCardDefault.init()



/**
 * Get Element Scroll Data
 *
 * @param  {Object} options
 * @return {Object}
 */
function getElementScrollData( options ) {

  options       = options || {};
  var $el           = options.$el ? options.$el : false;
  var debug         = options.debug ? options.debug : false;
  var offsetPercent = options.offsetPercent ? options.offsetPercent : 0;

  if ( $el ) {
    var scrollTop              = window.pageYOffset || $(window).scrollTop();
    var viewHeight             = $(window).height()
    var pageY                  = viewHeight + scrollTop;
    var offset                 = Math.round($el.height() * offsetPercent)
    var elTop                  = $el.offset().top;
    var elHeight               = $el.height()
    var elScrollYPercent       = (pageY-elTop) / elHeight
    var elScrollRatio          = Math.min(Math.max(elScrollYPercent, 0), 1)
    var pastOffset             = (pageY-elTop > offset) ? true : false;
    var elOffsetScrollY        = ((pageY-elTop) - offset) > 0 ? ((pageY-elTop) - offset) : 0;
    var elOffsetScrollYPercent = elOffsetScrollY / elHeight;
        elOffsetScrollYPercent = Math.min(Math.max(elOffsetScrollYPercent, 0), 1);
    var scrollRatio            = Math.max(Math.min( scrollTop / (((elTop + (elHeight / 2)) - (viewHeight / 2)) * 2), 1), 0);



    if ( debug ) {
      console.table({
        scrollTop: [scrollTop],
        viewHeight: [viewHeight],
        pageY: [pageY],
        elTop: [elTop],
        elHeight: [elHeight],
        offsetPercent: [offsetPercent],
        offset: [offset],
        elOffsetScrollY: [elOffsetScrollY],
        scrollRatio: [scrollRatio],
        elScrollRatio: [elScrollRatio],
        elScrollYPercent: [elScrollYPercent],
        elOffsetScrollYPercent: [elOffsetScrollYPercent],
        pastOffset: [pastOffset],
      })
    }

    return {
      scrollTop: scrollTop,
      viewHeight: viewHeight,
      pageY: pageY,
      elTop: elTop,
      elHeight: elHeight,
      elScrollYPercent: elScrollYPercent,
      elScrollRatio: elScrollRatio,
      pastOffset: pastOffset,
      elOffsetScrollY: elOffsetScrollY,
      elOffsetScrollYPercent: elOffsetScrollYPercent,
      scrollRatio: scrollRatio,
    }

  }

}



/**
 * Find Coordinates from angle
 * @param  {Object} options
 * @return {Object}
 */
function findCoordFromAngle( options ) {

  var startX   = options.startX ? options.startX : 0,
      startY   = options.startY ? options.startY : 0,
      angle    = options.angle ? options.angle : 45,
      distance = options.distance ? options.distance : 0;

  var result = {};

  result.x = Math.cos(angle * Math.PI / 180) * distance + startX;
  result.y = Math.sin(angle * Math.PI / 180) * distance + startY;

  return result;
}

/**
 * Get Angle
 * get an angle from two points [x,y]
 *
 * @param  {Object} p1
 * @param  {Object} p2
 * @return {Number}
 */
function getAngle(p1, p2) {
  var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  return angleDeg;
}

/**
 * __X
 * Get canvas X coord (pixel value) from a given percentage
 * @param  {Number} percentage
 * @return {Number}
 */
function __X(canvas, percentage) {
  percentage = percentage ? percentage : 0.0;
  return $( canvas ).width() * percentage
}

/**
 * __Y
 * Get canvas Y coord (pixel value) from a given percentage
 * @param  {Number} percentage
 * @return {Number}
 */
function __Y(canvas, percentage) {
  percentage = percentage ? percentage : 0.0;
  return $( canvas ).height() * percentage
}


})()
