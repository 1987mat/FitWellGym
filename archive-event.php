<?php 
  get_header(); 
?>

<div class="posts-container"> 
  <?php pageBanner(array(
    'title' => 'Upcoming Events',
    'subtitle' => 'Come join us!'
  ));  ?>
  <p><?php the_archive_description(); ?></p>

  <div class="page-container"> 
    
    <?php 
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
          )
        )
      ));

      while($events->have_posts()) {
        $events->the_post();
        get_template_part('content', 'event');   
      } 
      echo paginate_links();
      ?> 
    <hr>
    <p>Looking for a recap of past events? Check out our <a href="<?php echo site_url('/past-events');?>" class="past-events-link">past events!</a></p>
  </div>
</div>

<?php 
  get_footer(); 
?> 