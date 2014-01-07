---
layout: post
published: false
title: "Typophiles Rejoice! letter-spacing is finally getting fixed!"
category: Post
description: "CSS property letter-spacing is finally getting fixed!"
author: ben
tags: 
  - development
  - design
  - uxui
---

{% include JB/setup %}

## CSS property letter-spacing is getting fixed

{% excerpt %}
For a long time, there has been in issue with letter-spacing that has plagued modern web browsers build on the Webkit engine. These browsers included Safari, Chrome, and a lot of mobile based browsers. For a long time, Firefox and Internet Explorer were the only browsers who acknowledged and correctly rendered letter-spacing that wasn't in whole number pixels.
{% endexcerpt %}

### I don't get it, what's the problem?

Designers very often design in Photoshop or a similar program. They specify a font family, font size, and many other properties of the Type. The developer then translates those properties into CSS and the browser is responsible for using those CSS values. Up until this fix to letter-spacing, setting a letter-spacing: 0.5px would not have any affect in webkit browsers. If you have Safari and Firefox on your computer, you can see the different by loading [this demo page](http://instantdreams.net/static/letter_spacing.html) to see varying fractional letter spacing lines. Whole number letter-spacing changes makes a very large jump in spacing, and most designs we have worked with have had letter spacing in the 0 to 1px range. While it doesn't seem like much, it can make a large difference in readability and visual appeal. But the biggest win comes from making your designers much happier with how the final product looks! 

The [original bug report](https://bugs.webkit.org/show_bug.cgi?id=20606) was filed in 2008 and very little was done to fix the issue. Now that Google has created Blink, a fork of Webkit, they have fixed this issue and distributed the fix to Google browsers such as Chrome, and it is a merge candidate to be brought back into Webkit. Hopefully this happens and is pushed out as a Safari update soon!

