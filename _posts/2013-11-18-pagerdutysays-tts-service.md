---
layout: post
author: patrick
title: "PagerDutySays TTS Service"
description: "PagerDutySays is a PHP Text-to-speech Service Endpoint for PagerDuty webhooks."
category: Project
tags: 
  - featured
  - development
image: "/assets/media/pagerdutysays_header.png"
published: true
---
{% include JB/setup %}
![PagerDutySays](/assets/media/pagerdutysays_header.png)
{% excerpt %}PagerDutySays is a PHP Text-To-Speech (TTS) service endpoint for Pager Duty Webhooks. {% endexcerpt %} PagerDuty is a great service for notifying who's on call.  The only problem for us was, if your not on call, you don't get not notified.  I'd only know if something was wrong when I randomly checked [DataDog](http://www.datadoghq.com) or someone shot me an email.  

This is where [Pager Duty Webhooks](http://blog.pagerduty.com/2013/08/pagerduty-webhooks-hipchat/) come in handy.  A webhook will be triggered upon any interesting event that occurs within a service.  You can set a webhook for individual services which is great if you only want to be notified when say [Pingdom](http://www.pingdom.com) sends an alert out..

Rather than your traditional email or text message, we wanted a verbal notification of what happened.  Since I have a mac and a couple airport expresses throughout the office, I thought why not build a text-to-speech endpoint that will **_say_** what happened.  Enter [PagerDutySays](https://github.com/avatarnewyork/pagerdutysays), a PHP-based text-to-speach notification endpoint that runs almost out-of-the-box on Mac OSX.  It executes the built-in OSX program `/usr/bin/say` and "says" the notifications summary status for a triggered alert out loud through your speakers or through [AirPlay](http://www.apple.com/airplay/)!  So for example, if I set a webhook for the pingdom service and a website goes down, my computer speaks to me out loud: **_"DOWN alert: testing (www.testing.com) is DOWN"_**. 

### Audio Sample
{% embedly  https://soundcloud.com/patrick-tully-3/pagerdutysays-audio-example %}

### Requires 
* Mac OS 10.8.5, 10.9 
* PHP 5.3+ (comes with mac osx) 
* say (Speech Synthesis Manager - comes with mac osx)
* Apache 2.x (optional)
* PagerDuty Account with appropriate privledges
  
### Installation for Mac OSX 10.9
1. setup your webserver and ensure you can receive requests: http://brianflove.com/2013/10/23/os-x-mavericks-and-apache/
2. clone `git@github.com:avatarnewyork/pagerdutysays.git` into your webroot
3. make sure pagerdutysays directory has proper permissions (you can verify this by making a request to index.php.  If successful, you should see a `200` status in your access log)
4. Login to [PagerDuty](http://www.pagerduty.com)
5. Goto Services and click on the service you wish to be notified on
6. Click `Add a webhook` button
7. Type in the name 'pagerdutysays' and enter the URL or IP of your webserver followed by `/pagerdutysays/index.php`.  _(for example: http://mymac.mydomain.com/pagerdutysays/index.php)_
8. Bump up the volume!

### Enable AirPlay
If you want to enable AirPlay, just edit the index.php file like below:

{% gist 7548713 %}

### Use RunScope for testing
If you don't have a Domain Name or static IP or the ability to change your firewall settings, you can use [Runscope's Passageway](https://www.runscope.com/docs/passageway) service to temporarily get around it.  It allows you to use a public URL provided by Runscope to pipe the web request to your local development environment by using some magical python code. 

### Caveats
**There is NO built-in security**.  This script is highly insecure as it executes the `say` program on your Mac, please treat it as such.  It's highly recommended you ensure you have setup proper restrictions and firewall settings on your server.  Ensure only pagerduty has access to this URL after you have verified it works.

### Contributing
If you wish to contribute to this project, please be sure to checkout the `development` branch.  We will only accept pull requests made in this branch.

### References 
* GitHub Projet: https://github.com/avatarnewyork/pagerdutysays
* PagerDuty Webhook API: http://developer.pagerduty.com/documentation/rest/webhooks
* Setup Apache / PHP on OSX Mavericks: http://brianflove.com/2013/10/23/os-x-mavericks-and-apache/
* Runscope for testing webhooks: https://www.runscope.com/
* Avatar New York Workshop: http://workshop.avatarnewyork.com

### Licence
[MIT](https://github.com/avatarnewyork/pagerdutysays/blob/master/LICENSE)

### Build Status
[![PagerDutySays build status](https://api.travis-ci.org/avatarnewyork/pagerdutysays.png)](https://travis-ci.org/avatarnewyork/pagerdutysays)
