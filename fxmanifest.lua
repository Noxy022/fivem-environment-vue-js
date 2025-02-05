-- Resource Metadata
fx_version 'cerulean'
games {'gta5'}

author 'Noxy Dev'
description 'Fivem Environment'
version '1.0.0'

 
ui_page 'nui/index.html'

files {
    'nui/index.html',
    'nui/img/*',
    'nui/assets/*.css', 
    'nui/assets/*.js',   
    'nui/assets/*.ttf', 
}

-- Scripts côté client
client_scripts {
    "client/*.lua"
}

-- Script partagé (config)
shared_script {
    "config/*.lua",    
}

-- Scripts côté serveur
server_scripts {
    '@oxmysql/lib/MySQL.lua',
    "server/*.lua"
}
