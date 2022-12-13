
<?php 
  get_header(); 
?>

<main class="main-body-content">
  <section class="heading-section">
    <div class="heading" data-observe>
    
        <h1>Helping you reach your fitness goals.</h1>
        <h2>Ready to get in shape?</h2>
        <a href="#classes" class="hero-btn">CLASSES</a>
      
    </div>
  </section>

  <section class="history-section">
    <h2 data-observe>Our Story</h2>
    <div class="our-history" data-observe>
      <?php
        $img_src = get_template_directory_uri() . '/images/history-img.jpg';
      ?>
      <img src="<?php echo $img_src ?>">
      <div class="text-content">
        <p>Fit&Well gym was established in 2005. The founder, M.R., is a professional fitness trainer with decades of experience in the field. </p>
        <p>Our facility offers various <a href="#classes">classes</a> and <a href="#workout-programs">programs</a>. We are so thrilled to welcome you and get started on your fitness journey!</p>
      </div>    
    </div>
  </section>

  <section class="homepage-classes" id="classes">
    <h2 data-observe>Classes</h2>
    <div class="classes-container" data-observe>
      <?php 
          // Create custom query for Class posts
          $homepageClasses = new WP_Query(array(
            'post_per_page' => -1,
            'post_type' => 'class',
            'orderby' => 'title',
            'order' => 'ASC'
          ));

          // Show class posts in the front page
          while($homepageClasses->have_posts()) {
            $homepageClasses->the_post(); 
            $classTitle = lcfirst(get_the_title());
            ?>

            <!-- Have different classes based on post title -->
            <a class="single-class <?php echo $classTitle; ?>" href="<?php echo get_post_type_archive_link('class'); ?>">              
            <h4><?php the_title(); ?></h4> 
            </a>

          <?php } 
          wp_reset_postdata();
          ?>
    </div>
  </section>

  <section class="homepage-workouts" id="workout-programs">
    <h2 data-observe>Workout Plans</h2>
    <div class="workout-heading" data-observe>  
      <a href="<?php echo get_post_type_archive_link('workout'); ?>">View More</a>
    </div>
  </section>

  <section class="homepage-events"> 
    <div class="events-heading" data-observe>
      <a href="<?php echo get_post_type_archive_link('event'); ?>">Events & More</a>
    </div>
  </section>

  <section class="homepage-feeds"> 
    <h2 data-observe>Follow Us!</h2>
    <div class="social-media-container" data-observe>
      <a href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook-official"></i></a>
      <a href="https://www.instagram.com" target="_blank"><i class="fa fa-instagram"></i></a>
      <a href="https://twitter.com" target="_blank"><i class="fa fa-twitter"></i></a>
      <a href="https://pinterest.com" target="_blank"><i class="fa fa-pinterest"></i></a>
    </div>
    <div class="feed-container" data-observe>

      <?php 
        $src1 = get_template_directory_uri() . '/images/feed1.jpg';
        $src2 = get_template_directory_uri() . '/images/feed2.jpg';
        $src3 = get_template_directory_uri() . '/images/feed3.jpg';

        $images = array($src1, $src2, $src3);
        
        for ($x = 0; $x < count($images); $x++) {
        ?>
          <img src="<?php echo $images[$x];?>">
        <?php 
        }
      ?>
    </div>
  </section>
</main>

<?php 
  get_footer(); 
?>


