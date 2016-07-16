/**
 * Created by SAGAR on 7/12/2016.
 */

$(document).ready(function(){
         $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/api/id?id=1',
            success: function (data) {},
            error: function (error) {
                console.log("some error in fetching the notifications");
            }
        }).done(function(data){
             var first=true;
             var myObj=null,sumDis= 0,sumFuel=0;
             var i=1,j=1,k=1,l=1;
             funAssign = function(m,str,paramVal,paramType){
                 m = 1;
                 $.ajax({
                     type: 'GET',
                     dataType:'json',
                     url: '/api/'+str+'?id='+m+'&paramVal='+paramVal+'&paramType='+paramType,
                     success: function(data){
                         create(data);
                     },
                     error: function(error){
                         alert('something wrong'+error);
                     }
                 }).done(function(output){
                     data = output;
                 });
             }
             sortingHelper = function(str,_order,data){
                 console.log(str);
                 if(str=='distance'){
                     data.sort(function(a,b){
                         return  (_order)*(a.distance- b.distance);
                     });
                 }
                 else if(str=='fuel'){
                     data.sort(function(a,b){
                         return  (_order)*(a.fuel- b.fuel);
                     });
                 }
                 else if(str=='id'){
                     data.sort(function(a,b){
                         return (_order)*(a._id- b._id);
                     });
                 }
                 else if(str=='mileage'){
                     data.sort(function(a,b){
                         return  (_order)*(a.mileage- b.mileage);
                     });
                 }
                 create(data);
             }
             create = function(value){
                 if(value!=null) {
                     myObj = value;
                 }
                 sumDis=0;
                 sumFuel=0;
                 $(".ele_tem").remove();
                 var val='';
                 for(var i=0;i<myObj.length;i++){
                     val+='<tr class="ele_tem">'
                     val+="<td>"
                     val+=myObj[i]['_id']
                     val+="</td>"
                     val+="<td>"
                     val+=myObj[i]['fuel']
                     val+="</td>"
                     val+="<td>"
                     val+=myObj[i]['distance']
                     val+="</td>"
                     val+="<td>"
                     val+=myObj[i]['mileage']
                     val+="</td>"
                     val+='</tr>'
                     sumDis+=myObj[i]['distance'];
                     sumFuel+=myObj[i]['fuel'];
                 }
                 $('#main_body').append(val);
             }
             helper = function(val){
                 if(val=='lessThen')
                     return 'less';
                 else if(val=='greaterThen')
                     return  'great';
                 else if(val=='equalTo')
                     return 'equal';
             }
             getSum = function(){
                 return sumDis/sumFuel;
             }
             clickFun = function(dis,ful){
                 var mil = dis/ful;
                 return  $.ajax({
                     type:'POST',
                     url: 'api/fueldata',
                     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                     data: $.param({mileage: mil,fuel:ful,distance:dis}),
                     success: function(data){
                     },
                     error:function(error){
                     }
                 });
             }
             clearFun = function(){
                 $.ajax({
                     type:'GET',
                     url:'api/clear',
                     success: function(data){
                         alert('data cleared');
                     },
                     error:function(data){
                         alert('some error ocured!');
                     }
                 });
             }
             handleClick = function(val,name){
                 if(val=='id'){
                     $('#Action_id #__id').text(name);
                     $('#Action_fuel #__fuel').text('Fual');
                     $('#Action_dis #__dis').text('Distance');
                     $('#Action_mileage #__mileage').text('Milage');
                     var data = $('#Input_id').val();
                     $('#Input_fuel').val('');
                     $('#Input_dis').val('');
                     $('#Input_mileage').val('');
                     var value = funAssign(1,'id',data,helper(name));
                     console.log(value);
                 }
                 else if(val=='fuel'){
                     // all the stuf for clearing reseting inp
                     $('#Action_id #__id').text('Serial');
                     $('#Action_dis #__dis').text('Distance');
                     $('#Action_mileage #__mileage').text('Milage');
                     $('#Action_fuel #__fuel').text(name);
                     var data = $('#Input_fuel').val();
                     $('#Input_id').val('');
                     $('#Input_dis').val('');
                     $('#Input_mileage').val('');
                     funAssign(1,'fuel',data,helper(name));
                 }
                 else if(val=='dis'){
                     $('#Action_id #__id').text('Serial');
                     $('#Action_mileage #__mileage').text('Milage');
                     $('#Action_fuel #__fuel').text('Fual');
                     $('#Action_dis #__dis').text(name);
                     var data = $('#Input_dis').val();
                     $('#Input_id').val('');
                     $('#Input_fuel').val('');
                     $('#Input_mileage').val('');
                     funAssign(1,'distance',data,helper(name));
                 }
                 else if(val=='mileage'){
                     $('#Action_id #__id').text('Serial');
                     $('#Action_fuel #__fuel').text('Fual');
                     $('#Action_dis #__dis').text('Distance');
                     $('#Action_mileage #__mileage').text(name);
                     var data = $('#Input_mileage').val();
                     $('#Input_id').val('');
                     $('#Input_dis').val('');
                     $('#Input_fuel').val('');
                     funAssign(1,'mileage',data,helper(name));
                 }
             }
             create(data);
             $("#fuel_distance").unbind('click').bind('click', function(){
                  i=-i;
                 sortingHelper('distance',i, data);
             });
             $("#fuel_head").unbind('click').click(function(){
                 j=-j;
                 sortingHelper('fuel',j,data);
             });
             $("#fuel_mileage").unbind('click').click(function(){
                 k=-k;
                 sortingHelper('mileage',k,data);
             });
             $("#fuel_id").unbind('click').click(function(){
                 l=-l;
                 sortingHelper('id',l,data);
             });
             $('#btnsub').unbind('click').bind('click',function(event){
                 var ful = $('#fuel').val();
                 var distance = $('#distance').val();
                 clickFun(distance,ful).done(function(){
                     window.location.reload();
                 });
                 event.preventDefault();
             });
             $(':radio').change(function(){
                 var fuel =  $('#fuel_output').val()/getSum();
                 var dis =  getSum()*$('#distance_output').val();
                 if(this.value==='fuel'){$('#label_out').html(fuel+" Lit");}
                 else{$('#label_out').html(dis+" Km");}
             });

         });
});




