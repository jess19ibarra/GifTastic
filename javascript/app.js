$(document).ready(function () {

    var cities = ["Dallas", "Denver", "New York", "Los Angeles", "Las Vegas", "Seattle", "Miami", "New Orleans", "Chicago",];

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }

    }

    $(document).on("click", ".city-button", function () {
        $("#cities").empty();
        $(".city-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=UWSo35bbe4GLQjJaHs7DwM2UoVVcOWzh&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var cityDiv = $("<div class=\"city-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var cityImage = $("<img>");
                    cityImage.attr("src", still);
                    cityImage.attr("data-still", still);
                    cityImage.attr("data-animate", animated);
                    cityImage.attr("data-state", "still");
                    cityImage.addClass("city-image");

                    cityDiv.append(p);
                    cityDiv.append(cityImage);

                    $("#cities").append(cityDiv);
                }
            });
    });

    $(document).on("click", ".city-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-city").on("click", function (event) {
        event.preventDefault();
        var newCity = $("input").eq(0).val();

        if (newCity.length > 2) {
            cities.push(newCity);
        }

        populateButtons(cities, "city-button", "#city-buttons");

    });

    populateButtons(cities, "city-button", "#city-buttons");
});
