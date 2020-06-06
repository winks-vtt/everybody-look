

function getContextOption(idField) {
    return {
        name: "EVERYBODYLOOK.LOOK",
        icon: '<i class="fas fa-directions"></i>',
        condition: li => game.user.isGM,
        callback: li => {
            let scene = game.scenes.get(li.data(idField));
            if (!scene.data.active) {
                scene.activate();
            } else {
                let scene = game.scenes.get(li.data(idField));
                for (let u of game.users) {
                    game.socket.emit('pullToScene', scene.data._id, u.data._id);
                }
            }
        }
    };
}
Hooks.on("getSceneNavigationContext", (html, contextOptions) => {
    contextOptions.push(getContextOption('sceneId'));
});

Hooks.on("getSceneDirectoryEntryContext", (html, contextOptions) => {
    console.log('getting context', contextOptions);
    contextOptions.push(getContextOption('entityId'));
});
