import React, { Component } from 'react'
import Service from '../Services/Service';
import Users from '../Services/users'
export default class SideBet extends Component {

  constructor(props) {
    super(props);
    this.state = {
        betData:'',
        profit:0.00,
        loss: 0.00,
        betHistroy:'',
        display:'none',
        IP:'',
        count:0,
        fcount:0,
        runnderData:'',
        getExpo:'',
        expoData:'',
        isMobile : window.matchMedia("only screen and (max-width: 480px)").matches,
        isTab      : window.matchMedia("only screen and (max-width: 767px)").matches,
        isDesktop : window.matchMedia("only screen and (max-width: 1280px)").matches,
      }
    this.placeBet = this.placeBet.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.service = new Service();
    this.users = new Users();
  }
  handleChange(e){
    e.preventDefault();
    let odds = this.state.betData.odds-1;
    if(this.state.betData.type === 'Back'){
      this.setState({
        profit:(odds*e.target.value).toFixed(2),
        loss:e.target.value?e.target.value:0.0
      });
      if(this.state.getExpo!=undefined && this.state.getExpo.length>0){
        this.state.expoData = this.state.getExpo.map(item=>{
          let updatedRunners ={};
          if(item.runnerId == this.props.betData.pData.selectionId){
            updatedRunners.exposure =item.exposure + parseFloat((odds*e.target.value).toFixed(2))
          }
          else{
            updatedRunners.exposure = item.exposure +(- parseFloat(e.target.value))
          }
          updatedRunners.runnerId = item.runnerId;
          return updatedRunners;
        });
      }else{
     this.state.expoData = this.state.runnderData.map(item=>{
        let updatedRunners ={};
        if(item.selectionId == this.props.betData.pData.selectionId){
          updatedRunners.exposure = parseFloat((odds*e.target.value).toFixed(2))
        }
        else{
          updatedRunners.exposure = - parseFloat(e.target.value)
        }
        updatedRunners.runnerId = item.selectionId;
      
        return updatedRunners;
      });
      }
    }else{
      this.setState({
        profit:e.target.value,
        loss:(odds*e.target.value).toFixed(2)
      });
      if(this.state.runnderData.length>0){
        this.state.expoData = this.state.getExpo.map(item=>{
          let updatedRunners ={};
          if(item.runnerId == this.props.betData.pData.selectionId){
            updatedRunners.exposure =item.exposure + (- parseFloat((odds*e.target.value).toFixed(2)))
          }
          else{
             updatedRunners.exposure = item.exposure + parseFloat(e.target.value)
          } 
             updatedRunners.runnerId = item.runnerId;
          return updatedRunners;
        });
      }
      else{
      this.state.expoData = this.state.runnderData.map(item=>{
        let updatedRunners ={};
        if(item.selectionId == this.props.betData.pData.selectionId){
          updatedRunners.exposure = - parseFloat((odds*e.target.value).toFixed(2))
        }
        else{
          updatedRunners.exposure = parseFloat(e.target.value)
        }
        updatedRunners.runnerId = item.selectionId;
        
        return updatedRunners;
      });
    }
    }
    if(this.props.betData.betType ==undefined)
    this.props.handleInput(e.target.value);
  }

  placeBet(e){
    // device 1 for desktop,2 for mobile,3 for tab
   
    let device;
    if(this.state.isMobile)
    device = 2;
    if(this.state.isDesktop)
    device = 1;
    if(this.state.isTab)
    device = 3;
       
    e.preventDefault();
    if(this.stackInput.value < 99 || this.stackInput.value > 49999 ){
       alert("Please choose correct stack with min 100 and max 50000 ");
    }
    else if(this.stackInput.value > JSON.parse(localStorage.getItem('data')).walletBalance){
      alert("Please check your wallet amount");
    }
    else{
    if(this.props.betData.betType !=undefined){
    this.service.fancyplaceBet(
      {
      userName:JSON.parse(localStorage.getItem('data')).userName,
      description:localStorage.getItem('matchname'),
      selection:this.runnerNameInput.value,
      selectionID:this.selectionIdInput.value,
      odds:this.odsInput.value,
      stack:this.stackInput.value,
      eventID:this.props.eventId,
      status:"open",
      marketID:this.props.betData.mid,
      profit:this.state.profit,
      loss:this.state.loss,
      IP:this.state.IP,
      device:device,
      marketType: this.props.betData.betType,
      bettype:this.isbackInput.value},data=>{   
    this.users.getMyprofile({userName:JSON.parse(localStorage.getItem('data')).userName},data=>{
      localStorage.setItem('data',JSON.stringify(data.data));
      alert("Bet Placed successfully !.Thanks");
      window.location.reload();     
      })
   
    })
  }
  else{
    this.service.placeBet({
      userName:JSON.parse(localStorage.getItem('data')).userName,
      description:localStorage.getItem('matchname'),
      selection:this.runnerNameInput.value,
      selectionID:this.selectionIdInput.value,
      odds:this.odsInput.value,
      stack:this.stackInput.value,
      eventID:this.props.eventId,
      status:"open",
      marketID:this.props.betData.mid,
      profit:this.state.profit,
      loss:this.state.loss,
      IP:this.state.IP,
      device:device,
      marketType: this.props.betData.betType !=undefined?this.props.betData.betType:'match odds',
      bettype:this.isbackInput.value},data=>{   
    this.users.getMyprofile({userName:JSON.parse(localStorage.getItem('data')).userName},data=>{
      localStorage.setItem('data',JSON.stringify(data.data));
      this.service.updateExpo({
        userid:JSON.parse(localStorage.getItem('data')).id,
        eventID:this.props.eventId,
        marketType: this.props.betData.betType !=undefined?this.props.betData.betType:'match odds',
        runnersData :this.state.expoData
      },ddata=>{
        this.users.getUserExposure({userid:JSON.parse(localStorage.getItem('data')).id},expodata=>{
          localStorage.setItem('expo', JSON.stringify(expodata));
          // console.log(expodata)
          alert("Bet Placed successfully !.Thanks");
          window.location.reload();
       })
    
      }); 
      })
    // }
   
    }) 
  }
}


  }
  componentDidMount() {
    document.getElementById('tital_change').focus();
    this.interval = setInterval(() => {
      this.setState({
        betData:this.props.betData
      });
      
    },2000)
    this.service.betHistory(JSON.parse(localStorage.getItem('data')).userName,this.props.eventId,'getUserOpenBetHistory',(data)=>{
      this.setState({
        betHistroy:data,
        count:data.length
              });
                         
    });
    this.service.getchipInfo({id:JSON.parse(localStorage.getItem('data')).id},(data)=>{
   //console.log(data)
                         
    });
    fetch("https://api.ipify.org?format=json")
    .then(response => {
      return response.json();
     }, "jsonp")
    .then(res => {
     this.setState({IP:res.ip});
    })
    .catch(err => console.log(err)) 
  }
  StaKeAmount(val,ods,type){
    document.getElementById('stakeValue').value = val
    if(this.props.betData.betType !=undefined){
      if(type=='Back'){
        this.setState({
          profit:Math.round(val),
          loss:val?val:0.0
        });
      }
      else{
        this.setState({
          profit:Math.round(val),
          loss:val?val:0.0
        });
      }

    }else{

  let odds = ods-1;
      if(type === 'Back'){
        this.setState({
          profit:(odds*val).toFixed(2),
          loss:val?val:0.0
        });
        if(this.state.getExpo!=undefined && this.state.getExpo.length>0){
          this.state.expoData = this.state.getExpo.map(item=>{
            let updatedRunners ={};
            if(item.runnerId == this.props.betData.pData.selectionId){
              updatedRunners.exposure =item.exposure + parseFloat((odds*val).toFixed(2))
            }
            else{
              updatedRunners.exposure = item.exposure +(- parseFloat(val))
            }
            updatedRunners.runnerId = item.runnerId;
            return updatedRunners;
          });
        }else{
        this.state.expoData = this.state.runnderData.map(item=>{
          let updatedRunners ={};
          if(item.selectionId == this.props.betData.pData.selectionId){
            updatedRunners.exposure = parseFloat((odds*val).toFixed(2))
          }
          else{
            updatedRunners.exposure = - parseFloat(val)
          }
          updatedRunners.runnerId = item.selectionId;
          
          return updatedRunners;
        });
      }
      }
      else{
        this.setState({
          profit:val,
          loss:(odds*val).toFixed(2)
        });
        if(this.state.getExpo!=undefined && this.state.getExpo.length>0){
          this.state.expoData = this.state.runnderData.map(item=>{
            let updatedRunners ={};
            if(item.runnerId == this.props.betData.pData.selectionId){
              updatedRunners.exposure =item.exposure + (- parseFloat((odds*val).toFixed(2)))
            }
            else{
              updatedRunners.exposure = item.exposure + parseFloat(val)
            }        
            updatedRunners.runnerId = item.runnerId;
            return updatedRunners;
          });
        }
        else{
        this.state.expoData = this.state.runnderData.map(item=>{
          let updatedRunners ={};
          if(item.selectionId == this.props.betData.pData.selectionId){
            updatedRunners.exposure = - parseFloat((odds*val).toFixed(2))
          }
          else{
            updatedRunners.exposure = parseFloat(val)
          }
          updatedRunners.runnerId = item.selectionId;
          
          return updatedRunners;
        });
      }
      }
    
      this.props.handleInput(val);
    }
    
  }
  getDataByType(e,type){
    this.removeActiveClass();
    e.target.parentElement.parentElement.classList.add('active')
    if(type=='Fancy'){
      this.service.betHistory(JSON.parse(localStorage.getItem('data')).userName,this.props.eventId,'getUserOpenfancyBetHistory',(data)=>{
        this.setState({
          betHistroy:data,
          fcount:data.length
                });             
      })
    }else{
    this.service.betHistory(JSON.parse(localStorage.getItem('data')).userName,this.props.eventId,'getUserOpenBetHistory',(data)=>{
      this.setState({
        betHistroy:data,
        count:data.length
              });             
    })
  }
  }
  currentPosition(e){
    this.removeActiveClass();
    e.target.parentElement.classList.add('active')
  }
  removeActiveClass(){
    var activeclass = document.querySelectorAll('#pills-tab li');
      for (var i = 0; i < activeclass.length; i++) {
       activeclass[i].classList.remove('active');
      }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentWillReceiveProps(nextProps){ //this is called to before render method
    if(nextProps.betProfit!==this.props.betProfit){
    this.setState({
      profit:nextProps.betProfit
     })
    }
    if(nextProps.betLoss!==this.props.betLoss){
      this.setState({
        loss:nextProps.betLoss
        })
      }
   if(nextProps.runnderData !== this.props.runnderData){
    this.setState({
      runnderData:nextProps.runnderData
      })
   }
   if(nextProps.getExpo !== this.props.expoData){
    this.setState({
      getExpo:nextProps.expoData
      })
   }
    }
  
    ClearAllSelection(){
      document.getElementById('stakeValue').value=0;
      let dval = 0.0;
       this.setState({
         profit:dval,
         loss:dval,
         display: 'none'
       });
     }
     handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      
     
    }
    render() {
    let ods =0;let runnerName ='';let type =''; let selectionId ='';let bethistory; let betProfit; let betLoss;
    let display = {display:this.state.display};
    if(this.props.betData){
      ods = this.props.betData.odds;
      type = this.props.betData.type;
      runnerName = this.props.betData.pData.runnerName;
      selectionId = this.props.betData.pData.selectionId;
    }
    if(this.props.setdisplay=='block'){
      display = {display:'block'};
    }
    betProfit = this.state.profit;
    betLoss = this.state.loss;
        
    if(this.state.betHistroy.length>0){
      bethistory = this.state.betHistroy.map((item,i)=>{
      return(<tr>
        <td>{i+1}</td>
      <td>{item.selection}</td>
        <td>{item.clientName}</td>
      <td>{item.odds}</td>
      <td>{item.stack}</td>
      <td>{item.bettype}</td>
      <td>{item.P_L}</td>
      <td>{item.createdDate}</td>
      <td>{item.userid}</td>
        <td> {item.IP}</td>
      </tr>);
      });
    }
  return (
    <div className="col-md-4 col-xs-12">
      <div className="other-items" style={{display:'none'}}>
        <div className="balance-box">
          <div className="panel-heading">
            <h3 className="bal-tittle">Top Casino Games </h3>
            <span className="pull-right clickable"><i className="fa fa-chevron-down" /></span>
          </div>
          <div className="balance-panel-body" style={{ display: 'block' }}>
          </div>
        </div>
      </div>
      <div className="betSlipBox" style={{}}>
        <div className="betslip-head">
          <span id="tital_change" className="item">Bet Slip</span>
          <a href="javascript:;" className="UserChipData" data-toggle="modal" data-target="#exampleModal" data-backdrop="static" data-keyboard="false">
            Edit Stake
        </a>
        </div>
        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Chip Setting</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
            <div class="modal-body row">
              <div class="col-md-6">
              
                <label>Chips Name 1:</label>
              <input type="text" className="form-control" defaultValue={500} />

              <label>Chips Name 2:</label>
              <input type="text" className="form-control" defaultValue={2000} />

              <label>Chips Name 3:</label>
              <input type="text" className="form-control" defaultValue={5000} />

              <label>Chips Name 4:</label>
              <input type="text" className="form-control" defaultValue={25000} />

              <label>Chips Name 5:</label>
              <input type="text" className="form-control" defaultValue={50000} />

              <label>Chips Name 6:</label>
              <input type="text" className="form-control" defaultValue={100000} /> 
              </div>
              <div class="col-md-6">
              <label>Chips Value 1:</label>
              <input type="text" className="form-control" defaultValue={500} />

              <label>Chips Value 2:</label>
              <input type="text" className="form-control" defaultValue={2000} />

              <label>Chips Value 3:</label>
              <input type="text" className="form-control" defaultValue={5000} />

              <label>Chips Value 4:</label>
              <input type="text" className="form-control" defaultValue={25000} />

              <label>Chips Value 5:</label>
              <input type="text" className="form-control" defaultValue={100000} />

              <label>Chips Value 6:</label>
              <input type="text" className="form-control" value="Enter" />
              </div>
          </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary text-center">Update ChipSetting</button>
            </div>
            </form>
          </div>
        </div>
      </div>
        {/* End Modal */}
        <div>
          <div className="betBox border-box" style={display}>
            <div className="block_box">
              <span id="msg_error" /><span id="errmsg" />
              <div className="loader" style={{display:'none'}}>
                <div className="spinner">
                  <div className="loader-inner box1" />
                  <div className="loader-inner box2" />
                  <div className="loader-inner box3" />
                </div>
              </div>
              <form method="POST" id="placeBetSilp" onSubmit={this.placeBet}><input type="hidden" name="compute" defaultValue="0868b55786c39fbc0074796526de70db" />
                <label className="control-label m-t-xs BetFor"> {type} (Bet For)</label>
                <div className="liabilityprofit" id=" ">
                  <span className="stake_label">Profit</span>
                  <div className="stack_input_field">
                  <span id="profitData" style={{ color: 'rgb(0, 124, 14)', fontWeight: 'bold' }}>{betProfit}</span>
                  </div>
                </div>
                <div className="liabilityprofit" id=" ">
                  <span className="stake_label">Loss</span>
                  <div className="stack_input_field">
                    <span id="LossData" style={{ color: 'rgb(255, 0, 0)', fontWeight: 'bold' }}>{betLoss}</span>
                  </div>
                </div>
                <div id="ShowRunnderName" className="match_runner_name">
                  {runnerName}
                </div>
                <div className="odds-stake">
                  <div className="item form-group full_rowOdd">
                    <span className="stake_label">Odd</span>
                    <div className="stack_input_field numbers-row">
                      <input type="number" min="0" step="0.01" id="ShowBetPrice"  name ="ods" ref={(input) => { this.odsInput = input }} value ={ods} className="calProfitLoss odds-input form-control  CommanBtn" />
                    </div>
                  </div>
                  <div className="item form-group" id=" ">
                    <span className="stake_label">Stake</span>
                    <div className="stack_input_field numbers-row">
                      <input type="number" pattern="[0-9]*" step={1} id="stakeValue" name ="stack" ref={(input) => { this.stackInput = input }} onChange={this.handleChange} defaultValue={0}  min="0" className="calProfitLoss stake-input form-control  CommanBtn" />
                      <input type="hidden" name="selectionId" id="selectionId" ref={(input) => { this.selectionIdInput = input }}  value ={selectionId} defaultValue className="form-control" />
                      <input type="hidden" name="runnerName" id="runnerName" ref={(input) => { this.runnerNameInput = input }}  value ={runnerName} defaultValue className="form-control" />                      
                      <input type="hidden" name="matchId" id="matchId" ref={(input) => { this.matchIdInput = input }}  defaultValue className="form-control" />
                      <input type="hidden" name="isback" id="isback" ref={(input) => { this.isbackInput = input }}  value={type} defaultValue className="form-control" />
                      <input type="hidden" name="MarketId" id="MarketId" ref={(input) => { this.MarketIdInput = input }}  defaultValue className="form-control" />
                      <input type="hidden" name="placeName" id="placeName" ref={(input) => { this.placeNameInput = input }}  defaultValue className="form-control" />
                      <input type="hidden" name="stackcount" id="stackcount" ref={(input) => { this.stackcountInput = input }}  defaultValue={0} className="form-control" />
                      <input type="hidden" name="isfancy" id="isfancy" ref={(input) => { this.isfancyInput = input }}  defaultValue={0} className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="betPriceBox">
                  <button className="btn  btn-success CommanBtn  chipName1" type="button" value={500} onClick={()=>this.StaKeAmount(500,ods,type)}>500</button>
                  <button className="btn  btn-success CommanBtn  chipName2" type="button" value={2000} onClick={()=>this.StaKeAmount(2000,ods,type)}>2000</button>
                  <button className="btn  btn-success CommanBtn  chipName3" type="button" value={5000} onClick={()=>this.StaKeAmount(5000,ods,type)}>5000</button>
                  <button className="btn  btn-success CommanBtn  chipName4" type="button" value={25000} onClick={()=>this.StaKeAmount(25000,ods,type)}>25000</button>
                  <button className="btn  btn-success CommanBtn  chipName5" type="button" value={50000} onClick={()=>this.StaKeAmount(50000,ods,type)}>50000</button>
                  {/* <button className="btn  btn-success CommanBtn  chipName6" type="button" value={100000} onClick={()=>this.StaKeAmount(100000,ods,type)}>100000</button>  */}
                  <button style={{backgroundColor:'red'}} className="btn  btn-success CommanBtn " type="button" onClick={() => this.ClearAllSelection()}>Clear</button>
                </div>
                <div className="betFooter">
                  <button className="btn btn-danger CommanBtn" type="button" onClick={() => {this.props.handleRemove("none")}}>Clear All</button>
                  <button className="btn btn-success  CommanBtn placebet" type="submit">Place Bet</button>
                  <button className="btn btn-success CommanBtn placefancy" type="button" onClick="PlaceFancy();" style={{ display: 'none' }}>Place Bet</button>
                </div>
              </form>
            </div>
          </div>
          <div className="tab_bets">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item betdata active-all active">
                <a className="allbet" href="javascript:void(0);" onClick={(e)=>this.getDataByType(e,'All')}><span className="bet-label">All Bet</span> <span id="cnt_row">({this.state.count})</span></a>
              </li>
              <li className="nav-item betdata active-unmatch" style={{ display: 'none' }}>
                <a className="unmatchbet" href="javascript:void(0);" onclick="getDataByType(this,'2');"><span className="bet-label">UnMatch Bet</span> <span id="cnt_row1">(0)</span> </a>
              </li>
              <li className="nav-item betdata">
                <a className="unmatchbet" href="javascript:void(0);" onClick={(e)=>this.getDataByType(e,'Fancy')}><span className="bet-label">Fancy Bet</span> <span id="cnt_row3">({this.state.fcount})</span> </a>
              </li>
              {/* <li className="nav-item active-position"><a className="currentposition" href="javascript:void(0);" onClick={(e)=>this.currentPosition(e)}>Current Position</a></li> */}
              <a className="btn full-btn" onclick="viewAllMatch()" href="javascript:void(0);"><img src="http://park9.bet/assets/images/full-size-btn.png" alt="..." /></a>
            </ul>
          </div>
        </div>
      </div>
      {/*- Match UnMatch data -*/}
      <div className id="MatchUnMatchBetaData"><style dangerouslySetInnerHTML={{ __html: "\n.searchbtnn{margin-right:20px;}\n" }} />
        <div className="border-box" id="accountView" role="main">
          <div className="fullrow">
            <div className="modal-dialog-staff">
              <div className="modal-content">
                <div className="modal-body"><span id="msg_error" /><span id="errmsg" />
                  <div className="match_bets MachShowHide">
                    <table className="table table-striped jambo_table bulk_action">
                      <thead>
                        <tr className="headings">
                          <td>No.</td>
                          <td>Runner</td>
                          <td> Client</td>
                          <td>Odds</td>
                          <td>Stack</td>
                          <td>Bet Type</td>
                          <td>P&L</td>
                          <td>Time</td>
                          <td>ID</td>
                          <td> IP</td>
                        </tr>
                      </thead>
                      <tbody>
                       
                      {bethistory}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*- User Current Position  -*/}
      <div className id="getUserPosition" style={{ display: 'none' }}>
      </div>
    </div>
  )
}
}