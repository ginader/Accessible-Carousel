/**
 * Accessible Carousel - jQuery plugin for a accessible, unobtrusive Carousel
 * @requires jQuery v1.3.2
 *
 * 
 * code: http://github.com/ginader/Accessible-Carousel
 * please report issues at: http://github.com/ginader/Accessible-Carousel/issues
 *
 *
 * Copyright (c) 2010 Dirk Ginader (http://ginader.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 1.1
 * 
 * History:
 * * 1.0 initial release
 * * 1.1 new features
 * * * new option "animation"
 * * * new option "updateElementText"
 * * 1.1.1 removed easing and changed animation to fast for better performance
 */
(function($) {
    var debugMode = false;
    $.fn.extend({
        accessibleCarousel: function(config) {
            var o = this;
            debug('accessibleNavigation');
            o.items = []; // contains all item LIs when found
            o.positions = []; // contains the left position of the item LIs
            o.remoteItems = [];
            o.timeout = null;
            o.currentItemIndex = 0;
            o.options = $.extend({
                remote: null, // (optional) valid jQuery Selector that defines a list that can remote control the carousel display
                autoRotate:false, // (optional) boolean to define that the carousel should change its display by itself (slideshow)
                rotateWaitTime: 3000, // (optional) number of miliseconds to wait on one display during autoRotate
                startIndex:0, //(optional) number starting with 0 to define which of the availabe items to show at start
                updateElementLink: null, // (optional) valid jQuery Selector of an element which href attibut should be updated with the one of the active element. If not <a> element it will be wrapped in one
                updateElementText: null, // (optional) valid jQuery Selector of an element which content should be updated with the Text of the active carusel item. If active item is an image the alt text will be used.
                animation:'slide' // Defines the way the widget is animated. Either "blend" or "slide"(default)
            }, config);


            o.setup = function(list){
                o.items = list.find('li');
                var px = 0;
                o.items.each(function(i){
                    o.positions[i] = px;
                    px += o.items.width();
                });
                o.showItem(o.options.startIndex,list,true)
                if(o.options.remote){
                    o.setupRemote(list);
                }
                if(o.options.autoRotate){
                    o.autoRotateWait(list);
                }
                o.updateRemote(o.currentItemIndex);
            };
            
            o.setupRemote = function(list){
                debug('setupRemote');
                o.remoteItems = $(o.options.remote).find('li');
                o.remoteItems.find('a').each(function(index, el){
                    debug(index);
                    debug(el);
                    $(el).bind('click',function(event){
                        o.stopAutoRotate();
                        o.showItem(index,list);
                        event.preventDefault();
                    });
                    var href = $(o.items[index]).find('a').attr('href');
                    if(href){
                        $(el).attr('href',href);
                    }
                });
            };
            
            o.updateRemote = function(index){
                debug('updateRemote');
                debug(index);
                $(o.remoteItems).removeClass('active');
                $(o.remoteItems[index]).addClass('active');
            }
            
            o.showItem = function(index,list,noAnimation){
                debug('showItem');
                debug(index);
                var lastIndex = o.currentItemIndex;
                o.currentItemIndex = index;
                var position = '-'+o.positions[index]+'px';
                debug(position);
                if(o.options.remote){
                    o.updateRemote(index);
                }
                if(o.options.updateElementLink){
                    $(o.options.updateElementLink).removeClass('link').unbind('click');
                    if($(o.items[index]).find('a').attr('href')){                    
                        $(o.options.updateElementLink).click(function(event){
                            document.location.href = $(o.items[index]).find('a').attr('href');
                        }).addClass('link');
                    };
                }
                if(o.options.updateElementText){
                    var text = '';
                    debug('test');
                    debug($(o.items[index]).find('img[title]').length);
                    if( $(o.items[index]).find('img[title]').length ){
                        text = $(o.items[index]).find('img').attr('title');
                        debug(text);
                    }else{
                        text = o.items[index].text();
                        debug(text);
                    }
                    
                    $(o.options.updateElementText).html(text);
                    debug($(o.options.updateElementText));
                }

                switch(o.options.animation){
                case 'blend':
                    if(noAnimation){
                        $(o.items).hide();
                        $(o.items[index]).show();
                        return;
                    }
                    $(o.items[lastIndex]).fadeOut('slow');
                    $(o.items[index]).fadeIn('slow');
                    break;
                case 'slide':
                default:
                    if(noAnimation){
                        $(list).css('margin-left',position);
                        return;
                    }
                    $(list).stop().animate({
                        marginLeft: position
                    }, 'fast' );
                }
                
            };
            
            o.showNextItem = function(list){
                debug('showNextItem');
                var next = o.currentItemIndex + 1;
                if(next >= o.items.length){
                    next = 0;
                };
                o.showItem(next,list);
            };
            // o.showPreviousItem = function(){
            //     var previous = o.currentItemIndex - 1;
            //     if(previous < 0){
            //         previous = o.items.length-1;
            //     }
            //     o.showItem(previous);
            // };
            
            o.autoRotateWait = function(list){
                debug('autoRotateWait');
                o.timeout = window.setTimeout(function(){
                    o.showNextItem(list);
                    o.autoRotateWait(list);
                },o.options.rotateWaitTime);
            }
            
            o.stopAutoRotate = function(){
                debug('stopAutoRotate');
                if(o.timeout){
                    window.clearTimeout(o.timeout);
                    o.timeout = null;
                }
            };

            return o.each(function() {
                var list = $(this);
                o.setup(list);
            });
        }
    });
    // private Methods
    function debug(msg){
        if(debugMode && window.console && window.console.log){
            window.console.log(msg);
        }
    }
})(jQuery);
