/**
 * Created by SAGAR on 7/12/2016.
 */

var first=true;
$(document).ready(function(){
    $.ajax({
        type: 'GET',
        dataType:'json',
        url: '/api/id?id=1',
        success: function(data) {
            create(data);
        },
        error: function(error) {
            console.log("some error in fetching the notifications");
        }
    });
    $("#fual_distance").unbind('click').bind('click', function(){
        funAssign(-1,'distance','null','null');
    });
    $("#fual_head").unbind('click').click(function(){
        funAssign(-1,'fual','null','null');
    });
    $("#fual_milage").unbind('click').click(function(){
        funAssign(-1,'milage','null','null');
    });
    $("#fual_id").unbind('click').click(function(){
        funAssign(-1,'id','null','null');
    });

    $('#form_sub').submit(function(event){
         var ful = $('#fual').val();
         var distance = $('#distance').val();
        clickFun(distance,ful).done(function(){
            window.location.reload();
        });
        event.preventDefault();
        //window.location.reload();
    });
    handleClick = function(val,name){
        if(val=='id'){
            $('#Action_id #__id').text(name);
            $('#Action_fual #__fual').text('Fual');
            $('#Action_dis #__dis').text('Distance');
            $('#Action_milage #__milage').text('Milage');
            var data = $('#Input_id').val();
             $('#Input_fual').val('');
             $('#Input_dis').val('');
             $('#Input_milage').val('');
            funAssign(1,'id',data,helper(name));
        }
        else if(val=='fual'){
            $('#Action_id #__id').text('Serial');
            $('#Action_dis #__dis').text('Distance');
            $('#Action_milage #__milage').text('Milage');
            $('#Action_fual #__fual').text(name);
            var data = $('#Input_fual').val();
            $('#Input_id').val('');
            $('#Input_dis').val('');
            $('#Input_milage').val('');
            funAssign(1,'fual',data,helper(name));
        }
        else if(val=='dis'){
            $('#Action_id #__id').text('Serial');
            $('#Action_milage #__milage').text('Milage');
            $('#Action_fual #__fual').text('Fual');
            $('#Action_dis #__dis').text(name);
            var data = $('#Input_dis').val();
            $('#Input_id').val('');
            $('#Input_fual').val('');
            $('#Input_milage').val('');
            funAssign(1,'distance',data,helper(name));
        }
        else if(val=='milage'){
            $('#Action_id #__id').text('Serial');
            $('#Action_fual #__fual').text('Fual');
            $('#Action_dis #__dis').text('Distance');
            $('#Action_milage #__milage').text(name);
            var data = $('#Input_milage').val();
            $('#Input_id').val('');
            $('#Input_dis').val('');
            $('#Input_fual').val('');
            funAssign(1,'milage',data,helper(name));
        }
    }
    $(':radio').change(function(){
        var fual =  $('#fual_output').val()/getSum();
        var dis =  getSum()*$('#distance_output').val();
        if(this.value==='fual'){$('#label_out').html(fual+" Lit");}
        else{$('#label_out').html(dis+" Km");}
    });
});
helper = function(val){
   if(val=='lessThen')
       return 'less';
   else if(val=='GratherThen')
      return  'great';
   else if(val=='equalTo')
      return 'equal';
}
var i=1,j=1,k=1,l=1;
 var funAssign = function(m,str,paramVal,paramType){
     m = helperBool(str,m);
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
     });

 }
helperBool = function(str,b){
    if(str=='fual'){
       return i=i*b ;
    }
    else if(str=='distance'){
        return j=j*b ;
    }
    else if(str=='id'){
        return k=k*b ;
    }
    else if(str=='milage'){
        return l=l*b ;
    }
}
var sumDis,sumFual;
getSum = function(){
   return sumDis/sumFual;
}
create = function( value){
    sumDis=0;
    sumFual=0;
    $(".ele_tem").remove();
    var val='';
    for(var i=0;i<value.length;i++){
        val+='<tr class="ele_tem">'
        val+="<td>"
        val+=value[i]['_id']
        val+="</td>"
        val+="<td>"
        val+=value[i]['fual']
        val+="</td>"
        val+="<td>"
        val+=value[i]['distance']
        val+="</td>"
        val+="<td>"
        val+=value[i]['milage']
        val+="</td>"
        val+='</tr>'
        sumDis+=value[i]['distance'];
        sumFual+=value[i]['fual'];
    }
    $('#main_body').append(val);
}
clickFun = function(dis,ful){
    var mil = dis/ful;
    $.ajax({
        type:'POST',
        url: 'api/fualdata',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({milage: mil,fual:ful,distance:dis}),
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