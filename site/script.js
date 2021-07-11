
 function final(params) {
    console.log("response");
    alert("response");
}
 $('#submit').click(function (e) {
    e.preventDefault();
    console.log("clicked");
    if($('#session').val()=='') alert("null");
    $.ajax({
        url:'http://localhost:3000/auth',
        method:'post',
        success :function final(res) {
            console.log("response");
            alert(res.from);
        },
        data :{
            pass:$('#session').val()}


    })

});