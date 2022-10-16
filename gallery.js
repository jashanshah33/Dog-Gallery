var dropdown = $('#breed');
var breed;

$.get("https://dog.ceo/api/breeds/list/all", 
function (data) {
    let breeds = data.message
    for (const breed in breeds) {
        dropdown.append(`
       <option id="breedValue" value="${breed}">${breed}</option>
       `)
    }
},

);

dropdown.change(function () { 
    let breed = dropdown.val();
    let url = "https://dog.ceo/api/breed/" + breed + "/list";

    $("#dog-sub-breeds").remove();

        $.get(url, function (data) {
            if (data.message.length !== 0 ) {
                let subBreeds = data.message;

                dropdown.after(`<select id="dog-sub-breeds"> </select>`);
                var sunDropdown = $('#dog-sub-breeds') 

                for (const sunBreed of subBreeds) {
                    sunDropdown.append(`<option id="breedValue" value="${sunBreed}">${sunBreed}</option> `)

                }
            } 
        })

    
});


$('#img-btn').click(function (e) {
    e.preventDefault();

    $('#bottom img').remove();

    let breed = dropdown.val();
    let subBreed = $("#dog-sub-breeds").val();

    let url = "https://dog.ceo/api/breed/" + breed;
    if(subBreed !== undefined) {
        url += "/" + subBreed
    }   
    
        url += "/images";
        
    
    $.get(url, function (data) {
        let imagesUrl = data.message;

        for (let imageUrl of imagesUrl) {
            $('#bottom').append('<img src="' + imageUrl + '" alt="' + breed + '">');
        }
    });
})
