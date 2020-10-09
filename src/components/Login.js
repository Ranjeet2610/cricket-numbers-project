import React, { Component } from 'react'
import '../Login.css';
import mainLogo from '../betfun-logo.png';
import Modal from '../components/errMsg'
import Users from '../Services/users';
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            errMsg:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.users =new Users();
    }



    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value

        });
    }
    handleSubmit(event) {
        event.preventDefault();

        const user = {
            userName: this.state.userName,
            password: this.state.password
        };

        if (this.state.userName && this.state.password) {
            this.users.login(user,data=>{
                if(data.error){
                    // return alert("invalid email or password");
                    this.setState({
                        errMsg:'Invalid username or password...!'
                    })
                }else{
                localStorage.setItem('data', JSON.stringify(data.data.data));
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('refreshToken', data.data.refreshToken);
                this.users.getUserExposure({userid:data.data.data.id},data=>{
                   localStorage.setItem('expo', JSON.stringify(data));
                 
                    window.location.href = window.location.protocol+"//"+window.location.host+'/dashboard';
                })
               
                }
            });

        }
    }

    render() {

        return (
            <body 
            oncontextmenu="if (!window.__cfRLUnblockHandlers) return false; return false;" 
            oncopy="if (!window.__cfRLUnblockHandlers) return false; return false;" 
            oncut="if (!window.__cfRLUnblockHandlers) return false; return false;" 
            onpaste="if (!window.__cfRLUnblockHandlers) return false; return false;" className="bg_login">
            {//<Modal error={`Invalid password...!`} show={this.state.errDiv}/>
        }
                <div id="wrapper">
                    <div className="logo"><img src={mainLogo} alt="..." /></div>
                    <div id="login" className=" form">
                        <section className="login_content">
                            <form onSubmit={this.handleSubmit} method="post" acceptCharset="utf-8" autoComplete="off"><input type="hidden" name="compute" defaultValue="71aff27bb927f4b17e66e3191e5d147d" />
                                <div>
                                    <label> Username</label>
                                    <div className="linput">  
                                        <input type="text" name="userName" onChange={this.handleChange} className="form-control" placeholder="Enter username" />
                                    </div>
                                </div>
                                <div>
                                    <label> Password</label>
                                    <div className="linput">  
                                        <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder="Password" />
                                    </div>
                                </div>
                                <div>
                                    {this.state.errMsg ? <span style={{color:'red'}}>{this.state.errMsg}</span> : null}
                                </div>
                                <div>
                                    <button className="btn btn-default submit">Log in</button>
                                </div>
                                <div className="clearfix" />
                            </form>          </section>
                    </div>
                </div>
            </body>


        );
    }
}




