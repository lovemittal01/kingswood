"use strict";

wglIsVisibleInit();

jQuery(document).ready(function ($) {
    wglContentMinHeight();
    wglStickyInit();
    wglSearchInit();
    wglSidePanelInit();
    wglMobileHeader();
    wglWoocommerceHelper();
    wglWoocommerceLoginIn();
    wglInitTimelineAppear();
    wglAccordionInit();
    wglAppear();
    wglServicesAccordionInit();
    wglStripedServicesInit();
    wglProgressBarsInit();
    wglCarouselSwiper();
    wglFilterSwiper();
    wglImageComparison();
    wglCounterInit();
    wglCountdownInit();
    wglImgLayers();
    wglPageTitleParallax();
    wglExtendedParallax();
    wglPortfolioParallax();
    wglScrollUp();
    wglLinkOverlay();
    wglLinkScroll();
    wglSkrollrInit();
    wglStickySidebar();
    wglVideoboxInit();
    wglParallaxVideo();
    wglTabsHorizontalInit();
    wglShowcaseInit();
    wglShowcase2Init();
    wglCircuitService();
    wglSelectWrap();
    wglScrollAnimation();
    wglWoocommerceMiniCart();
    wglTextBackground();
    wglDynamicStyles();
    wglPieChartInit();
    wglButtonAnimation();
    wglTimelineHorizontal();
    wglInitStepsAppear();
    wglButton();
    wglTextEditor();
    wglPageTitleParallax();
    wglInitDblhAppear();
    wglListingsSearch();
    wglProfile();
});

jQuery(window).load(function () {
    wglInitZoom();
    wglServiceInit();
    wglTabsInit();
    wglCursorInit();
    wglImagesGallery();
    wglIsotope();
    wglBlogMasonryInit();
    setTimeout(function(){
        jQuery('#preloader-wrapper').fadeOut();
    },1100);

    wglParticlesCustom();
    wglParticlesImageCustom();
    wglMenuLavalamp();
    jQuery(".wgl-currency-stripe_scrolling").each(function(){
        jQuery(this).simplemarquee({
            speed: 40,
            space: 0,
            handleHover: true,
            handleResize: true
        });
    })
});

jQuery(window).resize(function () {
    wglContentMinHeight();
    setTimeout(function(){
        wglInitZoom();
    },100);
})
