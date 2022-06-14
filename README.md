# Jira Time Tracker

## Why?

I made this to solve a very specific pain point I had working with tickets (issues) in [Jira](https://www.atlassian.com/software/jira : there was no way to 'track' the time you've spent working on a particular ticket.

Since I had to update all my tickets daily with the time I spent working on each, it was an annoying mental/administrative overhead to either take note of the time when I start and finish working on a ticket, or estimate the approximate time myself after completing the work. This got more complicated because sometimes I'd find myself working on two tickets simultaenously because of their inter-related nature.

I wanted the ability to just hit a 'Start' button on a ticket when I started working on it and just hit 'Stop' when I finished, and have the time be updated automatically. I could have used a simple stopwatch, but then I could not track time on multiple tickets conveniently and then there'd be the extra step of actually opening the ticket and adding the time there.

So...I decided to make this very simple application. It does exactly what I said I wanted in the previous paragraph: you get to view your own tickets (including the description and comments on each), and each ticket has its own stopwatch with a 'Start', 'Stop', 'Reset', and 'Update' button. You press 'Start' when you start working on a ticket. You press 'Stop' when you're done. Finally you just press 'Update' and the time log gets added to that ticket.

P.S. The pain point was the main source of motivation for this, but of course I also wanted to improve my own skills and learn new stuff, so there's that ¯\_(ツ)\_/¯

## Features

- View all your tickets, project-wise
- Use the search bar to search through your tickets. Currently searchable attributes include ticket ID, summary, and reporter's name
- View the description and comments
- Use the stopwatch on each ticket to track the time you've spent and hit 'Update' to update the time logs for that ticket

### Planned features:

- Add comments
- Transition issues
- filter based on priority, status, reporter, etc
- Ability to tweak UI layout

## How To Use

- Clone this repo
- install packages using `npm install` or `yarn install`
- Go to the [API Token Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens) and create a new token (you need to be logged into your Jira account for the host you want to access)
- add the token to `.env.local` at the root along with the HOST ([HOST].atlassian.net, e.g. convertdigital.atlassian.net) and USER_EMAIL (email that logs you into the HOST):

```
ATLASSIAN_AUTH_TOKEN=
HOST=
USER_EMAIL=
```

Here's an example:

```
ATLASSIAN_AUTH_TOKEN=doYouActuallyThinkI'llAddAValidTokenAsAnExample
HOST=convertdigital.atlassian.net
USER_EMAIL=ishaq.ibrahim@convertdigital.com.au
```

- Run `yarn dev` or `npm run dev` to start the application
- That's all! Open the application on the port it's running on, and you're good to go :D

## Contact

If you have any suggestions for improvements or want to point out bugs, feel free to create issues or reach out to me at ishaqibrahimbss@gmail.com
