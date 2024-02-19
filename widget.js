
function populateSlides(list, title, bgData, namesPerSlide) {
    let i = 0;
    let rest = list;

    while (rest.length > 0) {
        let take = rest.slice(0, namesPerSlide);
        rest = rest.slice(namesPerSlide);

        let items = take.join('</li><li>');
        let section = `<section ${bgData}><div class="section-container"><div class="section-title">${title}</div><ul class="names"><li>${items}</li></ul></div></section>`;

        $('.reveal .slides').append(section);

        i++;
    }
}

window.addEventListener('onWidgetLoad', function (obj) {

    let followers = [], subscribers = [], raids = [], tips = [], cheers = [];

    const recents = obj.detail.recents;

    let data = obj.detail.session.data;
    let fields = obj.detail.fieldData;
    let slideDuration = parseInt(fields.slideDuration);
    let autoSlide = ((isNaN(slideDuration) || slideDuration < 1) ? 1 : slideDuration) * 1000;
    let namesPerSlide = fields.maxNames;

    if (typeof data['follower-session'] === "undefined") data['follower-session'] = { count: 0 };
    if (typeof data['subscriber-session'] === "undefined") data['subscriber-session'] = { count: 0 };
    if (typeof data['cheer-session'] === "undefined") data['cheer-session'] = { amount: 0 };
    if (typeof data['tip-count'] === "undefined") data['tip-count'] = { count: 0 };

    for (eventIndex in recents) {
        const event = recents[eventIndex];
        if (!fields[`${event.type}Enabled`]) continue;

        if (event.type === 'follower') {
            if (followers.length < data['follower-session'].count) {
                followers.push(event.name);
            }
        } else if (event.type === 'subscriber') {
            if (subscribers.length < data['subscriber-session'].count) {
                subscribers.push(event.name);
            }
        } else if (event.type === 'cheer') {
            if (cheers.length < data['cheer-session'].amount) {
                cheers.push(`${event.name} - ${event.amount}`);
            }
        } else if (event.type === 'tip') {
            if (tips.length < data['tip-count'].count) {
                tips.push(`${event.name} - ${fields.currencyPrefix}${event.amount}${fields.currencyPostfix}`);
            }
        }
    }

    let bgData = "";
    if (fields.backgroundImage) bgData = `data-backgroundimage="${fields.backgroundImage}"`;

    if (fields.startEnabled) $('.reveal .slides').append(`<section ${bgData}><div class="big"><h1>${fields.startTitle}</h1></div></section>`);

    populateSlides(followers, fields.followersTitle, bgData, namesPerSlide);
    populateSlides(subscribers, fields.subscribersTitle, bgData, namesPerSlide);
    populateSlides(tips, fields.tipsTitle, bgData, namesPerSlide);
    populateSlides(cheers, fields.cheersTitle, bgData, namesPerSlide);

    if (fields.endEnabled) $('.reveal .slides').append(`<section ${bgData}"><div class="big"><h1>${fields.endTitle}</h1></div></section>`);

    Reveal.initialize({
        loop: false,
        autoSlide: autoSlide,
        controls: false,
        transition: 'fade',
    });

});
