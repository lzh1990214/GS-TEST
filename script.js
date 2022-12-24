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
var useEl = $('#use');
var singleCategoryArr = [];
var hangingPlantsArr = [];
var fernPlantsArr = [];
var cactusPlantsArr = [];
var flowerPlantsArr = [];
var foliagePlantsArr = [];
var palmPlantsArr = [];

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
        // console.log(data);
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

            // push hanging category in hangingPlants Array (ZL)
            if (data[i]['Categories'] === 'Hanging') {
                hangingPlantsArr.push(data[i]);
            }
            else if (data[i]['Categories'] === 'Fern') {
                fernPlantsArr.push(data[i]);
            }
            else if (data[i]['Categories'] === 'Cactus & Succulent') {
                cactusPlantsArr.push(data[i]);
            }
            else if (data[i]['Categories'] === 'Flower') {
                flowerPlantsArr.push(data[i]);
            }
            else if (data[i]['Categories'] === 'Foliage plant') {
                foliagePlantsArr.push(data[i]);
            }
            else if (data[i]['Categories'] === 'Palm') {
                palmPlantsArr.push(data[i]);
            };


        };

        // this works (double-checked), can see 355 objects in an array (in global scope)
        console.log(getAllImages);
        // console.log(fernPlantsArr);
        // console.log(cactusPlantsArr);
        console.log(flowerPlantsArr);
        // console.log(foliagePlantsArr);
        // console.log(palmPlantsArr);

    })

    .catch(function (err) {
        console.error(err);
    });


// filter.click(function (e) {
//     categoryFilter.show();
// });

// modified filter code to hide and show by clicking the same button (ZL)
filter.click(function (e) {
    e.preventDefault();
    var filterDisplay = document.getElementById('filter-box').style.display;
    if (filterDisplay === 'none') {
        $('#filter-box').attr('style', 'display:show');
        $('#homepage-spacer-btm').attr('style', 'display:none');
        
    } else {
        $('#filter-box').attr('style', 'display:none');
        $('#plant-card-container').empty();
        $('#result-number-text').text('');
        $('#homepage-spacer-btm').attr('style', 'display:show');
        $('#img-plant-row').attr('style', 'display:show');
        // reset the plants name array to include all plants for search input
        allPlantsInThisCategory(allPlantsCommonLatinNames);
    };


})





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
    // remove all child nodes under section #plant-card-container
    $('#plant-card-container').empty();
    // hide decoration image below
    $('#img-plant-row').attr('style', 'display:none');
    // assign category array to a new array for running shared functions under each category 
    singleCategoryArr = hangingPlantsArr;
    // display the number of plants under selected category
    showResultText();
    // show all cards under selected category
    showSingleCategoryCard();
    allPlantsInThisCategory(hangingPlants);
});


fernButton.click(function (e) {
    e.preventDefault();
    // added code (ZL)
    $('#plant-card-container').empty();
    $('#img-plant-row').attr('style', 'display:none');
    singleCategoryArr = fernPlantsArr;
    showResultText();
    showSingleCategoryCard();

    allPlantsInThisCategory(fernPlants);
});
succulentButton.click(function (e) {
    e.preventDefault();
    // added code (ZL)
    $('#plant-card-container').empty();
    $('#img-plant-row').attr('style', 'display:none');
    singleCategoryArr = cactusPlantsArr;
    showResultText();
    showSingleCategoryCard();

    allPlantsInThisCategory(cactussucculentPlants);
});
flowerButton.click(function (e) {
    e.preventDefault();
    // added code (ZL)
    $('#plant-card-container').empty();
    $('#img-plant-row').attr('style', 'display:none');
    singleCategoryArr = flowerPlantsArr;
    showResultText();
    showSingleCategoryCard();

    allPlantsInThisCategory(flowerPlants);
});
foliagePlantButton.click(function (e) {
    e.preventDefault();
    // added code (ZL)
    $('#plant-card-container').empty();
    $('#img-plant-row').attr('style', 'display:none');
    singleCategoryArr = foliagePlantsArr;
    showResultText();
    showSingleCategoryCard();

    allPlantsInThisCategory(foliagePlants);
});
palmButton.click(function (e) {
    e.preventDefault();
    // added code (ZL)
    $('#plant-card-container').empty();
    $('#img-plant-row').attr('style', 'display:none');
    singleCategoryArr = palmPlantsArr;
    showResultText();
    showSingleCategoryCard();

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
            console.log(data[0]);
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
            tempMax.text('Max ' + data[0].tempmax.celsius + '\xB0' + 'C');
            tempMin.text('Min ' + data[0].tempmin.celsius + '\xB0' + 'C');
            idealLight.text(data[0].ideallight);
            toleratedLight.text(data[0].toleratedlight);
            watering.text(data[0].watering);
            useEl.text(data[0].use[0]);
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

$('#plant-card-container').click(function (e) {
    e.preventDefault();
    var cardPlantID;
    if (e.target.tagName === 'IMG') {
        cardPlantID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        showInfoByID(cardPlantID);
        plantDetails.addClass('is-active');
    };
    // console.log(cardPlantID);
    // fetchByID(cardPlantID);

});


function showSingleCategoryCard() {
    for (var i = 0; i < singleCategoryArr.length; i++) {
        $('<section class="column is-4"><section class="card"></section></section>').appendTo('#plant-card-container');
        var imageCard = document.getElementById('plant-card-container');

        $(imageCard.children[i]).attr('id', singleCategoryArr[i].id);
        $('<div class="card-image"><figure class="result-image image is-4by3"><img></figure></div>').appendTo(imageCard.children[i].children[0]);
        var imgCardEl = $('#plant-card-container img');
        $(imgCardEl[i]).attr('src', singleCategoryArr[i].img);
        $('<div class="card-content"><div class="media"><div class="media-content"><p class="title is-4"></p></div></div></div>').appendTo(imageCard.children[i].children[0]);
        var imgCardTitle1 = $('#plant-card-container p');
        if (singleCategoryArr[i]['Common name'] !== null) {
            $(imgCardTitle1[i]).text(singleCategoryArr[i]['Common name'][0]);
        } else {
            $(imgCardTitle1[i]).text(singleCategoryArr[i]['Latin name']);
        };
    };
    for (var i = 0; i < singleCategoryArr.length; i++) {
        $('<p class="subtitle is-6"></p>').insertAfter(imgCardTitle1[i]);
        $(imgCardTitle1[i].parentNode.children[1]).text(singleCategoryArr[i]['Latin name']);
    };
}


function showInfoByID(cardPlantID) {
    for (var i = 0; i < singleCategoryArr.length; i++) {
        if (cardPlantID === singleCategoryArr[i].id) {
            plantImage.attr('src', singleCategoryArr[i].img);
            // if a plant doesn't have common name, show latin name
            if (singleCategoryArr[i]['Common name'] !== null) {
                common.text(singleCategoryArr[i]['Common name'][0]);
            } else {
                common.text(singleCategoryArr[i]['Latin name']);
            };
            family.text(singleCategoryArr[i]['Family']);
            category.text(singleCategoryArr[i]['Categories']);
            origin.text(singleCategoryArr[i]['Origin'].join());
            latin.text(singleCategoryArr[i]['Latin name']);
            climate.text(singleCategoryArr[i]['Climat']);
            tempMax.text('Max ' + singleCategoryArr[i]['Temperature max']['C'] + '\xB0' + 'C');
            tempMin.text('Min ' + singleCategoryArr[i]['Temperature min']['C'] + '\xB0' + 'C');
            idealLight.text(singleCategoryArr[i]['Light ideal']);
            toleratedLight.text(singleCategoryArr[i]['Light tolered']);
            watering.text(singleCategoryArr[i]['Watering']);
            useEl.text(singleCategoryArr[i]['Use'][0]);
        };
    };
}

function showResultText() {
    var resultNumberText = "We've found " + singleCategoryArr.length + " " + "plants under " + '"' + singleCategoryArr[0]['Categories'] + '"' + " category:";
    $('#result-number-text').text(resultNumberText);
    $('#homepage-spacer-btm').attr('style', 'display:none');
}














// fetchByID()  "placeholder code"
// function to fetch by ID
// function fetchByID(cardPlantID) {
//     var fetchPlantID = cardPlantID;
//     fetch(`https://house-plants2.p.rapidapi.com/${fetchPlantID}`, options2)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             // var imagesourcelink;
//             console.log(data);
//             plantImage.attr('src', data.img);
//             common.text(data['Common name'][0]);
//             family.text(data['Family']);
//             category.text(data['Categories']);
//             origin.text(data['Origin'].join());
//             latin.text(data['Latin name']);
//             climate.text(data['Climat']);
//             tempMax.text(data['Temperature max']['C']);
//             tempMin.text(data['Temperature min']['C']);
//             idealLight.text(data['Light ideal']);
//             toleratedLight.text(data['Light tolered']);
//             watering.text(data['Watering']);
//             useEl.text(data['Use'][0]);
//         })
//         .catch(function (err) {
//             console.error(err);
//         });
// };



















