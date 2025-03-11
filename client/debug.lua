RegisterCommand('game_1', function()
    local success = StartGame('WordsGame', {
        wordsAmount = 5,
        readyTime = 3500,
        gameTime = 7500
    })
end)

RegisterCommand('game_2', function()
    local success = StartGame('CatchGame', {
        title = 'Catch all fresh fries',
        readyTime = 2500,
        amount = 10,
        spawnTime = { 1500, 2000 }, -- random number from 1500 to 2000 (1 - 2 seconds)
        hand = 'img/fries_pack.png',
        handSize = 3,
        fallTime = {
            bad = { 3000, 3500 }, -- random number from 3000ms to 3500ms (for bad items)
            good = { 3500, 4000 } -- random number from 3500ms to 4000ms (for good items)
        },
        -- trashTimeout = 1000,
        images = {
            good = { 'fries' },    -- table of image for good items
            bad = { 'fries_mold' } -- table of image for bad items
        }
    })
end)

RegisterCommand('game_3', function()
    local success = StartGame('MathGame', {
        preset = 'easy', -- easy / medium / hard / impossible
        wordsAmount = 10,
        questionsAmount = 20,
        maxFails = 3,
        fallTime = 5000
    })
end)

RegisterCommand('game_4', function()
    local success = StartGame('BeatGame', {
        keysAmount = 15,
        keys = { 'A', 'S', 'D', 'F' },
        maxFails = 3,
        readyTime = 2500
    })
end)

RegisterCommand('game_5', function()
    local success = StartGame('MemorizeGame', {
        amount = 3,
        rememberTime = 3000,
        answerTime = 7500,
        readyTime = 2500
    })
end)

RegisterCommand('game_6', function()
    local success = StartGame('CodeGame', {
        correctCode = '54142',
        time = 12500
    })
end)

RegisterCommand('game_7', function()
    local success = StartGame('SkillCheck', {
        letters = { 'W', 'X', 'E', 'Z' },
        amount = 6,
        time = 5500
    })
end)
