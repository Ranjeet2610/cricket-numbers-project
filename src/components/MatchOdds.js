import React, { Component } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Sidebet from "./SideBet";
import "../App.css";
import Service from "../Services/Service";
import LiveEvents from "../Services/livevents";
import Footer from "./footer";
import { Modal } from "react-bootstrap";
export default class MatchOdds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      userName: "",
      description: "",
      selection: "",
      odds: "",
      stack: "",
      status: "",
      bettype: "",
      marketOdds: "",
      betData: "",
      betProfit: "",
      betLoss: "",
      display: "none",
      isenable: true,
      fancyOdds: "",
      fancymarket: "",
      exporunnerdata: "",
      matchName:
        JSON.parse(localStorage.getItem("matchname")).name != undefined
          ? JSON.parse(localStorage.getItem("matchname")).name
          : " v ",
      timer: "",
      redirectToReferrer: false,
    };
    this.userDetails =
      JSON.parse(localStorage.getItem("data")) != undefined
        ? JSON.parse(localStorage.getItem("data"))
        : "";
  }
  handleInputValue(val) {
    //this.setState({ betProfit: val });
    let profit;
    let loss;
    let odds = this.state.betData.odds - 1;
    //console.log(this.state.betData.pData.selectionId);
    if (this.state.betData.type === "Back") {
      profit = Math.round(odds * val);
      loss = val ? val : 0.0;
    } else {
      profit = val;
      loss = Math.round(odds * val);
    }
    //document.getElementById('profit'+this.state.betData.pData.selectionId).innerText= profit;
    //document.getElementById('loss'+this.state.betData.pData.selectionId).innerText= loss;
  }
  StaKeAmount(ods, type) {
    let val = document.getElementById("stakeValue").value;
    let odds = ods - 1;
    if (type === "Back") {
      this.setState({
        betProfit: Math.round(odds * val),
        betLoss: val ? val : 0.0,
      });
    } else {
      this.setState({
        betProfit: val,
        betLoss: Math.round(odds * val),
      });
    }
  }

  placeBet(type, odds, data, pdata, mid) {
    if (
      this.userDetails.Master != true &&
      this.userDetails.Admin != true &&
      this.userDetails.superAdmin != true
    ) {
      this.setState({
        betData: {
          data: data,
          pData: pdata,
          type: type,
          odds: odds,
          mid: mid[0].marketId,
        },
        display: "block",
      });
      this.StaKeAmount(odds, type);
    }
  }
  betfancy(type, odds, data, pdata, selectoionData, mid, fancyType) {
    if (
      this.userDetails.Master != true &&
      this.userDetails.Admin != true &&
      this.userDetails.superAdmin != true
    ) {
      let fullData = Object.assign(pdata, {
        runnerName: selectoionData.runnerName,
        selectionId: selectoionData.selectionId,
      });
      this.setState({
        betData: {
          data: data,
          pData: fullData,
          type: type,
          odds: odds,
          mid: mid,
          betType: "Fancy",
          fancyType: fancyType,
        },
        display: "block",
      });
    }
    //this.StaKeAmount(odds,type);
  }

  componentDidMount() {
    var service = new Service();
    var livevents = new LiveEvents();
    this.interval = setInterval(
      () => {
        service.getListMarketType(this.props.match.params.id, (data) => {
          this.setState({
            marketOdds: data.odsData,
            isenable: data.isEnabled,
          });
          this.setState({
            data: data.pdata,
          });
        });
        livevents.getFancyMarket(this.props.match.params.id, (data) => {
          this.setState({
            fancyOdds: data.fodds,
            fancymarket: data.fancymarket,
          });
        });
      },

      1000
    );

    let countDownDate = new Date(
      JSON.parse(localStorage.getItem("matchname")).date
    ).getTime();
    var myfunc = setInterval(() => {
      var now = new Date().getTime();
      var timeleft = countDownDate - now;
      // Calculating the days, hours, minutes and seconds left
      var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      this.setState({
        timer: days + "d " + hours + "h " + minutes + "m " + seconds + "s ",
      });

      // Display the message when countdown is over
      if (timeleft < 0) {
        clearInterval(myfunc);
        this.setState({
          timer: "",
        });
      }
    }, 1000);
    service.geteventExpo(
      { eventID: this.props.match.params.id, userid: this.userDetails.id },
      (data) => {
        //console.log(data.data.runnersData)
        this.setState({
          exporunnerdata: data.data.runnersData,
        });
      }
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleRemove = (style) => {
    this.setState({
      display: style,
    });
  };

  render() {
    var arr;
    
    // console.log("pppppppppppppppppppppppppppppppppppppppp    ", this.props)
    let data;
    let fancymarket;
    let dataheader;
    let inplay;
    if (
      new Date(JSON.parse(localStorage.getItem("matchname")).date).getTime() >
      new Date().getTime()
    ) {
      inplay = "GOING IN-PLAY";
    } else {
      inplay = "IN-PLAY";
    }
    if (this.state.data.length > 0) {
      dataheader = (
        <tbody>
          <tr className="headings mobile_heading">
            <th className="fix_heading color_red">
              Min stake:100 Max stake:50000
            </th>
            <th> </th>
            <th> </th>
            <th className="back_heading_color">Back</th>
            <th className="lay_heading_color">Lay</th>
            <th> </th>
            <th> </th>
          </tr>
        </tbody>
      );
      let runners = this.state.data;
      let expoProfit = 0;
      // console.log("runners",runners)
      if (runners.length > 0) {
        data = runners.map((item, index) => {
          if (this.state.exporunnerdata.length > 0)
            expoProfit = this.state.exporunnerdata.filter(
              (itemexpo) => itemexpo.runnerId == item.selectionId
            )[0].exposure;
          //  console.log("sdfgsdf",expoProfit);

          let avilBlack;
          let availLay;
          if (this.state.marketOdds.length > 0) {
            let sordataBack = this.state.marketOdds[0].runners[
              index
            ].ex.availableToBack.sort(function (a, b) {
              return a.price - b.price;
            });
            if (sordataBack.length < 3) {
              sordataBack.unshift({ price: 0, size: 0.0 });
            }

            avilBlack = sordataBack.map((itemback) => {
              return (
                <td
                  className="32047099_0availableToBack2_price_1171389306"
                  onClick={() =>
                    this.placeBet(
                      "Back",
                      this.state.marketOdds[0].runners[index].ex
                        .availableToBack[2].price,
                      itemback,
                      item,
                      this.state.marketOdds
                    )
                  }
                >
                  <span id="32047099_0availableToBack2_price_1171389306">
                    {itemback.price}
                  </span>
                  <span id="32047099_0availableToBack2_size_1171389306">
                    {itemback.size}
                  </span>
                </td>
              );
            });
            let sordataLay = this.state.marketOdds[0].runners[
              index
            ].ex.availableToLay.sort(function (a, b) {
              return a.price - b.price;
            });
            if (sordataLay.length < 3) {
              sordataLay.push({ price: 0, size: 0.0 });
            }
            availLay = sordataLay.map((itemlay) => {
              return (
                <td
                  className="32047099_0availableToBack2_price_1171389306"
                  onClick={() =>
                    this.placeBet(
                      "Lay",
                      this.state.marketOdds[0].runners[index].ex
                        .availableToLay[0].price,
                      itemlay,
                      item,
                      this.state.marketOdds
                    )
                  }
                >
                  <span id="32047099_0availableToBack2_price_1171389306">
                    {itemlay.price}
                  </span>
                  <span id="32047099_0availableToBack2_size_1171389306">
                    {itemlay.size}
                  </span>
                </td>
              );
            });
          } else {
            avilBlack = [
              { price: 0, size: 0.0 },
              { price: 0, size: 0.0 },
              { price: 0, size: 0.0 },
            ].map((itemback) => {
              return (
                <td
                  className="32047099_0availableToBack2_price_1171389306"
                  onClick={() =>
                    this.placeBet(
                      "Back",
                      this.state.marketOdds[0].runners[index].ex
                        .availableToBack[2].price,
                      itemback,
                      item,
                      this.state.marketOdds
                    )
                  }
                >
                  <span id="32047099_0availableToBack2_price_1171389306">
                    {itemback.price}
                  </span>
                  <span id="32047099_0availableToBack2_size_1171389306">
                    {itemback.size}
                  </span>
                </td>
              );
            });
            availLay = [
              { price: 0, size: 0.0 },
              { price: 0, size: 0.0 },
              { price: 0, size: 0.0 },
            ].map((itemlay) => {
              return (
                <td
                  className="32047099_0availableToBack2_price_1171389306"
                  onClick={() =>
                    this.placeBet(
                      "Lay",
                      this.state.marketOdds[0].runners[index].ex
                        .availableToLay[0].price,
                      itemlay,
                      item,
                      this.state.marketOdds
                    )
                  }
                >
                  <span id="32047099_0availableToBack2_price_1171389306">
                    {itemlay.price}
                  </span>
                  <span id="32047099_0availableToBack2_size_1171389306">
                    {itemlay.size}
                  </span>
                </td>
              );
            });
          }
          return (
            <tr id="user_row0" className="back_lay_color runner-row-32047099">
              <td>
                <p className="runner_text" id="runnderName0">
                  {item.runnerName}{" "}
                </p>
                <p className="blue-odds" id={"profit" + item.selectionId}></p>
                <span
                  className="runner_amount"
                  style={{ color: "black" }}
                  id={"loss" + item.selectionId}
                >
                  {expoProfit}
                </span>
                <input
                  type="hidden"
                  className="position_1171389306"
                  id="selection_0"
                  data-id={32047099}
                  defaultValue={0}
                />
              </td>
              {avilBlack}
              {availLay}
            </tr>
          );
        });
      }
    } else {
      data = (
        <tbody>
          <tr className="headings mobile_heading">
            <th className="fix_heading color_red">
              Min stake:100 Max stake:50000{" "}
            </th>
            <th> </th>
            <th> </th>
            <th className="back_heading_color">Back</th>
            <th className="lay_heading_color">Lay</th>
            <th> </th>
            <th> </th>
          </tr>
          <tr id="user_row0" class="back_lay_color runner-row-32047099">
            <td>
              <p class="runner_text" id="runnderName0">
                {this.state.matchName.split(" v ")[0]}{" "}
              </p>
              <p class="blue-odds" id="Val1-117138930632047099">
                0
              </p>
              <span
                class="runner_amount"
                id="32047099_maxprofit_loss_runner_1171389306"
              >
                0
              </span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
          </tr>
          <tr id="user_row0" class="back_lay_color runner-row-32047099">
            <td>
              <p class="runner_text" id="runnderName0">
                {this.state.matchName.split(" v ")[1]}{" "}
              </p>
              <p class="blue-odds" id="Val1-117138930632047099">
                0
              </p>
              <span
                class="runner_amount"
                id="32047099_maxprofit_loss_runner_1171389306"
              >
                0
              </span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
            <td class="32047099_0availableToBack2_price_1171389306">
              <span id="32047099_0availableToBack2_price_1171389306">0</span>
              <span id="32047099_0availableToBack2_size_1171389306">0</span>
            </td>
          </tr>
        </tbody>
      );
    }
    
    if (this.state.fancymarket.length > 0) {
      // console.log(this.state.fancymarket)
      fancymarket = this.state.fancymarket.map((parentitem, index) => {
        return (
          <div>
            <div class="match_score_box">
              
                {
              //     <div class="modal-header mod-header">
              //   <div class="block_box">
              //     <span id="tital_change">
              //       <span id="fav29905278">
              //         <i class="fa fa-star-o" aria-hidden="true"></i>&nbsp;
              //         {parentitem.marketData.marketName.toLowerCase().replace('line','session')}
              //       </span>
              //      {
              //        console.log("marname",parentitem.marketData.marketName)
              //      }
              //     </span>
              //     <div class="block_box_btn">
              //       <button class="btn btn-primary btn-xs">Bets</button>
              //     </div>
              //   </div>
              // </div>
            }
            
              <div class="score_area">
                <span class="matchScore" id="matchScore_29905278">
                  {" "}
                </span>{" "}
              </div>
            </div>
            
              {
            //     <div className="fancy-heads">
            //   <div className="event-sports">&nbsp;&nbsp; </div>
            //   <div className="fancy_buttons">
            //     <div className="fancy-backs head-no">
            //       <strong>NO</strong>
            //     </div>
            //   </div>
            //   <div className="fancy_buttons">
            //     <div className="fancy-lays head-yes">
            //       <strong>YES</strong>
            //     </div>
            //   </div>
            // </div>
          }
          
            <div class="fancyAPI">
              <div
                class="block_box f_m_4138 fancy_5303 f_m_5303"
                data-id="5303"
              >
                <ul class="sport-high fancyListDiv">
                  <li>
                    <div class="ses-fan-box">
                      <table
                        class={`table table-striped   bulk_actions ${
                          parentitem.marketData.isEnabled
                            ? "fancyOddsDisabled"
                            : ""
                        }`}
                      >
                        {this.state.fancyOdds.length > 0 &&
                        this.state.fancyOdds[index] &&
                        this.state.fancyOdds[index].length > 0 ? (
                          this.state.fancyOdds[index][0].runners
                            .slice(0, 2)
                            .map((item, cindex) => {
                              if (item.ex.availableToBack.length < 1) {
                                item.ex.availableToBack.unshift({
                                  price: 0,
                                  size: 0,
                                });
                              }

                              if (item.ex.availableToLay.length < 1) {
                                item.ex.availableToLay.unshift({
                                  price: 0,
                                  size: 0,
                                });
                              }
                              return (
                                <tbody>
                                  <tr class="session_content">
                                    <td>
                                      <span
                                        class="fancyhead5303"
                                        id="fancy_name5303"
                                      >
                                      {                              
                                          //parentitem.runners[cindex].runnerName
                                          parentitem.marketData.marketName.toLowerCase().replace('line','session')
                                        }
                                      </span>
                                      <div className="block_box_btn" style={{marginRight:'50px'}}>
                                        <button className="btn btn-primary btn-xs" data-toggle="modal" data-target="#exampleModal" style={{color:'white',border:'none',outline:'none',backgroundColor:'#853395'}}>
                                          Book
                                        </button>
                                        <button className="btn btn-primary btn-xs" style={{color:'white',border:'none',outline:'none',backgroundColor:'#853395'}}>
                                          Bets
                                        </button>
                                      </div>
                                      {
                                        // console.log("fancyodds",parentitem)
                                      }
                                      
                                      <b class="fancyLia5303"></b>
                                      <p class="position_btn"></p>
                                    </td>
                                    <td></td>
                                    <td></td>

                                    {item.ex.availableToBack
                                      .slice(0, 1)
                                      .map((itemBack) => {
                                        return (
                                          <td
                                            class="fancy_lay"
                                            onClick={() =>
                                              this.betfancy(
                                                "Back",
                                                Math.round(itemBack.price),
                                                itemBack,
                                                parentitem,
                                                {
                                                  runnerName:
                                                    parentitem.runners[cindex]
                                                      .runnerName,
                                                  selectionId:
                                                    parentitem.runners[cindex]
                                                      .selectionId,
                                                },
                                                parentitem.marketData.marketId,
                                                "NO"
                                              )
                                            }
                                          >
                                            <button
                                              class="lay-cell cell-btn"
                                              id="LayNO_5303"
                                            >
                                              {Math.round(itemBack.price)}
                                            </button>
                                            <button
                                              id="NoValume_5303"
                                              class="disab-btn"
                                            >
                                              {Math.round(itemBack.price) > 0
                                                ? 100
                                                : itemBack.size}
                                            </button>
                                          </td>
                                        );
                                      })}
                                    {item.ex.availableToLay
                                      .slice(0, 1)
                                      .map((itemLay) => {
                                        return (
                                          <td
                                            class="fancy_back"
                                            onClick={() =>
                                              this.betfancy(
                                                "Lay",
                                                Math.round(itemLay.price),
                                                itemLay,
                                                parentitem,
                                                {
                                                  runnerName:
                                                    parentitem.runners[cindex]
                                                      .runnerName,
                                                  selectionId:
                                                    parentitem.runners[cindex]
                                                      .selectionId,
                                                },
                                                parentitem.marketData.marketId,
                                                "YES"
                                              )
                                            }
                                          >
                                            <button
                                              class="back-cell cell-btn"
                                              id="BackYes_5303"
                                            >
                                              {Math.round(itemLay.price)}
                                            </button>
                                            <button
                                              id="YesValume_5303"
                                              class="disab-btn"
                                            >
                                              {Math.round(itemLay.price) > 0
                                                ? 100
                                                : itemLay.size}
                                            </button>
                                          </td>
                                        );
                                      })}
                                    <td></td>
                                    <td></td>
                                  </tr>{" "}

                                  {
                                    // Modal for Book
                                  }
                                  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLabel">Fancy Position</h5>
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div class="modal-body">
                                          <div className="" style={{paddingRight:'25px',paddingLeft:'25px'}}>
                                            <span className="" style={{fontSize:'15px',fontWeight:'bold'}}>odds</span><span style={{fontSize:'15px',fontWeight:'bold',color:'green',float:'right'}}>stack</span>
                                          </div>
                                        </div>
                                        {
                                        //   <div class="modal-footer">
                                        //   <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        //   <button type="button" class="btn btn-primary">Save changes</button>
                                        // </div>
                                      }
                                      </div>
                                    </div>
                                  </div>

                                </tbody>
                              );
                            })
                        ) : (
                          <tbody>
                            <tr class="session_content">
                              <td>
                                <span class="fancyhead5303" id="fancy_name5303">
                                  10 Runs or more
                                </span>
                                <b class="fancyLia5303"></b>
                                <p class="position_btn"></p>
                              </td>
                              <td></td>
                              <td></td>
                              <td class="fancy_lay">
                                <button
                                  class="lay-cell cell-btn"
                                  id="LayNO_5303"
                                >
                                  0
                                </button>
                                <button id="NoValume_5303" class="disab-btn">
                                  0
                                </button>
                              </td>
                              <td class="fancy_back">
                                <button
                                  class="back-cell cell-btn"
                                  id="BackYes_5303"
                                >
                                  0
                                </button>
                                <button id="YesValume_5303" class="disab-btn">
                                  0
                                </button>
                              </td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr class="session_content">
                              <td>
                                <span class="fancyhead5303" id="fancy_name5303">
                                  10 Runs or more
                                </span>
                                <b class="fancyLia5303"></b>
                                <p class="position_btn"></p>
                              </td>
                              <td></td>
                              <td></td>
                              <td class="fancy_lay">
                                <button
                                  class="lay-cell cell-btn"
                                  id="LayNO_5303"
                                >
                                  0
                                </button>
                                <button id="NoValume_5303" class="disab-btn">
                                  0
                                </button>
                              </td>
                              <td class="fancy_back">
                                <button
                                  class="back-cell cell-btn"
                                  id="BackYes_5303"
                                >
                                  0
                                </button>
                                <button id="YesValume_5303" class="disab-btn">
                                  0
                                </button>
                              </td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        )}
                      </table>
                      <div class="show_msg_box_5303"> </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="forModal" />
        <div class="container body">
          <div class="main_container" id="sticky">
            <div class="right_col" role="main">
              <div class="fullrow tile_count">
                <div className="col-md-8">
                  <div id="UpCommingData" style={{ display: "none" }} />
                  <div id="MatchOddInfo">
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n   .block_box_btn button{margin-right: 3px;}\n",
                      }}
                    />
                    <div
                      className="fullrow matchBoxMain  matchBox_29905278 matchBoxs_1171389306"
                      style={{}}
                    >
                      <div className="modal-dialog-staff">
                        {/* dialog body */}
                        <div className="match_score_box">
                          <div className="modal-header mod-header">
                            <div className="block_box">
                              <span id="tital_change">
                                <span id="fav29905278">
                                  <i
                                    onclick="FavFunc(29905278,'1.171389306')"
                                    className="fa fa-star-o"
                                    aria-hidden="true"
                                  />
                                  &nbsp;{this.state.matchName}
                                </span>
                                <input
                                  type="hidden"
                                  defaultValue="Match Name"
                                  id="sportName_29905278"
                                />
                              </span>
                              <div className="block_box_btn">
                                <button className="btn btn-primary btn-xs">
                                  Bets
                                </button>
                              </div>
                              {/* Bets Modal */}
                            </div>
                          </div>
                          <div className="score_area">
                            <span
                              style={{}}
                              className="matchScore"
                              id="matchScore_29905278"
                            >
                              {" "}
                            </span>{" "}
                          </div>
                        </div>
                        <div
                          className="matchClosedBox_1171389306"
                          style={{ display: "none" }}
                        >
                          <div className="fullrow fullrownew">
                            <div className="pre-text">
                              <br />
                              <span className="match-colsed"> Closed </span>
                            </div>
                            <div className="matchTime">
                              14/07/2020 01:30 PM{" "}
                            </div>
                          </div>
                          <div>
                            <div className="closedBox">
                              <h1>Closed</h1>
                            </div>
                          </div>
                        </div>
                        <div className="sportrow-4 matchOpenBox_1171389306">
                          <div className="match-odds-sec">
                            <div className="item match-status">Match Odds</div>
                            <div className="item match-status-odds">
                              <span className="going_inplay"> {inplay} </span>
                              <span className="click-tv">
                                <img
                                  className="tv-icons"
                                  onclick="showTv();"
                                  src="http://park9.bet/assets/images/tv-screen.png"
                                />
                              </span>
                            </div>
                            <div
                              className="item match-shedule"
                              id="demo_29905278"
                            >
                              {this.state.timer}
                            </div>
                          </div>
                          <div
                            className="fullrow MatchIndentB"
                            style={{ position: "relative" }}
                          >
                            <table
                              className={`table table-striped  bulk_actions matchTable1171389306 ${
                                this.state.isenable ? "betting-disabled" : ""
                              }`}
                              id="matchTable29905278"
                            >
                              {dataheader}
                              {data}
                            </table>
                          </div>
                        </div>
                        <div className="otherMarket_29905278" />
                        <div
                          className="fullrow margin_bottom fancybox"
                          id="fancyM_29905278"
                        >
                          <div
                            style={{ display: "block" }}
                            className="fancy-table"
                            id="fbox29905278"
                          >
                          <div className="modal-header mod-header" style={{marginTop:'25px'}}>
                            <div className="block_box">
                              <span id="tital_change">
                                <span id="fav29905278">
                                  <i
                                    onclick="FavFunc(29905278,'1.171389306')"
                                    className="fa fa-star-o"
                                    aria-hidden="true"
                                  />
                                  &nbsp;{this.state.matchName}
                                </span>
                                <input
                                  type="hidden"
                                  defaultValue="Match Name"
                                  id="sportName_29905278"
                                />
                              </span>
                              {
                              //   <div className="block_box_btn">
                              //   <button className="btn btn-primary btn-xs">
                              //     Bets
                              //   </button>
                              // </div>
                            }
                              {/* Bets Modal */}
                            </div>
                          </div>

                          <div className="fancy-heads">
                            <div className="event-sports">&nbsp;&nbsp; </div>
                            <div className="fancy_buttons">
                              <div className="fancy-backs head-no" style={{backgroundColor:'#fa93a9'}}>
                                <strong>NO</strong>
                              </div>
                            </div>
                            <div className="fancy_buttons">
                              <div className="fancy-lays head-yes" style={{backgroundColor:'#72bbef'}}>
                                <strong>YES</strong>
                              </div>
                            </div>
                        </div>
                            {fancymarket}

                            <div className="fancyLM" />
                          </div>
                        </div>
                        <div id="tv-box-popup"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <Sidebet
                  betData={this.state.betData}
                  betProfit={this.state.betProfit}
                  handleRemove={(style) => {
                    this.handleRemove(style);
                  }}
                  betLoss={this.state.betLoss}
                  setdisplay={this.state.display}
                  eventId={this.props.match.params.id}
                  handleInput={(e) => this.handleInputValue(e)}
                  runnderData={this.state.data}
                  expoData={this.state.exporunnerdata}
                />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
