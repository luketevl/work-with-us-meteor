Template.siteSlider.onRendered(function() {
  $(".owl-carousel").owlCarousel({
    navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      stopOnHover : true,
      transitionStyle:"fade",
      autoPlay : 3000,
  });
});
