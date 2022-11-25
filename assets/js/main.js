function myFunction1() {
    var x = document.getElementById("option-1").value;
    if (x == '') {
        document.getElementById("message-div").style.display = 'none';
        document.getElementById("itr-info-div").style.display = 'none';
    } if (x == 'New Customer') {
        document.getElementById("message-div").style.display = 'flex';
        document.getElementById("itr-info-div").style.display = 'none';
        changePlaceholder("Write Your Message")
    }
    if (x == 'Information regarding ITR') {
        document.getElementById("message-div").style.display = 'none';
        document.getElementById("itr-info-div").style.display = 'flex';
    }
    if (x == 'ITR Filing') {
        document.getElementById("message-div").style.display = 'flex';
        document.getElementById("itr-info-div").style.display = 'none';
        changePlaceholder("Write Your Message & Time between we can connect you.")
    }
    if (x == 'Referral') {
        document.getElementById("message-div").style.display = 'flex';
        document.getElementById("itr-info-div").style.display = 'none';
        changePlaceholder("Write the details of the Referral Person (Name & Contact No.)")
    }
}

function changePlaceholder(text) {
    $("textarea[name='Message-Default']").attr("placeholder",text)
}

$('#contact-btn-success').click(function(e) {
    e.preventDefault()
    let data = {};
    data.first_name=$('input[name=First_Name]').val()
    data.last_name=$('input[name=Last_Name]').val()
    data.email_id=$('input[name=Email_Id]').val()
    data.mobile_no=$('input[name=Mobile_No]').val()
    data.reason_options=$('select[name=Option-1]').val()
    data.default_message=$('textarea[name=Message-Default]').val()
    data.itr_options=$('select[name=Option-2]').val()
    data.form_type=$('input[name=form_type]').val()
    $.ajax({
        url:window.location.origin+"/form-submit",
        type:'POST',
        dataType:"application/json",
        data:data,
        success:function(res){
            console.log(res)
            if(res.status){
                $('.short-popup-msg').find('.popup-desc').html(res.message)
                $('.short-popup-msg').css("display","block")
                let e = $('.short-popup-msg').find('.popup-msg-progressbar')
                fillProgress(e)
                setInterval(() => {
                    window.location.href=BASE_URL;
                }, 3000);
            }
        }
    })
})



function fillProgress(e) {
    console.log(e)
    let i = 0;
    var width = 1;
    var id = setInterval(frame, 30);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        $(e).width(width + "%");
      }
    }
}