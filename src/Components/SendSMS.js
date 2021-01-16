import React from 'react';
import './SendSMSCSS.css';

const Monitor_MsgSize = () => {
    var Msg = document.getElementById("msg").value;
    var MsgLen = Msg.length;
    var MsgNum = parseInt(MsgLen/160) + 1;
    document.getElementById("msgSize").innerText = "  " + MsgLen + "/" + MsgNum;

}


class SendSMS extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageName:"SMS"
        }
    }


    SendMsgNow = () => {
        var Number = document.getElementById("number").value;
        var Msg = document.getElementById("msg").value;
        var msg91 = require("msg91")("", "TCHSIM", "4" );
        Number = Number.split(",")


        for(var i = 0; i<Number.length; i++){
            msg91.send(Number[i], Msg, function(err, response){
                console.log(err);
                console.log(response);
            });
        }

        this.setState({
            pageName:"Thanks"
        })

    }


    render() {
        if (this.state.pageName == "SMS"){
            return (
                <div>
                Mobile Number: <input className="inputBox" id = "number" type="text"/><br/><br/>
                Message: <textarea id = "msg" onKeyUp={Monitor_MsgSize} className="msgBox"/>
                <span id = "msgSize"></span>
                <br/><br/>
                <button className="btnClass" onClick={this.SendMsgNow}>SEND</button>
            </div>
            )
        }else {
            return (
                <div>
                    <h4>Thanks for SEND THE SMS from Us....</h4>
                    <button className="btnClass" onClick={() => {
                        this.setState({
                            pageName:"SMS"
                        })
                    }}>SEND Again</button>
                </div>
            )
        }
    }
}

export default SendSMS