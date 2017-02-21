function getImages()
{
   $.ajax(
      {
         url: 'https://api.flickr.com/services/feeds/photos_public.gne',
         dataType: 'jsonp',
         data: {'tags': $('#flickr-tag').val(), 'format': 'json'}
      })
}
function jsonFlickrFeed(json)
{
   // Empty the image feed thing.
   $('#image-feed').empty();

   //console.log(json.items);
   // Insert the images to the image feed.
   $.each(json.items, function(index, value)
   {
      //console.log(index, value.media.m);
      $('<img />').attr('src', value.media.m).addClass('flickr-image').appendTo('#image-feed');
   });
}
