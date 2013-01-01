/**
 * User: akira
 * Date: 01.01.13
 * Time: 16:12
 */
!function( win, $ ){
    "use strict"

    win.App = function ( options ) {
        this.options = $.extend({}, defaults, options)
        console.log(this.options)
        this.initialize()
    }

    App.prototype = {
        constructor: App
        , initialize : function () {
            this.getList()
            this.getStatus()
        }
        , path: function(path){
            if(path in this.options)
                return this.options.host + this.options[path]
            else
                return "/"
        }
        , getList: function(){
            $.get(this.path("list"), $.proxy(this.setList, this),"json")
        }
        , setList: function(data){
            if( "response" in data ) {
                if("list" in data.response) {
                    $.each(data.response.list, $.proxy(this.createStation, this))
                }
            }

        }
        , getStatus : function(){
            $.get(this.path("status"), $.proxy(this.setStatus, this), "json")
        }
        , setStatus : function(data){
            if( "response" in data ) {
                var statusClass = "icon-" + data.response.status
                $('.control.status i').attr('class', statusClass)

                if("station" in data.response) {
                    var stationName =  data.response.station
                    $('.player .station-name').html(stationName)
                }else{
                    $('.player .station-name').html("")
                }


            }
        }
        , createStation: function(name, link){
            var station = $('<div/>', {'class':'station'}).appendTo('.stations')
                , title = $('<h4/>', {'html': name }).appendTo(station)
                , body = $('<p/>').appendTo(station)
                , a = $('<a/>', {'class':'control', 'href':link}).appendTo(body)
                  a.html('<i class="icon-play-circle"></i>&nbsp;<strong>ON NOW:</strong> O\'REILLY FACTOR')
        }
    }

    var defaults = {
        host: "/server/",
        list: "/list/",
        play: "/play/",
        stop: "/stop/",
        status: "/status/",
        volume: "/volume/"
    }

}( window, window.jQuery );
