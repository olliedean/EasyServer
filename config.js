const config = {
    minecraftVersion: '1.20.1', // The version of Minecraft that the server is running on. Example: '1.20.1'
    loaderType: 'fabric', // The loader that the server is using, either 'fabric' or 'forge'

    modFilesToIgnore: [
        // Add files from the mod folder that you want to ignore here
        // This will consist of files that are client-side only, or are not needed for the server
        // All inputs are wildcarded, if it's import to be exact, add a $ to the end of the string

        'chat_heads',
        'RoughlyEnoughItems',
        'fancymenu',
        'EnchantmentDescriptions',
        'Jade-',
        'Jade-Addons',
        'MouseTweaks',
        'OptiFine',
        'radium-',
        'oculus-mc',
        'embeddium',
        'sodium',
        'lithium',
        'iris',
        'phosphor',
        'modmenu',
    ]


}

export default config;