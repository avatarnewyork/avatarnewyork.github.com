---
layout: post
author: patrick
title: "Embed Gist Tag in Jekyll"
description: "Jekyll Gist Tag"
category: Post
tags: [development]
---
{% include JB/setup %}

Markdown is awsome but it's annoying how you can't include embed tags, especially gists.  Well you can actually, you just need to include a custom plugin and use the custom gist tag.  Here is how:

1. Download and add this [gist_tag.rb](https://gist.github.com/imathis/1027674) to your _plugins dir
2. Now in your markdown, you just need to include the costom tag to embed a gist like:
{% raw %}

{% gist 6706249 %}

{% endraw %}
If you experience any issues, you might want to ensure your using [Redcarpet](https://github.com/vmg/redcarpet) as your markdown engine:

1. Install the redcarpet gem:
`$ [sudo] gem install redcarpet`
2. Configure Jekyll to use redcarpet with extensions - edit _config.yml

{% gist 6706249 %}
