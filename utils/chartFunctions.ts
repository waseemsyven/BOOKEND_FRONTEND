interface Graph {
    [key: string]: any;
}

let globalTimeDuration = 10;

export const groupBy = (array: any, key: any) => {
    // Return the end result
    return array.reduce((result: any, currentValue: any) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        return result;
    }, {});
};

export const getTimeDuration = (timeDuration: number, internal = false) => {
    globalTimeDuration = timeDuration;
    var d = new Date();
    let start = d.setMinutes(d.getMinutes() - timeDuration);
    if(internal){
        return {start : Math.round(start / 1000), end: Math.round(Date.now() / 1000)}
    }
    return {
        epoch_start: Math.round(start / 1000) + "",
        epoch_end: Math.round(Date.now() / 1000) + "",
    };
};

export const getTime = (start_time: any) => {
    let date = new Date(start_time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let formatTime = hours + ":" + minutes.substr(-2);
    return formatTime;
};

export const formatData = (data: any) => {
    data = groupBy(data, "metric");
    let finalGraphObj = {} as Graph;
    let allChartTypes = getChartTypes(true);
    let newob = Object.assign(allChartTypes, data);
    Object.keys(newob).forEach((key) => {
        let newKey = key.replace(
            "aiplatform.googleapis.com/prediction/online/",
            ""
        );
        if (["replicas", "target_replicas"].indexOf(newKey) != -1) {
            finalGraphObj[newKey] = { value: newob[key].map((r: any) => { return r.value;}).pop(), time: new Date( newob[key].map((r: any) => { return r.start_time;}).pop() * 1000 ).toLocaleTimeString() }; //newob[key].map((r: any) => { return r.value;}).pop();
        } else if (["cpu/utilization"].indexOf(newKey) != -1) {
            finalGraphObj[newKey] = {
                y: newob[key].map((r: any) => {
                    return r.value * 100;
                }),
                x: newob[key].map((r: any) => {
                    return getTime(r.start_time);
                }),
            };
        }
        else if(["memory/bytes_used"].indexOf(newKey) != -1){
            
            finalGraphObj[newKey] = {
                y: newob[key].map((r: any) => {
                    return r.value / 1048576;
                }),
                x: newob[key].map((r: any) => {
                    return getTime(r.start_time);
                }),
            };
        }
        else
            finalGraphObj[newKey] = fillGraphData({
                y: newob[key].map((r: any) => {
                    return r.value;
                }),
                x: newob[key].map((r: any) => {
                    return getTime(r.start_time);
                }),
            }, newKey);
    });
    console.log(finalGraphObj)
    return finalGraphObj;
};

const getTimestampsFiller = () => {
    let result = getTimeDuration(globalTimeDuration, true) as any;
    let times = new Set();
    var i=0;
    for(i = result['start']; i <= result['end']; i++ ){
        times.add( getTime(i) )
    }
    return Array.from(times);
}

const fillGraphData = (graphAxes: any, type: string) => {
    if(["prediction_count", "response_count",'error_count'].indexOf(type) == -1)
        return graphAxes;

    let fillers = getTimestampsFiller();
    if(graphAxes['x'].length == 0){
        graphAxes['x'] = fillers.reverse();
        graphAxes['y'] = Array(fillers.length).fill(null);
    }
    else{
        let response = {x : fillers.reverse(), y: Array(fillers.length).fill(null)};
        graphAxes['x'].forEach((item:string, key: number) => {
            let position = response['x'].indexOf(item)
            response['y'][position] = graphAxes['y'][key]
        })
        graphAxes = response;
    }
    return graphAxes;
}

export const getChartTypes = (parsed = false) => {
    let types = {
        "aiplatform.googleapis.com/prediction/online/accelerator/duty_cycle": [],
        "aiplatform.googleapis.com/prediction/online/accelerator/memory/bytes_used": [],
        "aiplatform.googleapis.com/prediction/online/cpu/utilization": [],
        "aiplatform.googleapis.com/prediction/online/error_count": [],
        "aiplatform.googleapis.com/prediction/online/memory/bytes_used": [],
        "aiplatform.googleapis.com/prediction/online/network/received_bytes_count": [],
        "aiplatform.googleapis.com/prediction/online/network/sent_bytes_count": [],
        "aiplatform.googleapis.com/prediction/online/prediction_count": [],
        "aiplatform.googleapis.com/prediction/online/private/response_count": [],
        "aiplatform.googleapis.com/prediction/online/replicas": [],
        "aiplatform.googleapis.com/prediction/online/response_count": [],
        "aiplatform.googleapis.com/prediction/online/target_replicas": []
    }
    if(parsed)
        return types
    return Object.keys(types).join(',')
}