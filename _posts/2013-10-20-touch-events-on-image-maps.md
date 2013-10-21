---
layout: post
author: jonathan 
title: "Handling Touch Events on Image Maps"
description: ""
category: Post
tags: 
 - development
 - mobile
 - responsive
image: 
published: true
---
{% include JB/setup %}

Although not common in modern websites, HTML image maps are still part of the [HTML5 specification](http://www.w3.org/TR/2011/WD-html5-20110525/the-map-element.html) and find occasional use when other methods of creating links over a single image would be too complex.  Image maps can get the job done, but if you have ever tried implementing touch events on an image linked to an image map, you might find yourself scratching your head.  

Why don't touch events work on image maps?  Unfortunately it's not clear why there is a lack of support.  Searching google doesn't even seem to yield any definitive answers.  It could be an oversight, or it could be a technical limitation of the way the events are handled.  Regardless of the reason, the problem can be very frustrating if you need to respond to a swipe event on an image map.  


The good news is that there is a simple work-around. The basic idea is to put a transparent div tag over the image, which will handle any touch or swipe event properly.  The best way to place the div tag will depend on your specific situation, but in general, an absolutely positioned div will do the trick.  Lets assume we have a basic slideshow setup:

```html
<ul class="slideshow">
	<li class="slide">
		<img usemap="slide1" src="/myimage.jpg" alt="S1" width="100" height="100" />
		<map name="slide1">
			<area shape="rec" coords="0,0,50,50" href="link1.html" />
		</map>
	</li>
	<li class="slide">...</li>
	<li class="slide">...</li>
</ul>
```

If we update our html to include an additional div that sits on top of the image map, we can bind our swipe events to the div instead of the image and they will be processed successfully.  This extra tag can be added manually though html or dynamically added with javascript.  

```html
<style>
slide-swipe{
	position:absolute;
	left:0;
	top:0;
	width:100%;
	height:100%;
}
</style>

<ul class="slideshow">
   <li class="slide">
      <img usemap="slide1" src="/myimage.jpg" alt="S1" width="100" height="100" />
      <map name="slide1">
          <area shape="rec" coords="0,0,50,50" href="link1.html" />
      </map> 
      <div id="slide1-swipe" class="slide-swipe"></div>
   </li>
   <li class="slide">...</li>
   <li class="slide">...</li>
</ul>
```

Great! Now my touch events work ... but I can't click on the image map!  Well, we can get around this with a little jQuery magic.  When a user clicks on the slide-swipe div, we can hide the div, fire a new click event at the same location, and then show the div again.  Here is the basic code:

```javascript
$(".slide-swipe").click(function(event){
        
	//hide this so our new click event will hit the image map
	$(this).hide(); 
	
	//create a new click event at the same location that will hit the map
	$(document.elementFromPoint(event.clientX,event.clientY)).trigger("click");
       
	//show this again to handle any future clicks and swipes
	$(this).show();
});
```

That should do it!
