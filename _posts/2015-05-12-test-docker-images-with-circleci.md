---
layout: post
author: patrick
title: "Test Docker Images with circleci"
description: "how-to test and deploy your docker images with RSpec and circleci"
category: Post
tags: 
  - devops
image: "/assets/media/docker_ci.png"
published: true
---
{% include JB/setup %}

![Docker CI](/assets/media/docker_ci.png)

This article describes {% excerpt %} how-to use [RSpec](http://rspec.info/) and [circleci](http://circleci.com) for continuous integration, testing, and deployment of your docker image {% endexcerpt %}.  

### Background
We use [dockerenv-apache](https://registry.hub.docker.com/u/avatarnewyork/dockerenv-apache/) for all our [web development](http://avatarnewyork.com/company/website-design-development) work.  It supports lots of development tools needed by our developers including several versions of PHP.  There are some differences, however, in how the the supporting software is installed and configured based on the specific PHP version.  This lead to issues where some libraries or modules were missed or not configured on other versions of php.  Example: xdebug module worked fine on php55 but wasn't loaded on php53.  There was no real easy way to test this other than build, spin up the container and manually test the new feature that was added.  And of course, that leaves out any regression testing.  The result?  Developer frustration and wasted time.  We needed a testing solution...

### Docker Image Testing Solution
Rspec + serverspec + docker-api

#### Requirements
* docker 1.5 (maybe other versions work?)
* ruby 2+
* rubygems and the following gems:
  * rspec
  * serverspec
  * specinfra v2.12.7
  * docker-api (although the name required in the spec is actually docker... weird)
  * rake
  * yarjuf - only if you want junit reports back
  * coveralls - only if you want to integrate with coveralls

#### The Setup

[/Dockerfile](github.com/avatarnewyork/dockerenv_apache/blob/master/) - Our dockerenv-apache Dockerfile we're testing against

`.rspec` - rspec config
<script src="http://gist-it.appspot.com/github.com/avatarnewyork/dockerenv_apache/blob/master/.rspec"></script>

`/Gemfile` - gem requirements 
<script src="http://gist-it.appspot.com/github.com/avatarnewyork/dockerenv_apache/blob/master/Gemfile"></script>

 `/Rakefile` - task runner
<script src="http://gist-it.appspot.com/github.com/avatarnewyork/dockerenv_apache/blob/master/Rakefile"></script>

`/spec/spec_helper.rb` - load in requirements
<script src="http://gist-it.appspot.com/github.com/avatarnewyork/dockerenv_apache/blob/master/spec/spec_helper.rb"></script>

`/spec/localhost/Dockerfile_spec.rb` - Your tests.  This is where the magic happens
<script src="http://gist-it.appspot.com/github.com/avatarnewyork/dockerenv_apache/blob/master/spec/localhost/Dockerfile_spec.rb"></script>

#### Run test

Simply run `rake spec` from the project root

#### Results

https://circle-artifacts.com/gh/avatarnewyork/dockerenv_apache/44/artifacts/0/tmp/circle-junit.04FU2wx/junit/results.xml

#### What's going on here?

All the magic happens at the top of the spec file:
<script src="http://gist-it.appspot.com/github.com/avatarnewyork/dockerenv_apache/blob/master/spec/localhost/Dockerfile_spec.rb?slice=2:20"></script>

> `require "serverspec"`

gives us the ability to RSpec tests for checking server configurations

> `require "docker"`

let's us access docker from our spec

> `image = Docker::Image.build_from_dir('.')`

builds the image to let us run our tests agains

> `set :backend, :docker`

sets serverspec backend to use docker (there are many backends you could use such as ssh, exec, etc)

> `set :docker_image, image.id`

sets the image that we just built to use for the tests

For more information on the test syntax, head over to [serverspec.org's resource types](http://serverspec.org/resource_types.html)

### Taking it one step further

#### Continuous Integration testing with CircleCI

We now have a way to test our server image.  The next step is to automate this so we can run these tests every time we commit a change.  CircleCI allows us to build and use custom docker containers.  Great!  But there are 2 gotchas.

1. They use LXC which [doesn't support for the docker exec command](https://circleci.com/docs/docker#docker-exec).  The work-around is to use `gem 'specinfra', '2.12.7'` specific version in your Gemfile.  The newer versions run faster (since it uses docker exec rather than spinning up multiple containers) but will break on CircleCI.

2. They use the btrfs and don't support `docker rm`.  You'll get the following error `Failed to destroy btrfs snapshot: operation not permitted`.  The workaround is to add the following lines at the top of your spec test file
<script src="http://gist-it.appspot.com/github.com/avatarnewyork/dockerenv_apache/blob/master/spec/localhost/Dockerfile_spec.rb?slice=5:11"></script>

Here is our circle.yml file:
<script src="http://gist-it.appspot.com/github.com/avatarnewyork/dockerenv_apache/blob/master/circle.yml"></script>

### Extra Credit

#### Add Coveralls Support
For fun, we added [https://coveralls.io](Coveralls) code coverage support to our `/spec/spec_helper.rb` file for future use.  You can see the results here:

> https://coveralls.io/r/avatarnewyork/dockerenv_apache

#### Trigger a Dockerhub build
1. Uncheck "Active" on your automated build
2. [Turn on remote build trigger](https://docs.docker.com/docker-hub/builds/#remote-build-triggers) and copy the URL
3. [Create a new private env var in CircleCI](https://circleci.com/docs/environment-variables) containing the URL
4. Make the appropriate curl request in a deploy.sh script for [deployment](https://circleci.com/docs/configuration#deployment)


### References
* https://github.com/avatarnewyork/dockerenv_apache - our in-house web development image
* http://www.slideshare.net/minimum2scp/circle-ci-and-dockerserverspec - circleci docker exec work-around
* https://github.com/serverspec/specinfra/releases/tag/v2.13.0 - spec infra release where they switched to using `docker exec` (so we're using the prior release)
* https://robots.thoughtbot.com/tdd-your-dockerfiles-with-rspec-and-serverspec - inspiration for project and circleci integration
* https://github.com/swipely/docker-api - docker-api gem
* http://serverspec.org/ - serverspec gem
* https://github.com/natritmeyer/yarjuf - junit formatter gem



