<div class="single-event">
  <div class="date-container">
    <!-- Show date from Pods custom field -->
    <p><?php echo get_post_meta( get_the_ID(), 'event_date', true );?></p>
  </div>
  <div class="event-info">
    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    <div class="generic-content-events">
      <?php the_excerpt(); ?>
      <p class="continue-reading-link"><a href="<?php the_permalink(); ?>">Continue reading &raquo;</a></p>
    </div>
  </div>
</div>
