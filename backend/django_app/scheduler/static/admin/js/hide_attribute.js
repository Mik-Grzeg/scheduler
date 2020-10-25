django.jQuery = jQuery;
hide_page=false;
django.jQuery(document).ready(function(){
    if (django.jQuery('#id_is_instructor').is(':checked')) {
        console.log('balls');
        django.jQuery(".wage").hide();
        hide_page=true;
    } else {
        django.jQuery(".wage").show();
        hide_page=false;
    }
    django.jQuery("#id_is_instructor").click(function(){
        hide_page=!hide_page;
        if (hide_page) {
            django.jQuery(".wage").hide();
        } else {
            django.jQuery(".wage").show();
        }
    })
})

$(document).ready(function(){

})