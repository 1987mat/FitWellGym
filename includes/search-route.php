<?php

// Customize search url
function registerSearch() {
  register_rest_route('fitness/v1', 'search', array(
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => 'searchResults'
  ));
}

function searchResults($data) {
  // Create main query with all post types
  $mainQuery = new WP_Query(array(
    'post_type' => array('post', 'page', 'class', 'workout', 'event'),
    's' => sanitize_text_field($data['term'])
  ));

  // Create empty arrays for every post type
  $results = array(
    'generalInfo' => array(),
    'classes' => array(),
    'workouts' => array(),
    'events' => array()
  );

  while($mainQuery->have_posts()) {
    $mainQuery->the_post();

    // Populate the arrays with the results
    if(get_post_type() == 'post' OR get_post_type() == 'page') {
      array_push($results['generalInfo'], array( 
        'title' => get_the_title(),
        'url' => get_the_permalink(),
        'postType' => get_post_type(),
        'authorName' => get_the_author()
      ));
    }

    if(get_post_type() == 'class') {
      array_push($results['classes'], array( 
        'title' => get_the_title(),
        'url' => get_the_permalink(),
        'image' => get_the_post_thumbnail_url(0, 'landscape')
      ));
    }

    if(get_post_type() == 'workout') {
      array_push($results['workouts'], array( 
        'title' => get_the_title(),
        'url' => get_the_permalink(),
        'image' => get_the_post_thumbnail_url(0, 'landscape'),
        'id' => get_the_ID()
      ));
    }

    if(get_post_type() == 'event') {
      $date = get_post_meta( get_the_ID(), 'event_date', true );

      array_push($results['events'], array( 
        'title' => get_the_title(),
        'url' => get_the_permalink(),
        'date' => $date
      ));
    } 
  }

  // If the array is not empty, show related posts on search
  if($results['workouts']) {
    $relationshipMetaQuery = array('relation' => 'OR');

    foreach($results['workouts'] as $item) {
      array_push($relationshipMetaQuery, array(
        'key' => 'related_workouts',
        'compare' => 'LIKE',
        'value' => get_the_ID()
      ));
    }
  
    $relationshipQuery = new WP_Query(array(
      'post_type' => array('class', 'event'),
      'meta_query' => $relationshipMetaQuery
    ));
  
    while($relationshipQuery->have_posts()) {
      $relationshipQuery->the_post();

      if(get_post_type() == 'event') {
        $date = get_post_meta( get_the_ID(), 'event_date', true );
  
        array_push($results['events'], array( 
          'title' => get_the_title(),
          'url' => get_the_permalink(),
          'date' => $date
        ));
      } 
  
      if(get_post_type() == 'class') {
        array_push($results['classes'], array( 
          'title' => get_the_title(),
          'url' => get_the_permalink(),
          'image' => get_the_post_thumbnail_url(0, 'landscape')
        ));
      }
    }
  
    // Remove duplicates from search results
    $results['classes'] =  array_values(array_unique($results['classes'], SORT_REGULAR));
    $results['events'] =  array_values(array_unique($results['events'], SORT_REGULAR));

  }
  return $results;
}

add_action('rest_api_init', 'registerSearch');
