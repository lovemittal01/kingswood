"use strict";

jQuery(document).ready(function ($) {
    wglListingSingleSlider();
    wglListingShowInfo();
    wglListingClipboard();

    jQuery(window).on('resize', function () {
        wglListingShowInfo();
    });
});

function wglListingShowInfo() {
    let $prop = jQuery('.listing__features');
    if ($prop.length) {
        $prop.each(function () {
            let $this = jQuery(this);
            let button = $this.find('.listing__features-button');
            let wrap = $this.find('.listing__features-wrap');
            let content = $this.find('.listing__features-content');
            let currHeight = Math.round(content.height());
            

            const first_title = $this.find('.listing__features-content .listing__features-title:first-child').outerHeight();
            const first_content = $this.find('.listing__features-content .listing__features-children').first().outerHeight();
            const contentMinHeight = first_title + first_content;

            let minHeight = wrap.attr('data-min-height', contentMinHeight);
            let wrapHeight= wrap.css({'height': contentMinHeight});
            minHeight = minHeight.data('minHeight');

            if (currHeight > minHeight) {
                button.on('click tap', function () {
                    if (wrap.hasClass('toggle-open')) {
                        wrap.css('height', minHeight + 'px');
                    } else {
                        wrap.css('height', currHeight + 'px');
                    }

                    button.toggleClass('button-show');
                    wrap.toggleClass('toggle-open');

                });
            } else {
                wrap.addClass('toggle-open');
                wrap.css('height', 'auto');
                button.css('display', 'none');
            }
        })
    }
}

function wglListingSingleSlider() {
    let $prop = jQuery('.listing__media-wrap .wgl-carousel_wrapper');
    if ($prop.length) {
        let sliderFor = $prop.find('.listing__media-slider-for')[0];
        let sliderNav = $prop.find('.listing__media-slider-nav')[0];

        var swiper = new Swiper(sliderFor, {
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            },
        });
        var swiper2 = new Swiper(sliderNav, {
            loop: true,
            spaceBetween: 0,
            thumbs: {
                swiper: swiper,
            },
            navigation: {
                nextEl: ".elementor-swiper-button-next",
                prevEl: ".elementor-swiper-button-prev",
            },
        });
    }
}

function wglListingClipboard() {
    var clipboard = jQuery('.listing__clipboard');

    if (clipboard.length) {
        clipboard.each(function(){
            jQuery(this).on('click tap', function (e) {
                var $temp = document.createElement('textarea');
                $temp.value = window.location.href;
                jQuery('body').append($temp);
                $temp.select();
                document.execCommand('copy');
                $temp.remove();

                jQuery(this).children('.listing__clipboard-tooltip').addClass('tooltip-appear').delay(1500).queue(function( next ){
                    jQuery(this).removeClass('tooltip-appear');
                    jQuery(this).dequeue();
                });
            });
        })
    }
}