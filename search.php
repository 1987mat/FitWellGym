<?php get_header(); ?>

<div class="blog-section"> 
  <?php 
    pageBanner(array(
      'title' => 'Search Results',
      'subtitle' => 'You searched for &ldquo;' . esc_html(get_search_query(false)) . '&rdquo;'
    ));
  ?>
</div>

<div class="page-container">

  <?php 
  if(have_posts()) {
    while(have_posts()) {
      the_post(); 
      // Show different post types dinamically
      get_template_part('content', get_post_type());   
    }
    echo paginate_links();
  } else {
    echo '<h2 class="search-headline">No results match that search.</h2>';
  }

  // Display search form
  get_search_form();
  
  ?> 
</div>

<?php 
  get_footer(); 
?> 