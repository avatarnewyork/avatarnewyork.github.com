---
layout: post
title: "Puppet Rackspace CloudBackup"
description: "A puppet module for Rackspace Cloud Backups"
author: patrick
category: Project
tags: [devops,featured]
---
{% include JB/setup %}
[Rackspace Cloud Backups](http://www.rackspace.com/cloud/backup/) is part of Rackspace's public cloud offering and allows you to backup your server file systems (rather than a VM image).  You can configure individual backups through Rackspace's control panel.  In order to utilize it, you need to install their backup agent on your VM.  puppet-cloudbackup is a puppet module that will automatically install the [Rackspace Cloud Backup Agent](http://www.rackspace.com/knowledge_center/article/rackspace-cloud-backup-install-the-agent).  See more info here: [Rackspace Cloud Backups](http://www.rackspace.com/cloud/backup/).

## Module Installation

* Add the 'cloudbackup' folder into your module path
* Include the class and configure the relevant variables for your Rackspace Cloud Backup account:
* __username__ - your rackspace cloud username
* __api_key__ - found under Your Account > API Access here: https://manage.rackspacecloud.com/APIAccess.do

### EXAMPLE

```ruby
class { 'cloudbackup':
username => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
api_key  => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
}
```

### Build Status
The build should satisfy the following:

* puppet-lint tests
* rspec tests defined under the rspec dir

The current status is: 

[![Build Status](https://secure.travis-ci.org/avatarnewyork/puppet-cloudbackup.png?branch=master)](http://travis-ci.org/avatarnewyork/puppet-cloudbackup)
