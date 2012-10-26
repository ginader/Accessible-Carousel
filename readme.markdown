jQuery Accessible Carousel Plugin
===================================

jQuery Plugin that generates a Carousel with Slideshow function.
The Javascript is optimized for accessibility. 
It provides a full non-js version as well a the default js version that works nicely for keyboard only and screenreader users.

Currently in use on [the nxtbgthing website](http://nxtbgthng.com/ "the animated iphone")

Usage:
------

    $("#demo ul.items").accessibleCarousel({
        remote:'ul#preview', 
        // (optional) valid jQuery Selector that defines a list that can remote control the carousel display
        autoRotate:false, 
        // (optional) boolean to define that the carousel should change its display by itself (slideshow)
        rotateWaitTime: 3000, 
        // (optional) number of milliseconds to wait on one display during autoRotate
        startIndex:0, 
        //(optional) number starting with 0 to define which of the available items to show at start
        updateElementLink:'img.overlay', 
        // (optional) valid jQuery Selector of an element which href attribute should be updated with the one of the active element. If not <a> element it will be wrapped in one
        updateElementText: null, 
        // (optional) valid jQuery Selector of an element which content should be updated with the Text of the active carousel item. If active item is an image the alt text will be used.
        animation:'slide', 
        // Defines the way the widget is animated. Either "blend" or "slide"(default)
        animationSpeed:300, 
        // Defines the time (in milliseconds) the animation takes to switch between the items
    });