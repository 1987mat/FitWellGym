<?php get_header(); ?>

<div class="blog-section"> 
<?php 
    pageBanner(array(
      'title' => 'Past Events',
      'subtitle' => 'A recap of our past events.'
    ));
  ?>
</div>

<div class="page-container"> 
  <a href="<?php echo get_post_type_archive_link('event');?>" class="all-events-link" aria-label="all-events">All Events</a>

  <?php 
    
  $today = date('Y-m-d');
  $pastEvents = new WP_Query(array(
    // Pagination
    'paged' => get_query_var('paged', 1),
    'post_type' => 'event',
    'orderby' => 'post_date',
    'order' => 'ASC',
    // Don't show past events
    'meta_query' => array(
      array(
        'key' => 'event_date',
        'compare' => '<',
        'value' => $today,
        'type' => 'numeric'
      )
    )
  ));

  while($pastEvents->have_posts()) {
    $pastEvents->the_post(); 
    get_template_part('content', 'event');   
  }
  
  echo paginate_links(array(
    'total' => $pastEvents->max_num_pages
  ));

  ?> 

</div>


<?php get_footer(); ?> 