<?php

get_header();

while(have_posts()) {
  the_post(); 
  ?>

  <div class="page-container">

    <?php pageBanner();?>     
    
    <div class="metabox">
        <a href="<?php echo get_post_type_archive_link('workout'); ?>">All Workouts</a>
    </div>

    <div class="generic-content-single-workout">
      <?php the_post_thumbnail(); ?>
      <?php the_content();?>
    </div>  

    <hr>

    <?php
    // RELATED CLASSES
    $relatedClasses = new WP_Query(array(
      'posts_per_page' => -1,
      'post_type' => 'class',
      'orderby' => 'title',
      'order' => 'ASC',
      // Don't show past events
      'meta_query' => array(
        // Show relationship between workout post and event post
        array(
          'key' => 'related_workouts',
          'compare' => 'LIKE',
          'value' => get_the_ID()
        )
      )
    ));

    if($relatedClasses->have_posts()) {
      echo '<h2>Related ' . get_the_title() . ' Class</h2>';
      echo '<ul class="link-list">';

      while($relatedClasses->have_posts()) {
        $relatedClasses->the_post(); ?>

        <li>
          <a class="related-post" href="<?php the_permalink(); ?>">
            <div class="related-post-container">
              <img class="post-image" src="<?php echo get_the_post_thumbnail_url();?>">
              <div class="text-overlay">
                <h3 class="post-title"><?php the_title() ;?></h3>
              </div>
            </div>    
          </a>
        </li>
      <?php 
      }    
    } 

    wp_reset_postdata();

    // RELATED UPCOMING EVENTS
    $today = date('Y-m-d');
    $events = new WP_Query(array(
      'posts_per_page' => 2,
      'post_type' => 'event',
      'orderby' => 'post_date',
      'order' => 'ASC',
      // Don't show past events
      'meta_query' => array(
        array(
          'key' => 'event_date',
          'compare' => '>=',
          'value' => $today,
          'type' => 'numeric'
        ),
        // Show relationship between workout post and event post
        array(
          'key' => 'related_workouts',
          'compare' => 'LIKE',
          'value' => get_the_ID()
        )
      )
    ));

    if($events->have_posts()) {
      echo '<h2>Upcoming ' . get_the_title() . ' Events</h2>';
      while($events->have_posts()) {
        $events->the_post(); ?>

        <div class="single-event">
          <div class="date-container">
            <!-- Show date from Pods custom field -->
            <p><?php echo get_post_meta( get_the_ID(), 'event_date', true );?></p>
          </div>
          <div class="event-info">
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
          </div>
        </div>

      <?php 
      }    
    } 
  ?>
  </div>

<?php } 

get_footer();
