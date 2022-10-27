<?php 
  get_header();
?>

<div class="posts-container">

  <?php 
    pageBanner(array(
      'title' => 'Classes',
      'subtitle' => 'Pick Your Favourite Class.'
    ));
  ?>

  <div class="classes-container">
    <?php 
      // Create custom query for Class posts
      $classes = new WP_Query(array(
        'post_per_page' => -1,
        'post_type' => 'class',
        'orderby' => 'title',
        'order' => 'ASC'
      ));

      while($classes->have_posts()) {
        $classes->the_post(); 
        $sub = get_post_meta($post->ID, 'subtitle', TRUE);
        echo $sub;
        $classTitle = lcfirst(get_the_title());
        ?>

        <a class="single-class-wrapper" href="<?php the_permalink();?>">
          <div class="single-class <?php echo $classTitle; ?>"></div>            
          <h3><?php the_title(); ?></h3> 
        </a>

      <?php } 
      ?>
  </div>
</div>

<?php 
  get_footer(); 
?>
