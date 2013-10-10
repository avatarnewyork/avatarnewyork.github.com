---
layout: post
author: patrick
title: "AddThis Social Tracking in Google Analytics"
description: "How To add addthis social tracking in google analytics."
category: Post
tags: 
  - development
image: "/assets/media/addthis_social_tracking.png"
published: true
---
{% include JB/setup %}

If your using [AddThis](http://addthis.com) for social share tracking, you can easily enable Google analytics social engagement tracking by adding the following code to the existing [AddThis Javascript Code](http://support.addthis.com/customer/portal/articles/381263-addthis-sharing-button-api#.UlQmXWRAQiU)

{% gist 6886495 %}

One important note, As of this date (10/08/13), AddThis doesn't fully support [Google's Universal Analytics](https://support.google.com/analytics/answer/2790010?hl=en), so the "share" event itself doesn't quite yet work.

### More Info
* [AddThis Google Analytics Integration](http://support.addthis.com/customer/portal/articles/381260-google-analytics-integration#social)
* [Google Analytics Social Interactions](https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingSocial)
* [Universal Analytics Social Interactions](https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions)

