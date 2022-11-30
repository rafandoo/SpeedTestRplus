/**
 * It takes a JSON string, parses it into an array of objects, then returns an array of objects with
 * only the fields property.
 * @param dataset - The data you want to process.
 * @returns An array of objects.
 */
function processData(dataset) {
    var result = []
    dataset = JSON.parse(dataset);
    dataset.forEach(item => result.push(item.fields));
    return result;
}

/**
 * It takes an array of objects, and returns an array of the mean values of the properties of those
 * objects.
 * @param data - an array of objects, each object has 4 properties: download, upload, ping, latency
 * @returns An array of the mean values of the download, upload, ping, and latency properties of the
 * objects in the data array.
 */
function meanResult(data) {
    let result = [],
        download = 0,
        upload = 0,
        ping = 0,
        latency = 0;

    data.forEach(item => {
        download += parseFloat(item.download);
        upload += parseFloat(item.upload);
        ping += parseFloat(item.ping);
        latency += parseFloat(item.latency);
    });

    result.push((download / data.length).toFixed(2));
    result.push((upload / data.length).toFixed(2));
    result.push((ping / data.length).toFixed(2));
    result.push((latency / data.length).toFixed(2));
    return result;
}

function minMax(data, property) {
    let min = 9999, max = 0;
    data.forEach(item => {
        if (parseFloat(item[property]) < min) min = parseFloat(item[property]);
        if (parseFloat(item[property]) > max) max = parseFloat(item[property]);
    });
    return [min, max];
}

function downloadChart(data) {
    const download_chart = $('#download_chart');
    let download_data = [], labels = [];
    data.forEach(item => download_data.push(parseFloat(item.download)));
    data.forEach(item => labels.push(item.date.replace('T', ' ').slice(0, 19)));

    new Chart(download_chart, {
        "type": "line",
        "data": {
            "labels": labels,
            "datasets": [
                {
                    "label": "Download Speed (Mbps)",
                    "fill": true,
                    "data": download_data,
                    "backgroundColor": "rgba(78, 115, 223, 0.05)",
                    "borderColor": "rgba(78, 115, 223, 1)"
                }
            ]
        },
        "options": {
            "maintainAspectRatio": false,
            "legend": {
                "display": false,
                "labels": {
                    "fontStyle": "normal"
                }
            },
            "title": {
                "fontStyle": "normal"
            },
            "scales": {
                "xAxes": [
                    {
                        "gridLines": {
                            "color": "rgb(234, 236, 244)",
                            "zeroLineColor": "rgb(234, 236, 244)",
                            "drawBorder": false,
                            "drawTicks": false,
                            "borderDash": [
                                2
                            ],
                            "zeroLineBorderDash": [
                                2
                            ],
                            "drawOnChartArea": false
                        },
                        "ticks": {
                            "fontColor": "#858796",
                            "fontStyle": "normal",
                            "padding": 20
                        }
                    }
                ],
                "yAxes":[
                    {
                        "gridLines": {
                            "color": "rgb(234, 236, 244)",
                            "zeroLineColor": "rgb(234, 236, 244)",
                            "drawBorder": false,
                            "drawTicks": false,
                            "borderDash": [
                                2
                            ],
                            "zeroLineBorderDash": [
                                2
                            ]
                        },
                        "ticks": {
                            "fontColor": "#858796",
                            "fontStyle": "normal",
                            "padding": 20
                        }
                    }
                ]
            }
        }
    });
}

function uploadChart(data) {
    const upload_chart = $('#upload_chart');
    let upload_data = [], labels = [];
    data.forEach(item => upload_data.push(parseFloat(item.upload)));
    data.forEach(item => labels.push(item.date.replace('T', ' ').slice(0, 19)));

    new Chart(upload_chart, {
        "type": "line",
        "data": {
            "labels": labels,
            "datasets": [
                {
                    "label": "Upload Speed (Mbps)",
                    "fill": true,
                    "data": upload_data,
                    "backgroundColor": "rgba(28, 200, 138, 0.05)",
                    "borderColor": "rgba(28, 200, 138, 1)"
                }
            ]
        },
        "options": {
            "maintainAspectRatio": false,
            "legend": {
                "display": false,
                "labels": {
                    "fontStyle": "normal"
                }
            },
            "title": {
                "fontStyle": "normal"
            },
            "scales": {
                "xAxes": [
                    {
                        "gridLines": {
                            "color": "rgb(234, 236, 244)",
                            "zeroLineColor": "rgb(234, 236, 244)",
                            "drawBorder": false,
                            "drawTicks": false,
                            "borderDash": [
                                2
                            ],
                            "zeroLineBorderDash": [
                                2
                            ],
                            "drawOnChartArea": false
                        },
                        "ticks": {
                            "fontColor": "#858796",
                            "fontStyle": "normal",
                            "padding": 20
                        }
                    }
                ],
                "yAxes":[
                    {
                        "gridLines": {
                            "color": "rgb(234, 236, 244)",
                            "zeroLineColor": "rgb(234, 236, 244)",
                            "drawBorder": false,
                            "drawTicks": false,
                            "borderDash": [
                                2
                            ],
                            "zeroLineBorderDash": [
                                2
                            ]
                        },
                        "ticks": {
                            "fontColor": "#858796",
                            "fontStyle": "normal",
                            "padding": 20
                        }
                    }
                ]
            }
        }
    });
}

function downloadGauge(data, minMax) {
    let download_gauge = c3.generate({
        bindto: '#download_gauge',
        data: {
            columns: [
                ['Download', parseFloat(data[0].download)]
            ],
            type: 'gauge',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        gauge: {
            label: {
                format: function (value, ratio) {
                    return value;
                },
            },
            min: minMax[0],
            max: minMax[1],
            units: 'Mbps',
            width: 20
        },
        color: {
            pattern: ["rgb(78, 115, 223)"],
            threshold: {   
                unit: 'value',
            }
        },
        size: {
            height: 180
        }
    });
}

function uploadGauge(data, minMax) {
    let upload_gauge = c3.generate({
        bindto: '#upload_gauge',
        data: {
            columns: [
                ['Upload', parseFloat(data[0].upload)]
            ],
            type: 'gauge',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        gauge: {
            label: {
                format: function (value, ratio) {
                    return value;
                },
            },
            min: minMax[0],
            max: minMax[1],
            units: 'Mbps',
            width: 20
        },
        color: {
            pattern: ["rgb(28, 200, 138)"],
            threshold: {   
                unit: 'value',
            }
        },
        size: {
            height: 180
        }
    });
}

function pingGauge(data, minMax) {
    let ping_gauge = c3.generate({
        bindto: '#ping_gauge',
        data: {
            columns: [
                ['Ping', parseFloat(data[0].ping)]
            ],
            type: 'gauge',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        gauge: {
            label: {
                format: function (value, ratio) {
                    return value;
                },
            },
            min: minMax[0],
            max: minMax[1],
            units: 'ms',
            width: 20
        },
        color: {
            pattern: ["#36B9CC"],
            threshold: {   
                unit: 'value',
            }
        },
        size: {
            height: 180
        }
    });
}

function latencyGauge(data, minMax) {
    let latency_gauge = c3.generate({
        bindto: '#latency_gauge',
        data: {
            columns: [
                ['Latency', parseFloat(data[0].latency)]
            ],
            type: 'gauge',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        gauge: {
            label: {
                format: function (value, ratio) {
                    return value;
                },
            },
            min: minMax[0],
            max: minMax[1],
            units: 'ms',
            width: 20
        },
        color: {
            pattern: ["#F6C23E"],
            threshold: {   
                unit: 'value',
            }
        },
        size: {
            height: 180
        }
    });
}

$(document).ready (function () {
    url = 'http://127.0.0.1:6080/data';
    const download_mean = $('#download_mean'),
        upload_mean = $('#upload_mean'),
        ping_mean = $('#ping_mean'),
        latency_mean = $('#latency_mean');

    $.getJSON(url, function (data) {
        let pData = processData(data);
        download_mean.text(meanResult(pData)[0] + ' Mbps');
        upload_mean.text(meanResult(pData)[1] + ' Mbps');
        ping_mean.text(meanResult(pData)[2] + ' ms');
        latency_mean.text(meanResult(pData)[3] + ' ms');


        downloadChart(pData);
        uploadChart(pData);
        downloadGauge(processData(data), minMax(pData, 'download'));
        uploadGauge(processData(data), minMax(pData, 'upload'));
        pingGauge(processData(data), minMax(pData, 'ping'));
        latencyGauge(processData(data), minMax(pData, 'latency'));
    });
});
