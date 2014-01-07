---
layout: post
published: true
title: PHP Apache Authorization Header missing
category: Post
description: null
author: ben
tags: 
  - development
---

{% include JB/setup %}

## Hey PHP, where's the Authorization header?

{% excerpt %}
PHP + Apache seems to have an issue with custom formats of the Authorization HTTP Header. But there's multiple ways to fix the problem.
{% endexcerpt %}

### API and Headers

HTTP headers are a handy place to send data to an API without having to muddle up your request body with metadata. A major use for them is to include API credentials. When building your API and using HTTP headers as your vehicle for authorization data, you can customize the format, as HTTP headers are essentially just key/value items. It's up to the consumer of the API to make sure the format of that key/value is what you told them it should be. Many protocols, such as OAuth, specify a custom format for the Authorization header to verify the user is who they say they are, and that the data they are sending you is really what they wanted to send you.

### That's great, but PHP isn't giving me the Authorization header in $_SERVER

There is an issue with PHP on apache, where if the format of the Authorization header is not in a format Apache likes, it will not pass that information over to the PHP $_SERVER array. With an Authorization header of something like HTTP Basic Digest format, you'll see the information in $_SERVER['HTTP_AUTHORIZATION'], in a friendly format. But if you pass something like below for the request header, Apache will by no pass it along:

```http
POST http://www.example.org/api.php HTTP/1.0
Host: 127.0.0.1:80
Content-Length: 757
Authorization: OAuth realm="",
  oauth_version="1.0",
  oauth_nonce="some nonce",
  oauth_timestamp="1313350943",
  oauth_consumer_key="a consumer key",
  oauth_body_hash="somebodyhashbase64encoded",
  oauth_signature_method="HMAC-SHA1",
  oauth_signature="someoauthsig"
Content-type: application/xml
```

### The Fix

So if you have this problem, and are using Apache + PHP, there's a few ways to fix this: 

- calling apache_request_headers(), which gets raw headers and you can handle it manually
- this rewrite code in .htaccess to get it to be in $_SERVER.

```apacheconf
    RewriteEngine On
    RewriteCond %{HTTP:Authorization} ^(.*)
    RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```  

Either fix will work depending on your needs.
