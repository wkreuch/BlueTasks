import React from 'react';
import { Link } from 'react-router-dom';

export const NavBarItem = ({ item }) =>  {

    return (
        <div>
            <Link   className={`nav-item nav-link ${item.active ? "active" : ""}`}
                    to={item.href} 
                    onClick={() => item.onClick(item.name)}> {item.name}
            </Link>
        </div>
    );
};
