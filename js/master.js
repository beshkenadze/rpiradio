/**
 * User: akira
 * Date: 01.01.13
 * Time: 15:47
 */

$(document).on('ready', function(){
    new App({
        host: "server/",
        list: "list.json",
        play: "play.json",
        stop: "stop.json",
        status: "status.json",
        volume: "volume.json"
    });
})