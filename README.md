# Coronavirus: UK government funding support tool

In order to help our customers find financial support for their businesses during the Covid-19 pandemic, we have built an assessment tool that allows them to answer a series of questions to discover available options in their local jurisdiction.

As both legislation and the forms of financial support available are changing rapidly, the support tool is designed in a way that allows for people with no engineering experience to maintain the assessment via CSV files. The guidance pages that a user is presented with at the end of the assessment are all based upon a simple template that is quick and easy to replicate.

## Development

### Getting started

#### Forking the repo
As this tool was initially created to support the UK, you will need to maintain a separate copy for your own region/country. Where possible, we recommend [forking] this repo as this will allow you to pull any future changes into your version.

Access to this repo should be requested from Michael Wanless (michael.wanless@sage.com).

#### Running the tool locally

The tool is a static, multi-page site using Bootstrap 4 and jQuery. As there are no local dependencies, you can use your preferred method of serving local content. An easy way to do this is with the npm module `serve`:

```bash
npm i -g serve
cd /path/to/repo
serve
```
#### Removing UK-specific content
Remove all of the content pages within `\guidance` except for `template.html`. `template.html` contains a basic layout that presents the main content in a large card, and other relevant information in smaller cards to the right. The design of this template has already been approved by UX and should need no changes other than copy text.

You will eventually replace the files in `\static\data` with data that drives the assessment flow for your own content. However, we recommend treating the initial files as examples until you are familiar with how the tool works. The process for creating new versions of these files will be shared by Gavin Langlands (gavin.langlands@sage.com). 

#### Analytics

Update all references to Google Analytics to use your own GA account ID. This is relevant for all HTML pages throughout the tool.

Example: the ID `UA-52433542-3` should be replaced with the ID of an account that works for the domain where you will host your copy of the tool.

```javascript
ga('create', 'UA-52433542-3', 'auto');
```

We use two types of analytics in the tool: simple pageviews and custom events.

The easiest way to send a pageview is to just queue the `pageview` event:

```javascript
ga('send', 'pageview');
```

If you need to override the page path or title, set those properties first:

```javascript
ga('set', {
    page: '/coronavirus-funding/index.html', 
    title: 'Coronavirus: UK Government Funding Tool - landing page' 
});
ga('send', 'pageview');
```

To report on the answers a user has submitted, we send a custom event:

```javascript
ga('send', {
    hitType: 'event',
    eventCategory: category, // e.g. 'CoronavirusFunding'
    eventAction: action, // e.g. 'SelectAnswer
    eventLabel: label, // e.g. '4a'
    hitCallback: invokeCallback
});
```

If you will be sending analytics for multiple regions to the same Analytics account, consider adding a country code suffix to the event category to be able to report on them separately (i.e. 'CoronavirusFundingCAN').

Specifying a callback allows us to wait for the event to be sent successfully before continuing with our application logic. Important: if not properly implemented, ad blockers can block the flow - see the [Google Analytics documentation] for more info.

[forking]: https://help.github.com/en/github/getting-started-with-github/fork-a-repo
[Google Analytics documentation]: https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#handling_timeouts