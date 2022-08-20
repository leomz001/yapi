
function keyWordsearch(){

        $(".loader").show();
        gapi.client.setApiKey("AIzaSyAaImzZRaLLgU-htsBbKDa7-tUzZQ-2XRI");
        gapi.client.load('youtube', 'v3', function() {
            makeRequest();
        });
    }




function makeRequest(page) {

        var q = $('#query').val();
        var request = gapi.client.youtube.search.list({
            q: q,
            part: 'snippet',
            maxResults: 10,
            pageToken: page
        });


        request.execute(function(response)  {

            var nextpage = response.nextPageToken;
            var prevpage = response.prevPageToken;

            $("#prev").click(function(){
                $(".loader").show();
                makeRequest(prevpage);
                $("body").scrollTop(0);
                $(".loader").fadeOut("slow");

            });
            $("#next").click(function(){
                $(".loader").show();
                makeRequest(nextpage);
                $("body").scrollTop(0);
                $(".loader").fadeOut("slow");
            });


            $('#results').empty();
            var srchItems = response.result.items;

            $.each(srchItems, function(index, item) {



                vidTitle = item.snippet.title;
                vidId = item.id.videoId;
                vidDescription = item.snippet.description;
                console.log(response);

                $('#results').append('<div class="videos"><h2 class="title">'+vidTitle + '</h2> <h3 class="descript">'+'Description:  <br/>'+vidDescription +'</h3> <div class="embed-responsive embed-responsive-16by9"> <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/'+vidId +'"</iframe></div></div></div>');
                $(".nextpr").css('display', 'inline');
                setTimeout(function(){ $(".loader").fadeOut("slow"); }, 1000);

            })
        });


    }



