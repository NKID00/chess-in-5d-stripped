# Chess In 5D

## Introduction

Open source implementation of '5D Chess With Multiverse Time Travel'.

Chess In 5D aims to reimplement the rules as found in the original.
This project looks to implement additional features also not found in the game:

### Standarized notation to record games in a text format

![Import Feature](/public/assets/import_feature.gif)

### Save and analyze previous games

![Analyze Feature](/public/assets/analyze_feature.gif)

### Bot API

![Bot Feature](/public/assets/bot_feature.gif)

## FAQ

### Is it any good?

Yes (maybe).

### You incorrectly evaluated this board as a checkmate (or not a checkmate)!

If you can provide me an action list (object, json, or notation) or the board state, and submit it as an issue to this repo (https://gitlab.com/alexbay218/5d-chess-js), I can get right on it. This goes for any other bugs. A good way to verify if it is correct or not is to repeat the same moves in the same order in '5D Chess With Multiverse Time Travel' and see if it matches.

### Why is this on GitLab instead of GitHub?

I made the switch from GitHub to GitLab mid 2019 when I was starting a new long term project called KSS. Back then, GitHub did not have many of the features it does now, such as integrated CI/CD and more. GitLab was the superior product in almost every way. Furthermore, as a believer in the open source, it seem ironic that open source software would be hosted on closed source platforms. With GitHub being closed source, I can be sure that if GitLab.org crumbles, I can still maintain the overall project structure via GitLab instances. This allows me to preserve the Git repo itself, but also the issues, labels, rules, pipelines, etc. that are fundamental to a project. With GitHub, developers do not have this guarantee and they also do not have full control over their project structure.
For a (biased, but not untrue) comparison, visit this link [here](https://about.gitlab.com/devops-tools/github/decision-kit.html)

### Isn't the game copyrighted?

Yes, the game '5D Chess With Multiverse Time Travel' is under copyright by Thunkspace, LLC and any source code, written works, and other copyrightable materials are the property of Thunkspace, LLC. However, copyright does not extend to an idea, which include game rules. So as long as the new work does not contain a direct copy of the rules or other material within the original game. Well known precedent for this is Hasbro's lawsuit against Scrabulous in which they dropped it after Scrabulous removed material that could possible be considered violating copyright (https://www.cnet.com/news/hasbro-drops-scrabulous-lawsuit/).
Also of note is this article from the American Bar Association (https://www.americanbar.org/groups/intellectual_property_law/publications/landslide/2014-15/march-april/its_how_you_play_game_why_videogame_rules_are_not_expression_protected_copyright_law/).
5D Chess JS in no way aims to violate any copyright laws, but instead aims to be an open source implementation of the original ideas as presented by '5D Chess With Multiverse Time Travel'.

### Copyright

All source code is released under AGPL v3.0 (license can be found under the LICENSE file).
Chess piece images were derived from SVG files released under CC BY-SA v3.0 (license can be found under the PIECE_LICENSE file).
Any addition copyrightable material not covered under AGPL v3.0 is released under CC BY-SA v3.0.
