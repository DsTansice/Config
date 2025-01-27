let body = JSON.parse($response.body);
const feed = "\/api\/news\/feed\/v88";
const wallet = "\/wallet\/portal\/api\/v3\/prefetch\/settings";
const url = $request.url;

if (body && body.data) {
    if (url.indexOf(feed) != -1) {
    var data = body.data;
      if (body.api_base_info != null && body.api_base_info.raw_data === null && data.length > 0) {
            for (var i in data) {
                let content = JSON.parse(data[i].content);
                if (content.abstract == '' || content.card_title == '小视频' || content.video_source == 'ugc_video' || content.video_style == 2 || content.has_video == true || content.label == '广告' || content.label == '置顶') {
                    data[i] = {};
                    delete data[i];
                }
            }
        }
    }

    if (url.indexOf(wallet) != -1) {
        if (body.data.GetSettings.Sections) {
            body.data.GetSettings.Sections[3].services = body.data.GetSettings.Sections[3].services.filter(element => !(element['id'] == '3'));

            body.data.GetSettings.Sections[3].services = body.data.GetSettings.Sections[3].services.filter(element => !(element['id'] == '13'));

            body.data.GetSettings.Sections[3].services = body.data.GetSettings.Sections[3].services.filter(element => !(element['id'] == '4'));

            body.data.GetSettings.Sections[3].services = body.data.GetSettings.Sections[3].services.filter(element => !(element['id'] == '2'));
            body.data.GetSettings.Sections = body.data.GetSettings.Sections.filter(element => !(element['componentName'] == 'activity-banner'));

            body.data.GetSettings.Sections = body.data.GetSettings.Sections.filter(element => !(element['componentName'] == 'cswiper'));
            body.data.GetSettings.Sections = body.data.GetSettings.Sections.filter(element => !(element['label'] == '第三方服务'));
        }
    }
}

$done({ body: JSON.stringify(body) });