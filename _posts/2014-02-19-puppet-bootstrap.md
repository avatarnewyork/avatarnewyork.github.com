---
layout: post
author: patrick
title: "Puppet Bootstrap"
description: "Portable push-button bash script that installs puppet and connects to a puppet master server"
category: Project
tags: devops
image: "/assets/media/puppet_bootstrap.png"
published: true
---
{% include JB/setup %}

![Puppet Bootstrap](/assets/media/puppet_bootstrap.png)

{% excerpt %} [puppet-bootstrap](https://github.com/avatarnewyork/puppet-bootstrap) is a portable push-button bash script that installs puppet and connects to a puppet master server {% endexcerpt %}.  It currently supports both __i386__ and __x86_64__ architectures as well as the following Operating systems:

* RHEL/CentOS 5.8-6.x
* Fedora 18,19,20
* Debian 6,7
* Ubuntu 10.04 (Lucid), 12.04 (Precise), 12.10 (Quantal), 13.04 (Raring), 13.10 (Saucy)

## Quick Start

On a new system, login as root and run the following replacing PUPPET_MASTER_IP with the IP address of your puppet master:

```bash
[root@puppetclient ~]# wget https://raw.github.com/avatarnewyork/puppet-bootstrap/master/puppet-bootstrap.sh
[root@puppetclient ~]# ./puppet-bootstrap.sh PUPPET_MASTER_IP
```

On the puppet master, sign the cert request and puppet will finish running on the new client _*(see: http://docs.puppetlabs.com/references/3.3.1/man/cert.html)*_

## Usage

puppet-bootstrap.sh takes the following parameters in order:

* PUPPET_MASTER_IP (required) - the IP address of your puppet master
* PUPPET_ENVIRONMENT (optional) - the environment to use (defaults to production which is puppet's default)
* CUSTOM_SCRIPT (optional) - a custom script to execute imediately before starting puppet agent

### Example Usage

```bash
[root@puppetclient ~]# ./puppet-bootstrap.sh 10.2.0.1 production createswap.sh
```

## compute-deploy Plugin

This script can be used as a compute-deploy plugin, allowing you to spin up a new box and bootstrap it with puppet.  More information on this project can be found here: https://github.com/avatarnewyork/compute-deploy

## Contributing

Contributers wanted!  Help make this script ubiquitous to all puppet supported platforms.  Make all pull requests to the remote [dev branch](https://github.com/avatarnewyork/puppet-bootstrap/tree/dev).  More information and project source code can be found on Github here: https://github.com/avatarnewyork/puppet-bootstrap

## References

* [Puppet Install](http://docs.puppetlabs.com/guides/installation.html)
* [Puppet Labs Repos](http://docs.puppetlabs.com/guides/puppetlabs_package_repositories.html)
* [Puppet Cert Man Page](http://docs.puppetlabs.com/references/3.3.1/man/cert.html)
* [Puppet Install with Apache Libcloud](http://puppetlabs.com/blog/bootstrap-rackspace-cloud-servers-puppet-and-libcloud)
