---
layout: post
author: patrick
title: "Get around Sender Address Verification when using Postfix with Mailgun"
description: "how-to get around sender address verification when using postfix with mailgun"
category: Post
tags:
  - devops
image: "/assets/media/mail_gun_gun.png"
published: true  
---
{% include JB/setup %}

![MailGun Postfix](/assets/media/mail_gun_gun.png)

We use [Postfix](http://www.postfix.org/) with [Mailgun](http://mailgun.com) as our  relay host.  We came accross an issue the other day where mail that was being sent and received by the same domain was bouncing.  Below is what happened and how we fixed it.

### The Issue
Mail being sent and received by the website domain was being rejected.  Looking at the mailgun logs we noticed we the messages were bouncing with an error code 553 (take a look at: http://www.inmotionhosting.com/support/email/email-troubleshooting/email-error-553 for similar error messages).  To compound the issue, everytime it bounched, the receiver was flagged in the `Bounches`.

### What's Happening?
The mail server on the recieving end is reporting that it doesn't have any knowlege of the user sending the email.

### The Solution
There are several options:

1. Turn off sender address verification.
2. Add "x-mailgun-native-send: true" to the header of your message to turn off sender address rewriting.
3. Send from a subdomain of "kernow-oils.co.uk"... Perhaps "smtp.kernow-oils.co.uk".(Warning, all outbound emails will display as "@smtp.kernow-oils.co.uk". Change the 4. MX records to point to Mailgun instead. (Warning, don't do this unless you have a route setup to route back to the internal server.)
5. Change the DKIM record to mailgun.org instead of the custom DKIM record. (Warning, doing so may result in you seeing "sent via mailgun.org")

Because we didn't have access to their mail host, we decided to go with option 2.  We modified our postfix (in main.cf) to use header_checks (more info here: http://www.postfix.org/header_checks.5.html).  The goal is to insert the x-mailgun-native-send header with every message.  Here is how

1. edit and append the following to: `/etc/postfix/header_checks`

```
# Prepends header to ALL outgoing email with a From address
/^From:/ PREPEND x-mailgun-native-send: true
```
2. edit your `/etc/postfix/main.cf` to include:

```
# The header_checks parameter specifies an optional table with patterns
# that each logical message header is matched against, including
# headers that span multiple physical lines.
#
# By default, these patterns also apply to MIME headers and to the
# headers of attached messages. With older Postfix versions, MIME and
# attached message headers were treated as body text.
#
# For details, see "man header_checks".
#
header_checks = regexp:/etc/postfix/header_checks
```
3. Restart postfix

4. Remember to remove any addresses that were listed under the `bounces` tab in your mailgun control panel.

5. Try resending an email (below is an example in using the mail program):

`mail -s "Test Message"  receiver@domain.com -- -f sender@domain.com`

That should do it!  If your still have problems, you may want to try one of the other options listed above.




