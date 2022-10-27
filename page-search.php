<?php

  get_header();

  while(have_posts()) {
    the_post(); 
    pageBanner();
    get_search_form(); 
  } 
  get_footer();

?>




