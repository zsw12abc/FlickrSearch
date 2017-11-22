$("#search").click(function () {
    $("#results").empty();
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: $("#searchterm").val(),
            tagmode: "any",
            format: "json"
        },
        function (data) {
            $.each(data.items, function (i, item) {
                var img = $("<img>").attr("src", item.media.m).addClass("card-img-top");
                var authorString = item.author.split("(")[1];
                var authorFinal = authorString.substring(1, authorString.length - 2);
                var tagArray = item.tags.split(" ");
                var tagFinalArray = new Array();
                for (var j = 0; j < tagArray.length; j++) {
                    var obj = "#" + tagArray[j];
                    // console.log(obj);
                    tagFinalArray.push(obj);
                }
                var tagFinal = tagFinalArray.join(" ");
                // console.log(tagFinalArray);

                var author = $("<h4>").addClass("card-title").text("Author: " + authorFinal);
                var tags = $("<p>").addClass("card-text").text(tagFinal);
                var btnLink = $("<a>").addClass("btn btn-primary").attr("href", item.link).text("See It");
                var boxBody = $("<div>").addClass("card-body").append(author, tags, btnLink);
                var itemBox = $("<div>").addClass("card col-4").append(img, boxBody);
                $("#results").append(itemBox);
                // console.log(i);
                // if (i > 100) return false;
            });
        });
});
