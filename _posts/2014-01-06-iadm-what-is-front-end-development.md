---
layout: post
published: false
title: "IADM: What is front end development?"
category: Post
description: A basic view of front end development and the parts that make it up.
author: ben
tags: 
  - development
---

{% include JB/setup %}

{% excerpt %}
Part of the series: Inside A Developer's Mind. This article is targetted at anyone who should know a little more about how development works and what it all means.
{% endexcerpt %}

## What is front end development?

As a developer, I view website development work in 2 separate domains: the back end, and the front end. These terms we throw around in the office a lot between developers, but not everyone we discuss this difference with understands what the difference is.

### The General Explanation

Front end development generally means anything that will present data to the user in some fashion. In web development this almost always means to visually present the data to the user. The back end development generally means code written to manipulate, save and retrieve that data and get it to the front end code. There is some hybridization of front end and back end, where the web server will do some special things to the front end code before it's delivered to the web browser. But for now, we will focus on only the front end code components, or what happens in the web browser.

### The Web Browser does all the work

Front end code means giving the web browser code to run. This code is first prepared and delivered by a web server, but then it's up to the web browser to do the heavy lifting from there. But, what does "heavy lifting" mean? The browser is responsible for reading your front end code, and turning that into what to show you on the screen. The code says "here's some text" and the browser decides which pixels to light up on the monitor. "But Ben, if it's up to the browser, what don't different browsers do whatever they want and show it differently?" Great question. Firstly, different browsers do show it differently. But most web developers put in many hours to try to make that different negligible. Secondly, there are organizations that exist that try to give the browsers a standard way to do everything. They write rules that set a baseline for how things are to be displayed, and how they can be manipulated.

### The Front End Code Parts

The way I like to look at and explain front end code is in a few components: HTML, CSS, and Javascript. I say Javascript, but there are alternatives. A better way to envision it is: Data, Styling, and Changer.

#### HTML, or the Data

```html
<div>Here's some text for you. <a href="http://example.com">Even a link!</a>
```

Near the beginning of the World Wide Web, there was only HTML. It was used to do everything front end wise. It gave us style information as well as the data. Fortunately, we have advanced beyond what we call the "Geocities" days. There still are some issues with HTML driving some styling, but it is much smaller than it used to be.

In today's day, HTML more represents data. Want to see a blog article on a webpage? The body, the title, the date, all the data related to that blog is sent through the HTML. While there is some layout and styling relationship, we like to view HTML more as just data that is styled through...

#### CSS, or the Styling

```css
.header {
	font-size: 90px; /* That's big. */
    color: brightred;
    border: solid 1px blue;
}
```

CSS, which stands for Cascading Style Sheet. So we have some data via HTML, but we want to make it pretty. That's where CSS comes in! HTML says, here's the blog title. CSS says, make it bold with red text and put it 10 pixels down from the the top. CSS handles the presentation of the data. But it doesn't handle complex interactions, or manipulation of the data, or AJAX. That comes from...

#### Javascript, or the Changer

Javascript is one of a handful of scripting languages that the browser will understand. These scripting languages manipulate the data and the style and the browser to do the more complex actions. These actions include swapping out styling information, changing the HTML structure, adding new HTML, or doing browser requests without reloading the page, commonly referred to as AJAX.

How does this work though? What's the Javascript really changing? Modern browsers combine the HTML structure and data with the CSS styling data into a thing called the DOM (document object model) tree. This looks like the image below:

![Dom Tree](/assets/media/Screen%20Shot%202014-01-06%20at%2011.32.29%20PM.png)

This is showing an element on the tree and properties. The browser uses these properties to store the styling information, relationship of data, and events and much more. Javascript can alter this DOM tree to do what it needs to. Javascript also has access to browser APIs, such as the window size, the URL, and the page history.

### Wrap it up

Using the combination of HTML, CSS, and Javascript, developers instruct the browser to draw things on the screen how they want, and tell the browser what to do in certain events and under scenarios. These are the core elements to Front End Development, and  to make a beautiful, cross browser compatible, and complex site requires a very deep understanding of these components and how they interact.

### What about Flash?

Get out.
