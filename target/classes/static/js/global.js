$(document).ready(function(){

    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e){
            if (e < onStar) {
                $(this).addClass('hover');
            }
            else {
                $(this).removeClass('hover');
            }
        });

    }).on('mouseout', function(){
        $(this).parent().children('li.star').each(function(e){
            $(this).removeClass('hover');
        });
    });

    /* 2. Action to perform on click */
    $('#stars li').on('click', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');

        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }

        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        $('#rate_star').val(onStar);
    });

    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
                history.replaceState({}, document.title, window.location.href.substr(0, window.location.href.indexOf('#')));
            });
        } // End if
    });

});

$(".modal").on("hidden.bs.modal", function(){
    var stars = $($('#stars li')).parent().children('li.star');
    for (i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
    }
    $('#rate_star').val('');
    $('#rate_name').val('');
    $('#rate_title').val('');
    $('#rate_message').val('');
    $('#rate_message').css('border', '');
    $("#rate_message").attr('class', 'form-control');
});

function senMail() {
    if ($('#rate_message').val().trim() === '') {
        $('#rate_message').css('border', 'solid red 1px');
        return;
    }
    var sentObject = {};
    sentObject["rate_star"] = $('#rate_star').val();
    sentObject["rate_name"] = $('#rate_name').val();
    sentObject["rate_title"] = $('#rate_title').val();
    sentObject["rate_message"] = $('#rate_message').val();
    $('#rateModal').modal('toggle');
    $('#successModal').modal('toggle');
    $.ajax(
        {
            async: true,
            url: "send/mail",
            type: "POST",
            data: JSON.stringify(sentObject),
            contentType: "application/json",
            success: function (data, status, xhr)
            {

            },
            error: function (XMLHttpRequest, textStatus, errorThrown)
            {

            }
        }
    )
}

function checkMessage() {
    if ($('#rate_message').val().trim() === '') {
        $('#rate_message').css('border', 'solid red 1px');
        return;
    } else {
        $('#rate_message').css('border', '');
        $("#rate_message").attr('class', 'form-control');
    }
}