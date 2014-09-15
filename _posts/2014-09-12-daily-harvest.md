---
layout: post
author: patrick
title: "Daily Harvest"
description: "daily timesheet reports and backups with the Harvest API, Mailgun, Iron.io, and MySQL"
category: Project
tags:
  - devops
image: "/assets/media/daily_harvest.png"
published: true
---
{% include JB/setup %}

![Puppet Bootstrap](/assets/media/daily_harvest.png)

{% excerpt %} Daily Harvest is a python app that uses [Harvest's API](https://github.com/harvesthq/api), [Mailgun](http://documentation.mailgun.com/api_reference.html), and MySQL to perform daily harvest time tracking tasks {% endexcerpt %}.  [Our web design and development company](http://avatarnewyork.com/company/website-design-development) recently migrated from a custom build time tracking module in [SugarCRM](http://sugarcrm.com) to [Harvest](https://www.getharvest.com/).  Harvest is a great time tracking tool and has a lot of nice features and integration capabilities, though it lacked a few components our company needed, such as:

* daily email reports that display totals by employee, project, and a entry
* data backups - SaaS is great when it works.  And catastrophic when it fails.  We need our data backed up to our MySQL database.

Enter Daily Harvest which is available for download, forking or cloning on the [Daily Harvest Github Page](https://github.com/avatarnewyork/daily_harvest).  Currently, there are two components to Daily Harvest that address both needs mentioned above and detailed below.  You can easily automate these tools by adding them to your local cron or add them as a [scheduled task on iron.io](http://dev.iron.io/worker/scheduling/).

### harvest_email.py

#### Description:
Sends an email out to a list of receiptients with detailed timesheets as well as total hours by employee and project.

#### Requirements:

1. Harvest Account & API Token
2. Mailgun Account & API Token
3. python 2.7 with libs (available via pip)
 * python-dateutil
 * simplejson
 * requests

#### Install & Setup

1. `git clone git@github.com:avatarnewyork/daily_harvest.git`
2. `cd daily_harvest`
3. copy and edit the following example files to the corresponding JSON files:
 * harvest.json - Harvest API settings
 * mailgun.json - Mailgun API settings
 * recipients.json - recipient preferences
4. run `python harvest_email.py` - this will connect to mailgun and send a time report based on the recipient list you provided.

#### Automation with iron.io worker

<script src="https://gist.github.com/mrpatrick/9efff09704138361bbed.js"></script>

### harvest_backup.py

#### Description:
Replicates the past 24 hours of punches inside a MySQL database table called "timesheet"

#### Requirements:

1. Harvest Account & API Token
2. MySQL Database with write access from your executing python client.
3. python 2.7 with libs (available via pip)
 * python-dateutil
 * simplejson
 * mysql-connector-python

#### Install & Setup

1. `git clone git@github.com:avatarnewyork/daily_harvest.git`
2. `cd daily_harvest`
3. create a new database and associated credentials
4. install the mysql schema file `harvest_backup.sql` on the database you created above.  This will create a database table called `timesheet`
5. copy and edit the following example files to the corresponding JSON files:
 * harvest.json - Harvest API settings
 * mysql.json - MySQL settings
4. run `python harvest_backup.py` - this will connect to your mysql database and insert all time entries added to harvest in the past 24 hours.

#### Automation

<script src="https://gist.github.com/mrpatrick/0594996a9237fdd34165.js"></script>


## Resources
* [Daily Harvest](https://github.com/avatarnewyork/daily_harvest) - Github Project Page
* [Harvest Python API](https://github.com/avatarnewyork/Harvest) - forked github module.  Original source and credit go to [@lann](https://github.com/lann)/[Harvest](https://github.com/lann/Harvest)
* [Harvestapp](https://www.getharvest.com/)
* [Mailgun](http://www.mailgun.com/)
* [MySQL](http://www.mysql.com/)
* [Avatar New York](http://www.avatarnewyork.com)

