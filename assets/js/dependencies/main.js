$(function(){

$(document).ajaxStart(function () {
   $('#myModal1').modal('show');
});

$(document).ajaxStop(function () {

     $('#myModal1').modal('hide');
});

current_page_number = 0;
total_pages = 0 ;



$(document).on('click', '#search', function (){  
  $(".auto_compleate").hide();
  fetch($("#search_term").val(),current_page_number)

});

$(document).on('click', '.pagination_li', function (){  

current_page_number = $(this).attr("id");

fetch($("#search_term").val(),current_page_number)

}); 


window.fetch = function (search_term,current_page_number){
  console.log(search_term,current_page_number);
  var all_torrents = "";
    $.ajax({
        url: '/fetch_torrentz',
        method: 'POST',
        contentType: 'application/json', 
        processData: false,
        data: JSON.stringify({
            page: current_page_number,
            name: search_term
         }),
        success: function(data) {
         total_torrents = data[parseInt(data.length)-parseInt(1)].total_torrents;
         total_pages = data[parseInt(data.length)-parseInt(2)].page_ignation;
         $("#all_torrents").html(all_torrents);
             $(data).each(function(i,j){
              if(parseInt(data.length)-parseInt(3) > i)
              {
                console.log(parseInt(data.length)-parseInt(2)+" "+i);
                  all_torrents += '<li class="list-group-item clearfix"><div class="row"><div class="col-sm-10"><a href="'+data[i].url+'">'+data[i].title+'</a> </div><div class="col-sm-2"><div class="col-sm-3 right_width">'+data[i].size+'</div><div class="col-sm-4 right_width">'+data[i].old+'</div><div class="col-sm-3 right_width">'+data[i].seeds+'</div><div class="col-sm-2 right_width">'+data[i].Leechers+'</div></div></div></li>'
              }
           });

          var li = "<li></li>";
          if(current_page_number != 0)
          {
            var li = "<li class='pagination_li' id='"+(parseInt(current_page_number)-parseInt(1))+"'><a href='#' aria-label='Previous'><span aria-hidden='true'>«</span></a></li>";
          }

          console.log(current_page_number+" "+total_pages);
          for(i=parseInt(current_page_number);i<=parseInt(total_pages);i++)
          {
                li += "<li class='pagination_li' id='"+i+"'><a href='#'>"+i+"</a></li>";
                console.log(i);
          }

          li += "<li class='pagination_li' id='"+parseInt(total_pages)+"'><a href='#' aria-label='Next'><span aria-hidden='true'>»</span></a></li>";

          $('.pagination').html(li);
          $("#all_torrents").html(all_torrents);
          $(".total_torrents").html(total_torrents+' Searched');

          $(".auto_compleate").hide();
                 
        },
        failure: function(msg) {
            alert("Fail : " + msg);
        }
      });

}

$("#search_term").keydown(function(e){
  var key = e.which;
    if(key == 13) {
        $('#search').click();
        $(".auto_compleate").hide();
        return false;
    }

});

$("#search_term").keyup(function(){

  var search_terms = [];
  var get_search_val = $("#search_term").val(); 
  if(get_search_val.length>3)
  {

          $.ajax({
            url: '/search_term',
            method: 'POST',
            contentType: 'application/json', 
            processData: false,
            global: false,  
            data: JSON.stringify({
                page: '0',
                name: get_search_val
             }),
            success: function(data) {
             var option = '';

             $.each(data, function(i,j) {

                option += '<a href="#" class="list-group-item auto_class_li">'+j.search_title+'</a>';

              });

             $(".auto_compleate").html(option);
             $(".auto_compleate").show();

            },
            failure: function(msg) {
                alert("Fail : " + msg);
            }
          });
         


  }else{

    $(".auto_compleate").hide();
  }

});

$(document).on('click', '.auto_class_li', function (){ 
  $("#search_term").val($(this).text())
  $(".auto_compleate").hide();
});

});