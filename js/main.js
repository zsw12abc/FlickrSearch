$("#search").click(function () {
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: $("#searchterm").val(),
            tagmode: "any",
            format: "json"
        },
        function (data) {
            $.each(data.items, function (i, item) {
                var img = $("<img>").attr("src", item.media.m).addClass("card-img-top");
                var author = $("<h4>").addClass("card-title").text("Author: " + item.author);
                var tags = $("<p>").addClass("card-text").text("Tags: " + item.tags);
                var btnLink = $("<a>").addClass("btn btn-primary").attr("href", item.link).text("See It");
                var boxBody = $("<div>").addClass("card-body").append(author, tags, btnLink);
                var itemBox = $("<div>").addClass("card col-4").append(img, boxBody);
                $("#results").append(itemBox);
                if (i == 10) return false;
            });
        });
});
