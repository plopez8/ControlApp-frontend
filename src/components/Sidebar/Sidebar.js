import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import logosvg from 'assets/img/logo-aspero.png';
import { Nav } from 'react-bootstrap';

function Sidebar({ color, image, routes }) {
    const location = useLocation();
    const activeRoute = (routeName) =>
        location.pathname.indexOf(routeName) > -1 ? 'active' : '';

    return (
        <div
            className="sidebar"
            data-image={image}
            data-color={color}
            style={{
                borderTopRightRadius: '30px',
                borderBottomRightRadius: '30px',
            }}
        >
            <div
                className="sidebar-background"
                style={{
                    backgroundImage: `url(${image})`,
                }}
            />
            <div className="sidebar-wrapper">
                <div className="logo d-flex align-items-center justify-content-center">
                    <img
                        style={{ maxHeight: '75px' }}
                        className="img-fluid"
                        alt="..."
                        src={logosvg}
                    ></img>
                </div>
                <Nav>
                    {routes.map((prop) => {
                        if (!prop.redirect)
                            return (
                                <li
                                    className={
                                        prop.upgrade
                                            ? 'active active-pro'
                                            : activeRoute(
                                                  prop.layout + prop.path,
                                              )
                                    }
                                    style={
                                        prop.path === '/users-list'
                                            ? {
                                                  borderTop: 'solid',
                                                  borderTopWidth: '0.1px',
                                                  borderTopColor: 'grey',
                                                  marginTop: '15px',
                                                  paddingTop: '15px',
                                              }
                                            : {}
                                    }
                                    key={prop.name}
                                >
                                    <NavLink
                                        to={prop.layout + prop.path}
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        <i className={prop.icon}></i>
                                        <p> {prop.name}</p>
                                    </NavLink>
                                </li>
                            );
                        return null;
                    })}
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;
