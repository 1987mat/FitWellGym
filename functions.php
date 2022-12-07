<?php

// Import files from includes folder
require get_theme_file_path('/includes/like-route.php');
require get_theme_file_path('/includes/search-route.php');

// Register authorName field on JSON data
function custom_rest() {
  register_rest_field('post', 'authorName', array(
    'get_callback' => function() {
      return get_the_author();
    }
  ));

  register_rest_field('comment', 'userCommentCount', array(
    'get_callback' => function() {
      return count_user_posts(get_current_user_id(), 'comment');
    }
  ));
}

add_action('rest_api_init', 'custom_rest');

// Display title, subtitle and image for pages
function pageBanner($args = NULL) {

  // Set title
  if(!$args['title']) {
    $args['title'] = get_the_title();
  }

  // Set subtitle from Pods custom field
  if(!$args['subtitle']) {
    $args['subtitle'] = get_post_meta(get_the_ID(), 'subtitle', true);
  }

  // Set image
  if (!$args['photo']) {
    if (pods_field_display( 'image' ) AND !is_archive() AND !is_home() ) {
      $args['photo'] = pods_field_display( 'image' );
    } else {
      $args['photo'] = NULL;
    }
  }

  ?>

  <div class="page-banner">
    <h1 style="text-align:center"><?php echo $args['title']; ?></h1>
    <p style="text-align:center"><?php echo $args['subtitle'];?></p>
    <img src="<?php echo $args['photo'];?>">
  </div>
<?php
}

function CSS_JS() {
  wp_register_style('style', get_template_directory_uri() . '/css/style.css');
  wp_enqueue_style('style');
  wp_enqueue_script('main-js', get_theme_file_uri('/build/index.js'), array(), '1.0', true);

  // Make url relative for AJAX requests
  wp_localize_script('main-js', 'siteData', array(
    'root_url' => get_site_url(),
    'nonce' => wp_create_nonce('wp_rest')
  ));
}

add_action('wp_enqueue_scripts', 'CSS_JS');


function site_features() {
  // Create title for each page
  add_theme_support('title-tag');
  // Enable feature images
  add_theme_support('post-thumbnails');
  // Handle image sizes
  add_image_size('landscape', '400', '260', true);
  add_image_size('portrait', '480', '650', true);
}

add_action('after_setup_theme', 'site_features');

function my_deregister_scripts(){
  wp_deregister_script( 'wp-embed' );
}

add_action('wp_footer', 'my_deregister_scripts' );

function adjust_queries($query) {

  // Customize  post type 'workout'
  if(!is_admin() && is_post_type_archive('workout') && $query->is_main_query()) {
    $query->set('orderby', 'title');
    $query->set('order', 'ASC');
    $query->set('posts_per_page', -1);
  }

  // Customize post type 'event'
  if(!is_admin() && is_post_type_archive('event') && $query->is_main_query()) {
    $today = date('Y-m-d');
    $query->set('orderby','post_date');
    $query->set('order','ASC');
    $query->set('meta_query',array(
      array(
        'key' => 'event_date',
        'compare' => '>=',
        'value' => $today,
        'type' => 'numeric'
      )
    ));  
  }
}

add_action('pre_get_posts', 'adjust_queries');

// Redirect subscriber accounts out of admin and onto homepage

function redirectSubsToFrontend() {
  $ourCurrentUser = wp_get_current_user();
  if(count($ourCurrentUser->roles) == 1 AND $ourCurrentUser->roles[0] == 'subscriber') {
    wp_redirect(site_url('/'));
    exit;
  }
}

add_action('admin_init', 'redirectSubsToFrontend');

function noAdminBar() {
  $ourCurrentUser = wp_get_current_user();
  if(count($ourCurrentUser->roles) == 1 AND $ourCurrentUser->roles[0] == 'subscriber') {
    show_admin_bar(false);
  }
}

add_action('wp_loaded', 'noAdminBar');

// Customize login screen
function ourHeaderUrl() {
  return esc_url(site_url('/'));
}

add_filter('login_headerurl', 'ourHeaderUrl');

// Load CSS into WP login page

function ourLoginCSS() {
  wp_register_style('style', get_template_directory_uri() . '/css/style.css');
  wp_enqueue_style('style');
}

add_action('login_enqueue_scripts', 'ourLoginCSS');

function ourLoginTitle() {
  return get_bloginfo('name');
}

add_filter('login_headertitle', 'ourLoginTitle');

// Force comment posts to be private

function makeCommentPrivate($data, $postarr) {
  
  if ($data['post_type'] == 'comment') {

    // Limit number of comment posts
    if (count_user_posts(get_current_user_id(), 'comment') > 4 AND !$postarr['ID']) {
      die('You have reached your comment limit.');
    }

    $data['post_content'] = sanitize_textarea_field($data['post_content']);
    $data['post_title'] = sanitize_text_field($data['post_title']);
  }

  if ($data['post_type'] == 'comment' AND $data['post_status'] != 'trash') {
    $data['post_status'] = "private";
  }

  return $data;
}

add_filter('wp_insert_post_data', 'makeCommentPrivate', 10, 2);


// Remove 'private' from post title
function remove_private_prefix($title) {
  $title = str_replace('Private: ', '', $title);
  return $title;
}

add_filter('the_title', 'remove_private_prefix');

// Remove empty p tags
function remove_empty_p($content){
  $content = force_balance_tags($content);
  return preg_replace('#<p>\s*+(<br\s*/*>)?\s*</p>#i', '', $content);
}

add_filter('the_content', 'remove_empty_p', 20, 1);

