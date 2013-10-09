---
layout: post
title: DataDog SSL Expires Check
author: patrick
description: SSL Expires Check is a DataDog Monitor plugin written in python that tracks days remaining until an SSL certificate expires
category: Project
tags: 
  - devops
image: /assets/media/datadog_ssl_expires_in_graph.png
published: true
---

{% include JB/setup %}

We created the [ssl_check_expire_days.py](https://gist.github.com/mrpatrick/6829734 "SSL Check Expire Days DataDog Plugin") plugin for the [DataDog Monitoring Service](http://datadoghq.com "DataDog Monitoring") which we use as one of our many monitoring platforms.  This plugin allows you to pass it multiple SSL certificates installed on a server and keep tabs on how many days left until it is set to expire.

![Datadog SSL Expires Graph](/assets/media/datadog_ssl_expires_in_graph.png)
> The Graph above shows what happens when we installed an updated certificate.

![DataDog SSL Expires Notification Setup](/assets/media/datadog_ssl_expires_alert.png)
> The Graph above shows how to setup alert notifications in DataDog 45 days in advance of an SSL Cert expiring

### The Plugin

{% gist 6829734 %}

### To use this plugin

1. copy the [ssl_check_expire_days.py](https://gist.github.com/mrpatrick/6829734#file-ssl_check_expire_days-py "SSL Check Expire Days Plugin Gist") plugin to your datadog `checks.d` folder, ussually under: `/usr/share/datadog/agent/checks.d/`

2. Edit the [configuration yaml file](https://gist.github.com/mrpatrick/6829734#file-ssl_check_expire_days-yaml "SSL Check Expire Days YAML Gist") and store under your dd-agent config dir, ussually under: `/etc/dd-agent/conf.d/`

### Puppet DataDog Agent Plugin
If your using [Puppet](http://www.puppetlabs.com "Puppet Labs") and the [Puppet DataDog Agent](https://github.com/DataDog/puppet-datadog-agent "Puppet Datadog Agent"), then you may want to consider forking our version of the [puppet-datadog-agent module](https://github.com/avatarnewyork/puppet-datadog-agent "Avatar's Puppet Datadog Agent Module").  It will dynamiclly install on servers tagged with `https` and insert checks for the associatedDomain website certs.


