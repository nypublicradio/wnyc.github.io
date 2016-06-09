$(function() {
    
    // build menu
        if( !$('body').attr('id') != 'home' ) {
            $.ajax({
                url: '/index.html',
            }).done(function(r) {
                var nav = $(r).find('#page_tree');
                $('#page_tree').replaceWith(nav);
                bind_nav_buttons();
            });
        } else {
            bind_nav_buttons();
        }
    
    
    var bind_nav_buttons = function() {
        // initiate smooth scroll on anchor links
            $('a').smoothScroll();
        // nav "groups"
            var slug = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
            if( !slug || slug == '' ) {
                slug = 'home';
            }
            // auto-expand current group
                $('a[href=' + slug + ']').next('ul').addClass('expanded');
            // group expandsion behavior
                $('nav > ul > li > a').on('click', function(e) {
                    if( $(this).attr('href') == slug ) {
                        e.preventDefault();
                    }
                    $(this).next('ul').toggleClass('expanded');
                });
    }
    
    
    // mobile nav button
        $('.btn_nav').on('click', function() {
            $('nav ul').toggleClass('active');
            $(this).toggleClass('active');
        });
    
    // when hitting links, make sure nav closes on mobile
        $('nav a').on('click', function() {
            $('nav ul').removeClass('active');
            $('.btn_nav').removeClass('active');
        });  
    
    
    // copy to clipboard functionality
        var clipboard = new Clipboard('.btn_copy');
    
        clipboard.on('success', function(e) {
            // console.info('Action:', e.action);
            // console.info('Text:', e.text);
            // console.info('Trigger:', e.trigger);
            e.clearSelection();
        });
        
        clipboard.on('error', function(e) {
            // console.error('Action:', e.action);
            // console.error('Trigger:', e.trigger);
            $('#message').html('Press ⌘-C to copy to your clipboard.').addClass('visible');
            $(document).on('keyup', function() {
                dismiss_message();
            });
            $(document).on('mouseup', function() {
                dismiss_message();
            });
        });
        
        var dismiss_message = function() {
            $('#message').removeClass('visible');
            $(document).off( "keyup" );
            $(document).off( "click" );
        }
    
    
    // initialize "inline swatches" 
        $('.inline_swatch').each(function(i,n) {
            $(this).html('<div class="swatch ' + $(this).data('color') + ' background"></div>' +
                            '<ul>' +
                                '<li>.' + $(this).data('color') + '</li>' +
                                '<li id="' + $(this).data('color') + '_copy">#' + $(this).data('hex') + '</li>' +
                                '<li>rgba(' + $(this).data('rgba') + ')</li>' +
                            '</ul>' +
                            '<button class="btn_copy" data-clipboard-target="#' + $(this).data('color') + '_copy">📋</button>'
                            );
        });
    
});