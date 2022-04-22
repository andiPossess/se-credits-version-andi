let followers = [], subscribers = [], raids = [], tips = [];

window.addEventListener('onWidgetLoad', function (obj) {

    let data = obj.detail.session.data;
    let fields = obj.detail.fieldData;
    let slideDuration = parseInt(fields.slideDuration);
    let autoSlide = ((isNaN(slideDuration) || slideDuration < 1) ? 1 : slideDuration) * 1000;

    console.log(fields.backgroundImage);

    data['follower-recent'].forEach(function(f) {
        followers.push(f.name);
    });

    data['subscriber-recent'].forEach(function(f) {
        subscribers.push(f.name);
    });

    data['raid-recent'].forEach(function(f) {
        raids.push(`${f.name} (+${f.amount})`);
    });

    $('.reveal .slides').append(`<section data-background-image="${fields.backgroundImage}"><div class="big">${fields.startTitle}</div></section>`);

    if(followers.length > 0) {
        let items = followers.join('</li><li>');
        let section = `<section data-background-image="${fields.backgroundImage}"><div>${fields.followersTitle}</div><ul><li>${items}</li></ul></section>`;
        $('.reveal .slides').append(section);
    }

    if(subscribers.length > 0) {
        let items = subscribers.join('</li><li>');
        let section = `<section data-background-image="${fields.backgroundImage}"><div>${fields.subscribersTitle}</div><ul><li>${items}</li></ul></section>`;
        $('.reveal .slides').append(section);
    }

    if(raids.length > 0) {
        let items = raids.join('</li><li>');
        let section = `<section data-background-image="${fields.backgroundImage}"><div>${fields.raidsTitle}</div><ul><li>${items}</li></ul></section>`;
        $('.reveal .slides').append(section);
    }

    if(tips.length > 0) {
        let items = tips.join('</li><li>');
        let section = `<section><div>${fields.tipsTitle}</div><ul><li>${items}</li></ul></section>`;
        $('.reveal .slides').append(section);
    }

    $('.reveal .slides').append(`<section data-background-image="${fields.backgroundImage}"><div class="big">${fields.endTitle}</div></section>`);

    Reveal.initialize({
        width: '100%',
        height: '100%',
        loop: false,
        autoSlide: autoSlide,
        controls: false,
        transition: 'fade',
    });

});
