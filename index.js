'use strict'
var wow = new WOW(
    {
        boxClass: 'wow',      // animated element css class (default is wow)
        animateClass: 'animate__animated', // animation css class (default is animated)
        offset: 0,          // distance to the element when triggering the animation (default is 0)
        mobile: true,       // trigger animations on mobile devices (default is true)
        live: true,       // act on asynchronously loaded content (default is true)
        callback: function (box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null,    // optional scroll container selector, otherwise use window,
        resetAnimation: true,     // reset animation on end (default is true)
    }
);
wow.init();
$(document).ready(function () {

    $('.program__slider').slick({})
    $('.comments__slider').slick({})
    $('.gallery__slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnBgClick: true,
        mainClass: 'mfp-img-mobile'
    });
    $('#video_btn,.mountain__text').click(() => {
        $('#mountain').hide();
        $('#video').show();
    });
    $('#burger').click(() => {
        $('.menu').addClass('open');
    });
    $('.close').click(() => {
        $('.menu').removeClass('open');
    })
    let amount = $('.input_btn');
    let amount_val = 0;
    for (let i = 0; i < amount.length; i++) {
        amount.eq(i).click((e) => {
            amount.css('background', 'transparent').css('color', 'white');
            amount.eq(i).css('background', 'white').css('color', 'black');
            amount_val = amount.eq(i).val();
        })
    }
    let invalid = $('.invalid');
    let input = $('.input');
    let name = $('.input_name');
    let phone = $('.input_phone');
    let invalid_amount = $('.invalid-amount');
    let thank = $('.thank');
    let form = $('.form');
    phone.mask('+(000) 000-00-00');

    $('.btn__submit').click(
        () => {
            let hasError = false;
            invalid_amount.hide();
            input.css('border-color', 'white');
            invalid.hide();
            for (let i = 0; i < input.length; i++) {
                if (!(input.eq(i)).val()) {
                    hasError = true;
                    invalid.eq(i).show();
                    input.eq(i).css('border-color', 'red');

                }
            }
            if (!amount_val) {
                hasError = true;
                invalid_amount.show();

            }
            if (!hasError) {
                $.ajax({
                    method: "POST",
                    url: 'https://testologia.site/checkout',
                    data: {amount: amount_val, name: name.val(), phone: phone.val()}
                })
                    .done(
                        function (msg) {
                            console.log(msg);
                            if (msg.success === 1) {
                                form.hide();
                                thank.css('display', 'flex');

                            } else {
                                alert('Возникла ошибка при оформлении заказа, попробуйте оформить еще раз');
                                amount_val = 0;
                                amount.css('background', 'transparent').css('color', 'white');
                                name.val('');
                                phone.val('');
                            }
                        }
                    )
            }
        }
    )

});




