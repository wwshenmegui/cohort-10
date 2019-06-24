var cardArr=['glyphicon-flag','glyphicon-flag','glyphicon-trash','glyphicon-trash','glyphicon-plane','glyphicon-plane','glyphicon-bell','glyphicon-bell','glyphicon-leaf','glyphicon-leaf','glyphicon-fire','glyphicon-fire','glyphicon-wrench','glyphicon-wrench','glyphicon-usd','glyphicon-usd']

function shuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function run(){
    var arr=shuffle(cardArr);
    var cHtml='';
    for(var i=0;i<arr.length;i++){
        cHtml = cHtml+'<li class="card"> <i class="glyphicon '+arr[i]+'"></i> </li>'
    }
    $("#deck").html(cHtml);
    fclick();
    sessionStorage.setItem("click",0);
    sessionStorage.setItem("match",0);
    sessionStorage.setItem("state","f");
    $(".moves").html(0);
}

function fclick(){
    $("#deck li").click(function () {
        if($(this).hasClass("open")||$(this).hasClass("match")){
            return false;
        }
        if(sessionStorage.getItem("state")!="f")
        {
            return false;
        }
        var click=parseInt(sessionStorage.getItem("click"))+1
        var match=parseInt(sessionStorage.getItem("match"));
        sessionStorage.setItem("click",click);
        $(".moves").html(click);
        if(parseInt(sessionStorage.getItem("click"))%2==0){
            sessionStorage.setItem("state","u");
            $(this).addClass("open show open2");

            if($(".open1").html()==$(".open2").html()){
                setTimeout(function(){
                    $(".open1,.open2").addClass("match");
                    $(".open1").removeClass("show open1");
                    $(".open2").removeClass("show open2");
                    sessionStorage.setItem("state","f");
                    sessionStorage.setItem("match",match+1);
                    if(match==7){
                        setTimeout(function(){
                            alert("Total "+click+" moves, you won!");
                        },500)
                    }
                },500)
            }else{
                setTimeout(function(){

                    $(".open1").removeClass("open show open1");
                    $(".open2").removeClass("open show open2");
                    sessionStorage.setItem("state","f");
                },500)
            }
        }else{

            $(this).addClass("open show open1");
        }
    })

}

run()