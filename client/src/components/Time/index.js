import React from "react";
import moment from "moment";


function Time () {
    return (
        <div>
            {moment().format('LT').split(' ')[0]}
        </div>
    )
}

export default Time;