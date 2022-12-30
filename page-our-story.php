<?php
  get_header(); 
?>

<div class="page-container-about">

  <?php

    while(have_posts()) {
      the_post(); 
      pageBanner(); 

      $theParent = wp_get_post_parent_id(get_the_ID());
      // If the current page has a parent page show the navigation link
        if($theParent) {
          ?> 
          <div class="metabox">
            <span>Back To <a href="<?php echo get_permalink($theParent); ?>" aria-label="back-to"><?php echo get_the_title($theParent);?></a></span>
          </div>
        <?php
        } 
      ?>

      <div class="about-container">
          <img src="<?php echo get_the_post_thumbnail_url();?>" class="about-image" alt="about-image">
          <div>
            <?php the_content();?>
          </div>
      </div>
    <?php
    } 
  ?>
</div>

<?php
  get_footer();
?>



