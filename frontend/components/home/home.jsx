import React from 'react';
import SearchFormContainer from '../search/search_form_container';
import CityListsContainer from '../city_lists/city_lists_container';
import Slider from '../slideshow/slide';

import { Link } from 'react-router-dom';
import { ProtectedRoute } from '../../util/route_util';
import AddRestaurant from '../restaurant/add_restaurant_container';

export default () => (
  <section id="main-body">
    <section className="hero-img-container">
    </section>

    <section className="content">
      <div className="search-container">
        <SearchFormContainer />
      </div>
      <Slider />
      <CityListsContainer />
    </section>

    <section className="section-footer">
      <h4>Restaurateurs Join Us</h4>
      <p>Join the more than 40,000 restaurants which fill seats and</p>
      <p>manage reservations with StarTable.</p>
      <Link
        to="/restaurants/new"
        className="btn-demo"
        id="addRestaurant">
        Add you restaurant
      </Link>
    </section>

    <footer className="main-footer">
      <div className="footer-body">
        <div>
          <i class="fab fa-github"></i>
          <i class="fab fa-linkedin"></i>
        </div>
        <div>© 2018 StarTable </div>
      </div>
    </footer>
  </section>
);
