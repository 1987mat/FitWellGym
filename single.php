<?php

get_header();

while(have_posts()) {
  the_post(); ?>

  <div class="page-container-single-post">
    <h2><?php the_title();?></h2>

    <div class="metabox-blog-post">
        <a class="blog-home" href="<?php echo site_url('/blog'); ?>">Blog Home</a>
        <p>Posted by <strong><?php the_author_posts_link(); ?></strong> on <?php the_time('n.d.y'); ?> in <i><?php echo get_the_category_list(', '); ?></i></p>
    </div>
  
    <div class="generic-content">
      <?php the_content(); ?>
    </div>

  </div>

<?php } 


get_footer();
