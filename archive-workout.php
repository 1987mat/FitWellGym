<?php 
  get_header();
?>

<div class="posts-container">
  <?php pageBanner(array(
    'title' => 'Workouts',
    'subtitle' => 'Our Most Popular Workout Plans.'
  ));
  ?>

  <div class="workout-container">
    <?php
      $workouts = new WP_Query(array(
        'post_type' => 'workout',
        'post_per_page' => 3,
        'order' => 'ASC'
      ));

    while($workouts->have_posts()) {
      $workouts->the_post();     
      ?>
        <a class="single-workout" href="<?php the_permalink();?>"> 
          <img src="<?php echo get_the_post_thumbnail_url();?>" class="workout-card-image">
          <h3><?php the_title();?></h3>
       </a>
      <?php }
      ?>     
  </div>
</div>

<?php get_footer(); ?>
