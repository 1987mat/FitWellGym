<?php
  get_header();
?>

<!-- CONTACT FORM -->
<div class="contact-wrapper">
  <div class="form-container">
    <h1>Get In Touch</h1>
    <form class="contact-form">
      <input type="text" placeholder="First Name" required>
      <input type="text" placeholder="Last Name" required>
      <input type="email" placeholder="Email" required>
      <textarea rows="8" maxlength="30" placeholder="Your comments here..." required></textarea>
      <button class="submit-btn" type="submit">SUBMIT</button>
    </form>
  </div>
  <!-- MAP -->
  <h1 class="title">Meet Us</h2>
  <div class="map-wrapper">
    <div class="hours">
      <h3>Hours</h3>
      <p><i>Mon-Fri</i> 6AM-10PM</p>
      <p><i>Sat-Sun</i> 8AM-5PM</p> 
    </div>
    <div class="map-container">
      <?php
        $mymap = new Mappress_Map(array("width" => 600));
        $mypoi = new Mappress_Poi(array("title" => "500 Chestnut St", "body" => "Independence National Park, Philadelphia, PA<br/>19106", "point" => array("lat" => 39.948712,"lng" => -75.15001)));
        $mymap->pois = array($mypoi); 
        echo $mymap->display();
      ?>
    </div>
  </div>
</div>

<?php
  get_footer();
?>




