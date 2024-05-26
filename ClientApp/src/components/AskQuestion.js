import React, { Component } from 'react'
import '../assets/css/AskQuestion.css'
export default class AskQuestion extends Component {
  render() {
    return (
      <section className="ftco-section bg-light ftco-faqs">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-md-last">
              <div className="img img-video d-flex align-self-stretch align-items-center justify-content-center justify-content-md-center mb-4 mb-sm-0" style={{ backgroundImage: 'url(https://www.bootdey.com/image/350x280/87CEFA/000000)' }}>
                <a href="#" className="icon-video popup-vimeo d-flex justify-content-center align-items-center">
                  <span className="fa fa-play" />
                </a>
              </div>
              <div className="d-flex mt-3">
                <div className="img img-2 mr-md-2" style={{ backgroundImage: 'url(https://www.bootdey.com/image/240x240/FFB6C1/000000)' }} />
                <div className="img img-2 ml-md-2" style={{ backgroundImage: 'url(https://www.bootdey.com/image/240x240/20B2AA/000000)' }} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="heading-section mb-5 mt-5 mt-lg-0">
                <h2 className="mb-3">Frequently Asks Questions</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                  there live the blind texts.</p>
              </div>
              <div id="accordion" className="myaccordion w-100" aria-multiselectable="true">
                <div className="card">
                  <div className="card-header p-0" id="headingOne">
                    <h2 className="mb-0">
                      <button href="#collapseOne" className="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link text-decoration-none" data-parent="#accordion" data-toggle="collapse" aria-expanded="true" aria-controls="collapseOne">
                        <p className="mb-0">How to train your pet dog?</p>
                      </button>
                    </h2>
                  </div>
                  <div className="collapse show" id="collapseOne" role="tabpanel" aria-labelledby="headingOne" style={{}}>
                    <div className="card-body py-3 px-0">
                      <ol>
                        <li>Far far away, behind the word mountains</li>
                        <li>Consonantia, there live the blind texts</li>
                        <li>When she reached the first hills of the Italic Mountains</li>
                        <li>Bookmarksgrove, the headline of Alphabet Village</li>
                        <li>Separated they live in Bookmarksgrove right</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header p-0" id="headingTwo" role="tab">
                    <h2 className="mb-0">
                      <button href="#collapseTwo" className="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link text-decoration-none collapsed" data-parent="#accordion" data-toggle="collapse" aria-expanded="false" aria-controls="collapseTwo">
                        <p className="mb-0">How to manage your pets?</p>
                      </button>
                    </h2>
                  </div>
                  <div className="collapse" id="collapseTwo" role="tabpanel" aria-labelledby="headingTwo" style={{}}>
                    <div className="card-body py-3 px-0">
                      <ol>
                        <li>Far far away, behind the word mountains</li>
                        <li>Consonantia, there live the blind texts</li>
                        <li>When she reached the first hills of the Italic Mountains</li>
                        <li>Bookmarksgrove, the headline of Alphabet Village</li>
                        <li>Separated they live in Bookmarksgrove right</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header p-0" id="headingThree" role="tab">
                    <h2 className="mb-0">
                      <button href="#collapseThree" className="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link text-decoration-none collapsed" data-parent="#accordion" data-toggle="collapse" aria-expanded="false" aria-controls="collapseThree">
                        <p className="mb-0">What is the best grooming for your pets?</p>
                      </button>
                    </h2>
                  </div>
                  <div className="collapse" id="collapseThree" role="tabpanel" aria-labelledby="headingTwo" style={{}}>
                    <div className="card-body py-3 px-0">
                      <ol>
                        <li>Far far away, behind the word mountains</li>
                        <li>Consonantia, there live the blind texts</li>
                        <li>When she reached the first hills of the Italic Mountains</li>
                        <li>Bookmarksgrove, the headline of Alphabet Village</li>
                        <li>Separated they live in Bookmarksgrove right</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header p-0" id="headingFour" role="tab">
                    <h2 className="mb-0">
                      <button href="#collapseFour" className="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link text-decoration-none collapsed" data-parent="#accordion" data-toggle="collapse" aria-expanded="false" aria-controls="collapseFour">
                        <p className="mb-0">What are those requirements for sitting pets?</p>
                      </button>
                    </h2>
                  </div>
                  <div className="collapse" id="collapseFour" role="tabpanel" aria-labelledby="headingTwo">
                    <div className="card-body py-3 px-0">
                      <p>
                        Far far away, behind the word mountains, far from the countries Vokalia and
                        Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
                        right at the coast of the Semantics, a large
                        language ocean.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    )
  }
}
