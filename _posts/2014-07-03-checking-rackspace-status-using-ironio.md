---
layout: post
author: patrick
title: "Checking Rackspace Status using Iron.io"
description: "how-to use iron.io workers to check rackspace status and set it on statuspage.io components"
category: Post
tags: devops
image: "/assets/media/rackspace_statusio.png"
published: true
---
{% include JB/setup %}

![Puppet Bootstrap](/assets/media/rackspace_statusio.png)

{% excerpt %} We've recently started experimenting with [iron.io's](http://iron.io) worker service to check and [Rackspace's Status Page](http://status.rackspace.com) and set it on the [Avatar Status Page](http://status.avatarnewyork.com). {% endexcerpt %}  We wanted to provide our clients with up to date status information on our various infrastructure components.  StatusPage.io does this for amazon and several other components which we use in our infrastructure (mailgun, datadog, etc) but it was missing something crucial.  Rackspace!  So we rolled our own.

## Ingredients

* [StatusPage.io Account](https://manage.statuspage.io/signup)
* [Iron.io Account](http://www.iron.io/pricing#worker)
* [rackspace_statuspage.sh](https://gist.github.com/mrpatrick/cfe1991726ad32ccef51#file-rackspace_statuspageio-sh)
* [nagios-status-rackspace](https://github.com/jjasghar/nagios-status-rackspace)

## Recipe
1. We started off by using [jjasghar's nagios-status-rackspace scripts](https://github.com/jjasghar/nagios-status-rackspace) to parse the rackspace status page for the components we used in the ORD datacenter.
2. Once we had the status's for each of our components stored, we simply used the [StatusPage.io Component API](http://doers.statuspage.io/api/v1/components/) to change the status accordingly.
<script src="https://gist.github.com/mrpatrick/cfe1991726ad32ccef51.js"></script>
3. Lastly, we used the iron.io worker to upload and run our our task every 10mins (adjust according to your liking)

```bash
$ iron_worker upload hello
$ iron_worker schedule --run-every 600 rackspace_statuspage.sh
```

Check out your page.  It should match what rackspace is showing.  To see it in action, visit our status page: http://status.avatarnewyork.com

