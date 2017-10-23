/**
 * Created by justinhu on 23/10/2017.
 */

let dataArr=[
    {   year:2017,month:10,date:23,
        math:0, economics:0, computer:60, physics:0, physicalExercise:0,
        english:{hearing:0,reading:0,seeing:0,writing:0,grammar:0,speaking:0,word:0,value:0},
    },
];
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
    if(dataArr.length>=7){
        for(let i=dataArr.length-7; i<dataArr.length; i++){
            dataMain.math += dataArr[i].math;
            dataMain.economics += dataArr[i].economics;
            dataMain.computer += dataArr[i].computer;
            dataMain.physics += dataArr[i].physics;
            dataMain.physicalExercise +=  dataArr[i].physicalExercise;

            dataArr[i].english.value = dataArr[i].english.hearing * 0.25 + dataArr[i].english.reading*0.25 + dataArr[i].english.speaking+  dataArr[i].english.word+ dataArr[i].english.seeing*0.5 + dataArr[i].english.grammar + dataArr[i].english.writing;
            dataMain.english.value +=  dataArr[i].english.value;
        }
    }else if(dataArr.length<7){
        for(let i=0; i<dataArr.length; i++){
            dataMain.math += dataArr[i].math;
            dataMain.economics += dataArr[i].economics;
            dataMain.computer += dataArr[i].computer;
            dataMain.physics += dataArr[i].physics;
            dataMain.physicalExercise +=  dataArr[i].physicalExercise;
            console.log(dataArr[i].english);
            dataArr[i].english.value = dataArr[i].english.hearing * 0.25 + dataArr[i].english.reading*0.25 + dataArr[i].english.speaking+  dataArr[i].english.word+ dataArr[i].english.seeing*0.5 + dataArr[i].english.grammar + dataArr[i].english.writing;
            console.log(dataArr[i].english);
            dataMain.english.value +=  dataArr[i].english.value;
        }
    }

    return dataMain;
}


let yearData = getAll();
let weekData = getLastweek();

$(".main-progress>li").each(function() {
    let id = $(this).attr('id');
    if(id === "english"){
        $(this).children(".bar").children(".achieved").css("width", ((yearData[id].value-weekData[id].value) / levelScore[id].value) * 800 + 'px');
        $(this).children(".bar").children(".recent").css("width", ((weekData[id].value) / levelScore[id].value) * 800 + 'px');
        $(this).children(".bar").children(".recent").children("p").html(yearData[id].value + '+' + weekData[id].value + 'points');

        $(this).children(".goal-score").html(levelScore[id].value+" points");
    }else{
        $(this).children(".bar").children(".achieved").css("width", ((yearData[id]-weekData[id]) / levelScore[id]) * 800 + 'px');
        $(this).children(".bar").children(".recent").css("width", ((weekData[id]) / levelScore[id]) * 800 + 'px');
        $(this).children(".bar").children(".recent").children("p").html(yearData[id] + '+' + weekData[id] + 'points');

        $(this).children(".goal-score").html(levelScore[id]+" points");
    }

});

