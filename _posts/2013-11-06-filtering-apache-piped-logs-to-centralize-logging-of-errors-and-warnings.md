---
layout: post
author: patrick
title: "Filtering Apache Piped Logs to Centralize Logging of Errors and Warnings"
description: "How to grep for Apache errors and warnings with Apache piped logs for real-time centralized logging."
category: Post
tags:
 - devops
 - apache
 - logging
image: "/assets/media/apache_piped_json.png"
published: true
---
{% include JB/setup %}
![Apache Piped json logs](/assets/media/apache_piped_json.png)
{% excerpt %}
We recently upgraded to [Loggly's Gen2 service](http://www.loggly.com/docs/key-features-in-gen2/) which required us to revisit our [rsyslog](http://www.rsyslog.com/) configurations and make some adjustments.
{% endexcerpt %}
First, we wanted to start taking advantage of Loggly's ability to parse [JSON](http://json.org/) logs.  We created a new apache logging format called `jsonlog` according to [loggly's setup instructions](http://community.loggly.com/customer/portal/articles/1189777-json-best-practices-for-logging) (along with a couple extra headers we are interested in):

```ini
# JSON extended log format including: User-Agent, Referer, and X-Forwarded-For
LogFormat "{ \"time\":\"%t\", \"remoteIP\":\"%a\", \"host\":\"%V\", \"request\":\"%U\", \"query\":\"%q\", \"method\":\"%m\", \"status\":\"%>s\", \"userAgent\":\"%{User-agent}i\", \"referer\":\"%{Referer}i\", \"X-Forwarded-For\":\"%{X-Forwarded-For}i\" }" jsonlog
```

We can now setup a new CustomLog in our apache conf to use this jsonlog format as follows:

```ini
CustomLog /var/log/apache_access.json jsonlog
```

That was pretty easy but now we're sending even _more_ data to loggly and reaching the limits of our plan's allocated bandwidth.  We also aren't interested in capturing anything that is not an error or warning (we are still storing those on the server of course).  We need to find a way to reduce any unnecessary data we're shipping and only send [4xx (warn)](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes) and [5xx (error)](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_Server_Error) messages.  This is where [Apache's Piped Logging](http://httpd.apache.org/docs/2.2/programs/rotatelogs.html) comes in handy.  

In short, this feature allows you to pipe Apache log messages through an external process.  This is extremely powerful and will allow us to use a program like `grep` to pattern match for only errors and warnings, which is what we want.  Let's look at an example log entry:

```json
{ "time":"[06/Nov/2013:13:15:14 -0500]", "remoteIP":"10.173.232.21", "host":"www.mywebsite.com", "request":"/some/link/that/doesnot/exist", "query":"", "method":"GET", "status":"404", "userAgent":"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0", "referer":"-", "X-Forwarded-For":"10.121.43.23, 74.34.63.10" }
```

If we use grep's extended version and inverse the match to capture everything that is NOT a [2xx (success)](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success) or [3xx (redirect)](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection) we do something like this:

```bash
/bin/grep -E --invert-match 'status.?[[:punct:]].?[23]' 
```

So now we just need append the output to a file.  We simply pipe the output to `cat` which will append to our log file.  Here is what the final piped log looks like in our apache conf:

```bash
CustomLog "|/bin/grep -E --invert-match 'status.?[[:punct:]].?[23]' |cat >> /var/log/httpd/errors.json" jsonlog
```

So if you add this, restart apache, and then visit a webpage on your server that doesn't exist,  you should see the resulting `404` error show up as JSON in your new log file right?  Wrong.  The problem is `grep` will buffer the output (in our case up to `4096 bytes`) before it writes anything.  This is not very helpful, but if we add the `--line-buffered` to our grep command, we will get the unbuffered output.  The final configuration looks like this:

{% gist 7257377 %}

As you can see Apache's Piped Logging feature is very powerful. This is just one example of how it can also be incredibly useful.
