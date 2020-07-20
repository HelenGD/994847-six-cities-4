import * as React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import {ActionCreator} from '../../reducer/user/user';

interface Props {
  onSubmit: () => void;
  onChange: () => void;
}

const SignIn = ({onSubmit, onChange}) => {
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/">
                <a className="header__logo-link" href="main.html">
                  <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={onSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input onChange={onChange} className="login__input form__input" type="email" name="email" placeholder="Email" required={true} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input onChange={onChange} className="login__input form__input" type="password" name="password" placeholder="Password" required={true}/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = {
  onSubmit: ActionCreator.authenticate,
  onChange: ActionCreator.changeField,
};

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

