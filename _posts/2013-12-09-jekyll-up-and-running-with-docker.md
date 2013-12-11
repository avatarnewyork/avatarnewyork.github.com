---
layout: post
author: patrick
title: "Jekyll up and running with Docker"
description: "How-to get the Jekyll engine up and running quickly and dependency free with Docker"
category: Post
tags: 
  - devops
image: "/assets/media/docker-jekyll-container.png"
published: true
---
{% include JB/setup %}

![Docker Jekyll Container](/assets/media/docker-jekyll-container.png)

Jekyll is an [awesome static blogging platform](/project/workshop/) that runs on [Ruby](https://www.ruby-lang.org/en/).  It can be a little challenging to setup on certain platforms, though.  If you want to avoid Ruby dependency hell, you have a couple options:

1. Download, install, and maintain [RVM](http://rvm.io/) and associated gems (which can be challenging in of itself) 
2. Get [Docker](http://www.docker.io), download a [Jekyll Docker Container](https://index.docker.io/u/paintedfox/jekyll/) and forget about Ruby altogether.

### What is Docker?

> Docker is an open-source project to easily create lightweight, portable, self-sufficient containers from any application. The same container that a developer builds and tests on a laptop can run at scale, in production, on VMs, bare metal, OpenStack clusters, public clouds and more.

Interested?  Then [read the whole story](http://www.docker.io/the_whole_story/).

### Setup Jekyll using Docker

In this article, I'll show you how to {% excerpt %}Get a Jekyll site up and running in no time with Docker{% endexcerpt %}.

1.  Choose an installation and follow the instructions: http://www.docker.io/gettingstarted/#h_installation
2.  Login as `root` to your instance
3.  Download [paintedfox/jekyll](https://index.docker.io/u/paintedfox/jekyll/) container:

    ```bash
    root@docker1:~# docker pull paintedfox/jekyll
    ```

4.  Test and ensure the jekyll command is working:

    ```bash
    root@docker1:~# docker run -i -t paintedfox/jekyll server
    ```

    You should see something like the following if it worked:

    ```bash
    Configuration file: none
                 Source: /data
    			        Destination: /data/_site
    					      Generating... done.
    						    Server running... press ctrl-c to stop.
    ```

5.  Success!  `ctrl-c` to kill the process
6.  Create a directory where Jekyll should pull content from

    ```bash
	root@docker1:~# mkdir /var/jekyll
	```

7.  Download or build a Jekyll site.  Maybe try [Jekyll Bootstrap](http://jekyllbootstrap.com)?

    ```bash
	root@docker1:~# cd /var/jekyll
	root@docker1:~# git clone git@github.com:plusjade/jekyll-bootstrap.git
	```

    OR just grab the [static code dump](https://github.com/plusjade/jekyll-bootstrap/archive/master.zip) instead:

    ```bash
	root@docker1:~# cd /var/jeykll
	root@docker1:~# wget https://github.com/plusjade/jekyll-bootstrap/archive/master.zip
	root@docker1:~# unzip master.zip
	```

8.  Now we can run the container and mount our data dir (this example assumes you downloaded a static zip file in #7 above.  Replace `/var/jekyll/keykll-bootstrap-master` with your jekyll website code dir if different):
    
    ```bash
	root@docker1:~# docker run -i -t -v /var/jekyll/jekyll-bootstrap-master:/data paintedfox/jekyll server
    ```

9.  If it worked, you should see your Image ID.  Last thing we need to do before hitting the server is find out which public port Docker exposed with NAT.  Run the following command and replace `181e70ac9023826e0708748ea8abca33367bad6c6211b3e65bdf8fa3b7d13086` with your Image ID:

    ```bash
	root@docker1:~# docker port 181e70ac9023826e0708748ea8abca33367bad6c6211b3e65bdf8fa3b7d13086 4000
	0.0.0.0:49159
	```

10. **Hit It!**

    ![Docker Jekyll Bootstrap](/assets/media/docker-jeykllbootstrap.png)

### End Notes
Docker is an interesting project with an [active comunity](https://www.docker.io/community/) and support from companies like [Rackspace](http://developer.rackspace.com/blog/zero-to-peanut-butter-docker-time-in-78-seconds.html), who are recognizing the potentially huge impact this could have on the industry.  You can bet our [hosting services team](http://www.avatarnewyork.com/services/hosting) is following it closely.  Check out the [Avatar New York Docker Repo](https://index.docker.io/u/avatarnewyork/) and follow our future contributions.
