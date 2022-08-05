
var tasks = [
  { time: "9 AM", task: "Testing Task",index:0, timeFrame:9},
  { time: "10 AM", task: "asdasd",index:1,timeFrame:10},
  { time: "11 AM", task: "",index:2 ,timeFrame:11},
  { time: "12 PM", task: "",index:3 ,timeFrame:12},
  { time: "1 PM", task: "",index:4 ,timeFrame:13},
  { time: "2 PM", task: "",index:5 ,timeFrame:14},
  { time: "3 PM", task: "",index:6,timeFrame:15 },
  { time: "4 PM", task: "",index:7,timeFrame:16 },
  { time: "5 PM", task: "",index:8 ,timeFrame:17},
];
var getTaskColor=function(i){   
    var now =moment();
    var hour=now.hour();
    var taskColor ="green";   
if(tasks[i].timeFrame<hour){
        taskColor="grey";
   }
   else if(tasks[i].timeFrame==hour){
    taskColor="red"
   }
   return taskColor
}
var saveTasks = function(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
}
var loadPage = function() {

  if(localStorage.getItem("tasks")!==null){
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //append date
  $("#currentDay").text(moment().format("llll"));

  //load list

  $(".container").append($("<ul>").addClass("list-group"));
  var frag = document.createDocumentFragment();
  for (var i = 0; i < 9; i++) {

    $(".list-group").append(
      $("<li>")
        .addClass("list-element-group row")
        .attr("data-index", i)
        .append(
          $("<div>")
            .addClass("time-element col-sm-12 col-md-3  col-lg-2")
            .attr({ "data-index": i, id: ""})
            .text(tasks[i].time),
          $("<div>")
            .addClass("task-element col-sm-12 col-md-6  col-lg-8")
            .attr({ "data-index": i, id: ""}).css("background-color",getTaskColor(i))
            .text(tasks[i].task),
          $("<button>")
            .addClass("button-element btn btn-primary col-sm-12 col-md-3  col-lg-2")
            .attr({ "data-index": i, id: "something","data-state":"not-clicked"})
            .text("save")
        )
    );
  }
  saveTasks();
};
$('.container').on("click","button",function(){
  var index = $(this).attr("data-index");
  $("button[data-index='"+index+"']").attr("data-state", "clicked");

  var change = $("input").val();
  console.log(change);
  tasks[index].task =change;
  console.log(tasks[index].task)
 $("input").replaceWith( $("<div>")
  .addClass("task-element col-sm-12 col-md-6  col-lg-8")
  .attr({ "data-index": index, id: ""}).css("background-color",getTaskColor(index))
  .text(tasks[index].task))
  console.log(tasks);

})

loadPage();
$('.container').on("click",".task-element",function(event){
 
    var getIndex =$(this).attr("data-index");
    var inputChange = $("<input>").addClass("input-box col-sm-12 col-md-6  col-lg-8").attr({"id":"Ibox"});
    inputChange.val(tasks[getIndex].task)
    inputChange.attr("data-index",getIndex)
    $(this).replaceWith(inputChange);
    inputChange.trigger("focus");
    event.stopPropagation();
  saveTasks();
   
});

$(".container").on("blur","button",function(){
    

  var getIndex =$(this).attr("data-index");
  
    $("input").replaceWith( $("<div>")
    .addClass("task-element col-sm-12 col-md-6  col-lg-8")
    .attr({ "data-index": getIndex, id: ""}).css("background-color",getTaskColor(getIndex))
    .text(tasks[getIndex].task))


});

