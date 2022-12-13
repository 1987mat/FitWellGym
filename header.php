<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset');?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <?php wp_head(); ?>
</head>
<body <?php body_class();?>>
  <header class="site-header">
    <div class="container">
      <div class="hamburger">
        <span class="bar bar-1"></span>
        <span class="bar bar-2"></span>
        <span class="bar bar-3"></span>
      </div>
      <a href="<?php echo site_url(); ?>" class="logo"></a> 
      <nav class="main-navigation">
        <ul>
          <li <?php if(is_page('home')) echo 'class="current-menu-item"'?>><a href="<?php echo site_url(); ?>">Home</a></li>
          <li <?php if(get_post_type() == 'workout') echo 'class="current-menu-item"'?>><a href="<?php echo get_post_type_archive_link('workout'); ?>">Workouts</a></li>
          <li <?php if(get_post_type() == 'class') echo 'class="current-menu-item"'?>><a href="<?php echo get_post_type_archive_link('class'); ?>">Classes</a></li>
          <li <?php if(get_post_type() == 'event' or is_page('past-events')) echo 'class="current-menu-item"'?>><a href="<?php echo get_post_type_archive_link('event'); ?>">Events</a></li?>
          <li <?php if(get_post_type() == 'post') echo 'class="current-menu-item"'?>><a href="<?php echo site_url('/blog'); ?>">Blog</a></li?>
          <li <?php if(is_page('about') or wp_get_post_parent_id(0) == 16) echo 'class="current-menu-item"'?>><a href="<?php echo site_url('/about'); ?>">About</a></li?>
          <li <?php if(is_page('contact') or wp_get_post_parent_id(0) == 2) echo 'class="current-menu-item"'?>><a href="<?php echo site_url('/contact'); ?>">Contact</a></li>
        </ul>
      </nav>
      <a onclick="return false;" href="<?php echo esc_url(site_url('/search'));?>"><i class="fa fa-search" id="search-icon"></i></a>
      <div class="header-util">
        <!-- Leave a comment if user is logged in or Log Out  -->
         <?php if(is_user_logged_in()) { ?>
          <!-- Leave comment button -->
          <a href="<?php echo esc_url(site_url('/my-comments'));?>">Forum</a>
          <a class="logout-link" href="<?php echo wp_logout_url(get_permalink()); ?>">
            <span><?php echo get_avatar(get_current_user_id(), 14);?></span>
            <span>Log Out</span>
          </a>
          <!-- Login if user is logged out or Sign up if new user -->
        <?php } else { ?>
          <a class="login-link" href="<?php echo wp_login_url(get_permalink());?>">Login</a>
          <a class="signup-link" href="<?php echo wp_registration_url();?>">Sign Up</a>
         <?php }
        ?> 
      </div>
    </div>
  </header>
  
