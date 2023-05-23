<?php
  get_header();
?>

<!-- CONTACT FORM -->
<div class="contact-wrapper">
  <div class="form-container">
    <h1>Get In Touch</h1>
    <form class="contact-form">
      <div class="form-controls">
        <label for="first_name">First Name</label>
        <input type="text" id="first_name" required>
      </div>
      <div class="form-controls">
        <label for="last_name">Last Name</label>
        <input type="text" id="last_name" required>
      </div>
     <div class="form-controls">
       <label for="email">Email</label>
       <input type="email" id="email" required>
     </div>
     <div class="form-controls">
      <label for="message">Message</label>
      <textarea id="message" rows="8" maxlength="30" required></textarea>
     </div>
     <input type="submit" class="submit-btn"></input>
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




