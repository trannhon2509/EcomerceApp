import React, { Component } from 'react'
import '../assets/css/Acording.css'
export default class Acrording extends Component {
    render() {
        return (
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-lg-0">
                        <div className="mx-auto text-center">
                            <img src="https://www.bootdey.com/image/800x540/FF7F50/000000" className="rounded" alt="..." />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="ps-lg-6 ps-xl-10 w-lg-90">
                            <div className="mb-4">
                                <h2 className="w-90">The greater part of the people trust on us</h2>
                            </div>
                            <p className="mb-4">
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or randomised words which don't look even slightly
                                believable.
                            </p>
                            <div id="accordion" className="accordion-style">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">How quick will my credit be subsidized?</button>
                                        </h5>
                                    </div>
                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-bs-parent="#accordion" style={{}}>
                                        <div className="card-body position-relative">There are many variations of passages of Lorem
                                            Ipsum available, but the majority have suffered alteration in some form, by injected
                                            humour, or randomised words which don't look even slightly believable.There are many
                                            variations
                                            of passages of Lorem Ipsum available, but the majority have suffered alteration in
                                            some form, by injected humour, or randomised.
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">What is outsourced financial support?</button>
                                        </h5>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
                                        <div className="card-body position-relative">
                                            It is a long established fact that a reader will be distracted by the readable
                                            content of a page when looking at its layout. The point of using Lorem Ipsum is that
                                            it has a more-or-less normal distribution of letters, as opposed to using 'Content
                                            here,
                                            content here', making it look like readable English.
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingThree">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">How long is an affirmed financing cost and credit
                                                offer substantial?</button>
                                        </h5>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordion">
                                        <div className="card-body position-relative">
                                            Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                                            default model text, and a search for 'lorem ipsum' will uncover many web sites still
                                            in their infancy. Various versions have evolved over the years, sometimes by
                                            accident,
                                            sometimes on purpose (injected humour and the like).
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingFour">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">What sorts of commercial enterprise financing do
                                                you offer?</button>
                                        </h5>
                                    </div>
                                    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-bs-parent="#accordion">
                                        <div className="card-body position-relative">
                                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                                            Ipsum passages, and more recently with desktop publishing software like Aldus
                                            PageMaker including versions of Lorem Ipsum.
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingFive">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">How might I roll out an improvement to my
                                                application?</button>
                                        </h5>
                                    </div>
                                    <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-bs-parent="#accordion">
                                        <div className="card-body position-relative">
                                            All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as
                                            necessary, Making this the first true generator on the Internet. It uses a
                                            dictionary of over 200 Latin words, combined with a handful of model sentence
                                            structures, to
                                            generate Lorem Ipsum which looks reasonable.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
