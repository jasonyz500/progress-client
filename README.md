# progress-client

next features

yearly view weekly mood coloring for all circles
weekly view mouseover for more information
add calendar (better date selection) to weekly/monthly views
beef up email for pw recovery
email/slack integrations
full plaintext backup + restore from backup (with or without encryption)
^ also, change encryption keys, simultaneously requiring signout on all logged in sessions to refresh locally stored key

bug list

deleting all weekly updates, then saving doesn't save properly (actually it does, but the global state doesn't get updated properly)
add validation to dateStr or weekStr URLs
make text box expand as you type
when there are too many tags, the daily calendar view doesn't expand properly
server-side submit validation doesn't work
display errors on login from nav bar
tagging doesn't work on mobile

consider passing around moment objects instead of strings for dates