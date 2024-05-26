import React, { Component } from 'react'
import '../assets/css/Panel.css'
export default class Panel extends Component {
    render() {
        return (
            <div className="container bootstrap snippets bootdey">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-12 p-0">
                        <div className="panel panel-dark panel-colorful py-4 px-0">
                            <div className="panel-body text-center ">
                            <img src='/panel/wax.svg'  width={90} alt='scrunchies'/>
                                <p className="text-uppercase mar-btm text-sm fw-bold">Scented wax</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12 p-0">
                        <div className="panel panel-danger panel-colorful py-4 px-0">
                            <div className="panel-body text-center ">
                            <img src='/panel/hair.svg'  width={90} alt='scrunchies'/>
                                <p className="text-uppercase mar-btm text-sm fw-bold">Hair clips</p>
                            </div>
                        </div>
                    </div><div className="col-md-3 col-sm-6 col-xs-12 p-0">
                        <div className="panel panel-primary panel-colorful py-4 px-0">
                            <div className="panel-body text-center ">
                                <img src='/panel/scrun.svg'  width={90} alt='scrunchies'/>
                                <p className="text-uppercase mar-btm text-sm fw-bold">Scrunchies</p>
                            </div>
                        </div>
                    </div><div className="col-md-3 col-sm-6 col-xs-12 p-0">
                        <div className="panel panel-info panel-colorful py-4 px-0">
                            <div className="panel-body text-center ">
                            <img src='/panel/bada.svg'  width={90} alt='scrunchies'/>
                                <p className="text-uppercase mar-btm text-sm fw-bold">Bandana</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
