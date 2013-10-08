# Jekyll-Bootstrap (Workshop)

The quickest way to start and publish your Jekyll powered blog. 100% ~~NOT~~ compatible with GitHub pages!

## Usage

For all usage and documentation for Jekyll-Bootstrap, please see: <http://jekyllbootstrap.com>

### Avatar Workshop Setup

1. clone the project `avatarnewyork.github.com` on gil under `dev/workshop`
2. setup a vhost in the workshop.conf apache file and point the document root to: `project folder/_site`
3. run an apache configtest to ensure no errors
4. gracefully restart apache

### Avatar Workshop Workflow - Use Rake

1. ensure you are working under the master branch
2. goto your project directory
3. at the command prompt type: `rake post title="TITLE_OF_YOUR_POST"`.  This will setup the meta info and filename for your post located under `_posts`.
4. Open your post file: `_posts/YYYY-mm-dd-title.md` (markdown file)
5. Edit your meta information (called [Front Matter in yaml](http://jekyllrb.com/docs/frontmatter/)) and article content.  Meta information is as follows:
```yaml
---
layout: post
title: TITLE_HERE
author: YOUR_NAME
description:
category: [Project || Post]
tags: 
  - featured
  - development
published: true
---
```

Here is the breakdown:

* layout: post (always)
* title: title of your post
* author: your first name
* description: brief description of article
* category: Can be either `Project` or `Post` (case sensitive)
* tags: in yaml format - if this project should be featured, add `featured` to the tag
* published: should be true

6. To test your post, goto your project dir and run: `jekyll build`.  This will rebuild the site and store under _site
7. Test your post by going to the URL
8. When ready to publish, commit and push to the master branch.  Your post will appear in a few minutes.

### Avatar Workshop Workflow - Use http://prose.io

1. Login to `http://prose.io`
2. Goto the `avatarnewyork` account
3. Click on `avatarnewyork.github.com`
4. Click on the `NEW FILE` BUTTON
5. Click on the Meta-Data button on the right and edit appropriately (see above)
6. Click back on the Edit button and edit content appropriately
7. When done, press `Save` and enter commit message.  Your post should appear in a few minutes


## Version

0.3.0 - stable and versioned using [semantic versioning](http://semver.org/).

**NOTE:** 0.3.0 introduces a new theme which is not backwards compatible in the sense it won't _look_ like the old version.
However, the actual API has not changed at all.
You might want to run 0.3.0 in a branch to make sure you are ok with the theme design changes.

## Contributing 

This repository tracks 2 projects:

- **Jekyll-Bootstrap Framework.**  
  The framework for which users should clone and build their blog on top of is available in the master branch.
  
  To contribute to the framework please make sure to checkout your branch based on `jb-development`!!
  This is very important as it allows me to accept your pull request without having to publish a public version release.
  
  Small, atomic Features, bugs, etc.   
  Use the `jb-development` branch but note it will likely change fast as pull requests are accepted.   
  Please rebase as often as possible when working.   
  Work on small, atomic features/bugs to avoid upstream commits affecting/breaking your development work.
  
  For Big Features or major API extensions/edits:   
  This is the one case where I'll accept pull-requests based off the master branch.
  This allows you to work in isolation but it means I'll have to manually merge your work into the next public release.
  Translation : it might take a bit longer so please be patient! (but sincerely thank you).
 
- **Jekyll-Bootstrap Documentation Website.**    
  The documentation website at <http://jekyllbootstrap.com> is maintained in the gh-pages branch.
  Please fork and contribute documentation additions to this branch only.

The master and gh-pages branch do not share the same ancestry. Please treat them as completely separate git repositories!


## License

[MIT](http://opensource.org/licenses/MIT)
