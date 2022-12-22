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
var categories = [];
var hangingPlants = [];
var fernPlants = [];
var cactussucculentPlants = [];
var flowerPlants = [];
var foliagePlants = [];
var palmPlants = [];
var listItem = $('<li>');
var getAllImages = [];
var imglatin = new Object();

var allPlantNameArray = [];
var resultImgArray = [];


// main plant database API, need to check and update API key regularly.
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a9893fa65emsh05499dc68ccba82p199e67jsnbfdbb0594c96',
        'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
    }
};

// secondary plant data API contains plant images. Need to check and update API key regularly.
const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a9893fa65emsh05499dc68ccba82p199e67jsnbfdbb0594c96',
        'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
    }
};




fetch(`https://house-plants2.p.rapidapi.com/`, options2)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        // console.log(data);
        for (var i = 0; i < data.length; i++) {
            var secondLatin = data[i]['Latin name'];
            // console.log("secondLatin : " + secondLatin);
            // remove the cultivar name and only leave the main latin name of each plant in the data
            secondLatin = secondLatin.split('\'')[0];
            secondLatin = secondLatin.split(' ').join('');
            var imglink = data[i].img;
            // create an object to associate latin name and image link of each plant
            imglatin = {
                latinname: secondLatin,
                imgsource: imglink
            }

            // console.log("latin : " +imglatin.latinname );
            // console.log("img : " +imglatin.imgsource );
            // push each plant object to an empty array
            getAllImages.push(imglatin);
            // console.log(getAllImages.length);
        }
        console.log(getAllImages.length);
        console.log(getAllImages);
    })
    .catch(function (err) {
        console.error(err);
    });

    console.log(getAllImages.length);


for (var j = 0; j < getAllImages.length; j++) {
    console.log("latin : " + getAllImages[j].latinname);
    console.log("img : " + getAllImages[j].imgsource);
}


// displayAll();

// show hidden filter options with click. 
// Question: how to add hide() to hide filter options when clicking the same button?
filter.click(function (e) {
    categoryFilter.show();
});

getAllCommonNames();

function getAllCommonNames() {
    fetch('https://house-plants.p.rapidapi.com/all', options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                var category = data[i].category;
                var latinName = data[i].latin;
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
                };

            }

            // console.log(hangingPlants);
            // show all images of hangingPlants category

        })
        .catch(function (err) {
            console.error(err);
        });
};


function hangingArray(hanging, latin) {
    for (var j = 0; j < hanging.length; j++) {
        hangingPlants.push(hanging[j] + "(" + latin + ")");
    };
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

hangingButton.click(function (e) {
    e.preventDefault();
    // allPlantsInThisCategory(hangingPlants);

    // code to display all cards under this category(ZL)
    var name = hangingPlants;
    var imagesourcelink;
    // there are 35 names under this category
    // console.log(name);

    console.log("getall images length 1: " + getAllImages.length);
    for (var i = 0; i < name.length; i++) {
        var namehere = name[i].split('(')[1];
        namehere = namehere.split(' ').join('');
        // plant latin name as a string (no space inbetween)
        namehere = namehere.slice(0, -1);
        // console.log("latin name  Here 1: " +namehere);
        for (var x = 0; x < getAllImages.length; x++) {
            var latinName = getAllImages[x].split('(')[1];
            latinName = latinName.split(' ').join('');
            // plant latin name as a string (no space inbetween)
            latinName = latinName.slice(0, -1);

            // console.log("Latin name Here : " + latinName);
            if (namehere.toLowerCase() === getAllImages[x].latinname.toLowerCase()) {
                console.log("Image link Here 2 : ");
                imagesourcelink = getAllImages[x].imgsource;
                console.log("Image link Here : " + imagesourcelink);
                console.log("Latin Name  Here : " + name[i].toLowerCase());


                // console.log(resultImgArray);
            };
        }
        // console.log(name[i]);
        // getPlantCards(name[i]);
        // console.log(name);
        $('<section class="column is-4"><section class="card"></section></section>').appendTo('#plant-card-container');
        // console.log(cardID);
        var imageCard = document.getElementById('plant-card-container');
        // console.log(imageCard.children[i]);
        $('<div class="card-image"><figure class="result-image image is-4by3"><img></figure></div>').appendTo(imageCard.children[i]);
        var imgCardEl = $('#plant-card-container img');
        //  console.log(imgCardEl[i]);
        $(imgCardEl[i]).attr('alt', name[i]);
        // $(imgCardEl[i]).attr('src',  [i]);
    }
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
    // console.log(currentCategoryArray);
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
            // $(this).remove();
        });
        var name = $(this).val().toLowerCase();
        for (i = 0; i < currentCategoryArray.length; i++) {
            var commonName = currentCategoryArray[i].toLowerCase();
            if (commonName.startsWith(name) && name != '') {
                var listItem = $('<li>');
                listItem.text(currentCategoryArray[i]);
                commonNamesList.append(listItem);
                $('li').click(function () {
                    // show selected plant name in the dropdown list as text content inside the inputbox
                    plantName.val($(this).text());
                    // $('li').remove();
                });
            }
        }
    });
}

search.click(function (e) {
    e.preventDefault();
    var name = plantName.val();
    // name variable is the selected plant name in this format: plant name(latin name)
    retrievePlantInfo(name);
    // add "is-active" class to show plant information card
    plantDetails.addClass('is-active');
});



// function to display multiple cards(ZL)
function getPlantCards(name) {




    var commonName = name.split('(')[0];
    var latinName = name.split('(')[1];
    latinName = latinName.split(' ').join('');
    // plant latin name as a string (no space inbetween)
    latinName = latinName.slice(0, -1);

    fetch(`https://house-plants.p.rapidapi.com/latin/${latinName}`, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            var imagesourcelink;
            // console.log(getAllImages);
            // console.log(imglatin);

            for (var j = 0; j < getAllImages.length; j++) {
                if (latinName.toLowerCase() === getAllImages[j].latinname.toLowerCase()) {
                    imagesourcelink = getAllImages[j].imgsource;


                    // console.log(resultImgArray);
                };
            }

            // $('#plant-card-container img').children[i].attr('src', imagesourcelink);

            // plantImage.attr('src', imagesourcelink);
            // console.log(commonName);
            // console.log(latinName);
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



function retrievePlantInfo(name) {
    var commonName = name.split('(')[0];
    var latinName = name.split('(')[1];
    latinName = latinName.split(' ').join('');
    // plant latin name as a string (no space inbetween)
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
            // display details on plant information card
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







