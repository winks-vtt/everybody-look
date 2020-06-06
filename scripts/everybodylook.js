
Hooks.on("getSceneNavigationContext", (html, contextOptions) => {
    contextOptions.push({
        name: "EVERYBODYLOOK.LOOK",
        icon: '<i class="fas fa-directions"></i>',
        condition: li => game.user.isGM,
        callback: li => {
            let scene = game.scenes.get(li.data("sceneId"));
            if (!scene.data.active) {
                scene.activate();
            } else {
                let scene = game.scenes.get(li.data("sceneId"));
                for (let u of game.users) {
                    game.socket.emit('pullToScene', scene.data._id, u.data._id);
                }
            }
        }
    });
})
