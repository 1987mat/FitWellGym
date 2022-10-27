<?php

get_header();

while(have_posts()) {
  the_post(); 
  ?>
  <div class="page-container">
    <?php
      pageBanner();
    ?>

    <p class="event-time"><?php the_time('F j y'); ?></p>
    <div class="metabox">
        <a href="<?php echo get_post_type_archive_link('event'); ?>">Go Back</a>
    </div>
  
    <div class="generic-content-single-event">
      <?php the_excerpt(); ?>

      <?php
        // Create the query object for the like count
        $likeCount = new WP_Query(array(
          'post_type' => 'like',
          'meta_query' => array(
            array(
              'key' => 'liked_event_id',
              'compare' => '=',
              'value' => get_the_ID()
            )
          )
        ));

        $existStatus = 'no';

        if(is_user_logged_in()) {
          $existQuery = new WP_Query(array(
            'author' => get_current_user_id(),
            'post_type' => 'like',
            'meta_query' => array(
              array(
                'key' => 'liked_event_id',
                'compare' => '=',
                'value' => get_the_ID()
              )
            )
          ));
  
          if($existQuery->found_posts) {
            $existStatus = 'yes';
          }
        }
      ?>

      <div class="like-box" data-like = "<?php echo $existQuery->posts[0]->ID;?>" data-event ="<?php the_ID();?>" data-exist="<?php echo $existStatus; ?>">
        <div>
          <i class="fa fa-heart-o" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
        <span class="like-count"><?php echo $likeCount->found_posts; ?></span>  
      </div>
    </div>

    <?php 
      // Get the 'Event' Pod
      $pod = pods( 'event', get_the_id() );
      // Get the related field related_workouts
      $relatedWorkouts = $pod->field( 'related_workouts' );

      // If the array is not empty
      if ( ! empty( $relatedWorkouts ) ) {

        echo '<h2>Related Workouts</h2>';
        echo '<ul class="link-list">';
        foreach ( $relatedWorkouts as $rel ) {
          // Get the ID 
          $id = $rel[ 'ID' ];
          ?>
          <li>
            <a class="related-post" href="<?php echo get_permalink( $id ) ?>">
              <div class="related-post-container">
                <img class="post-image" src="<?php echo get_the_post_thumbnail_url($id);?>">
                <div class="text-overlay">
                  <h3 class="post-title"><?php echo get_the_title($id) ;?></h3>
                </div>
              </div>    
            </a>
          </li>
        <?php
        }
        echo '</ul>'; 
      }
    ?>
  </div>
<?php 
} 

  get_footer();
