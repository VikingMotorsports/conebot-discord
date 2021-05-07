# 2021-05-06-18:15 - gearysw
## Features
- Added competition countdown in days
- Added `!update` for updating valid parameters such as competition dates

# 2020-10-26-12:32 - gearysw

## Features
- Added `!inventory` to list out links related to inventory management

# 2020-10-19-18:37 - gearysw

## Features
- Added `!media` to list VMS social media links

# 2020-09-29-01:03 - gearysw

## Features
- Added `!role unassign` for Leadership
- Added `!invite` to return Discord invite link

## Fixes
- `!msds` was categorized as "Team Info", changed to "Team" to be consistent with the rest

# 2020-08-02-00:42 - gearysw

## Changes
- Updated discord.js library to v12

# 2020-07-29 - pdxsam2

## Features
- Added `!license` command to post a link to the SW license request form

# 2020-05-12-22:39 - gearysw

## Features
- Added `!msds` command to pull up MSDS folder

## Changes
- Changed how commands that provide links are done. Instead of having the links in the command files themselves, all links are stored in an environment file, `links.json`, which is not public.

# 2020-04-29-17:36 - gearysw

## Features
- Added `!role assign` for Leadership
- Polls now show date of collection instead of how long the poll lasts.

## Fixes
- `!role remove` did not actually remove a role. It does now.

# 2020-03-27-00:46 - gearysw

## Features
- Added `!designlog` command to pull up design log document

# 2020-03-02-00:18 - gearysw

## Fixes
- Spelling mistake on poll results

# 2020-02-27-17:28 - gearysw

## Features
- Added `!website` command to pull up VMS website URL

## Fixes
- Google Sheets API token refresh now works
- Calendar command now returns the correct link

# 2020-02-27-16:47 - gearysw

## Features
- First pass of Google Sheets API token refresh logic pushed

# 2020-02-27 - gearysw

## Features
- Started work on coding up refresh logic for Google Sheets API token