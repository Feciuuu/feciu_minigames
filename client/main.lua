local locales = LoadResourceFile(GetCurrentResourceName(), "locales/pl.json")

RegisterNUICallback("NUILoaded", function(data, cb)
    cb(locales)
end)

local function StartGame(name, data)
    SendNUIMessage({ action = name, data = data })
    SetNuiFocus(true, true)
    local promise = promise.new()

    RegisterNUICallback("FinishGame", function(responseData, cb)
        SetNuiFocus(false, false)
        cb("ok")
        promise:resolve(responseData.result)
    end)

    return Citizen.Await(promise)
end

exports("StartGame", StartGame)
