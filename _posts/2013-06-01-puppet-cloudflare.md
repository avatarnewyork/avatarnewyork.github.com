---
layout: post
title: "Cloudflare Puppet Module"
description: "A puppet module for cloudflare to automate A Record creation"
author: patrick
category: Project
tags: [devops,featured]
---
{% include JB/setup %}
[Cloudflare](http://cloudflare.com) is a provider of CDN, Security, DNS and other infrastructure services.  We utilize cloudflare not only to speed things up but also to serve our DNS records.  Cloudkick, who we use to use as our monitor server until [Rackspace aquired them](http://www.rackspace.com/blog/newsarticles/rackspace-acquires-cloudkick-to-provide-powerful-server-management-tools-for-the-cloud-computing-era/), had an great feature that created DNS records on-the-fly each time a new VM was spun up.  Now that Cloudkick is no longer, we wanted to still be able to implement that same functionality but using CloudFlare.  Luckily Cloudflare provides for this feature through their [API](http://www.cloudflare.com/docs/client-api.html).  We utilize their API calls to create a new A Record in the DNS each time new instance is spun up.

## Get the Module
* https://github.com/avatarnewyork/puppet-cloudflare

## Module Installation

* Add the 'cloudflare' folder into your module path
* Include the class and configure the relevant variables for your CloudFlare account:
* __email__ - your cloudflare email
* __tkn__ - found under Your Account > API key: https://www.cloudflare.com/my-account
* __domain__ - the domain for which your managing

### EXAMPLE

```ruby
class { 'cloudflare':
email => 'xxxxx@xxxxxxx.com',
tkn  => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
domain  => 'www.yourdomain.com',
}
```

### Add a DNS Record

```ruby
class{'cloudflare::dns':
rec_type => "A",
recname => "$hostname",
}
```
