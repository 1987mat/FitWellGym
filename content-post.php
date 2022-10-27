<div class="single-post">
  <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
  <div class="metabox">
    Posted by <?php the_author_posts_link(); ?> on <?php the_time('n.d.y'); ?> in <?php echo get_the_category_list(', '); ?>
  </div>
  <div class="generic-content">
    <?php the_excerpt(); ?>
    <a href="<?php the_permalink(); ?>">Continue reading &raquo;</a>
  </div>
</div>