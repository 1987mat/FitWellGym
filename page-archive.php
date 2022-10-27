<?php get_header(); 

while(have_posts()) {
  the_post(); ?>

  <h2>Workouts</h2>
  <p><?php the_content(); ?></p>

<?php }
?>

<?php get_footer(); ?>