import React from 'react';
import { APP_NAME } from '../constants';
import { useNavBarItems } from '../hooks/useNavBarItems';
import { NavBarItem } from './NavBarItem';

export const NavBar = () => {
    const navBarItems = useNavBarItems();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand" href="#">{APP_NAME}</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <div className="navbar-nav mr-auto">
                        { navBarItems.items.map(i => <NavBarItem key={i.name} item={i} />) }
                    </div>
                </div>
                <span className="navbar-test">
                    { navBarItems.helloMessage }
                </span>
            </nav>
        </div>
    );

};
