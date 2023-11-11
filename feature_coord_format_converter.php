<?php
/*
Plugin Name: Feature Coord Format Converter
Description: A WordPress plugin for coordinate format conversion.
Version: 1.0
Author: Alejah
*/
// Enqueue scripts and styles
function feature_coord_converter_scripts() {
    $file_version = filemtime(plugin_dir_path(__FILE__) . 'js/script.js');

    wp_enqueue_style('feature-coord-converter-style', plugin_dir_url(__FILE__) . 'css/style.css', array(), $file_version);
    wp_enqueue_script('feature-coord-converter-script', plugin_dir_url(__FILE__) . 'js/script.js', array('jquery'), $file_version, true);
}

add_action('wp_enqueue_scripts', 'feature_coord_converter_scripts');

// Shortcode handler
function feature_coord_converter_shortcode() {
    ob_start();
    ?>
    <div class="coord-converter-form">
         <h3>Coordinate Converter</h3>
        <form id="coord-converter-form">
            <div>
                <label for="format">Coordinate Format:</label>
                <select id="format" name="format">
                    <option value="dd">Decimal Degrees (DD)</option>
                    <option value="dms">Degrees, Minutes, Seconds (DMS)</option>
                </select>
            </div>
            <div class="field">
                <label for="latitude">Latitude:</label>
                <input type="text" id="latitude" name="latitude" class="input">
            </div>
            <div class="field">

                <label for="longitude">Longitude:</label>
                <input type="text" id="longitude" name="longitude" class="input">
            </div>



            <button type="button" id="convert-btn">Convert</button>
            <button type="button" id="save-btn">Save to Database</button>
            <div id="result">
               <p>Converted Latitude Value: <span id="latitude_value"></span></p>
                <p>Converted Longitude Value: <span id="longitude_value"></span></p>
            </div>
        </form>
    </div>
    <?php
    return ob_get_clean();
}



add_shortcode('coord_converter', 'feature_coord_converter_shortcode');

