/**
 * Created by justinhu on 23/10/2017.
 */

let totalPoints=0, remainGiftPoints=0;
console.log(dataArr[0].english);



let dataMainBasic = {math:480, economics:15, computer:10800, physics:1200, physicalExercise:270,
    english:{hearing:0,reading:0,seeing:0,writing:0,grammar:0,word:0,speaking:0,value:3600}};

let levelScore = {math:30000, economics:6000, computer:60000, physics:10000, physicalExercise:4000,
    english:{hearing:0,reading:0,seeing:0,writing:0,grammar:0,word:0,speaking:0,value:10000}};

let dataMainZero={
    math:0, economics:0, computer:0, physics:0, physicalExercise:0,
    english:{hearing:0,reading:0,seeing:0,writing:0,grammar:0,word:0,speaking:0,value:0}
}


/**
 *
 * get all progress
 *
 */
function getAll(){
    let dataMain = dataMainBasic;
    for(let i=0; i<dataArr.length; i++){
        dataMain.math += dataArr[i].math;
        dataMain.economics += dataArr[i].economics;
        dataMain.computer += dataArr[i].computer;
        dataMain.physics += dataArr[i].physics;
        dataMain.physicalExercise +=  dataArr[i].physicalExercise;
        console.log(dataArr[i].english);
        dataArr[i].english.value = dataArr[i].english.hearing * 0.25 + dataArr[i].english.reading*0.25 + dataArr[i].english.speaking+  dataArr[i].english.word+ dataArr[i].english.seeing*0.5 + dataArr[i].english.grammar + dataArr[i].english.writing;
        dataMain.english.value +=  dataArr[i].english.value;
    }
    return dataMain;
}

function getLastweek(){
    let dataMain = dataMainZero;
    let len = dataArr.length%7;
    if(len === 0 && dataArr.length!==0){
        len =7;
    }
    for(let i=0; i<len; i++){
        dataMain.math += dataArr[i].math;
        dataMain.economics += dataArr[i].economics;
        dataMain.computer += dataArr[i].computer;
        dataMain.physics += dataArr[i].physics;
        dataMain.physicalExercise +=  dataArr[i].physicalExercise;
        dataMain.others += dataArr[i].others;
        dataMain.medicine +=  dataArr[i].medicine;

        dataArr[i].english.value = dataArr[i].english.hearing * 0.25 + dataArr[i].english.reading*0.25 + dataArr[i].english.speaking+  dataArr[i].english.word+ dataArr[i].english.seeing*0.5 + dataArr[i].english.grammar + dataArr[i].english.writing;
        dataMain.english.value +=  dataArr[i].english.value;
    }
    return dataMain;
}

let allData = getAll();
let weekData = getLastweek();

function generateProgress(_this,allData,levelScore){
    let thisClass = $(_this).attr('class');
    let tmpLen = 0;
    let tmpWidth = $(".bar").width();
    if(thisClass === "english"){
        tmpLen =$(_this).children(".bar").children(".achieved").css("width", ((allData[thisClass].value) / levelScore[thisClass].value) * tmpWidth + 'px');
        $(_this).children(".bar").children(".achieved").css("width", ((allData[thisClass].value-weekData[thisClass].value) / levelScore[thisClass].value) * tmpWidth + 'px');
        $(_this).children(".bar").children(".recent").css("width", ((weekData[thisClass].value) / levelScore[thisClass].value) * tmpWidth + 'px');
        $(_this).children(".goal-score").html(levelScore[thisClass].value+" points");

        setTimeout(function(){
            if(parseInt($(_this).children(".bar").children(".achieved").css("width"))> 100){
                $(_this).children(".bar").children(".recent").children("p").css({"right":"10px", "color": "#fff"});
            }
            $(_this).children(".bar").children(".recent").children("p").html(allData[thisClass].value-weekData[thisClass].value + '+' + weekData[thisClass].value + 'points');
        },1200);
    }else{
        $(_this).children(".bar").children(".achieved").css("width", ((allData[thisClass]-weekData[thisClass]) / levelScore[thisClass]) * tmpWidth + 'px');
        $(_this).children(".bar").children(".recent").css("width", ((weekData[thisClass]) / levelScore[thisClass]) * tmpWidth + 'px');
        $(_this).children(".goal-score").html(levelScore[thisClass]+" points");

        setTimeout(function(){
            if(parseInt($(_this).children(".bar").children(".achieved").css("width"))> 100){
                $(_this).children(".bar").children(".recent").children("p").css({"right":"10px", "color": "#fff"});
            }
            $(_this).children(".bar").children(".recent").children("p").html(allData[thisClass]-weekData[thisClass] + '+' + weekData[thisClass] + 'points');
        },1200);
    }
}



$(".main-progress>li").each(function(){generateProgress(this,allData,levelScore);});
$(".week-progress>li").each(function(){generateProgress(this,weekData,weekScore);});


let weekScoreTotal = weekScore.math + weekScore.economics + weekScore.computer +weekScore.physics + weekScore.physicalExercise+ weekScore.english.value;

$(".week-progress").siblings("h2").html("One Week Plan (" + weekScoreTotal + " points)");

totalPoints = allData.math + allData.economics + allData.computer +allData.physics + allData.physicalExercise+ allData.english.value;

$(".personal-data").find(".total-points").children("p").html(totalPoints);

let giftHtmlArr = [];

remainGiftPoints = totalPoints;
for(let i = 0; i<giftList.length; i++){
    remainGiftPoints -= giftList[i].value;
    giftHtmlArr[i] = "<li>" + giftList[i].name + " (" + giftList[i].value + ")" +"</li>";
}


let giftHtmlStr = giftHtmlArr.join("");
$(".personal-data").find(".gifts-box").html(
    "<h4>Gift List: </h4>" + "<ul>" +  giftHtmlStr +"</ul>" +'<div class="remain-points"><h4>The remaining gift points</h4><p>'+remainGiftPoints+'</p></div>'
);


$(".personal-data-ability > ul >li").each(
    function(){
        let thisClass = $(this).attr('class');
        if(thisClass === "english"){
            $(this).children("p").html(allData[thisClass].value);
        }else{
            $(this).children("p").html(allData[thisClass]);
        }


    }
);