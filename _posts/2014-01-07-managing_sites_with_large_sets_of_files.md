---
layout: post
author: jonathan 
title: "Managing large sets of files"
description: "How to avoid exceeding file system limits when dealing with a large number of files"
category: Post
tags: 
 - development
 - linux
 - errors
image: "/assets/media/folder.png"
published: true
---
{% include JB/setup %}

![Large Sets of Files](//workshop.avatarnewyork.com/assets/media/folder.png)


{% excerpt %}
If you have ever managed a website that relies heavily on a large number of uploaded files, you might have come across the dreaded “Too Many Links” error.  Those of you who have never encountered the error, beware!  
{% endexcerpt %}

As it turns out, there is a limit to the number of files and folders that can be placed in a single folder.  That limit varies based on the the file system being used, but in the case of [Ext3](http://en.wikipedia.org/wiki/Ext3), a folder can only have at most [31998 subdirectories](http://en.wikipedia.org/wiki/Ext3#Functionality) .  Once that limit is reached, a [mkdir](http://us3.php.net/mkdir) command will return the “Too Many Links” error and will refuse to create any new folders.  

31998 subdirectories may seem like a lot at first, but it can be easy to exhaust on any large scale website.  Take, for example an e-commerce site that has a folder for each product’s set of images, or a social networking site where each user gets its own folder for image uploads. In a relatively short amount of time you will find yourself searching [serverfault.com](http://www.serverfault.com) for answers.  

So how do sites get around this limitation of not having enough folders?  Make MORE FOLDERS! 

No, really.  The most common solution to this problem is to nest the folders in other folders based on the final file/folder name.  For example, if you had a folder structure:

```
/images/products/ABCProduct/
/images/products/XYZProduct/
/images/products/123Product/
..etc
```

you could change it to: 

```
/images/products/AB/CP/ABCProduct/
/images/products/XY/ZP/XYZProduct/
/images/products/12/3P/123Product/
..etc
```

By hashing the folders based on the first few letters of the final folder, it should give a decent distribution and will be easy for your sites code to determine the full path needed.  Use your best judgement here - If your folders all start with the same 4 characters you probably will need to come up with a slightly different scheme.   Some sites might be better off hashing the folder name to ensure even distribution. I prefer to base it off of the file name for the sake of simplicity, even if the distribution isn’t perfect.  

The best time to implement the subfolder scheme is when you are first building your site.  However, if you are seeing the “Too Many Links” error, you are probably already in trouble.   Don’t worry though - Its not to late to fix things.  It just takes a bit of [bash scripting](http://en.wikipedia.org/wiki/Bash_%28Unix_shell%29) to get things reorganized.  

Below is a script I used to reorganize product images for a specific site.  The script probably won’t work for you exactly as-is, but it would be a good starting point for your own script.  If you need to brush up on your bash, here is a good [intro to bash programming](http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html)    

```bash
#!/bin/bash

#make sure a source parameter is given
if [ -z "$1" ]; then
	echo "missing source param"
    exit
fi

#make sure a destination parameter is given
if [ -z "$2" ]; then
	echo "missing destination param"
	exit
fi

#keep track of how much work we have to do
total=$(find $1 -maxdepth 1 | wc -l)
let total=total-1;
loop=0;

for file in `ls $1 -1` ; do
	dest_folder=${file:0:2} #grab the first 2 letters
    dest_folder2=${file:2:2} #grab the next 2 letters
    echo $file; #output just so we can see
    
    #make the final path needed
    mkdir -p $2/$dest_folder/$dest_folder2;
    
    #Copy the file over - i chose to copy instead of mv
    cp -a $1/$file $2/$dest_folder/$dest_folder2/$file;
    
    #update progress    
    let loop=loop+1;
    #output our progress
    echo "$loop / $total";
done

```


Once you get your physical files and folders relocated, all that is left to do is update your sites code to make use of the new folder structure.  This may be easy or difficult depending on your site.  I would also recommend writing some [mod_rewrite](http://httpd.apache.org/docs/current/mod/mod_rewrite.html) rules so that any old external links get properly redirected to the new folder structure. 

Good luck, and keep file system limits in mind when planning your next sites file management! 

