'use strict';
(function ($) {
    jQuery(document).ready(function ($) {
        wglRegistationForm();
        wglLoginForm();
        wglChangePasswordForm();
        wglImageUploader();
        wglFeatureCheckbox();
        wglRemoveListing();
        wglRadioListing();
        wglLoginIn();
        wglUpdatePreviewButton();
        wglFavorite();
        wglToggleFavorite();
        wglCMB2Select2Init();
    });

})(jQuery);

function wglRegistationForm() {
    jQuery(document).on('submit', 'form.register-form', function (e) {
        var $this = jQuery(this);
        var security = jQuery(this).find('#security_register').val();
        $this.parent().addClass('wgl-auto-listings-loading');

        jQuery.ajax({
            url: wgl_auto_listings_main.ajaxurl,
            type: 'POST',
            dataType: 'json',
            security_register: security,
            data: jQuery(this).serialize() + '&action=wgl_ajax_register',
        })
            .done(function (data) {
                $this.parent().removeClass('wgl-auto-listings-loading');
                $this.find('.wgl-listing-notice-box').remove();
                if (false === data.status) {
                    $this.prepend(data.msg);
                } else {
                    $this.prepend(data.msg);
                    setTimeout(function () {
                        window.location.href =
                            wgl_auto_listings_main.after_register_url_redirect;
                    }, 500);
                }
            })
            .fail(function (text) {
                console.log(text.responseText);
            });
        return false;
    });
}

function wglLoginForm() {
    jQuery(document).on('submit', '.login > form', function (e) {
        var loginForm = jQuery(this);
        loginForm.parent().addClass('wgl-auto-listings-loading');

        jQuery.ajax({
            type: loginForm.attr('method'),
            url: wgl_auto_listings_main.ajaxurl,
            data:
                loginForm.serialize() +
                '&action=wgl_ajax_login&login_nonce=' +
                wgl_auto_listings_main.login_nonce,
            success: function (data) {
                loginForm.parent().removeClass('wgl-auto-listings-loading');
                var data = jQuery.parseJSON(data);
                loginForm.find('.wgl-listing-notice-box').remove();
                if (false === data.status) {
                    loginForm.prepend(data.msg);
                } else {
                    loginForm.prepend(data.msg);
                    setTimeout(function () {
                        if(window.location.href === data.redirect){
                            location.reload();
                        }else{
                            window.location.href = data.redirect;
                        }
                    }, 500);
                }
            },
        });

        return false;
    });
}

function wglChangePasswordForm(){
    jQuery(document).on('submit', 'form.wgl-user-change-password', function (e) {
        var $this = jQuery(this);
        $this.parent().addClass('wgl-auto-listings-loading');
        jQuery.ajax({
            url: wgl_auto_listings_main.ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: jQuery(this).serialize() + '&action=wgl_ajax_change_password',
            success: function(data) {
                $this.parent().removeClass('wgl-auto-listings-loading');
                $this.find('.wgl-listing-notice-box').remove();
                if (false === data.status) {
                    $this.prepend(data.msg);
                } else {
                    $this.prepend(data.msg);
                    setTimeout(function () {
                        window.location.href =
                            wgl_auto_listings_main.after_register_url_redirect;
                    }, 500);
                }
            },
            error: function(xhr, status, error) {
                // Handle AJAX errors
                console.error(xhr.responseText);
            }
        });

        return false;
    });
}

function wglImageUploader() {
    let file = document.getElementById('fileInput');
    if (file) {
        file.addEventListener('change', function () {
            var fileInput = document.getElementById('fileInput');
            var previewImage = document.getElementById('preview');
            var deteleAvatar = document.getElementById('deleteAvatar');

            var file = fileInput.files[0];

            var reader = new FileReader();

            reader.onload = function (e) {
                previewImage.src = e.target.result;
            };

            deteleAvatar.value = '';
            this.parentNode
                .querySelector('.wgl-auto-listings-uploaded-file')
                .classList.remove('hidden');

            reader.readAsDataURL(file);
        });

        file.addEventListener('click', () => {
            file.value = null;
        });
    }

    let removeFile = document.querySelector(
        '.wgl-auto-listings-remove-uploaded-file'
    );
    if (removeFile) {
        removeFile.addEventListener('click', function () {
            this.parentNode.classList.add('hidden');
            var deteleAvatar = document.getElementById('deleteAvatar');
            deteleAvatar.value = 'yes';
        });
    }
}

function wglFeatureCheckbox() {
    let checkboxList = jQuery('.cmb2-id-listing-feature');
    if (checkboxList.length) {
        checkboxList.each(function () {
            let daughterCheckbox = jQuery(this).find('.wrapper-taxonomy');
            jQuery(daughterCheckbox).each(function () {
                const parentCheckbox = jQuery(this).find(
                    '.heading-taxonomy .cmb2_option'
                );
                const childCheckbox =
                    jQuery(this).find(
                        '.child-taxonomy .cmb2-option:checked'
                    ).length > 0;
                parentCheckbox.prop('checked', childCheckbox);
            });

            checkboxList.find('.cmb2-option').on('change', function () {
                const parentCheckbox = jQuery(this)
                    .closest('.wrapper-taxonomy')
                    .find('.heading-taxonomy .cmb2_option');
                const childCheckbox =
                    jQuery(this)
                        .closest('.wrapper-taxonomy')
                        .find('.child-taxonomy .cmb2-option:checked')
                        .length > 0;
                parentCheckbox.prop('checked', childCheckbox);
            });
        });
    }
}

function wglRemoveListing() {
    var postId;
    jQuery(document).on(
        'click tap',
        '.wgl-user-listings .remove-btn',
        function (e) {
            e.preventDefault();

            var r = confirm(wgl_auto_listings_main.deleteListing);
            if (r == false) return;

            postId = jQuery(this).data('post-id');
            var security = jQuery(this).data('nonce');

            jQuery(
                '.wgl-user-listings .remove-btn[data-post-id="' +
                    postId +
                    '"'
            )
                .closest('.listing__item').addClass('wgl-auto-listings-loading');

            jQuery.ajax({
                type: 'post',
                cache: false,
                async: true,
                url: wgl_auto_listings_main.ajaxurl,
                dataType: 'json',
                data: {
                    action: 'remove_listing',
                    nonce: security,
                    post_id: postId,
                },
                beforeSend: function () {},
                error: function (jqXHR, textStatus, errorThrown) {},
                success: function (response) {
                    jQuery(
                        '.wgl-user-listings .remove-btn[data-post-id="' +
                            postId +
                            '"'
                    )
                        .closest('.listing__item').removeClass('wgl-auto-listings-loading');

                    if (true === response.status) {
                        alert(response.message);
                        jQuery(
                            '.wgl-user-listings .remove-btn[data-post-id="' +
                                postId +
                                '"'
                        )
                            .closest('.listing__item')
                            .fadeOut();
                    }else{
                        alert(response.message);
                    }
                },
            });
        }
    );
}

function wglRadioListing() {
    jQuery('.wgl-user-listings_search .label-box input[type=radio]').on(
        'change',
        function () {
            jQuery(this).parent().parent().find('li').removeClass('active');
            jQuery(this).parent().addClass('active');
            jQuery(this).closest('form').submit();
        }
    );
}

function wglLoginIn() {
    var login_in = jQuery('.login-in-dashboard');
    var clipboard = jQuery('.wgl_message .copy');

    if (login_in.length) {
        login_in.each(function () {
            var mc = jQuery(this),
                icon = mc.find('a.login-in-dashboard_link'),
                overlay = mc.find('div.overlay'),
                nav = mc.find('.tabs-navigation .wgl-tab'),
                panel = mc.find('.tabs-content .tabs-panel');

            nav.on('click tap', function (e) {
                jQuery(this)
                    .addClass('active')
                    .siblings()
                    .removeClass('active');
                var active_item = jQuery(this).index();
                jQuery(panel)
                    .eq(active_item)
                    .addClass('active_panel')
                    .siblings()
                    .removeClass('active_panel');
            });

            icon.on('click tap', function (e) {
                e.preventDefault();
                mc.toggleClass('open_login');
            });

            var eventClose = function (e) {
                if (
                    !jQuery(e.target).closest('.modal_content').length &&
                    !jQuery(e.target).is('.modal_content')
                ) {
                    mc.removeClass('open_login');
                }
            };

            overlay.on('click tap', eventClose);

            if (jQuery(this).hasClass('wgl-dashboard')) {
                jQuery(this)
                    .find('.login-password')
                    .append('<i class="passToggle"></i>');
                jQuery(this)
                    .find('.passToggle')
                    .on('click tap', function (e) {
                        var pass = jQuery(this).prev();
                        if ('password' === pass.attr('type')) {
                            pass.attr('type', 'text');
                            jQuery(this).parent().addClass('show_pass');
                        } else {
                            pass.attr('type', 'password');
                            jQuery(this).parent().removeClass('show_pass');
                        }
                    });
            }

            jQuery(document).bind('keydown', function (e) {
                if (e.which === 27) eventClose(e);
            });
        });
    }

    if (clipboard.length) {
        clipboard.each(function () {
            jQuery(this).on('click tap', function (e) {
                var $temp = jQuery("<input style='opacity: 0;' />");
                jQuery('body').append($temp);
                $temp.val(jQuery(jQuery(this)).text()).select();
                document.execCommand('copy');

                jQuery(this)
                    .closest('.wgl_message')
                    .find('.copy')
                    .removeClass('copied');
                jQuery(this)
                    .closest('.wgl_message')
                    .find('.copy')
                    .attr('data-title', 'Click to copy');
                jQuery(this).addClass('copied');
                jQuery(this).attr('data-title', 'Copied');
                $temp.remove();
            });
        });
    }
}

function wglUpdatePreviewButton() {
    jQuery(document).on(
        'click tap',
        '.wgl-listing-submit_preview .wgl-btn-preview-editing',
        function (e) {
            jQuery(this).closest('.wgl-listing-submit').find('form .submit-button-wrapper button').trigger('click');
        }
    );
}

function wglFavorite(){
    function getCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }

    function checkCookieChange(cookieName, callback) {
        var lastCookieValue = getCookie(cookieName);
        jQuery(document).on('click', '.listing_favorite button', function() {
            var currentCookieValue = getCookie(cookieName);
            if (currentCookieValue !== lastCookieValue) {
                callback(currentCookieValue);
                lastCookieValue = currentCookieValue;
                if(0 < JSON.parse(currentCookieValue).length){
                    jQuery('.wgl-favorite .favorite-count span').text(JSON.parse(currentCookieValue).length);
                }else{
                    jQuery('.wgl-favorite .favorite-count span').text('');
                }
            }
        });
    }

    checkCookieChange('wgl_auto_listings_favorite_ids', function(newValue) {});
}

function wglToggleFavorite(){
    jQuery('.wgl_module_listings .listing_favorite button, .listing__info .listing_favorite button').on('click tap', function(){
        const getCookie = Cookies.get('wgl_auto_listings_favorite_ids');
        const id = jQuery(this).data('id');

        let updatedCookieListings = [];
        if(getCookie){
            let cookies = JSON.parse(getCookie);
            if(cookies.includes(id)){
                updatedCookieListings = cookies.filter(listingId => listingId !== id);
            }else{
                updatedCookieListings = [...cookies, id];
            }
        }else{
            updatedCookieListings = [id];
        }

        jQuery(this).toggleClass('liked');

        if(jQuery(this).closest('.favorite_listing').length > 0){
            jQuery(this).closest('.listing__item').fadeOut();
        }
        
        Cookies.set('wgl_auto_listings_favorite_ids', JSON.stringify(updatedCookieListings), { expires: 7, path: '/' });
    });
}

function wglCMB2Select2Init(){
    function showAllModels() {
        jQuery('#listing_model option').show();
        jQuery('#listing_model option:first').prop('selected', true);
    }

    jQuery('#listing_make').on('change', function(){

        var selectedMake = jQuery(this).val();
        if(selectedMake === '') {
            showAllModels();
        } else {
            jQuery('#listing_model option').hide();
        
            jQuery('#listing_model option[data-condition="none"]').show();
            jQuery('#listing_model option[data-condition="' + selectedMake + '"]').show();
            jQuery('#listing_model option[data-condition*="' + selectedMake + '"]').show();
            
            jQuery('#listing_model option:visible:first').prop('selected', true);
        }
    });
}