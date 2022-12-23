var plantName = $('#search-input');
var filter = $('#filter-btn');
var search = $('#search-btn');
var categoryFilter = $('#filter-box');
var commonNamesList = $('#commonnameslist');
var searchButton = $('#search');
var plantDetails = $('#plantdetails');
var family = $('#family');
var common = $('#commonname');
var category = $('#category');
var origin = $('#origin')
var latin = $('#latinname');
var climate = $('#climate');
var tempMax = $('#tempmax');
var tempMin = $('#tempmin');
var idealLight = $('#ideallight');
var toleratedLight = $('#toleratedlight');
var watering = $('#watering');
var hangingButton = $('#hanging')
var fernButton = $('#fern');
var succulentButton = $('#succulent');
var flowerButton = $('#flower');
var foliagePlantButton = $('#foliagePlant');
var palmButton = $('#palm');
var plantImage = $('#plantimage');
var allPlantsCommonLatinNames = [];
var hangingPlants = [];
var fernPlants = [];
var cactussucculentPlants = [];
var flowerPlants = [];
var foliagePlants = [];
var palmPlants = [];
var listItem = $('<li>');
var getAllImages = [];
var imglatin = new Object();
var imgSourceArray = [];
// Array by ZL
var hangingPlantsArr = [];

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a9893fa65emsh05499dc68ccba82p199e67jsnbfdbb0594c96',
        'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
    }
};

const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a9893fa65emsh05499dc68ccba82p199e67jsnbfdbb0594c96',
        'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
    }
};

// fetch all plants data from API-2
fetch(`https://house-plants2.p.rapidapi.com/`, options2)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            // var plantID = data[i].id;
            // var commonNameA2;

            var secondLatin = data[i]['Latin name'];
            // if (data[i]['Common name'] !== null) {
            //     commonNameA2 = data[i]['Common name'][0];
            // } else {
            //     commonNameA2 = secondLatin;
            // }
            // console.log(commonNameA2);
            secondLatin = secondLatin.split('\'')[0];
            secondLatin = secondLatin.split(' ').join('');
            var imglink = data[i].img;
            imglatin = {
                // plantID: plantID,
                // commonName: commonNameA2,
                latinname: secondLatin,
                imgsource: imglink
            };
            // push each object comtaining common name, latin name and image link to an array
            getAllImages.push(imglatin);
            // push hanging category in hangingPlants Array (length =24)
            if (data[i]['Categories'] === 'Hanging') {
                hangingPlantsArr.push(data[i]);
            };

        };

        // this works (double-checked), can see 355 objects in an array (in global scope)
        console.log(getAllImages);
 
    })

    .catch(function (err) {
        console.error(err);
    });


filter.click(function (e) {
    categoryFilter.show();
});





function getAllCommonNames() {
    fetch('https://house-plants.p.rapidapi.com/all', options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                var category = data[i].category;
                var latinName = data[i].latin;
                allPlantsCommonLatinNames.push(data[i].common + "(" + latinName + ")");
                switch (category) {
                    case 'Hanging':
                        hangingArray(data[i].common, latinName);
                        break;
                    case 'Fern':
                        fernArray(data[i].common, latinName);
                        break;
                    case 'Cactus & Succulent':
                        cactussucculentArray(data[i].common, latinName);
                        break;
                    case 'Flower':
                        flowerArray(data[i].common, latinName);
                        break;
                    case 'Foliage plant':
                        foliageArray(data[i].common, latinName);
                        break;
                    case 'Palm':
                        palmArray(data[i].common, latinName);
                        break;
                }
            }

            // console.log(allPlantsCommonLatinNames);
        })
        .catch(function (err) {
            console.error(err);
        });
};

getAllCommonNames();



plantName.keyup(allPlantsInThisCategory(allPlantsCommonLatinNames));

function hangingArray(hanging, latin) {
    for (var j = 0; j < hanging.length; j++) {
        hangingPlants.push(hanging[j] + "(" + latin + ")");
    }

}
function fernArray(fern, latin) {
    for (var j = 0; j < fern.length; j++) {
        fernPlants.push(fern[j] + "(" + latin + ")");
    }
}
function cactussucculentArray(cactussucculent, latin) {
    for (var j = 0; j < cactussucculent.length; j++) {
        cactussucculentPlants.push(cactussucculent[j] + "(" + latin + ")");
    }
}
function flowerArray(flower, latin) {
    for (var j = 0; j < flower.length; j++) {
        flowerPlants.push(flower[j] + "(" + latin + ")");
    }
}
function foliageArray(foliage, latin) {
    for (var j = 0; j < foliage.length; j++) {
        foliagePlants.push(foliage[j] + "(" + latin + ")");
    }
}
function palmArray(palm, latin) {
    for (var j = 0; j < palm.length; j++) {
        palmPlants.push(palm[j] + "(" + latin + ")");
    }
}

// click event for hanging button
hangingButton.click(function (e) {
    e.preventDefault();
    // show all image cards under this category
    for (var i = 0; i < hangingPlantsArr.length; i++) {
        $('<section class="column is-4"><section class="card"></section></section>').appendTo('#plant-card-container');
        var imageCard = document.getElementById('plant-card-container');

        $(imageCard.children[i]).attr('plant-id', hangingPlantsArr[i].id);
        $('<div class="card-image"><figure class="result-image image is-4by3"><img></figure></div>').appendTo(imageCard.children[i].children[0]);
        var imgCardEl = $('#plant-card-container img');
        $(imgCardEl[i]).attr('src', hangingPlantsArr[i].img);
        $('<div class="card-content"><div class="media"><div class="media-content"><p class="title is-4"></p></div></div></div>').appendTo(imageCard.children[i].children[0]);
        var imgCardTitle1 = $('#plant-card-container p');
        if (hangingPlantsArr[i]['Common name'] !== null) {
            $(imgCardTitle1[i]).text(hangingPlantsArr[i]['Common name'][0]);
        } else {
            $(imgCardTitle1[i]).text(hangingPlantsArr[i]['Latin name']);
        };
    };

    for (var i = 0; i < hangingPlantsArr.length; i++) {
        $('<p class="subtitle is-6"></p>').insertAfter(imgCardTitle1[i]);
        $(imgCardTitle1[i].parentNode.children[1]).text(hangingPlantsArr[i]['Latin name']);
    }

    allPlantsInThisCategory(hangingPlants);
});


fernButton.click(function (e) {
    e.preventDefault();
    allPlantsInThisCategory(fernPlants);
});
succulentButton.click(function (e) {
    e.preventDefault();
    allPlantsInThisCategory(cactussucculentPlants);
});
flowerButton.click(function (e) {
    e.preventDefault();
    allPlantsInThisCategory(flowerPlants);
});
foliagePlantButton.click(function (e) {
    e.preventDefault();
    allPlantsInThisCategory(foliagePlants);
});
palmButton.click(function (e) {
    e.preventDefault();
    allPlantsInThisCategory(palmPlants);
});


function allPlantsInThisCategory(currentCategoryArray) {
    plantName.keyup(function (e) {
        plantImage.attr('src', '');
        family.text('');
        common.text('');
        category.text('');
        origin.text('');
        latin.text('');
        climate.text('');
        tempMax.text('');
        tempMin.text('');
        idealLight.text('');
        toleratedLight.text('');
        watering.text('');

        $('li').each(function () {
            $(this).remove();
        });

        var name = $(this).val().toLowerCase();
        for (i = 0; i < currentCategoryArray.length; i++) {
            var commonName = currentCategoryArray[i].toLowerCase();
            if (commonName.startsWith(name) && name != '') {
                var listItem = $('<li>');
                listItem.text(currentCategoryArray[i]);
                commonNamesList.append(listItem);
                // when click outside of the search list, the search list will be closed
                $(document).click(function (e) {
                    e.preventDefault();
                    if (e.target !== 'li') {
                        $('li').remove();
                    };
                });
                // when select one plant in the list, the plant name will be displayed on the search box
                $('li').click(function () {
                    plantName.val($(this).text());
                    $('li').remove();
                });
            }
        }
    });
}

search.click(function (e) {
    e.preventDefault();
    var name = plantName.val();
    retrievePlantInfo(name);
    plantDetails.addClass('is-active');
});

function retrievePlantInfo(name) {
    var commonName = name.split('(')[0];
    var latinName = name.split('(')[1];
    latinName = latinName.split(' ').join('');
    latinName = latinName.slice(0, -1);

    fetch(`https://house-plants.p.rapidapi.com/latin/${latinName}`, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var imagesourcelink;
            for (var i = 0; i < getAllImages.length; i++) {
                if (latinName.toLowerCase() === getAllImages[i].latinname.toLowerCase()) {
                    imagesourcelink = getAllImages[i].imgsource;
                }
            }
            plantImage.attr('src', imagesourcelink);
            common.text(commonName);
            family.text(data[0].family);
            category.text(data[0].category);
            origin.text(data[0].origin);
            latin.text(data[0].latin);
            climate.text(data[0].climate);
            tempMax.text(data[0].tempmax.celsius);
            tempMin.text(data[0].tempmin.celsius);
            idealLight.text(data[0].ideallight);
            toleratedLight.text(data[0].toleratedlight);
            watering.text(data[0].watering);
        })
        .catch(function (err) {
            console.error(err);
        });
};


$('#delete-btn').click(function (e) {
    e.preventDefault();
    plantDetails.removeClass('is-active');
});

$('#plant-cancel-btn').click(function (e) {
    e.preventDefault();
    plantDetails.removeClass('is-active');
});


// fetchByID()
// function to fetch by ID
function fetchByID() {
    var singlePlantID = '53417c12-4824-5995-bce0-b81984ebbd1d';

    fetch(`https://house-plants2.p.rapidapi.com/${singlePlantID}`, options2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // var imagesourcelink;
            console.log(data);
            // plantImage.attr('src', imagesourcelink);
            // common.text(commonName);
            // family.text(data[0].family);
            // category.text(data[0].category);
            // origin.text(data[0].origin);
            // latin.text(data[0].latin);
            // climate.text(data[0].climate);
            // tempMax.text(data[0].tempmax.celsius);
            // tempMin.text(data[0].tempmin.celsius);
            // idealLight.text(data[0].ideallight);
            // toleratedLight.text(data[0].toleratedlight);
            // watering.text(data[0].watering);
        })
        .catch(function (err) {
            console.error(err);
        });
};



















