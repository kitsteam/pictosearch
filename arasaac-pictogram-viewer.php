<?php
/**
 * Plugin Name: ARASAAC Pictogram Viewer
 * Author: Klaus Herberth
 * License: MIT
 */

function arasaac_pictogram_viewer_init()
{
    $react_app_js  = plugins_url("js/main.js", __FILE__);

    wp_register_script('arasaac_pictogram_viewer_js', $react_app_js, [], null, true);
}

add_action('init', 'arasaac_pictogram_viewer_init');

function arasaac_pictogram_viewer_shortcode()
{
    wp_enqueue_script("arasaac_pictogram_viewer_js", null, true);

    return '<div id="arasaac-pictogram-viewer-react" class="alignwide"></div>';
}

add_shortcode('arasaac-pictogram-viewer', 'arasaac_pictogram_viewer_shortcode');
