local placeId = game.PlaceId
local GameScripts = {
    [13643807539] = "https://fullyz.xyz/scripts/Games/SouthBronx.lua",
    [7711635737] = "https://fullyz.xyz/scripts/Games/EmergencyHamburg.lua"
}

local player = game:GetService("Players").LocalPlayer

if GameScripts[placeId] then
    loadstring(game:HttpGet(GameScripts[placeId], true))()
else
    local supported = {
        "- Emergency Hamburg (7711635737)", -- Not available yet
        "- South Bronx | BETA" -- You may experience longer loading times and bugs
    }
    local message = "❌ Unsupported game.\n\n✅ Supported Games:\n" .. table.concat(supported, "\n")
    player:Kick(message)
end
