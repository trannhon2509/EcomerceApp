import React, { Component } from 'react'
import '../assets/css/Product.css'
import ProductCard from '../components/ProductClient/ProductCard'
import Card from '../components/Card';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
class Product extends Component {

  state = {
    currentPage: 1,
    totalPages: 1,
    pageSize: 6, // Set the page size
    products: [],
    loading: true,
    error: null
};

componentDidMount() {
    this.fetchData(1);
}

fetchData = async (page) => {
    const { pageSize } = this.state;
    try {
        const response = await axios.get(`api/products?page=${page}&pageSize=${pageSize}`);
        const { results, totalPages } = response.data;
        this.setState({
            products: results,
            totalPages,
            loading: false,
            error: null
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        this.setState({
            loading: false,
            error: 'Failed to fetch products'
        });
    }
};

handlePageChange = (selectedPage) => {
    const { selected } = selectedPage;
    const newPage = selected + 1;
    this.setState({ currentPage: newPage });
    this.fetchData(newPage);
};
  render() {
    const { loading, error, products, totalPages, currentPage } = this.state;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
      <div className='py-5'>
        <div className="container">
          <div className="row">
            <div className="col-sm-3 col-md-3 col-lg-3">
              <div className="row d-block d-sm-none">
                <div className="col-12">
                  <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                    Filter products
                  </a>
                </div>
              </div>
              <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                  <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body"> <div className="">
                  <form>
                    <div className="well">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search products..." />
                            <span className="input-group-btn">
                              <button className="btn btn-primary" type="submit">
                                <i className="fa fa-search" />
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <form className="shop__filter">
                    <h3 className="headline">
                      <span>Price</span>
                    </h3>
                    <div className="radio">
                      <input type="radio" name="shop-filter__price" id="shop-filter-price_1" defaultValue defaultChecked />
                      <label htmlFor="shop-filter-price_1">Under $25</label>
                    </div>
                    <div className="radio">
                      <input type="radio" name="shop-filter__price" id="shop-filter-price_2" defaultValue />
                      <label htmlFor="shop-filter-price_2">$25 to $50</label>
                    </div>
                    <div className="radio">
                      <input type="radio" name="shop-filter__price" id="shop-filter-price_3" defaultValue />
                      <label htmlFor="shop-filter-price_3">$50 to $100</label>
                    </div>
                    <div className="radio">
                      <input type="radio" name="shop-filter__price" id="shop-filter-price_4" defaultValue="specify" />
                      <label htmlFor="shop-filter-price_4">Other (specify)</label>
                    </div>
                    <div className="form-group shop-filter__price">
                      <div className="row">
                        <div className="col-xs-4">
                          <label htmlFor="shop-filter-price_from" className="sr-only" />
                          <input id="shop-filter-price_from" type="number" min={0} className="form-control" placeholder="From" disabled />
                        </div>
                        <div className="col-xs-4">
                          <label htmlFor="shop-filter-price_to" className="sr-only" />
                          <input id="shop-filter-price_to" type="number" min={0} className="form-control" placeholder="To" disabled />
                        </div>
                        <div className="col-xs-4">
                          <button type="submit" className="btn btn-block btn-default" disabled>Go</button>
                        </div>
                      </div>
                    </div>
                    <h3 className="headline">
                      <span>Brand</span>
                    </h3>
                    <div className="checkbox">
                      <input type="checkbox" defaultValue id="shop-filter-checkbox_1" defaultChecked />
                      <label htmlFor="shop-filter-checkbox_1">Adidas</label>
                    </div>
                    <div className="checkbox">
                      <input type="checkbox" defaultValue id="shop-filter-checkbox_2" />
                      <label htmlFor="shop-filter-checkbox_2">Calvin Klein</label>
                    </div>
                    <div className="checkbox">
                      <input type="checkbox" defaultValue id="shop-filter-checkbox_3" />
                      <label htmlFor="shop-filter-checkbox_3">Columbia</label>
                    </div>
                    <div className="checkbox">
                      <input type="checkbox" defaultValue id="shop-filter-checkbox_4" />
                      <label htmlFor="shop-filter-checkbox_4">Tommy Hilfiger</label>
                    </div>
                    <div className="checkbox">
                      <input type="checkbox" defaultValue id="shop-filter-checkbox_5" />
                      <label htmlFor="shop-filter-checkbox_5">Not specified</label>
                    </div>
                    <h3 className="headline">
                      <span>Material</span>
                    </h3>
                    <div className="radio">
                      <input type="radio" name="shop-filter__radio" id="shop-filter-radio_1" defaultValue defaultChecked />
                      <label htmlFor="shop-filter-radio_1">100% Cotton</label>
                    </div>
                    <div className="radio">
                      <input type="radio" name="shop-filter__radio" id="shop-filter-radio_2" defaultValue />
                      <label htmlFor="shop-filter-radio_2">Bamboo</label>
                    </div>
                    <div className="radio">
                      <input type="radio" name="shop-filter__radio" id="shop-filter-radio_3" defaultValue />
                      <label htmlFor="shop-filter-radio_3">Leather</label>
                    </div>
                    <div className="radio">
                      <input type="radio" name="shop-filter__radio" id="shop-filter-radio_4" defaultValue />
                      <label htmlFor="shop-filter-radio_4">Polyester</label>
                    </div>
                    <div className="radio">
                      <input type="radio" name="shop-filter__radio" id="shop-filter-radio_5" defaultValue />
                      <label htmlFor="shop-filter-radio_5">Not specified</label>
                    </div>
                    <h3 className="headline">
                      <span>Colors</span>
                    </h3>
                    <div className="shop-filter__color">
                      <input type="text" id="shop-filter-color_1" defaultValue data-input-color="black" />
                      <label htmlFor="shop-filter-color_1" style={{ backgroundColor: 'black' }} />
                    </div>
                    <div className="shop-filter__color">
                      <input type="text" id="shop-filter-color_2" defaultValue data-input-color="gray" />
                      <label htmlFor="shop-filter-color_2" style={{ backgroundColor: 'gray' }} />
                    </div>
                    <div className="shop-filter__color">
                      <input type="text" id="shop-filter-color_3" defaultValue data-input-color="brown" />
                      <label htmlFor="shop-filter-color_3" style={{ backgroundColor: 'brown' }} />
                    </div>
                    <div className="shop-filter__color">
                      <input type="text" id="shop-filter-color_4" defaultValue data-input-color="beige" />
                      <label htmlFor="shop-filter-color_4" style={{ backgroundColor: 'beige' }} />
                    </div>
                    <div className="shop-filter__color">
                      <input type="text" id="shop-filter-color_5" defaultValue data-input-color="white" />
                      <label htmlFor="shop-filter-color_5" style={{ backgroundColor: 'white' }} />
                    </div>
                  </form>
                </div></div>

              </div>
              <form className='d-none d-sm-block'>
                <div className="well">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search products..." />
                        <span className="input-group-btn">
                          <button className="btn btn-primary" type="submit">
                            <i className="fa fa-search" />
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <form className="shop__filter d-none d-sm-block">
                <h3 className="headline">
                  <span>Price</span>
                </h3>
                <div className="radio">
                  <input type="radio" name="shop-filter__price" id="shop-filter-price_1" defaultValue defaultChecked />
                  <label htmlFor="shop-filter-price_1">All price</label>
                </div>
                <div className="radio">
                  <input type="radio" name="shop-filter__price" id="shop-filter-price_2" defaultValue />
                  <label htmlFor="shop-filter-price_2">$25 to $50</label>
                </div>
                <div className="radio">
                  <input type="radio" name="shop-filter__price" id="shop-filter-price_3" defaultValue />
                  <label htmlFor="shop-filter-price_3">$50 to $100</label>
                </div>

                <div className="radio">
                  <input type="radio" name="shop-filter__price" id="shop-filter-price_4" defaultValue="specify" />
                  <label htmlFor="shop-filter-price_4">Other (specify)</label>
                </div>
                <div className="form-group shop-filter__price">
                  <div className="row">
                    <div className="col-xs-4">
                      <label htmlFor="shop-filter-price_from" className="sr-only" />
                      <input id="shop-filter-price_from" type="number" min={0} className="form-control" placeholder="From"  />
                    </div>
                    <div className="col-xs-4 my-2">
                      <label htmlFor="shop-filter-price_to" className="sr-only" />
                      <input id="shop-filter-price_to" type="number" min={0} className="form-control" placeholder="To"  />
                    </div>
                    <div className="col-xs-4">
                      <button type="submit" className="btn w-100 btn-success my-2" >Go</button>
                    </div>
                  </div>
                </div>
                {/* <h3 className="headline">
                  <span>Brand</span>
                </h3>
                <div className="checkbox">
                  <input type="checkbox" defaultValue id="shop-filter-checkbox_1" defaultChecked />
                  <label htmlFor="shop-filter-checkbox_1">Adidas</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" defaultValue id="shop-filter-checkbox_2" />
                  <label htmlFor="shop-filter-checkbox_2">Calvin Klein</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" defaultValue id="shop-filter-checkbox_3" />
                  <label htmlFor="shop-filter-checkbox_3">Columbia</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" defaultValue id="shop-filter-checkbox_4" />
                  <label htmlFor="shop-filter-checkbox_4">Tommy Hilfiger</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" defaultValue id="shop-filter-checkbox_5" />
                  <label htmlFor="shop-filter-checkbox_5">Not specified</label>
                </div>
                <h3 className="headline">
                  <span>Material</span>
                </h3>
                <div className="radio">
                  <input type="radio" name="shop-filter__radio" id="shop-filter-radio_1" defaultValue defaultChecked />
                  <label htmlFor="shop-filter-radio_1">100% Cotton</label>
                </div>
                <div className="radio">
                  <input type="radio" name="shop-filter__radio" id="shop-filter-radio_2" defaultValue />
                  <label htmlFor="shop-filter-radio_2">Bamboo</label>
                </div>
                <div className="radio">
                  <input type="radio" name="shop-filter__radio" id="shop-filter-radio_3" defaultValue />
                  <label htmlFor="shop-filter-radio_3">Leather</label>
                </div>
                <div className="radio">
                  <input type="radio" name="shop-filter__radio" id="shop-filter-radio_4" defaultValue />
                  <label htmlFor="shop-filter-radio_4">Polyester</label>
                </div>
                <div className="radio">
                  <input type="radio" name="shop-filter__radio" id="shop-filter-radio_5" defaultValue />
                  <label htmlFor="shop-filter-radio_5">Not specified</label>
                </div>
                <h3 className="headline">
                  <span>Colors</span>
                </h3>
                <div className="shop-filter__color">
                  <input type="text" id="shop-filter-color_1" defaultValue data-input-color="black" />
                  <label htmlFor="shop-filter-color_1" style={{ backgroundColor: 'black' }} />
                </div>
                <div className="shop-filter__color">
                  <input type="text" id="shop-filter-color_2" defaultValue data-input-color="gray" />
                  <label htmlFor="shop-filter-color_2" style={{ backgroundColor: 'gray' }} />
                </div>
                <div className="shop-filter__color">
                  <input type="text" id="shop-filter-color_3" defaultValue data-input-color="brown" />
                  <label htmlFor="shop-filter-color_3" style={{ backgroundColor: 'brown' }} />
                </div>
                <div className="shop-filter__color">
                  <input type="text" id="shop-filter-color_4" defaultValue data-input-color="beige" />
                  <label htmlFor="shop-filter-color_4" style={{ backgroundColor: 'beige' }} />
                </div>
                <div className="shop-filter__color">
                  <input type="text" id="shop-filter-color_5" defaultValue data-input-color="white" />
                  <label htmlFor="shop-filter-color_5" style={{ backgroundColor: 'white' }} />
                </div> */}
              </form>
            </div>
            <div className="col-sm-9 col-md-9 mt-5 mt-md-0 mt-sm-5">

              <div className="row">

                <div className='container'>
                  <div className="menu-list-row">
                    <div className="row g-xxl-5 bydefault_show" id="menu-dish">
                                        {products.map((product) => (
                                            console.log(product),
                                            <ProductCard
                                                key={product.id}
                                                name={product.name}
                                                price={product.price}
                                                imageUrl={product.images[0].imageUrl}
                                                productId={product.id}
                                            />
                      ))}
                    </div>
                    <div className='mt-5'>
                    <ReactPaginate
                            pageCount={totalPages}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            onPageChange={this.handlePageChange}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            subContainerClassName={'pages pagination'}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLinkClassName="page-link"
                        />
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

const mapStateToProps = state => ({
    loading: state.products.loading,
    error: state.products.error,
    products: state.products.products
});

export default connect(mapStateToProps, { fetchProducts })(Product);