fx_version 'cerulean'
game 'gta5'
author 'piotreq'
description 'pMinigames'
lua54 'yes'

shared_script '@ox_lib/init.lua'

client_scripts {
    'client/*.lua'
}

ui_page 'web/index.html'

files {
    'locales/*.json',
    'web/index.html',
    'web/style.css',
    'web/script/*.js',
    'web/img/*.png',
    'web/sounds/*.mp3'
}
